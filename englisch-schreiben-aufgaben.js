/* =====================================================================
   Englisch Schreiben – Aufgaben pro Unit (Young World 4)
   Vier Teile pro Unit, von geführt zu frei:
     satzbau  Wörter in die richtige Reihenfolge bringen (Satz genau so wie hier geschrieben)
     luecken  das fehlende Wort schreiben (de = deutscher Hinweis); kleiner Schreibfehler = ½ Punkt
     saetze   aus Wörtern einen ganzen Satz schreiben; muss = Wortgruppen, die vorkommen müssen
              (jede Gruppe: mögliche Schreibweisen), beispiel = so könnte der Satz lauten
     text     kurzer eigener Text mit Checkliste (woerter = Hinweise, an denen die Checkliste
              einen Punkt erkennt) – die Lehrperson liest den Text in der Station
   Grundlage: Class vocabulary und Strukturen pro Unit aus dem Teacher's Book Young World 4.
   Nicht wie in den Lernkontrollen (Einkaufsliste Sonntagsbrunch, have-to-Bilder, Butler John, Postkarte, Bildbeschreibungen).
   ===================================================================== */
const EN_SCHREIBEN = [

/* ---------- Unit 1: The way we live (Frühstück, Mengenangaben, how much/many, always/usually/never, Nachhaltigkeit) ---------- */
{ unit:1,
  satzbau:[
    "I usually have a bowl of porridge for breakfast.",
    "We never throw away old bread.",
    "How many eggs do you need?",
    "My brother sometimes eats baked beans on toast.",
    "We buy regional and seasonal food."
  ],
  luecken:[
    { satz:"Can I have a ___ of cheese, please?", de:"Scheibe", loesung:["slice"] },
    { satz:"I drink a ___ of milk every morning.", de:"Glas", loesung:["glass"] },
    { satz:"Yoghurt and cheese are ___ products.", de:"Molkerei-", loesung:["dairy"] },
    { satz:"How ___ sugar do we need for the cake?", de:"wie viel = how …", loesung:["much"] },
    { satz:"Strawberries in winter come from ___ away.", de:"weit", loesung:["far"] },
    { satz:"We put the apple skins on the ___.", de:"Kompost", loesung:["compost"] },
    { satz:"Apples are ___ in autumn.", de:"saisonal", loesung:["seasonal"] },
    { satz:"Don't throw away old bread. You can ___ it away to a farmer.", de:"verschenken = … away", loesung:["give"] }
  ],
  saetze:[
    { woerter:["I","usually","eat","cereal"], muss:[["i"],["usually"],["eat"],["cereal"]], beispiel:"I usually eat cereal for breakfast.", tipp:"always/usually/never stehen vor dem Verb: I usually eat …" },
    { woerter:["how many","eggs","need"], muss:[["how many"],["eggs"],["do","does"],["need"]], beispiel:"How many eggs do we need?", tipp:"Frage: How many … do we need?" },
    { woerter:["she","never","drink","coffee"], muss:[["she"],["never"],["drinks"],["coffee"]], beispiel:"She never drinks coffee.", tipp:"she → drinks (mit -s)" },
    { woerter:["we","recycle","bottles"], muss:[["we"],["recycle"],["bottles"]], beispiel:"We recycle our bottles.", tipp:"we → recycle (ohne -s)" }
  ],
  text:{ titel:"My special breakfast", auftrag:"Write about your breakfast.",
    hilfe:"Was isst und trinkst du an Schultagen? Gibt es ein spezielles Frühstück am Wochenende oder an Festtagen? Schreib 5 bis 8 Sätze.",
    punkte:[
      { text:"What do you usually eat on school days?", woerter:["usually","school days","school day","eat","cereal","bread","muesli","toast","porridge"] },
      { text:"What do you drink?", woerter:["drink","milk","tea","juice","cocoa","hot chocolate","water"] },
      { text:"Is there a special breakfast? (weekend, birthday …)", woerter:["weekend","sunday","saturday","special","birthday","holiday","christmas","occasion"] },
      { text:"Quantities (a bowl of, a slice of, a glass of …)", woerter:["a bowl of","a slice of","a glass of","a cup of","a piece of","a loaf of","a box of"] },
      { text:"How often? (always, usually, sometimes, never)", woerter:["always","usually","often","sometimes","never"] }
    ],
    anfaenge:["On school days I usually …","I always drink …","On Sundays we …","I never …","My favourite breakfast is …"],
    minWoerter:35 }
},

/* ---------- Unit 2: Fascinating animal facts ---------- */
{ unit:2,
  satzbau:[
    "Storks build their nests on roofs.",
    "Marmots sleep for six months.",
    "Sea turtles lay their eggs in the sand.",
    "Whales have to come up to breathe.",
    "An eagle is faster than a marmot."
  ],
  luecken:[
    { satz:"The Alps are the ___ of the marmot.", de:"Lebensraum", loesung:["habitat"] },
    { satz:"Storks ___ on frogs, mice and worms.", de:"ernähren sich von", loesung:["feed"] },
    { satz:"Some sharks ___ eggs.", de:"legen", loesung:["lay"] },
    { satz:"Sea turtles swim to the top to ___ air.", de:"atmen", loesung:["breathe"] },
    { satz:"Only a few baby turtles ___.", de:"überleben", loesung:["survive"] },
    { satz:"Some snakes are ___.", de:"giftig", loesung:["poisonous"] },
    { satz:"In August, storks start their long ___ to Africa.", de:"Wanderung, Zug (der Tiere)", loesung:["migration"] },
    { satz:"In autumn, a marmot can ___ up to seven kilograms.", de:"wiegen", loesung:["weigh"] }
  ],
  saetze:[
    { woerter:["marmots","live","mountains"], muss:[["marmots"],["live"],["mountains"]], beispiel:"Marmots live in the mountains.", tipp:"in the mountains" },
    { woerter:["the stork","feed on","frogs"], muss:[["stork"],["feeds on"],["frogs"]], beispiel:"The stork feeds on frogs.", tipp:"the stork (= it) → feeds" },
    { woerter:["whales","breathe","air"], muss:[["whales"],["breathe"],["air"]], beispiel:"Whales breathe air.", tipp:"whales (= they) → breathe ohne -s" },
    { woerter:["the female","lay","eggs"], muss:[["female"],["lays"],["eggs"]], beispiel:"The female lays eggs.", tipp:"the female (= she) → lays" }
  ],
  text:{ titel:"Fact file: my animal", auftrag:"Write a fact file about an animal you like.",
    hilfe:"Wähle ein Tier, das dich interessiert. Schreib 5 bis 8 Sätze. Du darfst im Buch oder im Internet nachschauen.",
    punkte:[
      { text:"Habitat: Where does it live?", woerter:["live","lives","habitat","forest","sea","ocean","mountains","jungle","desert","africa","water","river","alps"] },
      { text:"Size and weight", woerter:["weigh","weighs","kilograms","kilos","kg","metres","meters","centimetres","long","tall","size","weight"] },
      { text:"Food: What does it feed on?", woerter:["feed on","feeds on","eat","eats","food"] },
      { text:"Enemies", woerter:["enemy","enemies"] },
      { text:"Babies: lay eggs or give birth?", woerter:["lay eggs","lays eggs","give birth","gives birth","babies","baby","young","eggs"] }
    ],
    anfaenge:["The … lives in …","It weighs about …","It feeds on …","Its enemies are …","The female lays … eggs. / gives birth to …"],
    minWoerter:35 }
}
];
