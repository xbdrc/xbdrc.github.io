/* 
    ReactJS Component - Button v1.0
    by Bruno Cruz (Wave)

    Built over:
    react                       18.3.1
    typescript                  5.9.3
*/

// CSS
import styles from './Button.module.css'

// Properties
type Position = "left" | "right" | "top" | "bottom"

interface ButtonProps {
    title?: string,
    icon?: React.ReactNode,
    iconPosition?: Position,
    tooltip?: string,
    tooltipPosition?: Position,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>,
    onMouseOut?: React.MouseEventHandler<HTMLButtonElement>,
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>,
    onMouseOver?: React.MouseEventHandler<HTMLButtonElement>,
}

// Component
export default function Button({ title = "Click me 👆" , icon, iconPosition = "left", tooltip = "I'm a tooltip ℹ️", tooltipPosition = "top", onClick = () => alert("Hello, World! 🌍"), onDoubleClick, onMouseOut, onMouseEnter, onMouseOver }: ButtonProps) {

    return (
        <div className={styles.container}>
            {tooltip && (
                <div className={`${styles.tooltip} ${styles[tooltipPosition]}`}>
                    {tooltip}
                </div>
            )}
            <button
                className={styles.button}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseOut={onMouseOut}
                onMouseEnter={onMouseEnter}
                onMouseOver={onMouseOver}
            >
                {iconPosition === "top" && icon}
                <div>
                    {iconPosition === "left" && icon} <span>{title}</span>{" "}
                    {iconPosition === "right" && icon}
                </div>
                {iconPosition === "bottom" && icon}
            </button>
        </div>
    );

}