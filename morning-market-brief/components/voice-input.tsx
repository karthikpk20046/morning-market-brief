/**
 * Voice Input Component - Handles voice input and recording
 */

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, StopCircle } from "lucide-react";
import { useState } from "react";

interface VoiceInputProps {
  onVoiceInput: (audioBlob: Blob) => void;
  isLoading: boolean;
}

export function VoiceInput({ onVoiceInput, isLoading }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  
  // In a real implementation, this would use the MediaRecorder API
  const startRecording = () => {
    console.log('Starting voice recording...');
    setIsRecording(true);
  };
  
  const stopRecording = () => {
    console.log('Stopping voice recording...');
    setIsRecording(false);
    
    // Mock creating a Blob
    const mockBlob = new Blob(['audio data'], { type: 'audio/webm' });
    onVoiceInput(mockBlob);
  };

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">
          {isRecording ? (
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full h-16 w-16 flex items-center justify-center"
              onClick={stopRecording}
              disabled={isLoading}
            >
              <StopCircle className="h-8 w-8" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              className="rounded-full h-16 w-16 flex items-center justify-center bg-primary hover:bg-primary/90"
              onClick={startRecording}
              disabled={isLoading}
            >
              <Mic className="h-8 w-8" />
            </Button>
          )}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {isRecording ? "Recording... Click to stop" : "Click to start voice input"}
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Try asking: "What's our risk exposure in Asia tech stocks today?"
        </p>
      </CardContent>
    </Card>
  );
}
