import { useState, useEffect, useRef } from "react";
import {
  Globe, ShieldCheck, TrendingUp, ArrowRight, Menu, X,
  MapPin, BarChart3, Users, Award, CheckCircle2,
  Mail, Phone, Building2, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#cases" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-deep/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 group-hover:border-gold/60 transition-colors">
              <Globe className="h-5 w-5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-serif font-semibold tracking-wide text-parchment leading-none">Meridian</span>
              <span className="text-[9px] font-mono font-medium tracking-[0.2em] text-steel uppercase">Partners</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-[13px] font-medium text-parchment/70 hover:text-parchment transition-colors group"
              >
                {l.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/30 px-6 py-2.5 text-[13px] font-semibold text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              Get in Touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-parchment p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden bg-ink-deep/98 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-parchment/80 hover:text-parchment border-b border-white/[0.05]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-gold/10 border border-gold/30 px-6 py-3 text-center text-sm font-semibold text-gold"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="/images/hero-background.jpg"
          alt=""
          className="h-[120%] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/60 via-ink-deep/40 to-ink-deep/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/50 via-transparent to-ink-deep/70" />
      </motion.div>

      {/* Subtle grid */}
      <div className="absolute inset-0 z-10 grid-pattern pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-20 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-1.5 mb-10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-mono font-medium tracking-[0.15em] text-gold uppercase">International Supply Chain Consulting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.92] text-parchment tracking-tight"
          >
            Engineering <span className="italic text-gold-light">Resilience</span>
            <br />
            <span className="font-medium">Across Global Supply Chains</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 text-lg md:text-xl text-steel/80 max-w-2xl leading-relaxed font-light"
          >
            We design, optimize, and future-proof logistics networks that move billions in goods across continents — with precision, speed, and strategic foresight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a href="#services" className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[14px] font-semibold text-ink-deep hover:bg-gold-light transition-colors duration-300 shadow-[0_0_40px_-12px_rgba(197,160,101,0.35)] hover:shadow-[0_0_40px_-12px_rgba(197,160,101,0.55)]">
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-[14px] font-medium text-parchment hover:bg-white/5 hover:border-white/20 transition-all duration-300">
              Schedule Consultation
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Video placeholder with play button */}
      <div className="absolute right-6 lg:right-16 bottom-24 z-20 hidden md:block">
        <a href="#" className="group relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-ink-deep/60 backdrop-blur-md hover:border-gold transition-colors play-pulse">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-transparent" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gold ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-[0.15em] text-steel uppercase">Watch Overview</span>
        </a>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Bar                                                          */
