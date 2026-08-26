// CSS
import styles from './InfoCard.module.css'

// Properties
interface InfoCardProps {
    title: string,
    subtitle: string,
    children: any,
}

// Component
export default function InfoCard({ title, subtitle, children }: InfoCardProps) {
    
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <h4>{subtitle}</h4>
            {children}
        </div>
    )

}