import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Mic, MicOff } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setQuery(prev => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting recognition:', err);
      }
    }
  };

  const handleStartResearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate API call for starting research
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    router.push('/clarification');
  };

  return (
    <Layout>
      <Head>
        <title>Luimo — Deep Researcher</title>
        <meta name="description" content="Advanced AI Research Agent" />
      </Head>

      <div className="flex flex-col items-center w-full max-w-[500px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-2xl md:text-3xl font-medium text-white text-center mb-12 md:mb-14">
          Deep Researcher
        </h1>

        <div className="w-full space-y-4">
          <div className="relative group">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-24 md:h-32 p-4 pr-12 bg-[#4a4a4a] text-white placeholder-[#b0b0b0] rounded-xl outline-none focus:ring-2 focus:ring-[#7a7a7a] transition-all duration-200 resize-none text-base leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleStartResearch();
                }
              }}
            />

            <button
              onClick={toggleListening}
              className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-white text-black scale-110 animate-pulse'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={isListening ? "Stop Listening" : "Use Voice Input"}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>

          <Button
            onClick={handleStartResearch}
            isLoading={isLoading}
            disabled={!query.trim()}
          >
            Start Research
          </Button>
        </div>

        <p className="mt-6 text-xs text-[#b0b0b0] opacity-60 text-center">
          Tip: Press Ctrl+Enter to start research
        </p>
      </div>
    </Layout>
  );
}
