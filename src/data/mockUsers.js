export const mockCurrentUser = {
  id: 'usr-std-01',
  name: 'Alex Johnson',
  email: 'alex.johnson@campus.edu',
  role: 'student', // 'student' or 'admin'
  studentId: 'CS2023-8492',
  department: 'Computer Science & Engineering',
  year: '3rd Year (Semester 6)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  interests: ['Artificial Intelligence', 'Python', 'Machine Learning', 'Competitive Programming', 'Placements'],
  skills: ['Python', 'JavaScript', 'React', 'Data Structures', 'Git', 'Deep Learning'],
  registeredEventIds: ['evt-101', 'evt-104'],
  completedEventIds: ['evt-111'],
  savedEventIds: ['evt-102', 'evt-106'],
  attendanceRate: 94
};

export const mockAdminUser = {
  id: 'usr-adm-99',
  name: 'Prof. Sarah Miller',
  email: 'dean.events@campus.edu',
  role: 'admin',
  facultyId: 'FAC-ENG-102',
  department: 'Dean of Student Affairs & Academic Events',
  designation: 'Director of Campus Events & Innovation',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
};

export const mockRegistrationsList = [
  {
    ticketId: 'PASS-NOVA-8492',
    eventId: 'evt-101',
    eventTitle: 'HackNova 2026: AI & Web3 National Hackathon',
    eventCategory: 'Hackathon',
    eventDate: '2026-10-15',
    eventTime: '09:00 AM - 09:00 PM',
    venue: 'Campus Innovation Center, Hall A',
    userId: 'usr-std-01',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@campus.edu',
    studentId: 'CS2023-8492',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    registeredAt: '2026-09-14T10:30:00Z',
    status: 'Confirmed',
    attended: false
  },
  {
    ticketId: 'PASS-FAANG-3108',
    eventId: 'evt-104',
    eventTitle: 'FAANG Placement Masterclass: Cracking Tech Interviews',
    eventCategory: 'Placement Training',
    eventDate: '2026-10-08',
    eventTime: '04:00 PM - 07:00 PM',
    venue: 'Main University Auditorium',
    userId: 'usr-std-01',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@campus.edu',
    studentId: 'CS2023-8492',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    registeredAt: '2026-09-15T14:12:00Z',
    status: 'Confirmed',
    attended: false
  },
  {
    ticketId: 'PASS-CTF-9901',
    eventId: 'evt-111',
    eventTitle: 'CyberDefend: Collegiate Capture The Flag (CTF)',
    eventCategory: 'Coding Competition',
    eventDate: '2026-09-10',
    eventTime: '09:00 AM - 05:00 PM',
    venue: 'Cyber Security Virtual Lab',
    userId: 'usr-std-01',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@campus.edu',
    studentId: 'CS2023-8492',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    registeredAt: '2026-09-02T11:00:00Z',
    status: 'Completed',
    attended: true
  }
];
