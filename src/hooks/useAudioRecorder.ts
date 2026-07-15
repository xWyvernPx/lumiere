import { useState, useRef } from "react";
import { apiClient } from "../lib/apiClient";

export interface AudioUploadResponse {
  id: string;
  path: string;
  url?: string;
}

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  };

  const stopRecording = (): Promise<AudioUploadResponse> => {
    return new Promise((resolve, reject) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) {
        reject(new Error("MediaRecorder not initialized"));
        return;
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setIsRecording(false);
        chunksRef.current = [];
        
        // Stop all tracks
        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");
          
          // Using a mock upload for now, or real API if available
          let responseData;
          try {
            const res = await apiClient.post("/files/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            responseData = res.data || res; // depending on interceptor
          } catch (uploadError) {
            console.warn("Upload API failed, falling back to local blob URL", uploadError);
            const objectUrl = URL.createObjectURL(audioBlob);
            responseData = {
              id: `local-${Date.now()}`,
              path: objectUrl,
              url: objectUrl
            };
          }

          resolve(responseData);
        } catch (error) {
          reject(error);
        }
      };

      mediaRecorder.stop();
    });
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
}
