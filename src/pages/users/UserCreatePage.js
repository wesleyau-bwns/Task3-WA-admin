import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

import { createUser } from "../../api/endpoints/users";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      navigate("/users", { state: { success: "User created successfully" } });
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors); // set field-level errors
      } else {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box maxWidth={750}>
      <Typography variant="h6" mb={2}>
        Create User
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name?.[0]}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email?.[0]}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={!!errors.password}
          helperText={errors.password?.[0]}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
          error={!!errors.password_confirmation || !!errors.password}
          helperText={errors.password_confirmation?.[0] || errors.password?.[0]}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
}
