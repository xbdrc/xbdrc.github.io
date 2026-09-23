// Modules
import { useRef } from "react";

// Components
import DevCard from "../components/DevCard";
import ExperienceCard from "../components/ExperienceCard";
import IconCard from "../components/IconCard";
import ProjectCard from '../components/ProjectCard';
import CodeCard from "../components/CodeCard";
import SoundCloudPlayer from "../components/SoundCloudPlayer";
import QuoteCard from "../components/QuoteCard";
import Section from '../components/Section'
import SEO from "../components/SEO";

// Icons
import { FaLink } from "react-icons/fa";

export default function Home() {

    const docRef = useRef<HTMLDivElement>(null);

    const quotes = [
        "It always seems impossible until it's done. ✅",
        "Believe you can and you are halfway there. 🌌",
        "Always aim to add value, no matter where. 🎯"
    ]

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>

            <SEO
                title="Bruno Cruz"
                description="Professional web developer specialized in modern websites and UI."
                image="/portfolio2.png"
                url="https://xbdrc.github.io/"
            />
            <div className="document" ref={docRef}>
                <Section name="Home" showName={false}>
                    <QuoteCard quotes={quotes} effect="slide" font="Roboto" italic letterSpacing />
                    <DevCard
                        name="Bruno Cruz"
                        roles={["Web Developer"]}
                        image="20480310_grainy.png"
                        location="Lisbon, Portugal, Earth 🌍"
                        github="xbdrc"
                        linkedin="xbrunocruzx"
                        spotify="https://open.spotify.com/user/1192659842?si=98a1feeb38024d39"
                        discord="https://discord.com/users/231768776490614784"
                        email="contact.brunocruz@gmail.com"
                    />
                    <div className="urls">
                        <a onClick={() => scrollToSection("about")} href="#">about</a>
                        <a onClick={() => scrollToSection("experience")} href="#">experience</a>
                        <a onClick={() => scrollToSection("stack")} href="#">stack</a>
                        <a onClick={() => scrollToSection("certificates")} href="#">certificates</a>
                        <a onClick={() => scrollToSection("projects")} href="#">projects</a>
                        <a onClick={() => scrollToSection("snippets")} href="#">snippets</a>
                        <a target="_blank" href="https://xbdrc.github.io/brunocruz_resume.pdf"><FaLink size={14} />&nbsp;&nbsp;resume</a>
                    </div>
                    <SoundCloudPlayer playlist="https://api.soundcloud.com/playlists/2282476155" />
                </Section>
                <Section
                    name="About"
                    description=""
                >
                    <p className="aboutDescription">
                        Full-Stack Developer with experience building and maintaining web applications, APIs, and database-driven solutions. Strong foundation in web development using <b>HTML</b>, <b>CSS</b>, <b>React</b>, and <b>Node.js</b>, with experience in <b>Python</b>, <b>SQL</b>, and <b>Git</b>. Familiar with <b>Docker</b> and <b>AI</b>. Motivated and solution-oriented, with a focus on building reliable software and contributing to challenging projects.
                    </p>
                </Section>
                <Section
                    name="Experience"
                    description="Points-of-interest of my professional career."
                >
                    <ExperienceCard
                        type="schoolar"
                        title="Systems Management & Programming @ Escola Digital"
                        timerange="2015 - 2018"
                        about="Introduction to systems and programming."
                    />
                    <ExperienceCard
                        type="professional"
                        title="[Intern] IT Support Technician @ Câmara Municipal do Barreiro"
                        timerange="Jan 2017 - Mar 2017"
                        about="Provisioned and deployed 50+ workstations, including OS and software installation, system configuration, and testing for multiple poles of Barreiro’s town network."
                    />
                    <ExperienceCard
                        type="professional"
                        title="[Intern] Full-Stack Developer @ KCS iT"
                        timerange="Apr 2018 - Jul 2018"
                        about="Developed web app to automate management workflow. This app was built to show JiraAPI data taylored to the team’s requirements, and also generate Excel reports."
                    />
                    <ExperienceCard
                        type="professional"
                        title="Full-Stack Developer @ KCS iT"
                        timerange="Jul 2018 - Sep 2020"
                        about="Developed and maintained multiple projects. Collaborated with clients and teams to translate business requirements into scalable solutions."
                    />
                    <ExperienceCard
                        type="professional"
                        title="[Volunteer] Assistant @ Saponem Opera"
                        timerange="Oct 2020 - Feb 2022"
                        about="Assisted in laboratory, warehouse, and meetings. Maintained store's website. Fixed bugs and added funcionality using Visual Basic for Excel spreadsheet automation."
                    />
                </Section>
                <Section
                    name="Stack"
                    description="Stack of technologies and tools I’ve worked with across web development, databases, APIs, and AI."
                >
                    <div className="stack">
                        <IconCard title="MongoDB" image="./icons/mongodb.png" />
                        <IconCard title="Express" image="./icons/express.webp" />
                        <IconCard title="ReactJS" image="./icons/reactjs.png" />
                        <IconCard title="NodeJS" image="./icons/nodejs.png" />
                        <IconCard title="JavaScript" image="./icons/js.png" />
                        <IconCard title="TypeScript" image="./icons/ts.png" />
                        <IconCard title="HTML5" image="./icons/html5.png" />
                        <IconCard title="CSS3" image="./icons/css3.png" />
                        <IconCard title="Java" image="./icons/java.png" />
                        <IconCard title="Postgres" image="./icons/postgres.png" />
                        <IconCard title="Python" image="./icons/python.png" />
                        <IconCard title="Git" image="./icons/git.png" />
                        <IconCard title="npm" image="./icons/npm.png" />
                        <IconCard title="Hugging Face" image="./icons/huggingface.png" />
                        <IconCard title="Docker" image="./icons/docker.png" />
                        <IconCard title="Postman" image="./icons/postman.png" />
                        <IconCard title="VS Code" image="./icons/vscode.png" />
                        <IconCard title="Claude" image="./icons/claude.png" />
                        <IconCard title="GitHub Copilot" image="./icons/ghcopilot.png" />
                    </div>
                </Section>
                <Section
                    name="Certificates"
                    description="Certifications taken along the way to improve skill-set."
                >
                    <ExperienceCard
                        type="schoolar"
                        title="MTA - Windows Systems Fundamentals @ Microsoft"
                        timerange="2019"
                        about=""
                    />
                    <ExperienceCard
                        type="schoolar"
                        title="Deep Learning Specialization @ Coursera"
                        timerange="2025"
                        about=""
                    />
                </Section>
                <Section
                    name="Projects"
                    description="A collection of projects I’ve built while learning and experimenting."
                >
                    <div className="projects">
                        <ProjectCard
                            title="Sentiment API"
                            image="./projects/sentimentapi.png"
                            tags={["Python", "FastAPI", "HuggingFace", "Docker"]}
                            repo="https://github.com/xbdrc/sentiment-api"
                        />
                        <ProjectCard
                            title="ITJobs Analyzer"
                            image="./projects/itjobsanalyzer.png"
                            tags={["Python", "Streamlit"]}
                            repo="https://github.com/xbdrc/itjobs-analyzer"
                            live="https://itjobsviz.streamlit.app"
                        />
                        <ProjectCard
                            title="Portfolio"
                            image="./projects/portfolio2.png"
                            tags={["ReactJS", "CSS", "TypeScript", "Vite"]}
                            repo="https://github.com/xbdrc/xbdrc.github.io"
                        />
                        <ProjectCard
                            title="MNIST"
                            image="./projects/mnist.png"
                            tags={["ReactJS", "CSS", "TensorFlow", "Vite"]}
                            repo="https://github.com/xbdrc/mnist"
                            live="https://xbdrc.github.io/mnist"
                        />
                    </div>
                </Section>
                <Section
                    name="Snippets"
                    description="A collection of reusable code examples, SQL queries, and practical command references."
                >
                    <CodeCard title='Postgres PSQL Shell Commands Sheet 🐘' file="./snippets/psql.txt" />
                    <CodeCard title='Git Commands Sheet 💾' file="./snippets/git.txt" />
                    <CodeCard title='MongoDB Commands Sheet 🍃' file="./snippets/mongodb.txt" />
                    <CodeCard title='NodeJS Simple Server 🌐' file="./snippets/index.js" />
                    <CodeCard title='CodeCard Component for ReactJS ⚛️' file="./snippets/codeCard.tsx" />
                </Section>
                <footer style={{ textAlign: "center" }}>
                    Thanks for visiting 😊
                </footer>
            </div>
        </>

    )
}