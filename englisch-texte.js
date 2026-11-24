/* =====================================================================
   Englisch – Hörtexte zu Young World 4 (Lernportal 6b, 6. Klasse)
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
   Hörtexte nach Stufen 1–3 (stufe); in jeder Stufe kommen alle fünf Units vor (unit – nur zur Übersicht,
   die Kinder sehen keine Unit). Die Lesetexte liegen in englisch-lesetexte.js (zurzeit nicht im Portal).
   ===================================================================== */
/* Klassenstufen: 6. Klasse = Young World 4 (aktuell), 5. Klasse = Young World 3, 4. Klasse = Young World 2 (Repetition) */
const EN_UNITS = {1:"The way we live", 2:"Fascinating animal facts", 3:"Yesterday and today", 4:"The call of the Alps", 5:"The story of chocolate"};

const EN_STIMMEN = {
  erzaehlerin: "en-GB-SoniaNeural",
  frau:        "en-GB-LibbyNeural",
  mann:        "en-GB-RyanNeural",
  maedchen:    "en-GB-MaisieNeural",
  mann2:       "en-GB-ThomasNeural"
};

/* ============================== Listening ==============================
   Hörverstehen: NICHT nach Units, sondern über alles – Stufen 1–3 wie im Hörverstehen Deutsch.
   In JEDER Stufe kommen alle fünf Units vor (Feld unit): Frühstück und Nachhaltigkeit (U1), Tierfakten und
   Migration (U2), früher und heute (U3), Alpen (U4), Schokolade (U5).
   Situation auf Deutsch, damit die Kinder wissen, worum es geht. */
