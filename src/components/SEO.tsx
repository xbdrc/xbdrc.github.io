// Modules
import { Helmet } from "react-helmet-async";

// Properties
interface SEOProps {
    title: string,
    description: string,
    image: string,
    url: string,
}

export default function SEO({ title, description, image, url }: SEOProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Open Graph (social sharing) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
}
