/* =====================================================================
   Englisch – Lese- und Hörtexte zu Young World 4 (Lernportal 6b)
   Grundlage: Teacher's Book Young World 4 (Themen, Lernziele, Class vocabulary, Strukturen pro Unit):
     Unit 1 The way we live      – Frühstück und kulturelle Unterschiede, Mengenangaben, how much / how many,
                                   always/usually/sometimes/never, Nachhaltigkeit (food waste, regional, seasonal, recycle)
     Unit 2 Fascinating animal facts – Tierfakten (speed, weight, life expectancy, breeding …), Migration,
                                   present simple, have to, Komparativ/Superlativ
     Unit 3 Yesterday and today  – Leben früher, Erfindungen, past simple
     Unit 4 The call of the Alps – Ferien und Sport in den Alpen, Seilbahn, Jugendherberge
     Unit 5 The story of chocolate – Herstellung, first/then/after that/finally, Fairtrade
   Eigene Texte – nichts aus dem Pupil's Book, dem Activity Book oder den Lernkontrollen übernommen.
   Bewusst NICHT verwendet, weil es in den Lernkontrollen vorkommt: Zoës Frühstück, Bananen-Pancakes,
   Sonntagsbrunch-Einkaufsliste, Frühstück in der Schule (Vanja/Tim), Sonnenbär, Würfelqualle, Galapagos-Leguan,
   Apollo 11, Tiere im All, Ueli Steck, Engelberg-Postkarte, Kakaoanbau, Kakaobäuerin Comfort.
   Einfache Sprache (A1/A2). woerter: kleine Wörterhilfe ([englisch, deutsch]). hilfe: kurze Erklärung auf Deutsch.
   Lesetexte nach Units (unit), Hörtexte nach Stufen 1–3 über alle Themen (stufe).
   ===================================================================== */
const EN_UNITS = {1:"The way we live", 2:"Fascinating animal facts", 3:"Yesterday and today", 4:"The call of the Alps", 5:"The story of chocolate"};

const EN_STIMMEN = {
  erzaehlerin: "en-GB-SoniaNeural",
  frau:        "en-GB-LibbyNeural",
  mann:        "en-GB-RyanNeural",
  maedchen:    "en-GB-MaisieNeural",
  mann2:       "en-GB-ThomasNeural"
};

