import { useState, useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const LANGS = { pt:{flag:"🇵🇹"},en:{flag:"🇬🇧"},es:{flag:"🇪🇸"},fr:{flag:"🇫🇷"} };

const T = {
  pt:{
    appName:"Roteiro Perfeito",appSub:"Roteiro de viagem personalizado com IA",
    modeTitle:"Como queres começar?",
    modeKnow:"🗺️ Já sei o destino",modeKnowDesc:"Tens um destino em mente",
    modeSuggest:"✨ Surpreende-me",modeSuggestDesc:"A IA sugere-te o destino ideal",
    dest:"Para onde vais? 🌍",destSub:"Cidade, país ou região",destPlaceholder:"ex: Tóquio, Japão",
    suggestDates:"💡 Sugerir melhores datas",suggestDatesLoading:"A calcular...",bestDates:"Melhores alturas para visitar",
    suggestDestTitle:"Que tipo de viagem queres?",suggestDestSub:"Diz-me o que procuras e sugiro destinos",
    suggestDestPlaceholder:"ex: praia, cultura, gastronomia, aventura...",suggestDestLoading:"A pensar em destinos...",pickDest:"Escolhe um destino",
    origin:"De onde partes? 🛫",originSub:"Cidade ou país de origem",originPlaceholder:"ex: Lisboa, Portugal",
    days:"Quantos dias? 📅",daysSub:"Entre 1 e 30 dias",day:"dia",days2:"dias",
    style:"Qual é o teu estilo?",styleSub:"Escolhe um ou mais",styleMin:"Selecciona pelo menos um",
    budget:"Qual é o teu orçamento?",budgetSub:"Assim posso recomendar melhor",
    pace:"Qual é o teu ritmo?",paceSub:"Como preferes organizar os dias",
    notes:"Algum pedido especial? 💬",notesSub:"Opcional — alergias, mobilidade, interesses…",notesPlaceholder:"ex: Sou vegetariano, adoro jazz...",
    confirm:"Tudo pronto! 🎒",generate:"✨ Gerar Plano Completo",generating:"A criar o teu plano...",
    back:"← Voltar",next:"Continuar →",summary:"Ver resumo →",
    newTrip:"Nova viagem",saved:"Roteiros guardados",noSaved:"Ainda não tens roteiros guardados.",
    copy:"📋 Copiar",copied:"✅ Copiado!",share:"🔗 Partilhar",shareOk:"✅ Copiado!",
    labels:{dest:"📍 Destino",origin:"🛫 Origem",dur:"📅 Duração",style:"🎯 Estilos",budget:"💰 Orçamento",pace:"⏱️ Ritmo",notes:"💬 Notas"},
    error:"Ocorreu um erro. Tenta novamente.",
    tab_new:"✈️ Nova viagem",tab_saved:"📚 Guardados",delete:"Apagar",view:"Ver",
    monthLabel:"Tens um mês ou data em mente? 📅",monthSub:"Opcional — deixa em branco para sugestões abertas",monthPlaceholder:"ex: Agosto, Verão, Natal...",
    sectionsLabel:"O que queres gerar?",sectionsSub:"Selecciona pelo menos um",
    secItinerary:"📋 Roteiro",secTransport:"🚀 Transportes",secAccom:"🏨 Alojamento",secBudget:"💰 Orçamento",
    loadingMsgs:["✈️ A planear a tua aventura...","🗺️ A descobrir os melhores destinos...","🏖️ A encontrar experiências incríveis...","🍽️ A seleccionar os melhores restaurantes...","🏨 A procurar alojamento perfeito...","💰 A calcular o teu orçamento...","🌍 Quase pronto, aguarda..."],
    tabItinerary:"📋 Roteiro",tabTransport:"🚀 Transportes",tabAccom:"🏨 Alojamento",tabBudget:"💰 Orçamento",
    loadingTransport:"A pesquisar transportes...",loadingAccom:"A sugerir alojamento...",loadingBudget:"A calcular orçamento...",
    perPerson:"por pessoa",total:"Total estimado",low:"Mín.",high:"Máx.",
  },
  en:{
    appName:"Perfect Itinerary",appSub:"AI-powered personalised travel itinerary",
    modeTitle:"How do you want to start?",
    modeKnow:"🗺️ I know my destination",modeKnowDesc:"You have a place in mind",
    modeSuggest:"✨ Surprise me",modeSuggestDesc:"AI picks the perfect destination for you",
    dest:"Where are you going? 🌍",destSub:"City, country or region",destPlaceholder:"e.g. Tokyo, Japan",
    suggestDates:"💡 Suggest best dates",suggestDatesLoading:"Checking...",bestDates:"Best times to visit",
    suggestDestTitle:"What kind of trip do you want?",suggestDestSub:"Tell me what you're after and I'll suggest destinations",
    suggestDestPlaceholder:"e.g. beach, culture, food, adventure...",suggestDestLoading:"Thinking of destinations...",pickDest:"Choose a destination",
    origin:"Where are you departing from? 🛫",originSub:"City or country of origin",originPlaceholder:"e.g. London, UK",
    days:"How many days? 📅",daysSub:"Between 1 and 30 days",day:"day",days2:"days",
    style:"What's your travel style?",styleSub:"Pick one or more",styleMin:"Select at least one",
    budget:"What's your budget?",budgetSub:"So I can recommend better",
    pace:"What's your pace?",paceSub:"How do you like to organise your days",
    notes:"Any special requests? 💬",notesSub:"Optional — allergies, reduced mobility, specific interests…",notesPlaceholder:"e.g. I'm vegetarian, love jazz...",
    confirm:"All set! 🎒",generate:"✨ Generate Full Plan",generating:"Creating your plan...",
    back:"← Back",next:"Continue →",summary:"Review →",
    newTrip:"New trip",saved:"Saved itineraries",noSaved:"No saved itineraries yet.",
    copy:"📋 Copy",copied:"✅ Copied!",share:"🔗 Share",shareOk:"✅ Copied!",
    labels:{dest:"📍 Destination",origin:"🛫 Origin",dur:"📅 Duration",style:"🎯 Styles",budget:"💰 Budget",pace:"⏱️ Pace",notes:"💬 Notes"},
    error:"An error occurred. Please try again.",
    tab_new:"✈️ New trip",tab_saved:"📚 Saved",delete:"Delete",view:"View",
    monthLabel:"Do you have a month or date in mind? 📅",monthSub:"Optional — leave blank for open suggestions",monthPlaceholder:"e.g. August, Summer, Christmas...",
    sectionsLabel:"What do you want to generate?",sectionsSub:"Select at least one",
    secItinerary:"📋 Itinerary",secTransport:"🚀 Transport",secAccom:"🏨 Accommodation",secBudget:"💰 Budget",
    loadingMsgs:["✈️ Planning your adventure...","🗺️ Discovering the best destinations...","🏖️ Finding incredible experiences...","🍽️ Selecting the best restaurants...","🏨 Searching for perfect accommodation...","💰 Calculating your budget...","🌍 Almost ready, hang tight..."],
    tabItinerary:"📋 Itinerary",tabTransport:"🚀 Transport",tabAccom:"🏨 Accommodation",tabBudget:"💰 Budget",
    loadingTransport:"Searching transport options...",loadingAccom:"Suggesting accommodation...",loadingBudget:"Calculating budget...",
    perPerson:"per person",total:"Estimated total",low:"Min.",high:"Max.",
  },
  es:{
    appName:"Itinerario Perfecto",appSub:"Itinerario de viaje personalizado con IA",
    modeTitle:"¿Cómo quieres empezar?",
    modeKnow:"🗺️ Ya sé el destino",modeKnowDesc:"Tienes un lugar en mente",
    modeSuggest:"✨ Sorpréndeme",modeSuggestDesc:"La IA te sugiere el destino ideal",
    dest:"¿A dónde vas? 🌍",destSub:"Ciudad, país o región",destPlaceholder:"ej: Tokio, Japón",
    suggestDates:"💡 Sugerir mejores fechas",suggestDatesLoading:"Calculando...",bestDates:"Mejores épocas para visitar",
    suggestDestTitle:"¿Qué tipo de viaje quieres?",suggestDestSub:"Cuéntame qué buscas y te sugiero destinos",
    suggestDestPlaceholder:"ej: playa, cultura, gastronomía, aventura...",suggestDestLoading:"Pensando en destinos...",pickDest:"Elige un destino",
    origin:"¿De dónde sales? 🛫",originSub:"Ciudad o país de origen",originPlaceholder:"ej: Madrid, España",
    days:"¿Cuántos días? 📅",daysSub:"Entre 1 y 30 días",day:"día",days2:"días",
    style:"¿Cuál es tu estilo?",styleSub:"Elige uno o más",styleMin:"Selecciona al menos uno",
    budget:"¿Cuál es tu presupuesto?",budgetSub:"Para poder recomendar mejor",
    pace:"¿Cuál es tu ritmo?",paceSub:"Cómo prefieres organizar tus días",
    notes:"¿Alguna solicitud especial? 💬",notesSub:"Opcional — alergias, movilidad…",notesPlaceholder:"ej: Soy vegetariano, me encanta el jazz...",
    confirm:"¡Todo listo! 🎒",generate:"✨ Generar Plan Completo",generating:"Creando tu plan...",
    back:"← Volver",next:"Continuar →",summary:"Ver resumen →",
    newTrip:"Nuevo viaje",saved:"Itinerarios guardados",noSaved:"Aún no tienes itinerarios guardados.",
    copy:"📋 Copiar",copied:"✅ ¡Copiado!",share:"🔗 Compartir",shareOk:"✅ ¡Copiado!",
    labels:{dest:"📍 Destino",origin:"🛫 Origen",dur:"📅 Duración",style:"🎯 Estilos",budget:"💰 Presupuesto",pace:"⏱️ Ritmo",notes:"💬 Notas"},
    error:"Ocurrió un error. Inténtalo de nuevo.",
    tab_new:"✈️ Nuevo viaje",tab_saved:"📚 Guardados",delete:"Eliminar",view:"Ver",
    monthLabel:"¿Tienes un mes o fecha en mente? 📅",monthSub:"Opcional — deja en blanco para sugerencias abiertas",monthPlaceholder:"ej: Agosto, Verano, Navidad...",
    sectionsLabel:"¿Qué quieres generar?",sectionsSub:"Selecciona al menos uno",
    secItinerary:"📋 Itinerario",secTransport:"🚀 Transporte",secAccom:"🏨 Alojamiento",secBudget:"💰 Presupuesto",
    loadingMsgs:["✈️ Planificando tu aventura...","🗺️ Descubriendo los mejores destinos...","🏖️ Encontrando experiencias increíbles...","🍽️ Seleccionando los mejores restaurantes...","🏨 Buscando el alojamiento perfecto...","💰 Calculando tu presupuesto...","🌍 Casi listo, espera..."],
    tabItinerary:"📋 Itinerario",tabTransport:"🚀 Transporte",tabAccom:"🏨 Alojamiento",tabBudget:"💰 Presupuesto",
    loadingTransport:"Buscando opciones de transporte...",loadingAccom:"Sugiriendo alojamiento...",loadingBudget:"Calculando presupuesto...",
    perPerson:"por persona",total:"Total estimado",low:"Mín.",high:"Máx.",
  },
  fr:{
    appName:"Itinéraire Parfait",appSub:"Itinéraire de voyage personnalisé par l'IA",
    modeTitle:"Comment veux-tu commencer ?",
    modeKnow:"🗺️ Je connais ma destination",modeKnowDesc:"Tu as un endroit en tête",
    modeSuggest:"✨ Surprends-moi",modeSuggestDesc:"L'IA choisit la destination idéale pour toi",
    dest:"Où vas-tu ? 🌍",destSub:"Ville, pays ou région",destPlaceholder:"ex : Tokyo, Japon",
    suggestDates:"💡 Suggérer les meilleures dates",suggestDatesLoading:"Calcul en cours...",bestDates:"Meilleures périodes pour visiter",
    suggestDestTitle:"Quel type de voyage veux-tu ?",suggestDestSub:"Dis-moi ce que tu cherches",
    suggestDestPlaceholder:"ex : plage, culture, gastronomie, aventure...",suggestDestLoading:"Je réfléchis aux destinations...",pickDest:"Choisis une destination",
    origin:"D'où pars-tu ? 🛫",originSub:"Ville ou pays d'origine",originPlaceholder:"ex : Paris, France",
    days:"Combien de jours ? 📅",daysSub:"Entre 1 et 30 jours",day:"jour",days2:"jours",
    style:"Quel est ton style ?",styleSub:"Choisis un ou plusieurs",styleMin:"Sélectionne au moins un",
    budget:"Quel est ton budget ?",budgetSub:"Pour mieux adapter les recommandations",
    pace:"Quel est ton rythme ?",paceSub:"Comment préfères-tu organiser tes journées",
    notes:"Des demandes spéciales ? 💬",notesSub:"Optionnel — allergies, mobilité réduite…",notesPlaceholder:"ex : Je suis végétarien, j'adore le jazz...",
    confirm:"Tout est prêt ! 🎒",generate:"✨ Générer le Plan Complet",generating:"Création en cours...",
    back:"← Retour",next:"Continuer →",summary:"Voir le résumé →",
    newTrip:"Nouveau voyage",saved:"Itinéraires enregistrés",noSaved:"Aucun itinéraire enregistré.",
    copy:"📋 Copier",copied:"✅ Copié !",share:"🔗 Partager",shareOk:"✅ Copié !",
    labels:{dest:"📍 Destination",origin:"🛫 Départ",dur:"📅 Durée",style:"🎯 Styles",budget:"💰 Budget",pace:"⏱️ Rythme",notes:"💬 Notes"},
    error:"Une erreur s'est produite. Réessaie.",
    tab_new:"✈️ Nouveau voyage",tab_saved:"📚 Enregistrés",delete:"Supprimer",view:"Voir",
    monthLabel:"Tu as un mois ou une date en tête ? 📅",monthSub:"Optionnel — laisse vide pour des suggestions ouvertes",monthPlaceholder:"ex : Août, Été, Noël...",
    sectionsLabel:"Que veux-tu générer ?",sectionsSub:"Sélectionne au moins un",
    secItinerary:"📋 Itinéraire",secTransport:"🚀 Transport",secAccom:"🏨 Hébergement",secBudget:"💰 Budget",
    loadingMsgs:["✈️ Planification de ton aventure...","🗺️ Découverte des meilleures destinations...","🏖️ Recherche d'expériences incroyables...","🍽️ Sélection des meilleurs restaurants...","🏨 Recherche d'hébergement parfait...","💰 Calcul de ton budget...","🌍 Presque prêt, encore un instant..."],
    tabItinerary:"📋 Itinéraire",tabTransport:"🚀 Transport",tabAccom:"🏨 Hébergement",tabBudget:"💰 Budget",
    loadingTransport:"Recherche des options de transport...",loadingAccom:"Suggestions d'hébergement...",loadingBudget:"Calcul du budget...",
    perPerson:"par personne",total:"Total estimé",low:"Min.",high:"Max.",
  },
};

const MONTHS = {
  pt:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
  en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  es:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
  fr:["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Aoû","Sep","Oct","Nov","Déc"],
};

const LOADING_MSGS = {
  pt:["✈️ A preparar a tua aventura...","🗺️ A traçar o roteiro perfeito...","🌍 A explorar destinos incríveis...","📍 A marcar os melhores pontos...","🎒 A encher a mochila de ideias...","🧭 A calcular a melhor rota...","🏖️ Quase lá, mais um momento...","⭐ A afinar os últimos detalhes..."],
  en:["✈️ Preparing your adventure...","🗺️ Mapping the perfect itinerary...","🌍 Exploring amazing destinations...","📍 Pinning the best spots...","🎒 Packing the ideas bag...","🧭 Calculating the best route...","🏖️ Almost there, one moment...","⭐ Fine-tuning the last details..."],
  es:["✈️ Preparando tu aventura...","🗺️ Trazando el itinerario perfecto...","🌍 Explorando destinos increíbles...","📍 Marcando los mejores puntos...","🎒 Llenando la mochila de ideas...","🧭 Calculando la mejor ruta...","🏖️ Casi listo, un momento...","⭐ Ajustando los últimos detalles..."],
  fr:["✈️ Préparation de ton aventure...","🗺️ Traçage de l'itinéraire parfait...","🌍 Exploration de destinations incroyables...","📍 Marquage des meilleurs endroits...","🎒 Remplissage du sac d'idées...","🧭 Calcul du meilleur itinéraire...","🏖️ Presque prêt, un instant...","⭐ Finalisation des derniers détails..."],
};

const TRAVEL_STYLES = {
  pt:[
    {id:"aventura",label:"🧗 Aventura",desc:"Trilhos, desportos, natureza"},
    {id:"cultural",label:"🏛️ Cultural",desc:"Museus, história, arquitectura"},
    {id:"gastro",label:"🍷 Gastronómica",desc:"Restaurantes, mercados, sabores"},
    {id:"relax",label:"🏖️ Relaxamento",desc:"Praias, spas, ritmo lento"},
    {id:"urbana",label:"🏙️ Urbana",desc:"Bairros, lojas, vida nocturna"},
    {id:"familia",label:"👨‍👩‍👧 Família",desc:"Actividades para todas as idades"},
    {id:"romance",label:"💑 Romântica",desc:"Jantares, vistas, momentos a dois"},
    {id:"natureza",label:"🌿 Natureza",desc:"Parques, paisagens, ar livre"},
  ],
  en:[
    {id:"adventure",label:"🧗 Adventure",desc:"Hikes, sports, nature"},
    {id:"cultural",label:"🏛️ Cultural",desc:"Museums, history, architecture"},
    {id:"gastro",label:"🍷 Gastronomic",desc:"Restaurants, markets, local flavours"},
    {id:"relax",label:"🏖️ Relaxation",desc:"Beaches, spas, slow pace"},
    {id:"urban",label:"🏙️ Urban",desc:"Neighbourhoods, shops, nightlife"},
    {id:"family",label:"👨‍👩‍👧 Family",desc:"Activities for all ages"},
    {id:"romance",label:"💑 Romantic",desc:"Dinners, views, couple moments"},
    {id:"nature",label:"🌿 Nature",desc:"Parks, landscapes, outdoors"},
  ],
  es:[
    {id:"aventura",label:"🧗 Aventura",desc:"Senderismo, deportes, naturaleza"},
    {id:"cultural",label:"🏛️ Cultural",desc:"Museos, historia, arquitectura"},
    {id:"gastro",label:"🍷 Gastronómica",desc:"Restaurantes, mercados, sabores"},
    {id:"relax",label:"🏖️ Relax",desc:"Playas, spas, ritmo tranquilo"},
    {id:"urbana",label:"🏙️ Urbana",desc:"Barrios, tiendas, vida nocturna"},
    {id:"familia",label:"👨‍👩‍👧 Familia",desc:"Actividades para todas las edades"},
    {id:"romance",label:"💑 Romántica",desc:"Cenas, vistas, momentos en pareja"},
    {id:"naturaleza",label:"🌿 Naturaleza",desc:"Parques, paisajes, aire libre"},
  ],
  fr:[
    {id:"aventure",label:"🧗 Aventure",desc:"Randonnées, sports, nature"},
    {id:"culturel",label:"🏛️ Culturel",desc:"Musées, histoire, architecture"},
    {id:"gastro",label:"🍷 Gastronomique",desc:"Restaurants, marchés, saveurs"},
    {id:"detente",label:"🏖️ Détente",desc:"Plages, spas, rythme lent"},
    {id:"urbain",label:"🏙️ Urbain",desc:"Quartiers, boutiques, vie nocturne"},
    {id:"famille",label:"👨‍👩‍👧 Famille",desc:"Activités pour tous les âges"},
    {id:"romance",label:"💑 Romantique",desc:"Dîners, vues, moments en couple"},
    {id:"nature",label:"🌿 Nature",desc:"Parcs, paysages, plein air"},
  ],
};

const BUDGETS = {
  pt:[{id:"economico",label:"💸 Económico",desc:"Hostels, transporte público"},{id:"medio",label:"💳 Médio",desc:"Hotéis 3★, mix de opções"},{id:"confortavel",label:"✨ Confortável",desc:"Hotéis 4-5★, experiências premium"}],
  en:[{id:"budget",label:"💸 Budget",desc:"Hostels, public transport"},{id:"mid",label:"💳 Mid-range",desc:"3★ hotels, mixed options"},{id:"comfort",label:"✨ Comfortable",desc:"4-5★ hotels, premium experiences"}],
  es:[{id:"economico",label:"💸 Económico",desc:"Hostels, transporte público"},{id:"medio",label:"💳 Medio",desc:"Hoteles 3★, mix de opciones"},{id:"confortable",label:"✨ Confortable",desc:"Hoteles 4-5★, experiencias premium"}],
  fr:[{id:"economique",label:"💸 Économique",desc:"Auberges, transports en commun"},{id:"moyen",label:"💳 Moyen",desc:"Hôtels 3★, options variées"},{id:"confort",label:"✨ Confort",desc:"Hôtels 4-5★, expériences premium"}],
};
const PACES = {
  pt:[{id:"tranquilo",label:"🐢 Tranquilo",desc:"Poucos sítios, mais tempo em cada"},{id:"equilibrado",label:"⚖️ Equilibrado",desc:"Mix de actividades e descanso"},{id:"intenso",label:"⚡ Intenso",desc:"Aproveitar cada momento"}],
  en:[{id:"relaxed",label:"🐢 Relaxed",desc:"Fewer places, more time at each"},{id:"balanced",label:"⚖️ Balanced",desc:"Mix of activities and rest"},{id:"intense",label:"⚡ Intense",desc:"Make the most of every moment"}],
  es:[{id:"tranquilo",label:"🐢 Tranquilo",desc:"Pocos sitios, más tiempo en cada uno"},{id:"equilibrado",label:"⚖️ Equilibrado",desc:"Mix de actividades y descanso"},{id:"intenso",label:"⚡ Intenso",desc:"Aprovechar cada momento"}],
  fr:[{id:"tranquille",label:"🐢 Tranquille",desc:"Peu d'endroits, plus de temps à chaque"},{id:"equilibre",label:"⚖️ Équilibré",desc:"Mix d'activités et de repos"},{id:"intense",label:"⚡ Intense",desc:"Profiter de chaque instant"}],
};



// ─── AI helper ────────────────────────────────────────────────────────────────
async function callClaude(prompt, maxTokens=1000) {
  const r = await fetch("/api/claude",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt,maxTokens}),
  });
  if(!r.ok){
    const errText = await r.text();
    throw new Error(`Erro ${r.status}: ${errText}`);
  }
  const d = await r.json();
  if(d.error) throw new Error(d.error||"Erro na API");
  return d.text||"";
}

