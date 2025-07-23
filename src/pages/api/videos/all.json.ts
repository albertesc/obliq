import type { APIRoute } from "astro";
import data from "@/data/videos.json";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
