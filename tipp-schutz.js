/* =====================================================================
   Lernportal 6b – Tipp-Schutz für Antwortknöpfe

   Problem: Ein Kind tippt (schnell zweimal) auf «Weiter →». Die nächste Aufgabe
   erscheint sofort, und der zweite Tipp landet auf einem Antwortknopf der neuen
   Aufgabe – eine Antwort zählt, die das Kind nie gewählt hat. Dasselbe passiert,
   wenn ein Finger (Daumen beim Halten des Geräts) auf dem Bildschirm liegt.

   Schutz:
   - Neue Antwortknöpfe sind kurz gesperrt (0,7 s) und werden in dieser Zeit
     sanft eingeblendet. Ein Tipp in dieser Zeit wird einfach nicht gezählt.
   - Liegt ein Finger länger als 1,5 s auf einem Antwortknopf, zählt das
     Loslassen nicht als Antwort.
   - Kein Doppeltipp-Zoom auf den Antwortknöpfen.

   Verwendung (vor dem Trainer-Skript):
     <script src="tipp-schutz.js" data-knoepfe=".cmpbtns button"></script>
   data-knoepfe: CSS-Auswahl der Knöpfe, die mit einem Tipp sofort antworten.
   ===================================================================== */
(function(){
  const skript = document.currentScript;
  const SEL = (skript && skript.dataset.knoepfe) || ".lp-antwort";
  const SPERRE = +(skript && skript.dataset.sperre) || 700;   // ms nach dem Erscheinen
  const HALTEN = 1500;                                         // ms Finger liegt auf dem Knopf
  const jetzt = () => performance.now();
  const geboren = new WeakMap();

  const css = document.createElement("style");
  css.textContent = `
  .lp-neu{animation:lpEin ${SPERRE}ms ease-out both}
  @keyframes lpEin{from{opacity:.35}to{opacity:1}}
  @media (prefers-reduced-motion: reduce){ .lp-neu{animation:none} }
  ${SEL}{touch-action:manipulation}`;
  document.head.appendChild(css);

  function stempel(b){
    geboren.set(b, jetzt());
    b.classList.add("lp-neu");
    setTimeout(() => b.classList.remove("lp-neu"), SPERRE + 50);
  }
  new MutationObserver(liste => {
    for(const m of liste) for(const n of m.addedNodes){
      if(n.nodeType !== 1) continue;
      if(n.matches(SEL)) stempel(n);
      n.querySelectorAll(SEL).forEach(stempel);
    }
  }).observe(document.documentElement, {childList:true, subtree:true});

  // Finger (oder Stift) verfolgen – die Maus braucht das nicht.
  // Jeder Finger einzeln, damit ein aufliegender Daumen auch erkannt wird,
  // wenn gleichzeitig ein anderer Finger tippt.
  const finger = new Map();
  let losgelassen = null;   // zuletzt losgelassener Finger: {dauer, um}
  addEventListener("pointerdown", e => {
    if(e.pointerType !== "mouse") finger.set(e.pointerId, jetzt());
  }, true);
  addEventListener("pointerup", e => {
    const t0 = finger.get(e.pointerId);
    if(t0 === undefined) return;
    finger.delete(e.pointerId);
    losgelassen = {dauer: jetzt() - t0, um: jetzt()};
  }, true);
  addEventListener("pointercancel", e => finger.delete(e.pointerId), true);

  addEventListener("click", e => {
    const b = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if(!b) return;
    const g = geboren.get(b);
    let sperren = g !== undefined && jetzt() - g < SPERRE;
    if(!sperren && e.detail > 0 && losgelassen && jetzt() - losgelassen.um < 600 && losgelassen.dauer > HALTEN) sperren = true;
    losgelassen = null;
    if(sperren){ e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
})();