/* ============================== Reading ============================== */
const EN_LESETEXTE = [

/* ---------- Unit 1: The way we live (Frühstück, Nachhaltigkeit) ---------- */
{ id:"e1-breakfasts", unit:1, titel:"Three breakfasts", art:"Text", thema:"Breakfast around the world",
  absaetze:[[
    "Hi, I'm Yuki and I live in Osaka, Japan.",
    "On school days I usually have a bowl of rice, miso soup and a small piece of grilled fish.",
    "I always drink green tea with it.",
    "My little brother doesn't like fish, so he sometimes has toast with jam instead."
  ],[
    "Hello! My name is Emre. I'm from Izmir in Turkey.",
    "On Sundays my family has a really big breakfast.",
    "There is fresh bread, white cheese, olives, tomatoes, cucumbers, honey and eggs.",
    "My grandfather often drinks four or five glasses of black tea!",
    "We sit at the table for two hours."
  ],[
    "Hi, I'm Oliver from Leeds in England.",
    "During the week I usually eat a bowl of cereal with milk, because I don't have much time.",
    "But on special occasions, like my birthday, my dad cooks a full English breakfast:",
    "fried eggs, bacon, sausages, baked beans, tomatoes and toast.",
    "I never eat all of it. It's too much for me!"
  ]],
  woerter:[["a bowl of","eine Schale"],["instead","stattdessen"],["on special occasions","zu besonderen Anlässen"],["baked beans","Bohnen in Tomatensauce"]],
  fragen:[
    { typ:"tf", art:"verbinden", frage:"Who says this? Yuki, Emre or Oliver?", hilfe:"Wer sagt das?", wahl:["Yuki","Emre","Oliver"], aussagen:[["«I always drink green tea.»","Yuki"],["«I don't have much time in the morning.»","Oliver"],["«Breakfast on Sundays takes two hours.»","Emre"],["«My brother doesn't like fish.»","Yuki"]] },
    { typ:"multi", art:"finden", frage:"What does Emre's family eat on Sundays?", hilfe:"Was isst Emres Familie am Sonntag? Es können mehrere Antworten stimmen.", richtig:["white cheese","olives","honey"], falsch:["rice","bacon","cereal"] },
    { typ:"kurz", art:"finden", frage:"How many glasses of tea does Emre's grandfather often drink?", hilfe:"Schreib die Zahl(en).", loesung:["four or five","4 or 5","four","five","4","5","4-5"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Speck».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["bacon"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Oliver usually eats a full English breakfast.","False"],["Yuki's brother sometimes has toast with jam.","True"],["Emre's mother makes the bread.","Not in the text"]] },
    { typ:"mc", art:"schliessen", frage:"Why does Oliver never eat all of his birthday breakfast?", hilfe:"Warum isst Oliver sein Geburtstagsfrühstück nie ganz auf?", richtig:"It is too much food for him.", falsch:["He doesn't like his dad's cooking.","He has no time on his birthday.","He doesn't eat meat."] }
  ]},

{ id:"e1-wasteweek", unit:1, titel:"Our Zero Waste Week", art:"Class blog", thema:"Sustainability",
  absaetze:[[
    "Last month our class did a Zero Waste Week.",
    "Our teacher told us that in Switzerland about one third of all food is wasted.",
    "We wanted to do something about it."
  ],[
    "On Monday we weighed the rubbish from our classroom: three kilograms!",
    "There was a lot of paper, plastic from prepackaged portions and old bread."
  ],[
    "Then we made a plan.",
    "Everybody brought their snack in a box that we can re-use.",
    "We put apple and banana skins on the compost behind the school.",
    "We recycled paper and bottles.",
    "And we gave away the bread we didn't eat to the chickens of a farmer nearby."
  ],[
    "We also talked about where our food comes from.",
    "Strawberries in December come from far away, by plane or by truck.",
    "Apples from Switzerland are regional, and in autumn they are seasonal, too.",
    "So we decided to buy more regional and seasonal food for our class picnic."
  ],[
    "On Friday we weighed the rubbish again: only one kilogram!",
    "We are proud of it, and we want to keep going."
  ]],
  woerter:[["weigh","wiegen"],["wasted","verschwendet"],["skins","Schalen"],["nearby","in der Nähe"]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Match the headings to the paragraphs.", hilfe:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["Why we started",1],["Checking our rubbish",2],["What we did",3],["Where does food come from?",4],["The result",5]] },
    { typ:"kurz", art:"finden", frage:"How much rubbish was there on Friday?", hilfe:"Wie viel Abfall war es am Freitag?", loesung:["one kilogram","1 kilogram","1 kg","one kilo","1","one","1 kilo"] },
    { typ:"multi", art:"finden", frage:"What did the class do against waste?", hilfe:"Was hat die Klasse gegen Abfall gemacht? Es können mehrere Antworten stimmen.", richtig:["They brought snacks in boxes they can re-use.","They put fruit skins on the compost.","They gave old bread to a farmer's chickens."], falsch:["They stopped eating snacks.","They bought strawberries in December.","They threw the bread away."] },
    { typ:"beleg", art:"verbinden", frage:"Why are strawberries in December not a good idea?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"They come from far away.", falsch:["They are too expensive.","They don't taste good.","They are not healthy."], beleg:["Strawberries in December come from far away"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «saisonal».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["seasonal"] },
    { typ:"mc", art:"schliessen", frage:"How does the class feel at the end of the week?", hilfe:"Wie fühlt sich die Klasse am Ende der Woche?", richtig:"Proud, and they want to do more.", falsch:["Tired, and they want to stop.","Sad, because there is still rubbish.","Bored, because it was too easy."] }
  ]},

/* ---------- Unit 2: Fascinating animal facts ---------- */
{ id:"e2-marmot", unit:2, titel:"Fact file: The Alpine marmot", art:"Fact file", thema:"Animals",
  absaetze:[[
    "Alpine marmots live high up in the mountains of Europe, for example in the Swiss Alps.",
    "Their habitat is above the forest, where there is a lot of grass and many flowers."
  ],[
    "A marmot is about as long as a cat.",
    "In spring it weighs about four kilograms.",
    "In autumn it weighs up to seven kilograms, because it eats a lot in summer.",
    "Marmots feed on grass, herbs and flowers."
  ],[
    "Marmots live in families.",
    "A family lives in a burrow under the ground.",
    "When a marmot sees an enemy, it whistles loudly.",
    "Then all the marmots run into the burrow.",
    "Their biggest enemies are eagles and foxes."
  ],[
    "In October, the marmots go into their burrow and close the entrance with grass and earth.",
    "They sleep for about six months.",
    "During this time they don't eat anything.",
    "They breathe only two or three times a minute."
  ],[
    "Marmots mate in spring, soon after they wake up.",
    "About a month later, the female gives birth to two to six babies.",
    "The babies stay in the burrow for about forty days.",
    "Then they come out for the first time.",
    "A marmot can live up to fifteen years."
  ]],
  woerter:[["burrow","Bau (Höhle unter der Erde)"],["whistle","pfeifen"],["entrance","Eingang"],["herbs","Kräuter"]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Match the headings to the paragraphs.", hilfe:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["Where marmots live",1],["Size, weight and food",2],["Living together",3],["A long sleep",4],["Babies",5]] },
    { typ:"beleg", art:"finden", frage:"What does a marmot do when it sees an enemy?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"It whistles loudly.", falsch:["It attacks the enemy.","It closes the entrance.","It climbs a tree."], beleg:["it whistles loudly"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Marmots eat a lot in summer.","True"],["Marmots eat grass during their winter sleep.","False"],["Marmots can swim very well.","Not in the text"],["The babies stay in the burrow for about forty days.","True"]] },
    { typ:"kurz", art:"finden", frage:"How many months do marmots sleep in winter?", hilfe:"Schreib die Zahl.", loesung:["six","6","six months","6 months","about six months"] },
    { typ:"wort", art:"wortschatz", frage:"Tap a word that means «Feind» or «Feinde».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["enemy","enemies"] },
    { typ:"mc", art:"verbinden", frage:"Why does a marmot weigh more in autumn than in spring?", hilfe:"Warum ist ein Murmeltier im Herbst schwerer als im Frühling?", richtig:"It eats a lot in summer. In winter it doesn't eat.", falsch:["It has babies in autumn.","It drinks a lot of water in autumn.","It grows longer in autumn."] }
  ]},

{ id:"e2-stork", unit:2, titel:"The long journey of the white stork", art:"Text", thema:"Animals / Migration",
  absaetze:[[
    "White storks are big birds with long red legs and a long red beak.",
    "They are black and white, and their wings are about two metres wide."
  ],[
    "In spring, storks build big nests on roofs, chimneys or tall poles.",
    "Every year they add new sticks, so an old nest can be very heavy.",
    "The female lays three to five eggs.",
    "Both parents care for the babies and feed them."
  ],[
    "Storks feed on frogs, mice, worms and insects.",
    "They walk slowly through fields and meadows to find their food."
  ],[
    "In August, the young storks are ready for a long journey.",
    "Storks from Switzerland fly south to spend the winter in Spain or in Africa.",
    "Some of them fly more than 4,000 kilometres!",
    "Storks don't like to fly over the sea.",
    "So they fly over Spain and cross the sea near Gibraltar, where it is very narrow."
  ],[
    "Around 1950, storks almost disappeared from Switzerland.",
    "People started a project to bring them back.",
    "Today, many stork families live in Switzerland again.",
    "When you see a stork in spring, you know: it has come back from its long journey!"
  ]],
  woerter:[["beak","Schnabel"],["chimney","Kamin"],["meadow","Wiese"],["disappear","verschwinden"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where do storks build their nests?", hilfe:"Wo bauen Störche ihre Nester?", richtig:"on roofs, chimneys or tall poles", falsch:["in holes in the ground","in tall grass","on the water"] },
    { typ:"multi", art:"finden", frage:"What do storks feed on?", hilfe:"Was fressen Störche? Es können mehrere Antworten stimmen.", richtig:["frogs","mice","worms"], falsch:["leaves","berries","grass"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the stork's year in the right order.", hilfe:"Bring das Storchenjahr in die richtige Reihenfolge.", items:["The storks build a nest.","The female lays eggs.","The parents feed the babies.","In August, the storks fly south.","In spring, they come back."] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Both parents care for the babies.","True"],["Storks like to fly over the sea.","False"],["Storks can live for thirty years.","Not in the text"]] },
    { typ:"beleg", art:"verbinden", frage:"Why do storks cross the sea near Gibraltar?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"Because the sea is very narrow there.", falsch:["Because there is a lot of food there.","Because it is warmer there.","Because their nests are there."], beleg:["where it is very narrow"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Reise».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["journey"] }
  ]},

{ id:"e2-humpback", unit:2, titel:"Fact file: The humpback whale", art:"Fact file", thema:"Animals / Migration",
  absaetze:[[
    "Humpback whales live in all the oceans of the world.",
    "An adult humpback whale is about fourteen metres long. That's longer than a bus!",
    "It weighs about thirty thousand kilograms."
  ],[
    "Humpback whales feed on krill and small fish.",
    "In summer they stay in cold waters near the North Pole or the South Pole, because there is a lot of food there.",
    "They eat a lot and get fat."
  ],[
    "In winter they swim to warm waters near the equator.",
    "Some of them swim more than eight thousand kilometres. That is one of the longest journeys of all mammals!",
    "During the journey they eat almost nothing."
  ],[
    "In the warm water the females give birth.",
    "A newborn whale is about four metres long and drinks its mother's milk.",
    "The mother cares for her baby for about one year and protects it from enemies like orcas."
  ],[
    "Whales are not fish. They have to come up to the surface to breathe air.",
    "The males are famous for their long songs. Scientists think they sing to find a mate."
  ]],
  woerter:[["krill","Krill (kleine Krebse)"],["equator","Äquator"],["mammals","Säugetiere"],["surface","Wasseroberfläche"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How long is an adult humpback whale?", hilfe:"Wie lang ist ein erwachsener Buckelwal?", richtig:"about fourteen metres", falsch:["about four metres","about forty metres","about eight metres"] },
    { typ:"beleg", art:"verbinden", frage:"Why do humpback whales stay in cold waters in summer?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"There is a lot of food there.", falsch:["The water is cleaner there.","They give birth there.","There are no orcas there."], beleg:["there is a lot of food there"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the whale's year in the right order. Start with summer.", hilfe:"Bring das Jahr des Wals in die richtige Reihenfolge. Beginne mit dem Sommer.", items:["They eat a lot in cold waters.","They swim to warm waters.","The females give birth.","The mother cares for her baby."] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Humpback whales have to come up to breathe air.","True"],["Humpback whales eat a lot during their long journey.","False"],["Humpback whales can jump out of the water.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Feinde».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["enemies"] },
    { typ:"mc", art:"ganz", frage:"Which sentence is the best summary of the text?", hilfe:"Welcher Satz fasst den Text am besten zusammen?", richtig:"Humpback whales are huge mammals that travel very far between cold and warm waters.", falsch:["Humpback whales are fish that live only near the North Pole.","Humpback whales are dangerous for people.","Humpback whales sing because they are hungry."] }
  ]}
];

/* ============================== Listening ==============================
   Hörverstehen: NICHT nach Units, sondern über alles – Stufen 1–3 wie im Hörverstehen Deutsch.
   Jede Unit kommt vor: Frühstück (U1), Tiere und Migration (U2), früher und heute (U3), Alpen (U4), Schokolade (U5).
   Situation auf Deutsch, damit die Kinder wissen, worum es geht. */
const EN_HOERTEXTE = [

/* ---------- Stufe 1: Genau zuhören ---------- */
{ id:"eh1-breakfast", stufe:1, titel:"My breakfast", art:"Podcast", thema:"Unit 1 · Breakfast",
  situation:"Lena aus Zürich erzählt in einem Podcast für Kinder, was sie zum Frühstück isst.",
  rollen:{ L:{name:"Lena", stimme:"maedchen"} },
  teile:[
    ["L","Hi! I'm Lena and I live in Zurich. On school days I usually have a bowl of muesli with yoghurt and berries. I always drink a glass of orange juice. I never drink coffee. I don't like it!"],
    ["L","But on Sundays we have a big breakfast. My dad buys a special Swiss bread called Zopf. We eat it with butter, honey or jam. There is also a slice of cheese for everybody, and boiled eggs. I usually eat two eggs. Mmm, I love Sundays!"]
  ],
  woerter:[["berries","Beeren"],["boiled eggs","gekochte Eier"],["a slice of","eine Scheibe"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"What does Lena usually have on school days?", hilfe:"Was isst Lena an Schultagen meistens?", richtig:"a bowl of muesli with yoghurt and berries", falsch:["bread with honey and jam","two boiled eggs","a bowl of cereal with milk"] },
    { typ:"mc", art:"finden", frage:"What does Lena always drink?", hilfe:"Was trinkt Lena immer?", richtig:"a glass of orange juice", falsch:["a cup of coffee","a glass of milk","a cup of tea"] },
    { typ:"multi", art:"finden", frage:"What does the family eat on Sundays?", hilfe:"Was isst die Familie am Sonntag? Es können mehrere Antworten stimmen.", richtig:["Zopf with butter, honey or jam","a slice of cheese","boiled eggs"], falsch:["bacon","pancakes","sausages"] },
    { typ:"kurz", art:"finden", frage:"How many eggs does Lena usually eat on Sundays?", hilfe:"Schreib die Zahl.", loesung:["2","two","two eggs","2 eggs"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["Lena likes coffee.","False"],["Lena's dad buys the bread.","True"],["Lena has breakfast with her grandmother.","Not said"]] }
  ]},

{ id:"eh1-cablecar", stufe:1, titel:"At the cable car", art:"Announcement", thema:"Unit 4 · The Alps",
  situation:"Du bist mit deiner Familie in den Ferien in den Bergen. An der Talstation der Seilbahn kommt eine Durchsage.",
  rollen:{ D:{name:"Announcement", stimme:"mann"} },
  teile:[
    ["D","Good morning and welcome to the Alpenblick cable car. Because of strong wind, the cable car to the top is closed until two o'clock this afternoon. The cable car to the middle station is open."],
    ["D","From the middle station you can go hiking, or you can visit our rope park. You can rent mountain bikes and scooters at the shop next to the ticket office. The restaurant at the middle station is open until five o'clock. Enjoy your day in the mountains!"]
  ],
  woerter:[["cable car","Seilbahn"],["middle station","Mittelstation"],["rent","mieten"],["rope park","Seilpark"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Why is the cable car to the top closed?", hilfe:"Warum fährt die Seilbahn nicht bis ganz oben?", richtig:"because of strong wind", falsch:["because of snow","because it is too early","because of a party at the top"] },
    { typ:"kurz", art:"finden", frage:"Until what time is the cable car to the top closed?", hilfe:"Bis wann ist sie geschlossen? Schreib die Uhrzeit.", loesung:["two o'clock","2 o'clock","2","two","2 pm","14.00","14:00","2.00"] },
    { typ:"multi", art:"finden", frage:"What can you rent at the shop?", hilfe:"Was kann man im Laden mieten? Es können mehrere Antworten stimmen.", richtig:["mountain bikes","scooters"], falsch:["skis","kayaks","sledges"] },
    { typ:"tf", art:"verbinden", frage:"True, false or not said?", aussagen:[["You can go hiking from the middle station.","True"],["The restaurant at the middle station closes at two o'clock.","False"],["The rope park is only for adults.","Not said"]] }
  ]},

{ id:"e1h-farm", stufe:1, titel:"Isla's day on the farm", art:"Podcast", thema:"Unit 1 · Daily routine",
  situation:"Isla wohnt in Schottland. In einem Podcast für Kinder erzählt sie von ihrem Tag.",
  rollen:{ I:{name:"Isla", stimme:"maedchen"} },
  teile:[
    ["I","Hi! My name is Isla. I'm eleven years old and I live on a sheep farm in Scotland. We have about three hundred sheep, two dogs and lots of chickens."],
    ["I","I get up at half past six every morning. Before breakfast I feed the chickens and collect the eggs. My brother Callum feeds the dogs. Then we have porridge for breakfast."],
    ["I","The school bus comes at a quarter to eight. The journey to school takes forty minutes, because our farm is far away from the village. There are only twelve children in my class."],
    ["I","After school I do my homework in the kitchen. In spring I help my dad with the baby lambs. That's my favourite time of the year!"],
    ["I","We have dinner at six o'clock, and I usually go to bed at nine. Life on a farm is hard work, but I love it."]
  ],
  woerter:[["sheep","Schaf(e)"],["porridge","Haferbrei"],["lambs","Lämmer"]],
  fragen:[
    { typ:"multi", art:"finden", frage:"Which animals are on Isla's farm?", hilfe:"Welche Tiere gibt es auf dem Hof? Es können mehrere Antworten stimmen.", richtig:["sheep","dogs","chickens"], falsch:["cows","horses","goats"] },
    { typ:"kurz", art:"finden", frage:"What time does Isla get up?", hilfe:"Schreib die Uhrzeit (auf Englisch oder als Zahl).", loesung:["half past six","6.30","6:30","six thirty","half past 6"] },
    { typ:"ordnen", art:"verbinden", frage:"Put Isla's morning in the right order.", hilfe:"Bring Islas Morgen in die richtige Reihenfolge.", items:["She gets up.","She feeds the chickens.","She has porridge for breakfast.","She takes the school bus."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The journey to school takes forty minutes.","True"],["There are twenty children in Isla's class.","False"],["Isla's mum is a teacher.","Not said"]] },
    { typ:"mc", art:"verbinden", frage:"Why does the journey to school take so long?", hilfe:"Warum dauert der Schulweg so lange?", richtig:"The farm is far away from the village.", falsch:["The bus is very slow.","Isla walks to the bus.","The bus stops at every farm."] },
    { typ:"mc", art:"ganz", frage:"How does Isla feel about life on the farm?", hilfe:"Wie findet Isla das Leben auf dem Hof?", richtig:"It's hard work, but she loves it.", falsch:["She wants to live in a city.","She thinks it's boring.","She doesn't like the animals."] }
  ]},

/* ---------- Stufe 2: Zusammenhänge verstehen ---------- */
{ id:"e2h-aquarium", stufe:2, titel:"At the aquarium", art:"Conversation", thema:"Unit 2 · Animals",
  situation:"Amy ist mit ihrer Klasse im Aquarium. Ein Guide zeigt ihnen eine grosse Meeresschildkröte.",
  rollen:{ G:{name:"Guide", stimme:"mann"}, A:{name:"Amy", stimme:"maedchen"} },
  teile:[
    ["G","Welcome to the turtle tank! This is Ollie. He's a green sea turtle, and he's about forty years old."],
    ["A","Forty? That's older than my mum!"],
    ["G","Sea turtles can live for more than fifty years. Look, Ollie is swimming up to the top now. Do you know why?"],
    ["A","Is he hungry?"],
    ["G","No, he needs to breathe. Sea turtles breathe air, like us. But they can stay under water for a long time."],
    ["A","Where do baby turtles come from?"],
    ["G","The females swim back to the beach where they were born. At night, they dig a hole in the sand and lay about one hundred eggs. After about two months, the babies come out of the eggs and run to the sea."],
    ["A","All alone? Without their mum?"],
    ["G","Yes. And it's dangerous. Birds and crabs eat a lot of the babies. Only a few of them survive."],
    ["A","Oh, poor little turtles! And what does Ollie eat?"],
    ["G","Green sea turtles feed on sea grass and algae. Now, follow me to the next tank. The sharks are waiting!"],
    ["A","Sharks? Cool!"]
  ],
  woerter:[["sea turtle","Meeresschildkröte"],["tank","Becken"],["dig a hole","ein Loch graben"],["crabs","Krebse"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How old is Ollie?", hilfe:"Wie alt ist Ollie?", richtig:"about forty years old", falsch:["about fourteen years old","about four years old","more than fifty years old"] },
    { typ:"mc", art:"finden", frage:"Why does Ollie swim up to the top?", hilfe:"Warum schwimmt Ollie nach oben?", richtig:"He needs to breathe air.", falsch:["He is hungry.","He wants to see Amy.","He is looking for the sharks."] },
    { typ:"ordnen", art:"verbinden", frage:"How do baby turtles come into the world? Put it in order.", hilfe:"Bring die Schritte in die richtige Reihenfolge.", items:["The female swims back to the beach where she was born.","She digs a hole in the sand.","She lays about one hundred eggs.","After two months, the babies come out.","The babies run to the sea."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The baby turtles are alone when they come out of the eggs.","True"],["All baby turtles survive.","False"],["Ollie comes from Australia.","Not said"]] },
    { typ:"kurz", art:"finden", frage:"What does Ollie eat? Write one thing.", hilfe:"Was frisst Ollie? Ein Ding genügt.", loesung:["sea grass","algae","seagrass"] },
    { typ:"mc", art:"schliessen", frage:"How does Amy feel at the end?", hilfe:"Wie fühlt sich Amy am Schluss?", richtig:"She's excited about the sharks.", falsch:["She's scared of the sharks.","She's sad because she has to go.","She's bored."] }
  ]},

{ id:"e2h-quiz", stufe:2, titel:"Animal Quiz Time", art:"Radio quiz", thema:"Unit 2 · Animal facts",
  situation:"Lily spielt bei einem Tier-Quiz im Radio mit. Es gibt fünf Fragen. Für jede richtige Antwort gibt es einen Punkt.",
  rollen:{ H:{name:"Quiz host", stimme:"mann"}, L:{name:"Lily", stimme:"maedchen"} },
  teile:[
    ["H","Welcome to Animal Quiz Time! Our player today is Lily from Bristol. Hi, Lily!"],
    ["L","Hi!"],
    ["H","Five questions, five points. Ready? Question one: Which animal is the biggest animal on Earth?"],
    ["L","That's easy. The blue whale!"],
    ["H","Correct! One point. A blue whale can be thirty metres long. Question two: How many kinds of beetles are there in the world? About three hundred, about three thousand, or more than three hundred thousand?"],
    ["L","Hmm … I think more than three hundred thousand."],
    ["H","Yes, that's right! There are more kinds of beetles than any other kind of animal. Two points. Question three: What does a jellyfish not have? A brain, a heart, or both?"],
    ["L","Er … a brain?"],
    ["H","Oh, sorry, Lily. The answer is both. A jellyfish has no brain and no heart! Question four: Golden eagles have amazing eyes. From how far away can an eagle see a rabbit? From three hundred metres, or from three kilometres?"],
    ["L","From three kilometres!"],
    ["H","Right! Three points. And the last question: Do all sharks lay eggs?"],
    ["L","No. Some sharks lay eggs, and other sharks give birth to live babies."],
    ["H","Excellent! That's four points out of five. Well done, Lily! You win a book about wild animals."],
    ["L","Thank you! I love animal books!"]
  ],
  woerter:[["beetle","Käfer"],["jellyfish","Qualle"],["golden eagle","Steinadler"],["give birth","zur Welt bringen"]],
  fragen:[
    { typ:"kurz", art:"verbinden", frage:"How many points does Lily get?", hilfe:"Wie viele Punkte bekommt Lily? Schreib die Zahl.", loesung:["four","4","4 points","four points"] },
    { typ:"mc", art:"verbinden", frage:"Which question does Lily get wrong?", hilfe:"Bei welcher Frage liegt Lily falsch?", richtig:"the question about the jellyfish", falsch:["the question about the blue whale","the question about the beetles","the question about the sharks"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["A blue whale can be thirty metres long.","True"],["A jellyfish has a heart but no brain.","False"],["There are more kinds of beetles than any other kind of animal.","True"],["Lily has a pet rabbit.","Not said"]] },
    { typ:"mc", art:"finden", frage:"From how far away can a golden eagle see a rabbit?", hilfe:"Aus welcher Entfernung sieht ein Steinadler ein Kaninchen?", richtig:"from three kilometres", falsch:["from three hundred metres","from thirty metres","from thirty kilometres"] },
    { typ:"mc", art:"finden", frage:"What does Lily win?", hilfe:"Was gewinnt Lily?", richtig:"a book about wild animals", falsch:["a trip to the zoo","a toy whale","a ticket for an aquarium"] },
    { typ:"mc", art:"schliessen", frage:"How does Lily feel about her prize?", hilfe:"Wie findet Lily ihren Preis?", richtig:"She's happy because she loves animal books.", falsch:["She's disappointed.","She wanted a different prize.","She doesn't care."] }
  ]},

{ id:"eh2-factory", stufe:2, titel:"A visit to a chocolate factory", art:"Guided tour", thema:"Unit 5 · Chocolate",
  situation:"Emma ist mit ihrer Klasse in einer Schokoladenfabrik. Die Führerin erklärt, wie aus Kakaobohnen Schokolade wird.",
  rollen:{ G:{name:"Guide", stimme:"frau"}, E:{name:"Emma", stimme:"maedchen"} },
  teile:[
    ["G","Welcome to our chocolate factory! Our cocoa beans come from Ghana and Ecuador. They travel to Europe by ship. At the port we put them on trucks, and the trucks bring them here."],
    ["E","What do you do with the beans first?"],
    ["G","First, we clean the beans and roast them in a big oven. That gives the chocolate its flavour. Then we break the beans into small pieces and grind them. After that, they turn into a thick brown mixture. We call it cocoa mass."],
    ["E","And where does the sugar come in?"],
    ["G","Good question! Now we add sugar and milk powder. Then a machine stirs the mixture for many hours. This makes the chocolate very smooth. Finally, we pour the chocolate into moulds and let it cool down. And then the chocolate bars get their wrappers."],
    ["E","Can we taste it now?"],
    ["G","Of course! But only one piece each, please!"]
  ],
  woerter:[["roast","rösten"],["grind","mahlen"],["stir","rühren"],["mould","Form"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How do the cocoa beans travel to Europe?", hilfe:"Wie kommen die Kakaobohnen nach Europa?", richtig:"by ship", falsch:["by plane","by train","by truck"] },
    { typ:"ordnen", art:"verbinden", frage:"How is chocolate made? Put the steps in order.", hilfe:"Bring die Schritte in die richtige Reihenfolge.", items:["They clean and roast the beans.","They break and grind the beans.","They add sugar and milk powder.","A machine stirs the mixture for hours.","They pour the chocolate into moulds."] },
    { typ:"mc", art:"verbinden", frage:"Why does the machine stir the chocolate for many hours?", hilfe:"Warum rührt die Maschine so lange?", richtig:"to make the chocolate very smooth", falsch:["to make the chocolate cold","to make the chocolate sweeter","to make the chocolate darker"] },
    { typ:"kurz", art:"wortschatz", frage:"What do they call the thick brown mixture?", hilfe:"Wie heisst die dicke braune Masse?", loesung:["cocoa mass","cocoa"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The beans come from Ghana and Ecuador.","True"],["The children can eat as much chocolate as they want.","False"],["The factory has two hundred workers.","Not said"]] }
  ]},

/* ---------- Stufe 3: Zwischen den Zeilen hören ---------- */
{ id:"eh3-grandpa", stufe:3, titel:"Grandpa's school days", art:"Conversation", thema:"Unit 3 · Yesterday and today",
  situation:"Ella macht ein Englischprojekt über die Schule früher. Sie fragt ihren Grossvater.",
  rollen:{ E:{name:"Ella", stimme:"maedchen"}, G:{name:"Grandpa", stimme:"mann2"} },
  teile:[
    ["E","Grandpa, for my English project I need to find out about schools in the past. What was your school like?"],
    ["G","Oh, it was very different! I went to a small school in a village. There were only two classrooms and forty children."],
    ["E","Forty? In one class?"],
    ["G","No, no. Twenty in each room. But in my room there were children from six to nine years old, all together with one teacher."],
    ["E","Did you have computers?"],
    ["G","Computers? No! We wrote on small blackboards with chalk. Paper was expensive, so we only used exercise books for important things."],
    ["E","And how did you get to school?"],
    ["G","I walked. Three kilometres there and three kilometres back, every day. In winter, the snow was sometimes so deep that we came home with wet feet."],
    ["E","That sounds hard. Did you like school?"],
    ["G","Hmm … not always. The teacher was very strict. If you talked in class, you had to stand in the corner. But I loved the stories she read to us on Friday afternoons. I still remember some of them!"],
    ["E","Thanks, Grandpa! I think I'm happy with my school today."],
    ["G","I think so too!"]
  ],
  woerter:[["blackboard","Wandtafel"],["chalk","Kreide"],["strict","streng"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How many children were in Grandpa's room?", hilfe:"Wie viele Kinder waren in Grossvaters Schulzimmer?", richtig:"twenty", falsch:["forty","nine","six"] },
    { typ:"mc", art:"finden", frage:"What did the children write on?", hilfe:"Worauf schrieben die Kinder?", richtig:"small blackboards", falsch:["computers","big sheets of paper","tablets"] },
    { typ:"tf", art:"verbinden", frage:"True, false or not said?", aussagen:[["Grandpa walked three kilometres to school.","True"],["All the children in Grandpa's room were the same age.","False"],["Grandpa's teacher was a man.","False"],["Grandpa had a bike.","Not said"]] },
    { typ:"mc", art:"schliessen", frage:"What did Grandpa like most about school?", hilfe:"Was mochte Grossvater an der Schule am meisten?", richtig:"the stories on Friday afternoons", falsch:["standing in the corner","walking in the snow","the strict teacher"] },
    { typ:"mc", art:"schliessen", frage:"Ella says: «I think I'm happy with my school today.» What does she mean?", hilfe:"Was meint Ella damit?", richtig:"Her school today is easier and nicer than Grandpa's school.", falsch:["She wants to go to Grandpa's old school.","She doesn't like her teacher.","She wants to write on blackboards."] },
    { typ:"mc", art:"ganz", frage:"What is the conversation mainly about?", hilfe:"Worum geht es im Gespräch vor allem?", richtig:"what school was like in the past", falsch:["how to walk in the snow","Grandpa's favourite stories","Ella's English teacher"] }
  ]},

{ id:"eh3-alps", stufe:3, titel:"Hiking in the Alps", art:"Radio interview", thema:"Unit 4 · The Alps",
  situation:"In einer Reisesendung im Radio spricht die Moderatorin mit Marco. Er ist Bergführer in Grindelwald.",
  rollen:{ P:{name:"Presenter", stimme:"erzaehlerin"}, M:{name:"Marco", stimme:"mann"} },
  teile:[
    ["P","Today on Travel Time I'm talking to Marco. He is a mountain guide in Grindelwald, in Switzerland. Marco, what do people love about the Alps?"],
    ["M","Oh, lots of things! The mountains, the lakes, the fresh air. And the cows with their big bells! Many tourists say the Alps look like a postcard."],
    ["P","What's the best time for hiking?"],
    ["M","Most people come in July and August. But my favourite time is September. There are fewer people on the paths, and the colours are beautiful."],
    ["P","What should hikers bring?"],
    ["M","Good shoes, a rain jacket, enough water and something to eat. And sun cream! The sun is very strong up in the mountains."],
    ["P","Is hiking in the mountains dangerous?"],
    ["M","It can be. The weather changes very fast. On hot summer days there are often thunderstorms in the afternoon. That's why I always tell my groups: start early in the morning. Then you're back before the storm comes."],
    ["P","One last question: what's your favourite mountain?"],
    ["M","That's easy. The Eiger. I can see it from my kitchen window every morning, and it still makes me happy."]
  ],
  woerter:[["mountain guide","Bergführer"],["hikers","Wandernde"],["thunderstorm","Gewitter"],["sun cream","Sonnencreme"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where does Marco work?", hilfe:"Wo arbeitet Marco?", richtig:"in Grindelwald in Switzerland", falsch:["in Zermatt in Switzerland","in Austria","in Italy"] },
    { typ:"mc", art:"verbinden", frage:"Why is September Marco's favourite time?", hilfe:"Warum mag Marco den September am liebsten?", richtig:"There are fewer people and the colours are beautiful.", falsch:["It is the hottest month.","There are no thunderstorms.","The cows come down from the mountains."] },
    { typ:"multi", art:"finden", frage:"What should hikers bring?", hilfe:"Was sollen Wandernde mitnehmen? Es können mehrere Antworten stimmen.", richtig:["a rain jacket","water","sun cream"], falsch:["a tent","a big camera","a map of London"] },
    { typ:"mc", art:"verbinden", frage:"Why should hikers start early in the morning?", hilfe:"Warum soll man früh am Morgen losgehen?", richtig:"So they are back before the afternoon thunderstorms.", falsch:["Because the paths are closed in the afternoon.","Because it is too hot in the morning.","Because the cows need the paths in the afternoon."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["Marco says the weather in the mountains changes very fast.","True"],["Most people come to the Alps in winter.","False"],["Marco has climbed the Eiger ten times.","Not said"]] },
    { typ:"mc", art:"schliessen", frage:"How does Marco feel when he sees the Eiger every morning?", hilfe:"Wie fühlt sich Marco, wenn er jeden Morgen den Eiger sieht?", richtig:"Happy – he still loves the view.", falsch:["Bored – he has seen it too often.","Scared – he thinks it is dangerous.","Sad – he wants to live in a city."] }
  ]},

{ id:"eh3-fairtrade", stufe:3, titel:"Is fair trade worth it?", art:"Radio interview", thema:"Unit 5 · Fair trade",
  situation:"In einer Radiosendung spricht die Moderatorin mit Ruth. Sie hat einen kleinen Laden und verkauft nur Fairtrade-Schokolade.",
  rollen:{ P:{name:"Presenter", stimme:"erzaehlerin"}, R:{name:"Ruth", stimme:"frau"} },
  teile:[
    ["P","Ruth, in your shop you only sell fair trade chocolate. Why?"],
    ["R","A few years ago I saw a film about cocoa farms in West Africa. Many farmers there work very hard, but they get very little money for their beans. Some children have to work on the farms and can't go to school. After the film I couldn't sleep. I knew I had to do something."],
    ["P","What is different with fair trade?"],
    ["R","The farmers get a fair price for their cocoa. They also get extra money for their village, for example for a school or for clean water. And children must not do hard work on the farms. They go to school."],
    ["P","But fair trade chocolate is more expensive, isn't it?"],
    ["R","Yes, a little. Some customers say: «Why should I pay more?» Then I let them taste it. Most of them come back the next week. I think when you know the story behind your chocolate, it tastes even better."],
    ["P","Thank you, Ruth."]
  ],
  woerter:[["fair price","gerechter Preis"],["customers","Kundinnen und Kunden"],["must not","dürfen nicht"]],
  fragen:[
    { typ:"mc", art:"verbinden", frage:"Why did Ruth start to sell fair trade chocolate?", hilfe:"Warum verkauft Ruth Fairtrade-Schokolade?", richtig:"She saw a film about cocoa farms and wanted to help.", falsch:["Fair trade chocolate is cheaper for her.","Her customers asked for it.","She has a cocoa farm in West Africa."] },
    { typ:"mc", art:"schliessen", frage:"Ruth says: «After the film I couldn't sleep.» What does this show?", hilfe:"Was zeigt dieser Satz?", richtig:"The film made her very sad and worried.", falsch:["The film was very long.","She drank too much coffee.","She was excited about her new shop."] },
    { typ:"multi", art:"finden", frage:"What does fair trade do for the farmers?", hilfe:"Was bringt Fairtrade den Bauernfamilien? Es können mehrere Antworten stimmen.", richtig:["They get a fair price for their cocoa.","They get extra money for their village.","Children must not do hard work on the farms."], falsch:["They get a new truck.","They get free chocolate.","They can sell their beans in Ruth's shop."] },
    { typ:"tf", art:"ganz", frage:"Fact or opinion?", hilfe:"Tatsache (fact) oder Meinung (opinion)?", wahl:["Fact","Opinion"], aussagen:[["Fair trade chocolate is a little more expensive.","Fact"],["When you know the story behind your chocolate, it tastes even better.","Opinion"],["The farmers get extra money for their village.","Fact"]] },
    { typ:"mc", art:"schliessen", frage:"Why do most customers come back the next week?", hilfe:"Warum kommen die meisten Kundinnen und Kunden wieder?", richtig:"They liked the taste of the chocolate.", falsch:["The chocolate was cheaper the next week.","Ruth gave them money back.","They had to bring back the wrapper."] }
  ]}
];
