const cache = {};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const get = (code) => {
  if (cache[code]) {
    return cache[code];
  }

  const url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;
  return cache[code] = delay(1000).then(() => fetch(url).then((res) => res.json()));
}
