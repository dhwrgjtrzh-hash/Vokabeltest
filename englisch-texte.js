/* =====================================================================
   Englisch – Lese- und Hörtexte zu Young World 4 (Lernportal 6b)
   Eigene Texte (nicht aus dem Lehrmittel kopiert), passend zu Thema und Wortschatz der Units.
   Einfache Sprache (A1/A2): kurze Sätze, vor allem Present simple.
   woerter: kleine Wörterhilfe unter dem Text ([englisch, deutsch]).
   hilfe (bei einer Frage): kurze Erklärung auf Deutsch unter der Frage.

   Lesetexte: Aufbau wie im Leseverstehen Deutsch (lesen-texte.js), aber nach Units (unit statt stufe).
   Hörtexte: wie im Hörverstehen Deutsch (hoeren-texte.js) nach Stufen 1–3, über alle Themen (nicht nach Units).
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

/* ---------- Unit 1: The way we live ---------- */
{ id:"e1-houseboat", unit:1, titel:"Life on a houseboat", art:"Text", thema:"Homes",
  absaetze:[[
    "Hi! My name is Femke.",
    "I'm twelve years old and I live in Amsterdam in the Netherlands.",
    "My home is special: it's a houseboat!",
    "There are about 2,500 houseboats in Amsterdam."
  ],[
    "Our boat is long and narrow.",
    "It has a small kitchen, a living room and two bedrooms.",
    "I share my bedroom with my little brother, Daan.",
    "From my window I can see the water and the ducks."
  ],[
    "Every morning I get up at seven o'clock.",
    "I have breakfast with my family, and then I ride my bike to school.",
    "Almost everybody in Amsterdam rides a bike!"
  ],[
    "Life on a houseboat is great, but sometimes it's difficult.",
    "In winter it's often cold and windy, and the boat moves a little.",
    "We don't have a garden, so we put flowers in pots on the roof.",
    "In summer I sometimes swim next to our house!"
  ]],
  woerter:[["houseboat","Hausboot"],["share","teilen"],["ride a bike","Velo fahren"],["pots","Töpfe"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where does Femke live?", hilfe:"Wo wohnt Femke?", richtig:"on a houseboat in Amsterdam", falsch:["in a flat in Amsterdam","on a farm in the Netherlands","in a house next to a lake"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Femke has her own bedroom.","False"],["Femke goes to school by bike.","True"],["Femke's father works on a ship.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «schmal».", hilfe:"Tippe im Text auf das englische Wort für «schmal».", loesung:["narrow"] },
    { typ:"mc", art:"verbinden", frage:"Why are there flowers on the roof?", hilfe:"Warum stehen Blumen auf dem Dach?", richtig:"Because the family has no garden.", falsch:["Because the ducks eat them.","Because it is cold in winter.","Because Daan likes flowers."] },
    { typ:"multi", art:"finden", frage:"What is sometimes difficult about life on a houseboat?", hilfe:"Was ist manchmal schwierig? Es können mehrere Antworten stimmen.", richtig:["It is cold and windy in winter.","The boat moves a little."], falsch:["There is no kitchen.","The ducks are very loud.","School is far away."] },
    { typ:"kurz", art:"finden", frage:"How many houseboats are there in Amsterdam?", hilfe:"Schreib die Zahl.", loesung:["2500","about 2500","2,500","two thousand five hundred"] }
  ]},

