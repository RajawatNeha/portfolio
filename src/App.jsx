import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Data objects for cleaner code
const portfolioData = {
  navLinks: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
  projects: [
    {
      title: "AI Based Health Detection & Prediction",
      description: "Machine learning model to detect health conditions from symptoms with Flask / Streamlit / Tkinter.",
      tags: [
        { label: "ML", color: "indigo" },
        { label: "Flask", color: "blue" },
        { label: "Streamlit", color: "fuchsia" },
      ],
    },
    {
      title: "Shopping‑Cart App",
      description: "ReactJS + Redux app with TailwindCSS for dynamic cart management and real‑time updates.",
      tags: [
        { label: "React", color: "sky" },
        { label: "Redux", color: "emerald" },
        { label: "Tailwind", color: "violet" },
      ],
    },
    {
      title: "Collaboration Tool",
      description: "Real‑time group chat, file sharing, and task management with authentication & access control.",
      tags: [
        { label: "Realtime", color: "amber" },
        { label: "Auth", color: "pink" },
      ],
    },
    {
      title: "3D Maze Game",
      description: "Unity + C# game with interactive levels and time challenges for an engaging user experience.",
      tags: [
        { label: "Unity", color: "indigo" },
        { label: "C#", color: "slate" },
      ],
    },
  ],
  skills: [
    { name: "HTML / CSS", category: "Core" },
    { name: "Python", category: "Backend / ML" },
    { name: "Java", category: "OOP" },
    { name: "C / C++", category: "Systems" },
    { name: "AWS", category: "Cloud" },
    { name: "Unity", category: "Game Dev" },
  ],
  skillTags: [
    "Problem-solving",
    "Full-stack",
    "Machine Learning",
    "Game Design",
  ],
  contactInfo: [
    {
      icon: "email-icon.svg",
      text: "nrajawat50@gmail.com",
      href: "mailto:nrajawat50@gmail.com",
    },
    {
      icon: "phone-icon.svg",
      text: "+1 (123) 456-7890",
      href: null,
    },
    {
      icon: "linkedin-icon.svg",
      text: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/yourprofile",
    },
  ],
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const nameText = "NEHA RAJAWAT";
  const [revealedLetters, setRevealedLetters] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Initialize AOS and handle scroll-based section highlighting
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: "ease-out-cubic",
    });

    const sections = document.querySelectorAll("section[id]");
    const linkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((s) => linkObserver.observe(s));

    return () => {
      linkObserver.disconnect();
    };
  }, []);

  // Handle the name reveal effect using a more declarative approach
  useEffect(() => {
    const letters = [...nameText].map((ch, i) => {
      let className = "letter text-gradient";
      let style = { transitionDelay: `${i * 80}ms` };

      if (ch === " ") {
        style = { ...style, width: "16px", color: "inherit" };
      } else if (i < 4) {
        style = { ...style, color: "#F54927" };
      }

      return { char: ch, className, style };
    });

    setRevealedLetters(letters);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-blue-500 z-[60]" />

      {/* Header */}
      <header className="sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between glass rounded-b-2xl border border-white/10">
          <a href="#home" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-content-center font-bold ring-soft">
              NR
            </div>
            <span className="text-lg font-semibold">Neha Rajawat</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img
              src="icons/menu-icon.svg"
              alt="Menu"
              className="h-6 w-6 text-slate-300"
            />
          </button>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {portfolioData.navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={`nav-link hover:text-indigo-600 transition-colors ${
                    activeSection === link.id ? "active text-indigo-600" : ""
                  }`}
                  href={`#${link.id}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div
          id="mobileMenu"
          className={`md:hidden px-6 pt-2 pb-6 glass border-t border-white/10 ${
            isMenuOpen ? "" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {portfolioData.navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="nav-link block py-1"
                  href={`#${link.id}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Hero section */}
      <section id="home" className="relative overflow-hidden">
        <div className="blobs absolute inset-0"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-40 text-center">
          <p
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs md:text-sm glass border border-white/10"
            data-aos="fade-down"
          >
            <span className="i-dot h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Aspiring Software Engineer
          </p>

          <h1
            id="nameReveal"
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span className="sr-only">Neha Rajawat</span>
            {revealedLetters.map((letter, index) => (
              <span
                key={index}
                className={`letter text-gradient revealed`}
                style={letter.style}
              >
                {letter.char}
              </span>
            ))}
          </h1>

          <p
            className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-slate-300"
            data-aos="fade-up"
          >
            B.E. in Computer Science with AI • Passionate about building impactful
            solutions.
          </p>

          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-2xl z-10 bg-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto text-center scroll-link"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-2xl border z-10 border-slate-700 hover:bg-slate-800 transition font-semibold w-full sm:w-auto text-center scroll-link"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="relative py-20 md:py-28 bg-black/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center">
          <div
            className="flex flex-col items-center"
            data-aos="fade-right"
          >
            <div className="rounded-full overflow-hidden shadow-lg border-4 border-indigo-500 w-48 h-48 md:w-64 md:h-64">
              <img
                src="./profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-4 px-4 py-1 bg-indigo-500 text-white rounded-full">
              Computer Science
            </span>
          </div>
          <div
            className="max-w-xl px-4 md:px-0"
            data-aos="fade-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              About <span className="text-indigo-500">Me</span>
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-300">
              I'm a Computer Science with AI student at Greater Noida Institute of
              Technology, graduating in June 2026. I enjoy solving real-world
              problems using modern technologies and have experience in full-stack
              development, machine learning, and game design.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-2">
                <img
                  src="icons/education-icon.svg"
                  alt="Education"
                  className="h-5 w-5 mt-0.5 text-indigo-500"
                />
                <div>
                  <strong>Education</strong>
                  <br />
                  B.E. Computer Science with AI
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="icons/experience-icon.svg"
                  alt="Experience"
                  className="h-5 w-5 mt-0.5 text-indigo-500"
                />
                <div>
                  <strong>Experience</strong>
                  <br />
                  2+ Years Coding
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="icons/location-icon.svg"
                  alt="Location"
                  className="h-5 w-5 mt-0.5 text-indigo-500"
                />
                <div>
                  <strong>Location</strong>
                  <br />
                  Greater Noida, India
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="icons/email-icon.svg"
                  alt="Email"
                  className="h-5 w-5 mt-0.5 text-indigo-500"
                />
                <div>
                  <strong>Email</strong>
                  <br />
                  nrajawat50@gmail.com
                </div>
              </div>
            </div>
            <a
              href="cv.pdf"
              download
              className="mt-6 inline-block px-6 py-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition"
            >
              <img
                src="icons/download-icon.svg"
                alt="Download"
                className="h-4 w-4 inline mr-1"
              />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section id="projects" className="relative py-20 md:py-28 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between gap-4 px-2"
            data-aos="fade-down"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
            <span className="text-xs uppercase tracking-widest text-slate-500">
              Selected Work
            </span>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6 lg:gap-8">
            {portfolioData.projects.map((project, index) => (
              <article
                key={index}
                className="card glass border border-white/10 p-6 rounded-2xl"
                data-aos="fade-up"
              >
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="mt-2 text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full bg-${tag.color}-500/20 text-${tag.color}-200`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section id="skills" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold" data-aos="fade-down">Skills</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={index}
                className="glass border border-white/10 p-5 rounded-2xl"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-xs text-slate-500">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {portfolioData.skillTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs glass border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section
        id="contact"
        className="relative py-20 md:py-28 bg-gradient-to-b from-transparent to-slate-900/60"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" data-aos="fade-down">Contact Me</h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-base text-slate-300"
            data-aos="fade-up"
          >
            Let's connect and work on something amazing together!
          </p>

          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            data-aos="zoom-in"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/30 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto text-center scroll-link"
            >
              View Projects
            </a>
          </div>

          <div
            className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 px-4"
            data-aos="fade-up"
          >
            {portfolioData.contactInfo.map((info, index) =>
              info.href ? (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : "_self"}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : ""}
                  className="flex items-center justify-center sm:justify-start gap-2 text-slate-300 hover:text-white transition"
                >
                  <img
                    src={`icons/${info.icon}`}
                    alt={info.text}
                    className="h-6 w-6"
                  />
                  {info.text}
                </a>
              ) : (
                <div
                  key={index}
                  className="flex items-center justify-center sm:justify-start gap-2 text-slate-300"
                >
                  <img
                    src={`icons/${info.icon}`}
                    alt={info.text}
                    className="h-6 w-6"
                  />
                  {info.text}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-slate-500 border-t border-slate-800">
        <p>
          © 2025 <span className="font-semibold">Neha Rajawat</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}