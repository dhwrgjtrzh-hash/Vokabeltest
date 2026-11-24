/* Exportiert alle Hörtexte als JSON für das Aufnahme-Skript (hoertexte.py).
   Aufruf (im Repository-Ordner):  node werkzeuge/hoertexte-export.js > werkzeuge/hoertexte.json */
const fs = require("fs"), path = require("path");
const lade = (datei, namen) => { const code = fs.readFileSync(path.join(__dirname, "..", datei), "utf8");
  return Function(code + "\nreturn {" + namen.join(",") + "};")(); };
const de = lade("hoeren-texte.js", ["HOER_STIMMEN","HOERTEXTE"]);
const en = lade("englisch-texte.js", ["EN_STIMMEN","EN_HOERTEXTE"]);
/* Sprechtempo und Tonhöhe pro Stimme (leicht angepasst, damit die Kinder gut folgen können) */
const TEMPO = {de:"-3%", en:"-10%"};
const HOEHE = {"de-DE-KillianNeural":"+6%"};
const aus = [];
const nimm = (texte, stimmen, ordner, sprache) => texte.forEach(t => aus.push({
  datei: ordner + t.id + ".mp3", sprache, titel: t.titel,
  teile: t.teile.map(([r, s], i) => { const st = stimmen[t.rollen[r].stimme];
    if(!st) throw new Error("Stimme fehlt: " + t.id + " " + r);
    const naechste = t.teile[i+1];
    return {stimme: st, text: s, tempo: TEMPO[sprache], hoehe: HOEHE[st] || "+0%",
            pause: !naechste ? 0 : naechste[0] === r ? 700 : 450}; })
}));
nimm(de.HOERTEXTE, de.HOER_STIMMEN, "audio/hv/", "de");
nimm(en.EN_HOERTEXTE, en.EN_STIMMEN, "audio/en/", "en");
process.stdout.write(JSON.stringify(aus, null, 1) + "\n");
