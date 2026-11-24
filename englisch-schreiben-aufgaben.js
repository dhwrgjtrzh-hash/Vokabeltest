/* =====================================================================
   Englisch Schreiben – Aufgaben pro Unit (Young World 4)
   Vier Teile pro Unit, von geführt zu frei:
     satzbau  Wörter in die richtige Reihenfolge bringen (Satz genau so wie hier geschrieben)
     luecken  das fehlende Wort schreiben (de = deutscher Hinweis); kleiner Schreibfehler = ½ Punkt
     saetze   aus Wörtern einen ganzen Satz schreiben; muss = Wortgruppen, die vorkommen müssen
              (jede Gruppe: mögliche Schreibweisen), beispiel = so könnte der Satz lauten
     text     kurzer eigener Text mit Checkliste (woerter = Hinweise, an denen die Checkliste
              einen Punkt erkennt) – die Lehrperson liest den Text in der Station
   Nach Klassenstufe: klasse 6 = Young World 4, 5 = Young World 3, 4 = Young World 2 (Repetition).
   Grundlage: Class vocabulary und Strukturen pro Unit aus den Teacher's Books Young World 2–4.
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
},

/* ===================== 5. Klasse – Young World 3 (Repetition) ===================== */
{ klasse:5, unit:1,
  satzbau:["We wear a school uniform.","My favourite subject is science.","Recess is at ten o'clock.","Her school has a big gym."],
  luecken:[
    { satz:"We play football in the ___.", de:"Turnhalle", loesung:["gym"] },
    { satz:"On Monday we have ___ first.", de:"Turnen / Sport (Schulfach)", loesung:["pe","p.e."] },
    { satz:"Look at the ___. What lesson is next?", de:"Stundenplan", loesung:["timetable"] },
    { satz:"At break we play in the ___.", de:"Pausenplatz", loesung:["schoolyard"] },
    { satz:"He wears a ___ and a white shirt.", de:"Krawatte", loesung:["tie"] },
    { satz:"Maths, music and history are school ___.", de:"Fächer", loesung:["subjects"] }
  ],
  saetze:[
    { woerter:["my","favourite","subject","maths"], muss:[["my favourite subject"],["is"],["maths"]], beispiel:"My favourite subject is maths.", tipp:"My favourite … is …" },
    { woerter:["she","wear","uniform"], muss:[["she"],["wears"],["uniform"]], beispiel:"She wears a uniform.", tipp:"she → wears (mit -s)" },
    { woerter:["we","have","PE","Monday"], muss:[["we"],["have"],["pe"],["monday"]], beispiel:"We have PE on Monday.", tipp:"on Monday" }
  ],
  text:{ titel:"My dream school", auftrag:"Write about your dream school.",
    hilfe:"Wie sieht deine Traumschule aus? Schreib 4 bis 6 Sätze.",
    punkte:[
      { text:"Which subjects are there?", woerter:["subject","subjects","maths","english","science","music","art","pe","history","geography"] },
      { text:"What do the children wear?", woerter:["wear","uniform","clothes","shirt","t-shirt","trousers","jeans"] },
      { text:"When does school start and end?", woerter:["start","starts","end","ends","o'clock","half past"] },
      { text:"Are there clubs or special rooms?", woerter:["club","clubs","gym","pool","room","library","garden"] }
    ],
    anfaenge:["In my dream school …","We have …","We wear …","School starts at …"],
    minWoerter:30 }
},

{ klasse:5, unit:2,
  satzbau:["My best friend is very funny.","She has got long brown hair.","He is patient and helpful.","I think he's a good listener."],
  luecken:[
    { satz:"My friend always helps me. She is very ___.", de:"hilfsbereit", loesung:["helpful"] },
    { satz:"He gives his sweets to everybody. He is ___.", de:"grosszügig", loesung:["generous"] },
    { satz:"She isn't afraid of anything. She is ___.", de:"mutig", loesung:["brave"] },
    { satz:"He never wants to work. He is ___.", de:"faul", loesung:["lazy"] },
    { satz:"She always waits for me. She is ___.", de:"geduldig", loesung:["patient"] },
    { satz:"He gets angry very fast. He is quick-___.", de:"aufbrausend = quick-…", loesung:["tempered"] }
  ],
  saetze:[
    { woerter:["my best friend","be","funny"], muss:[["my best friend"],["is"],["funny"]], beispiel:"My best friend is funny.", tipp:"he/she → is" },
    { woerter:["she","have got","dog"], muss:[["she has got","she's got"],["dog"]], beispiel:"She has got a dog.", tipp:"she → has got" },
    { woerter:["I","think","he","brave"], muss:[["i think"],["he is","he's"],["brave"]], beispiel:"I think he is brave.", tipp:"I think he is …" }
  ],
  text:{ titel:"A great friend", auftrag:"Invent a great friend for an adventure and describe him or her.",
    hilfe:"Erfinde eine Freundin oder einen Freund für ein Abenteuer (erfundener Name!). Schreib 4 bis 6 Sätze.",
    punkte:[
      { text:"What does your friend look like?", woerter:["has got","hair","eyes","tall","small","short","long"] },
      { text:"What is your friend like?", woerter:["funny","brave","patient","helpful","generous","friendly","cool","adventurous","crazy"] },
      { text:"What do you do together?", woerter:["together","play","go","adventure","travel","explore"] },
      { text:"Why is he or she a great friend?", woerter:["because","always","good listener","never"] }
    ],
    anfaenge:["My friend is called …","He/She has got …","He/She is very …","Together we …"],
    minWoerter:30 }
},

