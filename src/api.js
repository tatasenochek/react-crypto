import { cryptoAssets } from "./data";

export const fetchCoinData = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'NuUlOrA0V+bBemsh39Ave33oW9u6WBRoa+mrs+E5zbk='
    }
  };

  try {
    const response = await fetch('https://openapiv1.coinstats.app/coins', options);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1000)
  })
}