function buildItineraryPrompt(form,lang){
  // inject travel month if set
  if(form.travelMonths&&form.travelMonths.length>0){
    const mnames=MONTHS[lang]||MONTHS.pt;
    form={...form,bestDates:mnames.filter((_,i)=>form.travelMonths.includes(i+1)).join(", ")+(form.bestDates?" / "+form.bestDates:"")};
  }
  const styles=TRAVEL_STYLES[lang];const budgets=BUDGETS[lang];const paces=PACES[lang];
  const styleLabels=form.styles.map(id=>styles.find(s=>s.id===id)?.label||id).join(", ");
  const budgetLabel=budgets.find(b=>b.id===form.budget)?.label||form.budget;
  const paceLabel=paces.find(p=>p.id===form.pace)?.label||form.pace;
  const ps={
    pt:`Cria um roteiro de viagem detalhado para ${form.destination} com ${form.days} dias. Estilos: ${styleLabels}. Orçamento: ${budgetLabel}. Ritmo: ${paceLabel}.${form.notes?` Notas: ${form.notes}.`:""}${form.bestDates?` Época: ${form.bestDates}.`:""} Para cada dia usa "## Dia X — [tema]". Lista 3-5 actividades com horário, nome, descrição (1-2 linhas) e dica. No fim de cada dia sugere onde comer (3 refeições). Termina com "💡 Dicas Gerais" (3-5 conselhos). Português europeu, nomes reais.`,
    en:`Create a detailed itinerary for ${form.destination} for ${form.days} days. Styles: ${styleLabels}. Budget: ${budgetLabel}. Pace: ${paceLabel}.${form.notes?` Notes: ${form.notes}.`:""}${form.bestDates?` Season: ${form.bestDates}.`:""} For each day use "## Day X — [theme]". List 3-5 activities with time, name, description (1-2 lines) and tip. End each day with meal suggestions. Close with "💡 General Tips" (3-5 tips). Use real place names.`,
    es:`Crea un itinerario de viaje detallado para ${form.destination} de ${form.days} días. Estilos: ${styleLabels}. Presupuesto: ${budgetLabel}. Ritmo: ${paceLabel}.${form.notes?` Notas: ${form.notes}.`:""}${form.bestDates?` Época: ${form.bestDates}.`:""} Para cada día "## Día X — [tema]". 3-5 actividades con horario, nombre, descripción y consejo. Al final del día 3 comidas. Cierra con "💡 Consejos Generales". Nombres reales.`,
    fr:`Crée un itinéraire de voyage détaillé pour ${form.destination} de ${form.days} jours. Styles: ${styleLabels}. Budget: ${budgetLabel}. Rythme: ${paceLabel}.${form.notes?` Notes: ${form.notes}.`:""}${form.bestDates?` Saison: ${form.bestDates}.`:""} Pour chaque jour "## Jour X — [thème]". 3-5 activités avec horaire, nom, description et conseil. Fin de journée: 3 repas. Terminer par "💡 Conseils Généraux". Noms réels.`,
  };
  return ps[lang]||ps.pt;
}

