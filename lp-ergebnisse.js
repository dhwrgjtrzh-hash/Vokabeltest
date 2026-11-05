/* =====================================================================
   Lernportal 6b – Glückszahl und Ergebnisse für Trainer ohne eigene Auswertung
   (Englisch Tierwörter, Französisch, Römer)

   - fragt einmal pro Gerät nach der Glückszahl (1 bis 21) und lässt sie bestätigen
     (dieselbe Zahl gilt in allen Trainern des Portals)
   - schickt jede fertige Runde in die Google-Tabelle «Übungen – Resultate»
     (jede Übung bekommt dort ihr eigenes Blatt); nur Glückszahl, nie ein Name
   - Runden, die wegen schlechtem WLAN nicht ankommen, werden gemerkt und später nachgeschickt

   Verwendung im Trainer:
     LP.start({rechts: element})            // Glückszahl-Knopf in die Kopfzeile, ggf. Abfrage zeigen
     LP.runde("Tierwörter", "Stufe 1 · Auswählen", [{frage, antwort, loesung, punkte, thema?, t}])
   ===================================================================== */
(function(){
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbzrgzAVAzJ9qKnFE-A4AocZiMw3cG-8pMTBbJ73ypN3HQH7XzOCM7hVgW2WbqBkBNIs/exec";
  const QKEY = "lp.queue";
  const VORSCHAU = /[?&]vorschau/.test(location.search);
  const store = {
    get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };
  const gueltig = v => /^\d{1,2}$/.test(String(v)) && +v >= 1 && +v <= 21;
  let gz = (store.get("uebung.gz") || store.get("rs.gz") || "").replace(/\D/g,"");
  if(!gueltig(gz)) gz = "";
  let knopf = null;

  /* ---------- Aussehen der Abfrage (passt sich an die Farben des Trainers an) ---------- */
  const css = document.createElement("style");
  css.textContent = `
  .lpgz-hinter{position:fixed;inset:0;z-index:9999;background:rgba(15,21,34,.55);display:flex;align-items:center;justify-content:center;padding:16px}
  .lpgz-karte{background:var(--lpgz-karte,#fff);color:var(--lpgz-ink,#1b2433);border-radius:20px;padding:24px 22px;max-width:460px;width:100%;
    box-shadow:0 12px 40px rgba(0,0,0,.25);font-family:inherit;text-align:center}
  .lpgz-karte h2{margin:0 0 6px;font-size:1.45rem}
  .lpgz-karte p{margin:0 0 14px;color:var(--lpgz-leise,#5f6b85);line-height:1.4}
  .lpgz-zeile{display:flex;gap:10px;justify-content:center;align-items:center}
  .lpgz-feld{width:110px;font:inherit;font-size:2rem;font-weight:800;text-align:center;padding:8px;border-radius:14px;
    border:3px solid var(--lpgz-akzent,#2f5bea);background:var(--lpgz-karte,#fff);color:inherit}
  .lpgz-feld.no{border-color:#e06a5a;background:#fde4e1;color:#1b2433}
  .lpgz-knopf{font:inherit;font-weight:700;font-size:1.05rem;border:0;border-radius:14px;padding:13px 22px;cursor:pointer;
    background:var(--lpgz-akzent,#2f5bea);color:#fff;min-height:52px}
  .lpgz-knopf.leise{background:transparent;color:inherit;border:2px solid var(--lpgz-linie,#dfe5ef)}
  .lpgz-fehler{color:#c0392b;font-weight:700;margin:12px 0 0}
  .lpgz-gross{font-size:64px;font-weight:800;line-height:1;margin:10px 0 14px;color:var(--lpgz-akzent,#2f5bea)}
  .lpgz-fair{background:#fff4d6;color:#5c4300;border-radius:14px;padding:12px 14px;margin:0 0 16px;text-align:left;line-height:1.4}
  .lpgz-knoepfe{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
  .lpgz-pill{font:inherit;font-weight:700;font-size:.92rem;white-space:nowrap;cursor:pointer;border-radius:999px;padding:7px 13px;
    background:var(--lpgz-karte,#fff);color:var(--lpgz-ink,#1b2433);border:2px solid var(--lpgz-linie,#dfe5ef)}
  @media (prefers-color-scheme: dark){ .lpgz-fair{background:#3a3014;color:#f3dfa2} .lpgz-fehler{color:#ff8a80} }`;
  document.head.appendChild(css);

  function farbenUebernehmen(){
    const s = getComputedStyle(document.documentElement);
    const nimm = (...n) => { for(const x of n){ const v = s.getPropertyValue(x).trim(); if(v) return v; } return ""; };
    const r = document.documentElement.style;
    const setz = (k, v) => { if(v) r.setProperty(k, v); };
    setz("--lpgz-akzent", nimm("--lp-akzent","--accent","--fr"));
    setz("--lpgz-karte", nimm("--lp-karte","--surface","--card"));
    setz("--lpgz-ink", nimm("--lp-ink","--ink"));
    setz("--lpgz-leise", nimm("--lp-leise","--muted","--mute","--ink-2"));
    setz("--lpgz-linie", nimm("--lp-linie","--line"));
  }

  /* ---------- Glückszahl abfragen ---------- */
  function abfrage(abbrechbar){
    farbenUebernehmen();
    const h = document.createElement("div"); h.className = "lpgz-hinter";
    h.setAttribute("role","dialog"); h.setAttribute("aria-modal","true");
    document.body.appendChild(h);
    const eingabe = () => {
      h.innerHTML = `<div class="lpgz-karte">
        <h2>Deine Glückszahl</h2>
        <p>Schreib deine Glückszahl hin, nicht deinen Namen. Nimm immer dieselbe Zahl.</p>
        <div class="lpgz-zeile"><input class="lpgz-feld" id="lpgzFeld" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" placeholder="?" aria-label="Deine Glückszahl">
          <button class="lpgz-knopf" id="lpgzLos" type="button">Los geht's →</button></div>
        <p class="lpgz-fehler" id="lpgzFehler" hidden>Die Glückszahlen gehen von 1 bis 21. Schau nochmals nach, welche Zahl du hast.</p>
        ${abbrechbar ? `<p style="margin:14px 0 0"><button class="lpgz-knopf leise" id="lpgzZurueck" type="button">Abbrechen</button></p>` : ""}
      </div>`;
      const f = h.querySelector("#lpgzFeld"), fe = h.querySelector("#lpgzFehler");
      const los = () => {
        const v = f.value.replace(/\D/g,"").slice(0,2);
        if(!v){ f.classList.add("no"); f.focus(); return; }
        if(!gueltig(v)){ f.classList.add("no"); fe.hidden = false; f.select(); return; }
        bestaetigen(String(+v));
      };
      f.addEventListener("input", () => { const v = f.value.replace(/\D/g,"").slice(0,2); if(f.value !== v) f.value = v; f.classList.remove("no"); fe.hidden = true; });
      f.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); los(); } });
      h.querySelector("#lpgzLos").onclick = los;
      const z = h.querySelector("#lpgzZurueck"); if(z) z.onclick = () => h.remove();
      f.focus({preventScroll:true});
    };
    const bestaetigen = z => {
      h.innerHTML = `<div class="lpgz-karte">
        <h2>Ist das wirklich deine Glückszahl?</h2>
        <div class="lpgz-gross">${z}</div>
        <p class="lpgz-fair">Nimm nur <b>deine eigene</b> Glückszahl. Wenn du die Zahl von einem anderen Kind nimmst, werden eure Ergebnisse vermischt. Das ist unfair für das andere Kind – und man sieht nicht mehr, was du selbst schon kannst.</p>
        <div class="lpgz-knoepfe"><button class="lpgz-knopf" id="lpgzJa" type="button">✓ Ja, das ist meine Zahl</button><button class="lpgz-knopf leise" id="lpgzNein" type="button">Nein, ändern</button></div>
      </div>`;
      h.querySelector("#lpgzJa").onclick = () => {
        gz = z; store.set("uebung.gz", gz); store.set("rs.gz", gz);
        h.remove(); zeigeKnopf(); senden();
      };
      h.querySelector("#lpgzNein").onclick = eingabe;
      h.querySelector("#lpgzJa").focus({preventScroll:true});
    };
    eingabe();
  }

  function zeigeKnopf(){
    if(!knopf) return;
    knopf.hidden = !gz;
    knopf.textContent = "Nr. " + gz;
  }

  /* ---------- Runden senden (mit Warteschlange) ---------- */
  const schlange = () => { try{ return JSON.parse(store.get(QKEY) || "[]"); }catch(e){ return []; } };
  let laeuft = false;
  async function senden(){
    if(laeuft || VORSCHAU || !navigator.onLine) return;
    laeuft = true;
    try{
      const q = schlange(); const rest = [];
      for(const rec of q){
        try{
          const r = await fetch(ENDPOINT, {method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(rec), keepalive:true});
          const t = await r.text();
          if(!/"ok"\s*:\s*true/.test(t)) throw new Error("abgelehnt");
        }catch(e){ rest.push(rec); }
      }
      const neu = schlange().slice(q.length);
      store.set(QKEY, JSON.stringify(rest.concat(neu).slice(-80)));
    } finally { laeuft = false; }
  }

  window.LP = {
    /* Glückszahl-Knopf in die Kopfzeile setzen und bei Bedarf nach der Zahl fragen */
    start(opt){
      opt = opt || {};
      if(opt.rechts){
        knopf = document.createElement("button");
        knopf.type = "button"; knopf.className = "lpgz-pill"; knopf.title = "Andere Glückszahl eingeben";
        knopf.onclick = () => { if(confirm("Möchtest du wirklich eine andere Glückszahl eingeben?")) abfrage(true); };
        opt.rechts.prepend(knopf);
      }
      farbenUebernehmen();
      zeigeKnopf();
      if(!gz && !VORSCHAU) abfrage(false);
      senden();
    },
    glueckszahl(){ return gz; },
    /* eine fertige Runde merken und senden */
    runde(uebung, thema, aufgaben){
      if(VORSCHAU || !gz || !aufgaben || !aufgaben.length) return;
      const punkte = aufgaben.reduce((a,x) => a + (+x.punkte || 0), 0);
      const rec = {typ:"uebung-runde", v:1, id:Date.now().toString(36)+Math.random().toString(36).slice(2,10), uebung, glueckszahl:gz, thema, datum:new Date().toISOString(),
        punkte, max:aufgaben.length,
        aufgaben: aufgaben.map((x,i) => ({nr:i+1, thema:x.thema||thema, frage:String(x.frage), antworten:[String(x.antwort==null?"":x.antwort)],
          loesung:String(x.loesung), punkte:+x.punkte||0, t:x.t||Date.now()}))};
      const q = schlange(); q.push(rec); store.set(QKEY, JSON.stringify(q.slice(-80)));
      senden();
    }
  };
  window.addEventListener("online", senden);
  document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible") senden(); });
})();
