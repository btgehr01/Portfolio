import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import {
  getSongsFromSearch,
  postSongToPlaylist,
} from "../Helpers/SpotifyHelper";

export type Artist = {
  id: string;
  name: string;
};

export type Album = {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
};

export type TrackItem = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  popularity: number;
  preview_url: string | null;
  type: string;
  uri: string;
};

const SpotifyController = () => {
  const [open, setOpen] = useState(false);
  const [songOptions, setSongOptions] = useState<TrackItem[]>([]);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [addingSongs, setAddingSong] = useState(false);

  useEffect(() => {
    const initialSearch = async () => {
      await handleSearch("Drake");
    };
    initialSearch();
  }, []);

  const handleSearch = async (searchString: string) => {
    if (searchString.trim()) {
      setIsLoadingSongs(true);
      try {
        const response = await getSongsFromSearch(searchString.trim());
        setSongOptions(response?.tracks?.items || []);
        console.log("Tracks:", response?.tracks?.items);
      } catch (e) {
        console.error("Error searching for songs:", e);
      } finally {
        setIsLoadingSongs(false);
      }
    }
  };

  const handleAddSong = async () => {
    if (selectedSongId) {
      setAddingSong(true);
      try {
        await postSongToPlaylist(selectedSongId);
      } catch (e) {
        console.error("Error adding song to playlist:", e);
      } finally {
        setAddingSong(false);
      }
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            border: selectedSongId ? "2px solid white" : "2px solid grey",
            width: "500px",
            bgcolor: "black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <LibraryMusicIcon
              sx={{
                color: selectedSongId ? "white" : "grey",
                marginRight: "20px",
              }}
              fontSize="large"
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: selectedSongId ? "white" : "grey",
                fontFamily: "Courier New",
              }}
            >
              Shared Spotify Playlist
            </Typography>
          </Box>
          <Autocomplete
            id="spotify-autocomplete"
            sx={{
              width: "100%",
              fontFamily: "Courier New",
              mb: 2,
              color: "rgba(255, 255, 255, 0.23)",
            }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(track, value) => track.id === value.id}
            getOptionLabel={(track) =>
              track.name + " - " + track.artists[0].name
            }
            options={songOptions}
            loading={isLoadingSongs}
            onInputChange={(e, newInputValue, reason) => {
              if (reason === "input") {
                handleSearch(newInputValue);
              }
            }}
            onChange={(e, newValue) => {
              setSelectedSongId(newValue?.uri || null);
            }}
            renderOption={(props, track) => (
              <li {...props} key={track.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ marginRight: 1 }}>
                    <img
                      src={track.album.images[2]?.url}
                      alt={`${track.name} album cover`}
                      style={{ width: 40, height: 40 }}
                    />
                  </Box>
                  <Box sx={{ fontFamily: "Courier New" }}>
                    {track.name} - {track.artists[0].name}
                  </Box>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ fontFamily: "Courier New" }}
                label={"Select a song"}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoadingSongs ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleAddSong}
            disabled={!selectedSongId || addingSongs || isLoadingSongs}
            sx={{ mt: 2 }}
          >
            {addingSongs ? (
              <CircularProgress size={24} />
            ) : (
              "Add Song to Playlist"
            )}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SpotifyController;