function buildTransportPrompt(form,lang){
  const origin=form.origin&&form.origin.trim().length>1?form.origin:"Europe";
  const langNames={pt:'European Portuguese',en:'English',es:'Spanish',fr:'French'};
  const langName=langNames[lang]||'English';
  return `Travel expert. Reply ONLY with a compact JSON object. No markdown, no explanation, no newlines inside string values. All string values must be written in ${langName}.
From: ${origin} | To: ${form.destination} | Days: ${form.days}
Use this exact JSON (keep all string values short, max 80 chars each, no line breaks in values):
{"options":[{"mode":"Flight","icon":"✈️","duration":"10-14h","priceRange":"€400-900","frequency":"Daily","pros":"Only option","cons":"Long journey","bookingTips":"Book via TAP","recommended":true},{"mode":"Bus+Flight","icon":"🚌","duration":"12-16h","priceRange":"€350-700","frequency":"Daily","pros":"Cheaper","cons":"More stops","bookingTips":"FlixBus to Lisbon then fly","recommended":false}],"localTransport":{"description":"Getting around ${form.destination}","options":["Metro pass: ~$5/day","Uber available","Bike share"]}}
Replace with accurate data for this specific route. Max 3 transport options. Keep every string value under 80 characters. Reply ONLY with JSON.`;
}

function buildAccomPrompt(form,lang){
  const budgets=BUDGETS[lang];
  const budgetLabel=budgets.find(b=>b.id===form.budget)?.label||form.budget;
  const langNames2={pt:'European Portuguese',en:'English',es:'Spanish',fr:'French'};
  const langName2=langNames2[lang]||'English';
  return `Travel expert. Reply ONLY with compact JSON. No markdown, no newlines inside string values, max 80 chars per string. All string values must be in ${langName2}.
Destination: ${form.destination} | Days: ${form.days} | Budget: ${budgetLabel}
Use this structure:
{"neighborhoods":[{"name":"Area Name","vibe":"Short vibe description","bestFor":"Type of traveller"}],"options":[{"type":"Hotel","icon":"🏨","name":"Real hotel name","neighborhood":"Area","pricePerNight":"€80-120","stars":3,"highlights":["Breakfast included","Central location"],"bookingTip":"Book on Booking.com","recommended":true},{"type":"Hostel","icon":"🛏️","name":"Real hostel name","neighborhood":"Area","pricePerNight":"€25-40","stars":null,"highlights":["Social vibe","Budget friendly"],"bookingTip":"Book on Hostelworld","recommended":false},{"type":"Apartment","icon":"🏠","name":"Airbnb-style apt","neighborhood":"Area","pricePerNight":"€60-90","stars":null,"highlights":["Kitchen","More space"],"bookingTip":"Search Airbnb","recommended":false}]}
Use 2 neighborhoods and exactly 3 accommodation types with real names for ${form.destination}. Reply ONLY with JSON.`;
}

function buildBudgetPrompt(form,lang){
  const budgets=BUDGETS[lang];
  const budgetLabel=budgets.find(b=>b.id===form.budget)?.label||form.budget;
  const origin=form.origin&&form.origin.trim().length>1?form.origin:"Europe";
  const langNames3={pt:'European Portuguese',en:'English',es:'Spanish',fr:'French'};
  const langName3=langNames3[lang]||'English';
  return `Travel expert. Reply ONLY with compact JSON. No markdown, no newlines inside strings, max 60 chars per string value. All string values must be in ${langName3}.
Trip: ${form.days} days in ${form.destination} from ${origin}, budget: ${budgetLabel}
Return exactly this structure with real numbers:
{"currency":"€","perDayBreakdown":[{"category":"Accommodation","icon":"🏨","lowPerDay":40,"highPerDay":100,"note":"Per room/night"},{"category":"Food","icon":"🍽️","lowPerDay":20,"highPerDay":60,"note":"3 meals+snacks"},{"category":"Local transport","icon":"🚇","lowPerDay":5,"highPerDay":15,"note":"Metro/uber"},{"category":"Activities","icon":"🎭","lowPerDay":10,"highPerDay":40,"note":"Museums/tours"},{"category":"Shopping","icon":"🛍️","lowPerDay":10,"highPerDay":30,"note":"Extras/souvenirs"}],"transport":{"icon":"✈️","description":"Return flights","low":300,"high":800,"note":"Per person"},"totalLow":0,"totalHigh":0,"tips":["Tip 1","Tip 2","Tip 3"]}
Replace all numbers with accurate values for ${form.destination} at ${budgetLabel} level. Set totalLow=sum(lowPerDay)*${form.days}+transport.low and totalHigh=sum(highPerDay)*${form.days}+transport.high. Reply ONLY with JSON.`;
}

