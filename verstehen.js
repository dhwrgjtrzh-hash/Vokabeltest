/* =====================================================================
   Lernportal 6b – Hör- und Leseverstehen (gemeinsames Grundgerüst)
   Gleicher Aufbau wie das Leseverstehen Deutsch (lesen.html).

   Die Seite legt vorher fest:
     window.VERSTEHEN = {
       uebung:  "Hören",              // Name in der Station (Blatt «Runden», Spalte Übung)
       modus:   "hoeren" | "lesen",
       sprache: "de" | "en",          // Sprache der Texte und Fragen (Knöpfe bleiben deutsch)
       aufbau:  "stufen" | "units",   // Deutsch: Stufen mit Aufstieg · Englisch: nach Units von Young World 4
       texte:   [...],                // siehe hoeren-texte.js / englisch-texte.js
       audio:   "audio/hv/",          // Ordner der Aufnahmen (nur Hören), Datei = <id>.mp3
       stufen, stufenText,            // nur aufbau "stufen"
       units,                         // nur aufbau "units": {1:"The way we live", …}
       maxHoeren: 2,                  // so oft darf man den Text vor/während den Fragen hören
       beta: true
     }

   Hörtexte: rollen:{A:{name:"Lena"}, …}, teile:[["A","Was gesagt wird."], …], situation:"…"
   Lesetexte: absaetze:[[Satz, …], …] (wie lesen-texte.js)

   Fragearten: mc, multi, tf (auch «Wer sagt das?» mit wahl:[Namen]), kurz, ordnen,
   nur Lesen: beleg, wort, zuordnen
   ===================================================================== */
