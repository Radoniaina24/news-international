import React, { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  description: string;
}

const SponsorBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  const sponsors: Sponsor[] = [
    {
      id: "1",
      name: "TechCorp",
      logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100",
      url: "https://example.com",
      description: "Solutions technologiques innovantes",
    },
    {
      id: "2",
      name: "GlobalBank",
      logo: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100",
      url: "https://example.com",
      description: "Votre partenaire financier de confiance",
    },
    {
      id: "3",
      name: "EcoEnergy",
      logo: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=100",
      url: "https://example.com",
      description: "Énergies renouvelables pour l'avenir",
    },
  ];

  // Rotation automatique des sponsors
  useEffect(() => {
    if (sponsors.length > 1) {
      const interval = setInterval(() => {
        setCurrentSponsorIndex((prev) => (prev + 1) % sponsors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sponsors.length]);

  if (!isVisible || sponsors.length === 0) {
    return null;
  }

  const currentSponsor = sponsors[currentSponsorIndex];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Partenaire
            </span>
            <div className="flex items-center space-x-3">
              <Image
                src={currentSponsor.logo}
                alt={currentSponsor.name}
                className="w-8 h-8 rounded object-cover"
                width={400}
                height={400}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {currentSponsor.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {currentSponsor.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={currentSponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              En savoir plus
              <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Indicateurs de pagination */}
            {sponsors.length > 1 && (
              <div className="flex space-x-1">
                {sponsors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSponsorIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSponsorIndex
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Fermer la bannière"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;