const EN_HOERTEXTE = [

/* ---------- Stufe 1: Genau zuhören ---------- */
{ id:"eh1-breakfast", stufe:1, unit:1, titel:"My breakfast", art:"Podcast", thema:"Breakfast",
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

{ id:"e1h-farm", stufe:1, unit:1, titel:"Isla's day on the farm", art:"Podcast", thema:"Daily routine",
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

{ id:"eh1-cheetah", stufe:1, unit:2, titel:"The fastest animal on land", art:"Podcast", thema:"Animal facts",
  situation:"Mia stellt in einem Kinder-Podcast ihr Lieblingstier vor.",
  rollen:{ M:{name:"Mia", stimme:"maedchen"} },
  teile:[
    ["M","Hi, I'm Mia, and this is my favourite animal: the cheetah! Cheetahs live in Africa, in dry grassland."],
    ["M","The cheetah is the fastest animal on land. It can run about one hundred kilometres per hour. That's as fast as a car on the motorway! But it can only run so fast for about thirty seconds. Then it's tired and has to rest."],
    ["M","A cheetah isn't very big. It weighs about fifty kilograms. It has black spots on its yellow fur and a long tail. The tail helps it to turn quickly when it runs."],
    ["M","A cheetah mother usually has three to five babies. The babies are called cubs. In the wild, cheetahs can live for about twelve years. I hope I can see a real cheetah one day!"]
  ],
  woerter:[["grassland","Grasland, Steppe"],["fur","Fell"],["spots","Flecken"],["cubs","Junge (bei Raubkatzen)"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where do cheetahs live?", hilfe:"Wo leben Geparden?", richtig:"in Africa", falsch:["in South America","in Australia","in the Arctic"] },
    { typ:"mc", art:"finden", frage:"How fast can a cheetah run?", hilfe:"Wie schnell kann ein Gepard rennen?", richtig:"about one hundred kilometres per hour", falsch:["about fifty kilometres per hour","about thirty kilometres per hour","about two hundred kilometres per hour"] },
    { typ:"kurz", art:"finden", frage:"How long can a cheetah run so fast?", hilfe:"Wie lange kann ein Gepard so schnell rennen?", loesung:["about thirty seconds","thirty seconds","30 seconds","30","30 sec","thirty"] },
    { typ:"mc", art:"verbinden", frage:"What helps the cheetah to turn quickly?", hilfe:"Was hilft dem Gepard, schnell die Richtung zu wechseln?", richtig:"its long tail", falsch:["its black spots","its small head","its yellow fur"] },
    { typ:"mc", art:"finden", frage:"How many babies does a cheetah mother usually have?", hilfe:"Wie viele Junge hat eine Gepardenmutter meistens?", richtig:"three to five", falsch:["one or two","six to eight","about ten"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["A cheetah weighs about fifty kilograms.","True"],["Baby cheetahs are called puppies.","False"],["Cheetahs hunt only at night.","Not said"]] }
  ]},

{ id:"eh1-museum", stufe:1, unit:3, titel:"A day at the Transport Museum", art:"Podcast", thema:"Then and now",
  situation:"Sophie erzählt, was sie am Samstag im Verkehrshaus in Luzern erlebt hat.",
  rollen:{ S:{name:"Sophie", stimme:"maedchen"} },
  teile:[
    ["S","Last Saturday I went to the Swiss Museum of Transport in Lucerne with my family. We took the train from Zurich, and the journey took about one hour."],
    ["S","First we looked at the old trains. The first railway in Switzerland opened in 1847. It went from Zurich to Baden. People called it the «Spanish Bun Railway», because it brought fresh buns from Baden to Zurich."],
    ["S","Then we visited the hall with old cars and planes. My little brother sat in a real old plane. He didn't want to get out!"],
    ["S","After lunch we watched a film about space in the planetarium. That was my favourite part. We went home at five o'clock. I was very tired, but it was a great day."]
  ],
  woerter:[["transport","Verkehr"],["railway","Eisenbahn"],["buns","Brötchen"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How did Sophie's family travel to Lucerne?", hilfe:"Wie reiste die Familie nach Luzern?", richtig:"by train", falsch:["by car","by bus","by boat"] },
    { typ:"kurz", art:"finden", frage:"In which year did the first railway in Switzerland open?", hilfe:"Schreib die Jahreszahl.", loesung:["1847","eighteen forty-seven","eighteen forty seven"] },
    { typ:"mc", art:"finden", frage:"Where did the first railway go?", hilfe:"Wohin fuhr die erste Eisenbahn?", richtig:"from Zurich to Baden", falsch:["from Zurich to Lucerne","from Baden to Bern","from Lucerne to Zurich"] },
    { typ:"ordnen", art:"verbinden", frage:"Put Sophie's day in the right order.", hilfe:"Bring Sophies Tag in die richtige Reihenfolge.", items:["They looked at the old trains.","They visited the hall with old cars and planes.","They had lunch.","They watched a film in the planetarium.","They went home."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["Sophie's brother sat in an old plane.","True"],["Sophie's favourite part was the old trains.","False"],["Sophie bought a toy train.","Not said"]] }
  ]},

{ id:"eh1-cablecar", stufe:1, unit:4, titel:"At the cable car", art:"Announcement", thema:"The Alps",
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

{ id:"eh1-strawberries", stufe:1, unit:5, titel:"Chocolate strawberries", art:"Cooking podcast", thema:"A chocolate recipe",
  situation:"In einem Kochpodcast für Kinder erklärt Koch Tom, wie man Schokoladen-Erdbeeren macht.",
  rollen:{ T:{name:"Chef Tom", stimme:"mann"} },
  teile:[
    ["T","Hello and welcome to Kids in the Kitchen! Today we're making chocolate strawberries. They're perfect for a party or as a birthday present."],
    ["T","You need twelve big strawberries, one hundred grams of dark chocolate and some baking paper."],
    ["T","First, wash the strawberries and dry them well. Then break the chocolate into small pieces and put it in a bowl. Melt it over a pan of hot water. Be careful: the bowl gets hot!"],
    ["T","After that, hold a strawberry by its green leaves and dip it into the chocolate. Put it on the baking paper. Do the same with all the other strawberries."],
    ["T","Finally, put them in the fridge for thirty minutes. Then they're ready. Enjoy!"]
  ],
  woerter:[["dry","trocknen"],["melt","schmelzen"],["dip","eintauchen"],["baking paper","Backpapier"]],
  fragen:[
    { typ:"kurz", art:"finden", frage:"How many strawberries do you need?", hilfe:"Schreib die Zahl.", loesung:["twelve","12","12 strawberries","twelve strawberries"] },
    { typ:"mc", art:"finden", frage:"How much chocolate do you need?", hilfe:"Wie viel Schokolade braucht man?", richtig:"one hundred grams", falsch:["two hundred grams","fifty grams","one kilogram"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the steps in the right order.", hilfe:"Bring die Schritte in die richtige Reihenfolge.", items:["Wash and dry the strawberries.","Melt the chocolate.","Dip the strawberries into the chocolate.","Put them in the fridge."] },
    { typ:"mc", art:"finden", frage:"How long do the strawberries stay in the fridge?", hilfe:"Wie lange kommen die Erdbeeren in den Kühlschrank?", richtig:"thirty minutes", falsch:["three minutes","thirteen minutes","three hours"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["You hold the strawberry by its green leaves.","True"],["You need milk chocolate.","False"],["You can also use bananas.","Not said"]] }
  ]},


/* ---------- Stufe 2: Zusammenhänge verstehen ---------- */
{ id:"eh2-market", stufe:2, unit:1, titel:"At the market", art:"Conversation", thema:"Shopping without plastic",
  situation:"Anna geht mit ihrer Grossmutter am Samstag auf den Markt. Sie wollen einkaufen, ohne Plastik zu brauchen.",
  rollen:{ G:{name:"Grandma", stimme:"frau"}, A:{name:"Anna", stimme:"maedchen"}, S:{name:"Market seller", stimme:"mann"} },
  teile:[
    ["G","Here we are, Anna. Have you got the shopping list?"],
    ["A","Yes. Eggs, cheese, apples and bread. And Grandma, I've got our cloth bags too."],
    ["G","Well done. No plastic bags today!"],
    ["S","Good morning! What can I get you?"],
    ["G","Good morning. Six eggs, please, and two hundred grams of mountain cheese."],
    ["S","Here you are. Anything else?"],
    ["A","How much are the apples?"],
    ["S","Three francs a kilo. They're from a farm near here."],
    ["G","Then we'll take two kilos, please. Anna loves apple cake."],
    ["A","Grandma, we haven't got any bread."],
    ["S","Sorry, I don't sell bread. But the bakery stand over there has lovely bread."],
    ["G","Thank you. How much is that altogether?"],
    ["S","Six eggs, the cheese and two kilos of apples … that's fifteen francs, please."],
    ["G","Here's twenty."],
    ["S","And five francs change. Thank you, and have a nice weekend!"]
  ],
  woerter:[["cloth bags","Stofftaschen"],["mountain cheese","Bergkäse"],["altogether","insgesamt"],["change","Rückgeld"]],
  fragen:[
    { typ:"multi", art:"finden", frage:"What do they buy from the market seller?", hilfe:"Was kaufen sie beim Mann am Marktstand? Es können mehrere Antworten stimmen.", richtig:["six eggs","mountain cheese","two kilos of apples"], falsch:["bread","milk","a plastic bag"] },
    { typ:"mc", art:"verbinden", frage:"Why don't they need plastic bags?", hilfe:"Warum brauchen sie keine Plastiksäcke?", richtig:"Anna has brought cloth bags.", falsch:["The seller gives them a box.","They only buy a few things.","Grandma has a basket."] },
    { typ:"mc", art:"verbinden", frage:"Why does Grandma buy two kilos of apples?", hilfe:"Warum kauft die Grossmutter zwei Kilo Äpfel?", richtig:"Anna loves apple cake.", falsch:["They are very cheap.","Grandma wants to make juice.","The seller says they are healthy."] },
    { typ:"kurz", art:"verbinden", frage:"How much do they pay altogether?", hilfe:"Wie viel kostet alles zusammen? Schreib die Zahl.", loesung:["fifteen francs","15 francs","15","fifteen","15 chf","chf 15","15 fr"] },
    { typ:"mc", art:"verbinden", frage:"Where can they get bread?", hilfe:"Wo bekommen sie Brot?", richtig:"at the bakery stand", falsch:["from the same seller","at the supermarket","at Grandma's house"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The apples come from a farm near the market.","True"],["Grandma pays with a ten-franc note.","False"],["Anna's mum is at home.","Not said"]] }
  ]},

{ id:"e2h-aquarium", stufe:2, unit:2, titel:"At the aquarium", art:"Conversation", thema:"Animals",
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

{ id:"e2h-quiz", stufe:2, unit:2, titel:"Animal Quiz Time", art:"Radio quiz", thema:"Animal facts",
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

{ id:"eh2-phone", stufe:2, unit:3, titel:"Mum's first mobile phone", art:"Conversation", thema:"Then and now",
  situation:"Maya findet in einer Schublade ein altes Handy. Ihre Mutter erzählt, wie das früher war.",
  rollen:{ Y:{name:"Maya", stimme:"maedchen"}, M:{name:"Mum", stimme:"frau"} },
  teile:[
    ["Y","Mum, what's this? It looks like a toy phone!"],
    ["M","Ha! That's my first mobile phone. I got it in 2001, when I was fourteen."],
    ["Y","It's so small! And where is the screen?"],
    ["M","That little window is the screen. It was black and green. There were no colours."],
    ["Y","Could you take photos with it?"],
    ["M","No, it didn't have a camera. And there was no internet on it. I could only make calls and send text messages."],
    ["Y","Only that? What did you do on the bus?"],
    ["M","I played a game called Snake. A little snake ate dots and got longer and longer. I loved it!"],
    ["Y","And did you send lots of messages?"],
    ["M","Not really. Every message cost money, and a message could only have 160 letters. So we wrote very short messages, like «C U L8R». That means «see you later»."],
    ["Y","That's funny. But I think my phone is much better."],
    ["M","Maybe. But my old phone had one big advantage: the battery lasted a whole week!"]
  ],
  woerter:[["screen","Bildschirm"],["dots","Punkte"],["advantage","Vorteil"],["battery","Akku"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How old was Maya's mum when she got her first mobile?", hilfe:"Wie alt war die Mutter bei ihrem ersten Handy?", richtig:"fourteen", falsch:["forty","four","eleven"] },
    { typ:"multi", art:"verbinden", frage:"What couldn't Mum do with her old phone?", hilfe:"Was konnte die Mutter mit dem alten Handy NICHT machen? Es können mehrere Antworten stimmen.", richtig:["take photos","go on the internet"], falsch:["make calls","send text messages","play Snake"] },
    { typ:"mc", art:"verbinden", frage:"Why did Mum write very short messages?", hilfe:"Warum schrieb die Mutter so kurze Nachrichten?", richtig:"Messages cost money and could only have 160 letters.", falsch:["She didn't like writing.","She wrote only to her mum.","Her friends couldn't read long messages."] },
    { typ:"kurz", art:"wortschatz", frage:"What does «C U L8R» mean?", hilfe:"Was bedeutet «C U L8R»? Schreib es auf Englisch.", loesung:["see you later"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The screen was black and green.","True"],["Mum's phone had a camera.","False"],["Mum still uses her old phone.","Not said"]] },
    { typ:"mc", art:"schliessen", frage:"What does Mum like better about her old phone?", hilfe:"Was findet die Mutter am alten Handy besser?", richtig:"The battery lasted a long time.", falsch:["It had better games.","It was cheaper.","It had a bigger screen."] }
  ]},

{ id:"eh2-rental", stufe:2, unit:4, titel:"At the rental shop", art:"Conversation", thema:"Winter holidays",
  situation:"Familie Keller ist in den Skiferien. Am ersten Morgen mieten Vater und Tochter im Sportgeschäft die Ausrüstung.",
  rollen:{ A:{name:"Shop assistant", stimme:"mann"}, D:{name:"Dad", stimme:"mann2"}, L:{name:"Lara", stimme:"maedchen"} },
  teile:[
    ["A","Good morning! How can I help you?"],
    ["D","Good morning. We'd like to rent some things for three days. I need skis and ski boots."],
    ["A","No problem. Skis and boots are thirty-five francs a day. What size are your shoes?"],
    ["D","Forty-four."],
    ["A","Here you are. And for the young lady?"],
    ["L","I'd like a snowboard, please. I tried it last winter and I loved it."],
    ["A","A snowboard and boots for children are twenty francs a day. And you need a helmet."],
    ["L","Oh no, I forgot my helmet at home!"],
    ["A","Don't worry. Helmets for children are free."],
    ["D","Great. My son Nico is still at the hotel. He's got a cold, so he wants to stay in bed this morning. In the afternoon he'd like to go tobogganing. Can we rent a sledge?"],
    ["A","Of course. A sledge is ten francs for the afternoon. The toboggan run starts at the top of the chairlift."],
    ["D","Perfect. Thank you!"]
  ],
  woerter:[["rent","mieten"],["size","Grösse"],["helmet","Helm"],["sledge","Schlitten"],["chairlift","Sessellift"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"For how long do they want to rent the things?", hilfe:"Für wie lange wollen sie mieten?", richtig:"for three days", falsch:["for one day","for a week","for the afternoon"] },
    { typ:"tf", art:"verbinden", frage:"Who is it?", hilfe:"Wer ist das?", wahl:["Dad","Lara","Nico"], aussagen:[["needs skis and ski boots","Dad"],["wants a snowboard","Lara"],["forgot the helmet at home","Lara"],["has got a cold","Nico"]] },
    { typ:"mc", art:"verbinden", frage:"Why doesn't Lara have to pay for a helmet?", hilfe:"Warum muss Lara den Helm nicht bezahlen?", richtig:"Helmets for children are free.", falsch:["She has her own helmet.","Her dad has a helmet for her.","You don't need a helmet for snowboarding."] },
    { typ:"kurz", art:"verbinden", frage:"How much does Lara's snowboard cost for three days?", hilfe:"Wie viel kostet Laras Snowboard für drei Tage? Schreib die Zahl.", loesung:["60","sixty","60 francs","sixty francs","60 chf","chf 60","60 fr"] },
    { typ:"mc", art:"verbinden", frage:"Why is Nico still at the hotel?", hilfe:"Warum ist Nico noch im Hotel?", richtig:"He has got a cold.", falsch:["He doesn't like skiing.","He is still having breakfast.","He is too young for the shop."] },
    { typ:"mc", art:"finden", frage:"Where does the toboggan run start?", hilfe:"Wo beginnt die Schlittelbahn?", richtig:"at the top of the chairlift", falsch:["next to the hotel","at the rental shop","in the village"] }
  ]},

{ id:"eh2-factory", stufe:2, unit:5, titel:"A visit to a chocolate factory", art:"Guided tour", thema:"Chocolate",
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
{ id:"eh3-canteen", stufe:3, unit:1, titel:"Food in the bin", art:"School radio", thema:"Food waste",
  situation:"Für das Schulradio interviewt Sara die Köchin der Schulmensa. Es geht um Essen, das im Abfall landet.",
  rollen:{ R:{name:"Sara", stimme:"maedchen"}, C:{name:"Mrs Meier", stimme:"frau"} },
  teile:[
    ["R","Hello and welcome to School Radio. Today I'm in the school canteen with Mrs Meier, our cook. Mrs Meier, how much food do you throw away every day?"],
    ["C","Too much! On a normal day it's about fifteen kilograms. That's a whole big pot of food."],
    ["R","Wow. Why is it so much?"],
    ["C","Many children take a big portion, and then they eat only half of it. And some children don't even try the vegetables. They just look at them and say «Yuck»."],
    ["R","Er … I sometimes do that too."],
    ["C","I know, Sara. I've seen you."],
    ["R","Oops. So what can we do?"],
    ["C","We have a new idea. From next Monday, everybody gets a small portion first. If you're still hungry, you can come back and get more. And on Fridays, the children can choose the menu for the next week."],
    ["R","That sounds good. Do you think it will work?"],
    ["C","I hope so. At my last school we did the same thing, and after one month we only threw away five kilograms a day."],
    ["R","Thank you, Mrs Meier. And I promise: I'll try the vegetables!"],
    ["C","I'll believe it when I see it!"]
  ],
  woerter:[["canteen","Mensa"],["throw away","wegwerfen"],["portion","Portion"],["promise","versprechen"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How much food does the canteen throw away on a normal day?", hilfe:"Wie viel Essen wirft die Mensa an einem normalen Tag weg?", richtig:"about fifteen kilograms", falsch:["about five kilograms","about fifty kilograms","about one kilogram"] },
    { typ:"multi", art:"verbinden", frage:"Why do they throw away so much food?", hilfe:"Warum landet so viel Essen im Abfall? Es können mehrere Antworten stimmen.", richtig:["Children take big portions and eat only half.","Some children don't try the vegetables."], falsch:["The food is too old.","The cook makes too much dessert.","The canteen is closed on Fridays."] },
    { typ:"mc", art:"schliessen", frage:"Mrs Meier says: «I know, Sara. I've seen you.» What does she mean?", hilfe:"Was meint die Köchin damit?", richtig:"She has seen Sara leave her vegetables.", falsch:["She has seen Sara on TV.","She knows that Sara is a good cook.","She saw Sara at her last school."] },
    { typ:"mc", art:"verbinden", frage:"What is the new idea?", hilfe:"Was ist die neue Idee?", richtig:"Everybody gets a small portion first and can get more later.", falsch:["Everybody must eat all the vegetables.","There is no lunch on Fridays.","The children cook their own lunch."] },
    { typ:"tf", art:"ganz", frage:"Fact or opinion?", hilfe:"Tatsache (fact) oder Meinung (opinion)?", wahl:["Fact","Opinion"], aussagen:[["From next Monday, everybody gets a small portion first.","Fact"],["The new idea sounds good.","Opinion"],["On Fridays the children can choose the menu.","Fact"]] },
    { typ:"mc", art:"schliessen", frage:"Mrs Meier says: «I'll believe it when I see it!» What does she think?", hilfe:"Was denkt die Köchin?", richtig:"She isn't sure that Sara will really try the vegetables.", falsch:["She thinks Sara will become a cook.","She wants to see the radio show.","She is sure that Sara loves vegetables."] }
  ]},

{ id:"eh3-swallows", stufe:3, unit:2, titel:"Where do the swallows go?", art:"Radio interview", thema:"Animal migration",
  situation:"In einer Radiosendung spricht die Moderatorin mit Lukas. Er arbeitet bei der Vogelwarte in Sempach und erforscht Schwalben.",
  rollen:{ P:{name:"Presenter", stimme:"erzaehlerin"}, L:{name:"Lukas", stimme:"mann"} },
  teile:[
    ["P","Every spring, swallows come back to our farms and villages. But in autumn, they disappear. Lukas, where do they go?"],
    ["L","They fly to Africa, south of the Sahara desert. That's a journey of thousands of kilometres, and a swallow weighs only about twenty grams. That's less than a chocolate bar!"],
    ["P","Why don't they stay here in winter?"],
    ["L","Swallows eat insects, and they catch them in the air. In winter there are no flying insects here, so the swallows would starve. In Africa it's warm, and there's lots of food."],
    ["P","How do you know where they go?"],
    ["L","In the past, we only put small rings on their legs. But we almost never found the birds again. Today we can put a tiny tracker on a swallow's back. It weighs less than half a gram. When the swallow comes back the next spring, we catch it again and read the data."],
    ["P","And do they come back to the same place?"],
    ["L","Very often, yes. Many swallows come back to the same barn every year. Some farmers call me and say: «Our swallows are back!» They're always so happy on that day."],
    ["P","That's a lovely story. Can our listeners do anything to help?"],
    ["L","Yes! If you have swallows on your farm or house, leave their nests alone. And don't close the barn doors in spring. They need a way in!"]
  ],
  woerter:[["swallow","Schwalbe"],["starve","verhungern"],["tracker","kleiner Sender"],["barn","Scheune, Stall"],["nests","Nester"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where do the swallows fly in autumn?", hilfe:"Wohin fliegen die Schwalben im Herbst?", richtig:"to Africa, south of the Sahara", falsch:["to the north of Europe","to South America","high up into the mountains"] },
    { typ:"mc", art:"verbinden", frage:"Why can't swallows stay here in winter?", hilfe:"Warum können die Schwalben im Winter nicht hier bleiben?", richtig:"There are no flying insects to eat.", falsch:["It's too cold for their nests.","The farmers close the barns.","They don't like snow."] },
    { typ:"mc", art:"verbinden", frage:"Why do scientists use trackers today?", hilfe:"Warum braucht man heute Sender?", richtig:"With rings they almost never found the birds again.", falsch:["Rings are too heavy for swallows.","Trackers are cheaper than rings.","The swallows don't like rings."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["A swallow weighs about twenty grams.","True"],["The tracker weighs more than one gram.","False"],["Lukas has a swallow nest at home.","Not said"]] },
    { typ:"mc", art:"schliessen", frage:"Farmers say: «Our swallows are back!» How do they feel?", hilfe:"Wie fühlen sich die Bauern?", richtig:"Happy – they are glad to see the swallows again.", falsch:["Angry – the swallows make a mess.","Worried – the swallows are ill.","Bored – it happens every year."] },
    { typ:"multi", art:"finden", frage:"How can people help swallows?", hilfe:"Wie kann man den Schwalben helfen? Es können mehrere Antworten stimmen.", richtig:["Leave their nests alone.","Don't close the barn doors in spring."], falsch:["Give them bread.","Build them a bird house.","Put rings on their legs."] }
  ]},

{ id:"eh3-grandpa", stufe:3, unit:3, titel:"Grandpa's school days", art:"Conversation", thema:"Yesterday and today",
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

{ id:"eh3-alps", stufe:3, unit:4, titel:"Hiking in the Alps", art:"Radio interview", thema:"The Alps",
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

{ id:"eh3-fairtrade", stufe:3, unit:5, titel:"Is fair trade worth it?", art:"Radio interview", thema:"Fair trade",
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
