import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Mic, Bell, ChevronRight, Volume2, Sparkles, Send } from 'lucide-react';
import { mockChatMessages } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types';

export const VoiceAssistantScreen: React.FC = () => {
  const { activeLanguage, setLanguage, activeAlert, navigateTo, selectedPlant } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [inputText, setInputText] = useState('');

  const messages = mockChatMessages[activeLanguage];

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
      utterance.lang = activeLanguage === 'en' ? 'en-US' : 'fr-FR';
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
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 flex flex-col justify-between scrollbar-thin">
        {/* En-tête contextuel de la plante en cours */}
        {selectedPlant && (
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Sujet : {selectedPlant.name} ({selectedPlant.species})
            </span>
            <button 
              onClick={() => navigateTo('folder', { plantId: selectedPlant.id })}
              className="text-[11px] font-bold text-emerald-700 hover:underline"
            >
              Voir la fiche
            </button>
          </div>
        )}

        {/* Chat Conversation */}
        <div className="space-y-2.5 pt-0.5 flex-1 overflow-y-auto">
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
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed relative ${
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
                    title="Écouter la réponse"
                  >
                    <Volume2 className={`w-3.5 h-3.5 inline ${isPlayingAudio ? 'animate-pulse text-emerald-500' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Text Option */}
        <div className="relative">
          <input 
            type="text"
            placeholder={activeLanguage === 'wo' ? "Laajal sa laaj fi..." : "Posez une question..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl pl-3 pr-9 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button 
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700 disabled:text-gray-300"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Audio Wave & Interactive Microphone Section */}
        <div className="flex flex-col items-center justify-center my-1 space-y-2">
          {/* Animated Waveform */}
          <div className="flex items-center justify-center gap-1 h-6">
            <span className={`w-1 bg-emerald-500 rounded-full transition-all ${isRecording ? 'animate-wave-1' : 'h-2'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full transition-all ${isRecording ? 'animate-wave-2' : 'h-4'}`}></span>
            <span className={`w-1 bg-emerald-600 rounded-full transition-all ${isRecording ? 'animate-wave-3' : 'h-5'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full transition-all ${isRecording ? 'animate-wave-4' : 'h-3'}`}></span>
            <span className={`w-1 bg-emerald-600 rounded-full transition-all ${isRecording ? 'animate-wave-5' : 'h-5'}`}></span>
            <span className={`w-1 bg-emerald-500 rounded-full transition-all ${isRecording ? 'animate-wave-2' : 'h-3'}`}></span>
            <span className={`w-1 bg-emerald-400 rounded-full transition-all ${isRecording ? 'animate-wave-1' : 'h-1.5'}`}></span>
          </div>

          {/* Central Mic Button */}
          <button
            onClick={handleMicClick}
            className={`w-13 h-13 p-3.5 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 shadow-md ${
              isRecording 
                ? 'bg-red-500 ring-4 ring-red-200 animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-100'
            }`}
            aria-label="Enregistrer un message vocal"
            title="Appuyer pour parler"
          >
            <Mic className="w-5 h-5" />
          </button>
          <span className="text-[10px] text-gray-400 font-medium">
            {isRecording ? "Écoute en cours..." : "Appuyez pour parler"}
          </span>
        </div>

        {/* Language Selector (FR, WO, EN) */}
        <div className="bg-gray-100/90 p-1 rounded-full flex items-center justify-between border border-gray-200">
          <button
            onClick={() => setLanguage('fr' as SupportedLanguage)}
            className={`flex-1 py-1 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeLanguage === 'fr'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇮🇹</span>
            <span>Français</span>
          </button>

          <button
            onClick={() => setLanguage('wo' as SupportedLanguage)}
            className={`flex-1 py-1 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeLanguage === 'wo'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇸🇳</span>
            <span>Wolof</span>
          </button>

          <button
            onClick={() => setLanguage('en' as SupportedLanguage)}
            className={`flex-1 py-1 px-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeLanguage === 'en'
                ? 'bg-[#10564F] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        {/* Urgent Alert Card - Interactive: Clic pour ouvrir la plante concernée ! */}
        <div 
          onClick={() => navigateTo('folder', { plantId: 'p2' })}
          className="bg-red-50/90 border border-red-100 rounded-2xl p-3 shadow-sm hover:border-red-300 transition cursor-pointer group"
          title="Cliquer pour voir la fiche de la Plante 2 concernée par cette alerte"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-red-900">{activeAlert.title}</span>
            </div>
            <div className="flex items-center text-[10px] text-red-600 font-bold group-hover:translate-x-0.5 transition gap-0.5">
              <span>Voir la plante</span>
              <ChevronRight className="w-3.5 h-3.5 text-red-400" />
            </div>
          </div>

          <p className="text-xs text-red-800 font-medium mt-1.5 pl-8 leading-snug">
            {activeAlert.message}
          </p>

          <div className="text-[10px] text-red-400 text-right mt-1 font-semibold">
            {activeAlert.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
