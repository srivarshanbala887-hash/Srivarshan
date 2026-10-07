import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw, FileCode, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * @class ErrorBoundary
 * @extends {Component}
 * @description Robust React Error Boundary that catches JavaScript runtime errors
 * anywhere in the child component tree, logs diagnostic telemetry, and renders
 * a graceful recovery UI instead of crashing the entire application (fault isolation).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  /**
   * Invoked after an error is thrown by a descendant component.
   * Updates state so the next render will display the fallback UI.
   * @param {Error} error - The caught runtime exception
   * @returns {Object} Updated state slice
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Invoked during the commit phase after a descendant component throws an error.
   * Used for side-effects such as logging diagnostics to external monitoring services.
   * @param {Error} error - The caught error instance
   * @param {React.ErrorInfo} errorInfo - Component stack trace information
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Production telemetry / monitoring logging simulation (e.g., Sentry, Datadog)
    console.group('🚨 [CampusAI ErrorBoundary Diagnostics]');
    console.error('Exception caught by ErrorBoundary:', error);
    console.error('Component Hierarchy Trace:', errorInfo?.componentStack);
    console.groupEnd();
  }

  /**
   * Resets the boundary state to attempt re-rendering the children.
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
  };

  /**
   * Reloads the current browser window.
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * Clears potentially corrupted local storage entries and reloads the application.
   */
  handleResetStorage = () => {
    if (window.confirm('Reset application cache and reload? This clears temporary session storage.')) {
      localStorage.removeItem('campusai_events');
      localStorage.removeItem('campusai_registrations');
      localStorage.removeItem('campusai_user');
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if supplied via props
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.handleReset
        });
      }

      // Default high-grade recovery UI
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 text-white font-sans">
          <div className="max-w-xl w-full bg-slate-800/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header with Alert Icon */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                  Fault Isolation Active
                </span>
                <h1 className="text-xl sm:text-2xl font-black font-['Outfit'] mt-1 text-white">
                  Application Encountered an Exception
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  CampusAI's Error Boundary contained this runtime issue to protect session stability.
                </p>
              </div>
            </div>

            {/* Error Summary Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-xs font-mono text-rose-300 break-words">
              {this.state.error ? this.state.error.toString() : 'Unknown Component Exception'}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={this.handleReset}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-campus-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Render</span>
              </button>

              <button
                onClick={this.handleReload}
                className="py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetStorage}
                className="py-2.5 px-3 rounded-xl border border-slate-600 hover:bg-slate-700/60 text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Reset Cache</span>
              </button>
            </div>

            {/* Collapsible Diagnostic Trace (For Faculty / Code Review) */}
            <div className="border-t border-slate-700/80 pt-4">
              <button
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-campus-400" />
                  Technical Stack Trace (Reviewers & Developers)
                </span>
                {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-48 border border-slate-800 space-y-2">
                  <div>
                    <strong className="text-rose-400 block mb-1">Stack:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.error?.stack || 'No stack available'}</pre>
                  </div>
                  {this.state.errorInfo?.componentStack && (
                    <div className="pt-2 border-t border-slate-800">
                      <strong className="text-ai-400 block mb-1">Component Tree:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
