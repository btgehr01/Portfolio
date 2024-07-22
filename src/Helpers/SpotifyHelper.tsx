import axios from "axios";

const apiUrl = "https://bradygehrman-api.vercel.app/api/spotify";

export const postSongToPlaylist = async (songURI: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/addSong`,
      { songURI: songURI },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
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

export const getPlaylist = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getPlaylist`);
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
