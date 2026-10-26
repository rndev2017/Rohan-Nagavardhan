// @ts-ignore — supplied by the @sanity/astro integration.
import {sanityClient} from 'sanity:client';
import type {PortableTextBlock} from '@portabletext/types';
import type {SanityImageObject} from '@sanity/image-url';

export type CameraBodyType = 'rangefinder' | 'slr' | 'instant' | 'pointAndShoot';
export interface Reference { _type: 'reference'; _ref: string; _key?: string }
export interface AudioFile { _type: 'file'; asset: Reference }
export interface Camera {
  _type: 'camera'; _id: string; name: string;
  medium: 'film' | 'digital'; bodyType: CameraBodyType;
  acquiredAt?: {year: number; month?: number};
}
export interface Photo {
  _type: 'photo'; _id: string; title?: string; altText: string;
  description?: string; image: SanityImageObject; camera?: Reference;
  location?: {city?: string; region?: string; country?: string};
}
export interface PhotoPanel { _type: 'photoPanel'; _key: string; photo: Reference }
export interface WritingPanel { _type: 'writingPanel'; _key: string; content: PortableTextBlock[] }
export interface BlankPanel { _type: 'blankPanel'; _key: string; note?: string }
export type ContentPanel = PhotoPanel | WritingPanel;
export type Panel = ContentPanel | BlankPanel;
// Tuple lengths are enforced when publishing in Studio, not by GROQ itself.
export type Spread =
  | {_type: 'oneColumnSpread'; _key: string; panels: [ContentPanel]}
  | {_type: 'twoColumnSpread'; _key: string; panels: [Panel, Panel]};
export interface Project {
  _type: 'project'; _id: string; title: string;
  slug: {_type: 'slug'; current: string};
  status: 'in_progress' | 'done'; description?: string;
  thumbnail?: Pick<Photo, 'title' | 'altText' | 'image'>; spreads: Spread[];
}
export type ResolvedPanel =
  | (Omit<PhotoPanel, 'photo'> & {photo: Pick<Photo, 'title' | 'altText' | 'image'> | null})
  | WritingPanel
  | BlankPanel;
export interface ResolvedSpread {
  _key: string;
  _type: 'oneColumnSpread' | 'twoColumnSpread';
  panels: ResolvedPanel[];
}
export interface ProjectDetail extends Omit<Project, 'spreads'> {
  spreads: ResolvedSpread[];
}
export interface HomeSlideshow {
  _type: 'homeSlideshow'; _id: 'homeSlideshow'; photos?: Reference[];
}
export interface CameraSounds {
  _type: 'cameraSounds'; _id: 'cameraSounds';
  rangefinder?: AudioFile; slr?: AudioFile; instant?: AudioFile; pointAndShoot?: AudioFile;
}
export type SlideshowPhoto = Omit<Photo, 'camera'> & {camera?: Camera | null};
export type SoundUrls = Partial<Record<CameraBodyType, string>>;
export interface PhotographyHome { photos: SlideshowPhoto[]; sounds: SoundUrls }

const HOME_QUERY = `{
  "photos": coalesce(*[_id == "homeSlideshow"][0].photos[]->{
    _id, _type, title, altText, description, location, image,
    camera->{_id, _type, name, medium, bodyType, acquiredAt}
  }, []),
  "sounds": *[_id == "cameraSounds"][0]{
    "rangefinder": rangefinder.asset->url,
    "slr": slr.asset->url,
    "instant": instant.asset->url,
    "pointAndShoot": pointAndShoot.asset->url
  }
}`;

export function normalizePhotographyHome(data: {
  photos?: Array<SlideshowPhoto | null> | null;
  sounds?: Partial<Record<CameraBodyType, string | null>> | null;
}): PhotographyHome {
  const seen = new Set<string>();
  const photos = (data.photos ?? []).filter((photo): photo is SlideshowPhoto => {
    if (!photo?.image?.asset?._ref || !photo.altText?.trim() || seen.has(photo._id)) return false;
    seen.add(photo._id);
    return true;
  });
  const sounds: SoundUrls = {};
  for (const body of ['rangefinder', 'slr', 'instant', 'pointAndShoot'] as const) {
    const url = data.sounds?.[body];
    if (url) sounds[body] = url;
  }
  return {photos, sounds};
}

export async function getPhotographyHome(): Promise<PhotographyHome> {
  const data = await sanityClient.fetch(HOME_QUERY, {}, {perspective: 'published'});
  return normalizePhotographyHome(data);
}

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project"] | order(_createdAt desc) {
      _id, _type, title, slug, status, description,
      "thumbnail": thumbnail->{title, altText, image},
      "spreads": coalesce(spreads, [])
    }`, {}, {perspective: 'published'},
  );
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id, _type, title, slug, status, description,
      "thumbnail": thumbnail->{title, altText, image},
      "spreads": coalesce(spreads, [])[]{
        _key, _type,
        "panels": coalesce(panels, [])[]{
          _key, _type, content,
          "photo": photo->{title, altText, image}
        }
      }
    }`, {slug}, {perspective: 'published'},
  );
}
