/* Lernziele der drei Mathepläne mit den Erklärungen («So geht's») – automatisch aus den Mathe-Trainern übernommen.
   Wird vom Lernportal (index.html) gebraucht, um den Kindern zu zeigen, was sie noch üben sollten.
   Mathepläne: Proportionalität · Umgekehrte Proportionalität · Wertepaare und Wertetabellen (LZK 6.4).
   Ändert sich ein Lernziel oder eine Erklärung in einem Mathe-Trainer, muss diese Datei neu erzeugt werden. */
window.MATHE_PLAENE = [
 {
  "plan": "Proportionalität",
  "url": "proportionalitaet.html",
  "ziele": [
   {
    "id": "WT",
    "titel": "Wertetabelle ergänzen",
    "info": "Fehlende Werte in einer proportionalen Tabelle bestimmen",
    "erw": false,
    "hilfe": "<p><b>Proportional</b> heisst: Rechnest du den einen Wert <b>mal</b> oder <b>durch</b> eine Zahl, rechnest du den anderen Wert genau gleich.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Zeit</th><th></th><th>Strecke</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">60 min</td><td class=\"sep\">–</td><td class=\"w \">54 km</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 3</td><td class=\"w \">20 min</td><td class=\"sep\">–</td><td class=\"w \">18 km</td><td class=\"op\">: 3</td></tr><tr class=\" \"><td class=\"op\">· 2</td><td class=\"w \">40 min</td><td class=\"sep\">–</td><td class=\"w \">36 km</td><td class=\"op\">· 2</td></tr></table></div> <p>Ein Bus fährt 54 km/h. In 20 min fährt er 18 km, in 40 min doppelt so weit: 36 km.</p>"
   },
   {
    "id": "SZ",
    "titel": "Strecke und Zeit",
    "info": "Wie weit? Wie lange? Mit der Geschwindigkeit rechnen",
    "erw": false,
    "hilfe": "<p>1. Schreibe das bekannte Wertepaar oben hin, zum Beispiel <b>60 min – 66 km</b> (66 km/h).<br>2. Darunter, was gesucht ist: <b>50 min – ?</b><br>3. Suche einen Zwischenschritt, mit dem du gut rechnen kannst, zum Beispiel 10 min.<br>4. Rechne links und rechts gleich.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Zeit</th><th></th><th>Strecke</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">60 min</td><td class=\"sep\">–</td><td class=\"w \">66 km</td><td class=\"op\"></td></tr><tr class=\"strich \"><td class=\"op\"></td><td class=\"w \">50 min</td><td class=\"sep\">–</td><td class=\"w frage \">?</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">60 min</td><td class=\"sep\">–</td><td class=\"w \">66 km</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 6</td><td class=\"w \">10 min</td><td class=\"sep\">–</td><td class=\"w \">11 km</td><td class=\"op\">: 6</td></tr><tr class=\" fett\"><td class=\"op\">· 5</td><td class=\"w \">50 min</td><td class=\"sep\">–</td><td class=\"w ziel\">55 km</td><td class=\"op\">· 5</td></tr></table></div> <p>Für eine Zeitdauer gehst du gleich vor – nur rechnest du dann die Strecke um und schaust, wie sich die Zeit verändert.</p>"
   },
   {
    "id": "GS",
    "titel": "Geschwindigkeit in km/h",
    "info": "Die durchschnittliche Geschwindigkeit berechnen",
    "erw": false,
    "hilfe": "<p>Die Geschwindigkeit in <b>km/h</b> sagt, wie weit man in <b>1 Stunde</b> kommt. Rechne die Strecke auf 60 min hoch.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Zeit</th><th></th><th>Strecke</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">10 min</td><td class=\"sep\">–</td><td class=\"w \">4 km</td><td class=\"op\"></td></tr><tr class=\" fett\"><td class=\"op\">· 6</td><td class=\"w \">60 min</td><td class=\"sep\">–</td><td class=\"w ziel\">24 km</td><td class=\"op\">· 6</td></tr></table></div> <p>4 km in 10 min → <b>24 km/h</b>.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Zeit</th><th></th><th>Strecke</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">15 s</td><td class=\"sep\">–</td><td class=\"w \">100 m</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">· 4</td><td class=\"w \">1 min</td><td class=\"sep\">–</td><td class=\"w \">400 m</td><td class=\"op\">· 4</td></tr><tr class=\" fett\"><td class=\"op\">· 60</td><td class=\"w \">60 min</td><td class=\"sep\">–</td><td class=\"w ziel\">24’000 m = 24 km</td><td class=\"op\">· 60</td></tr></table></div> <p>100 m in 15 s → ebenfalls <b>24 km/h</b>.</p>"
   },
   {
    "id": "PN",
    "titel": "Proportional oder nicht?",
    "info": "Prüfen, ob Wertepaare proportional zueinander sind",
    "erw": false,
    "hilfe": "<p>Rechne bei jedem Wertepaar aus, wie viel es für <b>1</b> gibt (zum Beispiel für 1 h, 1 min oder 100 g). Ist es überall gleich viel, sind die Wertepaare proportional.</p> <p>In 2 h verdient Tom 30 Fr., in 5 h verdient er 75 Fr.<br>→ 30 Fr. : 2 = <b>15 Fr.</b> pro Stunde und 75 Fr. : 5 = <b>15 Fr.</b> pro Stunde → <b>proportional</b> ✓</p> <p>In 3 h verdient Lea 42 Fr., in 4 h verdient sie 60 Fr.<br>→ 14 Fr. und 15 Fr. pro Stunde → <b>nicht proportional</b></p>"
   },
   {
    "id": "DM",
    "titel": "Preis, Menge und Durchfluss",
    "info": "Mit proportionalen Wertepaaren im Alltag rechnen",
    "erw": false,
    "hilfe": "<p>Gleich wie bei Strecke und Zeit: das bekannte Wertepaar oben, das Gesuchte darunter, dann über einen Zwischenschritt rechnen.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Gewicht</th><th></th><th>Preis</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">200 g</td><td class=\"sep\">–</td><td class=\"w \">5.20 Fr.</td><td class=\"op\"></td></tr><tr class=\"strich \"><td class=\"op\"></td><td class=\"w \">500 g</td><td class=\"sep\">–</td><td class=\"w frage \">?</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">200 g</td><td class=\"sep\">–</td><td class=\"w \">5.20 Fr.</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 2</td><td class=\"w \">100 g</td><td class=\"sep\">–</td><td class=\"w \">2.60 Fr.</td><td class=\"op\">: 2</td></tr><tr class=\" fett\"><td class=\"op\">· 5</td><td class=\"w \">500 g</td><td class=\"sep\">–</td><td class=\"w ziel\">13.00 Fr.</td><td class=\"op\">· 5</td></tr></table></div> <p>Beim Durchfluss gibt die Zahl an, wie viel Wasser in <b>1 Minute</b> fliesst: 8 l/min heisst 8 l in 1 min, also 40 l in 5 min.</p>"
   },
   {
    "id": "ZW",
    "titel": "Mit Zwischenschritten",
    "info": "Bei schwierigen Zahlen einen geschickten Zwischenschritt finden",
    "erw": true,
    "hilfe": "<p>Bei schwierigen Zahlen hilft ein geschickter Zwischenschritt. Oft geht es gut über <b>1 Minute</b>.</p> <p>Eine Anlage füllt in 1 h 1500 l Saft ab. Wie lange braucht sie für 2350 l?</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Saft</th><th></th><th>Zeit</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">1500 l</td><td class=\"sep\">–</td><td class=\"w \">60 min</td><td class=\"op\"></td></tr><tr class=\"strich \"><td class=\"op\"></td><td class=\"w \">2350 l</td><td class=\"sep\">–</td><td class=\"w frage \">?</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">1500 l</td><td class=\"sep\">–</td><td class=\"w \">60 min</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 60</td><td class=\"w \">25 l</td><td class=\"sep\">–</td><td class=\"w \">1 min</td><td class=\"op\">: 60</td></tr><tr class=\" fett\"><td class=\"op\">· 94</td><td class=\"w \">2350 l</td><td class=\"sep\">–</td><td class=\"w ziel\">94 min</td><td class=\"op\">· 94</td></tr></table></div> <p>2350 : 25 = 94 → 94 min = <b>1 h 34 min</b>.</p>"
   },
   {
    "id": "TR",
    "titel": "Treffpunkt",
    "info": "Zwei kommen sich entgegen: Wann und wo treffen sie sich?",
    "erw": true,
    "hilfe": "<p>Kommen zwei einander entgegen, rückt jede und jeder ein Stück näher. Darum zählst du die beiden Geschwindigkeiten <b>zusammen</b>.</p> <p>Sara fährt mit 16 km/h Velo, Ben geht mit 4 km/h zu Fuss. Sie sind 5 km voneinander entfernt.<br>Zusammen: 16 + 4 = <b>20 km pro Stunde</b>.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Strecke</th><th></th><th>Zeit</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">20 km</td><td class=\"sep\">–</td><td class=\"w \">60 min</td><td class=\"op\"></td></tr><tr class=\" fett\"><td class=\"op\">: 4</td><td class=\"w \">5 km</td><td class=\"sep\">–</td><td class=\"w ziel\">15 min</td><td class=\"op\">: 4</td></tr></table></div> <p>Sie treffen sich nach 15 min. Sara ist dann 4 km gefahren (16 km : 4), Ben 1 km gegangen (4 km : 4).</p>"
   }
  ]
 },
 {
  "plan": "Umgekehrte Proportionalität",
  "url": "umgekehrte-proportionalitaet.html",
  "ziele": [
   {
    "id": "UT",
    "titel": "Wertetabelle ergänzen",
    "info": "Umgekehrt proportionale Tabellen ergänzen",
    "erw": false,
    "hilfe": "<p><b>Umgekehrt proportional</b> heisst: Wird der eine Wert <b>doppelt</b> so gross, wird der andere Wert <b>halb</b> so gross.</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Anzahl Kinder</th><th></th><th>Sticker pro Kind</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">3</td><td class=\"sep\">–</td><td class=\"w \">20</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">· 2</td><td class=\"w \">6</td><td class=\"sep\">–</td><td class=\"w \">10</td><td class=\"op\">: 2</td></tr><tr class=\" \"><td class=\"op\">: 3</td><td class=\"w \">2</td><td class=\"sep\">–</td><td class=\"w \">30</td><td class=\"op\">· 3</td></tr></table></div> <p>60 Sticker werden verteilt. Bei 3 Kindern bekommt jedes 20 Sticker, bei 6 Kindern nur noch 10.<br><b>Kontrolle:</b> Anzahl Kinder · Sticker pro Kind gibt immer 60.</p>"
   },
   {
    "id": "AN",
    "titel": "Doppelte, Hälfte, Drittel …",
    "info": "Die passende Angabe finden: das Doppelte, die Hälfte, ein Drittel …",
    "erw": false,
    "hilfe": "<p>Überlege zuerst: Wird es <b>mehr</b> oder <b>weniger</b>?</p> <p>4 Kinder räumen den Werkraum in 30 min auf. 8 Kinder sind doppelt so viele → sie brauchen <b>die Hälfte</b> der Zeit.<br>2 Kinder sind halb so viele → sie brauchen <b>das Doppelte</b> der Zeit.</p> <p>· 2 → das Doppelte<br>· 3 → das Dreifache<br>· 4 → das Vierfache<br>: 2 → die Hälfte<br>: 3 → ein Drittel<br>: 4 → ein Viertel</p>"
   },
   {
    "id": "BE",
    "titel": "Stimmt die Aussage?",
    "info": "Behauptungen zur umgekehrten Proportionalität beurteilen",
    "erw": false,
    "hilfe": "<p>1. Überlege: Was passiert mit dem zweiten Wert, wenn der erste grösser wird – wird er grösser oder kleiner?<br>2. Bei Zahlen: Rechne nach.</p> <p>«3 Maschinen brauchen 8 Tage. 6 Maschinen brauchen 16 Tage.»<br>Doppelt so viele Maschinen brauchen nur <b>die Hälfte</b> der Zeit: 8 Tage : 2 = 4 Tage. → Die Aussage <b>stimmt nicht</b>.</p>"
   },
   {
    "id": "UR",
    "titel": "Sachaufgaben rechnen",
    "info": "Mit umgekehrt proportionalen Wertepaaren rechnen",
    "erw": false,
    "hilfe": "<p>1. Schreibe das bekannte Wertepaar oben hin.<br>2. Darunter, was gesucht ist.<br>3. Rechne links und rechts <b>umgekehrt</b>: links · 2 → rechts : 2.</p> <p>Ein Futtervorrat reicht für 4 Ziegen 15 Tage. Wie lange reicht er für 6 Ziegen?</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Ziegen</th><th></th><th>Tage</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">4</td><td class=\"sep\">–</td><td class=\"w \">15</td><td class=\"op\"></td></tr><tr class=\"strich \"><td class=\"op\"></td><td class=\"w \">6</td><td class=\"sep\">–</td><td class=\"w frage \">?</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">4</td><td class=\"sep\">–</td><td class=\"w \">15</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 2</td><td class=\"w \">2</td><td class=\"sep\">–</td><td class=\"w \">30</td><td class=\"op\">· 2</td></tr><tr class=\" fett\"><td class=\"op\">· 3</td><td class=\"w \">6</td><td class=\"sep\">–</td><td class=\"w ziel\">10</td><td class=\"op\">: 3</td></tr></table></div> <p>Er reicht <b>10 Tage</b>. Kontrolle: 4 · 15 = 60 und 6 · 10 = 60.</p>"
   },
   {
    "id": "UZ",
    "titel": "Mit Zwischenschritten",
    "info": "Schwierige Zahlen: über einen Zwischenwert oder das Ganze rechnen",
    "erw": true,
    "hilfe": "<p>Bei schwierigen Zahlen hilft ein Zwischenschritt – oder du rechnest zuerst <b>das Ganze</b> aus.</p> <p>Bei 16 l/min ist ein Becken in 1 h 30 min voll. Wie lange dauert es bei 20 l/min?</p> <div class=\"tabwrap\"><table class=\"wp\"><tr><th></th><th>Zufluss</th><th></th><th>Zeit</th><th></th></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">16 l/min</td><td class=\"sep\">–</td><td class=\"w \">90 min</td><td class=\"op\"></td></tr><tr class=\"strich \"><td class=\"op\"></td><td class=\"w \">20 l/min</td><td class=\"sep\">–</td><td class=\"w frage \">?</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\"></td><td class=\"w \">16 l/min</td><td class=\"sep\">–</td><td class=\"w \">90 min</td><td class=\"op\"></td></tr><tr class=\" \"><td class=\"op\">: 4</td><td class=\"w \">4 l/min</td><td class=\"sep\">–</td><td class=\"w \">360 min</td><td class=\"op\">· 4</td></tr><tr class=\" fett\"><td class=\"op\">· 5</td><td class=\"w \">20 l/min</td><td class=\"sep\">–</td><td class=\"w ziel\">72 min</td><td class=\"op\">: 5</td></tr></table></div> <p>72 min = <b>1 h 12 min</b>. Oder: Das Becken fasst 16 · 90 = 1440 l. 1440 : 20 = 72 min.</p>"
   }
  ]
 },
 {
  "plan": "Wertepaare und Wertetabellen",
  "url": "wertetabellen.html",
  "ziele": [
   {
    "id": "PU",
    "titel": "Proportional oder umgekehrt?",
    "info": "Erkennen: proportional, umgekehrt proportional oder weder noch",
    "erw": false,
    "hilfe": "<p>Prüfe jedes Wertepaar:</p> <p>• Gibt <b>rechts : links</b> immer das Gleiche? → <b>proportional</b><br>• Gibt <b>links · rechts</b> immer das Gleiche? → <b>umgekehrt proportional</b><br>• Beides nicht? → <b>weder noch</b></p> <div class=\"tabwrap\"><table class=\"wtab\"><tr><th>Anzahl Hefte</th><th class=\"strich\"></th><th>Preis in Fr.</th></tr><tr><td>2</td><td class=\"strich\">–</td><td>5</td></tr><tr><td>4</td><td class=\"strich\">–</td><td>10</td></tr><tr><td>6</td><td class=\"strich\">–</td><td>15</td></tr></table></div> <p>5 : 2 = 2.5, 10 : 4 = 2.5, 15 : 6 = 2.5 → immer gleich → <b>proportional</b>.</p>"
   },
   {
    "id": "DH",
    "titel": "Doppelt, halb oder weder noch?",
    "info": "Was passiert, wenn sich ein Wert verdoppelt oder halbiert?",
    "erw": false,
    "hilfe": "<p>• <b>Proportional:</b> doppelt so viel → doppelt so viel<br>• <b>Umgekehrt proportional:</b> doppelt so viel → halb so viel<br>• <b>Weder noch:</b> Rechne nach – es ist weder das Doppelte noch die Hälfte.</p> <p>Beispiel: Tim ist 10 Jahre alt, sein Bruder 13. Wenn Tim doppelt so alt ist (20), ist sein Bruder 23 – das ist <b>weder doppelt noch halb</b> so alt wie 13.</p>"
   },
   {
    "id": "WE",
    "titel": "Wertetabellen ergänzen",
    "info": "Den Zusammenhang erkennen und fehlende Werte ergänzen",
    "erw": false,
    "hilfe": "<p>1. Lies die Situation genau.<br>2. Schau die vollständigen Wertepaare an: Wie hängen sie zusammen?<br>3. Rechne die fehlenden Werte mit der gleichen Regel aus.</p> <div class=\"tabwrap\"><table class=\"wtab\"><tr><th>Gelesene Seiten</th><th class=\"strich\"></th><th>Seiten noch zu lesen</th></tr><tr><td>20</td><td class=\"strich\">–</td><td>130</td></tr><tr><td>50</td><td class=\"strich\">–</td><td>100</td></tr><tr><td>70</td><td class=\"strich\">–</td><td>?</td></tr></table></div> <p>Das Buch hat 150 Seiten: links + rechts gibt immer 150. Also 150 − 70 = <b>80</b>.</p>"
   },
   {
    "id": "SA",
    "titel": "Sachaufgaben",
    "info": "Zuerst den Zusammenhang erkennen, dann rechnen",
    "erw": false,
    "hilfe": "<p>1. Überlege zuerst: <b>proportional</b>, <b>umgekehrt proportional</b> oder <b>weder noch</b>?<br>2. Erstelle eine kleine Tabelle mit dem bekannten Wertepaar.<br>3. Rechne mit der passenden Regel.</p> <p>Tim ist 8, seine Tante 31. Wie alt ist die Tante, wenn Tim 16 ist?<br>→ Nicht proportional! Der Unterschied bleibt immer 23 Jahre: 16 + 23 = <b>39</b>.</p>"
   },
   {
    "id": "MU",
    "titel": "Muster in Tabellen",
    "info": "Verdoppeln, Halbieren und andere Muster fortsetzen",
    "erw": true,
    "hilfe": "<p>Schau, wie sich der Wert von Zeile zu Zeile verändert: Kommt immer gleich viel dazu? Wird er jedes Mal verdoppelt? Wird er halbiert?</p> <div class=\"tabwrap\"><table class=\"wtab\"><tr><th>Anzahl Faltungen</th><th class=\"strich\"></th><th>Anzahl Teile</th></tr><tr><td>1</td><td class=\"strich\">–</td><td>2</td></tr><tr><td>2</td><td class=\"strich\">–</td><td>4</td></tr><tr><td>3</td><td class=\"strich\">–</td><td>8</td></tr><tr><td>4</td><td class=\"strich\">–</td><td>?</td></tr></table></div> <p>Bei jeder Faltung verdoppelt sich die Anzahl Teile: 8 · 2 = <b>16</b>.</p>"
   }
  ]
 }
];
