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
  CardHeader,
  Divider,
  Skeleton,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LinkIcon from "@mui/icons-material/Link";
import { useTheme } from "@mui/material/styles";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPlaylist } from "../Helpers/SpotifyHelper";
import { SpotifyPlaylist, SpotifyPlaylistItem } from "../Types/types";
import Scene from "../Scene/Scene";

type Props = {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const SpotifyPlaylist = ({ reload, setReload }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [playListSongs, setPlayListSongs] = useState<SpotifyPlaylistItem[]>([]);
  const [shownSongIndex, setShownSongIndex] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    const loadPlaylist = async () => {
      await fetchSharedPlaylistAndPlaylistItems();
    };
    if (reload) {
      loadPlaylist();
      setReload(false);
    }
  }, [reload]);

  const fetchSharedPlaylistAndPlaylistItems = async () => {
    setIsLoading(true);
    try {
      const playListObject: SpotifyPlaylist = await getPlaylist();
      setPlaylist(playListObject);
      setPlayListSongs(playListObject?.tracks?.items || []);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                marginBottom: "15px",
              }}
            >
              <IconButton
                sx={{ marginRight: "9px" }}
                onClick={renderPreviousCard}
                aria-label="next track"
              >
                <ArrowBackIosNewIcon
                  sx={{
                    cursor: "pointer",
                    color: shownSongIndex > 0 ? "white" : "gray",
                  }}
                  fontSize="large"
                />
              </IconButton>
              <CardMedia
                component="img"
                sx={{
                  width: "300px",
                  height: "300px",
                }}
                image={trackToRender.track.album.images[1]?.url || ""}
                alt={`${trackToRender.track.name} album cover`}
              />
              <IconButton
                sx={{ marginLeft: "9px" }}
                onClick={renderNextCard}
                aria-label="next track"
              >
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    color:
                      shownSongIndex < playListSongs.length - 1
                        ? "white"
                        : "gray",
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Box>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon sx={{ color: "gray" }} />
              ) : (
                <SkipPreviousIcon sx={{ color: "gray" }} />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38, color: "gray" }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon sx={{ color: "gray" }} />
              ) : (
                <SkipNextIcon sx={{ color: "gray" }} />
              )}
            </IconButton>
          </Box>
        </Box>
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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "block",
            width: "200px",
            height: "200px",
            paddingRight: "20px",
          }}
        >
          <Scene />
        </Box>
        {isLoading ? (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "425px",
              borderRadius: "6px",
              border: "1px solid grey",
              backgroundImage: "none",
              marginBottom: "30px",
            }}
          >
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={65}
                  height={65}
                />
              }
              title={
                <Typography variant="body1" color="text.primary">
                  <Skeleton animation="wave" width="52%" />
                </Typography>
              }
              subheader={
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton animation="wave" width="68%" />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton animation="wave" width="35%" />
                  </Typography>
                </Box>
              }
            />
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    marginBottom: "15px",
                  }}
                >
                  <IconButton
                    sx={{ marginRight: "9px" }}
                    aria-label="next track"
                  >
                    <ArrowBackIosNewIcon
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={300}
                    height={300}
                  />
                  <IconButton
                    sx={{ marginLeft: "9px" }}
                    aria-label="next track"
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                </Box>
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
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      height={32}
                    />
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={85}
                      height={28}
                    />
                  </Typography>
                </Box>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  pb: 1,
                }}
              >
                <IconButton aria-label="previous">
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon sx={{ color: "gray" }} />
                  ) : (
                    <SkipPreviousIcon sx={{ color: "gray" }} />
                  )}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon
                    sx={{ height: 38, width: 38, color: "gray" }}
                  />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon sx={{ color: "gray" }} />
                  ) : (
                    <SkipNextIcon sx={{ color: "gray" }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Card>
        ) : (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "425px",
              borderRadius: "6px",
              border: "1px solid grey",
              backgroundImage: "none",
              marginBottom: "30px",
            }}
          >
            <CardHeader
              avatar={
                <CardMedia
                  component="img"
                  sx={{
                    width: "65px",
                    height: "65px",
                  }}
                  image={playlist?.images[2]?.url || ""}
                  alt={"playlist icon"}
                />
              }
              action={
                <IconButton
                  onClick={() =>
                    window.open(
                      playlist?.external_urls?.spotify ||
                        "https://open.spotify.com/playlist/3vlftc1sQ3E4SmBwg5AKMC",
                      "_blank"
                    )
                  }
                  aria-label="Playlist Link"
                >
                  <LinkIcon sx={{ cursor: "pointer", padding: "5px" }} />
                </IconButton>
              }
              title={
                <Typography
                  variant="body1"
                  sx={{ fontSize: "24px", fontWeight: "bold" }}
                  color="text.primary"
                >
                  {playlist?.name || "Shared Vibes"}
                </Typography>
              }
              subheader={
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" color="text.secondary">
                    {playlist?.description || "Spotify Collaborative Music Mix"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {playlist?.owner.display_name || "brady.gehrman"}
                  </Typography>
                </Box>
              }
            />
            <Divider />
            {renderCurrentCard(shownSongIndex)}
          </Card>
        )}
        <Box
          sx={{
            display: "block",
            width: "200px",
            height: "200px",
            paddingLeft: "20px",
          }}
        >
          <Scene />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SpotifyPlaylist;
