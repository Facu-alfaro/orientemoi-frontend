"use client";

import { useState, useEffect } from "react";
import {
    Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox,
    ListItemText, OutlinedInput, Button, Grid, Card, CardContent, FormControlLabel
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ResourceType {
    _id: string;
    name: string;
}

interface Resource {
    _id: string;
    name: string;
    description?: string;
    website?: string;
    typeId: string | { _id: string; name: string }; // si populate côté backend
    city?: string;
}

export default function RapportForm() {
    const router = useRouter();
    const [resources, setResources] = useState<Resource[]>([]);
    const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedResources, setSelectedResources] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    // fetch types et ressources
    useEffect(() => {
        const fetchResourcesAndTypes = async () => {
            try {
                const typesRes = await axios.get<ResourceType[]>('http://localhost:4000/api/resource-types');
                setResourceTypes(typesRes.data);

                const res = await axios.get<Resource[]>('http://localhost:4000/api/resources');
                setResources(res.data);

                const allCities = Array.from(new Set(res.data.map(r => r.city).filter(Boolean)));
                setCities(allCities as string[]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResourcesAndTypes();
    }, []);

    // filtrage dynamique
    const filteredResources = resources.filter(
        (res) =>
            (selectedTypes.length === 0 || selectedTypes.includes(typeof res.typeId === 'string' ? res.typeId : res.typeId._id)) &&
            (selectedCities.length === 0 || (res.city && selectedCities.includes(res.city)))
    );

    const toggleResourceSelection = (id: string) => {
        setSelectedResources((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const handlePreview = () => {
        const resourcesToPreview = filteredResources.filter((r) => selectedResources.includes(r._id));
        router.push(
            `/pages/rapportPreview?data=${encodeURIComponent(JSON.stringify(resourcesToPreview))}`
        );
    };

    return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Paper sx={{ maxWidth: 900, mx: "auto", p: 4, borderRadius: 4 }} elevation={3}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Filtrer les Ressources
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Filtre Type */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type de ressource</InputLabel>
                            <Select
                                multiple
                                value={selectedTypes}
                                onChange={(e) => setSelectedTypes(e.target.value as string[])}
                                input={<OutlinedInput label="Type de ressource" />}
                                renderValue={(selected) =>
                                    selected
                                        .map((id) => resourceTypes.find((t) => t._id === id)?.name)
                                        .join(", ")
                                }
                            >
                                {resourceTypes.map((type) => (
                                    <MenuItem key={type._id} value={type._id}>
                                        <Checkbox checked={selectedTypes.includes(type._id)} />
                                        <ListItemText primary={type.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Filtre City */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>City</InputLabel>
                            <Select
                                multiple
                                value={selectedCities}
                                onChange={(e) => setSelectedCities(e.target.value as string[])}
                                input={<OutlinedInput label="City" />}
                                renderValue={(selected) => (selected as string[]).join(", ")}
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                        <Checkbox checked={selectedCities.includes(city)} />
                                        <ListItemText primary={city} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: "right", mb: 4 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setSelectedTypes([]);
                            setSelectedCities([]);
                            setSelectedResources([]);
                        }}
                    >
                        Réinitialiser les filtres
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {filteredResources.map((res) => (
                        <Grid item xs={12} sm={6} md={4} key={res._id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {res.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {typeof res.typeId === 'string' ? "Inconnu" : res.typeId.name} <br />
                                        City: {res.city}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedResources.includes(res._id)}
                                                onChange={() => toggleResourceSelection(res._id)}
                                            />
                                        }
                                        label="Sélectionner"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={selectedResources.length === 0}
                        onClick={handlePreview}
                    >
                        Prévisualiser le rapport
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
