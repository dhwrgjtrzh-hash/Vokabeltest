/**
 * Google-Skript für die Übungsseiten (Rechtschreibung, Mathe-Übungen …)
 * Speichert jede Abgabe als Zeile im Blatt «Runden» und liefert sie der Lehreransicht.
 *
 * Einrichten:
 * 1. Neue Google-Tabelle anlegen → Erweiterungen → Apps Script.
 * 2. Den ganzen Inhalt dieser Datei hineinkopieren und unten das Passwort ändern.
 * 3. Bereitstellen → Neue Bereitstellung → Typ «Web-App»
 *    Ausführen als: «Ich»   ·   Zugriff: «Jeder»
 * 4. Die Web-App-URL (endet auf /exec) in der Übungsseite bei ENDPOINT eintragen.
 *
 * Datenschutz: Die Kinder schicken nur ihre Glückszahl, keinen Namen.
 */

const PASSWORT = "HIER-PASSWORT-EINTRAGEN";   // Passwort für die Lehreransicht
const BLATT = "Runden";
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

/* Abgaben der Kinder */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const d = JSON.parse(e.postData.contents);
    if (d.typ !== "uebung-runde") return json_({ ok: false, fehler: "Unbekannter Typ" });
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

/* Lehreransicht: ?uebung=…&code=…&callback=… */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const cb = /^[A-Za-z_$][\w$]*$/.test(p.callback || "") ? p.callback : "";
  let antwort;
  if (String(p.code || "") !== PASSWORT || PASSWORT === "HIER-PASSWORT-EINTRAGEN") {
    antwort = { ok: false, fehler: "Falsches Passwort." };
  } else {
    const sh = blatt_();
    const n = sh.getLastRow() - 1;
    const zeilen = n > 0 ? sh.getRange(2, 1, n, KOPF.length).getValues() : [];
    const uebung = String(p.uebung || "");
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
    antwort = { ok: true, tabelle: SpreadsheetApp.getActiveSpreadsheet().getUrl(), runden: runden };
  }
  const text = JSON.stringify(antwort);
  if (cb) return ContentService.createTextOutput(cb + "(" + text + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return json_(antwort);
}
