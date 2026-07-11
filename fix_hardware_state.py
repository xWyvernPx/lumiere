with open("src/pages/account/hardware.tsx", "r") as f:
    c = f.read()

c = c.replace("""import React from 'react';""", """import React, { useState } from 'react';""")
c = c.replace("""export default function HardwarePage() {""", """export default function HardwarePage() {
  const [suppression, setSuppression] = useState(true);
  const [isolation, setIsolation] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [contrast, setContrast] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
""")

c = c.replace("""<input type="checkbox" className="sr-only peer" defaultChecked />""", """<input type="checkbox" className="sr-only peer" checked={suppression} onChange={(e) => setSuppression(e.target.checked)} />""", 1)
c = c.replace("""<input type="checkbox" className="sr-only peer" />""", """<input type="checkbox" className="sr-only peer" checked={isolation} onChange={(e) => setIsolation(e.target.checked)} />""", 1)
c = c.replace("""<input type="checkbox" className="sr-only peer" />""", """<input type="checkbox" className="sr-only peer" checked={dyslexia} onChange={(e) => setDyslexia(e.target.checked)} />""", 1)
c = c.replace("""<input type="checkbox" className="sr-only peer" defaultChecked />""", """<input type="checkbox" className="sr-only peer" checked={contrast} onChange={(e) => setContrast(e.target.checked)} />""", 1)
c = c.replace("""<input type="checkbox" className="sr-only peer" defaultChecked />""", """<input type="checkbox" className="sr-only peer" checked={subtitles} onChange={(e) => setSubtitles(e.target.checked)} />""", 1)

with open("src/pages/account/hardware.tsx", "w") as f:
    f.write(c)

