import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/en")) {
    return next();
  }

  const acceptLang = context.request.headers.get("accept-language") || "";
  const userLang = acceptLang.split(",")[0].toLowerCase();

  if (pathname === "/" && userLang.startsWith("en")) {
    return Response.redirect(new URL("/en", url), 302);
  }

  return next();
});