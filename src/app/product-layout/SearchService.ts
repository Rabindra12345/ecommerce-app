// speech.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private recognition: any;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  start(callback: (text: string) => void) {
    if (!this.recognition) return;

    this.recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      callback(text);
    };

    this.recognition.start();
  }

  stop() {
    this.recognition?.stop();
  }
}