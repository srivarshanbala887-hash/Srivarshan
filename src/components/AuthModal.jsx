import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  ShieldCheck, 
  UserPlus, 
  KeyRound, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { mockCurrentUser, mockAdminUser } from '../data/mockUsers';

export default function AuthModal({ onLoginSuccess }) {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authDefaultTab, 
    switchRole,
    setUser
  } = useEvents();

  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (authDefaultTab) {
      setActiveTab(authDefaultTab);
    }
  }, [authDefaultTab]);

  if (!isAuthModalOpen) return null;

  const handleQuickStudentLogin = () => {
    switchRole('student');
    setIsAuthModalOpen(false);
    if (onLoginSuccess) onLoginSuccess('student');
  };

  const handleQuickAdminLogin = () => {
    switchRole('admin');
    setIsAuthModalOpen(false);
    if (onLoginSuccess) onLoginSuccess('admin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'forgot') {
      setForgotSubmitted(true);
      return;
    }

    if (activeTab === 'student') {
      switchRole('student');
      if (email) {
        setUser(prev => ({ ...prev, email: email, name: name || prev.name }));
      }
      setIsAuthModalOpen(false);
      if (onLoginSuccess) onLoginSuccess('student');
    } else if (activeTab === 'admin') {
      switchRole('admin');
      if (email) {
        setUser(prev => ({ ...prev, email: email }));
      }
      setIsAuthModalOpen(false);
      if (onLoginSuccess) onLoginSuccess('admin');
    } else if (activeTab === 'signup') {
      const newStudent = {
        ...mockCurrentUser,
        id: `usr-${Date.now()}`,
        name: name || 'New Student',
        email: email || 'student@campus.edu',
        department: department
      };
      setUser(newStudent);
      switchRole('student');
      setIsAuthModalOpen(false);
      if (onLoginSuccess) onLoginSuccess('student');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 pb-4 bg-gradient-to-r from-campus-50 via-ai-50 to-indigo-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-campus-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                CampusAI Portal
              </h3>
              <p className="text-[11px] text-slate-500">
                Single Sign-On & Role Access
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        {activeTab !== 'forgot' && (
          <div className="flex border-b border-slate-200 text-xs font-semibold bg-slate-50">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'student'
                  ? 'border-campus-600 text-campus-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Student Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'admin'
                  ? 'border-ai-600 text-ai-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'signup'
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="p-6">

          {activeTab === 'forgot' ? (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 font-['Outfit']">
                Reset University Password
              </h4>
              {forgotSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-xs">Reset Link Dispatched</p>
                  <p className="text-[11px] text-emerald-700">
                    If an account is associated with {email || 'your email'}, instructions have been sent.
                  </p>
                  <button
                    onClick={() => { setForgotSubmitted(false); setActiveTab('student'); }}
                    className="mt-2 text-xs font-bold text-campus-600 underline"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-xs text-slate-500">
                    Enter your university email address. We will send you a secure login link.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Campus Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-campus-600 text-white font-bold text-xs shadow-md hover:bg-campus-700 transition-colors"
                  >
                    Send Password Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('student')}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
                  >
                    Return to Login
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* 1-Click Demo Fast Logins */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  ⚡ 1-Click Demo Profiles (For Instant Testing)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleQuickStudentLogin}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-campus-200 text-campus-700 text-xs font-semibold hover:bg-campus-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Demo Student (Alex)
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAdminLogin}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-ai-200 text-ai-700 text-xs font-semibold hover:bg-ai-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Demo Admin (Dean)
                  </button>
                </div>
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {activeTab === 'admin' ? 'Faculty / Admin Email' : 'University Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder={activeTab === 'admin' ? 'dean.events@campus.edu' : 'student@campus.edu'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {activeTab !== 'signup' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot')}
                      className="text-[11px] text-campus-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none"
                  />
                </div>
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-campus-500 outline-none bg-white"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>Electronics & Communication</option>
                    <option>School of Management / MBA</option>
                    <option>Design & Media</option>
                  </select>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-4 ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-ai-600 to-indigo-700 hover:from-ai-700 hover:to-indigo-800'
                    : 'bg-gradient-to-r from-campus-600 to-ai-600 hover:from-campus-700 hover:to-ai-700'
                }`}
              >
                <span>
                  {activeTab === 'student' && 'Sign In as Student'}
                  {activeTab === 'admin' && 'Sign In to Admin Portal'}
                  {activeTab === 'signup' && 'Create Free Campus Account'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
