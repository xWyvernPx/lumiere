import { Plus } from 'lucide-react';

export default function DirectorySection() {
  return (
    <section className="mb-[40px]">
      <div className="border-b-4 border-primary pb-4 mb-8">
        <h2 className="text-display-lg-mobile text-primary tracking-tight">Directory of Cohorts</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Cohort */}
        <div className="bg-primary text-[var(--background)] p-6 border border-primary flex flex-col h-56 transition-colors hover:bg-neutral-800 group cursor-pointer">
          <span className="text-label-caps text-ny-gray mb-4">Active Cohort</span>
          <h3 className="text-headline-md mb-2">Mme. Laurent&apos;s B2</h3>
          <p className="text-body-italic text-inverse-primary mb-auto">Advanced Conversation</p>
          <div className="border-t border-surface-tint pt-4 mt-4 flex justify-between items-center">
            <span className="text-label-caps">Tasks</span>
            <span className="bg-[var(--background)] text-primary text-metadata px-2 py-1">2 Due</span>
          </div>
        </div>

        {/* Enrolled Cohort */}
        <div className="bg-[var(--background)] border border-ny-gray p-6 flex flex-col h-56 transition-colors hover:bg-ny-light cursor-pointer">
          <span className="text-label-caps text-outline mb-4">Enrolled</span>
          <h3 className="text-headline-sm text-primary mb-2">Literature 101</h3>
          <p className="text-body-italic text-on-surface-variant mb-auto">Prof. Dubois</p>
          <div className="border-t border-ny-gray pt-4 mt-4 flex justify-between items-center">
            <span className="text-label-caps text-outline">Tasks</span>
            <span className="text-body-italic text-on-surface-variant">All caught up</span>
          </div>
        </div>

        {/* Join Cohort */}
        <div className="bg-transparent border-2 border-dashed border-ny-gray p-6 flex flex-col items-center justify-center h-56 transition-colors hover:border-outline cursor-pointer hover:bg-[var(--background)] text-center">
          <Plus className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
          <h3 className="text-headline-sm text-primary mb-2">Join a Class</h3>
          <p className="text-body-italic text-on-surface-variant">Enter instructor code</p>
        </div>
      </div>
    </section>
  );
}
