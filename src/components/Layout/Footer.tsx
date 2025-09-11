import React from "react";
import Link from "next/link";

import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// 🔗 Liens dynamiques
const categories = [
  { href: "/category/politique", label: "Politique" },
  { href: "/category/economie", label: "Économie" },
  { href: "/category/sport", label: "Sport" },
  { href: "/category/technologie", label: "Technologie" },
  { href: "/category/culture", label: "Culture" },
];

const companyLinks = [
  // { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
  // { href: "/careers", label: "Carrières" },
  // { href: "/press", label: "Presse" },
  // { href: "/advertise", label: "Publicité" },
];

const legalLinks = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/terms", label: "Conditions" },
  { href: "/cookies", label: "Cookies" },
  { href: "/legal", label: "Mentions légales" },
];

// 🧩 Composant lien réutilisable
const FooterLink: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <li>
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors"
      aria-label={label}
    >
      {label}
    </Link>
  </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 🔥 Brand */}
          <div>
            <div className="flex justify-center  lg:justify-start mb-5">
              <Image
                src={
                  "https://res.cloudinary.com/dnfdr35vf/image/upload/v1757224496/LOgo_avec_fond_nhokt0.jpg"
                }
                alt="logo"
                width={250}
                height={250}
              />
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre source d&apos;information fiable pour l&apos;actualité
              internationale. Nous couvrons tous les domaines qui façonnent
              notre monde.
            </p>
          </div>

          {/* 📂 Catégories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              {categories.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* 🏢 Entreprise */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* 📧 Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Recevez les dernières actualités directement dans votre boîte
              mail.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                aria-label="Adresse email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                S&apos;abonner
              </button>
            </div>

            {/* 📍 Contact Info */}
            <div className="mt-6 space-y-2 text-gray-300">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">redaction@gateofafrica.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  +230 5 782 8567 | +261 32 05 777 47
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">île de Maurice </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔒 Bas de page */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Gate of Africa Magazine. Tous droits
              réservés.
            </p>
            <ul className="flex space-x-6 text-sm">
              {legalLinks.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
