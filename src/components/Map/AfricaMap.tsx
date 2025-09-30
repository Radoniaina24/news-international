"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson";

// Interface pour les pays africains
interface AfricanCountry {
  id: number;
  names: string[];
  region: string;
  iso2?: string;
  iso3?: string;
}

// Interface pour les îles africaines
interface AfricanIsland {
  id: number;
  name: string;
  coordinates: [number, number];
  region: string;
  iso2?: string;
  iso3?: string;
}

// Interface pour la sélection
interface CountrySelection {
  id: number;
  name: string;
  region: string;
  type: "country" | "island";
}

// Base de données des pays africains avec IDs numériques
const africanCountriesDB: AfricanCountry[] = [
  {
    id: 92,
    names: ["Algeria"],
    region: "Afrique du Nord",
    iso2: "DZ",
    iso3: "DZA",
  },
  {
    id: 93,
    names: ["Angola"],
    region: "Afrique Australe",
    iso2: "AO",
    iso3: "AGO",
  },
  {
    id: 94,
    names: ["Benin"],
    region: "Afrique de l'Ouest",
    iso2: "BJ",
    iso3: "BEN",
  },
  {
    id: 95,
    names: ["Botswana"],
    region: "Afrique Australe",
    iso2: "BW",
    iso3: "BWA",
  },
  {
    id: 96,
    names: ["Burkina Faso"],
    region: "Afrique de l'Ouest",
    iso2: "BF",
    iso3: "BFA",
  },
  {
    id: 97,
    names: ["Burundi"],
    region: "Afrique de l'Est",
    iso2: "BI",
    iso3: "BDI",
  },
  {
    id: 98,
    names: ["Cameroon"],
    region: "Afrique Centrale",
    iso2: "CM",
    iso3: "CMR",
  },
  {
    id: 99,
    names: ["Cape Verde"],
    region: "Afrique de l'Ouest",
    iso2: "CV",
    iso3: "CPV",
  },
  {
    id: 100,
    names: ["Central African Rep.", "Central African Republic"],
    region: "Afrique Centrale",
    iso2: "CF",
    iso3: "CAF",
  },
  {
    id: 140,
    names: ["Chad"],
    region: "Afrique Centrale",
    iso2: "TD",
    iso3: "TCD",
  },
  {
    id: 101,
    names: ["Comoros"],
    region: "Afrique Australe",
    iso2: "KM",
    iso3: "COM",
  },
  {
    id: 103,
    names: ["Dem. Rep. Congo", "Democratic Republic of the Congo"],
    region: "Afrique Centrale",
    iso2: "CD",
    iso3: "COD",
  },
  {
    id: 102,
    names: ["Congo", "Republic of the Congo"],
    region: "Afrique Centrale",
    iso2: "CG",
    iso3: "COG",
  },
  {
    id: 105,
    names: ["Djibouti"],
    region: "Afrique de l'Est",
    iso2: "DJ",
    iso3: "DJI",
  },
  {
    id: 106,
    names: ["Egypt"],
    region: "Afrique du Nord",
    iso2: "EG",
    iso3: "EGY",
  },
  {
    id: 115,
    names: ["Equatorial Guinea", "Eq. Guinea"],
    region: "Afrique Centrale",
    iso2: "GQ",
    iso3: "GNQ",
  },
  {
    id: 107,
    names: ["Eritrea"],
    region: "Afrique de l'Est",
    iso2: "ER",
    iso3: "ERI",
  },
  {
    id: 109,
    names: ["Ethiopia"],
    region: "Afrique de l'Est",
    iso2: "ET",
    iso3: "ETH",
  },
  {
    id: 110,
    names: ["Gabon"],
    region: "Afrique Centrale",
    iso2: "GA",
    iso3: "GAB",
  },
  {
    id: 111,
    names: ["Gambia"],
    region: "Afrique de l'Ouest",
    iso2: "GM",
    iso3: "GMB",
  },
  {
    id: 112,
    names: ["Ghana"],
    region: "Afrique de l'Ouest",
    iso2: "GH",
    iso3: "GHA",
  },
  {
    id: 113,
    names: ["Guinea"],
    region: "Afrique de l'Ouest",
    iso2: "GN",
    iso3: "GIN",
  },
  {
    id: 114,
    names: ["Guinea-Bissau"],
    region: "Afrique de l'Ouest",
    iso2: "GW",
    iso3: "GNB",
  },
  {
    id: 104,
    names: ["Côte d'Ivoire", "Ivory Coast"],
    region: "Afrique de l'Ouest",
    iso2: "CI",
    iso3: "CIV",
  },
  {
    id: 116,
    names: ["Kenya"],
    region: "Afrique de l'Est",
    iso2: "KE",
    iso3: "KEN",
  },
  {
    id: 117,
    names: ["Lesotho"],
    region: "Afrique Australe",
    iso2: "LS",
    iso3: "LSO",
  },
  {
    id: 118,
    names: ["Liberia"],
    region: "Afrique de l'Ouest",
    iso2: "LR",
    iso3: "LBR",
  },
  {
    id: 119,
    names: ["Libya"],
    region: "Afrique du Nord",
    iso2: "LY",
    iso3: "LBY",
  },
  {
    id: 120,
    names: ["Madagascar"],
    region: "Afrique Australe",
    iso2: "MG",
    iso3: "MDG",
  },
  {
    id: 121,
    names: ["Malawi"],
    region: "Afrique Australe",
    iso2: "MW",
    iso3: "MWI",
  },
  {
    id: 122,
    names: ["Mali"],
    region: "Afrique de l'Ouest",
    iso2: "ML",
    iso3: "MLI",
  },
  {
    id: 125,
    names: ["Mauritania"],
    region: "Afrique de l'Ouest",
    iso2: "MR",
    iso3: "MRT",
  },
  {
    id: 124,
    names: ["Mauritius"],
    region: "Afrique Australe",
    iso2: "MU",
    iso3: "MUS",
  },
  {
    id: 123,
    names: ["Morocco"],
    region: "Afrique du Nord",
    iso2: "MA",
    iso3: "MAR",
  },
  {
    id: 126,
    names: ["Mozambique"],
    region: "Afrique Australe",
    iso2: "MZ",
    iso3: "MOZ",
  },
  {
    id: 127,
    names: ["Namibia"],
    region: "Afrique Australe",
    iso2: "NA",
    iso3: "NAM",
  },
  {
    id: 128,
    names: ["Niger"],
    region: "Afrique de l'Ouest",
    iso2: "NE",
    iso3: "NER",
  },
  {
    id: 129,
    names: ["Nigeria"],
    region: "Afrique de l'Ouest",
    iso2: "NG",
    iso3: "NGA",
  },
  {
    id: 131,
    names: ["Rwanda"],
    region: "Afrique de l'Est",
    iso2: "RW",
    iso3: "RWA",
  },
  {
    id: 132,
    names: ["São Tomé and Principe", "Sao Tome and Principe"],
    region: "Afrique Centrale",
    iso2: "ST",
    iso3: "STP",
  },
  {
    id: 133,
    names: ["Senegal"],
    region: "Afrique de l'Ouest",
    iso2: "SN",
    iso3: "SEN",
  },
  {
    id: 134,
    names: ["Seychelles"],
    region: "Afrique Australe",
    iso2: "SC",
    iso3: "SYC",
  },
  {
    id: 135,
    names: ["Sierra Leone"],
    region: "Afrique de l'Ouest",
    iso2: "SL",
    iso3: "SLE",
  },
  {
    id: 136,
    names: ["Somalia"],
    region: "Afrique de l'Est",
    iso2: "SO",
    iso3: "SOM",
  },
  {
    id: 91,
    names: ["South Africa"],
    region: "Afrique Australe",
    iso2: "ZA",
    iso3: "ZAF",
  },
  {
    id: 138,
    names: ["S. Sudan", "South Sudan"],
    region: "Afrique de l'Est",
    iso2: "SS",
    iso3: "SSD",
  },
  {
    id: 137,
    names: ["Sudan"],
    region: "Afrique de l'Est",
    iso2: "SD",
    iso3: "SDN",
  },
  {
    id: 108,
    names: ["Swaziland", "eSwatini"],
    region: "Afrique Australe",
    iso2: "SZ",
    iso3: "SWZ",
  },
  {
    id: 139,
    names: ["Tanzania"],
    region: "Afrique de l'Est",
    iso2: "TZ",
    iso3: "TZA",
  },
  {
    id: 141,
    names: ["Togo"],
    region: "Afrique de l'Ouest",
    iso2: "TG",
    iso3: "TGO",
  },
  {
    id: 142,
    names: ["Tunisia"],
    region: "Afrique du Nord",
    iso2: "TN",
    iso3: "TUN",
  },
  {
    id: 130,
    names: ["Uganda"],
    region: "Afrique de l'Est",
    iso2: "UG",
    iso3: "UGA",
  },
  {
    id: 143,
    names: ["Zambia"],
    region: "Afrique Australe",
    iso2: "ZM",
    iso3: "ZMB",
  },
  {
    id: 144,
    names: ["Zimbabwe"],
    region: "Afrique Australe",
    iso2: "ZW",
    iso3: "ZWE",
  },
  {
    id: 55,
    names: ["W. Sahara", "Western Sahara"],
    region: "Afrique du Nord",
    iso2: "EH",
    iso3: "ESH",
  },
];

