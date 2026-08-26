/* 
    ReactJS Component - Card v1.0
    by Bruno Cruz (Wave)

    Built over:
    React       19.2.0
    TypeScript  4.9.5
*/

// CSS
import styles from './IconCard.module.css'

// Properties
interface CardProps {
    title: string,
    image?: string,
    description?: string,
}

// Component
export default function Card({ title, image, description }: CardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {image && <img className={styles.image} alt={title} src={image} />}
                <h4 className={styles.title}>{title}</h4>
            </div>
            {description &&
                <div className={styles.description}>
                    {description}
                </div>
            }
        </div>
    )
}