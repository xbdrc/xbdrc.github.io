/* 
    ReactJS Component - DevCard v1.0
    by Bruno Cruz (Wave)

    Built over:
    React       19.2.0
    React-Icons 5.4.0
    TypeScript  4.9.5
*/

// CSS
import styles from './DevCard.module.css'

// Icons
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";

// Properties
interface DevProps {
    name: string,
    roles: string[],
    image?: string,
    location?: string,
    github?: string,
    linkedin?: string,
    instagram?: string,
    spotify?: string,
    discord?: string,
    xtwitter?: string,
    email?: string,
}

/**
 * Developer Card Component
 * @param {object} DevProps
 * @property name - String - The developer's name
 * @property roles - Array<String> - Main roles
 * @property image - String - Path to an image
 * @property location - String - Location the developer is based on
 * @property github - String - GitHub account handle
 * @property linkedin - String - LinkedIn account handle
 * @property instagram - String - Instagram account handle
 * @property spotify - String - Spotify account URL
 * @property discord - String - Discord URL like "https://discord.com/users" + USER ID
 * @property xtwitter - String - X/Twitter account handle  
 * @property email - String - Contact email
*/
export default function DevCard({ name, roles, image, location, github, linkedin, instagram, spotify, discord, xtwitter, email }: DevProps) {

    return (
        <div className={styles.container}>
            <div>
                {image && <img className={styles.image} alt={name} src={image} />}
                <span className={styles.name}>{name}</span>
                <span className={styles.location}><FaLocationDot /> {location}</span>
                <span className={styles.roles}>{roles.map((v, k) => <text>{v} {k != roles.length - 1 ? " | " : ""} </text>)}</span>
                <div className={styles.socials}>
                    {github && <a href={"https://github.com/" + github} target='_blank' title='GitHub'><FaGithub /></a>}
                    {linkedin && <a href={"https://linkedin.com/in/" + linkedin} target='_blank' title='LinkedIn'><FaLinkedin /></a>}
                    {instagram && <a href={"https://instagram.com/" + instagram} target='_blank' title='Instagram'><FaInstagram /></a>}
                    {spotify && <a href={spotify} target='_blank' title='Spotify'><FaSpotify /></a>}
                    {discord && <a href={discord} target='_blank' title='Discord'><FaDiscord /></a>}
                    {xtwitter && <a href={"https://x.com/" + xtwitter} target='_blank' title='X/Twitter'><FaXTwitter /></a>}
                    {email && <a href={"mailto:" + email} title='E-mail'><IoChatbubbleEllipses /></a>}
                </div>
            </div>
        </div>
    )

}