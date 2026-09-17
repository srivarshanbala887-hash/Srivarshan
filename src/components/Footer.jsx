import React from 'react';
import { Sparkles, Heart, Shield, Mail, Phone, MapPin, Globe, Award } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-campus-500 to-ai-500 flex items-center justify-center text-white font-bold shadow-lg shadow-campus-500/30">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
                CampusAI
              </span>
            </div>
            
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              <strong>“One Campus. Every Event. Smarter with AI.”</strong>
              <br />
              The next-generation autonomous collegiate event management platform empowering students, faculty, and clubs to discover, register, and organize impactful campus experiences.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                AI Core Engine Online
              </span>
              <span className="text-xs text-slate-500 font-mono">
                v2.6.4-stable
              </span>
            </div>
          </div>

          {/* Col 3: Discovery */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-['Outfit']">
              Explore Events
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Technical Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  AI & ML Workshops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Placement Bootcamps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Inter-College Cultural Fests
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Athletics & Sports League
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-['Outfit']">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-white transition-colors">
                  AI Recommended For You
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-events')} className="hover:text-white transition-colors">
                  Digital QR Event Passes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('create-event')} className="hover:text-white transition-colors">
                  AI Event Agenda Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-white transition-colors">
                  Predictive Attendance Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-events')} className="hover:text-white transition-colors">
                  Verified Participation Certificates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Campus Support */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-['Outfit']">
              Campus Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-campus-400 shrink-0" />
                Dean of Events, Tech Block 4
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-campus-400 shrink-0" />
                events.support@campus.edu
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-campus-400 shrink-0" />
                +1 (555) 019-EVENT (3836)
              </p>
              <p className="flex items-center gap-2 pt-2 text-slate-500">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                ISO 27001 Student Privacy Compliant
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} CampusAI – AI-Based College Event Management System. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Student Code of Conduct</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
