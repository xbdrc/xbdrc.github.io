/* 
    ReactJS Component - ProjectCard v1.0
    by Bruno Cruz (Wave)

    Built over:
    React       19.2.0
    React-Icons 5.4.0
    TypeScript  4.9.5
*/

// CSS
import styles from "./ProjectCard.module.css"

// Icons
import { FaGithub, FaLink } from "react-icons/fa"
import { IoMdDownload } from "react-icons/io";

// Properties
interface ProjectProps {
    title: string,
    image?: string,
    tags?: string[],
    repo?: string,
    live?: string,
    download?: string,
}

// Component
export default function ProjectCard({ title, image, tags, repo, live, download }: ProjectProps) {
    
    return (
        <div className={styles.container}>
            <img alt={title} src={image} className={styles.image} />
            <div className={styles.info}>
                <span className={styles.title}>{title}</span>
                <div className={styles.tags}>
                    {tags?.map(v => <span>{v}</span>)}
                </div>
                <div className={styles.urls}>
                    {repo && <a href={repo} target="_blank"><FaGithub />&nbsp;Repo</a>}
                    {live && <a href={live} target="_blank"><FaLink />&nbsp;Live</a>}
                    {download && <a href={download} target="_blank" download><IoMdDownload />&nbsp;Download</a>}
                </div>
            </div>
        </div>
    )
}