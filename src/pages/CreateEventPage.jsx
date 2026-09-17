import React, { useState } from 'react';
import { 
  PlusCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Users, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight, 
  Wand2,
  FileText,
  Shield,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEvents } from '../context/EventContext';
import { CATEGORIES, DEPARTMENTS } from '../data/mockEvents';

const IMAGE_PRESETS = [
  {
    label: 'AI & Hackathon',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Tech Workshop',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Coding Contest',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Placement / Seminar',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Cultural Fiesta',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Sports League',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function CreateEventPage({ onNavigate }) {
  const { createEvent, setSelectedEventForModal } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    department: 'Computer Science & Engineering',
    date: '2026-10-25',
    time: '10:00 AM - 04:00 PM',
    venue: 'Campus Innovation Auditorium',
    organizer: 'Student Innovation Club',
    organizerEmail: 'innovate@campus.edu',
    maxParticipants: 100,
    registrationDeadline: '2026-10-23',
    banner: IMAGE_PRESETS[0].url,
    shortDescription: '',
    description: '',
    rules: [
      'Valid University ID card mandatory for physical entrance.',
      'Participants must arrive 15 minutes before the opening keynote.',
      'Certificates of Completion will be awarded upon verified session attendance.'
    ]
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [createdEvent, setCreatedEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Assistant auto-fill
  const handleGenerateAIContent = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const topic = formData.title || `${formData.category} Summit`;
      const generatedShort = `Join the premier campus ${formData.category.toLowerCase()} on ${topic}. Hands-on industry tracks, top mentors, and competitive student awards.`;
      const generatedDesc = `${topic} is a high-impact university initiative organized by ${formData.organizer} in collaboration with the ${formData.department}.\n\nParticipants will gain comprehensive practical exposure, network with faculty and visiting corporate experts, and receive peer recognition. Free snacks, swags, and verified digital certificates provided.`;

      setFormData(prev => ({
        ...prev,
        shortDescription: generatedShort,
        description: generatedDesc
      }));
      setIsGeneratingAI(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newEvt = createEvent(formData);
      setIsSubmitting(false);
      setCreatedEvent(newEvt);

      // Trigger Confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {createdEvent ? (
        /* SUCCESS STATE */
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600">
              Published to Campus Feed
            </span>
            {/* Exact requirement heading */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] mt-1">
              Event Created Successfully
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              <strong>"{createdEvent.title}"</strong> is now live on CampusAI! Students across {createdEvent.department} have received automated notification alerts.
            </p>
          </div>

          {/* Quick Preview Card */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-center gap-3">
            <img
              src={createdEvent.banner}
              alt=""
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-campus-600">
                {createdEvent.category}
              </span>
              <h4 className="font-bold text-sm text-slate-900 truncate">
                {createdEvent.title}
              </h4>
              <p className="text-xs text-slate-500">
                {createdEvent.date} • {createdEvent.venue}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setSelectedEventForModal(createdEvent);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-campus-600 hover:bg-campus-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              View Live Event Page
            </button>
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back to Admin Dashboard
            </button>
            <button
              onClick={() => {
                setCreatedEvent(null);
                setFormData({
                  ...formData,
                  title: '',
                  shortDescription: '',
                  description: ''
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-campus-600 font-semibold text-xs hover:underline"
            >
              Create Another Event
            </button>
          </div>
        </div>
      ) : (
        /* CREATION FORM */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-campus-50 via-ai-50 to-indigo-50 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-campus-600 to-ai-600 flex items-center justify-center text-white shadow-md">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  Create New Campus Event
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Publish a workshop, hackathon, seminar, or competition with AI assistant auto-fill.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Event Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Event Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NextGen Web3 & AI Builders Hackathon 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 focus:border-campus-500 focus:ring-2 focus:ring-campus-500/20 outline-none"
              />
            </div>

            {/* Category & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white font-medium"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white font-medium truncate"
                >
                  {DEPARTMENTS.filter(d => d !== 'All Departments').map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Time Slot *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM - 04:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>
            </div>

            {/* Venue & Organizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Venue / Hall / Room *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Innovation Hall A, Tech Block"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Organizer / Host Club *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ACM Student Chapter"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>
            </div>

            {/* Capacity & Registration Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Maximum Participants / Seating *
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="5000"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Registration Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>
            </div>

            {/* Event Image Presets or Custom URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Image (Cover Banner) *
                </label>
                <span className="text-[11px] text-slate-400">Click a preset below or paste URL</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, banner: preset.url })}
                    className={`p-1 rounded-xl border transition-all text-center group ${
                      formData.banner === preset.url
                        ? 'border-campus-600 ring-2 ring-campus-500/30'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-12 object-cover rounded-lg"
                    />
                    <span className="text-[9px] font-bold text-slate-600 block mt-1 truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>

              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.banner}
                onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none font-mono"
              />
            </div>

            {/* Short Description & Full Description with AI Auto-Fill */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Description & Agenda *
                </label>
                
                {/* AI Assistant Button */}
                <button
                  type="button"
                  onClick={handleGenerateAIContent}
                  disabled={isGeneratingAI}
                  className="px-3 py-1 rounded-xl bg-ai-50 hover:bg-ai-100 text-ai-700 border border-ai-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-ai-600 animate-spin" />
                  {isGeneratingAI ? 'Generating Copy...' : 'Generate with AI'}
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Short One-Line Summary (Displayed on discovery cards)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master modern web and AI tools with hands-on coding challenges and mentor support."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Full Description & Agenda Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed schedule, speakers, topics covered, and what students will gain..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none resize-y"
                />
              </div>
            </div>

            {/* Submit Event CTA */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => onNavigate('events')}
                className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-campus-600 via-indigo-600 to-ai-600 hover:from-campus-700 hover:to-ai-700 text-white font-extrabold text-xs shadow-lg shadow-campus-500/25 transition-all flex items-center gap-2 hover:scale-105"
              >
                {isSubmitting ? (
                  <span>Publishing Event...</span>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Submit Event</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
