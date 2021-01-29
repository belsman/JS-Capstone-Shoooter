const api = {
    baseEndpoint: '',
    key: '',
    async load(location) {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
  
      const response = await fetch(endpoint, { mode: 'cors' });
      return response.json();
    },
  
  };
  
export default async (data = {}) => {
    const key = 'ze6MTxo6r5QSATkrVLtc';
    const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    const endpoint = `${baseUrl}games/${key}/scores/`;
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}
