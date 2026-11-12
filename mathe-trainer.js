/* =====================================================================
   Lernportal 6b – gemeinsame Grundlage der Mathe-Trainer
   (ab den Matheplänen «Proportionalität», «Umgekehrte Proportionalität»,
   «Wertepaare und Wertetabellen»)

   Gleicher Ablauf wie die bisherigen Mathe-Trainer:
   - Anmeldung nur mit der Glückszahl (1 bis 21), nie mit einem Namen
   - Lernziele mit drei Stufen (Einstieg · wie im Test · knifflig); die erste Aufgabe
     eines Lernziels kommt auf Stufe 2 (Einstufung)
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
const NEED = 5;              // so viele Punkte braucht es pro Stufe
const STREAK = 3;            // oder so viele richtige Antworten hintereinander
const LEVELS = 3;
const LVNAME = ["","Stufe 1 · Einstieg","Stufe 2 · wie im Test","Stufe 3 · knifflig"];
let gz = (store.get("uebung.gz")||store.get("dz.gz")||store.get("rs.gz")||"").replace(/\D/g,"");
const gzGueltig = v => /^\d{1,2}$/.test(String(v)) && +v >= 1 && +v <= 21;   // Glückszahlen der Klasse: 1 bis 21
if(gz && !gzGueltig(gz)) gz = "";
let P = null, S = null;

function pkey(){ return "uebung.p."+UEBUNG+"."+gz; }
function loadP(){ try{ P = JSON.parse(store.get(pkey())||"null"); }catch(e){ P=null; } if(!P||!P.goals) P={goals:{}, last:null}; }
function saveP(){ P.t = Date.now(); const txt = JSON.stringify(P); store.set(pkey(), txt); STAND.merken(UEBUNG, gz, txt, P.t); }
function gs(id){ return P.goals[id] || (P.goals[id]={lv:1, pr:0, done:false, n:0, ok:0}); }

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
  /* Kommt das Kind über «… üben» aus dem Lernportal, startet genau dieses Lernziel (nur einmal) */
  const zp = new URLSearchParams(location.search).get("ziel");
  if(zp && GOAL[zp] && !startAuto.ziel){ startAuto.ziel = true; try{ history.replaceState(null, "", location.pathname + location.hash); }catch(e){} return startGoal(zp); }
  const last = P.last && GOAL[P.last] && !gs(P.last).done ? P.last : null;
  const open = GOALS.find(g=>!gs(g.id).done && !g.erw) || GOALS.find(g=>!gs(g.id).done);
  startGoal(last || (open ? open.id : pick(GOALS).id));
}
function otherNumber(){ sendPending(); STAND.jetzt(true); S = null; gz = ""; store.set("uebung.gz", ""); home(); }

function startGoal(id){
  P.last = id; saveP();
  S = {mode:"goal", goal:id, log:[], pending:[], nr:0};
  next();
}

function next(){
  const id = S.goal;
  const st = gs(id);
  let lv = st.lv;
  const probe = st.lv===1 && st.pr===0 && !st.done && !st.probed;   // Einstufung: gleich mit Stufe 2 beginnen
  if(probe) lv = 2;
  const sig = t=>t.type+"|"+String(t.html||"").replace(/<[^>]*>/g,"").replace(/[0-9.,’'\/]+/g,"#").slice(0,70);
  let t;
  for(let k=0;k<60;k++){ const c = GOAL[id].gen(lv); if(!c || lzkGesperrt(c, id)) continue; t = c; if(!S.lastSig || sig(c)!==S.lastSig) break; }
  for(let k=0; !t && k<2000; k++){ const c = GOAL[id].gen(lv); if(c && !lzkGesperrt(c, id)) t = c; }   // nie eine Testaufgabe
  S.lastSig = sig(t);
  t.goal = id; t.lv = lv; t.probe = probe;
  S.task = t; S.done = false; S.nr++;
  draw();
}

const inp = (id, cls="", mode="decimal")=>`<input class="ans ${cls}" id="${id}" inputmode="${mode}" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="?">`;
const fracInput = (a,b)=>`<span class="fin">${inp(a,"small","numeric")}<i></i>${inp(b,"small","numeric")}</span>`;

function head(){
  const g = GOAL[S.task.goal], s = gs(g.id);
  let dots=""; for(let i=0;i<NEED;i++) dots+=`<i class="${i<s.pr?"on":""}"></i>`;
  return `<div class="sesshead"><span class="qtype" style="background:${g.c}1a;color:${g.c};margin:0">${g.ic} ${g.code?g.code+" · ":""}${g.title}</span></div>
    <div class="sesshead"><b>${s.done?"Alle Stufen geschafft – du übst weiter auf Stufe 3":LVNAME[s.lv]}</b><span class="grow"></span><span class="dots">${dots}<span>${s.pr}/${NEED}${(s.streak||0)>0?` · 🔥 ${s.streak} in Folge`:""}</span></span></div>`;
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
      <details class="help"><summary>💡 So geht's</summary>${g.help()}</details>
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
  // Wer nach unten gescrollt hat (z. B. zu «Weiter →»), sieht die neue Aufgabe von oben
  const oben = app.getBoundingClientRect().top;
  if(oben < 0) window.scrollBy(0, oben - 10);
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
  s.n++; if(ok) s.ok++;
  let toast = "";
  if(t.probe){
    s.probed = true;
    if(ok){ s.lv = 2; s.pr = 1; s.streak = 1; toast = `🚀 Stark! Das kannst du schon – Stufe 1 überspringst du.`; }
  } else if(ok){
    s.streak = (s.streak||0) + 1;
    s.pr = Math.min(NEED, s.pr+1);
    if(s.pr>=NEED || s.streak>=STREAK){
      const fast = s.pr<NEED;
      if(s.lv<LEVELS){ s.lv++; s.pr=0; s.streak=0; toast = `🎉 Stufe ${s.lv-1} geschafft${fast?` – ${STREAK} richtig hintereinander`:""}! Jetzt kommt <b>Stufe ${s.lv}</b>.`; }
      else if(!s.done){ s.done=true; s.pr=NEED; S.goalDone = true;
        const nx = nextGoal(g.id);
        toast = `🏆 Super! Du hast «${g.title}» geschafft.${nx?`<br>Weiter geht es mit <b>${GOAL[nx].title}</b>.`:"<br>Du hast alle Lernziele geschafft! Jetzt kommen gemischte Aufgaben."}`; }
      else s.pr = NEED;
    }
  } else { s.streak = 0; if(!s.done) s.pr = Math.max(0, s.pr-1); }
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
  const i = GOALS.findIndex(x=>x.id===from);
  const order = GOALS.slice(i+1).concat(GOALS.slice(0,i));
  const g = order.find(x=>!gs(x.id).done && !x.erw) || order.find(x=>!gs(x.id).done);
  return g ? g.id : null;
}
function go(){
  if(S.goalDone){
    S.goalDone = false;
    const nx = nextGoal(S.goal);
    sendPending();
    if(nx){ S.goal = nx; P.last = nx; saveP(); }
  }
  if(allDone()) S.goal = pick(GOALS).id;   // alles geschafft: gemischt weiterüben
  next();
}

/* ---------- Senden ---------- */
const QKEY = "uebung.queue";
function queue(){ try{ return JSON.parse(store.get(QKEY)||"[]"); }catch(e){ return []; } }
function sendOne(rec){
  return fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(rec),keepalive:true})
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
