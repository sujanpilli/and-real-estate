import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';

const AgentChat = ({ propertyTitle = '', userName = '', userEmail = '', onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 1,
        sender: 'agent',
        text: `Hello ${userName || 'there'}! Thank you for inquiring about "${propertyTitle || 'our listings'}". My name is Rajesh Kumar.`
      }
    ]);

    // Send second greeting after 1.2 seconds
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: 2,
            sender: 'agent',
            text: 'I have received your email details. Would you like to schedule a physical walkthrough or discuss pricing options over a quick call?'
          }
        ]);
      }, 1000);
    }, 1200);

    return () => clearTimeout(timer);
  }, [propertyTitle, userName]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Trigger agent typing fallback
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: 'Understood. Let me double-check the availability of slots with the builder/owner and coordinate. I will update you here shortly or call you directly.'
        }
      ]);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all z-50 duration-300 hover:scale-105"
        title="Open consultant chat"
      >
        <MessageSquare size={24} className="animate-bounce" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[450px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col border border-slate-100 dark:border-slate-800 transition-all z-50 overflow-hidden duration-300">
      {/* Chat Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-yellow-400/20 text-yellow-400 dark:text-yellow-400 flex items-center justify-center font-bold">
              RK
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h4 className="text-sm font-bold">Rajesh Kumar</h4>
            <p className="text-[10px] text-slate-400">AND Consultant Agent</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Minimize"
          >
            <X size={18} />
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Close chat completely"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Messages Box */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/40">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {msg.sender === 'agent' && (
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
                RK
              </div>
            )}
            <div 
              className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800/80 shadow-xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
              RK
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800/80 shadow-xs flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 dark:focus:ring-yellow-400 dark:text-slate-100 bg-transparent outline-none transition-all"
        />
        <button 
          type="submit" 
          className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white p-2 rounded-xl transition-colors cursor-pointer"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default AgentChat;
