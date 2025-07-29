const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllVideos() {
  const data = fetch(`${API_URL}videos/all.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching videos:', error);
      return { error: 'Failed to fetch videos' };
    });

  return data;
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