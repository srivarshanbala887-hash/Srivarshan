import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  PartyPopper
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export default function NotificationDrawer({ isOpen, onClose, onNavigateEvent }) {
  const { 
    notifications, 
    markAllNotificationsAsRead, 
    clearNotifications,
    setSelectedEventForModal,
    events
  } = useEvents();

  if (!isOpen) return null;

  const getNotifIcon = (type) => {
    switch (type) {
      case 'registration':
        return <PartyPopper className="w-5 h-5 text-emerald-500" />;
      case 'recommendation':
        return <Sparkles className="w-5 h-5 text-ai-500" />;
      case 'deadline':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'new_event':
      default:
        return <Calendar className="w-5 h-5 text-campus-500" />;
    }
  };

  const handleItemClick = (notif) => {
    if (notif.eventId) {
      const found = events.find(e => e.id === notif.eventId);
      if (found) {
        setSelectedEventForModal(found);
      }
      onNavigateEvent(notif.eventId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-campus-50 border border-campus-200 flex items-center justify-center text-campus-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                  Notifications & Reminders
                </h3>
                <p className="text-xs text-slate-500">
                  {notifications.filter(n => !n.read).length} unread campus updates
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

          {/* Action Bar */}
          {notifications.length > 0 && (
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-600">
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1.5 hover:text-campus-600 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all as read
              </button>
              <button
                onClick={clearNotifications}
                className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-16 px-4 text-slate-400">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-300">
                  <Bell className="w-7 h-7" />
                </div>
                <p className="font-medium text-slate-600 text-sm">All caught up!</p>
                <p className="text-xs text-slate-400 mt-1">No new event updates or reminders right now.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                    notif.read
                      ? 'bg-white border-slate-200/70 hover:border-slate-300'
                      : 'bg-campus-50/50 border-campus-200/80 hover:border-campus-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-100 shrink-0">
                      {getNotifIcon(notif.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>

                      {notif.eventId && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-campus-600 hover:text-campus-700">
                          <span>View Event Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-ai-500" />
              Notifications are prioritized by CampusAI Smart Alert Engine
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
