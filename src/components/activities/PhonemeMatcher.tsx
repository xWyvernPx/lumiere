import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Play, Mic } from "lucide-react";
import { PhonemeMatcherData } from "../../types/activity";

interface Props {
  data: PhonemeMatcherData;
  level: string;
}

export default function PhonemeMatcher({ data, level }: Props) {
  const [recordingState, setRecordingState] = useState<
    "idle" | "recording" | "recorded"
  >("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRecordClick = async () => {
    if (recordingState === "idle" || recordingState === "recorded") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          // We could save the audio blob if we needed to play it back or upload
        };

        mediaRecorder.onstop = () => {
          setRecordingState("recorded");
          if (streamRef.current) {
             streamRef.current.getTracks().forEach(track => track.stop());
             streamRef.current = null;
          }
        };

        mediaRecorder.start();
        setRecordingState("recording");

        // Automatically stop recording after 3 seconds for this challenge
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
          }
        }, 3000);

      } catch (err) {
        console.error("Microphone access denied or error occurred", err);
        alert("Veuillez autoriser l'accès au microphone pour utiliser cette fonctionnalité.");
      }
    } else if (recordingState === "recording") {
       if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
         mediaRecorderRef.current.stop();
       }
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500); // Simulate playback duration
  };

  return (
    <div className="w-full mx-auto pb-32 max-w-4xl px-5 fade-in-view">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.5); opacity: 1; }
          100% { transform: scale(1.3); box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `,
        }}
      />

      <header className="flex flex-col mb-10 pb-4 border-b-4 border-black gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] leading-none tracking-[0.08em] uppercase font-bold text-[#747878]">
            {level} EXERCISE
          </span>
        </div>
        <div>
          <span className="font-sans font-bold text-[10px] leading-none tracking-[0.08em] uppercase text-[#444748] block mb-2">
            LE DÉFI PHONÉTIQUE
          </span>
          <h2 className="font-serif text-3xl font-black text-black">
            Maîtrise de la Nasale
          </h2>
          <p className="text-[#444748] mt-2 font-serif italic max-w-xl">
            {data.description}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mx-auto items-start">
        {/* Left Side: Target Card */}
        <div className="bg-white border border-[#c4c7c7] border-t-4 border-t-black p-6 flex flex-col relative h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[12px] leading-none text-[#444748] mb-1">
                MOT CIBLE
              </span>
              <span className="font-serif font-bold text-[20px] leading-[1.4] text-black">
                {data.targetWord}
              </span>
            </div>
            <button
              onClick={handlePlayClick}
              aria-label="Écouter la prononciation"
              className={`h-10 w-10 border flex items-center justify-center transition-colors cursor-pointer ${isPlaying ? "bg-[#f4f4f4] border-[#c4c7c7] text-[#444748]" : "border-black hover:bg-[#f4f4f4] text-black"}`}
            >
              <Play
                size={20}
                className={isPlaying ? "opacity-50" : ""}
                fill={isPlaying ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <div
              className={`text-[80px] font-serif font-black leading-none text-black mb-8 tracking-tighter transition-all duration-300 ${isPlaying ? "scale-110 text-[#dc2626]" : ""}`}
            >
              {data.ipaRepresentation}
            </div>

            {/* Phonetic Illustration Placeholder */}
            <div className="w-full max-w-[200px] h-[150px] border border-[#c4c7c7] bg-white flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#f4f4f4] opacity-50"></div>
              {/* Simulated SVG anatomical representation */}
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#c4c7c7] relative z-10"
              >
                <path
                  d="M20,80 C30,70 40,40 60,40 C70,40 80,50 90,60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20,60 C40,50 50,20 70,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <circle cx="60" cy="40" r="4" fill="currentColor" />
              </svg>
              <span className="font-sans font-bold text-[12px] leading-none text-[#444748] absolute bottom-2 right-2 bg-white px-1 z-20">
                Fig 1. Placement
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interaction Area */}
        <div className="flex flex-col items-center justify-center h-full p-6 min-h-[350px]">
          {/* Feedback Area */}
          <div
            className={`w-full mb-12 flex flex-col items-center transition-opacity duration-300 ${recordingState === "idle" ? "opacity-50" : "opacity-100"}`}
          >
            <div
              className={`w-16 h-1 mb-4 transition-colors ${recordingState === "recording" ? "bg-[#dc2626]" : recordingState === "recorded" ? "bg-black" : "bg-[#e2e2e2]"}`}
            ></div>
            <span
              className={`font-sans font-medium text-[14px] leading-[1.4] ${recordingState === "recording" ? "text-[#dc2626] font-bold animate-pulse" : recordingState === "recorded" ? "text-emerald-700 font-bold" : "text-[#c4c7c7]"}`}
            >
              {recordingState === "idle" &&
                "En attente de votre enregistrement..."}
              {recordingState === "recording" && "Enregistrement en cours..."}
              {recordingState === "recorded" &&
                "Prononciation excellente ! (98%)"}
            </span>
          </div>

          {/* Recording Button */}
          <div className="relative flex flex-col items-center group">
            {/* Pulsing effect rings */}
            {recordingState === "recording" && (
              <div className="absolute top-0 left-[calc(50%-48px)] w-24 h-24 rounded-full border-2 border-[#dc2626] animate-pulse-ring z-0"></div>
            )}

            <button
              onClick={handleRecordClick}
              aria-label="Commencer l'enregistrement"
              className={`
                w-24 h-24 rounded-full border flex items-center justify-center transition-all duration-300 z-10 outline-none cursor-pointer
                ${
                  recordingState === "recording"
                    ? "bg-[#ffdad6] border-[#dc2626] text-[#dc2626] scale-110 shadow-lg"
                    : recordingState === "recorded"
                      ? "bg-[#e2e2e2] border-black text-black"
                      : "bg-[#f9f9f9] border-black text-black hover:bg-[#ffdad6] hover:border-[#dc2626] hover:text-[#dc2626]"
                }
              `}
            >
              <Mic size={40} />
            </button>

            <span
              className={`font-sans font-bold text-[10px] leading-none tracking-[0.08em] mt-6 uppercase ${recordingState === "recording" ? "text-[#dc2626]" : "text-black"}`}
            >
              {recordingState === "recording"
                ? "En Cours"
                : recordingState === "recorded"
                  ? "Réessayer"
                  : "Enregistrer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
