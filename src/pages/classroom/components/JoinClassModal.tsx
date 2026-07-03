import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";

interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export function JoinClassModal({
  isOpen,
  onClose,
  onJoin,
}: JoinClassModalProps) {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onJoin(code);
      setIsSubmitting(false);
      setCode("");
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join a Class">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="class-code"
            className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70"
          >
            Instructor Code
          </Label>
          <Input
            id="class-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. LUM-842-XYZ"
            className="font-mono text-center tracking-widest uppercase py-6"
            maxLength={12}
            required
            autoComplete="off"
            autoFocus
          />
          <p className="font-serif text-sm italic opacity-70 text-[var(--foreground)] mt-2">
            Ask your instructor for the class access code.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)] border-opacity-10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs uppercase tracking-widest"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="text-xs uppercase tracking-widest min-w-[120px]"
            disabled={isSubmitting || !code.trim()}
          >
            {isSubmitting ? "Joining..." : "Join Class"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
