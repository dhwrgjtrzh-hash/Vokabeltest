/* =====================================================================
   Lernportal 6b – Gymi-Training: Aufgabenvorlagen im Stil der Gymiprüfung
   (Zentrale Aufnahmeprüfung Langgymnasium Kanton Zürich, Mathematik)

   - Eigene Aufgaben, keine Originalaufgaben (die Originalprüfungen sind nur verlinkt).
   - Jede Vorlage würfelt neue Zahlen. Die Lösung rechnet das Programm aus, nicht ein Mensch.
     Die Zahlen sind so gewählt, dass man ohne Taschenrechner rechnen kann.
   - Jede Aufgabe hat Tipps und einen Lösungsweg.
   - Themen nach den Prüfungsanforderungen ZAP1 2027: Zahl und Variable, Form und Raum,
     Grössen, Funktionen und Daten (inkl. Proportionalität, Durchschnitt, Kombinatorik).

   Aufgabe: {typ, thema, titel, html, teile:[{label, frage, art:"zahl"|"bruch"|"uhr", loesung, einheit, gekuerzt, show}],
             tipps:[…], weg:"…", text:"Aufgabe als Text", ungeordnet?, p:{Zahlen der Aufgabe}}
   Läuft im Browser (window.GYMI) und in Node (für die Tests).
   ===================================================================== */
