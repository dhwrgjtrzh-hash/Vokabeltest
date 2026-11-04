/* Lernziele der drei Mathepläne mit den Erklärungen («So geht's») – wörtlich aus den Mathe-Trainern übernommen.
   Wird vom Lernportal (index.html) gebraucht, um den Kindern zu zeigen, was sie noch üben sollten.
   Ändert sich ein Lernziel oder eine Erklärung in einem Mathe-Trainer, muss diese Datei nachgeführt werden. */
window.MATHE_PLAENE = [
 {
  "plan": "Dezimalzahlen",
  "url": "dezimalzahlen.html",
  "ziele": [
   {
    "id": "A1",
    "titel": "Zahlenstrahl",
    "info": "Dezimalzahlen ablesen und eintragen",
    "erw": false,
    "hilfe": "<p>1. Schau die beschrifteten Zahlen an.<br>2. Zähle, in wie viele gleiche Abschnitte die Strecke geteilt ist.<br>3. Abstand : Anzahl Abschnitte = Wert von <b>einem</b> Abschnitt.</p> <p>Beispiel: Von 10 bis 11 sind es 100 kleine Abschnitte → ein kleiner Strich = 0.01. Die langen Striche sind die Zehntel 10.1, 10.2, …</p>"
   },
   {
    "id": "A2",
    "titel": "In Schritten zählen",
    "info": "Zahlenfolgen vorwärts und rückwärts",
    "erw": false,
    "hilfe": "<p>1. Finde den Schritt: Rechne die Differenz von zwei Nachbarzahlen aus.<br>2. Vorwärts: + Schritt. Rückwärts: − Schritt.</p> <p>Beispiel: 13.02, 13.05, 13.08 → Schritt 0.03. Vorwärts: 13.11, 13.14. Rückwärts: 12.99, 12.96.<br>Achtung beim Übergang: 0.75 + 0.25 = <b>1</b> · 13.02 − 0.03 = <b>12.99</b></p>"
   },
   {
    "id": "A3",
    "titel": "Nachbarzahlen",
    "info": "Nachbar-Tausender bis Nachbar-Tausendstel",
    "erw": false,
    "hilfe": "<p><b>Nachbar-Zehntel</b> = das nächstkleinere und das nächstgrössere Zehntel (eine Stelle nach dem Punkt).</p> <p>4.37 → <b>4.3</b> und <b>4.4</b> · 3.954 → Nachbar-Tausendstel? 3.954 ist selbst ein Tausendstel → <b>3.953</b> und <b>3.955</b><br> 7.6 ist selbst ein Zehntel → Nachbar-Zehntel <b>7.5</b> und <b>7.7</b> · 128.245 → Nachbar-Hunderter <b>100</b> und <b>200</b></p>"
   },
   {
    "id": "A4",
    "titel": "· und : 10, 100, 1000",
    "info": "Multiplizieren und dividieren mit Stufenzahlen",
    "erw": false,
    "hilfe": "<p><b>· 10 / · 100 / · 1000:</b> Jede Ziffer wird 10/100/1000-mal so viel wert. Der Punkt rutscht 1/2/3 Stellen nach <b>rechts</b>.<br>0.75 · 10 = 7.5 · 0.03 · 100 = 3 · 5.25 · 1000 = 5’250</p> <p><b>: 10 / : 100 / : 1000:</b> Der Punkt rutscht 1/2/3 Stellen nach <b>links</b>. Fehlende Stellen mit 0 auffüllen.<br>231.6 : 10 = 23.16 · 37 : 1000 = 0.037</p>"
   },
   {
    "id": "ST",
    "titel": "Stellenwerte",
    "info": "Stellenwerttafel lesen und schreiben",
    "erw": false,
    "hilfe": "<p>Nach dem Punkt kommen <b>Zehntel (z)</b>, <b>Hundertstel (h)</b> und <b>Tausendstel (t)</b>.</p><div style=\"overflow-x:auto\"><table class=\"svt\"><tr><th class=\" \"><b>Z</b>Zehner</th><th class=\" \"><b>E</b>Einer</th><th class=\"dec dot\"><b>z</b>Zehntel</th><th class=\"dec \"><b>h</b>Hundertstel</th><th class=\"dec \"><b>t</b>Tausendstel</th></tr><tr><td class=\" \">3</td><td class=\" \">4</td><td class=\"dec dot\">7</td><td class=\"dec \">1</td><td class=\"dec \">8</td></tr></table></div> <p>34.718 = 3 Zehner + 4 Einer + 7 Zehntel + 1 Hundertstel + 8 Tausendstel.<br>Fehlt eine Stelle, schreibst du eine <b>0</b>: 2 Einer + 5 Hundertstel = 2.05<br>10 Hundertstel = 1 Zehntel · 10 Zehntel = 1 Einer</p>"
   },
   {
    "id": "VG",
    "titel": "Grösser oder kleiner?",
    "info": "Dezimalzahlen vergleichen",
    "erw": false,
    "hilfe": "<p>1. Zuerst die <b>Ganzen</b> vergleichen.<br>2. Sind sie gleich: Zehntel, dann Hundertstel, dann Tausendstel.</p><p>Tipp: Schreibe beide Zahlen mit gleich vielen Stellen: 0.8 = 0.80 &gt; 0.75 · 15.7 = 15.70 &gt; 15.07</p>"
   },
   {
    "id": "E1",
    "titel": "Die Mitte finden",
    "info": "Welche Zahl liegt genau dazwischen?",
    "erw": true,
    "hilfe": "<p>1. Abstand: grössere Zahl − kleinere Zahl.<br>2. Abstand halbieren.<br>3. Die Hälfte zur kleineren Zahl dazuzählen.</p><p>10 und 10.5 → Abstand 0.5 → Hälfte 0.25 → <b>10.25</b><br>Achtung: Welche Zahl ist wirklich kleiner? 0.6 ist grösser als 0.006!</p>"
   },
   {
    "id": "E2",
    "titel": "Start, Ziel und Schritte",
    "info": "Gleich grosse Schritte zwischen Start- und Zielzahl",
    "erw": true,
    "hilfe": "<p>1. Abstand: Zielzahl − Startzahl.<br>2. Abstand : Anzahl Schritte = ein Schritt.<br>3. Von der Startzahl aus Schritt für Schritt weiterzählen.</p><p>Start 0.4, Ziel 1.1, 5 Schritte → Abstand 0.7 → Schritt 0.14 → 0.54, 0.68, 0.82, 0.96</p>"
   }
  ]
 },
 {
  "plan": "Brüche und Dezimalzahlen",
  "url": "brueche-dezimalzahlen.html",
  "ziele": [
   {
    "id": "B2",
    "titel": "Bruch → Dezimalzahl",
    "info": "Brüche in Dezimalzahlen umwandeln",
    "erw": false,
    "hilfe": "<p><b>Erweitern:</b> Erweitere den Bruch so, dass im Nenner 10, 100 oder 1000 steht.<br><span class=\"fr\"><span>3</span><span>25</span></span> = <span class=\"fr\"><span>12</span><span>100</span></span> = 12 Hundertstel = <b>0.12</b> · <span class=\"fr\"><span>3</span><span>8</span></span> = <span class=\"fr\"><span>375</span><span>1000</span></span> = <b>0.375</b></p> <p><b>Oder dividieren:</b> <span class=\"fr\"><span>1</span><span>4</span></span> = 1 : 4 = <b>0.25</b></p>"
   },
   {
    "id": "B1",
    "titel": "Dezimalzahl → Bruch",
    "info": "Als Bruch schreiben und so weit wie möglich kürzen",
    "erw": false,
    "hilfe": "<p>1. Lies die Dezimalzahl in Zehnteln, Hundertsteln oder Tausendsteln.<br>2. Schreibe sie als Bruch.<br>3. Kürze, so weit es geht.</p> <p>0.32 = 32 Hundertstel = <span class=\"fr\"><span>32</span><span>100</span></span> = <span class=\"fr\"><span>16</span><span>50</span></span> = <b><span class=\"fr\"><span>8</span><span>25</span></span></b><br>0.04 = <span class=\"fr\"><span>4</span><span>100</span></span> = <b><span class=\"fr\"><span>1</span><span>25</span></span></b> · 2.25 = <span class=\"fr\"><span>225</span><span>100</span></span> = <b><span class=\"fr\"><span>9</span><span>4</span></span></b></p>"
   },
   {
    "id": "DV",
    "titel": "Division → Bruch und Dezimalzahl",
    "info": "Resultat als gekürzten Bruch und als Dezimalzahl",
    "erw": false,
    "hilfe": "<p>Eine Division kannst du als Bruch schreiben: 15 : 20 = <span class=\"fr\"><span>15</span><span>20</span></span></p><p>Kürzen: <span class=\"fr\"><span>15</span><span>20</span></span> = <b><span class=\"fr\"><span>3</span><span>4</span></span></b> · Dezimalzahl: <span class=\"fr\"><span>3</span><span>4</span></span> = <span class=\"fr\"><span>75</span><span>100</span></span> = <b>0.75</b></p>"
   },
   {
    "id": "ZS",
    "titel": "Zahlenstrahl",
    "info": "Brüche und Dezimalzahlen am Zahlenstrahl",
    "erw": false,
    "hilfe": "<p>1. In wie viele gleiche Abschnitte ist die Strecke von 0 bis 1 geteilt? Das ist der <b>Nenner</b>.<br>2. Wie viele Abschnitte sind es bis zum Pfeil? Das ist der <b>Zähler</b>.</p> <p>20 Abschnitte, Pfeil beim 7. → <span class=\"fr\"><span>7</span><span>20</span></span> = <span class=\"fr\"><span>35</span><span>100</span></span> = <b>0.35</b></p>"
   },
   {
    "id": "SD",
    "titel": "Stimmt das?",
    "info": "Haben Bruch und Dezimalzahl den gleichen Wert?",
    "erw": false,
    "hilfe": "<p>Rechne den Bruch selber in eine Dezimalzahl um und vergleiche.</p><p><span class=\"fr\"><span>1</span><span>4</span></span> = 0.25 ✓ – aber <b>nicht</b> 0.4! Der Nenner ist nicht die Dezimalzahl.<br><span class=\"fr\"><span>3</span><span>5</span></span> = <span class=\"fr\"><span>6</span><span>10</span></span> = 0.6 – <b>nicht</b> 0.35</p>"
   },
   {
    "id": "UE",
    "titel": "Unendlich viele Dezimalen",
    "info": "Periodische Dezimalzahlen wie 0.333…",
    "erw": true,
    "hilfe": "<p>Manche Divisionen hören nie auf: 1 : 3 = 0.333… · 2 : 3 = 0.666…<br>Bei Neuntel wiederholt sich der Zähler: <span class=\"fr\"><span>1</span><span>9</span></span> = 0.111… · <span class=\"fr\"><span>4</span><span>9</span></span> = 0.444…<br>Bei 99-stel wiederholen sich zwei Ziffern: <span class=\"fr\"><span>5</span><span>99</span></span> = 0.0505… · <span class=\"fr\"><span>25</span><span>99</span></span> = 0.2525…</p>"
   }
  ]
 },
 {
  "plan": "Zahlen ordnen",
  "url": "zahlen-ordnen.html",
  "ziele": [
   {
    "id": "C1",
    "titel": "Brüche vergleichen",
    "info": "Brüche mit unterschiedlichen Nennern vergleichen",
    "erw": false,
    "hilfe": "<p><b>Gleicher Nenner:</b> Der grössere Zähler gewinnt. <span class=\"fr\"><span>5</span><span>7</span></span> &gt; <span class=\"fr\"><span>2</span><span>7</span></span><br><b>Gleicher Zähler:</b> Der kleinere Nenner gewinnt. <span class=\"fr\"><span>5</span><span>7</span></span> &gt; <span class=\"fr\"><span>5</span><span>12</span></span></p> <p><b>Sonst:</b> Gemeinsamen Nenner suchen und erweitern. <span class=\"fr\"><span>3</span><span>4</span></span> = <span class=\"fr\"><span>9</span><span>12</span></span>, <span class=\"fr\"><span>4</span><span>6</span></span> = <span class=\"fr\"><span>8</span><span>12</span></span> → <span class=\"fr\"><span>3</span><span>4</span></span> &gt; <span class=\"fr\"><span>4</span><span>6</span></span></p>"
   },
   {
    "id": "BD",
    "titel": "Bruch und Dezimalzahl",
    "info": "Bruch und Dezimalzahl vergleichen",
    "erw": false,
    "hilfe": "<p>Schreibe den Bruch als Dezimalzahl, dann kannst du gut vergleichen.</p><p><span class=\"fr\"><span>2</span><span>5</span></span> = <span class=\"fr\"><span>4</span><span>10</span></span> = 0.4 → <span class=\"fr\"><span>2</span><span>5</span></span> &gt; 0.3<br><span class=\"fr\"><span>2</span><span>3</span></span> = 2 : 3 = 0.666… → 0.6 &lt; <span class=\"fr\"><span>2</span><span>3</span></span></p>"
   },
   {
    "id": "OR",
    "titel": "Der Grösse nach ordnen",
    "info": "Brüche und Dezimalzahlen ordnen",
    "erw": false,
    "hilfe": "<p>1. Schreibe alle Zahlen als Dezimalzahlen.<br>2. Vergleiche und ordne – beginne mit der kleinsten Zahl.</p><p><span class=\"fr\"><span>1</span><span>2</span></span>, 0.3, <span class=\"fr\"><span>1</span><span>6</span></span>, <span class=\"fr\"><span>4</span><span>5</span></span> → 0.5, 0.3, 0.166…, 0.8 → <b><span class=\"fr\"><span>1</span><span>6</span></span> &lt; 0.3 &lt; <span class=\"fr\"><span>1</span><span>2</span></span> &lt; <span class=\"fr\"><span>4</span><span>5</span></span></b></p>"
   },
   {
    "id": "ZS",
    "titel": "Zahlenstrahl",
    "info": "Brüche und Dezimalzahlen auf dem Zahlenstrahl",
    "erw": false,
    "hilfe": "<p>1. Schreibe die Zahl als Dezimalzahl (oder als Hundertstel).<br>2. Zähle auf dem Zahlenstrahl ab: Wie viele Abschnitte hat die Strecke von 0 bis 1?</p><p><span class=\"fr\"><span>22</span><span>25</span></span> = <span class=\"fr\"><span>88</span><span>100</span></span> = 0.88 → nach dem langen Strich 0.8 noch 8 kleine Striche.</p>"
   },
   {
    "id": "KZ",
    "titel": "Kürzen",
    "info": "Brüche so weit wie möglich kürzen",
    "erw": false,
    "hilfe": "<p>Teile Zähler und Nenner durch dieselbe Zahl. Mach weiter, bis es nicht mehr geht.</p><p><span class=\"fr\"><span>50</span><span>60</span></span> = <span class=\"fr\"><span>5</span><span>6</span></span> (durch 10) · <span class=\"fr\"><span>6</span><span>9</span></span> = <span class=\"fr\"><span>2</span><span>3</span></span> (durch 3) · <span class=\"fr\"><span>75</span><span>100</span></span> = <span class=\"fr\"><span>3</span><span>4</span></span> (durch 25)</p>"
   },
   {
    "id": "MB",
    "titel": "Bruch in der Mitte",
    "info": "Den Bruch genau zwischen zwei Brüchen finden",
    "erw": true,
    "hilfe": "<p>1. Mache die Brüche gleichnamig (gleicher Nenner).<br>2. Liegt zwischen den Zählern keine ganze Zahl in der Mitte, erweitere beide noch mit 2.<br>3. Der Zähler in der Mitte ergibt den Bruch in der Mitte.</p> <p><span class=\"fr\"><span>1</span><span>8</span></span> und <span class=\"fr\"><span>3</span><span>8</span></span> → <span class=\"fr\"><span>2</span><span>8</span></span> = <span class=\"fr\"><span>1</span><span>4</span></span> · <span class=\"fr\"><span>1</span><span>8</span></span> und <span class=\"fr\"><span>1</span><span>16</span></span> → <span class=\"fr\"><span>2</span><span>16</span></span> und <span class=\"fr\"><span>1</span><span>16</span></span> → <span class=\"fr\"><span>4</span><span>32</span></span> und <span class=\"fr\"><span>2</span><span>32</span></span> → <b><span class=\"fr\"><span>3</span><span>32</span></span></b></p>"
   }
  ]
 }
];