/* ------------------------------------------------------------------ */
function StatsBar() {
  const stats = [
    { value: "42+", label: "Countries Active" },
    { value: "$3.2B", label: "Client Revenue Impact" },
    { value: "18", label: "Years of Expertise" },
    { value: "97%", label: "Client Retention" },
  ];

  return (
    <section className="relative -mt-16 z-30 mx-auto max-w-6xl px-6 lg:px-10">
      <div className="glass-card rounded-2xl px-8 py-8 md:px-12 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center md:text-left md:border-r md:border-white/[0.06] last:border-0">
            <div className="font-serif text-3xl md:text-4xl font-light text-parchment">{s.value}</div>
            <div className="mt-1 text-[11px] font-mono tracking-[0.15em] text-steel uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services — Interactive Pillars                                      */
/* ------------------------------------------------------------------ */
function Services() {
  const pillars = [
    {
      icon: TrendingUp,
      title: "Supply Chain Strategy",
      desc: "End-to-end strategic design, network optimization, and sourcing transformation that aligns logistics with business growth.",
      bullets: ["Network Design & Optimization", "Strategic Sourcing", "Demand Planning"],
    },
    {
      icon: ShieldCheck,
      title: "Operations & Logistics",
      desc: "Operational excellence through warehouse automation, transportation management, and process engineering at scale.",
      bullets: ["Warehouse Automation", "Transport Management", "Process Engineering"],
    },
    {
      icon: BarChart3,
      title: "Risk & Resilience",
      desc: "Proactive risk mapping, scenario modeling, and resilience frameworks to protect supply chains against disruption.",
      bullets: ["Risk Mapping", "Scenario Modeling", "Resilience Frameworks"],
    },
  ];

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">Our Expertise</span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-parchment mt-4 tracking-tight leading-[1.05]">
              Three Pillars of <br />
              <span className="italic text-gold-light">Supply Chain Excellence</span>
            </h2>
          </div>
          <p className="max-w-md text-steel/70 text-sm leading-relaxed lg:text-right">
            Our methodology integrates strategic vision with operational rigor — creating supply chains that endure, adapt, and outperform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isActive = hovered === i;
            return (
              <a
                href="#contact"
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 group relative overflow-hidden ${
                  isActive ? "border-gold/25 -translate-y-2 shadow-[0_16px_60px_-15px_rgba(197,160,101,0.12)]" : ""
                }`}
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/60 to-gold/20 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />

                <div className={`mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? "bg-gold/15 text-gold shadow-[0_8px_30px_-10px_rgba(197,160,101,0.3)]" : "bg-white/[0.03] text-steel/60"}`}>
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-light text-parchment mb-4 tracking-tight">{p.title}</h3>
                <p className="text-sm text-steel/60 leading-relaxed mb-8">{p.desc}</p>

                <ul className="space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[13px] text-steel/80 font-light">
                      <CheckCircle2 className="h-4 w-4 text-gold/60 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */
function CaseStudies() {
  const cases = [
    {
      title: "Global Manufacturing Network Redesign",
      client: "Electra Industries",
      sector: "Industrial Manufacturing",
      image: "/images/case-study-1.jpg",
      result: "34% reduction in logistics costs; 12% improvement in delivery reliability.",
      metrics: [
        { value: "34%", label: "Cost Reduction" },
        { value: "12%", label: "Delivery Uptime" },
        { value: "3.2K", label: "Locations Mapped" },
      ],
      description:
        "Electra Industries operated across 14 countries with fragmented logistics contracts and inconsistent warehouse utilization. We redesigned their network architecture, consolidated vendors, and implemented a centralized transportation management system — unlocking $240M in annual savings.",
    },
    {
      title: "Resilience for a European Supply Chain",
      client: "Nordic Pharma",
      sector: "Pharmaceuticals",
      image: "/images/case-study-2.jpg",
      result: "Zero critical disruptions through the 2023 energy crisis; 18-day faster response to disruptions.",
      metrics: [
        { value: "0", label: "Critical Disruptions" },
        { value: "18d", label: "Response Speed" },
        { value: "6", label: "Countries Protected" },
      ],
      description:
        "With supply chains spanning six countries and cold-chain requirements for life-saving products, Nordic Pharma needed a resilience framework that went beyond contingency lists. We built a predictive risk model, diversified sourcing corridors, and implemented real-time visibility across the network.",
    },
    {
      title: "Port-to-Plant Logistics Transformation",
      client: "Atlas Maritime Group",
      sector: "Maritime & Shipping",
      image: "/images/case-study-3.jpg",
      result: "28% improvement in port-to-warehouse transit; 40% reduction in demurrage fees.",
      metrics: [
        { value: "28%", label: "Transit Gain" },
        { value: "40%", label: "Fee Reduction" },
        { value: "8", label: "Ports Integrated" },
      ],
      description:
        "Atlas Maritime Group faced chronic demurrage costs and unpredictable port-to-plant timelines. Our team integrated port data feeds with fleet tracking, redesigned staging yards, and established dynamic scheduling protocols — reducing idle time and improving container flow by 40%.",
    },
  ];

  return (
    <section id="cases" className="py-32 md:py-40 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-[#0d1220] to-ink-deep pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">Proven Results</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-parchment mt-4 tracking-tight leading-[1.05]">
            Case Studies That <br />
            <span className="italic text-gold-light">Move the Needle</span>
          </h2>
        </div>

        <div className="space-y-24 md:space-y-40">
          {cases.map((c, i) => (
            <article key={i} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <a href="#contact" className="group block relative overflow-hidden rounded-3xl">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-[10px] font-mono tracking-[0.15em] text-gold uppercase">{c.sector}</span>
                  </div>
                </a>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h3 className="font-serif text-3xl md:text-4xl font-light text-parchment tracking-tight mb-2">
                  {c.title}
                </h3>
                <p className="text-[11px] font-mono tracking-[0.15em] text-steel/50 uppercase mb-6">{c.client}</p>

                <p className="text-base md:text-lg text-steel/70 leading-relaxed mb-8">{c.description}</p>
                <p className="text-sm font-medium text-gold mb-8">{c.result}</p>

                <div className="grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl bg-white/[0.03] border border-white/[0.05] px-4 py-5 text-center">
                      <div className="font-serif text-2xl md:text-3xl font-light text-parchment">{m.value}</div>
                      <div className="mt-1 text-[10px] font-mono tracking-[0.1em] text-steel/50 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Global Team                                                        */
/* ------------------------------------------------------------------ */
function GlobalTeam() {
  const team = [
    {
      name: "Dr. Kenji Tanaka",
      role: "Managing Director, APAC",
      location: "Singapore",
      bio: "Former logistics director at Nippon Express with 22 years in maritime and intermodal optimization. Holds a PhD in Supply Chain Engineering from Tokyo University.",
      image: "/images/team-portrait-1.jpg",
      region: "Asia Pacific",
    },
    {
      name: "Dr. Sofia Marchetti",
      role: "Head of Strategy, EMEA",
      location: "Milan",
      bio: "Previously led supply chain transformation at Unilever across Southern Europe. Specializes in sustainable sourcing frameworks and circular logistics design.",
      image: "/images/team-portrait-2.jpg",
      region: "Europe, Middle East & Africa",
    },
    {
      name: "Dr. Amara Diallo",
      role: "Director of Risk, Americas",
      location: "Montreal",
      bio: "Award-winning resilience strategist who led pandemic-era supply chain restructuring for two Fortune 50 companies. Fluent in French, English, and Wolof.",
      image: "/images/team-portrait-3.jpg",
      region: "Americas",
    },
  ];

  return (
    <section id="team" className="py-32 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">Leadership</span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-parchment mt-4 tracking-tight leading-[1.05]">
              A Team Across <br />
              <span className="italic text-gold-light">Every Continent</span>
            </h2>
          </div>
          <p className="max-w-md text-steel/70 text-sm leading-relaxed lg:text-right">
            Our partners operate at the intersection of data science, operations, and strategic consulting — bringing local insight with global scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((t) => (
            <div key={t.name} className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-[10px] font-mono tracking-[0.15em] text-gold uppercase">{t.region}</span>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="font-serif text-2xl font-light text-parchment mb-1">{t.name}</h3>
                <p className="text-[11px] font-mono tracking-[0.15em] text-gold uppercase mb-1">{t.role}</p>
                <div className="flex items-center gap-2 text-[11px] text-steel/50 mb-4">
                  <MapPin className="h-3 w-3" />
                  <span>{t.location}</span>
                </div>
                <div className="w-8 h-px bg-gold/30 mb-5" />
                <p className="text-sm text-steel/60 leading-relaxed">{t.bio}</p>
                <div className="mt-6 flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 text-[11px] font-medium text-steel/40 hover:text-gold transition-colors" aria-label={`Profile for ${t.name}`}>
                    <ExternalLink className="h-4 w-4" /> Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Values / Trust Strip                                               */
/* ------------------------------------------------------------------ */
function TrustStrip() {
  const values = [
    { icon: Award, title: "Certified Excellence", desc: "ISO-9001, Six Sigma, and Global Supply Chain Council certified." },
    { icon: Users, title: "Independent Advisory", desc: "We work exclusively for clients — no vendor commissions, no conflicts." },
    { icon: ShieldCheck, title: "Data Confidentiality", desc: "Enterprise-grade security protocols and audited data governance." },
    { icon: Building2, title: "Fortune 500 Partners", desc: "Trusted by 120+ global enterprises across manufacturing, pharma, and energy." },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="glass-card rounded-3xl px-8 md:px-12 py-10 md:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="flex flex-col">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.08] border border-gold/20 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-xl text-parchment mb-2">{v.title}</h4>
                  <p className="text-[13px] text-steel/50 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA / Contact                                                      */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-ink-deep to-ink-deep" />

      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">Begin the Conversation</span>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-parchment mt-6 tracking-tight leading-[1.05]">
          Ready to Transform <br />
          <span className="italic text-gold-light">Your Supply Chain?</span>
        </h2>
        <p className="mt-8 text-lg md:text-xl text-steel/60 max-w-2xl mx-auto leading-relaxed font-light">
          Whether you're restructuring a global network or fortifying against disruption, we begin with a focused strategic assessment — no obligations, no sales pitch.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="mailto:contact@meridianpartners.com" className="group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[15px] font-semibold text-ink-deep hover:bg-gold-light transition-all duration-300 shadow-[0_0_50px_-15px_rgba(197,160,101,0.4)] hover:shadow-[0_0_50px_-10px_rgba(197,160,101,0.6)]">
            Book a Consultation <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="inline-flex items-center gap-3 rounded-full border border-white/10 px-10 py-5 text-[15px] font-medium text-parchment hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            Download Our Whitepaper
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.06] grid md:grid-cols-3 gap-10 text-left md:text-center">
          <div>
            <Mail className="h-5 w-5 text-gold/70 mb-3 mx-auto md:mx-0 md:inline-block" />
            <p className="text-[11px] font-mono tracking-[0.15em] text-steel/40 uppercase mb-1">Email</p>
            <a href="mailto:contact@meridianpartners.com" className="text-parchment hover:text-gold transition-colors font-light">contact@meridianpartners.com</a>
          </div>
          <div>
            <Phone className="h-5 w-5 text-gold/70 mb-3 mx-auto md:mx-0 md:inline-block" />
            <p className="text-[11px] font-mono tracking-[0.15em] text-steel/40 uppercase mb-1">Phone</p>
            <a href="tel:+6534567890" className="text-parchment hover:text-gold transition-colors font-light">+65 3456 7890</a>
          </div>
          <div>
            <MapPin className="h-5 w-5 text-gold/70 mb-3 mx-auto md:mx-0 md:inline-block" />
            <p className="text-[11px] font-mono tracking-[0.15em] text-steel/40 uppercase mb-1">Headquarters</p>
            <span className="text-parchment font-light">Marina Bay, Singapore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-deep py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30">
                <Globe className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-serif font-semibold tracking-wide text-parchment leading-none">Meridian</span>
                <span className="text-[9px] font-mono font-medium tracking-[0.2em] text-steel uppercase">Partners</span>
              </div>
            </a>
            <p className="text-[13px] text-steel/40 leading-relaxed">
              Independent supply chain consulting with operations in 42 countries. Trusted by enterprises that move the world.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-steel/30 uppercase mb-4">Services</h4>
              <ul className="space-y-2">
                {["Strategy", "Operations", "Risk & Resilience", "Digital Transformation"].map((item) => (
                  <li key={item}><a href="#services" className="text-[13px] text-steel/50 hover:text-parchment transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-steel/30 uppercase mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Team", "Careers", "Press"].map((item) => (
                  <li key={item}><a href="#" className="text-[13px] text-steel/50 hover:text-parchment transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-steel/30 uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map((item) => (
                  <li key={item}><a href="#" className="text-[13px] text-steel/50 hover:text-parchment transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[11px] text-steel/25 font-mono">
            &copy; {new Date().getFullYear()} Meridian Partners. All rights reserved.
          </p>
          <p className="text-[11px] text-steel/25 font-mono">Engineered for supply chain excellence.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                            */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="min-h-screen bg-ink text-parchment font-sans selection:bg-gold/25">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <CaseStudies />
      <GlobalTeam />
      <TrustStrip />
      <Contact />
      <Footer />
    </div>
  );
}
