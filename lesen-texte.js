/* =====================================================================
   Leseverstehen – Texte und Fragen (Lernportal 6b)
   Alle Texte sind eigens für das Lernportal geschrieben.

   Aufbau eines Texts:
     id, stufe (1–5), sb (true = Text der Standortbestimmung), titel, art (Textsorte, z. B. "Sachtext", "Geschichte", "Bericht"), thema,
     absaetze: [[Satz, Satz, …], …]   – jeder Satz einzeln (für «Tippe auf den Satz»)
     fragen: […]

   Fragearten (typ):
     mc       Eine Antwort wählen.            richtig: "…", falsch: ["…", …]
     multi    Mehrere Antworten wählen.       richtig: ["…", …], falsch: ["…", …]   (zählt nur, wenn alles stimmt)
     tf       Aussagen beurteilen.            aussagen: [["Aussage", "Stimmt"|"Stimmt nicht"|"Steht nicht im Text"], …]
                                              wahl: [...] (andere Auswahl, z. B. ["Tatsache","Meinung"])  (zählt nur, wenn alles stimmt)
     beleg    Antwort wählen + Satz antippen. wie mc, dazu beleg: ["Teil des richtigen Satzes", …]
     wort     Wort im Text antippen.          loesung: ["Wort", …]
     kurz     Kurz selbst schreiben.          loesung: ["Antwort", …]   (Gross/klein und kleine Tippfehler egal)
     ordnen   Reihenfolge herstellen.         items: [in der richtigen Reihenfolge]
     zuordnen Überschriften den Abschnitten.  titel: [["Überschrift", Abschnittnummer ab 1], …]

   Fähigkeit (art) – für die Auswertung:
     finden      Information steht so im Text
     verbinden   mehrere Stellen verbinden, Reihenfolge, einfache Folgerung
     schliessen  zwischen den Zeilen lesen (Gefühle, Gründe, Absichten)
     wortschatz  Wortbedeutung aus dem Zusammenhang
     ganz        den ganzen Text verstehen (Hauptaussage, Überschriften, Tatsache/Meinung)

   Optional bei jeder Frage: beleg – Satz/Sätze, die nach dem Prüfen markiert werden («Hier steht es»).
   ===================================================================== */
const LESETEXTE = [

/* ===================== Standortbestimmung ===================== */
{ id:"sb1", sb:true, stufe:1, titel:"Der Schulgarten", art:"Sachtext", thema:"Schulalltag",
  absaetze:[[
    "Die Klasse 4a hat einen Schulgarten.",
    "Er liegt hinter der Turnhalle.",
    "Jedes Kind hat ein kleines Beet.",
    "Lina pflanzt Radieschen und Salat.",
    "Tim sät Sonnenblumen.",
    "Am Mittwoch giesst die ganze Klasse die Pflanzen.",
    "Im Juni dürfen die Kinder das Gemüse ernten."
  ]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Wo liegt der Schulgarten?", richtig:"hinter der Turnhalle", falsch:["neben dem Pausenplatz","vor dem Schulhaus","hinter dem Hallenbad"], beleg:["hinter der Turnhalle"] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Jedes Kind hat ein grosses Beet.","Stimmt nicht"],["Am Mittwoch giesst die Klasse die Pflanzen.","Stimmt"],["Im Garten wachsen auch Erdbeeren.","Steht nicht im Text"]] },
    { typ:"kurz", art:"finden", frage:"In welchem Monat dürfen die Kinder das Gemüse ernten?", loesung:["Juni","im Juni"], beleg:["Im Juni"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «Gemüse und Früchte einsammeln» bedeutet.", loesung:["ernten"], beleg:["ernten"] }
  ]},

