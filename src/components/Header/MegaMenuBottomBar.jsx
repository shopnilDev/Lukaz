import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function MegaMenuBottomBar() {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex justify-center space-x-6">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#3A9E75] transition-colors duration-200"
              aria-label={link.name}
            >
              <Icon className="w-6 h-6" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