(function (root) {
"use strict";

let R = Math.random;
const rnd = (a, b) => a + Math.floor(R() * (b - a + 1));
const pick = a => a[Math.floor(R() * a.length)];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };
const kgv = (a, b) => a / gcd(a, b) * b;
const kuerz = (n, d) => { const g = gcd(n, d); return { n: n / g, d: d / g }; };
const rund = (x, d = 3) => { const f = 10 ** d; return Math.round(x * f) / f; };
const ganz = x => Math.abs(x - Math.round(x)) < 1e-9;

/* Zahl im Schweizer Format: 1’250.5 */
function zahl(x) {
  x = rund(x, 3); const neg = x < 0; x = Math.abs(x);
  let [w, f = ""] = x.toFixed(3).split("."); f = f.replace(/0+$/, "");
  w = w.replace(/\B(?=(\d{3})+(?!\d))/g, "’");
  return (neg ? "−" : "") + w + (f ? "." + f : "");
}
function chf(x) { const [w, f] = rund(x, 2).toFixed(2).split("."); return w.replace(/\B(?=(\d{3})+(?!\d))/g, "’") + "." + f + " Fr."; }
const fr = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const uhr = m => `${Math.floor(m / 60)}.${String(m % 60).padStart(2, "0")} Uhr`;
const dauer = m => { const h = Math.floor(m / 60), r = m % 60; return h ? (r ? `${h} h ${r} min` : `${h} h`) : `${r} min`; };
const ol = s => `<ol>${s.map(x => `<li>${x}</li>`).join("")}</ol>`;
const P = s => `<p>${s}</p>`;
const B = s => `<b>${s}</b>`;

function plain(html) {
  return String(html || "")
    .replace(/<span class="fr"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g, " $1/$2 ")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").replace(/([^=])\s+([.,:?!])/g, "$1$2").trim();
}

const KINDER = [["Mia", "sie"], ["Noah", "er"], ["Lea", "sie"], ["Luca", "er"], ["Elin", "sie"], ["Jonas", "er"], ["Sara", "sie"], ["Leon", "er"],
  ["Nina", "sie"], ["Elias", "er"], ["Lara", "sie"], ["Samuel", "er"], ["Aylin", "sie"], ["Matteo", "er"], ["Zoe", "sie"], ["Arian", "er"]];
const gross = s => s.charAt(0).toUpperCase() + s.slice(1);

/* ===================================================================== Themen */
const THEMEN = [
  { id: "zahlen", name: "Zahlen und Rechnen" },
  { id: "brueche", name: "Brüche und Anteile" },
  { id: "muster", name: "Muster und Folgen" },
  { id: "geometrie", name: "Geometrie und Raum" },
  { id: "groessen", name: "Grössen und Zeit" },
  { id: "sachrechnen", name: "Sachrechnen" },
  { id: "kombinatorik", name: "Kombinatorik" }
];
const THEMA_NAME = Object.fromEntries(THEMEN.map(t => [t.id, t.name]));

function showVon(t) {
  if (t.art === "bruch") return `${t.loesung.n}/${t.loesung.d}`;
  if (t.art === "uhr") return uhr(t.loesung);
  if (t.einheit === "Fr." && !ganz(t.loesung)) return chf(t.loesung);
  return zahl(t.loesung) + (t.einheit ? (t.einheit === "°" ? "" : " ") + t.einheit : "");
}
function A(typ, html, teile, tipps, weg, extra) {
  const T = TYPEN[typ];
  const t = Object.assign({ typ, thema: THEMA_NAME[T.thema], themaId: T.thema, titel: T.titel, html, teile, tipps, weg }, extra || {});
  t.teile.forEach((x, i) => {
    if (x.label === undefined) x.label = t.teile.length > 1 ? "abcdef"[i] + ")" : "";
    if (!x.art) x.art = "zahl";
    if (x.show == null) x.show = showVon(x);
  });
  /* kontext: die Aufgabe als Text (für die Station); bei Figuren mit den Angaben aus der Zeichnung */
  t.kontext = plain(html) + (t.zusatz ? " " + t.zusatz : "");
  t.text = t.kontext + " " + t.teile.map(x => (x.label ? x.label + " " : "") + plain(x.frage)).join(" ");
  return t;
}

/* ===================================================================== Zahlen und Rechnen */

/* Zahlenrätsel: Rückwärtsrechnen */
function zahlenraetsel() {
  for (let v = 0; v < 5000; v++) {
    const x = rnd(4, 36);
    const sch = []; let w = x, ok = true;
    for (let i = 0; i < 3 && ok; i++) {
      const vor = i ? sch[i - 1].op : null;
      const op = pick(["mal", "plus", "minus", "durch"].filter(o => o !== vor));
      let k;
      if (op === "mal") { k = rnd(2, w > 50 ? 4 : 9); w *= k; }
      else if (op === "plus") { k = rnd(4, 75); w += k; }
      else if (op === "minus") { if (w < 15) { ok = false; break; } k = rnd(3, Math.min(70, w - 5)); w -= k; }
      else { const tl = [2, 3, 4, 5, 6, 7, 8, 9].filter(d => w % d === 0 && w / d >= 4); if (!tl.length) { ok = false; break; } k = pick(tl); w /= k; }
      sch.push({ op, k, w });
    }
    if (!ok) continue;
    if (!sch.some(s => s.op === "mal" || s.op === "durch") || !sch.some(s => s.op === "plus" || s.op === "minus")) continue;
    if (sch.some(s => s.w > 999 || s.w < 1) || w === x || w < 8) continue;
    const gegen = { mal: "durch", durch: "mal", plus: "minus", minus: "plus" };
    if (sch.some((s, i) => i && gegen[s.op] === sch[i - 1].op && s.k === sch[i - 1].k)) continue;   // z. B. «mal 3», dann «durch 3»
    const [name, pr] = pick(KINDER);
    const verb = (s, i) => {
      const obj = i === 0 ? "die Zahl" : "das Ergebnis";
      if (s.op === "mal") return `multipliziert ${pr} ${obj} mit ${s.k}`;
      if (s.op === "durch") return `dividiert ${pr} ${obj} durch ${s.k}`;
      if (s.op === "plus") return i === 0 ? `addiert ${pr} ${s.k} zur Zahl` : `addiert ${pr} ${s.k} dazu`;
      return i === 0 ? `subtrahiert ${pr} ${s.k} von der Zahl` : `subtrahiert ${pr} ${s.k}`;
    };
    const html = P(`${name} denkt sich eine Zahl. Zuerst ${verb(sch[0], 0)}. Dann ${verb(sch[1], 1)}. Zum Schluss ${verb(sch[2], 2)}. ${gross(pr)} erhält ${zahl(w)}.`);
    const sym = { mal: "·", durch: ":", plus: "+", minus: "−" }, inv = { mal: "durch", durch: "mal", plus: "minus", minus: "plus" };
    const wort = { mal: "mal", durch: "durch", plus: "plus", minus: "minus" };
    const weg = [`Rechne rückwärts: Beginne beim Ergebnis ${zahl(w)} und mache die Schritte von hinten nach vorne rückgängig.`];
    let cur = w;
    for (let i = 2; i >= 0; i--) {
      const s = sch[i], vorher = i ? sch[i - 1].w : x;
      weg.push(`«${wort[s.op]} ${s.k}» rückgängig machen, also ${wort[inv[s.op]]} ${s.k}: ${zahl(cur)} ${sym[inv[s.op]]} ${s.k} = ${B(zahl(vorher))}`);
      cur = vorher;
    }
    let probe = [], a = x;
    sch.forEach(s => { probe.push(`${zahl(a)} ${sym[s.op]} ${s.k} = ${zahl(s.w)}`); a = s.w; });
    weg.push(`Probe: ${probe.join(", ")} ✓`);
    return A("zahlenraetsel", html,
      [{ frage: `Welche Zahl hat sich ${name} gedacht?`, loesung: x }],
      [`Rechne rückwärts: Beginne beim Ergebnis ${zahl(w)} und mache den letzten Schritt zuerst rückgängig.`,
        "Das Gegenteil von «mal» ist «durch», das Gegenteil von «plus» ist «minus» – und umgekehrt."],
      ol(weg), { p: { x, w, sch } });
  }
  throw new Error("zahlenraetsel");
}

/* Zwei Zahlen aus Summe (oder Differenz) und Produkt */
function summeProdukt() {
  for (let v = 0; v < 5000; v++) {
    const x = rnd(3, 24), y = rnd(x + 2, 32), prod = x * y;
    if (prod > 640) continue;
    const art = pick(["summe", "differenz"]);
    const s = art === "summe" ? x + y : y - x;
    const paare = []; for (let a = 1; a * a <= prod; a++) if (prod % a === 0) paare.push([a, prod / a]);
    if (paare.length < 4) continue;
    const wert = ([a, b]) => art === "summe" ? a + b : b - a;
    if (paare.filter(q => wert(q) === s).length !== 1) continue;
    const wortS = art === "summe" ? "Summe" : "Differenz";
    const html = P(`Die ${wortS} von zwei natürlichen Zahlen ist ${zahl(s)}. Ihr Produkt ist ${zahl(prod)}.`) + P("Wie heissen die beiden Zahlen?");
    const zeilen = paare.map(([a, b]) => { const r = wert([a, b]) === s; return `${a} · ${b} → ${wortS} ${wert([a, b])}${r ? " ✓" : ""}`; });
    const weg = ol([`Schreibe alle Malrechnungen mit dem Ergebnis ${zahl(prod)} auf und prüfe jedes Mal die ${wortS}:<br>${zeilen.join("<br>")}`,
      `Nur bei ${x} · ${y} ist die ${wortS} ${s}. Die Zahlen heissen ${B(x)} und ${B(y)}.`]);
    return A("summe_produkt", html,
      [{ label: "", frage: "kleinere Zahl:", loesung: x }, { label: "", frage: "grössere Zahl:", loesung: y }],
      [`Zerlege ${zahl(prod)} in zwei Faktoren: 1 · ${zahl(prod)}, 2 · …, 3 · … und so weiter.`,
        `Prüfe bei jedem Paar, ob die ${wortS} ${s} ergibt.`],
      weg, { ungeordnet: true, p: { x, y, art, s, prod } });
  }
  throw new Error("summe_produkt");
}

/* Teilen mit Rest – kgV */
const REST_SETS = [[2, 3, 4], [3, 4, 5], [2, 3, 5], [3, 4, 6], [4, 5, 6], [2, 5, 7], [3, 5, 7], [2, 3, 7]];
function restAufgabe() {
  for (let v = 0; v < 5000; v++) {
    const ds = pick(REST_SETS), L = ds.reduce(kgv), r = rnd(1, Math.min(...ds) - 1);
    const [d1, d2, d3] = ds, dmax = Math.max(...ds), andere = ds.filter(d => d !== dmax);
    const kgvWeg = `Vielfache von ${dmax}: ${Array.from({ length: L / dmax }, (_, i) => (i + 1) * dmax).join(", ")}. ${L} ist das erste, das auch durch ${andere.join(" und ")} teilbar ist. Das kleinste gemeinsame Vielfache ist also ${B(L)}.`;
    if (pick([0, 1])) {
      const html = P(`Gesucht ist die kleinste Zahl, die grösser als 10 ist und beim Teilen durch ${d1}, durch ${d2} und durch ${d3} jedes Mal den Rest ${r} ergibt.`);
      const weg = ol([`Zieh den Rest ${r} ab. Dann geht die Teilung durch ${d1}, ${d2} und ${d3} ohne Rest auf. Gesucht ist also ein gemeinsames Vielfaches von ${d1}, ${d2} und ${d3} – plus ${r}.`,
        kgvWeg, `a) ${L} + ${r} = ${B(L + r)}`, `b) Das nächste gemeinsame Vielfache ist ${2 * L}: ${2 * L} + ${r} = ${B(2 * L + r)}`]);
      return A("rest", html,
        [{ frage: "Welche Zahl ist es?", loesung: L + r }, { frage: "Welches ist die nächstgrössere Zahl mit dieser Eigenschaft?", loesung: 2 * L + r }],
        [`Zieh zuerst den Rest ${r} ab. Dann muss die Zahl durch ${d1}, ${d2} und ${d3} teilbar sein.`,
          `Suche die kleinste Zahl, die durch ${d1}, ${d2} und ${d3} teilbar ist (das kleinste gemeinsame Vielfache).`],
        weg, { p: { ds, r, L, art: "abstrakt" } });
    }
    const k = rnd(1, Math.floor(300 / L)), n = k * L + r;
    if (n < 25) continue;
    const los = [], his = [];
    for (let lo = Math.floor((n - 1) / 10) * 10; lo > n - L && lo >= 10; lo -= 10) los.push(lo);
    for (let hi = Math.ceil((n + 1) / 10) * 10; hi < n + L; hi += 10) his.push(hi);
    if (!los.length || !his.length) continue;
    const lo = pick(los), hi = pick(his);
    if (hi - lo > 100) continue;
    const q = Math.floor(n / d3);
    const rWort = r === 1 ? "bleibt 1 Bonbon" : `bleiben ${r} Bonbons`;
    const html = P(`In einer Dose sind zwischen ${lo} und ${hi} Bonbons. Verteilt man sie gleichmässig an ${d1} Kinder, ${rWort} übrig. Auch bei ${d2} Kindern und bei ${d3} Kindern ${r === 1 ? "bleibt jedes Mal 1 Bonbon" : `bleiben jedes Mal ${r} Bonbons`} übrig.`);
    const vielf = []; for (let m = L; m <= hi; m += L) vielf.push(m);
    const weg = ol([`Nimmt man die ${r} übrigen Bonbons weg, geht die Verteilung bei ${d1}, ${d2} und ${d3} Kindern genau auf. Die Anzahl ohne Rest ist also ein gemeinsames Vielfaches von ${d1}, ${d2} und ${d3}.`,
      kgvWeg, `Gemeinsame Vielfache: ${vielf.join(", ")}. Jeweils + ${r}: ${vielf.map(m => m + r).join(", ")}. Nur ${B(n)} liegt zwischen ${lo} und ${hi}.`,
      `b) ${n} : ${d3} = ${q} Rest ${r}. Jedes Kind bekommt ${B(q)} Bonbons.`]);
    return A("rest", html,
      [{ frage: "Wie viele Bonbons sind in der Dose?", loesung: n, einheit: "Bonbons" },
        { frage: `Wie viele Bonbons bekommt jedes Kind, wenn man sie gleichmässig an ${d3} Kinder verteilt?`, loesung: q, einheit: "Bonbons" }],
      [`Nimm zuerst die ${r} übrigen Bonbons weg. Dann geht die Verteilung bei ${d1}, ${d2} und ${d3} Kindern genau auf.`,
        `Suche die Zahlen, die durch ${d1}, ${d2} und ${d3} teilbar sind. Die kleinste davon ist ${L}.`],
      weg, { p: { ds, r, L, n, lo, hi, q, art: "dose" } });
  }
  throw new Error("rest");
}

/* Teilbarkeit: Anzahl Zahlen in einem Bereich */
function teilbarAnzahl() {
  const zaehle = (A_, B_, m) => Math.floor(B_ / m) - Math.floor((A_ - 1) / m);
  const vielfWeg = (A_, B_, m) => {
    const f = Math.ceil(A_ / m) * m, l = Math.floor(B_ / m) * m;
    return `Das erste Vielfache von ${m} ab ${zahl(A_)} ist ${zahl(f)}, das letzte bis ${zahl(B_)} ist ${zahl(l)}. Anzahl: (${zahl(l)} − ${zahl(f)}) : ${m} + 1 = ${B((l - f) / m + 1)}`;
  };
  for (let v = 0; v < 5000; v++) {
    const art = pick(["und", "abernicht"]);
    const [a, b] = art === "und" ? pick([[4, 6], [6, 8], [6, 9], [4, 10], [10, 15], [6, 15], [8, 12], [6, 10]]) : pick([[3, 9], [4, 8], [5, 10], [2, 6], [3, 6], [4, 12], [2, 10]]);
    const A_ = rnd(100, 400), B_ = A_ + rnd(80, 260);
    const L = kgv(a, b);
    const na = zaehle(A_, B_, a), nb = art === "und" ? zaehle(A_, B_, L) : na - zaehle(A_, B_, b);
    if (na < 3 || nb < 2) continue;
    const html = P(`Betrachte alle natürlichen Zahlen von ${zahl(A_)} bis ${zahl(B_)}. Die Zahlen ${zahl(A_)} und ${zahl(B_)} zählen auch dazu.`);
    const fb = art === "und" ? `Wie viele davon sind durch ${a} und auch durch ${b} teilbar?` : `Wie viele davon sind durch ${a}, aber nicht durch ${b} teilbar?`;
    const weg = art === "und"
      ? ol([`a) ${vielfWeg(A_, B_, a)}`, `b) Eine Zahl, die durch ${a} und durch ${b} teilbar ist, ist durch das kleinste gemeinsame Vielfache ${L} teilbar. Achtung: nicht durch ${a} · ${b} = ${a * b}!`, vielfWeg(A_, B_, L)])
      : ol([`a) ${vielfWeg(A_, B_, a)}`, `b) Jede Zahl, die durch ${b} teilbar ist, ist auch durch ${a} teilbar. Diese Zahlen muss man wegnehmen.`, vielfWeg(A_, B_, b), `${na} − ${zaehle(A_, B_, b)} = ${B(nb)}`]);
    return A("teilbar", html,
      [{ frage: `Wie viele davon sind durch ${a} teilbar?`, loesung: na, einheit: "Zahlen" }, { frage: fb, loesung: nb, einheit: "Zahlen" }],
      [`Suche das erste und das letzte Vielfache von ${a} im Bereich. Dann: (letztes − erstes) : ${a} + 1.`,
        art === "und" ? `Durch ${a} und ${b} teilbar heisst: durch das kleinste gemeinsame Vielfache von ${a} und ${b} teilbar.` : `Zähle zuerst alle Zahlen, die durch ${b} teilbar sind, und nimm sie weg.`],
      weg, { p: { art, a, b, A: A_, B: B_ } });
  }
  throw new Error("teilbar");
}

/* ===================================================================== Brüche und Anteile */

function anteilRest() {
  for (let v = 0; v < 5000; v++) {
    const a = pick([3, 4, 5, 6, 8]), c = pick([4, 5, 6, 8, 9, 10, 12]);
    const b = rnd(1, c - 1);
    if (gcd(b, c) !== 1 || (b === 1 && c === a)) continue;
    const zaehler = a * c - c - a * b;                 // Rest = zaehler / (a·c)
    if (zaehler * 10 < a * c || zaehler * 10 > 6 * a * c) continue;  // Rest zwischen 1/10 und 6/10
    const L = kgv(a, c);
    const ctx = pick(["schule", "bibliothek"]);
    const [mn, mx] = ctx === "schule" ? [120, 480] : [240, 960];
    const ns = []; for (let N = L; N <= mx; N += L) if (N >= mn) ns.push(N);
    if (!ns.length) continue;
    const N = pick(ns), n1 = N / a, n2 = N / c * b, rest = N - n1 - n2, rb = kuerz(rest, N);
    let html, f1, f2;
    if (ctx === "schule") {
      html = P(`An einer Schule gibt es ${zahl(N)} Kinder. ${fr(1, a)} der Kinder kommt mit dem Velo zur Schule, ${fr(b, c)} der Kinder kommen zu Fuss. Die übrigen Kinder fahren mit dem Bus.`);
      f1 = "Wie viele Kinder fahren mit dem Bus?"; f2 = "Welcher Bruchteil aller Kinder fährt mit dem Bus? Schreibe den Bruch gekürzt.";
    } else {
      html = P(`Eine Schulbibliothek hat ${zahl(N)} Bücher. ${fr(1, a)} davon sind Romane, ${fr(b, c)} sind Sachbücher. Die übrigen Bücher sind Comics.`);
      f1 = "Wie viele Comics hat die Bibliothek?"; f2 = "Welcher Bruchteil aller Bücher sind Comics? Schreibe den Bruch gekürzt.";
    }
    const weg = ol([`${fr(1, a)} von ${zahl(N)}: ${zahl(N)} : ${a} = ${zahl(n1)}`,
      `${fr(b, c)} von ${zahl(N)}: ${zahl(N)} : ${c} · ${b} = ${zahl(n2)}`,
      `a) Rest: ${zahl(N)} − ${zahl(n1)} − ${zahl(n2)} = ${B(zahl(rest))}`,
      `b) Bruchteil: ${fr(zahl(rest), zahl(N))}${rb.d !== N ? ` = ${fr(rb.n, rb.d)}` : ""} (gekürzt). Oder: 1 − ${fr(1, a)} − ${fr(b, c)} = ${fr(L, L)} − ${fr(L / a, L)} − ${fr(b * L / c, L)} = ${fr(L - L / a - b * L / c, L)}${kuerz(L - L / a - b * L / c, L).d !== L ? ` = ${fr(rb.n, rb.d)}` : ""}`]);
    return A("anteil_rest", html,
      [{ frage: f1, loesung: rest, einheit: ctx === "schule" ? "Kinder" : "Comics" }, { frage: f2, art: "bruch", loesung: rb, gekuerzt: true }],
      [`Rechne zuerst aus, wie viele ${ctx === "schule" ? "Kinder" : "Bücher"} ${fr(1, a)} und ${fr(b, c)} von ${zahl(N)} sind.`,
        `Für b): Teile die Anzahl aus a) durch ${zahl(N)} und kürze den Bruch.`],
      weg, { p: { a, b, c, N, ctx } });
  }
  throw new Error("anteil_rest");
}

const RW_FR = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [1, 6]];
function rueckwaerts() {
  for (let v = 0; v < 5000; v++) {
    const [n1, d1] = pick(RW_FR), [n2, d2] = pick(RW_FR);
    const ctx = pick(["geld", "buch"]);
    const [mn, mx, step] = ctx === "geld" ? [60, 300, 5] : [120, 480, 1];
    const xs = [];
    for (let X = mn; X <= mx; X++) { if (X % step || X % d1) continue; const r1 = X / d1 * (d1 - n1); if (r1 % d2) continue; xs.push(X); }
    if (!xs.length) continue;
    const X = pick(xs), aus1 = X / d1 * n1, r1 = X - aus1, aus2 = r1 / d2 * n2, r2 = r1 - aus2;
    if (r2 < 10) continue;
    const [name, pr] = pick(KINDER);
    let html, teile;
    if (ctx === "geld") {
      const d1Ding = pick(["ein Buch", "ein Brettspiel", "ein T-Shirt", "Kinokarten", "einen Fussball"]), d2Ding = pick(["Glace", "Comics", "Schreibsachen", "Süssigkeiten", "eine Zeitschrift"]);
      html = P(`${name} hat Geld gespart. ${gross(pr)} gibt ${fr(n1, d1)} davon für ${d1Ding} aus. Vom restlichen Geld gibt ${pr} ${fr(n2, d2)} für ${d2Ding} aus. Jetzt hat ${pr} noch ${chf(r2)}`);
      teile = [{ frage: `Wie viel Geld hatte ${name} am Anfang?`, loesung: X, einheit: "Fr." }, { frage: `Wie viel Geld hat ${pr} für ${d1Ding} ausgegeben?`, loesung: aus1, einheit: "Fr." }];
    } else {
      html = P(`${name} liest ein Buch. Am ersten Tag liest ${pr} ${fr(n1, d1)} aller Seiten. Am zweiten Tag liest ${pr} ${fr(n2, d2)} der restlichen Seiten. Jetzt fehlen noch ${r2} Seiten.`);
      teile = [{ frage: "Wie viele Seiten hat das Buch?", loesung: X, einheit: "Seiten" }, { frage: `Wie viele Seiten hat ${name} am zweiten Tag gelesen?`, loesung: aus2, einheit: "Seiten" }];
    }
    const e = ctx === "geld" ? " Fr." : " Seiten";
    const pkt = x => /\.$/.test(x) ? x : x + ".";        // kein doppelter Punkt nach «Fr.»
    const schritt = (n, d, ganzes, rest, wasGanz) => {
      const ub = d - n;
      return `Nach diesem Schritt ist noch ${fr(ub, d)} ${wasGanz} übrig. ${fr(ub, d)} ${ub === 1 ? "ist" : "sind"} ${pkt(zahl(rest) + e)}` +
        (ub === 1 ? ` Also ist das Ganze ${d} · ${zahl(rest)} = ${B(zahl(ganzes) + e)}` : ` Also ist ${fr(1, d)} = ${zahl(rest)} : ${ub} = ${pkt(zahl(rest / ub) + e)} Ganz: ${d} · ${zahl(rest / ub)} = ${B(zahl(ganzes) + e)}`);
    };
    const weg = ol([`Rechne rückwärts und beginne beim zweiten Schritt.`,
      schritt(n2, d2, r1, r2, ctx === "geld" ? "vom Rest" : "von den restlichen Seiten"),
      schritt(n1, d1, X, r1, ctx === "geld" ? "vom ganzen Geld" : "vom ganzen Buch"),
      ctx === "geld" ? `a) Am Anfang: ${B(chf(X))} · b) ${fr(n1, d1)} von ${zahl(X)} Fr. = ${zahl(X)} : ${d1} · ${n1} = ${B(chf(aus1))}`
        : `a) Das Buch hat ${B(X)} Seiten. b) Am zweiten Tag: ${fr(n2, d2)} von ${r1} = ${r1} : ${d2} · ${n2} = ${B(aus2)} Seiten`,
      `Probe: ${zahl(X)} − ${zahl(aus1)} = ${zahl(r1)}, ${zahl(r1)} − ${zahl(aus2)} = ${zahl(r2)} ✓`]);
    return A("rueckwaerts", html, teile,
      ["Rechne rückwärts: Beginne beim Schluss.", `Nach dem zweiten Schritt ist noch ${fr(d2 - n2, d2)} übrig. Wie viel ist dann ${fr(1, d2)}?`],
      weg, { p: { n1, d1, n2, d2, X, ctx, r2 } });
  }
  throw new Error("rueckwaerts");
}

