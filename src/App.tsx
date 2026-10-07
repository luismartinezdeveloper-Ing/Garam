import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CorporateProfile } from './components/CorporateProfile';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsCatalog } from './components/ProjectsCatalog';
import { ConstructionEstimator } from './components/ConstructionEstimator';
import { BrandIdentitySection } from './components/BrandIdentitySection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { AiConsultantDrawer } from './components/AiConsultantDrawer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { VipConciergeWidget } from './components/VipConciergeWidget';
import { Project } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState<boolean>(false);

  // Master Dismiss All function to close all open modals/drawers
  const dismissAllModals = useCallback(() => {
    setSelectedProject(null);
    setIsInquiryOpen(false);
    setIsAiConsultantOpen(false);
  }, []);

  // Global Escape key dismiss-all handler
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissAllModals();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [dismissAllModals]);

  // Lock body scroll when any modal/drawer is open
  const hasAnyModalOpen = Boolean(selectedProject || isInquiryOpen || isAiConsultantOpen);

  useEffect(() => {
    if (hasAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasAnyModalOpen]);

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    dismissAllModals();
    setSelectedServiceForInquiry(serviceTitle);
    setIsInquiryOpen(true);
  };

  const handleEstimatorInquiry = (data: { service: string; area: string; location: string; timeline: string }) => {
    dismissAllModals();
    setSelectedServiceForInquiry(`${data.service} (${data.area} en ${data.location})`);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#25225a] flex flex-col font-sans selection:bg-[#25225a] selection:text-white">
      {/* Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* Top Header Navigation */}
      <Header
        onOpenPresentation={() => {
          dismissAllModals();
          setSelectedServiceForInquiry(undefined);
          setIsInquiryOpen(true);
        }}
        onOpenInquiry={() => {
          dismissAllModals();
          setSelectedServiceForInquiry(undefined);
          setIsInquiryOpen(true);
        }}
        onToggleAiConsultant={() => {
          setIsAiConsultantOpen((prev) => !prev);
        }}
        onDismissAll={dismissAllModals}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenPresentation={() => {
            const obrasEl = document.getElementById('obras');
            obrasEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenInquiry={() => {
            dismissAllModals();
            setSelectedServiceForInquiry(undefined);
            setIsInquiryOpen(true);
          }}
        />

        {/* Corporate Profile & Approach (01 & 02) */}
        <CorporateProfile />

        {/* Services Section (03) */}
        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Projects Catalog Section (03) - 11 Obras Completas */}
        <ProjectsCatalog
          onSelectProject={(project) => {
            dismissAllModals();
            setSelectedProject(project);
          }}
        />

        {/* Interactive Construction Estimator (Calculadora de Alcance y Metraje) */}
        <ConstructionEstimator
          onOpenInquiryWithData={handleEstimatorInquiry}
        />

        {/* Brand Identity & Vector Logo Showcase */}
        <BrandIdentitySection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPresentation={() => {
          const obrasEl = document.getElementById('obras');
          obrasEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiry={() => {
          dismissAllModals();
          setSelectedServiceForInquiry(undefined);
          setIsInquiryOpen(true);
        }}
      />

      {/* Project Detail Dossier Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Estimate Inquiry Request Modal */}
      {isInquiryOpen && (
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          preselectedService={selectedServiceForInquiry}
        />
      )}

      {/* AI Architectural Advisor Drawer */}
      {isAiConsultantOpen && (
        <AiConsultantDrawer
          isOpen={isAiConsultantOpen}
          onClose={() => setIsAiConsultantOpen(false)}
          onOpenInquiry={() => {
            dismissAllModals();
            setIsInquiryOpen(true);
          }}
        />
      )}

      {/* Floating VIP Concierge & WhatsApp Lead Capture Widget */}
      <VipConciergeWidget
        onOpenInquiry={() => {
          dismissAllModals();
          setSelectedServiceForInquiry(undefined);
          setIsInquiryOpen(true);
        }}
        onOpenAiConsultant={() => {
          dismissAllModals();
          setIsAiConsultantOpen(true);
        }}
      />

    </div>
  );
}
