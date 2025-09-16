import React from "react";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  social: {
    facebook?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

const TeamComponent: React.FC = () => {
  // Données d'exemple pour l'équipe
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Claudino Rojo Andrianasolo",
      position: "Chairman",
      description:
        "Docteur en économie du développement, spécialiste en relations internationales, diplomatie économique et stratégies panafricaines, avec une expérience confirmée.",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1758004034/PDG2_rsx1xs.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/1234567890",
      },
    },
    {
      id: 2,
      name: "Berty Salva",
      position: "Directeur Politique & Diplomatie",
      description:
        "Expert en analyse politique, relations institutionnelles et diplomatie stratégique, engagé dans la consolidation des partenariats pour l’Afrique et l’océan Indien.",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1758004144/2c_kqunby.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/1234567890",
      },
    },
    {
      id: 3,
      name: "Prem Sham",
      position: "Directeur Tourisme & Patrimoine",
      description:
        "Spécialiste en développement touristique, valorisation culturelle et promotion internationale, impliqué dans la mise en valeur des patrimoines et destinations africaines.",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1758004285/Dolce2_k5b7q6.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/1234567890",
      },
    },
    {
      id: 4,
      name: "Claudio Andrianasolo",
      position: "Directeur Médias & Communication",
      description:
        "Spécialiste en communication et stratégies médiatiques, œuvrant pour le développement des plateformes panafricaines d’information et de diffusion. Membre actif de l’OJM.",
      image:
        "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1758005336/j1_avf6c8.jpg",
      social: {
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/1234567890",
      },
    },
  ];

  const SocialIcon: React.FC<{ type: string; url: string }> = ({
    type,
    url,
  }) => {
    const handleClick = () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const iconProps = {
      size: 20,
      className: "transition-colors duration-200",
    };

    switch (type) {
      case "facebook":
        return (
          <button
            onClick={handleClick}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook {...iconProps} />
          </button>
        );
      case "linkedin":
        return (
          <button
            onClick={handleClick}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin {...iconProps} />
          </button>
        );
      case "whatsapp":
        return (
          <button
            onClick={handleClick}
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <MessageCircle {...iconProps} />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre Équipe
          </h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Découvrez les talents passionnés qui donnent vie à nos projets et
            accompagnent nos clients vers le succès.
          </p>
        </div>

        {/* Grille des membres de l'équipe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="p-6 pb-4">
                <div className="w-32 h-32 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border-4 border-gray-100"
                  />
                </div>

                {/* Nom */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>

                {/* Poste */}
                <p className="text-blue-600 font-semibold text-center mb-4">
                  {member.position}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
                  {member.description}
                </p>
              </div>

              {/* Réseaux sociaux */}
              <div className="px-6 pb-6">
                <div className="flex justify-center space-x-3">
                  {member.social.facebook && (
                    <SocialIcon type="facebook" url={member.social.facebook} />
                  )}
                  {member.social.linkedin && (
                    <SocialIcon type="linkedin" url={member.social.linkedin} />
                  )}
                  {member.social.whatsapp && (
                    <SocialIcon type="whatsapp" url={member.social.whatsapp} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
