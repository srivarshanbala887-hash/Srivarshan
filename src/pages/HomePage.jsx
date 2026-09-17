import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Search, 
  QrCode, 
  Clock, 
  ChevronRight,
  TrendingUp,
  MapPin,
  BookOpen
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import AIRecommender from '../components/AIRecommender';
import { CATEGORIES } from '../data/mockEvents';

export default function HomePage({ onNavigate }) {
  const { 
    events, 
    registrations, 
    setSelectedEventForModal, 
    setSelectedCategory,
    setIsAuthModalOpen,
    setAuthDefaultTab
  } = useEvents();

  // Statistics calculation
  const totalEventsCount = events.length;
  const registeredStudentsCount = 3420 + registrations.length;
  const upcomingEventsCount = events.filter(e => e.status === 'Upcoming').length;
  const completedEventsCount = events.filter(e => e.status === 'Completed').length;

  // Featured events
  const featuredEvents = events
    .filter(e => e.isFeatured && e.status === 'Upcoming')
    .slice(0, 3);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    onNavigate('events');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
        
        {/* Subtle background gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-campus-100/50 via-ai-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-ai-300/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-campus-300/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-campus-200 shadow-sm text-xs font-bold text-campus-700">
                <span className="w-2 h-2 rounded-full bg-campus-500 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-ai-500" />
                <span>Next-Gen Campus Experience Platform</span>
              </div>

              {/* Exact User Requested Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 font-['Outfit'] leading-[1.1]">
                Smart Event Management for{' '}
                <span className="bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 bg-clip-text text-transparent">
                  Smarter Campuses
                </span>
              </h1>

              {/* Exact User Requested Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Discover, organize, and manage college events with the power of AI.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('events')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-extrabold text-sm shadow-xl shadow-campus-500/25 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setAuthDefaultTab('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-ai-600" />
                  <span>Get Started</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Free for All Students
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Instant QR Entry Passes
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Predictive AI Matching
                </span>
              </div>

            </div>

            {/* Hero Right Visual: Live Interactive AI Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Accent Badges */}
                <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-ai-600" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Match Score</span>
                    <strong className="text-sm font-extrabold text-ai-600">98% Synergy</strong>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">QR Ticket</span>
                    <strong className="text-xs font-bold text-slate-900">PASS-NOVA-8492</strong>
                  </div>
                </div>

                {/* Main Hero Card Preview */}
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden p-6 space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                      alt="HackNova"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ai-600 text-white text-xs font-bold">
                      Trending Hackathon
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs text-indigo-300 font-semibold">Campus Innovation Center</p>
                      <h4 className="font-extrabold text-base font-['Outfit'] truncate">
                        HackNova 2026: AI & Web3
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-campus-600" />
                        Oct 15, 2026
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-600">
                        <Users className="w-3.5 h-3.5" />
                        32 seats left
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-ai-50 border border-ai-100 flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-ai-600 shrink-0" />
                      <p className="text-[11px] text-ai-900 leading-tight">
                        <strong>AI Recommender:</strong> Matched with your Python & Machine Learning skills.
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('events')}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Event Discovery</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATISTICS SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Stat 1 */}
            <div className="text-center pt-4 lg:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-campus-100 text-campus-600 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
                {totalEventsCount}+
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">
                Total Events
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center pt-4 lg:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-ai-100 text-ai-600 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
                {registeredStudentsCount.toLocaleString()}+
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">
                Registered Students
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center pt-4 lg:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
                {upcomingEventsCount}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">
                Upcoming Events
              </p>
            </div>

            {/* Stat 4 */}
            <div className="text-center pt-4 lg:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
                {completedEventsCount}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">
                Completed Events
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AI RECOMMENDER SPOTLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIRecommender
          onViewDetails={(event) => setSelectedEventForModal(event)}
          onRegister={(event) => setSelectedEventForModal(event)}
        />
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED EVENTS SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-campus-600">
              Campus Spotlight
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-['Outfit'] mt-1">
              Featured Flagship Events
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              High-impact workshops, hackathons, and placement masterclasses happening this semester.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-2 text-sm font-bold text-campus-600 hover:text-campus-700 transition-colors"
          >
            <span>View All {events.length} Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={(e) => setSelectedEventForModal(e)}
              onRegister={(e) => setSelectedEventForModal(e)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BROWSE BY CATEGORY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-ai-600">
            Broad Campus Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-['Outfit'] mt-1">
            Browse By Event Category
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Find tailored opportunities across tech, culture, athletics, and corporate recruiting.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.filter(c => c !== 'All').map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-campus-400 hover:shadow-md transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-campus-50 text-campus-600 group-hover:bg-campus-600 group-hover:text-white transition-colors flex items-center justify-center mb-3">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-campus-700 transition-colors font-['Outfit']">
                {category}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {events.filter(e => e.category === category).length} active events
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AI FEATURES SHOWCASE (Real-world SaaS feel) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-campus-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-ai-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-ai-400" />
              The AI Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-['Outfit']">
              Why CampusAI Outperforms Legacy College Portals
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Engineered from the ground up for modern higher education. CampusAI automates tedious administrative workflows while giving students precision recommendations.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-campus-500/20 text-campus-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-['Outfit']">Adaptive Recommendations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart neural matching evaluates student skills, previous registrations, and department tracks to serve high-relevance events.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-ai-500/20 text-ai-400 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-['Outfit']">Digital QR Passes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paperless student admission. Instant check-in via mobile QR scanning with live capacity monitoring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-['Outfit']">Participation Forecasts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Predictive attendance algorithms help administrators anticipate venue overcrowding and order catering accurately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-['Outfit']">Smart Alert Feeds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated countdowns, capacity warnings, and schedule changes pushed straight to students’ personalized notification drawer.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-['Outfit']">
              Ready to Experience the Future of Campus Events?
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base">
              Join thousands of students and collegiate organizers creating unforgettable campus memories.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('events')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-campus-700 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-colors"
              >
                Browse Live Events Catalog
              </button>
              <button
                onClick={() => onNavigate('create-event')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 text-white border border-white/30 font-bold text-xs transition-colors"
              >
                Host an Event as Club Lead
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
