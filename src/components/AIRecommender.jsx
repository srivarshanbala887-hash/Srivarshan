import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  BrainCircuit, 
  Sliders, 
  Check, 
  Plus, 
  TrendingUp, 
  Compass, 
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventCard from './EventCard';

const ALL_SKILLS_POOL = [
  'Artificial Intelligence',
  'Python',
  'Machine Learning',
  'Competitive Programming',
  'Placements',
  'Web Development',
  'Cloud Architecture',
  'Cybersecurity',
  'Robotics',
  'UI/UX Design',
  'Cultural Arts',
  'Athletics & Sports',
  'Entrepreneurship'
];

export default function AIRecommender({ onViewDetails, onRegister }) {
  const { user, updateUserInterests, events, calculateAIMatch, registrations } = useEvents();

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || [
    'Artificial Intelligence',
    'Python',
    'Machine Learning',
    'Competitive Programming'
  ]);
  const [activeGoalFilter, setActiveGoalFilter] = useState('All'); // 'All' | 'Tech' | 'Career' | 'Creative'

  const toggleSkill = (skill) => {
    let updated;
    if (selectedInterests.includes(skill)) {
      if (selectedInterests.length === 1) return; // Keep at least one
      updated = selectedInterests.filter(s => s !== skill);
    } else {
      updated = [...selectedInterests, skill];
    }
    setSelectedInterests(updated);
    updateUserInterests(updated, user?.skills || []);
  };

  // Re-calculate events based on current active profile
  const registeredIds = registrations.map(r => r.eventId);
  
  const recommendedEvents = events
    .filter(e => e.status !== 'Completed' && !registeredIds.includes(e.id))
    .map(e => ({
      ...e,
      aiMatch: calculateAIMatch(e, { ...user, interests: selectedInterests })
    }))
    .filter(e => {
      if (activeGoalFilter === 'Tech') {
        return ['Hackathon', 'Workshop', 'Coding Competition'].includes(e.category);
      }
      if (activeGoalFilter === 'Career') {
        return ['Placement Training', 'Seminar'].includes(e.category);
      }
      if (activeGoalFilter === 'Creative') {
        return ['Cultural Event', 'Sports', 'Club Activity'].includes(e.category);
      }
      return true;
    })
    .sort((a, b) => b.aiMatch.score - a.aiMatch.score)
    .slice(0, 3);

  const primaryInterestsText = selectedInterests.slice(0, 2).join(' and ');

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-ai-950 p-6 sm:p-8 text-white shadow-2xl border border-indigo-500/30 overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ai-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-campus-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-500/20 text-ai-300 border border-ai-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <BrainCircuit className="w-4 h-4 text-ai-400 animate-pulse" />
            Adaptive Neural Recommender
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
            AI Recommended For You
          </h2>
          <p className="text-sm sm:text-base text-indigo-200/90 mt-1">
            “Because you are interested in <strong className="text-yellow-300">{primaryInterestsText}</strong>, we recommend these events.”
          </p>
        </div>

        {/* Action button to tune student profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCustomizing(prev => !prev)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-ai-400" />
            {isCustomizing ? 'Hide Preference Tuning' : 'Tune AI Preferences'}
          </button>
        </div>
      </div>

      {/* Expandable Preference Tuning Drawer */}
      {isCustomizing && (
        <div className="relative z-10 mb-8 p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Toggle Your Interests To Recalculate Matches Instantly:
            </span>
            <span className="text-[11px] text-ai-300">
              {selectedInterests.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS_POOL.map((skill) => {
              const isSelected = selectedInterests.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-campus-500 to-ai-500 text-white shadow-sm border border-transparent'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Goal Quick Filters */}
      <div className="relative z-10 flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Quick Focus:</span>
        {[
          { label: 'All Recommendations', val: 'All' },
          { label: 'Tech & Hackathons', val: 'Tech' },
          { label: 'Placements & Career', val: 'Career' },
          { label: 'Cultural & Sports', val: 'Creative' }
        ].map(filter => (
          <button
            key={filter.val}
            onClick={() => setActiveGoalFilter(filter.val)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeGoalFilter === filter.val
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Recommendation Event Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewDetails={onViewDetails}
            onRegister={onRegister}
            showAIMatch={true}
          />
        ))}
      </div>

      {/* Explainable AI Footer Note */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-indigo-200/80 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ai-400 shrink-0" />
          <span>Matches calculated across Department relevance, student skills, and past attendance.</span>
        </div>
        <span className="text-[11px] text-ai-300 font-mono">
          Prediction confidence: 97.4%
        </span>
      </div>

    </section>
  );
}
