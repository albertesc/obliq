const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  try {
    const response = await fetch(`${API_URL}videos/all.json`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.videos;
  } catch (err) {
    console.error("Error al obtener videos:", err);
    return [];
  }
}

export async function getVideoBySlug(slug: string) {
  const response = await fetch(`${API_URL}videos/${slug}.json`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data;
}