// ─── Renderers ────────────────────────────────────────────────────────────────
function renderMarkdown(text){
  return text.split("\n").map((line,i)=>{
    if(line.startsWith("## ")||line.startsWith("### ")){
      const isH2=line.startsWith("## ");
      return <h2 key={i} style={{color:isH2?"#1a1a2e":"#2d6a4f",fontSize:isH2?"1.05rem":"0.9rem",fontWeight:700,marginTop:isH2?"1.4rem":"0.9rem",marginBottom:"0.25rem",borderBottom:isH2?"2px solid #e8f4f0":"none",paddingBottom:isH2?"0.25rem":0}}>{line.replace(/^#{2,3} /,"")}</h2>;
    }
    if(line.match(/^[-•*] /))return <li key={i} style={{marginBottom:"0.25rem",lineHeight:1.6,color:"#374151",fontSize:"0.88rem"}} dangerouslySetInnerHTML={{__html:line.replace(/^[-•*] /,"").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}} />;
    if(line.trim()==="")return <div key={i} style={{height:"0.3rem"}} />;
    return <p key={i} style={{lineHeight:1.65,color:"#374151",marginBottom:"0.1rem",fontSize:"0.88rem"}} dangerouslySetInnerHTML={{__html:line.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}} />;
  });
}

function TransportTab({data,t}){
  if(!data)return null;

  return(
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:"0.55rem",marginBottom:"1.2rem"}}>
        {(data.options||[]).map((opt,i)=>(
          <div key={i} style={{border:`2px solid ${opt.recommended?"#86efac":"#e5e7eb"}`,borderRadius:"12px",padding:"0.9rem 1rem",background:opt.recommended?"#f0fdf4":"#fff",position:"relative"}}>
            {opt.recommended&&<span style={{position:"absolute",top:"8px",right:"10px",background:"#16a34a",color:"#fff",borderRadius:"99px",fontSize:"0.68rem",padding:"2px 8px",fontWeight:700}}>★ Recomendado</span>}
            <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.4rem"}}>
              <span style={{fontSize:"1.4rem"}}>{opt.icon}</span>
              <div>
                <div style={{fontWeight:700,fontSize:"0.92rem",color:"#1a1a2e"}}>{opt.mode}</div>
                <div style={{fontSize:"0.75rem",color:"#6b7280"}}>{opt.duration} · {opt.frequency}</div>
              </div>
              <div style={{marginLeft:"auto",textAlign:"right"}}>
                <div style={{fontWeight:700,fontSize:"0.88rem",color:"#2d6a4f"}}>{opt.priceRange}</div>
                <div style={{fontSize:"0.7rem",color:"#9ca3af"}}>{t.perPerson}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:"0.8rem",marginBottom:"0.4rem"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.7rem",color:"#16a34a",fontWeight:600,marginBottom:"1px"}}>✓ {opt.pros}</div>
                <div style={{fontSize:"0.7rem",color:"#dc2626",fontWeight:600}}>✗ {opt.cons}</div>
              </div>
            </div>
            <div style={{fontSize:"0.75rem",color:"#374151",background:"#f8fafc",borderRadius:"8px",padding:"0.4rem 0.7rem"}}>💡 {opt.bookingTips}</div>
          </div>
        ))}
      </div>
      {data.localTransport&&(
        <div style={{background:"#eff6ff",borderRadius:"12px",padding:"0.9rem 1rem",border:"1.5px solid #bfdbfe"}}>
          <div style={{fontWeight:700,fontSize:"0.88rem",color:"#1e40af",marginBottom:"0.5rem"}}>🚇 {data.localTransport.description}</div>
          {(data.localTransport.options||[]).map((o,i)=><div key={i} style={{fontSize:"0.8rem",color:"#374151",padding:"2px 0"}}>• {o}</div>)}
        </div>
      )}
    </div>
  );
}

