import { SanityImageObject, SanityImageSource } from './types';
export declare const isInProgressUpload: (src: SanityImageSource) => boolean;
export default function parseSource(source?: SanityImageSource): Required<SanityImageObject> | null;
