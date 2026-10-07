import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface AiConsultantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AiConsultantDrawer: React.FC<AiConsultantDrawerProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Bienvenido a GARAM Constructores. Soy su Asesor Técnico y Arquitectónico. Puedo orientarle sobre nuestras 11 obras documentadas, normativas de urbanismo en Galipán y Altamira, especificaciones de concreto visto, acabados de lujo o metodología de gerencia de proyectos. ¿En qué obra o requerimiento técnico desea profundizar?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Detalles de Residencias Caroní',
    'Obras de urbanismo en Galipán',
    'Acabados de Tienda + Restaurante',
    'Obras médicas en Urgencias 9·11',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [messages, loading, isOpen]);

  // Keyboard Escape dismissal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: query, time: userTime },
    ];

    setMessages(newMessages);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: newMessages.slice(1, -1).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (data.reply) {
        setMessages([
          ...newMessages,
          { role: 'assistant', text: data.reply, time: assistantTime },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            text: data.error || 'Disculpe, ocurrió un inconveniente. Por favor intente nuevamente.',
            time: assistantTime,
          },
        ]);
      }
    } catch (err) {
      console.error('Error connecting to AI consultant:', err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: 'Servicio de consulta no disponible temporalmente. Puede solicitar una atención personalizada directamente con nuestra gerencia de proyectos.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop for click outside dismissal */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer animate-fade-in"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 right-0 z-10 w-full max-w-lg bg-white border-l border-[#e5e5ea] shadow-2xl flex flex-col justify-between animate-slide-left cursor-default"
      >
        {/* Top Header */}
        <div className="bg-[#f5f5f7] text-[#25225a] p-4 sm:p-6 flex items-center justify-between border-b border-[#e5e5ea] shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#25225a] text-white rounded-full">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-[#6e6e73] uppercase">
              GARAM ASESOR TÉCNICO
            </div>
            <h2 className="text-base font-bold text-[#25225a]">Inteligencia de Portafolio</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-[#6e6e73] hover:text-[#25225a] hover:bg-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-sans">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 bg-[#25225a] text-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-4 max-w-[85%] space-y-1 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-[#25225a] text-white'
                  : 'bg-[#f5f5f7] border border-[#e5e5ea] text-[#25225a]'
              }`}
            >
              <div className="leading-relaxed whitespace-pre-line font-normal text-xs sm:text-[13px]">
                {msg.text}
              </div>
              <div
                className={`text-[9px] text-right pt-1 ${
                  msg.role === 'user' ? 'text-white/70' : 'text-[#86868b]'
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 bg-[#f5f5f7] text-[#25225a] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-xs text-[#86868b] pt-2">
            <div className="w-7 h-7 bg-[#25225a] text-white rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>Analizando especificaciones de obra...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-[#fbfbfd] border-t border-[#e5e5ea] shrink-0">
        <div className="text-[10px] font-semibold text-[#86868b] uppercase mb-2">
          Consultas rápidas:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              className="px-3 py-1 bg-white hover:bg-[#25225a] hover:text-white border border-[#e5e5ea] rounded-full text-[11px] text-[#25225a] transition-all text-left shadow-2xs"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-[#e5e5ea] space-y-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregunte sobre materiales, obras o cotizaciones..."
            className="flex-1 p-2.5 bg-[#f5f5f7] rounded-full border border-transparent focus:border-[#25225a] focus:bg-white text-xs text-[#25225a] focus:outline-none transition-all pl-4"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="p-2.5 bg-[#25225a] text-white rounded-full hover:bg-[#1d1b46] disabled:opacity-50 transition-colors shadow-sm"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-[#86868b] pt-1 px-1">
          <span>GARAM AI Assistant</span>
          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="text-[#25225a] font-semibold underline hover:text-blue-700"
          >
            Solicitar Cotización Humana
          </button>
        </div>
      </div>

    </div>
  </div>
);
};
