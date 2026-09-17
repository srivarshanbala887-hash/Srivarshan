import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  QrCode, 
  Sparkles,
  Share2,
  Trash2
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export default function TicketModal({ ticket, isOpen, onClose }) {
  const { cancelRegistration } = useEvents();

  if (!isOpen || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel your registration for "${ticket.eventTitle}"? Your seat will be made available to other students.`)) {
      cancelRegistration(ticket.ticketId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <QrCode className="w-4 h-4 text-campus-600" />
            Official CampusAI Digital Pass
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Area */}
        <div className="p-6 bg-slate-100 print:p-0 print:bg-white" id="printable-ticket">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden relative">
            
            {/* Notch Cutouts */}
            <div className="absolute top-44 -left-3 w-6 h-6 rounded-full bg-slate-100 border-r border-slate-200 z-10" />
            <div className="absolute top-44 -right-3 w-6 h-6 rounded-full bg-slate-100 border-l border-slate-200 z-10" />

            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 text-white p-5 text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                Verified Student Access Pass
              </div>
              <h3 className="font-extrabold text-base font-['Outfit'] line-clamp-2">
                {ticket.eventTitle}
              </h3>
              <p className="text-xs text-indigo-100 mt-1">
                {ticket.eventCategory}
              </p>
            </div>

            {/* Ticket Details */}
            <div className="p-5 pb-4 space-y-3.5 text-xs">
              
              <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Attendee Name</span>
                  <p className="font-bold text-slate-900">{ticket.studentName}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Student ID</span>
                  <p className="font-bold text-slate-900 font-mono">{ticket.studentId}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Department</span>
                  <p className="font-medium text-slate-700 truncate">{ticket.department}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                  <p className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {ticket.status}
                  </p>
                </div>
              </div>

              {/* Event Time and Location */}
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                  <span className="font-medium">{ticket.eventDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                  <span className="font-medium">{ticket.eventTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                  <span className="font-medium">{ticket.venue}</span>
                </div>
              </div>

            </div>

            {/* Dotted Divider */}
            <div className="border-t-2 border-dashed border-slate-200 mx-5 my-2" />

            {/* QR Code Simulation Area */}
            <div className="p-5 pt-2 flex flex-col items-center justify-center text-center bg-slate-50/50">
              
              {/* Simulated High-Res QR SVG */}
              <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                <svg viewBox="0 0 120 120" className="w-28 h-28">
                  {/* Outer corner squares */}
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="#1e1b4b" />
                  <rect x="16" y="16" width="18" height="18" rx="2" fill="white" />
                  <rect x="20" y="20" width="10" height="10" rx="1" fill="#444ce7" />

                  <rect x="80" y="10" width="30" height="30" rx="4" fill="#1e1b4b" />
                  <rect x="86" y="16" width="18" height="18" rx="2" fill="white" />
                  <rect x="90" y="20" width="10" height="10" rx="1" fill="#444ce7" />

                  <rect x="10" y="80" width="30" height="30" rx="4" fill="#1e1b4b" />
                  <rect x="16" y="86" width="18" height="18" rx="2" fill="white" />
                  <rect x="20" y="90" width="10" height="10" rx="1" fill="#444ce7" />

                  {/* Data dots pattern */}
                  <rect x="50" y="15" width="8" height="8" rx="1" fill="#312e81" />
                  <rect x="62" y="15" width="8" height="8" rx="1" fill="#6366f1" />
                  <rect x="50" y="30" width="12" height="6" rx="1" fill="#1e1b4b" />
                  <rect x="70" y="30" width="6" height="12" rx="1" fill="#444ce7" />
                  <rect x="15" y="52" width="14" height="6" rx="1" fill="#6366f1" />
                  <rect x="35" y="52" width="8" height="8" rx="1" fill="#1e1b4b" />
                  <rect x="50" y="50" width="20" height="20" rx="3" fill="#9333ea" />
                  <rect x="56" y="56" width="8" height="8" rx="1" fill="white" />
                  <rect x="80" y="52" width="10" height="8" rx="1" fill="#312e81" />
                  <rect x="96" y="52" width="12" height="6" rx="1" fill="#6366f1" />
                  <rect x="50" y="80" width="8" height="14" rx="1" fill="#1e1b4b" />
                  <rect x="65" y="80" width="14" height="8" rx="1" fill="#444ce7" />
                  <rect x="85" y="85" width="24" height="8" rx="1" fill="#312e81" />
                  <rect x="60" y="95" width="12" height="12" rx="1" fill="#6366f1" />
                  <rect x="80" y="100" width="15" height="8" rx="1" fill="#1e1b4b" />
                </svg>
              </div>

              <p className="font-mono text-xs font-bold text-slate-800 tracking-wider mt-2">
                {ticket.ticketId}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Scan at entrance scanner for instant check-in
              </p>

            </div>

          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between gap-2">
          
          <button
            onClick={handleCancel}
            className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            title="Cancel Registration and release seat"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel Pass</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
