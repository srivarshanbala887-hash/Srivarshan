import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  CheckCircle, 
  Circle, 
  User, 
  Users, 
  Mail, 
  Ticket,
  GraduationCap
} from 'lucide-react';
import { useEvents } from '../context/EventContext';

export default function ManageParticipantsModal({ event, isOpen, onClose }) {
  const { registrations, toggleAttendance } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttended, setFilterAttended] = useState('all'); // 'all' | 'attended' | 'pending'

  if (!isOpen || !event) return null;

  // Filter registrations for this specific event
  const eventRegistrations = registrations.filter(r => r.eventId === event.id);

  const filteredList = eventRegistrations.filter(reg => {
    const matchesSearch = 
      reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.ticketId.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterAttended === 'attended') return matchesSearch && reg.attended;
    if (filterAttended === 'pending') return matchesSearch && !reg.attended;
    return matchesSearch;
  });

  const attendedCount = eventRegistrations.filter(r => r.attended).length;

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Student Name', 'Student ID', 'Department', 'Email', 'Status', 'Attended'];
    const rows = eventRegistrations.map(r => [
      r.ticketId,
      `"${r.studentName}"`,
      r.studentId,
      `"${r.department}"`,
      r.studentEmail,
      r.status,
      r.attended ? 'Yes' : 'No'
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}_Attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-ai-100 text-ai-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Participant Management Roster
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-sm sm:max-w-md">
                {event.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Attendance Summary Bar */}
        <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Registered</span>
              <strong className="text-slate-900 text-sm">{eventRegistrations.length} students</strong>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Checked In</span>
              <strong className="text-emerald-600 text-sm">{attendedCount} present</strong>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Remaining Capacity</span>
              <strong className="text-campus-600 text-sm">{Math.max(0, event.maxParticipants - event.registeredCount)} seats</strong>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-campus-600" />
            Export CSV
          </button>
        </div>

        {/* Filter and Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, ID, or ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['all', 'attended', 'pending'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterAttended(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  filterAttended === filter
                    ? 'bg-campus-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Attendees Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-600 text-xs">No registrations found matching criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredList.map((reg) => (
                <div key={reg.ticketId} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/60 rounded-xl px-2 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                      {reg.studentName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {reg.studentName}
                        </h4>
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                          {reg.ticketId}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {reg.studentId} • {reg.department}
                      </p>
                    </div>
                  </div>

                  {/* Attendance Check-in Toggle */}
                  <button
                    onClick={() => toggleAttendance(reg.ticketId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      reg.attended
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {reg.attended ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Present</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mark Present</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
          >
            Close Roster
          </button>
        </div>

      </div>
    </div>
  );
}
