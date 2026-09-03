window.WORLD_DATA = {
  meta: {
    title: "Sacro Impero — World Wiki",
    subtitle: "World Bible interattiva",
    version: "0.1.0",
    canonRule: "Solo gli elementi con stato CANON costituiscono il canone. DRAFT, RUMOR, SECRET e RETCON restano distinti."
  },
  categories: [
    "personaggio","luogo","fazione","evento","religione","cultura","creatura","artefatto","concetto"
  ],
  entries: [
    {
      id: "sacro-impero",
      type: "fazione",
      name: "Sacro Impero",
      status: "CANON",
      visibility: "PLAYER",
      summary: "Entità politica centrale della campagna.",
      body: "Il Sacro Impero è il principale quadro politico del mondo di campagna. La sua struttura interna, i territori, le istituzioni, le dinastie e i conflitti sono ancora da definire in modo canonico.",
      tags: ["politica","impero"],
      relations: [],
      map: null
    },
    {
      id: "principi-campagna",
      type: "concetto",
      name: "Principi della campagna",
      status: "CANON",
      visibility: "DM",
      summary: "Vincoli di progettazione del mondo e della campagna.",
      body: "Dark high fantasy con ispirazione biblica; scala prevalentemente regionale; progressione indicativa livelli 1–10/12; forti vincoli politici e informativi; assenza di confini magici espliciti usati come barriera artificiale del setting.",
      tags: ["meta","design"],
      relations: ["sacro-impero"],
      map: null
    }
  ],
  timeline: [],
  relations: [
    { source: "principi-campagna", target: "sacro-impero", type: "definisce il quadro" }
  ],
  map: {
    title: "Mappa del mondo",
    note: "Geografia non ancora canonizzata. La griglia è intenzionalmente schematica e non in scala.",
    regions: [],
    points: []
  }
};
