const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  try {
    const response = await fetch(`${API_URL}videos/all.json`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching videos:', err);
    return [];
  }
}

export async function getVideoBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}videos/${slug}.json`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching video with slug ${slug}:`, err);
    return null;
  }
}