(function(){
const C = window.VERSTEHEN;
const HOEREN = C.modus === "hoeren", EN = C.sprache === "en", UNITS = C.aufbau === "units";
const VORSCHAU = /[?&]vorschau/.test(location.search);   // zum Ausprobieren: alle Texte offen, nichts wird gesendet
const MAX = C.maxHoeren || 2;
const BESTANDEN = 0.8, SB_GRENZE = 0.75;
const app = document.getElementById("app");
const $ = s => document.querySelector(s);
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const mische = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const store = { get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }, set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
const TEXTE = C.texte;
const TEXT = id => TEXTE.find(t => t.id === id);
const SB_TEXTE = TEXTE.filter(t => t.sb).sort((a,b)=>a.stufe-b.stufe);
const texteDerStufe = s => TEXTE.filter(t => !t.sb && t.stufe === s);
const texteDerUnit = u => TEXTE.filter(t => t.unit === u);
const hoechsteStufe = UNITS ? 0 : Math.max(...TEXTE.filter(t=>!t.sb).map(t=>t.stufe));
const sauber = w => w.replace(/^[«»"„“”'(]+|[«»"„“”'.,;:!?)]+$/g, "");
const zeitFmt = s => { s = Math.max(0, Math.round(s||0)); return Math.floor(s/60) + ":" + String(s%60).padStart(2,"0"); };

const FAEHIG = HOEREN
  ? {finden:"Einzelheiten heraushören", verbinden:"Informationen verbinden", schliessen:"Gefühle und Absichten erkennen", wortschatz:"Wörter verstehen", ganz:"Verstehen, worum es geht"}
  : {finden:"Informationen finden", verbinden:"Informationen verbinden", schliessen:"Zwischen den Zeilen lesen", wortschatz:"Wörter aus dem Zusammenhang verstehen", ganz:"Den ganzen Text verstehen"};
const TIPP = HOEREN ? {
  finden:"Lies vor dem Hören die Fragen. Dann weisst du, auf welche Zahlen, Namen und Orte du achten musst.",
  verbinden:"Merk dir beim Hören, was zuerst kommt und was danach. Beim zweiten Hören kannst du überprüfen.",
  schliessen:"Achte darauf, wie jemand spricht: fröhlich, ärgerlich, unsicher? Das verrät viel.",
  wortschatz:"Ein unbekanntes Wort verstehst du oft durch die Sätze davor und danach.",
  ganz:"Frag dich nach dem ersten Hören: Worum ging es eigentlich?"
} : {
  finden:"Lies die Frage genau und such im Text das passende Wort oder den passenden Satz.",
  verbinden:"Oft steht die Antwort an zwei Stellen. Lies auch den Satz davor und danach.",
  schliessen:"Frag dich: Warum macht die Figur das? Wie würdest du dich fühlen?",
  wortschatz:"Lies den ganzen Satz um das Wort herum. Er verrät, was das Wort bedeutet.",
  ganz:"Lies am Schluss jeden Abschnitt nochmals kurz an: Worum geht es hier?"
};
const TF_WAHL = HOEREN ? (EN ? ["True","False","Not said"] : ["Stimmt","Stimmt nicht","Wurde nicht gesagt"])
                       : (EN ? ["True","False","Not in the text"] : ["Stimmt","Stimmt nicht","Steht nicht im Text"]);
const TF_HILFE = EN ? (HOEREN ? "True = stimmt · False = stimmt nicht · Not said = wurde nicht gesagt" : "True = stimmt · False = stimmt nicht · Not in the text = steht nicht im Text") : "";

/* ===== Lernstand (pro Glückszahl, auch über mehrere Geräte) ===== */
let gz = "", P = null, S = null;
const pkey = () => "verstehen." + C.uebung + ".p." + gz;
const neuerStand = () => ({v:1, stufe: UNITS ? 0 : (SB_TEXTE.length ? 0 : 1), sb:null, texte:{}, faehig:{}, t:0});
function ladeP(){ try{ P = JSON.parse(store.get(pkey()) || "null"); }catch(e){ P = null; } if(!P || P.v !== 1) P = neuerStand(); }
let sendeTimer = null;
const post = body => fetch(window.LP.endpoint, {method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(body)}).then(r=>r.json());
function speichereP(){
  P.t = Date.now(); const txt = JSON.stringify(P); store.set(pkey(), txt);
  if(VORSCHAU) return;
  clearTimeout(sendeTimer); sendeTimer = setTimeout(() => post({typ:"stand-speichern", uebung:C.uebung, glueckszahl:gz, t:P.t, stand:txt}).catch(()=>{}), 1500);
}
const geholt = {};
function holeStand(weiter){
  if(VORSCHAU || geholt[gz] || !window.LP || !window.LP.endpoint){ weiter(); return; }
  geholt[gz] = true;
  let fertig = false; const w = () => { if(!fertig){ fertig = true; weiter(); } };
  setTimeout(w, 4000);
  post({typ:"stand-laden", uebung:C.uebung, glueckszahl:gz}).then(d => {
    if(fertig) return;
    const lokal = (() => { try{ return JSON.parse(store.get(pkey()) || "null"); }catch(e){ return null; } })();
    const tl = (lokal && lokal.t) || 0, tr = (d && d.ok && d.stand) ? (Number(d.t) || 0) : -1;
    if(tr > tl) store.set(pkey(), d.stand);
    else if(lokal && tl > 0) post({typ:"stand-speichern", uebung:C.uebung, glueckszahl:gz, t:tl, stand:JSON.stringify(lokal)}).catch(()=>{});
  }).catch(()=>{}).finally(w);
}

/* ===== Start ===== */
function start(){
  const g = VORSCHAU ? "vorschau" : window.LP ? window.LP.glueckszahl() : "";
  if(!g){ app.innerHTML = `<div class="karte"><h2>Gib zuerst deine Glückszahl ein.</h2><p class="leise">Tippe oben rechts auf den Knopf, falls das Fenster nicht erscheint.</p></div>`; setTimeout(start, 800); return; }
  if(g !== gz){ gz = g; P = null; }
  holeStand(home);
}
const betaBand = () => C.beta ? `<div class="beta-band">🧪 <b>Beta-Test:</b> Dieser Trainer ist neu. Wenn dir etwas komisch vorkommt, merk dir den Text und die Frage und sag es deiner Lehrperson.</div>` : "";
const zeichen = HOEREN ? "🎧" : "📖";

function home(){
  stoppeTon(); ladeP(); S = null;
  window.scrollTo(0, 0);
  if(UNITS) return homeUnits();
  if(SB_TEXTE.length && (!P.sb || !P.sb.fertig) && !VORSCHAU){
    const begonnen = P.sb && P.sb.erg ? Object.keys(P.sb.erg).length : 0;
    app.innerHTML = `${betaBand()}<div class="karte">
      <div class="stufe-kopf"><div class="stufe-nr">${zeichen}</div><div><h2>Standortbestimmung</h2><p class="leise" style="margin:0">${SB_TEXTE.length} kurze Texte. Danach weisst du, auf welcher Stufe du startest.</p></div></div>
      <div class="aktionen"><button class="btn" id="los">${begonnen ? `Weiter mit Text ${begonnen+1} →` : "Los geht's →"}</button></div></div>`;
    $("#los").onclick = () => starteSB();
    return;
  }
  const st = VORSCHAU ? 1 : P.stufe, liste = texteDerStufe(st);
  const geschafft = liste.filter(t => (P.texte[t.id]||{}).best >= BESTANDEN).length;
  const frueher = VORSCHAU ? [] : [1,2,3,4,5].filter(s => s < st && texteDerStufe(s).length);
  const spaeter = VORSCHAU ? [2,3,4,5].filter(s => texteDerStufe(s).length) : [];
  const naechste = texteDerStufe(st+1).length ? `Wenn du alle Texte dieser Stufe mit mindestens ${Math.round(BESTANDEN*100)} % geschafft hast, geht es weiter mit Stufe ${st+1}: ${C.stufen[st+1]}.`
    : geschafft === liste.length ? "🎉 Du hast alle Stufen geschafft! Du kannst jeden Text nochmals hören und dein Ergebnis verbessern."
    : "Das ist im Moment die höchste Stufe.";
  app.innerHTML = `${betaBand()}<div class="karte">
      <div class="stufe-kopf"><div class="stufe-nr">${st}</div><div><h2>Stufe ${st}: ${esc(C.stufen[st])}</h2><p class="leise" style="margin:0">${esc(C.stufenText[st])}</p></div></div>
      <div class="punkte">${liste.map(t => `<i class="${(P.texte[t.id]||{}).best >= BESTANDEN ? "gut" : ""}"></i>`).join("")}<span class="leise" style="font-size:.9rem;margin-left:6px">${geschafft} von ${liste.length} Texten geschafft</span></div>
      <div class="texte">${liste.map(textKarte).join("")}</div>
      ${naechste ? `<p class="leise" style="margin:14px 0 0;font-size:.95rem">${esc(naechste)}</p>` : ""}
    </div>
    ${frueher.length ? `<details class="mehr"><summary>Texte früherer Stufen nochmals ${HOEREN ? "hören" : "lesen"}</summary><div class="texte">${frueher.flatMap(s => texteDerStufe(s)).map(textKarte).join("")}</div></details>` : ""}
    ${spaeter.map(s => `<div class="karte" style="margin-top:14px"><h3>Vorschau Stufe ${s}: ${esc(C.stufen[s])}</h3><div class="texte">${texteDerStufe(s).map(textKarte).join("")}</div></div>`).join("")}
    ${staerken()}`;
  app.querySelectorAll(".textkarte").forEach(b => b.onclick = () => starteText(TEXT(b.dataset.id)));
}
function textKarte(t){
  const x = P.texte[t.id];
  const stat = !x ? `<span class="status">neu</span>` : x.best >= BESTANDEN ? `<span class="status gut">✓ ${Math.round(x.best*100)} %</span>` : `<span class="status">${Math.round(x.best*100)} %</span>`;
  return `<button class="textkarte" data-id="${t.id}"><b>${esc(t.titel)}</b>${stat}<span class="meta">${esc(t.art)}${t.thema ? " · " + esc(t.thema) : ""} · ${t.fragen.length} Fragen</span></button>`;
}
function homeUnits(){
  const nrn = Object.keys(C.units).map(Number).filter(u => texteDerUnit(u).length).sort((a,b) => b-a);
  const aktuell = nrn[0];
  const offen = Object.keys(C.units).map(Number).filter(u => !texteDerUnit(u).length && u > aktuell);
  app.innerHTML = `${betaBand()}<div class="karte">
      ${nrn.map(u => { const liste = texteDerUnit(u), geschafft = liste.filter(t => (P.texte[t.id]||{}).best >= BESTANDEN).length;
        return `<section class="unit ${u === aktuell ? "aktuell" : ""}">
          <div class="unit-kopf"><div class="unit-nr">Unit<br>${u}</div><div><h2 style="margin:0">${esc(C.units[u])}</h2>
          <p class="leise" style="margin:2px 0 0;font-size:.92rem">${geschafft} von ${liste.length} Texten geschafft</p></div></div>
          <div class="texte">${liste.map(textKarte).join("")}</div></section>`; }).join("")}
      ${offen.length ? `<div class="leer">Später kommen dazu: ${offen.map(u => `Unit ${u} «${esc(C.units[u])}»`).join(", ")}.</div>` : ""}
    </div>${staerken()}`;
  app.querySelectorAll(".textkarte").forEach(b => b.onclick = () => starteText(TEXT(b.dataset.id)));
}
/* Was gelingt schon gut? (aus allen beantworteten Fragen) */
function staerken(){
  const F = P.faehig || {}, keys = Object.keys(FAEHIG).filter(k => F[k] && F[k].n >= 3);
  if(keys.length < 2) return "";
  const zeile = k => { const p = Math.round(F[k].r / F[k].n * 100); return `<span>${esc(FAEHIG[k])}</span><span class="b"><i style="width:${p}%;background:${p>=80?"var(--gut)":p>=60?"#d39b16":"var(--falsch)"}"></i></span><b>${p} %</b>`; };
  const schwach = keys.filter(k => F[k].r / F[k].n < 0.7).sort((a,b) => F[a].r/F[a].n - F[b].r/F[b].n)[0];
  return `<details class="mehr"><summary>Was klappt schon gut?</summary><div class="karte" style="margin-top:10px">
    <div class="balken">${keys.map(zeile).join("")}</div>
    ${schwach ? `<p style="margin:12px 0 0">Darauf kannst du noch achten: <b>${esc(FAEHIG[schwach])}</b>. ${esc(TIPP[schwach])}</p>` : ""}</div></details>`;
}

/* ===== Eine Runde ===== */
function starteSB(){
  P.sb = P.sb || {erg:{}};
  const naechster = SB_TEXTE.find(t => !(t.id in P.sb.erg));
  if(!naechster) return sbAbschluss();
  starteText(naechster, true);
}
function starteText(t, sb){
  stoppeTon();
  S = {t, sb:!!sb, i:-1, log:[], start:Date.now(), lesezeit:0, fragen:t.fragen.map(q => vorbereiten(q)), hoerzahl:0, gehoert:false, frei:false, langsam:false, langsamGenutzt:false};
  if(HOEREN){ ladeTon(t); zeigeVor(); } else zeigeText();
}
function vorbereiten(q){
  const x = Object.assign({}, q);
  if(q.typ === "mc" || q.typ === "beleg") x.optionen = mische([q.richtig].concat(q.falsch));
  if(q.typ === "multi") x.optionen = mische(q.richtig.concat(q.falsch));
  if(q.typ === "ordnen") { do { x.pool = mische(q.items); } while(x.pool.join("|") === q.items.join("|")); }
  return x;
}
const kopfArt = t => S.sb ? "Standortbestimmung · " : UNITS ? `Unit ${t.unit} · ` : `Stufe ${t.stufe} · `;

/* ----- Lesen ----- */
function textHtml(t){
  let n = 0;
  const mehrere = t.absaetze.length > 1;
  return t.absaetze.map((a, ai) => `<p>${mehrere ? `<span class="absnr" title="Abschnitt ${ai+1}">${ai+1}</span>` : ""}${a.map(s => `<span class="satz" data-s="${n++}">${s.split(" ").map(w => `<span class="w" data-w="${esc(sauber(w))}">${esc(w)}</span>`).join(" ")}</span>`).join(" ")}</p>`).join("");
}
const saetze = t => t.absaetze ? t.absaetze.flat() : t.teile.map(x => x[1]);
function zeigeText(){
  const t = S.t;
  app.innerHTML = `<div class="lesen"><div class="karte textbox" id="textbox">
      <div class="art">${kopfArt(t)}${esc(t.art)}</div>
      <h2>${esc(t.titel)}</h2>${t.hilfe ? `<p class="leise" style="font-size:.95rem">${esc(t.hilfe)}</p>` : ""}<div id="text">${textHtml(t)}</div>${woerterHtml(t)}</div>
      <div class="aktionen"><button class="btn" id="fertig">Ich habe den Text gelesen → zu den Fragen</button><button class="btn zweit" id="abbruch">Abbrechen</button></div></div>`;
  $("#fertig").onclick = () => { S.lesezeit = Date.now() - S.start; S.i = 0; zeigeFrage(); };
  $("#abbruch").onclick = home;
  window.scrollTo(0, 0);
}
/* Wörterhilfe unter dem Text (z. B. neue Wörter in Englisch) */
const woerterHtml = t => t.woerter && t.woerter.length ? `<p class="leise" style="font-size:.92rem;margin:12px 0 0;border-top:1.5px solid var(--linie);padding-top:10px">${t.woerter.map(([w,d]) => `<b>${esc(w)}</b> = ${esc(d)}`).join(" · ")}</p>` : "";

/* ----- Hören ----- */
function ladeTon(t){
  const a = new Audio();
  a.preload = "auto";
  a.src = C.audio + t.id + ".mp3";
  try{ a.preservesPitch = true; a.webkitPreservesPitch = true; }catch(e){}
  a.addEventListener("timeupdate", zeigeSpieler);
  a.addEventListener("loadedmetadata", zeigeSpieler);
  a.addEventListener("play", zeigeSpieler);
  a.addEventListener("pause", zeigeSpieler);
  a.addEventListener("ended", () => { if(!S) return; const erstes = !S.gehoert; S.gehoert = true; zeigeSpieler(); if(erstes && S.i < 0) vorBereit(); });
  a.addEventListener("error", () => { if(!S) return; S.tonFehler = true; zeigeSpieler(); });
  S.audio = a;
}
function stoppeTon(){ if(S && S.audio){ try{ S.audio.pause(); }catch(e){} } }
const spielerHtml = oben => `<div class="spieler ${oben ? "oben" : ""}" id="spieler">
    <button class="play" id="spPlay" aria-label="Anhören">▶</button>
    <div class="mitte"><div class="zeile1"><span id="spTitel">Anhören</span><span class="zeit" id="spZeit"></span></div>
      <div class="leiste"><i id="spLeiste"></i></div><div class="info" id="spInfo"></div></div>
    <button class="tempo" id="spTempo" title="Langsamer abspielen">🐢 langsamer</button></div>`;
function bindeSpieler(){
  const b = $("#spPlay"); if(!b) return;
  b.onclick = () => {
    const a = S.audio; if(!a) return;
    if(!a.paused){ a.pause(); return; }
    const mitten = a.currentTime > 0.05 && !a.ended && a.currentTime < (a.duration || 1e9) - 0.05;
    if(!mitten){
      if(!S.frei && S.hoerzahl >= MAX) return;
      a.currentTime = 0; S.hoerzahl++;
    }
    a.playbackRate = S.langsam ? 0.8 : 1;
    S.tonFehler = false;
    const p = a.play(); if(p && p.catch) p.catch(() => { S.tonFehler = true; if(!mitten) S.hoerzahl = Math.max(0, S.hoerzahl - 1); zeigeSpieler(); });
    zeigeSpieler();
  };
  $("#spTempo").onclick = () => { S.langsam = !S.langsam; if(S.langsam) S.langsamGenutzt = true; if(S.audio) S.audio.playbackRate = S.langsam ? 0.8 : 1; zeigeSpieler(); };
  zeigeSpieler();
}
function zeigeSpieler(){
  const b = $("#spPlay"); if(!b || !S || !S.audio) return;
  const a = S.audio, dauer = isFinite(a.duration) ? a.duration : 0;
  const laeuft = !a.paused && !a.ended;
  const mitten = a.currentTime > 0.05 && !a.ended && a.currentTime < dauer - 0.05;
  const rest = S.frei ? Infinity : MAX - S.hoerzahl;
  b.textContent = laeuft ? "⏸" : "▶";
  b.setAttribute("aria-label", laeuft ? "Pause" : "Anhören");
  b.disabled = !laeuft && !mitten && rest <= 0;
  $("#spTitel").textContent = laeuft ? "Hör gut zu …" : mitten ? "Pause – weiter mit ▶" : S.hoerzahl === 0 ? "Text anhören" : rest > 0 ? "Nochmals anhören" : "Fertig angehört";
  $("#spZeit").textContent = dauer ? zeitFmt(a.currentTime) + " / " + zeitFmt(dauer) : "";
  $("#spLeiste").style.width = dauer ? Math.min(100, a.currentTime / dauer * 100) + "%" : "0";
  $("#spTempo").classList.toggle("an", S.langsam);
  $("#spInfo").innerHTML = S.tonFehler ? `<span style="color:var(--falsch);font-weight:700">Der Ton startet nicht. Ist das WLAN an? Tippe nochmals auf ▶.</span>`
    : S.frei ? "Du kannst den Text jetzt so oft hören, wie du willst."
    : rest === MAX ? `Du kannst den Text ${MAX === 2 ? "zweimal" : MAX + "-mal"} anhören. Mit ⏸ kannst du anhalten.`
    : rest > 0 ? `Du kannst ihn noch ${rest === 1 ? "einmal" : rest + "-mal"} anhören.`
    : `Du hast den Text ${MAX === 2 ? "zweimal" : MAX + "-mal"} gehört.`;
}
function vorschauFrage(q){
  if(q.typ === "tf") return `<li>${esc(q.frage)}<ul>${q.aussagen.map(([a]) => `<li>${esc(a)}</li>`).join("")}</ul></li>`;
  return `<li>${esc(q.frage)}</li>`;
}
function zeigeVor(){
  const t = S.t;
  app.innerHTML = `<div class="lesen"><div class="karte textbox">
      <div class="art">${kopfArt(t)}${esc(t.art)}</div>
      <h2>${esc(t.titel)}</h2>
      ${t.situation ? `<div class="situation">${esc(t.situation)}</div>` : ""}
      ${t.woerter && t.woerter.length ? woerterHtml(t).replace('margin:12px 0 0;border-top:1.5px solid var(--linie);padding-top:10px','margin:0 0 12px') : ""}
      <p style="margin:0 0 4px"><b>${EN ? "Lies zuerst die Fragen. Dann weisst du, worauf du beim Hören achten musst:" : "Lies zuerst die Fragen. Dann weisst du, worauf du beim Hören achten musst:"}</b></p>
      <ol class="vorschau-fragen">${S.fragen.map(vorschauFrage).join("")}</ol>
    </div>
    ${spielerHtml(false)}
    <div class="aktionen"><button class="btn" id="fragen" ${S.gehoert || VORSCHAU ? "" : "disabled"}>Zu den Fragen →</button><button class="btn zweit" id="abbruch">Abbrechen</button></div>
    <p class="leise" id="vorHinweis" style="margin:0;font-size:.92rem">${S.gehoert ? "" : "Hör den Text zuerst einmal ganz an. Dann geht es zu den Fragen."}</p></div>`;
  bindeSpieler();
  $("#fragen").onclick = () => { S.i = 0; zeigeFrage(); };
  $("#abbruch").onclick = home;
  window.scrollTo(0, 0);
}
function vorBereit(){ const b = $("#fragen"); if(b){ b.disabled = false; const h = $("#vorHinweis"); if(h) h.textContent = "Super. Jetzt kommen die Fragen. Du kannst den Text dort noch einmal hören."; b.focus({preventScroll:true}); } }

/* ===== Frage zeigen ===== */
function zeigeFrage(){
  const t = S.t, q = S.fragen[S.i], n = S.fragen.length;
  S.antwort = {wahl:null, multi:new Set(), satz:null, wort:null, tf:{}, ordnung:[], zuord:{}, text:""};
  S.geprueft = false;
  const prog = S.fragen.map((_,k) => { const l = S.log[k]; return `<i class="${k === S.i ? "jetzt" : l ? (l.punkte ? "gut" : "nein") : ""}"></i>`; }).join("");
  const fragebox = `<div class="karte fragebox" id="fragebox">
        <div class="fortschritt">${prog}</div>
        <div class="leise" style="font-size:.9rem;font-weight:700">Frage ${S.i+1} von ${n}</div>
        <div class="frage">${esc(q.frage)}${q.hilfe ? `<span class="hilfe-de">${esc(q.hilfe)}</span>` : ""}</div>
        <div id="hinweis"></div>
        <div id="eingabe"></div>
        <div id="meldung"></div>
        <div class="aktionen" id="aktionen"><button class="btn" id="pruefen">Prüfen</button></div>
      </div>`;
  if(HOEREN){
    app.innerHTML = `<div class="lesen">${spielerHtml(true)}${fragebox}</div>`;
    bindeSpieler();
  } else {
    app.innerHTML = `<div class="lesen fragen">${fragebox}
      <div class="karte textbox" id="textbox">
        <div class="art">${esc(t.art)}</div><h2>${esc(t.titel)}</h2><div id="text">${textHtml(t)}</div>${woerterHtml(t)}
      </div></div>`;
  }
  baueEingabe(q);
  $("#pruefen").onclick = pruefen;
  window.scrollTo(0, 0);
}
const textEl = () => $("#text");
function modus(m){ const el = textEl(); if(!el) return; el.classList.toggle("wahl-satz", m === "satz"); el.classList.toggle("wahl-wort", m === "wort"); }
function hinweis(txt){ $("#hinweis").innerHTML = txt ? `<p class="hinweis">${txt}</p>` : ""; }
function fehlt(txt){ const m = $("#meldung"); m.innerHTML = `<p class="fehltext">${esc(txt)}</p>`; const f = $("#fragebox"); f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake"); }

function baueEingabe(q){
  const E = $("#eingabe"), A = S.antwort;
  const optKnopf = (o, i, multi) => `<button class="opt ${multi ? "multi" : ""}" data-i="${i}"><span class="k"></span><span>${esc(o)}</span></button>`;
  if(q.typ === "mc" || q.typ === "beleg"){
    E.innerHTML = `<div class="opts">${q.optionen.map((o,i) => optKnopf(o,i)).join("")}</div>`;
    E.querySelectorAll(".opt").forEach(b => b.onclick = () => { if(S.geprueft) return; A.wahl = +b.dataset.i; E.querySelectorAll(".opt").forEach(x => x.classList.toggle("an", x === b)); $("#meldung").innerHTML = "";
      if(q.typ === "beleg"){ modus("satz"); hinweis(`<b>Und jetzt:</b> Tippe im Text auf den Satz, der deine Antwort zeigt.${innerWidth < 860 ? " Der Text steht weiter unten." : ""}`); } });
    if(q.typ === "beleg") hinweis("Wähle zuerst eine Antwort. Danach tippst du im Text auf den Satz, wo es steht.");
  }
  if(q.typ === "multi"){
    hinweis("Es können mehrere Antworten richtig sein.");
    E.innerHTML = `<div class="opts">${q.optionen.map((o,i) => optKnopf(o,i,true)).join("")}</div>`;
    E.querySelectorAll(".opt").forEach(b => b.onclick = () => { if(S.geprueft) return; const i = +b.dataset.i; A.multi.has(i) ? A.multi.delete(i) : A.multi.add(i); b.classList.toggle("an", A.multi.has(i)); $("#meldung").innerHTML = ""; });
  }
  if(q.typ === "tf"){
    const wahl = q.wahl || TF_WAHL;
    if(!q.wahl && TF_HILFE) hinweis(esc(TF_HILFE));
    E.innerHTML = `<div class="tf">${q.aussagen.map(([a],i) => `<div class="aus" data-i="${i}"><p>${esc(a)}</p><div class="pills">${wahl.map(w => `<button class="pill" data-w="${esc(w)}">${esc(w)}</button>`).join("")}</div></div>`).join("")}</div>`;
    E.querySelectorAll(".aus").forEach(z => z.querySelectorAll(".pill").forEach(p => p.onclick = () => { if(S.geprueft) return; A.tf[z.dataset.i] = p.dataset.w; z.querySelectorAll(".pill").forEach(x => x.classList.toggle("an", x === p)); $("#meldung").innerHTML = ""; }));
  }
  if(q.typ === "wort"){
    modus("wort");
    hinweis(innerWidth < 860 ? "Der Text steht weiter unten. Tippe dort auf das Wort." : "Tippe im Text auf das Wort.");
    E.innerHTML = `<p style="margin:0">Dein Wort: <b id="wortwahl" class="leise">noch keines</b></p>`;
  }
  if(q.typ === "kurz"){
    hinweis(EN ? "Schreib auf Englisch. Ein Wort, eine Zahl oder ein paar Wörter genügen." : "Ein Wort oder eine Zahl genügt.");
    E.innerHTML = `<input class="kurz" id="kurz" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${EN ? "Answer …" : "Antwort hier schreiben …"}">`;
    const f = $("#kurz"); f.oninput = () => { A.text = f.value; $("#meldung").innerHTML = ""; }; f.onkeydown = e => { if(e.key === "Enter"){ e.preventDefault(); S.geprueft ? weiter() : pruefen(); } };
    if(innerWidth >= 860) f.focus({preventScroll:true});
  }
  if(q.typ === "ordnen"){
    hinweis("Tippe die Kärtchen in der richtigen Reihenfolge an. Tippst du ein gewähltes Kärtchen nochmals an, kommt es zurück.");
    const zeichne = () => {
      E.innerHTML = `<div class="ordnen"><div class="gewaehlt-liste">${A.ordnung.map((it,k) => `<div class="g" data-k="${k}"><b>${k+1}</b><span>${esc(it)}</span></div>`).join("")}</div>
        <div class="opts">${q.pool.filter(it => !A.ordnung.includes(it)).map(it => `<button class="opt" data-it="${esc(it)}"><span class="k"></span><span>${esc(it)}</span></button>`).join("")}</div></div>`;
      E.querySelectorAll(".opt").forEach(b => b.onclick = () => { if(S.geprueft) return; A.ordnung.push(b.dataset.it); $("#meldung").innerHTML = ""; zeichne(); });
      E.querySelectorAll(".g").forEach(g => g.onclick = () => { if(S.geprueft) return; A.ordnung.splice(+g.dataset.k, 1); zeichne(); });
    };
    zeichne();
  }
  if(q.typ === "zuordnen"){
    const n = S.t.absaetze.length;
    hinweis("Die Abschnitte sind im Text nummeriert.");
    E.innerHTML = `<div class="zuord">${q.titel.map(([ti],i) => `<label data-i="${i}"><span>${esc(ti)}</span><select data-i="${i}"><option value="">Abschnitt …</option>${Array.from({length:n},(_,k)=>`<option value="${k+1}">Abschnitt ${k+1}</option>`).join("")}</select></label>`).join("")}</div>`;
    E.querySelectorAll("select").forEach(s => s.onchange = () => { A.zuord[s.dataset.i] = s.value ? +s.value : null; $("#meldung").innerHTML = ""; });
  }
  // Klicks im Text (Satz oder Wort wählen) – nur beim Lesen
  if(textEl()) textEl().onclick = e => {
    if(S.geprueft) return;
    if(q.typ === "beleg" && textEl().classList.contains("wahl-satz")){
      const s = e.target.closest(".satz"); if(!s) return;
      A.satz = +s.dataset.s; textEl().querySelectorAll(".satz").forEach(x => x.classList.toggle("gewaehlt", x === s)); $("#meldung").innerHTML = "";
      hinweis("Gut. Jetzt kannst du prüfen.");
      if(innerWidth < 860) $("#fragebox").scrollIntoView({behavior:"smooth", block:"start"});
    }
    if(q.typ === "wort"){
      const w = e.target.closest(".w"); if(!w) return;
      A.wort = w.dataset.w; textEl().querySelectorAll(".w").forEach(x => x.classList.toggle("gewaehlt", x === w));
      const ww = $("#wortwahl"); ww.textContent = "«" + A.wort + "»"; ww.classList.remove("leise"); $("#meldung").innerHTML = "";
      if(innerWidth < 860) $("#fragebox").scrollIntoView({behavior:"smooth", block:"start"});
    }
  };
}

/* ===== Prüfen ===== */
const norm = s => String(s||"").normalize("NFC").replace(/ß/g,"ss").replace(/[’‘`´]/g,"'").toLowerCase().replace(/[«»"„“”.,;:!?]/g,"").replace(/(^|\s)'|'(\s|$)/g,"$1$2").replace(/\s+/g," ").trim();
const VORWORT = EN ? /^(in|on|at|to|from|by|for|the|a|an|about|around|it|its|it's|is|are|was|were|they|he|she|we|you|i)\s+/
                   : /^(in|im|auf|am|an|aus|bei|beim|der|die|das|den|dem|ein|eine|einen|gleis|um|ca|etwa|ungefähr)\s+/;
const ohneVorwort = s => { let x = s, alt; do { alt = x; x = x.replace(VORWORT, ""); } while(x !== alt); return x; };
function abstand(a, b){ const m = a.length, n = b.length, d = Array.from({length:m+1}, (_,i) => [i].concat(Array(n).fill(0))); for(let j=1;j<=n;j++) d[0][j] = j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (a[i-1]===b[j-1]?0:1)); return d[m][n]; }
const passt = (a, b) => a === b || (b.length >= 5 && abstand(a, b) <= 1);
/* Auch kurze ganze Sätze gelten: Die Lösung muss vorkommen, alle anderen Wörter stammen aus der Frage oder sind Füllwörter.
   Aufzählungen zum Raten und Verneinungen zählen nicht. */
const FUELL = new Set((EN
  ? "the a an it is are was were they he she we i you its their his her my our in on at to of for by with from and about around there this that be has have had do does did can will it's they're he's she's there's every each one ones some lot lots very really"
  : "der die das den dem des ein eine einen einem einer es er sie ihn ihm ihr ihre ihren sein seine seinen man ist sind war waren hat haben heisst heissen nennt nennen in im ins auf am an aus bei beim um ab bis zu zum zur mit von vom nach etwa ca ungefähr pro nummer nr dann jetzt da dort so").split(" "));
const NEIN = new Set((EN ? "not no never don't doesn't didn't isn't aren't wasn't weren't can't cannot won't or nor" : "nicht kein keine keinen keiner nie oder").split(" "));
function kurzRichtig(eingabe, loesungen, frage){
  const a = ohneVorwort(norm(eingabe));
  if(loesungen.some(l => passt(a, ohneVorwort(norm(l))))) return true;
  const w = norm(eingabe).split(" ").filter(Boolean);
  if(w.length < 2 || w.length > 12 || w.some(x => NEIN.has(x))) return false;
  const erlaubt = new Set([...FUELL, ...norm(frage).split(" ")]);
  return loesungen.some(l => { const b = ohneVorwort(norm(l)).split(" "), k = b.length;
    if(b.some(x => NEIN.has(x))) return false;
    for(let i = 0; i + k <= w.length; i++){
      if(!passt(w.slice(i, i+k).join(" "), b.join(" "))) continue;
      if(w.every((x, j) => (j >= i && j < i+k) || erlaubt.has(x))) return true;
    }
    return false; });
}
const belegIdx = q => { if(!S.t.absaetze) return []; const S_ = saetze(S.t); return [].concat(q.beleg||[]).flatMap(b => S_.map((s,i) => s.includes(b) ? i : -1).filter(i => i >= 0)); };

function pruefen(){
  const q = S.fragen[S.i], A = S.antwort;
  const leer = {
    mc: () => A.wahl == null && "Wähle zuerst eine Antwort.",
    beleg: () => A.wahl == null ? "Wähle zuerst eine Antwort." : A.satz == null && "Tippe noch im Text auf den Satz, der deine Antwort zeigt.",
    multi: () => !A.multi.size && "Wähle mindestens eine Antwort.",
    tf: () => Object.keys(A.tf).length < q.aussagen.length && "Beurteile zuerst alle Aussagen.",
    wort: () => !A.wort && "Tippe zuerst im Text auf ein Wort.",
    kurz: () => !norm(A.text) && "Schreib zuerst eine Antwort.",
    ordnen: () => A.ordnung.length < q.items.length && "Ordne zuerst alle Kärtchen.",
    zuordnen: () => q.titel.some((_,i) => !A.zuord[i]) && "Wähle für jede Überschrift einen Abschnitt."
  }[q.typ]();
  if(leer) return fehlt(leer);
  S.geprueft = true; modus("");
  if(q.typ === "beleg" || q.typ === "wort") hinweis("");
  let ok = false, antwort = "", loesung = "", zusatz = "";
  const E = $("#eingabe"), B = belegIdx(q);
  if(q.typ === "mc" || q.typ === "beleg"){
    const r = q.optionen.indexOf(q.richtig); ok = A.wahl === r; antwort = q.optionen[A.wahl]; loesung = q.richtig;
    E.querySelector(".opts").classList.add("zu");
    E.querySelectorAll(".opt").forEach(b => { const i = +b.dataset.i; b.classList.remove("an"); if(i === r) b.classList.add("richtig"); else if(i === A.wahl) b.classList.add("falsch"); });
    if(q.typ === "beleg"){
      const satzOk = B.includes(A.satz);
      antwort += " · Satz " + (A.satz + 1) + (satzOk ? " (richtig)" : " (falsch)");
      if(ok && !satzOk) zusatz = "Die Antwort stimmt, aber der Satz nicht. Gelb markiert ist der Satz, wo es steht.";
      ok = ok && satzOk;
      textEl().querySelectorAll(".satz").forEach(x => x.classList.remove("gewaehlt"));
    }
  }
  if(q.typ === "multi"){
    const R = new Set(q.richtig.map(r => q.optionen.indexOf(r)));
    ok = R.size === A.multi.size && [...R].every(i => A.multi.has(i));
    antwort = [...A.multi].map(i => q.optionen[i]).join(" | "); loesung = q.richtig.join(" | ");
    E.querySelector(".opts").classList.add("zu");
    E.querySelectorAll(".opt").forEach(b => { const i = +b.dataset.i; b.classList.remove("an"); if(R.has(i)) b.classList.add(A.multi.has(i) ? "richtig" : "fehlt"); else if(A.multi.has(i)) b.classList.add("falsch"); });
    if(!ok) zusatz = "Grün umrandet sind alle richtigen Antworten.";
  }
  if(q.typ === "tf"){
    ok = q.aussagen.every(([a,v],i) => A.tf[i] === v);
    antwort = q.aussagen.map(([a],i) => A.tf[i]).join(" | "); loesung = q.aussagen.map(([a,v]) => v).join(" | ");
    E.querySelectorAll(".aus").forEach(z => { const i = +z.dataset.i, v = q.aussagen[i][1]; z.classList.add(A.tf[i] === v ? "richtig" : "falsch");
      z.querySelectorAll(".pill").forEach(p => { if(p.dataset.w === v && A.tf[i] !== v) p.classList.add("loes"); }); });
    if(!ok){ const f = q.aussagen.filter(([a,v],i) => A.tf[i] !== v).length; zusatz = `${f === 1 ? "Eine Aussage ist" : f + " Aussagen sind"} noch nicht richtig. Die richtige Antwort ist grün umrandet.`; }
  }
  if(q.typ === "wort"){
    ok = q.loesung.some(l => norm(l) === norm(A.wort)); antwort = A.wort; loesung = q.loesung[0];
    textEl().querySelectorAll(".w").forEach(x => { x.classList.remove("gewaehlt"); if(q.loesung.some(l => norm(l) === norm(x.dataset.w))) x.classList.add("loesung"); });
    if(!ok) zusatz = `Gesucht war «${q.loesung[0]}» – im Text grün markiert.`;
  }
  if(q.typ === "kurz"){
    ok = kurzRichtig(A.text, q.loesung, q.frage); antwort = A.text.trim(); loesung = q.loesung[0];
    $("#kurz").readOnly = true; $("#kurz").style.borderColor = ok ? "var(--gut)" : "var(--falsch)";
    if(!ok) zusatz = `Richtig wäre: «${q.loesung[0]}».`;
  }
  if(q.typ === "ordnen"){
    ok = A.ordnung.join("|") === q.items.join("|"); antwort = A.ordnung.join(" → "); loesung = q.items.join(" → ");
    if(!ok) zusatz = `<span>So ist die richtige Reihenfolge:</span><ol style="margin:6px 0 0;padding-left:22px">${q.items.map(it => `<li>${esc(it)}</li>`).join("")}</ol>`;
    E.querySelectorAll(".g").forEach((g,k) => g.style.background = A.ordnung[k] === q.items[k] ? "var(--gut-bg)" : "var(--falsch-bg)");
  }
  if(q.typ === "zuordnen"){
    ok = q.titel.every(([ti,a],i) => A.zuord[i] === a);
    antwort = q.titel.map(([ti],i) => ti + "→" + A.zuord[i]).join(" | "); loesung = q.titel.map(([ti,a]) => ti + "→" + a).join(" | ");
    E.querySelectorAll("label").forEach(l => { const i = +l.dataset.i, a = q.titel[i][1]; l.classList.add(A.zuord[i] === a ? "richtig" : "falsch"); const s = l.querySelector("select"); s.disabled = true;
      if(A.zuord[i] !== a){ const k = document.createElement("span"); k.style.cssText = "grid-column:1/3;font-weight:400;font-size:.92rem"; k.textContent = "Richtig: Abschnitt " + a; l.append(k); } });
  }
  B.forEach(i => { const el = textEl() && textEl().querySelector(`.satz[data-s="${i}"]`); if(el) el.classList.add("beleg", ...(ok ? ["gut"] : [])); });
  const LOB = HOEREN ? ["Richtig!", "Genau!", "Stimmt!", "Gut zugehört!"] : ["Richtig!", "Genau!", "Stimmt!", "Super gelesen!"];
  const belegTxt = B.length && !/gelb/i.test(zusatz) ? `<p>${ok ? "Im Text markiert: Hier steht es." : "Im Text gelb markiert: Hier steht es."}</p>` : "";
  const erkl = q.erkl ? `<p>${esc(q.erkl)}</p>` : "";
  $("#meldung").innerHTML = `<div class="meldung ${ok ? "gut" : "nein"}">${ok ? LOB[Math.floor(Math.random()*LOB.length)] : "Nicht ganz."}${zusatz ? `<div class="zus">${zusatz.startsWith("<") ? zusatz : esc(zusatz)}</div>` : ""}${!ok ? erkl : ""}${belegTxt}</div>`;
  S.log[S.i] = {frage: q.typ === "tf" ? q.frage + " " + q.aussagen.map(x=>x[0]).join(" / ") : q.frage, antwort, loesung, punkte: ok ? 1 : 0, thema: q.art, typ: q.typ, t: Date.now()};
  $("#aktionen").innerHTML = `<button class="btn" id="weiter">${S.i < S.fragen.length - 1 ? "Weiter →" : "Fertig →"}</button>`;
  $("#weiter").onclick = weiter; $("#weiter").focus({preventScroll:true});
}
function weiter(){ S.i++; if(S.i < S.fragen.length) zeigeFrage(); else abschluss(); }

/* ===== Abschluss eines Texts ===== */
function mitlesenHtml(t){
  if(!HOEREN) return "";
  const mehrere = Object.keys(t.rollen || {}).length > 1;
  return `<details class="mitlesen" open><summary>${EN ? "Text zum Mitlesen (Transcript)" : "Text zum Mitlesen"}</summary>
    <p class="leise" style="font-size:.92rem;margin:8px 0 0">Hör nochmals zu und lies mit. Jetzt so oft du willst.</p>
    <div style="margin-top:10px">${spielerHtml(false)}</div>
    <div class="tx">${t.teile.map(([r, s]) => `<p>${mehrere && t.rollen[r] ? `<b>${esc(t.rollen[r].name)}:</b> ` : ""}${esc(s)}</p>`).join("")}</div></details>`;
}
function abschluss(){
  const t = S.t, r = S.log.filter(l => l.punkte).length, n = S.log.length, q = r / n;
  stoppeTon(); S.frei = true;
  if(S.audio){ try{ S.audio.currentTime = 0; }catch(e){} }
  P.faehig = P.faehig || {};
  S.log.forEach(l => { const f = P.faehig[l.thema] || (P.faehig[l.thema] = {n:0, r:0}); f.n++; f.r += l.punkte; });
  const worte = saetze(t).join(" ").split(/\s+/).filter(Boolean).length;
  const zusatz = {art: S.sb ? "sb" : "text", text: t.id, modus: C.modus, start: S.start, dauer: Date.now() - S.start, woerter: worte};
  if(UNITS) zusatz.unit = t.unit; else zusatz.stufe = t.stufe;
  if(HOEREN){ zusatz.hoeren = S.hoerzahl; zusatz.langsam = S.langsamGenutzt; if(S.audio && isFinite(S.audio.duration)) zusatz.tondauer = Math.round(S.audio.duration); }
  else zusatz.lesezeit = S.lesezeit;
  const vorher = (P.texte[t.id] || {}).best || 0;
  zusatz.erstes = !P.texte[t.id];
  if(window.LP) LP.runde(C.uebung, (S.sb ? "Standortbestimmung" : UNITS ? "Unit " + t.unit : "Stufe " + t.stufe) + " · " + t.titel,
    S.log.map(l => ({frage:l.frage, antwort:l.antwort, loesung:l.loesung, punkte:l.punkte, thema:l.thema, t:l.t})), zusatz);
  if(S.sb){
    P.sb.erg[t.id] = q; speichereP();
    if(SB_TEXTE.some(x => !(x.id in P.sb.erg))){
      app.innerHTML = `<div class="karte ergebnis"><h2>Text ${Object.keys(P.sb.erg).length} von ${SB_TEXTE.length} geschafft</h2><div class="gross">${r} / ${n}</div>
        <p class="leise">Weiter mit dem nächsten Text der Standortbestimmung.</p><div class="aktionen" style="justify-content:center"><button class="btn" id="w">Nächster Text →</button></div>${mitlesenHtml(t)}</div>`;
      $("#w").onclick = starteSB; if(HOEREN) bindeSpieler(); window.scrollTo(0,0); return;
    }
    return sbAbschluss();
  }
  const x = P.texte[t.id] || (P.texte[t.id] = {best:0, n:0});
  x.n++; x.last = q; x.best = Math.max(x.best, q); x.t = Date.now(); if(x.erst == null) x.erst = q;
  let aufstieg = "";
  if(!UNITS && !VORSCHAU){
    const st = P.stufe, alle = texteDerStufe(st);
    if(t.stufe === st && alle.every(y => (P.texte[y.id]||{}).best >= BESTANDEN)){
      if(texteDerStufe(st+1).length){ P.stufe = st + 1; aufstieg = `🎉 Stufe ${st} geschafft! Ab jetzt ${HOEREN ? "hörst" : "liest"} du auf Stufe ${st+1}: ${C.stufen[st+1]}.`; }
      else if(vorher < BESTANDEN) aufstieg = "🎉 Du hast alle Stufen geschafft!";
    }
  }
  speichereP();
  const titel = q >= BESTANDEN ? (vorher >= BESTANDEN ? "Wieder geschafft!" : "Text geschafft!") : "Noch nicht ganz";
  const txt = q >= BESTANDEN ? (HOEREN ? "Sehr gut zugehört." : "Sehr gut gelesen.")
    : `Für «geschafft» brauchst du ${Math.round(BESTANDEN*100)} %. ${HOEREN ? "Hör den Text unten nochmals an und lies mit." : "Lies den Text später nochmals."} Später kannst du es wieder versuchen – die Fragen kommen dann in anderer Reihenfolge.`;
  app.innerHTML = `<div class="karte ergebnis"><h2>${titel}</h2><div class="gross">${r} / ${n}</div><p>${esc(txt)}</p>
    ${aufstieg ? `<div class="meldung gut" style="text-align:left">${esc(aufstieg)}</div>` : ""}
    <div class="aktionen" style="justify-content:center"><button class="btn" id="w">Zur Übersicht</button></div>${mitlesenHtml(t)}</div>`;
  $("#w").onclick = home; if(HOEREN) bindeSpieler(); window.scrollTo(0,0);
}
function sbAbschluss(){
  const E = P.sb.erg;
  let stufe = hoechsteStufe;
  for(const t of SB_TEXTE){ if((E[t.id] || 0) < SB_GRENZE){ stufe = t.stufe; break; } }
  P.stufe = Math.min(stufe, hoechsteStufe); P.sb.fertig = true; P.sb.datum = new Date().toISOString(); speichereP();
  app.innerHTML = `<div class="karte ergebnis"><h2>Standortbestimmung fertig</h2><div class="gross">Stufe ${P.stufe}</div>
    <p><b>${esc(C.stufen[P.stufe])}</b> – ${esc(C.stufenText[P.stufe])}</p>
    <div class="aktionen" style="justify-content:center"><button class="btn" id="w">Los geht's →</button></div></div>`;
  $("#w").onclick = home; window.scrollTo(0,0);
}

/* ===== Los ===== */
if(window.LP) LP.start({rechts: document.querySelector(".lp-kopf .lp-rechts")});
start();
// Andere Glückszahl gewählt (Knopf oben rechts): Lernstand dieser Zahl laden
if(!VORSCHAU) setInterval(() => { if(!S && window.LP && LP.glueckszahl() && LP.glueckszahl() !== gz) start(); }, 1500);
// Seite verlassen: Ton anhalten
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "hidden") stoppeTon(); });
})();