function bruchRechnen() {
  for (let v = 0; v < 5000; v++) {
    if (pick([0, 1])) {
      /* Mitte zwischen zwei Brüchen */
      const q = rnd(2, 10), s = rnd(2, 10); if (q === s) continue;
      const a = rnd(1, q - 1), c = rnd(1, s - 1);
      if (gcd(a, q) !== 1 || gcd(c, s) !== 1 || a * s >= c * q) continue;
      const m = kuerz(a * s + c * q, 2 * q * s); if (m.d > 120) continue;
      const K = kgv(q, s), A1 = a * K / q, A2 = c * K / s;
      let mz, mn, extra = "";
      if ((A1 + A2) % 2 === 0) { mz = (A1 + A2) / 2; mn = K; extra = `Die Mitte zwischen ${A1} und ${A2} ist ${mz}: ${fr(mz, mn)}`; }
      else { mz = A1 + A2; mn = 2 * K; extra = `Zwischen ${A1} und ${A2} liegt keine ganze Zahl genau in der Mitte. Erweitere darum nochmals mit 2: ${fr(2 * A1, 2 * K)} und ${fr(2 * A2, 2 * K)}. Die Mitte ist ${fr(mz, mn)}`; }
      const html = P(`Welche Zahl liegt auf dem Zahlenstrahl genau in der Mitte zwischen ${fr(a, q)} und ${fr(c, s)}?`);
      const weg = ol([`Mache die Brüche gleichnamig (Nenner ${K}): ${fr(a, q)} = ${fr(A1, K)} und ${fr(c, s)} = ${fr(A2, K)}`, extra,
        mz / gcd(mz, mn) !== mz || mn / gcd(mz, mn) !== mn ? `Gekürzt: ${fr(mz, mn)} = ${B(fr(m.n, m.d))}` : `Das ist schon gekürzt: ${B(fr(m.n, m.d))}`,
        `Kontrolle: Die Mitte ist auch (${fr(a, q)} + ${fr(c, s)}) : 2.`]);
      return A("bruch_rechnen", html, [{ frage: "Schreibe die Zahl als gekürzten Bruch.", art: "bruch", loesung: m, gekuerzt: true }],
        ["Mache die beiden Brüche zuerst gleichnamig (gleicher Nenner).", "Liegt zwischen den Zählern keine ganze Zahl genau in der Mitte, erweitere beide Brüche nochmals mit 2."],
        weg, { p: { art: "mitte", a, q, c, s } });
    }
    /* Summe/Differenz von drei Brüchen */
    const NEN = [2, 3, 4, 5, 6, 8, 9, 10, 12];
    const ds = [pick(NEN), pick(NEN), pick(NEN)];
    const K = ds.reduce(kgv); if (K > 36 || new Set(ds).size < 2) continue;
    const ns = ds.map(d => { let n; do { n = rnd(1, d - 1); } while (gcd(n, d) !== 1); return n; });
    const op = pick(["+", "−"]);
    const z = ns.map((n, i) => n * K / ds[i]);
    const zaehler = z[0] + z[1] + (op === "+" ? z[2] : -z[2]);
    if (zaehler <= 0) continue;
    const e = kuerz(zaehler, K); if (e.d === 1) continue;
    const html = P(`Berechne: ${fr(ns[0], ds[0])} + ${fr(ns[1], ds[1])} ${op} ${fr(ns[2], ds[2])}`);
    const weg = ol([`Gemeinsamer Nenner (kleinstes gemeinsames Vielfaches von ${ds.join(", ")}): ${K}`,
      `Erweitern: ${fr(z[0], K)} + ${fr(z[1], K)} ${op} ${fr(z[2], K)}`,
      `Zähler rechnen: ${z[0]} + ${z[1]} ${op} ${z[2]} = ${zaehler}, also ${fr(zaehler, K)}`,
      e.d !== K ? `Kürzen (durch ${K / e.d}): ${B(fr(e.n, e.d))}` : `Das ist schon gekürzt: ${B(fr(e.n, e.d))}`]);
    return A("bruch_rechnen", html,
      [{ frage: "Gib das Ergebnis als gekürzten Bruch an. Ist es grösser als 1, schreibst du einen unechten Bruch (zum Beispiel 7/4).", art: "bruch", loesung: e, gekuerzt: true }],
      [`Suche einen gemeinsamen Nenner für ${ds.join(", ")}. Der kleinste ist ${K}.`, "Erweitere jeden Bruch auf diesen Nenner, rechne mit den Zählern und kürze am Schluss."],
      weg, { p: { art: "summe", ns, ds, op } });
  }
  throw new Error("bruch_rechnen");
}

/* ===================================================================== Muster und Folgen */

const HOELZER = {
  quadrate: { name: "Quadrate in einer Reihe", f1: 4, d: 3, regel: "3 · Nummer + 1", hoehe: 1,
    kanten(n) { const s = []; for (let i = 0; i < n; i++) s.push([i, 0, i + 1, 0], [i, 1, i + 1, 1]); for (let i = 0; i <= n; i++) s.push([i, 0, i, 1]); return s; } },
  dreiecke: { name: "Dreiecke in einer Reihe", f1: 3, d: 2, regel: "2 · Nummer + 1", hoehe: 0.866,
    kanten(n) {
      const h = 0.866, s = [];
      for (let i = 0; i < n; i++) {
        const x = Math.floor(i / 2);
        if (i % 2 === 0) s.push([x, 0, x + 1, 0], [x, 0, x + 0.5, h], [x + 1, 0, x + 0.5, h]);
        else s.push([x + 0.5, h, x + 1.5, h], [x + 0.5, h, x + 1, 0], [x + 1, 0, x + 1.5, h]);
      }
      return s;
    } },
  doppel: { name: "Quadrate in zwei Reihen", f1: 7, d: 5, regel: "5 · Nummer + 2", hoehe: 2,
    kanten(n) { const s = []; for (let r = 0; r <= 2; r++) for (let i = 0; i < n; i++) s.push([i, r, i + 1, r]); for (let i = 0; i <= n; i++) for (let r = 0; r < 2; r++) s.push([i, r, i, r + 1]); return s; } }
};
function eindeutig(kanten) {
  const k = x => Math.round(x * 1000);
  const m = new Map();
  kanten.forEach(([a, b, c, d]) => { const p = [k(a), k(b)], q = [k(c), k(d)]; const key = (p[0] < q[0] || (p[0] === q[0] && p[1] <= q[1])) ? p.concat(q).join(",") : q.concat(p).join(","); m.set(key, [a, b, c, d]); });
  return [...m.values()];
}
function hoelzerSvg(form) {
  const F = HOELZER[form], s = 30, pad = 14, gap = 1.2;
  const breite = n => form === "dreiecke" ? Math.ceil(n / 2) + (n % 2 === 0 ? 0.5 : 0) : n;
  let x0 = pad, teile = [], maxH = F.hoehe * s;
  for (let n = 1; n <= 3; n++) {
    const ks = eindeutig(F.kanten(n));
    const lines = ks.map(([a, b, c, d]) => {
      const X1 = x0 + a * s, Y1 = pad + maxH - b * s, X2 = x0 + c * s, Y2 = pad + maxH - d * s;
      return `<line x1="${X1.toFixed(1)}" y1="${Y1.toFixed(1)}" x2="${X2.toFixed(1)}" y2="${Y2.toFixed(1)}" class="holz"/><circle cx="${(X1 + (X2 - X1) * 0.9).toFixed(1)}" cy="${(Y1 + (Y2 - Y1) * 0.9).toFixed(1)}" r="2.7" class="kopf"/>`;
    }).join("");
    teile.push(lines + `<text x="${(x0 + breite(n) * s / 2).toFixed(1)}" y="${(pad + maxH + 24).toFixed(1)}" text-anchor="middle" class="lab">Figur ${n}</text>`);
    x0 += (breite(n) + gap) * s;
  }
  const W = x0 - gap * s + pad, H = pad + maxH + 32;
  return `<svg class="fig" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="img" aria-label="Figuren 1 bis 3 aus Zündhölzern">${teile.join("")}</svg>`;
}
function hoelzchen() {
  const form = pick(Object.keys(HOELZER)), F = HOELZER[form];
  const f = n => F.f1 + F.d * (n - 1);
  const k = rnd(10, 30); let m; do { m = rnd(31, 90); } while (m === k);
  const M = f(m);
  const html = P("Mit Zündhölzern werden Figuren gelegt. So sehen die ersten drei Figuren aus:") + hoelzerSvg(form) + P("Die Figuren werden immer nach der gleichen Regel grösser.");
  const weg = ol([`Figur 1: ${f(1)}, Figur 2: ${f(2)}, Figur 3: ${f(3)} Zündhölzer. Bei jeder neuen Figur kommen ${F.d} Zündhölzer dazu.`,
    `a) Figur ${k}: ${f(1)} + ${F.d} · ${k - 1} = ${B(f(k))} Zündhölzer (Regel: ${F.regel} = ${F.regel.replace("Nummer", k)})`,
    `b) ${M} − ${f(1)} = ${M - f(1)}. ${M - f(1)} : ${F.d} = ${(M - f(1)) / F.d}. So viele Schritte nach Figur 1 kommt man zu ${B("Figur " + m)}.`,
    `Probe: ${F.regel.replace("Nummer", m)} = ${M} ✓`]);
  return A("hoelzchen", html,
    [{ frage: `Wie viele Zündhölzer braucht man für Figur ${k}?`, loesung: f(k), einheit: "Zündhölzer" },
      { frage: `Welche Figur kann man mit genau ${M} Zündhölzern legen? Gib die Nummer der Figur an.`, loesung: m }],
    ["Zähle die Zündhölzer der Figuren 1, 2 und 3. Wie viele kommen jedes Mal dazu?", `Figur 1 hat ${f(1)} Zündhölzer. Für jede weitere Figur kommen ${F.d} dazu.`],
    weg, { p: { form, k, m, M }, zusatz: `(Zeichnung: ${F.name}. Figur 1: ${f(1)}, Figur 2: ${f(2)}, Figur 3: ${f(3)} Zündhölzer.)` });
}