function AccomTab({data,t}){
  if(!data)return null;
  return(
    <div>
      {(data.neighborhoods||[]).length>0&&(
        <div style={{marginBottom:"1rem"}}>
          <div style={{fontSize:"0.78rem",fontWeight:700,color:"#6b7280",marginBottom:"0.4rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>📍 Melhores Bairros</div>
          <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
            {data.neighborhoods.map((n,i)=>(
              <div key={i} style={{background:"#f0fdf4",border:"1.5px solid #86efac",borderRadius:"10px",padding:"0.5rem 0.8rem",flex:"1",minWidth:"120px"}}>
                <div style={{fontWeight:700,fontSize:"0.82rem",color:"#166534"}}>{n.name}</div>
                <div style={{fontSize:"0.72rem",color:"#374151",marginTop:"2px"}}>{n.vibe}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
        {(data.options||[]).map((opt,i)=>(
          <div key={i} style={{border:`2px solid ${opt.recommended?"#86efac":"#e5e7eb"}`,borderRadius:"12px",padding:"0.9rem 1rem",background:opt.recommended?"#f0fdf4":"#fff",position:"relative"}}>
            {opt.recommended&&<span style={{position:"absolute",top:"8px",right:"10px",background:"#16a34a",color:"#fff",borderRadius:"99px",fontSize:"0.68rem",padding:"2px 8px",fontWeight:700}}>★ Top Pick</span>}
            <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",marginBottom:"0.35rem"}}>
              <span style={{fontSize:"1.3rem"}}>{opt.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:"0.9rem",color:"#1a1a2e"}}>{opt.name}</div>
                <div style={{fontSize:"0.74rem",color:"#6b7280"}}>📍 {opt.neighborhood}{opt.stars?` · ${"★".repeat(opt.stars)}`:""}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:700,fontSize:"0.88rem",color:"#2d6a4f"}}>{opt.pricePerNight}</div>
                <div style={{fontSize:"0.68rem",color:"#9ca3af"}}>/noite</div>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"0.4rem"}}>
              {(opt.highlights||[]).map((h,j)=><span key={j} style={{background:"#f1f5f9",borderRadius:"99px",padding:"2px 8px",fontSize:"0.7rem",color:"#374151"}}>✓ {h}</span>)}
            </div>
            <div style={{fontSize:"0.74rem",color:"#374151",background:"#f8fafc",borderRadius:"8px",padding:"0.35rem 0.65rem"}}>💡 {opt.bookingTip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetTab({data,t,days}){
  if(!data)return null;
  const cur=data.currency||"€";
  const totalLow=data.totalLow||(data.perDayBreakdown||[]).reduce((s,c)=>s+c.lowPerDay,0)*days+(data.transport?.low||0);
  const totalHigh=data.totalHigh||(data.perDayBreakdown||[]).reduce((s,c)=>s+c.highPerDay,0)*days+(data.transport?.high||0);
  const maxBar=Math.max(...(data.perDayBreakdown||[]).map(c=>c.highPerDay),1);
  return(
    <div>
      {/* Total banner */}
      <div style={{background:"linear-gradient(135deg,#2d6a4f,#40916c)",borderRadius:"14px",padding:"1rem 1.2rem",marginBottom:"1.1rem",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:"0.75rem",opacity:0.8,marginBottom:"2px"}}>{t.total} · {days} {days===1?t.day:t.days2} · 1 {t.perPerson}</div>
          <div style={{fontSize:"1.5rem",fontWeight:800}}>{cur}{totalLow} – {cur}{totalHigh}</div>
        </div>
        <span style={{fontSize:"2rem"}}>💰</span>
      </div>

      {/* Per-day breakdown */}
      <div style={{marginBottom:"1rem"}}>
        <div style={{fontSize:"0.75rem",fontWeight:700,color:"#6b7280",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"}}>Por dia</div>
        {(data.perDayBreakdown||[]).map((c,i)=>(
          <div key={i} style={{marginBottom:"0.6rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"3px"}}>
              <span style={{fontSize:"0.82rem",color:"#374151",display:"flex",alignItems:"center",gap:"0.4rem"}}><span>{c.icon}</span>{c.category}</span>
              <span style={{fontSize:"0.82rem",fontWeight:600,color:"#1a1a2e"}}>{cur}{c.lowPerDay}–{cur}{c.highPerDay}</span>
            </div>
            <div style={{background:"#f1f5f9",borderRadius:"99px",height:"6px",overflow:"hidden"}}>
              <div style={{width:`${(c.highPerDay/maxBar)*100}%`,background:"linear-gradient(90deg,#40916c,#74c69d)",height:"100%",borderRadius:"99px"}} />
            </div>
            <div style={{fontSize:"0.7rem",color:"#9ca3af",marginTop:"2px"}}>{c.note}</div>
          </div>
        ))}
      </div>

      {/* Transport */}
      {data.transport&&(
        <div style={{background:"#eff6ff",borderRadius:"12px",padding:"0.8rem 1rem",marginBottom:"1rem",border:"1.5px solid #bfdbfe"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <span style={{fontSize:"1.1rem"}}>{data.transport.icon}</span>
              <div>
                <div style={{fontWeight:600,fontSize:"0.82rem",color:"#1e40af"}}>{data.transport.description}</div>
                <div style={{fontSize:"0.71rem",color:"#6b7280"}}>{data.transport.note}</div>
              </div>
            </div>
            <div style={{fontWeight:700,fontSize:"0.88rem",color:"#1e40af"}}>{cur}{data.transport.low}–{cur}{data.transport.high}</div>
          </div>
        </div>
      )}

      {/* Tips */}
      {(data.tips||[]).length>0&&(
        <div style={{background:"#fefce8",borderRadius:"12px",padding:"0.8rem 1rem",border:"1.5px solid #fde68a"}}>
          <div style={{fontWeight:700,fontSize:"0.8rem",color:"#92400e",marginBottom:"0.4rem"}}>💡 Dicas para poupar</div>
          {data.tips.map((tip,i)=><div key={i} style={{fontSize:"0.78rem",color:"#374151",padding:"2px 0"}}>• {tip}</div>)}
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App(){
  const [lang,setLang]=useState("pt");
  const [tab,setTab]=useState("new");
  const [step,setStep]=useState(0);
  const [mode,setMode]=useState("");
  const [form,setForm]=useState({destination:"",origin:"",days:0,styles:[],budget:"",pace:"",notes:"",bestDates:"",travelMonth:""});
    const [itinerary,setItinerary]=useState("");
  const [transportData,setTransportData]=useState(null);
  const [accomData,setAccomData]=useState(null);
  const [budgetData,setBudgetData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [loadingExtra,setLoadingExtra]=useState({transport:false,accom:false,budget:false});
  const [resultTab,setResultTab]=useState("itinerary");
  const [error,setError]=useState("");
  const [saved,setSaved]=useState([]);
  const [copyState,setCopyState]=useState("");
  const [viewingSaved,setViewingSaved]=useState(null);
  const [loadingTimer,setLoadingTimer]=useState(null);
  const [destQuery,setDestQuery]=useState("");
  const [travelMonth,setTravelMonth]=useState([]);
  const [sections,setSections]=useState({itinerary:true,transport:true,accom:true,budget:true});
  const [loadingMsg,setLoadingMsg]=useState("");
  const [destSuggestions,setDestSuggestions]=useState([]);
  const [destSugLoading,setDestSugLoading]=useState(false);
  const [datesLoading,setDatesLoading]=useState(false);
  const [datesText,setDatesText]=useState("");

  const t=T[lang];
  const tStyles=TRAVEL_STYLES[lang];
  const tBudgets=BUDGETS[lang];
  const tPaces=PACES[lang];
  const selectedMonthsLabel = travelMonth.length>0 ? travelMonth.map(i=>MONTHS[lang][i-1]).join(", ") : "";
  const green="#40916c",darkGreen="#2d6a4f",navy="#1a1a2e";
  const STORAGE_KEY = "saved_itineraries";

  useEffect(()=>{(async()=>{try{
      if(window.storage?.get){
        const r=await window.storage.get(STORAGE_KEY);
        if(r) setSaved(JSON.parse(r.value));
      } else {
        const raw = localStorage.getItem(STORAGE_KEY);
        if(raw) setSaved(JSON.parse(raw));
      }
    }catch{} })();},[]);

  const persistSaved=async(list)=>{try{
      if(window.storage?.set){
        await window.storage.set(STORAGE_KEY,JSON.stringify(list));
      } else {
        localStorage.setItem(STORAGE_KEY,JSON.stringify(list));
      }
    }catch{} };

  const saveItinerary=async(text)=>{
    const entry={id:Date.now(),destination:form.destination,days:form.days,styles:form.styles,lang,date:new Date().toLocaleDateString(),text};
    const updated=[entry,...saved].slice(0,10);setSaved(updated);await persistSaved(updated);
  };
  const deleteSaved=async(id)=>{const updated=saved.filter(s=>s.id!==id);setSaved(updated);if(viewingSaved?.id===id)setViewingSaved(null);await persistSaved(updated);};

  const canNext=()=>{
    if(step===0)return mode!=="";
    if(step===1)return form.destination.trim().length>1;
    if(step===2)return true; // origin is optional
    if(step===3)return form.days>=1&&form.days<=30;
    if(step===4)return form.styles.length>0;
    if(step===5)return form.budget!=="";
    if(step===6)return form.pace!=="";
    return true;
  };

  const toggleStyle=(id)=>setForm(f=>({...f,styles:f.styles.includes(id)?f.styles.filter(s=>s!==id):[...f.styles,id]}));
  
  const suggestDestinations=async()=>{
    if(!destQuery.trim())return;
    setDestSugLoading(true);setDestSuggestions([]);
    try{
      const prompts={
        pt:`Com base em: "${destQuery}"${form.travelMonth?` para viajar em ${form.travelMonth}`:""}. Sugere 5 destinos. Responde SÓ em JSON: [{"dest":"...","emoji":"...","reason":"...","season":"..."}]`,
        en:`Based on: "${destQuery}", suggest 5 travel destinations. Reply ONLY as JSON: [{"dest":"...","emoji":"...","reason":"...","season":"..."}]`,
        es:`Basándote en: "${destQuery}", sugiere 5 destinos. Responde SOLO como JSON: [{"dest":"...","emoji":"...","reason":"...","season":"..."}]`,
        fr:`Basé sur: "${destQuery}", suggère 5 destinations. Réponds UNIQUEMENT en JSON: [{"dest":"...","emoji":"...","reason":"...","season":"..."}]`,
      };
      const raw=await callClaude(prompts[lang]||prompts.pt,400);
      const clean=raw.replace(/```json|```/g,"").trim();
      setDestSuggestions(JSON.parse(clean));
    }catch{setDestSuggestions([]);}finally{setDestSugLoading(false);}
  };

  const fetchBestDates=async()=>{
    if(!form.destination.trim())return;
    setDatesLoading(true);setDatesText("");
    try{
      const prompts={
        pt:`Para visitar ${form.destination}, indica as melhores alturas do ano em 2-3 linhas: clima ideal, meses recomendados, o que evitar. Resposta directa.`,
        en:`For visiting ${form.destination}, describe the best times of year in 2-3 lines: ideal climate, recommended months, what to avoid. Direct answer.`,
        es:`Para visitar ${form.destination}, indica las mejores épocas en 2-3 líneas: clima ideal, meses recomendados, qué evitar. Respuesta directa.`,
        fr:`Pour visiter ${form.destination}, décris les meilleures périodes en 2-3 lignes: climat idéal, mois recommandés, ce qu'il faut éviter. Réponse directe.`,
      };
      const text=await callClaude(prompts[lang]||prompts.pt,200);
      setDatesText(text);setForm(f=>({...f,bestDates:text}));
    }catch{}finally{setDatesLoading(false);}
  };

  const safeParseJSON=(raw)=>{
    // Strip markdown fences
    let c=raw.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();
    // Replace literal newlines/tabs inside the string with spaces (common LLM mistake)
    c=c.replace(/([":,\[{]\s*)\n\s*/g,"$1 ");
    c=c.replace(/\n/g," ").replace(/\r/g,"").replace(/\t/g," ");
    // Try full parse
    try{return JSON.parse(c);}catch{}
    // Extract outermost JSON object or array
    const startObj=c.indexOf("{");const startArr=c.indexOf("[");
    const start=startObj>=0&&startArr>=0?Math.min(startObj,startArr):startObj>=0?startObj:startArr>=0?startArr:-1;
    const end=Math.max(c.lastIndexOf("}"),c.lastIndexOf("]"));
    if(start>=0&&end>start){
      let slice=c.slice(start,end+1);
      try{return JSON.parse(slice);}catch{}
      // Last resort: try to close unclosed JSON by trimming to last complete value
      const lastComma=Math.max(slice.lastIndexOf("},")+1,slice.lastIndexOf("],")+1);
      if(lastComma>0){
        let trimmed=slice.slice(0,lastComma);
        // Close open arrays/objects
        const opens=(trimmed.match(/{/g)||[]).length-(trimmed.match(/}/g)||[]).length;
        const openArr=(trimmed.match(/\[/g)||[]).length-(trimmed.match(/]/g)||[]).length;
        trimmed+="]".repeat(Math.max(0,openArr))+"}".repeat(Math.max(0,opens));
        try{return JSON.parse(trimmed);}catch{}
      }
    }
    return null;
  };

  const delay=(ms)=>new Promise(res=>setTimeout(res,ms));

  const startLoadingMsgs=(msgs)=>{
    let i=0;setLoadingMsg(msgs[0]);
    const timer=setInterval(()=>{i=(i+1)%msgs.length;setLoadingMsg(msgs[i]);},2500);
    setLoadingTimer(timer);
    return timer;
  };
  const stopLoadingMsgs=(timer)=>{clearInterval(timer);setLoadingTimer(null);setLoadingMsg("");};

  const generateAll=async()=>{
    // Merge travelMonth into form
    const formWithMonths={...form,travelMonths:travelMonth};
    const origForm=form;
    // Temporarily use formWithMonths in prompts by shadowing form
    setLoading(true);setError("");setItinerary("");
    setTransportData(null);setAccomData(null);setBudgetData(null);
    setResultTab("itinerary");
    setLoadingExtra({transport:false,accom:false,budget:false});

    // Cycle through loading messages
    const msgs=LOADING_MSGS[lang]||LOADING_MSGS.pt;
    let msgIdx=0;
    setLoadingMsg(msgs[0]);
    const msgInterval=setInterval(()=>{msgIdx=(msgIdx+1)%msgs.length;setLoadingMsg(msgs[msgIdx]);},2200);

    try{
      // 1. Itinerary
      if(sections.itinerary){
        const text=await callClaude(buildItineraryPrompt(form,lang),1000);
        setItinerary(text);
        await saveItinerary(text);
      }
      clearInterval(msgInterval);setLoadingMsg("");
      setLoading(false);
      const firstTab=["itinerary","transport","accom","budget"].find(k=>sections[k])||"itinerary";
      setResultTab(firstTab);
      setStep(8);

      // 2-4. Selected extras with 2s gap
      const extras=[
        sections.transport&&{key:"transport",fn:()=>callClaude(buildTransportPrompt({...form,travelMonths:travelMonth},lang),1200),set:setTransportData},
        sections.accom&&{key:"accom",fn:()=>callClaude(buildAccomPrompt({...form,travelMonths:travelMonth},lang),1200),set:setAccomData},
        sections.budget&&{key:"budget",fn:()=>callClaude(buildBudgetPrompt({...form,travelMonths:travelMonth},lang),1200),set:setBudgetData},
      ].filter(Boolean);

      for(const ex of extras){
        setLoadingExtra(e=>({...e,[ex.key]:true}));
        await delay(2000);
        try{
          const r=await ex.fn();
          const parsed=safeParseJSON(r);
          ex.set(parsed||(r?{_raw:r.slice(0,600)}:null));
        }catch(e){ex.set({_error:e.message});}
        setLoadingExtra(e=>({...e,[ex.key]:false}));
      }

    }catch(err){
      clearInterval(msgInterval);setLoadingMsg("");
      setError((err?.message||t.error).slice(0,120));
      setLoadingExtra({transport:false,accom:false,budget:false});
      setLoading(false);
    }
  };

  const retryTransport=()=>{
    setTransportData(null);setLoadingExtra(e=>({...e,transport:true}));
    callClaude(buildTransportPrompt({...form,travelMonths:travelMonth},lang),1200)
      .then(raw=>{const p=safeParseJSON(raw);setTransportData(p||null);})
      .catch(e=>setTransportData({_error:e.message}))
      .finally(()=>setLoadingExtra(e=>({...e,transport:false})));
  };
  const retryAccom=()=>{
    setAccomData(null);setLoadingExtra(e=>({...e,accom:true}));
    callClaude(buildAccomPrompt({...form,travelMonths:travelMonth},lang),1200)
      .then(raw=>{const p=safeParseJSON(raw);setAccomData(p||null);})
      .catch(e=>setAccomData({_error:e.message}))
      .finally(()=>setLoadingExtra(e=>({...e,accom:false})));
  };
  const retryBudget=()=>{
    setBudgetData(null);setLoadingExtra(e=>({...e,budget:true}));
    callClaude(buildBudgetPrompt({...form,travelMonths:travelMonth},lang),1200)
      .then(raw=>{const p=safeParseJSON(raw);setBudgetData(p||null);})
      .catch(e=>setBudgetData({_error:e.message}))
      .finally(()=>setLoadingExtra(e=>({...e,budget:false})));
  };

  const reset=()=>{
    setStep(0);setMode("");
    setForm({destination:"",origin:"",days:0,styles:[],budget:"",pace:"",notes:"",bestDates:""});
    setTravelMonth([]);setSections({itinerary:true,transport:true,accom:true,budget:true});setLoadingMsg("");
    setItinerary("");setTransportData(null);setAccomData(null);setBudgetData(null);
    setError("");setDestQuery("");setDestSuggestions([]);setDatesText("");setResultTab("itinerary");
    setLoadingMsg("");if(loadingTimer){clearInterval(loadingTimer);setLoadingTimer(null);}
  };

  const copyText=async(text)=>{try{await navigator.clipboard.writeText(text);setCopyState("copied");setTimeout(()=>setCopyState(""),2000);}catch{}};
  const shareText=async(text,dest)=>{if(navigator.share){try{await navigator.share({title:dest,text});return;}catch{}}try{await navigator.clipboard.writeText(text);setCopyState("shared");setTimeout(()=>setCopyState(""),2000);}catch{}};

  const btnPrimary=(disabled)=>({padding:"0.75rem 1.5rem",borderRadius:"10px",border:"none",background:disabled?"#e5e7eb":`linear-gradient(135deg,${darkGreen},${green})`,color:disabled?"#9ca3af":"#fff",fontWeight:600,fontSize:"0.9rem",cursor:disabled?"not-allowed":"pointer"});
  const btnGhost={padding:"0.6rem 1rem",borderRadius:"10px",border:"1.5px solid #e5e7eb",background:"#fff",color:"#374151",fontSize:"0.85rem",cursor:"pointer",fontWeight:500};
  const optionCard=(selected)=>({padding:"0.85rem 1rem",borderRadius:"12px",border:`2px solid ${selected?green:"#e5e7eb"}`,background:selected?"#f0fdf4":"#fff",cursor:"pointer",textAlign:"left",transition:"all 0.18s"});
  const TOTAL_STEPS=8;
  const progressStep=step===0?0:step-1;

  const resultTabs=[
    {id:"itinerary",label:t.tabItinerary,loading:false},
    {id:"transport",label:t.tabTransport,loading:loadingExtra.transport},
    {id:"accom",label:t.tabAccom,loading:loadingExtra.accom},
    {id:"budget",label:t.tabBudget,loading:loadingExtra.budget},
  ];

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f3460 0%,#16213e 50%,#0f3460 100%)",fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      <div style={{background:"#fff",borderRadius:"24px",width:"100%",maxWidth:"560px",overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.4)"}}>

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${darkGreen},${green})`,padding:"1.5rem 1.8rem 1.1rem",color:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.15rem"}}>
                <span style={{fontSize:"1.4rem"}}>✈️</span>
                <span style={{fontWeight:800,fontSize:"1.1rem",letterSpacing:"-0.02em"}}>{t.appName}</span>
              </div>
              <p style={{opacity:0.8,fontSize:"0.78rem",margin:0}}>{t.appSub}</p>
            </div>
            <div style={{display:"flex",gap:"3px",background:"rgba(0,0,0,0.15)",borderRadius:"10px",padding:"3px"}}>
              {Object.entries(LANGS).map(([code,l])=>(
                <button key={code} onClick={()=>{setLang(code);reset();}} style={{padding:"3px 7px",borderRadius:"7px",border:"none",background:lang===code?"rgba(255,255,255,0.9)":"transparent",color:lang===code?navy:"rgba(255,255,255,0.75)",fontSize:"0.72rem",cursor:"pointer",fontWeight:600}}>{l.flag}</button>
              ))}
            </div>
          </div>
          {(tab==="saved"||step===0)&&(
            <div style={{display:"flex",gap:"5px",marginTop:"0.9rem"}}>
              {["new","saved"].map(tb=>(
                <button key={tb} onClick={()=>{setTab(tb);if(tb==="new"){reset();setViewingSaved(null);}}} style={{padding:"4px 12px",borderRadius:"8px",border:"none",background:tab===tb?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.15)",color:tab===tb?navy:"#fff",fontSize:"0.78rem",cursor:"pointer",fontWeight:600}}>
                  {tb==="new"?t.tab_new:`${t.tab_saved}${saved.length>0?` (${saved.length})`:""}`}
                </button>
              ))}
            </div>
          )}
          {tab==="new"&&step>=1&&step<8&&(
            <div style={{display:"flex",gap:"3px",marginTop:"0.9rem"}}>
              {Array.from({length:TOTAL_STEPS}).map((_,i)=>(
                <div key={i} style={{flex:1,height:"3px",borderRadius:"99px",background:i<progressStep?"#fff":"rgba(255,255,255,0.28)",transition:"background 0.3s"}} />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{padding:"1.5rem 1.8rem"}}>

          {/* SAVED TAB */}
          {tab==="saved"&&!viewingSaved&&(
            <div>
              <h2 style={{fontWeight:700,fontSize:"1.05rem",color:navy,marginBottom:"1rem"}}>{t.saved}</h2>
              {saved.length===0?<p style={{color:"#9ca3af",fontSize:"0.88rem",textAlign:"center",padding:"2rem 0"}}>{t.noSaved}</p>:(
                <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",maxHeight:"55vh",overflowY:"auto"}}>
                  {saved.map(s=>(
                    <div key={s.id} style={{border:"1.5px solid #e5e7eb",borderRadius:"12px",padding:"0.8rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:"0.92rem",color:navy}}>📍 {s.destination}</div>
                        <div style={{fontSize:"0.76rem",color:"#6b7280",marginTop:"0.15rem"}}>{s.days} {s.days===1?T[s.lang]?.day:T[s.lang]?.days2} · {s.date} · {LANGS[s.lang]?.flag}</div>
                      </div>
                      <div style={{display:"flex",gap:"5px"}}>
                        <button onClick={()=>setViewingSaved(s)} style={{...btnGhost,padding:"0.35rem 0.7rem",fontSize:"0.76rem"}}>{t.view}</button>
                        <button onClick={()=>deleteSaved(s.id)} style={{...btnGhost,padding:"0.35rem 0.7rem",fontSize:"0.76rem",color:"#dc2626",borderColor:"#fecaca"}}>{t.delete}</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab==="saved"&&viewingSaved&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.9rem"}}>
                <div>
                  <h2 style={{fontWeight:700,fontSize:"0.98rem",color:navy,margin:0}}>📍 {viewingSaved.destination}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.76rem",margin:"0.15rem 0 0"}}>{viewingSaved.days} {viewingSaved.days===1?T[viewingSaved.lang]?.day:T[viewingSaved.lang]?.days2} · {viewingSaved.date}</p>
                </div>
                <button onClick={()=>setViewingSaved(null)} style={btnGhost}>← {t.saved}</button>
              </div>
              <div style={{display:"flex",gap:"6px",marginBottom:"0.9rem"}}>
                <button onClick={()=>copyText(viewingSaved.text)} style={{...btnGhost,fontSize:"0.78rem"}}>{copyState==="copied"?t.copied:t.copy}</button>
                <button onClick={()=>shareText(viewingSaved.text,viewingSaved.destination)} style={{...btnGhost,fontSize:"0.78rem"}}>{copyState==="shared"?t.shareOk:t.share}</button>
              </div>
              <div style={{maxHeight:"52vh",overflowY:"auto"}}>{renderMarkdown(viewingSaved.text)}</div>
            </div>
          )}

          {/* NEW TRIP */}
          {tab==="new"&&(
            <>
              {/* STEP 0 — Mode */}
              {step===0&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"1.1rem"}}>{t.modeTitle}</h2>

                  {/* Month picker */}
                  <div style={{marginBottom:"1.1rem"}}>
                    <p style={{fontSize:"0.8rem",fontWeight:600,color:"#6b7280",marginBottom:"0.45rem"}}>🗓️ {t.monthLabel||"Quando queres viajar? (opcional)"}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                      {(MONTHS[lang]||MONTHS.pt).map((m,i)=>{
                        const sel=travelMonth.includes(i+1);
                        return <button key={i} onClick={()=>setTravelMonth(prev=>sel?prev.filter(x=>x!==i+1):[...prev,i+1])} style={{padding:"4px 10px",borderRadius:"8px",border:`1.5px solid ${sel?green:"#e5e7eb"}`,background:sel?"#f0fdf4":"#fff",fontSize:"0.78rem",fontWeight:sel?700:400,color:sel?darkGreen:"#374151",cursor:"pointer"}}>{m}</button>;
                      })}
                    </div>
                  </div>

                  {/* Section selector */}
                  <div style={{marginBottom:"1.1rem"}}>
                    <p style={{fontSize:"0.8rem",fontWeight:600,color:"#6b7280",marginBottom:"0.45rem"}}>⚙️ {t.sectionsLabel||"O que queres gerar? (mínimo 1)"}</p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
                      {[{id:"itinerary",icon:"📋",label:t.tabItinerary},{id:"transport",icon:"🚀",label:t.tabTransport},{id:"accom",icon:"🏨",label:t.tabAccom},{id:"budget",icon:"💰",label:t.tabBudget}].map(s=>{
                        const sel=sections[s.id];
                        const isLast=sel&&Object.values(sections).filter(Boolean).length===1;
                        return <button key={s.id} onClick={()=>{if(isLast)return;setSections(prev=>({...prev,[s.id]:!prev[s.id]}));}} style={{padding:"6px 10px",borderRadius:"8px",border:`1.5px solid ${sel?green:"#e5e7eb"}`,background:sel?"#f0fdf4":"#fff",fontSize:"0.78rem",fontWeight:sel?700:400,color:sel?darkGreen:"#374151",cursor:isLast?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:"5px",opacity:isLast?0.6:1}}><span>{s.icon}</span>{s.label}</button>;
                      })}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"column",gap:"0.7rem"}}>
                    {[{id:"know",label:t.modeKnow,desc:t.modeKnowDesc},{id:"suggest",label:t.modeSuggest,desc:t.modeSuggestDesc}].map(m=>(
                      <button key={m.id} onClick={()=>{setMode(m.id);setStep(1);}} style={{...optionCard(false),display:"flex",alignItems:"center",gap:"1rem",padding:"1.1rem 1.2rem"}}>
                        <span style={{fontSize:"1.8rem"}}>{m.label.split(" ")[0]}</span>
                        <div>
                          <div style={{fontWeight:700,fontSize:"0.98rem",color:navy}}>{m.label.split(" ").slice(1).join(" ")}</div>
                          <div style={{fontSize:"0.8rem",color:"#6b7280",marginTop:"2px"}}>{m.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}



              {/* STEP 1 — Destination known */}
              {step===1&&mode==="know"&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.dest}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"1rem"}}>{t.destSub}</p>
                  <input autoFocus value={form.destination} onChange={e=>setForm(f=>({...f,destination:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&canNext()&&setStep(2)} placeholder={t.destPlaceholder}
                    style={{width:"100%",padding:"0.82rem 1rem",borderRadius:"12px",border:"2px solid #e5e7eb",fontSize:"1rem",outline:"none",boxSizing:"border-box"}}
                    onFocus={e=>e.target.style.borderColor=green} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                  {form.destination.trim().length>1&&(
                    <div style={{marginTop:"1rem"}}>
                      <button onClick={fetchBestDates} disabled={datesLoading} style={{...btnGhost,fontSize:"0.82rem",display:"flex",alignItems:"center",gap:"0.4rem",opacity:datesLoading?0.6:1}}>
                        {datesLoading?<><span style={{display:"inline-block",width:"12px",height:"12px",border:"2px solid #cbd5e1",borderTopColor:green,borderRadius:"50%",animation:"spin 0.7s linear infinite"}} />{t.suggestDatesLoading}</>:t.suggestDates}
                      </button>
                      {datesText&&(
                        <div style={{marginTop:"0.7rem",background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:"10px",padding:"0.8rem 1rem"}}>
                          <div style={{fontSize:"0.78rem",fontWeight:700,color:darkGreen,marginBottom:"0.3rem"}}>🗓️ {t.bestDates}</div>
                          <div style={{fontSize:"0.82rem",color:"#374151",lineHeight:1.6}}>{datesText}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1 — Suggest destination */}
              {step===1&&mode==="suggest"&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.suggestDestTitle}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"0.9rem"}}>{t.suggestDestSub}</p>
                  <div style={{display:"flex",gap:"0.5rem"}}>
                    <input value={destQuery} onChange={e=>setDestQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&suggestDestinations()} placeholder={t.suggestDestPlaceholder}
                      style={{flex:1,padding:"0.75rem 0.9rem",borderRadius:"10px",border:"2px solid #e5e7eb",fontSize:"0.88rem",outline:"none"}}
                      onFocus={e=>e.target.style.borderColor=green} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                    <button onClick={suggestDestinations} disabled={destSugLoading||!destQuery.trim()} style={{...btnPrimary(destSugLoading||!destQuery.trim()),padding:"0.75rem 1rem"}}>
                      {destSugLoading?<span style={{display:"inline-block",width:"14px",height:"14px",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}} />:"🔍"}
                    </button>
                  </div>
                  {destSugLoading&&<p style={{color:"#9ca3af",fontSize:"0.82rem",marginTop:"0.8rem",textAlign:"center"}}>{t.suggestDestLoading}</p>}
                  {destSuggestions.length>0&&(
                    <div style={{marginTop:"1rem"}}>
                      <p style={{fontSize:"0.8rem",fontWeight:600,color:"#6b7280",marginBottom:"0.5rem"}}>{t.pickDest}</p>
                      <div style={{display:"flex",flexDirection:"column",gap:"0.45rem",maxHeight:"280px",overflowY:"auto"}}>
                        {destSuggestions.map((s,i)=>(
                          <button key={i} onClick={()=>{setForm(f=>({...f,destination:s.dest,bestDates:s.season||""}));setStep(2);}} style={{...optionCard(form.destination===s.dest),display:"flex",alignItems:"center",gap:"0.8rem",padding:"0.75rem 0.9rem"}}>
                            <span style={{fontSize:"1.5rem",minWidth:"28px"}}>{s.emoji}</span>
                            <div style={{textAlign:"left"}}>
                              <div style={{fontWeight:700,fontSize:"0.9rem",color:navy}}>{s.dest}</div>
                              <div style={{fontSize:"0.75rem",color:"#6b7280",marginTop:"1px"}}>{s.reason}</div>
                              {s.season&&<div style={{fontSize:"0.72rem",color:darkGreen,marginTop:"2px"}}>🗓️ {s.season}</div>}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2 — Origin */}
              {step===2&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.origin}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"1rem"}}>{t.originSub}</p>
                  <input autoFocus value={form.origin} onChange={e=>setForm(f=>({...f,origin:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&setStep(3)} placeholder={t.originPlaceholder}
                    style={{width:"100%",padding:"0.82rem 1rem",borderRadius:"12px",border:"2px solid #e5e7eb",fontSize:"1rem",outline:"none",boxSizing:"border-box"}}
                    onFocus={e=>e.target.style.borderColor=green} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                  <p style={{fontSize:"0.78rem",color:"#9ca3af",marginTop:"0.5rem"}}>💡 Necessário para sugerir transportes e estimar custos de viagem</p>
                </div>
              )}

              {/* STEP 3 — Days */}
              {step===3&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.days}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"1.3rem"}}>{t.daysSub}</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1.2rem"}}>
                    <button onClick={()=>setForm(f=>({...f,days:Math.max(1,f.days-1)}))} style={{width:"44px",height:"44px",borderRadius:"50%",border:"2px solid #e5e7eb",background:"#f9fafb",fontSize:"1.3rem",cursor:"pointer"}}>−</button>
                    <span style={{fontSize:"3rem",fontWeight:800,color:navy,minWidth:"70px",textAlign:"center"}}>{form.days||0}</span>
                    <button onClick={()=>setForm(f=>({...f,days:Math.min(30,f.days+1)}))} style={{width:"44px",height:"44px",borderRadius:"50%",border:`2px solid ${green}`,background:"#f0fdf4",fontSize:"1.3rem",cursor:"pointer",color:green}}>+</button>
                  </div>
                  <p style={{textAlign:"center",color:"#9ca3af",fontSize:"0.82rem",marginTop:"0.7rem"}}>{form.days===1?`1 ${t.day}`:`${form.days||0} ${t.days2}`}</p>
                </div>
              )}

              {/* STEP 4 — Styles */}
              {step===4&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.2rem"}}>{t.style}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"0.9rem"}}>{t.styleSub}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.45rem"}}>
                    {tStyles.map(s=>{
                      const selected=form.styles.includes(s.id);
                      return(
                        <button key={s.id} onClick={()=>toggleStyle(s.id)} style={{...optionCard(selected),position:"relative"}}>
                          {selected&&<span style={{position:"absolute",top:"6px",right:"8px",color:green,fontSize:"0.8rem",fontWeight:700}}>✓</span>}
                          <div style={{fontWeight:600,fontSize:"0.86rem",color:navy}}>{s.label}</div>
                          <div style={{fontSize:"0.72rem",color:"#6b7280",marginTop:"1px"}}>{s.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  {form.styles.length===0&&<p style={{fontSize:"0.78rem",color:"#f59e0b",marginTop:"0.5rem"}}>⚠️ {t.styleMin}</p>}
                  {form.styles.length>0&&(
                    <div style={{marginTop:"0.6rem",display:"flex",flexWrap:"wrap",gap:"4px"}}>
                      {form.styles.map(id=>{const s=tStyles.find(x=>x.id===id);return s?<span key={id} style={{background:"#dcfce7",color:darkGreen,borderRadius:"99px",padding:"2px 10px",fontSize:"0.75rem",fontWeight:600}}>{s.label}</span>:null;})}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5 — Budget */}
              {step===5&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.budget}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"0.9rem"}}>{t.budgetSub}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.45rem"}}>
                    {tBudgets.map(b=>(
                      <button key={b.id} onClick={()=>setForm(f=>({...f,budget:b.id}))} style={{...optionCard(form.budget===b.id),display:"flex",alignItems:"center",gap:"1rem"}}>
                        <span style={{fontSize:"1.3rem"}}>{b.label.split(" ")[0]}</span>
                        <div>
                          <div style={{fontWeight:600,fontSize:"0.9rem",color:navy}}>{b.label.split(" ").slice(1).join(" ")}</div>
                          <div style={{fontSize:"0.76rem",color:"#6b7280"}}>{b.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6 — Pace */}
              {step===6&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.pace}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"0.9rem"}}>{t.paceSub}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.45rem"}}>
                    {tPaces.map(p=>(
                      <button key={p.id} onClick={()=>setForm(f=>({...f,pace:p.id}))} style={{...optionCard(form.pace===p.id),display:"flex",alignItems:"center",gap:"1rem"}}>
                        <span style={{fontSize:"1.3rem"}}>{p.label.split(" ")[0]}</span>
                        <div>
                          <div style={{fontWeight:600,fontSize:"0.9rem",color:navy}}>{p.label.split(" ").slice(1).join(" ")}</div>
                          <div style={{fontSize:"0.76rem",color:"#6b7280"}}>{p.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7 — Notes */}
              {step===7&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.25rem"}}>{t.notes}</h2>
                  <p style={{color:"#6b7280",fontSize:"0.85rem",marginBottom:"0.9rem"}}>{t.notesSub}</p>
                  <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder={t.notesPlaceholder} rows={4}
                    style={{width:"100%",padding:"0.82rem 1rem",borderRadius:"12px",border:"2px solid #e5e7eb",fontSize:"0.88rem",outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=green} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                </div>
              )}

              {/* STEP 7.5 — Confirm (show as modal-like summary before generate) */}
              {step===7.5&&(
                <div>
                  <h2 style={{fontWeight:700,fontSize:"1.2rem",color:navy,marginBottom:"0.9rem"}}>{t.confirm}</h2>
                  <div style={{background:"#f8fafc",borderRadius:"12px",padding:"0.9rem 1.1rem",marginBottom:"1.1rem"}}>
                    {[
                      [t.labels.dest,form.destination],
                      form.origin&&[t.labels.origin,form.origin],
                      [t.labels.dur,`${form.days} ${form.days===1?t.day:t.days2}`],
                      [t.labels.style,form.styles.map(id=>tStyles.find(s=>s.id===id)?.label).filter(Boolean).join(" · ")],
                      [t.labels.budget,tBudgets.find(b=>b.id===form.budget)?.label],
                      [t.labels.pace,tPaces.find(p=>p.id===form.pace)?.label],
                      selectedMonthsLabel&&["🗓️ Mês",selectedMonthsLabel],
                      form.bestDates&&["📅",form.bestDates.slice(0,60)+(form.bestDates.length>60?"…":"")],
                      form.notes&&[t.labels.notes,form.notes],
                    ].filter(Boolean).map(([k,v])=>(
                      <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"0.4rem 0",borderBottom:"1px solid #e5e7eb",fontSize:"0.85rem"}}>
                        <span style={{color:"#6b7280",minWidth:"80px"}}>{k}</span>
                        <span style={{fontWeight:600,color:navy,maxWidth:"60%",textAlign:"right"}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {error&&<p style={{color:"#dc2626",fontSize:"0.82rem",marginBottom:"0.9rem",background:"#fef2f2",padding:"0.6rem 0.9rem",borderRadius:"8px"}}>{error}</p>}
                  <button onClick={generateAll} disabled={loading} style={{...btnPrimary(loading),width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.9rem",minHeight:"52px"}}>
                    {loading
                      ?<><span style={{display:"inline-block",width:"14px",height:"14px",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite",flexShrink:0}} /><span style={{fontSize:"0.88rem"}}>{loadingMsg||t.generating}</span></>
                      :t.generate}
                  </button>
                </div>
              )}

              {/* STEP 8 — Results with tabs */}
              {step===8&&(
                <div>
                  {/* Header */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.8rem"}}>
                    <div>
                      <h2 style={{fontWeight:700,fontSize:"0.98rem",color:navy,margin:0}}>📍 {form.destination}</h2>
                      <p style={{color:"#6b7280",fontSize:"0.76rem",margin:"0.15rem 0 0"}}>
                        {form.days} {form.days===1?t.day:t.days2}{form.origin?` · desde ${form.origin}`:""} · {form.styles.map(id=>tStyles.find(s=>s.id===id)?.label?.split(" ")[0]).join(" ")}
                      </p>
                    </div>
                    <button onClick={reset} style={btnGhost}>{t.newTrip}</button>
                  </div>

                  {/* Result tabs */}
                  <div style={{display:"flex",gap:"4px",marginBottom:"1rem",background:"#f1f5f9",borderRadius:"10px",padding:"3px"}}>
                    {resultTabs.filter(rt=>sections[rt.id]).map(rt=>(
                      <button key={rt.id} onClick={()=>setResultTab(rt.id)} style={{flex:1,padding:"5px 2px",borderRadius:"7px",border:"none",background:resultTab===rt.id?"#fff":"transparent",color:resultTab===rt.id?navy:"#6b7280",fontSize:"0.68rem",fontWeight:resultTab===rt.id?700:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"2px",boxShadow:resultTab===rt.id?"0 1px 3px rgba(0,0,0,0.1)":"none"}}>
                        {rt.loading?<span style={{display:"inline-block",width:"8px",height:"8px",border:"1.5px solid #cbd5e1",borderTopColor:green,borderRadius:"50%",animation:"spin 0.7s linear infinite"}} />:null}
                        {rt.label}
                      </button>
                    ))}
                  </div>

                  <div style={{maxHeight:"52vh",overflowY:"auto",paddingRight:"2px"}}>
                    {/* Itinerary tab */}
                    {resultTab==="itinerary"&&(
                      <div>
                        <div style={{display:"flex",gap:"6px",marginBottom:"0.8rem"}}>
                          <button onClick={()=>copyText(itinerary)} style={{...btnGhost,fontSize:"0.78rem"}}>{copyState==="copied"?t.copied:t.copy}</button>
                          <button onClick={()=>shareText(itinerary,form.destination)} style={{...btnGhost,fontSize:"0.78rem"}}>{copyState==="shared"?t.shareOk:t.share}</button>
                        </div>
                        {renderMarkdown(itinerary)}
                      </div>
                    )}
                    {/* Transport tab */}
                    {resultTab==="transport"&&(
                      loadingExtra.transport
                        ?<div style={{textAlign:"center",padding:"2rem 0",color:"#9ca3af",fontSize:"0.88rem"}}><span style={{display:"inline-block",width:"20px",height:"20px",border:"2px solid #e5e7eb",borderTopColor:green,borderRadius:"50%",animation:"spin 0.7s linear infinite",marginBottom:"0.5rem"}} /><br/>{t.loadingTransport}</div>
                        
                        :!transportData?<div style={{textAlign:"center",padding:"2rem 0"}}><p style={{color:"#9ca3af",fontSize:"0.85rem",marginBottom:"0.8rem"}}>⚠️ Não foi possível carregar.</p><button onClick={retryTransport} style={{padding:"0.5rem 1.2rem",borderRadius:"8px",border:"1.5px solid #e5e7eb",background:"#fff",fontSize:"0.82rem",cursor:"pointer",fontWeight:600}}>🔄 Tentar novamente</button></div>
                        :<TransportTab data={transportData} t={t} />
                    )}
                    {/* Accommodation tab */}
                    {resultTab==="accom"&&(
                      loadingExtra.accom
                        ?<div style={{textAlign:"center",padding:"2rem 0",color:"#9ca3af",fontSize:"0.88rem"}}><span style={{display:"inline-block",width:"20px",height:"20px",border:"2px solid #e5e7eb",borderTopColor:green,borderRadius:"50%",animation:"spin 0.7s linear infinite",marginBottom:"0.5rem"}} /><br/>{t.loadingAccom}</div>
                        
                        :!accomData?<div style={{textAlign:"center",padding:"2rem 0"}}><p style={{color:"#9ca3af",fontSize:"0.85rem",marginBottom:"0.8rem"}}>⚠️ Não foi possível carregar.</p><button onClick={retryAccom} style={{padding:"0.5rem 1.2rem",borderRadius:"8px",border:"1.5px solid #e5e7eb",background:"#fff",fontSize:"0.82rem",cursor:"pointer",fontWeight:600}}>🔄 Tentar novamente</button></div>
                        :<AccomTab data={accomData} t={t} />
                    )}
                    {/* Budget tab */}
                    {resultTab==="budget"&&(
                      loadingExtra.budget
                        ?<div style={{textAlign:"center",padding:"2rem 0",color:"#9ca3af",fontSize:"0.88rem"}}><span style={{display:"inline-block",width:"20px",height:"20px",border:"2px solid #e5e7eb",borderTopColor:green,borderRadius:"50%",animation:"spin 0.7s linear infinite",marginBottom:"0.5rem"}} /><br/>{t.loadingBudget}</div>
                        :!budgetData?<div style={{textAlign:"center",padding:"2rem 0"}}><p style={{color:"#9ca3af",fontSize:"0.85rem",marginBottom:"0.8rem"}}>⚠️ Não foi possível carregar.</p><button onClick={retryBudget} style={{padding:"0.5rem 1.2rem",borderRadius:"8px",border:"1.5px solid #e5e7eb",background:"#fff",fontSize:"0.82rem",cursor:"pointer",fontWeight:600}}>🔄 Tentar novamente</button></div>
                        :<BudgetTab data={budgetData} t={t} days={form.days} day={t.day} days2={t.days2} />
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              {step>0&&step<7&&!(step===1&&mode==="suggest")&&(
                <div style={{display:"flex",justifyContent:"space-between",marginTop:"1.4rem"}}>
                  <button onClick={()=>setStep(s=>s-1)} style={btnGhost}>{t.back}</button>
                  <button onClick={()=>setStep(s=>s+1)} disabled={!canNext()} style={btnPrimary(!canNext())}>{t.next}</button>
                </div>
              )}
              {step===7&&(
                <div style={{display:"flex",justifyContent:"space-between",marginTop:"1.4rem"}}>
                  <button onClick={()=>setStep(6)} style={btnGhost}>{t.back}</button>
                  <button onClick={()=>setStep(7.5)} style={btnPrimary(false)}>{t.summary}</button>
                </div>
              )}
              {step===8&&(
                <div style={{display:"flex",justifyContent:"flex-start",marginTop:"1rem"}}>
                  <button onClick={()=>setStep(7.5)} style={btnGhost}>{t.back}</button>
                </div>
              )}
              {step===7.5&&(
                <div style={{display:"flex",justifyContent:"flex-start",marginTop:"1rem"}}>
                  <button onClick={()=>setStep(7)} style={btnGhost}>{t.back}</button>
                </div>
              )}
              {step===1&&mode==="suggest"&&(
                <div style={{display:"flex",justifyContent:"flex-start",marginTop:"1.2rem"}}>
                  <button onClick={()=>setStep(0)} style={btnGhost}>{t.back}</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
