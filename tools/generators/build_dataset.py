# build_dataset.py - Complete dataset assembler and validator for js/questions.js
import json
import os
import sys

from science_data import science_questions
from gk_data import gk_questions
from cs_data import cs_questions
from coding_data import coding_questions
from math_data import math_questions
from lessons_data import new_lessons

# ------------------------------------------------------------------------------
# V1 QUESTIONS TO PRESERVE EXACTLY
# ------------------------------------------------------------------------------
v1_questions = [
    {
        "id": "s-photo-in",
        "subject": "science",
        "topic": "Biology",
        "subtopic": "Photosynthesis",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What 3 things go into photosynthesis?",
        "answers": ["sunlight carbon dioxide water", "light carbon dioxide water", "sunlight co2 water", "light co2 water"],
        "explain": "Plants use light energy, carbon dioxide (CO₂) and water.",
        "hints": ["Light, a gas you exhale, and a liquid you drink."],
        "tags": ["photosynthesis", "plants", "energy"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-photo-out",
        "subject": "science",
        "topic": "Biology",
        "subtopic": "Photosynthesis",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What 2 main products come out of photosynthesis?",
        "answers": ["glucose oxygen", "glucose o2", "oxygen glucose", "o2 glucose"],
        "explain": "Photosynthesis produces glucose (sugar) and oxygen.",
        "hints": ["A simple sugar and a breathable gas."],
        "tags": ["photosynthesis", "plants", "glucose", "oxygen"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-chloroplast",
        "subject": "science",
        "topic": "Biology",
        "subtopic": "Cells",
        "difficulty": 1,
        "type": "short-answer",
        "q": "Where does photosynthesis happen inside a plant cell?",
        "answers": ["chloroplast", "chloroplasts"],
        "explain": "Photosynthesis occurs in chloroplasts.",
        "hints": ["Organelle containing chlorophyll."],
        "tags": ["cells", "chloroplast", "photosynthesis"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-chlorophyll",
        "subject": "science",
        "topic": "Biology",
        "subtopic": "Cells",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What green pigment absorbs light for photosynthesis?",
        "answers": ["chlorophyll"],
        "explain": "Chlorophyll absorbs light energy inside chloroplasts.",
        "hints": ["Starts with 'chloro-'."],
        "tags": ["pigments", "chlorophyll", "photosynthesis"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-mito",
        "subject": "science",
        "topic": "Biology",
        "subtopic": "Cells",
        "difficulty": 1,
        "type": "short-answer",
        "q": "Which organelle releases usable energy from food?",
        "answers": ["mitochondria", "mitochondrion"],
        "explain": "Mitochondria make ATP through cellular respiration.",
        "hints": ["Often described as the powerhouse of the cell."],
        "tags": ["cells", "mitochondria", "cellular-respiration", "atp"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-force",
        "subject": "science",
        "topic": "Physics",
        "subtopic": "Mechanics",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What is the SI unit of force?",
        "answers": ["newton", "newtons", "n"],
        "explain": "Force is measured in newtons (N).",
        "hints": ["Named after Sir Isaac."],
        "tags": ["physics", "si-units", "force"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "s-atom",
        "subject": "science",
        "topic": "Chemistry",
        "subtopic": "Atoms",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What particle has a negative electric charge?",
        "answers": ["electron", "electrons"],
        "explain": "Electrons are negatively charged.",
        "hints": ["Orbits the atomic nucleus."],
        "tags": ["chemistry", "atomic-structure", "electrons"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "gk-france",
        "subject": "gk",
        "topic": "Geography",
        "subtopic": "Capitals",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What is the capital of France?",
        "answers": ["paris"],
        "explain": "Paris is the capital and largest city of France.",
        "hints": ["City of Light on the Seine river."],
        "tags": ["geography", "capitals", "france", "europe"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "gk-ocean",
        "subject": "gk",
        "topic": "Geography",
        "subtopic": "Oceans",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What is the largest ocean on Earth?",
        "answers": ["pacific", "pacific ocean", "the pacific ocean"],
        "explain": "The Pacific Ocean is Earth's largest ocean.",
        "hints": ["Covers more area than all land combined."],
        "tags": ["geography", "oceans", "earth"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "gk-cont",
        "subject": "gk",
        "topic": "Geography",
        "subtopic": "Continents",
        "difficulty": 1,
        "type": "short-answer",
        "q": "How many continents are commonly taught in the 7-continent model?",
        "answers": ["7", "seven"],
        "explain": "The common model lists seven continents.",
        "hints": ["Between 6 and 8."],
        "tags": ["geography", "continents"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "gk-moon",
        "subject": "gk",
        "topic": "History",
        "subtopic": "Space History",
        "difficulty": 2,
        "type": "short-answer",
        "q": "In what year did humans first land on the Moon?",
        "answers": ["1969"],
        "explain": "Apollo 11 landed on the Moon in 1969.",
        "hints": ["Late 1960s."],
        "tags": ["history", "space", "apollo-11"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "gk-currency",
        "subject": "gk",
        "topic": "Critical Thinking",
        "subtopic": "Economics",
        "difficulty": 2,
        "type": "short-answer",
        "q": "What is inflation?",
        "answers": ["general rise in prices", "rise in prices", "increase in prices", "prices rising over time"],
        "explain": "Inflation is a broad rise in the general price level over time.",
        "hints": ["When the purchasing power of money falls."],
        "tags": ["economics", "inflation", "money"],
        "fuzzy": True,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-ram",
        "subject": "cs",
        "topic": "CPU & Memory",
        "subtopic": "Hardware",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What computer component stores data temporarily while programs are running?",
        "answers": ["ram", "memory", "random access memory"],
        "explain": "RAM is fast temporary working memory used by running programs.",
        "hints": ["Three letters: Random Access Memory."],
        "tags": ["hardware", "memory", "ram"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-cpu",
        "subject": "cs",
        "topic": "CPU & Memory",
        "subtopic": "Hardware",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What does CPU stand for?",
        "answers": ["central processing unit"],
        "explain": "CPU means Central Processing Unit.",
        "hints": ["Central ... Unit."],
        "tags": ["hardware", "cpu", "processors"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-bit",
        "subject": "cs",
        "topic": "CPU & Memory",
        "subtopic": "Binary",
        "difficulty": 1,
        "type": "short-answer",
        "q": "How many possible values can one bit represent?",
        "answers": ["2", "two"],
        "explain": "A bit can be 0 or 1, so it has two possible values.",
        "hints": ["Binary means base-2."],
        "tags": ["binary", "data", "bits"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-byte",
        "subject": "cs",
        "topic": "CPU & Memory",
        "subtopic": "Binary",
        "difficulty": 1,
        "type": "short-answer",
        "q": "How many bits are in one byte?",
        "answers": ["8", "eight"],
        "explain": "One byte contains 8 bits.",
        "hints": ["2 to the third power."],
        "tags": ["binary", "bytes", "storage"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-http",
        "subject": "cs",
        "topic": "Networking",
        "subtopic": "Protocols",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What protocol is commonly used to transfer web pages?",
        "answers": ["http", "https", "hypertext transfer protocol"],
        "explain": "HTTP transfers web resources; HTTPS is HTTP protected by TLS.",
        "hints": ["Standard protocol in web browser URLs."],
        "tags": ["networking", "http", "web"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
    },
    {
        "id": "cs-db",
        "subject": "cs",
        "topic": "Databases",
        "subtopic": "SQL",
        "difficulty": 1,
        "type": "short-answer",
        "q": "What language is commonly used to query relational databases?",
        "answers": ["sql"],
        "explain": "SQL is used to query and modify relational database data.",
        "hints": ["Structured Query Language."],
        "tags": ["databases", "sql", "relational"],
        "fuzzy": False,
        "volatile": False,
        "code": "",
        "metadata": {"source": "BrainForge V1"}
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
        "answers": ["for", "for loop"],
        "explain": "A Python for loop iterates over items in an iterable.",
        "hints": ["for item in sequence:"],
        "tags": ["python", "loops", "syntax"],
        "fuzzy": False,
        "volatile": False,
        "metadata": {"source": "BrainForge V1"}
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
        "answers": ["def"],
        "explain": "Python functions are defined with the def keyword.",
        "hints": ["Short for define."],
        "tags": ["python", "functions", "syntax"],
        "fuzzy": False,
        "volatile": False,
        "metadata": {"source": "BrainForge V1"}
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
        "answers": ["[]", "square brackets", "square bracket"],
        "explain": "Python list literals use square brackets: [1, 2, 3].",
        "hints": ["The box-like square brackets."],
        "tags": ["python", "lists", "syntax"],
        "fuzzy": False,
        "volatile": False,
        "metadata": {"source": "BrainForge V1"}
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
        "answers": ["let"],
        "explain": "let creates a block-scoped binding that can be reassigned.",
        "hints": ["Introduced in ES6 alongside const."],
        "tags": ["javascript", "variables", "scope"],
        "fuzzy": False,
        "volatile": False,
        "metadata": {"source": "BrainForge V1"}
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
        "answers": ["boolean", "bool"],
        "explain": "A Boolean value is either true or false.",
        "hints": ["Named after logician George Boole."],
        "tags": ["data-types", "boolean", "logic"],
        "fuzzy": False,
        "volatile": False,
        "metadata": {"source": "BrainForge V1"}
    }
]

# ------------------------------------------------------------------------------
# V1 LESSONS TO PRESERVE EXACTLY
# ------------------------------------------------------------------------------
v1_lessons = [
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
    }
]

# ------------------------------------------------------------------------------
# ASSEMBLE ALL QUESTIONS AND LESSONS
# ------------------------------------------------------------------------------
all_questions = []
all_questions.extend(v1_questions)
all_questions.extend(science_questions)
all_questions.extend(gk_questions)
all_questions.extend(cs_questions)
all_questions.extend(coding_questions)
all_questions.extend(math_questions)

all_lessons = []
all_lessons.extend(v1_lessons)
all_lessons.extend(new_lessons)

# ------------------------------------------------------------------------------
# VALIDATION
# ------------------------------------------------------------------------------
errors = []

# 1. Unique IDs
ids = [q["id"] for q in all_questions]
id_counts = {}
for qid in ids:
    id_counts[qid] = id_counts.get(qid, 0) + 1
duplicates = [qid for qid, count in id_counts.items() if count > 1]
if duplicates:
    errors.append(f"Duplicate question IDs found: {duplicates}")

# 2. V1 IDs preserved
expected_v1_ids = [
    "s-photo-in", "s-photo-out", "s-chloroplast", "s-chlorophyll", "s-mito", "s-force", "s-atom",
    "gk-france", "gk-ocean", "gk-cont", "gk-moon", "gk-currency",
    "cs-ram", "cs-cpu", "cs-bit", "cs-byte", "cs-http", "cs-db",
    "c-loop", "c-fn", "c-list", "c-js", "c-bool"
]
missing_v1 = [vid for vid in expected_v1_ids if vid not in ids]
if missing_v1:
    errors.append(f"Missing V1 question IDs: {missing_v1}")

# 3. Subject counts
counts_by_subject = {}
for q in all_questions:
    s = q["subject"]
    counts_by_subject[s] = counts_by_subject.get(s, 0) + 1

print("--- Question Counts by Subject ---")
for s, c in sorted(counts_by_subject.items()):
    print(f"  {s}: {c}")
total_q = len(all_questions)
print(f"Total Questions: {total_q}")
print(f"Total Lessons: {len(all_lessons)}")

if counts_by_subject.get("science", 0) < 50:
    errors.append(f"Science count {counts_by_subject.get('science', 0)} is less than 50")
if counts_by_subject.get("gk", 0) < 50:
    errors.append(f"GK count {counts_by_subject.get('gk', 0)} is less than 50")
if counts_by_subject.get("cs", 0) < 50:
    errors.append(f"CS count {counts_by_subject.get('cs', 0)} is less than 50")
if counts_by_subject.get("coding", 0) < 50:
    errors.append(f"Coding count {counts_by_subject.get('coding', 0)} is less than 50")
if counts_by_subject.get("math", 0) < 30:
    errors.append(f"Math count {counts_by_subject.get('math', 0)} is less than 30")
if total_q < 250:
    errors.append(f"Total count {total_q} is less than 250")
if len(all_lessons) < 15:
    errors.append(f"Lesson count {len(all_lessons)} is less than 15")

# 4. Question schema validation
valid_subjects = {"math", "science", "gk", "cs", "coding"}
valid_types = {"short-answer", "mcq", "code-trace", "fill-blank"}

for q in all_questions:
    qid = q.get("id")
    if not qid:
        errors.append("Question missing id")
    if q.get("subject") not in valid_subjects:
        errors.append(f"Question {qid} has invalid subject: {q.get('subject')}")
    if not q.get("topic"):
        errors.append(f"Question {qid} missing topic")
    if not q.get("subtopic"):
        errors.append(f"Question {qid} missing subtopic")
    if not (1 <= q.get("difficulty", 0) <= 5):
        errors.append(f"Question {qid} invalid difficulty: {q.get('difficulty')}")
    if q.get("type") not in valid_types:
        errors.append(f"Question {qid} invalid type: {q.get('type')}")
    if not q.get("q"):
        errors.append(f"Question {qid} missing q text")
    if not isinstance(q.get("answers"), list) or len(q["answers"]) == 0:
        errors.append(f"Question {qid} missing or empty answers list")
    if not q.get("explain"):
        errors.append(f"Question {qid} missing explanation")
    if not isinstance(q.get("hints"), list):
        errors.append(f"Question {qid} hints must be a list")
    if not isinstance(q.get("tags"), list):
        errors.append(f"Question {qid} tags must be a list")
    if not isinstance(q.get("fuzzy"), bool):
        errors.append(f"Question {qid} fuzzy must be a boolean")
    if not isinstance(q.get("volatile"), bool):
        errors.append(f"Question {qid} volatile must be a boolean")
    if "code" not in q:
        errors.append(f"Question {qid} missing code property")
    if not isinstance(q.get("metadata"), dict):
        errors.append(f"Question {qid} metadata must be a dict")
    
    # MCQ specific checks
    if q.get("type") == "mcq":
        choices = q.get("choices")
        if not isinstance(choices, list) or len(choices) < 2:
            errors.append(f"MCQ Question {qid} missing or invalid choices: {choices}")
        correctIndex = q.get("correctIndex")
        if not isinstance(correctIndex, int) or correctIndex < 0 or correctIndex >= len(choices):
            errors.append(f"MCQ Question {qid} invalid correctIndex: {correctIndex}")
        # ensure answers contains correct choice
        chosen = choices[correctIndex]
        if chosen not in q["answers"]:
            q["answers"].append(chosen)

# 5. Lessons schema validation
lesson_ids = [l["id"] for l in all_lessons]
if len(lesson_ids) != len(set(lesson_ids)):
    errors.append("Duplicate lesson IDs found")

for l in all_lessons:
    lid = l.get("id")
    if not lid:
        errors.append("Lesson missing id")
    if not l.get("subject"):
        errors.append(f"Lesson {lid} missing subject")
    if not l.get("title"):
        errors.append(f"Lesson {lid} missing title")
    if not l.get("text"):
        errors.append(f"Lesson {lid} missing text")
    if not l.get("question"):
        errors.append(f"Lesson {lid} missing question")
    if not l.get("answer"):
        errors.append(f"Lesson {lid} missing answer")

if errors:
    print("\nVALIDATION FAILED with errors:")
    for err in errors:
        print("  -", err)
    sys.exit(1)

print("\nALL VALIDATIONS PASSED SUCCESSFULLY!")

# ------------------------------------------------------------------------------
# GENERATE js/questions.js
# ------------------------------------------------------------------------------

# Helper to format question objects as clean JavaScript
def js_format(val, indent=2):
    return json.dumps(val, indent=indent, ensure_ascii=False)

os.makedirs("js", exist_ok=True)
out_path = os.path.join("js", "questions.js")

with open(out_path, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(" * BrainForge V2 - Complete Question Bank and Listening Lessons\n")
    f.write(" * ES Module exporting comprehensive learning curriculum across 5 subjects.\n")
    f.write(" * Total Questions: " + str(len(all_questions)) + "\n")
    f.write(" * Total Listening Lessons: " + str(len(all_lessons)) + "\n")
    f.write(" */\n\n")

    f.write("export const SUBJECTS = {\n")
    f.write('  math: { name: "Math", icon: "∑", desc: "Mental arithmetic, fractions, percentages and algebra." },\n')
    f.write('  science: { name: "Science", icon: "⚗", desc: "Biology, chemistry, physics, Earth and space science." },\n')
    f.write('  gk: { name: "GK", icon: "🌍", desc: "Geography, history, economics and general knowledge." },\n')
    f.write('  cs: { name: "Computer Science", icon: "⌘", desc: "Binary, hardware, networks, algorithms and databases." },\n')
    f.write('  coding: { name: "Coding", icon: "</>", desc: "Python and JavaScript logic, syntax and debugging." }\n')
    f.write("};\n\n")

    f.write("export const QUESTIONS = ")
    f.write(js_format(all_questions, indent=2))
    f.write(";\n\n")

    f.write("export const LESSONS = ")
    f.write(js_format(all_lessons, indent=2))
    f.write(";\n\n")

    f.write("/**\n")
    f.write(" * Retrieve all questions matching a specific subject\n")
    f.write(" * @param {string} subject - e.g. 'math', 'science', 'gk', 'cs', 'coding'\n")
    f.write(" * @returns {Array<object>} matching questions\n")
    f.write(" */\n")
    f.write("export function getQuestionsBySubject(subject) {\n")
    f.write("  if (!subject) return [];\n")
    f.write("  const s = String(subject).toLowerCase();\n")
    f.write("  return QUESTIONS.filter(q => q.subject.toLowerCase() === s);\n")
    f.write("}\n\n")

    f.write("/**\n")
    f.write(" * Retrieve questions matching a specific subject and topic\n")
    f.write(" * @param {string} subject\n")
    f.write(" * @param {string} topic\n")
    f.write(" * @returns {Array<object>} matching questions\n")
    f.write(" */\n")
    f.write("export function getQuestionsByTopic(subject, topic) {\n")
    f.write("  if (!subject || !topic) return [];\n")
    f.write("  const s = String(subject).toLowerCase();\n")
    f.write("  const t = String(topic).toLowerCase();\n")
    f.write("  return QUESTIONS.filter(q => q.subject.toLowerCase() === s && q.topic.toLowerCase() === t);\n")
    f.write("}\n\n")

    f.write("/**\n")
    f.write(" * Retrieve a single question by its unique ID\n")
    f.write(" * @param {string} id\n")
    f.write(" * @returns {object|null} question or null if not found\n")
    f.write(" */\n")
    f.write("export function getQuestionById(id) {\n")
    f.write("  if (!id) return null;\n")
    f.write("  return QUESTIONS.find(q => q.id === id) || null;\n")
    f.write("}\n\n")

    f.write("/**\n")
    f.write(" * Get an array of all distinct topic names available for a subject\n")
    f.write(" * @param {string} subject\n")
    f.write(" * @returns {Array<string>} list of distinct topics\n")
    f.write(" */\n")
    f.write("export function getTopicsForSubject(subject) {\n")
    f.write("  if (!subject) return [];\n")
    f.write("  const s = String(subject).toLowerCase();\n")
    f.write("  const topics = QUESTIONS.filter(q => q.subject.toLowerCase() === s).map(q => q.topic);\n")
    f.write("  return [...new Set(topics)];\n")
    f.write("}\n")

print(f"Generated {out_path} ({os.path.getsize(out_path)} bytes)")
