import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
/**
* @public
*/
declare const GroqLogo: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
/**
* @public
*/
declare const GroqMonogram: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
/**
* @public
*/
interface SanityLogoProps {
  dark?: boolean;
}
/**
* @public
*/
declare const SanityLogo: ForwardRefExoticComponent<Omit<SanityLogoProps & SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
/**
* @public
*/
type SanityMonogramScheme = "light" | "dark" | "default";
/**
* @public
* @deprecated use {@link SanityMonogramScheme} as the `scheme` prop instead
*/
interface SanityMonogramColor {
  bg1: string;
  /**
  * `bg2` is unused, use `bg1` instead
  */
  bg2: string;
  fg: string;
}
/**
* @public
*/
type SanityMonogramProps = {
  color: SanityMonogramColor;
  scheme?: undefined;
} | {
  color?: undefined;
  scheme: SanityMonogramScheme;
} | {
  color?: undefined;
  scheme?: undefined;
};
/**
* @public
*/
declare const SanityMonogram: ForwardRefExoticComponent<SanityMonogramProps & Omit<SVGProps<SVGSVGElement>, "color" | "ref"> & RefAttributes<SVGSVGElement>>;
export { GroqLogo, GroqMonogram, SanityLogo, SanityLogoProps, SanityMonogram, SanityMonogramColor, SanityMonogramProps, SanityMonogramScheme };