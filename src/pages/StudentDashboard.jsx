import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  CheckCircle, 
  AlertTriangle, 
  Bookmark, 
  ArrowRight, 
  GraduationCap,
  TrendingUp,
  Sliders,
  History,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import AIRecommender from '../components/AIRecommender';

export default function StudentDashboard({ onNavigate }) {
  const { 
    user, 
    events, 
    registrations, 
    notifications,
    recentlyViewedIds,
    setSelectedEventForModal,
    setActiveTicketForModal,
    calculateAIMatch
  } = useEvents();

  // Active student registrations
  const studentRegistrations = registrations.filter(
    r => r.userId === user?.id || r.studentEmail === user?.email
  );

  // Map to event objects
  const upcomingRegisteredEvents = events.filter(e => 
    studentRegistrations.some(r => r.eventId === e.id) && e.status !== 'Completed'
  );

  // Recently viewed events
  const recentlyViewedEvents = events.filter(e => recentlyViewedIds.includes(e.id));

  // Urgent reminders (deadline closing or starting tomorrow)
  const urgentReminders = notifications.filter(n => n.type === 'deadline' || n.type === 'reminder');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. PERSONALIZED WELCOME BANNER */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl bg-gradient-to-r from-campus-700 via-indigo-700 to-ai-700 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase">
                  Student Portal
                </span>
                <span className="text-xs text-indigo-200">
                  ID: {user?.studentId || 'CS2023-8492'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] mt-1">
                Welcome back, {user?.name || 'Alex Johnson'}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{user?.department || 'Computer Science & Engineering'} • {user?.year || '3rd Year'}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Registered</span>
              <strong className="text-xl font-black">{studentRegistrations.length}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Attendance</span>
              <strong className="text-xl font-black text-emerald-300">{user?.attendanceRate || 94}%</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Interests</span>
              <strong className="text-xl font-black text-yellow-300">{user?.interests?.length || 4}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EVENT REMINDERS & ALERTS BANNER */}
      {/* ========================================================================= */}
      {urgentReminders.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Active Event Reminder
              </h4>
              <p className="text-xs text-amber-800">
                {urgentReminders[0].message}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shrink-0"
          >
            Review Details
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. AI RECOMMENDED FOR YOU (Exact requirement) */}
      {/* ========================================================================= */}
      <div>
        <AIRecommender
          onViewDetails={(event) => setSelectedEventForModal(event)}
          onRegister={(event) => setSelectedEventForModal(event)}
        />
      </div>

      {/* ========================================================================= */}
      {/* 4. UPCOMING REGISTERED EVENTS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] flex items-center gap-2">
              <Calendar className="w-6 h-6 text-campus-600" />
              Upcoming Registered Events
            </h2>
            <p className="text-xs text-slate-500">
              Your confirmed admission passes with digital QR check-in credentials.
            </p>
          </div>

          <button
            onClick={() => onNavigate('my-events')}
            className="text-xs font-bold text-campus-600 hover:text-campus-700 flex items-center gap-1"
          >
            <span>View All Registrations ({studentRegistrations.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {upcomingRegisteredEvents.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No active event registrations yet.</p>
            <p className="text-xs text-slate-400">Discover exciting workshops and hackathons recommended for your profile!</p>
            <button
              onClick={() => onNavigate('events')}
              className="px-4 py-2 rounded-xl bg-campus-600 text-white text-xs font-bold hover:bg-campus-700 shadow-xs"
            >
              Explore Events Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingRegisteredEvents.map((evt) => {
              const reg = studentRegistrations.find(r => r.eventId === evt.id);
              return (
                <div 
                  key={evt.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                        Seat Confirmed
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {reg?.ticketId}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 font-['Outfit'] line-clamp-1">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {evt.shortDescription}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-campus-600" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-campus-600" />
                        <span>{evt.time.split('-')[0]}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-campus-600" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveTicketForModal(reg)}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-campus-600 to-ai-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      View QR Access Pass
                    </button>
                    <button
                      onClick={() => setSelectedEventForModal(evt)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Event Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. RECENTLY VIEWED EVENTS */}
      {/* ========================================================================= */}
      {recentlyViewedEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] flex items-center gap-2">
              <Eye className="w-6 h-6 text-ai-600" />
              Recently Viewed Events
            </h2>
            <span className="text-xs text-slate-400">
              Pick up where you left off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewedEvents.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={(e) => setSelectedEventForModal(e)}
                onRegister={(e) => setSelectedEventForModal(e)}
                showAIMatch={true}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
