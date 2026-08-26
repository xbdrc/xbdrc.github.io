// Modules
import { Link } from "react-router-dom";

// Icons
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Contact() {
    return (
        <div className="document">
            <Link to="/"><FaArrowLeftLong /> Back</Link>
        </div>
    )
}