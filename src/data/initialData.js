export const SUBJECT_OPTIONS = [
  'Java',
  'Data Structures',
  'DBMS',
  'Computer Networks',
  'Mathematics'
];

export const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: "Implement Dijkstra's Algorithm in C++",
    subject: 'Data Structures',
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Normalize schema tables to 3NF & BCNF',
    subject: 'DBMS',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Review TCP 3-Way Handshake vs UDP',
    subject: 'Computer Networks',
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Practice Java Stream API & Generics exercises',
    subject: 'Java',
    priority: 'Medium',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'task-5',
    title: 'Solve Linear Algebra Eigenvalue problem set 3',
    subject: 'Mathematics',
    priority: 'Low',
    completed: true,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export const DEFAULT_SUBJECTS = [
  {
    id: 'subj-1',
    name: 'Java',
    progress: 70,
    icon: '☕',
    description: 'Object-Oriented Programming, Collections & Multi-threading'
  },
  {
    id: 'subj-2',
    name: 'Data Structures',
    progress: 50,
    icon: '🌲',
    description: 'Trees, Graphs, Sorting, Hash Maps & Dynamic Programming'
  },
  {
    id: 'subj-3',
    name: 'DBMS',
    progress: 65,
    icon: '🗄️',
    description: 'SQL queries, Normalization, ACID Transactions & Indexing'
  },
  {
    id: 'subj-4',
    name: 'Computer Networks',
    progress: 40,
    icon: '🌐',
    description: 'OSI Reference Model, TCP/IP, Routing & Subnetting'
  },
  {
    id: 'subj-5',
    name: 'Mathematics',
    progress: 80,
    icon: '📐',
    description: 'Discrete Math, Linear Algebra, Probability & Calculus'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'In a balanced BST, each comparison cuts the search space in half, yielding O(log n) average time complexity.'
  },
  {
    id: 2,
    question: 'Which data structure strictly operates on the First-In-First-Out (FIFO) principle?',
    options: ['Stack', 'Queue', 'Binary Max-Heap', 'Graph'],
    correctIndex: 1,
    explanation: 'A Queue adheres to FIFO, where the first inserted element is the first one dequeued.'
  },
  {
    id: 3,
    question: 'In a Relational Database Management System (DBMS), what is the key purpose of a Primary Key?',
    options: [
      'To encrypt confidential data in a table',
      'To uniquely identify each record (row) in a table',
      'To permit duplicate and null rows for faster caching',
      'To automatically back up database tables to the cloud'
    ],
    correctIndex: 1,
    explanation: 'A Primary Key uniquely identifies each row in a relational table and cannot contain null values.'
  },
  {
    id: 4,
    question: 'In the 7-layer OSI Model, at which layer does the Internet Protocol (IP) operate?',
    options: [
      'Layer 2 - Data Link Layer',
      'Layer 3 - Network Layer',
      'Layer 4 - Transport Layer',
      'Layer 7 - Application Layer'
    ],
    correctIndex: 1,
    explanation: 'The Internet Protocol (IP) works at Layer 3 (Network Layer), governing logical packet addressing and routing.'
  },
  {
    id: 5,
    question: 'In Java, which keyword is explicitly used by a class to inherit from a superclass?',
    options: ['implements', 'extends', 'inherits', 'super'],
    correctIndex: 1,
    explanation: 'Java uses the "extends" keyword for class inheritance, whereas "implements" is used for interfaces.'
  }
];
