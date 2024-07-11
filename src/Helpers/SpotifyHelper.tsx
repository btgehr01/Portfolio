import axios from "axios";

const accessToken = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN;
const playlistId = process.env.REACT_APP_SPOTIFY_PLAYLIST_ID;

export const postSongToPlaylist = async (
  playlistId: string,
  songURI: string
) => {
  const postData = {
    uris: [songURI],
    position: 0,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      postData,
      config
    );
  } catch (e) {
    console.log(e);
  }
};

export const getPlaylistSongs = async (playlistId: string) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=20`
    );
  } catch (e) {
    console.log(e);
  }
};

export const getSongsFromSearch = async (searchString: string) => {
  try {
    await axios.post(
      `
        https://api.spotify.com/v1/search?q=${searchString}type=track&limit=10&include_external=audio`
    );
  } catch (e) {
    console.log("hi");
  }
};
