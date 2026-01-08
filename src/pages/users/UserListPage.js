import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getUsers, deleteUser } from "../../api/endpoints/users";

export default function UserListPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        search: searchQuery,
        per_page: pageSize,
        page: page + 1,
        sort_by: "created_at",
        sort_dir: "desc",
      });

      setRows(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMsg(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "email_verified_at",
      headerName: "Verified",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Yes" color="success" size="medium" />
        ) : (
          <Chip label="No" color="warning" size="medium" />
        ),
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "yyyy-MM-dd HH:mm"); // 2026-01-07 06:59
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" paddingTop={0.75} gap={1}>
          <IconButton
            color="primary"
            onClick={() => navigate(`/users/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() => navigate(`/users/${params.row.id}/edit`)}
          >
            <EditIcon />
          </IconButton>

          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Toolbar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
        gap={2}
      >
        {/* Left: Search */}
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            placeholder="Search by name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchInput)}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={fetchUsers}
            sx={{ height: "40px" }}
          >
            Search
          </Button>
        </Box>

        {/* Right: Create */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/users/create")}
        >
          Create
        </Button>
      </Box>

      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={total}
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
      />

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
