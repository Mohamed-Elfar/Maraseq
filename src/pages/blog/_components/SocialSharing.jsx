import { FaFacebookF, FaTwitter, FaLinkedin, FaWhatsapp, FaLink, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getSocialLinks } from "@/lib/supabase";
import { canShowAtPosition } from "@/lib/socialPosition";

const SocialShare = ({ blog }) => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const links = await getSocialLinks();
        
        const filteredLinks = links.filter((link) => canShowAtPosition(link?.position, "news"));
        setSocialLinks(filteredLinks);
      } catch (error) {
      }
    };

    fetchSocialLinks();
  }, []);

  // Map icon names to React Icons
  const getIconComponent = (iconName) => {
    const iconMap = {
      'FaFacebookF': FaFacebookF,
      'FaTwitter': FaTwitter,
      'FaLinkedin': FaLinkedin,
      'FaWhatsapp': FaWhatsapp,
      'FaInstagram': FaInstagram,
      'FaTiktok': FaTiktok,
      'FaLink': FaLink,
    };
    const iconComponent = iconMap[iconName] || FaLink;
    console.log('SocialSharing - Icon mapping:', iconName, '->', iconComponent);
    return iconComponent;
  };

  // Social sharing functions
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const blogTitle = blog.title || 'Maraseq News';
  const blogDescription = blog.excerpt || blog.shortDescription || 'Check out this article from Maraseq';

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(blogTitle)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `${blogTitle} - ${blogDescription}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blogTitle)}&summary=${encodeURIComponent(blogDescription)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = `${blogTitle} - ${blogDescription} ${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyLink = async (url = currentUrl) => {
    try {
      await navigator.clipboard.writeText(url);
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.textContent = 'Link copied to clipboard!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
      `;
      
      // Add animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(notification);
      
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
          document.body.removeChild(notification);
          document.head.removeChild(style);
        }, 300);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  return (
    <div className="ltn__social-media text-end col-lg-4">
      <h4>Social Share</h4>
      <ul>
        {socialLinks.map((social) => {
          console.log('SocialSharing - Rendering social link:', social);
          const IconComponent = getIconComponent(social.icon);
          const shareFunctions = {
            'FaceBook': shareOnFacebook,
            'Instagram': () => window.open(social.url, '_blank'),
            'Tiktok': () => window.open(social.url, '_blank'),
            'linkedind': shareOnLinkedIn,
            'WhatsApp': shareOnWhatsApp,
            'Link': () => copyLink(social.url),
          };
          
          const shareFunction = shareFunctions[social.name] || (() => {});
          const colors = {
            'FaceBook': '#1877f2',
            'Instagram': '#E4405F',
            'Tiktok': '#000000',
            'linkedind': '#0077b5',
            'WhatsApp': '#25d366',
            'Link': '#6c757d',
          };
          
          const color = colors[social.name] || '#6c757d';
          
          return (
            <li key={social.id}>
              <button 
                onClick={() => social.name === 'Link' ? shareFunction() : shareFunction()}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '4px',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                  margin: '0 2px'
                }} 
                title={`Share on ${social.name}`}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = color;
                  e.target.querySelector('svg').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.querySelector('svg').style.color = color;
                }}
              >
                <IconComponent style={{ color, fontSize: '14px' }} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialShare;
