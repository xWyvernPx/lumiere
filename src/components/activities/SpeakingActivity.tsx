import React, { useState } from "react";
import { Mic, Square, Play, Pause, RefreshCw } from "lucide-react";
import { useAudioRecorder, AudioUploadResponse } from "../../hooks/useAudioRecorder";
import { Button } from "../ui/Button";

interface SpeakingActivityProps {
  data: {
    prompt: string;
    context?: string;
  };
  level?: string;
}

interface AudioHistoryItem extends AudioUploadResponse {
  timestamp: Date;
}

export default function SpeakingActivity({ data, level }: SpeakingActivityProps) {
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [history, setHistory] = useState<AudioHistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleRecord = async () => {
    if (isRecording) {
      setIsProcessing(true);
      try {
        const response = await stopRecording();
        setHistory(prev => [{
          ...response,
          timestamp: new Date()
        }, ...prev]);
      } catch (error) {
        console.error("Recording failed:", error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      try {
        await startRecording();
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-[#c4c7c7] rounded-xl shadow-sm">
      <div className="mb-8 border-b-2 border-black pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#747878] block mb-2">
          {level || "Speaking Practice"}
        </span>
        <h2 className="text-3xl font-serif font-black text-[#1a1c1c]">Speaking Activity</h2>
      </div>

      <div className="bg-[#f4f4f4] p-6 rounded-lg mb-8 border border-[#c4c7c7]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#444748] mb-2">Prompt</h3>
        <p className="text-lg font-serif italic text-[#1a1c1c] mb-4">
          {data.prompt}
        </p>
        {data.context && (
          <p className="text-sm font-medium text-[#747878]">
            Context: {data.context}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center py-10">
        <button
          onClick={handleToggleRecord}
          disabled={isProcessing}
          className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
            isRecording 
              ? "bg-red-50 text-red-500 shadow-[0_0_0_8px_rgba(239,68,68,0.2)] animate-pulse" 
              : "bg-[#1a1c1c] text-white hover:bg-[#444748] hover:scale-105 shadow-xl"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <RefreshCw className="w-8 h-8 animate-spin" />
          ) : isRecording ? (
            <Square className="w-8 h-8 fill-current" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-[#444748]">
          {isProcessing ? "Processing..." : isRecording ? "Recording in progress..." : "Tap to record"}
        </p>
      </div>

      {history.length > 0 && (
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#747878] mb-4 border-b border-[#c4c7c7] pb-2">
            Recording History
          </h3>
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center justify-between p-4 bg-[#f9f9f9] border border-[#eeeeee] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#c4c7c7]">
                    <Mic className="w-4 h-4 text-[#747878]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1c1c]">Attempt #{history.length - idx}</p>
                    <p className="text-xs font-medium text-[#747878]">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <audio controls src={item.url || item.path} className="h-10 w-48" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
