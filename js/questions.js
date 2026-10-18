/**
 * BrainForge V2 - Complete Question Bank and Listening Lessons
 * ES Module exporting comprehensive learning curriculum across 5 subjects.
 * Total Questions: 261
 * Total Listening Lessons: 18
 */

export const SUBJECTS = {
  math: { name: "Math", icon: "∑", desc: "Mental arithmetic, fractions, percentages and algebra." },
  science: { name: "Science", icon: "⚗", desc: "Biology, chemistry, physics, Earth and space science." },
  gk: { name: "GK", icon: "🌍", desc: "Geography, history, economics and general knowledge." },
  cs: { name: "Computer Science", icon: "⌘", desc: "Binary, hardware, networks, algorithms and databases." },
  coding: { name: "Coding", icon: "</>", desc: "Python and JavaScript logic, syntax and debugging." }
};

export const QUESTIONS = [
  {
    "id": "s-photo-in",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Photosynthesis",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What 3 things go into photosynthesis?",
    "answers": [
      "sunlight carbon dioxide water",
      "light carbon dioxide water",
      "sunlight co2 water",
      "light co2 water"
    ],
    "explain": "Plants use light energy, carbon dioxide (CO₂) and water.",
    "hints": [
      "Light, a gas you exhale, and a liquid you drink."
    ],
    "tags": [
      "photosynthesis",
      "plants",
      "energy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-photo-out",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Photosynthesis",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What 2 main products come out of photosynthesis?",
    "answers": [
      "glucose oxygen",
      "glucose o2",
      "oxygen glucose",
      "o2 glucose"
    ],
    "explain": "Photosynthesis produces glucose (sugar) and oxygen.",
    "hints": [
      "A simple sugar and a breathable gas."
    ],
    "tags": [
      "photosynthesis",
      "plants",
      "glucose",
      "oxygen"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-chloroplast",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Where does photosynthesis happen inside a plant cell?",
    "answers": [
      "chloroplast",
      "chloroplasts"
    ],
    "explain": "Photosynthesis occurs in chloroplasts.",
    "hints": [
      "Organelle containing chlorophyll."
    ],
    "tags": [
      "cells",
      "chloroplast",
      "photosynthesis"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-chlorophyll",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What green pigment absorbs light for photosynthesis?",
    "answers": [
      "chlorophyll"
    ],
    "explain": "Chlorophyll absorbs light energy inside chloroplasts.",
    "hints": [
      "Starts with 'chloro-'."
    ],
    "tags": [
      "pigments",
      "chlorophyll",
      "photosynthesis"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-mito",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which organelle releases usable energy from food?",
    "answers": [
      "mitochondria",
      "mitochondrion"
    ],
    "explain": "Mitochondria make ATP through cellular respiration.",
    "hints": [
      "Often described as the powerhouse of the cell."
    ],
    "tags": [
      "cells",
      "mitochondria",
      "cellular-respiration",
      "atp"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-force",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Mechanics",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the SI unit of force?",
    "answers": [
      "newton",
      "newtons",
      "n"
    ],
    "explain": "Force is measured in newtons (N).",
    "hints": [
      "Named after Sir Isaac."
    ],
    "tags": [
      "physics",
      "si-units",
      "force"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-atom",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Atoms",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What particle has a negative electric charge?",
    "answers": [
      "electron",
      "electrons"
    ],
    "explain": "Electrons are negatively charged.",
    "hints": [
      "Orbits the atomic nucleus."
    ],
    "tags": [
      "chemistry",
      "atomic-structure",
      "electrons"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "gk-france",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the capital of France?",
    "answers": [
      "paris"
    ],
    "explain": "Paris is the capital and largest city of France.",
    "hints": [
      "City of Light on the Seine river."
    ],
    "tags": [
      "geography",
      "capitals",
      "france",
      "europe"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "gk-ocean",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Oceans",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the largest ocean on Earth?",
    "answers": [
      "pacific",
      "pacific ocean",
      "the pacific ocean"
    ],
    "explain": "The Pacific Ocean is Earth's largest ocean.",
    "hints": [
      "Covers more area than all land combined."
    ],
    "tags": [
      "geography",
      "oceans",
      "earth"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "gk-cont",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Continents",
    "difficulty": 1,
    "type": "short-answer",
    "q": "How many continents are commonly taught in the 7-continent model?",
    "answers": [
      "7",
      "seven"
    ],
    "explain": "The common model lists seven continents.",
    "hints": [
      "Between 6 and 8."
    ],
    "tags": [
      "geography",
      "continents"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "gk-moon",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Space History",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In what year did humans first land on the Moon?",
    "answers": [
      "1969"
    ],
    "explain": "Apollo 11 landed on the Moon in 1969.",
    "hints": [
      "Late 1960s."
    ],
    "tags": [
      "history",
      "space",
      "apollo-11"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "gk-currency",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Economics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is inflation?",
    "answers": [
      "general rise in prices",
      "rise in prices",
      "increase in prices",
      "prices rising over time"
    ],
    "explain": "Inflation is a broad rise in the general price level over time.",
    "hints": [
      "When the purchasing power of money falls."
    ],
    "tags": [
      "economics",
      "inflation",
      "money"
    ],
    "fuzzy": true,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-ram",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Hardware",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What computer component stores data temporarily while programs are running?",
    "answers": [
      "ram",
      "memory",
      "random access memory"
    ],
    "explain": "RAM is fast temporary working memory used by running programs.",
    "hints": [
      "Three letters: Random Access Memory."
    ],
    "tags": [
      "hardware",
      "memory",
      "ram"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-cpu",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Hardware",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What does CPU stand for?",
    "answers": [
      "central processing unit"
    ],
    "explain": "CPU means Central Processing Unit.",
    "hints": [
      "Central ... Unit."
    ],
    "tags": [
      "hardware",
      "cpu",
      "processors"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-bit",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Binary",
    "difficulty": 1,
    "type": "short-answer",
    "q": "How many possible values can one bit represent?",
    "answers": [
      "2",
      "two"
    ],
    "explain": "A bit can be 0 or 1, so it has two possible values.",
    "hints": [
      "Binary means base-2."
    ],
    "tags": [
      "binary",
      "data",
      "bits"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-byte",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Binary",
    "difficulty": 1,
    "type": "short-answer",
    "q": "How many bits are in one byte?",
    "answers": [
      "8",
      "eight"
    ],
    "explain": "One byte contains 8 bits.",
    "hints": [
      "2 to the third power."
    ],
    "tags": [
      "binary",
      "bytes",
      "storage"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-http",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Protocols",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What protocol is commonly used to transfer web pages?",
    "answers": [
      "http",
      "https",
      "hypertext transfer protocol"
    ],
    "explain": "HTTP transfers web resources; HTTPS is HTTP protected by TLS.",
    "hints": [
      "Standard protocol in web browser URLs."
    ],
    "tags": [
      "networking",
      "http",
      "web"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "cs-db",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "SQL",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What language is commonly used to query relational databases?",
    "answers": [
      "sql"
    ],
    "explain": "SQL is used to query and modify relational database data.",
    "hints": [
      "Structured Query Language."
    ],
    "tags": [
      "databases",
      "sql",
      "relational"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "c-loop",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Control Flow",
    "difficulty": 1,
    "type": "short-answer",
    "code": "for item in [1, 2, 3]:\n    print(item)",
    "q": "Which Python keyword starts a loop over items in a sequence?",
    "answers": [
      "for",
      "for loop"
    ],
    "explain": "A Python for loop iterates over items in an iterable.",
    "hints": [
      "for item in sequence:"
    ],
    "tags": [
      "python",
      "loops",
      "syntax"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "c-fn",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Functions",
    "difficulty": 1,
    "type": "short-answer",
    "code": "def greet(name):\n    return f'Hello, {name}!'",
    "q": "Which Python keyword defines a function?",
    "answers": [
      "def"
    ],
    "explain": "Python functions are defined with the def keyword.",
    "hints": [
      "Short for define."
    ],
    "tags": [
      "python",
      "functions",
      "syntax"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "c-list",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Data Structures",
    "difficulty": 1,
    "type": "short-answer",
    "code": "items = [1, 2, 3]",
    "q": "Which brackets create a Python list?",
    "answers": [
      "[]",
      "square brackets",
      "square bracket"
    ],
    "explain": "Python list literals use square brackets: [1, 2, 3].",
    "hints": [
      "The box-like square brackets."
    ],
    "tags": [
      "python",
      "lists",
      "syntax"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "c-js",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Variables",
    "difficulty": 1,
    "type": "short-answer",
    "code": "let count = 1;\ncount = 2;",
    "q": "Which keyword declares a block-scoped variable that can be reassigned in JavaScript?",
    "answers": [
      "let"
    ],
    "explain": "let creates a block-scoped binding that can be reassigned.",
    "hints": [
      "Introduced in ES6 alongside const."
    ],
    "tags": [
      "javascript",
      "variables",
      "scope"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "c-bool",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Types",
    "difficulty": 1,
    "type": "short-answer",
    "code": "const isAvailable = true;\nconst isLocked = false;",
    "q": "What data type has only true and false values?",
    "answers": [
      "boolean",
      "bool"
    ],
    "explain": "A Boolean value is either true or false.",
    "hints": [
      "Named after logician George Boole."
    ],
    "tags": [
      "data-types",
      "boolean",
      "logic"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {
      "source": "BrainForge V1"
    }
  },
  {
    "id": "s-phys-newton1",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Mechanics",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What property of matter causes an object to resist changes to its state of motion?",
    "answers": [
      "inertia"
    ],
    "explain": "Inertia is the resistance of any physical object to any change in its velocity, embodied in Newton's first law.",
    "hints": [
      "Newton's first law is also known as the law of..."
    ],
    "tags": [
      "physics",
      "mechanics",
      "newton"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-newton2",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Mechanics",
    "difficulty": 2,
    "type": "mcq",
    "q": "Which fundamental equation expresses Newton's Second Law of Motion?",
    "choices": [
      "F = m / a",
      "F = m * a",
      "E = mc²",
      "W = F * d"
    ],
    "correctIndex": 1,
    "answers": [
      "F = m * a"
    ],
    "explain": "Newton's second law states that the net force applied to a body is equal to the product of its mass and acceleration (F = ma).",
    "hints": [
      "Force equals mass times acceleration."
    ],
    "tags": [
      "physics",
      "mechanics",
      "equations"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-newton3",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Mechanics",
    "difficulty": 1,
    "type": "short-answer",
    "q": "According to Newton's Third Law, for every action there is an equal and opposite...",
    "answers": [
      "reaction",
      "opposite reaction"
    ],
    "explain": "Newton's third law states that when one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction.",
    "hints": [
      "Begins with 're-'."
    ],
    "tags": [
      "physics",
      "mechanics",
      "newton"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-gravity",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Mechanics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the standard acceleration due to gravity near Earth's surface (in m/s², to one decimal place)?",
    "answers": [
      "9.8",
      "9.8 m/s^2",
      "9.8 m/s²",
      "9.81"
    ],
    "explain": "Standard Earth gravitational acceleration (g) at sea level is approximately 9.8 m/s².",
    "hints": [
      "A number between 9 and 10."
    ],
    "tags": [
      "physics",
      "gravity",
      "constants"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-ke",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Energy",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the formula for the kinetic energy of an object with mass m and velocity v?",
    "choices": [
      "KE = m * v",
      "KE = 0.5 * m * v²",
      "KE = m * g * h",
      "KE = 0.5 * m² * v"
    ],
    "correctIndex": 1,
    "answers": [
      "KE = 0.5 * m * v²"
    ],
    "explain": "Kinetic energy is calculated as half the mass multiplied by the square of velocity: KE = 1/2 m v².",
    "hints": [
      "Half mass times velocity squared."
    ],
    "tags": [
      "physics",
      "energy",
      "mechanics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-pe",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Energy",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What form of stored mechanical energy depends upon an object's position or height above ground?",
    "answers": [
      "potential energy",
      "gravitational potential energy",
      "pe"
    ],
    "explain": "Gravitational potential energy (PE = mgh) is the energy stored in an object as a result of its vertical elevation in a gravitational field.",
    "hints": [
      "Contrasts with kinetic energy."
    ],
    "tags": [
      "physics",
      "energy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-conservation",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Thermodynamics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What fundamental law states that energy cannot be created or destroyed, only transformed from one form to another?",
    "answers": [
      "conservation of energy",
      "law of conservation of energy"
    ],
    "explain": "The law of conservation of energy (first law of thermodynamics for closed systems) states that the total energy of an isolated system remains constant.",
    "hints": [
      "Conservation of..."
    ],
    "tags": [
      "physics",
      "energy",
      "thermodynamics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-lightspeed",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Waves",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the speed of light in a vacuum (rounded to the nearest 100,000 km/s)?",
    "choices": [
      "300,000 km/s",
      "150,000 km/s",
      "1,000,000 km/s",
      "30,000 km/s"
    ],
    "correctIndex": 0,
    "answers": [
      "300,000 km/s"
    ],
    "explain": "The speed of light in vacuum is approximately 299,792 km/s, commonly rounded to 300,000 km/s (or 3 × 10⁸ m/s).",
    "hints": [
      "Approximately three hundred thousand kilometers per second."
    ],
    "tags": [
      "physics",
      "waves",
      "light",
      "constants"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-sound",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Waves",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Can sound waves propagate through a vacuum?",
    "answers": [
      "no",
      "false"
    ],
    "explain": "Sound is a mechanical pressure wave that requires a material medium (gas, liquid, or solid) to vibrate and travel.",
    "hints": [
      "Space is a vacuum."
    ],
    "tags": [
      "physics",
      "waves",
      "sound"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-ohm",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Electricity",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What physical law states that voltage across a conductor is proportional to current, expressed as V = IR?",
    "answers": [
      "ohm's law",
      "ohms law"
    ],
    "explain": "Ohm's law relates voltage (V), current (I), and resistance (R): V = I * R.",
    "hints": [
      "Named after Georg Ohm."
    ],
    "tags": [
      "physics",
      "electricity",
      "circuits"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-current",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Electricity",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the SI base unit of electric current?",
    "answers": [
      "ampere",
      "amp",
      "amperes",
      "amps",
      "a"
    ],
    "explain": "Electric current is measured in amperes (A), representing a flow of one coulomb of charge per second.",
    "hints": [
      "Often shortened to amp."
    ],
    "tags": [
      "physics",
      "electricity",
      "si-units"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-voltage",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Electricity",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the SI unit of electric potential difference?",
    "answers": [
      "volt",
      "volts",
      "v"
    ],
    "explain": "Electric potential difference and electromotive force are measured in volts (V).",
    "hints": [
      "Named after Alessandro Volta."
    ],
    "tags": [
      "physics",
      "electricity",
      "si-units"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-power",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Electricity",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the SI unit of power, defined as one joule per second?",
    "answers": [
      "watt",
      "watts",
      "w"
    ],
    "explain": "Power is the rate at which energy is used or transferred, measured in watts (W).",
    "hints": [
      "Light bulb power ratings use this unit."
    ],
    "tags": [
      "physics",
      "energy",
      "si-units"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-refraction",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Optics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the term for the bending of light as it passes from one transparent medium into another?",
    "answers": [
      "refraction"
    ],
    "explain": "Refraction occurs because light changes speed when crossing the interface between substances with different refractive indices.",
    "hints": [
      "Distinct from reflection."
    ],
    "tags": [
      "physics",
      "optics",
      "light"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-lens",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Optics",
    "difficulty": 2,
    "type": "mcq",
    "q": "What kind of optical lens is thicker in the middle and causes parallel light rays to converge?",
    "choices": [
      "Convex lens",
      "Concave lens",
      "Plano-concave lens",
      "Diverging lens"
    ],
    "correctIndex": 0,
    "answers": [
      "Convex lens"
    ],
    "explain": "Convex lenses curve outward and converge light rays toward a real focal point.",
    "hints": [
      "Found in magnifying glasses."
    ],
    "tags": [
      "physics",
      "optics",
      "lenses"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-thermo1",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Thermodynamics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which temperature scale has its zero point defined at the point where all molecular motion ceases?",
    "answers": [
      "kelvin",
      "kelvin scale"
    ],
    "explain": "The Kelvin scale starts at absolute zero (0 K), where thermal motion reaches its quantum mechanical minimum.",
    "hints": [
      "SI unit of thermodynamic temperature."
    ],
    "tags": [
      "physics",
      "thermodynamics",
      "temperature"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-abszero",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Thermodynamics",
    "difficulty": 3,
    "type": "mcq",
    "q": "What temperature corresponds to absolute zero on the Celsius scale?",
    "choices": [
      "-273.15 °C",
      "-100.0 °C",
      "-459.67 °C",
      "0.0 °C"
    ],
    "correctIndex": 0,
    "answers": [
      "-273.15 °C"
    ],
    "explain": "Absolute zero is exactly 0 K, which equals -273.15 °C (-459.67 °F).",
    "hints": [
      "Minus two hundred seventy-three."
    ],
    "tags": [
      "physics",
      "thermodynamics",
      "temperature"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-phys-doppler",
    "subject": "science",
    "topic": "Physics",
    "subtopic": "Waves",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What physical effect describes the change in observed frequency when a sound or light source moves relative to an observer?",
    "answers": [
      "doppler effect",
      "doppler shift",
      "doppler"
    ],
    "explain": "The Doppler effect causes perceived wave frequencies to be higher as source approaches and lower as it recedes.",
    "hints": [
      "Explains why passing emergency vehicle sirens change pitch."
    ],
    "tags": [
      "physics",
      "waves",
      "sound"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-proton",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Atoms",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What subatomic particle carries a positive electric charge?",
    "answers": [
      "proton",
      "protons"
    ],
    "explain": "Protons have a positive electric charge (+1e) and reside in the nucleus of an atom.",
    "hints": [
      "P for positive."
    ],
    "tags": [
      "chemistry",
      "atoms",
      "subatomic"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-neutron",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Atoms",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which subatomic particle located in the nucleus carries zero net electrical charge?",
    "answers": [
      "neutron",
      "neutrons"
    ],
    "explain": "Neutrons have neutral charge (0) and stabilize atomic nuclei alongside protons.",
    "hints": [
      "Neutral particle."
    ],
    "tags": [
      "chemistry",
      "atoms",
      "subatomic"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-atomicnum",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Periodic Table",
    "difficulty": 2,
    "type": "short-answer",
    "q": "An atom's atomic number is defined by the number of which subatomic particle in its nucleus?",
    "answers": [
      "protons",
      "proton",
      "number of protons"
    ],
    "explain": "The atomic number (Z) of a chemical element is the number of protons found in the nucleus of every atom of that element.",
    "hints": [
      "Positively charged particles."
    ],
    "tags": [
      "chemistry",
      "elements",
      "periodic-table"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-water",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Molecules",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the chemical formula for water?",
    "answers": [
      "h2o",
      "h₂o"
    ],
    "explain": "A molecule of water consists of two hydrogen atoms covalently bonded to one oxygen atom (H₂O).",
    "hints": [
      "Two hydrogens, one oxygen."
    ],
    "tags": [
      "chemistry",
      "molecules",
      "water"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-ph-neutral",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "pH & Solutions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What number represents a neutral pH on the standard pH scale at 25 °C?",
    "answers": [
      "7",
      "seven"
    ],
    "explain": "On the standard logarithmic pH scale (0 to 14), a pH of 7 represents equal concentrations of H⁺ and OH⁻ ions.",
    "hints": [
      "Pure water has this pH."
    ],
    "tags": [
      "chemistry",
      "ph",
      "acids-bases"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-acid-base",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "pH & Solutions",
    "difficulty": 2,
    "type": "mcq",
    "q": "An aqueous solution with a pH of 2.5 is classified as:",
    "choices": [
      "Acidic",
      "Basic",
      "Neutral",
      "Inert"
    ],
    "correctIndex": 0,
    "answers": [
      "Acidic"
    ],
    "explain": "Any solution with a pH less than 7 is acidic; solutions with a pH greater than 7 are basic (alkaline).",
    "hints": [
      "Values below 7 indicate higher H⁺ concentration."
    ],
    "tags": [
      "chemistry",
      "ph",
      "acids-bases"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-covalent",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Bonding",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What type of chemical bond is formed when atoms share electron pairs?",
    "answers": [
      "covalent",
      "covalent bond",
      "covalent bonding"
    ],
    "explain": "Covalent bonds form when atoms share valence electrons to achieve stable electronic configurations.",
    "hints": [
      "Prefix 'co-' indicates sharing."
    ],
    "tags": [
      "chemistry",
      "bonding"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-ionic",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Bonding",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What type of chemical bond forms between oppositely charged ions through electron transfer?",
    "answers": [
      "ionic",
      "ionic bond",
      "ionic bonding"
    ],
    "explain": "Ionic bonding involves the electrostatic attraction between oppositely charged ions formed by electron transfer, as in NaCl.",
    "hints": [
      "Forms between metals and nonmetals."
    ],
    "tags": [
      "chemistry",
      "bonding"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-groups",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Periodic Table",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What are the vertical columns in the periodic table called?",
    "answers": [
      "groups",
      "group",
      "families"
    ],
    "explain": "Vertical columns in the periodic table are called groups (or chemical families) and share similar valence electron configurations.",
    "hints": [
      "Rows are periods; columns are..."
    ],
    "tags": [
      "chemistry",
      "periodic-table"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-noble",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Periodic Table",
    "difficulty": 2,
    "type": "mcq",
    "q": "Which group of chemical elements (Group 18) is known for extreme chemical inertness due to full outer electron shells?",
    "choices": [
      "Noble gases",
      "Halogens",
      "Alkali metals",
      "Alkaline earth metals"
    ],
    "correctIndex": 0,
    "answers": [
      "Noble gases"
    ],
    "explain": "Noble gases (helium, neon, argon, krypton, xenon, radon) have completely filled valence shells, making them exceptionally stable.",
    "hints": [
      "Includes helium and neon."
    ],
    "tags": [
      "chemistry",
      "periodic-table",
      "noble-gases"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-chem-endothermic",
    "subject": "science",
    "topic": "Chemistry",
    "subtopic": "Chemical Reactions",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What term describes a chemical reaction that absorbs heat energy from its surrounding environment?",
    "answers": [
      "endothermic",
      "endothermic reaction"
    ],
    "explain": "An endothermic reaction absorbs thermal energy (positive enthalpy change, ΔH > 0), causing the surroundings to cool.",
    "hints": [
      "Opposite of exothermic."
    ],
    "tags": [
      "chemistry",
      "reactions",
      "thermodynamics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-dna",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Genetics",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What primary nucleic acid stores the hereditary genetic instructions in living cells?",
    "answers": [
      "dna",
      "deoxyribonucleic acid"
    ],
    "explain": "DNA (deoxyribonucleic acid) carries genetic instructions used in the growth, development, functioning, and reproduction of organisms.",
    "hints": [
      "Formed in a double helix structure."
    ],
    "tags": [
      "biology",
      "genetics",
      "dna"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-bases",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Genetics",
    "difficulty": 2,
    "type": "mcq",
    "q": "In a double-stranded DNA molecule, which nitrogenous base forms base pairs with Adenine (A)?",
    "choices": [
      "Thymine",
      "Cytosine",
      "Guanine",
      "Uracil"
    ],
    "correctIndex": 0,
    "answers": [
      "Thymine"
    ],
    "explain": "In DNA, adenine pairs specifically with thymine (A-T) via two hydrogen bonds.",
    "hints": [
      "Letter T."
    ],
    "tags": [
      "biology",
      "genetics",
      "dna"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-ribosome",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which cellular organelle is responsible for synthesizing proteins by translating mRNA?",
    "answers": [
      "ribosome",
      "ribosomes"
    ],
    "explain": "Ribosomes read messenger RNA codons and link amino acids together in the correct sequence to build polypeptide chains.",
    "hints": [
      "Can be found floating free or bound to the rough endoplasmic reticulum."
    ],
    "tags": [
      "biology",
      "cells",
      "organelles"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-osmosis",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What term describes the passive diffusion of water across a semipermeable membrane?",
    "answers": [
      "osmosis"
    ],
    "explain": "Osmosis is the net diffusion of water molecules through a selectively permeable membrane toward a region of higher solute concentration.",
    "hints": [
      "Water-specific diffusion."
    ],
    "tags": [
      "biology",
      "cells",
      "osmosis"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-rbc",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Human Body",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What iron-containing protein in human red blood cells binds and carries oxygen to tissues?",
    "answers": [
      "hemoglobin",
      "haemoglobin"
    ],
    "explain": "Hemoglobin is an iron-containing oxygen-transport metalloprotein in red blood cells.",
    "hints": [
      "Gives blood its red hue."
    ],
    "tags": [
      "biology",
      "human-body",
      "blood"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-evolution",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Evolution",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What primary mechanism of evolution did Charles Darwin propose in 'On the Origin of Species'?",
    "answers": [
      "natural selection"
    ],
    "explain": "Natural selection is the differential survival and reproduction of individuals due to inherited phenotypic differences.",
    "hints": [
      "Often summarized as 'survival of the fittest'."
    ],
    "tags": [
      "biology",
      "evolution",
      "darwin"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-homeostasis",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Human Body",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What biological term describes an organism's ability to maintain stable internal conditions despite external fluctuations?",
    "answers": [
      "homeostasis"
    ],
    "explain": "Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems (e.g. thermoregulation).",
    "hints": [
      "From Greek words for 'same' and 'standing'."
    ],
    "tags": [
      "biology",
      "physiology",
      "homeostasis"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-heart",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Human Body",
    "difficulty": 1,
    "type": "mcq",
    "q": "How many chambers are there in a healthy human heart?",
    "choices": [
      "2",
      "3",
      "4",
      "6"
    ],
    "correctIndex": 2,
    "answers": [
      "4"
    ],
    "explain": "The human heart has 4 muscular chambers: two upper atria (receiving blood) and two lower ventricles (pumping blood out).",
    "hints": [
      "Two atria and two ventricles."
    ],
    "tags": [
      "biology",
      "human-body",
      "anatomy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-enzyme",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Biochemistry",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What biological catalysts accelerate chemical reactions in living cells without being consumed?",
    "answers": [
      "enzymes",
      "enzyme"
    ],
    "explain": "Enzymes are protein catalysts that drastically accelerate metabolic reactions by lowering activation energy barriers.",
    "hints": [
      "Examples include amylase, pepsin, and DNA polymerase."
    ],
    "tags": [
      "biology",
      "biochemistry",
      "enzymes"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-bio-cellwall",
    "subject": "science",
    "topic": "Biology",
    "subtopic": "Cells",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What rigid outer structure composed mainly of cellulose encloses plant cells but is missing in animal cells?",
    "answers": [
      "cell wall"
    ],
    "explain": "The plant cell wall provides structural rigidity, tensile strength, and protection against osmotic lysis.",
    "hints": [
      "Surrounds the cell membrane."
    ],
    "tags": [
      "biology",
      "cells",
      "plants"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-crust",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Geology",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the outermost solid rock layer of planet Earth called?",
    "answers": [
      "crust",
      "earth's crust"
    ],
    "explain": "Earth's crust is the thinnest, uppermost layer of our planet, resting atop the mantle.",
    "hints": [
      "Lies above the mantle."
    ],
    "tags": [
      "earth-science",
      "geology"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-tectonics",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Plate Tectonics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What scientific theory explains the large-scale motion of plates composing Earth's lithosphere?",
    "answers": [
      "plate tectonics"
    ],
    "explain": "Plate tectonics describes how Earth's outer shell is divided into several gliding plates over the asthenosphere.",
    "hints": [
      "Tectonic plates."
    ],
    "tags": [
      "earth-science",
      "geology",
      "plate-tectonics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-rockcycle",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Rock Cycle",
    "difficulty": 2,
    "type": "mcq",
    "q": "Rocks formed through the cooling and solidification of molten rock (magma or lava) are called:",
    "choices": [
      "Sedimentary",
      "Metamorphic",
      "Igneous",
      "Organic"
    ],
    "correctIndex": 2,
    "answers": [
      "Igneous"
    ],
    "explain": "Igneous rocks (such as granite, basalt, and obsidian) form directly from cooled molten rock.",
    "hints": [
      "From the Latin root for fire ('ignis')."
    ],
    "tags": [
      "earth-science",
      "geology",
      "rocks"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-watercycle",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Water Cycle",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In the hydrological cycle, what process transforms liquid surface water into airborne water vapor?",
    "answers": [
      "evaporation"
    ],
    "explain": "Evaporation is the phase transition by which liquid water enters the atmosphere as gas due to heat energy.",
    "hints": [
      "Sun heats ocean water causing it to rise."
    ],
    "tags": [
      "earth-science",
      "water-cycle"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-atmosphere",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Atmosphere",
    "difficulty": 2,
    "type": "mcq",
    "q": "Which gas makes up approximately 78% of Earth's atmosphere by volume?",
    "choices": [
      "Oxygen",
      "Nitrogen",
      "Carbon Dioxide",
      "Argon"
    ],
    "correctIndex": 1,
    "answers": [
      "Nitrogen"
    ],
    "explain": "Nitrogen (N₂) comprises ~78% of dry atmosphere, while oxygen makes up ~21%, argon ~0.9%, and CO₂ ~0.04%.",
    "hints": [
      "Diatomic N₂ gas."
    ],
    "tags": [
      "earth-science",
      "atmosphere"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-ozone",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Atmosphere",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What atmospheric layer composed of trioxygen molecules absorbs most of the Sun's ultraviolet radiation?",
    "answers": [
      "ozone layer",
      "ozone"
    ],
    "explain": "The ozone layer located in the stratosphere absorbs 97-99% of medium-frequency ultraviolet light from the Sun.",
    "hints": [
      "Composed of O₃ molecules."
    ],
    "tags": [
      "earth-science",
      "atmosphere",
      "ozone"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-earth-weather",
    "subject": "science",
    "topic": "Earth Science",
    "subtopic": "Weather",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In which lowest layer of Earth's atmosphere does nearly all everyday weather occur?",
    "answers": [
      "troposphere"
    ],
    "explain": "The troposphere contains ~75% of the atmosphere's mass and almost all water vapor and weather activity.",
    "hints": [
      "Extends from ground level up to about 12 km."
    ],
    "tags": [
      "earth-science",
      "weather",
      "atmosphere"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-sun",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Solar System",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What type of celestial object is the Sun located at the center of our solar system?",
    "answers": [
      "star",
      "yellow dwarf",
      "yellow dwarf star"
    ],
    "explain": "The Sun is a G-type main-sequence star (yellow dwarf) that generates energy via nuclear fusion of hydrogen into helium.",
    "hints": [
      "A massive luminous ball of plasma."
    ],
    "tags": [
      "astronomy",
      "sun",
      "stars"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-mars",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Solar System",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which fourth planet from the Sun is known as the 'Red Planet'?",
    "answers": [
      "mars"
    ],
    "explain": "Mars appears reddish because abundant iron(III) oxide (rust) coats its rocky surface.",
    "hints": [
      "Named after the Roman god of war."
    ],
    "tags": [
      "astronomy",
      "planets",
      "mars"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-jupiter",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Solar System",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the largest planet in our solar system?",
    "answers": [
      "jupiter"
    ],
    "explain": "Jupiter is a gas giant planet with a mass more than two and a half times that of all the other planets combined.",
    "hints": [
      "Famous for its massive Great Red Spot storm."
    ],
    "tags": [
      "astronomy",
      "planets",
      "jupiter"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-galaxy",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Galaxies",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the name of the spiral galaxy that contains our Solar System?",
    "answers": [
      "milky way",
      "milky way galaxy",
      "the milky way"
    ],
    "explain": "Our Solar System resides in the Orion Arm of the Milky Way, a barred spiral galaxy spanning ~100,000 light-years.",
    "hints": [
      "Named after its milky appearance across the night sky."
    ],
    "tags": [
      "astronomy",
      "galaxies",
      "milky-way"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-lightyear",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Deep Space",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What astronomical unit of length is defined as the distance light travels through vacuum in one Julian year?",
    "answers": [
      "light-year",
      "light year",
      "lightyear"
    ],
    "explain": "A light-year is a unit of astronomical distance equal to roughly 9.46 trillion kilometers (5.88 trillion miles).",
    "hints": [
      "Measures distance, not time, despite having 'year' in its name."
    ],
    "tags": [
      "astronomy",
      "units",
      "deep-space"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-blackhole",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Deep Space",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What astronomical object has gravitational pull so intense that not even electromagnetic radiation can escape its event horizon?",
    "answers": [
      "black hole",
      "a black hole"
    ],
    "explain": "A black hole is formed when massive matter collapses into an infinitesimal singularity surrounded by an event horizon.",
    "hints": [
      "Formed by collapsing massive stars."
    ],
    "tags": [
      "astronomy",
      "black-holes",
      "gravity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "s-astro-lunar-eclipse",
    "subject": "science",
    "topic": "Astronomy",
    "subtopic": "Solar System",
    "difficulty": 2,
    "type": "mcq",
    "q": "During a total lunar eclipse, what celestial configuration occurs?",
    "choices": [
      "Earth passes directly between the Sun and the Moon",
      "The Moon passes directly between the Sun and the Earth",
      "The Sun passes directly between the Earth and the Moon",
      "Venus blocks the Moon from Earth's view"
    ],
    "correctIndex": 0,
    "answers": [
      "Earth passes directly between the Sun and the Moon"
    ],
    "explain": "A lunar eclipse occurs when Earth blocks sunlight from reaching the Moon, casting Earth's shadow across the lunar surface.",
    "hints": [
      "Earth casts its shadow on the Moon."
    ],
    "tags": [
      "astronomy",
      "eclipses",
      "moon"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-japan",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the capital city of Japan?",
    "answers": [
      "tokyo"
    ],
    "explain": "Tokyo is the capital and most populous metropolitan area in Japan.",
    "hints": [
      "Host of the 1964 and 2020 Summer Olympics."
    ],
    "tags": [
      "geography",
      "capitals",
      "asia",
      "japan"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-nile",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Rivers",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What major river in northeastern Africa is traditionally considered the longest in the world?",
    "answers": [
      "nile",
      "nile river",
      "the nile"
    ],
    "explain": "The Nile River flows northward through northeastern Africa for approximately 6,650 km into the Mediterranean Sea.",
    "hints": [
      "Cradle of ancient Egyptian civilization."
    ],
    "tags": [
      "geography",
      "rivers",
      "africa"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-everest",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Mountains",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is Earth's highest mountain peak above sea level?",
    "answers": [
      "mount everest",
      "everest",
      "mt everest"
    ],
    "explain": "Mount Everest in the Himalayas reaches an elevation of 8,848.86 meters (29,031.7 ft) on the China-Nepal border.",
    "hints": [
      "Located in the Himalayas."
    ],
    "tags": [
      "geography",
      "mountains",
      "himalayas"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-sahara",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Deserts",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the largest hot desert in the world?",
    "answers": [
      "sahara",
      "sahara desert",
      "the sahara"
    ],
    "explain": "The Sahara Desert in North Africa spans over 9.2 million square kilometers, making it the largest hot desert on Earth.",
    "hints": [
      "Covers much of North Africa."
    ],
    "tags": [
      "geography",
      "deserts",
      "africa"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-amazon",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Rainforests",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the largest tropical rainforest on Earth by surface area?",
    "answers": [
      "amazon",
      "amazon rainforest",
      "the amazon"
    ],
    "explain": "The Amazon rainforest covers over 5.5 million square kilometers across nine South American nations.",
    "hints": [
      "Surrounds the world's largest river by discharge volume."
    ],
    "tags": [
      "geography",
      "rainforests",
      "south-america"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-aus-cap",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the federal capital of Australia?",
    "choices": [
      "Sydney",
      "Melbourne",
      "Canberra",
      "Brisbane"
    ],
    "correctIndex": 2,
    "answers": [
      "Canberra"
    ],
    "explain": "Canberra was chosen as Australia's capital in 1908 as a compromise between Sydney and Melbourne.",
    "hints": [
      "It is neither Sydney nor Melbourne."
    ],
    "tags": [
      "geography",
      "capitals",
      "australia"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-canada-cap",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the national capital of Canada?",
    "answers": [
      "ottawa"
    ],
    "explain": "Ottawa, located in Ontario on the Quebec border, was chosen by Queen Victoria as Canada's capital in 1857.",
    "hints": [
      "Located in Ontario, near Montreal."
    ],
    "tags": [
      "geography",
      "capitals",
      "canada"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-brazil-cap",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What planned city replaced Rio de Janeiro as the capital of Brazil in 1960?",
    "answers": [
      "brasilia",
      "brasília"
    ],
    "explain": "Brasília was inaugurated in 1960 as the planned federal capital, designed by Lúcio Costa and Oscar Niemeyer.",
    "hints": [
      "Shares the first seven letters with Brazil."
    ],
    "tags": [
      "geography",
      "capitals",
      "brazil"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-germany-cap",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Capitals",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the capital city of Germany?",
    "answers": [
      "berlin"
    ],
    "explain": "Berlin is the capital and largest city of Germany, reunited following the fall of the Berlin Wall.",
    "hints": [
      "Famous for the Brandenburg Gate."
    ],
    "tags": [
      "geography",
      "capitals",
      "germany",
      "europe"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-equator",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Navigation",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What imaginary planetary line corresponds to 0 degrees latitude?",
    "answers": [
      "equator",
      "the equator"
    ],
    "explain": "The Equator is the circle of latitude around Earth that divides it into Northern and Southern Hemispheres.",
    "hints": [
      "Equidistant from both poles."
    ],
    "tags": [
      "geography",
      "cartography",
      "latitude"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-russia",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Countries",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the largest country in the world by total land area?",
    "answers": [
      "russia",
      "russian federation"
    ],
    "explain": "Russia encompasses over 17.1 million square kilometers, spanning eleven time zones across Eastern Europe and Northern Asia.",
    "hints": [
      "Spans both Europe and Asia."
    ],
    "tags": [
      "geography",
      "countries"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-vatican",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Countries",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What sovereign city-state is the smallest internationally recognized independent country in the world?",
    "answers": [
      "vatican city",
      "vatican",
      "the vatican"
    ],
    "explain": "Vatican City covers an area of just 0.49 square kilometers (121 acres) within the city of Rome, Italy.",
    "hints": [
      "Enclave located entirely within Rome."
    ],
    "tags": [
      "geography",
      "countries",
      "europe"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-panama",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Landmarks",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What artificial 82-kilometer waterway connects the Atlantic and Pacific Oceans across Central America?",
    "answers": [
      "panama canal",
      "the panama canal"
    ],
    "explain": "The Panama Canal cuts across the Isthmus of Panama, drastically shortening maritime transit between oceans.",
    "hints": [
      "Opened in 1914 across a Central American isthmus."
    ],
    "tags": [
      "geography",
      "canals",
      "central-america"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-mediterranean",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Oceans",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What major sea separates southern Europe from northern Africa?",
    "answers": [
      "mediterranean",
      "mediterranean sea",
      "the mediterranean"
    ],
    "explain": "The Mediterranean Sea connects to the Atlantic Ocean via the Strait of Gibraltar and separates Europe from Africa.",
    "hints": [
      "From Latin meaning 'middle of the earth'."
    ],
    "tags": [
      "geography",
      "seas",
      "europe",
      "africa"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-greenland",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Islands",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the world's largest non-continental island by surface area?",
    "choices": [
      "Greenland",
      "New Guinea",
      "Borneo",
      "Madagascar"
    ],
    "correctIndex": 0,
    "answers": [
      "Greenland"
    ],
    "explain": "Greenland spans over 2.16 million square kilometers, making it the largest island in the world that is not a continent.",
    "hints": [
      "Autonomous territory belonging to the Kingdom of Denmark."
    ],
    "tags": [
      "geography",
      "islands"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-geo-pop-country",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Demographics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which nation is currently the most populous country in the world?",
    "answers": [
      "india"
    ],
    "explain": "According to UN estimates, India surpassed China in 2023 to become the world's most populous nation with over 1.4 billion people.",
    "hints": [
      "Overtook China in population during 2023."
    ],
    "tags": [
      "geography",
      "demographics",
      "population"
    ],
    "fuzzy": false,
    "volatile": true,
    "code": "",
    "metadata": {
      "demographicNote": "Overtook China in 2023 according to UN Population Division"
    }
  },
  {
    "id": "gk-geo-trench",
    "subject": "gk",
    "topic": "Geography",
    "subtopic": "Oceans",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the deepest known oceanic trench on Earth?",
    "answers": [
      "mariana trench",
      "the mariana trench"
    ],
    "explain": "The Mariana Trench in the western Pacific reaches a maximum depth of approximately 11,034 meters at Challenger Deep.",
    "hints": [
      "Contains Challenger Deep."
    ],
    "tags": [
      "geography",
      "oceans",
      "pacific"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-ww2end",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Modern History",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In what calendar year did World War II end?",
    "answers": [
      "1945"
    ],
    "explain": "World War II concluded in 1945 following the unconditional surrender of Axis forces in Europe and Asia.",
    "hints": [
      "Mid-1940s."
    ],
    "tags": [
      "history",
      "ww2",
      "wars"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-ww1start",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Modern History",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In what year did World War I begin?",
    "answers": [
      "1914"
    ],
    "explain": "World War I commenced in late July 1914 triggered by the assassination of Archduke Franz Ferdinand of Austria.",
    "hints": [
      "Summer of nineteen-fourteen."
    ],
    "tags": [
      "history",
      "ww1",
      "wars"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-pyramids",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Ancient Civilizations",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which ancient civilization constructed the monumental Great Pyramids at Giza?",
    "answers": [
      "ancient egypt",
      "egypt",
      "egyptians"
    ],
    "explain": "The ancient Egyptians constructed the Giza pyramid complex during the Old Kingdom's Fourth Dynasty (~2600–2500 BCE).",
    "hints": [
      "Along the Nile river."
    ],
    "tags": [
      "history",
      "ancient-egypt",
      "archaeology"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-us-indep",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Modern History",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In what year did the Second Continental Congress adopt the United States Declaration of Independence?",
    "answers": [
      "1776"
    ],
    "explain": "The Declaration of Independence was adopted on July 4, 1776, announcing separation from Great Britain.",
    "hints": [
      "Celebrated on July 4th."
    ],
    "tags": [
      "history",
      "american-revolution",
      "usa"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-printpress",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Inventions",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which German craftsman introduced movable type printing to Europe around 1440?",
    "answers": [
      "johannes gutenberg",
      "gutenberg"
    ],
    "explain": "Johannes Gutenberg pioneered mechanical movable type printing, enabling the mass production of books across Europe.",
    "hints": [
      "Famous for his 42-line Bible printed in Mainz."
    ],
    "tags": [
      "history",
      "inventions",
      "printing-press"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-magna-carta",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Medieval History",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In what year was the Magna Carta signed by King John of England at Runnymede?",
    "answers": [
      "1215"
    ],
    "explain": "The Magna Carta (Great Charter) was agreed to in June 1215, establishing the principle that everyone, even the king, is subject to law.",
    "hints": [
      "Early 13th century (twelve-fifteen)."
    ],
    "tags": [
      "history",
      "medieval",
      "law",
      "england"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-fall-rome",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Ancient Civilizations",
    "difficulty": 2,
    "type": "mcq",
    "q": "In which calendar year did the Western Roman Empire traditionally fall with the abdication of Romulus Augustulus?",
    "choices": [
      "476 AD",
      "1066 AD",
      "1453 AD",
      "312 AD"
    ],
    "correctIndex": 0,
    "answers": [
      "476 AD"
    ],
    "explain": "In 476 AD, Germanic chieftain Odoacer deposed the last Western Roman Emperor Romulus Augustulus, marking the start of the European Middle Ages.",
    "hints": [
      "Late 5th century."
    ],
    "tags": [
      "history",
      "rome",
      "ancient"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-berlin-wall",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Cold War",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In what year did peaceful protests lead to the historic opening and fall of the Berlin Wall?",
    "answers": [
      "1989"
    ],
    "explain": "The Berlin Wall fell on November 9, 1989, symbolizing the collapse of Soviet-backed regimes across Eastern Europe.",
    "hints": [
      "One year before German reunification in 1990."
    ],
    "tags": [
      "history",
      "cold-war",
      "germany"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-silk-road",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Trade History",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What ancient network of Eurasian trade routes connected China to the Mediterranean for centuries?",
    "answers": [
      "silk road",
      "the silk road",
      "silk route"
    ],
    "explain": "The Silk Road was an expansive network of overland and maritime routes facilitating commerce and cultural exchange from the Han dynasty forward.",
    "hints": [
      "Named after a prized Chinese textile fabric."
    ],
    "tags": [
      "history",
      "trade",
      "asia"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-ren-florence",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Renaissance",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which wealthy Italian city-state is celebrated as the birthplace of the European Renaissance?",
    "answers": [
      "florence",
      "firenze"
    ],
    "explain": "Florence, dominated by the Medici family, was the epicenter of artistic, literary, and scientific rebirth in 14th-15th century Europe.",
    "hints": [
      "Home to the Uffizi Gallery and Duomo."
    ],
    "tags": [
      "history",
      "renaissance",
      "italy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-alexander",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Ancient Civilizations",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which king of Macedonia created one of the largest empires of the ancient world before dying at age 32 in 323 BCE?",
    "answers": [
      "alexander the great",
      "alexander",
      "alexander of macedon"
    ],
    "explain": "Alexander the Great tutored by Aristotle conquered the Persian Empire and established Greek cultural influence as far east as the Indus river.",
    "hints": [
      "Known as Alexander the..."
    ],
    "tags": [
      "history",
      "ancient-greece",
      "conquerors"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-steam",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Industrial Revolution",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which Scottish engineer designed the separate condenser that made the steam engine practical for the Industrial Revolution?",
    "answers": [
      "james watt",
      "watt"
    ],
    "explain": "James Watt radically improved Thomas Newcomen's engine by inventing the separate condenser in 1765.",
    "hints": [
      "The SI unit of power is named in his honor."
    ],
    "tags": [
      "history",
      "industrial-revolution",
      "inventions"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-penicillin",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Scientific Milestones",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Who discovered the antibiotic properties of penicillin in 1928?",
    "answers": [
      "alexander fleming",
      "fleming"
    ],
    "explain": "Sir Alexander Fleming noticed in 1928 that a Penicillium notatum mold contaminant had lysed staphylococcal colonies on an agar plate.",
    "hints": [
      "Scottish bacteriologist."
    ],
    "tags": [
      "history",
      "medicine",
      "science"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-un",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Modern History",
    "difficulty": 1,
    "type": "mcq",
    "q": "In what year was the United Nations established in San Francisco to replace the League of Nations?",
    "choices": [
      "1918",
      "1939",
      "1945",
      "1953"
    ],
    "correctIndex": 2,
    "answers": [
      "1945"
    ],
    "explain": "The UN Charter was signed on June 26, 1945, entering into force on October 24, 1945.",
    "hints": [
      "Founded immediately at the conclusion of WWII."
    ],
    "tags": [
      "history",
      "united-nations",
      "diplomacy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-mandela",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Modern History",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Who was the South African anti-apartheid revolutionary who became the country's first Black president in 1994?",
    "answers": [
      "nelson mandela",
      "mandela"
    ],
    "explain": "Nelson Mandela spent 27 years incarcerated on Robben Island and elsewhere before leading South Africa's peaceful transition out of apartheid.",
    "hints": [
      "Nobel Peace Prize laureate who authored 'Long Walk to Freedom'."
    ],
    "tags": [
      "history",
      "south-africa",
      "civil-rights"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-hist-black-death",
    "subject": "gk",
    "topic": "History",
    "subtopic": "Medieval History",
    "difficulty": 2,
    "type": "mcq",
    "q": "What devastating pandemic struck Afro-Eurasia between 1346 and 1353, killing up to half of Europe's population?",
    "choices": [
      "The Black Death",
      "Spanish Flu",
      "Plague of Justinian",
      "Antonine Plague"
    ],
    "correctIndex": 0,
    "answers": [
      "The Black Death"
    ],
    "explain": "The Black Death, caused by the bacterium Yersinia pestis carried by fleas on rodents, ravaged Eurasia in the mid-14th century.",
    "hints": [
      "Also known as the Great Pestilence or Bubonic Plague."
    ],
    "tags": [
      "history",
      "medieval",
      "pandemics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-mona-lisa",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Art",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which Italian Renaissance polymath painted the Mona Lisa?",
    "answers": [
      "leonardo da vinci",
      "da vinci",
      "leonardo"
    ],
    "explain": "Leonardo da Vinci painted the Mona Lisa (La Gioconda) in the early 16th century; it is displayed in the Louvre.",
    "hints": [
      "Also painted The Last Supper."
    ],
    "tags": [
      "art",
      "renaissance",
      "leonardo"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-origami",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Traditions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the traditional Japanese art form of paper folding?",
    "answers": [
      "origami"
    ],
    "explain": "Origami (from 'ori' meaning folding and 'kami' meaning paper) transforms flat paper sheets into sculpted animals and objects.",
    "hints": [
      "Folds paper without cuts or glue."
    ],
    "tags": [
      "culture",
      "japan",
      "art"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-olympics",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Traditions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In which ancient civilization did the original Olympic Games originate in 776 BCE?",
    "answers": [
      "ancient greece",
      "greece"
    ],
    "explain": "The ancient Olympic Games were held every four years at the sanctuary of Zeus in Olympia, Greece.",
    "hints": [
      "Held in Olympia in honor of Zeus."
    ],
    "tags": [
      "culture",
      "greece",
      "sports",
      "history"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-shakespeare",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Literature",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Which Elizabethan English playwright and poet wrote Hamlet, Macbeth, and Romeo and Juliet?",
    "answers": [
      "william shakespeare",
      "shakespeare"
    ],
    "explain": "William Shakespeare (1564–1616), known as the 'Bard of Avon', is widely considered the greatest writer in the English language.",
    "hints": [
      "Often called the Bard of Avon."
    ],
    "tags": [
      "literature",
      "theater",
      "shakespeare"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-homer",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Literature",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which legendary ancient Greek poet is credited with composing the epic poems the Iliad and the Odyssey?",
    "answers": [
      "homer"
    ],
    "explain": "Homer is the revered author of the Iliad and the Odyssey, central works of ancient Greek literature.",
    "hints": [
      "Five-letter name, shares name with a famous cartoon dad."
    ],
    "tags": [
      "literature",
      "ancient-greece",
      "epics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-cult-buddha",
    "subject": "gk",
    "topic": "World Cultures",
    "subtopic": "Religions",
    "difficulty": 2,
    "type": "mcq",
    "q": "What was the birth name of the spiritual teacher who founded Buddhism?",
    "choices": [
      "Siddhartha Gautama",
      "Mahavira",
      "Ashoka Maurya",
      "Adi Shankara"
    ],
    "correctIndex": 0,
    "answers": [
      "Siddhartha Gautama"
    ],
    "explain": "Siddhartha Gautama was an ancient Indian prince who attained enlightenment (Bodhi) and became known as the Buddha.",
    "hints": [
      "Prince Siddhartha."
    ],
    "tags": [
      "religion",
      "buddhism",
      "philosophy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-www",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Internet",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Who invented the World Wide Web in 1989 while working as a computer scientist at CERN?",
    "answers": [
      "tim berners-lee",
      "berners-lee",
      "sir tim berners-lee"
    ],
    "explain": "Tim Berners-Lee created HTTP, HTML, URLs, and the first web client and server in 1989-1990.",
    "hints": [
      "British scientist at CERN in Switzerland."
    ],
    "tags": [
      "technology",
      "internet",
      "web"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-first-comp",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Computing History",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which 19th-century English mathematician designed the Difference Engine and Analytical Engine, earning the title 'father of the computer'?",
    "answers": [
      "charles babbage",
      "babbage"
    ],
    "explain": "Charles Babbage conceptualized mechanical general-purpose computing machinery with an arithmetic unit and memory store.",
    "hints": [
      "Worked alongside Ada Lovelace."
    ],
    "tags": [
      "technology",
      "computing-history",
      "pioneers"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-first-programmer",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Computing History",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Who is recognized as the world's first computer programmer for publishing an algorithm intended for Babbage's Analytical Engine?",
    "answers": [
      "ada lovelace",
      "lovelace"
    ],
    "explain": "Ada Lovelace realized computers could operate on symbols beyond numbers and wrote the first algorithm calculating Bernoulli numbers.",
    "hints": [
      "Daughter of poet Lord Byron."
    ],
    "tags": [
      "technology",
      "programming",
      "pioneers"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-transistor",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Hardware Milestones",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What semiconductor device invented at Bell Labs in 1947 enabled modern digital computers by replacing bulky vacuum tubes?",
    "answers": [
      "transistor",
      "transistors"
    ],
    "explain": "The point-contact transistor, invented by Bardeen, Brattain, and Shockley, revolutionized electronics as a switch and amplifier.",
    "hints": [
      "Modern CPUs pack billions of these."
    ],
    "tags": [
      "technology",
      "hardware",
      "semiconductors"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-gps",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Inventions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What does the satellite navigation acronym GPS stand for?",
    "answers": [
      "global positioning system"
    ],
    "explain": "GPS stands for Global Positioning System, providing geolocation and time information anywhere on Earth.",
    "hints": [
      "Global ... System."
    ],
    "tags": [
      "technology",
      "navigation",
      "satellites"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-tech-telephone",
    "subject": "gk",
    "topic": "Technology",
    "subtopic": "Inventions",
    "difficulty": 1,
    "type": "mcq",
    "q": "Who was awarded the first US patent for the electric telephone in March 1876?",
    "choices": [
      "Alexander Graham Bell",
      "Thomas Edison",
      "Nikola Tesla",
      "Samuel Morse"
    ],
    "correctIndex": 0,
    "answers": [
      "Alexander Graham Bell"
    ],
    "explain": "Alexander Graham Bell was granted patent No. 174,465 for an 'improvement in telegraphy', describing the first telephone.",
    "hints": [
      "His last name sounds like a ringer."
    ],
    "tags": [
      "technology",
      "inventions",
      "telecom"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-crit-opp-cost",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Economics",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In decision-making and economics, what term describes the potential benefit lost when choosing one alternative over the next best alternative?",
    "answers": [
      "opportunity cost"
    ],
    "explain": "Opportunity cost represents the forgone benefit of the next best choice given up when allocating scarce resources.",
    "hints": [
      "Cost of missed opportunity."
    ],
    "tags": [
      "critical-thinking",
      "economics",
      "decision-making"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-crit-confirmation",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Cognitive Biases",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What cognitive bias involves searching for, interpreting, and remembering information that affirms one's preexisting beliefs?",
    "answers": [
      "confirmation bias"
    ],
    "explain": "Confirmation bias leads individuals to selectively notice evidence that confirms existing hypotheses while ignoring contradictory data.",
    "hints": [
      "Seeking confirmation."
    ],
    "tags": [
      "critical-thinking",
      "psychology",
      "biases"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-crit-ad-hominem",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Fallacies",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What Latin logical fallacy occurs when someone attacks their opponent's character or personal traits instead of addressing their argument?",
    "answers": [
      "ad hominem",
      "argumentum ad hominem"
    ],
    "explain": "An ad hominem argument attacks the person advancing a claim rather than the logical merit or evidence of the claim itself.",
    "hints": [
      "Latin for 'to the man'."
    ],
    "tags": [
      "critical-thinking",
      "logic",
      "fallacies"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-crit-sunk-cost",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Fallacies",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What fallacy involves continuing an endeavor due to previously invested resources (money, time, or effort) that cannot be recovered?",
    "answers": [
      "sunk cost fallacy",
      "sunk cost"
    ],
    "explain": "The sunk cost fallacy occurs when decision-makers let unrecoverable past investments dictate future choices instead of future expected utility.",
    "hints": [
      "Costs that are 'already sunk'."
    ],
    "tags": [
      "critical-thinking",
      "economics",
      "fallacies"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "gk-crit-occams-razor",
    "subject": "gk",
    "topic": "Critical Thinking",
    "subtopic": "Logic",
    "difficulty": 2,
    "type": "mcq",
    "q": "What philosophical problem-solving principle suggests that among competing explanations, the simplest hypothesis with the fewest assumptions is usually preferred?",
    "choices": [
      "Occam's razor",
      "Hanlon's razor",
      "The Drake equation",
      "Fermi paradox"
    ],
    "correctIndex": 0,
    "answers": [
      "Occam's razor"
    ],
    "explain": "Occam's razor (law of parsimony) posits that unnecessary assumptions should be shaved away when evaluating competing hypotheses.",
    "hints": [
      "Named after Franciscan friar William of Ockham."
    ],
    "tags": [
      "critical-thinking",
      "logic",
      "philosophy"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-binsearch",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Searching",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the worst-case time complexity of binary search on a sorted array of n elements?",
    "answers": [
      "o(log n)",
      "o(logn)",
      "log n",
      "logarithmic",
      "o(log(n))"
    ],
    "explain": "Binary search divides the search space in half each iteration, yielding logarithmic O(log n) time complexity.",
    "hints": [
      "Big-O with a logarithm."
    ],
    "tags": [
      "algorithms",
      "searching",
      "binary-search",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-quicksort",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Sorting",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What is the average-case time complexity of QuickSort on an array of length n?",
    "answers": [
      "o(n log n)",
      "o(nlogn)",
      "n log n",
      "o(n*log(n))"
    ],
    "explain": "QuickSort partitions around a pivot; with balanced partitions, its average runtime recurrence is T(n) = 2T(n/2) + O(n), solving to O(n log n).",
    "hints": [
      "Linearithmic complexity."
    ],
    "tags": [
      "algorithms",
      "sorting",
      "quicksort",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-bubblesort",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Sorting",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the worst-case time complexity of Bubble Sort on an array of n elements?",
    "choices": [
      "O(1)",
      "O(n)",
      "O(n log n)",
      "O(n²)"
    ],
    "correctIndex": 3,
    "answers": [
      "O(n²)"
    ],
    "explain": "Bubble Sort uses nested loops to repeatedly swap adjacent out-of-order elements, performing n*(n-1)/2 comparisons in the worst case (quadratic O(n²)).",
    "hints": [
      "Quadratic time."
    ],
    "tags": [
      "algorithms",
      "sorting",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-bfs-queue",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Graph Algorithms",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which linear data structure (FIFO) is typically used to implement Breadth-First Search (BFS)?",
    "answers": [
      "queue"
    ],
    "explain": "Breadth-First Search explores graph nodes layer by layer using a first-in, first-out (FIFO) queue.",
    "hints": [
      "First-in, first-out line."
    ],
    "tags": [
      "algorithms",
      "bfs",
      "graphs",
      "queues"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-dfs-stack",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Graph Algorithms",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Which data structure (LIFO) or execution mechanism is used to implement Depth-First Search (DFS)?",
    "answers": [
      "stack",
      "call stack",
      "recursion"
    ],
    "explain": "Depth-First Search explores deeply along each branch before backtracking, utilizing an explicit stack or the implicit program call stack.",
    "hints": [
      "Last-in, first-out."
    ],
    "tags": [
      "algorithms",
      "dfs",
      "graphs",
      "stacks"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-dijkstra",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Graph Algorithms",
    "difficulty": 3,
    "type": "short-answer",
    "q": "Which classic algorithm finds the shortest path between nodes in a graph with non-negative edge weights?",
    "answers": [
      "dijkstra's algorithm",
      "dijkstra",
      "dijkstras"
    ],
    "explain": "Edsger Dijkstra designed this greedy algorithm in 1956 to compute single-source shortest paths on weighted directed graphs.",
    "hints": [
      "Dutch computer scientist whose name starts with 'Dij'."
    ],
    "tags": [
      "algorithms",
      "graphs",
      "shortest-path"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-bigo",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Complexity",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What mathematical notation describes the upper bound or worst-case asymptotic growth rate of an algorithm?",
    "answers": [
      "big o notation",
      "big o",
      "big-o",
      "big-o notation"
    ],
    "explain": "Big-O notation characterizes functions according to their growth rates, bounding execution time or memory usage as input size tends toward infinity.",
    "hints": [
      "Capital letter O with a hyphen."
    ],
    "tags": [
      "algorithms",
      "big-o",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-memoization",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Dynamic Programming",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What optimization technique speeds up programs by storing the results of expensive function calls and returning the cached result when the same inputs recur?",
    "answers": [
      "memoization",
      "caching"
    ],
    "explain": "Memoization is a top-down dynamic programming technique where previous computation outputs are recorded in a lookup table or hash map.",
    "hints": [
      "Sounds like memorization without the 'r'."
    ],
    "tags": [
      "algorithms",
      "dynamic-programming",
      "optimization"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-algo-mergesort",
    "subject": "cs",
    "topic": "Algorithms",
    "subtopic": "Sorting",
    "difficulty": 3,
    "type": "mcq",
    "q": "What algorithmic paradigm is the foundation of Merge Sort?",
    "choices": [
      "Divide and conquer",
      "Greedy approach",
      "Dynamic programming",
      "Backtracking"
    ],
    "correctIndex": 0,
    "answers": [
      "Divide and conquer"
    ],
    "explain": "Merge Sort splits the input array into two halves, recursively sorts them, and merges the sorted halves back together.",
    "hints": [
      "Divide into subproblems, conquer them, and combine."
    ],
    "tags": [
      "algorithms",
      "sorting",
      "divide-and-conquer"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-array-access",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Arrays",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the time complexity to access any element by index in a contiguous array?",
    "answers": [
      "o(1)",
      "constant",
      "constant time"
    ],
    "explain": "Because array elements are stored contiguously in memory, address calculation is base_address + index * element_size, which takes O(1) constant time.",
    "hints": [
      "Constant time."
    ],
    "tags": [
      "data-structures",
      "arrays",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-fifo",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Queues",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What four-letter acronym describes the element ordering policy of a Queue?",
    "answers": [
      "fifo",
      "first in first out"
    ],
    "explain": "FIFO stands for First-In, First-Out: the first item enqueued is the first item dequeued.",
    "hints": [
      "First In..."
    ],
    "tags": [
      "data-structures",
      "queues",
      "fifo"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-lifo",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Stacks",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What four-letter acronym describes the element retrieval policy of a Stack?",
    "answers": [
      "lifo",
      "last in first out"
    ],
    "explain": "LIFO stands for Last-In, First-Out: the most recently pushed element is the first one popped.",
    "hints": [
      "Last In..."
    ],
    "tags": [
      "data-structures",
      "stacks",
      "lifo"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-hash-col",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Hash Tables",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What term describes the situation where two distinct keys hash to the same index in a hash table?",
    "answers": [
      "collision",
      "hash collision"
    ],
    "explain": "A hash collision happens when a hash function generates identical bucket indices for distinct keys, resolved by chaining or open addressing.",
    "hints": [
      "Like two cars crashing."
    ],
    "tags": [
      "data-structures",
      "hash-tables"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-bst",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Trees",
    "difficulty": 2,
    "type": "mcq",
    "q": "In a standard Binary Search Tree (BST), where are keys smaller than the root located?",
    "choices": [
      "In the left subtree",
      "In the right subtree",
      "In parent nodes only",
      "At random positions"
    ],
    "correctIndex": 0,
    "answers": [
      "In the left subtree"
    ],
    "explain": "The binary search tree invariant specifies that for every node, left subtree values are smaller, and right subtree values are greater.",
    "hints": [
      "Left is less, right is greater."
    ],
    "tags": [
      "data-structures",
      "trees",
      "bst"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-linkedlist",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Linked Lists",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the time complexity to insert a new node at the very beginning (head) of a singly linked list?",
    "answers": [
      "o(1)",
      "constant",
      "constant time"
    ],
    "explain": "Inserting at the head merely requires adjusting the new node's next pointer to point to the current head, an O(1) operation.",
    "hints": [
      "No shifting of existing elements needed."
    ],
    "tags": [
      "data-structures",
      "linked-lists",
      "complexity"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-heap",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Heaps",
    "difficulty": 3,
    "type": "short-answer",
    "q": "Which tree-based data structure is most commonly used to efficiently implement a Priority Queue?",
    "answers": [
      "heap",
      "binary heap"
    ],
    "explain": "A binary heap provides O(log n) insertions and O(log n) extractions of the maximum or minimum element, making it ideal for priority queues.",
    "hints": [
      "Can be a Min- or Max-."
    ],
    "tags": [
      "data-structures",
      "heaps",
      "priority-queues"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-trie",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Trees",
    "difficulty": 4,
    "type": "short-answer",
    "q": "What specialized tree structure, also known as a prefix tree, is widely used for autocomplete and dictionary searches?",
    "answers": [
      "trie",
      "prefix tree"
    ],
    "explain": "A trie stores characters along edge paths, allowing string lookup and prefix matching in time proportional to key length, O(k).",
    "hints": [
      "Pronounced like 'try' or 'tree'."
    ],
    "tags": [
      "data-structures",
      "trees",
      "strings"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-ds-graph-dag",
    "subject": "cs",
    "topic": "Data Structures",
    "subtopic": "Graphs",
    "difficulty": 3,
    "type": "mcq",
    "q": "What does DAG stand for in graph theory?",
    "choices": [
      "Directed Acyclic Graph",
      "Dynamic Array Group",
      "Distributed Asynchronous Gateway",
      "Decentralized Access Grid"
    ],
    "correctIndex": 0,
    "answers": [
      "Directed Acyclic Graph"
    ],
    "explain": "A DAG is a directed graph with no directed cycles, commonly used in build systems (makefiles), Git commit trees, and task scheduling.",
    "hints": [
      "Has directions and no closed loops."
    ],
    "tags": [
      "data-structures",
      "graphs",
      "dag"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-arch-cache",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Memory Hierarchy",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What ultra-fast memory bank located directly inside or adjacent to the CPU core bridges the speed gap to RAM?",
    "answers": [
      "cache",
      "cpu cache",
      "l1 cache",
      "l2 cache"
    ],
    "explain": "CPU cache (L1, L2, L3) uses high-speed SRAM to hold copies of frequently accessed data from slower main DRAM memory.",
    "hints": [
      "Pronounced like 'cash'."
    ],
    "tags": [
      "hardware",
      "cpu",
      "cache",
      "memory"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-arch-register",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Registers",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What are the small, extremely high-speed storage locations located directly inside the CPU processor itself?",
    "answers": [
      "registers",
      "cpu registers",
      "register"
    ],
    "explain": "CPU registers are top-of-the-hierarchy memory locations (like RAX, RBX) directly manipulated in single clock cycles by machine instructions.",
    "hints": [
      "Top tier of the memory hierarchy."
    ],
    "tags": [
      "hardware",
      "cpu",
      "registers"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-arch-alu",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Processor Architecture",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What component of the CPU carries out mathematical calculations and bitwise operations?",
    "answers": [
      "alu",
      "arithmetic logic unit"
    ],
    "explain": "The Arithmetic Logic Unit (ALU) is the combinational digital electronic circuit that performs integer arithmetic and bitwise logic.",
    "hints": [
      "Three letters: Arithmetic Logic Unit."
    ],
    "tags": [
      "hardware",
      "cpu",
      "architecture"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-arch-clock",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Performance",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What metric, commonly measured in gigahertz (GHz), measures the number of cycles a CPU performs per second?",
    "answers": [
      "clock speed",
      "clock rate",
      "clock frequency"
    ],
    "explain": "Clock speed indicates the frequency of the processor's internal oscillator, determining how many instruction cycles occur each second.",
    "hints": [
      "Contains the word 'clock'."
    ],
    "tags": [
      "hardware",
      "cpu",
      "performance"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-arch-von-neumann",
    "subject": "cs",
    "topic": "CPU & Memory",
    "subtopic": "Architecture",
    "difficulty": 3,
    "type": "mcq",
    "q": "Which classic computer architecture features a shared physical bus and memory for both program code and data?",
    "choices": [
      "Von Neumann architecture",
      "Harvard architecture",
      "Turing architecture",
      "RISC architecture"
    ],
    "correctIndex": 0,
    "answers": [
      "Von Neumann architecture"
    ],
    "explain": "The Von Neumann architecture stores both program instructions and data in the same read-write memory address space.",
    "hints": [
      "Named after mathematician John von Neumann."
    ],
    "tags": [
      "hardware",
      "architecture",
      "von-neumann"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-thread",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Concurrency",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the smallest unit of execution within a process that shares the parent process's memory space?",
    "answers": [
      "thread",
      "threads"
    ],
    "explain": "Threads within the same process share its code segment, data segment, and open file handles, but have independent stacks and registers.",
    "hints": [
      "A process can be multi-threaded."
    ],
    "tags": [
      "operating-systems",
      "concurrency",
      "threads"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-deadlock",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Concurrency",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What condition occurs when two or more processes are blocked indefinitely, each waiting for a resource held by the other?",
    "answers": [
      "deadlock"
    ],
    "explain": "Deadlock requires Coffman's four conditions: mutual exclusion, hold and wait, no preemption, and circular wait.",
    "hints": [
      "A complete standstill between processes."
    ],
    "tags": [
      "operating-systems",
      "concurrency",
      "deadlock"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-virtual-mem",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Memory Management",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What operating system feature uses secondary storage (like an SSD) to simulate additional physical RAM?",
    "answers": [
      "virtual memory",
      "paging",
      "swap"
    ],
    "explain": "Virtual memory gives each program an illusion of a large contiguous address space by swapping memory pages between RAM and disk storage.",
    "hints": [
      "Not physical, but..."
    ],
    "tags": [
      "operating-systems",
      "memory",
      "virtual-memory"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-kernel",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Architecture",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the core computer program that controls all hardware and system software interactions in an operating system?",
    "answers": [
      "kernel"
    ],
    "explain": "The kernel resides in memory continuously and manages low-level hardware abstraction, device drivers, processes, and memory allocation.",
    "hints": [
      "Like a seed inside an OS."
    ],
    "tags": [
      "operating-systems",
      "kernel"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-context-switch",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Scheduling",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What is the term for saving the state of the active process so CPU execution can switch to another process?",
    "answers": [
      "context switch",
      "context switching"
    ],
    "explain": "A context switch involves saving CPU registers, program counter, and memory mappings for one process and loading those of the next scheduled process.",
    "hints": [
      "Switching contexts."
    ],
    "tags": [
      "operating-systems",
      "cpu",
      "scheduling"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-os-semaphore",
    "subject": "cs",
    "topic": "Operating Systems",
    "subtopic": "Synchronization",
    "difficulty": 4,
    "type": "mcq",
    "q": "Which synchronization primitive, introduced by Edsger Dijkstra, uses an integer counter with wait() and signal() operations to manage access to finite resources?",
    "choices": [
      "Semaphore",
      "Spinlock",
      "Condition variable",
      "Barrier"
    ],
    "correctIndex": 0,
    "answers": [
      "Semaphore"
    ],
    "explain": "A semaphore maintains a count representing available resources, decrementing when acquired and incrementing when released.",
    "hints": [
      "From the optical telegraph signaling flags."
    ],
    "tags": [
      "operating-systems",
      "concurrency",
      "synchronization"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-dns",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Protocols",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What internet system maps human-friendly domain names (like google.com) into numerical IP addresses?",
    "answers": [
      "dns",
      "domain name system"
    ],
    "explain": "DNS acts as the phonebook of the Internet, translating hostname queries into routable IP addresses.",
    "hints": [
      "Three-letter acronym for Domain Name System."
    ],
    "tags": [
      "networking",
      "dns",
      "internet"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-tcp-udp",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Protocols",
    "difficulty": 2,
    "type": "mcq",
    "q": "Between TCP and UDP, which transport-layer protocol guarantees reliable, ordered packet delivery with retransmission?",
    "choices": [
      "TCP",
      "UDP",
      "IP",
      "ICMP"
    ],
    "correctIndex": 0,
    "answers": [
      "TCP"
    ],
    "explain": "TCP establishes a connection via a 3-way handshake and guarantees in-order, error-checked data delivery.",
    "hints": [
      "Transmission Control Protocol."
    ],
    "tags": [
      "networking",
      "tcp",
      "udp",
      "transport-layer"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-osi-layers",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "OSI Model",
    "difficulty": 1,
    "type": "short-answer",
    "q": "How many abstraction layers are defined in the standard OSI networking model?",
    "answers": [
      "7",
      "seven"
    ],
    "explain": "The OSI model specifies 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    "hints": [
      "Physical to Application."
    ],
    "tags": [
      "networking",
      "osi-model"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-port-https",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Ports",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What standard default port number is used for encrypted HTTPS web traffic?",
    "answers": [
      "443"
    ],
    "explain": "Port 443 is the standard IANA port assigned to HTTPS (HTTP over TLS/SSL). Standard unencrypted HTTP uses port 80.",
    "hints": [
      "Four hundred forty-three."
    ],
    "tags": [
      "networking",
      "ports",
      "https"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-port-http",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Ports",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What standard default port number is assigned to plaintext HTTP web traffic?",
    "answers": [
      "80"
    ],
    "explain": "Port 80 is the default TCP port for unencrypted World Wide Web traffic.",
    "hints": [
      "A round double digit number."
    ],
    "tags": [
      "networking",
      "ports",
      "http"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-net-mac",
    "subject": "cs",
    "topic": "Networking",
    "subtopic": "Hardware Addressing",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What permanent hardware address is burned into a Network Interface Card (NIC) at Layer 2?",
    "answers": [
      "mac address",
      "mac",
      "media access control address"
    ],
    "explain": "A MAC (Media Access Control) address is a 48-bit unique identifier assigned to a network interface for physical network communication.",
    "hints": [
      "Three-letter acronym starting with M."
    ],
    "tags": [
      "networking",
      "mac-address",
      "hardware"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-acid-a",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "Transactions",
    "difficulty": 2,
    "type": "short-answer",
    "q": "In the ACID properties of database transactions, what guarantee does the letter 'A' stand for?",
    "answers": [
      "atomicity"
    ],
    "explain": "Atomicity guarantees that a series of database operations either all occur successfully or none occur (all-or-nothing).",
    "hints": [
      "Atomic transaction."
    ],
    "tags": [
      "databases",
      "acid",
      "transactions"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-primarykey",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "Schema",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What relational database constraint guarantees that every row in a table is uniquely identified and non-null?",
    "answers": [
      "primary key",
      "pk"
    ],
    "explain": "A primary key column (or set of columns) enforces unique identification of each record in a relational database table.",
    "hints": [
      "Primary..."
    ],
    "tags": [
      "databases",
      "sql",
      "keys"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-foreignkey",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "Schema",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What database column or constraint creates a relationship by referencing the primary key of another table?",
    "answers": [
      "foreign key",
      "fk"
    ],
    "explain": "A foreign key establishes referential integrity between two tables by matching primary key values in the referenced table.",
    "hints": [
      "Key from another table."
    ],
    "tags": [
      "databases",
      "sql",
      "relationships"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-index",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "Indexing",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What data structure (commonly a B-Tree) is added to database columns to speed up data search and retrieval?",
    "answers": [
      "index",
      "indexes",
      "indices",
      "database index"
    ],
    "explain": "A database index creates an auxiliary lookup structure, reducing query scans from O(n) table scans to O(log n) tree traversals.",
    "hints": [
      "Like the back of a textbook."
    ],
    "tags": [
      "databases",
      "indexing",
      "performance"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-innerjoin",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "SQL",
    "difficulty": 2,
    "type": "mcq",
    "q": "Which SQL JOIN clause returns only the rows that have matching values in both joined tables?",
    "choices": [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    "correctIndex": 0,
    "answers": [
      "INNER JOIN"
    ],
    "explain": "INNER JOIN combines rows from two tables when their join predicate is satisfied in both records.",
    "hints": [
      "Intersection of both tables."
    ],
    "tags": [
      "databases",
      "sql",
      "joins"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-nosql",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "NoSQL",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What overarching term describes non-relational databases (such as MongoDB, Redis, and Cassandra) designed for flexible data schemas?",
    "answers": [
      "nosql",
      "not only sql"
    ],
    "explain": "NoSQL databases store data in document, key-value, column-family, or graph formats instead of tabular relational schemas.",
    "hints": [
      "Stands for 'Not Only SQL'."
    ],
    "tags": [
      "databases",
      "nosql",
      "document-stores"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-db-normalization",
    "subject": "cs",
    "topic": "Databases",
    "subtopic": "Design",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What database design process structures relational tables into normal forms (1NF, 2NF, 3NF) to minimize data redundancy?",
    "answers": [
      "normalization",
      "database normalization"
    ],
    "explain": "Normalization organizes relational tables to eliminate duplicate information and prevent insertion, update, and deletion anomalies.",
    "hints": [
      "Normal forms."
    ],
    "tags": [
      "databases",
      "normalization",
      "design"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-asym",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Cryptography",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What type of cryptography uses a linked pair of keys—a public key for encryption and a private key for decryption?",
    "answers": [
      "asymmetric encryption",
      "asymmetric cryptography",
      "public-key cryptography",
      "asymmetric",
      "public key cryptography"
    ],
    "explain": "Asymmetric (public-key) cryptography (e.g. RSA, ECC) enables secure data exchange without requiring prior shared secret keys.",
    "hints": [
      "Contrasts with symmetric encryption."
    ],
    "tags": [
      "cybersecurity",
      "cryptography",
      "encryption"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-hash-oneway",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Cryptography",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What mathematical function turns arbitrary input data into a fixed-length fingerprint that cannot be feasibly reversed?",
    "answers": [
      "hash function",
      "cryptographic hash function",
      "hash",
      "hashing"
    ],
    "explain": "A cryptographic hash function (e.g. SHA-256) exhibits pre-image resistance, collision resistance, and avalanche properties.",
    "hints": [
      "Commonly used for storing passwords securely."
    ],
    "tags": [
      "cybersecurity",
      "cryptography",
      "hashing"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-sql-inj",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Web Security",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What web vulnerability occurs when an application improperly concatenates unsanitized user input directly into a database query?",
    "answers": [
      "sql injection",
      "sqli"
    ],
    "explain": "SQL injection lets attackers manipulate database queries, bypassing authentication or exfiltrating confidential records.",
    "hints": [
      "Injecting SQL commands."
    ],
    "tags": [
      "cybersecurity",
      "web-security",
      "sql-injection"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-xss",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Web Security",
    "difficulty": 3,
    "type": "short-answer",
    "q": "What three-letter acronym represents the security vulnerability where malicious JavaScript is injected into trusted web pages?",
    "answers": [
      "xss",
      "cross-site scripting"
    ],
    "explain": "Cross-Site Scripting (XSS) lets attackers execute malicious scripts in victims' browsers to hijack sessions or steal cookies.",
    "hints": [
      "Cross-Site Scripting."
    ],
    "tags": [
      "cybersecurity",
      "web-security",
      "xss"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-2fa",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Authentication",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What security mechanism requires two distinct verification proofs (e.g., password + authenticator code) to gain account access?",
    "answers": [
      "2fa",
      "two-factor authentication",
      "mfa",
      "multi-factor authentication"
    ],
    "explain": "Two-factor authentication protects against compromised passwords by combining something you know with something you have or are.",
    "hints": [
      "Three characters: number 2 followed by fa."
    ],
    "tags": [
      "cybersecurity",
      "authentication",
      "2fa"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-mitm",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Network Attacks",
    "difficulty": 2,
    "type": "mcq",
    "q": "What type of attack occurs when an eavesdropper secretly intercepts and potentially modifies communication between two parties?",
    "choices": [
      "Man-in-the-Middle (MitM) attack",
      "DDoS attack",
      "Buffer overflow attack",
      "Brute-force attack"
    ],
    "correctIndex": 0,
    "answers": [
      "Man-in-the-Middle (MitM) attack"
    ],
    "explain": "A Man-in-the-Middle attack intercepts messages between two endpoints, prevented on the web using HTTPS and valid TLS certificates.",
    "hints": [
      "An adversary placed in the middle of a transmission."
    ],
    "tags": [
      "cybersecurity",
      "network-attacks",
      "mitm"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "cs-sec-ddos",
    "subject": "cs",
    "topic": "Cybersecurity",
    "subtopic": "Network Attacks",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What cyber attack overwhelms an online server or network with flood traffic originating from thousands of distributed botnet devices?",
    "answers": [
      "ddos",
      "distributed denial of service",
      "denial of service"
    ],
    "explain": "A Distributed Denial of Service (DDoS) attack overwhelms targeted infrastructure capacity using compromised botnets.",
    "hints": [
      "Four-letter acronym starting with double D."
    ],
    "tags": [
      "cybersecurity",
      "ddos",
      "botnets"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "c-pred-js-typeof",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "JavaScript Types",
    "difficulty": 2,
    "type": "code-trace",
    "code": "console.log(typeof null);",
    "q": "What does this JavaScript code output to the console?",
    "answers": [
      "\"object\"",
      "object"
    ],
    "explain": "In JavaScript, 'typeof null' evaluates to 'object' due to a legacy bug in the original 1995 JavaScript implementation.",
    "hints": [
      "It is a famous JavaScript quirk."
    ],
    "tags": [
      "javascript",
      "types",
      "predict-output"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-map",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Array Methods",
    "difficulty": 1,
    "type": "code-trace",
    "code": "const nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);\nconsole.log(doubled);",
    "q": "What array is output by this JavaScript code?",
    "answers": [
      "[2, 4, 6]",
      "[2,4,6]",
      "2, 4, 6",
      "2,4,6"
    ],
    "explain": "Array.prototype.map creates a new array populated with the results of calling the provided callback on every element.",
    "hints": [
      "Each element is multiplied by 2."
    ],
    "tags": [
      "javascript",
      "arrays",
      "functional"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-filter",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Array Methods",
    "difficulty": 1,
    "type": "code-trace",
    "code": "const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);",
    "q": "What array is logged to the console by this JavaScript code?",
    "answers": [
      "[2, 4]",
      "[2,4]",
      "2, 4",
      "2,4"
    ],
    "explain": "Array.prototype.filter creates a shallow copy of a portion of the given array, filtered down to elements that pass the test (even numbers).",
    "hints": [
      "Only numbers where n % 2 === 0."
    ],
    "tags": [
      "javascript",
      "arrays",
      "filter"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-reduce",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Array Methods",
    "difficulty": 2,
    "type": "code-trace",
    "code": "const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum);",
    "q": "What number is printed by this JavaScript code?",
    "answers": [
      "10"
    ],
    "explain": "Array.prototype.reduce accumulates the array values starting from 0: 0 + 1 + 2 + 3 + 4 = 10.",
    "hints": [
      "Sum of integers from 1 to 4."
    ],
    "tags": [
      "javascript",
      "arrays",
      "reduce"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-hoist",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Hoisting",
    "difficulty": 2,
    "type": "code-trace",
    "code": "console.log(x);\nvar x = 5;",
    "q": "What value is logged to the console before 'var x = 5' initializes?",
    "answers": [
      "undefined"
    ],
    "explain": "Variables declared with 'var' have their declarations hoisted to the top of the scope and initialized with 'undefined'.",
    "hints": [
      "The declaration is hoisted, but the assignment happens later."
    ],
    "tags": [
      "javascript",
      "hoisting",
      "var"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-destruct",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "ES6 Destructuring",
    "difficulty": 2,
    "type": "code-trace",
    "code": "const { a, b = 10 } = { a: 5 };\nconsole.log(a + b);",
    "q": "What numerical result is output by this destructuring assignment?",
    "answers": [
      "15"
    ],
    "explain": "Property 'a' extracts 5, while 'b' is not present in the object, so it takes the default value 10: 5 + 10 = 15.",
    "hints": [
      "5 plus the default fallback for b."
    ],
    "tags": [
      "javascript",
      "es6",
      "destructuring"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-set",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "ES6 Collections",
    "difficulty": 1,
    "type": "code-trace",
    "code": "const items = new Set([1, 2, 2, 3, 1]);\nconsole.log(items.size);",
    "q": "What number is printed as the size of the Set?",
    "answers": [
      "3"
    ],
    "explain": "A Set only stores unique values. The duplicates are ignored, leaving [1, 2, 3] with a size of 3.",
    "hints": [
      "Count only the unique values."
    ],
    "tags": [
      "javascript",
      "sets",
      "collections"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-closure",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Closures",
    "difficulty": 3,
    "type": "code-trace",
    "code": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = makeCounter();\ncounter();\nconsole.log(counter());",
    "q": "What number is logged on the final line?",
    "answers": [
      "2"
    ],
    "explain": "The closure retains the variable 'count'. The first invocation increments it to 1, and the second increments it to 2.",
    "hints": [
      "The function is called twice."
    ],
    "tags": [
      "javascript",
      "closures",
      "functions"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-slice",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Array Methods",
    "difficulty": 2,
    "type": "code-trace",
    "code": "const letters = ['a', 'b', 'c', 'd', 'e'];\nconsole.log(letters.slice(1, 3).join(''));",
    "q": "What string is printed to the console?",
    "answers": [
      "\"bc\"",
      "bc"
    ],
    "explain": "slice(1, 3) extracts elements from index 1 up to (but not including) index 3, returning ['b', 'c']. .join('') produces 'bc'.",
    "hints": [
      "Slice includes start index and excludes end index."
    ],
    "tags": [
      "javascript",
      "arrays",
      "slice"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-js-spread",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "ES6 Operators",
    "difficulty": 1,
    "type": "code-trace",
    "code": "const arr = [1, ...[2, 3], 4];\nconsole.log(arr.length);",
    "q": "What length is printed for the resulting array?",
    "answers": [
      "4"
    ],
    "explain": "The spread syntax unpacks [2, 3] into the surrounding array literal, creating [1, 2, 3, 4], which has length 4.",
    "hints": [
      "The elements are unpacked."
    ],
    "tags": [
      "javascript",
      "spread-operator",
      "arrays"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-slice",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Slicing",
    "difficulty": 2,
    "type": "code-trace",
    "code": "nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])",
    "q": "What list does this Python slice print?",
    "answers": [
      "[20, 30, 40]",
      "[20,30,40]"
    ],
    "explain": "Python slicing [1:4] includes index 1, 2, and 3, which are 20, 30, and 40.",
    "hints": [
      "Index 1 up to index 4 exclusive."
    ],
    "tags": [
      "python",
      "lists",
      "slicing"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-dict",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Dictionaries",
    "difficulty": 1,
    "type": "code-trace",
    "code": "counts = {'apples': 2, 'bananas': 5}\nprint(counts.get('oranges', 0))",
    "q": "What value is printed by this Python dict retrieval?",
    "answers": [
      "0"
    ],
    "explain": "dict.get(key, default) looks up the key; since 'oranges' is not in the dictionary, it returns the fallback default 0 without raising a KeyError.",
    "hints": [
      "The fallback default argument."
    ],
    "tags": [
      "python",
      "dictionaries"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-listcomp",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Comprehensions",
    "difficulty": 2,
    "type": "code-trace",
    "code": "evens = [x for x in range(6) if x % 2 == 0]\nprint(evens)",
    "q": "What list is output by this list comprehension in Python?",
    "answers": [
      "[0, 2, 4]",
      "[0,2,4]"
    ],
    "explain": "range(6) produces 0, 1, 2, 3, 4, 5. The filter 'x % 2 == 0' selects 0, 2, and 4.",
    "hints": [
      "Even numbers in 0 through 5."
    ],
    "tags": [
      "python",
      "list-comprehension"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-reverse",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Strings",
    "difficulty": 2,
    "type": "code-trace",
    "code": "word = 'python'\nprint(word[::-1])",
    "q": "What string is output when slicing with a step of -1?",
    "answers": [
      "\"nohtyp\"",
      "nohtyp",
      "'nohtyp'"
    ],
    "explain": "A slice step of -1 reverses the sequence from end to beginning, producing 'nohtyp'.",
    "hints": [
      "The word spelled in reverse."
    ],
    "tags": [
      "python",
      "strings",
      "slicing"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-unpack",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Unpacking",
    "difficulty": 2,
    "type": "code-trace",
    "code": "first, *middle, last = [1, 2, 3, 4, 5]\nprint(middle)",
    "q": "What list is assigned to 'middle' via starred expression unpacking?",
    "answers": [
      "[2, 3, 4]",
      "[2,3,4]"
    ],
    "explain": "Extended iterable unpacking assigns the first element 1 to 'first', 5 to 'last', and gathers intermediate elements into the list [2, 3, 4].",
    "hints": [
      "All elements except the first and last."
    ],
    "tags": [
      "python",
      "unpacking"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-pred-py-zip",
    "subject": "coding",
    "topic": "Predict Output",
    "subtopic": "Python Builtins",
    "difficulty": 2,
    "type": "code-trace",
    "code": "keys = ['a', 'b']\nvals = [1, 2]\nprint(dict(zip(keys, vals)))",
    "q": "What dictionary is generated by passing zipped pairs to dict()?",
    "answers": [
      "{'a': 1, 'b': 2}",
      "{'a':1, 'b':2}",
      "{\"a\": 1, \"b\": 2}"
    ],
    "explain": "zip pairs elements pairwise into [('a', 1), ('b', 2)], which dict() converts into {'a': 1, 'b': 2}.",
    "hints": [
      "Pairs keys with values."
    ],
    "tags": [
      "python",
      "zip",
      "dictionaries"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-off-by-one",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Loops",
    "difficulty": 2,
    "type": "mcq",
    "code": "function sumArray(arr) {\n  let total = 0;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}",
    "q": "What bug is present in this loop intended to sum an array of numbers?",
    "choices": [
      "Loop condition 'i <= arr.length' runs out of bounds, adding undefined (yielding NaN)",
      "total should be initialized to null",
      "arr[i] requires square brackets with commas",
      "The function must return void"
    ],
    "correctIndex": 0,
    "answers": [
      "Loop condition 'i <= arr.length' runs out of bounds, adding undefined (yielding NaN)"
    ],
    "explain": "Because arrays are 0-indexed, the last valid index is arr.length - 1. When i reaches arr.length, arr[i] evaluates to undefined, causing total to become NaN.",
    "hints": [
      "Check the loop comparison operator."
    ],
    "tags": [
      "debugging",
      "loops",
      "javascript",
      "off-by-one"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-js-eq",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Conditionals",
    "difficulty": 1,
    "type": "short-answer",
    "code": "function checkAccess(age) {\n  if (age = 18) {\n    return 'Access granted';\n  }\n  return 'Denied';\n}",
    "q": "What operator error exists inside the 'if' condition statement?",
    "answers": [
      "assignment instead of comparison",
      "used = instead of ===",
      "used = instead of ==",
      "assignment operator",
      "="
    ],
    "explain": "A single equals '=' performs variable assignment, setting age to 18 (which is truthy), rather than equality comparison (=== or ==).",
    "hints": [
      "A single '=' assigns a value."
    ],
    "tags": [
      "debugging",
      "javascript",
      "syntax"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-py-default-mutable",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Python Functions",
    "difficulty": 3,
    "type": "mcq",
    "code": "def append_item(val, items=[]):\n    items.append(val)\n    return items",
    "q": "Why does calling append_item('a') then append_item('b') produce ['a', 'b'] instead of ['b']?",
    "choices": [
      "Default list argument is evaluated once at function definition time and shared across calls",
      "Python does not support list arguments in functions",
      "The append method creates a global variable",
      "The return statement is missing parentheses"
    ],
    "correctIndex": 0,
    "answers": [
      "Default list argument is evaluated once at function definition time and shared across calls"
    ],
    "explain": "In Python, default parameter expressions are evaluated once when the function is defined, meaning the same mutable list object is reused across all subsequent invocations.",
    "hints": [
      "Mutable default arguments retain state."
    ],
    "tags": [
      "python",
      "functions",
      "pitfalls",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-js-const-reassign",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Variables",
    "difficulty": 1,
    "type": "short-answer",
    "code": "const count = 0;\nfor (let i = 0; i < 5; i++) {\n  count += i;\n}",
    "q": "What JavaScript runtime error occurs when executing 'count += i'?",
    "answers": [
      "typeerror",
      "assignment to constant variable",
      "typeerror: assignment to constant variable"
    ],
    "explain": "Variables declared with 'const' cannot be reassigned. Attempting to modify 'count' throws a TypeError: Assignment to constant variable.",
    "hints": [
      "Can you reassign a const?"
    ],
    "tags": [
      "javascript",
      "variables",
      "const",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-py-shadowing",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Python Namespaces",
    "difficulty": 2,
    "type": "short-answer",
    "code": "list = [10, 20, 30]\nchars = list('hello')",
    "q": "Why does the second line raise 'TypeError: list object is not callable'?",
    "answers": [
      "shadowing built-in list",
      "list variable shadows built-in",
      "list variable overwrote the built-in function",
      "variable shadows list"
    ],
    "explain": "Assigning to a variable named 'list' shadows Python's built-in 'list' constructor in the local namespace, making it point to a list instance instead of the class.",
    "hints": [
      "The variable name overwrote a standard Python function."
    ],
    "tags": [
      "python",
      "shadowing",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-infinite-loop",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Control Flow",
    "difficulty": 1,
    "type": "short-answer",
    "code": "let i = 10;\nwhile (i > 0) {\n  console.log(i);\n}",
    "q": "Why will this while loop run infinitely?",
    "answers": [
      "i is never decremented",
      "i is never updated",
      "missing i--",
      "counter never changes"
    ],
    "explain": "The loop condition checks if i > 0, but i is never decremented or modified inside the loop body, causing an infinite loop.",
    "hints": [
      "What happens to variable i inside the loop?"
    ],
    "tags": [
      "debugging",
      "loops",
      "control-flow"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-py-shallow-copy",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "Memory & References",
    "difficulty": 3,
    "type": "mcq",
    "code": "grid = [[0, 0], [0, 0]]\nbackup = grid.copy()\nbackup[0][0] = 99\nprint(grid[0][0])",
    "q": "Why does grid[0][0] output 99 instead of 0?",
    "choices": [
      "list.copy() creates a shallow copy, so nested sublists still reference the identical objects in memory",
      "Python automatically links all integer variables",
      "The print statement executed before the assignment",
      "Variables named grid cannot be cloned"
    ],
    "correctIndex": 0,
    "answers": [
      "list.copy() creates a shallow copy, so nested sublists still reference the identical objects in memory"
    ],
    "explain": "A shallow copy duplicates only the outer list container; inner list elements remain references to the original sublists. Modifying backup[0][0] mutates grid[0][0].",
    "hints": [
      "Difference between shallow copy and deepcopy."
    ],
    "tags": [
      "python",
      "references",
      "shallow-copy",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-bug-js-return-newline",
    "subject": "coding",
    "topic": "Find the Bug",
    "subtopic": "JavaScript Quirks",
    "difficulty": 3,
    "type": "short-answer",
    "code": "function getUser() {\n  return\n  {\n    name: 'Alice'\n  };\n}\nconsole.log(getUser());",
    "q": "What value does getUser() return due to Automatic Semicolon Insertion (ASI)?",
    "answers": [
      "undefined"
    ],
    "explain": "JavaScript's Automatic Semicolon Insertion (ASI) places a semicolon immediately after 'return' on its own line, causing the function to return undefined and ignoring the block below.",
    "hints": [
      "A semicolon is inserted after return."
    ],
    "tags": [
      "javascript",
      "asi",
      "pitfalls",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-py-len",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Python Builtins",
    "difficulty": 1,
    "type": "fill-blank",
    "code": "fruits = ['apple', 'banana', 'cherry']\ncount = ___(fruits) # Return total element count",
    "q": "Which built-in Python function fills the blank to return the length of the list?",
    "answers": [
      "len"
    ],
    "explain": "The len() function in Python returns the number of items in a sequence or container.",
    "hints": [
      "Short for length."
    ],
    "tags": [
      "python",
      "builtins",
      "syntax"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-js-push",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Array Methods",
    "difficulty": 1,
    "type": "fill-blank",
    "code": "const items = [1, 2];\nitems.___(3); // Append element 3 to the end of items",
    "q": "Which JavaScript Array method appends one or more elements to the end of an array in place?",
    "answers": [
      "push"
    ],
    "explain": "Array.prototype.push appends given elements to the end of an array and returns the new length.",
    "hints": [
      "Contrasts with pop and unshift."
    ],
    "tags": [
      "javascript",
      "arrays",
      "methods"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-py-append",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Python Lists",
    "difficulty": 1,
    "type": "fill-blank",
    "code": "tasks = ['read', 'write']\ntasks.___('code') # Add item to the end of list",
    "q": "What method name adds an item to the end of a Python list?",
    "answers": [
      "append"
    ],
    "explain": "The list.append() method appends an item to the end of the existing list in O(1) amortized time.",
    "hints": [
      "Begins with 'app-'."
    ],
    "tags": [
      "python",
      "lists",
      "methods"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-js-includes",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "String Methods",
    "difficulty": 1,
    "type": "fill-blank",
    "code": "const text = 'Master JavaScript';\nconst hasWord = text.___('JavaScript'); // Returns true if found",
    "q": "What string method checks whether a string contains the specified substring, returning a boolean?",
    "answers": [
      "includes"
    ],
    "explain": "String.prototype.includes performs a case-sensitive search to determine whether one string may be found within another.",
    "hints": [
      "Introduced in ES6."
    ],
    "tags": [
      "javascript",
      "strings",
      "methods"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-py-join",
    "subject": "coding",
    "topic": "Complete Code",
    "subtopic": "Python Strings",
    "difficulty": 2,
    "type": "fill-blank",
    "code": "words = ['red', 'green', 'blue']\nresult = ', '.___(words) # Output: 'red, green, blue'",
    "q": "What string method concatenates an iterable of strings separated by the calling delimiter string?",
    "answers": [
      "join"
    ],
    "explain": "str.join(iterable) concatenates strings in an iterable using the delimiter string as separator.",
    "hints": [
      "To join words together."
    ],
    "tags": [
      "python",
      "strings",
      "methods"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-binary-search",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Searching",
    "difficulty": 2,
    "type": "short-answer",
    "code": "function find(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "q": "Which classic searching algorithm is implemented in this snippet?",
    "answers": [
      "binary search"
    ],
    "explain": "Binary search checks the midpoint of a sorted array and halves the remaining candidate interval on each step.",
    "hints": [
      "Divides interval in half."
    ],
    "tags": [
      "algorithms",
      "searching",
      "binary-search"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-palindrome",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Strings",
    "difficulty": 2,
    "type": "short-answer",
    "code": "def verify(text):\n    cleaned = ''.join(c.lower() for c in text if c.isalnum())\n    return cleaned == cleaned[::-1]",
    "q": "What property of the string does this function test (reading identically forwards and backwards)?",
    "answers": [
      "palindrome",
      "whether it is a palindrome",
      "is palindrome"
    ],
    "explain": "A palindrome is a word, phrase, or sequence that reads the same forwards and backwards after stripping punctuation and casing.",
    "hints": [
      "Examples include 'racecar' and 'radar'."
    ],
    "tags": [
      "algorithms",
      "strings",
      "palindromes"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-fibonacci",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Recursion",
    "difficulty": 2,
    "type": "short-answer",
    "code": "function sequence(n) {\n  if (n <= 1) return n;\n  return sequence(n - 1) + sequence(n - 2);\n}",
    "q": "What famous integer sequence (0, 1, 1, 2, 3, 5, 8...) does this recursive function generate?",
    "answers": [
      "fibonacci",
      "fibonacci sequence",
      "fibonacci numbers"
    ],
    "explain": "The Fibonacci sequence starts with 0 and 1, with each subsequent term being the sum of the preceding two terms: F(n) = F(n-1) + F(n-2).",
    "hints": [
      "Named after Italian mathematician Leonardo of Pisa."
    ],
    "tags": [
      "algorithms",
      "fibonacci",
      "recursion"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-factorial",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Recursion",
    "difficulty": 1,
    "type": "short-answer",
    "code": "def mystery(n):\n    return 1 if n <= 1 else n * mystery(n - 1)",
    "q": "What mathematical function (denoted n!) does this recursive function compute?",
    "answers": [
      "factorial",
      "n factorial"
    ],
    "explain": "The factorial of a non-negative integer n is the product of all positive integers less than or equal to n (n! = n * (n-1)!).",
    "hints": [
      "Denoted with an exclamation mark in mathematics."
    ],
    "tags": [
      "algorithms",
      "math",
      "factorial",
      "recursion"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-two-sum",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Hash Sets",
    "difficulty": 3,
    "type": "short-answer",
    "code": "function hasPair(nums, target) {\n  const seen = new Set();\n  for (const x of nums) {\n    if (seen.has(target - x)) return true;\n    seen.add(x);\n  }\n  return false;\n}",
    "q": "What classic algorithmic problem does this function solve in linear O(n) time using a Set?",
    "answers": [
      "two sum",
      "two-sum",
      "pair sum"
    ],
    "explain": "The Two Sum algorithm checks if any pair of numbers in an array sums to the target by storing previously seen complements in a hash set.",
    "hints": [
      "Checks if two numbers sum to target."
    ],
    "tags": [
      "algorithms",
      "two-sum",
      "sets"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-algo-bubble-explain",
    "subject": "coding",
    "topic": "Algorithm Explanation",
    "subtopic": "Sorting",
    "difficulty": 2,
    "type": "short-answer",
    "code": "def sort_items(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
    "q": "What comparison-based sorting algorithm is implemented by repeatedly swapping adjacent elements in this function?",
    "answers": [
      "bubble sort"
    ],
    "explain": "Bubble sort steps through the list, compares adjacent elements, and swaps them if they are in the wrong order until sorted.",
    "hints": [
      "Elements 'bubble' to the top."
    ],
    "tags": [
      "algorithms",
      "sorting",
      "bubble-sort"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-nested-loops",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Big-O Analysis",
    "difficulty": 2,
    "type": "short-answer",
    "code": "for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    doConstantWork();\n  }\n}",
    "q": "What is the Big-O time complexity of these two nested loops iterating from 0 to n?",
    "answers": [
      "o(n^2)",
      "o(n²)",
      "n^2",
      "quadratic",
      "o(n*n)"
    ],
    "explain": "The outer loop runs n times and the inner loop runs n times for each outer step, performing n * n constant-time operations: O(n²).",
    "hints": [
      "n multiplied by n."
    ],
    "tags": [
      "complexity",
      "big-o",
      "loops"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-single-loop",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Big-O Analysis",
    "difficulty": 1,
    "type": "short-answer",
    "code": "def find_max(numbers):\n    m = numbers[0]\n    for x in numbers:\n        if x > m:\n            m = x\n    return m",
    "q": "What is the time complexity of finding the maximum element in an unsorted list of size n?",
    "answers": [
      "o(n)",
      "linear",
      "o(n) time"
    ],
    "explain": "The loop iterates through every element of the array once, performing constant work per element, giving O(n) linear time.",
    "hints": [
      "Linear time."
    ],
    "tags": [
      "complexity",
      "big-o",
      "linear"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-divide-conquer",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Big-O Analysis",
    "difficulty": 2,
    "type": "short-answer",
    "code": "let count = 0;\nwhile (n > 1) {\n  n = Math.floor(n / 2);\n  count++;\n}",
    "q": "What is the time complexity of a loop that halves n in each step until n <= 1?",
    "answers": [
      "o(log n)",
      "o(logn)",
      "log n",
      "logarithmic",
      "o(log(n))"
    ],
    "explain": "Dividing the problem size in half repeatedly takes log₂(n) steps, giving logarithmic time complexity O(log n).",
    "hints": [
      "Logarithmic time."
    ],
    "tags": [
      "complexity",
      "big-o",
      "logarithmic"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-space-matrix",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Space Complexity",
    "difficulty": 2,
    "type": "short-answer",
    "code": "function createGrid(n) {\n  return Array.from({ length: n }, () => new Array(n).fill(0));\n}",
    "q": "What is the auxiliary memory (space complexity) required to allocate this n-by-n matrix?",
    "answers": [
      "o(n^2)",
      "o(n²)",
      "n^2",
      "quadratic",
      "o(n*n)"
    ],
    "explain": "Allocating an n x n 2D array creates n rows of n elements each, requiring O(n²) memory space.",
    "hints": [
      "Space grows as the square of n."
    ],
    "tags": [
      "complexity",
      "space-complexity",
      "matrices"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-hash-lookup",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Data Structures",
    "difficulty": 2,
    "type": "short-answer",
    "code": "const value = lookupMap.get(key);",
    "q": "What is the average time complexity of retrieving a key's value from an ES6 Map or hash table?",
    "answers": [
      "o(1)",
      "constant",
      "constant time"
    ],
    "explain": "Hash tables compute the hash of the key to index directly into the underlying bucket array, providing O(1) average lookup time.",
    "hints": [
      "Constant time."
    ],
    "tags": [
      "complexity",
      "hash-tables",
      "performance"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-comp-binary-tree-height",
    "subject": "coding",
    "topic": "Complexity",
    "subtopic": "Trees",
    "difficulty": 3,
    "type": "mcq",
    "code": "// Inserting already-sorted keys into an unbalanced BST:\n// 1 -> 2 -> 3 -> ... -> n\nclass Node {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}",
    "q": "What is the maximum height of a degenerate (completely unbalanced) binary tree containing n nodes?",
    "choices": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n²)"
    ],
    "correctIndex": 0,
    "answers": [
      "O(n)"
    ],
    "explain": "When nodes are inserted in sorted order, an unbalanced BST degenerates into a linear linked list with height O(n).",
    "hints": [
      "Degenerates into a single linked chain."
    ],
    "tags": [
      "complexity",
      "trees",
      "bst"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-dbg-type-error",
    "subject": "coding",
    "topic": "Debug",
    "subtopic": "Type Coercion",
    "difficulty": 1,
    "type": "code-trace",
    "code": "const a = '10';\nconst b = 5;\nconst result = a + b;\nconsole.log(result);",
    "q": "What string is printed to the console due to JavaScript '+' operator coercion?",
    "answers": [
      "\"105\"",
      "105"
    ],
    "explain": "When one operand of '+' is a string, JavaScript converts the other operand to a string and performs string concatenation: '10' + '5' = '105'.",
    "hints": [
      "Concatenation rather than addition."
    ],
    "tags": [
      "debugging",
      "javascript",
      "coercion"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-dbg-recursion-base",
    "subject": "coding",
    "topic": "Debug",
    "subtopic": "Recursion",
    "difficulty": 2,
    "type": "short-answer",
    "code": "function countdown(n) {\n  console.log(n);\n  return countdown(n - 1);\n}",
    "q": "Why does calling countdown(5) throw 'RangeError: Maximum call stack size exceeded'?",
    "answers": [
      "missing base case",
      "no base case",
      "lacks a termination condition"
    ],
    "explain": "The recursive function lacks a base case (e.g. if (n <= 0) return), causing infinite recursive calls until the stack overflows.",
    "hints": [
      "It never stops recurring."
    ],
    "tags": [
      "debugging",
      "recursion",
      "stack-overflow"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-dbg-dict-keyerror",
    "subject": "coding",
    "topic": "Debug",
    "subtopic": "Python Exceptions",
    "difficulty": 2,
    "type": "short-answer",
    "code": "user = {'id': 42}\nprint(user['email'])",
    "q": "What Python exception is raised when looking up a missing key with square brackets?",
    "answers": [
      "keyerror"
    ],
    "explain": "Accessing a non-existent key in a Python dict with brackets raises a KeyError; use .get('email') to return None safely instead.",
    "hints": [
      "Key..."
    ],
    "tags": [
      "python",
      "debugging",
      "exceptions"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-dbg-async-missing-await",
    "subject": "coding",
    "topic": "Debug",
    "subtopic": "Async/Await",
    "difficulty": 3,
    "type": "code-trace",
    "code": "async function getScore() {\n  return 100;\n}\nconst score = getScore();\nconsole.log(score instanceof Promise);",
    "q": "What boolean does this console statement output because 'await' was omitted?",
    "answers": [
      "true"
    ],
    "explain": "Async functions always return a Promise. Without using 'await', 'score' holds the unresolved Promise object, so score instanceof Promise is true.",
    "hints": [
      "An async function always returns a Promise."
    ],
    "tags": [
      "javascript",
      "async",
      "promises"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-dbg-scope-leak",
    "subject": "coding",
    "topic": "Debug",
    "subtopic": "Variable Scope",
    "difficulty": 2,
    "type": "short-answer",
    "code": "function run() {\n  value = 42; // in non-strict mode\n}\nrun();",
    "q": "In sloppy (non-strict) JavaScript, what global scope does 'value' inadvertently leak into?",
    "answers": [
      "global",
      "global scope",
      "window"
    ],
    "explain": "Without 'let', 'const', or 'var', assigning to an undeclared identifier in non-strict mode binds it as a property on the global object (window or globalThis).",
    "hints": [
      "Leaked to the top-level scope."
    ],
    "tags": [
      "javascript",
      "scope",
      "debugging"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-edge-empty-array",
    "subject": "coding",
    "topic": "Edge Cases",
    "subtopic": "Input Validation",
    "difficulty": 1,
    "type": "short-answer",
    "code": "function getFirstUpper(arr) {\n  return arr[0].toUpperCase();\n}",
    "q": "What input to getFirstUpper causes 'TypeError: Cannot read properties of undefined'?",
    "answers": [
      "empty array",
      "[]",
      "an empty array"
    ],
    "explain": "Passing an empty array [] makes arr[0] evaluate to undefined, and attempting to call .toUpperCase() on undefined throws a TypeError.",
    "hints": [
      "An array with 0 items."
    ],
    "tags": [
      "edge-cases",
      "arrays",
      "javascript"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-edge-division-zero",
    "subject": "coding",
    "topic": "Edge Cases",
    "subtopic": "Arithmetic",
    "difficulty": 1,
    "type": "short-answer",
    "code": "def calculate_ratio(a, b):\n    return a / b",
    "q": "What value for denominator 'b' triggers a ZeroDivisionError?",
    "answers": [
      "0",
      "zero"
    ],
    "explain": "Dividing any number by zero is mathematically undefined and raises ZeroDivisionError in Python.",
    "hints": [
      "The number zero."
    ],
    "tags": [
      "edge-cases",
      "python",
      "arithmetic"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-edge-recursion-neg",
    "subject": "coding",
    "topic": "Edge Cases",
    "subtopic": "Boundary Conditions",
    "difficulty": 2,
    "type": "short-answer",
    "code": "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
    "q": "What kind of integer input for n will cause infinite recursion and crash this function?",
    "answers": [
      "negative",
      "negative integer",
      "negative number",
      "negatives"
    ],
    "explain": "If n is negative, decrementing n - 1 moves further below 0, never hitting the base case n == 0, triggering RecursionError.",
    "hints": [
      "Numbers less than zero."
    ],
    "tags": [
      "edge-cases",
      "recursion",
      "boundary-conditions"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-edge-index-out",
    "subject": "coding",
    "topic": "Edge Cases",
    "subtopic": "Python Lists",
    "difficulty": 1,
    "type": "short-answer",
    "code": "items = ['a', 'b', 'c']\nprint(items[3])",
    "q": "What exception is raised when accessing an index equal to the list length in Python?",
    "answers": [
      "indexerror",
      "indexerror: list index out of range"
    ],
    "explain": "A 3-element list has valid indices 0, 1, and 2. Attempting to access index 3 exceeds bounds and raises IndexError.",
    "hints": [
      "Index..."
    ],
    "tags": [
      "python",
      "edge-cases",
      "exceptions"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "c-edge-nan-equality",
    "subject": "coding",
    "topic": "Edge Cases",
    "subtopic": "IEEE 754 Floats",
    "difficulty": 2,
    "type": "code-trace",
    "code": "console.log(NaN === NaN);",
    "q": "What boolean value does 'NaN === NaN' evaluate to in JavaScript?",
    "answers": [
      "false"
    ],
    "explain": "According to the IEEE 754 floating-point specification, NaN (Not-a-Number) is never equal to any value, including itself. Use Number.isNaN() instead.",
    "hints": [
      "NaN is not equal to itself."
    ],
    "tags": [
      "javascript",
      "edge-cases",
      "nan"
    ],
    "fuzzy": false,
    "volatile": false,
    "metadata": {}
  },
  {
    "id": "m-concept-prime",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Theory",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What term describes a whole number greater than 1 that has only two factors: 1 and itself?",
    "answers": [
      "prime",
      "prime number"
    ],
    "explain": "A prime number is an integer greater than 1 whose only positive divisors are 1 and the number itself (e.g. 2, 3, 5, 7, 11).",
    "hints": [
      "Examples include 2, 3, 5, 7, 11."
    ],
    "tags": [
      "math",
      "number-theory",
      "primes"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-pemdas",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Order of Operations",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In the order of operations acronym PEMDAS, what mathematical operation does the letter 'E' represent?",
    "answers": [
      "exponents",
      "exponent"
    ],
    "explain": "PEMDAS stands for Parentheses, Exponents, Multiplication, Division, Addition, Subtraction.",
    "hints": [
      "Powers and roots."
    ],
    "tags": [
      "math",
      "arithmetic",
      "pemdas"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-integer",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Sets",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What mathematical term describes the set of positive whole numbers, negative whole numbers, and zero (no fractions or decimals)?",
    "answers": [
      "integers",
      "integer"
    ],
    "explain": "Integers are whole numbers without fractional parts: {..., -3, -2, -1, 0, 1, 2, 3, ...}, symbolized as ℤ.",
    "hints": [
      "Denoted by the letter Z."
    ],
    "tags": [
      "math",
      "number-sets",
      "integers"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-rational",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Sets",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What type of number can be expressed as a ratio of two integers p/q where q is not equal to zero?",
    "answers": [
      "rational number",
      "rational numbers",
      "rational"
    ],
    "explain": "A rational number can be represented as a fraction p/q of two integers, with non-zero denominator q.",
    "hints": [
      "Root word is 'ratio'."
    ],
    "tags": [
      "math",
      "number-sets",
      "fractions"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-composite",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Theory",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is an integer greater than 1 called that is not prime because it has positive divisors other than 1 and itself?",
    "answers": [
      "composite",
      "composite number",
      "composite numbers"
    ],
    "explain": "A composite number is a positive integer that can be formed by multiplying two smaller positive integers (e.g., 4, 6, 8, 9, 10).",
    "hints": [
      "Contrasts with prime numbers."
    ],
    "tags": [
      "math",
      "number-theory"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-absolute",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Arithmetic",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What mathematical term describes the non-negative distance of a number from zero on the number line, denoted |x|?",
    "answers": [
      "absolute value"
    ],
    "explain": "Absolute value |x| strips the sign of a real number, representing its distance from the origin regardless of direction.",
    "hints": [
      "Enclosed in vertical bars |x|."
    ],
    "tags": [
      "math",
      "arithmetic",
      "absolute-value"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-reciprocal",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Fractions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the reciprocal of the fraction 3/4?",
    "answers": [
      "4/3",
      "4 / 3",
      "1.33",
      "1.333"
    ],
    "explain": "The reciprocal (multiplicative inverse) of a fraction a/b is b/a; for 3/4, the reciprocal is 4/3.",
    "hints": [
      "Flip the numerator and denominator."
    ],
    "tags": [
      "math",
      "fractions",
      "reciprocals"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-even-odd",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Properties",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Is the product of two odd integers always even or always odd?",
    "answers": [
      "odd",
      "always odd"
    ],
    "explain": "Multiplying two odd numbers (2k+1)(2m+1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1, which is always odd.",
    "hints": [
      "Consider 3 * 5 = 15."
    ],
    "tags": [
      "math",
      "parity",
      "arithmetic"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-gcd",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Theory",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the greatest common divisor (GCD) of 24 and 36?",
    "answers": [
      "12"
    ],
    "explain": "The positive divisors of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The divisors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36. The greatest common divisor is 12.",
    "hints": [
      "Largest number that divides both evenly."
    ],
    "tags": [
      "math",
      "gcd",
      "number-theory"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-lcm",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Number Theory",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the least common multiple (LCM) of 4 and 6?",
    "answers": [
      "12"
    ],
    "explain": "Multiples of 4 are 4, 8, 12, 16... Multiples of 6 are 6, 12, 18... The smallest positive shared multiple is 12.",
    "hints": [
      "Smallest positive multiple shared by both."
    ],
    "tags": [
      "math",
      "lcm",
      "number-theory"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-concept-zero-power",
    "subject": "math",
    "topic": "Concepts",
    "subtopic": "Exponents",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the value of any non-zero real number raised to the power of 0 (e.g., 7⁰)?",
    "answers": [
      "1",
      "one"
    ],
    "explain": "By exponent rules, x⁰ = x^(n-n) = x^n / x^n = 1 for any non-zero number x.",
    "hints": [
      "Any non-zero base to the 0th power."
    ],
    "tags": [
      "math",
      "exponents"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-train",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Distance-Rate-Time",
    "difficulty": 2,
    "type": "short-answer",
    "q": "A train travels at a steady speed of 60 miles per hour for 3.5 hours. How many miles does it travel?",
    "answers": [
      "210",
      "210 miles"
    ],
    "explain": "Distance = Speed × Time: 60 mph × 3.5 hours = 210 miles.",
    "hints": [
      "Multiply 60 by 3.5."
    ],
    "tags": [
      "math",
      "word-problems",
      "speed"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-discount",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Percentages",
    "difficulty": 1,
    "type": "short-answer",
    "q": "A jacket regularly priced at $80 is on sale at a 20% discount. What is the sale price in dollars?",
    "answers": [
      "64",
      "$64",
      "64 dollars"
    ],
    "explain": "20% of $80 is $16. The discounted price is $80 - $16 = $64 (or $80 × 0.80 = $64).",
    "hints": [
      "Take 80% of $80."
    ],
    "tags": [
      "math",
      "percentages",
      "word-problems"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-tip",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Percentages",
    "difficulty": 1,
    "type": "short-answer",
    "q": "If a restaurant bill comes to $40 and you leave a 15% tip, how many dollars is the tip?",
    "answers": [
      "6",
      "$6",
      "6 dollars"
    ],
    "explain": "15% of $40 = 0.15 × 40 = $6.00.",
    "hints": [
      "10% is $4, half of that is $2."
    ],
    "tags": [
      "math",
      "percentages",
      "word-problems"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-ratio",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Ratios & Proportions",
    "difficulty": 2,
    "type": "short-answer",
    "q": "A recipe uses 2 cups of flour for every 3 eggs. If a baker uses 6 cups of flour, how many eggs are needed?",
    "answers": [
      "9",
      "9 eggs"
    ],
    "explain": "The ratio is 2 flour : 3 eggs. With 6 cups of flour (3 times the base amount), the baker needs 3 × 3 = 9 eggs.",
    "hints": [
      "Triple the flour means triple the eggs."
    ],
    "tags": [
      "math",
      "ratios",
      "proportions"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-work",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Work Rate",
    "difficulty": 3,
    "type": "short-answer",
    "q": "Alice can paint a room in 6 hours, and Bob can paint it in 3 hours. Working together at their steady rates, how many hours will it take them?",
    "answers": [
      "2",
      "2 hours"
    ],
    "explain": "Combined work rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 room per hour. Therefore, it takes 1 / (1/2) = 2 hours.",
    "hints": [
      "Add their hourly rates: 1/6 + 1/3."
    ],
    "tags": [
      "math",
      "work-rate",
      "word-problems"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-age",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Algebra Word Problems",
    "difficulty": 2,
    "type": "short-answer",
    "q": "Maya is currently 3 times as old as Leo. In 5 years, the sum of their ages will be 50. How old is Leo right now?",
    "answers": [
      "10",
      "10 years old"
    ],
    "explain": "Let Leo's age be L, so Maya is 3L. In 5 years: (L + 5) + (3L + 5) = 50 => 4L + 10 = 50 => 4L = 40 => L = 10.",
    "hints": [
      "Set up 4L + 10 = 50."
    ],
    "tags": [
      "math",
      "algebra",
      "word-problems"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-prob-die",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Probability",
    "difficulty": 2,
    "type": "short-answer",
    "q": "When rolling a fair standard 6-sided die, what is the probability of rolling a prime number (2, 3, or 5) expressed as a simplified fraction?",
    "answers": [
      "1/2",
      "0.5",
      "50%",
      "3/6"
    ],
    "explain": "Out of 6 possible outcomes {1, 2, 3, 4, 5, 6}, three are prime: {2, 3, 5}. The probability is 3/6 = 1/2.",
    "hints": [
      "3 favorable outcomes out of 6."
    ],
    "tags": [
      "math",
      "probability"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-garden-perimeter",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Perimeter",
    "difficulty": 1,
    "type": "short-answer",
    "q": "A rectangular garden is 10 meters long and 6 meters wide. How many meters of fencing are needed to completely surround it?",
    "answers": [
      "32",
      "32 meters",
      "32m"
    ],
    "explain": "Perimeter = 2 × (Length + Width) = 2 × (10 + 6) = 2 × 16 = 32 meters.",
    "hints": [
      "2 * (length + width)."
    ],
    "tags": [
      "math",
      "geometry",
      "perimeter"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-avg-speed",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Average Speed",
    "difficulty": 3,
    "type": "mcq",
    "q": "A car travels 60 miles to a destination at 60 mph, and returns the same 60 miles at 30 mph. What is the average speed for the entire 120-mile round trip?",
    "choices": [
      "40 mph",
      "45 mph",
      "50 mph",
      "35 mph"
    ],
    "correctIndex": 0,
    "answers": [
      "40 mph"
    ],
    "explain": "Trip 1 takes 60 mi / 60 mph = 1 hour. Return takes 60 mi / 30 mph = 2 hours. Total distance = 120 miles in 3 hours: 120 / 3 = 40 mph (harmonic mean).",
    "hints": [
      "Average speed is Total Distance divided by Total Time, not the simple mean of the speeds."
    ],
    "tags": [
      "math",
      "speed",
      "word-problems"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-interest",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Financial Math",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What is the simple interest earned on a principal of $1,000 invested at a 5% annual interest rate over 3 years?",
    "answers": [
      "150",
      "$150",
      "150 dollars"
    ],
    "explain": "Simple Interest = Principal × Rate × Time = 1000 × 0.05 × 3 = $150.",
    "hints": [
      "I = P * r * t."
    ],
    "tags": [
      "math",
      "finance",
      "interest"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-word-marbles",
    "subject": "math",
    "topic": "Word Problems",
    "subtopic": "Probability",
    "difficulty": 2,
    "type": "mcq",
    "q": "A bag contains 4 red marbles, 5 blue marbles, and 1 green marble. What is the probability of randomly drawing a blue marble?",
    "choices": [
      "1/2 (50%)",
      "1/5 (20%)",
      "2/5 (40%)",
      "3/10 (30%)"
    ],
    "correctIndex": 0,
    "answers": [
      "1/2 (50%)"
    ],
    "explain": "Total marbles = 4 + 5 + 1 = 10. Blue marbles = 5. Probability = 5/10 = 1/2 = 50%.",
    "hints": [
      "5 blue out of 10 total."
    ],
    "tags": [
      "math",
      "probability"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-triangle-sum",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Angles",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the sum of the three interior angles of any triangle in planar Euclidean geometry (in degrees)?",
    "answers": [
      "180",
      "180 degrees",
      "180°"
    ],
    "explain": "In planar Euclidean geometry, the three interior angles of any triangle always sum to exactly 180 degrees (π radians).",
    "hints": [
      "A straight angle."
    ],
    "tags": [
      "math",
      "geometry",
      "triangles",
      "angles"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-pythagoras",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Right Triangles",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In a right triangle with leg lengths 3 and 4, what is the length of the hypotenuse?",
    "answers": [
      "5"
    ],
    "explain": "By the Pythagorean theorem: a² + b² = c² => 3² + 4² = 9 + 16 = 25 => c = √25 = 5.",
    "hints": [
      "Famous 3-4-5 right triangle."
    ],
    "tags": [
      "math",
      "geometry",
      "pythagorean-theorem"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-circle-area",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Area",
    "difficulty": 2,
    "type": "mcq",
    "q": "What is the formula for the area of a circle with radius r?",
    "choices": [
      "πr²",
      "2πr",
      "πd²",
      "4/3 πr³"
    ],
    "correctIndex": 0,
    "answers": [
      "πr²"
    ],
    "explain": "The area enclosed by a circle of radius r is given by the formula A = πr².",
    "hints": [
      "Pi times radius squared."
    ],
    "tags": [
      "math",
      "geometry",
      "circles",
      "area"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-circle-circ",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Circumference",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What mathematical formula gives the perimeter (circumference) of a circle in terms of its radius r?",
    "answers": [
      "2*pi*r",
      "2pir",
      "2 pi r",
      "2πr"
    ],
    "explain": "The circumference of a circle equals 2 × π × r (or π × d).",
    "hints": [
      "2 times pi times radius."
    ],
    "tags": [
      "math",
      "geometry",
      "circles"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-quad-sum",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Polygons",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the sum of the interior angles of any planar quadrilateral (four-sided polygon) in degrees?",
    "answers": [
      "360",
      "360 degrees",
      "360°"
    ],
    "explain": "Any quadrilateral can be partitioned into two triangles; each contributes 180°, so the sum is 2 × 180° = 360°.",
    "hints": [
      "Two triangles combined: 2 * 180."
    ],
    "tags": [
      "math",
      "geometry",
      "quadrilaterals"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-cube-volume",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Volume",
    "difficulty": 1,
    "type": "short-answer",
    "q": "If a cube has an edge length of 4 cm, what is its total volume in cubic centimeters?",
    "answers": [
      "64",
      "64 cm^3",
      "64 cm³"
    ],
    "explain": "Volume of a cube = side³ = 4 × 4 × 4 = 64 cm³.",
    "hints": [
      "4 cubed."
    ],
    "tags": [
      "math",
      "geometry",
      "volume"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-geom-hypotenuse",
    "subject": "math",
    "topic": "Geometry",
    "subtopic": "Right Triangles",
    "difficulty": 1,
    "type": "short-answer",
    "q": "What is the longest side of a right-angled triangle called, situated directly opposite the right angle?",
    "answers": [
      "hypotenuse"
    ],
    "explain": "The hypotenuse is the longest side of a right triangle, opposite the 90-degree angle.",
    "hints": [
      "Begins with 'hypo-'."
    ],
    "tags": [
      "math",
      "geometry",
      "triangles"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-variable",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Definitions",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In algebra, what is a symbol (commonly a letter like x, y, or z) that represents an unknown or changeable quantity called?",
    "answers": [
      "variable"
    ],
    "explain": "A variable is a placeholder symbol representing an unspecified number or quantity that can vary.",
    "hints": [
      "Can vary in value."
    ],
    "tags": [
      "math",
      "algebra",
      "basics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-slope",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Linear Equations",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In the linear slope-intercept equation y = mx + b, which letter represents the slope of the line?",
    "answers": [
      "m"
    ],
    "explain": "In y = mx + b, 'm' denotes the slope (rate of change / rise over run) and 'b' denotes the y-intercept.",
    "hints": [
      "Letter m."
    ],
    "tags": [
      "math",
      "algebra",
      "linear-equations"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-yintercept",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Linear Equations",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In the slope-intercept equation y = mx + b, which letter represents the y-intercept?",
    "answers": [
      "b"
    ],
    "explain": "The y-intercept 'b' is the value of y where the line crosses the y-axis (when x = 0).",
    "hints": [
      "Letter b."
    ],
    "tags": [
      "math",
      "algebra",
      "linear-equations"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-quadratic",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Polynomials",
    "difficulty": 2,
    "type": "short-answer",
    "q": "What type of second-degree polynomial equation takes the standard form ax² + bx + c = 0 (where a ≠ 0)?",
    "answers": [
      "quadratic equation",
      "quadratic",
      "quadratics"
    ],
    "explain": "A quadratic equation is a second-order polynomial equation whose graph forms a parabola.",
    "hints": [
      "Solved using the quadratic formula."
    ],
    "tags": [
      "math",
      "algebra",
      "quadratics"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-coefficient",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Terminology",
    "difficulty": 1,
    "type": "short-answer",
    "q": "In the algebraic term 7x, what is the numerical factor 7 called?",
    "answers": [
      "coefficient"
    ],
    "explain": "A coefficient is a multiplicative factor that scales an algebraic term or variable.",
    "hints": [
      "Begins with 'co-'."
    ],
    "tags": [
      "math",
      "algebra",
      "terminology"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  },
  {
    "id": "m-alg-solve",
    "subject": "math",
    "topic": "Algebra Concepts",
    "subtopic": "Linear Equations",
    "difficulty": 1,
    "type": "short-answer",
    "q": "Solve for x in the linear equation: 3x + 9 = 24.",
    "answers": [
      "5",
      "x=5",
      "x = 5"
    ],
    "explain": "Subtract 9 from both sides: 3x = 15. Divide both sides by 3: x = 5.",
    "hints": [
      "3x = 15."
    ],
    "tags": [
      "math",
      "algebra",
      "equations"
    ],
    "fuzzy": false,
    "volatile": false,
    "code": "",
    "metadata": {}
  }
];

export const LESSONS = [
  {
    "id": "photosynthesis",
    "subject": "Science",
    "title": "Photosynthesis",
    "text": "Photosynthesis is how plants use light energy to make glucose. The main inputs are sunlight, carbon dioxide, and water. Chlorophyll inside chloroplasts absorbs the light energy. The plant uses that energy to build glucose and releases oxygen. Glucose stores chemical energy that the plant can use later.",
    "question": "Without looking: what goes into photosynthesis, and what comes out?",
    "answer": "Inputs: sunlight, carbon dioxide and water. Outputs: glucose and oxygen."
  },
  {
    "id": "computer-memory",
    "subject": "Computer Science",
    "title": "RAM vs Storage",
    "text": "RAM is short-term working memory for programs that are currently running. It is fast, but its contents disappear when power is removed. An SSD or other storage keeps files for the long term. More RAM can help with multitasking, while a faster SSD can improve loading and file access.",
    "question": "Without looking: what is the main difference between RAM and an SSD?",
    "answer": "RAM is fast temporary working memory; an SSD stores data long term."
  },
  {
    "id": "binary",
    "subject": "Computer Science",
    "title": "Binary Basics",
    "text": "Computers represent information using bits. A bit has two possible values, zero or one. Eight bits make one byte. Larger units such as kilobytes, megabytes and gigabytes are built from groups of bytes. Binary works well for electronic circuits because two states can be represented reliably.",
    "question": "Without looking: how many values can one bit represent, and how many bits are in a byte?",
    "answer": "One bit has two values, 0 or 1, and one byte has 8 bits."
  },
  {
    "id": "functions",
    "subject": "Coding",
    "title": "Functions in Programming",
    "text": "A function is a reusable block of code that performs a task. Functions can accept inputs called parameters and can return an output. In Python, the def keyword defines a function. Breaking a program into functions makes code easier to understand, test and reuse.",
    "question": "Without looking: why are functions useful, and which Python keyword defines one?",
    "answer": "Functions package reusable logic; Python defines them with def."
  },
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
];

/**
 * Retrieve all questions matching a specific subject
 * @param {string} subject - e.g. 'math', 'science', 'gk', 'cs', 'coding'
 * @returns {Array<object>} matching questions
 */
export function getQuestionsBySubject(subject) {
  if (!subject) return [];
  const s = String(subject).toLowerCase();
  return QUESTIONS.filter(q => q.subject.toLowerCase() === s);
}

/**
 * Retrieve questions matching a specific subject and topic
 * @param {string} subject
 * @param {string} topic
 * @returns {Array<object>} matching questions
 */
export function getQuestionsByTopic(subject, topic) {
  if (!subject || !topic) return [];
  const s = String(subject).toLowerCase();
  const t = String(topic).toLowerCase();
  return QUESTIONS.filter(q => q.subject.toLowerCase() === s && q.topic.toLowerCase() === t);
}

/**
 * Retrieve a single question by its unique ID
 * @param {string} id
 * @returns {object|null} question or null if not found
 */
export function getQuestionById(id) {
  if (!id) return null;
  return QUESTIONS.find(q => q.id === id) || null;
}

/**
 * Get an array of all distinct topic names available for a subject
 * @param {string} subject
 * @returns {Array<string>} list of distinct topics
 */
export function getTopicsForSubject(subject) {
  if (!subject) return [];
  const s = String(subject).toLowerCase();
  const topics = QUESTIONS.filter(q => q.subject.toLowerCase() === s).map(q => q.topic);
  return [...new Set(topics)];
}
