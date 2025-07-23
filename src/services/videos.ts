const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  const response = await fetch(`${API_URL}videos/all.json`);
  const data = await response.json();
  return data.videos;
}

export async function getVideoBySlug(slug: string) {
  const response = await fetch(`${API_URL}videos/${slug}.json`);
  const data = await response.json();
  return data;
}