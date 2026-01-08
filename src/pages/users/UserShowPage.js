import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { format } from "date-fns";
import { getUser } from "../../api/endpoints/users";

export default function UserShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <Box maxWidth={750}>
      <Typography variant="h6" mb={2}>
        User Details
      </Typography>

      <Typography mb={1}>
        <strong>Name:</strong> {user.name}
      </Typography>

      <Typography mb={1}>
        <strong>Email:</strong> {user.email}
      </Typography>

      <Typography mb={1}>
        <strong>Email Verified:</strong>{" "}
        {user.email_verified_at ? (
          <Chip label="Yes" color="success" size="small" />
        ) : (
          <Chip label="No" color="warning" size="small" />
        )}
      </Typography>

      <Typography mb={1}>
        <strong>Created At:</strong>{" "}
        {format(new Date(user.created_at), "yyyy-MM-dd HH:mm")}
      </Typography>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/users")}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
}
