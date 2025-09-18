"use client";
import { cn, cn2 } from "@/lib/utils/classNames";
import Image from "next/image";

interface InstitutionCardData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundColor: string;
  textColor: string;
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
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/40 via-transparent to-white/40 dark:from-gray-800/40 dark:to-gray-800/40",
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
    <div className="flex max-w-sm items-center space-x-2 group cursor-pointer rounded-md shadow-sm hover:shadow-md border border-gray-100 p-2 transition-all duration-300">
      {/* Image institution */}
      <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          width={160}
          height={120}
          src={institution.image}
          alt={institution.title}
          className="w-full h-full object-cover rounded-md transition-transform group-hover:scale-105 duration-300"
        />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-medium text-black line-clamp-1  transition-colors text-sm"
          )}
        >
          {institution.title}
        </h3>

        <p className="mt-0.5 text-xs line-clamp-1 text-gray-600">
          {institution.description}
        </p>

        <button
          className="mt-1 px-2 py-0.5 text-[10px] font-medium rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={() => handleNavigation(institution.link)}
        >
          {institution.buttonText}
        </button>
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
