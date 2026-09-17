import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  Sparkles, 
  X, 
  ChevronDown, 
  Compass, 
  RotateCcw,
  TrendingUp,
  Layers
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { CATEGORIES, DEPARTMENTS } from '../data/mockEvents';

export default function EventsPage() {
  const { 
    events, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedDepartment, 
    setSelectedDepartment, 
    selectedDateFilter, 
    setSelectedDateFilter, 
    selectedStatusFilter, 
    setSelectedStatusFilter,
    sortBy,
    setSortBy,
    setSelectedEventForModal,
    trackEventView,
    calculateAIMatch
  } = useEvents();

  // Smart Search suggestions
  const searchSuggestions = [
    'AI & Machine Learning',
    'Hackathons',
    'Placement Training',
    'Cultural Fiesta',
    'Cybersecurity'
  ];

  // Filtering & Sorting
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Text Search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(query);
          const matchDesc = (event.description || '').toLowerCase().includes(query);
          const matchOrg = (event.organizer || '').toLowerCase().includes(query);
          const matchDept = (event.department || '').toLowerCase().includes(query);
          const matchSkills = (event.skills || []).some(s => s.toLowerCase().includes(query));
          const matchTags = (event.tags || []).some(t => t.toLowerCase().includes(query));

          if (!matchTitle && !matchDesc && !matchOrg && !matchDept && !matchSkills && !matchTags) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }

        // Department Filter
        if (selectedDepartment !== 'All Departments' && event.department !== selectedDepartment) {
          return false;
        }

        // Status Filter (Upcoming / Completed)
        if (selectedStatusFilter !== 'All') {
          if (selectedStatusFilter === 'Upcoming' && event.status === 'Completed') return false;
          if (selectedStatusFilter === 'Completed' && event.status !== 'Completed') return false;
        }

        // Date Filter
        if (selectedDateFilter === 'Upcoming' && event.status === 'Completed') return false;
        if (selectedDateFilter === 'Completed' && event.status !== 'Completed') return false;

        return true;
      })
      .map(event => ({
        ...event,
        aiMatch: calculateAIMatch(event)
      }))
      .sort((a, b) => {
        if (sortBy === 'ai_match') {
          return b.aiMatch.score - a.aiMatch.score;
        }
        if (sortBy === 'date_asc') {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === 'popularity') {
          return (b.popularityScore || 0) - (a.popularityScore || 0);
        }
        if (sortBy === 'seats_left') {
          const seatsA = a.maxParticipants - a.registeredCount;
          const seatsB = b.maxParticipants - b.registeredCount;
          return seatsB - seatsA;
        }
        return 0;
      });
  }, [events, searchQuery, selectedCategory, selectedDepartment, selectedDateFilter, selectedStatusFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDepartment('All Departments');
    setSelectedDateFilter('All');
    setSelectedStatusFilter('All');
    setSortBy('ai_match');
  };

  const handleOpenDetails = (event) => {
    trackEventView(event.id);
    setSelectedEventForModal(event);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-campus-50 text-campus-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Live Event Discovery Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            Discover Campus Events
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search, filter, and register for hundreds of university competitions, workshops, and gatherings.
          </p>
        </div>

        {/* Quick Active Counts */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Showing <strong>{filteredEvents.length}</strong> of {events.length} events</span>
        </div>
      </div>

      {/* Search & Filter Controls Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
        
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Smart Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Smart Search: Type topic, skill (e.g. 'Python', 'AI'), organizer, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm rounded-2xl border border-slate-200 focus:border-campus-500 focus:ring-2 focus:ring-campus-500/20 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* AI Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:border-campus-500 outline-none"
            >
              <option value="ai_match">✨ Highest AI Match</option>
              <option value="date_asc">📅 Date: Earliest First</option>
              <option value="popularity">🔥 Highest Popularity</option>
              <option value="seats_left">👥 Most Seats Available</option>
            </select>
          </div>

        </div>

        {/* Quick Search Tag Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium text-[11px]">Popular searches:</span>
          {searchSuggestions.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-campus-50 hover:text-campus-700 text-slate-600 transition-colors text-[11px]"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Row 2: Multi-Faceted Filters (Category, Department, Status, Date) */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 font-medium focus:border-campus-500 outline-none bg-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 font-medium focus:border-campus-500 outline-none bg-white truncate"
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Status Filter (Upcoming / Completed) */}
          <div>
            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
              Event Status
            </label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 font-medium focus:border-campus-500 outline-none bg-white"
            >
              <option value="All">All Events</option>
              <option value="Upcoming">Upcoming Events Only</option>
              <option value="Completed">Completed / Past Events</option>
            </select>
          </div>

          {/* Date Filter Quick Selector */}
          <div>
            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">
              Date Horizon
            </label>
            <div className="flex items-center gap-1">
              <select
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 font-medium focus:border-campus-500 outline-none bg-white"
              >
                <option value="All">All Horizons</option>
                <option value="Upcoming">Upcoming Only</option>
                <option value="Completed">Past Records</option>
              </select>

              <button
                onClick={handleResetFilters}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                title="Reset All Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Category Pills Bar for Quick 1-Click Filtering */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-campus-600 text-white shadow-md shadow-campus-500/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Results Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">
              No matching events found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any events matching your selected search query or category filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-campus-600 text-white font-bold text-xs hover:bg-campus-700 transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={handleOpenDetails}
              onRegister={handleOpenDetails}
              showAIMatch={true}
            />
          ))}
        </div>
      )}

    </div>
  );
}
