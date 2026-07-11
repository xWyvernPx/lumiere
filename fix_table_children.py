with open("src/components/ui/Table.tsx", "r") as f:
    c = f.read()

c = c.replace("""export const TableHead = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {""", """export const TableHead = ({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) => {""")

with open("src/components/ui/Table.tsx", "w") as f:
    f.write(c)

