import axios from "axios";

const apiUrl = "/api/spotify";

export const postSongToPlaylist = async (songURI: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/addSong?songURI=${encodeURIComponent(songURI)}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getPlaylistSongs = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getPlaylistSongs`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getSongsFromSearch = async (searchString: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/getSongsFromSearch?searchString=${encodeURIComponent(
        searchString
      )}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