function zahlenfolge() {
  for (let v = 0; v < 5000; v++) {
    const art = pick(["wechsel", "zweite", "doppelt", "fibo"]);
    const t = []; let regel, weiter;
    if (art === "wechsel") {
      const s = rnd(2, 20), a = rnd(5, 15), b = rnd(2, a - 2); t.push(s);
      for (let i = 1; i < 14; i++) t.push(i % 2 ? t[i - 1] + a : t[i - 1] - b);
      regel = `Die Folge geht abwechselnd ${B("+ " + a)} und ${B("− " + b)}.`;
      weiter = i => i % 2 ? `+ ${a}` : `− ${b}`;
    } else if (art === "zweite") {
      const s = rnd(1, 15), d0 = rnd(1, 6), e = rnd(1, 3); t.push(s);
      for (let i = 1; i < 14; i++) t.push(t[i - 1] + d0 + e * (i - 1));
      regel = `Die Abstände werden jedes Mal um ${e} grösser: ${[0, 1, 2, 3, 4].map(i => "+ " + (d0 + e * i)).join(", ")}, …`;
      weiter = i => `+ ${d0 + e * (i - 1)}`;
    } else if (art === "doppelt") {
      const s = rnd(2, 6), c = pick([1, -1, 2, 3, -2]); t.push(s);
      for (let i = 1; i < 14; i++) t.push(2 * t[i - 1] + c);
      if (t.slice(0, 7).some((x, i) => x <= (i ? t[i - 1] : 0))) continue;
      regel = `Jede Zahl ist das Doppelte der Zahl davor, ${c > 0 ? "plus " + c : "minus " + (-c)}.`;
      weiter = i => `· 2 ${c > 0 ? "+ " + c : "− " + (-c)}`;
    } else {
      const a = rnd(1, 6), b = rnd(a, 9); t.push(a, b);
      for (let i = 2; i < 14; i++) t.push(t[i - 1] + t[i - 2]);
      regel = "Jede Zahl ist die Summe der zwei Zahlen davor.";
      weiter = i => `${t[i - 2]} + ${t[i - 1]}`;
    }
    let k = 10; while (k > 8 && t[k - 1] > 9999) k--;
    if (t[k - 1] > 9999 || t[6] > 9999) continue;
    const zeig = t.slice(0, 6);
    const html = P("Die Zahlenfolge geht immer nach der gleichen Regel weiter:") + `<p class="folge">${zeig.map(zahl).join(", ")}, …</p>`;
    const rows = []; for (let i = 6; i < k; i++) rows.push(`${i + 1}. Stelle: ${art === "fibo" ? weiter(i) + " = " + zahl(t[i]) : zahl(t[i - 1]) + " " + weiter(i) + " = " + zahl(t[i])}`);
    const weg = ol([`Regel: ${regel}`, `a) ${rows[0]} → ${B(zahl(t[6]))}`, `b) Weiter bis zur ${k}. Stelle:<br>${rows.join("<br>")} → ${B(zahl(t[k - 1]))}`]);
    return A("zahlenfolge", html,
      [{ frage: "Welche Zahl kommt als Nächstes?", loesung: t[6] }, { frage: `Welche Zahl steht an der ${k}. Stelle?`, loesung: t[k - 1] }],
      ["Schau dir die Abstände zwischen den Zahlen an. Schreibe sie unter die Folge.", art === "doppelt" ? "Vergleiche jede Zahl mit dem Doppelten der Zahl davor." : art === "fibo" ? "Vergleiche jede Zahl mit den zwei Zahlen davor." : "Wie verändern sich die Abstände?"],
      weg, { p: { art, t: zeig, k } });
  }
  throw new Error("zahlenfolge");
}

/* ===================================================================== Geometrie und Raum */

/* Polygon mit beschrifteten Kanten. pts in Einheiten (y nach oben, Ecken im Gegenuhrzeigersinn) */
function polySvg(pts, labels, einheit) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const W = Math.max(...xs), H = Math.max(...ys);
  const s = Math.min(230 / W, 160 / H), pad = 30, padX = 60;      // seitlich mehr Platz für «15 cm»
  const X = x => padX + x * s, Y = y => pad + (H - y) * s;
  const poly = pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  const txt = labels.map(l => {
    const a = pts[l.kante], b = pts[(l.kante + 1) % pts.length];
    let tx, ty, anker = "middle";
    if (l.pos) { tx = X(l.pos[0]); ty = Y(l.pos[1]) + 5; }      // z. B. Tiefe der Lücke: mitten in die Lücke
    else {
      const mx = (X(a[0]) + X(b[0])) / 2, my = (Y(a[1]) + Y(b[1])) / 2;
      const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
      const nx = dy / len, ny = dx / len;          // nach aussen (in SVG-Koordinaten: y gespiegelt)
      if (nx > 0.5) { anker = "start"; tx = mx + 7; ty = my + 5; }
      else if (nx < -0.5) { anker = "end"; tx = mx - 7; ty = my + 5; }
      else { tx = mx; ty = my + ny * 15 + 5; }
    }
    return `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anker}" class="lab" data-kante="${l.kante}">${zahl(l.wert)} ${einheit}</text>`;
  }).join("");
  return `<svg class="fig" viewBox="0 0 ${(2 * padX + W * s).toFixed(0)} ${(2 * pad + H * s).toFixed(0)}" role="img" aria-label="Figur mit Massen"><polygon points="${poly}" class="flaeche"/>${txt}</svg>`;
}
function lFigur() {
  for (let v = 0; v < 5000; v++) {
    const zimmer = R() < 0.35, e = zimmer ? "m" : "cm";
    const W = zimmer ? rnd(5, 12) : rnd(8, 20), H = zimmer ? rnd(4, 9) : rnd(6, 16);
    if (H > W + 2) continue;
    const art = pick(["L", "U"]);
    let pts, labels, umfang, flaeche, w, h, weg;
    if (art === "L") {
      w = rnd(2, W - 3); h = rnd(2, H - 3); if (w < 2 || h < 2) continue;
      pts = [[0, 0], [W, 0], [W, H - h], [W - w, H - h], [W - w, H], [0, H]];
      labels = [{ kante: 0, wert: W }, { kante: 1, wert: H - h }, { kante: 4, wert: W - w }, { kante: 5, wert: H }];
      umfang = 2 * (W + H); flaeche = W * H - w * h;
      weg = ol([`a) Schiebt man die zwei Kanten der Ecke nach aussen, entsteht ein Rechteck ${W} ${e} × ${H} ${e}. Der Umfang bleibt gleich: 2 · (${W} + ${H}) = ${B(umfang + " " + e)}`,
        `Ohne Trick: Die fehlenden Kanten sind ${W} − ${W - w} = ${w} ${e} und ${H} − ${H - h} = ${h} ${e}. Umfang: ${W} + ${H - h} + ${w} + ${h} + ${W - w} + ${H} = ${umfang} ${e}`,
        `b) Grosses Rechteck minus Ecke: ${W} · ${H} − ${w} · ${h} = ${W * H} − ${w * h} = ${B(flaeche + " " + e + "²")}`]);
    } else {
      const a = rnd(2, W - 5), c = rnd(2, W - a - 3); w = W - a - c; h = rnd(2, H - 3);
      if (w < 3 || h < 2) continue;
      if (w * Math.min(230 / W, 160 / H) < 48) continue;           // die Lücke muss breit genug für die Beschriftung sein
      pts = [[0, 0], [W, 0], [W, H], [W - c, H], [W - c, H - h], [a, H - h], [a, H], [0, H]];
      labels = [{ kante: 0, wert: W }, { kante: 1, wert: H }, { kante: 2, wert: c }, { kante: 3, wert: h }, { kante: 6, wert: a }];
      umfang = 2 * (W + H) + 2 * h; flaeche = W * H - w * h;
      weg = ol([`Fehlende Kanten: Die Lücke ist ${W} − ${a} − ${c} = ${w} ${e} breit. Beide Seiten der Lücke sind ${h} ${e} tief. Die linke Seite ist ${H} ${e} hoch (wie die rechte).`,
        `a) Umfang: ${W} + ${H} + ${c} + ${h} + ${w} + ${h} + ${a} + ${H} = ${B(umfang + " " + e)}. (Oder: Rechteck 2 · (${W} + ${H}) = ${2 * (W + H)}, dazu die zwei Seiten der Lücke: + 2 · ${h})`,
        `b) Grosses Rechteck minus Lücke: ${W} · ${H} − ${w} · ${h} = ${W * H} − ${w * h} = ${B(flaeche + " " + e + "²")}`]);
    }
    const html = P(zimmer ? `Das ist der Grundriss eines Zimmers. Alle Ecken sind rechte Winkel. Masse in ${e}.` : `Alle Ecken der Figur sind rechte Winkel. Masse in ${e}.`) + polySvg(pts, labels, e);
    return A("l_figur", html,
      [{ frage: zimmer ? "Wie lang sind alle Wände zusammen (Umfang)?" : "Wie gross ist der Umfang der Figur?", loesung: umfang, einheit: e },
        { frage: zimmer ? "Wie gross ist die Bodenfläche?" : "Wie gross ist der Flächeninhalt der Figur?", loesung: flaeche, einheit: e + "²" }],
      ["Berechne zuerst die Kanten, bei denen keine Zahl steht. Vergleiche dazu gegenüberliegende Seiten.",
        art === "L" ? "Für die Fläche: Rechne das grosse Rechteck und zieh die fehlende Ecke ab." : "Für die Fläche: Rechne das grosse Rechteck und zieh die Lücke ab."],
      weg, { p: { art, pts, labels, e }, zusatz: `(Zeichnung: ${art === "L" ? "Rechteck mit fehlender Ecke" : "Rechteck mit Lücke oben"}. Angeschrieben: ${labels.map(l => zahl(l.wert) + " " + e).join(", ")}.)` });
  }
  throw new Error("l_figur");
}

function rechteck() {
  for (let v = 0; v < 5000; v++) {
    const art = pick(["mehr", "mal", "quadrat"]);
    if (art === "mehr") {
      const b = rnd(3, 20), k = rnd(2, 12), l = b + k, U = 2 * (l + b);
      const html = P(`Ein Rechteck ist ${k} cm länger als breit. Sein Umfang beträgt ${U} cm.`);
      return A("rechteck", html,
        [{ frage: "Wie breit ist das Rechteck?", loesung: b, einheit: "cm" }, { frage: "Wie gross ist sein Flächeninhalt?", loesung: l * b, einheit: "cm²" }],
        [`Länge + Breite ist die Hälfte des Umfangs: ${U} : 2 = ${U / 2} cm.`, `Die Länge ist Breite + ${k}. Also: 2 Breiten + ${k} = ${U / 2}.`],
        ol([`Länge + Breite = ${U} : 2 = ${U / 2} cm`, `Breite + Breite + ${k} = ${U / 2} → 2 · Breite = ${U / 2 - k} → Breite = ${B(b + " cm")}`, `Länge = ${b} + ${k} = ${l} cm`, `b) Fläche: ${l} · ${b} = ${B(zahl(l * b) + " cm²")}`]),
        { p: { art, b, k, U } });
    }
    if (art === "mal") {
      const b = rnd(2, 15), m = rnd(2, 5), l = m * b, U = 2 * (l + b);
      const mal = { 2: "doppelt", 3: "dreimal", 4: "viermal", 5: "fünfmal" }[m];
      const html = P(`Ein Rechteck ist ${mal} so lang wie breit. Sein Umfang beträgt ${U} cm.`);
      return A("rechteck", html,
        [{ frage: "Wie breit ist das Rechteck?", loesung: b, einheit: "cm" }, { frage: "Wie gross ist sein Flächeninhalt?", loesung: l * b, einheit: "cm²" }],
        [`Länge + Breite ist die Hälfte des Umfangs: ${U} : 2 = ${U / 2} cm.`, `Die Länge sind ${m} Breiten. Länge + Breite sind also ${m + 1} Breiten.`],
        ol([`Länge + Breite = ${U} : 2 = ${U / 2} cm`, `Länge + Breite = ${m} Breiten + 1 Breite = ${m + 1} Breiten → Breite = ${U / 2} : ${m + 1} = ${B(b + " cm")}`, `Länge = ${m} · ${b} = ${l} cm`, `b) Fläche: ${l} · ${b} = ${B(zahl(l * b) + " cm²")}`]),
        { p: { art, b, m, U } });
    }
    const a = rnd(5, 24), b = rnd(2, a - 2); if ((a + b) % 2) continue;
    const s = (a + b) / 2, diff = s * s - a * b;
    const html = P(`Ein Quadrat hat den gleichen Umfang wie ein Rechteck mit den Seiten ${a} cm und ${b} cm.`);
    return A("rechteck", html,
      [{ frage: "Wie lang ist eine Seite des Quadrats?", loesung: s, einheit: "cm" }, { frage: "Um wie viele cm² ist die Fläche des Quadrats grösser als die Fläche des Rechtecks?", loesung: diff, einheit: "cm²" }],
      [`Berechne zuerst den Umfang des Rechtecks: 2 · (${a} + ${b}).`, "Ein Quadrat hat vier gleich lange Seiten."],
      ol([`Umfang des Rechtecks: 2 · (${a} + ${b}) = ${2 * (a + b)} cm`, `Seite des Quadrats: ${2 * (a + b)} : 4 = ${B(s + " cm")}`, `Fläche Quadrat: ${s} · ${s} = ${zahl(s * s)} cm², Fläche Rechteck: ${a} · ${b} = ${zahl(a * b)} cm²`, `b) ${zahl(s * s)} − ${zahl(a * b)} = ${B(zahl(diff) + " cm²")}`]),
      { p: { art, a, b } });
  }
  throw new Error("rechteck");
}

