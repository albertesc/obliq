import type { APIRoute } from "astro";
import type { Video } from "@/types/videos";
import { videos } from "@/data/videos.json";

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;
    const video = videos.find((video: Video) => video.slug === slug);

  return new Response(JSON.stringify(video), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};