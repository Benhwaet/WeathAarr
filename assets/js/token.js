
async function authorization(data = {}) {
  data = await fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(spotifyClientID + ':' + spotifySecret),
      },
      body: 'grant_type=client_credentials'
  });

  var tokenObj = await data.json()
  var accessToken = tokenObj.access_token;
  console.log(accessToken);
  return accessToken;
};