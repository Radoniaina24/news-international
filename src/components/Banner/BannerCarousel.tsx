import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Advertisement {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  link: string;
}

const ProfessionalBanner: React.FC = () => {
  const advertisements: Advertisement[] = [
    {
      id: 1,
      title: "E-media Madagascar",
      description:
        "E-Media propose des Licences et Masters en TIC, Communication, Marketing Digital, Journalisme, Management et Droit (100 % en ligne).",
      buttonText: "Découvrir",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1747222338/logoEmedia_ookb0v.jpg",
      backgroundColor: "linear-gradient(to right, #2563eb, #7c3aed)",
      textColor: "text-white",
      link: "https://e-mediauniversity.io/",
    },
    {
      id: 2,
      title: "Carrefour de l'Emploi et des études",
      description:
        "Le Carrefour de l'Emploi – Madagascar 2025 aura lieu au Carlton Madagascar, un hôtel 5 étoiles au cœur d'Antananarivo.",
      buttonText: "Consulter",
      image:
        "https://res.cloudinary.com/dikefxjpd/image/upload/v1753865346/logo_m3t5cg.jpg",
      backgroundColor: "linear-gradient(to right, #10b981, #0d9488)",
      textColor: "text-white",
      link: "https://carrefour-emploi-etudes.com/",
    },
    {
      id: 3,
      title: "E-media FM",
      description:
        "Écoutez vos émissions préférées et profitez de contenus éducatifs de qualité. E-media FM : la radio économique et éducative numéro 1 à Madagascar.",
      buttonText: "Découvrir",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1747805711/radio_tfde71.jpg",
      backgroundColor: "linear-gradient(to right, #f97316, #dc2626)",
      textColor: "text-white",
      link: "https://www.facebook.com/people/E-media-FM-1078/61550542922049/",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i === advertisements.length - 1 ? 0 : i + 1));
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i === 0 ? advertisements.length - 1 : i - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const currentAd = advertisements[currentIndex];

  return (
    <div className="relative w-full h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden shadow-lg">
      {/* Fond */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{ background: currentAd.backgroundColor }}
      />
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentAd.image})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div
              className={`${currentAd.textColor} transition-all duration-700 ${
                isAnimating
                  ? "translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <h1 className="text-lg md:text-xl font-bold mb-2 leading-snug">
                {currentAd.title}
              </h1>
              <p className="text-xs md:text-sm mb-3 opacity-90 max-w-md">
                {currentAd.description}
              </p>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={currentAd.link}
                className="bg-white text-gray-900 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow"
              >
                {currentAd.buttonText}
              </Link>
            </div>
            {/* Image (desktop) */}
            <div className="hidden lg:block">
              <img
                src={currentAd.image}
                alt={currentAd.title}
                className="w-full h-40 object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Flèches */}
      <div className="hidden md:block">
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-1.5 rounded-full backdrop-blur-sm transition hover:scale-110 z-20"
          disabled={isAnimating}
        >
          <ChevronLeft size={16} className="text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-1.5 rounded-full backdrop-blur-sm transition hover:scale-110 z-20"
          disabled={isAnimating}
        >
          <ChevronRight size={16} className="text-black" />
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
        {advertisements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalBanner;
