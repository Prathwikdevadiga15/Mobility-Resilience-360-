const rawMapKey = import.meta.env.VITE_MAPTILER_KEY?.trim();
const mapKey = rawMapKey && rawMapKey !== 'your_maptiler_key_here' ? rawMapKey : '';

export const MAP_TILE_URL = mapKey
  ? `https://api.maptiler.com/maps/dark-v2/{z}/{x}/{y}.png?key=${mapKey}`
  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const MAP_ATTRIBUTION = mapKey
  ? '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';

export const MAP_API_KEY = mapKey;
