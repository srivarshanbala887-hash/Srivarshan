import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Ticket, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import ManageParticipantsModal from '../components/ManageParticipantsModal';
import { CATEGORIES } from '../data/mockEvents';

export default function AdminDashboard({ onNavigate }) {
  const { 
    events, 
    registrations, 
    deleteEvent, 
    updateEvent,
    setSelectedEventForModal 
  } = useEvents();

  const [searchTable, setSearchTable] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeParticipantEvent, setActiveParticipantEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Core metrics
  const totalEvents = events.length;
  const totalStudents = 3420 + registrations.length;
  const totalRegistrations = registrations.length;
  const upcomingEventsCount = events.filter(e => e.status === 'Upcoming').length;

  // Chart 1: Category Distribution calculations
  const categoryCounts = CATEGORIES.filter(c => c !== 'All').map(cat => ({
    name: cat,
    count: events.filter(e => e.category === cat).length
  })).filter(item => item.count > 0);

  const totalCategorized = categoryCounts.reduce((acc, c) => acc + c.count, 0) || 1;

  // Chart 2: Monthly Registrations Trend Data
  const monthlyData = [
    { month: 'Jun', count: 180 },
    { month: 'Jul', count: 320 },
    { month: 'Aug', count: 540 },
    { month: 'Sep', count: 890 },
    { month: 'Oct (Proj)', count: 1420 },
  ];
  const maxMonthCount = Math.max(...monthlyData.map(d => d.count));

  // Filtered Events Table
  const tableEvents = events.filter(evt => {
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchTable.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchTable.toLowerCase()) ||
      evt.department.toLowerCase().includes(searchTable.toLowerCase());

    if (selectedCategoryFilter !== 'All') {
      return matchesSearch && evt.category === selectedCategoryFilter;
    }
    return matchesSearch;
  });

  const handleDelete = (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"? This will remove the event and all associated student registrations.`)) {
      deleteEvent(eventId);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    updateEvent(editingEvent.id, editingEvent);
    setEditingEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Admin Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-100 text-ai-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-ai-600" />
            University Event Administration & Analytics Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            Admin Intelligence Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time campus engagement metrics, participation predictions, and event controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('create-event')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-campus-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-bold text-xs shadow-md shadow-campus-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Event
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP 4 METRICS CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Events */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Events</span>
            <h3 className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{totalEvents}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% from last semester
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-campus-100 text-campus-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Total Students */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <h3 className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{totalStudents.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              88% active participation
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-ai-100 text-ai-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Registrations */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Registrations</span>
            <h3 className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{totalRegistrations}</h3>
            <p className="text-[11px] text-campus-600 font-semibold mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Real-time synchronized
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Events</span>
            <h3 className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{upcomingEventsCount}</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Scheduled this month
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. ANALYTICS CHARTS SECTION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Event Participation & Capacity Utilization */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-campus-600" />
                <h3 className="font-extrabold text-base text-slate-900 font-['Outfit']">
                  Event Participation & Capacity Ratio
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Registered attendees vs maximum hall seating
              </p>
            </div>
            <span className="text-xs font-bold text-campus-600 bg-campus-50 px-2.5 py-1 rounded-full border border-campus-200">
              Live Venue Analytics
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {events.slice(0, 5).map(evt => {
              const ratio = Math.min(100, Math.round((evt.registeredCount / evt.maxParticipants) * 100));
              return (
                <div key={evt.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                      {evt.title}
                    </span>
                    <span className="font-bold text-slate-600 font-mono">
                      {evt.registeredCount} / {evt.maxParticipants} ({ratio}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        ratio >= 90 ? 'bg-rose-500' : ratio >= 70 ? 'bg-amber-500' : 'bg-campus-600'
                      }`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Events by Category Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-ai-600" />
              <h3 className="font-extrabold text-base text-slate-900 font-['Outfit']">
                Events by Category
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Current curriculum balance
          </p>

          <div className="space-y-3 pt-2">
            {categoryCounts.map((cat, idx) => {
              const pct = Math.round((cat.count / totalCategorized) * 100);
              const colors = [
                'bg-campus-500',
                'bg-ai-500',
                'bg-emerald-500',
                'bg-amber-500',
                'bg-rose-500',
                'bg-indigo-500',
                'bg-cyan-500'
              ];
              const color = colors[idx % colors.length];

              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                      {cat.name}
                    </span>
                    <span className="text-slate-500">{cat.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Chart 3: Monthly Registrations Growth Bar Chart */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-campus-300 mb-1 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Growth Trajectory
            </div>
            <h3 className="text-xl font-bold font-['Outfit']">
              Monthly Student Registration Acceleration
            </h3>
            <p className="text-xs text-slate-400">
              Historical sign-ups with AI predictive forecast for upcoming peak months
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-campus-300">
              <span className="w-3 h-3 rounded-sm bg-campus-500" />
              Completed
            </span>
            <span className="flex items-center gap-1.5 text-ai-300">
              <span className="w-3 h-3 rounded-sm bg-ai-500" />
              AI Projected
            </span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-44 flex items-end justify-between gap-4 pt-4 border-b border-white/10 pb-4">
          {monthlyData.map((data, idx) => {
            const heightPercent = Math.round((data.count / maxMonthCount) * 100);
            const isProjected = idx === monthlyData.length - 1;
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.count}
                </span>
                <div
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 ${
                    isProjected
                      ? 'bg-gradient-to-t from-ai-600 to-ai-400 border border-ai-300'
                      : 'bg-gradient-to-t from-campus-600 to-campus-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-semibold text-slate-400 mt-1">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EVENT MANAGEMENT TABLE WITH FULL CRUD & PARTICIPANT ACTIONS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 font-['Outfit']">
              Campus Events Directory & Participant Management
            </h3>
            <p className="text-xs text-slate-500">
              View registrations, edit event metadata, or release seats.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search table..."
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[10px] uppercase font-extrabold text-slate-400 border-b border-slate-200 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4">Category / Dept</th>
                <th className="py-3.5 px-4">Date & Venue</th>
                <th className="py-3.5 px-4">Capacity Status</th>
                <th className="py-3.5 px-4">AI Prediction</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableEvents.map((evt) => {
                const percent = Math.round((evt.registeredCount / evt.maxParticipants) * 100);
                return (
                  <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Event Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.banner}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p 
                            onClick={() => setSelectedEventForModal(evt)}
                            className="font-bold text-slate-900 hover:text-campus-600 cursor-pointer truncate max-w-[200px]"
                            title={evt.title}
                          >
                            {evt.title}
                          </p>
                          <span className="text-[10px] text-slate-400">ID: {evt.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Dept */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px] mb-0.5">
                        {evt.category}
                      </span>
                      <p className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {evt.department}
                      </p>
                    </td>

                    {/* Date & Venue */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{evt.date}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{evt.venue}</p>
                    </td>

                    {/* Capacity Utilization */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700">{evt.registeredCount} / {evt.maxParticipants}</span>
                          <span className="text-slate-400">{percent}%</span>
                        </div>
                        <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${percent >= 90 ? 'bg-rose-500' : 'bg-campus-600'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* AI Prediction */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-ai-50 text-ai-700 text-[10px] font-bold border border-ai-200">
                        <Sparkles className="w-3 h-3 text-ai-500" />
                        {evt.turnoutPrediction ? evt.turnoutPrediction.split(' ')[0] : '92% High'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Manage Participants */}
                        <button
                          onClick={() => setActiveParticipantEvent(evt)}
                          className="p-1.5 rounded-lg text-campus-600 hover:bg-campus-50 transition-colors"
                          title="View Registrations & Check-In"
                        >
                          <Users className="w-4 h-4" />
                        </button>

                        {/* Edit Event */}
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Edit Event"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Event */}
                        <button
                          onClick={() => handleDelete(evt.id, evt.title)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Participant Management Modal */}
      {activeParticipantEvent && (
        <ManageParticipantsModal
          event={activeParticipantEvent}
          isOpen={Boolean(activeParticipantEvent)}
          onClose={() => setActiveParticipantEvent(null)}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-['Outfit']">
                Edit Event Details
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-campus-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-campus-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.venue}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-campus-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    required
                    value={editingEvent.maxParticipants}
                    onChange={(e) => setEditingEvent({ ...editingEvent, maxParticipants: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-campus-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-campus-500 bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
