"use client";

import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    FormControlLabel
} from "@mui/material";
import { useRouter } from "next/navigation";

const allResources = [
    { id: 1, name: "Banque alimentaire A", type: "Aide alimentaire", ville: "Montréal" },
    { id: 2, name: "Centre d'écoute B", type: "Anxiété", ville: "Québec" },
    { id: 3, name: "Hébergement C", type: "Logement", ville: "Montréal" },
    { id: 4, name: "Programme D", type: "Aide alimentaire", ville: "Laval" },
    { id: 5, name: "Support E", type: "Anxiété", ville: "Laval" },
];

const resourceTypes = ["Aide alimentaire", "Anxiété", "Logement"];
const villes = ["Montréal", "Québec", "Laval"];

export default function RapportForm() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedVilles, setSelectedVilles] = useState<string[]>([]);
    const [selectedResources, setSelectedResources] = useState<number[]>([]);
    const router = useRouter();

    const filteredResources = allResources.filter(
        (res) =>
            (selectedTypes.length === 0 || selectedTypes.includes(res.type)) &&
            (selectedVilles.length === 0 || selectedVilles.includes(res.ville))
    );

    const toggleResourceSelection = (id: number) => {
        setSelectedResources((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const handlePreview = () => {
        const resourcesToPreview = allResources.filter((r) => selectedResources.includes(r.id));
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

                {/* Sélecteurs */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type de ressource</InputLabel>
                            <Select
                                multiple
                                value={selectedTypes}
                                onChange={(e) => setSelectedTypes(e.target.value as string[])}
                                input={<OutlinedInput label="Type de ressource" />}
                                renderValue={(selected) => (selected as string[]).join(", ")}
                            >
                                {resourceTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        <Checkbox checked={selectedTypes.includes(type)} />
                                        <ListItemText primary={type} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Ville</InputLabel>
                            <Select
                                multiple
                                value={selectedVilles}
                                onChange={(e) => setSelectedVilles(e.target.value as string[])}
                                input={<OutlinedInput label="Ville" />}
                                renderValue={(selected) => (selected as string[]).join(", ")}
                            >
                                {villes.map((ville) => (
                                    <MenuItem key={ville} value={ville}>
                                        <Checkbox checked={selectedVilles.includes(ville)} />
                                        <ListItemText primary={ville} />
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
                            setSelectedVilles([]);
                            setSelectedResources([]);
                        }}
                    >
                        Réinitialiser les filtres
                    </Button>
                </Box>

                {/* Liste filtrée */}
                <Grid container spacing={3}>
                    {filteredResources.map((res) => (
                        <Grid item xs={12} sm={6} md={4} key={res.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {res.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {res.type} <br />
                                        Ville: {res.ville}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedResources.includes(res.id)}
                                                onChange={() => toggleResourceSelection(res.id)}
                                            />
                                        }
                                        label="Sélectionner"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bouton de prévisualisation */}
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