{ klasse:5, unit:3,
  satzbau:["You must call an ambulance.","Stay calm and help the person.","You should wear a helmet.","What happened?"],
  luecken:[
    { satz:"Call an ___! He is hurt.", de:"Krankenwagen", loesung:["ambulance"] },
    { satz:"He fell, and now his knee ___.", de:"tut weh", loesung:["hurts"] },
    { satz:"This road is very ___. Be careful!", de:"gefährlich", loesung:["dangerous"] },
    { satz:"In an emergency, call 144 on your ___.", de:"Handy", loesung:["mobile"] },
    { satz:"Do you know ___ aid?", de:"erste Hilfe = … aid", loesung:["first"] },
    { satz:"Stay ___ and breathe slowly.", de:"ruhig", loesung:["calm"] }
  ],
  saetze:[
    { woerter:["you","must","wear","helmet"], muss:[["you"],["must"],["wear"],["helmet"]], beispiel:"You must wear a helmet.", tipp:"must + Verb" },
    { woerter:["you","should not","play","street"], muss:[["you"],["should not","shouldn't"],["play"],["street"]], beispiel:"You should not play on the street.", tipp:"should not = sollte nicht" },
    { woerter:["call","ambulance","immediately"], muss:[["call"],["ambulance"],["immediately"]], beispiel:"Call an ambulance immediately.", tipp:"Befehl: Verb am Anfang" }
  ],
  text:{ titel:"Safety rules for our school", auftrag:"Write safety rules for your school.",
    hilfe:"Schreib 4 bis 6 Sicherheitsregeln für eure Schule. Brauche must, must not, should und have to.",
    punkte:[
      { text:"A rule with must", woerter:["must"] },
      { text:"A rule with must not", woerter:["must not","mustn't"] },
      { text:"A rule with should or shouldn't", woerter:["should","shouldn't","should not"] },
      { text:"A rule with have to", woerter:["have to","has to"] }
    ],
    anfaenge:["You must …","You must not …","You should …","You have to …"],
    minWoerter:30 }
},

{ klasse:5, unit:4,
  satzbau:["When do you celebrate Christmas?","We watch the parade in the street.","Children wear masks and costumes.","Halloween takes place on 31st October."],
  luecken:[
    { satz:"At carnival I wear a ___.", de:"Maske", loesung:["mask"] },
    { satz:"On 1st August we light a big ___.", de:"Freudenfeuer", loesung:["bonfire"] },
    { satz:"On New Year's Eve there are ___ in the sky.", de:"Feuerwerk", loesung:["fireworks"] },
    { satz:"The children walk with ___ in the dark.", de:"Laternen", loesung:["lanterns"] },
    { satz:"Do you ___ Easter?", de:"feiern", loesung:["celebrate"] },
    { satz:"We watch the ___ in the street.", de:"Umzug", loesung:["parade"] }
  ],
  saetze:[
    { woerter:["what","you","eat","Christmas"], muss:[["what do you"],["eat"],["christmas"]], beispiel:"What do you eat at Christmas?", tipp:"Frage: What do you …?" },
    { woerter:["we","watch","parade"], muss:[["we"],["watch"],["parade"]], beispiel:"We watch the parade.", tipp:"we → watch (ohne -s)" },
    { woerter:["the celebration","last","three days"], muss:[["celebration"],["lasts"],["three days","3 days"]], beispiel:"The celebration lasts three days.", tipp:"the celebration (= it) → lasts" }
  ],
  text:{ titel:"My favourite festival", auftrag:"Write about your favourite festival.",
    hilfe:"Welches Fest magst du am liebsten? Schreib 4 bis 6 Sätze.",
    punkte:[
      { text:"When does it take place?", woerter:["takes place","in january","in february","in march","in april","in may","in june","in july","in august","in september","in october","in november","in december","on","celebrate"] },
      { text:"What do people do?", woerter:["wear","eat","watch","sing","dance","light","play","give","get"] },
      { text:"Decorations, food or music", woerter:["decoration","decorations","lanterns","lantern","fireworks","cake","sweets","music","bonfire","tree"] },
      { text:"Why do you like it?", woerter:["like","love","because","favourite"] }
    ],
    anfaenge:["My favourite festival is …","It takes place in …","People …","I like it because …"],
    minWoerter:30 }
},

