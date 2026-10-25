
"use client";

import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  ChartNoAxesColumn,
  Heart,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Sparkles,
  MapPin,
  IndianRupee,
  Building2,
  FlaskConical,
  FileText,
  Compass,
  Send,
  Paperclip,
  Check,
  Circle,
  Lightbulb,
  Pencil,
  Bot,
  X,
  Menu,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
};

type Preference = {
  label: string;
  value: string;
  icon: typeof GraduationCap;
};

type ChatMessage = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

const steps: Step[] = [
  {
    title: "Academic Profile",
    description: "Tell us about your marks, education background and stream.",
  },
  {
    title: "Course & Specialization",
    description: "Choose your preferred course or explore options.",
  },
  {
    title: "Location & Universities",
    description: "Select your preferred cities or universities.",
  },
  {
    title: "Budget & Preferences",
    description: "Help us understand your budget and other preferences.",
  },
  {
    title: "Review & Recommendations",
    description: "Get personalized college suggestions.",
  },
];

const initialPreferences: Preference[] = [
  { label: "Study level", value: "Not selected", icon: GraduationCap },
  { label: "Stream", value: "Not selected", icon: FlaskConical },
  { label: "Course", value: "Not selected", icon: BookOpen },
  { label: "Location", value: "Not selected", icon: MapPin },
  { label: "Budget", value: "Not selected", icon: IndianRupee },
  { label: "Preferred Colleges", value: "Not selected", icon: Building2 },
];

const educationOptions = [
  { label: "Undergraduate", sub: "After 12th", icon: GraduationCap },
  { label: "Postgraduate", sub: "Master's Degree", icon: BookOpen },
  { label: "Diploma", sub: "Short-term", icon: FileText },
  { label: "Not sure yet", sub: "Help me decide", icon: Compass },
];

const streamOptions = [
  "Science (PCM)",
  "Science (PCB)",
  "Commerce",
  "Arts/Humanities",
  "Vocational",
  "Not sure",
];

const courseOptions = [
  "B.Tech",
  "BCA",
  "B.Sc",
  "B.Com",
  "BBA",
  "BA",
  "MBBS",
  "MBA",
  "MCA",
  "M.Tech",
  "Other",
  "Help me choose",
];

const budgetOptions = [
  "Under ₹1 lakh",
  "₹1–3 lakh",
  "₹3–5 lakh",
  "₹5–10 lakh",
  "Above ₹10 lakh",
  "Need a scholarship",
];

const locationOptions = [
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Anywhere in India",
];

const preferenceIconClasses = [
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-600",
  "bg-pink-100 text-pink-600",
  "bg-violet-100 text-violet-700",
  "bg-pink-100 text-pink-600",
  "bg-purple-100 text-purple-700",
];

