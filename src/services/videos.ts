const API_URL = import.meta.env.PUBLIC_API_URL;

export function getAllVideos() {
  return fetch(`${API_URL}videos/all.json`)
    .then((response) => response.json())
    .then((data) => data.videos);
}

export function getVideoBySlug(slug: string) {
  return fetch(`${API_URL}videos/${slug}.json`)
    .then((response) => response.json())
    .then((data) => data);
}