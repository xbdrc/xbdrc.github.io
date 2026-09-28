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
    style?: any,
}

// Default variants — fade + slide, entrada mais lenta, saída mais rápida
const defaultVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

// Default viewport — once: false para animar em ambas direções do scroll
const defaultViewport = {
    once: false,
    amount: "some" as const
}

// Component
export default function Section({
    name,
    showName = true,
    description,
    children,
    initial = "hidden",
    animate,
    whileInView = "visible",
    transition,
    variants = defaultVariants,
    viewport = defaultViewport,
    style
}: SectionProps) {

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
            style={{ ...style, minHeight: "100vh", display: "flex", justifyContent: "center" }}
        >
            {showName && <h1 className={styles.title}>{name}</h1>}
            <p style={{ fontStyle: "italic" }} className={styles.description}>{description}</p>
            {children}
        </motion.section>
    )

}