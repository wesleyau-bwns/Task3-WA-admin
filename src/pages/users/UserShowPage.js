import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { format } from "date-fns";
import { getUser, deleteUser } from "../../api/endpoints/users";

export default function UserShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    navigate("/users");
  };

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

      <Box display="flex" justifyContent="space-between" mt={2} width="100%">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/users")}
        >
          Cancel
        </Button>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
