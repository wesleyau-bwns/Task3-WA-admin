import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function DashboardOverviewPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Overview
      </Typography>

      <Typography sx={{ mt: 2 }}>Welcome to BPSP!</Typography>
    </Paper>
  );
}
