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

export async function getFirstVideoByDirector(director: string) {
  try {
    const response = await fetch(`${API_URL}videos/all.json`);
    const data = await response.json();
    const filteredVideos = data.filter((video: any) => video.client === director);
    return filteredVideos.length > 0 ? filteredVideos[0] : null;
  } catch (err) {
    console.error(`Error fetching first video for director ${director}:`, err);
    return null;
  }
}