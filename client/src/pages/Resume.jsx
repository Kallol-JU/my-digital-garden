// src/pages/Resume.jsx
const PDF_URL = "/Kallol_resume.pdf";

const links = [
  { label: "email", href: "mailto:mukherjeekallol42@gmail.com" },
  { label: "kall0l.me", href: "https://kall0l.me" },
  { label: "github", href: "https://github.com/Kallol-JU" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/kallol-mukherjee-444124389/",
  },
  { label: "@KallolM69942175", href: "https://x.com/KallolM69942175" },
];

// Fill in `github` / `live` with your real repo + deployment URLs.
// Links with an empty string are hidden automatically.
const projects = [
  {
    name: "WeatherGPT",
    stack:
      "React, Node.js, Express.js, MongoDB, Socket.IO, Gemini AI, Twilio, MapTiler, OpenWeather API",
    github: "",
    live: "",
    points: [
      "An AI-powered weather forecasting and disaster management platform for smart city monitoring and climate analytics.",
      "Real-time alerts through Twilio SMS and Web Push, synced with OpenWeather and MapTiler reverse geocoding.",
      "Gemini Flash powers localized climate insights, with voice interaction for rural, low-connectivity access.",
      "MERN backend with Socket.IO streaming live meteorological data.",
    ],
  },
  {
    name: "Finder",
    stack: "HTML, CSS, JavaScript, MongoDB, EJS, Node.js, Cloudinary",
    github: "",
    live: "",
    points: [
      "A full-stack hotel and resort platform with booking, reviews, ratings and property management.",
      "MVC architecture with scalable routing and server-side rendering.",
      "Cloudinary for image uploads and MapTiler for interactive maps.",
    ],
  },
  {
    name: "Collab-on-Canvas",
    stack:
      "React, Tailwind CSS, HTML5 Canvas, Node.js, Express.js, Socket.IO, Vite",
    github: "",
    live: "",
    points: [
      "A real-time collaborative whiteboard with private solo drawing and room-based multi-user sessions.",
      "Canvas drawing with colors, brush controls, eraser and image download.",
      "Socket.IO room management, live drawing sync and canvas history sync, deployed on Render.",
    ],
  },
];

const skills = [
  ["Languages", "C/C++, Java, JavaScript, SQL, NoSQL, HTML/CSS"],
  ["Frameworks", "React, Node.js, Express.js, Socket.IO, Tailwind CSS"],
  ["Databases & cloud", "MongoDB, Cloudinary"],
  ["Tools", "Git, GitHub, VS Code, Figma, Linux/Unix"],
  [
    "Core areas",
    "Data Structures & Algorithms, Full-Stack Web Development, Competitive Programming",
  ],
];

const achievements = [
  "Solved 100+ problems on LeetCode and Codeforces",
  "GMR 167 in JELET, 99 percentile (top 0.596%)",
  "1st place at the NCP-ROBO competition",
];

const certifications = [
  "DELTA Web Developer Bootcamp 2025",
  "ALPHA Competitive Programmer Bootcamp 2026",
  "NPTEL Soft Skill Development",
  "NPTEL Database Management System",
  "Udemy: Mastering Data Structures and Algorithms using C and C++ (Abdul Bari)",
];

const linkCls =
  "underline decoration-gray-300 underline-offset-2 hover:decoration-gray-700 hover:text-gray-900 transition-colors";

function Section({ title, children }) {
  return (
    <section className="py-6 border-t border-gray-100 first:border-t-0 first:pt-0">
      <h2 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Resume() {
  return (
    <div className="animate-fade-in max-w-2xl pt-12 pb-20">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Resume</h1>
          <p className="text-sm text-gray-500">
            Resumes are useless... I'd rather tell you my story.
          </p>
        </div>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="shrink-0 text-xs text-blue-600 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors"
        >
          Download PDF
        </a>
      </div>

      {/* Resume card */}
      <article className="border border-gray-200 rounded-lg bg-white/60 px-6 sm:px-9 py-8 text-[14px] leading-relaxed text-gray-700">
        {/* Identity */}
        <header className="pb-6">
          <h2 className="text-xl font-bold text-gray-900">Kallol Mukherjee</h2>
          <p className="text-gray-500 mt-1">
            I work somewhere between design, engineering, and figuring out how
            people should actually interact with intelligent systems.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[13px] text-gray-500">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={linkCls}
              >
                {l.label}
              </a>
            ))}
          </div>
        </header>

        <Section title="Education">
          <div className="flex justify-between gap-4">
            <p className="text-gray-900 font-semibold">
              B.E. in Computer Science and Engineering
            </p>
            <span className="text-gray-500 shrink-0">May 2027</span>
          </div>
          <p className="text-gray-500">CGPA 9.67</p>
        </Section>

        <Section title="Experience">
          <div className="flex justify-between gap-4">
            <p className="text-gray-900 font-semibold">
              AI Web Developer Intern, InAmigos Foundation
            </p>
            <span className="text-gray-500 shrink-0">Jun – Aug 2026</span>
          </div>
          <p className="text-gray-500 mb-2">Remote</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            <li>
              Built responsive React.js interfaces that work well across
              devices.
            </li>
            <li>
              Integrated the Google Gemini API for an AI recommendation feature
              that generates personalized reasons to choose InAmigos.
            </li>
            <li>
              Added user interaction tracking to understand engagement and
              improve the site.
            </li>
            <li>
              Found and fixed frontend bugs, UI inconsistencies and usability
              issues.
            </li>
          </ul>
        </Section>

        <Section title="Projects">
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline gap-3">
                  <p className="text-gray-900 font-semibold">{p.name}</p>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[13px] text-gray-500 ${linkCls}`}
                    >
                      github
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[13px] text-gray-500 ${linkCls}`}
                    >
                      live
                    </a>
                  )}
                </div>
                <p className="text-[13px] text-gray-400 mb-2">{p.stack}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <dl className="space-y-1.5">
            {skills.map(([k, v]) => (
              <div key={k} className="sm:flex gap-3">
                <dt className="text-gray-900 font-semibold sm:w-36 shrink-0">
                  {k}
                </dt>
                <dd className="text-gray-600">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Achievements">
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            {achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>

        <Section title="Certifications">
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}
