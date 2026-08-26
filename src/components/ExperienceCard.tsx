// CSS
import styles from './ExperienceCard.module.css'

// Icons
import { IoIosSchool } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";

// Properties
type type = "schoolar" | "professional"

interface ExperienceProps {
    type: type,
    title: string,
    timerange: string,
    about: string,
}

// Component
export default function ExperienceCard({ type, title, timerange, about }: ExperienceProps) {
    return (
        <div className={styles.container}>
            <div className={styles.experience}>
                <span>{type == "schoolar" ? <IoIosSchool /> : <MdOutlineWork />}</span> <span>{title}</span> <span style={{ opacity: ".6" }}>{timerange}</span>
            </div>
            <text>{about}</text>
        </div>

    )
}