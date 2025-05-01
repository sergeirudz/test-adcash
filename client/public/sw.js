if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + ".js", a).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let c = {};
    const o = (e) => n(e, i),
      r = { module: { uri: i }, exports: c, require: o };
    s[i] = Promise.all(a.map((e) => r[e] || o(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-e9849328"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "8847da3249e4b43e7e001282a3b1ef64",
        },
        {
          url: "/_next/static/chunks/226f0cb1-571135b5a1a5efc0.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/355-a86477d9b7585dd4.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-0644db088bd5e9d0.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/app/layout-ce48b881968b1833.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/app/page-f6c6dc0ffc8b24d8.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/framework-81f2856ab0e6d65a.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/main-14863731f32de85d.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/main-app-a793ec260b48cabe.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/pages/_app-2e44af51cc038db9.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/pages/_error-e77b16fa1ce9e690.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-6b82b1d4f8e984ff.js",
          revision: "qJ3EmHH-kqTV3GhYV2oYa",
        },
        {
          url: "/_next/static/css/e21d7b84e597b60d.css",
          revision: "e21d7b84e597b60d",
        },
        {
          url: "/_next/static/qJ3EmHH-kqTV3GhYV2oYa/_buildManifest.js",
          revision: "1852a2db7e564f5058ca71520c56934b",
        },
        {
          url: "/_next/static/qJ3EmHH-kqTV3GhYV2oYa/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/apple-touch-icon-57x57.webp",
          revision: "3f07542eab9d6f1bcc5431dcf663397b",
        },
        { url: "/favicon.webp", revision: "67ac4e6ef5cc1d11dbfcf9cbb281dc5d" },
        { url: "/manifest.json", revision: "19837caf05ba597152a221ca8b3cd6f1" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
