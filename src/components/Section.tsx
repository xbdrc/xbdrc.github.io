// Modules
import { motion } from 'framer-motion'

// CSS
import styles from './Section.module.css'

// Properties
interface SectionProps {
    name: string,
    showName?: boolean,
    description?: string,
    children: any,
    // Framer Motion
    initial?: any,
    animate?: any,
    whileInView?: any,
    transition?: any,
    variants?: any,
    viewport?: any,
}

// Component
export default function Section({ name, showName = true, description, children, initial, animate, whileInView, transition, variants, viewport }: SectionProps) {

    return (
        <motion.section
            id={name.toLowerCase()}
            className={styles.container}
            initial={initial}
            animate={animate}
            whileInView={whileInView}
            transition={transition}
            variants={variants}
            viewport={viewport}
        >
            {showName && <h1 className={styles.title}>{name}</h1>}
            <text style={{ fontStyle: "italic" }} className={styles.description}>{description}</text>
            {children}
        </motion.section>
    )

}