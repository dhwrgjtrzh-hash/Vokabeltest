/* =====================================================================
   Hörverstehen Deutsch – Texte und Fragen (Lernportal 6b)
   Alle Texte sind eigens für das Lernportal geschrieben. Gesprochen mit Microsoft-Stimmen (Azure).

   Aufbau eines Hörtexts:
     id, stufe (1–3), titel, art (Durchsage, Gespräch …), thema,
     situation: was das Kind vor dem Hören erfährt,
     rollen: {Kürzel: {name, stimme}}   – stimme siehe HOER_STIMMEN (für das Aufnahme-Skript)
     teile: [[Kürzel, "Was gesagt wird."], …]
     fragen: […]  (Fragearten wie im Leseverstehen: mc, multi, tf, kurz, ordnen;
                   «Wer sagt das?» = tf mit wahl:[Namen])

   Fähigkeit (art) – für die Auswertung:
     finden      Einzelheiten heraushören (Zahlen, Namen, Orte, Zeiten)
     verbinden   mehrere Stellen verbinden, Reihenfolge, wer sagt was
     schliessen  Gefühle, Gründe, Absichten erkennen
     wortschatz  Wörter aus dem Zusammenhang verstehen
     ganz        verstehen, worum es geht (Hauptaussage, Tatsache/Meinung)
   ===================================================================== */
const HOER_STIMMEN = {
  erzaehlerin: "de-DE-KatjaNeural",
  frau:        "de-CH-LeniNeural",
  mann:        "de-DE-ConradNeural",
  mann_ch:     "de-CH-JanNeural",
  maedchen:    "de-DE-GiselaNeural",
  junge:       "de-DE-KillianNeural"
};

