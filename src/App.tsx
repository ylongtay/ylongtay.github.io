import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, Github, Linkedin, ArrowDown, Mail, Home, Wrench, Folder, Briefcase, GraduationCap, Phone } from "lucide-react";

const SpiderIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v8" strokeDasharray="2 2" />
    <circle cx="12" cy="14" r="2" fill="currentColor" />
    <circle cx="12" cy="11" r="1" fill="currentColor" />
    <path d="M10 11L6 9" />
    <path d="M10 13L5 13" />
    <path d="M10 15L7 18" />
    <path d="M14 11L18 9" />
    <path d="M14 13L19 13" />
    <path d="M14 15L17 18" />
  </svg>
);

const WebTrail = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const points = React.useRef<{x: number, y: number, age: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const lastPoint = points.current[points.current.length - 1];
      if (lastPoint && lastPoint.age < 5) {
        const dx = clientX - lastPoint.x;
        const dy = clientY - lastPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.floor(dist / 10));
        for (let i = 1; i <= steps; i++) {
          points.current.push({
            x: lastPoint.x + (dx * i) / steps,
            y: lastPoint.y + (dy * i) / steps,
            age: 0
          });
        }
      } else {
        points.current.push({ x: clientX, y: clientY, age: 0 });
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      points.current = points.current.filter(p => p.age < 40);
      points.current.forEach(p => p.age += 1);

      for (let i = 0; i < points.current.length - 1; i++) {
        const p1 = points.current[i];
        const p2 = points.current[i + 1];
        const opacity = 1 - (p1.age / 40);
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (i % 8 === 0) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(125, 211, 252, ${opacity * 0.4})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchstart', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

// --- Data ---
const personalInfo = {
  name: "Yong Long",
  headline: "Software Engineer",
  subHeadline: "Mid career shifter looking into software development entry roles. Highly motivated to learn, grow and excel in the IT industry.",
  email: "yonglong88@live.com",
  phone: "+65 9009 9746",
  github: "https://github.com/ylongtay",
  linkedin: "https://linkedin.com/in/yonglongtay",
};

const technicalSkills = [
  { category: "Languages", items: "Java, Python" },
  { category: "Frameworks", items: "Node.js, React, TailwindCSS, Spring Boot, Maven" },
  { category: "Databases", items: "MySQL, PostgreSQL" },
  { category: "Tools & Platforms", items: "Git, Docker, Jira, Visual Studio, Eclipse" },
  { category: "Operating Systems", items: "Windows, Linux (Ubuntu)" },
  { category: "Methodologies", items: "SDLC, Agile" }
];

const otherSkills = [
  "Government Services", "Health Domain", "Security Hardening", "RBAC", "2FA", "RCA"
];

const experience = [
  {
    title: "Software Engineer",
    company: "ST Engineering",
    period: "Nov 2024 - Present",
    description: [
      "Built, tested, and deployed applications on custom hardware platforms using Java, SQL, local server repositories, and emulators.",
      "Integrated software with hardware systems and conducted end-to-end testing to ensure system reliability and performance.",
      "Investigated, analysed and resolved complex software issues; produced clear root-cause analysis (RCA) reports for defects and incidents.",
      "Created technical documentation including user guides, test plans, and troubleshooting references.",
      "Participated in team routines such as release planning, daily stand-ups, and retrospectives to support on-time delivery.",
      "Learnt and applied secure coding principles to reduce vulnerabilities and improve system robustness.",
      "Implemented role-based access control (RBAC) and two-factor authentication (2FA) to enforce strict data access policies for work environments.",
      "Contributed to system and database hardening scripts in alignment with security benchmarks defined by MSD.",
      "PIC for routine antivirus update under Symantec Endpoint Protection Manager and windows patching to ensure security compliance across the team.",
      "Maintained audit logs and security documentation to support internal and external compliance reviews.",
      "Supported deployment and testing activities during 2025 mission exercise in Rockhampton, Australia."
    ]
  },
  {
    title: "Application Specialist",
    company: "Sysmex Asia Pacific",
    period: "Nov 2018 - Oct 2024",
    description: [
      "Coordinated and performed validation of analyzers ensuring timely completion of new healthcare system installations within a week for at least 3 sites a year.",
      "Provide installation, administration and support for healthcare application systems in laboratories and hospitals. Assist in testing of new system functionalities and integrations to meet evolving lab needs.",
      "Troubleshoot and analyzed 100 plus cases (for 8 different analyzing platforms) monthly across the APAC region. This root-cause analysis effectively promotes every region to achieve a remarkable 95% issues resolution within the targeted duration.",
      "Maintained 90% customer satisfaction rate by responding to enquires within 2 hours and swiftly resolved issues affecting operation.",
      "Boosted user proficiency by conducting operator trainings and constantly educate user on user-related issues. Contributing to a smoother workflow and significant reduction of service calls related to malpractices.",
      "Implement proactive measures to optimize system performance, such as fine-tuning configurations, improving data processing setup, and monitoring resource utilization.",
      "Created training materials and conducting online training for 5 different analyzers to significantly reduce the cost needed for training affiliates in person. Trained and certified affiliates across 4 regions.",
      "Manage vendor relationships and service level agreements to ensure delivery of expected services and support.",
      "Evaluate system upgrades and recommend improvements.",
      "Train other regional affiliates ensuring their competency for handling issues and application workflows."
    ]
  },
  {
    title: "Medical Technologist",
    company: "Covance Asia",
    period: "Oct 2014 - Oct 2018",
    description: [
      "Perform a wide range of laboratory tests and procedures accurately and efficiently.",
      "Adhere to established protocols, procedures, and safety guidelines while handling specimens and operating laboratory equipment.",
      "Analyze and interpret test results, ensuring accuracy and attention to detail.",
      "Maintain and calibrate laboratory equipment to ensure proper functioning and accuracy of results.",
      "Monitor inventory levels of laboratory supplies and reagents, and order replacements as needed.",
      "Ensure compliance with regulatory standards and quality control measures in the laboratory.",
      "Document and maintain accurate records of test results, procedures performed, and patient information.",
      "Efficiently trained 5 new hires on med tech duties and responsibility including instrument QC, reagents preparation, surface and intracellular staining, equipment maintenance, inventory upkeep, etc.",
      "Troubleshoot and solved operational issues faced by juniors.",
      "Contribute to a collaborative and supportive team environment, assisting colleagues when needed and promoting effective communication and teamwork.",
      "Proficiently performed 8 assays and processed 15 samples within a day in less than three months.",
      "Actively involved in the pre-and post-move assay validation for lab relocation, where all 37 assays were performed within two weeks prior to the move."
    ]
  }
];

const projects = [
  {
    title: "Mission Software Services",
    description: "Collaborative development of a distributed software suite supporting large-scale mission operations in ST Engineering.",
    tag: "ST Engineering",
    link: "https://www.digitalforlife.gov.sg/about/our-partners/st-engineering"
  },
  {
    title: "ParkWhere",
    description: "A carpark availability web tracker helping users find parking spaces in HDB and commercial areas, with a focus on Ang Mo Kio data.",
    tag: "NTU SCTP",
    link: "https://github.com/ylongtay/ParkWhere"
  },
  {
    title: "Review Room",
    description: "A smart inventory management system for retail stores — streamlining stock tracking and review workflows.",
    tag: "NTU SCTP",
    link: "https://github.com/ylongtay/TheReviewRoom"
  },
  {
    title: "Escape Ball",
    description: "A lightweight mobile-based game developed using the React Native framework — focused on responsive UI and smooth gameplay mechanics.",
    tag: "Mobile",
    link: "https://github.com/ylongtay/EscapeBall"
  }
];

const education = [
  {
    period: "Nov 2023 — Jun 2024",
    school: "Nanyang Technological University",
    degree: "Skills Future Career Transition Programme — Software Engineering",
  },
  {
    period: "Sep 2010 — May 2014",
    school: "Nanyang Technological University",
    degree: "B.Sc. Biological Sciences (Hons)",
    gpa: "GPA 3.97 / 5"
  },
  {
    period: "May 2005 — May 2008",
    school: "Ngee Ann Polytechnic",
    degree: "Diploma in Biotechnology",
    gpa: "GPA 3.54 / 4"
  }
];

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'work', label: 'Projects', icon: Folder },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -40% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-white/20 font-sans">
      <WebTrail />
      <div className="bg-pixel"></div>

      {/* Subtle Spider-Sense Background Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(226,54,54,0.03)_0%,rgba(11,132,238,0.03)_30%,transparent_60%)] pointer-events-none z-0"
      />

      {/* Top Bar with Web Swing Animation */}
      <motion.div 
        initial={{ rotate: 15, y: -50, opacity: 0 }}
        animate={{ rotate: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 60, duration: 1.5 }}
        style={{ transformOrigin: "top center" }}
        className="absolute top-8 left-0 w-full px-6 md:px-12 flex justify-center items-center z-40"
      >
        {/* Web Line */}
        <div className="absolute top-[-32px] left-1/2 w-[1px] h-8 bg-white/20 origin-top" />
        
        <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md relative">
          {/* Left side: Monogram */}
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#030a16] text-xs font-bold tracking-tighter">
            TYL
          </div>
          {/* Right side: Text + Blinking Cursor */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-white/80">
            Available for hire
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="inline-block w-1.5 h-3.5 bg-white/80 translate-y-[1px]"
            />
          </div>
        </div>
      </motion.div>

      <main className="container-narrow flex flex-col gap-8 pb-32">
        {/* Home Section */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-20 px-6 md:px-12">
          <FadeIn className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 text-white/70 mb-6 text-sm">
              <MapPin size={16} /> Singapore
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-white leading-[1.1] mb-6 tracking-tight glitch-hover">
              Hi, I'm <span className="font-serif">{personalInfo.name}</span><br />
              <span className="font-serif italic text-white/90">{personalInfo.headline}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
              {personalInfo.subHeadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(226,54,54,0.4)" }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${personalInfo.email}`} 
                className="px-6 py-3 rounded-full bg-white text-[#030a16] font-medium flex items-center gap-2 transition-colors"
              >
                <Calendar size={18} /> Get in touch
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 2, 0], boxShadow: "0 0 20px rgba(11,132,238,0.3)" }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.linkedin} target="_blank" rel="noreferrer" 
                className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium flex items-center gap-2 transition-colors bg-[#0a1326]/50 backdrop-blur-sm"
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 2, 0], boxShadow: "0 0 20px rgba(226,54,54,0.3)" }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.github} target="_blank" rel="noreferrer" 
                className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium flex items-center gap-2 transition-colors bg-[#0a1326]/50 backdrop-blur-sm"
              >
                <Github size={18} /> GitHub
              </motion.a>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-24 flex items-center justify-center gap-3 text-white/50 text-xs font-medium uppercase tracking-widest"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <SpiderIcon size={20} />
              </motion.div>
              Scroll to explore
            </motion.div>
          </FadeIn>
        </section>

        {/* Tools & Technologies Section */}
        <section id="tools" className="py-20 px-6 md:px-12 rounded-[2.5rem] bg-[#0a1326] border border-white/5">
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-[1px] bg-gradient-to-r from-transparent to-[#7dd3fc]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#7dd3fc]"></div>
                </div>
                <h2 className="text-sm font-medium text-[#7dd3fc] uppercase tracking-widest">Technical Skills</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight glitch-hover">Tools & Technologies</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.map((skill, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-xs font-medium text-[#7dd3fc] uppercase tracking-widest mb-3">{skill.category}</h4>
                  <p className="text-white/80 leading-relaxed text-sm">{skill.items}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {otherSkills.map((skill, i) => (
                <span key={i} className="px-4 py-2 text-xs text-white/60 rounded-full border border-white/10 bg-transparent hover:text-white hover:border-white/30 transition-colors font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Work Section */}
        <section id="work" className="py-20 px-6 md:px-12">
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-[1px] bg-gradient-to-r from-transparent to-[#7dd3fc]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#7dd3fc]"></div>
                </div>
                <h2 className="text-sm font-medium text-[#7dd3fc] uppercase tracking-widest">Portfolio</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight glitch-hover">Projects I've Worked On</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <a href={proj.link} key={i} className="block p-8 rounded-3xl border border-white/10 bg-[#0a1326]/40 hover:bg-[#111a33]/80 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(226,54,54,0.15),0_0_40px_rgba(11,132,238,0.15)] transition-all duration-300 group relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-xs font-mono text-[#7dd3fc] tracking-widest uppercase mb-6 opacity-80 pr-10">
                      {String(i + 1).padStart(2, '0')} / {proj.tag}
                    </div>
                    <h4 className="text-2xl font-serif text-white mb-4 pr-8 group-hover:-translate-y-1 transition-transform duration-300">{proj.title}</h4>
                    <p className="text-white/70 leading-relaxed text-sm mb-6 flex-grow">{proj.description}</p>
                    
                    <div className="absolute top-0 right-0 text-[#7dd3fc] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 md:px-12 rounded-[2.5rem] bg-[#0a1326] border border-white/5">
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-[1px] bg-gradient-to-r from-transparent to-[#7dd3fc]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#7dd3fc]"></div>
                </div>
                <h2 className="text-sm font-medium text-[#7dd3fc] uppercase tracking-widest">Career</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight glitch-hover">Work Experience</h3>
            </div>
            
            <div className="flex flex-col gap-12">
              {experience.map((exp, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-6 md:gap-12 ${i !== experience.length - 1 ? 'pb-12 border-b border-white/5' : ''}`}>
                  <div className="md:w-1/3 shrink-0">
                    <div className="text-xs text-white/50 font-mono mb-2 tracking-widest uppercase">{exp.period.replace('-', '—')}</div>
                    <div className="text-base font-semibold text-[#7dd3fc] tracking-wide">{exp.company}</div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-2xl font-serif text-white mb-6">{exp.title === "Medical Technologist" ? "Medical Technologist — Flow Cytometry" : exp.title}</h4>
                    <ul className="space-y-4 text-white/70 leading-relaxed text-sm">
                      {exp.description.map((desc, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-[#7dd3fc]/50 mt-1 text-xs">✦</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6 md:px-12">
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-[1px] bg-gradient-to-r from-transparent to-[#7dd3fc]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#7dd3fc]"></div>
                </div>
                <h2 className="text-sm font-medium text-[#7dd3fc] uppercase tracking-widest">Background</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight glitch-hover">Education</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {education.map((edu, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/10 bg-[#0a1326]/40 hover:bg-[#111a33]/80 transition-colors flex flex-col h-full">
                  <div className="text-xs font-mono text-white/50 tracking-widest uppercase mb-6">
                    {edu.period}
                  </div>
                  <h4 className="text-xl font-serif text-white mb-3 leading-tight">{edu.school}</h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">{edu.degree}</p>
                  {edu.gpa && (
                    <div className="text-xs font-mono text-[#7dd3fc] tracking-widest uppercase mt-auto">
                      {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="w-full py-20 mt-12 border-t border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <FadeIn className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 glitch-continuous glitch-hover">Let's build something together.</h2>
            <p className="text-white/50 text-base md:text-lg mb-10 max-w-md">I'm always open to new opportunities.</p>
            <div className="flex items-center justify-center gap-8 mt-4">
              <motion.a 
                href={`mailto:${personalInfo.email}`} 
                className="text-white/60 hover:text-[#e23636] transition-colors relative group" 
                aria-label="Email"
                whileHover={{ rotate: [0, 20, -15, 10, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              >
                <div className="absolute -top-8 left-1/2 w-[1px] h-8 bg-white/20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <Mail size={24} className="relative z-10" />
              </motion.a>
              <motion.a 
                href={personalInfo.linkedin} target="_blank" rel="noreferrer" 
                className="text-white/60 hover:text-[#0b84ee] transition-colors relative group" 
                aria-label="LinkedIn"
                whileHover={{ rotate: [0, -20, 15, -10, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              >
                <div className="absolute -top-8 left-1/2 w-[1px] h-8 bg-white/20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <Linkedin size={24} className="relative z-10" />
              </motion.a>
              <motion.a 
                href={personalInfo.github} target="_blank" rel="noreferrer" 
                className="text-white/60 hover:text-[#e23636] transition-colors relative group" 
                aria-label="GitHub"
                whileHover={{ rotate: [0, 20, -15, 10, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              >
                <div className="absolute -top-8 left-1/2 w-[1px] h-8 bg-white/20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <Github size={24} className="relative z-10" />
              </motion.a>
            </div>
          </FadeIn>
        </footer>
      </main>

      {/* Floating Bottom Nav */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.8 }}
        className="fixed bottom-6 md:bottom-8 left-0 w-full z-50 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-full bg-[#030a16]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar max-w-full min-w-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                title={item.label}
                className={`relative px-3 py-2.5 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 flex items-center justify-center ${
                  isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={18} className="md:hidden relative z-10" />
                <span className="relative z-10 hidden md:block">{item.label}</span>
              </a>
            );
          })}
          <a
            href={`mailto:${personalInfo.email}`}
            title="Book Call"
            className="ml-1 md:ml-2 px-3 py-2.5 md:px-5 md:py-2.5 rounded-full bg-white text-[#030a16] text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap shrink-0 flex items-center justify-center"
          >
            <Phone size={18} className="md:hidden" />
            <span className="hidden md:block">Contact</span>
          </a>
          {/* Spacer to ensure right padding is respected on scroll */}
          <div className="w-2 shrink-0"></div>
        </div>
      </motion.nav>
    </div>
  );
}