{ id:"e1-two-homes", unit:1, titel:"Two children, two homes", art:"Text", thema:"Ways of life",
  absaetze:[[
    "Batu is eleven.",
    "He lives with his family in Mongolia.",
    "They live in a ger.",
    "A ger is a round tent with a wooden frame and thick walls.",
    "In the middle there is a stove.",
    "It keeps the family warm when it is very cold outside."
  ],[
    "Batu's family has sheep, goats and horses.",
    "The animals need fresh grass, so the family moves three or four times a year.",
    "They can take down the ger and put it up again in about two hours.",
    "Before school, Batu helps his father with the animals.",
    "He can ride a horse very well."
  ],[
    "Lucy is twelve.",
    "She lives in London, in a flat on the tenth floor.",
    "From her window she can see the River Thames.",
    "Lucy takes the Underground to school.",
    "The journey takes twenty minutes."
  ],[
    "After school, Lucy plays the violin or meets her friends in the park.",
    "She doesn't have a pet because the flat is very small.",
    "But she has a big dream: one day she wants to ride a horse!"
  ]],
  woerter:[["wooden frame","Holzgerüst"],["stove","Ofen"],["flat","Wohnung"],["the Underground","die U-Bahn"]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Match the headings to the paragraphs.", hilfe:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["A round home",1],["Life with animals",2],["High above the city",3],["Free time and a dream",4]] },
    { typ:"beleg", art:"finden", frage:"Why does Batu's family move three or four times a year?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"The animals need fresh grass.", falsch:["They want to see new places.","The ger is too small.","Batu has to go to a new school."], beleg:["need fresh grass"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["There is a stove in the middle of the ger.","True"],["Lucy goes to school by bus.","False"],["Lucy's flat is on the tenth floor.","True"],["Batu has a little sister.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Reise, Fahrt».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["journey"] },
    { typ:"kurz", art:"finden", frage:"How long is Lucy's journey to school?", hilfe:"Wie lange dauert Lucys Schulweg?", loesung:["twenty minutes","20 minutes","20","20 min","twenty"] },
    { typ:"mc", art:"schliessen", frage:"Lucy would probably love to …", hilfe:"Was würde Lucy wohl gerne tun?", richtig:"help Batu with his horses.", falsch:["move three times a year.","live on the tenth floor.","take the Underground every day."] }
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
  ]}
];

/* ============================== Listening ==============================
   Hörverstehen: NICHT nach Units, sondern über alles – Stufen 1–3 wie im Hörverstehen Deutsch
   (Stufe 1 kurze Texte, Stufe 2 längere Gespräche, Stufe 3 zwischen den Zeilen hören).
   Die Themen der Units kommen vor (Wohnen, Tiere, früher und heute, Alpen …), dazu Alltag.
   Situation auf Deutsch, damit die Kinder wissen, worum es geht. */
