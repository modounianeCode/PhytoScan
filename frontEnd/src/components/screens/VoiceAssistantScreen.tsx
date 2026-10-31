import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Mic, Bell, ChevronRight, Volume2 } from 'lucide-react';
import { mockChatMessages, mockAlert } from '../../data/mockData';
import { SupportedLanguage } from '../../types';

export const VoiceAssistantScreen: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('fr');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const messages = mockChatMessages[currentLang];
  const alertItem = mockAlert[currentLang];

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
      }, 3500);
    }
  };

  const handleSpeakBotMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'en' ? 'en-US' : 'fr-FR';
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/80 max-w-[380px] w-full mx-auto select-none">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 flex flex-col justify-between scrollbar-thin">
        {/* Chat Conversation */}
        <div className="space-y-3 pt-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-700">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                  </svg>
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed relative ${
                  msg.sender === 'user'
                    ? 'bg-[#10564F] text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/70'
                }`}
              >
                {msg.text}
                {msg.sender === 'assistant' && (
                  <button 
                    onClick={() => handleSpeakBotMessage(msg.text)}
                    className="ml-1.5 inline-block text-emerald-700 hover:text-emerald-900 align-middle"
                    title="Écouter"
                  >
                    <Volume2 className={`w-3.5 h-3.5 inline ${isPlayingAudio ? 'animate-pulse text-emerald-500' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Audio Wave & Interactive Microphone Section */}
        <div className="flex flex-col items-center justify-center my-1 space-y-2.5">
          {/* Animated Waveform */}
          <div className="flex items-center justify-center gap-1 h-8">
            <span className={`w-1 bg-emerald-500 rounded-full ${isRecording ? 'animate-wave-1' : 'h-3'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full ${isRecording ? 'animate-wave-2' : 'h-5'}`}></span>
            <span className={`w-1 bg-emerald-600 rounded-full ${isRecording ? 'animate-wave-3' : 'h-7'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full ${isRecording ? 'animate-wave-4' : 'h-4'}`}></span>
            <span className={`w-1 bg-emerald-600 rounded-full ${isRecording ? 'animate-wave-5' : 'h-6'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full ${isRecording ? 'animate-wave-2' : 'h-3'}`}></span>
            <span className={`w-1 bg-emerald-400 rounded-full ${isRecording ? 'animate-wave-1' : 'h-2'}`}></span>
          </div>

          {/* Central Mic Button */}
          <button
            onClick={handleMicClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg ${
              isRecording 
                ? 'bg-red-500 ring-4 ring-red-200 animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-100'
            }`}
            aria-label="Enregistrer un message vocal"
          >
            <Mic className="w-6 h-6" />
          </button>
          <span className="text-[11px] text-gray-400 font-medium">
            {isRecording ? "Écoute en cours..." : "Appuyez pour parler"}
          </span>
        </div>

        {/* Language Selector (FR, WO, EN) */}
        <div className="bg-gray-100/90 p-1 rounded-full flex items-center justify-between border border-gray-200">
          <button
            onClick={() => setCurrentLang('fr')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              currentLang === 'fr'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇮🇹</span>
            <span>Français</span>
          </button>

          <button
            onClick={() => setCurrentLang('wo')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              currentLang === 'wo'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇸🇳</span>
            <span>Wolof</span>
          </button>

          <button
            onClick={() => setCurrentLang('en')}
            className={`flex-1 py-1.5 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              currentLang === 'en'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        {/* Urgent Alert Card */}
        <div className="bg-red-50/90 border border-red-100 rounded-2xl p-3 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-red-900">{alertItem.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5" />
          </div>

          <p className="text-xs text-red-800 font-medium mt-1.5 pl-8 leading-snug">
            {alertItem.message}
          </p>

          <div className="text-[10px] text-red-400 text-right mt-1 font-semibold">
            {alertItem.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