{ klasse:5, unit:5,
  satzbau:["Yesterday we played football.","I won the race!","She came first in the sprint.","We didn't lose the game."],
  luecken:[
    { satz:"Yesterday I ___ the race.", de:"gewann", loesung:["won"] },
    { satz:"He ___ the ball very far.", de:"warf", loesung:["threw"] },
    { satz:"We ___ the game 2:3.", de:"verloren", loesung:["lost"] },
    { satz:"She ___ very fast.", de:"rannte", loesung:["ran"] },
    { satz:"I ___ my shoes at home.", de:"vergass", loesung:["forgot"] },
    { satz:"Our team came ___. We won the gold medal!", de:"Erste/r", loesung:["first"] }
  ],
  saetze:[
    { woerter:["yesterday","I","play","tennis"], muss:[["yesterday"],["i"],["played"],["tennis"]], beispiel:"Yesterday I played tennis.", tipp:"past simple: play → played" },
    { woerter:["we","win","relay race"], muss:[["we"],["won"],["relay race"]], beispiel:"We won the relay race.", tipp:"win → won (unregelmässig)" },
    { woerter:["she","not","fall"], muss:[["she"],["didn't fall","did not fall"]], beispiel:"She didn't fall.", tipp:"didn't + Verb in der Grundform" }
  ],
  text:{ titel:"My sports diary", auftrag:"Write a sports and games diary for three days.",
    hilfe:"Schreib ein Tagebuch über drei Tage: Was hast du gespielt oder für Sport gemacht? Wie war das Wetter? Schreib in der Vergangenheit, 4 bis 6 Sätze.",
    punkte:[
      { text:"Which day?", woerter:["monday","tuesday","wednesday","thursday","friday","saturday","sunday","yesterday"] },
      { text:"What did you do? (past simple)", woerter:["played","went","ran","swam","jumped","rode","climbed","danced","did"] },
      { text:"What was the weather like?", woerter:["sunny","rainy","cloudy","windy","cold","warm","hot","snowy","weather"] },
      { text:"How did you feel?", woerter:["felt","happy","tired","proud","won","lost"] }
    ],
    anfaenge:["On Monday I …","The weather was …","I felt …","On Tuesday we …"],
    minWoerter:30 }
},

/* ===================== 4. Klasse – Young World 2 (Repetition) ===================== */
{ klasse:4, unit:1,
  satzbau:["I can smell the flowers.","The music is very loud.","I like apples because they are sweet.","I don't like curry because it's hot."],
  luecken:[
    { satz:"I ___ with my eyes.", de:"sehe", loesung:["see"] },
    { satz:"I ___ with my ears.", de:"höre", loesung:["hear"] },
    { satz:"I ___ with my nose.", de:"rieche", loesung:["smell"] },
    { satz:"Lemons ___ sour.", de:"schmecken", loesung:["taste"] },
    { satz:"The music is too ___!", de:"laut", loesung:["loud"] },
    { satz:"Honey is very ___.", de:"süss", loesung:["sweet"] }
  ],
  saetze:[
    { woerter:["I","like","bananas","because"], muss:[["i like"],["bananas"],["because"]], beispiel:"I like bananas because they are sweet.", tipp:"I like … because …" },
    { woerter:["I","can","hear","birds"], muss:[["i can hear"],["birds"]], beispiel:"I can hear the birds.", tipp:"I can + Verb" },
    { woerter:["I","don't like","noise"], muss:[["i don't like","i do not like"],["noise"]], beispiel:"I don't like loud noise.", tipp:"I don't like …" }
  ],
  text:{ titel:"My five senses", auftrag:"What do you like to see, hear, smell, taste and touch?",
    hilfe:"Schreib zu jedem Sinn einen Satz: Was siehst, hörst, riechst, schmeckst oder fühlst du gern?",
    punkte:[
      { text:"see", woerter:["see","sees","look at"] },
      { text:"hear", woerter:["hear","hears","listen to"] },
      { text:"smell", woerter:["smell","smells"] },
      { text:"taste", woerter:["taste","tastes"] },
      { text:"touch or feel", woerter:["touch","touches","feel","feels"] }
    ],
    anfaenge:["I like to see …","I like to hear …","I like the smell of …","… tastes …"],
    minWoerter:20 }
},

