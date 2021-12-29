const CACHE_NAME = 'pwa-cache';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    console.log('caching app shells:', requests.length);
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async staleWhileRevalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this._fetchRequest(request);
      return response;
    }
    return this._fetchRequest(request);
  },

  async networkFirstCache(request) {
    let response;
    try {
      response = await this._fetchRequest(request);
    } catch (error) {
      response = await caches.match(request);
    }
    return response;
  },

  async cacheFirstCache(request) {
    let response;
    try {
      response = await caches.match(request);
    } catch (error) {
      response = await this._fetchRequest(request);
    }
    return response;
  },

  async _openCache() {
    return caches.open(CACHE_NAME);
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (response && response.status === 200) {
      await this._addCache(request);
    }

    return response;
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request);
  },
};

export default CacheHelper;
