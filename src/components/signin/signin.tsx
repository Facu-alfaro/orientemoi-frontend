"use client";

import { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Typography,
    Button,
    Link,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", form);

    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #90caf9 100%)",
                p: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    borderRadius: 6,
                    width: "100%",
                    maxWidth: 420,
                    textAlign: "center",
                    backgroundColor: "#ffffffdd",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                    Bienvenue
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Connecte-toi à ton compte pour continuer
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Adresse courriel"
                        variant="outlined"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<LoginIcon />}
                        sx={{
                            borderRadius: 4,
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.3,
                            mb: 2,
                        }}
                    >
                        Se connecter
                    </Button>
                </form>

                <Typography variant="body2" color="text.secondary">
                    Pas encore de compte ?{" "}
                    <Link href="/pages/signup" underline="hover" color="primary">
                        Crée-en un
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
