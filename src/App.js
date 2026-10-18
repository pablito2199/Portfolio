import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BriefcaseBusiness, CalendarDays, Download, FolderGit2, Github, GraduationCap, Heart, Linkedin, Mail, MapPin, Menu, Moon, Sun, UserRound, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import dataEs from './data.json';
import dataDe from './data_de.json';
import dataEn from './data_en.json';
import dataGl from './data_gl.json';
import translations from './i18n';

const languageOptions = [
    { code: 'de', label: 'Deutsch', flag: '/images/flags/Flag_of_Germany.svg' },
    { code: 'en', label: 'English', flag: '/images/flags/Flag_of_the_United_Kingdom_(3-5).svg' },
    { code: 'es', label: 'Español', flag: '/images/flags/Flag_of_Spain.svg' },
    { code: 'gl', label: 'Galego', flag: '/images/flags/Flag_of_Galicia.svg' },
].sort((a, b) => a.label.localeCompare(b.label));

function LanguageSelector({ language, setLanguage, className, onLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const currentOption = languageOptions.find(o => o.code === language);

    useEffect(() => {
        const closeDropdown = (event) => {
            if (isOpen && !event.target.closest('.language-selector-custom')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [isOpen]);

    const handleSelect = (code) => {
        setLanguage(code);
        setIsOpen(false);
        if (onLanguageChange) onLanguageChange(code);
    };

    return (
        <div className={`language-selector-custom ${className || ''}`} onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
        }}>
            <div className="language-selector-current">
                <img src={currentOption.flag} alt="" className="flag-img" />
                <span className="language-label">{currentOption.label}</span>
            </div>
            {isOpen && (
                <div className="language-selector-options">
                    {languageOptions.map(option => (
                        <div
                            key={option.code}
                            className={`language-option ${option.code === language ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(option.code);
                            }}
                        >
                            <img src={option.flag} alt="" className="flag-img" />
                            <span className="language-label">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const dataByLanguage = {
    de: dataDe,
    es: dataEs,
    en: dataEn,
    gl: dataGl,
};

const navItems = [
    { href: '#about', icon: UserRound },
    { href: '#experience', icon: BriefcaseBusiness },
    { href: '#resume', icon: GraduationCap },
    { href: '#projects', icon: FolderGit2 },
    { href: '#contact', icon: Mail },
];

const projectCategories = {
    Frontend: ['React', 'Frontend', 'Vue'],
    Backend: ['Spring Boot', 'Backend', 'Java', 'POO'],
    Datos: ['MongoDB', 'SQL', 'Firebase'],
    Automatización: ['Python', 'Automatización', 'Scripts'],
    IA: ['C', 'OpenMP', 'CLIPS', 'IA', 'Claude Code'],
};

const projectCategoryNames = Object.keys(projectCategories);

const getCompletedYears = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();

    if (
        today.getMonth() < start.getMonth()
        || (today.getMonth() === start.getMonth() && today.getDate() < start.getDate())
    ) {
        years -= 1;
    }

    return Math.max(years, 0);
};

const getAge = (birthDate) => getCompletedYears(birthDate);
const getStoredLanguage = () => {
    const storedLanguage = localStorage.getItem('portfolio-language');
    return translations[storedLanguage] ? storedLanguage : 'es';
};

const projectBelongsToCategory = (project, category) => (
    category === 'Todos' || project.tags.some((tag) => projectCategories[category].includes(tag))
);

function App() {
    const [language, setLanguage] = useState(getStoredLanguage);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const projectGridRef = useRef(null);
    const isNavigatingRef = useRef(false);
    const [projectScrollState, setProjectScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
    const previousScrollY = useRef(0);
    const headerRef = useRef(null);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio-theme') === 'dark');
    const [activeSection, setActiveSection] = useState('');
    const content = translations[language] || translations.es;
    const { ui } = content;
    const currentData = dataByLanguage[language] || dataByLanguage.es;
    const { aptitudes, certifications, courses, education, experience, profile, projects, terminalMessages } = currentData;
    const filters = ['Todos', ...projectCategoryNames];
    const localizedNavItems = navItems.map((item, index) => ({ ...item, label: content.nav[index] }));
    const experienceYears = getCompletedYears(profile.experienceStartDate);
    const age = getAge(profile.birthDate);
    const visibleProjects = useMemo(
        () => projects.filter((project) => projectBelongsToCategory(project, activeFilter)),
        [activeFilter],
    );
    const scrollProjects = (direction) => {
        projectGridRef.current?.scrollBy({ left: direction * projectGridRef.current.clientWidth, behavior: 'smooth' });
    };

    useEffect(() => {
        const projectGrid = projectGridRef.current;
        if (!projectGrid) {
            return undefined;
        }

        const updateProjectScrollState = () => {
            const maxScrollLeft = projectGrid.scrollWidth - projectGrid.clientWidth;
            setProjectScrollState({
                canScrollLeft: projectGrid.scrollLeft > 1,
                canScrollRight: maxScrollLeft - projectGrid.scrollLeft > 1,
            });
        };

        updateProjectScrollState();
        projectGrid.addEventListener('scroll', updateProjectScrollState, { passive: true });
        window.addEventListener('resize', updateProjectScrollState);
        return () => {
            projectGrid.removeEventListener('scroll', updateProjectScrollState);
            window.removeEventListener('resize', updateProjectScrollState);
        };
    }, [activeFilter, visibleProjects.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
            { threshold: 0.12, rootMargin: '0px 0px -40px' },
        );
        document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

        const updateProgress = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - previousScrollY.current;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (currentScrollY / total) * 100 : 0);
            setShowBackToTop(currentScrollY > 8);
            if (currentScrollY <= 8) {
                setHeaderVisible(true);
            } else if (scrollDelta > 4 && !isNavigatingRef.current) {
                setHeaderVisible(false);
                setMenuOpen(false);
            } else if (scrollDelta < -4) {
                setHeaderVisible(true);
            }
            previousScrollY.current = currentScrollY;

            const headerOffset = 100;
            const sections = navItems
                .map((item) => document.querySelector(item.href))
                .filter(Boolean)
                .sort((first, second) => first.offsetTop - second.offsetTop);
            const currentSection = sections.reduce((current, section) => {
                if (section.offsetTop <= window.scrollY + headerOffset) {
                    return section;
                }
                return current;
            }, null);
            const contactSection = document.querySelector('#contact');
            const contactIsVisible = contactSection
                && contactSection.getBoundingClientRect().top <= window.innerHeight - 80
                && contactSection.getBoundingClientRect().bottom >= headerOffset;
            setActiveSection(contactIsVisible ? '#contact' : currentSection ? `#${currentSection.id}` : '');
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('portfolio-language', language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeMenuWhenClickingOutside = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('pointerdown', closeMenuWhenClickingOutside);
        return () => document.removeEventListener('pointerdown', closeMenuWhenClickingOutside);
    }, [menuOpen]);

    return (
        <div className={darkMode ? 'app theme-dark' : 'app'}>
            <header ref={headerRef} className={headerVisible ? 'site-header' : 'site-header is-hidden'}>
                <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
                <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
                    <span className="brand-mark" aria-hidden="true">
                        <svg viewBox="0 0 64 64" focusable="false">
                            <rect x="5" y="8" width="54" height="48" rx="8" />
                            <path className="brand-window-line" d="M5 20h54" />
                            <circle cx="14" cy="14" r="2" />
                            <circle cx="21" cy="14" r="2" />
                            <path className="brand-prompt" d="m16 31 7 6-7 6" />
                            <path className="brand-cursor" d="M29 43h17" />
                        </svg>
                    </span>
                    <span>Pablo Tarrío Otero</span>
                </a>
                <button className="menu-button" type="button" aria-label={ui.menu} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
                    {localizedNavItems.map((item) => (
                        <a className={activeSection === item.href ? 'is-active' : ''} href={item.href} key={item.href} onClick={() => {
                            isNavigatingRef.current = true;
                            setHeaderVisible(true);
                            setActiveSection(item.href);
                            setMenuOpen(false);
                            window.setTimeout(() => {
                                isNavigatingRef.current = false;
                            }, 900);
                        }}>
                            <item.icon className="nav-icon" size={16} aria-hidden="true" />
                            {item.label}
                        </a>
                    ))}
                    <div className="nav-bottom-row">
                        <LanguageSelector language={language} setLanguage={setLanguage} className="nav-language-selector" onLanguageChange={() => setMenuOpen(false)} />
                        <button
                            className="theme-toggle"
                            type="button"
                            aria-label={darkMode ? ui.lightMode : ui.darkMode}
                            title={darkMode ? ui.lightModeTitle : ui.darkModeTitle}
                            onClick={() => setDarkMode((current) => !current)}>
                            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </div>
                </nav>
                <LanguageSelector language={language} setLanguage={setLanguage} className="desktop-only" />
                <button
                    className="theme-toggle desktop-only"
                    type="button"
                    aria-label={darkMode ? ui.lightMode : ui.darkMode}
                    title={darkMode ? ui.lightModeTitle : ui.darkModeTitle}
                    onClick={() => setDarkMode((current) => !current)}>
                    {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </button>
            </header>

            <main id="top">
                <section className="hero section-shell">
                    <div className="hero-copy">
                        <TerminalTyping language={language} />
                        <h1>{profile.name}</h1>
                        <p className="hero-role">{content.profile.role} <span>/</span> <strong>React · Spring Boot · JavaScript</strong></p>
                        <p className="hero-text">{content.profile.intro}</p>
                        <div className="hero-actions-row">
                            <div className="hero-actions">
                                <a className="button button-primary" href="https://drive.google.com/uc?export=download&id=1EB5ckJPDxgfvezd9VlQV2sAzvD3p-Igj" target="_blank" rel="noreferrer">{ui.downloadCv} <Download size={18} /></a>
                                <a className="button button-ghost" href="#projects">{ui.viewProjects}</a>
                            </div>
                            <div className="social-links">
                                <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
                                <a href={profile.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="hero-profile" aria-label={ui.profile}>
                        <div className="profile-image-wrap"><img src="/images/profilepic.jpg" alt={profile.name} /><span className="profile-image-shade" aria-hidden="true" /></div>
                        <span className="experience-summary" aria-label={`${experienceYears} ${ui.years}`}><strong>{experienceYears}</strong><span>{ui.years}</span></span>
                        <div className="profile-details">
                            <span className="profile-details profile-detail profile-age"><CalendarDays size={15} /> {ui.age}: {age} {ui.ageYears}</span>
                        </div>
                        <a className="profile-location" href="https://www.google.com/maps/search/?api=1&query=Santiago+de+Compostela%2C+Espa%C3%B1a" target="_blank" rel="noreferrer"><MapPin size={15} /> {content.profile.location}</a>
                    </div>
                </section>

                <section className="section-shell about-section" id="about">
                    <SectionHeader label="SOBRE MÍ" title={ui.aboutTitle} variant="main" language={language} />
                    <div className="about-grid"><div><h2>{ui.aboutLead} <em>{ui.aboutEmphasis}</em></h2></div><div><p className="large-copy">{content.profile.about}</p><div className="facts"><span><GraduationCap size={17} /> {ui.education}: {content.profile.education}</span><span><BriefcaseBusiness size={17} /> {ui.employment}: {content.profile.employment}</span><span><Heart size={17} /> {ui.interests}: {content.profile.interests}</span></div></div></div>
                </section>

                <ResumeSection id="experience" title="EXPERIENCIA" items={experience} language={language} />

                <section className="career-section" id="resume">
                    <div className="section-shell">
                        <SectionHeader label="FORMACIÓN" title={ui.formationTitle} variant="main" language={language} />
                    </div>
                    <ResumeSection title="FORMACIÓN Y CONOCIMIENTOS" items={education} timeline language={language} />
                    <section className="section-shell aptitudes-section" id="aptitudes">
                        <SectionHeader label="APTITUDES" title={ui.aptitudeTitle} language={language} />
                        <div className="aptitudes-grid">{aptitudes.map((aptitude, index) => <article className="aptitude-card" key={aptitude.name}><h3>{content.aptitudeNames[index]}</h3><p>{content.aptitudeDescriptions[index]}</p><div className="aptitude-tags">{aptitude.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
                    </section>
                    <ResumeSection title="CERTIFICACIONES" items={certifications} compact language={language} />
                    <ResumeSection title="CURSOS" items={courses} compact language={language} />
                </section>

                <section className="section-shell projects-section" id="projects" data-reveal>
                    <SectionHeader label="PROYECTOS" title={ui.projectTitle} variant="main" language={language} />
                    <div className="projects-controls"><div className="filters" role="group" aria-label={ui.filterProjects}>{filters.map((filter) => <button className={activeFilter === filter ? 'filter active' : 'filter'} aria-pressed={activeFilter === filter} key={filter} onClick={() => setActiveFilter(filter)}>{filter === 'Todos' ? ui.all : filter}</button>)}</div></div>
                    <div className="projects-carousel"><div className="project-scroll-controls"><button className="project-scroll-button" type="button" aria-label={ui.previousProjects} onClick={() => scrollProjects(-1)} disabled={!projectScrollState.canScrollLeft}><ArrowLeft size={17} /></button><button className="project-scroll-button" type="button" aria-label={ui.moreProjects} onClick={() => scrollProjects(1)} disabled={!projectScrollState.canScrollRight}><ArrowRight size={17} /></button></div><div className="project-grid" ref={projectGridRef} key={activeFilter}>{visibleProjects.map((project) => <ProjectCard project={{ ...project, description: content.projectDescriptions[projects.findIndex((item) => item.title === project.title)] }} key={project.title} />)}</div></div>
                </section>

                <section className="contact-section" id="contact" data-reveal><div className="section-shell contact-inner"><div><SectionHeader label="CONTACTO" title={ui.contactTitle} variant="main" language={language} /><p>{ui.contactText}</p><a className="contact-email" href={`mailto:${profile.email}`} aria-label={`${ui.sendEmail} ${profile.email}`} title={ui.sendMailTitle}><Mail size={21} /><span>{profile.email}</span><ArrowUpRight size={22} /></a><div className="contact-list"><a className="contact-social" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label={ui.linkedinOf} title={ui.linkedinOf}><Linkedin size={20} /><span>{profile.name}</span></a><a className="contact-social" href={profile.github} target="_blank" rel="noreferrer" aria-label={ui.githubOf} title={ui.githubOf}><Github size={20} /><span>pablito2199</span></a></div></div><ContactForm language={language} /></div></section>
            </main>
            <footer className="site-footer section-shell"><span>© {new Date().getFullYear()} Pablo Tarrío Otero</span></footer>
            <button className={showBackToTop ? 'back-to-top is-visible' : 'back-to-top'} type="button" aria-label={ui.backToTop} title={ui.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>
        </div>
    );
}

function ProjectCard({ project }) {
    return <a className="project-card" href={project.url} target="_blank" rel="noreferrer"><div className="project-image"><img src={project.image} alt={project.title} /><span className="project-arrow"><ArrowUpRight size={20} /></span></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></a>;
}

function SectionHeader({ label, title, variant = 'subsection' }) {
    const sectionNames = {
        'SOBRE MÍ': 'Sobre mí',
        EXPERIENCIA: 'Experiencia',
        FORMACIÓN: 'Formación',
        'FORMACIÓN Y CONOCIMIENTOS': 'Formación y conocimientos',
        APTITUDES: 'Aptitudes',
        CERTIFICACIONES: 'Certificaciones',
        CURSOS: 'Cursos',
        PROYECTOS: 'Proyectos',
        CONTACTO: 'Contacto',
    };
    const sectionIcons = {
        'SOBRE MÍ': UserRound,
        EXPERIENCIA: BriefcaseBusiness,
        FORMACIÓN: GraduationCap,
        PROYECTOS: FolderGit2,
        CONTACTO: Mail,
    };
    const Icon = sectionIcons[label];
    return <div className={`section-header section-header-${variant}`}><h2>{Icon && <Icon className="section-title-icon" size={variant === 'main' ? 25 : 20} aria-hidden="true" />}{title || sectionNames[label] || label}</h2></div>;
}

function TerminalTyping({ language }) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [visibleText, setVisibleText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const messages = (translations[language] || translations.es).terminal;
        const currentMessage = messages[messageIndex];
        const isComplete = visibleText === currentMessage;
        const isEmpty = visibleText.length === 0;
        const delay = isComplete ? 1800 : isEmpty && isDeleting ? 450 : isDeleting ? 45 : 85;

        const timer = window.setTimeout(() => {
            if (!isDeleting && !isComplete) {
                setVisibleText(currentMessage.slice(0, visibleText.length + 1));
            } else if (!isDeleting && isComplete) {
                setIsDeleting(true);
            } else if (isDeleting && !isEmpty) {
                setVisibleText(currentMessage.slice(0, visibleText.length - 1));
            } else {
                setIsDeleting(false);
                setMessageIndex((index) => (index + 1) % messages.length);
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [isDeleting, language, messageIndex, visibleText]);

    return (
        <div className="terminal-window" aria-label={(translations[language] || translations.es).ui.presentationConsole}>
            <p className="terminal-line" aria-live="polite">
                <span className="terminal-prompt"><i>›</i> pablo@portfolio:~$</span> <span>{visibleText}</span>
                <span className="terminal-cursor" aria-hidden="true" />
            </p>
        </div>
    );
}

function ResumeSection({ id, title, items, timeline = false, compact = false, language }) {
    const isTimeline = timeline || id === 'experience';
    const ui = (translations[language] || translations.es).ui;
    const sectionTitles = { EXPERIENCIA: ui.experienceTitle, 'FORMACIÓN Y CONOCIMIENTOS': ui.formationTitle, CERTIFICACIONES: ui.certifications, CURSOS: ui.courses };

    return <section className={`${id === 'experience' ? 'section-shell resume-section experience-resume-section' : 'section-shell resume-section'}${compact ? ' compact-credentials' : ''}`} id={id} data-reveal>
        <SectionHeader label={title} title={sectionTitles[title] || title} variant={id === 'experience' ? 'main' : 'subsection'} language={language} />
        {isTimeline
            ? <div className="experience-timeline">{items.map((item) => <ResumeItem item={item} isTimeline language={language} key={`${item.company}-${item.role}`} />)}</div>
            : <div className="resume-list">{items.map((item) => <ResumeItem item={item} language={language} key={`${item.company}-${item.role}`} />)}</div>}
    </section>;
}

function ResumeItem({ item, isTimeline = false, language }) {
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef(null);
    const hasLongDescription = item.description && item.description.length > 260;
    const descriptionLines = item.description ? item.description.split('\n') : [];
    const bulletItems = descriptionLines.filter((line) => line.trim().startsWith('•'));
    const descriptionIntro = descriptionLines
        .filter((line) => line.trim() && !line.trim().startsWith('•'))
        .join(' ')
        .trim();
    const itemClassName = [
        'resume-item',
        isTimeline ? 'experience-timeline-item' : '',
        isTimeline && item.date.includes('Presente') ? 'is-current' : '',
        expanded ? 'is-expanded' : '',
    ].filter(Boolean).join(' ');
    const handleDescriptionToggle = () => {
        if (!expanded) {
            setExpanded(true);
            return;
        }

        setExpanded(false);
        window.requestAnimationFrame(() => {
            const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
            const itemTop = itemRef.current?.getBoundingClientRect().top;

            if (itemTop !== undefined) {
                window.scrollTo({ top: window.scrollY + itemTop - headerHeight - 20, behavior: 'smooth' });
            }
        });
    };

    const ui = (translations[language] || translations.es).ui;
    return <article ref={itemRef} className={itemClassName}>{isTimeline && <span className="experience-timeline-marker" aria-hidden="true" />}{item.image && <img src={item.image} alt="" />}<div>{item.type && <span className="credential-type">{item.type}</span>}<h3>{item.role}</h3><p className="muted">{item.date}</p><p className="company">{item.company}</p>{item.description && (bulletItems.length > 0 ? <div className="resume-description resume-description-list"><p>{descriptionIntro}</p><ul>{bulletItems.map((line) => <li key={line}>{line.trim().replace(/^•\s*/, '')}</li>)}</ul></div> : <p className="resume-description">{item.description}</p>)}{item.credential && <p className="credential">{ui.credential} {item.credential}</p>}{hasLongDescription && <button className="read-more" type="button" onClick={handleDescriptionToggle}>{expanded ? ui.readLess : ui.readMore}</button>}<a href={item.url} target="_blank" rel="noreferrer">{ui.viewInformation} <ArrowUpRight size={15} /></a></div></article>;
}

function ContactForm({ language }) {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (event) => {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSending(true);
        setStatus({ type: '', message: '' });
        try {
            const emailjs = await import('emailjs-com');
            await emailjs.default.send('service_ifxis44', 'template_97ud84q', formData, 'z7lrWEIQz9Ydo1DGl');
            setFormData({ nombre: '', email: '', mensaje: '' });
            setStatus({ type: 'success', message: (translations[language] || translations.es).ui.emailSuccess });
        } catch (error) {
            console.error('No se pudo enviar el mensaje de contacto.', error);
            setStatus({ type: 'error', message: (translations[language] || translations.es).ui.emailError });
        } finally {
            setSending(false);
        }
    };

    const ui = (translations[language] || translations.es).ui;
    return <form className="contact-form" onSubmit={handleSubmit}><input name="nombre" value={formData.nombre} onChange={handleChange} placeholder={ui.name} required type="text" /><input name="email" value={formData.email} onChange={handleChange} placeholder={ui.email} required type="email" /><textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder={ui.message} maxLength="250" required rows="5" /><button className="button button-primary" disabled={sending} type="submit">{sending ? ui.sending : ui.sendMessage} <ArrowUpRight size={17} /></button>{status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}</form>;
}

export default App;
