let accessToken = '';
const CLIENT_ID = 'c4cd441214524d4d9a00c286a818adc6';
const REDIRECT_URI = 'https://christina_test.surge.sh' // 'http://localhost:3000/';

let Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    // getting info from url
    const url = window.location.href;
    const accessTokenMatch = url.match(/access_token=([^&]*)/);
    const expiresInMatch = url.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      // send user to auth page
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
    }
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
        return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          contentType: 'application/json',
          method: 'POST',
          body: JSON.stringify({
            "name": `${playlistName}`,
          })
        }).then(playlist => playlist.json())
        .then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
          });
        })
    });
  },

  search(searchTerm) {
    let accessToken = this.getAccessToken()
    if(accessToken) {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        { headers: {Authorization: `Bearer ${accessToken}`}}
      )
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(
            trackItem => {
              return {
                id: trackItem.id,
                name: trackItem.name,
                artist: trackItem.artists[0].name,
                album: trackItem.album.name,
                uri: trackItem.uri
              }
            }
          )
        }
      })
    }
  }
};


export default Spotify;
