/* =====================================================================
   Englisch Schreiben – Aufgaben pro Unit (Young World 4)
   Vier Teile pro Unit, von geführt zu frei:
     satzbau  Wörter in die richtige Reihenfolge bringen (Satz genau so wie hier geschrieben)
     luecken  das fehlende Wort schreiben (de = deutscher Hinweis); kleiner Schreibfehler = ½ Punkt
     saetze   aus Wörtern einen ganzen Satz schreiben; muss = Wortgruppen, die vorkommen müssen
              (jede Gruppe: mögliche Schreibweisen), beispiel = so könnte der Satz lauten
     text     kurzer eigener Text mit Checkliste (woerter = Hinweise, an denen die Checkliste
              einen Punkt erkennt) – die Lehrperson liest den Text in der Station
   Nur 6. Klasse (Young World 4). Pro Unit eine gemischte Übung (Sätze bauen, Wörter einsetzen, Sätze schreiben)
   und ein eigener Text. Grundlage: Class vocabulary und Strukturen pro Unit aus dem Teacher's Book Young World 4.
   Nicht wie in den Lernkontrollen (Einkaufsliste Sonntagsbrunch, have-to-Bilder, Butler John, Postkarte, Bildbeschreibungen).
   ===================================================================== */
const EN_SCHREIBEN = [

/* ---------- Unit 1: The way we live (Frühstück, Mengenangaben, how much/many, always/usually/never, Nachhaltigkeit) ---------- */
{ klasse:6, unit:1,
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
{ klasse:6, unit:2,
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
},

/* ---------- 6. Klasse, Unit 3: Yesterday and today (past simple, Daten, Erfindungen) ---------- */
{ klasse:6, unit:3,
  satzbau:["Bell invented the telephone in 1876.","The children didn't go to school.","My grandmother was born in 1960.","Tom climbed up the chimney.","When did you get your first mobile?"],
  luecken:[
    { satz:"I write in my ___ every evening.", de:"Tagebuch", loesung:["diary"] },
    { satz:"The telephone was an important ___.", de:"Erfindung", loesung:["invention"] },
    { satz:"Marie Curie was a famous ___.", de:"Wissenschafterin", loesung:["scientist"] },
    { satz:"My grandpa was ___ in 1950.", de:"geboren", loesung:["born"] },
    { satz:"Yesterday I ___ a text message to my friend.", de:"schickte", loesung:["sent"] },
    { satz:"The 20th ___ started in 1901.", de:"Jahrhundert", loesung:["century"] },
    { satz:"In the past, people used a ___ to clean the floor.", de:"Besen", loesung:["broom"] },
    { satz:"The first ___ in Switzerland went from Zurich to Baden.", de:"Eisenbahn", loesung:["railway"] }
  ],
  saetze:[
    { woerter:["my grandmother","be born","1955"], muss:[["grandmother"],["was born"],["1955"]], beispiel:"My grandmother was born in 1955.", tipp:"was born = wurde geboren" },
    { woerter:["we","visit","museum","yesterday"], muss:[["we"],["visited"],["museum"],["yesterday"]], beispiel:"We visited a museum yesterday.", tipp:"past simple: visit → visited" },
    { woerter:["she","not","go","school"], muss:[["she"],["didn't go","did not go"],["school"]], beispiel:"She didn't go to school.", tipp:"Verneinung in der Vergangenheit: didn't + Verb" },
    { woerter:["Bell","invent","telephone"], muss:[["bell"],["invented"],["telephone"]], beispiel:"Bell invented the telephone.", tipp:"invent → invented" }
  ],
  text:{ titel:"A day 100 years ago", auftrag:"Imagine you are a child 100 years ago. Write about your day.",
    hilfe:"Stell dir vor, du lebst vor 100 Jahren. Was hast du an einem Tag gemacht? Schreib in der Vergangenheit (past simple), 5 bis 8 Sätze.",
    punkte:[
      { text:"When did you get up?", woerter:["got up","woke up","get up"] },
      { text:"What did you eat?", woerter:["ate","had","eat","bread","porridge","soup","milk"] },
      { text:"Did you go to school or work?", woerter:["went","worked","school","work","helped","walked"] },
      { text:"What didn't you have? (no phone, no TV …)", woerter:["didn't have","did not have","no phone","no tv","no computer","no car","no electricity"] },
      { text:"How did you feel?", woerter:["was","felt","happy","tired","cold","hungry","sad"] }
    ],
    anfaenge:["I got up at …","For breakfast I had …","After that I went …","We didn't have …","In the evening I was …"],
    minWoerter:35 }
},

/* ---------- 6. Klasse, Unit 4: The call of the Alps (Aktivitäten, Ferienziel, some/any) ---------- */
{ klasse:6, unit:4,
  satzbau:["We went hiking in the mountains.","Is there anything to do in winter?","You shouldn't miss the beautiful view.","We rented skis in the village.","Somebody left a jacket in the cable car."],
  luecken:[
    { satz:"My favourite winter ___ is tobogganing.", de:"Aktivität", loesung:["activity"] },
    { satz:"We slept in a ___ hostel.", de:"Jugend-", loesung:["youth"] },
    { satz:"We took the ___ car up the mountain.", de:"Seil-", loesung:["cable"] },
    { satz:"From the top there is a great ___.", de:"Aussicht", loesung:["view"] },
    { satz:"Zermatt is a famous ski ___.", de:"Ferienort", loesung:["resort"] },
    { satz:"Is there ___ milk in the fridge?", de:"etwas (in Fragen)", loesung:["any"] },
    { satz:"I'm hungry. I want ___ to eat.", de:"etwas", loesung:["something"] },
    { satz:"Can you ___ bikes in the village?", de:"mieten", loesung:["rent"] }
  ],
  saetze:[
    { woerter:["we","go","skiing","winter"], muss:[["we"],["go skiing"],["winter"]], beispiel:"We go skiing in winter.", tipp:"go + Aktivität mit -ing: go skiing" },
    { woerter:["is there","any","snow"], muss:[["is there"],["any"],["snow"]], beispiel:"Is there any snow on the mountain?", tipp:"Fragen mit any, am Schluss ein Fragezeichen" },
    { woerter:["you","should not","miss","view"], muss:[["you"],["shouldn't","should not"],["miss"],["view"]], beispiel:"You shouldn't miss the view.", tipp:"shouldn't miss = solltest nicht verpassen" },
    { woerter:["I","want","try","paragliding"], muss:[["i"],["want to try"],["paragliding"]], beispiel:"I want to try paragliding.", tipp:"want to + Verb" }
  ],
  text:{ titel:"A flyer for a holiday place", auftrag:"Write a flyer for a holiday place in Switzerland.",
    hilfe:"Wähle einen Ort in der Schweiz, den du kennst oder spannend findest. Schreib einen Flyer für Touristinnen und Touristen, 5 bis 8 Sätze.",
    punkte:[
      { text:"General information: Where is it? How do you get there?", woerter:["is in","by train","by car","by bus","near","you can get"] },
      { text:"Highlights: What shouldn't people miss?", woerter:["shouldn't miss","should not miss","highlight","view","beautiful"] },
      { text:"Activities", woerter:["hiking","skiing","climbing","swimming","paragliding","tobogganing","cycling","snowboarding","kayaking","rope park"] },
      { text:"Where can people stay?", woerter:["stay","hotel","youth hostel","campsite","chalet"] },
      { text:"Use some/any or something/anything", woerter:["some","any","something","anything","somebody","anybody","somewhere","anywhere"] }
    ],
    anfaenge:["Welcome to …","You can get there by …","You shouldn't miss …","In summer you can …","Is there anything for …?"],
    minWoerter:35 }
},

/* ---------- 6. Klasse, Unit 5: The story of chocolate (first/then/after that/finally, present continuous) ---------- */
{ klasse:6, unit:5,
  satzbau:["First, break the chocolate into pieces.","Then add the sugar and stir.","Finally, pour the hot chocolate into cups.","My brother is eating a chocolate bar.","Swiss chocolate is famous all over the world."],
  luecken:[
    { satz:"Chocolate ___ in your mouth.", de:"schmilzt", loesung:["melts"] },
    { satz:"Sugar and milk are ___ of milk chocolate.", de:"Zutaten", loesung:["ingredients"] },
    { satz:"This chocolate has a strawberry ___.", de:"Geschmack", loesung:["flavour","flavor"] },
    { satz:"Many chocolate ___ are in Switzerland.", de:"Fabriken", loesung:["factories"] },
    { satz:"Put the milk in a ___ and heat it.", de:"Pfanne", loesung:["pan"] },
    { satz:"Don't forget to ___ the mixture!", de:"rühren", loesung:["stir"] },
    { satz:"Mix the eggs. ___ that, add the sugar.", de:"danach = … that", loesung:["after"] },
    { satz:"___ chocolate helps farmers in developing countries.", de:"Fairtrade-", loesung:["fair trade","fairtrade"] }
  ],
  saetze:[
    { woerter:["first","break","chocolate"], muss:[["first"],["break"],["chocolate"]], beispiel:"First, break the chocolate.", tipp:"Anleitung: First, … (Verb am Anfang)" },
    { woerter:["she","melt","chocolate","now"], muss:[["she"],["is melting","'s melting"],["chocolate"]], beispiel:"She is melting the chocolate now.", tipp:"Jetzt gerade: is + Verb mit -ing" },
    { woerter:["finally","pour","cups"], muss:[["finally"],["pour"],["cups"]], beispiel:"Finally, pour it into cups.", tipp:"Finally = zum Schluss" },
    { woerter:["I","usually","eat","dark chocolate"], muss:[["i"],["usually"],["eat"],["dark chocolate"]], beispiel:"I usually eat dark chocolate.", tipp:"usually steht vor dem Verb" }
  ],
  text:{ titel:"My own chocolate", auftrag:"Invent your own chocolate and describe it.",
    hilfe:"Erfinde eine eigene Schokolade für eine besondere Person. Wie heisst sie? Was ist drin? Schreib auch einen Werbespruch (slogan). 5 bis 8 Sätze.",
    punkte:[
      { text:"What is the name of your chocolate?", woerter:["called","name","is called"] },
      { text:"Ingredients and flavour", woerter:["milk","dark","white","nuts","strawberry","flavour","flavor","ingredients","sugar","caramel","honey"] },
      { text:"Who is it for?", woerter:["for my","for","grandma","grandpa","friend","mum","dad","sister","brother","teacher"] },
      { text:"What does the wrapper look like?", woerter:["wrapper","box","colour","color","red","blue","gold","green"] },
      { text:"A slogan", woerter:["slogan","best","yummy","delicious","love","tasty","sweet"] }
    ],
    anfaenge:["My chocolate is called …","It's a … chocolate with …","It's for …","The wrapper is …","Slogan: …"],
    minWoerter:35 }
}

];
