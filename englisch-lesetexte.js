/* =====================================================================
   Englisch Leseverstehen – Lesetexte zu Young World 4 (6. Klasse), allgemeiner Trainer über das ganze Schuljahr
   Nach Stufen 1–3 (stufe), nicht nach Units – unit nur zur Übersicht, die Kinder sehen keine Unit.
   Eigene Texte – nichts aus dem Lehrmittel oder den Lernkontrollen (siehe englisch-texte.js).
   ===================================================================== */
const EN_LESETEXTE = [

/* ---------- Stufe 1: Genau lesen ---------- */
{ id:"e1-breakfasts", stufe:1, klasse:6, unit:1, titel:"Three breakfasts", art:"Text", thema:"Breakfast around the world",
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
    "Hi, I'm Sofía from Puebla in Mexico.",
    "On school days my mum makes a quick breakfast: tortillas with beans and scrambled eggs.",
    "We often eat fresh fruit too, like mango or papaya.",
    "On special occasions, like my birthday, my grandma makes tamales and a hot chocolate drink with cinnamon.",
    "I can never eat more than two tamales. They are so big!"
  ]],
  woerter:[["a bowl of","eine Schale"],["instead","stattdessen"],["on special occasions","zu besonderen Anlässen"],["scrambled eggs","Rührei"],["tamales","gefüllte Maisteig-Päckchen"]],
  fragen:[
    { typ:"tf", art:"verbinden", frage:"Who says this? Yuki, Emre or Sofía?", hilfe:"Wer sagt das?", wahl:["Yuki","Emre","Sofía"], aussagen:[["«I always drink green tea.»","Yuki"],["«My grandma cooks for my birthday.»","Sofía"],["«Breakfast on Sundays takes two hours.»","Emre"],["«My brother doesn't like fish.»","Yuki"]] },
    { typ:"multi", art:"finden", frage:"What does Emre's family eat on Sundays?", hilfe:"Was isst Emres Familie am Sonntag? Es können mehrere Antworten stimmen.", richtig:["white cheese","olives","honey"], falsch:["rice","tortillas","mango"] },
    { typ:"kurz", art:"finden", frage:"How many glasses of tea does Emre's grandfather often drink?", hilfe:"Schreib die Zahl(en).", loesung:["four or five","4 or 5","four","five","4","5","4-5"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Gurken».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["cucumbers"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Sofía eats tamales every morning.","False"],["Yuki's brother sometimes has toast with jam.","True"],["Emre's mother makes the bread.","Not in the text"]] },
    { typ:"mc", art:"schliessen", frage:"Why can Sofía never eat more than two tamales?", hilfe:"Warum isst Sofía nie mehr als zwei Tamales?", richtig:"They are very big.", falsch:["She doesn't like her grandma's cooking.","She has no time on her birthday.","She drinks too much hot chocolate."] }
  ]},

{ id:"e3-telephone", stufe:1, klasse:6, unit:3, titel:"From the first telephone to the text message", art:"Text", thema:"Communication",
  absaetze:[[
    "Today you can send a text message to a friend in a second.",
    "But how did people communicate in the past?"
  ],[
    "In the 19th century, people wrote letters.",
    "A letter from Zurich to London took several days."
  ],[
    "Then, in 1876, Alexander Graham Bell got a patent for a new invention: the telephone.",
    "A few days later he made his first phone call to his helper, Mr Watson, in the next room.",
    "In the first years, only rich people had a telephone at home.",
    "Operators had to connect every call by hand."
  ],[
    "Almost one hundred years later, on the third of April 1973, an engineer made the first call with a mobile phone in New York.",
    "The phone was very big and heavy: it weighed more than one kilogram!"
  ],[
    "On the third of December 1992, a young engineer in England sent the first text message.",
    "It said: «Merry Christmas».",
    "Today, people all over the world send billions of text messages every day."
  ]],
  woerter:[["communicate","sich verständigen"],["patent","Patent (Recht auf eine Erfindung)"],["operator","Telefonist/-in"],["billions","Milliarden"]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Match the headings to the paragraphs.", hilfe:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["A question",1],["Letters",2],["A new invention",3],["The first mobile phone",4],["The first text message",5]] },
    { typ:"kurz", art:"finden", frage:"In which year did Bell get a patent for the telephone?", hilfe:"Schreib die Jahreszahl.", loesung:["1876"] },
    { typ:"beleg", art:"verbinden", frage:"Why couldn't everybody call friends in the first years?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"Only rich people had a telephone at home.", falsch:["The telephone didn't work at night.","Phone calls were not allowed.","There were no operators."], beleg:["only rich people had a telephone at home"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["The first mobile phone was small and light.","False"],["The first text message said «Merry Christmas».","True"],["Bell's helper, Mr Watson, was his brother.","Not in the text"]] },
    { typ:"ordnen", art:"verbinden", frage:"Put the events in the right order.", hilfe:"Bring die Ereignisse in die richtige Reihenfolge.", items:["People wrote letters.","Bell made his first phone call.","An engineer called with a mobile phone.","Someone sent the first text message."] },
    { typ:"mc", art:"finden", frage:"When was the first text message sent?", hilfe:"Wann wurde die erste SMS geschickt?", richtig:"on the third of December 1992", falsch:["on the third of April 1973","on the third of December 1876","on the first of April 1992"] }
  ]},

{ id:"e3-chimneysweep", stufe:1, klasse:6, unit:3, titel:"Tom, the chimney sweep", art:"Diary", thema:"Children in the past",
  absaetze:[[
    "London, 12th January 1850",
    "Today I got up at four o'clock in the morning.",
    "It was dark and very cold.",
    "I didn't have breakfast, only a piece of old bread."
  ],[
    "My master took me to a big house.",
    "A maid opened the door and showed us the chimneys.",
    "I climbed up the first chimney with my brush.",
    "It was very narrow and full of black soot.",
    "My knees hurt and I couldn't breathe well."
  ],[
    "In the afternoon we cleaned six more chimneys.",
    "When I came home, I was black from head to toe.",
    "I am only eight years old, but I can't go to school.",
    "My family needs the money."
  ],[
    "Tonight I'm very tired.",
    "One day I want to learn to read and write.",
    "Then I can read stories like the children in the big house."
  ]],
  woerter:[["chimney sweep","Kaminfeger"],["master","Meister, Chef"],["soot","Russ"],["from head to toe","von Kopf bis Fuss"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"What time did Tom get up?", hilfe:"Wann ist Tom aufgestanden?", richtig:"at four o'clock in the morning", falsch:["at six o'clock in the morning","at eight o'clock in the morning","at four o'clock in the afternoon"] },
    { typ:"kurz", art:"finden", frage:"How old is Tom?", hilfe:"Schreib die Zahl.", loesung:["eight","8","eight years old","8 years old"] },
    { typ:"beleg", art:"verbinden", frage:"Why can't Tom go to school?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"His family needs the money.", falsch:["There is no school in London.","He doesn't like school.","He is too tired."], beleg:["My family needs the money"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Tom had a big breakfast.","False"],["The chimneys were narrow and full of soot.","True"],["Tom has a little sister.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Dienstmädchen».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["maid"] },
    { typ:"mc", art:"schliessen", frage:"What does Tom wish for?", hilfe:"Was wünscht sich Tom?", richtig:"He wants to learn to read and write.", falsch:["He wants to clean more chimneys.","He wants to live in London.","He wants to be a maid."] }
  ]},

{ id:"e5-hotchocolate", stufe:1, klasse:6, unit:5, titel:"How to make real hot chocolate", art:"Recipe", thema:"Recipes",
  absaetze:[[
    "It's a cold winter afternoon and Mia is making hot chocolate for her friends.",
    "Her friends are sitting in the kitchen and watching her."
  ],[
    "Ingredients for four cups:",
    "800 ml milk, 100 g dark chocolate, 2 tablespoons of sugar, a pinch of cinnamon and some cream."
  ],[
    "First, break the chocolate into small pieces.",
    "Then pour the milk into a pan and heat it slowly. Don't let it boil!",
    "After that, add the chocolate and the sugar and stir until the chocolate melts.",
    "Add a pinch of cinnamon.",
    "Finally, pour the hot chocolate into four cups and put some cream on top."
  ],[
    "«Mmm, it smells great!» says Leo.",
    "Mia usually makes hot chocolate with cocoa powder, but today she is using real chocolate.",
    "Everybody agrees: it tastes much better!"
  ]],
  woerter:[["pan","Pfanne"],["boil","kochen (sprudeln)"],["stir","rühren"],["a pinch of","eine Prise"]],
  fragen:[
    { typ:"kurz", art:"finden", frage:"How much milk do you need?", hilfe:"Wie viel Milch braucht man?", loesung:["800 ml","800","800 millilitres","800ml"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the steps in the right order.", hilfe:"Bring die Schritte in die richtige Reihenfolge.", items:["Break the chocolate into pieces.","Heat the milk in a pan.","Add the chocolate and the sugar and stir.","Pour the hot chocolate into cups.","Put some cream on top."] },
    { typ:"mc", art:"finden", frage:"What must you be careful about?", hilfe:"Worauf muss man aufpassen?", richtig:"The milk must not boil.", falsch:["The chocolate must not melt.","The cream must be hot.","The sugar must be brown."] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Mia's friends are sitting in the kitchen.","True"],["Mia always makes hot chocolate with real chocolate.","False"],["Leo brought the cream.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «rühren».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["stir"] },
    { typ:"mc", art:"schliessen", frage:"What do the friends think about the hot chocolate?", hilfe:"Was finden die Freunde?", richtig:"It tastes better than hot chocolate with cocoa powder.", falsch:["It is too sweet.","It is too cold.","It tastes like coffee."] }
  ]},


/* ---------- Stufe 2: Informationen verbinden ---------- */
{ id:"e2-marmot", stufe:2, klasse:6, unit:2, titel:"Fact file: The Alpine marmot", art:"Fact file", thema:"Animals",
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

{ id:"e2-stork", stufe:2, klasse:6, unit:2, titel:"The long journey of the white stork", art:"Text", thema:"Animals / Migration",
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
    "Storks from Switzerland fly south to Spain or to Africa, where it is warm in winter.",
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

{ id:"e2-humpback", stufe:2, klasse:6, unit:2, titel:"Fact file: The humpback whale", art:"Fact file", thema:"Animals / Migration",
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
    "Whales are not fish. They breathe air, just like us.",
    "The males are famous for their long songs. Scientists think they sing to find a mate."
  ]],
  woerter:[["krill","Krill (kleine Krebse)"],["equator","Äquator"],["mammals","Säugetiere"],["surface","Wasseroberfläche"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How long is an adult humpback whale?", hilfe:"Wie lang ist ein erwachsener Buckelwal?", richtig:"about fourteen metres", falsch:["about four metres","about forty metres","about eight metres"] },
    { typ:"beleg", art:"verbinden", frage:"Why do humpback whales stay in cold waters in summer?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"There is a lot of food there.", falsch:["The water is cleaner there.","They give birth there.","There are no orcas there."], beleg:["there is a lot of food there"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the whale's year in the right order. Start with summer.", hilfe:"Bring das Jahr des Wals in die richtige Reihenfolge. Beginne mit dem Sommer.", items:["They eat a lot in cold waters.","They swim to warm waters.","The females give birth.","The mother cares for her baby."] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["Humpback whales breathe air.","True"],["Humpback whales eat a lot during their long journey.","False"],["Humpback whales can jump out of the water.","Not in the text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Feinde».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["enemies"] },
    { typ:"mc", art:"ganz", frage:"Which sentence is the best summary of the text?", hilfe:"Welcher Satz fasst den Text am besten zusammen?", richtig:"Humpback whales are huge mammals that travel very far between cold and warm waters.", falsch:["Humpback whales are fish that live only near the North Pole.","Humpback whales are dangerous for people.","Humpback whales sing because they are hungry."] }
  ]},

{ id:"e5-history", stufe:2, klasse:6, unit:5, titel:"Chocolate: a long story", art:"Text", thema:"History of chocolate",
  absaetze:[[
    "More than 3,000 years ago, people in Central America already used cocoa beans.",
    "The Maya and later the Aztecs made a drink from them.",
    "It wasn't sweet at all: it was bitter, and they often put chili in it!",
    "The Aztecs also used cocoa beans as money."
  ],[
    "In the 16th century, Spanish sailors brought cocoa beans to Europe.",
    "The Spanish added sugar to the drink, and soon rich people all over Europe loved hot chocolate."
  ],[
    "For a long time, chocolate was only a drink.",
    "In 1847, a company in England made the first chocolate bar you could eat."
  ],[
    "Switzerland became famous for chocolate in the 19th century.",
    "In 1875, Daniel Peter from Vevey made the first milk chocolate.",
    "A few years later, Rodolphe Lindt in Bern invented a machine that stirs the chocolate for many hours.",
    "That made it soft and smooth, so it melts in your mouth."
  ],[
    "Today, people in Switzerland eat about eleven kilograms of chocolate per person every year!"
  ]],
  woerter:[["bitter","bitter"],["sailors","Seeleute"],["invented","erfand"],["melts","schmilzt"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"How did the first chocolate drink taste?", hilfe:"Wie schmeckte das erste Schokoladengetränk?", richtig:"bitter, often with chili", falsch:["very sweet","like milk","like coffee with sugar"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the history of chocolate in the right order.", hilfe:"Bring die Geschichte in die richtige Reihenfolge.", items:["The Aztecs drink cocoa with chili.","Spanish sailors bring cocoa to Europe.","A company in England makes the first chocolate bar.","Daniel Peter makes the first milk chocolate."] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["The Aztecs paid with cocoa beans.","True"],["Chocolate was always something to eat.","False"],["Daniel Peter had three children.","Not in the text"]] },
    { typ:"beleg", art:"verbinden", frage:"Why did Lindt's machine make chocolate better?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"It made the chocolate soft and smooth.", falsch:["It made the chocolate cheaper.","It made the chocolate sweeter.","It made the chocolate cold."], beleg:["That made it soft and smooth"] },
    { typ:"kurz", art:"finden", frage:"How many kilograms of chocolate does a person in Switzerland eat per year?", hilfe:"Schreib die Zahl.", loesung:["eleven","11","about eleven","11 kilograms","eleven kilograms","11 kg"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «fügten hinzu».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["added"] }
  ]},


/* ---------- Stufe 3: Zwischen den Zeilen lesen ---------- */
{ id:"e1-wasteweek", stufe:3, klasse:6, unit:1, titel:"Our Zero Waste Week", art:"Class blog", thema:"Sustainability",
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

{ id:"e4-paragliding", stufe:3, klasse:6, unit:4, titel:"Flying like a bird", art:"Story", thema:"Sports activities",
  absaetze:[[
    "Last summer Noah and his family spent a week in Interlaken.",
    "For his twelfth birthday, his parents had a surprise: a paragliding flight!"
  ],[
    "On the morning of the flight, Noah didn't eat anything.",
    "His stomach felt funny.",
    "«Is there anybody who isn't scared before their first flight?» he asked the pilot.",
    "The pilot laughed. «Nobody! Everybody is a little nervous.»"
  ],[
    "They took a small bus up the mountain.",
    "The pilot put a helmet on Noah's head and explained everything.",
    "Then they ran down the grassy hill together, and suddenly their feet were in the air."
  ],[
    "Noah looked down. He could see the two lakes, the town and the green fields.",
    "Far away were the Eiger, the Mönch and the Jungfrau.",
    "After twenty minutes they landed softly on a big meadow near the town."
  ],[
    "«How was it?» asked his mum.",
    "Noah smiled from ear to ear. «Can I do it again tomorrow?»"
  ]],
  woerter:[["surprise","Überraschung"],["stomach","Bauch, Magen"],["scared","ängstlich"],["landed","landeten"]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Why did Noah get a paragliding flight?", hilfe:"Warum bekam Noah einen Gleitschirmflug?", richtig:"It was a present for his twelfth birthday.", falsch:["He won it in a competition.","His school paid for it.","His dad is a pilot."] },
    { typ:"mc", art:"schliessen", frage:"How did Noah feel on the morning of the flight?", hilfe:"Wie fühlte sich Noah am Morgen?", richtig:"nervous", falsch:["bored","angry","sleepy"] },
    { typ:"ordnen", art:"verbinden", frage:"Put the story in the right order.", hilfe:"Bring die Geschichte in die richtige Reihenfolge.", items:["Noah didn't eat anything.","They took a bus up the mountain.","They ran down the hill.","Noah saw the lakes and the mountains.","They landed on a meadow."] },
    { typ:"kurz", art:"finden", frage:"How long was the flight?", hilfe:"Wie lange dauerte der Flug?", loesung:["twenty minutes","20 minutes","20","20 min","twenty"] },
    { typ:"wort", art:"wortschatz", frage:"Tap the word that means «Wiese».", hilfe:"Tippe im Text auf das englische Wort.", loesung:["meadow"] },
    { typ:"mc", art:"ganz", frage:"What does the end of the story show?", hilfe:"Was zeigt der Schluss?", richtig:"Noah loved the flight.", falsch:["Noah never wants to fly again.","Noah's mum was angry.","The flight was too short for Noah's mum."] }
  ]},

{ id:"e4-lauterbrunnen", stufe:3, klasse:6, unit:4, titel:"Holiday destination: the Lauterbrunnen valley", art:"Travel guide", thema:"Holiday destinations",
  absaetze:[[
    "Are you looking for a holiday destination with a beautiful view?",
    "Then come to the Lauterbrunnen valley in the Bernese Oberland!"
  ],[
    "General information:",
    "The valley is famous for its 72 waterfalls.",
    "You can get there by train from Interlaken.",
    "The villages of Wengen and Mürren are above the valley.",
    "There aren't any cars there, so the air is fresh and clean."
  ],[
    "Highlights:",
    "You shouldn't miss the Trümmelbach Falls.",
    "Here ten waterfalls come down inside the mountain.",
    "You can take a lift into the rock and see them very close.",
    "Another highlight is the Staubbach Falls near the village. The water falls almost 300 metres!"
  ],[
    "Activities:",
    "In summer you can go hiking, climbing or paragliding.",
    "In winter Wengen and Mürren are great resorts for skiing, snowboarding and tobogganing.",
    "Is there anything for rainy summer days? Yes! Visit the waterfalls inside the mountain."
  ]],
  woerter:[["valley","Tal"],["waterfall","Wasserfall"],["lift","Lift"],["rock","Felsen"]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Match the headings to the paragraphs.", hilfe:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["Come and visit!",1],["Getting there and the villages",2],["Things you shouldn't miss",3],["What to do in summer and winter",4]] },
    { typ:"kurz", art:"finden", frage:"How many waterfalls are there in the valley?", hilfe:"Schreib die Zahl.", loesung:["72","seventy-two","seventy two"] },
    { typ:"beleg", art:"verbinden", frage:"Why is the air in Wengen and Mürren so fresh and clean?", hilfe:"Wähle die Antwort. Tippe dann im Text auf den Satz, wo es steht.", richtig:"There aren't any cars there.", falsch:["There are many waterfalls.","The villages are in the forest.","It rains a lot."], beleg:["There aren't any cars there"] },
    { typ:"multi", art:"finden", frage:"What can you do there in winter?", hilfe:"Was kann man im Winter machen? Es können mehrere Antworten stimmen.", richtig:["skiing","snowboarding","tobogganing"], falsch:["paragliding","kayaking","surfing"] },
    { typ:"tf", art:"finden", frage:"True, false or not in the text?", aussagen:[["You can see the Trümmelbach Falls inside the mountain.","True"],["The Staubbach Falls are about 30 metres high.","False"],["The train from Interlaken is free.","Not in the text"]] },
    { typ:"mc", art:"schliessen", frage:"Why is the Trümmelbach Falls a good idea on a rainy day?", hilfe:"Warum passt der Trümmelbachfall gut für einen Regentag?", richtig:"The waterfalls are inside the mountain.", falsch:["It never rains in the valley.","You can go paragliding there.","There is a big restaurant."] }
  ]}
];