export default function AICounsellingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [studyLevel, setStudyLevel] = useState("");
  const [stream, setStream] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [marks, setMarks] = useState("");
  const [entranceExam, setEntranceExam] = useState("");
  const [universityType, setUniversityType] = useState("");
  const [hostel, setHostel] = useState("");
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    {
      text: "Let's start with your current education level. Which one are you looking for?",
      options: educationOptions.map((item) => item.label),
    },
    {
      text: "Great! Which stream did you study in 12th?",
      options: streamOptions,
    },
    {
      text: "Which course or field interests you the most?",
      options: courseOptions,
    },
    {
      text: "Do you have a preferred specialization?",
      options: [
        "Computer Science",
        "Artificial Intelligence",
        "Data Science",
        "Finance",
        "Marketing",
        "Human Resources",
        "Not decided",
      ],
    },
    {
      text: "Which city would you prefer for your studies?",
      options: locationOptions,
    },
    {
      text: "What is your total education budget?",
      options: budgetOptions,
    },
    {
      text: "What were your approximate marks or percentage?",
      options: [
        "Below 50%",
        "50–60%",
        "60–75%",
        "75–90%",
        "Above 90%",
        "Awaiting results",
      ],
    },
    {
      text: "Have you appeared for any entrance examinations?",
      options: [
        "JEE",
        "CUET",
        "NEET",
        "CAT",
        "Other entrance exam",
        "No entrance exam",
        "Not sure",
      ],
    },
    {
      text: "Which type of university do you prefer?",
      options: [
        "Government",
        "Private",
        "Deemed university",
        "Any suitable university",
      ],
    },
    {
      text: "Will you need hostel or accommodation facilities?",
      options: ["Yes", "No", "Maybe"],
    },
  ];

  const currentQuestion = questions[questionIndex];

  const preferences: Preference[] = [
    {
      label: "Study level",
      value: studyLevel || "Not selected",
      icon: GraduationCap,
    },
    {
      label: "Stream",
      value: stream || "Not selected",
      icon: FlaskConical,
    },
    {
      label: "Course",
      value: course || "Not selected",
      icon: BookOpen,
    },
    {
      label: "Location",
      value: location || "Not selected",
      icon: MapPin,
    },
    {
      label: "Budget",
      value: budget || "Not selected",
      icon: IndianRupee,
    },
    {
      label: "Preferred Colleges",
      value: universityType || "Not selected",
      icon: Building2,
    },
  ];

  function updatePreference(index: number, answer: string) {
    if (index === 0) setStudyLevel(answer);
    if (index === 1) setStream(answer);
    if (index === 2) setCourse(answer);
    if (index === 3) setSpecialization(answer);
    if (index === 4) setLocation(answer);
    if (index === 5) setBudget(answer);
    if (index === 6) setMarks(answer);
    if (index === 7) setEntranceExam(answer);
    if (index === 8) setUniversityType(answer);
    if (index === 9) setHostel(answer);
  }

  function chooseOption(answer: string) {
    const currentIndex = questionIndex;

    updatePreference(currentIndex, answer);

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: Date.now(),
        sender: "user",
        text: answer,
      },
    ];

    if (currentIndex < questions.length - 1) {
      setQuestionIndex(currentIndex + 1);
      setActiveStep(
        Math.min(4, Math.floor(((currentIndex + 1) / questions.length) * 5))
      );

      newMessages.push({
        id: Date.now() + 1,
        sender: "bot",
        text:
          currentIndex === 0
            ? "Great! Let's learn a little more about your academic background."
            : currentIndex === 1
              ? "Thanks! Now let's find a course that matches your interests."
              : currentIndex === 2
                ? "Good choice! Let's explore your preferred specialization."
                : currentIndex === 3
                  ? "Got it! Where would you like to study?"
                  : currentIndex === 4
                    ? "Understood. Let's set a comfortable budget for you."
                    : currentIndex === 5
                      ? "Thanks! Your academic performance will help us assess eligibility."
                      : currentIndex === 6
                        ? "Got it! We'll consider relevant entrance exam requirements."
                        : currentIndex === 7
                          ? "Noted! Let's finish with your accommodation preference."
                          : "Almost there! I'll use these preferences to prepare your recommendations.",
      });
    } else {
      setShowRecommendations(true);
      setActiveStep(4);

      newMessages.push({
        id: Date.now() + 1,
        sender: "bot",
        text: "Your counselling profile is ready! Review your preferences and explore matching colleges.",
      });
    }

    setMessages(newMessages);
  }

  function sendMessage() {
    const text = message.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { id: Date.now(), sender: "user", text },
      {
        id: Date.now() + 1,
        sender: "bot",
        text: "Thanks for sharing! You can also select one of the suggested options above to complete your counselling profile.",
      },
    ]);

    setMessage("");
  }

  function skipQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
    } else {
      setShowRecommendations(true);
      setActiveStep(4);
    }
  }

  function startOver() {
    setStudyLevel("");
    setStream("");
    setCourse("");
    setLocation("");
    setBudget("");
    setSpecialization("");
    setMarks("");
    setEntranceExam("");
    setUniversityType("");
    setHostel("");
    setMessages([]);
    setQuestionIndex(0);
    setActiveStep(0);
    setShowRecommendations(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] text-[#17124f]">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-violet-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-5 px-5 lg:px-10">
          <a href="/" className="flex shrink-0 items-center gap-2">
            <GraduationCap
              size={37}
              strokeWidth={2.4}
              className="text-violet-800"
            />
            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Admission<span className="text-pink-600">Era</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="/colleges"
              className="flex items-center gap-2 text-sm font-medium hover:text-pink-600"
            >
              <Building2 size={19} /> Explore Colleges
            </a>
            <a
              href="/courses"
              className="flex items-center gap-2 text-sm font-medium hover:text-pink-600"
            >
              <BookOpen size={19} /> Courses
            </a>
            <a
              href="/compare"
              className="flex items-center gap-2 text-sm font-medium hover:text-pink-600"
            >
              <ChartNoAxesColumn size={19} /> Compare
            </a>
            <a
              href="/saved"
              className="flex items-center gap-2 text-sm font-medium hover:text-pink-600"
            >
              <Heart size={19} /> Saved
            </a>
            <span className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-2 text-sm font-bold text-violet-800">
              <Sparkles size={16} /> AI Counselling
            </span>
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <button
              aria-label="Search"
              className="hidden rounded-full p-2 hover:bg-violet-50 sm:block"
            >
              <Search size={21} />
            </button>
            <button
              aria-label="Notifications"
              className="relative rounded-full p-2 hover:bg-violet-50"
            >
              <Bell size={21} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 border-l border-slate-100 pl-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-pink-200 font-bold">
                  S
                </div>
                <span className="hidden text-sm font-semibold sm:block">
                  Student
                </span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-12 w-44 rounded-xl border border-violet-100 bg-white p-2 shadow-xl">
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-violet-50"
                  >
                    My preferences
                  </button>
                  <button
                    onClick={startOver}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-violet-50"
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#eeeaff] via-[#f7f4ff] to-[#ffe8f5]">
        <div className="pointer-events-none absolute -left-24 top-5 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />

        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-5 py-9 md:flex-row md:items-center md:px-10 lg:py-11">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <Sparkles size={14} /> AI Counselling
            </span>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Your{" "}
              <span className="bg-gradient-to-r from-violet-800 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Counselling Partner
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Get personalized college and course recommendations based on
              your profile, interests, location and budget.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm md:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 text-violet-700">
              <Sparkles size={25} />
            </div>
            <div>
              <p className="font-bold">Your future starts here</p>
              <p className="mt-1 text-sm text-slate-500">
                Smart guidance, made personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-4 px-4 pb-8 pt-5 sm:px-6 lg:grid-cols-[285px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        {/* Left sidebar */}
        <aside className="rounded-2xl border border-white bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-extrabold">
                Your Counselling Journey
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Complete a few simple steps to get the best recommendations.
              </p>
            </div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-lg p-1 hover:bg-violet-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Your progress</span>
              <span className="font-bold text-violet-800">
                {Math.min(activeStep + 1, 5)} of 5
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-800 to-pink-500 transition-all duration-500"
                style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-7 space-y-1">
            {steps.map((step, index) => {
              const completed = index < activeStep;
              const active = index === activeStep;

              return (
                <button
                  key={step.title}
                  onClick={() => {
                    setActiveStep(index);
                    if (index === 0) setQuestionIndex(0);
                    else if (index === 1) setQuestionIndex(2);
                    else if (index === 2) setQuestionIndex(4);
                    else if (index === 3) setQuestionIndex(5);
                    else setShowRecommendations(true);
                  }}
                  className="group flex w-full gap-3 rounded-xl p-2 text-left transition hover:bg-violet-50/80"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition ${
                        completed
                          ? "border-violet-800 bg-violet-800 text-white"
                          : active
                            ? "border-violet-700 bg-violet-100 text-violet-800 ring-4 ring-violet-50"
                            : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {completed ? <Check size={17} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`my-1 min-h-6 w-px flex-1 ${
                          completed ? "bg-violet-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>

                  <div className="pb-3 pt-1">
                    <p
                      className={`text-sm font-bold ${
                        active ? "text-violet-800" : "text-slate-800"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-violet-800" size={27} />
              <p className="font-bold">Not sure?</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Let our AI guide you step by step. You don't need to know
              everything yet.
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={21} className="text-amber-500" />
              <p className="text-sm font-bold">Helpful tip</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Answer honestly for more relevant recommendations. You can skip
              any question and return later.
            </p>
          </div>
        </aside>

        {/* Center chat */}
        <section className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 text-violet-800">
                <Bot size={26} />
              </div>
              <div>
                <h2 className="font-extrabold">AdmissionEra AI</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Your personal college counsellor
                </p>
              </div>
            </div>

            <button
              onClick={startOver}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:text-violet-800"
            >
              Start over
            </button>
          </div>

          <div className="flex min-h-[560px] flex-1 flex-col p-4 sm:p-6">
            <div className="mb-6 flex justify-center">
              <span className="rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5 text-xs text-slate-500">
                Today
              </span>
            </div>

            {/* Welcome message */}
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-violet-800">
                <Bot size={24} />
              </div>
              <div className="max-w-[90%]">
                <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
                  <p className="text-sm font-bold leading-6">
                    Hi! I'm your AdmissionEra AI counsellor. 👋
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    I'll help you find the best colleges and courses based on
                    your marks, interests, location and budget.
                  </p>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Just now
                </p>
              </div>
            </div>

            {/* Conversation history */}
            <div className="space-y-4">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 ${
                    item.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {item.sender === "bot" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-800">
                      <Bot size={21} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "user"
                        ? "rounded-br-sm bg-gradient-to-r from-violet-700 to-purple-600 text-white"
                        : "rounded-tl-sm bg-slate-50 text-slate-800"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Current question */}
            {!showRecommendations && currentQuestion && (
              <div className="mt-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-violet-800">
                    <Bot size={21} />
                  </div>
                  <div>
                    <div className="rounded-2xl rounded-tl-sm bg-violet-50/80 px-4 py-3">
                      <p className="text-sm font-semibold leading-6">
                        {currentQuestion.text}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      AdmissionEra AI · Just now
                    </p>
                  </div>
                </div>

                <div className="ml-0 grid grid-cols-2 gap-2 sm:ml-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  {currentQuestion.options.map((option) => {
                    const selected =
                      (questionIndex === 0 && studyLevel === option) ||
                      (questionIndex === 1 && stream === option) ||
                      (questionIndex === 2 && course === option) ||
                      (questionIndex === 3 && specialization === option) ||
                      (questionIndex === 4 && location === option) ||
                      (questionIndex === 5 && budget === option);

                    return (
                      <button
                        key={option}
                        onClick={() => chooseOption(option)}
                        className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition duration-200 ${
                          selected
                            ? "border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-100"
                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-400 hover:bg-violet-50"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span>{option}</span>
                          {selected && <Check size={16} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {questionIndex === 2 && (
                  <div className="ml-0 mt-3 sm:ml-12">
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Or enter a course of your choice
                    </label>
                    <input
                      value={course}
                      onChange={(event) => setCourse(event.target.value)}
                      placeholder="e.g. B.Des, B.Pharm..."
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                    <button
                      onClick={() => {
                        if (course.trim()) chooseOption(course.trim());
                      }}
                      className="mt-2 rounded-lg bg-violet-800 px-4 py-2 text-xs font-bold text-white hover:bg-violet-900"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {questionIndex === 6 && (
                  <div className="ml-0 mt-3 sm:ml-12">
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Enter your exact percentage (optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={marks}
                        onChange={(event) => setMarks(event.target.value)}
                        placeholder="e.g. 78%"
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                      />
                      <button
                        onClick={() => chooseOption(marks || "Not provided")}
                        className="rounded-xl bg-violet-800 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recommendation completion */}
            {showRecommendations && (
              <div className="mt-5 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-pink-50 p-5 sm:p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                  <Sparkles size={25} />
                </div>
                <h3 className="text-xl font-extrabold">
                  Your counselling profile is ready!
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your preferences have been collected. Connect this page to
                  your college database and recommendation API to find matching
                  universities and courses.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[course, location, budget].filter(Boolean).map((value) => (
                    <span
                      key={value}
                      className="rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-800"
                    >
                      {value}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowPreferences(true);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-800 to-purple-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
                >
                  Review my profile <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50"
            >
              <button
                type="button"
                aria-label="Attach file"
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-700"
              >
                <Paperclip size={19} />
              </button>

              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your answer or ask a question..."
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-800 to-purple-600 text-white shadow-md transition hover:scale-105"
              >
                <Send size={18} />
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px]">
                  i
                </span>
                You can skip a question or change your answers later.
              </p>

              {!showRecommendations && (
                <button
                  onClick={skipQuestion}
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-pink-600"
                >
                  Skip question <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="space-y-4 lg:col-span-2 xl:col-span-1">
          <section className="rounded-2xl border border-white bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-extrabold">Your Preferences</h2>
              <button
                onClick={() => setShowPreferences(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-xs font-bold text-violet-800 hover:bg-violet-100"
              >
                <Pencil size={13} /> Edit
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Your profile updates as we chat.
            </p>

            <div className="mt-4 divide-y divide-slate-100">
              {preferences.map((preference, index) => {
                const Icon = preference.icon;
                const completed = preference.value !== "Not selected";

                return (
                  <button
                    key={preference.label}
                    onClick={() => setShowPreferences(true)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${preferenceIconClasses[index]}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{preference.label}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {preference.value}
                      </p>
                    </div>
                    {completed ? (
                      <Check
                        size={17}
                        className="shrink-0 text-emerald-500"
                      />
                    ) : (
                      <ChevronRight
                        size={17}
                        className="shrink-0 text-slate-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-white bg-gradient-to-br from-[#fff0fa] via-[#f5efff] to-[#eaeaff] p-5 shadow-sm">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-300/30 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles size={23} className="text-pink-600" />
                <h3 className="font-extrabold">Why Students Love AI</h3>
              </div>

              <ul className="mt-5 space-y-3">
                {[
                  "Personalized college recommendations",
                  "Compare colleges side by side",
                  "Courses, fees & eligibility info",
                  "Find options within your budget",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-pink-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/80 bg-white/60 p-3">
                <div>
                  <p className="text-sm font-bold">Ready to explore?</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your next step starts here.
                  </p>
                </div>
                <GraduationCap
                  size={36}
                  className="shrink-0 text-violet-800"
                />
              </div>
            </div>
          </section>

          <button
            onClick={() => setShowPreferences(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-50"
          >
            <MessageCircle size={17} />
            Review counselling profile
          </button>
        </aside>
      </section>

      {/* Preferences modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setShowPreferences(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preferences-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="preferences-title"
                  className="text-xl font-extrabold"
                >
                  Your Counselling Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review your answers.
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                aria-label="Close"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Education level
                </label>
                <select
                  value={studyLevel}
                  onChange={(event) => setStudyLevel(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select study level</option>
                  {educationOptions.map((option) => (
                    <option key={option.label}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Stream
                </label>
                <select
                  value={stream}
                  onChange={(event) => setStream(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select stream</option>
                  {streamOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Course
                </label>
                <input
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  placeholder="e.g. B.Tech, BBA, MBA"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Specialization
                </label>
                <input
                  value={specialization}
                  onChange={(event) => setSpecialization(event.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Preferred location
                </label>
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Total budget
                </label>
                <select
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select your budget</option>
                  {budgetOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Academic marks
                </label>
                <input
                  value={marks}
                  onChange={(event) => setMarks(event.target.value)}
                  placeholder="e.g. 78%"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Entrance exam
                </label>
                <input
                  value={entranceExam}
                  onChange={(event) => setEntranceExam(event.target.value)}
                  placeholder="e.g. JEE, CUET, NEET"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  University type
                </label>
                <select
                  value={universityType}
                  onChange={(event) => setUniversityType(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select university type</option>
                  <option>Government</option>
                  <option>Private</option>
                  <option>Deemed university</option>
                  <option>Any suitable university</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Hostel required?
                </label>
                <select
                  value={hostel}
                  onChange={(event) => setHostel(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500"
                >
                  <option value="">Select preference</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Maybe</option>
                </select>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-800 to-purple-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 hover:opacity-95"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
