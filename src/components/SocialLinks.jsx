import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaTwitter } from 'react-icons/fa';
import clsx from 'clsx';

const SOCIAL_LINKS = [
    {
        name: 'WhatsApp',
        icon: FaWhatsapp,
        url: '#',
        color: 'hover:text-green-500',
        bg: 'hover:bg-green-500/10',
        border: 'hover:border-green-500/50',
        subLinks: [
            { name: 'மேலக்களம்', url: 'https://chat.whatsapp.com/DGv7RbMGvfS2PjotbK8DE7' },
            { name: 'களர்பட்டி', url: 'https://chat.whatsapp.com/FKWs55T5jwOEYdJ1vY6fHF?mode=gi_t' }
        ]
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        // No single URL
        url: '#',
        color: 'hover:text-pink-500',
        bg: 'hover:bg-pink-500/10',
        border: 'hover:border-pink-500/50',
        subLinks: [
            { name: 'தென்னலூர் மண்ணு', url: 'https://www.instagram.com/thennalur__mannu/' },
            { name: 'தென்னலூர் சீமை', url: 'https://www.instagram.com/thennalur_seemai_/' }
        ]
    },
    {
        name: 'YouTube',
        icon: FaYoutube,
        url: 'https://youtube.com/@thirunallurjallikattu', // Replace with actual channel
        color: 'hover:text-red-600',
        bg: 'hover:bg-red-600/10',
        border: 'hover:border-red-600/50'
    },
    {
        name: 'Facebook',
        icon: FaFacebook,
        url: 'https://facebook.com/thirunallurjallikattu', // Replace with actual page
        color: 'hover:text-blue-600',
        bg: 'hover:bg-blue-600/10',
        border: 'hover:border-blue-600/50'
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        url: 'https://twitter.com/thirunallur_jk', // Replace with actual handle
        color: 'hover:text-sky-500',
        bg: 'hover:bg-sky-500/10',
        border: 'hover:border-sky-500/50'
    }
];

export default function SocialLinks({ lang, vertical = false }) {
    const [activeDropdown, setActiveDropdown] = React.useState(null);

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <div className={clsx(
            "flex gap-4 items-center justify-center p-4",
            vertical ? "flex-col fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-black/20 backdrop-blur-sm rounded-l-xl border-y border-l border-white/10" : ""
        )}>
            {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                const hasSubLinks = social.subLinks && social.subLinks.length > 0;

                if (hasSubLinks) {
                    return (
                        <div key={social.name} className="relative group">
                            <button
                                onClick={() => toggleDropdown(social.name)}
                                className={clsx(
                                    "p-3 rounded-full border border-zinc-800 bg-zinc-900/80 transition-all duration-300 relative z-10",
                                    social.color,
                                    social.bg,
                                    social.border,
                                    "hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer"
                                )}
                                title={social.name}
                            >
                                <Icon size={20} className="text-zinc-400 group-hover:text-inherit transition-colors" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={clsx(
                                "absolute bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 z-20 w-48",
                                vertical ? "right-full mr-4 top-1/2 -translate-y-1/2 origin-right" : "bottom-full mb-4 left-1/2 -translate-x-1/2 origin-bottom",
                                activeDropdown === social.name ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible hover:visible group-hover:opacity-100 group-hover:scale-100 group-hover:visible"
                            )}>
                                <div className="py-1">
                                    {social.subLinks.map((sub, idx) => (
                                        <a
                                            key={idx}
                                            href={sub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white font-tamil transition-colors border-b border-white/5 last:border-0"
                                        >
                                            {sub.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                            "group relative p-3 rounded-full border border-zinc-800 bg-zinc-900/80 transition-all duration-300",
                            social.color,
                            social.bg,
                            social.border,
                            "hover:scale-110 shadow-lg hover:shadow-xl"
                        )}
                        title={social.name}
                    >
                        <Icon size={20} className="text-zinc-400 group-hover:text-inherit transition-colors" />

                        {/* Tooltip for vertical mode */}
                        {vertical && (
                            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {social.name}
                            </span>
                        )}
                    </a>
                );
            })}
        </div>
    );
}