{ klasse:4, unit:2,
  satzbau:["My mum works at the hospital.","The baker makes bread.","Go along the street and turn left.","There is a library in my town."],
  luecken:[
    { satz:"A ___ works at the hospital.", de:"Pflegefachperson", loesung:["nurse"] },
    { satz:"You can buy bread at the ___.", de:"Bäckerei", loesung:["bakery"] },
    { satz:"You can borrow books at the ___.", de:"Bibliothek", loesung:["library"] },
    { satz:"Turn ___ at the post office.", de:"links", loesung:["left"] },
    { satz:"The ___ helps sick animals.", de:"Tierarzt / Tierärztin", loesung:["vet"] },
    { satz:"You can send letters at the ___ office.", de:"Post", loesung:["post"] }
  ],
  saetze:[
    { woerter:["my dad","work","bank"], muss:[["my dad"],["works"],["bank"]], beispiel:"My dad works at the bank.", tipp:"he → works (mit -s)" },
    { woerter:["go","straight on","turn right"], muss:[["go straight on"],["turn right"]], beispiel:"Go straight on and turn right.", tipp:"Wegbeschreibung: Go … and turn …" },
    { woerter:["there is","park","my town"], muss:[["there is"],["park"],["my town"]], beispiel:"There is a park in my town.", tipp:"There is a … in …" }
  ],
  text:{ titel:"A letter about my town", auftrag:"Write a letter to a new friend about your town.",
    hilfe:"Schreib einen kurzen Brief über deinen Ort. Erfinde den Namen deiner Brieffreundin oder deines Brieffreunds.",
    punkte:[
      { text:"Start: Dear …", woerter:["dear","hello","hi"] },
      { text:"Places in your town", woerter:["there is","there are","school","shop","park","library","station","bakery","hospital"] },
      { text:"People and jobs", woerter:["works","teacher","baker","doctor","nurse","vet","shop assistant","police"] },
      { text:"End: Kind regards …", woerter:["kind regards","best wishes","love","hope to hear","see you","bye"] }
    ],
    anfaenge:["Dear …","In my town there is …","My favourite place is …","Kind regards, …"],
    minWoerter:25 }
},

{ klasse:4, unit:3,
  satzbau:["There is a red circle in the middle.","The blue square is next to the triangle.","There are three green lines.","The yellow star is under the moon."],
  luecken:[
    { satz:"A ___ has three corners.", de:"Dreieck", loesung:["triangle"] },
    { satz:"A ___ is round.", de:"Kreis", loesung:["circle"] },
    { satz:"A ___ has four sides of the same length.", de:"Quadrat", loesung:["square"] },
    { satz:"Blue and yellow make ___.", de:"grün", loesung:["green"] },
    { satz:"The cat is ___ the table.", de:"unter", loesung:["under"] },
    { satz:"The ball is ___ to the box.", de:"neben = … to", loesung:["next"] }
  ],
  saetze:[
    { woerter:["there is","yellow","circle"], muss:[["there is"],["yellow circle"]], beispiel:"There is a yellow circle.", tipp:"There is a … (eins)" },
    { woerter:["there are","two","red","squares"], muss:[["there are"],["two","2"],["red squares"]], beispiel:"There are two red squares.", tipp:"There are … (mehrere)" },
    { woerter:["the star","be","under","moon"], muss:[["star"],["is under"],["moon"]], beispiel:"The star is under the moon.", tipp:"The … is under the …" }
  ],
  text:{ titel:"My picture", auftrag:"Draw a picture with shapes and colours. Then describe it.",
    hilfe:"Zeichne ein Bild mit Formen und Farben. Beschreib es dann in 4 bis 6 Sätzen.",
    punkte:[
      { text:"Colours", woerter:["red","blue","green","yellow","orange","purple","pink","black","white","brown","grey"] },
      { text:"Shapes", woerter:["circle","square","triangle","line","star","rectangle","dot","heart"] },
      { text:"There is / There are", woerter:["there is","there are"] },
      { text:"Where? (next to, under, on …)", woerter:["next to","under","on","behind","in the middle","between","above"] }
    ],
    anfaenge:["In my picture there is …","Next to the … there is …","There are …","I like my picture because …"],
    minWoerter:20 }
},