const AQ = [];
[40, 50, 60, 80, 100, 120].forEach(L => [20, 25, 30, 40, 50].forEach(Br => [30, 35, 40, 45, 50, 60].forEach(H => [5, 10].forEach(u => {
  if (Br <= L * 0.75 && H <= L && (L * Br * H) % 1000 === 0 && (L * Br * (H - u)) % 1000 === 0 && L * Br * H / 1000 <= 400) AQ.push([L, Br, H, u]);
}))));
function aquariumSvg(L, Br, H, u) {
  const s = Math.min(170 / L, 120 / H), k = 0.45, pad = 30;
  const w = L * s, h = H * s, dx = Br * s * k * 0.7, dy = Br * s * k * 0.7;
  const x0 = pad + 34, y0 = pad + dy, wh = (H - u) * s;    // links Platz für die Höhe («35 cm»)
  const front = `${x0},${y0} ${x0 + w},${y0} ${x0 + w},${y0 + h} ${x0},${y0 + h}`;
  const wasser = `${x0},${y0 + h - wh} ${x0 + w},${y0 + h - wh} ${x0 + w},${y0 + h} ${x0},${y0 + h}`;
  const wasserOben = `${x0},${y0 + h - wh} ${x0 + w},${y0 + h - wh} ${x0 + w + dx},${y0 + h - wh - dy} ${x0 + dx},${y0 + h - wh - dy}`;
  const W = x0 + w + dx + 70, Hh = y0 + h + 34;
  return `<svg class="fig" viewBox="0 0 ${W.toFixed(0)} ${Hh.toFixed(0)}" role="img" aria-label="Aquarium">
    <polygon points="${wasserOben}" class="wasser2"/><polygon points="${wasser}" class="wasser"/>
    <polyline points="${x0},${y0} ${x0 + dx},${y0 - dy} ${x0 + w + dx},${y0 - dy} ${x0 + w + dx},${y0 + h - dy} ${x0 + w},${y0 + h}" class="kante"/>
    <line x1="${x0 + w}" y1="${y0}" x2="${x0 + w + dx}" y2="${y0 - dy}" class="kante"/>
    <polygon points="${front}" class="kante leer"/>
    <text x="${x0 + w / 2}" y="${y0 + h + 22}" text-anchor="middle" class="lab">${L} cm</text>
    <text x="${x0 - 8}" y="${y0 + h / 2 + 5}" text-anchor="end" class="lab">${H} cm</text>
    <text x="${x0 + w + dx / 2 + 8}" y="${y0 + h - dy / 2 + 14}" class="lab">${Br} cm</text>
  </svg>`;
}
function aquarium() {
  for (let v = 0; v < 5000; v++) {
    const [L, Br, H, u] = pick(AQ), h = H - u;
    const wasser = L * Br * h / 1000, fehlt = L * Br * u / 1000;
    const zeit = R() < 0.5;
    let r = 0;
    if (zeit) { const rs = [4, 5, 6, 8, 10, 12].filter(x => wasser % x === 0 && wasser / x <= 90 && wasser / x >= 5); if (!rs.length) continue; r = pick(rs); }
    const html = P(`Ein Aquarium hat die Form eines Quaders. Innen ist es ${L} cm lang, ${Br} cm breit und ${H} cm hoch. Das Wasser steht ${u} cm unter dem oberen Rand.`) + aquariumSvg(L, Br, H, u);
    const t2 = zeit ? { frage: `Ein Schlauch füllt jede Minute ${r} Liter Wasser ein. Wie viele Minuten dauert es, das leere Aquarium bis zu dieser Höhe zu füllen?`, loesung: wasser / r, einheit: "min" }
      : { frage: "Wie viele Liter Wasser braucht es noch, bis das Aquarium ganz voll ist?", loesung: fehlt, einheit: "Liter" };
    const weg = ol([`Das Wasser steht ${H} − ${u} = ${h} cm hoch.`,
      `Rechne in dm (1 dm³ = 1 Liter): ${zahl(L / 10)} dm · ${zahl(Br / 10)} dm · ${zahl(h / 10)} dm = ${B(zahl(wasser) + " l")}`,
      `(In cm: ${L} · ${Br} · ${h} = ${zahl(L * Br * h)} cm³ = ${zahl(wasser)} dm³, denn 1 dm³ = 1’000 cm³)`,
      zeit ? `b) ${zahl(wasser)} l : ${r} l pro Minute = ${B(zahl(wasser / r) + " min")}` : `b) Es fehlen noch ${u} cm Höhe: ${zahl(L / 10)} · ${zahl(Br / 10)} · ${zahl(u / 10)} = ${B(zahl(fehlt) + " l")}`]);
    return A("aquarium", html,
      [{ frage: "Wie viele Liter Wasser sind im Aquarium?", loesung: wasser, einheit: "Liter" }, t2],
      [`Wie hoch steht das Wasser? ${H} cm − ${u} cm.`, "Rechne alle Masse in dm um. Dann gilt: 1 dm³ = 1 Liter."],
      weg, { p: { L, Br, H, u, r, zeit } });
  }
  throw new Error("aquarium");
}

/* Würfelquader aussen angemalt */
function wuerfelSvg(a, b, c) {
  const s = Math.min(22, 230 / ((a + b) * 0.866 * 1.05), 190 / ((a + b) * 0.5 + c));
  const cx = 0.866 * s, cy = 0.5 * s;
  const pr = (x, y, z) => [(x - y) * cx, (x + y) * cy - z * s];
  const ecken = [];
  for (const x of [0, a]) for (const y of [0, b]) for (const z of [0, c]) ecken.push(pr(x, y, z));
  const minX = Math.min(...ecken.map(p => p[0])), minY = Math.min(...ecken.map(p => p[1]));
  const maxX = Math.max(...ecken.map(p => p[0])), maxY = Math.max(...ecken.map(p => p[1]));
  const pad = 10, T = (x, y, z) => { const [X, Y] = pr(x, y, z); return `${(X - minX + pad).toFixed(1)},${(Y - minY + pad).toFixed(1)}`; };
  const flaeche = (pts, cls) => `<polygon points="${pts.map(p => T(...p)).join(" ")}" class="${cls}"/>`;
  let g = flaeche([[0, 0, c], [a, 0, c], [a, b, c], [0, b, c]], "rot1") + flaeche([[a, 0, 0], [a, b, 0], [a, b, c], [a, 0, c]], "rot2") + flaeche([[0, b, 0], [a, b, 0], [a, b, c], [0, b, c]], "rot3");
  const linie = (p, q) => `<line x1="${T(...p).split(",")[0]}" y1="${T(...p).split(",")[1]}" x2="${T(...q).split(",")[0]}" y2="${T(...q).split(",")[1]}" class="gitter"/>`;
  for (let i = 1; i < a; i++) g += linie([i, 0, c], [i, b, c]) + linie([i, b, 0], [i, b, c]);
  for (let j = 1; j < b; j++) g += linie([0, j, c], [a, j, c]) + linie([a, j, 0], [a, j, c]);
  for (let k = 1; k < c; k++) g += linie([a, 0, k], [a, b, k]) + linie([0, b, k], [a, b, k]);
  return `<svg class="fig" viewBox="0 0 ${(maxX - minX + 2 * pad).toFixed(0)} ${(maxY - minY + 2 * pad).toFixed(0)}" role="img" aria-label="Quader aus Würfeln">${g}</svg>`;
}
function wuerfel() {
  const dims = [rnd(3, 6), rnd(3, 6), rnd(3, 5)].sort((x, y) => y - x);
  const [a, b, c] = dims;
  const n = { 3: 8, 2: 4 * ((a - 2) + (b - 2) + (c - 2)), 1: 2 * ((a - 2) * (b - 2) + (a - 2) * (c - 2) + (b - 2) * (c - 2)), 0: (a - 2) * (b - 2) * (c - 2) };
  const fragen = pick([[2, 0], [1, 0], [2, 1], [3, 1], [1, 2]]);
  const wort = { 3: "genau drei rote Flächen", 2: "genau zwei rote Flächen", 1: "genau eine rote Fläche", 0: "gar keine rote Fläche" };
  const html = P(`Ein Quader wird aus ${a * b * c} gleich grossen Würfeln gebaut: ${a} Würfel lang, ${b} Würfel breit und ${c} Würfel hoch. Dann wird der ganze Quader aussen rot angemalt, auch unten.`) + wuerfelSvg(a, b, c);
  const erk = {
    3: `Drei rote Flächen haben nur die Würfel an den Ecken: ${B(8)}.`,
    2: `Zwei rote Flächen haben die Würfel an den Kanten, ohne die Ecken. Der Quader hat je 4 Kanten mit ${a} Würfeln, mit ${b} Würfeln und mit ${c} Würfeln. Ohne Ecken: 4 · ${a - 2} + 4 · ${b - 2} + 4 · ${c - 2} = ${B(n[2])}.`,
    1: `Eine rote Fläche haben die Würfel in der Mitte jeder Seitenfläche (ohne die Ränder): 2 · (${a - 2} · ${b - 2}) + 2 · (${a - 2} · ${c - 2}) + 2 · (${b - 2} · ${c - 2}) = ${B(n[1])}.`,
    0: `Keine rote Fläche haben die Würfel innen. Der innere Quader ist auf jeder Seite einen Würfel kleiner: ${a - 2} · ${b - 2} · ${c - 2} = ${B(n[0])}.`
  };
  const weg = ol(fragen.map((f, i) => `${"ab"[i]}) ${erk[f]}`).concat([`Kontrolle: 8 + ${n[2]} + ${n[1]} + ${n[0]} = ${8 + n[2] + n[1] + n[0]} = ${a} · ${b} · ${c} ✓`]));
  return A("wuerfel", html,
    fragen.map(f => ({ frage: `Wie viele Würfel haben ${wort[f]}?`, loesung: n[f], einheit: "Würfel" })),
    ["Überlege, wo die Würfel liegen: an einer Ecke (3 rote Flächen), an einer Kante (2), mitten in einer Seitenfläche (1) oder ganz innen (0).",
      "An jeder Kante liegen Würfel. Zieh die 2 Eckwürfel ab, sie haben 3 rote Flächen."],
    weg, { p: { a, b, c, fragen } });
}

