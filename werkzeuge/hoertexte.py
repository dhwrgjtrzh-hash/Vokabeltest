#!/usr/bin/env python3
"""Aufnahmen für das Hörverstehen (Deutsch und Englisch) mit Microsoft-Stimmen (Azure Speech).

Läuft auf dem Mac der Lehrperson (nur Python-Standardbibliothek).
Der Schlüssel liegt in ~/.azure-speech-key und wird nie ausgegeben (gleich wie stimme.py).

  python3 hoertexte.py <zielordner>              # alle fehlenden Aufnahmen erzeugen
  python3 hoertexte.py <zielordner> h1-bahnhof   # nur diese Aufnahme(n) neu erzeugen

Liest werkzeuge/hoertexte.json (erzeugt mit: node werkzeuge/hoertexte-export.js > werkzeuge/hoertexte.json).
Jeder Hörtext wird mit einer einzigen Anfrage erzeugt: jede Rolle mit ihrer eigenen Stimme,
dazwischen kurze Pausen. Die kostenlose Stufe erlaubt 20 Anfragen pro Minute.
"""
import json, os, sys, time, urllib.request, urllib.error
from xml.sax.saxutils import escape

REGION = "switzerlandnorth"
URL = "https://%s.tts.speech.microsoft.com/cognitiveservices/v1" % REGION
FORMAT = "audio-24khz-48kbitrate-mono-mp3"
PAUSE = 3.5


def schluessel():
    with open(os.path.expanduser("~/.azure-speech-key")) as f:
        return f.read().strip()


def ssml(text):
    lang = {"de": "de-DE", "en": "en-GB"}[text["sprache"]]
    teile = []
    for i, t in enumerate(text["teile"]):
        teile.append('<voice name="%s">%s<prosody rate="%s" pitch="%s">%s</prosody>%s</voice>' % (
            t["stimme"], '<break time="400ms"/>' if i == 0 else "", t["tempo"], t["hoehe"], escape(t["text"]),
            '<break time="%dms"/>' % t["pause"] if t["pause"] else ""))
    return ('<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" '
            'xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="%s">%s</speak>') % (lang, "".join(teile))


def erzeuge(key, text, ziel):
    body = ssml(text).encode("utf-8")
    for versuch in range(6):
        req = urllib.request.Request(URL, data=body, method="POST", headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": FORMAT,
            "User-Agent": "lernportal-6b"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                daten = r.read()
            if len(daten) < 2000:
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
            if e.code == 400:
                print("FEHLER 400 bei %s: %s" % (ziel, e.read()[:300]), flush=True)
                return False
            warte = 20 * (versuch + 1) if e.code == 429 else 5 * (versuch + 1)
            print("HTTP %d – warte %ds" % (e.code, warte), flush=True)
            time.sleep(warte)
        except Exception as e:
            print("Fehler: %s – neuer Versuch" % e, flush=True)
            time.sleep(5 * (versuch + 1))
    return False


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    ordner = os.path.expanduser(sys.argv[1])
    nur = set(sys.argv[2:])
    texte = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "hoertexte.json"), encoding="utf-8"))
    key = schluessel()
    auftraege = []
    for t in texte:
        ziel = os.path.join(ordner, t["datei"])
        tid = os.path.basename(t["datei"])[:-4]
        if nur and tid not in nur:
            continue
        if os.path.exists(ziel) and not nur:
            continue
        os.makedirs(os.path.dirname(ziel), exist_ok=True)
        auftraege.append((t, ziel))
    print("START %d Aufnahmen" % len(auftraege), flush=True)
    fehler = 0
    for i, (t, ziel) in enumerate(auftraege, 1):
        ok = erzeuge(key, t, ziel)
        fehler += 0 if ok else 1
        print("%s %d/%d %s" % ("OK" if ok else "FEHLER", i, len(auftraege), t["datei"]), flush=True)
        time.sleep(PAUSE)
    print("FERTIG (Fehler %d)" % fehler, flush=True)


if __name__ == "__main__":
    main()
