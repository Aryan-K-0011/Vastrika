import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../../types';
import { sendMessageToStylist } from '../../services/geminiService';

const StylistChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am your personal stylist from Vastrika. Looking for something for a wedding, festival, or a casual outing?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const replyText = await sendMessageToStylist(messages.concat(userMessage), input);
    
    setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
          isOpen ? 'bg-primary rotate-90' : 'bg-accent hover:bg-primary'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <><Sparkles size={20} /><span className="font-medium hidden sm:inline">AI Stylist</span></>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
               <Sparkles size={20} className="text-accent" />
            </div>
            <div>
               <h3 className="font-serif font-semibold">Vastrika Stylist</h3>
               <p className="text-xs text-stone-300">Powered by Gemini</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                     <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                     </div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for outfit advice..."
              className="flex-1 px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:border-accent text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StylistChat;
