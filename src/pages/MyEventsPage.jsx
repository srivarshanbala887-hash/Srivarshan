import React, { useState } from 'react';
import { 
  Bookmark, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Award, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import CertificateModal from '../components/CertificateModal';

export default function MyEventsPage({ onNavigate }) {
  const { 
    events, 
    registrations, 
    cancelRegistration, 
    setSelectedEventForModal, 
    setActiveTicketForModal,
    user 
  } = useEvents();

  const [activeTab, setActiveTab] = useState('registered'); // 'registered' | 'upcoming' | 'completed'
  const [selectedCertificateEvent, setSelectedCertificateEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // User's registrations
  const userRegistrations = registrations.filter(
    r => r.userId === user?.id || r.studentEmail === user?.email
  );

  // Group into Upcoming and Completed based on event status
  const registeredWithEvent = userRegistrations.map(reg => {
    const eventObj = events.find(e => e.id === reg.eventId);
    return {
      registration: reg,
      event: eventObj
    };
  }).filter(item => item.event);

  const upcomingList = registeredWithEvent.filter(item => item.event.status !== 'Completed');
  const completedList = registeredWithEvent.filter(item => item.event.status === 'Completed');

  // Filter based on active tab
  let displayedList = [];
  if (activeTab === 'registered') displayedList = registeredWithEvent;
  else if (activeTab === 'upcoming') displayedList = upcomingList;
  else if (activeTab === 'completed') displayedList = completedList;

  // Apply search
  if (searchTerm.trim()) {
    displayedList = displayedList.filter(item =>
      item.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.registration.ticketId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleCancel = (ticketId, eventTitle) => {
    if (window.confirm(`Are you sure you want to cancel your registration for "${eventTitle}"? Your seat will be restored to the available pool.`)) {
      cancelRegistration(ticketId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-campus-50 text-campus-700 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            Student Pass Wallet
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            My Events & Registrations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your active QR entry passes, review upcoming dates, or download attendance certificates.
          </p>
        </div>

        <button
          onClick={() => onNavigate('events')}
          className="px-5 py-2.5 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <span>Find More Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Segmented Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('registered')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
              activeTab === 'registered'
                ? 'bg-white text-campus-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            All Registrations ({registeredWithEvent.length})
          </button>

          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-campus-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Upcoming ({upcomingList.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-campus-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Completed ({completedList.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search my events by title or pass ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white"
          />
        </div>

      </div>

      {/* Cards Display */}
      {displayedList.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">
              No registrations found in this category
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Explore college events recommended for your profile and register to get instant digital passes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="px-5 py-2.5 rounded-xl bg-campus-600 text-white font-bold text-xs hover:bg-campus-700 shadow-xs"
          >
            Explore Events Hub
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedList.map(({ registration, event }) => {
            const isCompleted = event.status === 'Completed';

            return (
              <div 
                key={registration.ticketId}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Status and Pass Code */}
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {isCompleted ? 'Past Event' : 'Confirmed Seat'}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {registration.ticketId}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Registered: {new Date(registration.registeredAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Body with Event Cover and Info */}
                  <div className="p-5 flex gap-4">
                    <img
                      src={event.banner}
                      alt=""
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-campus-600">
                        {event.category}
                      </span>
                      <h3 
                        onClick={() => setSelectedEventForModal(event)}
                        className="font-extrabold text-base text-slate-900 hover:text-campus-600 cursor-pointer transition-colors font-['Outfit'] line-clamp-2 mt-0.5"
                        title={event.title}
                      >
                        {event.title}
                      </h3>

                      <div className="mt-2 space-y-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-campus-600 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Cancellation Button for Upcoming events */}
                  {!isCompleted ? (
                    <button
                      onClick={() => handleCancel(registration.ticketId, event.title)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-colors"
                      title="Cancel Registration"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Registration</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCertificateEvent(event)}
                      className="text-xs font-bold text-yellow-700 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-xl border border-yellow-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-yellow-600" />
                      <span>Download Certificate</span>
                    </button>
                  )}

                  {/* View Details & View Ticket */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedEventForModal(event)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs transition-colors"
                    >
                      Event Details
                    </button>

                    <button
                      onClick={() => setActiveTicketForModal(registration)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-campus-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificateEvent && (
        <CertificateModal
          event={selectedCertificateEvent}
          studentName={user?.name || 'Alex Johnson'}
          isOpen={Boolean(selectedCertificateEvent)}
          onClose={() => setSelectedCertificateEvent(null)}
        />
      )}

    </div>
  );
}
