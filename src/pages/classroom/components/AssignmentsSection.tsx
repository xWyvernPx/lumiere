import { Mic, PenLine, Headphones } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";

export default function AssignmentsSection() {
  return (
    <section>
      <div className="border-b-4 border-[var(--border)] border-opacity-20 pb-4 mb-8 flex justify-between items-end">
        <h2 className="text-3xl font-serif font-black text-[var(--foreground)] tracking-tight">
          The Assignment Desk
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 hidden md:inline-block">
          Mme. Laurent&apos;s B2
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Due Today */}
        <Card className="relative bg-[var(--background)] border-t border-[var(--primary)] pt-6 border-b border-[var(--border)] border-opacity-25 pb-6 flex flex-col group cursor-pointer hover:bg-[var(--code-bg)] px-4 transition-all">
          <Badge
            variant="solid"
            className="absolute -top-3 right-4 bg-[var(--primary)] text-[var(--background)] tracking-widest uppercase text-[10px] px-2 py-0.5"
          >
            Due Today
          </Badge>
          <div className="flex items-start space-x-3 mb-4">
            <Mic
              className="w-5 h-5 text-[var(--foreground)] mt-1 shrink-0"
              strokeWidth={2}
            />
            <h4 className="text-xl font-serif font-bold text-[var(--foreground)] leading-tight">
              Oral Defense:
              <br />
              Existentialism
            </h4>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-6 leading-relaxed">
            Record a 3-minute argument defending Sartre&apos;s main thesis. Pay
            attention to pacing and liaisons.
          </p>
          <div className="mt-auto border-t border-[var(--border)] border-opacity-10 pt-4 flex justify-between items-center w-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-60">
              Instructor Note
            </span>
            <span className="font-serif text-xs italic text-[var(--foreground)] opacity-60">
              Weight: 20%
            </span>
          </div>
        </Card>

        {/* Upcoming */}
        <Card className="bg-[var(--background)] border-t border-[var(--primary)] pt-6 border-b border-[var(--border)] border-opacity-25 pb-6 flex flex-col group cursor-pointer hover:bg-[var(--code-bg)] px-4 transition-all">
          <div className="flex items-start space-x-3 mb-4">
            <PenLine
              className="w-5 h-5 text-[var(--foreground)] mt-1 shrink-0"
              strokeWidth={2}
            />
            <h4 className="text-xl font-serif font-bold text-[var(--foreground)] leading-tight">
              Essay: The Revolution
            </h4>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-6 leading-relaxed">
            Write a 500-word essay on the causes of the revolution. Use the
            passé simple tense at least 5 times.
          </p>
          <div className="mt-auto border-t border-[var(--border)] border-opacity-10 pt-4 flex justify-between items-center w-full">
            <Badge
              variant="outline"
              className="text-[var(--foreground)] border-[var(--foreground)] uppercase tracking-widest text-[10px]"
            >
              Due in 3 Days
            </Badge>
            <span className="font-serif text-xs italic text-[var(--foreground)] opacity-60">
              Weight: 35%
            </span>
          </div>
        </Card>

        {/* Graded */}
        <Card className="bg-transparent border-t border-[var(--border)] border-opacity-20 pt-6 border-b border-[var(--border)] border-opacity-25 pb-6 flex flex-col px-4 opacity-60">
          <div className="flex items-start space-x-3 mb-4">
            <Headphones
              className="w-5 h-5 text-[var(--foreground)] mt-1 shrink-0"
              strokeWidth={2}
            />
            <h4 className="text-xl font-serif font-bold leading-tight line-through text-[var(--foreground)]">
              Dictation: Le Monde
            </h4>
          </div>
          <p className="font-serif text-sm text-[var(--foreground)] opacity-80 mb-6 line-through leading-relaxed">
            Listen to the latest political briefing and transcribe it
            accurately.
          </p>
          <div className="mt-auto border-t border-[var(--border)] border-opacity-10 pt-4 flex justify-between items-center w-full text-[var(--foreground)]">
            <Badge
              variant="outline"
              className="border-[var(--border)] opacity-60"
            >
              Graded
            </Badge>
            <span className="font-serif text-sm font-bold opacity-85">
              18/20
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}
