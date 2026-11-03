#!/usr/bin/env python3
"""Aufnahmen für das Rechtschreibtraining mit einer Microsoft-Stimme (Azure Speech) erzeugen.

Läuft auf dem Mac der Lehrperson (nur Python-Standardbibliothek).
Der Schlüssel liegt in ~/.azure-speech-key und wird nie ausgegeben.

  python3 stimme.py proben  <ordner>                 # kurze Hörproben mehrerer Stimmen
  python3 stimme.py alles   <ordner> <stimme>        # alle Wörter und Sätze, normal + langsam

Die kostenlose Stufe erlaubt 20 Anfragen pro Minute – deshalb wartet das Skript zwischen
den Anfragen. Bereits erzeugte Dateien werden übersprungen (Abbrechen und Neustarten ist möglich).
"""
import json, os, sys, time, urllib.request, urllib.error
from xml.sax.saxutils import escape

REGION = "switzerlandnorth"
URL = "https://%s.tts.speech.microsoft.com/cognitiveservices/v1" % REGION
FORMAT = "audio-24khz-48kbitrate-mono-mp3"
PAUSE = 3.2          # Sekunden zwischen Anfragen (Free F0: 20 pro Minute)
TEMPO = {"normal": "-5%", "langsam": "-35%"}

def schluessel():
    with open(os.path.expanduser("~/.azure-speech-key")) as f:
        return f.read().strip()

def ssml(text, stimme, tempo):
    lang = "-".join(stimme.split("-")[:2])
    return ('<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="%s">'
            '<voice name="%s"><prosody rate="%s">%s</prosody></voice></speak>') % (lang, stimme, tempo, escape(text))

def sprich(key, text, stimme, tempo, ziel):
    body = ssml(text, stimme, tempo).encode("utf-8")
    for versuch in range(6):
        req = urllib.request.Request(URL, data=body, method="POST", headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": FORMAT,
            "User-Agent": "lernportal-6b"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                daten = r.read()
            if len(daten) < 500:
                raise RuntimeError("Antwort zu kurz")
            tmp = ziel + ".tmp"
            with open(tmp, "wb") as f:
                f.write(daten)
            os.replace(tmp, ziel)
            return True
        except urllib.error.HTTPError as e:
            if e.code in (401, 403):
                print("FEHLER: Schlüssel oder Region stimmt nicht (HTTP %d)." % e.code, flush=True)
                sys.exit(2)
            warte = 20 * (versuch + 1) if e.code == 429 else 5 * (versuch + 1)
            print("HTTP %d – warte %ds" % (e.code, warte), flush=True)
            time.sleep(warte)
        except Exception as e:  # Netzwerk
            print("Fehler: %s – neuer Versuch" % e, flush=True)
            time.sleep(5 * (versuch + 1))
    return False

PROBEN = [
    ("satz", "Am Wochenende fahren wir mit dem Zug in die Berge."),
    ("wort", "Strasse"),
    ("wort2", "Fahrrad"),
    ("diktat", "Der Igel versteckt sich im Laub."),
]
STIMMEN = ["de-CH-LeniNeural", "de-CH-JanNeural", "de-DE-KatjaNeural", "de-DE-ConradNeural"]

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    art, ordner = sys.argv[1], os.path.expanduser(sys.argv[2])
    os.makedirs(ordner, exist_ok=True)
    key = schluessel()
    if art == "proben":
        for stimme in STIMMEN:
            for name, text in PROBEN:
                for t in ("normal", "langsam") if name == "satz" else ("normal",):
                    ziel = os.path.join(ordner, "%s_%s_%s.mp3" % (stimme, name, t))
                    if not os.path.exists(ziel):
                        sprich(key, text, stimme, TEMPO[t], ziel)
                        time.sleep(PAUSE)
        print("FERTIG proben", flush=True)
        return
    stimme = sys.argv[3]
    texte = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "texte.json"), encoding="utf-8"))
    aufgaben = []
    for t in ("normal", "langsam"):
        os.makedirs(os.path.join(ordner, t), exist_ok=True)
        for h, text in texte.items():
            ziel = os.path.join(ordner, t, h + ".mp3")
            if not os.path.exists(ziel):
                aufgaben.append((t, h, text, ziel))
    gesamt, fehler = len(aufgaben), 0
    print("START %d Aufnahmen" % gesamt, flush=True)
    for i, (t, h, text, ziel) in enumerate(aufgaben, 1):
        if not sprich(key, text, stimme, TEMPO[t], ziel):
            fehler += 1
        if i % 25 == 0 or i == gesamt:
            print("STAND %d/%d (Fehler %d)" % (i, gesamt, fehler), flush=True)
        time.sleep(PAUSE)
    print("FERTIG alles (Fehler %d)" % fehler, flush=True)

if __name__ == "__main__":
    main()
