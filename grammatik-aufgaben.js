/* =====================================================================
   Lernportal 6b – Grammatik-Trainer: Aufgaben
   Alle Sätze und Aufgaben sind selbst geschrieben (nicht aus einem Lehrmittel).
   Grundlage: Lehrplan 21, Deutsch D.5 «Sprache(n) im Fokus» (Proben und Grammatikbegriffe, 2. Zyklus)
   und die Wortarten-Lehre mit fünf Wortarten: Nomen, Verb, Adjektiv, Pronomen, Partikel.

   Wortarten-Kürzel in den Sätzen:  N Nomen · V Verb · A Adjektiv · P Pronomen · X Partikel
   «!» = Knacknuss (z. B. Adjektiv beim Verb, Nomen aus einem Verb, Partikel am Satzanfang)
   «~» = nicht als einzelnes Kreisel-Wort abfragen (Probe wäre nicht eindeutig)
   ===================================================================== */
(function(){
"use strict";

/* ---------- Hilfen ---------- */
const zufall = n => Math.floor(Math.random() * n);
const nimm = a => a[zufall(a.length)];
const mische = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = zufall(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gross1 = s => s.charAt(0).toUpperCase() + s.slice(1);
const WA = {N:"Nomen", V:"Verb", A:"Adjektiv", P:"Pronomen", X:"Partikel"};
const WA_MZ = {N:"Nomen", V:"Verben", A:"Adjektive", P:"Pronomen", X:"Partikeln"};
const WARUM = {
  N:"Nomen: Man kann einen Begleiter davorsetzen (der, die, das), und es hat ein festes Geschlecht.",
  V:"Verb: Man kann es konjugieren (ich …, du …, er …).",
  A:"Adjektiv: Man kann es vergleichen (… -er, am … -sten).",
  P:"Pronomen: Es steht in der Pronomenliste.",
  X:"Partikel: Man kann es nicht verändern."
};

/* =====================================================================
   1. Sätze mit Wortarten (für Wörter antippen, Kreisel und Farben)
   ===================================================================== */
const WS = [
  "Die/P kleine/A Katze/N schläft/V auf/X dem/P warmen/A Sofa/N .",
  "Mein/P Bruder/N fährt/V heute/X mit/X dem/P Velo/N .",
  "Wir/P essen/V in/X der/P Pause/N einen/P Apfel/N .",
  "Der/P Hund/N bellt/V laut/A! .",
  "Lena/N~ schreibt/V ihrer/P Freundin/N einen/P langen/A Brief/N .",
  "Unsere/P Lehrerin/N erklärt/V die/P Aufgabe/N genau/A! .",
  "Die/P Kinder/N spielen/V auf/X dem/P Pausenplatz/N Fussball/N .",
  "Ich/P habe/V gestern/X einen/P lustigen/A Film/N gesehen/V .",
  "Der/P Zug/N kommt/V leider/X zu/X spät/A! .",
  "Er/P trinkt/V kaltes/A Wasser/N , weil/X er/P Durst/N hat/V .",
  "Die/P Sonne/N scheint/V hell/A! und/X warm/A! .",
  "Welches/P Buch/N möchtest/V du/P lesen/V ?",
  "Wir/P wandern/V durch/X einen/P dunklen/A Wald/N .",
  "Das/P Lachen/N! der/P Kinder/N ist/V laut/A .",
  "Oma/N backt/V für/X uns/P einen/P feinen/A Kuchen/N .",
  "Hier/X wohnt/V eine/P freundliche/A Familie/N .",
  "Dieser/P Rucksack/N ist/V zu/X schwer/A .",
  "Sie/P singt/V schön/A! , aber/X leise/A! .",
  "Morgen/X! besuchen/V wir/P das/P Museum/N .",
  "Tim/N~ und/X Mia/N~ bauen/V eine/P hohe/A Burg/N .",
  "Der/P neue/A Lehrer/N kommt/V aus/X Bern/N~ .",
  "Ich/P suche/V meinen/P warmen/A Schal/N .",
  "Ihr/P dürft/V jetzt/X nach/X draussen/X gehen/V .",
  "Die/P Vögel/N fliegen/V über/X den/P See/N .",
  "Niemand/P kennt/V die/P Antwort/N .",
  "Warum/X! weint/V das/P Baby/N ?",
  "Wer/P! hat/V meinen/P Bleistift/N genommen/V ?",
  "Max/N~ rennt/V schneller/A! als/X sein/P Freund/N .",
  "Die/P Klasse/N fährt/V mit/X dem/P Bus/N in/X den/P Zoo/N .",
  "Sein/P Zimmer/N ist/V sauber/A und/X ordentlich/A .",
  "Die/P Katze/N fängt/V eine/P Maus/N .",
  "Wir/P lernen/V heute/X neue/A Wörter/N .",
  "Der/P Bäcker/N verkauft/V frisches/A Brot/N .",
  "Mein/P Vater/N kocht/V eine/P scharfe/A Suppe/N .",
  "Es/P regnet/V schon/X seit/X Stunden/N .",
  "Ich/P freue/V mich/P auf/X die/P Ferien/N~ .",
  "Das/P Spielen/N! mit/X dem/P Ball/N macht/V Spass/N .",
  "Die/P Schüler/N warten/V geduldig/A! vor/X dem/P Eingang/N .",
  "Kannst/V du/P mir/P helfen/V ?",
  "Unser/P Hund/N heisst/V Bello/N~ .",
  "Der/P Schnee/N schmilzt/V in/X der/P Sonne/N .",
  "Ihr/P! Lachen/N! klingt/V fröhlich/A! .",
  "Die/P Kleine/N! schläft/V schon/X .",
  "Alle/P Kinder/N freuen/V sich/P über/X den/P Ausflug/N .",
  "Ohne/X Jacke/N ist/V es/P draussen/X kalt/A .",
  "Das/P Pferd/N springt/V über/X den/P hohen/A Zaun/N .",
  "Der/P Ball/N rollt/V unter/X das/P Auto/N .",
  "Heute/X! scheint/V die/P Sonne/N .",
  "Das/P Velo/N meiner/P Schwester/N ist/V neu/A .",
  "Jeder/P Mensch/N braucht/V Wasser/N .",
  "Was/P!~ machst/V du/P nach/X der/P Schule/N ?",
  "Wo/X! wohnt/V deine/P Tante/N ?",
  "Ein/P alter/A Mann/N füttert/V die/P Enten/N .",
  "Das/P Wetter/N wird/V morgen/X besser/A! ."
];
/* in Wörter zerlegen */
const SAETZE = WS.map(s => s.split(" ").map(tok => {
  if(!tok.includes("/")) return {t:tok, p:true};
  const [t, tag] = tok.split("/");
  return {t, wa:tag[0], knack:tag.includes("!"), nie:tag.includes("~")};
}));
const hatKnack = s => s.some(w => w.knack);
const satzText = s => s.map(w => w.t).join(" ").replace(/ ([.,?!:])/g, "$1");

/* =====================================================================
   2. Nomen
   ===================================================================== */
/* [Begleiter, Nomen, Mehrzahl] */
const NOMEN = [
  ["der","Baum","Bäume"],["die","Maus","Mäuse"],["das","Kind","Kinder"],["der","Hund","Hunde"],["die","Blume","Blumen"],
  ["das","Auto","Autos"],["der","Vogel","Vögel"],["die","Lehrerin","Lehrerinnen"],["das","Buch","Bücher"],["der","Apfel","Äpfel"],
  ["die","Hand","Hände"],["das","Haus","Häuser"],["der","Tisch","Tische"],["die","Stadt","Städte"],["das","Velo","Velos"],
  ["die","Nacht","Nächte"],["der","Zahn","Zähne"],["die","Uhr","Uhren"],["das","Ei","Eier"],["der","Wurm","Würmer"],
  ["die","Freundin","Freundinnen"],["das","Bild","Bilder"],["der","Stuhl","Stühle"],["die","Wand","Wände"],["das","Glas","Gläser"],
  ["der","Schuh","Schuhe"],["die","Tasche","Taschen"],["das","Heft","Hefte"],["der","Garten","Gärten"],["die","Frucht","Früchte"],
  ["der","Fuss","Füsse"],["die","Nuss","Nüsse"],["das","Rad","Räder"],["der","Brief","Briefe"],["die","Kuh","Kühe"],
  ["das","Schiff","Schiffe"],["der","Berg","Berge"],["die","Insel","Inseln"],["das","Pferd","Pferde"],["der","Wald","Wälder"]
];
/* Mehrzahl ist gleich wie die Einzahl – Knacknuss */
const NOMEN_GLEICH = [["der","Löffel","Löffel"],["das","Fenster","Fenster"],["das","Zimmer","Zimmer"],["der","Lehrer","Lehrer"],["der","Koffer","Koffer"],["das","Messer","Messer"]];
/* Gefühle und Gedanken – auch Nomen */
const ABSTRAKT = ["Freude","Mut","Angst","Glück","Wut","Hunger","Idee","Ruhe","Hoffnung","Durst","Spass","Traum"];
const NICHT_NOMEN = ["fröhlich","mutig","ängstlich","glücklich","wütend","hungrig","freuen","hoffen","ruhig","durstig","träumen","lachen","schnell","heute"];
/* Nomen bilden: [Ausgangswort, Nachmorphem, Nomen] */
const NOMEN_BILDEN = [
  ["bewegen","-ung","Bewegung"],["wohnen","-ung","Wohnung"],["erfinden","-ung","Erfindung"],["verletzen","-ung","Verletzung"],
  ["frei","-heit","Freiheit"],["krank","-heit","Krankheit"],["schön","-heit","Schönheit"],["dunkel","-heit","Dunkelheit"],["gesund","-heit","Gesundheit"],
  ["sauber","-keit","Sauberkeit"],["ehrlich","-keit","Ehrlichkeit"],["freundlich","-keit","Freundlichkeit"],
  ["der Freund","-schaft","Freundschaft"],["erleben","-nis","Erlebnis"],["hindern","-nis","Hindernis"]
];
/* Fälle: [vor, markiert, nach, Fall] */
const FAELLE = [
  ["Der Hund holt ","den Ball",".","wen"],["Die Lehrerin hilft ","dem Schüler",".","wem"],["Das ist das Velo ","meines Bruders",".","wessen"],
  ["","Der Bäcker"," backt Brot.","wer"],["Ich schenke ","meiner Mutter"," Blumen.","wem"],["Wir besuchen ","den Zoo",".","wen"],
  ["Die Farbe ","des Autos"," ist rot.","wessen"],["Endlich schläft ","das Baby",".","wer"],["Die Kinder danken ","dem Lehrer",".","wem"],
  ["Tim sucht ","seinen Schlüssel",".","wen"],["Der Schwanz ","der Katze"," ist lang.","wessen"],["Morgen kommt ","meine Tante",".","wer"]
];
const FALL = {wer:"Wer-Fall (Nominativ)", wen:"Wen-Fall (Akkusativ)", wem:"Wem-Fall (Dativ)", wessen:"Wessen-Fall (Genitiv)"};
const FALL_FRAGE = {wer:"Wer oder was …?", wen:"Wen oder was …?", wem:"Wem …?", wessen:"Wessen …?"};
/* Nomen oder nicht? [Satz vor, Wort, Satz nach, istNomen, Erklärung] */
const NOMINAL = [
  ["Wir ","lachen"," oft zusammen.",false,"Hier ist «lachen» ein Verb: wir lachen, ihr lacht."],
  ["Das ","Lachen"," tut gut.",true,"«das Lachen»: Mit dem Begleiter «das» wird das Verb zum Nomen."],
  ["Ich ","schwimme"," im See.",false,"«schwimme» ist ein Verb: ich schwimme, du schwimmst."],
  ["Beim ","Schwimmen"," friere ich.",true,"«beim» heisst «bei dem». Mit dem Begleiter wird «Schwimmen» zum Nomen."],
  ["Der ","Kleine"," schläft schon.",true,"«der Kleine» meint ein Kind. Mit dem Begleiter wird das Adjektiv zum Nomen."],
  ["Der ","kleine"," Hund schläft.",false,"«kleine» beschreibt den Hund. Das Nomen ist «Hund»."],
  ["Das ","Lesen"," macht mir Spass.",true,"«das Lesen»: Mit dem Begleiter wird das Verb zum Nomen."],
  ["Wir ","lesen"," jeden Tag.",false,"«lesen» ist hier ein Verb: wir lesen, ihr lest."],
  ["Ich wünsche dir alles ","Gute",".",true,"«das Gute»: Auch ein Adjektiv kann zum Nomen werden."],
  ["Das ist eine ","gute"," Idee.",false,"«gute» beschreibt die Idee. Das Nomen ist «Idee»."],
  ["","Morgen"," gehen wir baden.",false,"«Morgen» heisst hier «am nächsten Tag». Es steht nur am Satzanfang gross – es ist eine Partikel."],
  ["Am ","Morgen"," gehen wir baden.",true,"«am Morgen» heisst «an dem Morgen». Mit dem Begleiter ist «Morgen» ein Nomen."],
  ["Das ","Rennen"," war spannend.",true,"«das Rennen»: Mit dem Begleiter ist es ein Nomen."],
  ["Die Kinder ","rennen"," über die Wiese.",false,"«rennen» ist hier ein Verb: die Kinder rennen."]
];

/* =====================================================================
   3. Verben
   inf · Präsens [ich, du, er, wir, ihr] · Präteritum [ich/er, wir] · Partizip · Hilfsverb (h/s) · Ergänzung · stark (unregelmässig)
   ===================================================================== */
const VERBEN = [
  {inf:"spielen", pr:["spiele","spielst","spielt","spielen","spielt"], pt:["spielte","spielten"], pp:"gespielt", aux:"h", erg:"Fussball"},
  {inf:"lachen", pr:["lache","lachst","lacht","lachen","lacht"], pt:["lachte","lachten"], pp:"gelacht", aux:"h", erg:"laut"},
  {inf:"machen", pr:["mache","machst","macht","machen","macht"], pt:["machte","machten"], pp:"gemacht", aux:"h", erg:"die Hausaufgaben"},
  {inf:"lernen", pr:["lerne","lernst","lernt","lernen","lernt"], pt:["lernte","lernten"], pp:"gelernt", aux:"h", erg:"neue Wörter"},
  {inf:"kaufen", pr:["kaufe","kaufst","kauft","kaufen","kauft"], pt:["kaufte","kauften"], pp:"gekauft", aux:"h", erg:"ein Brot"},
  {inf:"wohnen", pr:["wohne","wohnst","wohnt","wohnen","wohnt"], pt:["wohnte","wohnten"], pp:"gewohnt", aux:"h", erg:"in Zürich"},
  {inf:"malen", pr:["male","malst","malt","malen","malt"], pt:["malte","malten"], pp:"gemalt", aux:"h", erg:"ein Bild"},
  {inf:"tanzen", pr:["tanze","tanzt","tanzt","tanzen","tanzt"], pt:["tanzte","tanzten"], pp:"getanzt", aux:"h", erg:"am Fest"},
  {inf:"lesen", pr:["lese","liest","liest","lesen","lest"], pt:["las","lasen"], pp:"gelesen", aux:"h", erg:"ein Buch", stark:true},
  {inf:"laufen", pr:["laufe","läufst","läuft","laufen","lauft"], pt:["lief","liefen"], pp:"gelaufen", aux:"s", erg:"nach Hause", stark:true},
  {inf:"fahren", pr:["fahre","fährst","fährt","fahren","fahrt"], pt:["fuhr","fuhren"], pp:"gefahren", aux:"s", erg:"mit dem Velo", stark:true},
  {inf:"schlafen", pr:["schlafe","schläfst","schläft","schlafen","schlaft"], pt:["schlief","schliefen"], pp:"geschlafen", aux:"h", erg:"lange", stark:true},
  {inf:"essen", pr:["esse","isst","isst","essen","esst"], pt:["ass","assen"], pp:"gegessen", aux:"h", erg:"einen Apfel", stark:true},
  {inf:"sehen", pr:["sehe","siehst","sieht","sehen","seht"], pt:["sah","sahen"], pp:"gesehen", aux:"h", erg:"einen Fuchs", stark:true},
  {inf:"geben", pr:["gebe","gibst","gibt","geben","gebt"], pt:["gab","gaben"], pp:"gegeben", aux:"h", erg:"dem Hund Wasser", stark:true},
  {inf:"nehmen", pr:["nehme","nimmst","nimmt","nehmen","nehmt"], pt:["nahm","nahmen"], pp:"genommen", aux:"h", erg:"den Bus", stark:true},
  {inf:"schreiben", pr:["schreibe","schreibst","schreibt","schreiben","schreibt"], pt:["schrieb","schrieben"], pp:"geschrieben", aux:"h", erg:"einen Brief", stark:true},
  {inf:"singen", pr:["singe","singst","singt","singen","singt"], pt:["sang","sangen"], pp:"gesungen", aux:"h", erg:"ein Lied", stark:true},
  {inf:"trinken", pr:["trinke","trinkst","trinkt","trinken","trinkt"], pt:["trank","tranken"], pp:"getrunken", aux:"h", erg:"Tee", stark:true},
  {inf:"finden", pr:["finde","findest","findet","finden","findet"], pt:["fand","fanden"], pp:"gefunden", aux:"h", erg:"den Schlüssel", stark:true},
  {inf:"gehen", pr:["gehe","gehst","geht","gehen","geht"], pt:["ging","gingen"], pp:"gegangen", aux:"s", erg:"in die Schule", stark:true},
  {inf:"kommen", pr:["komme","kommst","kommt","kommen","kommt"], pt:["kam","kamen"], pp:"gekommen", aux:"s", erg:"zu spät", stark:true},
  {inf:"schwimmen", pr:["schwimme","schwimmst","schwimmt","schwimmen","schwimmt"], pt:["schwamm","schwammen"], pp:"geschwommen", aux:"s", erg:"im See", stark:true, auxUnsicher:true},
  {inf:"springen", pr:["springe","springst","springt","springen","springt"], pt:["sprang","sprangen"], pp:"gesprungen", aux:"s", erg:"über den Bach", stark:true},
  {inf:"helfen", pr:["helfe","hilfst","hilft","helfen","helft"], pt:["half","halfen"], pp:"geholfen", aux:"h", erg:"meiner Mutter", stark:true},
  {inf:"werfen", pr:["werfe","wirfst","wirft","werfen","werft"], pt:["warf","warfen"], pp:"geworfen", aux:"h", erg:"den Ball", stark:true},
  {inf:"fallen", pr:["falle","fällst","fällt","fallen","fallt"], pt:["fiel","fielen"], pp:"gefallen", aux:"s", erg:"in den Schnee", stark:true},
  {inf:"bleiben", pr:["bleibe","bleibst","bleibt","bleiben","bleibt"], pt:["blieb","blieben"], pp:"geblieben", aux:"s", erg:"zu Hause", stark:true}
];
/* Vokalwechsel bei du/er (liest, fährt, isst …) */
const VOKALWECHSEL = VERBEN.filter(v => ["lesen","laufen","fahren","schlafen","essen","sehen","geben","nehmen","helfen","werfen","fallen"].includes(v.inf));
/* Personen für Sätze: Präsens-Index, Präteritum-Index, Hilfsverben */
const PERSONEN = [
  {s:"ich", pi:0, ti:0, haben:"habe", sein:"bin", hatte:"hatte", war:"war", werden:"werde"},
  {s:"Lea", pi:2, ti:0, haben:"hat", sein:"ist", hatte:"hatte", war:"war", werden:"wird"},
  {s:"wir", pi:3, ti:1, haben:"haben", sein:"sind", hatte:"hatten", war:"waren", werden:"werden"}
];
const ZEITEN = {pr:"Präsens", pt:"Präteritum", pf:"Perfekt", pq:"Plusquamperfekt", fu:"Futur"};
const ZEIT_HILFE = {
  pr:"Präsens (Gegenwart): Die Personalform steht allein – «ich lese».",
  pt:"Präteritum (Vergangenheit, oft in Geschichten): «ich las», «ich spielte».",
  pf:"Perfekt: «haben» oder «sein» in der Gegenwart + Partizip – «ich habe gelesen».",
  pq:"Plusquamperfekt: «hatte» oder «war» + Partizip – «ich hatte gelesen».",
  fu:"Futur (Zukunft): «werden» + Grundform – «ich werde lesen»."
};
function zeitSatz(v, p, z){
  const aux = v.aux === "s" ? p.sein : p.haben, auxT = v.aux === "s" ? p.war : p.hatte;
  const teile = {
    pr:[p.s, v.pr[p.pi], v.erg], pt:[p.s, v.pt[p.ti], v.erg], pf:[p.s, aux, v.erg, v.pp],
    pq:[p.s, auxT, v.erg, v.pp], fu:[p.s, p.werden, v.erg, v.inf]
  }[z];
  return gross1(teile.join(" ")) + ".";
}

/* =====================================================================
   4. Adjektive
   [Grundform, Vergleichsform, am …-sten, unregelmässig/Umlaut]
   ===================================================================== */
const ADJ = [
  ["gross","grösser","grössten",1],["klein","kleiner","kleinsten"],["schnell","schneller","schnellsten"],["langsam","langsamer","langsamsten"],
  ["alt","älter","ältesten",1],["jung","jünger","jüngsten",1],["warm","wärmer","wärmsten",1],["kalt","kälter","kältesten",1],
  ["lang","länger","längsten",1],["kurz","kürzer","kürzesten",1],["stark","stärker","stärksten",1],["hoch","höher","höchsten",2],
  ["nah","näher","nächsten",2],["gut","besser","besten",2],["laut","lauter","lautesten"],["leise","leiser","leisesten"],
  ["hell","heller","hellsten"],["dunkel","dunkler","dunkelsten",2],["teuer","teurer","teuersten",2],["schwer","schwerer","schwersten"],
  ["leicht","leichter","leichtesten"],["schön","schöner","schönsten"],["klug","klüger","klügsten",1],["müde","müder","müdesten"],
  ["heiss","heisser","heissesten"],["süss","süsser","süssesten"],["lustig","lustiger","lustigsten"],["mutig","mutiger","mutigsten"],
  ["frech","frecher","frechsten"],["weich","weicher","weichsten"]
];
/* Vergleichen im Satz: [vor, nach, Grundform, Lösung, knack] */
const ADJ_SATZ = [
  ["Der Elefant ist "," als die Maus.","gross","grösser"],
  ["Von allen Tieren ist der Gepard am ",".","schnell","schnellsten"],
  ["Mein Opa ist "," als mein Vater.","alt","älter"],
  ["Im Sommer ist es "," als im Winter.","warm","wärmer"],
  ["Diese Schokolade ist "," als jene.","süss","süsser"],
  ["Ein Velo ist "," als ein Auto.","langsam","langsamer"],
  ["Heute ist es "," als gestern.","kalt","kälter"],
  ["Der Rhein ist "," als die Limmat.","lang","länger"],
  ["Von allen Kindern rennt Nora am ",".","schnell","schnellsten"],
  ["Im Winter sind die Tage "," als im Sommer.","kurz","kürzer"],
  ["Ein Flüstern ist "," als ein Ruf.","leise","leiser"],
  ["Die Sonne ist "," als der Mond.","hell","heller"],
  ["Mein Bruder ist "," als ich.","jung","jünger"],
  ["Ein Löwe ist "," als eine Katze.","stark","stärker"],
  ["Zürich ist "," als Bern.","gross","grösser"],
  ["Diese Note ist "," als die letzte.","gut","besser",1],
  ["Das ist das "," Eis, das ich kenne.","gut","beste",1],
  ["Der Mount Everest ist der "," Berg der Welt.","hoch","höchste",1],
  ["Ich wohne "," bei der Schule als du.","nah","näher",1],
  ["Ein Auto ist "," als ein Velo.","teuer","teurer",1],
  ["Am Abend ist es "," als am Morgen.","dunkel","dunkler",1],
  ["Das war der "," Tag der Ferien.","schön","schönste",1],
  ["Dieser Turm ist "," als unser Schulhaus.","hoch","höher",1],
  ["Von uns allen wohnst du am "," bei der Schule.","nah","nächsten",1]
];
/* Adjektiv vor dem Nomen: [vor, nach, Grundform, Lösung] */
const ADJ_ENDUNG = [
  ["Ein "," Hund bellt.","gross","grosser"],["Der "," Hund bellt.","gross","grosse"],["Eine "," Katze schläft.","klein","kleine"],
  ["Das ist ein "," Haus.","alt","altes"],["Das "," Haus steht leer.","alt","alte"],["Er schneidet mit einem "," Messer.","scharf","scharfen"],
  ["Die "," Kinder singen.","fröhlich","fröhlichen"],["Ich trinke "," Wasser.","kalt","kaltes"],["Sie trägt "," Schuhe.","neu","neue"],
  ["Das ist ein "," Film.","lustig","lustiger"],["Wir wohnen in einem "," Dorf.","klein","kleinen"],["Er hat eine "," Idee.","gut","gute"],
  ["Wir essen "," Brot.","frisch","frisches"],["Der "," Mann hilft uns.","freundlich","freundliche"],["Wir sehen einen "," Vogel.","bunt","bunten"]
];
/* Adjektiv bilden: [Wort, Nachmorphem, Adjektiv] */
const ADJ_BILDEN = [
  ["der Mut","-ig","mutig"],["die Sonne","-ig","sonnig"],["der Wind","-ig","windig"],["die Kraft","-ig","kräftig"],["der Hunger","-ig","hungrig"],
  ["der Freund","-lich","freundlich"],["das Glück","-lich","glücklich"],["die Gefahr","-lich","gefährlich"],["der Sommer","-lich","sommerlich"],
  ["der Schmerz","-los","schmerzlos"],["die Hilfe","-los","hilflos"],["der Sturm","-isch","stürmisch"],["lesen","-bar","lesbar"],["essen","-bar","essbar"]
];

/* =====================================================================
   5. Pronomen
   ===================================================================== */
const PRONOMENLISTE = [
  ["Für Personen und Dinge", "ich, du, er, sie, es, wir, ihr, sie · mich, dich, ihn, uns, euch · mir, dir, ihm, ihr, ihnen"],
  ["Begleiter", "der, die, das, den, dem, des · ein, eine, einen, einem, einer · kein, keine"],
  ["Wem gehört es?", "mein, dein, sein, ihr, unser, euer (meine, deine, seine …)"],
  ["Hinweisen", "dieser, diese, dieses, jener, jene"],
  ["Fragen", "wer, wen, wem, wessen, was, welcher, welche, welches"],
  ["Weitere", "sich, jemand, niemand, jeder, alle"]
];
/* Nomen ersetzen: [Satz mit Nomen, Rest, Lösung] */
const ERSETZEN = [
  ["Der Hund"," bellt.","Er"],["Die Katze"," schläft.","Sie"],["Das Baby"," weint.","Es"],["Die Kinder"," spielen.","Sie"],
  ["Mia und ich"," singen.","Wir"],["Tim und du"," tanzt.","Ihr"],["Der Tisch"," ist alt.","Er"],["Die Lampe"," ist kaputt.","Sie"],
  ["Das Velo"," ist neu.","Es"],["Lena und Tom"," lachen.","Sie"],["Opa"," liest.","Er"],["Das Mädchen"," lacht.","Es"]
];
/* Pronomen im richtigen Fall: [Satz vor, nach, Lösung, Auswahl] */
const PRON_FALL = [
  ["Tom ist krank. Ich helfe ",".","ihm",["er","ihn","ihm"]],
  ["Tom ist krank. Ich besuche ",".","ihn",["er","ihn","ihm"]],
  ["Lena hat Geburtstag. Ich gratuliere ",".","ihr",["sie","ihr","ihn"]],
  ["Lena hat Geburtstag. Ich rufe "," an.","sie",["sie","ihr","ihn"]],
  ["Die Kinder warten. Der Lehrer holt "," ab.","sie",["sie","ihnen","ihr"]],
  ["Die Kinder haben Durst. Der Lehrer gibt "," Wasser.","ihnen",["sie","ihnen","ihr"]],
  ["Hast du Zeit? Ich brauche ",".","dich",["du","dich","dir"]],
  ["Hast du Hunger? Ich gebe "," einen Apfel.","dir",["du","dich","dir"]],
  ["Wir haben uns verlaufen. Kannst du "," helfen?","uns",["wir","uns","euch"]],
  ["Ihr wart super! Wir danken ",".","euch",["ihr","euch","uns"]],
  ["Ich bin müde. Lass "," schlafen!","mich",["ich","mich","mir"]],
  ["Ich habe Durst. Gib "," bitte Wasser!","mir",["ich","mich","mir"]]
];
const BESITZ = [
  ["Ich habe ein Velo. Das ist "," Velo.","mein",["mein","dein","sein"]],
  ["Tom hat einen Hund. Das ist "," Hund.","sein",["sein","ihr","mein"]],
  ["Lena hat eine Katze. Das ist "," Katze.","ihre",["seine","ihre","meine"]],
  ["Wir haben einen Garten. Das ist "," Garten.","unser",["unser","euer","ihr"]],
  ["Ihr habt ein Zelt. Ist das "," Zelt?","euer",["euer","unser","dein"]],
  ["Du hast eine Jacke. Ist das "," Jacke?","deine",["deine","meine","seine"]],
  ["Die Kinder haben Bälle. Das sind "," Bälle.","ihre",["ihre","seine","unsere"]],
  ["Mia hat einen Bruder. Das ist "," Bruder.","ihr",["sein","ihr","dein"]]
];
const PRON_WOERTER = ["der","ein","dieser","mein","wir","ihn","jemand","sich","welche","euch","eine","unser","niemand"];
const NICHT_PRON = ["Haus","schön","gehen","heute","und","mit","laut","Katze","schreiben","hier","weil","klein"];
/* Ersatzprobe mit ganzem Satz: [Satz, richtig, falsch, falsch] */
const ERSATZ_SATZ = [
  ["Lena gibt dem Hund einen Knochen.","Sie gibt ihm einen Knochen.","Sie gibt ihn einen Knochen.","Ihr gibt ihm einen Knochen."],
  ["Tom hilft seiner Schwester.","Er hilft ihr.","Er hilft sie.","Ihn hilft ihr."],
  ["Die Kinder besuchen den Opa.","Sie besuchen ihn.","Sie besuchen ihm.","Ihnen besuchen ihn."],
  ["Der Lehrer lobt die Schülerin.","Er lobt sie.","Er lobt ihr.","Ihn lobt sie."],
  ["Mia schreibt ihren Freunden eine Karte.","Sie schreibt ihnen eine Karte.","Sie schreibt sie eine Karte.","Ihr schreibt ihnen eine Karte."],
  ["Das Baby sucht die Mutter.","Es sucht sie.","Es sucht ihr.","Er sucht sie."],
  ["Der Bauer füttert die Kühe.","Er füttert sie.","Er füttert ihnen.","Sie füttert sie."],
  ["Die Oma erzählt den Kindern eine Geschichte.","Sie erzählt ihnen eine Geschichte.","Sie erzählt sie eine Geschichte.","Ihr erzählt ihnen eine Geschichte."]
];
/* Fragewörter: Pronomen oder Partikel? */
const FRAGEWORT = [["wer","P"],["wen","P"],["wem","P"],["was","P"],["welcher","P"],["wann","X"],["wo","X"],["warum","X"],["wie","X"],["wohin","X"],["woher","X"]];

/* =====================================================================
   6. Partikeln
   ===================================================================== */
/* veränderbar? [Wort, veränderbar, Beispiel] */
const VERAENDERBAR = [
  ["heute",false],["und",false],["mit",false],["hier",false],["weil",false],["nicht",false],["oder",false],["dort",false],
  ["auf",false],["gestern",false],["jetzt",false],["leider",false],
  ["Haus",true,"das Haus – die Häuser"],["schnell",true,"schnell – schneller"],["gehen",true,"ich gehe – du gehst"],
  ["mein",true,"mein – meine – meinen"],["klein",true,"klein – kleiner"],["Hund",true,"der Hund – die Hunde"],
  ["wir",true,"wir – uns"],["lesen",true,"ich lese – du liest"],["dieser",true,"dieser – diese – dieses"],["laut",true,"laut – lauter"]
];
const PARTIKELN = ["heute","und","mit","hier","weil","nicht","oder","dort","auf","gestern","jetzt","leider","unter","ohne","aber","schon","dass","für"];
const KEINE_PARTIKEL = ["Tisch","klein","laufen","dieser","sie","rot","Schule","singen","froh","uns"];
/* Partikel einsetzen: [vor, nach, Lösung, Auswahl] */
const VERBINDEN = [
  ["Ich bleibe drinnen, "," es regnet.","weil",["weil","aber","oder"]],
  ["Möchtest du Tee "," Saft?","oder",["oder","weil","dass"]],
  ["Es ist kalt, "," die Sonne scheint.","aber",["aber","oder","weil"]],
  ["Ich weiss, "," du recht hast.","dass",["dass","das","oder"]],
  ["Tim "," Lena spielen Fussball.","und",["und","weil","dass"]],
  ["Ich komme mit, "," ich Zeit habe.","wenn",["wenn","oder","aber"]],
  ["Die Katze liegt "," dem Sofa.","auf",["auf","und","weil"]],
  ["Wir gehen "," Regenschirm hinaus.","ohne",["ohne","oder","dass"]],
  ["Das Geschenk ist "," dich.","für",["für","aber","wenn"]]
];
/* Partikeln genauer: Präposition / Konjunktion / andere */
const PART_GENAU = [
  ["auf","praep"],["mit","praep"],["unter","praep"],["für","praep"],["ohne","praep"],["neben","praep"],["hinter","praep"],
  ["und","konj"],["oder","konj"],["aber","konj"],["weil","konj"],["dass","konj"],["wenn","konj"],
  ["heute","andere"],["hier","andere"],["nicht","andere"],["dort","andere"],["leider","andere"],["jetzt","andere"]
];
const PART_GRUPPE = {praep:"Präposition (vor Nomen: auf dem Tisch)", konj:"Konjunktion (verbindet: und, weil)", andere:"andere Partikel (heute, hier, nicht)"};
/* Gross am Satzanfang – Nomen oder Partikel? */
const GROSS_ANFANG = [
  ["","Morgen"," gehen wir ins Kino.","X"],["Am ","Morgen"," frühstücke ich.","N"],["Der ","Morgen"," war kalt.","N"],
  ["","Heute"," ist Montag.","X"],["","Abends"," lese ich ein Buch.","X"],["Am ","Abend"," lese ich ein Buch.","N"],
  ["","Dort"," steht ein Baum.","X"],["","Gestern"," war ich krank.","X"],["Der ","Abend"," war lustig.","N"]
];

/* =====================================================================
   7. Morpheme
   V = Vormorphem, S = Stamm-Morphem, N = Nachmorphem
   ===================================================================== */
const MORPH = [
  "Spiel:S|er:N","Mal:S|er:N","Fahr:S|er:N","Bäck:S|er:N","Schwimm:S|er:N","Lehr:S|er:N|in:N",
  "un:V|freund:S|lich:N","Frei:S|heit:N","Ent:V|deck:S|ung:N","zer:V|brech:S|lich:N","Freund:S|schaft:N",
  "Er:V|leb:S|nis:N","les:S|bar:N","Be:V|weg:S|ung:N","Frech:S|heit:N","Ehr:S|lich:N|keit:N",
  "Kind:S|heit:N","mut:S|ig:N","schmerz:S|los:N","Fröh:S|lich:N|keit:N","Ver:V|kehr:S","Be:V|such:S|er:N",
  "Zer:V|stör:S|ung:N","Er:V|find:S|ung:N","Er:V|find:S|er:N","un:V|glück:S|lich:N","Ver:V|letz:S|ung:N",
  "be:V|nutz:S|bar:N","Ent:V|täusch:S|ung:N","Sauber:S|keit:N","Wohn:S|ung:N","sonn:S|ig:N","wind:S|ig:N",
  "Ver:V|käuf:S|er:N|in:N","Ver:V|kauf:S","Ent:V|schuld:S|ig:N|ung:N","Miss:V|er:V|folg:S","Ver:V|ständ:S|nis:N",
  "un:V|ehr:S|lich:N","Ge:V|wohn:S|heit:N","Mann:S|schaft:N","Klug:S|heit:N","Schön:S|heit:N","Ver:V|lier:S|er:N"
].map(s => s.split("|").map(x => { const [t, r] = x.split(":"); return {t, r}; }));
const MORPH_WORT = m => m.map(x => x.t).join("");
const ROLLE = {V:"Vormorphem", S:"Stamm-Morphem", N:"Nachmorphem"};
/* Wortfamilien: [Wörter (die ersten drei gehören dazu), nicht dazu, Stamm] */
const FAMILIEN = [
  [["spielen","Spieler","Spielplatz"],"Spiegel","spiel"],[["lesen","Leser","Lesebuch"],"leise","les"],
  [["Schule","Schulweg","Schulhaus"],"Schuh","schul"],[["Hand","Handschuh","handlich"],"Hund","hand"],
  [["Sonne","sonnig","Sonnenbrille"],"Sohn","sonn"],[["Kind","Kindheit","kindlich"],"Kino","kind"],
  [["malen","Maler","Malstift"],"Mantel","mal"],[["fahren","Fahrer","Fahrrad"],"Farbe","fahr"],
  [["Haus","Häuschen","Haustür"],"Hase",""],[["schreiben","Schreibtisch","beschreiben"],"Scheibe","schreib"],
  [["Garten","Gärtner","Gartenhaus"],"Karten",""],[["Wald","Waldweg","Wälder"],"Walfisch",""],
  [["Freund","freundlich","Freundschaft"],"Fremde","freund"],[["backen","Bäcker","Backofen"],"Becher",""],
  [["Wasser","wässrig","Wasserfall"],"waschen",""],[["Glück","glücklich","Unglück"],"Glocke","glück"],
  [["Zahn","Zahnbürste","Zahnarzt"],"Zahl","zahn"],[["Brief","Briefkasten","Briefmarke"],"Brille","brief"]
];
/* Nachmorphem passend wählen: [Stamm, Ziel-Wortart, Lösung, Auswahl] */
const NACH_WAHL = [
  ["freund","Adjektiv","lich",["lich","ung","heit"]],["mut","Adjektiv","ig",["ig","ung","heit"]],["glück","Adjektiv","lich",["lich","ung","nis"]],
  ["wind","Adjektiv","ig",["ig","heit","schaft"]],["les","Adjektiv","bar",["bar","heit","nis"]],["schmerz","Adjektiv","los",["los","ung","heit"]],
  ["frei","Nomen","heit",["heit","lich","ig"]],["wohn","Nomen","ung",["ung","lich","bar"]],["freund","Nomen","schaft",["schaft","lich","ig"]],
  ["kind","Nomen","heit",["heit","lich","isch"]],["sauber","Nomen","keit",["keit","lich","bar"]],["erleb","Nomen","nis",["nis","lich","bar"]]
];
const UN_WOERTER = ["glücklich","ehrlich","freundlich","bekannt","höflich","ordentlich","sicher","möglich"];
/* Nachmorphem verrät die Wortart */
const NACH_WORTART = [
  ["Freiheit","heit","N"],["Wohnung","ung","N"],["Freundschaft","schaft","N"],["Erlebnis","nis","N"],["Sauberkeit","keit","N"],["Bewegung","ung","N"],["Kindheit","heit","N"],
  ["freundlich","lich","A"],["mutig","ig","A"],["lesbar","bar","A"],["schmerzlos","los","A"],["stürmisch","isch","A"],["sonnig","ig","A"],["gefährlich","lich","A"]
];
/* Stämme, die sich verändern (Umlaut, anderer Vokal) */
const STAMM_WECHSEL = [
  ["fahr", ["fährt","Fähre","Fahrer","fuhr"], ["Farbe","Fahne"]],
  ["halt", ["hält","Haltestelle","Halter","hielt"], ["Hals","Halle"]],
  ["trink", ["Getränk","Trinkflasche","trank","getrunken"], ["Treppe","Trick"]],
  ["lauf", ["läuft","Läufer","lief","Lauf"], ["Laub","Laune"]],
  ["schlaf", ["schläft","schläfrig","schlief","Schlafsack"], ["Schlange","schlau"]]
];

/* =====================================================================
   8. Sätze bauen (Satzglieder; Grundreihenfolge: «Wer oder was?» zuerst)
   Rollen: wer, wen, wem, wann, wo, wohin, wie, warum, womit · PF = Personalform · VT = weiterer Verbteil
   ===================================================================== */
const SG = [
  "die Kinder:wer|spielen:PF|nach der Schule:wann|Fussball:wen",
  "meine Oma:wer|schenkt:PF|ihrem Enkel:wem|ein Buch:wen",
  "der Hund:wer|wartet:PF|vor der Tür:wo",
  "wir:wer|besuchen:PF|am Montag:wann|das Museum:wen",
  "Lena:wer|hilft:PF|ihrem kleinen Bruder:wem",
  "wir:wer|fahren:PF|morgen:wann|mit dem Zug:womit|nach Bern:wohin",
  "der Lehrer:wer|erklärt:PF|der Klasse:wem|die Aufgabe:wen",
  "viele Kinder:wer|schwimmen:PF|im Sommer:wann|im See:wo",
  "Tim:wer|isst:PF|in der Pause:wann|einen Apfel:wen",
  "die Katze:wer|schläft:PF|auf dem Sofa:wo",
  "mein Vater:wer|kocht:PF|heute:wann|Spaghetti:wen",
  "die Schülerinnen:wer|schreiben:PF|ihrer Lehrerin:wem|einen Brief:wen",
  "Mia:wer|putzt:PF|nach dem Essen:wann|ihre Zähne:wen",
  "der Bäcker:wer|verkauft:PF|am Morgen:wann|frisches Brot:wen",
  "wir:wer|bleiben:PF|wegen des Regens:warum|zu Hause:wo",
  "das kleine Mädchen:wer|gibt:PF|dem Pony:wem|eine Karotte:wen",
  "meine Mutter:wer|trinkt:PF|jeden Morgen:wann|einen Kaffee:wen",
  "der Igel:wer|schläft:PF|im Winter:wann|unter dem Laub:wo",
  "mein Onkel:wer|repariert:PF|mit einem Hammer:womit|den Zaun:wen",
  "die Klasse:wer|wandert:PF|am Freitag:wann|auf den Uetliberg:wohin",
  /* mit weiterem Verbteil */
  "wir:wer|haben:PF|gestern:wann|im Wald:wo|einen Fuchs:wen|gesehen:VT",
  "Lukas:wer|kann:PF|sehr schnell:wie|rennen:VT",
  "unsere Klasse:wer|wird:PF|nächste Woche:wann|ein Theater:wen|spielen:VT",
  "der Zug:wer|fährt:PF|pünktlich:wie|ab:VT",
  "die Kinder:wer|haben:PF|in der Pause:wann|einen Schneemann:wen|gebaut:VT",
  "Nora:wer|hat:PF|ihrer Freundin:wem|eine Karte:wen|geschrieben:VT",
  "der Bus:wer|ist:PF|heute:wann|zu spät:wie|gekommen:VT",
  "meine Schwester:wer|möchte:PF|im Sommer:wann|ans Meer:wohin|fahren:VT"
].map(s => s.split("|").map(x => { const i = x.lastIndexOf(":"); return {t:x.slice(0, i), r:x.slice(i + 1)}; }));
const FRAGE = {wer:"Wer oder was?", wen:"Wen oder was?", wem:"Wem?", wann:"Wann?", wo:"Wo?", wohin:"Wohin?", wie:"Wie?", warum:"Warum?", womit:"Womit?"};
const satzAus = segs => gross1(segs.map(x => x.t).join(" ")) + ".";

/* =====================================================================
   AUFGABEN-GENERATOREN
   Jede Funktion liefert eine Aufgabe:
   {typ, frage, thema, …} – typ: wahl | tap | multi | eingabe | bauen | zerlegen | weg | pinsel
   ===================================================================== */
const G = {};

/* ---- Wörter in einem Satz antippen ---- */
function tapWortart(wa, opt){
  opt = opt || {};
  let kandidaten = SAETZE.filter(s => s.some(w => w.wa === wa));
  if(opt.knack) kandidaten = kandidaten.filter(s => s.some(w => w.knack && w.wa === wa) || (wa === "N" && s[0].knack && s[0].wa !== "N"));
  else if(!opt.alle) kandidaten = kandidaten.filter(s => !hatKnack(s));
  const s = nimm(kandidaten);
  return {typ:"tap", thema:WA_MZ[wa] + " finden", frage:`Tippe alle ${WA_MZ[wa]} an.`, gross: wa === "N",
    woerter: s.map(w => w.p ? {t:w.t, p:true} : {t:w.t, z:w.wa === wa, info:WA[w.wa]}), wa,
    erkl: WARUM[wa]};
}

/* ---- Kreisel: Wortart eines markierten Worts ---- */
function kreiselWort(opt){
  opt = opt || {};
  let pool = [];
  SAETZE.forEach((s, si) => s.forEach((w, wi) => { if(!w.p && !w.nie && (opt.knack ? w.knack : !w.knack)) pool.push([si, wi]); }));
  if(opt.drei) {
    // 4./5. Klasse: Nomen, Verb, Adjektiv – andere Wörter seltener
    const haupt = pool.filter(([si, wi]) => "NVA".includes(SAETZE[si][wi].wa));
    if(Math.random() < 0.8) pool = haupt;
  }
  const [si, wi] = nimm(pool), s = SAETZE[si], w = s[wi];
  const optionen = opt.drei ? ["Nomen","Verb","Adjektiv","keine der drei"] : ["Nomen","Verb","Adjektiv","Pronomen","Partikel"];
  const richtig = opt.drei && !"NVA".includes(w.wa) ? "keine der drei" : WA[w.wa];
  return {typ:"wahl", thema: opt.drei ? "Kreisel (3 Wortarten)" : "Kreisel", frage:`Welche Wortart ist das markierte Wort?`,
    satz: s.map((x, i) => ({t:x.t, p:x.p, mark:i === wi})), optionen, richtig, wort:w.t, wa:w.wa, drei:!!opt.drei,
    erkl: kreiselErkl(w.t, w.wa, opt.drei), kreisel:true};
}
const KREISEL_FRAGEN = [
  {k:"ver", f:"Kann man das Wort verändern?"},
  {k:"kon", f:"Kann man es konjugieren? (ich …, du …, er …)"},
  {k:"ges", f:"Hat es ein festes Geschlecht? (der, die oder das)"},
  {k:"vgl", f:"Kann man es vergleichen? (… -er, am … -sten)"}
];
function kreiselWeg(wa, drei){
  // Antworten Ja/Nein der Reihe nach, bis die Wortart feststeht
  if(drei){
    const s = [];
    s.push(["kon", wa === "V"]); if(wa === "V") return s;
    s.push(["ges", wa === "N"]); if(wa === "N") return s;
    s.push(["vgl", wa === "A"]); return s;
  }
  const s = [["ver", wa !== "X"]]; if(wa === "X") return s;
  s.push(["kon", wa === "V"]); if(wa === "V") return s;
  s.push(["ges", wa === "N"]); if(wa === "N") return s;
  s.push(["vgl", wa === "A"]); return s;
}
function kreiselErkl(wort, wa, drei){
  const weg = kreiselWeg(wa, drei).map(([k, ja]) => `${KREISEL_FRAGEN.find(q => q.k === k).f.replace(/ \(.*\)/, "")} → ${ja ? "Ja" : "Nein"}`);
  const ende = drei && !"NVA".includes(wa) ? "keine der drei Hauptwortarten" : WA[wa];
  return `So geht der Kreisel für «${wort}»: ${weg.join(" · ")} → ${ende}.`;
}
function kreiselDurchspielen(){
  const pool = [];
  SAETZE.forEach((s, si) => s.forEach((w, wi) => { if(!w.p && !w.nie && !w.knack) pool.push([si, wi]); }));
  // jede Wortart etwa gleich oft
  const wa = nimm(["N","V","A","P","X"]);
  const [si, wi] = nimm(pool.filter(([si, wi]) => SAETZE[si][wi].wa === wa));
  const s = SAETZE[si], w = s[wi];
  return {typ:"weg", thema:"Kreisel durchspielen", frage:"Spiel den Wortarten-Kreisel für das markierte Wort durch.",
    satz: s.map((x, i) => ({t:x.t, p:x.p, mark:i === wi})), wort:w.t, wa:w.wa,
    schritte: kreiselWeg(w.wa, false).map(([k, ja]) => ({f:KREISEL_FRAGEN.find(q => q.k === k).f, ja})),
    erkl: kreiselErkl(w.t, w.wa, false)};
}
function pinsel(){
  const s = nimm(SAETZE.filter(s => hatKnack(s) && s.filter(w => !w.p).length <= 8));
  return {typ:"pinsel", thema:"Ganzer Satz", frage:"Bestimme jedes Wort: Wähle zuerst eine Wortart und tippe dann die passenden Wörter an.",
    woerter: s.map(w => w.p ? {t:w.t, p:true} : {t:w.t, wa:w.wa})};
}

/* ---- Nomen ---- */
G.nomenTap = () => tapWortart("N");
G.nomenTapKnack = () => tapWortart("N", {knack:true});
G.begleiter = () => { const [b, n] = nimm(NOMEN); return {typ:"wahl", thema:"Begleiter", frage:"Welcher Begleiter passt?", zeile:`___ ${n}`, optionen:["der","die","das"], richtig:b,
  erkl:`Es heisst «${b} ${n}». Das Geschlecht eines Nomens bleibt immer gleich.`}; };
G.mehrzahl = () => { const [b, n, m] = nimm(NOMEN); return {typ:"eingabe", thema:"Mehrzahl", frage:"Schreib die Mehrzahl.", teile:[`${b} ${n} → die `, {l:[m], nomen:true}],
  erkl:`${b} ${n} → die ${m}`}; };
G.mehrzahlKnack = () => { const [b, n, m] = nimm(NOMEN_GLEICH.concat(NOMEN.filter(x => /[äöü]/i.test(x[2]) && !/[äöü]/i.test(x[1])))); return {typ:"eingabe", thema:"Mehrzahl", frage:"Schreib die Mehrzahl. Achtung: Manchmal ändert sich fast nichts!", teile:[`${b} ${n} → die `, {l:[m], nomen:true}],
  erkl:`${b} ${n} → die ${m}${n === m ? " – hier sehen Einzahl und Mehrzahl gleich aus. Nur der Begleiter zeigt die Mehrzahl." : ""}`}; };
G.abstrakt = () => {
  const ja = mische(ABSTRAKT).slice(0, 3), nein = mische(NICHT_NOMEN).slice(0, 3);
  return {typ:"multi", thema:"Gefühle und Gedanken", frage:"Welche Wörter sind Nomen? Die Wörter stehen in Grossbuchstaben – mach die Begleiterprobe.", gross:true,
    optionen: mische(ja.concat(nein)), richtig: ja, erkl:"Auch Gefühle und Gedanken sind Nomen: die Freude, der Mut, die Idee. Du kannst einen Begleiter davorsetzen."};
};
G.nomenBilden = () => { const [w, n, l] = nimm(NOMEN_BILDEN); return {typ:"eingabe", thema:"Nomen bilden", frage:`Bilde ein Nomen mit dem Nachmorphem ${n}.`, teile:[`${w} → `, {l:[l], nomen:true}],
  erkl:`${w} → ${l}. Wörter mit ${n} sind Nomen – man schreibt sie gross.`}; };
G.fall = () => { const [v, m, n, f] = nimm(FAELLE); return {typ:"wahl", thema:"Fälle", frage:"In welchem Fall steht das markierte Satzglied?", zeileHtml:true,
  zeile:`${esc(v)}<mark>${esc(m)}</mark>${esc(n)}`, optionen:[FALL.wer, FALL.wen, FALL.wem, FALL.wessen], richtig:FALL[f],
  erkl:`Frag: ${FALL_FRAGE[f]} → «${m}» steht im ${FALL[f]}.`}; };
G.nominal = () => { const [v, w, n, ja, e] = nimm(NOMINAL); return {typ:"wahl", thema:"Nomen aus Verb oder Adjektiv", frage:`Ist «${w}» hier ein Nomen?`, zeileHtml:true,
  zeile:`${esc(v)}<mark>${esc(w)}</mark>${esc(n)}`, optionen:["Ja, ein Nomen","Nein, kein Nomen"], richtig: ja ? "Ja, ein Nomen" : "Nein, kein Nomen", erkl:e}; };

/* ---- Verben ---- */
G.verbTap = () => tapWortart("V");
G.grundform = (stark) => {
  const v = nimm(stark ? VERBEN.filter(v => v.stark) : VERBEN);
  const formen = [[v.pr[1], "du"], [v.pr[2], "er"], [v.pr[4], "ihr"]].concat(stark ? [[v.pt[0], "ich (Präteritum)"], [v.pp, "Partizip"]] : []);
  const [f] = nimm(formen.filter(([f]) => f !== v.inf));
  return {typ:"eingabe", thema:"Grundform", frage:"Wie heisst die Grundform (Infinitiv)?", teile:[`«${f}» → `, {l:[v.inf]}], erkl:`Die Grundform von «${f}» ist «${v.inf}».`};
};
G.personalform = (stark) => {
  const v = nimm(stark ? VOKALWECHSEL : VERBEN.filter(v => !v.stark));
  const pi = stark ? nimm([1, 2]) : nimm([0, 1, 2, 3, 4]);
  const pers = ["ich","du","er","wir","ihr"][pi];
  return {typ:"eingabe", thema: stark ? "Personalform (unregelmässig)" : "Personalform", frage:`Bilde die Personalform von «${v.inf}».`,
    teile:[`${pers} `, {l:[v.pr[pi]]}], erkl:`${pers} ${v.pr[pi]}${stark ? ` – bei «${v.inf}» ändert sich der Selbstlaut: du ${v.pr[1]}, er ${v.pr[2]}.` : ""}`};
};
G.zeitform = (fuenf) => {
  const v = nimm(VERBEN), p = nimm(PERSONEN), z = nimm(fuenf ? ["pr","pt","pf","pq","fu"] : ["pr","pt","pf"]);
  const optionen = (fuenf ? ["pr","pt","pf","pq","fu"] : ["pr","pt","pf"]).map(k => ZEITEN[k]);
  return {typ:"wahl", thema:"Zeitformen", frage:"In welcher Zeitform steht der Satz?", zeile:zeitSatz(v, p, z), optionen, richtig:ZEITEN[z], erkl:ZEIT_HILFE[z]};
};
G.zeitSetzen = () => {
  const v = nimm(VERBEN.filter(v => !v.auxUnsicher)), p = nimm(PERSONEN);
  const [von, nach] = nimm([["pr","pf"],["pr","pt"],["pt","pf"],["pr","fu"],["pf","pr"],["pr","pq"]]);
  const richtig = zeitSatz(v, p, nach);
  const andere = ["pr","pt","pf","pq","fu"].filter(z => z !== nach && z !== von).map(z => zeitSatz(v, p, z));
  // falsches Hilfsverb im Perfekt als zusätzliche Falle
  const falschAux = nach === "pf" ? gross1([p.s, v.aux === "s" ? p.haben : p.sein, v.erg, v.pp].join(" ")) + "." : null;
  const optionen = mische([richtig].concat(falschAux ? [falschAux, nimm(andere)] : mische(andere).slice(0, 2)));
  return {typ:"wahl", thema:"Zeitformen", frage:`Setze den Satz ins ${ZEITEN[nach]}.`, zeile:zeitSatz(v, p, von), optionen, richtig, lang:true,
    erkl:`${ZEIT_HILFE[nach]} → «${richtig}»`};
};
G.praeteritum = () => {
  const v = nimm(VERBEN.filter(v => v.stark)), p = nimm(PERSONEN);
  return {typ:"eingabe", thema:"Präteritum (unregelmässig)", frage:`Setze «${v.inf}» im Präteritum ein.`, teile:[`Gestern `, {l:[v.pt[p.ti]]}, ` ${p.s} ${v.erg}.`],
    erkl:`Gestern ${v.pt[p.ti]} ${p.s} ${v.erg}. («${v.inf}» ist unregelmässig: ${v.pt[0]}, ${v.pp})`};
};
G.habenSein = () => {
  const v = nimm(VERBEN.filter(v => !v.auxUnsicher)), p = nimm(PERSONEN);
  const r = v.aux === "s" ? p.sein : p.haben;
  return {typ:"wahl", thema:"Perfekt mit haben oder sein", frage:"Was passt: «haben» oder «sein»?", zeile:`${gross1(p.s)} ___ ${v.erg} ${v.pp}.`, optionen:[p.haben, p.sein], richtig:r,
    erkl: v.aux === "s" ? `«${v.inf}» bildet das Perfekt mit «sein»: ${p.s} ${p.sein} ${v.pp}. Oft bei Bewegungen von einem Ort zum andern.` : `«${v.inf}» bildet das Perfekt mit «haben»: ${p.s} ${p.haben} ${v.pp}.`};
};
G.personalformTap = () => {
  const s = nimm(SAETZE.filter(s => s.some(w => w.wa === "V") && !hatKnack(s) && !s.some(w => w.t === ",")));
  // Personalform = erstes Verb im Satz
  const pf = s.findIndex(w => w.wa === "V");
  return {typ:"tap", einzeln:true, thema:"Personalform finden", frage:"Tippe die Personalform an.",
    woerter: s.map((w, i) => w.p ? {t:w.t, p:true} : {t:w.t, z:i === pf, info: i === pf ? "Personalform" : (w.wa === "V" ? "weiterer Verbteil" : WA[w.wa])}),
    erkl:"Die Personalform passt sich der Person an (ich spiele, du spielst). Im Satz steht sie meistens an 2. Stelle."};
};
G.verbteile = () => {
  const s = nimm(SG.filter(s => s.some(x => x.r === "VT")));
  const segs = s.slice();
  return {typ:"tap", thema:"Verbteile", frage:"Tippe alle Verbteile an (Personalform und weitere Verbteile).",
    woerter: segs.flatMap((x, i) => x.t.split(" ").map((t, k) => ({t: i === 0 && k === 0 ? gross1(t) : t, z: x.r === "PF" || x.r === "VT", info: x.r === "PF" ? "Personalform" : x.r === "VT" ? "weiterer Verbteil" : "kein Verbteil"}))).concat([{t:".", p:true}]),
    erkl:"Die Personalform steht an 2. Stelle. Weitere Verbteile stehen am Satzende: wir haben … gesehen."};
};

/* ---- Adjektive ---- */
G.adjTap = () => tapWortart("A");
G.adjTapKnack = () => tapWortart("A", {knack:true});
G.vergleich = (schwer) => {
  const a = nimm(schwer ? ADJ.filter(a => a[3] === 2) : ADJ.filter(a => a[3] !== 2));
  return {typ:"eingabe", thema: schwer ? "Vergleichen (unregelmässig)" : "Vergleichen", frage:"Vergleiche das Adjektiv.", teile:[`${a[0]} – `, {l:[a[1]]}, ` – am `, {l:[a[2]]}],
    erkl:`${a[0]} – ${a[1]} – am ${a[2]}`};
};
G.vergleichSatz = (schwer) => {
  const [v, n, g, l] = nimm(ADJ_SATZ.filter(x => !!x[4] === !!schwer));
  return {typ:"eingabe", thema: schwer ? "Vergleichen (unregelmässig)" : "Vergleichen", frage:`Setze «${g}» in der richtigen Form ein.`, teile:[v, {l:[l]}, n], erkl:`${v}${l}${n}`};
};
G.endung = () => { const [v, n, g, l] = nimm(ADJ_ENDUNG); return {typ:"eingabe", thema:"Adjektiv vor dem Nomen", frage:`Setze «${g}» mit der richtigen Endung ein.`, teile:[v, {l:[l]}, n],
  erkl:`${v}${l}${n} – vor einem Nomen bekommt das Adjektiv eine Endung.`}; };
G.adjBilden = () => { const [w, n, l] = nimm(ADJ_BILDEN); return {typ:"eingabe", thema:"Adjektive bilden", frage:`Bilde ein Adjektiv mit dem Nachmorphem ${n}.`, teile:[`${w} → `, {l:[l]}],
  erkl:`${w} → ${l}. Adjektive schreibt man klein.`}; };
G.adjMulti = () => {
  const ja = mische(ADJ.map(a => a[0])).slice(0, 3);
  const nein = mische(NOMEN.map(x => x[1]).slice(0, 20).concat(VERBEN.map(v => v.inf))).slice(0, 3);
  return {typ:"multi", thema:"Adjektive erkennen", frage:"Welche Wörter sind Adjektive? Mach die Vergleichsprobe.", gross:true, optionen:mische(ja.concat(nein)), richtig:ja,
    erkl:`Adjektive kann man vergleichen: ${ja.map(w => { const a = ADJ.find(x => x[0] === w); return `${a[0]} – ${a[1]}`; }).join(", ")}.`};
};

/* ---- Pronomen ---- */
G.pronTap = () => tapWortart("P");
G.pronTapKnack = () => tapWortart("P", {alle:true});
G.ersetzen = () => { const [n, r, l] = nimm(ERSETZEN); return {typ:"wahl", thema:"Nomen ersetzen", frage:`Ersetze «${n}» durch ein Pronomen.`, zeile:`___${r}`,
  optionen: l === "Wir" || l === "Ihr" ? ["Wir","Ihr","Sie"] : ["Er","Sie","Es"], richtig:l, erkl:`${n}${r} → ${l}${r}`}; };
G.pronFall = () => { const [v, n, l, o] = nimm(PRON_FALL); return {typ:"wahl", thema:"Pronomen im Satz", frage:"Welches Pronomen passt?", zeile:`${v}___${n}`, optionen:o, richtig:l,
  erkl:`${v}${l}${n}`}; };
G.besitz = () => { const [v, n, l, o] = nimm(BESITZ); return {typ:"wahl", thema:"Wem gehört es?", frage:"Welches Pronomen passt?", zeile:`${v}___${n}`, optionen:o, richtig:l,
  erkl:`${v}${l}${n}`}; };
G.pronMulti = () => {
  const ja = mische(PRON_WOERTER).slice(0, 3), nein = mische(NICHT_PRON).slice(0, 3);
  return {typ:"multi", thema:"Pronomen erkennen", frage:"Welche Wörter sind Pronomen? Schau in der Pronomenliste nach.", gross:true, liste:true, optionen:mische(ja.concat(nein)), richtig:ja,
    erkl:"Pronomen findest du in der Pronomenliste. Auch die Begleiter (der, die, das, ein, eine) gehören dazu."};
};
G.ersatzSatz = () => { const [s, r, f1, f2] = nimm(ERSATZ_SATZ); return {typ:"wahl", thema:"Ersatzprobe", frage:"Ersetze die Nomen durch Pronomen. Welcher Satz ist richtig?", zeile:s, optionen:mische([r, f1, f2]), richtig:r, lang:true,
  erkl:`Richtig: «${r}» – frag nach dem Fall (Wer? Wem? Wen?) und wähle das passende Pronomen.`}; };
G.fragewort = () => { const [w, wa] = nimm(FRAGEWORT); return {typ:"wahl", thema:"Fragewörter", frage:`Ist das Fragewort «${w}» ein Pronomen oder eine Partikel?`, optionen:["Pronomen","Partikel"], richtig:WA[wa],
  erkl: wa === "P" ? `«${w}» steht in der Pronomenliste (wer, wen, wem, wessen, was, welcher).` : `«${w}» kann man nicht verändern – es ist eine Partikel. Pronomen sind nur: wer, wen, wem, wessen, was, welcher.`}; };

/* ---- Partikeln ---- */
G.partTap = () => tapWortart("X");
G.partTapAlle = () => tapWortart("X", {alle:true});
G.veraenderbar = () => { const [w, ja, b] = nimm(VERAENDERBAR); return {typ:"wahl", thema:"Veränderbar?", frage:`Kann man das Wort «${w}» verändern?`, optionen:["Ja, veränderbar","Nein, nicht veränderbar"],
  richtig: ja ? "Ja, veränderbar" : "Nein, nicht veränderbar", erkl: ja ? `Ja: ${b}. Also ist es keine Partikel.` : `«${w}» bleibt immer gleich – es ist eine Partikel.`}; };
G.keinePartikel = () => { const p = mische(PARTIKELN).slice(0, 3), k = nimm(KEINE_PARTIKEL);
  return {typ:"wahl", thema:"Partikeln erkennen", frage:"Welches Wort ist keine Partikel?", optionen:mische(p.concat([k])), richtig:k, gross:true,
    erkl:`«${k}» kann man verändern – also ist es keine Partikel. ${p.join(", ")} bleiben immer gleich.`}; };
G.verbinden = () => { const [v, n, l, o] = nimm(VERBINDEN); return {typ:"wahl", thema:"Partikeln einsetzen", frage:"Welche Partikel passt?", zeile:`${v}___${n}`, optionen:mische(o), richtig:l,
  erkl:`${v}${l}${n}${l === "dass" ? " – «dass» mit ss verbindet zwei Sätze. «das» wäre ein Pronomen." : ""}`}; };
G.partGenau = () => { const [w, g] = nimm(PART_GENAU); return {typ:"wahl", thema:"Partikeln genauer", frage:`Was für eine Partikel ist «${w}»?`, optionen:Object.values(PART_GRUPPE), richtig:PART_GRUPPE[g], lang:true,
  erkl:`«${w}»: ${PART_GRUPPE[g]}.`}; };
G.grossAnfang = () => { const [v, w, n, wa] = nimm(GROSS_ANFANG); return {typ:"wahl", thema:"Partikel am Satzanfang", frage:`Ist «${w}» hier ein Nomen oder eine Partikel?`, zeileHtml:true,
  zeile:`${esc(v)}<mark>${esc(w)}</mark>${esc(n)}`, optionen:["Nomen","Partikel"], richtig:WA[wa],
  erkl: wa === "N" ? `Mit Begleiter («${(v.trim() || "der").toLowerCase()} ${w}») ist es ein Nomen.` : `«${w}» steht nur gross, weil es am Satzanfang steht. Man kann es nicht verändern – es ist eine Partikel.`}; };

/* ---- Kreisel ---- */
G.kreisel3 = () => kreiselWort({drei:true});
G.kreisel5 = () => kreiselWort({});
G.kreiselKnack = () => kreiselWort({knack:true});
G.kreiselWeg = () => kreiselDurchspielen();
G.pinsel = () => pinsel();

/* ---- Morpheme ---- */
const lang = (m, n) => m.length >= n;
G.stammFinden = () => {
  const m = nimm(MORPH.filter(m => m.length <= 3)), w = MORPH_WORT(m), s = m.find(x => x.r === "S");
  const falsch = s.t.length > 3 ? s.t.slice(0, -1) : MORPH_WORT(m.filter(x => x.r !== "V")).toLowerCase();
  const optionen = mische(Array.from(new Set(m.map(x => x.t.toLowerCase()).concat([falsch.toLowerCase()]))));
  return {typ:"wahl", thema:"Stamm-Morphem", frage:`Welches ist das Stamm-Morphem von «${w}»?`, optionen, richtig:s.t.toLowerCase(),
    erkl:`${m.map(x => x.t).join(" | ")} – das Stamm-Morphem «${s.t.toLowerCase()}» trägt die Bedeutung.`};
};
G.familieNicht = () => { const [ja, nein] = nimm(FAMILIEN); return {typ:"wahl", thema:"Wortfamilie", frage:"Welches Wort gehört nicht zur Wortfamilie?", optionen:mische(ja.concat([nein])), richtig:nein,
  erkl:`${ja.join(", ")} haben dasselbe Stamm-Morphem. «${nein}» sieht nur ähnlich aus.`}; };
G.gemeinsam = () => { const [ja, , s] = nimm(FAMILIEN.filter(f => f[2])); const falsch = [s.slice(0, -1), s + "er"];
  return {typ:"wahl", thema:"Wortfamilie", frage:"Welches Stamm-Morphem steckt in allen drei Wörtern?", zeile:ja.join(" · "), optionen:mische([s].concat(falsch)), richtig:s,
    erkl:`In ${ja.join(", ")} steckt das Stamm-Morphem «${s}».`}; };
G.zerlegen = (lang3) => {
  const m = nimm(MORPH.filter(m => lang3 ? m.length >= 3 : m.length <= 3 && m.length >= 2 && m.filter(x => x.r === "V").length <= 1));
  const w = MORPH_WORT(m); let i = 0; const grenzen = [];
  m.slice(0, -1).forEach(x => { i += x.t.length; grenzen.push(i); });
  return {typ:"zerlegen", thema: lang3 ? "Lange Wörter zerlegen" : "Wörter zerlegen", frage:"Zerlege das Wort in Morpheme. Tippe auf einen Buchstaben – dahinter kommt ein Strich.",
    wort:w, grenzen, teile:m, erkl:`${m.map(x => x.t).join(" | ")} → ${m.map(x => ROLLE[x.r]).join(" + ")}`};
};
G.rolle = () => {
  const m = nimm(MORPH.filter(m => m.length >= 2)), k = zufall(m.length), x = m[k];
  return {typ:"wahl", thema:"Vor-, Stamm- oder Nachmorphem", frage:"Was ist der markierte Teil?", zeileHtml:true,
    zeile: m.map((y, j) => j === k ? `<mark>${esc(y.t)}</mark>` : esc(y.t)).join('<span class="trenn">|</span>'), optionen:["Vormorphem","Stamm-Morphem","Nachmorphem"], richtig:ROLLE[x.r],
    erkl:`«${x.t}» ist ${x.r === "S" ? "das" : "ein"} ${ROLLE[x.r]}. ${x.r === "V" ? "Es steht vor dem Stamm." : x.r === "N" ? "Es steht nach dem Stamm." : "Es trägt die Bedeutung."}`};
};
G.nachWahl = () => { const [s, ziel, l, o] = nimm(NACH_WAHL); return {typ:"wahl", thema:"Nachmorpheme", frage:`Bilde ein ${ziel}: Welches Nachmorphem passt?`, zeile:`${s} + ___`, optionen:mische(o), richtig:l,
  erkl:`${s} + ${l} → ${ziel === "Nomen" ? gross1(s + l) : s + l}`}; };
G.vorGegenteil = () => { const w = nimm(UN_WOERTER); return {typ:"wahl", thema:"Vormorpheme", frage:"Welches Vormorphem macht das Gegenteil?", zeile:`___${w}`, optionen:mische(["un","ver","be"]), richtig:"un",
  erkl:`un + ${w} → un${w}. Das Vormorphem «un» macht das Gegenteil.`}; };
G.wortartNach = () => { const [w, n, wa] = nimm(NACH_WORTART); return {typ:"wahl", thema:"Nachmorphem und Wortart", frage:`Welche Wortart ist «${w}»? Das Nachmorphem verrät es.`, optionen:["Nomen","Verb","Adjektiv"], richtig:WA[wa],
  erkl:`-${n}: ${wa === "N" ? "Wörter mit -ung, -heit, -keit, -schaft, -nis sind Nomen." : "Wörter mit -lich, -ig, -bar, -los, -isch sind Adjektive."}`}; };
G.stammWechsel = () => { const [s, ja, nein] = nimm(STAMM_WECHSEL); const j = mische(ja).slice(0, 3);
  return {typ:"multi", thema:"Stamm verändert sich", frage:`Welche Wörter gehören zur Wortfamilie mit dem Stamm «${s}»? Achtung: Der Stamm kann sich ein wenig verändern.`, optionen:mische(j.concat(nein)), richtig:j,
    erkl:`${j.join(", ")} gehören dazu – auch wenn sich ein Selbstlaut verändert. ${nein.join(" und ")} gehören nicht dazu.`}; };

/* ---- Sätze bauen ---- */
function verschoben(s, k){
  // Satzglied k an den Anfang, Personalform an 2. Stelle, «wer» danach, Rest in Grundreihenfolge, Verbteil am Schluss
  const pf = s.find(x => x.r === "PF"), vt = s.find(x => x.r === "VT");
  const rest = s.filter((x, i) => i !== k && x.r !== "PF" && x.r !== "VT");
  return [s[k], pf].concat(rest, vt ? [vt] : []);
}
G.pfTap = () => {
  const s = nimm(SG.filter(s => !s.some(x => x.r === "VT")));
  const k = nimm(s.map((x, i) => i).filter(i => s[i].r !== "PF"));
  const segs = k === 0 ? s : verschoben(s, k);
  return {typ:"tap", einzeln:true, thema:"Personalform finden", frage:"Tippe die Personalform an.",
    woerter: segs.flatMap((x, i) => x.t.split(" ").map((t, j) => ({t: i === 0 && j === 0 ? gross1(t) : t, z: x.r === "PF", info: x.r === "PF" ? "Personalform" : "keine Personalform"}))).concat([{t:".", p:true}]),
    erkl:"Die Personalform ist das Verb, das sich der Person anpasst. Im Aussagesatz steht sie an 2. Stelle."};
};
G.verschiebe = () => {
  const s = nimm(SG.filter(s => s.length >= 4 && !s.some(x => x.r === "VT")));
  const ks = s.map((x, i) => i).filter(i => i >= 2);
  const k = nimm(ks), r = verschoben(s, k);
  const richtig = satzAus(r);
  // falsch 1: Personalform an 3. Stelle
  const f1 = satzAus([r[0], r[2], r[1]].concat(r.slice(3)));
  // falsch 2: ein Satzglied auseinandergerissen
  const lange = s.map((x, i) => i).filter(i => s[i].t.includes(" ") && s[i].r !== "PF");
  let f2;
  if(lange.length){
    const m = nimm(lange), w = s[m].t.split(" "), letztes = w.pop();
    const neu = s.map((x, i) => i === m ? {t:w.join(" "), r:x.r} : x);
    f2 = satzAus([{t:letztes, r:"x"}].concat(neu));
  } else {
    f2 = satzAus(s.filter(x => x.r !== "PF").concat([s.find(x => x.r === "PF")]));
  }
  return {typ:"wahl", thema:"Verschiebeprobe", frage:"Verschiebeprobe: Welcher Satz ist richtig umgestellt?", zeile:satzAus(s), optionen:mische([richtig, f1, f2]), richtig, lang:true,
    erkl:`Richtig: «${richtig}» – Die Satzglieder bleiben zusammen, und die Personalform «${s.find(x => x.r === "PF").t}» bleibt an 2. Stelle.`};
};
G.bauen = (mitVT) => {
  const s = nimm(SG.filter(s => mitVT ? s.some(x => x.r === "VT") : !s.some(x => x.r === "VT")));
  const ks = s.map((x, i) => i).filter(i => s[i].r !== "PF" && s[i].r !== "VT");
  const k = nimm(ks), loes = k === 0 ? s : verschoben(s, k);
  const start = s[k];
  return {typ:"bauen", thema: mitVT ? "Sätze bauen mit Verbteilen" : "Sätze bauen", frage:`Baue einen Satz, der mit «${gross1(start.t)}» beginnt.`,
    karten: mische(s.map(x => x.t)), start:start.t, pf:s.find(x => x.r === "PF").t, vt:(s.find(x => x.r === "VT") || {}).t || null, loesung:satzAus(loes),
    erkl:`Zum Beispiel: «${satzAus(loes)}» – die Personalform steht an 2. Stelle${mitVT ? ", der weitere Verbteil ganz am Schluss" : ""}.`};
};
G.verbenfaecher = (alle) => {
  const s = nimm(SG.filter(s => alle || !s.some(x => x.r === "VT")));
  const fragbar = s.map((x, i) => i).filter(i => FRAGE[s[i].r] && s.filter(y => y.r === s[i].r).length === 1);
  const k = nimm(fragbar), pf = s.find(x => x.r === "PF");
  return {typ:"tap", einzeln:true, segmente:true, thema:"Verbenfächer", frage:`Frag mit dem Verb: «${FRAGE[s[k].r]}» Tippe das Satzglied an, das antwortet.`,
    woerter: s.map((x, i) => ({t: i === 0 ? gross1(x.t) : x.t, z: i === k, info: x.r === "PF" ? "Personalform" : x.r === "VT" ? "weiterer Verbteil" : `antwortet auf «${FRAGE[x.r]}»`})).concat([{t:".", p:true}]),
    erkl:`«${gross1(s[k].t)}» antwortet auf die Frage «${FRAGE[s[k].r]}» (zum Verb «${pf.t}»).`};
};

/* =====================================================================
   THEMEN UND STUFEN
   ===================================================================== */
const THEMEN = [
  {id:"nomen", name:"Nomen", zeichen:"N", farbe:"#2f6fd6",
    hilfe:[
      "Nomen sind Namen für Menschen, Tiere, Pflanzen und Dinge – auch für Gefühle und Gedanken: die Freude, der Mut, die Idee.",
      "<b>Begleiterprobe:</b> Man kann einen Begleiter davorsetzen: der, die, das, ein, eine.",
      "Ein Nomen hat ein <b>festes Geschlecht</b>: der Baum, die Blume, das Haus.",
      "Die meisten Nomen haben eine Mehrzahl: der Baum – die Bäume. Nomen schreibt man gross.",
      "<b>Knacknuss:</b> Auch Verben und Adjektive werden zu Nomen, wenn ein Begleiter davorsteht: das Lachen, beim Schwimmen, die Kleine."
    ],
    stufen:[
      {titel:"Repetition 4./5. Klasse", text:"Nomen finden, Begleiter und Mehrzahl", gen:["nomenTap","begleiter","mehrzahl"]},
      {titel:"6. Klasse", text:"Gefühle als Nomen, Nomen bilden, Fälle", gen:["abstrakt","nomenBilden","fall","nomenTap"]},
      {titel:"Knacknüsse", text:"Nomen aus Verben und Adjektiven, knifflige Mehrzahl", gen:["nominal","nomenTapKnack","mehrzahlKnack"]}
    ]},
  {id:"verben", name:"Verben", zeichen:"V", farbe:"#d6402f",
    hilfe:[
      "Verben sagen, was jemand tut oder was geschieht: spielen, regnen, sein.",
      "<b>Konjugationsprobe:</b> Man kann Verben konjugieren: ich spiele, du spielst, er spielt …",
      "<b>Grundform (Infinitiv):</b> spielen · <b>Personalform:</b> die Form, die zur Person passt: du spielst.",
      "<b>Zeitformen:</b> Präsens (ich spiele) · Präteritum (ich spielte) · Perfekt (ich habe gespielt) · Plusquamperfekt (ich hatte gespielt) · Futur (ich werde spielen).",
      "Das Perfekt bildet man mit «haben» oder «sein». Bei Bewegungen von einem Ort zum andern meist mit «sein»: ich bin gelaufen."
    ],
    stufen:[
      {titel:"Repetition 4./5. Klasse", text:"Verben finden, Grundform, Personalform, drei Zeitformen", gen:["verbTap","grundform","personalform","zeitform"]},
      {titel:"6. Klasse", text:"Alle fünf Zeitformen, Sätze umsetzen, Personalform finden", gen:["zeitform5","zeitSetzen","personalformTap"]},
      {titel:"Knacknüsse", text:"Unregelmässige Verben, haben oder sein, Verbteile", gen:["personalformStark","praeteritum","habenSein","verbteile","grundformStark"]}
    ]},
  {id:"adjektive", name:"Adjektive", zeichen:"A", farbe:"#2f9e44",
    hilfe:[
      "Adjektive sagen, wie etwas ist: gross, laut, freundlich.",
      "<b>Vergleichsprobe:</b> Man kann Adjektive vergleichen: gross – grösser – am grössten.",
      "Vor einem Nomen bekommt das Adjektiv eine Endung: ein grosser Hund, die grosse Katze.",
      "Viele Adjektive enden auf -ig, -lich, -bar, -los oder -isch: mutig, freundlich, lesbar.",
      "<b>Knacknuss:</b> Auch beim Verb bleibt es ein Adjektiv: Der Hund bellt laut (lauter, am lautesten). Unregelmässig: gut – besser – am besten, hoch – höher – am höchsten."
    ],
    stufen:[
      {titel:"Repetition 4./5. Klasse", text:"Adjektive finden und vergleichen", gen:["adjTap","vergleich","vergleichSatz"]},
      {titel:"6. Klasse", text:"Endungen vor dem Nomen, Adjektive bilden und erkennen", gen:["endung","adjBilden","adjMulti"]},
      {titel:"Knacknüsse", text:"Adjektive beim Verb, unregelmässig vergleichen", gen:["adjTapKnack","vergleichSchwer","vergleichSatzSchwer"]}
    ]},
  {id:"pronomen", name:"Pronomen", zeichen:"P", farbe:"#8a4fd1", liste:true,
    hilfe:[
      "Pronomen kann man verändern. Sie haben aber kein festes Geschlecht, und man kann sie weder konjugieren noch vergleichen.",
      "Am sichersten bist du mit der <b>Pronomenliste</b> (Knopf «Pronomenliste»).",
      "Pronomen können Nomen <b>ersetzen</b> (Lena → sie) oder <b>begleiten</b> (mein Velo, dieses Buch).",
      "Auch die Begleiter <b>der, die, das, ein, eine</b> gehören zu den Pronomen.",
      "<b>Knacknuss:</b> Die Fragewörter wer, wen, wem, wessen, was und welcher sind Pronomen. Wann, wo, warum und wie sind Partikeln."
    ],
    stufen:[
      {titel:"Einstieg", text:"Nomen ersetzen, Pronomen finden", gen:["ersetzen","pronTap"]},
      {titel:"6. Klasse", text:"Pronomen im Satz, Besitz, Begleiter sind Pronomen", gen:["pronFall","besitz","pronMulti"]},
      {titel:"Knacknüsse", text:"Ersatzprobe mit ganzen Sätzen, Fragewörter", gen:["ersatzSatz","fragewort","pronTapKnack"]}
    ]},
  {id:"partikeln", name:"Partikeln", zeichen:"Pa", farbe:"#6b7280",
    hilfe:[
      "Partikeln kann man <b>nicht verändern</b>: heute, und, mit, hier, nicht, weil.",
      "<b>Probe:</b> Versuch das Wort zu verändern – andere Person, Mehrzahl, vergleichen. Geht nichts, ist es eine Partikel.",
      "Partikeln verbinden Wörter und Sätze (und, oder, weil, dass) oder stehen vor Nomen (auf dem Tisch, mit dem Velo).",
      "<b>Knacknuss:</b> Am Satzanfang schreibt man auch Partikeln gross: «Morgen gehen wir baden.» Hier ist «Morgen» eine Partikel.",
      "<b>Genauer:</b> Präpositionen stehen vor Nomen (auf, mit, für). Konjunktionen verbinden (und, aber, weil, dass)."
    ],
    stufen:[
      {titel:"Einstieg", text:"Veränderbar oder nicht? Partikeln finden", gen:["veraenderbar","partTap"]},
      {titel:"6. Klasse", text:"Partikeln erkennen und einsetzen", gen:["keinePartikel","verbinden","partTapAlle"]},
      {titel:"Knacknüsse", text:"Partikel am Satzanfang, Präposition oder Konjunktion", gen:["grossAnfang","partGenau","fragewort"]}
    ]},
  {id:"kreisel", name:"Wortarten-Kreisel", zeichen:"⟳", farbe:"#c2255c",
    hilfe:[
      "Mit dem Kreisel bestimmst du jede Wortart mit Proben – Frage für Frage:",
      "1. <b>Kann man das Wort verändern?</b> Nein → <b>Partikel</b>.",
      "2. <b>Kann man es konjugieren?</b> (ich …, du …) Ja → <b>Verb</b>.",
      "3. <b>Hat es ein festes Geschlecht?</b> (der, die, das) Ja → <b>Nomen</b>.",
      "4. <b>Kann man es vergleichen?</b> (… -er, am … -sten) Ja → <b>Adjektiv</b>. Sonst → <b>Pronomen</b> (Pronomenliste).",
      "Pronomen passen sich an (der Hund, die Katze, das Haus) – darum haben sie kein festes Geschlecht.",
      "In der 4. und 5. Klasse hast du den Kreisel mit den drei Hauptwortarten Nomen, Verb und Adjektiv gemacht."
    ],
    stufen:[
      {titel:"Repetition 4./5. Klasse", text:"Nomen, Verb, Adjektiv – oder keine der drei?", gen:["kreisel3"]},
      {titel:"6. Klasse", text:"Alle fünf Wortarten, den Kreisel durchspielen", gen:["kreisel5","kreiselWeg"]},
      {titel:"Knacknüsse", text:"Knifflige Wörter und ganze Sätze", gen:["kreiselKnack","pinsel","kreiselKnack"]}
    ]},
  {id:"morpheme", name:"Morpheme", zeichen:"M", farbe:"#b8690a",
    hilfe:[
      "Wörter bestehen aus Bausteinen: den <b>Morphemen</b>.",
      "Das <b>Stamm-Morphem</b> trägt die Bedeutung: spiel in Spieler, spielen, Spielplatz. Wörter mit demselben Stamm bilden eine <b>Wortfamilie</b>.",
      "Ein <b>Vormorphem</b> steht vor dem Stamm: ver-, be-, ent-, er-, zer-, un-. Ein <b>Nachmorphem</b> steht danach: -er, -in, -ung, -heit, -keit, -lich, -ig, -bar.",
      "Das Nachmorphem verrät oft die Wortart: -ung, -heit, -keit, -schaft, -nis → Nomen · -lich, -ig, -bar, -los, -isch → Adjektiv.",
      "<b>Knacknuss:</b> Der Stamm kann sich ein wenig verändern: fahren – fährt – fuhr – Fähre."
    ],
    stufen:[
      {titel:"Repetition 4. Klasse", text:"Stamm-Morpheme und Wortfamilien", gen:["stammFinden","familieNicht","gemeinsam"]},
      {titel:"Repetition 5. Klasse", text:"Vor- und Nachmorpheme, Wörter zerlegen", gen:["zerlegen","rolle","nachWahl","vorGegenteil"]},
      {titel:"6. Klasse und Knacknüsse", text:"Lange Wörter zerlegen, Wortart am Nachmorphem, Stämme, die sich verändern", gen:["zerlegenLang","wortartNach","stammWechsel"]}
    ]},
  {id:"saetze", name:"Sätze bauen", zeichen:"S", farbe:"#0e7490",
    hilfe:[
      "Im Aussagesatz steht die <b>Personalform</b> an <b>2. Stelle</b>: Die Kinder <b>spielen</b> Fussball.",
      "<b>Verschiebeprobe:</b> Stell den Satz um. Wörter, die dabei zusammenbleiben, bilden ein <b>Satzglied</b>: Fussball | spielen | die Kinder.",
      "<b>Verbenfächer:</b> Frag mit dem Verb nach den Satzgliedern: Wer oder was? Wen oder was? Wem? Wann? Wo? Wie?",
      "<b>Weitere Verbteile</b> stehen am Satzende: Wir <b>haben</b> einen Fuchs <b>gesehen</b>. Der Zug <b>fährt</b> pünktlich <b>ab</b>."
    ],
    stufen:[
      {titel:"Repetition 4./5. Klasse", text:"Personalform finden, Verschiebeprobe, Sätze bauen", gen:["pfTap","verschiebe","bauen"]},
      {titel:"6. Klasse", text:"Verbenfächer: mit dem Verb nach Satzgliedern fragen", gen:["verbenfaecher","bauen","verschiebe"]},
      {titel:"Knacknüsse", text:"Sätze mit mehreren Verbteilen", gen:["verbteile","bauenVT","verbenfaecherAlle"]}
    ]}
];
/* Varianten der Generatoren mit festen Einstellungen */
G.zeitform5 = () => G.zeitform(true);
G.personalformStark = () => G.personalform(true);
G.grundformStark = () => G.grundform(true);
G.vergleichSchwer = () => G.vergleich(true);
G.vergleichSatzSchwer = () => G.vergleichSatz(true);
G.zerlegenLang = () => G.zerlegen(true);
G.bauenVT = () => G.bauen(true);
G.verbenfaecherAlle = () => G.verbenfaecher(true);
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

/* Eine Runde zusammenstellen: n Aufgaben, die Generatoren reihum, keine Aufgabe doppelt */
function runde(themaId, stufe, n){
  const th = THEMEN.find(t => t.id === themaId), st = th.stufen[stufe - 1];
  const out = [], gesehen = new Set();
  const gens = mische(st.gen);
  let i = 0, versuche = 0;
  while(out.length < n && versuche < n * 30){
    versuche++;
    const g = gens[i % gens.length];
    const a = G[g]();
    const key = g + "|" + JSON.stringify([a.frage, a.zeile, a.woerter && a.woerter.map(w => w.t).join(" "), a.teile && JSON.stringify(a.teile), a.wort, a.optionen, a.karten && a.karten.join("|")]);
    if(gesehen.has(key)) continue;
    gesehen.add(key); a.gen = g; out.push(a); i++;
  }
  return out;
}

window.GRAMMATIK = {THEMEN, G, runde, PRONOMENLISTE, WA, KREISEL_FRAGEN, SAETZE, SG, VERBEN, ADJ, MORPH, satzText, kreiselWeg};
})();
