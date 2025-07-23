const API_URL = import.meta.env.PUBLIC_API_URL;
console.log("API_URL:", API_URL);

export async function getAllVideos() {
  try {
    const response = await fetch(`${API_URL}videos/all.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
          "Accept": "application/json",
        },
      }
    );
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
  const response = await fetch(`${API_URL}videos/${slug}.json`,
    {
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data;
}