import { useRef, useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  className = "",
}: OTPInputProps) {
  const [digits, setDigits] = useState<string[]>(() => {
    const initialDigits = new Array(length).fill("");
    for (let i = 0; i < Math.min(length, value.length); i++) {
      initialDigits[i] = value[i];
    }
    return initialDigits;
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const updateValue = (newDigits: string[]) => {
    setDigits(newDigits);
    if (onChange) {
      onChange(newDigits.join(""));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!val) return;

    const lastChar = val[val.length - 1];
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    updateValue(newDigits);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];

      if (newDigits[index]) {
        newDigits[index] = "";
        updateValue(newDigits);
      } else if (index > 0) {
        newDigits[index - 1] = "";
        updateValue(newDigits);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-10 h-12 text-center text-lg font-bold border border-border bg-background focus:outline-none focus:border-foreground rounded-none transition-colors"
        />
      ))}
    </div>
  );
}
