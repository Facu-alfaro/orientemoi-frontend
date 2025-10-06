"use client";

import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton, Fab, Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

interface ResourceListProps {
    type: string;
}

interface Resource {
    id: number;
    name: string;
    description: string;
    website: string;
}

const initialResources: Resource[] = [
    {
        id: 1,
        name: "Banque alimentaire locale",
        description: "Repas gratuits et aide alimentaire disponible dans votre ville.",
        website: "https://exemple.com",
    },
    {
        id: 2,
        name: "Aide alimentaire pour personne agée",
        description: "Soutien alimentaire pour les personne de plus de 65 ans.",
        website: "https://exemple2.com",
    },
];

export default function ResourceList({ type }: ResourceListProps) {
    const [resources, setResources] = useState(initialResources);

    const handleAddResource = () => {
        const newId = resources.length + 1;
        const newResource: Resource = {
            id: newId,
            name: `Nouvelle ressource ${newId}`,
            description: "Description à compléter...",
            website: "#",
        };
        setResources([...resources, newResource]);
    };

    const handleEditResource = (id: number) => {
        const newName = prompt("Modifier le nom de la ressource :");
        if (newName) {
            setResources(
                resources.map((r) => (r.id === id ? { ...r, name: newName } : r))
            );
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4, position: "relative" }}>
            <Typography variant="h4" fontWeight="bold" mb={4} color="text.primary" >
                Ressources pour {type}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr",
                    },
                    gap: 3,
                }}
            >
                {resources.map((resource) => (
                    <Card
                        key={resource.id}
                        sx={{ position: "relative", borderRadius: 3, boxShadow: 3 }}
                    >
                        <IconButton
                            onClick={() => handleEditResource(resource.id)}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            title="Modifier la ressource"
                        >
                            <EditIcon />
                        </IconButton>

                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {resource.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {resource.description}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                href={resource.website}
                                target="_blank"
                                fullWidth
                            >
                                Visiter le site
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            <Tooltip title="Ajouter un nouveau type de ressource" arrow>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleAddResource}
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
