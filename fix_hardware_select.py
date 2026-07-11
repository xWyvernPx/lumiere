with open("src/pages/account/hardware.tsx", "r") as f:
    c = f.read()

c = c.replace("""  const [subtitles, setSubtitles] = useState(true);""", """  const [subtitles, setSubtitles] = useState(true);
  const [source, setSource] = useState("External Array (Studio Quality)");""")

c = c.replace("""                <button className="border border-[var(--primary)] px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[var(--code-bg)] transition-colors text-[var(--foreground)]">
                  Select Source
                </button>""", """                <select 
                  value={source} 
                  onChange={(e) => setSource(e.target.value)}
                  className="border border-[var(--primary)] bg-transparent px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[var(--code-bg)] transition-colors text-[var(--primary)] outline-none cursor-pointer appearance-none"
                >
                  <option>External Array (Studio Quality)</option>
                  <option>Internal Microphone</option>
                  <option>Bluetooth Headset</option>
                </select>""")

with open("src/pages/account/hardware.tsx", "w") as f:
    f.write(c)

