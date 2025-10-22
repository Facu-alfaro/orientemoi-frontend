"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
    Fab,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent, TextField, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

interface ResourceType {
    _id: string;
    name: string;
    description?: string;
}

interface Resource {
    _id: string;
    name: string;
    description?: string;
    website?: string;
    typeId: string;
    city?: string;
}

export default function ResourceList() {
    const params = useParams();
    const typeId = params.type; // récupère l'id du type depuis l'URL
    const [openDialog, setOpenDialog] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newCity, setNewCity] = useState("");

    const [resources, setResources] = useState<Resource[]>([]);
    const [typeInfo, setTypeInfo] = useState<ResourceType | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typeRes, res] = await Promise.all([
                    axios.get<ResourceType>(`${API_BASE}/api/resource-types/${typeId}`),
                    axios.get<Resource[]>(`${API_BASE}/api/resources/${typeId}`)
                ]);
                setTypeInfo(typeRes.data);
                setResources(res.data);
            } catch (err) {
                console.error("Erreur de chargement :", err);
            }
        };
        if (typeId) fetchData();
    }, [typeId]);


    // Open/Close the formulaire
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewName("");
        setNewDescription("");
        setNewWebsite("");
        setNewCity("");
    };

    const handleAddResource = async () => {
        if (!newName.trim()) return alert("Le nom est requis !");
        try {
            const res = await axios.post<Resource>(`${API_BASE}/api/resources`, {
                name: newName,
                description: newDescription,
                website: newWebsite,
                city: newCity,
                typeId,
            });
            setResources([...resources, res.data]);
            handleCloseDialog();
        } catch (err) {
            console.error("Erreur lors de la création :", err);
            alert("Erreur lors de la création de la ressource");
        }
    };

    const handleEditResource = (id: string) => {
        const newName = prompt("Modifier le nom :");
        if (newName) {
            setResources(resources.map(r => r._id === id ? { ...r, name: newName } : r));
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4, position: "relative" }}>
            {/* Show the name title of the type */}
            {typeInfo && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" color="black">Resource pour {typeInfo.name}</Typography>

                </Box>
            )}

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
                {resources.map(resource => (
                    <Card key={resource._id} sx={{ borderRadius: 3, boxShadow: 3, position: "relative" }}>
                        <IconButton onClick={() => handleEditResource(resource._id)} sx={{ position: "absolute", top: 8, right: 8 }}>
                            <EditIcon />
                        </IconButton>

                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>{resource.name}</Typography>
                            {resource.description && (
                                <Typography variant="body2" color="text.secondary">{resource.description}</Typography>
                            )}
                        </CardContent>

                        {resource.website && (
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
                        )}
                    </Card>
                ))}
            </Box>

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
                    <TextField
                        margin="dense"
                        label="Website"
                        fullWidth
                        multiline
                        minRows={2}
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        multiline
                        minRows={2}
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleAddResource} variant="contained">Ajouter</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}