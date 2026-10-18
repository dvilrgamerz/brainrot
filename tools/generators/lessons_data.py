# lessons_data.py - 14 new lessons (4 in V1, total 18 lessons)

new_lessons = [
    # --- SCIENCE LESSONS ---
    {
        "id": "gravity",
        "subject": "Science",
        "title": "Gravity and Gravitational Force",
        "text": "Gravity is the universal attractive force that pulls any two masses toward each other. Sir Isaac Newton showed that every mass in the universe attracts every other mass, proportional to their masses and inversely proportional to the square of the distance between them. Later, Albert Einstein's general theory of relativity revealed that gravity is actually the curvature of spacetime caused by mass and energy. On Earth, gravity accelerates falling objects toward the ground at approximately 9.8 meters per second squared. Without gravity, planets would not orbit the Sun, and our atmosphere would drift away into space.",
        "question": "Without looking: what causes gravitational attraction according to Einstein, and what is Earth's gravitational acceleration?",
        "answer": "Einstein showed gravity is the curvature of spacetime caused by mass and energy; on Earth, gravitational acceleration is approximately 9.8 m/s²."
    },
    {
        "id": "evolution",
        "subject": "Science",
        "title": "Evolution by Natural Selection",
        "text": "Evolution is the process of biological change in inherited traits across successive generations of a population. In 1859, Charles Darwin proposed natural selection as the primary mechanism driving evolutionary adaptation. Within any population, individuals possess genetic variations arising from random DNA mutations and sexual reproduction. Individuals with advantageous traits best suited to their local environment survive and reproduce more successfully. Over millions of years, these cumulative adaptations give rise to new biological species.",
        "question": "Without looking: who proposed natural selection in 1859, and why do advantageous traits become more common?",
        "answer": "Charles Darwin proposed natural selection; advantageous traits become more common because individuals with them survive and reproduce more successfully."
    },
    {
        "id": "periodic-table",
        "subject": "Science",
        "title": "The Periodic Table of Elements",
        "text": "The periodic table organizes all known chemical elements by their atomic number, which equals their proton count. Dmitri Mendeleev created the first widely recognized periodic table in 1869 by arranging elements with repeating properties into recurring columns. Vertical columns are called groups or families, whose elements share identical numbers of valence electrons and similar chemical reactivity. Horizontal rows are called periods, corresponding to the filling of electron shells. The table accurately predicts element properties, from reactive alkali metals to inert noble gases.",
        "question": "Without looking: how are elements ordered on the modern periodic table, and what do elements in the same vertical group share?",
        "answer": "Elements are ordered by atomic number (proton count); elements in the same group share valence electron counts and similar chemical reactivity."
    },
    {
        "id": "electricity",
        "subject": "Science",
        "title": "Electric Current and Circuits",
        "text": "Electric current is the organized flow of electric charge, typically carried by mobile electrons through a conductive material like copper wire. For current to flow continuously, it requires a complete closed circuit and an electromotive force, known as voltage. Ohm's Law states that current equals voltage divided by electrical resistance. When components are connected in series, the same current flows through each part sequentially. In a parallel circuit, multiple branches allow independent current paths, which is how household electrical wiring operates.",
        "question": "Without looking: what two conditions are needed for continuous current flow, and how does Ohm's Law relate current to voltage?",
        "answer": "A complete closed circuit and a voltage source; Ohm's Law states current equals voltage divided by resistance (I = V / R)."
    },

    # --- COMPUTER SCIENCE LESSONS ---
    {
        "id": "internet-works",
        "subject": "Computer Science",
        "title": "How the Internet Works",
        "text": "The Internet is a global network of interconnected computers communicating via standardized protocols known as the Internet Protocol Suite (TCP/IP). When you request a webpage, data is sliced into discrete packets stamped with source and destination IP addresses. Routers direct these packets across fiber-optic cables, cellular towers, and undersea links along the fastest available paths. At the receiving device, TCP checks every packet for corruption and reassembles them in their original sequence. The Domain Name System (DNS) maps human-friendly web domains to the numerical IP addresses used by these routers.",
        "question": "Without looking: how is data transmitted across the Internet, and what role does DNS play?",
        "answer": "Data is broken into packets and directed by routers using IP addresses; DNS translates domain names into numerical IP addresses."
    },
    {
        "id": "what-is-algorithm",
        "subject": "Computer Science",
        "title": "What is an Algorithm?",
        "text": "An algorithm is an unambiguous, step-by-step sequence of instructions designed to solve a problem or perform a computation. Every valid algorithm takes an input, processes it through well-defined operations, and terminates with an output. Computer scientists evaluate algorithms using Big-O notation, which measures how time and memory requirements grow as input size increases. Efficient algorithms are essential for modern software, powering everything from search engines and GPS navigation to machine learning. Choosing the right algorithm often makes a program run thousands of times faster.",
        "question": "Without looking: what are the key characteristics of an algorithm, and how is algorithmic efficiency measured?",
        "answer": "An algorithm is a step-by-step procedure taking inputs and producing outputs; efficiency is measured using Big-O notation for time and memory."
    },
    {
        "id": "databases",
        "subject": "Computer Science",
        "title": "Relational Databases and SQL",
        "text": "A relational database organizes structured information into tables composed of rows and columns. Each row represents an individual record, uniquely identified by a primary key, while foreign keys establish relationships across different tables. Structured Query Language (SQL) provides a declarative standard for querying, inserting, and modifying stored data. Reliable database transactions follow ACID properties: Atomicity, Consistency, Isolation, and Durability. These guarantees ensure that critical operations, such as financial transfers, either complete entirely or leave data unmodified if an error occurs.",
        "question": "Without looking: what uniquely identifies a row in a relational database, and what does ACID guarantee?",
        "answer": "A primary key uniquely identifies each row; ACID properties guarantee that database transactions are reliable and atomic."
    },
    {
        "id": "cybersecurity",
        "subject": "Computer Science",
        "title": "Cybersecurity and Encryption",
        "text": "Cybersecurity protects computers, networks, and data from unauthorized access, theft, and damage. Modern digital security relies heavily on cryptography, the mathematical science of secure communication. Symmetric encryption uses a single shared secret key for both encryption and decryption, making it fast for large files. Asymmetric encryption uses a paired public key for encrypting and a private key for decrypting, solving the key distribution problem. Cryptographic hash functions provide data integrity by creating unique, irreversible mathematical fingerprints of digital files.",
        "question": "Without looking: what is the key difference between symmetric and asymmetric encryption?",
        "answer": "Symmetric encryption uses one shared secret key, while asymmetric encryption uses a paired public key and private key."
    },

    # --- CODING LESSONS ---
    {
        "id": "recursion",
        "subject": "Coding",
        "title": "Understanding Recursion",
        "text": "Recursion is a programming technique where a function solves a problem by calling itself with smaller subproblems. Every recursive function must define a base case that returns a direct result without further recursive calls. Without a base case, the function will execute indefinitely until the runtime exhausts memory and throws a stack overflow error. Each recursive invocation adds a new frame to the call stack, preserving local variables until the base case is reached. Recursion is particularly elegant for traversing trees, graphs, and divide-and-conquer algorithms like Merge Sort.",
        "question": "Without looking: what must every recursive function have, and what happens if it is missing?",
        "answer": "Every recursive function must have a base case; without it, the function calls itself indefinitely, causing a stack overflow."
    },
    {
        "id": "oop",
        "subject": "Coding",
        "title": "Object-Oriented Programming",
        "text": "Object-Oriented Programming (OOP) is a software design paradigm structured around objects that contain both data and behavior. Data is held in fields called attributes, while behavior is implemented in functions called methods. OOP is built upon four foundational pillars: Encapsulation bundles data and restricts direct outside access; Abstraction hides implementation details behind clean interfaces; Inheritance allows child classes to reuse code from parent classes; and Polymorphism enables different classes to be treated through a common interface.",
        "question": "Without looking: what are the four core pillars of Object-Oriented Programming?",
        "answer": "The four pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism."
    },
    {
        "id": "rest-apis",
        "subject": "Coding",
        "title": "REST APIs and Client-Server Communication",
        "text": "A REST API is an architectural interface that enables client applications (like web browsers or mobile apps) to communicate with backend servers over HTTP. Clients interact with server resources using standard HTTP request methods: GET retrieves data, POST creates new resources, PUT or PATCH updates existing data, and DELETE removes resources. Server responses typically return structured JSON payloads accompanied by standard HTTP status codes, such as 200 for OK, 404 for Not Found, and 500 for server errors. Because REST is stateless, each request must include all necessary authentication and context.",
        "question": "Without looking: what are the standard HTTP methods used in REST APIs, and what format is commonly returned?",
        "answer": "HTTP methods include GET, POST, PUT/PATCH, and DELETE; server responses are typically structured as JSON payloads."
    },

    # --- GENERAL KNOWLEDGE LESSONS ---
    {
        "id": "solar-system",
        "subject": "GK",
        "title": "Our Solar System",
        "text": "Our solar system formed roughly 4.6 billion years ago from the gravitational collapse of a dense interstellar gas cloud. At its center lies the Sun, a yellow dwarf star containing over 99 percent of the solar system's entire mass. Eight major planets orbit the Sun, split into four inner terrestrial rocky planets—Mercury, Venus, Earth, and Mars—and four outer giant planets. Jupiter and Saturn are gas giants primarily composed of hydrogen and helium, while Uranus and Neptune are ice giants containing heavier volatiles like water, ammonia, and methane.",
        "question": "Without looking: how many major planets orbit the Sun, and into what two groups are they divided?",
        "answer": "Eight planets; divided into four inner rocky terrestrial planets and four outer gas and ice giant planets."
    },
    {
        "id": "industrial-revolution",
        "subject": "GK",
        "title": "The Industrial Revolution",
        "text": "The Industrial Revolution was the transition to new manufacturing processes that began in Great Britain during the mid-18th century. It transformed agrarian, handicraft economies into mechanized industrial systems driven by steam engines, coal, and iron. Innovations such as James Watt's improved steam engine and mechanized textile spinning radically increased production output. Populations migrated from rural villages into expanding industrial cities, giving rise to modern urbanization, organized factory labor, and rail transport networks. This economic transformation fundamentally altered global trade, social structures, and technology.",
        "question": "Without looking: where and when did the Industrial Revolution begin, and what power source fueled it?",
        "answer": "It began in Great Britain in the mid-18th century, fueled by steam power and coal."
    },
    {
        "id": "plate-tectonics",
        "subject": "GK",
        "title": "Earth's Shifting Plates",
        "text": "Earth's outer shell is broken into approximately a dozen major rigid sections called tectonic plates that float on the hotter, semi-fluid asthenosphere below. Thermal convection currents within Earth's mantle drive the slow, continuous movement of these plates at rates of a few centimeters per year. At divergent boundaries, plates pull apart, creating new oceanic crust; at convergent boundaries, one plate slides beneath another, creating mountain ranges and deep ocean trenches. Transform faults, where plates slide horizontally past one another, generate frequent earthquakes like those along California's San Andreas Fault.",
        "question": "Without looking: what drives the movement of tectonic plates, and what occurs at convergent boundaries?",
        "answer": "Mantle convection currents drive plate movement; at convergent boundaries, plates collide, creating mountains and trenches."
    }
]
