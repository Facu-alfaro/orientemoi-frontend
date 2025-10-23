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
    DialogContent,
    TextField,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import { motion } from "framer-motion";
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

interface ResourceListProps {
    type?: string;
}

export default function ResourceList({ type }: ResourceListProps) {
    const params = useParams();
    const typeId = type || params.type;
    const [openDialog, setOpenDialog] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newCity, setNewCity] = useState("");

    const [resources, setResources] = useState<Resource[]>([]);
    const [typeInfo, setTypeInfo] = useState<ResourceType | null>(null);
    const [loading, setLoading] = useState(true); // ✅ ajout du loader

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typeRes, res] = await Promise.all([
                    axios.get<ResourceType>(`${API_BASE}/api/resource-types/${typeId}`),
                    axios.get<Resource[]>(`${API_BASE}/api/resources/${typeId}`),
                ]);
                setTypeInfo(typeRes.data);
                setResources(res.data);
            } catch (err) {
                console.error("Erreur de chargement :", err);
            } finally {
                setLoading(false); // ✅ stop le loader
            }
        };
        if (typeId) fetchData();
    }, [typeId]);

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
            setResources(resources.map((r) => (r._id === id ? { ...r, name: newName } : r)));
        }
    };

    // ✅ État de chargement
    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "gray",
                    flexDirection: "column",
                }}
            >
                <CircularProgress color="primary" sx={{ mb: 2 }} />
                <Typography variant="body1">Chargement des ressources...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 4, position: "relative" }}>
            {typeInfo && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" color="black">
                        Ressources pour {typeInfo.name}
                    </Typography>
                </Box>
            )}

            {/* ✅ Si vide */}
            {resources.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 12,
                            color: "gray",
                            opacity: 0.7,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FolderOffIcon sx={{ fontSize: 100, mb: 2, opacity: 0.4 }} />
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Aucune ressource trouvée
                        </Typography>
                        <Typography variant="body2">
                            Cliquez sur le bouton <b>+</b> pour ajouter une nouvelle ressource.
                        </Typography>
                    </Box>
                </motion.div>
            ) : (
                // ✅ Liste des ressources avec animation
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                            gap: 3,
                        }}
                    >
                        {resources.map((resource) => (
                            <motion.div
                                key={resource._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card sx={{ borderRadius: 3, boxShadow: 3, position: "relative" }}>
                                    <IconButton
                                        onClick={() => handleEditResource(resource._id)}
                                        sx={{ position: "absolute", top: 8, right: 8 }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {resource.name}
                                        </Typography>
                                        {resource.description && (
                                            <Typography variant="body2" color="text.secondary">
                                                {resource.description}
                                            </Typography>
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
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            )}

            {/* ✅ Bouton + */}
            <Tooltip title="Ajouter une nouvelle ressource" arrow>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleOpenDialog}
                    sx={{ position: "fixed", bottom: 24, right: 24 }}
                >
                    <AddIcon fontSize="large" />
                </Fab>
            </Tooltip>

            {/* ✅ Dialog Formulaire */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajouter une ressource</DialogTitle>
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
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Ville"
                        fullWidth
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleAddResource} variant="contained">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
