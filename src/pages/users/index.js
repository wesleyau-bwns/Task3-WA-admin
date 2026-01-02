import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function UserManagement() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        User Management
      </Typography>

      <Typography sx={{ mt: 2 }}>Start here to manage users...</Typography>
    </Paper>
  );
}
