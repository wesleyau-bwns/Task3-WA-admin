import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <LockIcon
          sx={{
            fontSize: 100,
            color: "error.main",
            mb: 2,
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
