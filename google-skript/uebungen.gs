/**
 * Google-Skript für das Rechtschreibtraining (und weitere Übungsseiten)
 * Speichert jede Abgabe als Zeile im Blatt «Runden» und liefert die Daten der Auswertung in der Deutsch-Station.
 *
 * Einrichten:
 * 1. Google-Tabelle → Erweiterungen → Apps Script, diesen Inhalt hineinkopieren.
 * 2. Bereitstellen → Neue Bereitstellung → Typ «Web-App» · Ausführen als: «Ich» · Zugriff: «Jeder»
 * 3. Die Web-App-URL (endet auf /exec) in der Übungsseite bei ENDPOINT eintragen.
 *
 * Zugang zur Auswertung: Die Deutsch-Station erzeugt beim ersten Öffnen einen langen, zufälligen
 * Schlüssel und meldet ihn hier an (gespeichert in den Skripteigenschaften als «SCHLUESSEL»).
 * Danach bekommt nur noch diese Station die Daten – ohne Passwort-Eingabe.
 * Neu einrichten (z. B. anderer Computer): Projekteinstellungen (Zahnrad) → Skripteigenschaften →
 * «SCHLUESSEL» löschen, dann die Auswertung in der Station öffnen.
 *
 * Datenschutz: Die Kinder schicken nur ihre Glückszahl, keinen Namen.
 */

const BLATT = "Runden";
/* Zugang für die Lernportal-Station auf dem Mac (nur Abfragen und Löschen über doGet) */
const STATION_SCHLUESSEL = "";   // im Apps-Script-Editor eintragen (nicht hier im öffentlichen Repository)
const KOPF = ["ID", "Zeit", "Übung", "Glückszahl", "Thema", "Punkte", "Max", "Daten"];

function blatt_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(BLATT);
  if (!sh) {
    sh = ss.insertSheet(BLATT);
    sh.appendRow(KOPF);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, KOPF.length).setFontWeight("bold");
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Zugang prüfen. Nur die Station darf beim allerersten Mal ihren Schlüssel anmelden (einrichten = true). */
function zugang_(schluessel, einrichten) {
  schluessel = String(schluessel || "");
  const props = PropertiesService.getScriptProperties();
  const gespeichert = props.getProperty("SCHLUESSEL");
  if (gespeichert) return schluessel === gespeichert ? "ok" : "falsch";
  if (!einrichten || !/^[a-f0-9]{32,}$/.test(schluessel)) return "fehlt";
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const nochmal = props.getProperty("SCHLUESSEL");
    if (nochmal) return schluessel === nochmal ? "ok" : "falsch";
    props.setProperty("SCHLUESSEL", schluessel);
    return "ok";
  } finally { lock.releaseLock(); }
}

