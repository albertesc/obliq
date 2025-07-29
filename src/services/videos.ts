const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  const data = fetch(`${API_URL}videos/all.json`);
  try {
    const response = await fetch(`${API_URL}videos/all.json`);
    console.log(`Fetching all videos from: ${API_URL}videos/all.json`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
}

export async function getVideoBySlug(slug: string) {
  const response = await fetch(`${API_URL}videos/${slug}.json`);
  console.log(`Fetching video by slug from: ${API_URL}videos/${slug}.json`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data;
}