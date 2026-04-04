import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { getSocialLinks } from "@/lib/supabase";
import { canShowAtPosition } from "@/lib/socialPosition";

const FALLBACK_SOCIALS = [
  {
    id: "fallback-facebook",
    name: "Facebook",
    icon: "FaFacebookF",
    url: "https://www.facebook.com/maraseqgroup",
    position: "both",
    order_index: 1,
  },
  {
    id: "fallback-twitter",
    name: "Twitter",
    icon: "FaTwitter",
    url: "https://twitter.com/maraseqgroup",
    position: "both",
    order_index: 2,
  },
  {
    id: "fallback-linkedin",
    name: "LinkedIn",
    icon: "FaLinkedin",
    url: "https://www.linkedin.com/in/maraseqgroup/",
    position: "both",
    order_index: 3,
  },
  {
    id: "fallback-instagram",
    name: "Instagram",
    icon: "FaInstagram",
    url: "https://www.instagram.com/maraseqgroup/",
    position: "both",
    order_index: 4,
  },
];

const bySavedOrder = (left, right) => {
  const leftOrder = Number(left?.order_index ?? left?.order ?? 0);
  const rightOrder = Number(right?.order_index ?? right?.order ?? 0);

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return String(left?.name || "").localeCompare(String(right?.name || ""));
};

const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") {
    return FaIcons.FaLink;
  }

  return FaIcons[iconName] || FaIcons.FaLink;
};

const FollowUs = ({ title }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const links = await getSocialLinks();
        setSocialLinks(Array.isArray(links) ? links : []);
      } catch (error) {
        console.error("Failed to load Follow Us links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const visibleLinks = useMemo(() => {
    const sourceLinks = loading ? FALLBACK_SOCIALS : socialLinks;

    return sourceLinks
      .filter((link) => link?.active !== false)
      .filter((link) => canShowAtPosition(link?.position, "news"))
      .sort(bySavedOrder);
  }, [loading, socialLinks]);

  return (
    <>
      <div className="widget ltn__social-media-widget">
        <h4 className="ltn__widget-title ltn__widget-title-border-2">
          {title}
        </h4>
        <div className="ltn__social-media-2">
          <ul>
            {visibleLinks.map((link) => {
              const IconComponent = getIconComponent(link.icon);

              return (
                <li key={link.id || `${link.name}-${link.url}`}>
                  <Link
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name || "Social Link"}
                  >
                    <IconComponent />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FollowUs;
