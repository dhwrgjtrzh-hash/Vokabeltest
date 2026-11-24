/* =====================================================================
   Lernportal 6b – gemeinsame Grundlage der Mathe-Trainer
   (ab den Matheplänen «Proportionalität», «Umgekehrte Proportionalität»,
   «Wertepaare und Wertetabellen»)

   Gleicher Ablauf wie die bisherigen Mathe-Trainer:
   - Anmeldung nur mit der Glückszahl (1 bis 21), nie mit einem Namen
   - Lernziele mit zwei Stufen bis «geschafft»: Stufe 1 · Einstieg (2 Punkte), Stufe 2 · wie im Test
     (4 Punkte); ein Fehler kostet einen Punkt. Die erste Aufgabe eines Lernziels kommt gleich auf
     Stufe 2 (Einstufung): richtig → Einstieg übersprungen. Stufe 3 · knifflig gibt es nur noch als
     Zusatz, wenn ein Lernziel geschafft ist (gemischt mit Aufgaben wie im Test).
   - Wenn es zu schwer ist (seit 20.11.2026): Im Einstieg kostet ein Fehler keinen Punkt. Zwei Fehler
     hintereinander bei «wie im Test» → kurzer Zwischenhalt mit 2 Einstiegsaufgaben (die Punkte bei «wie im
     Test» bleiben gespeichert), die Hilfe «So geht's» ist dann offen.
   - Bearbeitet (Hausaufgabe): Nach 10 Aufgaben bei einem Lernziel ohne «geschafft» gilt es als «bearbeitet»
     (im Lernportal rot/orange je nach Fehlern) und es geht mit dem nächsten Lernziel weiter. So kommen auch
     Kinder mit vielen Fehlern durch alle Grundanforderungen. Bearbeitete Lernziele kommen später wieder dran
     (vor den erweiterten) und können dann noch geschafft werden.
   - Aufwärmen (seit 24.11.2026): Eine Grundanforderung ist rot, solange sie nicht geschafft ist und nicht klappt –
     ab 4 Aufgaben weniger als 60 % richtig oder nach 10 Aufgaben «bearbeitet» ohne «geschafft» (gleich im Lernportal).
     Dann kommen ganz einfache Aufgaben (warm() im Trainer, Stufe 0), nach 3 richtigen wieder Aufgaben der
     Grundanforderung, dort, wo das Kind war. Wieder aufgewärmt wird beim nächsten Einstieg in ein rotes Lernziel
     oder wenn seit dem letzten Aufwärmen wieder 4 Aufgaben unter 60 % richtig sind.
     Aufwärm-Aufgaben zählen nicht für «geschafft» und nicht für «% richtig» (n/ok), wohl aber für die 10 Aufgaben bis
     «bearbeitet». Farben: rot = noch nicht geschafft (Aufwärmen), gelb leuchtend = Grundanforderung geschafft,
     grün leuchtend = erweiterte Anforderung geschafft.
   - «Ich komme nicht weiter» (nach einer Rückfrage): Lösung anschauen, zählt als falsch. «Weiter» geht erst nach
     2 Minuten – damit die Kinder den Lösungsweg anschauen statt durchzuklicken (bleibt auch nach Neuladen).
     (Bis 18.11.2026: drei Stufen mit je 5 Punkten – das waren zu viele Aufgaben pro Matheplan.)
   - Lernstand auf allen Geräten (über die Glückszahl), Resultate in die Tabelle
     «Übungen – Resultate» (gleiches Google-Skript wie bisher)

   Jeder Trainer legt vor dem Start fest:
     UEBUNG       Name des Matheplans (so heisst er auch im Lernportal und in der Station)
     START_NOTE   Hinweis auf der Startseite
     GOALS        Lernziele mit gen(lv) → Aufgabe
     SPERRE       Kennzeichen von Aufgaben aus der Lernzielkontrolle (kommen nie vor)
   und ruft dann trainerStart() auf.
   ===================================================================== */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbzrgzAVAzJ9qKnFE-A4AocZiMw3cG-8pMTBbJ73ypN3HQH7XzOCM7hVgW2WbqBkBNIs/exec";

