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
    <aside aria-label="Canal de Atención VIP" className="fixed bottom-4 right-4 z-40 select-none sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="vip-concierge-panel"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="ios-glass mb-3 w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl border border-brand-stone p-5 text-brand-ink shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-brand-stone">
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
                <h3 className="text-base font-bold text-brand-ink mt-1.5 font-sans">
                  Gerencia de Proyectos GARAM
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Atención directa para propietarios e inversionistas.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-brand-muted/80 hover:text-brand-ink hover:bg-brand-paper transition-colors cursor-pointer"
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
                    <div className="text-xs font-bold text-brand-ink flex items-center gap-1.5">
                      <span>WhatsApp Inmediato</span>
                      <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-semibold">
                        VIP
                      </span>
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Chat directo con Ingeniero Residente
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-ink/60 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Request Formal Estimate */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenInquiry();
                }}
                className="w-full group flex items-center justify-between p-3 rounded-2xl bg-brand-paper hover:bg-white border border-brand-stone transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-ink">
                      Reunión Técnica de Factibilidad
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Coordinación directa con Dirección de Obra
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-ink/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* AI Architectural Advisor */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAiConsultant();
                }}
                className="w-full group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-brand-paper border border-brand-stone transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-ink">
                      Consultor Técnico Digital (IA)
                    </div>
                    <div className="text-[11px] text-brand-muted">
                      Normativas, metrajes y memorias de obra
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-ink/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Trust Footer */}
            <div className="pt-2 border-t border-brand-stone flex items-center justify-between text-[10px] text-brand-muted/80">
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

      {/* Floating contact button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex size-12 shrink-0 items-center justify-center rounded-md border border-brand-stone bg-white text-brand-ink shadow-md transition-all duration-300 hover:border-brand-ink/20 hover:shadow-lg active:scale-95"
        aria-label={isOpen ? 'Cerrar contacto VIP' : 'Abrir contacto VIP'}
        aria-expanded={isOpen}
        aria-controls="vip-concierge-panel"
        title="Contacto VIP"
      >
        <span
          aria-hidden="true"
          className="absolute right-1 top-1 size-2.5 rounded-full border-2 border-white bg-emerald-500"
        />
        <div className="flex size-6 items-center justify-center rounded-full bg-brand-ink text-white transition-transform group-hover:rotate-12">
          <MessageCircle className="size-3.5 fill-current" />
        </div>
      </button>
    </aside>
  );
};