// Base de données des îles africaines avec IDs numériques
const africanIslandsDB: AfricanIsland[] = [
  {
    id: 1,
    name: "La Réunion",
    coordinates: [55.5364, -21.1151],
    region: "Afrique Australe",
    iso2: "RE",
    iso3: "REU",
  },
  {
    id: 102,
    name: "Mayotte",
    coordinates: [45.1662, -12.8275],
    region: "Afrique Australe",
    iso2: "YT",
    iso3: "MYT",
  },
  {
    id: 101,
    name: "Comores",
    coordinates: [43.3333, -11.6455],
    region: "Afrique Australe",
    iso2: "KM",
    iso3: "COM",
  },
  {
    id: 134,
    name: "Seychelles",
    coordinates: [55.492, -4.6796],
    region: "Afrique Australe",
    iso2: "SC",
    iso3: "SYC",
  },
  {
    id: 124,
    name: "Maurice",
    coordinates: [57.5522, -20.1609],
    region: "Afrique Australe",
    iso2: "MU",
    iso3: "MUS",
  },
  {
    id: 99,
    name: "Cap-Vert",
    coordinates: [-23.6052, 16.5388],
    region: "Afrique de l'Ouest",
    iso2: "CV",
    iso3: "CPV",
  },
  {
    id: 132,
    name: "São Tomé-et-Príncipe",
    coordinates: [6.6131, 0.1864],
    region: "Afrique Centrale",
    iso2: "ST",
    iso3: "STP",
  },
];

