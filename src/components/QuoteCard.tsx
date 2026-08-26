// CSS
import styles from './QuoteCard.module.css'

// Properties
type Effect = "static" | "fade" | "zoom" | "slide"

interface QuoteProps {
    quotes: string[],
    effect?: Effect,
    font?: string,
    italic?: boolean,
    bold?: boolean,
    letterSpacing?: boolean,
}

// Component
export default function QuoteCard({ quotes=["Hello, World! 🌍"], effect = "static", font, italic, bold, letterSpacing }: QuoteProps) {

    const textStyle: React.CSSProperties = {
        fontFamily: "'" + font + "', serif",
        fontStyle: italic ? "italic" : "normal",
        fontWeight: bold ? "bold" : "normal",
        letterSpacing: letterSpacing ? "2px" : "normal",
        textAlign: "center",
        fontSize: 14
    }

    return (
        <text
            className={`${styles.base} ${styles[effect + "Animation"]}`}
            style={textStyle}>
            "{quotes[Math.floor(Math.random() * quotes.length)]}"
        </text>
    )
    
}