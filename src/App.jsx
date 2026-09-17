import React, { useState } from 'react';
import { EventProvider, useEvents } from './context/EventContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateEventPage from './pages/CreateEventPage';
import MyEventsPage from './pages/MyEventsPage';
import EventDetailsModal from './components/EventDetailsModal';
import RegistrationModal from './components/RegistrationModal';
import TicketModal from './components/TicketModal';
import AuthModal from './components/AuthModal';

function MainApp() {
  const [activePage, setActivePage] = useState('home');
  const [registeringEvent, setRegisteringEvent] = useState(null);

  const { 
    selectedEventForModal, 
    setSelectedEventForModal,
    activeTicketForModal,
    setActiveTicketForModal,
    currentRole
  } = useEvents();

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegistration = (event) => {
    setRegisteringEvent(event);
  };

  const handleLoginRedirect = (role) => {
    if (role === 'admin') {
      setActivePage('admin-dashboard');
    } else {
      setActivePage('student-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-campus-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activePage === 'events' && <EventsPage />}
        {activePage === 'student-dashboard' && <StudentDashboard onNavigate={handleNavigate} />}
        {activePage === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {activePage === 'create-event' && <CreateEventPage onNavigate={handleNavigate} />}
        {activePage === 'my-events' && <MyEventsPage onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      
      {/* 1. Event Details Modal */}
      {selectedEventForModal && (
        <EventDetailsModal
          event={selectedEventForModal}
          onClose={() => setSelectedEventForModal(null)}
          onRegisterClick={(evt) => {
            setRegisteringEvent(evt);
          }}
          onViewTicket={(ticket) => {
            setActiveTicketForModal(ticket);
          }}
        />
      )}

      {/* 2. Registration Modal */}
      {registeringEvent && (
        <RegistrationModal
          event={registeringEvent}
          isOpen={Boolean(registeringEvent)}
          onClose={() => setRegisteringEvent(null)}
          onViewTicket={(ticket) => {
            setActiveTicketForModal(ticket);
          }}
        />
      )}

      {/* 3. Ticket / QR Pass Modal */}
      {activeTicketForModal && (
        <TicketModal
          ticket={activeTicketForModal}
          isOpen={Boolean(activeTicketForModal)}
          onClose={() => setActiveTicketForModal(null)}
        />
      )}

      {/* 4. Auth Modal */}
      <AuthModal onLoginSuccess={handleLoginRedirect} />

    </div>
  );
}

export default function App() {
  return (
    <EventProvider>
      <MainApp />
    </EventProvider>
  );
}
