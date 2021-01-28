const api = {
    baseEndpoint: '',
    key: '',
    async load(location) {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
  
      const response = await fetch(endpoint, { mode: 'cors' });
      return response.json();
    },
  
  };
  
export default async function postData(data = {}) {
    const key = 'ze6MTxo6r5QSATkrVLtc';
    const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    const endPoint = `${baseUrl}games/${key}/scores/`;
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

// postData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', { "name": "El Galactico" })
//   .then(data => {
//     console.log(data);
// });

// postData(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/, { answer: 42 })
//   .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
// });