const HOERTEXTE = [

/* ===================== Stufe 1: Genau zuhören ===================== */
{ id:"h1-bahnhof", stufe:1, titel:"Durchsage am Bahnhof", art:"Durchsage", thema:"Unterwegs mit dem Zug",
  situation:"Du bist im Hauptbahnhof Zürich und willst mit dem Zug nach Chur fahren. Da kommt eine Durchsage.",
  rollen:{ D:{name:"Durchsage", stimme:"mann_ch"} },
  teile:[
    ["D","Achtung, eine Information zum Interregio nach Chur, Abfahrt zehn Uhr zweiunddreissig. Dieser Zug fährt heute nicht auf Gleis neun, sondern auf Gleis sieben. Der Zug hat etwa zehn Minuten Verspätung. Grund dafür ist eine Störung bei Thalwil. Bitte beachten Sie: Heute gibt es in diesem Zug keinen Speisewagen."],
    ["D","Ich wiederhole: Der Interregio nach Chur, Abfahrt zehn Uhr zweiunddreissig, fährt heute auf Gleis sieben. Er hat etwa zehn Minuten Verspätung. Wir bitten um Entschuldigung."]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Wohin fährt der Zug?", richtig:"nach Chur", falsch:["nach Thalwil","nach Bern","an den Flughafen"] },
    { typ:"kurz", art:"finden", frage:"Auf welchem Gleis fährt der Zug heute ab?", loesung:["7","sieben","Gleis 7","Gleis sieben"] },
    { typ:"mc", art:"verbinden", frage:"Um wie viel Uhr fährt der Zug heute ungefähr wirklich ab?", richtig:"um etwa 10.42 Uhr", falsch:["um 10.32 Uhr","um 10.22 Uhr","um etwa 11.32 Uhr"] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Der Zug fährt heute auf Gleis neun.","Stimmt nicht"],["Im Zug gibt es heute keinen Speisewagen.","Stimmt"],["Der Zug ist heute besonders voll.","Wurde nicht gesagt"]] },
    { typ:"mc", art:"ganz", frage:"Warum gibt es diese Durchsage?", richtig:"Beim Zug nach Chur hat sich heute etwas geändert.", falsch:["Der Zug nach Chur fällt heute aus.","Alle Reisenden müssen in Thalwil umsteigen.","Man kann im Zug ein Mittagessen kaufen."] }
  ]},

{ id:"h1-training", stufe:1, titel:"Eine Nachricht von der Trainerin", art:"Telefonnachricht", thema:"Freizeit",
  situation:"Nora spielt Fussball in einem Verein. Auf ihrem Handy ist eine Sprachnachricht von ihrer Trainerin Sandra.",
  rollen:{ S:{name:"Sandra", stimme:"frau"} },
  teile:[
    ["S","Hallo Nora, hier ist Sandra vom Fussballclub. Ich melde mich, weil sich beim Training am Donnerstag etwas ändert. Nach dem vielen Regen ist der Rasen zu nass. Darum trainieren wir am Donnerstag in der Turnhalle. Das Training beginnt wie immer um fünf Uhr, aber es dauert heute nur bis sechs."],
    ["S","Bitte bring Hallenschuhe mit, keine Fussballschuhe! Und vergiss deine Trinkflasche nicht."],
    ["S","Noch etwas: Am Samstag spielen wir ein Turnier in Winterthur. Wir treffen uns um Viertel nach acht beim Bahnhof Stettbach. Wenn du am Samstag nicht kannst, schick mir bitte bis Freitag eine Nachricht. Tschüss, bis Donnerstag!"]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Warum ist das Training am Donnerstag nicht auf dem Rasen?", richtig:"Der Rasen ist zu nass.", falsch:["Der Rasen wird neu gemacht.","Es ist draussen zu kalt.","Auf dem Rasen spielt eine andere Mannschaft."] },
    { typ:"multi", art:"finden", frage:"Was soll Nora ins Training mitbringen?", richtig:["Hallenschuhe","eine Trinkflasche"], falsch:["Fussballschuhe","einen Ball","eine Regenjacke"] },
    { typ:"tf", art:"verbinden", frage:"Stimmt das?", aussagen:[["Das Training beginnt am Donnerstag später als sonst.","Stimmt nicht"],["Das Training ist am Donnerstag kürzer als sonst.","Stimmt"],["Das Turnier am Samstag ist in Winterthur.","Stimmt"]] },
    { typ:"kurz", art:"finden", frage:"Um wie viel Uhr trifft sich die Mannschaft am Samstag?", loesung:["Viertel nach acht","8.15","8:15","8 Uhr 15","acht Uhr fünfzehn","viertel nach 8","8.15 Uhr"] },
    { typ:"mc", art:"verbinden", frage:"Was muss Nora tun, wenn sie am Samstag nicht kann?", richtig:"Sandra bis Freitag eine Nachricht schicken.", falsch:["Sandra am Samstagmorgen anrufen.","Nichts – sie muss nicht Bescheid geben.","Ihre Eltern zum Bahnhof schicken."] }
  ]},

{ id:"h1-biber", stufe:1, titel:"Der Biber", art:"Radiobeitrag", thema:"NMG Tiere",
  situation:"Im Kinderradio gibt es jeden Tag einen kurzen Beitrag über ein Tier. Heute geht es um den Biber.",
  rollen:{ E:{name:"Sprecherin", stimme:"erzaehlerin"} },
  teile:[
    ["E","Weisst du, welches Tier das grösste Nagetier in Europa ist? Es ist der Biber. Ein erwachsener Biber kann bis zu dreissig Kilogramm schwer werden – so schwer wie ein grosser Hund."],
    ["E","Biber leben am Wasser: an Bächen, Flüssen und Seen. Dort bauen sie ihre Wohnung, die Biberburg. Der Eingang der Burg liegt unter dem Wasser. So kommen Feinde nicht hinein. Biber sind gute Schwimmer. Sie können bis zu fünfzehn Minuten unter Wasser bleiben."],
    ["E","Mit ihren starken Zähnen fällen Biber sogar Bäume. Sie fressen aber kein Fleisch und keine Fische, sondern Rinde, Zweige, Blätter und Wasserpflanzen. Tagsüber schlafen die Biber meistens. Erst am Abend werden sie aktiv."],
    ["E","Vor etwa zweihundert Jahren gab es in der Schweiz keine Biber mehr. Die Menschen hatten sie gejagt. Heute leben wieder mehrere tausend Biber bei uns."]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Wie schwer kann ein erwachsener Biber werden?", richtig:"bis zu 30 Kilogramm", falsch:["bis zu 3 Kilogramm","bis zu 13 Kilogramm","bis zu 300 Kilogramm"] },
    { typ:"multi", art:"finden", frage:"Was frisst der Biber?", richtig:["Rinde","Zweige","Wasserpflanzen"], falsch:["Fische","Mäuse","Frösche"] },
    { typ:"mc", art:"verbinden", frage:"Warum liegt der Eingang der Biberburg unter Wasser?", richtig:"Damit keine Feinde hineinkommen.", falsch:["Damit es in der Burg warm bleibt.","Damit die Biber leichter Futter finden.","Damit kein Wasser in die Burg läuft."] },
    { typ:"tf", art:"finden", frage:"Stimmt das?", aussagen:[["Biber sind vor allem am Tag unterwegs.","Stimmt nicht"],["Biber können bis zu 15 Minuten unter Wasser bleiben.","Stimmt"],["Ein Biber wird etwa zehn Jahre alt.","Wurde nicht gesagt"]] },
    { typ:"mc", art:"ganz", frage:"Worum geht es in diesem Beitrag?", richtig:"Wie der Biber lebt und was er frisst.", falsch:["Warum Biber für Menschen gefährlich sind.","Wie man einen Biber füttert.","Wo man in Zürich Biber beobachten kann."] }
  ]},

/* ===================== Stufe 2: Zusammenhänge verstehen ===================== */
{ id:"h2-schulreise", stufe:2, titel:"Die Schulreise", art:"Gespräch", thema:"Schulalltag / Ausflug",
  situation:"Mia kommt von der Schule nach Hause. Sie erzählt ihrem Vater von der Schulreise.",
  rollen:{ V:{name:"Vater", stimme:"mann"}, M:{name:"Mia", stimme:"maedchen"} },
  teile:[
    ["V","Hallo Mia! Wie war die Schule?"],
    ["M","Gut! Frau Keller hat uns heute erzählt, wohin die Schulreise geht. Wir gehen auf den Uetliberg!"],
    ["V","Oh, schön. Fahrt ihr mit dem Zug hinauf?"],
    ["M","Ja. Zuerst fahren wir mit dem Tram zum Hauptbahnhof und dann mit der S10 auf den Uetliberg. Oben wandern wir auf dem Planetenweg bis zur Felsenegg."],
    ["V","Den Planetenweg kenne ich. Da steht bei jedem Planeten eine Tafel, oder?"],
    ["M","Genau. Wir bekommen ein Arbeitsblatt und müssen bei jeder Tafel eine Frage beantworten. Bei der Felsenegg essen wir dann unser Picknick."],
    ["V","Und wie kommt ihr wieder hinunter?"],
    ["M","Mit der Seilbahn nach Adliswil. Und von dort mit dem Zug zurück nach Zürich. Um halb fünf sind wir wieder beim Schulhaus."],
    ["V","Was musst du alles mitnehmen?"],
    ["M","Ein Picknick, etwas zum Trinken, gute Schuhe und eine Regenjacke. Frau Keller sagt, auf dem Berg kann das Wetter schnell ändern. Geld brauchen wir keins, die Schule bezahlt die Fahrkarten."],
    ["V","Und wann ist die Schulreise?"],
    ["M","Am Dienstag. Wenn es regnet, gehen wir am Donnerstag."],
    ["V","Gut. Dann kaufen wir am Montag zusammen etwas Feines fürs Picknick ein."],
    ["M","Au ja! Ich freue mich schon so! Darf ich auch eine kleine Schokolade mitnehmen?"],
    ["V","Eine kleine, ja."]
  ],
  fragen:[
    { typ:"ordnen", art:"verbinden", frage:"In welcher Reihenfolge passiert das an der Schulreise?", items:["mit dem Tram zum Hauptbahnhof","mit der S10 auf den Uetliberg","auf dem Planetenweg wandern","Picknick bei der Felsenegg","mit der Seilbahn nach Adliswil"] },
    { typ:"multi", art:"finden", frage:"Was muss Mia mitnehmen?", richtig:["eine Regenjacke","gute Schuhe","etwas zum Trinken"], falsch:["Geld für die Fahrkarte","ein Arbeitsblatt","eine Taschenlampe"] },
    { typ:"mc", art:"verbinden", frage:"Warum braucht Mia eine Regenjacke, auch wenn am Morgen die Sonne scheint?", richtig:"Weil das Wetter auf dem Berg schnell ändern kann.", falsch:["Weil es am Dienstag sicher regnet.","Weil es bei der Seilbahn nass ist.","Weil die Klasse bei Regen trotzdem geht."] },
    { typ:"tf", art:"verbinden", frage:"Stimmt das?", aussagen:[["Wenn es regnet, ist die Schulreise am Donnerstag.","Stimmt"],["Mia muss ihre Fahrkarte selbst bezahlen.","Stimmt nicht"],["Die Klasse übernachtet auf der Felsenegg.","Stimmt nicht"],["Mia war schon einmal auf dem Uetliberg.","Wurde nicht gesagt"]] },
    { typ:"kurz", art:"finden", frage:"Um wie viel Uhr ist die Klasse wieder beim Schulhaus?", loesung:["halb fünf","16.30","16:30","4.30","4:30","16 Uhr 30","sechzehn Uhr dreissig","halb 5","16.30 Uhr"] },
    { typ:"mc", art:"schliessen", frage:"Wie geht es Mia, wenn sie an die Schulreise denkt?", richtig:"Sie freut sich darauf.", falsch:["Sie hat ein bisschen Angst davor.","Sie findet die Schulreise langweilig.","Sie ist traurig, weil sie kein Geld hat."] }
  ]},

{ id:"h2-pet", stufe:2, titel:"Was passiert mit der PET-Flasche?", art:"Interview im Radio", thema:"NMG Umwelt",
  situation:"In einer Radiosendung spricht die Moderatorin mit Herrn Graf. Er arbeitet in einer Recyclingfirma.",
  rollen:{ M:{name:"Moderatorin", stimme:"erzaehlerin"}, G:{name:"Herr Graf", stimme:"mann_ch"} },
  teile:[
    ["M","Willkommen bei «Wissen am Mittag». In der Schweiz trinken wir jedes Jahr aus über einer Milliarde PET-Flaschen. Was passiert eigentlich mit diesen Flaschen? Das frage ich Herrn Graf. Er arbeitet in einer Recyclingfirma. Herr Graf, wohin gehört eine leere PET-Flasche?"],
    ["G","In die PET-Sammlung. Sammelstellen gibt es in fast jedem Supermarkt und an vielen Bahnhöfen. Ganz wichtig: Nur Getränkeflaschen aus PET gehören hinein. Flaschen von Shampoo oder Speiseöl gehören nicht in die PET-Sammlung."],
    ["M","Und was passiert dann mit den Flaschen?"],
    ["G","Ein Lastwagen bringt sie in ein Sortierwerk. Dort werden sie nach Farben sortiert: durchsichtig, hellblau, grün und braun. Danach werden die Flaschen in ganz kleine Stücke zerschnitten und gewaschen. Diese Stücke nennt man Flakes, auf Deutsch Flocken."],
    ["M","Und aus diesen Flocken macht man wieder neue Flaschen?"],
    ["G","Ja. Die Flocken werden geschmolzen. Daraus entstehen kleine Körner. Aus den Körnern macht eine Fabrik wieder neue Flaschen. Aus farbigen Flocken macht man zum Beispiel auch Fasern für Pullover."],
    ["M","Wie viele Flaschen kommen denn zurück?"],
    ["G","Mehr als acht von zehn Flaschen. Das ist schon viel. Aber jede Flasche, die im Abfall landet, ist eine verlorene Flasche. Darum mein Tipp: Leere Flaschen flach drücken und immer zur Sammelstelle bringen."],
    ["M","Herzlichen Dank, Herr Graf."]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Was gehört in die PET-Sammlung?", richtig:"leere Getränkeflaschen aus PET", falsch:["Shampooflaschen","Flaschen von Speiseöl","alle Flaschen aus Plastik"] },
    { typ:"ordnen", art:"verbinden", frage:"Was passiert mit der Flasche? Bring die Schritte in die richtige Reihenfolge.", items:["Die Flasche kommt in die PET-Sammlung.","Ein Lastwagen bringt sie ins Sortierwerk.","Die Flaschen werden nach Farben sortiert.","Sie werden zerschnitten und gewaschen.","Die Flocken werden geschmolzen.","Eine Fabrik macht neue Flaschen."] },
    { typ:"kurz", art:"wortschatz", frage:"Wie nennt man die ganz kleinen Plastikstücke?", loesung:["Flakes","Flocken"] },
    { typ:"tf", art:"verbinden", frage:"Stimmt das?", aussagen:[["Mehr als die Hälfte der PET-Flaschen kommt zurück.","Stimmt"],["Aus farbigen Flocken kann man Fasern für Pullover machen.","Stimmt"],["Herr Graf arbeitet in einem Supermarkt.","Stimmt nicht"],["Eine PET-Flasche braucht 100 Jahre, bis sie zerfällt.","Wurde nicht gesagt"]] },
    { typ:"mc", art:"ganz", frage:"Was will Herr Graf den Zuhörerinnen und Zuhörern vor allem sagen?", richtig:"Leere PET-Flaschen sollte man immer zur Sammelstelle bringen.", falsch:["Man sollte keine PET-Flaschen mehr kaufen.","Man muss die Flaschen vor dem Sammeln waschen.","PET-Recycling lohnt sich nicht."] }
  ]},

{ id:"h2-schluessel", stufe:2, titel:"Der verschwundene Schlüssel", art:"Geschichte", thema:"Schulalltag",
  situation:"Eine kurze Geschichte aus dem Schulhaus. Es geht um Elif und den Schlüssel für den Pausenkiosk.",
  rollen:{ E:{name:"Erzählerin", stimme:"erzaehlerin"}, L:{name:"Elif", stimme:"maedchen"}, B:{name:"Herr Brunner", stimme:"mann"} },
  teile:[
    ["E","Jeden Freitag verkauft die Klasse 6b am Pausenkiosk Äpfel und Brötchen. Das Geld kommt in die Klassenkasse. Heute ist Elif für den Schlüssel zuständig. Doch als sie den Kiosk öffnen will, ist der Schlüssel weg."],
    ["L","Oh nein! Heute Morgen war er doch noch in meiner Jackentasche. Das weiss ich genau. Im Tram habe ich ihn noch gespürt."],
    ["E","Elif überlegt. Nach dem Tram ist sie direkt ins Schulhaus gegangen. Im Gang hat sie die Jacke an den Haken gehängt. Danach hatte sie Turnen. Die Jacke hatte sie in der Turnhalle gar nicht dabei. Elif geht zum Hauswart."],
    ["L","Herr Brunner, hat jemand einen Schlüssel abgegeben? Er hat einen roten Anhänger."],
    ["B","Einen Schlüssel mit rotem Anhänger? Nein, tut mir leid. Aber heute Morgen habe ich im Gang vor deinem Schulzimmer geputzt. Dort lag eine Jacke am Boden. Ich habe sie wieder an den Haken gehängt."],
    ["E","Elif rennt zurück zu ihrer Jacke. Sie schaut unter die Garderobe. Und tatsächlich: Ganz hinten, zwischen zwei Turnsäcken, liegt der Schlüssel mit dem roten Anhänger."],
    ["L","Da ist er ja! Er ist bestimmt aus der Tasche gefallen, als die Jacke vom Haken gerutscht ist. Danke, Herr Brunner!"],
    ["E","Zehn Minuten später ist der Kiosk offen. Und Elif macht ab jetzt immer den Reissverschluss ihrer Jackentasche zu."]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Was verkauft die Klasse am Pausenkiosk?", richtig:"Äpfel und Brötchen", falsch:["Äpfel und Schokolade","Brötchen und Getränke","Kuchen und Äpfel"] },
    { typ:"mc", art:"schliessen", frage:"Wie fühlt sich Elif, als sie merkt, dass der Schlüssel weg ist?", richtig:"Sie erschrickt.", falsch:["Sie ist fröhlich.","Sie ist gelangweilt.","Sie ist stolz."] },
    { typ:"ordnen", art:"verbinden", frage:"Bring die Geschichte in die richtige Reihenfolge.", items:["Elif fährt mit dem Tram zur Schule.","Elif hängt ihre Jacke an den Haken.","Elif hat Turnen.","Elif fragt den Hauswart nach dem Schlüssel.","Elif findet den Schlüssel unter der Garderobe."] },
    { typ:"kurz", art:"finden", frage:"Welche Farbe hat der Anhänger am Schlüssel?", loesung:["rot","roten","rote"] },
    { typ:"mc", art:"verbinden", frage:"Wie ist der Schlüssel unter die Garderobe gekommen?", richtig:"Die Jacke ist vom Haken gerutscht, und der Schlüssel ist aus der Tasche gefallen.", falsch:["Elif hat ihn dort versteckt.","Der Hauswart hat ihn dort hingelegt.","Ein anderes Kind hat ihn verloren."] }
  ]},

/* ===================== Stufe 3: Zwischen den Zeilen hören ===================== */
{ id:"h3-klassenrat", stufe:3, titel:"Streit um den Pausenplatz", art:"Gespräch im Klassenrat", thema:"Schulalltag",
  situation:"Im Klassenrat besprechen die Kinder Probleme aus dem Schulalltag. Heute hat Lina ein Thema mitgebracht.",
  rollen:{ F:{name:"Frau Meier", stimme:"frau"}, L:{name:"Lina", stimme:"maedchen"}, B:{name:"Ben", stimme:"junge"} },
  teile:[
    ["F","Im Klassenrat haben wir heute ein Thema von Lina. Lina, erzähl mal."],
    ["L","Also … in der grossen Pause spielen die Jungs aus unserer Klasse immer Fussball, und zwar auf dem ganzen Platz. Wir können dort gar nicht mehr Seil springen oder Fangen spielen. Gestern hat mich ein Ball am Kopf getroffen. Das hat richtig wehgetan."],
    ["B","Das war aber keine Absicht! Ich habe mich sofort entschuldigt."],
    ["L","Ja, das stimmt. Trotzdem: Es ist jeden Tag dasselbe."],
    ["F","Ben, wie siehst du das?"],
    ["B","Ehrlich gesagt verstehe ich Lina schon. Aber Fussball braucht halt viel Platz. Und das kleine Feld hinter der Turnhalle ist immer nass und rutschig."],
    ["F","Hat jemand eine Idee, wie wir das lösen könnten?"],
    ["L","Vielleicht könnten wir den Platz in zwei Hälften teilen. Eine Hälfte für Fussball und eine Hälfte für die anderen Spiele."],
    ["B","Hm. Oder wir wechseln ab: Am Montag, Mittwoch und Freitag spielen wir Fussball auf dem grossen Platz, und am Dienstag und Donnerstag gehört er euch."],
    ["L","Das finde ich nicht so fair. Dann habt ihr drei Tage und wir nur zwei."],
    ["F","Dann stimmen wir ab. Wer ist für Linas Vorschlag mit den zwei Hälften? … Das ist die Mehrheit. Wir probieren es zwei Wochen lang aus und sprechen dann im Klassenrat wieder darüber."],
    ["B","Okay. Ich sage es den anderen aus dem Fussballteam."]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Worüber beschwert sich Lina?", richtig:"Die Fussballer brauchen in der Pause den ganzen Platz.", falsch:["Niemand will mit ihr Fussball spielen.","Das Feld hinter der Turnhalle ist nass.","Ben hat sich nicht entschuldigt."] },
    { typ:"tf", art:"verbinden", frage:"Wer sagt das?", wahl:["Lina","Ben","Frau Meier"], aussagen:[["«Fussball braucht halt viel Platz.»","Ben"],["«Wir könnten den Platz in zwei Hälften teilen.»","Lina"],["«Wir probieren es zwei Wochen lang aus.»","Frau Meier"],["«Dann habt ihr drei Tage und wir nur zwei.»","Lina"]] },
    { typ:"mc", art:"schliessen", frage:"Ben sagt: «Ehrlich gesagt verstehe ich Lina schon.» Was zeigt dieser Satz?", richtig:"Ben kann Linas Ärger verstehen, auch wenn er weiter Fussball spielen will.", falsch:["Ben will nie mehr Fussball spielen.","Ben glaubt Lina nicht.","Ben ist wütend auf Lina."] },
    { typ:"mc", art:"schliessen", frage:"Warum findet Lina Bens Vorschlag nicht fair?", richtig:"Die Fussballer hätten mehr Tage als die anderen Kinder.", falsch:["Am Mittwoch ist keine Schule.","Sie spielt selbst lieber Fussball.","Frau Meier ist dagegen."] },
    { typ:"mc", art:"ganz", frage:"Wie endet der Klassenrat?", richtig:"Die Klasse probiert Linas Vorschlag zwei Wochen lang aus.", falsch:["Fussball ist in der Pause jetzt verboten.","Die Fussballer spielen nur noch hinter der Turnhalle.","Bens Vorschlag wird angenommen."] }
  ]},

{ id:"h3-tierheim", stufe:3, titel:"Zu Besuch im Tierheim", art:"Interview", thema:"NMG Tiere / Berufe",
  situation:"Emma schreibt für die Schülerzeitung. Sie besucht ein Tierheim und spricht mit der Tierpflegerin Frau Studer.",
  rollen:{ R:{name:"Emma", stimme:"maedchen"}, S:{name:"Frau Studer", stimme:"frau"} },
  teile:[
    ["R","Hallo, ich bin Emma von der Schülerzeitung. Ich bin heute im Tierheim und spreche mit Frau Studer. Sie ist Tierpflegerin. Frau Studer, wie viele Tiere leben zurzeit hier?"],
    ["S","Im Moment haben wir vierzehn Hunde, etwa dreissig Katzen und viele Kaninchen und Meerschweinchen."],
    ["R","Woher kommen die Tiere?"],
    ["S","Manche wurden gefunden, zum Beispiel eine Katze, die sich verlaufen hat. Andere werden abgegeben. Oft hören wir: «Wir haben keine Zeit mehr für den Hund.» Oder: «Unser Kind hat keine Lust mehr auf das Kaninchen.»"],
    ["R","Das klingt traurig."],
    ["S","Ja, das ist es manchmal. Ein Tier ist kein Spielzeug. Ein Kaninchen kann acht bis zehn Jahre alt werden, eine Katze sogar fünfzehn Jahre oder mehr. Man muss sich also gut überlegen, ob man so lange für ein Tier sorgen will."],
    ["R","Was ist das Schönste an Ihrer Arbeit?"],
    ["S","Wenn ein Tier, das lange bei uns war, endlich ein neues Zuhause findet. Letzte Woche hat ein älteres Ehepaar unseren Hund Bruno abgeholt. Bruno war fast ein Jahr hier, weil niemand einen alten Hund wollte. Als er ins Auto gesprungen ist, hat er mit dem Schwanz gewedelt wie verrückt. Da hatte ich Tränen in den Augen."],
    ["R","Und was ist schwierig?"],
    ["S","Die vielen Wochenenden. Die Tiere brauchen auch am Sonntag Futter und Bewegung. Aber ehrlich gesagt: Ich würde mit keinem anderen Beruf tauschen."],
    ["R","Vielen Dank, Frau Studer!"]
  ],
  fragen:[
    { typ:"mc", art:"finden", frage:"Wie viele Hunde leben zurzeit im Tierheim?", richtig:"14", falsch:["4","30","40"] },
    { typ:"multi", art:"verbinden", frage:"Warum kommen Tiere ins Tierheim? Wähle alle Gründe, die Frau Studer nennt.", richtig:["Sie wurden gefunden.","Die Besitzer haben keine Zeit mehr.","Ein Kind hat keine Lust mehr auf das Tier."], falsch:["Die Tiere sind krank.","Die Besitzer ziehen ins Ausland.","Das Futter ist zu teuer."] },
    { typ:"mc", art:"schliessen", frage:"Warum hatte Frau Studer Tränen in den Augen, als Bruno abgeholt wurde?", richtig:"Sie hat sich gefreut, dass Bruno endlich ein Zuhause hat.", falsch:["Sie war traurig, weil sie Bruno behalten wollte.","Bruno hat sie gebissen.","Das Ehepaar war unfreundlich zu ihr."] },
    { typ:"mc", art:"schliessen", frage:"Frau Studer sagt: «Ein Tier ist kein Spielzeug.» Was meint sie damit?", richtig:"Ein Tier braucht viele Jahre lang Pflege – man kann es nicht einfach weglegen.", falsch:["Man darf mit Tieren nicht spielen.","Tiere mögen kein Spielzeug.","Spielzeug ist für Tiere gefährlich."] },
    { typ:"tf", art:"ganz", frage:"Tatsache oder Meinung?", wahl:["Tatsache","Meinung"], aussagen:[["Ein Kaninchen kann acht bis zehn Jahre alt werden.","Tatsache"],["Ich würde mit keinem anderen Beruf tauschen.","Meinung"],["Bruno war fast ein Jahr im Tierheim.","Tatsache"]] },
    { typ:"mc", art:"ganz", frage:"Was möchte Frau Studer den Zuhörenden vor allem mitgeben?", richtig:"Man soll sich gut überlegen, ob man lange für ein Tier sorgen kann.", falsch:["Man soll nur junge Tiere aus dem Tierheim holen.","Tierpflegerin ist ein einfacher Beruf.","Katzen sind bessere Haustiere als Kaninchen."] }
  ]},

{ id:"h3-lager", stufe:3, titel:"Der erste Abend im Lager", art:"Geschichte", thema:"Klassenlager",
  situation:"Eine Geschichte aus dem Klassenlager in den Bergen. Hör genau hin, wie es Noa geht.",
  rollen:{ E:{name:"Erzählerin", stimme:"erzaehlerin"}, K:{name:"Frau Keller", stimme:"frau"}, N:{name:"Noa", stimme:"maedchen"} },
  teile:[
    ["E","Es ist der erste Abend im Klassenlager. Die anderen Mädchen im Zimmer lachen und erzählen Witze. Noa liegt in ihrem Schlafsack und schaut an die Decke. Sie sagt kein Wort. Da klopft es an der Tür. Frau Keller schaut herein."],
    ["K","Noa, kommst du kurz mit? Ich brauche jemanden, der mir hilft, den Tee für morgen vorzubereiten."],
    ["E","Noa steht auf. In der Küche ist es ruhig. Frau Keller stellt ihr eine Tasse warmen Tee hin."],
    ["K","Weisst du, in meinem ersten Lager war ich auch ganz still. Ich habe die ganze erste Nacht an meinen Hund gedacht."],
    ["N","Ich vermisse meine kleine Schwester. Zu Hause schlafen wir im selben Zimmer. Und jetzt ist alles so … anders."],
    ["K","Das verstehe ich gut. Möchtest du ihr morgen eine Postkarte schreiben? Dann kannst du ihr erzählen, was ihr hier alles erlebt."],
    ["N","Ja … das wäre schön. Ich könnte ihr ein Murmeltier zeichnen. Murmeltiere findet sie lustig."],
    ["E","Als Noa zurück ins Zimmer kommt, rückt Sara ein Stück zur Seite und fragt: «Willst du auch einen Witz hören?» Noa lächelt – zum ersten Mal an diesem Abend."]
  ],
  fragen:[
    { typ:"mc", art:"schliessen", frage:"Wie geht es Noa am Anfang der Geschichte?", richtig:"Sie hat Heimweh.", falsch:["Sie ist wütend auf die anderen Mädchen.","Sie freut sich auf den nächsten Tag.","Sie hat Bauchweh vom Essen."] },
    { typ:"mc", art:"schliessen", frage:"Warum holt Frau Keller Noa wohl in die Küche?", richtig:"Sie hat gemerkt, dass es Noa nicht gut geht, und will mit ihr reden.", falsch:["Sie schafft die Arbeit allein nicht.","Noa soll für alle das Abendessen kochen.","Noa war im Zimmer zu laut."] },
    { typ:"mc", art:"finden", frage:"Wen vermisst Noa?", richtig:"ihre kleine Schwester", falsch:["ihren Hund","ihre Mutter","ihre beste Freundin"] },
    { typ:"kurz", art:"finden", frage:"Was will Noa auf die Postkarte zeichnen?", loesung:["ein Murmeltier","Murmeltier","Murmeltiere"] },
    { typ:"mc", art:"schliessen", frage:"Warum erzählt Frau Keller von ihrem ersten Lager?", richtig:"Noa soll merken, dass es anderen auch schon so ging.", falsch:["Sie erzählt gern von ihrem Hund.","Sie will Noa zeigen, dass Haustiere wichtig sind.","Sie will, dass Noa schneller einschläft."] },
    { typ:"mc", art:"ganz", frage:"Was zeigt der Schluss der Geschichte?", richtig:"Es geht Noa jetzt besser.", falsch:["Noa findet Saras Witze dumm.","Noa will sofort nach Hause.","Noa hat den ganzen Abend gelacht."] }
  ]}
];
