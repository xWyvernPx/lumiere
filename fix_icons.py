with open("src/pages/roadmap.tsx", "r") as f:
    c = f.read()

c = c.replace(
    "import { Check, ArrowForward, Headphones, Edit, Lock, AutoStories, Forum, EditDocument, Route } from 'lucide-react';",
    "import { Check, ArrowRight, Headphones, Edit, Lock, BookOpen, MessageSquare, FileText, Route } from 'lucide-react';"
)
c = c.replace("<ArrowForward ", "<ArrowRight ")
c = c.replace("<AutoStories ", "<BookOpen ")
c = c.replace("<Forum ", "<MessageSquare ")
c = c.replace("<EditDocument ", "<FileText ")

with open("src/pages/roadmap.tsx", "w") as f:
    f.write(c)

