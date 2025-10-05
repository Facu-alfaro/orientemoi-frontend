"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography, Button, Tooltip, Fab, Card, CardContent, CardActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const initialResourceTypes = [
    {
        id: 1,
        name: "Aide alimentaire",
        description:
            "Liste des banques alimentaires, programmes d'aide et repas gratuits disponibles dans votre ville.",
    },
    {
        id: 2,
        name: "Anxiété",
        description:
            "Ressources pour le soutien psychologique, groupes de discussion et lignes d'écoute.",
    },
    {
        id: 3,
        name: "Logement",
        description:
            "Aide pour trouver un logement temporaire, services sociaux et centres d'hébergement.",
    },
];

export default function ResourceTypeList() {
    const [resourceTypes, setResourceTypes] = useState(initialResourceTypes);
    const router = useRouter();
    const handleAddResourceType = () => {
        const newId = resourceTypes.length + 1;
        const newType = {
            id: newId,
            name: `Nouveau type ${newId}`,
            description: "Description à compléter...",
        };
        setResourceTypes([...resourceTypes, newType]);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
            }}
        >
            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 6, color: "text.primary", textAlign: "center" }}
            >
                Types de Ressources
            </Typography>

            <Grid container spacing={4} sx={{ width: "100%", maxWidth: "lg" }}>
                {resourceTypes.map((type) => (
                    <Grid item key={type.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "all 0.3s ease",
                                bgcolor: "background.paper",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "translateY(-3px)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {type.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {type.description}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        fontWeight: 600,
                                        bgcolor: "primary.main",
                                        "&:hover": { bgcolor: "primary.dark" },
                                    }}
                                    onClick={() => router.push(`/pages/resourceList/${type.name.toLowerCase()}`)}
                                >
                                    Voir les ressources
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Tooltip title="Ajouter un nouveau type de ressource" arrow>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleAddResourceType}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        boxShadow: 4,
                        "&:hover": { boxShadow: 6 },
                    }}
                >
                    <AddIcon fontSize="large" />
                </Fab>
            </Tooltip>
        </Box>
    );
}
