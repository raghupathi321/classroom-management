import React from 'react';
import { motion } from 'framer-motion';
import { Book, BookOpen, Beaker, Code, Brain, Lightbulb, Target, CheckCircle, Briefcase, GraduationCap, Clock, FileText, Link, BookOpen as BookIcon } from 'lucide-react';

interface Topic {
  title: string;
  subtopics: string[];
  hours?: number;
}

interface TextBook {
  title: string;
  authors: string;
  publisher?: string;
  edition?: string;
  year?: string;
}

interface Resource {
  title: string;
  url: string;
}

interface Course {
  title: string;
  code: string;
  type: 'theory' | 'practical' | 'project';
  credits: number;
  hoursPerWeek: number;
  examDuration: number;
  cie: number;
  see: number;
  overview: string;
  objectives: string[];
  topics: Topic[];
  outcomes: string[];
  industryRelevance?: string[];
  prerequisites?: string[];
  coPoMatrix?: Record<string, number[]>;
  textbooks?: TextBook[];
  suggestedReadings?: TextBook[];
  onlineResources?: Resource[];
}

const courses: Course[] = [
  {
    title: 'Compiler Design',
    code: '22CSC24',
    type: 'theory',
    credits: 3,
    hoursPerWeek: 3,
    examDuration: 3,
    cie: 40,
    see: 60,
    overview: 'This course introduces the fundamental principles and techniques of compiler design, covering lexical analysis, parsing, semantic analysis, intermediate code generation, code optimization, and code generation.',
    prerequisites: ['Formal Language and Automata Theory', 'Data Structures'],
    objectives: [
      'Understand and list the different stages in the process of compilation',
      'Identify different methods of lexical analysis and design top-down and bottom-up parsers',
      'Implement syntax directed translation schemes and develop algorithms to generate code for a target machine and advance topics of compilers'
    ],
    topics: [
      {
        title: 'UNIT I - Introduction to Compilers and Lexical Analysis',
        subtopics: [
          'Structure of a compiler',
          'Phases of a compiler',
          'Grouping of phases',
          'Compiler writing tools',
          'Bootstrapping',
          'Data structures',
          'The role of Lexical Analyzer',
          'Input Buffering',
          'Specification of Tokens using Regular Expressions',
          'Review of Finite Automata',
          'Recognition of Tokens',
          'Design of Lexical Analyzer Generator (lex, flex)'
        ]
      },
      {
        title: 'UNIT II - Syntax Analysis',
        subtopics: [
          'Top-Down Parsing: Recursive descent parsing, Predictive parsing, LL(1) Grammars',
          'Bottom-Up Parsing: Shift Reduce parsing, Operator precedence parsing (Concepts only)',
          'LR parsing: Constructing SLR parsing tables, Constructing Canonical LR parsing tables and Constructing LALR parsing tables',
          'Parser generator (YACC, BISON)'
        ]
      },
      {
        title: 'UNIT III - Syntax Directed Translation and Runtime Environments',
        subtopics: [
          'Syntax directed definitions',
          'Bottom-up evaluation of S-attributed definitions',
          'L-attributed definitions',
          'Top-down translation',
          'Bottom-up evaluation of inherited attributes',
          'Type systems',
          'Specification of a simple type checker',
          'Overview of Symbol Table',
          'Storage Organizations',
          'Stack',
          'Heap organizations'
        ]
      },
      {
        title: 'UNIT IV - Intermediate Code Generation and Optimization',
        subtopics: [
          'Intermediate languages',
          'Graphical representations',
          'Three Address code',
          'Quadruples',
          'Triples',
          'Principal sources of optimization',
          'Optimization of basic blocks'
        ]
      },
      {
        title: 'UNIT V - Code Generation and Advanced Topics',
        subtopics: [
          'Issues in the Design of a Code Generator',
          'The Target Machine',
          'Basic Blocks and Flow Graphs',
          'A simple Code Generator',
          'Peephole optimization',
          'Machine independent optimization: Data Flow Analysis',
          'Constant Propagation',
          'Live Variable Analysis',
          'Loops',
          'Error recovery in various phases',
          'Review of Compiler Structure',
          'Advanced elementary topics',
          'Structure of optimizing compilers'
        ]
      }
    ],
    outcomes: [
      'Identify the concepts related to translator, tokens, bootstrapping, porting and phases of the compiler',
      'Use grammar specifications and implement lexical analyzer by the help of compiler tools',
      'Explore the techniques of Top down, Bottom up Parsers and apply parsing methods for various grammars',
      'Implement syntax directed translation schemes and relate Symbol Table organization',
      'Analyze the concepts involved in Intermediate, Code Generation and Code Optimization process and understand error recovery strategies and advance topics in compilers'
    ],
    coPoMatrix: {
      'CO1': [3, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3],
      'CO2': [2, 2, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0],
      'CO3': [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      'CO4': [3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
      'CO5': [3, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 2]
    },
    textbooks: [
      {
        title: "Compilers: Principles Techniques & Tools",
        authors: "Alfred V Aho, Monica S Lam, Ravi Sethi, Jeffrey D Ullman",
        publisher: "Pearson Education",
        edition: "2nd Edition",
        year: "2013"
      },
      {
        title: "Advanced Compiler Design and Implementation",
        authors: "Steven Muchnik",
        publisher: "Kauffman",
        year: "1998"
      }
    ],
    suggestedReadings: [
      {
        title: "Compiler Construction: Principles and Practice",
        authors: "Kenneth C Louden",
        publisher: "Cengage Learning",
        year: "2005"
      },
      {
        title: "Engineering a Compiler",
        authors: "Keith D Cooper & Linda Tarezon",
        publisher: "Morgan Kafman",
        edition: "2nd Edition",
        year: "2004"
      },
      {
        title: "Lex & Yacc",
        authors: "John R Levine, Tony Mason, Doug Brown",
        publisher: "Shroff Publisher",
        edition: "3rd Edition",
        year: "2007"
      }
    ],
    onlineResources: [
      {
        title: "NPTEL Compiler Design Course",
        url: "http://www.nptel.ac.in/courses/106108052"
      },
      {
        title: "Stanford CS143 Compilers",
        url: "https://web.stanford.edu/class/archive/cs/cs143/cs143.1128/"
      },
      {
        title: "Wikibooks: Compiler Construction",
        url: "http://en.wikibooks.org/wiki/Compiler_Construction"
      },
      {
        title: "Compiler Tools",
        url: "http://dinosaur.compilertools.net/"
      },
      {
        title: "Lex and Yacc Resources",
        url: "http://epaperpress.com/lexandyacc/"
      }
    ],
    industryRelevance: [
      'Development of domain-specific languages',
      'Programming language implementation',
      'Code analysis and optimization tools',
      'Static analysis and security tools',
      'Compiler technology for specialized hardware (GPUs, custom chips)',
      'Just-in-time compilation for virtual machines'
    ],
  },
  {
  title: 'Artificial Intelligence and Machine Learning',
  code: '22CAC13',
  type: 'theory',
  credits: 4,
  hoursPerWeek: 4,  // 3L + 1T as specified
  examDuration: 3,
  cie: 40,
  see: 60,
  overview: 'This course covers fundamental concepts of artificial intelligence and machine learning, including search techniques, supervised and unsupervised learning algorithms, neural networks, and deep learning applications.',
  prerequisites: ['Knowledge on linear algebra', 'Algorithms'],
  objectives: [
    'To get the students acquainted with the concepts of different searching techniques of AI systems',
    'To understand the various Machine Learning Algorithms',
    'To familiarize various Classification and Regression techniques'
  ],
  topics: [
    {
      title: 'UNIT I - Introduction to AI and Intelligent Agents',
      subtopics: [
        'Foundations of AI, History, State of the Art, Risks and Benefits',
        'Intelligent agents: Agents and Environment',
        'The Concept of Rationality, Structure of an Agent',
        'Solving problems by Search: Problem-Solving Agents',
        'State space representation, Search graph and Search tree',
        'Searching for Solutions'
      ]
    },
    {
      title: 'UNIT II - Search Strategies and Adversarial Search',
      subtopics: [
        'Uninformed Search Strategies: Breadth-first search, Uniform cost search',
        'Depth-first search, Iterative deepening Depth-first search, Bidirectional search',
        'Informed (Heuristic) Search Strategies: Heuristic Functions',
        'Hill-climbing, Greedy best-first search, A* search',
        'Adversarial Search: Game Theory, Alpha–Beta Pruning',
        'Constraint Satisfaction Problems'
      ]
    },
    {
      title: 'UNIT III - Machine Learning Fundamentals and Regression',
      subtopics: [
        'What is Machine Learning, Types of Machine Learning Algorithms',
        'Supervised, Unsupervised and Reinforcement Learning',
        'Feature Selection and Feature Engineering: Data sets',
        'Creating training and test sets, managing categorical data',
        'Missing features, data scaling and normalization, Whitening',
        'Feature selection and filtering, PCA, Visualization of high-dimensional datasets',
        'Regression Algorithms: Linear models for regression',
        'Regression types, Evaluation Metrics, Hyper parameter tuning',
        'Grid and Random search'
      ]
    },
    {
      title: 'UNIT IV - Classification Algorithms and Ensemble Methods',
      subtopics: [
        'Linear Classification Algorithms: KNN, logistic regression',
        'Classification metrics, ROC curve',
        'Naïve Bayes: Bayes theorem, Naïve Bayes classifiers',
        'Multinomial, Bernoulli and Gaussian Naïve Bayes',
        'Support Vector Machines: Linear SVM, Kernel-based classification',
        'Decision Trees and Ensemble Learning: Binary Decision trees',
        'Introduction to Ensemble Learning - Bagging, Random Forests',
        'AdaBoost, Gradient Tree Boosting, Voting classifier'
      ]
    },
    {
      title: 'UNIT V - Clustering and Neural Networks',
      subtopics: [
        'Clustering Fundamentals: Basics, Gaussian mixture, K-means',
        'Evaluation methods, DBSCAN, Spectral Clustering, Hierarchical Clustering',
        'Introduction to Neural Networks: Introduction to deep learning',
        'MLPs with Keras, deep learning model layers',
        'Introduction to TensorFlow'
      ]
    }
  ],
  outcomes: [
    'Define the concept of Artificial Intelligence',
    'Apply real life problems in a state space representation so as to solve them',
    'Understand the features of machine learning to apply on real world problems',
    'Compare and contrast Classification and Regression problems',
    'Apply unsupervised learning algorithms to solve real world problems'
  ],
  coPoMatrix: {
    'CO1': [3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 3],
    'CO2': [3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 3],
    'CO3': [3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 3],
    'CO4': [3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 3],
    'CO5': [3, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 3]
  },
  textbooks: [
    {
      title: "Artificial Intelligence: A Modern Approach",
      authors: "Russell, Norvig",
      publisher: "Pearson Education",
      edition: "2nd Edition",
      year: "2015"
    },
    {
      title: "Machine Learning Algorithms",
      authors: "Giuseppe Bonaccorso",
      publisher: "Packt",
      edition: "2nd Edition",
      year: "2018"
    }
  ],
  suggestedReadings: [
    {
      title: "Machine Learning",
      authors: "Tom M. Mitchell",
      publisher: "McGraw Hill",
      edition: "4th Edition",
      year: "2017"
    },
    {
      title: "Artificial Intelligence",
      authors: "Rich, Knight, Nair",
      publisher: "Tata McGraw Hill",
      edition: "3rd Edition",
      year: "2017"
    },
    {
      title: "Machine Learning Applications Using Python: Cases Studies from Healthcare, Retail, and Finance",
      authors: "Puneet Mathur",
      publisher: "Apress",
      edition: "1st Edition",
      year: "2019"
    },
    {
      title: "Machine Learning - An Algorithmic Perspective",
      authors: "Stephen Marsland",
      publisher: "CRC Press",
      edition: "2nd Edition",
      year: "2014"
    },
    {
      title: "Artificial Intelligence",
      authors: "Saroj Kaushik",
      publisher: "Cengage Learning India",
      edition: "1st Edition",
      year: "2011"
    }
  ],
  onlineResources: [
    {
      title: "NPTEL: Artificial Intelligence - Search Methods for Problem Solving",
      url: "https://onlinecourses.nptel.ac.in/noc24_cs88/preview"
    },
    {
      title: "NPTEL: Introduction to Machine Learning",
      url: "https://onlinecourses.nptel.ac.in/noc24_cs81/preview"
    },
    {
      title: "NPTEL: Reinforcement Learning",
      url: "https://onlinecourses.nptel.ac.in/noc24_cs51/preview"
    },
    {
      title: "Andrew Ng's Machine Learning Course Notes",
      url: "https://www.holehouse.org/mlclass"
    },
    {
      title: "GeeksforGeeks: Machine Learning",
      url: "https://www.geeksforgeeks.org/machine-learning/"
    }
  ],
  industryRelevance: [
    'Natural language processing and conversational AI systems',
    'Computer vision applications and image recognition',
    'Recommendation systems and personalization engines',
    'Predictive analytics and business intelligence',
    'Autonomous systems and robotics',
    'Healthcare diagnostics and medical imaging analysis',
    'Financial forecasting and algorithmic trading'
  ],
  },
  {
  title: 'Fundamentals of Design Thinking',
  code: '22MEC36',
  type: 'theory',
  credits: 2,
  hoursPerWeek: 2,  // 2L as specified
  examDuration: 3,
  cie: 40,
  see: 60,
  overview: 'This course covers the fundamentals of design thinking as a tool for innovation, including empathizing with users, defining problems, ideating solutions, prototyping, and testing, with a focus on collaborative problem-solving and human-centric approaches.',
  prerequisites: ['Nil'],
  objectives: [
    'Create awareness of design thinking approaches',
    'Identify a systematic approach for defining/identifying a problem',
    'Create design thinking teams and conduct design thinking sessions collaboratively',
    'Apply both critical thinking and design thinking in parallel to solve problems',
    'Motivate to apply design thinking concepts to their real life scenarios'
  ],
  topics: [
    {
      title: 'UNIT I - Introduction to Engineering & Thinking and Design Thinking',
      subtopics: [
        'Impact of science/engineering',
        'Thinking and behaviour',
        'Types of thinking – Linear thinking, lateral thinking, design thinking',
        'Introduction to Design Thinking: Importance of Design Thinking & Human centric approach',
        'Phases in design thinking process, five-stage model as iterative method',
        'Applications of design thinking in various domains'
      ]
    },
    {
      title: 'UNIT II - Empathize phase',
      subtopics: [
        'Understanding the unique needs of the user',
        'Empathize with the users',
        'Steps in empathize phase',
        'Developing empathy towards people',
        'Assuming a beginner\'s mind-set (what? why?)',
        'Steps in immersion activity',
        'Body storming'
      ]
    },
    {
      title: 'UNIT III - Define phase',
      subtopics: [
        'Define the problem and interpret the result',
        'Analysis and synthesis',
        'Personas – Four different perspectives on Personas',
        'Steps to creating personas',
        'Problem statement',
        'Affinity diagrams',
        'Empathy mapping'
      ]
    },
    {
      title: 'UNIT IV - Ideation phase',
      subtopics: [
        'What is ideation, need, uses, ideation methods',
        'Brainstorming, rules for brainstorming',
        'Mind maps, guidelines to create mind maps',
        'Ideation games',
        'Six Thinking Hats',
        'Use of doodling in expressing creative ideas'
      ]
    },
    {
      title: 'UNIT V - Prototyping and Testing phases',
      subtopics: [
        'Types of prototyping',
        'Guidelines for prototyping',
        'Storytelling, characteristics of good stories',
        'Reaching users through stories',
        'Importance of prototyping in design thinking',
        'Guidelines to write value proposition',
        'Necessity to test, user feedback',
        'Conducting a user test, how to test',
        'Desirable, feasible and viable solutions',
        'Iterate phase'
      ]
    }
  ],
  outcomes: [
    'Understand design thinking and its phases as a tool of innovation',
    'Empathize on the needs of the users',
    'Define the problems for stimulating ideation',
    'Ideate on problems to propose solutions by working as a design thinking team',
    'Prototype and test the proposed solutions focusing on local or global societal problems'
  ],
  coPoMatrix: {
    'CO1': [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    'CO2': [1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0],
    'CO3': [1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 0, 0, 0],
    'CO4': [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0],
    'CO5': [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0]
  },
  textbooks: [
    {
      title: "Change by Design: How Design Thinking Transforms Organizations and Inspires",
      authors: "Tim Brown",
      publisher: "HarperCollins",
      edition: "1st Edition",
      year: "2009"
    },
    {
      title: "Design thinking: New product development essentials from the PDMA",
      authors: "Michael Luchs, Scott Swan, Abbie Griffin",
      publisher: "John Wiley & Sons",
      edition: "1st Edition",
      year: "2015"
    },
    {
      title: "Design Your Thinking: The Mindsets, Toolsets and Skill Sets for Creative Problem-solving",
      authors: "Pavan Soni",
      publisher: "Penguin Random House India Private Limited",
      edition: "1st Edition",
      year: "2020"
    }
  ],
  suggestedReadings: [
    {
      title: "Solving problems with design thinking: Ten stories of what works",
      authors: "Jeanne Liedtka, Andrew King, Kevin Bennett",
      publisher: "Columbia University Press",
      edition: "1st Edition",
      year: "2013"
    },
    {
      title: "Karmic Design Thinking - A Buddhism-Inspired Method to Help Create Human-Centered Products & Services",
      authors: "Bala Ramadurai",
      publisher: "Self-published",
      edition: "1st Edition",
      year: "2020"
    }
  ],
  onlineResources: [
    {
      title: "Stanford d.school Design Thinking Resources",
      url: "https://dschool.stanford.edu/resources"
    },
    {
      title: "IDEO Design Thinking",
      url: "https://designthinking.ideo.com/"
    },
    {
      title: "Interaction Design Foundation: Design Thinking",
      url: "https://www.interaction-design.org/literature/topics/design-thinking"
    }
  ],
  industryRelevance: [
    'Product innovation and development',
    'Service design and improvement',
    'User experience (UX) design',
    'Problem-solving in multidisciplinary teams',
    'Business strategy and organizational change',
    'Social innovation and community development',
    'Education and learning design'
  ],
},
  {
  "title": "Algorithmic Game Theory",
  "code": "22CSE06",
  "type": "theory",
  "credits": 3,
  "hoursPerWeek": 3,  // 3L as specified
  "examDuration": 3,
  "cie": 40,
  "see": 60,
  "overview": "This course covers the design of systems with strategic participants that have good performance guarantees, studying games from the perspective of algorithms and theoretical computer science, including complexity-theoretic aspects of computing equilibria, with focus on various game categories and their analysis.",
  "prerequisites": ["Linear Algebra and Calculus", "Data Structures"],
  "objectives": [
    "Understand how to design systems with strategic participants that has good performance guarantees",
    "Understand the study of games from the perspective of algorithms and theoretical computer science",
    "Study the complexity-theoretic hardness of computing equilibria, focusing on Nash equilibria",
    "Study the categories of topics at a basic level: combinatorial games, zero-sum games, non-zero sum games and cooperative games",
    "Obtain familiarity how to Model and analyze conflicting situations using game theory"
  ],
  "topics": [
    {
      "title": "UNIT I - Introduction to Stable Matchings",
      "subtopics": [
        "Stable Matchings",
        "Men-Optimality of the Men-Proposing Gale-Shapley Algorithm",
        "GS: Cheating, Strategies for Men",
        "GS: Cheating Strategies for Women",
        "Problem, Popular",
        "Strategic Behavior in Popular Matchings",
        "Stable Roommates: Matchings in the Non-bipartite Setting"
      ]
    },
    {
      "title": "UNIT II - Voting and Incentive Design",
      "subtopics": [
        "An Introduction to Voting",
        "The Game of Trust - Nicky Case's Interactive Essay",
        "Arrow's Theorem",
        "Gibbard-Satterethwaite Theorem",
        "Domain Restrictions and Multi-winner Elections",
        "Incentive Design in Crowd sourcing Applications"
      ]
    },
    {
      "title": "UNIT III - Algorithms and Fairness",
      "subtopics": [
        "Algorithmic for computing Market Equilibrium",
        "Tournament fixing and superkings",
        "Tournament Fixing Parameterized by FAS",
        "Tournament Fixing with Bribery",
        "An Introduction to Cake-Cutting",
        "EnvyFreenes and Approximate EF",
        "Sperner's Lemma and Applications",
        "Cake Cutting with a Secret Agent",
        "Fairness Notions for Indivisible Goods"
      ]
    },
    {
      "title": "UNIT IV - Combinatorial and Zero-Sum Games",
      "subtopics": [
        "Combinatorial Games: Introduction and examples: N and P positions",
        "Zermelo's Theorem",
        "The game of Hex",
        "Nim games",
        "Sprague-Grundy Theorem",
        "The Sylver Coinage Game",
        "Zero-Sum Games: Introduction and examples",
        "Saddle Point Equilibria & the Minimax Theorem",
        "Zero, Mixed Strategies",
        "Properties of Saddle Point Equilibria"
      ]
    },
    {
      "title": "UNIT V - Game Strategies and Solutions",
      "subtopics": [
        "Iterated elimination of strictly dominated strategies",
        "Lemke-Howson Algorithm",
        "Evolutionary Stable Strategies",
        "Fictitious Play",
        "Brown-Von Neumann-Nash Dynamics",
        "The Nash Bargaining Problem",
        "Transferable Utility Games",
        "The Core",
        "Characterization of Games with non-empty Core",
        "Shapley Value",
        "The Nucleolus"
      ]
    }
  ],
  "outcomes": [
    "Acquire knowledge about the real-world problems and formulate mathematical models of these problems",
    "Identifying the algorithmic Models for finding the optimal solutions for real world examples",
    "Analyze the major limitations and capabilities of game theory problems",
    "Design and analyze problems using game theory approaches",
    "Explore the real-world scenarios of economic and algorithmic interactions using game theory solutions"
  ],
  "coPoMatrix": {
    "CO1": [2, 2, 2, 2, 1, 0, 0, 0, 2, 2, 1, 1, 2, 2, 1],
    "CO2": [3, 3, 2, 2, 1, 0, 0, 1, 2, 2, 1, 1, 2, 2, 1],
    "CO3": [3, 3, 2, 2, 2, 0, 0, 1, 2, 2, 1, 1, 2, 2, 1],
    "CO4": [3, 3, 3, 2, 2, 0, 0, 1, 2, 2, 2, 1, 2, 2, 1],
    "CO5": [3, 3, 3, 2, 2, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2]
  },
  "textbooks": [
    {
      "title": "Algorithmic Game Theory",
      "authors": "Noam Nisan, Tim Roughgarden, Eva Tardos, Vijay V. Vazirani (eds)",
      "publisher": "Cambridge University",
      "edition": "1st Edition",
      "year": "2007"
    },
    {
      "title": "Game Theory",
      "authors": "Michael Maschler, Eilon Solan, and Shmuel Zamir",
      "publisher": "Cambridge University Press",
      "edition": "1st Edition",
      "year": "2013"
    },
    {
      "title": "Game Theory and Mechanism Design",
      "authors": "Y. Narahari",
      "publisher": "World Scientific",
      "edition": "1st Edition",
      "year": "2015"
    },
    {
      "title": "An Introduction to Game Theory",
      "authors": "Martin Osborne",
      "publisher": "Oxford University Press",
      "edition": "1st Edition",
      "year": "2003"
    }
  ],
  "suggestedReadings": [
    {
      "title": "Games and Decisions: Introduction and Critical Survey (Dover Books on Mathematics)",
      "authors": "Robert Duncan Luce, Howard Raiffa",
      "publisher": "Dover Publications",
      "edition": "1st Edition",
      "year": "1989"
    },
    {
      "title": "Theory of Games and Economic Behavior",
      "authors": "John von Neumann, Oskar Morgenstern",
      "publisher": "Princeton University Press",
      "edition": "60th Anniversary Edition",
      "year": "2007"
    }
  ],
  "onlineResources": [
    {
      "title": "NPTEL Course: Game Theory",
      "url": "https://nptel.ac.in/courses/128106007"
    },
    {
      "title": "NPTEL Course: Economics and Game Theory",
      "url": "https://nptel.ac.in/courses/110101133"
    },
    {
      "title": "NPTEL Course: Game Theory and Mechanism Design",
      "url": "https://nptel.ac.in/courses/106105237"
    }
  ],
  "industryRelevance": [
    "Auction design and mechanism design",
    "Algorithmic optimization for marketplaces",
    "Economic modeling of competitive systems",
    "Strategy development for competitive environments",
    "Resource allocation in distributed systems",
    "Fair division problems in business settings",
    "Network pricing and resource management"
  ]
},{
  title: 'Industrial Internet of Things Systems',
  code: '22CIE51',
  type: 'theory',
  credits: 3,
  hoursPerWeek: 3,
  examDuration: 3,
  cie: 40,
  see: 60,
  overview: 'This course covers the fundamentals of Industrial Internet of Things systems, including IoT basics, components, protocols, implementation techniques, and real-world applications with a focus on practical skills for building IIoT projects.',
  prerequisites: ['Computer Architecture and Micro Processor', 'Programming for Problem Solving'],
  objectives: [
    'Understand the basics of IoT and IIOT.',
    'Impart necessary and practical knowledge in Industrial Internet of Things.',
    'Develop skills required to build real-time IIoT based projects.'
  ],
  topics: [
    {
      title: 'UNIT I - Introduction to IoT and IIoT',
      subtopics: [
        'Internet of Things: The Third Wave? Advantages and Disadvantages of IoT.',
        'The Industrial Internet of Things (IIoT): Definition of IIoT, IoT, and M2M, IIoT Challenges, IIoT Requirements, IIoT Benefits.',
        'Internet of Things: More than Smart "Things": IoT key attributes, Three Major Challenges Facing IoT: Technology, Technological Challenges, Business, Categories of IoT, Architecture of IoT.'
      ]
    },
    {
      title: 'UNIT II - IoT Implementation and Challenges',
      subtopics: [
        'Components of IoT Implementation: Sensors, Networks, Standards, Intelligent analysis, Intelligent actions.',
        'IoT Standardization and Implementation Challenges, Communication modules, I/O interfaces, Programming API\'s.'
      ]
    },
    {
      title: 'UNIT III - Hardware Platforms and Interfaces',
      subtopics: [
        'Configuring Raspberry Pi, MicroPython Pyboard, and Jetson Nano for Python: Raspberry Pi Board Feature, Configuration of Raspberry Pi',
        'Simple Applications with Raspberry Pi: OLED Display Interface, Camera Interfacing, Motor Control (DC Motor, Stepper Motor, and Servo Motor)',
        'Raspberry Pi and Mobile Interface Through Bluetooth'
      ]
    },
    {
      title: 'UNIT IV - IoT Protocols',
      subtopics: [
        'IoT data protocols: MQTT, CoAP, AMQP, DDS, HTTP, WebSocket.',
        'Network Protocols for IoT: 6LowPAN, RPL, WiFi, Bluetooth, ZigBee, Z-Wave, LoRaWan, XMPP.'
      ]
    },
    {
      title: 'UNIT V - IIoT Case Studies',
      subtopics: [
        'Smart Grids for Energy Management',
        'Connected Agriculture',
        'Smart Buildings and Facilities Management',
        'Supply Chain Optimization',
        'Connected Healthcare',
        'Smart Retail',
        'Smart Transportation',
        'Water Management'
      ]
    }
  ],
  outcomes: [
    'Understand Internet of Things and IIOT basics components.',
    'Illustrate working of I/O devices, sensors & communication module.',
    'Analyse the use of protocols in IoT.',
    'Interface I/O devices, Sensors & communication module.',
    'Develop real time IoT based projects.'
  ],
  coPoMatrix: {
    'CO1': [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    'CO2': [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    'CO3': [1, 1, 1, 1, 2, 0, 0, 1, 0, 0, 0, 1, 2, 1, 1],
    'CO4': [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 2, 2, 1],
    'CO5': [2, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 2, 1]
  },
  textbooks: [
    {
      title: "Introduction to Internet of Things (IoT)",
      authors: "Ahmed Banafa",
      publisher: "River Publishers",
      year: "2023"
    },
    {
      title: "Python Programming Recipes for IoT Applications",
      authors: "Jivan S. Parab, Madhusudan Ganuji Lanjewar, Marlon Darius Sequeira, Gourish Naik, Arman Yusuf Shaikh",
      publisher: "Springer Nature Singapore Pte Ltd",
      year: "2023"
    },
    {
      title: "Internet of Things: A hands on approach",
      authors: "Arshdeep Bahga, Vijay Madisetti",
      publisher: "VPT publishers",
      year: "2014"
    }
  ],
  suggestedReadings: [
    {
      title: "Introduction to Internet of Things: A practical Approach",
      authors: "Dr. SRN Reddy, Rachit Tirnkral and Manasi Mishra",
      publisher: "ETI Labs",
      year: "2018"
    },
    {
      title: "Designing the Internet of Things",
      authors: "Adrian McEwen",
      publisher: "Wiley",
      year: "2013"
    },
    {
      title: "Internet of Things: Architecture and Design",
      authors: "Raj Kamal",
      publisher: "McGraw Hill",
      year: "2017"
    },
    {
      title: "Getting Started with the Internet of Things",
      authors: "Cuno Pfister",
      publisher: "O'Reilly Media",
      year: "2011"
    }
  ],
  onlineResources: [
    {
      title: "Internet of Things in Industries: A Survey",
      url: "https://ieeexplore.ieee.org/document/6714496"
    },
    {
      title: "RPL: IPv6 Routing Protocol for Low-Power and Lossy Networks",
      url: "https://tools.ietf.org/html/rfc6550"
    },
    {
      title: "The Constrained Application Protocol (CoAP)",
      url: "https://tools.ietf.org/html/rfc7252"
    },
    {
      title: "What's The Difference Between IEEE 802.15.4 And ZigBee Wireless?",
      url: "https://www.electronicdesign.com/technologies/communications/article/21796053/whats-the-difference-between-ieee-802154-and-zigbee-wireless"
    }
  ],
  industryRelevance: [
    'Smart manufacturing and industrial automation',
    'Predictive maintenance systems',
    'Supply chain and logistics optimization',
    'Smart energy grids and utilities',
    'Connected healthcare devices and systems',
    'Smart agriculture and environmental monitoring',
    'Building automation and smart facilities'
  ]
}

  // Add other courses similarly
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'content' | 'references'>('content');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory':
        return <Book className="text-blue-500" />;
      case 'practical':
        return <Beaker className="text-green-500" />;
      case 'project':
        return <Code className="text-purple-500" />;
      default:
        return <BookOpen className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              {getTypeIcon(course.type)}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Course Code: <span className="font-medium">{course.code}</span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Credits</p>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {course.credits}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Hours/Week</p>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {course.hoursPerWeek}
              </p>
            </div>
          </div>
        </div>

        {course.prerequisites && (
          <div className="mt-4">
            <h4 className="text-sm font-medium flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <GraduationCap className="text-gray-400" size={16} />
              <span>Prerequisites</span>
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {course.prerequisites.join(', ')}
            </p>
          </div>
        )}

        <div className="mt-4">
          <h4 className="text-sm font-medium flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Brain className="text-gray-400" size={16} />
            <span>Course Overview</span>
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {course.overview}
          </p>
        </div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center space-x-2"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More Details'}</span>
        </motion.button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                Course Content
              </button>
              <button
                onClick={() => setActiveTab('references')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'references'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                References & Resources
              </button>
            </div>

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                    <Target className="text-gray-400" size={16} />
                    <span>Course Objectives</span>
                  </h4>
                  <ul className="space-y-2">
                    {course.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-indigo-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                    <BookOpen className="text-gray-400" size={16} />
                    <span>Topics Covered</span>
                  </h4>
                  <div className="space-y-4">
                    {course.topics.map((topic, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800 dark:text-gray-200">{topic.title}</h5>
                          {topic.hours && (
                            <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center">
                              <Clock size={12} className="mr-1" />
                              {topic.hours} hours
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1.5">
                          {topic.subtopics.map((subtopic, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2"
                            >
                              <span className="text-indigo-500 flex-shrink-0 mt-0.5">•</span>
                              <span>{subtopic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-gray-400" size={16} />
                    <span>Learning Outcomes</span>
                  </h4>
                  <ul className="space-y-2">
                    {course.outcomes.map((outcome, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-indigo-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {course.coPoMatrix && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                      <FileText className="text-gray-400" size={16} />
                      <span>CO-PO Articulation Matrix</span>
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 border text-left bg-gray-50 dark:bg-gray-800">CO/PO</th>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <th key={i} className="p-2 border text-center bg-gray-50 dark:bg-gray-800">
                                PO{i + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(course.coPoMatrix).map(([co, values], index) => (
                            <tr key={index}>
                              <td className="p-2 border font-medium">{co}</td>
                              {values.map((value, i) => (
                                <td 
                                  key={i} 
                                  className={`p-2 border text-center ${
                                    value > 0 ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''
                                  }`}
                                >
                                  {value > 0 ? value : '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {course.industryRelevance && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                      <Briefcase className="text-gray-400" size={16} />
                      <span>Industry Relevance & Applications</span>
                    </h4>
                    <ul className="space-y-2">
                      {course.industryRelevance.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="text-indigo-500 flex-shrink-0 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                    <GraduationCap className="text-gray-400" size={16} />
                    <span>Evaluation Scheme</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">CIE</p>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {course.cie} marks
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">SEE</p>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {course.see} marks
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                    <Clock size={14} className="mr-2 text-gray-400" />
                    Exam Duration: {course.examDuration} hours
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div className="space-y-6">
                {course.textbooks && course.textbooks.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                      <BookIcon className="text-gray-400" size={16} />
                      <span>Textbooks</span>
                    </h4>
                    <ul className="space-y-4">
                      {course.textbooks.map((book, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          <div className="border-l-2 border-indigo-500 pl-3 py-1">
                            <p className="font-medium">{book.title}</p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                              {book.authors}
                              {book.publisher && `, ${book.publisher}`}
                              {book.edition && `, ${book.edition}`}
                              {book.year && ` (${book.year})`}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.suggestedReadings && course.suggestedReadings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                      <BookIcon className="text-gray-400" size={16} />
                      <span>Suggested Readings</span>
                    </h4>
                    <ul className="space-y-4">
                      {course.suggestedReadings.map((book, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          <div className="border-l-2 border-green-500 pl-3 py-1">
                            <p className="font-medium">{book.title}</p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                              {book.authors}
                              {book.publisher && `, ${book.publisher}`}
                              {book.edition && `, ${book.edition}`}
                              {book.year && ` (${book.year})`}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.onlineResources && course.onlineResources.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center space-x-2 mb-3 text-gray-700 dark:text-gray-300">
                      <Link className="text-gray-400" size={16} />
                      <span>Online Resources</span>
                    </h4>
                    <ul className="space-y-2">
                      {course.onlineResources.map((resource, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <span className="text-indigo-500 flex-shrink-0 mt-0.5">•</span>
                          <span className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            {resource.title}: {resource.url}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const SyllabusDocument: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<'all' | 'theory' | 'practical' | 'project'>('all');

  const filteredCourses = courses.filter(
    course => selectedType === 'all' || course.type === selectedType
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Semester VI Syllabus</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Department of Computer Science Engineering</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'theory', 'practical', 'project'] as const).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SyllabusDocument;