/* ===== Grundfunktionen ===== */
const T = 1000;                       // Zahlen intern in Tausendsteln (wie bisher)
const rnd = (a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick = a=>a[Math.floor(Math.random()*a.length)];
const shuffle = a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store = {
  get(k){ try{return localStorage.getItem(k)}catch(e){return null} },
  set(k,v){ try{localStorage.setItem(k,v)}catch(e){} }
};
/* Gerätekennung (24.11.2026): zufällig, nur auf diesem Gerät gespeichert, dieselbe wie im Rechtschreibtrainer und in lp-ergebnisse.js.
   Geht mit jeder Runde mit (siehe sendOne) – so sieht die Station, wenn auf einem Gerät mit mehreren Glückszahlen geübt wird. */
const GERAET = (()=>{ let g = store.get("rs.geraet"); if(!g){ g = Date.now().toString(36)+Math.random().toString(36).slice(2,8); store.set("rs.geraet", g); } return g; })();
const gcd = (a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; };
const lcm = (a,b)=> a*b/gcd(a,b);
const red = (n,d)=>{ const g=gcd(n,d); return {n:n/g, d:d/g}; };
const fr = (n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const frT = (n,d)=>`${n}/${d}`;
const ganz = x => Math.abs(x - Math.round(x)) < 1e-9;
const rund = (x, d=3) => { const f = 10**d; return Math.round(x*f)/f; };
const milliVon = x => Math.round(x*T);

/* Zahl im Schweizer Format: 1’250.5 */
function zahl(x){
  x = rund(x,3); const neg = x<0; x = Math.abs(x);
  let [w,f=""] = x.toFixed(3).split("."); f = f.replace(/0+$/,"");
  w = w.replace(/\B(?=(\d{3})+(?!\d))/g,"’");
  return (neg?"−":"")+w+(f?"."+f:"");
}
/* Geldbetrag: 7.50 Fr. */
function chf(x){ const [w,f] = rund(x,2).toFixed(2).split("."); return w.replace(/\B(?=(\d{3})+(?!\d))/g,"’")+"."+f+" Fr."; }
const chfZahl = x => rund(x,2).toFixed(2);
const km = x => zahl(x)+" km";
/* Zeitdauer aus Sekunden: «1 h 20 min», «7 min 30 s» */
function zeit(sec){
  sec = Math.round(sec);
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60, t = [];
  if(h) t.push(h+" h"); if(m) t.push(m+" min"); if(s) t.push(s+" s");
  return t.length ? t.join(" ") : "0 s";
}
/* Zeitdauer nur in Minuten (für Wertepaare): «90 min» */
const minT = sec => (ganz(sec/60) ? zahl(sec/60)+" min" : zeit(sec));

/* Eingabe lesen: Punkt oder Komma, Tausender-Abstände, Einheit am Schluss wird ignoriert */
const EINHEITEN = /\s*(km\/h|l\/min|l\/h|km|cm|mm|min|Fr\.?|Rp\.?|kg|Stück|Stufen|Schritte|Säcke|Tage?|Jahre?|dl|ml|m²|m|h|s|g|l|t)\s*\.?\s*$/i;
function parse(s){
  if(s==null) return null;
  s = String(s).trim().replace(EINHEITEN,"").trim().replace(/[\s'’]/g,"").replace(",",".");
  if(s.endsWith(".-") || s.endsWith(".–")) s = s.slice(0,-2);
  if(s.startsWith(".")) s="0"+s;
  if(!/^\d+(\.\d*)?$/.test(s)) return null;
  const [w,f=""] = s.split(".");
  if(f.replace(/0+$/,"").length>3) return NaN;
  return parseInt(w,10)*T + parseInt((f+"000").slice(0,3),10);
}
function parseInt0(s){ s=String(s||"").trim().replace(EINHEITEN,"").trim(); return /^\d+$/.test(s) ? parseInt(s,10) : null; }

/* Wo im Buch und im Arbeitsheft das Lernziel vorkommt: «TB S. 39 · S. 174» → «Buch S. 39, 174» (gleich in mathe-lernziele.js) */
function buchText(tb){
  const teile = []; let vor = "Buch";
  String(tb||"").split("·").map(x=>x.trim()).filter(Boolean).forEach(x=>{
    const m = x.match(/^(TB|AH)?\s*S\.\s*(.+)$/); if(!m) return;
    if(m[1]) vor = m[1]==="AH" ? "Arbeitsheft" : "Buch";
    const letzter = teile[teile.length-1];
    if(letzter && letzter.vor===vor) letzter.s += ", "+m[2]; else teile.push({vor, s:m[2]});
  });
  return teile.map(t=>`${t.vor} S. ${t.s}`).join(" · ");
}
/* Grundanforderungen gelb, erweiterte Anforderungen grün – wie im Matheplan */
const anforderung = g => `<span class="anf ${g.erw?"erw":"grund"}">${g.erw?"Erweiterte Anforderung":"Grundanforderung"}</span>`;

const ol = steps => `<ol>${steps.map(s=>`<li>${s}</li>`).join("")}</ol>`;
const situation = text => `<div class="situation">${text}</div>`;
const frage = text => `<p class="q">${text}</p>`;

/* Wertepaare wie im Heft.
   zeilen: [{l, r, op, opR, frage, strich, fett}]  op = Rechnung links (z. B. ": 3"), opR = rechts (sonst gleich wie links) */
function wpTab(kopf, zeilen){
  const kz = kopf ? `<tr><th></th><th>${kopf[0]}</th><th></th><th>${kopf[1]}</th><th></th></tr>` : "";
  return `<div class="tabwrap"><table class="wp">${kz}${zeilen.map(z=>{
    const opR = z.opR!==undefined ? z.opR : (z.op||"");
    return `<tr class="${z.strich?"strich":""} ${z.fett?"fett":""}"><td class="op">${z.op||""}</td><td class="w ${z.zielL?"ziel":""}">${z.l}</td><td class="sep">–</td><td class="w ${z.frage?"frage":""} ${z.fett&&!z.zielL?"ziel":""}">${z.r}</td><td class="op">${opR}</td></tr>`;
  }).join("")}</table></div>`;
}
const mal = k => "· "+zahl(k), durch = k => ": "+zahl(k);
/* Proportionaler Weg von a nach c über einen Zwischenschritt (a, c ganze Zahlen in derselben Einheit).
   Liefert [{x, op}] – die Werte links mit der Rechnung (rechts gleiche Rechnung). */
function propWeg(a, c){
  if(a===c) return [];
  if(c % a === 0) return [{x:c, op:mal(c/a), k:c/a}];
  if(a % c === 0) return [{x:c, op:durch(a/c), k:c/a}];
  const g = gcd(a, c);
  return [{x:g, op:durch(a/g), k:g/a}, {x:c, op:mal(c/g), k:c/g}];
}

/* ===== Lernzielkontrolle LZK 6.4 (Proportionalität · umgekehrte Proportionalität · Wertepaare und Wertetabellen)
   sowie Beweise und Kompetenznachweise dieser Mathepläne: Diese Aufgaben und Zahlenpaare kommen im Trainer nie vor.
   Erzeugt der Zufall eine solche Aufgabe, wird neu gewürfelt. ===== */
function lzk64(text){
  const t = " " + String(text||"").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ") + " ";
  const z = (zahl, rest) => new RegExp("[^\\d.’']" + zahl.replace(/\./g,"\\.") + " " + rest).test(t);
  if(/Löwe|Krokodil|Elefant|Karotten|Alina|Barbara|Gummibärchen|Spaghetti|Coca|Cola|Sirup|Luzern|Schnur|Holzlatten|Maismehl|Schnecke|Manuela|Kirschen|Moor\b/.test(t)) return true;
  if(z("80","km/h") || z("150","km/h")) return true;                                       // Aufgaben 1 und 2b
  if(z("30","km/h") && /[^\dh] 40 min|^ 40 min/.test(t.replace(/(\d+) h 40 min/g,"$1 h 4O min"))) return true;   // Aufgabe 2a (30 km/h, 40 min)
  if(/[^\d.’']600 m in 1 min(?! \d)/.test(t) || z("5.5","km in 12 min") || z("3","km in 20 min") || z("5","km in 15 min")) return true;   // Aufgaben 3 und 5c
  if(/[^\d.’']72 (Murmeln|Sticker|Nüsse|Glasperlen|Spielkarten)/.test(t)) return true;     // Aufgabe 4 (72 Stück verteilen)
  if(z("45","km/h") && z("15","km/h")) return true;                                      // Aufgabe 5a
  if(z("0.5","l") && z("1","l")) return true;                                            // Aufgabe 5b
  if(/4[’']?000 kg|6[’']?500 kg/.test(t)) return true;                                   // Aufgabe 7a
  if(z("25","l pro Minute") || z("25","l/min")) return true;                              // Aufgabe 7b
  if(z("7","km") && z("25","km/h")) return true;                                          // Aufgabe 8
  if(z("24","l pro Minute") || z("24","l/min")) return true;                              // Beweis Proportionalität
  if(z("50","km/h") && z("45","min")) return true;                                        // Beweis umgekehrte Proportionalität
  if(z("45","cm") && z("4","Stücke")) return true;                                        // Beweis umgekehrte Proportionalität
  if(z("90","km") && /1 h 30 min/.test(t)) return true;                                   // Beweis Proportionalität
  if(/[^\d.’']480 cm|18\.90|18\.6 km|12\.80 Fr|144\.00 Fr|260 l|130 l|2 min 50 s|4[’']?800 Fr/.test(t)) return true;   // Kompetenznachweise, Beweis
  return false;
}

/* ===== Lernpfad ===== */
let app, pill, GOAL;
const NEED = [0, 2, 4];      // so viele Punkte braucht es: Stufe 1 · Einstieg 2, Stufe 2 · wie im Test 4 (Fehler: −1)
const LEVELS = 2;            // mit Stufe 2 ist ein Lernziel geschafft; Stufe 3 · knifflig nur noch als Zusatz
const DURCHGANG = 10;        // so viele Aufgaben pro Lernziel, dann «bearbeitet» und weiter (wenn nicht schon geschafft)
const ZUSATZ_KNIFFLIG = 0.4; // geschaffte Lernziele: so oft kommt eine knifflige Aufgabe, sonst eine wie im Test
const LVNAME = ["Aufwärmen · ganz einfach","Stufe 1 · Einstieg","Stufe 2 · wie im Test","Stufe 3 · knifflig"];
const AW_ZIEL = 3;           // Aufwärmen: so viele richtige ganz einfache Aufgaben, dann zurück zu den Grundanforderungen
const AW_MAX = 6;            // «bearbeitet» wartet, bis das Aufwärmen fertig ist – aber höchstens so viele Aufwärm-Aufgaben
const ROT_MIN = 4, ROT_Q = 0.6;   // rot wie im Lernportal: ab 4 Aufgaben weniger als 60 % richtig
let gz = (store.get("uebung.gz")||store.get("dz.gz")||store.get("rs.gz")||"").replace(/\D/g,"");
const gzGueltig = v => /^\d{1,2}$/.test(String(v)) && +v >= 1 && +v <= 21;   // Glückszahlen der Klasse: 1 bis 21
if(gz && !gzGueltig(gz)) gz = "";
let P = null, S = null;

function pkey(){ return "uebung.p."+UEBUNG+"."+gz; }
function loadP(){ try{ P = JSON.parse(store.get(pkey())||"null"); }catch(e){ P=null; } if(!P||!P.goals) P={goals:{}, last:null}; }
function saveP(){ P.t = Date.now(); const txt = JSON.stringify(P); store.set(pkey(), txt); STAND.merken(UEBUNG, gz, txt, P.t); }
function gs(id){
  const s = P.goals[id] || (P.goals[id]={lv:1, pr:0, done:false, n:0, ok:0});
  if(s.spaeter){ s.bearbeitet = s.bearbeitet || s.spaeter; delete s.spaeter; }
  if(!s.done){
    /* Lernstand aus der Zeit mit drei Stufen: Wer schon auf Stufe 3 war, hat «wie im Test» sicher gekonnt → geschafft.
       Mehr Punkte als neu nötig: Es fehlt noch eine richtige Antwort. */
    if(s.lv > LEVELS){ s.done = true; s.lv = LEVELS; s.pr = NEED[LEVELS]; }
    else if(s.pr >= NEED[s.lv||1]) s.pr = NEED[s.lv||1] - 1;
  }
  return s;
}

/* Rot: Ein Lernziel der Grundanforderungen klappt noch nicht – ab 4 Aufgaben weniger als 60 % richtig (wie im Lernportal).
   Gezählt werden die Aufgaben seit dem letzten Aufwärmen (awB), sonst käme gleich danach wieder Aufwärmen.
   Nur bei Lernzielen mit Aufwärm-Aufgaben (warm), nie bei erweiterten Anforderungen. */
function rot(id){
  const g = GOAL[id];
  if(!g || g.erw || typeof g.warm !== "function") return false;
  const s = gs(id);
  if(s.done || s.aw) return false;
  const n = s.n - (s.awB ? s.awB.n : 0), ok = s.ok - (s.awB ? s.awB.ok : 0);
  return n >= ROT_MIN && ok / n < ROT_Q;
}
/* Rot im Lernportal: nicht geschafft und ab 4 Aufgaben unter 60 % richtig oder «bearbeitet» ohne «geschafft».
   Beim Einstieg in ein solches Lernziel wird zuerst aufgewärmt – ausser es wurde seit dem letzten Aufwärmen nicht weitergeübt. */
function rotBeimEinstieg(id){
  const g = GOAL[id];
  if(!g || g.erw || typeof g.warm !== "function") return false;
  const s = gs(id);
  if(s.done || s.aw) return false;
  const seither = s.n - (s.awB ? s.awB.n : 0);
  return seither >= 1 && ((s.n >= ROT_MIN && s.ok / s.n < ROT_Q) || !!s.bearbeitet);
}
const amAufwaermen = (id, s) => !!(s.aw && !s.done && GOAL[id] && typeof GOAL[id].warm === "function");

/* Aufgaben aus der Lernzielkontrolle kommen nie vor (SPERRE im Trainer) */
function lzkGesperrt(t, id){
  if(!t) return false;
  if(lzk64(String(t.html||"") + " | " + String(t.text||""))) return true;
  try{ return typeof SPERRE === "function" ? !!SPERRE(t, id) : false; }catch(e){ return false; }
}

function home(){
  pill.hidden = true;
  if(gz){ if(STAND.brauche(UEBUNG, gz)) app.innerHTML = `<div class="card"><p class="sub" style="margin:0">Einen Moment …</p></div>`; return STAND.holen(UEBUNG, gz, pkey(), ()=>{ loadP(); startAuto(); }); }
  app.innerHTML = `<div class="card start">
    <h2>Deine Glückszahl</h2>
    <p class="sub">Schreib deine Glückszahl hin, nicht deinen Namen. Nimm immer dieselbe Zahl, dann machst du dort weiter, wo du aufgehört hast.</p>
    <div class="row startrow">
      <input class="ans small" id="gz" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" placeholder="?" aria-label="Deine Glückszahl">
      <button class="btn" id="los">Los geht's →</button>
    </div>
    <p class="gzfehler" id="gzfehler" hidden>Die Glückszahlen gehen von 1 bis 21. Schau nochmals nach, welche Zahl du hast.</p>
    <p class="sub hint">${START_NOTE}</p>
  </div>`;
  const inp = document.getElementById("gz");
  const los = ()=>{
    const v = inp.value.replace(/\D/g,"").slice(0,2);
    if(!v){ inp.classList.add("no"); inp.focus(); return; }
    if(!gzGueltig(v)){ inp.classList.add("no"); document.getElementById("gzfehler").hidden = false; inp.select(); return; }
    gzFrage(String(+v), z => { gz = z; store.set("uebung.gz", gz); if(!store.get("rs.gz")) store.set("rs.gz", gz); STAND.holen(UEBUNG, gz, pkey(), ()=>{ loadP(); startAuto(); }); }, home);
  };
  inp.addEventListener("input", ()=>{ const v = inp.value.replace(/\D/g,"").slice(0,2); if(inp.value!==v) inp.value = v; inp.classList.remove("no"); document.getElementById("gzfehler").hidden = true; });
  inp.addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); los(); } });
  document.getElementById("los").onclick = los;
  inp.focus({preventScroll:true});
}

/* Startet direkt: zuerst das zuletzt geübte Lernziel, sonst das nächste noch offene. Sind alle geschafft, kommen gemischte Aufgaben. */
function allDone(){ return GOALS.every(g=>gs(g.id).done); }
/* Nach der Eingabe nochmals nachfragen: Ist das wirklich deine Glückszahl? */
function gzFrage(z, ja, nein){
  app.innerHTML = `<div class="card gzfrage">
    <h2>Ist das wirklich deine Glückszahl?</h2>
    <div class="gzgross">${z}</div>
    <p class="gzfair">Nimm nur <b>deine eigene</b> Glückszahl. Wenn du die Zahl von einem anderen Kind nimmst, werden eure Ergebnisse vermischt. Das ist unfair für das andere Kind – und man sieht nicht mehr, was du selbst schon kannst.</p>
    <div class="gzknoepfe"><button class="btn" id="gzja">✓ Ja, das ist meine Zahl</button><button class="btn ghost" id="gznein">Nein, ändern</button></div>
  </div>`;
  document.getElementById("gzja").onclick = () => ja(z);
  document.getElementById("gznein").onclick = nein;
  document.getElementById("gzja").focus({preventScroll:true});
}
function startAuto(){
  const sp = sperreLesen(); if(sp) return sperreKarte(sp, startAuto);
  /* Kommt das Kind über «… üben» aus dem Lernportal, startet genau dieses Lernziel (nur einmal) */
  const zp = new URLSearchParams(location.search).get("ziel");
  if(zp && GOAL[zp] && !startAuto.ziel){ startAuto.ziel = true; try{ history.replaceState(null, "", location.pathname + location.hash); }catch(e){} return startGoal(zp); }
  const last = P.last && GOAL[P.last] && !gs(P.last).done ? P.last : null;
  const open = nextGoal(null);   // erstes offenes Lernziel (Grundanforderungen zuerst, verschobene später)
  startGoal(last || open || pick(GOALS).id);
}
function otherNumber(){ sendPending(); STAND.jetzt(true); S = null; gz = ""; store.set("uebung.gz", ""); home(); }

function startGoal(id){
  wiederAufnehmen(id);
  P.last = id; saveP();
  S = {mode:"goal", goal:id, log:[], pending:[], nr:0, frisch:true};
  next();
}

function next(){
  const id = S.goal;
  const st = gs(id);
  if(rot(id) || (S.frisch && rotBeimEinstieg(id))){ st.aw = {n:0, r:0, f:0}; saveP(); }   // rot → zuerst ganz einfache Aufgaben
  S.frisch = false;
  if(st.aw && !amAufwaermen(id, st)){ delete st.aw; saveP(); }
  const aw = amAufwaermen(id, st);
  let lv = aw ? 0 : st.done ? (Math.random() < ZUSATZ_KNIFFLIG ? 3 : 2) : st.lv;   // geschafft: Zusatzaufgaben, auch knifflige
  const probe = !aw && st.lv===1 && st.pr===0 && !st.done && !st.probed;   // Einstufung: gleich mit Stufe 2 beginnen
  if(probe) lv = 2;
  const gen = aw ? ()=>GOAL[id].warm() : ()=>GOAL[id].gen(lv);
  const sig = t=>t.type+"|"+String(t.html||"").replace(/<[^>]*>/g,"").replace(/[0-9.,’'\/]+/g,"#").slice(0,70);
  let t;
  for(let k=0;k<60;k++){ const c = gen(); if(!c || lzkGesperrt(c, id)) continue; t = c; if(!S.lastSig || sig(c)!==S.lastSig) break; }
  for(let k=0; !t && k<2000; k++){ const c = gen(); if(c && !lzkGesperrt(c, id)) t = c; }   // nie eine Testaufgabe
  S.lastSig = sig(t);
  t.goal = id; t.lv = lv; t.probe = probe; t.aw = aw;
  S.task = t; S.done = false; S.nr++;
  draw(); S.hilfeOffen = false;
}

const inp = (id, cls="", mode="decimal")=>`<input class="ans ${cls}" id="${id}" inputmode="${mode}" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="?">`;
const fracInput = (a,b)=>`<span class="fin">${inp(a,"small","numeric")}<i></i>${inp(b,"small","numeric")}</span>`;

function head(){
  const g = GOAL[S.task.goal], s = gs(g.id), need = NEED[s.lv];
  if(S.task.aw){   // Aufwärmen: roter Bereich
    const r = s.aw ? s.aw.r : 0;
    let d = ""; for(let i=0;i<AW_ZIEL;i++) d += `<i class="${i<r?"on":""}"></i>`;
    return `<div class="sesshead"><span class="qtype" style="background:${g.c}1a;color:${g.c};margin:0">${g.ic} ${g.code?g.code+" · ":""}${g.title}</span><span class="anf aw">Aufwärmen</span></div>
    <div class="sesshead"><b>${LVNAME[0]}</b><span class="grow"></span><span class="dots">${d}<span>${r}/${AW_ZIEL}</span></span></div>
    ${s.aw && !s.aw.n ? `<p class="awinfo">Dieses Lernziel klappt noch nicht ganz. Darum kommen jetzt ein paar <b>ganz einfache Aufgaben zum Aufwärmen</b>. Nach ${AW_ZIEL} richtigen geht es weiter mit den Grundanforderungen.</p>` : ""}`;
  }
  const folge = (s.streak||0)>1 ? `🔥 ${s.streak} in Folge` : "";
  let dots=""; if(!s.done) for(let i=0;i<need;i++) dots+=`<i class="${i<s.pr?"on":""}"></i>`;
  const stand = s.done ? `<span class="dots"><span>${folge}</span></span>`
    : `<span class="dots">${dots}<span>${s.pr}/${need}${folge?` · ${folge}`:""}</span></span>`;
  return `<div class="sesshead"><span class="qtype" style="background:${g.c}1a;color:${g.c};margin:0">${g.ic} ${g.code?g.code+" · ":""}${g.title}</span>${anforderung(g)}</div>
    <div class="sesshead"><b>${s.done?`⭐ Geschafft – Zusatzaufgabe · ${LVNAME[S.task.lv]}`:S.task.probe?"Einstufung · eine Aufgabe wie im Test":s.zw?"Einstieg · kurz zwischendurch":LVNAME[s.lv]}</b><span class="grow"></span>${S.task.probe?"":stand}</div>`;
}

/* Wertetabelle zum Ausfüllen: Zeilen [{l, r}], null = Eingabefeld */
function tabHtml(t){
  let j = 0;
  const zelle = v => v===null ? inp("a"+(j++), t.breit?"breit":"") : `<span>${v}</span>`;
  return `<div class="tabwrap"><table class="wtab"><tr><th>${t.kopf[0]}</th><th class="strich"></th><th>${t.kopf[1]}</th></tr>
    ${t.zeilen.map(z=>`<tr><td>${zelle(z.l)}</td><td class="strich">–</td><td>${zelle(z.r)}</td></tr>`).join("")}</table></div>`;
}

function draw(){
  const t = S.task, g = GOAL[t.goal];
  pill.hidden = false; pill.textContent = `Nr. ${gz}`;
  let body = "", needsCheck = true;
  if(t.type==="input"){
    body = t.html + `<div class="fd">${t.lead?`<span class="big" style="margin:0">${t.lead}</span>`:""}${inp("a0", t.klein?"small":t.unit?"mittel":"")}${t.unit?`<span class="einheit">${t.unit}</span>`:""}</div>`;
  }else if(t.type==="time"){
    body = t.html + `<div class="fd zeitfeld">${t.units.map((u,j)=>`${inp("a"+j,"small","numeric")}<span class="einheit">${u}</span>`).join("")}</div>`;
  }else if(t.type==="tab"){
    body = t.html + tabHtml(t);
  }else if(t.type==="frac"){
    body = t.html + `<div class="fd">${t.lead?`<span class="big" style="margin:0">${t.lead}</span><span class="eq">=</span>`:""}${fracInput("a0","a1")}</div>`;
  }else if(t.type==="choice"){
    needsCheck = false;
    body = t.html + `<div class="cmpbtns ${t.words?"words":""} ${t.lang?"lang":""}">${t.options.map((o,j)=>`<button data-c="${j}">${o.label}</button>`).join("")}</div>`;
  }
  app.innerHTML = `<div class="card">${head()}
      ${body}
      <div id="fb"></div>
      <div class="actions">
        ${needsCheck?`<button class="btn" id="check">Prüfen</button>`:""}
        <button class="btn" id="nextBtn" hidden>Weiter →</button>
      </div>
      <div class="nw" id="nw"></div>
      <details class="help"${S.hilfeOffen?" open":""}><summary>💡 So geht's</summary>${g.help()}${g.tb?`<p class="buch">📖 Üben im Buch und Heft: <b>${buchText(g.tb)}</b></p>`:""}</details>
    </div>`;
  const inputs = [...app.querySelectorAll("input.ans")];
  inputs.forEach((el,j)=>el.addEventListener("keydown",e=>{
    if(e.key==="Enter"){ e.preventDefault();
      if(S.done) return go();
      if(j<inputs.length-1 && !inputs[j+1].value) inputs[j+1].focus(); else check(); }
  }));
  if(inputs[0]) inputs[0].focus({preventScroll:true});
  const c = document.getElementById("check"); if(c) c.onclick = ()=>check();
  app.querySelectorAll(".cmpbtns button").forEach(b=>b.onclick=()=>check(b.dataset.c, b));
  document.getElementById("nextBtn").onclick = go;
  nwKnopf();
  // Wer nach unten gescrollt hat (z. B. zu «Weiter →»), sieht die neue Aufgabe von oben
  const oben = app.getBoundingClientRect().top;
  if(oben < 0) window.scrollBy(0, oben - 10);
}

/* «Ich komme nicht weiter»: Das Kind sieht die Lösung, die Aufgabe zählt als falsch, dann geht es weiter.
   Erst nach einer Rückfrage – damit ein versehentlicher Tipp nicht als Fehler zählt. */
function nwKnopf(){
  const nw = document.getElementById("nw"); if(!nw) return;
  nw.innerHTML = `<button class="nwknopf" id="nwBtn">🤔 Ich komme nicht weiter</button>`;
  document.getElementById("nwBtn").onclick = () => {
    if(S.done) return;
    nw.innerHTML = `<p>Dann siehst du die Lösung. Die Aufgabe zählt als <b>falsch</b>.<br>Du musst dann <b>mindestens 2 Minuten warten</b>, bis es weitergeht. Schau dir in dieser Zeit den Lösungsweg genau an.</p>
      <div class="nwja"><button class="btn small" id="nwJa">Lösung zeigen</button><button class="btn small ghost" id="nwNein">Doch noch probieren</button></div>`;
    document.getElementById("nwJa").onclick = aufgeben;
    document.getElementById("nwNein").onclick = nwKnopf;
  };
}
function aufgeben(){
  if(S.done) return;
  const t = S.task;
  if(t.type==="choice") app.querySelectorAll(".cmpbtns button").forEach(b=>{ if(b.dataset.c===String(t.answer)) b.classList.add("ok"); });
  finish(false, "nicht weitergekommen", "Kein Problem. Schau dir genau an, wie es geht – die Aufgabe zählt als falsch.");
  const loesung = (document.querySelector("#fb .explain")||{}).outerHTML || "";
  const bis = Date.now() + SPERRE_MS;
  store.set(skey(), JSON.stringify({bis, loesung}));
  sperreLaeuft(bis, document.getElementById("nextBtn"));
}

/* Nach «Ich komme nicht weiter»: 2 Minuten Zeit für den Lösungsweg, erst dann «Weiter» */
const SPERRE_MS = 2*60*1000;
const skey = () => "uebung.sperre."+UEBUNG+"."+gz;
function sperreLesen(){ try{ const x = JSON.parse(store.get(skey())||"null"); if(x && x.bis > Date.now()) return x; }catch(e){} store.set(skey(), ""); return null; }
function sperreLaeuft(bis, knopf, fertig){
  S.sperreBis = bis;
  knopf.insertAdjacentHTML("beforebegin", `<p class="sperrhinweis" id="sperrhinweis">⏳ Du musst mindestens 2 Minuten warten. Lies den Lösungsweg Schritt für Schritt – kannst du ihn jemandem erklären?</p>`);
  const tick = () => {
    const rest = Math.ceil((bis - Date.now())/1000);
    if(rest <= 0){
      clearInterval(S.sperreUhr); S.sperreBis = 0; store.set(skey(), "");
      knopf.disabled = false; knopf.textContent = "Weiter →";
      const h = document.getElementById("sperrhinweis"); if(h) h.remove();
      if(fertig) fertig();
      return;
    }
    knopf.disabled = true; knopf.textContent = `Weiter in ${Math.floor(rest/60)}:${String(rest%60).padStart(2,"0")}`;
  };
  clearInterval(S.sperreUhr); S.sperreUhr = setInterval(tick, 1000); tick();
}
/* Wer während der 2 Minuten die Seite neu lädt oder zurückkommt, sieht den Lösungsweg nochmals */
function sperreKarte(x, dann){
  S = S || {};
  app.innerHTML = `<div class="card"><p class="sub" style="margin:0 0 10px">Du bist bei der letzten Aufgabe nicht weitergekommen. Schau dir den Lösungsweg nochmals genau an.</p>
      ${x.loesung}
      <div class="actions"><button class="btn" id="nextBtn" disabled>Weiter →</button></div></div>`;
  const knopf = document.getElementById("nextBtn");
  sperreLaeuft(x.bis, knopf);
  knopf.onclick = () => { if(!knopf.disabled) dann(); };
}

const FAKTOR = {h:3600, min:60, s:1};
function check(choice, btn){
  if(S.done) return;
  const t = S.task;
  let ok = false, extra = "", given = "";
  const inputs = [...app.querySelectorAll("input.ans")];
  if(t.type==="choice"){
    const want = String(t.answer);
    ok = choice===want;
    btn.classList.add(ok?"ok":"no");
    given = btn.textContent.trim();
    app.querySelectorAll(".cmpbtns button").forEach(b=>{ if(b.dataset.c===want) b.classList.add("ok"); });
  }else if(t.type==="time"){
    if(inputs.every(el=>!el.value.trim())){ feedback("bad","Bitte fülle zuerst aus."); return; }
    const vals = inputs.map(el=> el.value.trim()==="" ? 0 : parseInt0(el.value));
    if(vals.some(v=>v===null)){ feedback("bad","Schreibe in jedes Feld eine ganze Zahl (oder lass es leer)."); return; }
    const sek = vals.reduce((a,v,j)=>a + v*FAKTOR[t.units[j]], 0);
    ok = sek === t.sec;
    inputs.forEach(el=>{ el.classList.toggle("ok",ok); el.classList.toggle("no",!ok); });
    given = zeit(sek);
    const schoen = zeit(t.sec);
    if(ok && given.replace(/\s+/g," ") !== vals.map((v,j)=>v? v+" "+t.units[j] : "").filter(Boolean).join(" ")) extra = `Man schreibt es meistens so: <b>${schoen}</b>.`;
  }else{
    if(inputs.some(el=>!el.value.trim())){ feedback("bad","Bitte fülle zuerst alles aus."); return; }
    const res = [];
    let invalid = "";
    if(t.type==="frac"){
      const n = parseInt0(inputs[0].value), d = parseInt0(inputs[1].value);
      if(n===null || d===null || d===0){ invalid = "Schreibe beim Bruch oben und unten eine ganze Zahl (unten nicht 0)."; }
      else{
        const want = t.answer;
        const same = n*want.d === d*want.n;
        const isRed = gcd(n,d)===1;
        const fok = same && (!t.reduced || isRed);
        res.push(fok, fok);
        if(same && t.reduced && !isRed) extra = "Der Wert stimmt, aber der Bruch ist noch nicht ganz gekürzt.";
      }
    }else{
      const vals = inputs.map(el=>parse(el.value));
      if(vals.some(v=>v===null||Number.isNaN(v))) invalid = vals.some(Number.isNaN) ? "Höchstens drei Stellen nach dem Punkt." : "Das ist keine gültige Zahl. Schreibe nur die Zahl, zum Beispiel 4.5";
      else { const want = t.type==="input" ? [t.answer] : t.answers; vals.forEach((v,j)=>res.push(v===milliVon(want[j]))); }
    }
    if(invalid){ feedback("bad", invalid); return; }     // zählt nicht
    inputs.forEach((el,j)=>{ el.classList.toggle("ok",res[j]); el.classList.toggle("no",!res[j]); });
    ok = res.every(Boolean);
    given = t.type==="frac" ? `${inputs[0].value.trim()}/${inputs[1].value.trim()}`
      : inputs.map(el=>el.value.trim()).join(" | ");
    if(t.type==="tab" && !ok){ const n = res.filter(Boolean).length; if(n) extra = `${n} von ${res.length} Feldern stimmen. Die roten Felder sind falsch.`; }
  }
  finish(ok, given, extra);
}

function feedback(kind, text){ document.getElementById("fb").innerHTML = `<div class="fb show ${kind}">${text}</div>`; }

function finish(ok, given, extra){
  S.done = true;
  const t = S.task, g = GOAL[t.goal], s = gs(g.id);
  app.querySelectorAll("input.ans").forEach(el=>el.readOnly=true);
  app.querySelectorAll(".cmpbtns button").forEach(b=>b.disabled=true);
  const c=document.getElementById("check"); if(c) c.hidden=true;
  const nw=document.getElementById("nw"); if(nw) nw.hidden=true;
  if(!t.aw){ s.n++; if(ok) s.ok++; }                         // Aufwärm-Aufgaben zählen nicht für «% richtig»
  const wirdRot = !t.aw && rot(g.id);                         // diese Antwort macht das Lernziel rot → Aufwärmen
  let toast = "", awFertig = false;
  if(t.aw){
    if(!s.aw) s.aw = {n:0, r:0, f:0};
    s.aw.n++;
    if(ok){ s.aw.r++; s.aw.f = 0; } else { s.aw.f = (s.aw.f||0) + 1; if(s.aw.f >= 2) S.hilfeOffen = true; }
    if(s.aw.r >= AW_ZIEL){
      delete s.aw; s.awB = {n:s.n, ok:s.ok}; s.fe = 0; awFertig = true;   // ab jetzt wird neu gezählt
      toast = `💪 Gut aufgewärmt! Jetzt geht es weiter mit den Grundanforderungen – ${s.lv===1 ? "zuerst mit dem <b>Einstieg</b>" : "mit Aufgaben <b>wie im Test</b>"}${s.lv===2 && s.pr ? ` (${s.pr===1?"dein 1 Punkt ist":`deine ${s.pr} Punkte sind`} noch da)` : ""}.`;
    }
  } else if(t.probe){
    s.probed = true;
    if(ok){ s.lv = 2; s.pr = 1; s.streak = 1; toast = `🚀 Stark! Das kannst du schon – den Einstieg überspringst du.`; }
    else s.streak = 0;                         // weiter mit Stufe 1 · Einstieg
  } else if(s.done){
    s.streak = ok ? (s.streak||0) + 1 : 0;     // Zusatzaufgaben: zählen nicht mehr für die Stufen
  } else if(ok){
    s.streak = (s.streak||0) + 1; s.fe = 0;
    s.pr = Math.min(NEED[s.lv], s.pr+1);
    if(s.pr >= NEED[s.lv]){
      if(s.lv < LEVELS && s.zw){ s.lv = 2; s.pr = Math.min(s.pr2||0, NEED[2]-1); s.pr2 = 0; s.zw = false; s.streak = 0;
        toast = `👍 Gut! Jetzt wieder Aufgaben <b>wie im Test</b>${s.pr?` – ${s.pr===1?"dein 1 Punkt ist":`deine ${s.pr} Punkte sind`} noch da`:""}.`; }
      else if(s.lv < LEVELS){ s.lv++; s.pr = 0; s.streak = 0; toast = `🎉 Einstieg geschafft! Jetzt kommen Aufgaben <b>wie im Test</b>.`; }
      else { s.done = true; S.goalDone = true;
        const nx = nextGoal(g.id);
        toast = `🏆 Super! Du hast «${g.title}» geschafft.${nx?`<br>Weiter geht es mit <b>${GOAL[nx].title}</b>.`:"<br>Du hast alle Lernziele geschafft! Jetzt kommen gemischte Aufgaben – auch knifflige."}`; }
    }
  } else {
    s.streak = 0; s.fe = (s.fe||0) + 1;
    if(s.lv===1){ if(s.fe>=2) S.hilfeOffen = true; }          // Einstieg: ein Fehler kostet keinen Punkt
    else if(s.fe<2) s.pr = Math.max(0, s.pr-1);
    else if(wirdRot) s.fe = 0;                                  // rot: gleich Aufwärmen statt kurzer Zwischenhalt
    else {                     // zwei Fehler hintereinander bei «wie im Test» (der zweite kostet keinen Punkt mehr)
      s.fe = 0;
      s.pr2 = s.pr; s.lv = 1; s.pr = 0; s.zw = true; S.hilfeOffen = true;
      toast = `Das ist noch schwierig. Wir machen kurz zwei <b>einfachere Aufgaben</b>${s.pr2?` – deine Punkte bei «wie im Test» bleiben gespeichert`:""}.`;
    }
  }
  /* Durchgang fertig: Nach 10 Aufgaben ist das Lernziel «bearbeitet» – die Hausaufgabe ist gemacht, auch mit Fehlern */
  if(!s.done) s.nb = (s.nb||0) + 1;
  const wartet = s.aw && s.aw.n < AW_MAX;                      // erst fertig aufwärmen, dann «bearbeitet»
  if(!s.done && s.nb >= DURCHGANG && !wartet){
    s.bearbeitet = Date.now(); s.nb = 0;
    const nx = nextGoal(g.id);
    if(nx && (g.erw || !GOAL[nx].erw)){                         // von einer Grundanforderung nie zu einer erweiterten
      S.weiter = nx; P.last = nx; S.hilfeOffen = false;          // das nächste Lernziel beginnt mit der Einstufung
      toast = `${awFertig ? "💪 Gut aufgewärmt!<br>" : ""}📝 Du hast «${g.title}» <b>bearbeitet</b>. Es hat noch Fehler – du kannst es später nochmals üben.<br>Jetzt geht es weiter mit <b>«${GOAL[nx].title}»</b>.`;
    } else toast = (toast ? toast+"<br>" : "") + `📝 Du hast «${g.title}» <b>bearbeitet</b>. Übe weiter – vielleicht schaffst du es noch!`;
  }
  /* rot geworden und es geht beim gleichen Lernziel weiter: jetzt aufwärmen */
  if(wirdRot && !S.weiter && !s.done){
    s.aw = {n:0, r:0, f:0}; S.hilfeOffen = false;
    toast = (toast ? toast+"<br>" : "") + `🔴 Das ist noch schwierig. Jetzt kommen ein paar <b>ganz einfache Aufgaben zum Aufwärmen</b>.`;
  }
  saveP();
  const entry = {nr:S.nr, thema:g.title, stufe:t.lv, frage:t.text, antworten:[given], loesung:t.show, punkte:ok?1:0, test:false, t:Date.now()};
  S.log.push(entry); S.pending.push(entry); savePending();
  const fb = document.getElementById("fb");
  if(ok){
    fb.innerHTML = `<div class="fb show good">${pick(["Super! ⭐","Richtig! ⭐","Genau! ⭐","Stark! ⭐","Perfekt! ⭐"])}${extra?`<br><span style="font-weight:600">${extra}</span>`:""}</div>
      <details class="way"><summary>Lösungsweg anschauen</summary><div class="explain ok">${t.explain}</div></details>`;
  } else {
    fb.innerHTML = `<div class="fb show bad">${extra || "Leider nicht richtig."}</div>
      <div class="explain"><h3>💡 So geht es</h3>${t.explain}<div class="ans">Lösung: ${t.showHtml||esc(t.show)}</div></div>
      <p class="sub" style="margin:10px 0 0">Lies die Erklärung genau. Danach bekommst du eine ähnliche Aufgabe.</p>`;
  }
  if(toast) fb.insertAdjacentHTML("beforeend", `<div class="toast">${toast}</div>`);
  const n=document.getElementById("nextBtn"); n.hidden=false; n.focus({preventScroll:true});
  if(S.pending.length>=10 || toast) sendPending();
}
function nextGoal(from){
  const i = GOALS.findIndex(x=>x.id===from);   // from = null: alle Lernziele von vorne
  const order = (i<0 ? GOALS : GOALS.slice(i+1).concat(GOALS.slice(0,i))).filter(x=>!gs(x.id).done);
  /* zuerst Lernziele, die noch nicht bearbeitet sind; dann die bearbeiteten (mit Fehlern), am längsten nicht geübte zuerst */
  const spaeter = l => l.filter(x=>gs(x.id).bearbeitet).sort((a,b)=>gs(a.id).bearbeitet-gs(b.id).bearbeitet);
  const jetzt = l => l.filter(x=>!gs(x.id).bearbeitet);
  const grund = order.filter(x=>!x.erw), erw = order.filter(x=>x.erw);
  const g = jetzt(grund)[0] || spaeter(grund)[0] || jetzt(erw)[0] || spaeter(erw)[0];
  return g ? g.id : null;
}
/* Ein bearbeitetes Lernziel wieder aufnehmen: neuer Durchgang mit 10 Aufgaben */
function wiederAufnehmen(id){ const s = gs(id); if(s.bearbeitet && !s.done) s.nb = 0; }
function go(){
  if(S.sperreBis && Date.now() < S.sperreBis) return;   // 2 Minuten für den Lösungsweg
  if(S.goalDone || S.weiter){
    const nx = S.weiter || nextGoal(S.goal);
    S.goalDone = false; S.weiter = null;
    sendPending();
    if(nx){ wiederAufnehmen(nx); S.goal = nx; P.last = nx; S.frisch = true; saveP(); }
  }
  if(allDone()) S.goal = pick(GOALS).id;   // alles geschafft: gemischt weiterüben
  next();
}

/* ---------- Senden ---------- */
const QKEY = "uebung.queue";
function queue(){ try{ return JSON.parse(store.get(QKEY)||"[]"); }catch(e){ return []; } }
function sendOne(rec){
  return fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(rec.geraet ? rec : Object.assign({geraet:GERAET}, rec)),keepalive:true})
    .then(r=>r.text()).then(t=>{ if(!/"ok"\s*:\s*true/.test(t)) throw new Error("abgelehnt"); });
}
let flushing = false;
async function flush(){
  if(!ENDPOINT || flushing) return;
  flushing = true;
  try{
    let q = queue(), rest = [];
    for(const rec of q){ try{ await sendOne(rec); }catch(e){ rest.push(rec); } }
    const now = queue().slice(q.length);       // was inzwischen dazukam
    store.set(QKEY, JSON.stringify(rest.concat(now).slice(-60)));
  } finally { flushing = false; }
}
const pendKey = () => "uebung.pending."+UEBUNG;
function makeRec(items, thema, g){
  return {typ:"uebung-runde", v:2, id:Date.now().toString(36)+Math.random().toString(36).slice(2,10), uebung:UEBUNG, glueckszahl:g, thema, datum:new Date().toISOString(),
    punkte:items.filter(i=>i.punkte).length, max:items.length,
    aufgaben:items.map(i=>({nr:i.nr, thema:i.thema, stufe:i.stufe, frage:i.frage, antworten:i.antworten, loesung:i.loesung, punkte:i.punkte, t:i.t}))};
}
function curThema(){ return GOAL[S.goal].title; }
function savePending(){ if(S) store.set(pendKey(), JSON.stringify({gz, thema:curThema(), items:S.pending})); }
function sendPending(){
  if(!S || !S.pending.length) return;
  const items = S.pending.splice(0);
  store.set(pendKey(), "");
  if(!ENDPOINT) return;
  const q = queue(); q.push(makeRec(items, curThema(), gz)); store.set(QKEY, JSON.stringify(q.slice(-60)));
  flush();
}
function recoverPending(){      // Antworten, die beim letzten Mal nicht mehr verschickt wurden
  let p = null; try{ p = JSON.parse(store.get(pendKey())||"null"); }catch(e){}
  store.set(pendKey(), "");
  if(p && p.items && p.items.length && ENDPOINT){ const q = queue(); q.push(makeRec(p.items, p.thema, p.gz)); store.set(QKEY, JSON.stringify(q.slice(-60))); }
}

/* ===== Lernstand auf allen Geräten: wird über die Glückszahl in der Google-Tabelle gespeichert ===== */
const STAND = (()=>{
  const geholt = {}; let timer = null, offen = null;
  const post = (body, keep) => fetch(ENDPOINT, {method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(body), keepalive:!!keep}).then(r=>r.json());
  function senden(uebung, g, text, t, keep){ if(!ENDPOINT || !g || !text) return; post({typ:"stand-speichern", uebung, glueckszahl:g, t, stand:text}, keep).catch(()=>{}); }
  function brauche(uebung, g){ return !!(ENDPOINT && g && !geholt[uebung+"|"+g]); }
  function holen(uebung, g, key, fertig){
    if(!brauche(uebung, g)){ fertig(); return; }
    geholt[uebung+"|"+g] = true;
    let erledigt = false; const weiter = ()=>{ if(!erledigt){ erledigt = true; fertig(); } };
    setTimeout(weiter, 4000);
    post({typ:"stand-laden", uebung, glueckszahl:g}).then(d=>{
      if(erledigt) return;
      let text = store.get(key), lokal = null; try{ lokal = JSON.parse(text||"null"); }catch(e){}
      const tl = (lokal && lokal.t) || 0, tr = (d && d.ok && d.stand) ? (Number(d.t)||0) : -1;
      if(tr > tl) store.set(key, d.stand);
      else if(lokal && tl >= tr && !(d && d.stand === text)) senden(uebung, g, text, tl || Date.now());
    }).catch(()=>{}).finally(weiter);
  }
  function merken(uebung, g, text, t){ if(!ENDPOINT || !g) return; offen = {uebung, g, text, t}; clearTimeout(timer); timer = setTimeout(()=>jetzt(false), 5000); }
  function jetzt(keep){ clearTimeout(timer); if(offen){ const o = offen; offen = null; senden(o.uebung, o.g, o.text, o.t, keep); } }
  document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="hidden") jetzt(true); });
  window.addEventListener("pagehide", ()=>jetzt(true));
  return {brauche, holen, merken, jetzt};
})();

/* ===== Start ===== */
function trainerStart(){
  app = document.getElementById("app"); pill = document.getElementById("pill");
  GOAL = Object.fromEntries(GOALS.map(g=>[g.id,g]));
  document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="hidden") sendPending(); });
  window.addEventListener("pagehide", sendPending);
  pill.onclick = otherNumber;
  recoverPending();
  home();
  flush();
}
