import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
  CardMedia,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { getPlaylist, getPlaylistSongs } from "../Helpers/SpotifyHelper";
import {
  SpotifyPlaylist,
  SpotifyPlaylistItem,
  SpotifyPlaylistItems,
} from "../Types/types";

const SpotifyPlaylist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [playListSongs, setPlayListSongs] = useState<SpotifyPlaylistItem[]>([]);
  const [shownSongIndex, setShownSongIndex] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    const loadPlaylist = async () => {
      await fetchSharedPlaylistAndPlaylistItems();
    };
    loadPlaylist();
  }, []);

  const fetchSharedPlaylistAndPlaylistItems = async () => {
    setIsLoading(true);
    try {
      const playListObject: SpotifyPlaylist = await getPlaylist();
      setPlaylist(playListObject);
      const playlistSongObjects: SpotifyPlaylistItems =
        await getPlaylistSongs();
      setPlayListSongs(playlistSongObjects?.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentCard = (songIndex: number) => {
    if (playListSongs && playListSongs[songIndex]) {
      const trackToRender = playListSongs[songIndex];
      return (
        <Card sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <CardMedia
                component="img"
                sx={{
                  width: trackToRender.track.album.images[1].width,
                  height: trackToRender.track.album.images[1].height,
                }}
                image={trackToRender.track.album.images[1].url || ""}
                alt={`${trackToRender.track.name} album cover`}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography component="div" variant="h5">
                  {trackToRender.track.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {trackToRender.track.artists[0].name}
                </Typography>
              </Box>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
        </Card>
      );
    }
  };

  const renderNextCard = () => {
    if (shownSongIndex < playListSongs.length - 1) {
      setShownSongIndex(shownSongIndex + 1);
    }
  };

  const renderPreviousCard = () => {
    if (shownSongIndex > 0) {
      setShownSongIndex(shownSongIndex + -1);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return isLoading ? (
    <CircularProgress color="inherit" size={28} />
  ) : (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          color: "white",
        }}
      >
        <Typography component="div" variant="h5">
          {playlist?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <ArrowBackIosIcon
            sx={{ cursor: "pointer" }}
            fontSize="large"
            onClick={renderPreviousCard}
          />
          {renderCurrentCard(shownSongIndex)}
          <ArrowForwardIosIcon
            sx={{ cursor: "pointer" }}
            fontSize="large"
            onClick={renderNextCard}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SpotifyPlaylist;
