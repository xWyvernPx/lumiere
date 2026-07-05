import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { JoinClassModal } from "./JoinClassModal";

export default function DirectorySection() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleJoinClass = (code: string) => {
    console.log("Joining class with code:", code);
    // You could add logic here to add the new class to the list
  };

  return (
    <section className="mb-[40px] space-y-12">
      {/* Instructor-Led Seminars */}
      <div>
        <div className="border-b-4 border-[var(--border)] border-opacity-20 pb-4 mb-8">
          <h2 className="text-3xl font-serif font-black text-[var(--foreground)] tracking-tight">
            Instructor-Led Seminars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/app/classroom/teacher">
            <Card className="bg-[var(--primary)] text-[var(--background)] border-[var(--primary)] p-6 flex flex-col h-56 transition-colors hover:bg-neutral-800 group cursor-pointer h-full">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--background)] opacity-70 mb-4">
                Active Cohort
              </span>
              <h3 className="text-2xl font-serif font-bold mb-2">
                Mme. Laurent&apos;s B2
              </h3>
              <p className="font-serif text-sm italic opacity-80 mb-auto">
                Seminar: Proust & Memory
              </p>
              <div className="border-t border-[var(--background)] border-opacity-20 pt-4 mt-4 flex justify-between items-center text-[var(--background)]">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  Tasks
                </span>
                <Badge
                  variant="solid"
                  className="bg-[var(--background)] text-[var(--primary)] border-[var(--background)] font-bold px-2 py-1 text-xs"
                >
                  2 Due
                </Badge>
              </div>
            </Card>
          </Link>

          <Link to="/app/classroom/teacher">
            <Card className="bg-[var(--background)] border-[var(--border)] border-opacity-20 p-6 flex flex-col h-56 transition-colors hover:bg-[var(--code-bg)] cursor-pointer h-full">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50 mb-4">
                Enrolled
              </span>
              <h3 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">
                Literature 101
              </h3>
              <p className="font-serif text-sm italic text-[var(--foreground)] opacity-70 mb-auto">
                Prof. Dubois
              </p>
              <div className="border-t border-[var(--border)] border-opacity-10 pt-4 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50">
                  Tasks
                </span>
                <span className="font-serif text-sm italic text-[var(--foreground)] opacity-70">
                  All caught up
                </span>
              </div>
            </Card>
          </Link>

          <Card
            onClick={() => setIsJoinModalOpen(true)}
            className="bg-transparent border-2 border-dashed border-[var(--border)] border-opacity-20 p-6 flex flex-col items-center justify-center h-56 transition-colors hover:border-opacity-65 cursor-pointer hover:bg-[var(--code-bg)] text-center"
          >
            <Plus
              className="w-8 h-8 text-[var(--foreground)] mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-2 animate-none">
              Join a Class
            </h3>
            <p className="font-serif text-sm italic text-[var(--foreground)] opacity-70">
              Enter instructor code
            </p>
          </Card>
        </div>
      </div>

      {/* Community-Led Hubs */}
      <div>
        <div className="border-b-4 border-[var(--border)] border-opacity-20 pb-4 mb-8 flex justify-between items-end">
          <h2 className="text-3xl font-serif font-black text-[var(--foreground)] tracking-tight">
            Community-Led Hubs
          </h2>
          <button className="text-xs uppercase tracking-widest font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
            Explore All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/app/community">
            <Card className="bg-[var(--background)] border-[var(--border)] border-opacity-20 p-6 flex flex-col h-56 transition-colors hover:bg-[var(--code-bg)] cursor-pointer h-full">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50 mb-4">
                Active Member
              </span>
              <h3 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">
                Community Desk
              </h3>
              <p className="font-serif text-sm italic text-[var(--foreground)] opacity-70 mb-auto">
                Shared resources & essay review
              </p>
              <div className="border-t border-[var(--border)] border-opacity-10 pt-4 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50">
                  Updates
                </span>
                <span className="font-serif text-sm italic text-[var(--foreground)] opacity-70">
                  3 new posts
                </span>
              </div>
            </Card>
          </Link>

          <Card
            onClick={() => {}}
            className="bg-transparent border-2 border-dashed border-[var(--border)] border-opacity-20 p-6 flex flex-col items-center justify-center h-56 transition-colors hover:border-opacity-65 cursor-pointer hover:bg-[var(--code-bg)] text-center"
          >
            <Plus
              className="w-8 h-8 text-[var(--foreground)] mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-2 animate-none">
              Create Hub
            </h3>
            <p className="font-serif text-sm italic text-[var(--foreground)] opacity-70">
              Start a new study group
            </p>
          </Card>
        </div>
      </div>

      <JoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinClass}
      />
    </section>
  );
}
