/* 
    ReactJS Component - Button v1.0
    by Bruno Cruz (Wave)

    Built over:
    react                       18.3.1
    typescript                  5.9.3
*/

// CSS
import styles from './PictureCard.module.css'

interface ButtonProps {
    title?: string,
    source: string,
}

// Component
export default function PictureCard({ title = "Photography", source }: ButtonProps) {

    // TODO
    // - Open container
    // - Close container
    // - 

    const handleOpen = () => {
        return
    }

    return (
        <>
            <img className={styles.img} src={source} onClick={handleOpen} title={title} />
            <div className={styles.image}>
                <img src={source} />
            </div>
        </>
    );

}