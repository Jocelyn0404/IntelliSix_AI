
import { LearningMaterial, QuizQuestion, LearningState, QuizStatus, ScoreLevel, ImprovementStatus, ErrorPattern, EngagementStatus, PerformanceClassification } from './types';

export const INITIAL_MATERIALS: LearningMaterial[] = [
  { 
    id: 't4-1', 
    title: 'Problem Solving Strategies', 
    type: 'Article', 
    level: 'Foundational', 
    locked: false, 
    recommended: true, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. The Problem Solving Process</h3>
      <p>Computer science is fundamentally about solving problems. The strategy often used is the <strong>IPO Model</strong>:</p>
      <ul>
        <li><strong>Input</strong>: Data required to solve the problem.</li>
        <li><strong>Process</strong>: Algorithms and logic to transform input.</li>
        <li><strong>Output</strong>: The final result presented to the user.</li>
      </ul>
      
      <h3>2. Types of Errors</h3>
      <p>When coding, you will encounter three main types of errors:</p>
      <ul>
        <li><strong>Syntax Error</strong>: Grammatical rules of the language are broken (e.g., missing semicolon). The program won't run.</li>
        <li><strong>Runtime Error</strong>: Occurs during execution (e.g., dividing by zero). The program crashes.</li>
        <li><strong>Logical Error</strong>: The program runs but gives the wrong output (e.g., using + instead of *). These are the hardest to find.</li>
      </ul>

      <h3>3. Algorithms</h3>
      <p>An algorithm is a step-by-step procedure to solve a problem. It can be represented via <strong>Pseudocode</strong> (text-based) or <strong>Flowcharts</strong> (visual diagrams).</p>
    `
  },
  { 
    id: 't4-2', 
    title: 'Algorithms & Control Structures', 
    type: 'Video', 
    level: 'Foundational', 
    locked: false, 
    recommended: true, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. Control Structures</h3>
      <p>Every computer program is built using three basic control structures:</p>
      <div class="bg-indigo-50 p-4 rounded-xl my-4">
        <p><strong>Sequence</strong>: Instructions are executed one after another.</p>
        <p><strong>Selection (Decision)</strong>: Using IF/ELSE to choose a path based on a condition.</p>
        <p><strong>Repetition (Looping)</strong>: Repeating a block of code (FOR, WHILE, DO-WHILE).</p>
      </div>

      <h3>2. Operators</h3>
      <ul>
        <li><strong>Arithmetic</strong>: +, -, *, /, % (Modulus/Remainder).</li>
        <li><strong>Relational</strong>: == (equal), != (not equal), > (greater), < (less).</li>
        <li><strong>Logical</strong>: && (AND), || (OR), ! (NOT).</li>
      </ul>

      <h3>3. Comparison of Loops</h3>
      <ul>
        <li><strong>FOR loop</strong>: Use when you know exactly how many times to loop.</li>
        <li><strong>WHILE loop</strong>: Checks condition <em>before</em> executing (might not run at all).</li>
        <li><strong>DO-WHILE loop</strong>: Checks condition <em>after</em> executing (always runs at least once).</li>
      </ul>
    `
  },
  { 
    id: 't4-3', 
    title: 'Data Structures & Modularity', 
    type: 'Interactive', 
    level: 'Foundational', 
    locked: false, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. Arrays</h3>
      <p>An array is a variable that can store multiple values of the same type.</p>
      <p><strong>Indexing</strong>: Accessing elements uses an index, which usually starts at <strong>0</strong>. <br>
      Example: <code>scores[0]</code> is the first item.</p>

      <h3>2. Sub-programs (Functions/Methods)</h3>
      <p>Modularity involves breaking a large program into smaller, manageable pieces called functions or procedures.</p>
      <ul>
        <li><strong>Reusability</strong>: Write code once, use it many times.</li>
        <li><strong>Maintainability</strong>: Easier to debug specific parts of code.</li>
      </ul>

      <h3>3. Parameter Passing</h3>
      <ul>
        <li><strong>Pass by Value</strong>: The function gets a <em>copy</em> of the data. Changes don't affect the original variable.</li>
        <li><strong>Pass by Reference</strong>: The function gets a <em>link</em> to the original variable. Changes affect the original data.</li>
      </ul>
    `
  },
  { 
    id: 't5-1', 
    title: 'Architecture & Logic Gates', 
    type: 'Video', 
    level: 'Advanced', 
    locked: true, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. The Central Processing Unit (CPU)</h3>
      <p>The "brain" of the computer. It consists of:</p>
      <ul>
        <li><strong>ALU (Arithmetic Logic Unit)</strong>: Performs math (+, -) and logic (AND, OR).</li>
        <li><strong>CU (Control Unit)</strong>: Decodes instructions and controls data flow.</li>
        <li><strong>Registers</strong>: Small, super-fast storage (e.g., PC, ACC, MAR, MDR).</li>
      </ul>

      <h3>2. The Machine Cycle (FDE)</h3>
      <ol>
        <li><strong>Fetch</strong>: Get instruction from memory (RAM).</li>
        <li><strong>Decode</strong>: CU interprets what the instruction means.</li>
        <li><strong>Execute</strong>: ALU or other components perform the action.</li>
      </ol>

      <h3>3. Logic Gates</h3>
      <p>Building blocks of digital circuits.</p>
      <ul>
        <li><strong>AND</strong>: True only if BOTH inputs are True.</li>
        <li><strong>OR</strong>: True if AT LEAST ONE input is True.</li>
        <li><strong>NOT</strong>: Inverses the input (True becomes False).</li>
        <li><strong>NAND/NOR</strong>: The inverse of AND/OR.</li>
      </ul>
    `
  },
  { 
    id: 't5-2', 
    title: 'Advanced Database (SQL)', 
    type: 'Article', 
    level: 'Advanced', 
    locked: true, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. SQL Commands</h3>
      <p>Structured Query Language is used to manage databases.</p>
      <div class="grid grid-cols-2 gap-4 my-4">
        <div class="bg-blue-50 p-3 rounded">
          <strong>DDL (Definition)</strong><br>
          CREATE TABLE<br>ALTER TABLE<br>DROP TABLE
        </div>
        <div class="bg-green-50 p-3 rounded">
          <strong>DML (Manipulation)</strong><br>
          SELECT<br>INSERT INTO<br>UPDATE<br>DELETE FROM
        </div>
      </div>

      <h3>2. Keys</h3>
      <ul>
        <li><strong>Primary Key (PK)</strong>: Unique identifier for a record (cannot be null).</li>
        <li><strong>Foreign Key (FK)</strong>: A field that links to the PK of another table.</li>
      </ul>

      <h3>3. Normalization</h3>
      <p>The process of organizing data to reduce redundancy.</p>
      <ul>
        <li><strong>0NF</strong>: Unnormalized data (duplicates exist).</li>
        <li><strong>1NF</strong>: Atomic values (no multiple items in one cell), assign PK.</li>
        <li><strong>2NF</strong>: 1NF + No partial dependencies (everything depends on the full PK).</li>
        <li><strong>3NF</strong>: 2NF + No transitive dependencies (non-key fields don't depend on other non-key fields).</li>
      </ul>
    `
  },
  { 
    id: 't5-3', 
    title: 'Web-Based Programming', 
    type: 'Interactive', 
    level: 'Advanced', 
    locked: true, 
    completedAssessments: [], 
    assessmentScores: {},
    content: `
      <h3>1. Client vs. Server</h3>
      <ul>
        <li><strong>Client-side</strong>: Runs in the user's browser (HTML, CSS, JavaScript). Used for UI and immediate validation.</li>
        <li><strong>Server-side</strong>: Runs on the web server (PHP, ASP, Python). Used for database access and security.</li>
      </ul>

      <h3>2. HTML (Structure)</h3>
      <p>HyperText Markup Language defines the content.</p>
      <p>Common tags: <code>&lt;h1&gt;</code> (Headings), <code>&lt;p&gt;</code> (Paragraphs), <code>&lt;a href="..."&gt;</code> (Links), <code>&lt;img&gt;</code> (Images).</p>

      <h3>3. CSS (Style)</h3>
      <p>Cascading Style Sheets control the look (colors, fonts, layout).</p>

      <h3>4. JavaScript (Behavior)</h3>
      <p>Adds interactivity (popups, games, dynamic updates).</p>
    `
  },
];

export const BASIC_MATERIAL: LearningMaterial = {
  id: 'basic-1',
  title: 'Basic Computing Skills',
  type: 'Article',
  level: 'Basic',
  locked: false,
  completedAssessments: [],
  assessmentScores: {},
  content: `
    <h3>1. What is a Computer?</h3>
    <p>A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data.</p>
    
    <h3>2. Hardware vs Software</h3>
    <ul>
      <li><strong>Hardware</strong>: The physical parts of a computer (Keyboard, Mouse, Screen).</li>
      <li><strong>Software</strong>: The programs and apps that run on the computer (Windows, Word, Games).</li>
    </ul>

    <h3>3. Using a Mouse</h3>
    <p>A mouse is a handheld hardware input device that controls a cursor in a GUI (Graphical User Interface).</p>
  `
};

export const TOPIC_QUIZZES: Record<string, QuizQuestion[][]> = {
  'basic-1': [
    [
      { id: 1, question: "Which of these is Hardware?", options: ["Windows 10", "Microsoft Word", "Keyboard", "Website"], correctAnswer: 2, hint: "Physical object.", explanation: "Hardware refers to the physical components of a computer that you can touch, like a keyboard or mouse." },
      { id: 2, question: "What does a computer do with data?", options: ["Eats it", "Process, Store, Retrieve", "Ignores it", "Only deletes it"], correctAnswer: 1, hint: "IPO model basics.", explanation: "Computers are designed to input, process, store, and retrieve data efficiently." }
    ],
    [
      { id: 3, question: "Software refers to...", options: ["The screen", "The cables", "The programs", "The electricity"], correctAnswer: 2, hint: "Code and Apps.", explanation: "Software is the set of instructions, data, or programs used to operate computers and execute specific tasks." },
      { id: 4, question: "GUI stands for...", options: ["Graphical User Interface", "Global Unit Index", "General User Input", "Green Umbrella Icon"], correctAnswer: 0, hint: "Visual interface.", explanation: "GUI (Graphical User Interface) allows users to interact with electronic devices through graphical icons and audio indicators." }
    ]
  ],
  't4-1': [
    [
      { id: 101, question: "What is the first step in Problem Analysis?", options: ["Coding", "IPO Analysis", "Testing", "Deployment"], correctAnswer: 1, hint: "Input, Process, Output.", explanation: "IPO (Input, Process, Output) analysis is the foundational step in problem solving. It allows developers to identify what data is needed, how it will be transformed, and what the final result should be before any coding starts." },
      { id: 102, question: "A logical error is also known as a...?", options: ["Syntax Error", "Bug", "Runtime Error", "Exception"], correctAnswer: 1, hint: "Common dev slang for logic flaws.", explanation: "While 'Bug' is a general term, in logical contexts, it refers to code that runs without crashing but produces the wrong result due to a mistake in the logic implemented by the programmer." },
      { id: 105, question: "In an IPO chart, 'Calculate Average' represents...?", options: ["Input", "Process", "Storage", "Output"], correctAnswer: 1, hint: "An action or transformation.", explanation: "Any calculation, manipulation, or transformation of data is considered a 'Process' in the Input-Process-Output model." },
      { id: 106, question: "Which testing phase verifies individual modules?", options: ["System Testing", "Alpha Testing", "Unit Testing", "User Acceptance"], correctAnswer: 2, hint: "Testing the smallest parts.", explanation: "Unit Testing focuses on verifying the smallest testable parts of an application (like individual functions or classes) independently." }
    ],
    [
      { id: 103, question: "Which chart is used to plan project timelines?", options: ["Flowchart", "Gantt Chart", "Pie Chart", "IPO Chart"], correctAnswer: 1, hint: "Visualizes schedules.", explanation: "A Gantt Chart is a type of bar chart that illustrates a project schedule. It shows the start and finish dates of the various elements and dependencies of a project." },
      { id: 104, question: "Resource management involves balancing...?", options: ["Time and Cost", "Color and Font", "HTML and CSS", "CPU and RAM"], correctAnswer: 0, hint: "The project management triangle.", explanation: "The Project Management Triangle consists of Time, Cost, and Scope. Managing these resources is critical to delivering a successful system within constraints." },
      { id: 107, question: "A dependency where Task B starts only after Task A finishes is...?", options: ["Start-to-Start", "Finish-to-Start", "Finish-to-Finish", "Start-to-Finish"], correctAnswer: 1, hint: "Sequential flow.", explanation: "Finish-to-Start (FS) is the most common dependency type, where the successor task cannot begin until the predecessor task has completed." },
      { id: 108, question: "What does 'Scope' define in a project?", options: ["The budget", "The deadline", "The boundaries and deliverables", "The team members"], correctAnswer: 2, hint: "What is included and excluded.", explanation: "Project Scope defines the goals, deliverables, tasks, costs, and deadlines. It specifically outlines what the project will and will not cover." }
    ]
  ],
  't4-2': [
    [
      { id: 201, question: "Which loop checks the condition AFTER the first execution?", options: ["FOR", "WHILE", "DO-WHILE", "IF"], correctAnswer: 2, hint: "Guarantees at least one run.", explanation: "A DO-WHILE loop is a post-test loop. This means the block of code is executed first, and then the condition is evaluated. If the condition is true, the loop repeats." },
      { id: 202, question: "What does 'i++' do?", options: ["Subtract 1", "Add 1", "Square i", "Divide i"], correctAnswer: 1, hint: "Increment operator.", explanation: "'i++' is the increment operator in most C-style languages. It adds exactly one to the current value of the variable 'i'." },
      { id: 205, question: "Which operator is used to check for equality?", options: ["=", "==", "===", "!="], correctAnswer: 1, hint: "Double equals.", explanation: "In many languages, '=' is for assignment, while '==' is used to compare if two values are equal." },
      { id: 206, question: "What is the result of 10 % 3?", options: ["3.33", "3", "1", "0"], correctAnswer: 2, hint: "Remainder division.", explanation: "The modulus operator (%) returns the remainder of the division. 10 divided by 3 is 3 with a remainder of 1." }
    ],
    [
      { id: 203, question: "A nested if-statement is...?", options: ["An if inside another if", "A broken if", "An if without else", "A loop"], correctAnswer: 0, hint: "Layered conditions.", explanation: "Nesting refers to placing one control structure inside another. A nested if allows for complex decision-making where the second condition is only checked if the first one is met." },
      { id: 204, question: "Pseudocode is used to...?", options: ["Run apps", "Write algorithms in plain English", "Connect databases", "Design icons"], correctAnswer: 1, hint: "Human-readable code logic.", explanation: "Pseudocode is a high-level description of an algorithm that uses the structural conventions of a programming language but is intended for human reading rather than machine execution." },
      { id: 207, question: "In a flowchart, a diamond shape represents...?", options: ["Process", "Input/Output", "Decision", "Start/End"], correctAnswer: 2, hint: "Yes/No questions.", explanation: "A diamond shape is used for Decision points in a flowchart, typically branching into 'Yes' (True) and 'No' (False) paths." },
      { id: 208, question: "Which logical operator returns true only if both inputs are true?", options: ["OR", "NOT", "AND", "XOR"], correctAnswer: 2, hint: "Both must be valid.", explanation: "The AND operator requires all conditions to be met for the final result to be true." }
    ]
  ],
  't4-3': [
    [
      { id: 301, question: "What is the starting index of an array?", options: ["1", "0", "-1", "Depends on language"], correctAnswer: 1, hint: "Zero-based indexing.", explanation: "In almost all modern programming languages like Java, C++, and Python, arrays use zero-based indexing, meaning the first element is accessed at index 0." },
      { id: 302, question: "A 'Modular' system is one that is...?", options: ["Single file", "Divided into functions", "Only for web", "Encrypted"], correctAnswer: 1, hint: "Pecah-dan-urus.", explanation: "Modularity is a design technique that separates the functionality of a program into independent, interchangeable modules, each containing everything necessary to execute only one aspect of the desired functionality." },
      { id: 305, question: "If arr = [10, 20, 30], what is arr[2]?", options: ["10", "20", "30", "undefined"], correctAnswer: 2, hint: "Index 0 is 10, Index 1 is 20...", explanation: "With zero-based indexing: index 0 is 10, index 1 is 20, and index 2 is 30." },
      { id: 306, question: "What is the primary benefit of using functions?", options: ["Increases file size", "Code Reusability", "Slows down execution", "Confuses the compiler"], correctAnswer: 1, hint: "Write once, use many times.", explanation: "Functions allow you to write a block of code once and reuse it multiple times throughout your program, making code easier to maintain and debug." }
    ],
    [
      { id: 303, question: "Which keyword defines a constant in Java?", options: ["static", "final", "const", "var"], correctAnswer: 1, hint: "Makes variables unchangeable.", explanation: "The 'final' keyword in Java is used to declare constants. Once a final variable has been assigned a value, it cannot be changed later in the program." },
      { id: 304, question: "A local variable is accessible...?", options: ["Everywhere", "Only in its function", "Only in main", "In the cloud"], correctAnswer: 1, hint: "Limited scope.", explanation: "A local variable is declared within a block (like a function or a loop) and its scope is limited to that specific block. It cannot be accessed from outside that block." },
      { id: 307, question: "Sorting algorithm that swaps adjacent elements is...?", options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Bucket Sort"], correctAnswer: 0, hint: "Bubbling up.", explanation: "Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order." },
      { id: 308, question: "Passing by reference means the function receives...?", options: ["A copy of the value", "The memory address", "A new variable", "Nothing"], correctAnswer: 1, hint: "Direct access to original data.", explanation: "When passing by reference, the memory address of the variable is passed, allowing the function to modify the original variable's value." }
    ]
  ],
  't5-1': [
    [
      { id: 501, question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Power Unit", "Core Power Unit"], correctAnswer: 1, hint: "The brain of the computer.", explanation: "The Central Processing Unit (CPU) is the primary component of a computer that acts as its 'control center,' executing instructions of a computer program." },
      { id: 502, question: "The FDE cycle stands for?", options: ["First-Data-Entry", "Fetch-Decode-Execute", "Find-Data-Error", "Fast-Direct-End"], correctAnswer: 1, hint: "The core CPU process.", explanation: "The Fetch-Decode-Execute (FDE) cycle describes the basic operation of a CPU: it fetches an instruction from memory, decodes what it means, and then executes that instruction." },
      { id: 505, question: "Which CPU component performs math calculations?", options: ["CU", "ALU", "Register", "Cache"], correctAnswer: 1, hint: "Arithmetic Logic Unit.", explanation: "The ALU (Arithmetic Logic Unit) is responsible for performing all arithmetic (addition, subtraction) and logical (AND, OR) operations." },
      { id: 506, question: "What stores the address of the next instruction?", options: ["Accumulator", "Program Counter", "Instruction Register", "Memory Data Register"], correctAnswer: 1, hint: "Counts the program steps.", explanation: "The Program Counter (PC) is a register that holds the memory address of the next instruction to be fetched and executed." }
    ],
    [
      { id: 503, question: "Which Gate is the inverse of AND?", options: ["OR", "NOR", "NAND", "XOR"], correctAnswer: 2, hint: "NOT-AND.", explanation: "NAND stands for 'NOT AND'. Its output is 0 only when both inputs are 1. For all other input combinations, the output is 1." },
      { id: 504, question: "Von Neumann architecture stores program and data in...?", options: ["Same memory", "Different memory", "Only on tape", "Only on disk"], correctAnswer: 0, hint: "Unified storage principle.", explanation: "The Von Neumann architecture is a computer architecture that stores both computer program instructions and data in the same read-write, random-access memory (RAM)." },
      { id: 507, question: "Which gate outputs 1 only when inputs are different?", options: ["AND", "OR", "XOR", "NOT"], correctAnswer: 2, hint: "Exclusive OR.", explanation: "XOR (Exclusive OR) outputs 1 (true) only if one input is true and the other is false. If both are the same, it outputs 0." },
      { id: 508, question: "The Data Bus is...?", options: ["Uni-directional", "Bi-directional", "Wireless", "Virtual"], correctAnswer: 1, hint: "Two-way traffic.", explanation: "The Data Bus carries data between the processor, memory, and I/O devices. It is bi-directional because data needs to be both read from and written to memory." }
    ]
  ],
  't5-2': [
    [
      { id: 601, question: "Which SQL command deletes data?", options: ["DROP", "DELETE", "REMOVE", "CLEAR"], correctAnswer: 1, hint: "DML command for records.", explanation: "The DELETE command is used to remove existing records from a table. DROP is used to delete an entire table or database structure." },
      { id: 602, question: "What is a Primary Key?", options: ["A master password", "A unique identifier", "A secondary index", "A foreign link"], correctAnswer: 1, hint: "Ensures entity integrity.", explanation: "A Primary Key is a specific column or set of columns in a table that uniquely identifies each row. It cannot contain NULL values and must be unique across the table." },
      { id: 605, question: "Which clause filters records in SQL?", options: ["ORDER BY", "GROUP BY", "WHERE", "SELECT"], correctAnswer: 2, hint: "Conditional selection.", explanation: "The WHERE clause is used to extract only those records that fulfill a specified condition." },
      { id: 606, question: "INSERT INTO is used to...?", options: ["Create a table", "Add new rows", "Modify columns", "Sort data"], correctAnswer: 1, hint: "Adding data.", explanation: "INSERT INTO is the SQL command used to insert new records (rows) into an existing table." }
    ],
    [
      { id: 603, question: "Which command changes a table's structure?", options: ["UPDATE", "MODIFY", "ALTER TABLE", "RENAME"], correctAnswer: 2, hint: "DDL command.", explanation: "The ALTER TABLE command is used to add, delete, or modify columns in an existing table. UPDATE is used to modify the data within the rows." },
      { id: 604, question: "Normalisation aims to reduce...?", options: ["Redundancy", "Performance", "Security", "Tables"], correctAnswer: 0, hint: "Avoiding data kelewahan.", explanation: "Normalization is the process of organizing data in a database to reduce data redundancy (duplicate data) and improve data integrity." },
      { id: 607, question: "First Normal Form (1NF) requires removing...?", options: ["Transitive Dependencies", "Repeating Groups", "Foreign Keys", "Primary Keys"], correctAnswer: 1, hint: "Atomic values.", explanation: "1NF requires that each column contains only atomic values, meaning there are no repeating groups or arrays within a single cell." },
      { id: 608, question: "Which key links two tables together?", options: ["Primary Key", "Foreign Key", "Candidate Key", "Super Key"], correctAnswer: 1, hint: "Reference to another table.", explanation: "A Foreign Key is a field (or collection of fields) in one table that refers to the Primary Key in another table, establishing a relationship." }
    ]
  ],
  't5-3': [
    [
      { id: 701, question: "Which is a client-side language?", options: ["PHP", "SQL", "JavaScript", "Python"], correctAnswer: 2, hint: "Runs in the browser.", explanation: "JavaScript is the primary language used for client-side scripting, allowing for interactive web pages. PHP, Python, and SQL typically run on the server-side." },
      { id: 702, question: "What is the HTML tag for a button?", options: ["<btn>", "<clickable>", "<button>", "<input type='click'>"], correctAnswer: 2, hint: "Standard interactive tag.", explanation: "The <button> tag defines a clickable button within an HTML document. You can put content, like text or images, inside the tag." },
      { id: 705, question: "What does CSS stand for?", options: ["Computer Style Sheet", "Cascading Style Sheets", "Creative Style System", "Code Style Standard"], correctAnswer: 1, hint: "Styling language.", explanation: "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML." },
      { id: 706, question: "Which HTML tag creates a bulleted list?", options: ["<ol>", "<li>", "<ul>", "<list>"], correctAnswer: 2, hint: "Unordered list.", explanation: "The <ul> tag defines an unordered (bulleted) list. Use <ol> for ordered (numbered) lists." }
    ],
    [
      { id: 703, question: "Server-side scripts run on...?", options: ["The Browser", "The Server", "The Client", "The Satellite"], correctAnswer: 1, hint: "Executes before reaching the user.", explanation: "Server-side scripts are executed on the web server before the resulting page is sent to the user's web browser." },
      { id: 704, question: "Which tag is used for a hyperlink?", options: ["<link>", "<a>", "<url>", "<href>"], correctAnswer: 1, hint: "Anchor tag.", explanation: "The <a> (anchor) tag is used to define a hyperlink, which is used to link from one page to another. The most important attribute is 'href', which indicates the link's destination." },
      { id: 707, question: "In PHP, variables start with which symbol?", options: ["@", "#", "$", "%"], correctAnswer: 2, hint: "Dollar sign.", explanation: "In PHP, a variable starts with the $ sign, followed by the name of the variable." },
      { id: 708, question: "Which method sends form data visibly in the URL?", options: ["POST", "GET", "SEND", "REQUEST"], correctAnswer: 1, hint: "Not for passwords.", explanation: "The GET method appends form data to the URL in name/value pairs. It is less secure than POST and has a length limit." }
    ]
  ]
};

export const INITIAL_STATE: LearningState = {
  qs: QuizStatus.NOT_COMPLETED,
  sl: ScoreLevel.NO_SCORE,
  is: ImprovementStatus.NOT_IMPROVED,
  ep: ErrorPattern.LOW,
  es: EngagementStatus.NO_INTERACTION,
  pc: PerformanceClassification.LOW,
};

export const GOAL_STATE: LearningState = {
  qs: QuizStatus.COMPLETED,
  sl: ScoreLevel.HIGH,
  is: ImprovementStatus.IMPROVED,
  ep: ErrorPattern.LOW,
  es: EngagementStatus.RESPONDED,
  pc: PerformanceClassification.HIGH,
};