{ id:"sb2", sb:true, stufe:2, titel:"Ein Fuchs in der Stadt", art:"Sachtext", thema:"NMG Tiere",
  absaetze:[[
    "Füchse leben nicht nur im Wald.",
    "Auch in Zürich gibt es viele Füchse.",
    "Sie wohnen in Parks, in Gärten und sogar unter Gartenhäuschen.",
    "Tagsüber schlafen sie meistens.",
    "Erst wenn es dunkel wird, gehen sie auf Futtersuche."
  ],[
    "In der Stadt finden Füchse leicht etwas zu fressen.",
    "Sie fressen Mäuse, Würmer und Früchte, aber auch Essensreste aus offenen Abfallsäcken.",
    "Darum sollte man Abfallsäcke erst am Morgen des Abfuhrtags hinausstellen."
  ],[
    "Füchse sind scheu.",
    "Wenn man einem Fuchs begegnet, soll man ihn nicht füttern und nicht anfassen.",
    "Ein Fuchs, der gefüttert wird, verliert seine Scheu und kommt immer näher zu den Häusern."
  ]],
  fragen:[
    { typ:"multi", art:"finden", frage:"Was fressen Füchse in der Stadt? Wähle alles, was im Text steht.", richtig:["Mäuse","Würmer","Essensreste"], falsch:["Fische","Vogelfutter","Gras"], beleg:["Sie fressen Mäuse"] },
    { typ:"beleg", art:"verbinden", frage:"Warum soll man Abfallsäcke erst am Morgen des Abfuhrtags hinausstellen?", richtig:"Damit Füchse in der Nacht nicht an die Essensreste kommen.", falsch:["Weil die Säcke sonst nass werden.","Weil die Kehrichtabfuhr nur am Morgen fährt.","Weil Füchse am Morgen besonders hungrig sind."], beleg:["Essensreste aus offenen Abfallsäcken","Darum sollte man Abfallsäcke","Erst wenn es dunkel wird"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «ängstlich, hält Abstand zu Menschen» bedeutet.", loesung:["scheu"], beleg:["Füchse sind scheu."] },
    { typ:"mc", art:"finden", frage:"Was passiert, wenn man einen Fuchs füttert?", richtig:"Er kommt immer näher zu den Häusern.", falsch:["Er wird krank.","Er zieht zurück in den Wald.","Er schläft nachts statt tagsüber."], beleg:["verliert seine Scheu"] }
  ]},

{ id:"sb3", sb:true, stufe:3, titel:"Die Neue", art:"Geschichte", thema:"Schulalltag",
  absaetze:[[
    "Am ersten Schultag nach den Ferien stand ein fremdes Mädchen vor der Tür des Schulzimmers.",
    "Es hielt seinen Rucksack mit beiden Händen fest und schaute auf den Boden.",
    "«Das ist Selin», sagte Frau Keller.",
    "«Sie ist mit ihrer Familie aus Basel hierhergezogen.»"
  ],[
    "Selin setzte sich an den freien Platz neben Noah.",
    "In der Pause stand sie allein beim Brunnen.",
    "Die anderen spielten Fussball.",
    "Noah zögerte kurz.",
    "Dann rannte er zu ihr und fragte: «Willst du bei uns im Tor stehen?»"
  ],[
    "Selin zuckte mit den Schultern, aber sie kam mit.",
    "Nach der Pause war ihr Gesicht ganz rot, und sie lachte.",
    "«In Basel war ich auch immer im Tor», erzählte sie.",
    "Am nächsten Morgen wartete sie schon vor dem Schulhaus auf Noah."
  ]],
  fragen:[
    { typ:"mc", art:"schliessen", frage:"Wie fühlt sich Selin am ersten Morgen?", richtig:"unsicher", falsch:["wütend","gelangweilt","fröhlich","stolz"], beleg:["schaute auf den Boden"] },
    { typ:"beleg", art:"schliessen", frage:"Warum geht Noah zu Selin?", richtig:"Er sieht, dass sie allein ist.", falsch:["Frau Keller hat es ihm befohlen.","Er will nicht mehr Fussball spielen.","Selin hat ihn gerufen."], beleg:["stand sie allein beim Brunnen"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das zeigt: Noah war sich zuerst nicht ganz sicher.", loesung:["zögerte"], beleg:["Noah zögerte kurz."] },
    { typ:"mc", art:"ganz", frage:"Was zeigt der letzte Satz der Geschichte?", richtig:"Selin und Noah werden Freunde.", falsch:["Selin hat Angst vor der Schule.","Selin kennt den Schulweg noch nicht.","Noah wartet jeden Tag auf Selin."], beleg:["wartete sie schon vor dem Schulhaus"] }
  ]},

/* ===================== Stufe 1: genau lesen ===================== */
{ id:"s1-velo", stufe:1, titel:"Die Veloprüfung", art:"Sachtext", thema:"NMG Verkehr",
  absaetze:[[
    "In der fünften Klasse machen alle Kinder die Veloprüfung.",
    "Zuerst üben sie auf dem Pausenplatz.",
    "Ein Polizist erklärt die Verkehrsregeln.",
    "Er zeigt auch, wie man richtig abbiegt: Man schaut nach hinten und streckt den Arm aus.",
    "Danach fahren die Kinder auf der Strasse.",
    "Am Prüfungstag tragen alle einen Helm und eine gelbe Weste.",
    "Wer die Prüfung besteht, bekommt einen Ausweis."
  ]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Wer erklärt die Verkehrsregeln?", richtig:"ein Polizist", falsch:["die Lehrerin","ein Velomechaniker","die Eltern"], beleg:["Ein Polizist erklärt"] },
    { typ:"multi", art:"finden", frage:"Was macht man beim Abbiegen? Wähle alles, was im Text steht.", richtig:["nach hinten schauen","den Arm ausstrecken"], falsch:["klingeln","anhalten","schneller fahren"], beleg:["wie man richtig abbiegt"] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Die Kinder üben zuerst auf der Strasse.","Stimmt nicht"],["Am Prüfungstag tragen alle einen Helm.","Stimmt"],["Die Prüfung dauert zwei Stunden.","Steht nicht im Text"],["Wer besteht, bekommt einen Ausweis.","Stimmt"]] },
    { typ:"kurz", art:"finden", frage:"Welche Farbe hat die Weste?", loesung:["gelb","gelbe","gelbe Weste"], beleg:["gelbe Weste"] },
    { typ:"beleg", art:"finden", frage:"Wo üben die Kinder zuerst?", richtig:"auf dem Pausenplatz", falsch:["auf der Strasse","in der Turnhalle","auf dem Veloweg"], beleg:["Zuerst üben sie"] }
  ]},

{ id:"s1-igel", stufe:1, titel:"Der Igel im Herbst", art:"Sachtext", thema:"NMG Tiere",
  absaetze:[[
    "Im Herbst sieht man manchmal einen Igel im Garten.",
    "Er sucht Käfer, Würmer und Schnecken.",
    "Der Igel frisst jetzt besonders viel.",
    "So legt er eine dicke Fettschicht an.",
    "Wenn es kalt wird, baut er ein Nest aus Laub.",
    "Dort schläft er den ganzen Winter.",
    "Diesen langen Schlaf nennt man Winterschlaf.",
    "Im Frühling wacht der Igel wieder auf.",
    "Dann ist er sehr hungrig."
  ]],
  fragen:[
    { typ:"multi", art:"finden", frage:"Was frisst der Igel laut Text? Wähle alles, was im Text steht.", richtig:["Käfer","Würmer","Schnecken"], falsch:["Nüsse","Äpfel","Gras"], beleg:["Er sucht Käfer"] },
    { typ:"beleg", art:"verbinden", frage:"Warum frisst der Igel im Herbst besonders viel?", richtig:"Er legt eine Fettschicht für den Winter an.", falsch:["Er hat im Herbst mehr Zeit.","Er wächst im Herbst am schnellsten.","Er muss seine Jungen füttern."], beleg:["dicke Fettschicht"] },
    { typ:"kurz", art:"finden", frage:"Wie nennt man den langen Schlaf des Igels?", loesung:["Winterschlaf","der Winterschlaf"], beleg:["nennt man Winterschlaf"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort für «Blätter, die von den Bäumen gefallen sind».", loesung:["Laub"], beleg:["Nest aus Laub"] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Im Frühling schläft der Igel ein.","Stimmt nicht"],["Im Frühling ist der Igel sehr hungrig.","Stimmt"],["Igel können gut schwimmen.","Steht nicht im Text"]] }
  ]},

{ id:"s1-znueni", stufe:1, titel:"Der Znüni-Tag", art:"Sachtext", thema:"Schulalltag",
  absaetze:[[
    "In der Klasse von Frau Huber gibt es jeden Dienstag einen Znüni-Tag.",
    "Zwei Kinder bringen dann Früchte und Gemüse für alle mit.",
    "Diese Woche sind Aylin und Jonas an der Reihe.",
    "Aylin bringt Äpfel und Trauben.",
    "Jonas schneidet Rüebli und Gurken in Stängel.",
    "In der Pause essen alle zusammen.",
    "Süssigkeiten sind am Znüni-Tag nicht erlaubt.",
    "Frau Huber sagt: «Ein gesundes Znüni gibt Kraft für den ganzen Vormittag.»"
  ]],
  fragen:[
    { typ:"mc", art:"finden", frage:"An welchem Tag ist der Znüni-Tag?", richtig:"am Dienstag", falsch:["am Montag","am Mittwoch","am Freitag"], beleg:["jeden Dienstag"] },
    { typ:"mc", art:"verbinden", frage:"Was bringt Jonas mit?", richtig:"Rüebli und Gurken", falsch:["Äpfel und Trauben","Rüebli und Trauben","Gurken und Äpfel"], beleg:["Jonas schneidet"] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Am Znüni-Tag darf man Schokolade mitbringen.","Stimmt nicht"],["Alle essen in der Pause zusammen.","Stimmt"],["Aylin hat heute Geburtstag.","Steht nicht im Text"]] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «Karotten» bedeutet.", loesung:["Rüebli"], beleg:["Jonas schneidet"] },
    { typ:"beleg", art:"finden", frage:"Warum ist ein gesundes Znüni wichtig?", richtig:"Es gibt Kraft für den ganzen Vormittag.", falsch:["Es ist billiger als Süssigkeiten.","Es schmeckt besser als Kuchen.","Frau Huber mag keine Süssigkeiten."], beleg:["gibt Kraft für den ganzen Vormittag"] }
  ]},

/* ===================== Stufe 2: Informationen verbinden ===================== */
{ id:"s2-brot", stufe:2, titel:"Vom Korn zum Brot", art:"Sachtext", thema:"NMG Ernährung",
  absaetze:[[
    "Brot gehört bei uns zu fast jeder Mahlzeit.",
    "Doch bis ein Brot auf dem Tisch liegt, braucht es viele Schritte."
  ],[
    "Im Herbst sät der Bauer Weizen auf sein Feld.",
    "Die kleinen Pflanzen wachsen über den Winter langsam.",
    "Im Sommer sind die Ähren goldgelb und reif.",
    "Dann fährt der Bauer mit dem Mähdrescher über das Feld.",
    "Die Maschine schneidet die Halme ab und trennt die Körner vom Stroh."
  ],[
    "Die Körner kommen in die Mühle.",
    "Dort werden sie zu feinem Mehl gemahlen.",
    "Die Bäckerin kauft das Mehl.",
    "Sie mischt es mit Wasser, Hefe und Salz zu einem Teig.",
    "Der Teig muss eine Stunde ruhen, damit er aufgeht.",
    "Erst danach formt sie die Brote und schiebt sie in den heissen Ofen."
  ],[
    "Am frühen Morgen duftet es in der Bäckerei nach frischem Brot."
  ]],
  fragen:[
    { typ:"ordnen", art:"verbinden", frage:"Bring die Schritte in die richtige Reihenfolge.", items:["Der Bauer sät Weizen.","Der Mähdrescher trennt die Körner vom Stroh.","In der Mühle wird Mehl gemahlen.","Die Bäckerin macht einen Teig.","Die Brote kommen in den Ofen."] },
    { typ:"multi", art:"finden", frage:"Was braucht die Bäckerin für den Teig? Wähle alles, was im Text steht.", richtig:["Mehl","Wasser","Hefe","Salz"], falsch:["Milch","Zucker","Eier"], beleg:["Sie mischt es"] },
    { typ:"beleg", art:"finden", frage:"Warum muss der Teig eine Stunde ruhen?", richtig:"Damit er aufgeht.", falsch:["Damit er abkühlt.","Damit die Bäckerin eine Pause machen kann.","Damit sich das Salz auflöst."], beleg:["damit er aufgeht"] },
    { typ:"kurz", art:"finden", frage:"Wie heisst die Maschine, die die Körner vom Stroh trennt?", loesung:["Mähdrescher","der Mähdrescher","ein Mähdrescher"], beleg:["Mähdrescher"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «riecht gut» bedeutet.", loesung:["duftet"], beleg:["duftet"] },
    { typ:"mc", art:"verbinden", frage:"Wann ist der Weizen reif?", richtig:"im Sommer", falsch:["im Herbst","im Winter","im Frühling"], beleg:["Im Sommer sind die Ähren"] }
  ]},

{ id:"s2-zoo", stufe:2, titel:"Mit dem Zug in den Zoo", art:"Sachtext", thema:"Schulalltag / ÖV",
  absaetze:[[
    "Die Klasse 5b besucht den Zoo Zürich.",
    "Herr Meier hat die Reise genau geplant."
  ],[
    "Um 8.10 Uhr treffen sich alle beim Bahnhof Oerlikon.",
    "Der Zug fährt um 8.22 Uhr auf Gleis 3 ab.",
    "Nach nur acht Minuten kommt die Klasse im Hauptbahnhof an.",
    "Dort steigen alle in das Tram Nummer 6.",
    "Das Tram fährt bis zur Endstation «Zoo».",
    "Die Fahrt dauert etwa eine Viertelstunde."
  ],[
    "Herr Meier erinnert die Kinder: «Bleibt immer in eurer Gruppe.",
    "Wer die Gruppe verliert, wartet beim Eingang.»",
    "Jede Gruppe bekommt einen Plan vom Zoo.",
    "Um 12 Uhr essen alle zusammen beim Spielplatz.",
    "Die Rückfahrt beginnt um 14.30 Uhr."
  ]],
  fragen:[
    { typ:"kurz", art:"finden", frage:"Auf welchem Gleis fährt der Zug ab?", loesung:["3","Gleis 3","drei","Gleis drei"], beleg:["auf Gleis 3"] },
    { typ:"beleg", art:"verbinden", frage:"Um wie viel Uhr kommt die Klasse im Hauptbahnhof an?", richtig:"um 8.30 Uhr", falsch:["um 8.22 Uhr","um 8.18 Uhr","um 8.40 Uhr"], beleg:["Nach nur acht Minuten","Der Zug fährt um 8.22 Uhr"] },
    { typ:"ordnen", art:"verbinden", frage:"Bring den Ablauf des Ausflugs in die richtige Reihenfolge.", items:["Treffpunkt beim Bahnhof Oerlikon","Fahrt mit dem Zug","Umsteigen ins Tram Nummer 6","Mittagessen beim Spielplatz","Rückfahrt"] },
    { typ:"beleg", art:"finden", frage:"Was soll ein Kind tun, das seine Gruppe verliert?", richtig:"beim Eingang warten", falsch:["Herrn Meier anrufen","zum Spielplatz gehen","allein zum Bahnhof zurückfahren"], beleg:["wartet beim Eingang"] },
    { typ:"tf", art:"verbinden", frage:"Stimmt das?", aussagen:[["Das Tram fährt bis zur Endstation «Zoo».","Stimmt"],["Um 12 Uhr essen alle beim Eingang.","Stimmt nicht"],["Die Klasse schaut sich zuerst die Elefanten an.","Steht nicht im Text"],["Die Rückfahrt beginnt am Nachmittag.","Stimmt"]] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «letzte Haltestelle» bedeutet.", loesung:["Endstation"], beleg:["Endstation"] }
  ]},

{ id:"s2-wasser", stufe:2, titel:"Wasser aus dem Hahn", art:"Sachtext", thema:"NMG Wasser",
  absaetze:[[
    "In der Schweiz kann man das Wasser aus dem Wasserhahn ohne Bedenken trinken.",
    "Doch woher kommt dieses Wasser eigentlich?"
  ],[
    "In der Stadt Zürich stammt der grösste Teil des Trinkwassers aus dem Zürichsee.",
    "Das Wasser wird in etwa dreissig Metern Tiefe aus dem See gepumpt.",
    "Dort unten ist es das ganze Jahr kühl und sauber.",
    "Trotzdem wird es in einem Wasserwerk gereinigt.",
    "Grosse Filter aus Sand halten kleinste Teilchen zurück.",
    "Danach wird das Wasser in Leitungen bis in die Häuser gepumpt."
  ],[
    "Ein kleinerer Teil des Trinkwassers kommt aus Quellen und aus dem Grundwasser.",
    "Grundwasser ist Regen- oder Flusswasser, das langsam durch den Boden sickert.",
    "Dabei wird es auf natürliche Weise gefiltert."
  ],[
    "Zu Hause braucht jede Person in der Schweiz pro Tag ungefähr 140 Liter Wasser.",
    "Am meisten Wasser braucht man für die Toilettenspülung und zum Duschen."
  ]],
  fragen:[
    { typ:"mc", art:"finden", frage:"Woher kommt der grösste Teil des Zürcher Trinkwassers?", richtig:"aus dem Zürichsee", falsch:["aus Quellen","aus dem Grundwasser","aus der Limmat"], beleg:["der grösste Teil des Trinkwassers"] },
    { typ:"beleg", art:"verbinden", frage:"Warum pumpt man das Wasser aus dreissig Metern Tiefe?", richtig:"Weil es dort kühl und sauber ist.", falsch:["Weil es dort mehr Wasser hat.","Weil die Fische dort nicht hinkommen.","Weil es dort wärmer ist."], beleg:["das ganze Jahr kühl und sauber"] },
    { typ:"multi", art:"verbinden", frage:"Woher kommt das Zürcher Trinkwasser? Wähle alles, was im Text steht.", richtig:["aus dem Zürichsee","aus Quellen","aus dem Grundwasser"], falsch:["aus dem Rhein","aus Gletschern","aus Flaschen"], beleg:["stammt der grösste Teil","Ein kleinerer Teil"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «langsam durchfliesst» bedeutet.", loesung:["sickert"], beleg:["sickert"] },
    { typ:"kurz", art:"finden", frage:"Wie viele Liter Wasser braucht eine Person in der Schweiz zu Hause pro Tag ungefähr?", loesung:["140","140 Liter","140 l","hundertvierzig"], beleg:["140 Liter"] },
    { typ:"ordnen", art:"verbinden", frage:"Wie kommt das Seewasser in die Wohnung? Bring die Schritte in die richtige Reihenfolge.", items:["Das Wasser wird aus dem See gepumpt.","Im Wasserwerk wird es mit Sandfiltern gereinigt.","Es fliesst in Leitungen zu den Häusern.","Man trinkt es aus dem Wasserhahn."] }
  ]},

/* ===================== Stufe 3: zwischen den Zeilen ===================== */
{ id:"s3-thermen", stufe:3, titel:"Ein Nachmittag in den Thermen", art:"Sachtext", thema:"NMG Römer",
  absaetze:[[
    "Die Römer liebten das Baden.",
    "In jeder grösseren Stadt gab es öffentliche Bäder, die man Thermen nennt.",
    "Für wenig Geld durften dort fast alle hinein: reiche Bürger, Handwerker und sogar Sklaven.",
    "Auch auf dem Gebiet der heutigen Schweiz bauten die Römer Thermen, zum Beispiel in Augusta Raurica bei Basel."
  ],[
    "Ein Besuch folgte einer festen Reihenfolge.",
    "Zuerst zog man sich im Umkleideraum aus.",
    "Danach ging man ins Warmbad und anschliessend ins Heissbad, wo man richtig ins Schwitzen kam.",
    "Zum Schluss sprang man ins Kaltwasserbecken.",
    "Das sollte den Körper abhärten."
  ],[
    "Doch wie wurden die Räume warm?",
    "Der Boden stand auf kleinen Säulen aus Ziegeln.",
    "Darunter war ein Hohlraum.",
    "In einem Heizraum neben den Baderäumen heizten Sklaven ein grosses Feuer.",
    "Die heisse Luft strömte unter den Boden und durch Röhren in den Wänden.",
    "So wurden Boden und Wände warm.",
    "Diese Heizung nennt man Hypokaustum."
  ],[
    "Die Thermen waren aber viel mehr als ein Bad.",
    "Man traf Freunde, machte Geschäfte und erzählte sich die neusten Nachrichten.",
    "Manche Thermen hatten sogar einen Sportplatz, Gärten und eine Bibliothek.",
    "Viele Römer verbrachten dort jeden Nachmittag mehrere Stunden."
  ]],
  fragen:[
    { typ:"zuordnen", art:"ganz", frage:"Welche Überschrift passt zu welchem Abschnitt?", titel:[["Baden für alle",1],["Von warm zu kalt",2],["Eine Heizung unter dem Boden",3],["Mehr als ein Bad",4]] },
    { typ:"mc", art:"ganz", frage:"Worum geht es im ganzen Text?", richtig:"wie die Römer in den Thermen badeten und sich trafen", falsch:["wie die Römer ihre Häuser bauten","warum die Römer Sklaven hatten","wie Augusta Raurica entstanden ist"] },
    { typ:"ordnen", art:"verbinden", frage:"In welcher Reihenfolge ging man durch die Thermen?", items:["Umkleideraum","Warmbad","Heissbad","Kaltwasserbecken"], beleg:["Zuerst zog man sich","Danach ging man ins Warmbad","Zum Schluss sprang man"] },
    { typ:"beleg", art:"verbinden", frage:"Wie wurden die Räume warm?", richtig:"Heisse Luft von einem Feuer strömte unter den Boden und durch die Wände.", falsch:["In jedem Raum brannte ein Kaminfeuer.","Heisses Wasser kam direkt aus der Erde.","Die Sonne wärmte die Dächer."], beleg:["Die heisse Luft strömte","heizten Sklaven ein grosses Feuer","So wurden Boden und Wände warm."] },
    { typ:"mc", art:"schliessen", frage:"Warum stand der Boden auf kleinen Säulen?", richtig:"Damit die heisse Luft unter dem Boden durchströmen konnte.", falsch:["Damit das Badewasser abfliessen konnte.","Damit der Boden nicht nass wurde.","Damit die Räume höher aussahen."], beleg:["Darunter war ein Hohlraum.","Die heisse Luft strömte"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «stärker und weniger empfindlich machen» bedeutet.", loesung:["abhärten"], beleg:["abhärten"] },
    { typ:"tf", art:"verbinden", frage:"Stimmt das?", aussagen:[["Nur reiche Römer durften in die Thermen.","Stimmt nicht"],["Auch in der heutigen Schweiz gab es römische Thermen.","Stimmt"],["In den Thermen gab es Wasserrutschen.","Steht nicht im Text"],["Die Heizung unter dem Boden heisst Hypokaustum.","Stimmt"]] },
    { typ:"mc", art:"schliessen", frage:"Warum waren die Thermen für viele Römer so wichtig? Wähle die beste Antwort.", richtig:"Sie konnten dort baden, sich erholen und andere Menschen treffen.", falsch:["Zu Hause durften sie sich nicht waschen.","Die Thermen waren der einzige warme Ort im Winter.","Dort mussten sie ihre Steuern bezahlen."], beleg:["viel mehr als ein Bad","Man traf Freunde"] }
  ]},

{ id:"s3-handy", stufe:3, titel:"Nur noch ein Video", art:"Geschichte", thema:"Medien",
  absaetze:[[
    "Es war schon nach zehn Uhr.",
    "Leon lag im Bett, die Decke bis zur Nase hochgezogen, und schaute auf sein Handy.",
    "«Nur noch ein Video», murmelte er.",
    "Aus einem Video wurden drei, aus drei wurden zehn."
  ],[
    "Plötzlich ging die Tür auf.",
    "Leon schob das Handy blitzschnell unter das Kissen und kniff die Augen zu.",
    "Seine Mutter blieb einen Moment in der Tür stehen.",
    "Unter dem Kissen leuchtete es schwach.",
    "Dann seufzte sie leise und schloss die Tür wieder."
  ],[
    "Am nächsten Morgen klingelte der Wecker dreimal, bis Leon endlich aufstand.",
    "In der Mathestunde musste er immer wieder gähnen.",
    "Als Frau Rossi ihn etwas fragte, hatte er keine Ahnung, worum es ging.",
    "Ein paar Kinder kicherten.",
    "Leon wurde rot und starrte auf sein Heft."
  ],[
    "In der Pause setzte sich seine Freundin Mara neben ihn.",
    "«Du siehst aus wie ein Zombie», sagte sie.",
    "Leon erzählte ihr von den Videos.",
    "Mara nickte: «Das kenne ich.",
    "Mein Handy schläft jetzt in der Küche.",
    "Am Anfang war das komisch, aber jetzt schlafe ich viel besser.»"
  ],[
    "Am Abend legte Leon sein Handy auf den Küchentisch.",
    "Er zögerte einen Moment.",
    "Dann ging er ohne Handy in sein Zimmer."
  ]],
  fragen:[
    { typ:"beleg", art:"schliessen", frage:"Warum kneift Leon die Augen zu, als die Tür aufgeht?", richtig:"Er will so tun, als ob er schon schläft.", falsch:["Das Licht im Gang blendet ihn.","Er ist plötzlich sehr müde.","Er hat Angst vor der Dunkelheit."], beleg:["kniff die Augen zu"] },
    { typ:"mc", art:"schliessen", frage:"Was denkt die Mutter wahrscheinlich, als sie leise seufzt?", richtig:"Sie ahnt, dass Leon noch am Handy war.", falsch:["Sie will Leon wecken.","Sie hat im Zimmer etwas vergessen.","Sie ärgert sich über Mara."], beleg:["Unter dem Kissen leuchtete","seufzte sie leise"] },
    { typ:"multi", art:"verbinden", frage:"Woran merkt man, dass Leon zu wenig geschlafen hat? Wähle alles, was im Text steht.", richtig:["Der Wecker muss dreimal klingeln.","Er gähnt in der Mathestunde.","Er weiss nicht, worum es im Unterricht geht."], falsch:["Er vergisst sein Znüni.","Er kommt zu spät zur Schule.","Er schläft in der Pause ein."], beleg:["klingelte der Wecker dreimal","musste er immer wieder gähnen","hatte er keine Ahnung"] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «leise und undeutlich sagen» bedeutet.", loesung:["murmelte"], beleg:["murmelte er"] },
    { typ:"mc", art:"schliessen", frage:"Warum wird Leon rot?", richtig:"Es ist ihm peinlich, dass er die Antwort nicht weiss.", falsch:["Er hat Fieber.","Er ist wütend auf Frau Rossi.","Ihm ist zu warm im Schulzimmer."], beleg:["Leon wurde rot"] },
    { typ:"kurz", art:"finden", frage:"Wo schläft Maras Handy jetzt?", loesung:["Küche","in der Küche"], beleg:["Mein Handy schläft jetzt in der Küche."] },
    { typ:"mc", art:"ganz", frage:"Welcher Satz passt am besten als Lehre aus der Geschichte?", richtig:"Wer das Handy nachts weglegt, schläft besser und ist am Tag fitter.", falsch:["Videos schauen ist immer verboten.","Eltern sollten nachts nicht ins Zimmer kommen.","Freundinnen helfen bei den Matheaufgaben."] }
  ]},

{ id:"s3-abfall", stufe:3, titel:"Wer räumt den Pausenplatz auf?", art:"Bericht", thema:"NMG Umwelt / Schulalltag",
  absaetze:[[
    "An der Schule Wiesental gab es im Frühling ein Problem.",
    "Nach jeder Pause lagen auf dem Pausenplatz Verpackungen, leere Flaschen und Papiertaschentücher.",
    "Der Hauswart sammelte jeden Tag etwa einen halben Abfallsack voll ein."
  ],[
    "Der Schülerrat wollte das ändern.",
    "Zuerst zählten zwei Kinder eine Woche lang, wo am meisten Abfall lag.",
    "Das Ergebnis war deutlich: Die meisten Abfälle lagen bei den Sitzbänken neben dem Klettergerüst, weit weg von den Abfalleimern."
  ],[
    "Daraufhin machte der Schülerrat drei Vorschläge.",
    "Erstens sollten neben den Bänken neue Abfalleimer aufgestellt werden.",
    "Zweitens sollte jede Klasse während einer Woche den Putzdienst übernehmen.",
    "Drittens sollten Kinder Plakate mit dem Satz «Dein Abfall – deine Sache!» gestalten."
  ],[
    "Nach zwei Monaten war der Pausenplatz viel sauberer.",
    "Der Hauswart braucht jetzt pro Woche nur noch einen Sack.",
    "Nicht alle sind zufrieden.",
    "«Der Putzdienst ist mühsam», findet ein Junge aus der 6. Klasse.",
    "Eine Lehrerin meint dagegen: «Die Kinder merken so, wie viel Arbeit Abfall macht.",
    "Das ist die beste Lektion.»"
  ]],
  fragen:[
    { typ:"mc", art:"ganz", frage:"Worum geht es in diesem Bericht?", richtig:"wie eine Schule ihr Abfallproblem auf dem Pausenplatz gelöst hat", falsch:["warum der Hauswart seine Arbeit nicht mag","wie man Plakate gestaltet","wie viel Abfall die Schweiz jedes Jahr produziert"] },
    { typ:"beleg", art:"verbinden", frage:"Warum lag bei den Sitzbänken am meisten Abfall?", richtig:"Weil die Abfalleimer weit weg waren.", falsch:["Weil der Wind den Abfall dorthin blies.","Weil der Hauswart dort nie putzte.","Weil dort der Kiosk stand."], beleg:["weit weg von den Abfalleimern"] },
    { typ:"multi", art:"finden", frage:"Was schlug der Schülerrat vor? Wähle alle Vorschläge.", richtig:["neue Abfalleimer bei den Bänken","einen Putzdienst für jede Klasse","Plakate gegen Abfall"], falsch:["Bussen für alle, die Abfall liegen lassen","ein Verbot von Verpackungen","längere Pausen"], beleg:["Erstens","Zweitens","Drittens"] },
    { typ:"mc", art:"verbinden", frage:"Wie hat sich die Abfallmenge verändert?", richtig:"Früher etwa ein halber Sack pro Tag, jetzt ein Sack pro Woche.", falsch:["Früher ein Sack pro Woche, jetzt ein halber Sack pro Tag.","Früher und jetzt ist es gleich viel.","Jetzt gibt es gar keinen Abfall mehr."], beleg:["einen halben Abfallsack","nur noch einen Sack"] },
    { typ:"tf", art:"ganz", frage:"Ist das eine Tatsache oder eine Meinung?", wahl:["Tatsache","Meinung"], aussagen:[["Der Hauswart braucht jetzt pro Woche nur noch einen Sack.","Tatsache"],["Der Putzdienst ist mühsam.","Meinung"],["Das ist die beste Lektion.","Meinung"],["Die meisten Abfälle lagen bei den Sitzbänken.","Tatsache"]] },
    { typ:"wort", art:"wortschatz", frage:"Tippe im Text auf das Wort, das «anstrengend und lästig» bedeutet.", loesung:["mühsam"], beleg:["Putzdienst ist mühsam"] },
    { typ:"beleg", art:"finden", frage:"Warum findet die Lehrerin den Putzdienst gut?", richtig:"Die Kinder erleben selbst, wie viel Arbeit Abfall macht.", falsch:["Der Hauswart hat dann mehr Ferien.","Die Kinder müssen dann weniger Hausaufgaben machen.","So spart die Schule Geld."], beleg:["wie viel Arbeit Abfall macht"] }
  ]}
];
