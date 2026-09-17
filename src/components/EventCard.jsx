import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  CheckCircle,
  Tag
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export default function EventCard({ 
  event, 
  onViewDetails, 
  onRegister,
  showAIMatch = true 
}) {
  const { calculateAIMatch, registrations } = useEvents();

  const isRegistered = registrations.some(r => r.eventId === event.id);
  const aiMatch = event.aiMatch || calculateAIMatch(event);
  const seatsLeft = Math.max(0, event.maxParticipants - event.registeredCount);
  const isFull = seatsLeft <= 0;
  const isCompleted = event.status === 'Completed';

  // Urgency indicator for seats
  const percentFilled = Math.round((event.registeredCount / event.maxParticipants) * 100);

  // Category badge colors
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Hackathon':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Workshop':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Coding Competition':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Placement Training':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cultural Event':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Sports':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Seminar':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Club Activity':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-campus-300 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Banner Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category Chip */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(event.category)}`}>
            {event.category}
          </span>

          {/* AI Match Badge */}
          {showAIMatch && !isCompleted && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-xs font-bold border border-ai-400/40 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse-slow" />
              <span className="bg-gradient-to-r from-campus-300 to-ai-300 bg-clip-text text-transparent">
                {aiMatch.score}% Match
              </span>
            </div>
          )}

          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 text-xs font-semibold border border-slate-700">
              Completed
            </span>
          )}
        </div>

        {/* Department Chip at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs">
          <span className="flex items-center gap-1.5 truncate max-w-[80%] drop-shadow-sm font-medium">
            <Building2 className="w-3.5 h-3.5 text-campus-300 shrink-0" />
            <span className="truncate">{event.department}</span>
          </span>
          {event.registeredCount > 50 && !isCompleted && (
            <span className="px-2 py-0.5 rounded bg-rose-500/80 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
              Trending 🔥
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Title */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="text-lg font-bold text-slate-900 group-hover:text-campus-600 transition-colors line-clamp-1 cursor-pointer font-['Outfit']"
            title={event.title}
          >
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

          {/* Meta Info Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-campus-500 shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-campus-500 shrink-0" />
              <span className="truncate">{event.time.split('-')[0]}</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-campus-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* AI Reason callout if available */}
          {showAIMatch && aiMatch.primaryReason && !isCompleted && (
            <div className="mt-3.5 p-2 rounded-xl bg-ai-50/70 border border-ai-100 flex items-start gap-2 text-[11px] text-ai-900">
              <Sparkles className="w-3.5 h-3.5 text-ai-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">
                <strong>AI Insight:</strong> {aiMatch.primaryReason}
              </span>
            </div>
          )}

          {/* Available Seats Progress Bar */}
          {!isCompleted && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Available Seats
                </span>
                <span className={`font-bold ${seatsLeft <= 15 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {seatsLeft} / {event.maxParticipants} left
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentFilled >= 90
                      ? 'bg-rose-500'
                      : percentFilled >= 70
                      ? 'bg-amber-500'
                      : 'bg-gradient-to-r from-campus-500 to-indigo-600'
                  }`}
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          
          <button
            onClick={() => onViewDetails(event)}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            View Details
          </button>

          {isRegistered ? (
            <button
              disabled
              className="flex-1 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs flex items-center justify-center gap-1 cursor-default"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Registered
            </button>
          ) : isCompleted ? (
            <button
              onClick={() => onViewDetails(event)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs flex items-center justify-center gap-1"
            >
              Past Event
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              disabled={isFull}
              className={`flex-1 px-3 py-2 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1 shadow-xs ${
                isFull
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white shadow-campus-500/20 hover:shadow-md'
              }`}
            >
              <span>{isFull ? 'Sold Out' : 'Register Now'}</span>
              {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
