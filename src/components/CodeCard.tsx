/* 
    ReactJS Component - CodeCard v1.0
    by Bruno Cruz (Wave)

    Built over:
    react                       18.3.1
    react-icons                 5.5.0
    react-syntax-highlighter    16.1.0
    typescript                  5.9.3
*/

// Modules
import { useEffect, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { qtcreatorDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// CSS
import styles from './CodeCard.module.css'

// Icons
import { FaCopy, FaFileDownload, FaPython, FaHtml5, FaCss3Alt, FaReact, FaCode } from "react-icons/fa";
import { TbTextIncrease, TbTextDecrease, TbBrandCpp } from "react-icons/tb";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { IoDocumentText } from "react-icons/io5";

// Properties
type CodeProps = {
    file: string;
    title?: string;
    clipboard?: boolean;
    download?: boolean;
    size?: boolean
}

// Component
export default function CodeCard({ file, title = "Code Snippet", clipboard = true, download = true, size = true }: CodeProps) {

    const [content, setContent] = useState("")
    const [textSize, setTextSize] = useState(16)
    const [notifText, setNotifiText] = useState("Notification")
    const [showingNotif, setShowingNotif] = useState<"visible" | "hidden">("hidden");
    const extension = file.split('.').pop() || "";
    const fileTitle = file.split("/").pop() || "";
    const lines = content.split("\n")

    const language = ({
        js: { name: "JavaScript", icon: <SiJavascript size={16} /> },
        jsx: { name: "JavaScript", icon: <FaReact size={16} /> },
        ts: { name: "TypeScript", icon: <SiTypescript size={16} /> },
        tsx: { name: "TypeScript", icon: <FaReact size={16} /> },
        py: { name: "Python", icon: <FaPython size={16} /> },
        html: { name: "HTML", icon: <FaHtml5 size={16} /> },
        css: { name: "CSS", icon: <FaCss3Alt size={16} /> },
        c: { name: "C", icon: <FaCode size={16} /> },
        cpp: { name: "C++", icon: <TbBrandCpp size={16} /> },
        txt: { name: "Text", icon: <IoDocumentText size={16} /> }
    } as Record<string, { name: string; icon: React.ReactNode }>)[extension] || { name: "File", icon: <FaCode size={16} /> };

    useEffect(() => {
        fetch(file).then(res => res.text()).then(setContent)
    }, [file])

    function copyToClipboard(content: string) {
        navigator.clipboard.writeText(content)
        showNotification("Copied to clipboard!")
    }

    function changeFontSize(size: number) {
        const newSize = Math.min(24, Math.max(12, textSize + size));
        setTextSize(newSize);
        showNotification("Font Size: " + newSize);
    }

    function downloadSnippet() {
        const anchor = document.createElement("a")
        anchor.href = file
        anchor.download = fileTitle
        anchor.click()
        showNotification("Downloading file...")
    }

    function showNotification(info: string) {
        setNotifiText(info)
        setShowingNotif("visible")
        setTimeout(() => setShowingNotif("hidden"), 1000)
    }

    return (
        <pre className={styles.container}>
            <div className={styles.topBar}>
                <label className={styles.title}>{title}</label>
                <div className={styles.right}>
                    <label>{language.icon} {language.name + " (." + extension + ")"}</label>
                    {clipboard && <button className={styles.barButton} title="Copy to clipboard" onClick={() => copyToClipboard(content)}><FaCopy size={16} /></button>}
                    {download && <button className={styles.barButton} title="Download file" onClick={downloadSnippet}><FaFileDownload size={16} /></button>}
                    {size && <>
                        <button className={styles.barButton} title="Increase text size" onClick={() => changeFontSize(1)}><TbTextIncrease size={16} /></button>
                        <button className={styles.barButton} title="Decrease text size" onClick={() => changeFontSize(-1)}><TbTextDecrease size={16} /></button>
                    </>}
                </div>
            </div>
            <hr />
            <div className={styles.codeWrapper}>
                <pre className={styles.lineNumbers}>
                    {lines.map((_, i) => (i + 1)).join("\n")}
                </pre>
                <pre className={styles.codeArea}>
                    <SyntaxHighlighter language={language.name.toLowerCase()} style={qtcreatorDark} customStyle={{ backgroundColor: "transparent", fontSize: textSize }} >
                        {content}
                    </SyntaxHighlighter>
                </pre>
            </div>
            <div className={styles.notification} style={{ visibility: showingNotif }}>
                {notifText}
            </div>
        </pre>
    )

}