function uhrSvg(h, m) {
  const r = 70, c = 82, wM = m * 6, wH = (h % 12) * 30 + m * 0.5;
  const pt = (w, l) => [c + l * Math.sin(w * Math.PI / 180), c - l * Math.cos(w * Math.PI / 180)];
  let g = `<circle cx="${c}" cy="${c}" r="${r}" class="ziffer"/>`;
  for (let i = 0; i < 12; i++) { const [x1, y1] = pt(i * 30, r - 9), [x2, y2] = pt(i * 30, r - 2); g += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="strich"/>`; const [tx, ty] = pt(i * 30, r - 18); g += `<text x="${tx.toFixed(1)}" y="${(ty + 5).toFixed(1)}" text-anchor="middle" class="lab klein">${i || 12}</text>`; }
  const [hx, hy] = pt(wH, 30), [mx, my] = pt(wM, 41);
  g += `<line x1="${c}" y1="${c}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" class="zeiger dick"/><line x1="${c}" y1="${c}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" class="zeiger"/><circle cx="${c}" cy="${c}" r="4" class="mitte"/>`;
  return `<svg class="fig uhr" viewBox="0 0 ${2 * c} ${2 * c}" role="img" aria-label="Uhr">${g}</svg>`;
}
function uhrwinkel() {
  for (let v = 0; v < 5000; v++) {
    const k = pick([10, 20, 30, 40, 50, 90, 100, 120, 150]);
    const h = rnd(1, 11), m = pick([0, 10, 15, 20, 30, 40, 45, 50]);
    let w = Math.abs(30 * h - 5.5 * m); if (w > 180) w = 360 - w;
    if (w === 0 || w === 180 || m === 0) continue;
    const zeit = `${h}.${String(m).padStart(2, "0")} Uhr`;
    const html = P("Auf einer Uhr mit Zeigern macht der Minutenzeiger in 60 Minuten eine ganze Drehung (360°). Der Stundenzeiger braucht für eine ganze Drehung 12 Stunden.") + uhrSvg(h, m) + P(`Die Uhr zeigt ${zeit}.`);
    const posH = 30 * h + 0.5 * m, posM = 6 * m, roh = Math.abs(posH - posM);
    const weg = ol([`Stundenzeiger: 360° : 12 = 30° pro Stunde. 30° : 60 = 0.5° pro Minute.`,
      `a) ${k} · 0.5° = ${B(zahl(k / 2) + "°")}`,
      `b) Minutenzeiger: 360° : 60 = 6° pro Minute. Bei ${m} Minuten steht er ${m} · 6° = ${posM}° nach der 12.`,
      `Stundenzeiger: ${h} · 30° + ${m} · 0.5° = ${30 * h}° + ${zahl(0.5 * m)}° = ${zahl(posH)}° nach der 12.`,
      `Unterschied: ${zahl(Math.max(posH, posM))}° − ${zahl(Math.min(posH, posM))}° = ${zahl(roh)}°${roh > 180 ? `. Das ist mehr als 180°, der kleinere Winkel ist 360° − ${zahl(roh)}° = ${B(zahl(w) + "°")}` : ` → ${B(zahl(w) + "°")}`}`]);
    return A("uhrwinkel", html,
      [{ frage: `Um wie viele Grad dreht sich der Stundenzeiger in ${k} Minuten?`, loesung: k / 2, einheit: "°" },
        { frage: `Wie gross ist um ${zeit} der kleinere Winkel zwischen den beiden Zeigern?`, loesung: w, einheit: "°" }],
      ["Der Stundenzeiger dreht sich in 1 Stunde um 360° : 12 = 30°. Wie viel ist das in 1 Minute?", "Rechne für beide Zeiger aus, wie viele Grad sie nach der 12 stehen. Dann den Unterschied."],
      weg, { p: { k, h, m } });
  }
  throw new Error("uhrwinkel");
}

/* ===================================================================== Grössen und Zeit */

const EINHEIT_BASIS = {
  km: ["laenge", 1e6], m: ["laenge", 1000], dm: ["laenge", 100], cm: ["laenge", 10], mm: ["laenge", 1],
  l: ["hohl", 1000], dl: ["hohl", 100], cl: ["hohl", 10], ml: ["hohl", 1],
  t: ["gewicht", 1e6], kg: ["gewicht", 1000], g: ["gewicht", 1],
  h: ["zeit", 3600], min: ["zeit", 60], s: ["zeit", 1],
  "m²": ["flaeche", 10000], "dm²": ["flaeche", 100], "cm²": ["flaeche", 1],
  "dm³": ["volumen", 1000], "cm³": ["volumen", 1], "Liter": ["volumen", 1000]
};
function umrechnenTeil(art) {
  let terme, ziel;
  if (art === "laenge") { terme = [[+1, rnd(12, 48) / 10, "m"], [+1, rnd(5, 95), "cm"], [+1, rnd(3, 19) * 5, "mm"]]; ziel = "cm"; }
  else if (art === "hohl") { terme = [[+1, rnd(1, 10) * 0.25, "l"], [+1, rnd(1, 9), "dl"], [+1, rnd(1, 19) * 5, "cl"]]; ziel = "dl"; }
  else if (art === "gewicht") { terme = [[+1, rnd(12, 60) / 10, "kg"], [-1, rnd(2, 19) * 50, "g"], [+1, rnd(1, 19) * 0.05, "kg"]]; ziel = "g"; }
  else if (art === "zeit") {
    const a = rnd(2, 5), c = rnd(1, a - 1), b = rnd(0, 9) * 5, d = rnd(b / 5 + 1, 11) * 5;
    terme = [[+1, a, "h"], [+1, b, "min"], [-1, c, "h"], [-1, d, "min"]]; ziel = "min";
  }
  else if (art === "flaeche") {
    if (R() < 0.5) { terme = [[+1, rnd(2, 12) / 2, "m²"], [-1, rnd(1, 19) * 10, "dm²"]]; ziel = "dm²"; }
    else { terme = [[+1, rnd(2, 20), "dm²"], [+1, rnd(1, 19) * 50, "cm²"]]; ziel = "cm²"; }
  }
  else { terme = [[+1, rnd(2, 12) / 4, "Liter"], [-1, rnd(1, 9) * 50, "cm³"]]; ziel = "cm³"; }
  const f = EINHEIT_BASIS[ziel][1];
  const wert = terme.reduce((s, [vz, x, e]) => s + vz * x * EINHEIT_BASIS[e][1], 0) / f;
  let ausdruck;
  if (art === "zeit") ausdruck = `${terme[0][1]} h ${terme[1][1]} min − ${terme[2][1]} h ${terme[3][1]} min`;
  else ausdruck = terme.map(([vz, x, e], i) => (i ? (vz > 0 ? " + " : " − ") : "") + zahl(x) + " " + e).join("");
  const umg = terme.filter(([vz, x, e]) => e !== ziel).map(([vz, x, e]) => `${zahl(x)} ${e} = ${zahl(x * EINHEIT_BASIS[e][1] / f)} ${ziel}`);
  const rechnung = terme.map(([vz, x, e], i) => (i ? (vz > 0 ? " + " : " − ") : "") + zahl(x * EINHEIT_BASIS[e][1] / f)).join("");
  return { terme, ziel, wert: rund(wert, 3), ausdruck, weg: `Alles in ${ziel}: ${umg.join(", ")}. ${rechnung} = ${B(zahl(wert) + " " + ziel)}` };
}
function umrechnen() {
  for (let v = 0; v < 5000; v++) {
    const [a1, a2] = shuffle(["laenge", "hohl", "gewicht", "zeit", "flaeche", "volumen"]).slice(0, 2);
    const t1 = umrechnenTeil(a1), t2 = umrechnenTeil(a2);
    if (t1.wert <= 0 || t2.wert <= 0 || !ganz(t1.wert * 10) || !ganz(t2.wert * 10)) continue;
    const html = P("Rechne die Grössen um und berechne. Schreibe das Resultat in der verlangten Einheit.");
    return A("umrechnen", html,
      [{ frage: `${t1.ausdruck} = ? ${t1.ziel}`, loesung: t1.wert, einheit: t1.ziel }, { frage: `${t2.ausdruck} = ? ${t2.ziel}`, loesung: t2.wert, einheit: t2.ziel }],
      ["Rechne zuerst jede Grösse in die verlangte Einheit um. Erst dann zusammenzählen oder abziehen.",
        "Merke: 1 m = 100 cm = 1’000 mm · 1 l = 10 dl = 100 cl · 1 kg = 1’000 g · 1 h = 60 min · 1 m² = 100 dm² · 1 dm² = 100 cm² · 1 l = 1 dm³ = 1’000 cm³"],
      ol([`a) ${t1.weg}`, `b) ${t2.weg}`]), { p: { t1: t1.terme, z1: t1.ziel, t2: t2.terme, z2: t2.ziel } });
  }
  throw new Error("umrechnen");
}

function zeitspanne() {
  for (let v = 0; v < 5000; v++) {
    const art = pick(["zug", "film", "wanderung"]);
    if (art === "zug") {
      const ab = rnd(6 * 60, 17 * 60), D = rnd(38, 195), an = ab + D, sp = rnd(4, 25), la = rnd(3, 15), an2 = an + sp + la;
      if (an2 >= 23 * 60) continue;
      const html = P(`Ein Zug fährt um ${uhr(ab)} ab und kommt um ${uhr(an)} am Ziel an.`);
      return A("zeitspanne", html,
        [{ frage: "Wie lange dauert die Fahrt? Gib die Antwort in Minuten an.", loesung: D, einheit: "min" },
          { frage: `Am Sonntag fährt der Zug ${sp} Minuten später ab und braucht für die Fahrt ${la} Minuten länger. Um wie viel Uhr kommt er an?`, art: "uhr", loesung: an2 }],
        ["Rechne in Schritten: zuerst bis zur nächsten vollen Stunde, dann die ganzen Stunden, dann die restlichen Minuten.", "b) Die Ankunft verschiebt sich um beide Verspätungen zusammen."],
        ol([(() => { const nh = Math.ceil((ab + 1) / 60) * 60;
            return an <= nh ? `a) Von ${uhr(ab)} bis ${uhr(an)} sind es ${B(D + " min")}.`
              : `a) ${uhr(ab)} → ${uhr(nh)}: ${nh - ab} min. Dann bis ${uhr(an)}: ${an - nh} min. Zusammen ${nh - ab} + ${an - nh} = ${B(D + " min")} (= ${dauer(D)}).`; })(),
          `b) ${sp} min + ${la} min = ${sp + la} min später als sonst: ${uhr(an)} + ${sp + la} min = ${B(uhr(an2))}`]),
        { p: { art, ab, an, sp, la } });
    }
    if (art === "film") {
      const ende = rnd(19 * 60 + 40, 22 * 60 + 50), D = rnd(88, 165), start = ende - D, wb = rnd(8, 25);
      const html = P(`Ein Film dauert ${dauer(D)}. Er endet um ${uhr(ende)}.`);
      return A("zeitspanne", html,
        [{ frage: "Um wie viel Uhr hat der Film begonnen?", art: "uhr", loesung: start },
          { frage: `Vor dem Film lief ${wb} Minuten Werbung. Wie viele Minuten dauerte die ganze Vorstellung mit Werbung?`, loesung: D + wb, einheit: "min" }],
        [`Rechne von ${uhr(ende)} aus rückwärts: zuerst die ganzen Stunden, dann die Minuten.`, `b) ${dauer(D)} sind ${D} Minuten.`],
        ol([`a) ${uhr(ende)} − ${Math.floor(D / 60)} h = ${uhr(ende - Math.floor(D / 60) * 60)}. Dann noch ${D % 60} min zurück: ${B(uhr(start))}`,
          `b) ${dauer(D)} = ${D} min. ${D} + ${wb} = ${B((D + wb) + " min")}`]),
        { p: { art, ende, D, wb } });
    }
    const start = rnd(7 * 60 + 30, 10 * 60), l1 = rnd(50, 130), p = rnd(6, 12) * 5, l2 = rnd(40, 110), an = start + l1 + p + l2;
    const html = P(`Eine Schulklasse startet um ${uhr(start)} zu einer Wanderung. Bis zum Picknickplatz wandert sie ${dauer(l1)}. Dort macht sie ${p} Minuten Pause. Danach wandert sie noch ${dauer(l2)} bis zum Ziel.`);
    return A("zeitspanne", html,
      [{ frage: "Um wie viel Uhr kommt die Klasse am Ziel an?", art: "uhr", loesung: an },
        { frage: "Wie viele Minuten ist die Klasse insgesamt gewandert (ohne Pause)?", loesung: l1 + l2, einheit: "min" }],
      ["Zähle die Zeiten Schritt für Schritt zur Startzeit dazu.", "60 Minuten sind 1 Stunde. Wird es mehr als 60 Minuten, gibt es eine Stunde mehr."],
      ol([`Start ${uhr(start)} + ${dauer(l1)} = ${uhr(start + l1)}`, `+ ${p} min Pause = ${uhr(start + l1 + p)}`, `+ ${dauer(l2)} = ${B(uhr(an))}`,
        `b) ${dauer(l1)} + ${dauer(l2)} = ${l1} min + ${l2} min = ${B((l1 + l2) + " min")}`]),
      { p: { art, start, l1, p, l2 } });
  }
  throw new Error("zeitspanne");
}

const TEMPO = [
  { wer: "Ein Velofahrer", verb: "fährt", pr: "er", v: [12, 24] },
  { wer: "Eine Wandergruppe", verb: "wandert", pr: "sie", v: [3, 5] },
  { wer: "Ein Zug", verb: "fährt", pr: "er", v: [60, 120] },
  { wer: "Ein Schiff", verb: "fährt", pr: "es", v: [12, 30] },
  { wer: "Eine Inlineskaterin", verb: "fährt", pr: "sie", v: [10, 18] }
];
function tempo() {
  for (let v = 0; v < 5000; v++) {
    const T = pick(TEMPO), vk = rnd(T.v[0], T.v[1]);
    if (vk === 80 || vk === 150) continue;
    const ts = [10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 90, 100].filter(t => ganz(vk * t / 60 * 10) && vk * t / 60 >= 1);
    if (!ts.length) continue;
    const t = pick(ts), s = vk * t / 60;
    const ds = []; for (let d2 = 1; d2 <= 4 * vk; d2 += 0.5) { const m = d2 * 60 / vk; if (ganz(m) && m >= 10 && m <= 240 && m !== t && d2 !== s) ds.push(d2); }
    if (!ds.length) continue;
    const d = pick(ds), m = d * 60 / vk;
    const html = P(`${T.wer} ${T.verb} mit einer gleichbleibenden Geschwindigkeit von ${vk} km/h.`);
    return A("tempo", html,
      [{ frage: `Wie viele Kilometer legt ${T.pr} in ${t} Minuten zurück?`, loesung: s, einheit: "km" },
        { frage: `Wie viele Minuten braucht ${T.pr} für ${zahl(d)} km?`, loesung: m, einheit: "min" }],
      [`${vk} km/h heisst: In 60 Minuten schafft ${T.pr} ${vk} km.`, `Rechne zuerst, wie weit ${T.pr} in 1 Minute (oder in einer passenden Zeit wie 10 oder 15 Minuten) kommt.`],
      ol([`In 60 Minuten: ${vk} km.`, `a) In ${t} Minuten: ${vk} · ${t} : 60 = ${B(zahl(s) + " km")}`, `b) Für 1 km braucht ${T.pr} 60 : ${vk} Minuten. Für ${zahl(d)} km: ${zahl(d)} · 60 : ${vk} = ${B(zahl(m) + " min")}`]),
      { p: { vk, t, d } });
  }
  throw new Error("tempo");
}

/* ===================================================================== Sachrechnen */

const WAREN = [
  { pl: "Brötchen", sg: "Brötchen", p: [60, 120] }, { pl: "Hefte", sg: "Heft", p: [120, 280] }, { pl: "Bleistifte", sg: "Bleistift", p: [40, 150] },
  { pl: "Äpfel", sg: "Apfel", p: [35, 90] }, { pl: "Eintritte ins Hallenbad", sg: "Eintritt", p: [450, 900] }, { pl: "Glacen", sg: "Glace", p: [150, 400] }
];
/* e: Zeiteinheit (Mehrzahl), ed: nach «in/nach» (Dativ Mehrzahl), e1: Einzahl */
const ARBEIT = [
  { pl: "Malerinnen", einzig: "eine einzige Malerin", was: "streichen einen langen Zaun", e: "Tage", ed: "Tagen", e1: "Tag", n: [3, 8], t: [4, 15], satz: "Alle arbeiten gleich schnell." },
  { pl: "Kinder", einzig: "ein einziges Kind", was: "räumen nach einem Fest die Turnhalle auf", e: "Minuten", ed: "Minuten", e1: "Minute", n: [4, 12], t: [15, 60], satz: "Alle arbeiten gleich schnell." },
  { pl: "Pumpen", einzig: "eine einzige Pumpe", was: "leeren ein Schwimmbecken", e: "Stunden", ed: "Stunden", e1: "Stunde", n: [2, 6], t: [6, 18], satz: "Alle Pumpen sind gleich stark." }
];
function dreisatz() {
  for (let v = 0; v < 5000; v++) {
    if (R() < 0.5) {
      const W = pick(WAREN), p = rnd(W.p[0] / 5, W.p[1] / 5) * 5 / 100;
      const n1 = rnd(3, 12), n2 = rnd(2, 25), n3 = rnd(2, 25);
      if (n2 === n1 || n3 === n1 || n3 === n2) continue;
      const html = P(`${n1} ${W.pl} kosten zusammen ${chf(n1 * p)}`);
      return A("dreisatz", html,
        [{ frage: `Wie viel kosten ${n2} ${W.pl}?`, loesung: rund(n2 * p, 2), einheit: "Fr." }, { frage: `Wie viele ${W.pl} bekommt man für ${chf(n3 * p)}?`, loesung: n3, einheit: "Stück" }],
        [`Rechne zuerst den Preis für 1 ${W.sg} aus.`, "Für b): Wie oft passt der Preis für 1 Stück in den Betrag?"],
        ol([`1 ${W.sg}: ${chf(n1 * p)} : ${n1} = ${chf(p)}`, `a) ${n2} · ${chf(p)} = ${B(chf(n2 * p))}`, `b) ${chf(n3 * p)} : ${chf(p)} = ${B(n3)} ${W.pl}`]),
        { p: { art: "prop", p, n1, n2, n3 } });
    }
    const C = pick(ARBEIT), n = rnd(C.n[0], C.n[1]), t = rnd(C.t[0], C.t[1]), W = n * t;
    const n2s = []; for (let x = 2; x <= 2 * n + 4; x++) if (x !== n && W % x === 0 && W / x >= 2) n2s.push(x);
    if (!n2s.length) continue;
    const n2 = pick(n2s);
    const opts = []; for (let t1 = 1; t1 < t; t1++) for (let k = 1; k <= 6; k++) { const rest = W - n * t1; if (rest > 0 && rest % (n + k) === 0) opts.push([t1, k]); }
    if (!opts.length) continue;
    const [t1, k] = pick(opts), tr = (W - n * t1) / (n + k), total = t1 + tr;
    const nach = t1 === 1 ? `Nach 1 ${C.e1}` : `Nach ${t1} ${C.ed}`;
    const html = P(`${n} ${C.pl} ${C.was} in ${t} ${C.ed}. ${C.satz}`);
    return A("dreisatz", html,
      [{ frage: `Wie viele ${C.e} brauchen ${n2} ${C.pl}?`, loesung: W / n2, einheit: C.e },
        { frage: `Zuerst arbeiten nur ${n} ${C.pl}. ${nach} kommen ${k} weitere dazu. Wie viele ${C.e} dauert die Arbeit insgesamt?`, loesung: total, einheit: C.e }],
      [`Überlege: Wie lange bräuchte ${C.einzig} allein? (Mehr ${C.pl} → weniger Zeit.)`, `Für b): Wie viel Arbeit ist ${nach.charAt(0).toLowerCase() + nach.slice(1)} noch übrig? Wie lange bräuchte ${C.einzig} für diesen Rest?`],
      ol([`${gross(C.einzig)} bräuchte allein ${n} · ${t} = ${W} ${C.e}.`, `a) ${n2} ${C.pl}: ${W} : ${n2} = ${B(zahl(W / n2) + " " + C.e)}`,
        `b) ${nach} haben ${n} ${C.pl} so viel geschafft wie ${C.einzig} in ${n} · ${t1} = ${n * t1} ${C.ed}. Übrig bleibt Arbeit, für die ${C.einzig} ${W} − ${n * t1} = ${W - n * t1} ${C.e} bräuchte.`,
        `Jetzt arbeiten ${n + k} ${C.pl}: ${W - n * t1} : ${n + k} = ${tr} ${tr === 1 ? C.e1 : C.e}. Insgesamt: ${t1} + ${tr} = ${B(total + " " + C.e)}`]),
      { p: { art: "umg", n, t, n2, t1, k } });
  }
  throw new Error("dreisatz");
}

function durchschnitt() {
  for (let v = 0; v < 5000; v++) {
    if (R() < 0.5) {
      const n = pick([3, 4, 5]), Ad = pick([4, 4.25, 4.5, 4.75, 5, 5.25]);
      if (!ganz(n * Ad * 2)) continue;
      const x = pick([3.5, 4, 4.5, 5, 5.5, 6]), T = (n * Ad + x) / (n + 1);
      if (!ganz(T * 100) || T === Ad) continue;
      const [name, pr] = pick(KINDER);
      const html = P(`${name} hat in Mathematik ${n} Prüfungen geschrieben. ${gross(pr === "sie" ? "ihr" : "sein")} Notendurchschnitt ist ${zahl(Ad)}.`);
      return A("durchschnitt", html,
        [{ frage: `Wie viel geben ${pr === "sie" ? "ihre" : "seine"} ${n} Noten zusammengezählt?`, loesung: n * Ad },
          { frage: `Welche Note muss ${name} in der nächsten Prüfung schreiben, damit der Durchschnitt aller ${n + 1} Noten genau ${zahl(T)} ist?`, loesung: x }],
        [`Durchschnitt · Anzahl = Summe: ${zahl(Ad)} · ${n}.`, `Mit der nächsten Prüfung sind es ${n + 1} Noten. Wie gross muss die Summe dann sein?`],
        ol([`a) ${n} · ${zahl(Ad)} = ${B(zahl(n * Ad))}`, `Nachher: ${n + 1} Noten mit Durchschnitt ${zahl(T)} → Summe ${n + 1} · ${zahl(T)} = ${zahl((n + 1) * T)}`, `b) ${zahl((n + 1) * T)} − ${zahl(n * Ad)} = ${B(zahl(x))}`]),
        { p: { art: "noten", n, A: Ad, T } });
    }
    const n = rnd(4, 8), a = rnd(9, 13), X = rnd(22, 58), sum = n * a + X;
    if (sum % (n + 1)) continue;
    const b = sum / (n + 1);
    const html = P(`Die ${n} Kinder einer Unihockeygruppe sind im Durchschnitt ${a} Jahre alt. Zählt man die Trainerin dazu, ist das Durchschnittsalter ${b} Jahre.`);
    return A("durchschnitt", html,
      [{ frage: `Wie viele Jahre sind die ${n} Kinder zusammen alt?`, loesung: n * a, einheit: "Jahre" }, { frage: "Wie alt ist die Trainerin?", loesung: X, einheit: "Jahre" }],
      [`Durchschnitt · Anzahl = Summe: ${a} · ${n}.`, `Mit der Trainerin sind es ${n + 1} Personen. Wie alt sind alle zusammen?`],
      ol([`a) ${n} · ${a} = ${B(n * a)} Jahre`, `Mit der Trainerin: ${n + 1} · ${b} = ${sum} Jahre`, `b) ${sum} − ${n * a} = ${B(X)} Jahre`]),
      { p: { art: "alter", n, a, b } });
  }
  throw new Error("durchschnitt");
}

function verteilen() {
  for (let v = 0; v < 5000; v++) {
    const ns = shuffle(KINDER.slice()).slice(0, 3).map(x => x[0]);
    const [na, nb, nc] = ns;
    const geld = R() < 0.6, e = geld ? "Fr." : "Punkte";
    const b = rnd(6, 40), m = pick([2, 3]), d = rnd(2, 15), plus = R() < 0.6;
    const a = m * b, c = plus ? b + d : b - d;
    if (c < 2) continue;
    const S = a + b + c;
    const mal = m === 2 ? "doppelt" : "dreimal";
    const html = geld
      ? P(`${na}, ${nb} und ${nc} teilen sich ${S} Fr. ${na} bekommt ${mal} so viel wie ${nb}. ${nc} bekommt ${d} Fr. ${plus ? "mehr" : "weniger"} als ${nb}.`)
      : P(`${na}, ${nb} und ${nc} erzielen bei einem Spiel zusammen ${S} Punkte. ${na} hat ${mal} so viele Punkte wie ${nb}. ${nc} hat ${d} Punkte ${plus ? "mehr" : "weniger"} als ${nb}.`);
    const fr_ = n => geld ? `Wie viel bekommt ${n}?` : `Wie viele Punkte hat ${n}?`;
    const teile = [{ label: "a)", frage: fr_(nb), loesung: b, einheit: e }, { label: "b)", frage: fr_(na), loesung: a, einheit: e }, { label: "c)", frage: fr_(nc), loesung: c, einheit: e }];
    const weg = ol([`Zeichne Balken: ${nb} = 1 Teil, ${na} = ${m} Teile, ${nc} = 1 Teil ${plus ? "+" : "−"} ${d}.`,
      `Zusammen: ${m + 2} Teile ${plus ? "+" : "−"} ${d} = ${S}`,
      `${m + 2} Teile = ${S} ${plus ? "−" : "+"} ${d} = ${plus ? S - d : S + d}. 1 Teil = ${plus ? S - d : S + d} : ${m + 2} = ${b}`,
      `a) ${nb}: ${B(b + " " + e)} · b) ${na}: ${m} · ${b} = ${B(a + " " + e)} · c) ${nc}: ${b} ${plus ? "+" : "−"} ${d} = ${B(c + " " + e)}`,
      `Probe: ${a} + ${b} + ${c} = ${S} ✓`]);
    return A("verteilen", html, teile,
      [`Nimm ${nb} als «1 Teil». Wie viele Teile hat ${na}? Und ${nc}?`, `${nc} hat 1 Teil ${plus ? "und noch " + d : "minus " + d}. Rechne das zuerst ${plus ? "weg" : "dazu"}, dann bleiben nur ganze Teile.`],
      weg, { p: { b, m, d, plus, S } });
  }
  throw new Error("verteilen");
}

/* ===================================================================== Kombinatorik */

function ziffern() {
  for (let v = 0; v < 5000; v++) {
    const anz = pick([4, 4, 5]), mitNull = R() < 0.4;
    const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, mitNull ? anz - 1 : anz);
    if (mitNull) pool.push(0);
    const ds = pool.sort((x, y) => x - y), n = ds.length;
    const art = pick(["gerade", "groesser", "mehrfach"]);
    const alle = []; for (const h of ds) for (const z of ds) for (const e of ds) if (h !== 0) alle.push([h, z, e]);
    const ohne = alle.filter(([h, z, e]) => h !== z && h !== e && z !== e);
    const na = ohne.length;
    let fb, nb, wegB, T = 0;
    const ger = ds.filter(x => x % 2 === 0);
    if (art === "gerade") {
      if (!ger.length || ger.length === ds.length) continue;
      nb = ohne.filter(x => x[2] % 2 === 0).length;
      fb = "Wie viele dieser Zahlen (jede Ziffer höchstens einmal) sind gerade?";
      wegB = `Eine gerade Zahl endet mit einer geraden Ziffer: ${ger.join(" oder ")}. ` + ger.map(e => {
        const hund = ds.filter(x => x !== e && x !== 0).length, zehn = n - 2;
        return `Endet sie mit ${e}: Hunderter ${hund} Möglichkeiten${mitNull && e !== 0 ? " (nicht 0)" : ""}, Zehner ${zehn} → ${hund} · ${zehn} = ${hund * zehn}`;
      }).join(". ") + `. Zusammen ${B(nb)}.`;
    } else if (art === "groesser") {
      const Ts = [1, 2, 3, 4, 5, 6, 7, 8].filter(t => !ds.includes(t) && ds.some(x => x > t) && ds.some(x => x < t && x !== 0));
      if (!Ts.length) continue;
      T = pick(Ts);
      nb = ohne.filter(([h, z, e]) => h * 100 + z * 10 + e > T * 100).length;
      const gr = ds.filter(x => x > T);
      fb = `Wie viele dieser Zahlen (jede Ziffer höchstens einmal) sind grösser als ${T * 100}?`;
      wegB = `Die Hunderterziffer muss grösser als ${T} sein: ${gr.join(" oder ")} → ${gr.length} Möglichkeiten. Zehner: ${n - 1}, Einer: ${n - 2}. ${gr.length} · ${n - 1} · ${n - 2} = ${B(nb)}`;
    } else {
      nb = alle.length;
      fb = "Wie viele verschiedene dreistellige Zahlen sind möglich, wenn jede Ziffer auch mehrmals vorkommen darf?";
      wegB = mitNull ? `Hunderter: ${n - 1} Möglichkeiten (nicht 0), Zehner: ${n}, Einer: ${n}. ${n - 1} · ${n} · ${n} = ${B(nb)}` : `Jede Stelle hat ${n} Möglichkeiten: ${n} · ${n} · ${n} = ${B(nb)}`;
    }
    const html = P(`Mit den Ziffern ${ds.slice(0, -1).join(", ")} und ${ds[ds.length - 1]} werden dreistellige Zahlen gebildet.${mitNull ? " Eine dreistellige Zahl darf nicht mit 0 beginnen." : ""}`);
    const wegA = mitNull ? `Hunderter: ${n - 1} Möglichkeiten (alle ausser 0), Zehner: ${n - 1} (die 0 ist wieder erlaubt, aber nicht die Hunderterziffer), Einer: ${n - 2}. ${n - 1} · ${n - 1} · ${n - 2} = ${B(na)}`
      : `Hunderter: ${n} Möglichkeiten, Zehner: ${n - 1}, Einer: ${n - 2}. ${n} · ${n - 1} · ${n - 2} = ${B(na)}`;
    return A("ziffern", html,
      [{ frage: "Wie viele verschiedene dreistellige Zahlen sind möglich, wenn jede Ziffer höchstens einmal vorkommen darf?", loesung: na, einheit: "Zahlen" },
        { frage: fb, loesung: nb, einheit: "Zahlen" }],
      ["Überlege Stelle für Stelle: Wie viele Ziffern sind für die Hunderter möglich? Wie viele dann noch für die Zehner? Und für die Einer?",
        art === "gerade" ? "Für b): Beginne bei der Einerstelle. Sie muss gerade sein." : art === "groesser" ? `Für b): Welche Ziffern sind als Hunderterziffer möglich?` : `Für b): Jetzt darf jede Ziffer an jeder Stelle stehen${mitNull ? " (aber die 0 nicht vorne)" : ""}.`],
      ol([`a) ${wegA}`, `b) ${wegB}`]), { p: { ds, art, T } });
  }
  throw new Error("ziffern");
}

function turnier() {
  for (let v = 0; v < 5000; v++) {
    const hand = R() < 0.35, rueck = !hand && R() < 0.3;
    const n = rueck ? rnd(4, 8) : rnd(5, 12), m = rnd(6, 16); if (m === n) continue;
    const na = rueck ? n * (n - 1) : n * (n - 1) / 2, M = m * (m - 1) / 2;
    let html, fa, fb, e;
    if (hand) {
      html = P(`An einem Fest gibt sich jede Person mit jeder anderen Person genau einmal die Hand.`);
      fa = `Es sind ${n} Personen. Wie oft werden Hände geschüttelt?`; fb = `An einem anderen Fest wurden ${M} Mal Hände geschüttelt. Wie viele Personen waren es?`; e = ["", "Personen"];
    } else {
      html = P(rueck ? `${n} Mannschaften spielen eine Meisterschaft. Jede Mannschaft spielt gegen jede andere zweimal: einmal zu Hause und einmal auswärts.` : `${n} Mannschaften spielen ein Turnier. Jede Mannschaft spielt genau einmal gegen jede andere.`);
      fa = "Wie viele Spiele gibt es?"; fb = `Bei einem anderen Turnier spielt auch jede Mannschaft genau einmal gegen jede andere. Es gibt ${M} Spiele. Wie viele Mannschaften spielen mit?`; e = ["Spiele", "Mannschaften"];
    }
    const wesen = hand ? "Person" : "Mannschaft";
    const weg = ol([`a) Jede ${wesen} trifft ${n - 1} andere: ${n} · ${n - 1} = ${n * (n - 1)}.` + (rueck ? ` Jedes Paar spielt zweimal, das stimmt also schon: ${B(na)}.` : ` Dabei ist jedes Paar doppelt gezählt (A gegen B und B gegen A): ${n * (n - 1)} : 2 = ${B(na)}.`),
      `b) Probiere: ${[m - 2, m - 1, m].filter(x => x > 1).map(x => `${x} · ${x - 1} : 2 = ${x * (x - 1) / 2}`).join(", ")}. Bei ${B(m)} ${hand ? "Personen" : "Mannschaften"} passt es.`]);
    return A("turnier", html,
      [{ frage: fa, loesung: na, einheit: e[0] }, { frage: fb, loesung: m, einheit: e[1] }],
      [`Jede ${wesen} trifft jede andere. Wie viele andere sind es für eine ${wesen}?`, "Zählt man für jede einzeln, kommt jedes Paar zweimal vor."],
      weg, { p: { n, rueck, hand, M } });
  }
  throw new Error("turnier");
}

/* ===================================================================== Verzeichnis */
const TYPEN = {
  zahlenraetsel: { thema: "zahlen", titel: "Zahlenrätsel", gen: zahlenraetsel },
  summe_produkt: { thema: "zahlen", titel: "Zwei Zahlen gesucht", gen: summeProdukt },
  rest: { thema: "zahlen", titel: "Teilen mit Rest", gen: restAufgabe },
  teilbar: { thema: "zahlen", titel: "Teilbarkeit", gen: teilbarAnzahl },
  anteil_rest: { thema: "brueche", titel: "Anteile", gen: anteilRest },
  rueckwaerts: { thema: "brueche", titel: "Rückwärts rechnen mit Brüchen", gen: rueckwaerts },
  bruch_rechnen: { thema: "brueche", titel: "Mit Brüchen rechnen", gen: bruchRechnen },
  hoelzchen: { thema: "muster", titel: "Figurenfolge", gen: hoelzchen },
  zahlenfolge: { thema: "muster", titel: "Zahlenfolge", gen: zahlenfolge },
  l_figur: { thema: "geometrie", titel: "Umfang und Fläche", gen: lFigur },
  rechteck: { thema: "geometrie", titel: "Rechteck und Quadrat", gen: rechteck },
  aquarium: { thema: "geometrie", titel: "Volumen", gen: aquarium },
  wuerfel: { thema: "geometrie", titel: "Würfel und Quader", gen: wuerfel },
  uhrwinkel: { thema: "geometrie", titel: "Winkel an der Uhr", gen: uhrwinkel },
  umrechnen: { thema: "groessen", titel: "Masseinheiten", gen: umrechnen },
  zeitspanne: { thema: "groessen", titel: "Zeitspannen", gen: zeitspanne },
  tempo: { thema: "groessen", titel: "Geschwindigkeit", gen: tempo },
  dreisatz: { thema: "sachrechnen", titel: "Dreisatz", gen: dreisatz },
  durchschnitt: { thema: "sachrechnen", titel: "Durchschnitt", gen: durchschnitt },
  verteilen: { thema: "sachrechnen", titel: "Verteilen", gen: verteilen },
  ziffern: { thema: "kombinatorik", titel: "Zahlen bilden", gen: ziffern },
  turnier: { thema: "kombinatorik", titel: "Jeder gegen jeden", gen: turnier }
};

/* ===================================================================== Antworten lesen und prüfen */
const EINH = /\s*(km\/h|l\/min|km|cm²|dm²|m²|cm³|dm³|cm|mm|dm|min|Minuten|Fr\.?|Franken|kg|dl|cl|ml|Liter|Bonbons|Seiten|Kinder|Comics|Spiele|Zahlen|Würfel|Zündhölzer|Mannschaften|Personen|Stück|Punkte|Jahre?|Tage?|Stunden|Grad|°|g|t|l|h|s|m)\s*\.?\s*$/i;
/* Zahl lesen → Tausendstel (ganze Zahl); null = keine Zahl, NaN = mehr als drei Stellen nach dem Punkt */
function leseZahl(s) {
  if (s == null) return null;
  s = String(s).trim().replace(/^Fr\.?\s*/i, "");
  for (let i = 0; i < 2; i++) s = s.replace(EINH, "").trim();
  s = s.replace(/[\s'’]/g, "").replace(",", ".");
  if (/\.[-–]$/.test(s)) s = s.slice(0, -2);
  if (s.startsWith(".")) s = "0" + s;
  if (!/^\d+(\.\d*)?$/.test(s)) return null;
  const [w, f = ""] = s.split(".");
  if (f.replace(/0+$/, "").length > 3) return NaN;
  return parseInt(w, 10) * 1000 + parseInt((f + "000").slice(0, 3), 10);
}
function leseGanz(s) { s = String(s == null ? "" : s).trim(); return /^\d+$/.test(s) ? parseInt(s, 10) : null; }
function leseUhr(s) {
  s = String(s == null ? "" : s).trim().replace(/\s*Uhr\.?$/i, "").trim();
  const m = s.match(/^(\d{1,2})\s*[.:,h]\s*(\d{2})$/);
  if (!m) return null;
  const h = +m[1], mi = +m[2];
  if (h > 23 || mi > 59) return null;
  return h * 60 + mi;
}
const tausendstel = x => Math.round(x * 1000);
/* werte: Eingaben eines Teils (bei «bruch» [Zähler, Nenner]). Ergebnis {status: ok|falsch|leer|ungueltig, meldung, given} */
function bewerte(teil, werte) {
  werte = (werte || []).map(x => String(x == null ? "" : x));
  if (werte.every(x => !x.trim())) return { status: "leer", given: "" };
  if (teil.art === "bruch") {
    const n = leseGanz(werte[0]), d = leseGanz(werte[1]);
    const given = `${werte[0].trim()}/${werte[1].trim()}`;
    if (n === null || d === null || d === 0) return { status: "ungueltig", meldung: "Schreibe beim Bruch oben und unten eine ganze Zahl (unten nicht 0).", given };
    const gleich = n * teil.loesung.d === d * teil.loesung.n;
    if (gleich && teil.gekuerzt && gcd(n, d) !== 1) return { status: "falsch", meldung: "Der Wert stimmt, aber der Bruch ist noch nicht ganz gekürzt.", given };
    return { status: gleich ? "ok" : "falsch", given };
  }
  if (teil.art === "uhr") {
    const m = leseUhr(werte[0]);
    if (m === null) return { status: "ungueltig", meldung: "Schreibe die Uhrzeit so: 9.05 (Stunden, Punkt, Minuten).", given: werte[0].trim() };
    return { status: m === teil.loesung ? "ok" : "falsch", given: uhr(m) };
  }
  const v = leseZahl(werte[0]);
  if (v === null) return { status: "ungueltig", meldung: "Das ist keine gültige Zahl. Schreibe nur die Zahl, zum Beispiel 4.5", given: werte[0].trim() };
  if (Number.isNaN(v)) return { status: "ungueltig", meldung: "Höchstens drei Stellen nach dem Punkt.", given: werte[0].trim() };
  return { status: v === tausendstel(teil.loesung) ? "ok" : "falsch", given: werte[0].trim() };
}
/* Aufgaben, bei denen die Reihenfolge egal ist (zwei gesuchte Zahlen): richtig, wenn die Zahlen als Menge stimmen */
function bewerteUngeordnet(teile, eingaben) {
  const r = teile.map((t, i) => bewerte(t, eingaben[i]));
  if (r.some(x => x.status === "leer" || x.status === "ungueltig")) return r;
  const soll = teile.map(t => tausendstel(t.loesung)).sort((a, b) => a - b);
  const ist = eingaben.map(e => leseZahl(e[0])).sort((a, b) => a - b);
  if (soll.every((x, i) => x === ist[i])) return r.map(x => Object.assign(x, { status: "ok" }));
  return r;
}

/* ===================================================================== Auswahl */
function erzeuge(typ) { return TYPEN[typ].gen(); }

const api = {
  THEMEN, TYPEN, THEMA_NAME, erzeuge, bewerte, bewerteUngeordnet, leseZahl, leseUhr, plain, zahl, uhr,
  setzeZufall(f) { R = f || Math.random; },
  _intern: { HOELZER, eindeutig, EINHEIT_BASIS, AQ, kgv, gcd }
};
if (typeof module !== "undefined" && module.exports) module.exports = api;
else root.GYMI = api;
})(typeof window !== "undefined" ? window : globalThis);
