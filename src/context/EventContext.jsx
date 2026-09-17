import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialEvents } from '../data/mockEvents';
import { mockCurrentUser, mockAdminUser, mockRegistrationsList } from '../data/mockUsers';
import { initialNotifications } from '../data/mockNotifications';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  // Load initial state from LocalStorage or defaults
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('campusai_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campusai_user');
    return saved ? JSON.parse(saved) : mockCurrentUser;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('campusai_registrations');
    return saved ? JSON.parse(saved) : mockRegistrationsList;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('campusai_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('campusai_role');
    return saved || 'student'; // 'student' | 'admin'
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    const saved = localStorage.getItem('campusai_recently_viewed');
    return saved ? JSON.parse(saved) : ['evt-102', 'evt-105', 'evt-107'];
  });

  // Active modal controls
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [activeTicketForModal, setActiveTicketForModal] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState('student'); // 'student' | 'admin' | 'signup'

  // Global filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('ai_match'); // 'ai_match' | 'date_asc' | 'popularity' | 'seats_left'

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('campusai_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('campusai_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('campusai_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('campusai_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('campusai_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('campusai_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  // Track event view
  const trackEventView = (eventId) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== eventId);
      return [eventId, ...filtered].slice(0, 6);
    });
  };

  // AI Matching Score Calculation
  const calculateAIMatch = (event, customUser = null) => {
    const activeUser = customUser || user;
    if (!activeUser) return { score: 75, reasons: ['Popular on campus'] };

    let score = 50;
    const reasons = [];

    // Check skills overlap
    const eventSkills = event.skills || [];
    const userInterests = activeUser.interests || [];
    const userSkills = activeUser.skills || [];
    const allUserTags = [...userInterests, ...userSkills];

    const matchedTags = eventSkills.filter(skill =>
      allUserTags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(tag.toLowerCase()))
    );

    if (matchedTags.length > 0) {
      score += Math.min(matchedTags.length * 15, 35);
      reasons.push(`Matches your interests: ${matchedTags.slice(0, 2).join(', ')}`);
    }

    // Check Department alignment
    if (event.department === activeUser.department) {
      score += 10;
      reasons.push(`Organized within ${activeUser.department}`);
    }

    // Check previous attendance/registration history similarity
    const registeredCategories = registrations.map(r => r.eventCategory);
    if (registeredCategories.includes(event.category)) {
      score += 8;
      reasons.push(`You frequently attend ${event.category} events`);
    }

    // High popularity boost
    if (event.popularityScore && event.popularityScore > 90) {
      score += 5;
    }

    // Cap score at 99%
    const finalScore = Math.min(Math.max(score, 62), 99);

    if (reasons.length === 0) {
      reasons.push('Trending recommendation among peer students');
    }

    return {
      score: finalScore,
      reasons,
      primaryReason: reasons[0]
    };
  };

  // Get AI Recommended Events
  const getAIRecommendations = (limit = 4) => {
    const registeredIds = registrations.map(r => r.eventId);
    return events
      .filter(e => e.status !== 'Completed' && !registeredIds.includes(e.id))
      .map(event => ({
        ...event,
        aiMatch: calculateAIMatch(event)
      }))
      .sort((a, b) => b.aiMatch.score - a.aiMatch.score)
      .slice(0, limit);
  };

  // Register for Event
  const registerForEvent = (eventId, studentDetails = {}) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };

    const isAlreadyRegistered = registrations.some(
      r => r.eventId === eventId && (r.userId === user.id || r.studentEmail === (studentDetails.email || user.email))
    );

    if (isAlreadyRegistered) {
      return { success: false, message: 'You are already registered for this event!' };
    }

    if (event.registeredCount >= event.maxParticipants) {
      return { success: false, message: 'Sorry, this event is at full capacity.' };
    }

    const ticketCode = `PASS-${event.category.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRegistration = {
      ticketId: ticketCode,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      userId: user.id,
      studentName: studentDetails.name || user.name,
      studentEmail: studentDetails.email || user.email,
      studentId: studentDetails.studentId || user.studentId || 'CS2023-8492',
      department: studentDetails.department || user.department,
      year: studentDetails.year || user.year || '3rd Year',
      phone: studentDetails.phone || '+1 (555) 019-3388',
      registeredAt: new Date().toISOString(),
      status: 'Confirmed',
      attended: false
    };

    // Update registrations
    setRegistrations(prev => [newRegistration, ...prev]);

    // Update event registered count
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    // Add celebration notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'registration',
      title: 'Registration Confirmed 🎉',
      message: `Your seat for "${event.title}" is confirmed! Ticket #${ticketCode} is ready.`,
      timestamp: 'Just now',
      read: false,
      eventId: event.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      ticket: newRegistration,
      message: 'Registration Successful!'
    };
  };

  // Cancel Registration
  const cancelRegistration = (ticketId) => {
    const reg = registrations.find(r => r.ticketId === ticketId);
    if (!reg) return;

    setRegistrations(prev => prev.filter(r => r.ticketId !== ticketId));

    // Release seat
    setEvents(prev =>
      prev.map(e =>
        e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e
      )
    );

    // Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'reminder',
      title: 'Registration Cancelled',
      message: `Your registration for "${reg.eventTitle}" has been cancelled.`,
      timestamp: 'Just now',
      read: false,
      eventId: reg.eventId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Admin: Create Event
  const createEvent = (eventData) => {
    const newId = `evt-${Date.now().toString().slice(-4)}`;
    const createdEvent = {
      ...eventData,
      id: newId,
      registeredCount: 0,
      status: 'Upcoming',
      popularityScore: Math.floor(82 + Math.random() * 15),
      turnoutPrediction: '88% (Forecasted High)',
      isFeatured: false,
      rules: eventData.rules || [
        'University ID card mandatory for entrance.',
        'Registered attendees must arrive 10 minutes before schedule.'
      ],
      speakers: eventData.speakers || [
        {
          name: eventData.organizer || 'Lead Faculty',
          role: 'Session Host',
          organization: eventData.department || 'Campus Department',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        }
      ]
    };

    setEvents(prev => [createdEvent, ...prev]);

    // Broadcast notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'new_event',
      title: 'New Campus Event Announced 📢',
      message: `"${createdEvent.title}" was just published for ${createdEvent.department}.`,
      timestamp: 'Just now',
      read: false,
      eventId: createdEvent.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return createdEvent;
  };

  // Admin: Update Event
  const updateEvent = (eventId, updatedData) => {
    setEvents(prev => prev.map(e => (e.id === eventId ? { ...e, ...updatedData } : e)));
  };

  // Admin: Delete Event
  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setRegistrations(prev => prev.filter(r => r.eventId !== eventId));
  };

  // Admin: Toggle Attendance
  const toggleAttendance = (ticketId) => {
    setRegistrations(prev =>
      prev.map(r => (r.ticketId === ticketId ? { ...r, attended: !r.attended } : r))
    );
  };

  // Update user interests/skills
  const updateUserInterests = (newInterests, newSkills) => {
    setUser(prev => ({
      ...prev,
      interests: newInterests,
      skills: newSkills
    }));
  };

  // Switch role helper
  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setUser(mockAdminUser);
    } else {
      setUser(mockCurrentUser);
    }
  };

  // Clear or mark all notifications
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        user,
        setUser,
        registrations,
        notifications,
        currentRole,
        switchRole,
        recentlyViewedIds,
        trackEventView,
        calculateAIMatch,
        getAIRecommendations,
        registerForEvent,
        cancelRegistration,
        createEvent,
        updateEvent,
        deleteEvent,
        toggleAttendance,
        updateUserInterests,
        markAllNotificationsAsRead,
        clearNotifications,
        // Modal states
        selectedEventForModal,
        setSelectedEventForModal,
        activeTicketForModal,
        setActiveTicketForModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authDefaultTab,
        setAuthDefaultTab,
        // Filter states
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
        setSortBy
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
