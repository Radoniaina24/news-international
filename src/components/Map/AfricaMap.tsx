"use client";
/* eslint-disable */
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson";

const AfricaMap = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  // Liste des pays africains avec variantes de noms
  const africanCountries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Cape Verde",
    "Central African Rep.",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Dem. Rep. Congo",
    "Democratic Republic of the Congo",
    "Congo",
    "Republic of the Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eq. Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Côte d'Ivoire",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "São Tomé and Principe",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "S. Sudan",
    "South Sudan",
    "Sudan",
    "Swaziland",
    "eSwatini",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
    "W. Sahara",
    "Western Sahara",
  ];

  // Fonction pour obtenir la couleur d'un pays
  const getCountryColor = (countryName: string): string => {
    const normalizedName = countryName.toLowerCase().trim();

    // Afrique du Nord
    if (normalizedName.includes("egypt")) return "#0ea5e9";
    if (normalizedName.includes("libya")) return "#06b6d4";
    if (normalizedName.includes("tunisia")) return "#0284c7";
    if (normalizedName.includes("algeria")) return "#0369a1";
    if (normalizedName.includes("morocco")) return "#075985";
    if (normalizedName.includes("sahara")) return "#7dd3fc";

    // Afrique de l'Ouest
    if (normalizedName.includes("nigeria")) return "#10b981";
    if (normalizedName.includes("ghana")) return "#059669";
    if (normalizedName.includes("senegal")) return "#047857";
    if (normalizedName.includes("mali")) return "#065f46";
    if (normalizedName.includes("niger") && !normalizedName.includes("nigeria"))
      return "#6ee7b7";
    if (normalizedName.includes("burkina")) return "#34d399";
    if (normalizedName.includes("guinea") && !normalizedName.includes("eq"))
      return "#10b981";
    if (normalizedName.includes("côte") || normalizedName.includes("ivory"))
      return "#14b8a6";
    if (normalizedName.includes("benin")) return "#0d9488";
    if (normalizedName.includes("togo")) return "#0f766e";
    if (normalizedName.includes("sierra")) return "#5eead4";
    if (normalizedName.includes("liberia")) return "#2dd4bf";
    if (normalizedName.includes("mauritania")) return "#99f6e4";
    if (normalizedName.includes("gambia")) return "#2dd4bf";
    if (normalizedName.includes("bissau")) return "#5eead4";
    if (normalizedName.includes("cape") || normalizedName.includes("verde"))
      return "#a7f3d0";

    // Afrique Centrale
    if (
      normalizedName.includes("dem.") ||
      normalizedName.includes("democratic")
    )
      return "#8b5cf6";
    if (normalizedName.includes("congo") && !normalizedName.includes("dem"))
      return "#7c3aed";
    if (normalizedName.includes("cameroon")) return "#6d28d9";
    if (normalizedName.includes("central african")) return "#5b21b6";
    if (normalizedName.includes("chad")) return "#a78bfa";
    if (normalizedName.includes("gabon")) return "#c4b5fd";
    if (
      normalizedName.includes("eq. guinea") ||
      normalizedName.includes("equatorial")
    )
      return "#ddd6fe";
    if (normalizedName.includes("tomé") || normalizedName.includes("tome"))
      return "#ede9fe";

    // Afrique de l'Est
    if (normalizedName.includes("ethiopia")) return "#f59e0b";
    if (normalizedName.includes("kenya")) return "#d97706";
    if (normalizedName.includes("tanzania")) return "#b45309";
    if (normalizedName.includes("uganda")) return "#92400e";
    if (normalizedName.includes("somalia")) return "#fbbf24";
    if (normalizedName.includes("djibouti")) return "#fcd34d";
    if (normalizedName.includes("eritrea")) return "#fde68a";
    if (
      normalizedName.includes("s. sudan") ||
      normalizedName.includes("south sudan")
    )
      return "#fed7aa";
    if (normalizedName.includes("rwanda")) return "#fb923c";
    if (normalizedName.includes("burundi")) return "#fdba74";

    // Afrique Australe
    if (normalizedName.includes("south africa")) return "#ef4444";
    if (normalizedName.includes("namibia")) return "#dc2626";
    if (normalizedName.includes("botswana")) return "#b91c1c";
    if (normalizedName.includes("zimbabwe")) return "#991b1b";
    if (normalizedName.includes("zambia")) return "#fca5a5";
    if (normalizedName.includes("mozambique")) return "#f87171";
    if (normalizedName.includes("madagascar")) return "#e11d48";
    if (normalizedName.includes("malawi")) return "#fb7185";
    if (normalizedName.includes("angola")) return "#be123c";
    if (normalizedName.includes("lesotho")) return "#fecdd3";
    if (
      normalizedName.includes("swaziland") ||
      normalizedName.includes("eswatini")
    )
      return "#ffe4e6";
    if (normalizedName.includes("mauritius")) return "#9f1239";
    if (normalizedName.includes("comoros")) return "#fda4af";
    if (normalizedName.includes("seychelles")) return "#f472b6";

    return "#64748b";
  };

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const countryName = geo.properties.name;
    setTooltip({
      name: countryName,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = (geo: any, event: React.MouseEvent) => {
    const countryName = geo.properties.name;
    setTooltip({
      name: countryName,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className=" rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Carte Interactive de l&apos;Afrique
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sélectionnez un pays pour afficher les articles correspondants
        </p>

        <div className="relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 400,
              center: [20, 0],
            }}
            className="w-full h-auto"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    const name = geo.properties.name;
                    return africanCountries.some(
                      (country) =>
                        name.toLowerCase().includes(country.toLowerCase()) ||
                        country.toLowerCase().includes(name.toLowerCase())
                    );
                  })
                  .map((geo) => {
                    const countryName = geo.properties.name;
                    const isSelected = selected === countryName;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelected(countryName)}
                        onMouseEnter={(e) => handleMouseEnter(geo, e)}
                        onMouseMove={(e) => handleMouseMove(geo, e)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            fill: isSelected
                              ? "#1e40af"
                              : getCountryColor(countryName),
                            stroke: "#ffffff",
                            strokeWidth: 0.8,
                            outline: "none",
                          },
                          hover: {
                            fill: "#3b82f6",
                            stroke: "#1e40af",
                            strokeWidth: 1.5,
                            cursor: "pointer",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#1e3a8a",
                            stroke: "#1e40af",
                            strokeWidth: 1.5,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ComposableMap>

          {/* Tooltip professionnel */}
          {tooltip && (
            <div
              className="fixed pointer-events-none z-50 transition-opacity duration-200"
              style={{
                left: `${tooltip.x + 15}px`,
                top: `${tooltip.y + 15}px`,
              }}
            >
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl border border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm whitespace-nowrap">
                    {tooltip.name}
                  </span>
                </div>
              </div>
              {/* Flèche du tooltip */}
              {/* <div
                className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"
                style={{ left: "10px", top: "-8px" }}
              ></div> */}
            </div>
          )}
        </div>

        {selected && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-md text-center text-gray-700">
              Pays sélectionné :{" "}
              <span className="text-md font-bold text-blue-700">
                {selected}
              </span>
            </p>
          </div>
        )}

        {!selected && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Aucun pays sélectionné. Cliquez sur la carte pour sélectionner un
              pays.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfricaMap;
