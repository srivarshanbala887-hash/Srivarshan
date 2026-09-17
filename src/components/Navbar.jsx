import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  PlusCircle, 
  LayoutDashboard, 
  Bookmark, 
  Bell, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  LogOut, 
  LogIn,
  Search,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import NotificationDrawer from './NotificationDrawer';

export default function Navbar({ activePage, setActivePage }) {
  const { 
    user, 
    currentRole, 
    switchRole, 
    notifications, 
    setIsAuthModalOpen, 
    setAuthDefaultTab 
  } = useEvents();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNav = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLogin = (role = 'student') => {
    setAuthDefaultTab(role);
    setIsAuthModalOpen(true);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-campus-600 via-indigo-600 to-ai-600 flex items-center justify-center shadow-md shadow-campus-500/20 text-white font-bold">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse-slow" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-campus-700 via-indigo-600 to-ai-600 bg-clip-text text-transparent font-['Outfit']">
                    CampusAI
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-ai-100 text-ai-700 border border-ai-200">
                    AI 2.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block">
                  Smart College Event Hub
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === 'home'
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </button>
              
              <button
                onClick={() => handleNav('events')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'events'
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                Events
              </button>

              <button
                onClick={() => handleNav('my-events')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'my-events'
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                My Events
              </button>

              <button
                onClick={() => handleNav('create-event')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'create-event'
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Create Event
              </button>

              <button
                onClick={() => handleNav(currentRole === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activePage === 'student-dashboard' || activePage === 'admin-dashboard'
                    ? 'text-campus-600 bg-campus-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                {currentRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
              </button>
            </nav>

            {/* Right Action Icons & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Instant Role Switcher Pill for Demo */}
              <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
                <button
                  onClick={() => switchRole('student')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                    currentRole === 'student'
                      ? 'bg-white text-campus-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Student Persona"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-campus-600" />
                  Student
                </button>
                <button
                  onClick={() => switchRole('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                    currentRole === 'admin'
                      ? 'bg-white text-ai-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Admin Persona"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-ai-600" />
                  Admin
                </button>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotificationOpen(prev => !prev)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Profile / Auth Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(prev => !prev)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-campus-500/30"
                    />
                    <div className="hidden xl:block text-left">
                      <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[110px]">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-campus-50 text-campus-700 text-xs font-medium">
                          {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                          {user.role === 'admin' ? 'Campus Event Administrator' : user.department}
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => handleNav(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          Dashboard Overview
                        </button>
                        <button
                          onClick={() => handleNav('my-events')}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Bookmark className="w-4 h-4 text-slate-400" />
                          My Registrations & Tickets
                        </button>
                        <button
                          onClick={() => switchRole(currentRole === 'student' ? 'admin' : 'student')}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4 text-indigo-500" />
                          Switch to {currentRole === 'student' ? 'Admin Mode' : 'Student Mode'}
                        </button>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => openLogin('student')}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LogIn className="w-4 h-4 text-slate-400" />
                          Switch User Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openLogin('student')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openLogin('signup')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-campus-600 to-ai-600 text-white shadow-xs hover:shadow-md transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === 'home' ? 'bg-campus-50 text-campus-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('events')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === 'events' ? 'bg-campus-50 text-campus-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Discover Events
            </button>
            <button
              onClick={() => handleNav('my-events')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === 'my-events' ? 'bg-campus-50 text-campus-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              My Events & Tickets
            </button>
            <button
              onClick={() => handleNav('create-event')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === 'create-event' ? 'bg-campus-50 text-campus-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Create New Event
            </button>
            <button
              onClick={() => handleNav(currentRole === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === 'student-dashboard' || activePage === 'admin-dashboard' ? 'bg-campus-50 text-campus-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {currentRole === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
            </button>

            {/* Mobile Role Switch */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => { switchRole('student'); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border text-center ${
                  currentRole === 'student' ? 'bg-campus-50 border-campus-300 text-campus-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                Student Persona
              </button>
              <button
                onClick={() => { switchRole('admin'); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border text-center ${
                  currentRole === 'admin' ? 'bg-ai-50 border-ai-300 text-ai-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                Admin Persona
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Notification Drawer */}
      <NotificationDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
        onNavigateEvent={(eventId) => {
          setIsNotificationOpen(false);
          setActivePage('events');
        }}
      />
    </>
  );
}
