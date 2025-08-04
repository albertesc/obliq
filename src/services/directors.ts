const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getAllDirectors() {
  try {
    const response = await fetch(`${API_URL}directors/all.json`);
    const data = await response.json();
    return data.directors || [];
  } catch (error) {
    console.error(`Error fetching directors:`, error);
    return [];
  }
}
