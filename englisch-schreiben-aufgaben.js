/* =====================================================================
   Englisch Schreiben – Aufgaben pro Unit (Young World 4)
   Vier Teile pro Unit, von geführt zu frei:
     satzbau  Wörter in die richtige Reihenfolge bringen (Satz genau so wie hier geschrieben)
     luecken  das fehlende Wort schreiben (de = deutscher Hinweis); kleiner Schreibfehler = ½ Punkt
     saetze   aus Wörtern einen ganzen Satz schreiben; muss = Wortgruppen, die vorkommen müssen
              (jede Gruppe: mögliche Schreibweisen), beispiel = so könnte der Satz lauten
     text     kurzer eigener Text mit Checkliste (woerter = Hinweise, an denen die Checkliste
              einen Punkt erkennt) – die Lehrperson liest den Text in der Station
   ===================================================================== */
const EN_SCHREIBEN = [

/* ---------- Unit 1: The way we live ---------- */
{ unit:1,
  satzbau:[
    "I live in a flat with my family.",
    "We have breakfast at seven o'clock.",
    "My sister rides her bike to school.",
    "They don't have a garden.",
    "Do you live on a houseboat?"
  ],
  luecken:[
    { satz:"Femke lives on a ___ in Amsterdam.", de:"Hausboot", loesung:["houseboat"] },
    { satz:"I ___ my bedroom with my little brother.", de:"teile", loesung:["share"] },
    { satz:"Lucy lives in a ___ on the tenth floor.", de:"Wohnung", loesung:["flat"] },
    { satz:"The ___ to school takes twenty minutes.", de:"Fahrt / Reise", loesung:["journey"] },
    { satz:"Batu's family lives in a round ___.", de:"Zelt", loesung:["tent"] },
    { satz:"Every morning I get ___ at seven o'clock.", de:"aufstehen = get …", loesung:["up"] }
  ],
  saetze:[
    { woerter:["Femke","live","houseboat"], muss:[["femke"],["lives"],["houseboat"]], beispiel:"Femke lives on a houseboat.", tipp:"he / she / it → Verb mit -s: she lives" },
    { woerter:["I","get up","seven o'clock"], muss:[["i"],["get up"],["seven","7"]], beispiel:"I get up at seven o'clock.", tipp:"Die Uhrzeit: at seven o'clock" },
    { woerter:["Batu","ride","horse"], muss:[["batu"],["rides","can ride"],["horse"]], beispiel:"Batu rides a horse.", tipp:"he → rides" },
    { woerter:["we","not","have","garden"], muss:[["we"],["don't","do not"],["have"],["garden"]], beispiel:"We don't have a garden.", tipp:"Verneinung: don't + Verb" }
  ],
  text:{ titel:"My dream home", auftrag:"Write about your dream home.",
    hilfe:"Stell dir dein Traumzuhause vor: ein Hausboot, ein Baumhaus, eine Wohnung hoch über der Stadt … Schreib 5 bis 8 Sätze.",
    punkte:[
      { text:"Where is your dream home?", woerter:["live","home","house","flat","boat","tent","is in","is on","is near"] },
      { text:"What is it like? (big, small, round …)", woerter:["big","small","round","long","old","new","beautiful","great","cool","tiny","high","nice","wooden","modern"] },
      { text:"What rooms are there?", woerter:["kitchen","bedroom","bathroom","living room","room","rooms"] },
      { text:"Who or what lives there with you?", woerter:["with","family","brother","sister","friend","friends","dog","cat","parents","mum","dad","pet"] },
      { text:"What do you do there every day?", woerter:["every day","every morning","every evening","in the morning","after school","play","swim","read","watch","cook","sleep"] }
    ],
    anfaenge:["My dream home is …","It is …","There is a … / There are …","I live there with …","Every day I …"],
    minWoerter:35 }
},

/* ---------- Unit 2: Fascinating animal facts ---------- */
{ unit:2,
  satzbau:[
    "Storks build their nests on roofs.",
    "Marmots sleep for six months.",
    "Sea turtles lay their eggs in the sand.",
    "A jellyfish has no brain.",
    "Eagles and foxes are enemies of the marmot."
  ],
  luecken:[
    { satz:"The Alps are the ___ of the marmot.", de:"Lebensraum", loesung:["habitat"] },
    { satz:"Storks ___ on frogs, mice and worms.", de:"ernähren sich von", loesung:["feed"] },
    { satz:"Some sharks ___ eggs.", de:"legen", loesung:["lay"] },
    { satz:"Sea turtles swim to the top to ___ air.", de:"atmen", loesung:["breathe"] },
    { satz:"Only a few baby turtles ___.", de:"überleben", loesung:["survive"] },
    { satz:"Some jellyfish are ___.", de:"giftig", loesung:["poisonous"] },
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
