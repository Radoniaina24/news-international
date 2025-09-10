import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Advertisement {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundColor: string; // Changé pour stocker les vraies valeurs de couleur
  textColor: string; // Changé pour stocker les vraies valeurs de couleur
  link: string;
}

const ProfessionalBanner: React.FC = () => {
  const advertisements: Advertisement[] = [
    {
      id: 1,
      title: "E-media Madagascar",
      description:
        "E-Media est une université qui propose des Licences et Masters en TIC, Communication Audiovisuelle et Numérique, Marketing Digital, Journalisme, Management et Droit (100 % en ligne), ainsi que des formations professionnelles, certifiantes et modulaires accessibles à tous.",
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
        "Le Carrefour de l'Emploi – Madagascar 2025 se tiendra au prestigieux Carlton Madagascar, un hôtel 5 étoiles emblématique situé au cœur du centre-ville d'Antananarivo.",
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
        "Écoutez de la bonne musique, vos émissions préférées et accédez à des contenus éducatifs de qualité. E-media FM : la radio économique et éducative numéro 1 à Madagascar, écoutée dans plus de 5 grandes régions du pays.",
      buttonText: "Découvrir",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1747805711/radio_tfde71.jpg",
      backgroundColor: "linear-gradient(to right, #f97316, #dc2626)",
      textColor: "text-white",
      link: "https://www.facebook.com/people/E-media-FM-1078/61550542922049/?mibextid=wwXIfr&rdid=1mqNoLtaobBsb7sS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18v4DXYssJ%2F%3Fmibextid%3DwwXIfr",
    },
    // {
    //   id: 4,
    //   title: "Service Premium",
    //   description:
    //     "Bénéficiez d'un accompagnement personnalisé 24h/24 avec notre équipe d'experts dédiés",
    //   buttonText: "Contactez-nous",
    //   image:
    //     "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop&crop=center",
    //   backgroundColor: "linear-gradient(to right, #4f46e5, #1d4ed8)", // indigo-600 to blue-700
    //   textColor: "text-white",
    // },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Auto-rotation des publicités
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number): void => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const currentAd = advertisements[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-2xl">
      {/* Background gradient avec style inline */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{ background: currentAd.backgroundColor }}
      />

      {/* Background image avec overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentAd.image})` }}
      >
        <div className="absolute inset-0 bg-black/85 bg-opacity-50" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Section texte */}
            <div
              className={`${
                currentAd.textColor
              } transform transition-all duration-700 ${
                isAnimating
                  ? "translate-x-8 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                {currentAd.title}
              </h1>
              <p className="text-lg  mb-6 sm:mb-8 leading-relaxed opacity-90 max-w-2xl">
                {currentAd.description}
              </p>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={currentAd.link}
                className="bg-white text-gray-900 text-sm px-6 py-3 rounded-full font-semibold   hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {currentAd.buttonText}
              </Link>
            </div>

            {/* Section image (cachée sur mobile, visible sur large écrans) */}
            <div className="hidden lg:block">
              <div
                className={`transform transition-all duration-700 ${
                  isAnimating
                    ? "translate-x-8 opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <img
                  src={currentAd.image}
                  alt={currentAd.title}
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="hidden md:block">
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <button
            onClick={prevSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} className="text-black" />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <button
            onClick={nextSlide}
            className="bg-white bg-opacity-20 hover:bg-opacity-30  p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronRight size={20} className="text-black" />
          </button>
        </div>
      </div>

      {/* Indicateurs de pagination */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2 sm:space-x-3">
          {advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentIndex + 1) / advertisements.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalBanner;
