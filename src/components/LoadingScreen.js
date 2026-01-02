import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = ({
  message = "Loading...",
  size = 40,
  fullHeight = true,
}) => {
  return (
    <Box
      sx={{
        minHeight: fullHeight ? "100vh" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) =>
          theme.vars?.palette.background.default ||
          theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={size} />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