const EN_HOERTEXTE = [

/* ---------- Stufe 1: Genau zuhören ---------- */
{ id:"eh1-station", stufe:1, titel:"At the station", art:"Announcement", thema:"Travel",
  situation:"Du bist am Bahnhof Victoria in London und willst mit dem Zug nach Brighton fahren. Da kommt eine Durchsage.",
  rollen:{ D:{name:"Announcement", stimme:"mann"} },
  teile:[
    ["D","Good morning. This is an announcement for passengers travelling to Brighton. The ten fifteen train to Brighton is delayed by about fifteen minutes. It will now leave from platform six, not from platform two. The café on the train is closed today. We are sorry for the delay."],
    ["D","Once again: the ten fifteen train to Brighton will leave from platform six. Please have your tickets ready."]
  ],
  woerter:[["delayed","verspätet"],["platform","Gleis"],["passengers","Reisende"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where does the train go?", hilfe:"Wohin fährt der Zug?", richtig:"to Brighton", falsch:["to London","to Bristol","to Bath"] },
    { typ:"kurz", art:"finden", frage:"Which platform does the train leave from now?", hilfe:"Schreib die Zahl.", loesung:["6","six","platform 6","platform six"] },
    { typ:"mc", art:"verbinden", frage:"When does the train leave now?", hilfe:"Wann fährt der Zug jetzt ungefähr ab?", richtig:"at about 10.30", falsch:["at 10.15","at about 10.00","at about 11.15"] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The train is delayed by about fifteen minutes.","True"],["You can buy food in the café on the train today.","False"],["The train is very full today.","Not said"]] }
  ]},

{ id:"eh1-message", stufe:1, titel:"A message from Aunt Kate", art:"Voice message", thema:"Free time",
  situation:"Tom hört eine Sprachnachricht von seiner Tante Kate ab. Es geht um den Samstag.",
  rollen:{ K:{name:"Aunt Kate", stimme:"frau"} },
  teile:[
    ["K","Hi Tom, it's Aunt Kate. I've got a great idea for Saturday: let's go to the zoo! I can pick you up at half past nine at your house. Please bring a packed lunch, a drink and your cap. It's going to be sunny."],
    ["K","The zoo has new baby penguins, and at eleven o'clock you can watch them eat. If it rains, we can go to the science museum instead. Please call me back tonight. Bye!"]
  ],
  woerter:[["pick you up","dich abholen"],["packed lunch","Lunch zum Mitnehmen"],["instead","stattdessen"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Where do they want to go on Saturday?", hilfe:"Wohin wollen sie am Samstag?", richtig:"to the zoo", falsch:["to the science museum","to the cinema","to the swimming pool"] },
    { typ:"kurz", art:"finden", frage:"What time does Aunt Kate pick Tom up?", hilfe:"Schreib die Uhrzeit (auf Englisch oder als Zahl).", loesung:["half past nine","9.30","9:30","nine thirty","half past 9"] },
    { typ:"multi", art:"finden", frage:"What must Tom bring?", hilfe:"Was muss Tom mitnehmen? Es können mehrere Antworten stimmen.", richtig:["a packed lunch","a drink","a cap"], falsch:["a jacket","money","a camera"] },
    { typ:"mc", art:"verbinden", frage:"What will they do if it rains?", hilfe:"Was machen sie, wenn es regnet?", richtig:"They will go to the science museum.", falsch:["They will stay at home.","They will go to the zoo another day.","They will go to the cinema."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["At eleven o'clock the penguins eat.","True"],["Tom must call Aunt Kate back tomorrow morning.","False"],["Aunt Kate has a dog.","Not said"]] }
  ]},

{ id:"e1h-farm", stufe:1, titel:"Isla's day on the farm", art:"Podcast", thema:"Daily routine",
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
{ id:"e1h-tinyhouse", stufe:2, titel:"Living in a tiny house", art:"Radio interview", thema:"Homes",
  situation:"In einer Radiosendung spricht eine Moderatorin mit Dan Evans. Dan wohnt mit seiner Familie in einem sehr kleinen Haus.",
  rollen:{ P:{name:"Presenter", stimme:"erzaehlerin"}, D:{name:"Dan", stimme:"mann"} },
  teile:[
    ["P","Hello and welcome to Homes and Lives. Today I'm talking to Dan Evans. Dan lives with his wife and his daughter in a tiny house. Dan, how big is your house?"],
    ["D","It's very small. It's only eight metres long and two and a half metres wide. It's on wheels, so we can move it with a car."],
    ["P","Wow! How many rooms are there?"],
    ["D","There's a living room with a small kitchen, a tiny bathroom and two beds under the roof. My daughter Rosie sleeps up there, too."],
    ["P","Why did you decide to live in a tiny house?"],
    ["D","We wanted a simple life. A big house is expensive, and you need a lot of time to clean it. Now we don't have much stuff, and we have more time for things we like. For example, we go walking in the forest."],
    ["P","Is there anything you don't like?"],
    ["D","Well, when it rains, it's really loud on the roof. And when Rosie's friends come to visit, it gets very crowded! In summer we eat outside, so that's no problem."],
    ["P","Would you go back to a normal house?"],
    ["D","No way! We're very happy here."]
  ],
  woerter:[["tiny","winzig"],["wheels","Räder"],["stuff","Sachen, Zeug"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How long is the tiny house?", hilfe:"Wie lang ist das Haus?", richtig:"eight metres", falsch:["eighteen metres","two and a half metres","eighty metres"] },
    { typ:"multi", art:"finden", frage:"What is in the tiny house?", hilfe:"Was gibt es im Haus? Es können mehrere Antworten stimmen.", richtig:["a living room with a small kitchen","a tiny bathroom","two beds under the roof"], falsch:["a big garden","a garage","a big bedroom for Rosie"] },
    { typ:"mc", art:"verbinden", frage:"Why does the family live in a tiny house?", hilfe:"Warum wohnt die Familie in einem so kleinen Haus?", richtig:"They wanted a simple life with more free time.", falsch:["They wanted to live near the sea.","Their old house was too old.","Rosie wanted her own room."] },
    { typ:"tf", art:"finden", frage:"True, false or not said?", aussagen:[["The tiny house is on wheels.","True"],["The family has a dog.","Not said"],["When it rains, it is very quiet inside.","False"]] },
    { typ:"mc", art:"wortschatz", frage:"Dan says: «It gets very crowded.» What does «crowded» mean?", hilfe:"Was bedeutet «crowded»? Denk daran, wann Dan das sagt.", richtig:"There are too many people in a small space.", falsch:["It gets very cold.","It gets very quiet.","It gets very dirty."] },
    { typ:"mc", art:"ganz", frage:"How does Dan feel about his tiny house?", hilfe:"Wie findet Dan sein kleines Haus?", richtig:"He's very happy and wants to stay.", falsch:["He wants to go back to a normal house.","He thinks it's too expensive.","He isn't sure."] }
  ]},

{ id:"e2h-aquarium", stufe:2, titel:"At the aquarium", art:"Conversation", thema:"Animals",
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

{ id:"e2h-quiz", stufe:2, titel:"Animal Quiz Time", art:"Radio quiz", thema:"Animals",
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

/* ---------- Stufe 3: Zwischen den Zeilen hören ---------- */
{ id:"eh3-newgirl", stufe:3, titel:"The new girl", art:"Story", thema:"School / Friendship",
  situation:"Eine Geschichte aus einer Schule in England. Sofia ist neu in der Klasse. Achte darauf, wie es ihr geht.",
  rollen:{ E:{name:"Narrator", stimme:"erzaehlerin"}, T:{name:"Mrs Hall", stimme:"frau"}, M:{name:"Mia", stimme:"maedchen"} },
  teile:[
    ["E","It was Sofia's first day at her new school. Her family had moved from Portugal to England only two weeks before. In the classroom, Sofia sat in the last row. She looked out of the window and didn't say a word."],
    ["T","Everybody, this is Sofia. She comes from Lisbon. Mia, can you show her around at break time?"],
    ["E","Mia nodded. At break time, she found Sofia next to the door. Sofia was holding her lunch box very tightly."],
    ["M","Hi! Do you want to see the library? It's my favourite place in the school."],
    ["E","Sofia smiled a little and followed her. In the library, Mia showed her a big book about animals. Sofia pointed at a picture of a dolphin and said, very quietly, that she loved dolphins."],
    ["M","Me too! There are dolphins near Lisbon, right? Can you tell me about them tomorrow?"],
    ["E","The next morning, Sofia didn't sit in the last row. She sat next to Mia, and she had brought a photo of a dolphin from home."]
  ],
  woerter:[["row","Reihe"],["break time","Pause"],["tightly","fest"]],
  fragen:[
    { typ:"mc", art:"schliessen", frage:"How does Sofia feel on her first day?", hilfe:"Wie fühlt sich Sofia am ersten Tag?", richtig:"She is shy and a bit nervous.", falsch:["She is angry with Mia.","She is bored.","She is very happy and loud."] },
    { typ:"mc", art:"finden", frage:"Where does Sofia come from?", hilfe:"Woher kommt Sofia?", richtig:"from Lisbon in Portugal", falsch:["from London","from Madrid in Spain","from Rome in Italy"] },
    { typ:"mc", art:"schliessen", frage:"Why does Sofia hold her lunch box very tightly?", hilfe:"Warum hält Sofia ihre Znünibox so fest?", richtig:"She feels unsure in the new school.", falsch:["She is very hungry.","She doesn't want to share her lunch.","The lunch box is broken."] },
    { typ:"ordnen", art:"verbinden", frage:"Put the story in the right order.", hilfe:"Bring die Geschichte in die richtige Reihenfolge.", items:["Mrs Hall introduces Sofia to the class.","Mia finds Sofia next to the door.","They go to the library.","Sofia sees a picture of a dolphin.","Sofia sits next to Mia."] },
    { typ:"mc", art:"ganz", frage:"What does the end of the story show?", hilfe:"Was zeigt der Schluss der Geschichte?", richtig:"Sofia and Mia are becoming friends.", falsch:["Sofia wants to go back to Portugal.","Mia doesn't like dolphins.","Sofia is still alone."] }
  ]},

{ id:"eh3-alps", stufe:3, titel:"Hiking in the Alps", art:"Radio interview", thema:"The Alps",
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

{ id:"eh3-grandpa", stufe:3, titel:"Grandpa's school days", art:"Conversation", thema:"Yesterday and today",
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
  ]}
];
