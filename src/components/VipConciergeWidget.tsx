import React, { useState } from 'react';
import { MessageCircle, PhoneCall, Sparkles, X, ChevronRight, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VipConciergeWidgetProps {
  onOpenInquiry: () => void;
  onOpenAiConsultant: () => void;
}

export const VipConciergeWidget: React.FC<VipConciergeWidgetProps> = ({
  onOpenInquiry,
  onOpenAiConsultant,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Pre-configured WhatsApp message for high-net-worth clients
  const defaultWhatsAppText = encodeURIComponent(
    'Hola GARAM Constructores. Me comunico desde su portal web oficial. Deseo consultar especificaciones y disponibilidad para un proyecto de construcción / desarrollo arquitectónico.'
  );
  const whatsAppUrl = `https://wa.me/584141234567?text=${defaultWhatsAppText}`;

  return (
    <aside aria-label="Canal de Atención VIP" className="fixed bottom-6 right-6 z-40 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[340px] sm:w-[380px] rounded-3xl ios-glass border border-[#e5e5ea] shadow-2xl p-5 text-[#25225a] backdrop-blur-xl bg-white/90"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#e5e5ea]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Canal Directo Activo
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#25225a] mt-1.5 font-sans">
                  Gerencia de Proyectos GARAM
                </h3>
                <p className="text-xs text-[#6e6e73] mt-0.5">
                  Atención directa para propietarios e inversionistas.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-[#86868b] hover:text-[#25225a] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Cerrar panel de atención"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Channels */}
            <div className="py-3 space-y-2.5">
              
              {/* WhatsApp VIP Concierge */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#25225a] flex items-center gap-1.5">
                      <span>WhatsApp Inmediato</span>
                      <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-semibold">
                        VIP
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6e6e73]">
                      Chat directo con Ingeniero Residente
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#25225a]/60 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Request Formal Estimate */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenInquiry();
                }}
                className="w-full group flex items-center justify-between p-3 rounded-2xl bg-[#f5f5f7] hover:bg-white border border-[#e5e5ea] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25225a] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#25225a]">
                      Reunión Técnica de Factibilidad
                    </div>
                    <div className="text-[11px] text-[#6e6e73]">
                      Coordinación directa con Dirección de Obra
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#25225a]/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* AI Architectural Advisor */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAiConsultant();
                }}
                className="w-full group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#fbfbfd] border border-[#e5e5ea] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#433e85] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#25225a]">
                      Consultor Técnico Digital (IA)
                    </div>
                    <div className="text-[11px] text-[#6e6e73]">
                      Normativas, metrajes y memorias de obra
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#25225a]/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Trust Footer */}
            <div className="pt-2 border-t border-[#e5e5ea] flex items-center justify-between text-[10px] text-[#86868b]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Confidencialidad Garantizada</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Horario Caracas: 8:00 - 18:00</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group px-4 py-2.5 rounded-full ios-glass border border-[#e5e5ea] shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2.5 bg-white/95 text-[#25225a] hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Abrir Asesoría VIP y Contacto Directo"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        <span className="text-xs font-bold tracking-wide font-sans">
          Contacto VIP
        </span>

        <div className="w-6 h-6 rounded-full bg-[#25225a] text-white flex items-center justify-center ml-0.5 group-hover:rotate-12 transition-transform">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </div>
      </button>
    </aside>
  );
};
