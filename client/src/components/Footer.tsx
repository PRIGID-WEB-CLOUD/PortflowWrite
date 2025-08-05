import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Store", href: "/store" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com",
        icon: Github,
        color: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin,
        color: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      },
      {
        name: "Twitter",
        href: "https://twitter.com",
        icon: Twitter,
        color: "text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200"
      },
      {
        name: "Email",
        href: "mailto:alex@example.com",
        icon: Mail,
        color: "text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      },
    ]
  };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4" data-testid="footer-brand">
              <h2 className="text-2xl font-bold text-primary">Alex Chen</h2>
            </Link>
            <p className="text-secondary mb-6 max-w-md leading-relaxed">
              Full-stack developer passionate about creating beautiful, functional web applications 
              that solve real-world problems. Based in San Francisco, CA.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors duration-300 ${social.color}`}
                  data-testid={`footer-social-${social.name.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors duration-300"
                    data-testid={`footer-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3 text-secondary">
              <p>
                <a 
                  href="mailto:alex@example.com" 
                  className="hover:text-primary transition-colors duration-300"
                  data-testid="footer-email"
                >
                  alex@example.com
                </a>
              </p>
              <p>San Francisco, CA</p>
              <p className="text-sm">
                Available for freelance projects and full-time opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-secondary text-sm flex items-center">
            © {currentYear} Alex Chen. Made with{" "}
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            in San Francisco.
          </p>
          <p className="text-secondary text-sm mt-2 sm:mt-0">
            Built with React, TypeScript, and modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}