{ klasse:4, unit:4,
  satzbau:["The owl is hunting at night.","Don't leave your rubbish in the forest.","The squirrel is sleeping in its nest.","A fox is walking along the path."],
  luecken:[
    { satz:"The ___ sleeps during the day and hunts at night.", de:"Eule", loesung:["owl"] },
    { satz:"A ___ has a red tail.", de:"Fuchs", loesung:["fox"] },
    { satz:"Birds live in ___.", de:"Nester", loesung:["nests"] },
    { satz:"Leaves grow on the ___ of a tree.", de:"Äste", loesung:["branches"] },
    { satz:"Don't be too ___ in the forest!", de:"laut", loesung:["loud"] },
    { satz:"The ___ of a tree are under the ground.", de:"Wurzeln", loesung:["roots"] }
  ],
  saetze:[
    { woerter:["the owl","fly","night"], muss:[["owl"],["flies","is flying"],["night"]], beispiel:"The owl flies at night.", tipp:"the owl (= it) → flies" },
    { woerter:["don't","pick","flowers"], muss:[["don't","do not"],["pick"],["flowers"]], beispiel:"Don't pick the flowers.", tipp:"Verbot: Don't …" },
    { woerter:["the squirrel","climb","tree"], muss:[["squirrel"],["climbs","is climbing"],["tree"]], beispiel:"The squirrel is climbing up the tree.", tipp:"Jetzt gerade: is + -ing" }
  ],
  text:{ titel:"A walk in the forest", auftrag:"You are walking in the forest. What can you see?",
    hilfe:"Du spazierst durch den Wald. Was siehst du? Was machen die Tiere gerade? Schreib 4 bis 6 Sätze.",
    punkte:[
      { text:"Animals", woerter:["owl","fox","squirrel","deer","bird","birds","bat","hedgehog","woodpecker","rabbit","badger"] },
      { text:"What are they doing? (-ing)", woerter:["flying","sleeping","hunting","climbing","hiding","running","singing","eating","walking"] },
      { text:"Trees and plants", woerter:["tree","trees","leaves","branches","roots","flowers","mushrooms","bush"] },
      { text:"A forest rule (Don't …)", woerter:["don't","do not"] }
    ],
    anfaenge:["I can see …","The … is …ing.","There are …","Don't …"],
    minWoerter:20 }
},

{ klasse:4, unit:5,
  satzbau:["I go to school by bike.","A plane is faster than a train.","I go to school on foot.","The boat goes under the bridge."],
  luecken:[
    { satz:"I go to school ___ bus.", de:"mit dem = by …", loesung:["by"] },
    { satz:"My sister goes to school ___ foot.", de:"zu Fuss = … foot", loesung:["on"] },
    { satz:"A car is ___ than a bike.", de:"schneller", loesung:["faster"] },
    { satz:"The train goes ___ the tunnel.", de:"durch", loesung:["through"] },
    { satz:"We fly to Spain by ___.", de:"Flugzeug", loesung:["plane"] },
    { satz:"The ___ is very high. We climb it.", de:"Berg", loesung:["mountain"] }
  ],
  saetze:[
    { woerter:["I","go","school","by bike"], muss:[["i go to school"],["by bike"]], beispiel:"I go to school by bike.", tipp:"I go to school by …" },
    { woerter:["a plane","faster","car"], muss:[["plane"],["is faster than"],["car"]], beispiel:"A plane is faster than a car.", tipp:"… is faster than …" },
    { woerter:["the bus","slower","train"], muss:[["bus"],["is slower than"],["train"]], beispiel:"The bus is slower than the train.", tipp:"… is slower than …" }
  ],
  text:{ titel:"My favourite transport", auftrag:"Write about your favourite means of transport.",
    hilfe:"Mit welchem Verkehrsmittel bist du am liebsten unterwegs? Warum? Schreib 4 bis 6 Sätze.",
    punkte:[
      { text:"Which transport?", woerter:["bike","bus","train","tram","car","plane","boat","scooter","skateboard"] },
      { text:"Where do you go with it?", woerter:["go to","by","travel","ride","to school","to my"] },
      { text:"Compare it (faster than …)", woerter:["than"] },
      { text:"Why do you like it?", woerter:["because","like","love","favourite"] }
    ],
    anfaenge:["My favourite transport is …","I go to … by …","It is faster than …","I like it because …"],
    minWoerter:20 }
}

];
