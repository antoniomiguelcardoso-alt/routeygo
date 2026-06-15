module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, maxTokens = 1000 } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }

    // Modelos oficiais ativos e funcionais
    const modelCandidates = [
      { name: "gemini-2.0-flash" },
      { name: "gemini-1.5-flash" },
      { name: "gemini-1.5-pro" }
    ];
    
    const endpointOrder = ["generateContent"];
    let finalText = "";
    let lastError = null;
    let lastStatus = 500;
    let lastModel = null;
    const attempts = [];

    outer: for (const model of modelCandidates) {
      for (const action of endpointOrder) {
        // Atualizado para a API estável v1beta
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model.name}:${action}?key=${apiKey}`;
        
        const body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: maxTokens,
          }
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const rawText = await response.text();
        let data = null;
        try {
          data = rawText && (rawText.trim().startsWith("{") || rawText.trim().startsWith("[")) ? JSON.parse(rawText) : null;
        } catch (parseError) {
          data = null;
        }

        const attempt = {
          model: model.name,
          action,
          status: response.status,
          body: rawText,
        };
        attempts.push(attempt);
        console.log(`Model=${model.name} Action=${action} Status=${response.status}`);

        if (response.ok) {
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (text.trim()) {
            finalText = text;
            lastModel = `${model.name}:${action}`;
            break outer;
          }
        }

        lastStatus = response.status;
        lastError = data?.error?.message || rawText || `HTTP ${response.status}`;
        lastModel = `${model.name}:${action}`;

        if (![403, 404, 429].includes(response.status)) {
          continue;
        }
      }
    }

    if (!finalText) {
      return res.status(lastStatus || 500).json({
        error: `No available Gemini model could be used. Last tried model: ${lastModel}. Response: ${lastError}`,
        attempts,
      });
    }

    return res.status(200).json({ text: finalText, model: lastModel });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};