const AfricaMap = () => {
  const [selected, setSelected] = useState<CountrySelection | null>(null);
  const [tooltip, setTooltip] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  // Fonction pour trouver l'ID d'un pays à partir de son nom
  const findCountryById = (countryName: string): AfricanCountry | undefined => {
    return africanCountriesDB.find((country) =>
      country.names.some(
        (name) =>
          name.toLowerCase() === countryName.toLowerCase() ||
          countryName.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(countryName.toLowerCase())
      )
    );
  };

  const getCountryColor = (countryName: string): string => {
    const normalizedName = countryName.toLowerCase().trim();

    if (normalizedName.includes("egypt")) return "#0ea5e9";
    if (normalizedName.includes("libya")) return "#06b6d4";
    if (normalizedName.includes("tunisia")) return "#0284c7";
    if (normalizedName.includes("algeria")) return "#0369a1";
    if (normalizedName.includes("morocco")) return "#075985";
    if (normalizedName.includes("sahara")) return "#7dd3fc";
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

  const getIslandColor = (islandId: number): string => {
    const colors: { [key: number]: string } = {
      101: "#e11d48",
      102: "#fb7185",
      103: "#fda4af",
      104: "#f472b6",
      105: "#9f1239",
      106: "#a7f3d0",
      107: "#ede9fe",
    };
    return colors[islandId] || "#64748b";
  };

  const handleMouseEnter = (name: string, event: React.MouseEvent) => {
    setTooltip({
      name: name,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = (name: string, event: React.MouseEvent) => {
    setTooltip({
      name: name,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const navigation = useRouter();

  const handleCountryClick = (countryName: string) => {
    const country = findCountryById(countryName);
    if (country) {
      setSelected({
        id: country.id,
        name: countryName,
        region: country.region,
        type: "country",
      });
      navigation.push(`country/${country.id}`);
    }
  };

  const handleIslandClick = (island: AfricanIsland) => {
    setSelected({
      id: island.id,
      name: island.name,
      region: island.region,
      type: "island",
    });
    navigation.push(`country/${island.id}`);
  };

  // Liste des noms de pays pour le filtrage
  const allCountryNames = africanCountriesDB.flatMap((c) => c.names);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="rounded-lg shadow-lg p-6 bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Carte Interactive de l&apos;Afrique
        </h1>
        <p className="text-gray-600 text-center mb-2">
          Sélectionnez un pays pour consulter les articles correspondants
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
                    return allCountryNames.some(
                      (country) =>
                        name.toLowerCase().includes(country.toLowerCase()) ||
                        country.toLowerCase().includes(name.toLowerCase())
                    );
                  })
                  .map((geo) => {
                    const countryName = geo.properties.name;
                    const country = findCountryById(countryName);
                    const isSelected = selected?.id === country?.id;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(countryName)}
                        onMouseEnter={(e) => handleMouseEnter(countryName, e)}
                        onMouseMove={(e) => handleMouseMove(countryName, e)}
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

            {/* Marqueurs pour les îles africaines */}
            {africanIslandsDB.map((island) => {
              const isSelected = selected?.id === island.id;
              return (
                <Marker
                  key={island.id}
                  coordinates={island.coordinates}
                  onClick={() => handleIslandClick(island)}
                  onMouseEnter={(e) => handleMouseEnter(island.name, e)}
                  onMouseMove={(e) => handleMouseMove(island.name, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle
                    r={5}
                    fill={isSelected ? "#1e40af" : getIslandColor(island.id)}
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    className="cursor-pointer hover:r-7 transition-all"
                    style={{
                      filter: isSelected
                        ? "drop-shadow(0 0 8px rgba(30, 64, 175, 0.8))"
                        : "none",
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "10px",
                      fill: "#1f2937",
                      fontWeight: "600",
                      pointerEvents: "none",
                    }}
                  >
                    {island.name}
                  </text>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Tooltip */}
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
            </div>
          )}
        </div>

        {/* Informations détaillées sur la sélection */}
        {selected && (
          <div className="mt-6 p-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            Pays/Territoire sélectionné :{" "}
            <span className="text-md font-bold text-blue-700">
              {selected.name}
            </span>
          </div>
        )}

        {!selected && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Aucun pays sélectionné. Cliquez sur la carte ou sur un marqueur
              pour sélectionner un territoire.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfricaMap;
