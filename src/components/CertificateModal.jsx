import React from 'react';
import { X, Award, Download, Printer, CheckCircle, Sparkles } from 'lucide-react';

export default function CertificateModal({ event, studentName, isOpen, onClose }) {
  if (!isOpen || !event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Controls */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-yellow-500" />
            Official Verified Campus Credential
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Canvas */}
        <div className="p-8 bg-slate-100 flex items-center justify-center print:p-0 print:bg-white">
          <div className="w-full bg-white rounded-xl shadow-lg border-8 border-indigo-900/10 p-8 text-center relative overflow-hidden">
            
            {/* Elegant Corner Decors */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-indigo-600" />
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-indigo-600" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-indigo-600" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-indigo-600" />

            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-900 font-['Outfit']">
                CampusAI Verification Council
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-wider my-3">
              Certificate of Participation
            </h1>

            <p className="text-xs text-slate-500 italic">
              This is proudly presented to
            </p>

            <h2 className="text-xl sm:text-2xl font-black text-indigo-900 font-['Outfit'] underline decoration-campus-400 underline-offset-8 my-3">
              {studentName || 'Alex Johnson'}
            </h2>

            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mt-2">
              for actively attending and successfully contributing to 
              <strong className="block text-slate-900 font-bold mt-1 text-sm">{event.title}</strong>
              organized by the <strong>{event.organizer}</strong> on {event.date}.
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-200 text-xs">
              <div className="text-center">
                <div className="font-serif italic text-base text-slate-700 font-semibold mb-1">
                  Prof. Sarah Miller
                </div>
                <div className="h-0.5 w-24 bg-slate-400 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500 uppercase font-bold">Dean of Campus Events</p>
              </div>
              <div className="text-center">
                <div className="font-serif italic text-base text-slate-700 font-semibold mb-1">
                  {event.facultyAdvisor || 'Lead Coordinator'}
                </div>
                <div className="h-0.5 w-24 bg-slate-400 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500 uppercase font-bold">Event Faculty Chair</p>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[9px] text-slate-400 font-mono">
              Credential ID: CERT-AI-{event.id.toUpperCase()}-{Math.floor(10000 + Math.random() * 90000)} • Blockchain Timestamped
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print / Save Certificate
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
