import { Mic, PenLine, Headphones } from 'lucide-react';

export default function AssignmentsSection() {
  return (
    <section>
      <div className="border-b-4 border-primary pb-4 mb-8 flex justify-between items-end">
        <h2 className="text-headline-md text-primary tracking-tight">The Assignment Desk</h2>
        <span className="text-label-caps text-primary tracking-widest hidden md:inline-block">Mme. Laurent&apos;s B2</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Due Today */}
        <div className="relative bg-[var(--background)] border-t border-primary pt-6 border-b border-ny-gray pb-6 flex flex-col group cursor-pointer hover:bg-ny-light px-4 -mx-4 transition-colors">
          <div className="absolute -top-3 right-4 bg-primary text-[var(--background)] text-label-caps px-2 py-1">Due Today</div>
          <div className="flex items-start space-x-3 mb-4">
            <Mic className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={2} />
            <h4 className="text-headline-sm text-primary leading-tight">Oral Defense:<br/>Existentialism</h4>
          </div>
          <p className="text-body-italic text-on-surface-variant mb-6">
            Record a 3-minute argument defending Sartre&apos;s main thesis. Pay attention to pacing and liaisons.
          </p>
          <div className="mt-auto border-t border-ny-gray pt-4 flex justify-between items-center w-full">
            <span className="text-label-caps text-outline">Instructor Note</span>
            <span className="text-body-italic text-outline">Weight: 20%</span>
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-[var(--background)] border-t border-primary pt-6 border-b border-ny-gray pb-6 flex flex-col group cursor-pointer hover:bg-ny-light px-4 -mx-4 transition-colors">
          <div className="flex items-start space-x-3 mb-4">
            <PenLine className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={2} />
            <h4 className="text-headline-sm text-primary leading-tight">Essay: The Revolution</h4>
          </div>
          <p className="text-body-italic text-on-surface-variant mb-6">
            Write a 500-word essay on the causes of the revolution. Use the passé simple tense at least 5 times.
          </p>
          <div className="mt-auto border-t border-ny-gray pt-4 flex justify-between items-center w-full">
            <span className="text-label-caps text-primary">Due in 3 Days</span>
            <span className="text-body-italic text-outline">Weight: 35%</span>
          </div>
        </div>

        {/* Graded */}
        <div className="bg-transparent border-t border-outline-variant pt-6 border-b border-ny-gray pb-6 flex flex-col px-4 -mx-4 opacity-75">
          <div className="flex items-start space-x-3 mb-4 text-outline">
            <Headphones className="w-5 h-5 mt-1 shrink-0" strokeWidth={2} />
            <h4 className="text-headline-sm leading-tight line-through decoration-1 text-outline">Dictation: Le Monde</h4>
          </div>
          <p className="text-body-italic text-outline-variant mb-6 line-through decoration-1">
            Listen to the latest political briefing and transcribe it accurately.
          </p>
          <div className="mt-auto border-t border-ny-gray pt-4 flex justify-between items-center w-full">
            <span className="text-label-caps text-secondary">Graded</span>
            <span className="text-body-italic text-secondary font-bold">18/20</span>
          </div>
        </div>
      </div>
    </section>
  );
}
