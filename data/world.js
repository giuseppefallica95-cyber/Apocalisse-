window.WORLD_DATA = {
  meta: {
    title: "Sacro Impero — World Wiki",
    subtitle: "World Bible interattiva",
    version: "0.2.0",
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
      summary: "Formazione politica relativamente recente che ha incorporato molti territori preesistenti, ma non l'intero mondo conosciuto.",
      body: "Il Sacro Impero è una formazione politica relativamente recente. Ha incorporato numerosi regni, città, territori e comunità tramite conquista, annessione, accordi dinastici e adesione politica. Al di fuori dei suoi confini restano forme politiche indipendenti. Il conflitto tra Impero e indipendenza non è moralmente semplice: l'Impero può offrire ordine e stabilità ma anche subordinazione; l'indipendenza può offrire autodeterminazione ma anche frammentazione e vulnerabilità.",
      tags: ["politica","impero","espansione"],
      relations: ["principi-campagna"],
      map: null
    },
    {
      id: "principi-campagna",
      type: "concetto",
      name: "Principi della campagna",
      status: "CANON",
      visibility: "DM",
      summary: "Dark high fantasy biblico centrato sul tema della libertà e del libero arbitrio.",
      body: "Mondo dark high fantasy biblico, strutturalmente vicino a un grande setting fantasy classico in cui il soprannaturale esiste realmente. Il cristianesimo è reale ma profondamente rielaborato. Il periodo materiale di riferimento è l'Europa circa 1150–1250. Il tema fondamentale è la libertà: il libero arbitrio è vissuto come reale anche quando la sua autonomia ultima può risultare illusoria o metafisicamente problematica.",
      tags: ["meta","design","liberta","biblico"],
      relations: ["sacro-impero","dio-autore"],
      map: null
    },
    {
      id: "dio-autore",
      type: "concetto",
      name: "Dio e l'Autore",
      status: "CANON",
      visibility: "DM",
      summary: "Dio esiste realmente ed è il vero Dio; sul piano metanarrativo coincide con l'Autore/Master.",
      body: "Dio esiste realmente ed è il vero Dio del mondo. Sul piano metanarrativo coincide con l'Autore/Master. Il cristianesimo è fondato su una realtà autentica, ma storia, teologia e istituzioni sono rielaborate. Gesù esiste realmente; natura precisa, storia e ruolo cosmologico restano da definire. Il rapporto fra autorialità divina e libero arbitrio è uno dei nuclei metafisici della campagna.",
      tags: ["cosmologia","dio","cristianesimo","meta"],
      relations: ["principi-campagna"],
      map: null
    }
  ],
  timeline: [],
  relations: [
    { source: "principi-campagna", target: "sacro-impero", type: "definisce il quadro" },
    { source: "principi-campagna", target: "dio-autore", type: "definisce la cosmologia di base" }
  ],
  map: {
    title: "Mappa del mondo",
    note: "Geografia non ancora canonizzata. La griglia è intenzionalmente schematica e non in scala.",
    regions: [],
    points: []
  }
};
