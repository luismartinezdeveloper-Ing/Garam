import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { GaramLogo } from './GaramLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by GARAM ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 text-[#25225a] font-sans">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 text-center space-y-6">
            <div className="flex justify-center mb-2">
              <GaramLogo className="h-10 text-[#25225a]" />
            </div>

            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-200 text-amber-600">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#25225a]">
                Aviso de Rendimiento Técnico
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Hemos detectado una anomalía momentánea en la interfaz. El equipo técnico ha sido notificado y sus datos de navegación están protegidos.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25225a] text-white rounded-xl text-sm font-semibold hover:bg-[#343078] transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Recargar Plataforma
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Volver al Inicio
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              GARAM Constructores &copy; {new Date().getFullYear()} &middot; Soporte de Ingeniería
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
