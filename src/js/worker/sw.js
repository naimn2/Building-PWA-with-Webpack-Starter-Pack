/* eslint-disable no-restricted-globals */
import CacheHelper from '../helpers/cache-helper';

const appShells = [
  '/index.html',
  '/index.bundle.js',
  '/icons/icon.svg',
  '/favicon.svg',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([
    ...appShells,
    './',
  ]));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.networkFirstCache(event.request));
});
