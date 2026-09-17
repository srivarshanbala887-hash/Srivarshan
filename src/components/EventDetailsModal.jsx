import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Ticket, 
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export default function EventDetailsModal({ 
  event, 
  onClose, 
  onRegisterClick, 
  onViewTicket 
}) {
  const { registrations, calculateAIMatch } = useEvents();

  if (!event) return null;

  const registration = registrations.find(r => r.eventId === event.id);
  const isRegistered = Boolean(registration);
  const aiMatch = calculateAIMatch(event);
  const seatsLeft = Math.max(0, event.maxParticipants - event.registeredCount);
  const isFull = seatsLeft <= 0;
  const isCompleted = event.status === 'Completed';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Banner with controls */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 shrink-0">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
              title="Share Event"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Overlays */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-campus-600 text-white text-xs font-bold shadow-md">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold">
              {event.department}
            </span>
            {!isCompleted && (
              <span className="px-3 py-1 rounded-full bg-ai-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                {aiMatch.score}% AI Match
              </span>
            )}
          </div>

          {/* Title on Banner Bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight font-['Outfit'] drop-shadow-md">
              {event.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
              <span>Organized by <strong>{event.organizer}</strong></span>
              {event.facultyAdvisor && <span>• Advisor: {event.facultyAdvisor}</span>}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-campus-100 text-campus-600 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                <p className="text-xs font-bold text-slate-800">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
                <p className="text-xs font-bold text-slate-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Venue</p>
                <p className="text-xs font-bold text-slate-800 truncate" title={event.venue}>
                  {event.venue}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Capacity</p>
                <p className="text-xs font-bold text-slate-800">
                  {seatsLeft} seats left
                </p>
              </div>
            </div>
          </div>

          {/* AI Recommendation Explanation Box */}
          {!isCompleted && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-campus-50 via-ai-50 to-purple-50 border border-ai-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-ai-900 mb-1">
                <Sparkles className="w-4 h-4 text-ai-600" />
                AI Recommendation Insights
              </div>
              <p className="text-xs text-slate-700">
                {aiMatch.reasons.join(' • ')}
              </p>
              {event.turnoutPrediction && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 text-[11px] font-semibold text-slate-700 border border-ai-200">
                  <span>Forecasted Turnout:</span>
                  <strong className="text-campus-700">{event.turnoutPrediction}</strong>
                </div>
              )}
            </div>
          )}

          {/* Detailed Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 font-['Outfit']">
              About The Event
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Speakers / Guests */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 font-['Outfit'] flex items-center gap-2">
                <Award className="w-4 h-4 text-campus-600" />
                Featured Speakers & Mentors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-campus-500/20"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {speaker.name}
                      </h4>
                      <p className="text-[11px] text-campus-700 font-medium truncate">
                        {speaker.role}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {speaker.organization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2 font-['Outfit'] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Rules & Eligibility
              </h3>
              <ul className="space-y-1.5">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-campus-500 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Registration Deadline Warning */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Registration Deadline: <strong>{event.registrationDeadline}</strong>
              </span>
            </div>
            <span className="font-semibold text-[11px] text-amber-700">
              {seatsLeft} seats remaining
            </span>
          </div>

          {/* Contact Organizer */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>Need help? Contact organizer:</span>
            <div className="flex items-center gap-3 font-medium text-slate-700">
              {event.organizerEmail && (
                <a href={`mailto:${event.organizerEmail}`} className="flex items-center gap-1 hover:text-campus-600">
                  <Mail className="w-3.5 h-3.5" />
                  {event.organizerEmail}
                </a>
              )}
              {event.organizerPhone && (
                <a href={`tel:${event.organizerPhone}`} className="flex items-center gap-1 hover:text-campus-600">
                  <Phone className="w-3.5 h-3.5" />
                  {event.organizerPhone}
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Footer Action Sticky Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">Admission Status</p>
            <p className="text-sm font-bold text-slate-800">
              {isCompleted ? 'Event Concluded' : isFull ? 'Capacity Reached' : 'Free University Registration'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-all"
            >
              Close
            </button>

            {isRegistered ? (
              <button
                onClick={() => {
                  onClose();
                  onViewTicket(registration);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Ticket className="w-4 h-4" />
                View Registered Pass
              </button>
            ) : isCompleted ? (
              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-semibold text-xs cursor-not-allowed"
              >
                Event Closed
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onRegisterClick(event);
                }}
                disabled={isFull}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white flex items-center gap-2 shadow-md transition-all ${
                  isFull
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 shadow-campus-500/30 hover:scale-[1.02]'
                }`}
              >
                <span>{isFull ? 'Sold Out' : 'Register Now'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