function daten_(uebung) {
  const sh = blatt_();
  const n = sh.getLastRow() - 1;
  const zeilen = n > 0 ? sh.getRange(2, 1, n, KOPF.length).getValues() : [];
  const runden = [];
  zeilen.forEach(function (z) {
    if (uebung && String(z[2]) !== uebung) return;
    let daten = {};
    try { daten = JSON.parse(z[7] || "{}"); } catch (x) {}
    runden.push(Object.assign(daten, {
      id: z[0], zeit: z[1] instanceof Date ? z[1].toISOString() : String(z[1]),
      uebung: z[2], glueckszahl: String(z[3]).replace(/^'/, ""), thema: z[4], punkte: z[5], max: z[6]
    }));
  });
  return { ok: true, tabelle: SpreadsheetApp.getActiveSpreadsheet().getUrl(), runden: runden };
}

function befehle_() {
  try { return JSON.parse(PropertiesService.getScriptProperties().getProperty("BEFEHLE") || "{}") || {}; } catch (x) { return {}; }
}

const MELDUNG = {
  falsch: "Der Schlüssel dieser Station passt nicht zur Tabelle.",
  fehlt: "Die Auswertung ist noch nicht eingerichtet."
};

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return json_({ ok: false, fehler: "Ungültige Anfrage" }); }

  /* Lernstand speichern und laden (pro Glückszahl) */
  if (d.typ === "stand-laden" || d.typ === "stand-speichern") {
    try { return json_(stand_(d, SpreadsheetApp.getActiveSpreadsheet())); } catch (x) { return json_({ ok: false, fehler: String(x) }); }
  }

  /* Auswertung für die Deutsch-Station */
  if (d.typ === "lehrer-daten") {
    const z = zugang_(d.schluessel, d.einrichten === true);
    if (z !== "ok") return json_({ ok: false, grund: z, fehler: MELDUNG[z] });
    const antwort = daten_(String(d.uebung || ""));
    antwort.befehle = befehle_();
    return json_(antwort);
  }

  /* Auftrag der Lehrperson an das Tablet eines Kindes (z. B. Standortbestimmung zurücksetzen) */
  if (d.typ === "lehrer-befehl") {
    const z = zugang_(d.schluessel, false);
    if (z !== "ok") return json_({ ok: false, grund: z, fehler: MELDUNG[z] });
    const g = String(d.glueckszahl || "").replace(/\D/g, "");
    if (!g || ["sb-reset", "abbrechen"].indexOf(d.befehl) < 0) return json_({ ok: false, fehler: "Ungültiger Auftrag" });
    const b = befehle_();
    if (d.befehl === "abbrechen") delete b[g];
    else b[g] = { befehl: d.befehl, id: Utilities.getUuid().slice(0, 8), zeit: new Date().toISOString() };
    PropertiesService.getScriptProperties().setProperty("BEFEHLE", JSON.stringify(b));
    return json_({ ok: true, befehle: b });
  }

  /* Das Tablet fragt nach einem offenen Auftrag für seine Glückszahl */
  if (d.typ === "befehl-abfragen") {
    const g = String(d.glueckszahl || "").replace(/\D/g, "");
    return json_({ ok: true, befehl: befehle_()[g] || null });
  }

  /* Das Tablet meldet: Auftrag ausgeführt */
  if (d.typ === "befehl-erledigt") {
    const g = String(d.glueckszahl || "").replace(/\D/g, "");
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const b = befehle_();
      if (b[g] && b[g].id === d.id) {
        delete b[g];
        PropertiesService.getScriptProperties().setProperty("BEFEHLE", JSON.stringify(b));
      }
    } finally { lock.releaseLock(); }
    return json_({ ok: true });
  }

  /* Abgaben der Kinder */
  if (d.typ !== "uebung-runde") return json_({ ok: false, fehler: "Unbekannter Typ" });
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const sh = blatt_();
    const id = String(d.id || Utilities.getUuid());
    // doppelte Abgaben (z. B. nach schlechtem WLAN) nicht zweimal speichern
    if (sh.getLastRow() > 1) {
      const gefunden = sh.getRange(2, 1, sh.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
      if (gefunden) return json_({ ok: true, doppelt: true });
    }
    const daten = Object.assign({}, d);
    ["typ", "uebung", "glueckszahl", "thema", "punkte", "max"].forEach(function (k) { delete daten[k]; });
    let text = JSON.stringify(daten);
    if (text.length > 49000) text = JSON.stringify(Object.assign({}, daten, { aufgaben: (daten.aufgaben || []).slice(0, 150), gekuerzt: true }));
    sh.appendRow([id, new Date(), String(d.uebung || ""), "'" + String(d.glueckszahl || ""), String(d.thema || ""), Number(d.punkte) || 0, Number(d.max) || 0, text]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, fehler: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/* Ohne Parameter: einfacher Funktionstest (zeigt «bereit»).
 * Mit Schlüssel (für die Lernportal-Station auf dem Mac, per Skript-Tag/JSONP):
 *   aktion=daten               → alle Runden (optional &uebung=…)
 *   aktion=loeschen&ids=a,b,c  → einzelne Runden löschen (Blatt «Runden»)
 *   aktion=lernstand-loeschen&glueckszahl=12[&uebung=…] → gespeicherten Lernstand zurücksetzen
 * «code» gilt als anderer Name für «schluessel» (frühere Mathe-Station). */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const cb = String(p.callback || "");
  const antwort = function (obj) {
    if (/^[A-Za-z_][\w.]*$/.test(cb)) {
      return ContentService.createTextOutput(cb + "(" + JSON.stringify(obj) + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return json_(obj);
  };
  const aktion = String(p.aktion || (p.code ? "daten" : ""));
  if (!aktion) return json_({ ok: true, bereit: true, eingerichtet: !!PropertiesService.getScriptProperties().getProperty("SCHLUESSEL") });
  const z = String(p.schluessel || p.code || "") === STATION_SCHLUESSEL && STATION_SCHLUESSEL ? "ok" : zugang_(p.schluessel || p.code, false);
  if (z !== "ok") return antwort({ ok: false, grund: z, fehler: MELDUNG[z] });
  try {
    if (aktion === "daten") { const a = daten_(String(p.uebung || "")); a.befehle = befehle_(); return antwort(a); }
    if (aktion === "loeschen") return antwort(loeschen_(String(p.ids || "").split(",").filter(Boolean)));
    if (aktion === "lernstand-loeschen") return antwort(lernstandLoeschen_(String(p.glueckszahl || ""), String(p.uebung || "")));
  } catch (err) { return antwort({ ok: false, fehler: String(err) }); }
  return antwort({ ok: false, fehler: "Unbekannte Aktion" });
}

/* Runden anhand ihrer ID aus dem Blatt «Runden» entfernen */
function loeschen_(ids) {
  if (!ids.length) return { ok: true, geloescht: 0 };
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = blatt_();
    const n = sh.getLastRow() - 1;
    if (n < 1) return { ok: true, geloescht: 0 };
    const spalte = sh.getRange(2, 1, n, 1).getValues();
    const set = {};
    ids.forEach(function (i) { set[String(i)] = true; });
    let anzahl = 0;
    for (let i = spalte.length - 1; i >= 0; i--) {
      if (set[String(spalte[i][0])]) { sh.deleteRow(i + 2); anzahl++; }
    }
    return { ok: true, geloescht: anzahl };
  } finally { lock.releaseLock(); }
}

/* Gespeicherten Lernstand einer Glückszahl entfernen (das Kind beginnt wieder bei null) */
function lernstandLoeschen_(g, uebung) {
  g = String(g).replace(/\D/g, "");
  if (!g) return { ok: false, fehler: "Glückszahl fehlt" };
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lernstand");
  if (!sh || sh.getLastRow() < 2) return { ok: true, geloescht: 0 };
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const n = sh.getLastRow() - 1;
    const w = sh.getRange(2, 1, n, 2).getValues();
    let anzahl = 0;
    for (let i = w.length - 1; i >= 0; i--) {
      if (String(w[i][1]).replace(/^'/, "") === g && (!uebung || String(w[i][0]) === uebung)) { sh.deleteRow(i + 2); anzahl++; }
    }
    return { ok: true, geloescht: anzahl };
  } finally { lock.releaseLock(); }
}


/* Lernstand der Kinder (pro Übung und Glückszahl), damit sie auf jedem Gerät dort weitermachen, wo sie aufgehört haben. Kein Name, nur die Glückszahl. */
function stand_(d, ss) {
  const g = String(d.glueckszahl || "").replace(/\D/g, "").slice(0, 4);
  const u = String(d.uebung || "").slice(0, 60);
  if (!g || !u) return { ok: false, fehler: "Glückszahl oder Übung fehlt" };
  let sh = ss.getSheetByName("Lernstand");
  if (!sh) { sh = ss.insertSheet("Lernstand"); sh.appendRow(["Übung", "Glückszahl", "Zeit", "Stand"]); sh.setFrozenRows(1); }
  const finde = function () {
    const n = sh.getLastRow() - 1;
    const w = n > 0 ? sh.getRange(2, 1, n, 2).getValues() : [];
    for (let i = 0; i < w.length; i++) if (String(w[i][0]) === u && String(w[i][1]).replace(/^'/, "") === g) return i + 2;
    return -1;
  };
  if (d.typ === "stand-laden") {
    const z = finde();
    if (z < 0) return { ok: true, stand: null };
    const r = sh.getRange(z, 3, 1, 2).getValues()[0];
    return { ok: true, t: Number(r[0]) || 0, stand: String(r[1] || "") };
  }
  const text = String(d.stand || "");
  if (!text || text.length > 45000) return { ok: false, fehler: "Stand fehlt oder ist zu gross" };
  const t = Number(d.t) || Date.now();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const z = finde();
    if (z < 0) sh.appendRow([u, "'" + g, t, text]);
    else if (t >= (Number(sh.getRange(z, 3).getValue()) || 0)) sh.getRange(z, 3, 1, 2).setValues([[t, text]]);
  } finally { lock.releaseLock(); }
  return { ok: true };
}
