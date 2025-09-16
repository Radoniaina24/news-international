"use client";
import { cn, cn2 } from "@/lib/utils/classNames";
import Image from "next/image";

interface InstitutionCardData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundColor: string; // ex: linear-gradient ou hex
  textColor: string; // ex: text-white
  link: string;
}
interface Institution {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  link: string;
}
interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => (
  <div
    {...props}
    className={cn2(
      "group relative flex h-full w-full overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn2("flex shrink-0 [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn2(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

export const InstitutionCard = ({
  institution,
}: {
  institution: Institution;
}) => {
  const handleNavigation = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex max-w-xl  space-x-4 group cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-3 transition-all duration-300">
      {/* Image institution */}
      <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          width={400}
          height={400}
          src={institution.image}
          alt={institution.title}
          className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105 duration-300"
        />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-semibold text-black line-clamp-2 group-hover:underline transition-colors text-lg"
          )}
        >
          {institution.title}
        </h3>

        <p className={cn("mt-1 text-sm line-clamp-3 text-black")}>
          {institution.description}
        </p>

        {/* Bouton */}
        <div className="flex items-center mt-3">
          <button
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 transition-colors"
            )}
            onClick={() => handleNavigation(institution.link)}
          >
            {institution.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const AnimatedInstitutions = ({
  data,
  className,
}: {
  data: InstitutionCardData[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn2("w-full overflow-x-hidden", className)}>
    <AnimatedCanopy
      reverse={false}
      className="[--duration:25s]"
      pauseOnHover
      applyMask={false}
      repeat={3}
    >
      {data.map((institution) => (
        <InstitutionCard key={institution.id} institution={institution} />
      ))}
    </AnimatedCanopy>
  </div>
);
export default AnimatedInstitutions;
