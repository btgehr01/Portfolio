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
  Alert,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import {
  getSongsFromSearch,
  postSongToPlaylist,
} from "../Helpers/SpotifyHelper";
import { AxiosError } from "axios";
import SpotifyPlaylist from "./SpotifyPlaylist";
import { TrackItem } from "../Types/types";

const SpotifyController = () => {
  const [open, setOpen] = useState(false);
  const [songOptions, setSongOptions] = useState<TrackItem[]>([]);
  const [selectedSongId, setSelectedSongId] = useState<string>("");
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [addingSongs, setAddingSong] = useState(false);

  enum MessageType {
    Empty = "EMPTY",
    Success = "SUCCESS",
    Duplicate = "DUPLICATE",
    Error = "ERROR",
  }

  const [output, setOutput] = useState<MessageType>(MessageType.Empty);
  const [loadPlaylist, setLoadPlaylist] = useState(true);

  const initialSearchString = "Drake";

  const resetOutput = () => {
    if (output !== MessageType.Empty) {
      setOutput(MessageType.Empty);
    }
  };

  const resetSearch = async () => {
    await handleSearch(initialSearchString);
  };

  useEffect(() => {
    const initialSearch = async () => {
      await resetSearch();
    };
    initialSearch();
  }, []);

  const handleSearch = async (searchString: string) => {
    resetOutput();
    if (searchString.trim()) {
      setIsLoadingSongs(true);
      try {
        const response = await getSongsFromSearch(searchString.trim());
        setSongOptions(response?.tracks?.items || []);
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
        setOutput(MessageType.Success);
        setLoadPlaylist(true);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 401) {
          window.location.href =
            "https://bradygehrman-api.vercel.app/api/auth/login";
        } else if (axiosError.response && axiosError.response.status === 409) {
          setOutput(MessageType.Duplicate);
        } else {
          setOutput(MessageType.Error);
        }
      } finally {
        setSelectedSongId("");
        setAddingSong(false);
      }
    }
  };

  const renderOutputMessage = () => {
    switch (output) {
      case MessageType.Empty:
        return null;
      case MessageType.Success:
        return (
          <Alert severity="success">
            The song has been successfully added to the shared playlist.
          </Alert>
        );
      case MessageType.Duplicate:
        return (
          <Alert severity="warning">
            This song is already in the shared playlist.
          </Alert>
        );
      case MessageType.Error:
        return (
          <Alert severity="error">
            Unable to add the song to the shared playlist. Please try again
            later.
          </Alert>
        );
      default:
        return null;
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
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        <SpotifyPlaylist reload={loadPlaylist} setReload={setLoadPlaylist} />
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
              resetOutput();
              setSelectedSongId(newValue?.uri || "");
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
          <Box sx={{ paddingTop: 2 }}>{renderOutputMessage()}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SpotifyController;
