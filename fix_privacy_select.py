with open("src/pages/account/privacy.tsx", "r") as f:
    c = f.read()

c = c.replace("""export default function PrivacyPage() {""", """import { useState } from 'react';\n\nexport default function PrivacyPage() {\n  const [timezone, setTimezone] = useState("CET (Central European Time)");""")

c = c.replace("""<select className="font-sans text-base w-full bg-transparent border-b border-[var(--primary)] py-2 outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all appearance-none cursor-pointer">""", """<select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="font-sans text-base w-full bg-transparent border-b border-[var(--primary)] py-2 outline-none focus:border-b-2 focus:border-[var(--accent)] transition-all appearance-none cursor-pointer">""")

with open("src/pages/account/privacy.tsx", "w") as f:
    f.write(c)

