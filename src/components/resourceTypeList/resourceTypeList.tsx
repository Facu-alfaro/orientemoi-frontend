interface ResourceType {
    _id: string;
    name: string;
    description?: string; // optionnel
}


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    Box, Grid, Typography, Button, Tooltip, Fab, Card, CardContent, CardActions,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const borderColors = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#c2185b"];

export default function ResourceTypeList() {
    const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const router = useRouter();

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";


    // Load from backend
    useEffect(() => {
        const fetchResourceTypes = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/resource-types`);
                setResourceTypes(res.data || []);
            } catch (error) {
                console.error("Erreur de chargement:", error);
            }
        };
        fetchResourceTypes();
    }, []);

    // Open/Close the formulaire
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewName("");
        setNewDescription("");
    };

    // Add a new resource via backend
    const handleAddResourceType = async () => {
        if (!newName.trim()) return alert("Le nom est requis !");
        try {
            const res = await axios.post(`${API_BASE}/api/resource-types`, {
                name: newName,
                description: newDescription,
            });
            setResourceTypes([...resourceTypes, res.data]); // Ajoute la nouvelle ressource à la liste
            handleCloseDialog();
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            alert("Erreur lors de la création de la ressource");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
            <Typography variant="h3" fontWeight="bold" color="black" sx={{ mb: 6, textAlign: "center" }}>
                Types de Ressources
            </Typography>

            <Grid container spacing={4} sx={{ width: "100%", maxWidth: "lg" }}>
                {resourceTypes.map((type, index) => {
                    const color = borderColors[index % borderColors.length];
                    return (
                        <Grid item key={type._id || type._id || index} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: 3,
                                    border: `2px solid ${color}`,
                                    boxShadow: 3,
                                    transition: "all 0.3s ease",
                                    "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {type.name || "Nom inconnu"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {type.description || "Aucune description"}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ fontWeight: 600, bgcolor: color, "&:hover": { bgcolor: color } }}
                                        onClick={() =>
                                            router.push(`/pages/resourceList/${type._id}`)
                                        }
                                    >
                                        Voir les ressources
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Button + */}
            <Tooltip title="Ajouter un nouveau type" arrow>
                <Fab color="primary" aria-label="add" onClick={handleOpenDialog} sx={{ position: "fixed", bottom: 24, right: 24 }}>
                    <AddIcon fontSize="large" />
                </Fab>
            </Tooltip>

            {/* Dialog Formulaire */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajouter un type de ressource</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom"
                        fullWidth
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        minRows={2}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleAddResourceType} variant="contained">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
