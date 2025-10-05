"use client";

import React, { useState } from "react";
import { Avatar, Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function Profile() {
    const [user, setUser] = useState({
        firstName: "Oriana",
        lastName: "Alfaro",
        email: "oriana.alfaro@example.com",
        city: "Montréal",
    });

    const [editing, setEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setEditing(false);
        alert("Profil mis à jour !");
    };

    return (
        <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f5f5"}}>
            <Paper sx={{ maxWidth: 600, margin: "0 auto", p: 4, borderRadius: 3 }} elevation={3}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, mr: 3 }}>OA</Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography color="text.secondary">{user.email}</Typography>
                        <Typography color="text.secondary">{user.city}</Typography>
                    </Box>
                </Box>

                {/* Infos */}
                <Typography variant="h6" gutterBottom>
                    Informations personnelles
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Prénom"
                        name="firstName"
                        fullWidth
                        value={user.firstName}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                    <TextField
                        label="Nom"
                        name="lastName"
                        fullWidth
                        value={user.lastName}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={user.email}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                    <TextField
                        label="Ville"
                        name="city"
                        fullWidth
                        value={user.city}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </Box>

                {/* Modify button / save */}
                <Box sx={{ mt: 4, textAlign: "right" }}>
                    {editing ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Sauvegarder
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setEditing(true)}
                        >
                            Modifier le profil
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
