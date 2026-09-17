import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  User, 
  Mail, 
  GraduationCap, 
  Building2, 
  Phone,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEvents } from '../context/EventContext';

export default function RegistrationModal({ event, isOpen, onClose, onViewTicket }) {
  const { user, registerForEvent } = useEvents();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.johnson@campus.edu',
    studentId: user?.studentId || 'CS2023-8492',
    department: user?.department || 'Computer Science & Engineering',
    year: user?.year || '3rd Year (Semester 6)',
    phone: '+1 (555) 019-3388',
    specialNotes: 'Interested in AI agent tracks and mentor sessions.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const result = registerForEvent(event.id, formData);
      setIsSubmitting(false);

      if (result.success) {
        setRegisteredTicket(result.ticket);
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMessage(result.message);
      }
    }, 600);
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CampusAI//Event//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.shortDescription}
LOCATION:${event.venue}
DTSTART:${event.date.replace(/-/g, '')}T090000Z
DTEND:${event.date.replace(/-/g, '')}T170000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-campus-50 via-ai-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-campus-600 to-ai-600 flex items-center justify-center text-white shadow-md shadow-campus-500/20">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                {registeredTicket ? 'Registration Confirmed!' : 'Event Registration'}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-sm">
                {event.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {registeredTicket ? (
            /* SUCCESS STATE */
            <div className="text-center py-4 space-y-5">
              
              {/* Animated Checkmark Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              {/* Exact user requirement heading */}
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600">
                  Campus Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] mt-1">
                  Registration Successful
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Your seat has been reserved. A confirmation and digital QR access pass have been generated.
                </p>
              </div>

              {/* Ticket Preview Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-left shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ai-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-campus-300">
                      Digital Event Pass
                    </span>
                    <p className="font-mono text-xs font-bold text-white tracking-wider">
                      {registeredTicket.ticketId}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    CONFIRMED
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white font-['Outfit'] line-clamp-1">
                  {event.title}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mt-3">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Attendee</span>
                    <strong className="text-white">{registeredTicket.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Student ID</span>
                    <strong className="text-white">{registeredTicket.studentId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Date & Time</span>
                    <span className="text-white">{event.date} • {event.time.split('-')[0]}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Venue</span>
                    <span className="text-white truncate block">{event.venue}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewTicket(registeredTicket);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-campus-600 to-ai-600 text-white font-bold text-xs shadow-md shadow-campus-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  View QR Pass & Badge
                </button>
                <button
                  onClick={handleDownloadCalendar}
                  className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-campus-600" />
                  Add to Calendar
                </button>
              </div>

            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600">Event Fee:</span>
                <span className="font-extrabold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Free Student Entry
                </span>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Student ID & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student ID / Roll No.
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp (For SMS Reminders)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none bg-white"
                  >
                    <option>1st Year (Freshman)</option>
                    <option>2nd Year (Sophomore)</option>
                    <option>3rd Year (Junior)</option>
                    <option>4th Year (Senior)</option>
                    <option>Postgraduate / Masters</option>
                  </select>
                </div>
              </div>

              {/* Special requirements */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Questions / Dietary / Skill Focus (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 focus:ring-1 focus:ring-campus-500 outline-none resize-none"
                  placeholder="e.g. Vegetarian meal, beginner in Python, team mate request..."
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-bold text-xs shadow-lg shadow-campus-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Validating & Confirming Seat...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      Confirm Registration & Generate Pass
                    </span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
