// @ts-ignore
import { sanityClient } from "sanity:client"

export interface AlbumDocument {
  _id: string,
  title: string,
  description: unknown,
  startedAt: string,
  endedAt: string,
  isUploading: boolean,
}

export interface PhotoDocument {
  title: string,
  location: string,
  description: unknown,
  photo: unknown,
  alt: string,
}

export interface AlbumWithPhotos {
  _id: string,
  title: string,
  description: unknown,
  sequencedPhotos: PhotoDocument[] | null,
  allPhotos: PhotoDocument[]
}

export async function getAlbums(): Promise<AlbumDocument[]> {
  return sanityClient.fetch(
    `*[_type == "album"] | order(startedAt desc) {_id, title, description, startedAt, endedAt, isUploading}`
  )
}

export async function getAlbumsWithPhotos(): Promise<AlbumWithPhotos[]> {
  return sanityClient.fetch(
    `*[_type == "album"] {_id, title, description, "sequencedPhotos": photoSequence[]-> {title, location, description, photo, alt}, "allPhotos": *[_type == "photo" && references(^._id)] | order(_createdAt desc) {title, location, description, photo, alt}}`
  )
}
