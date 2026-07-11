with open("src/pages/account/hardware.tsx", "r") as f:
    c = f.read()

c = c.replace("""<p className="font-sans text-base text-[var(--foreground)] opacity-80">External Array (Studio Quality)</p>""", """<p className="font-sans text-base text-[var(--foreground)] opacity-80">{source}</p>""")

with open("src/pages/account/hardware.tsx", "w") as f:
    f.write(c)

