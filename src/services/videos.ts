const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  try {
    const response = await fetch(`${API_URL}videos/all.json`);
    console.log(response)
    if (!response.ok) {
      console.error(`Error fetching videos: ${response.statusText}`);
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error fetching videos:', err);
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