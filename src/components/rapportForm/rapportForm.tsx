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
} from "@mui/material";
import { useRouter } from "next/navigation";

// Exemple de ressources
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
    const router = useRouter();

    // Filter ressources
    const filteredResources = allResources.filter(
        (res) =>
            (selectedTypes.length === 0 || selectedTypes.includes(res.type)) &&
            (selectedVilles.length === 0 || selectedVilles.includes(res.ville))
    );

    return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Paper sx={{ maxWidth: 900, mx: "auto", p: 4, borderRadius: 4 }} elevation={3}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Filtrer les Ressources
                </Typography>

                {/* Selectors */}
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
                                variant="outlined"  //important this line to remove the yellow underlined under select
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
                                variant="outlined"
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

                {/* Button to restart the filter */}
                <Box sx={{ textAlign: "right", mb: 4 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setSelectedTypes([]);
                            setSelectedVilles([]);
                        }}
                    >
                        Réinitialiser les filtres
                    </Button>
                </Box>

                {/* List of filtered ressources */}
                <Grid container spacing={3}>
                    {filteredResources.map((res) => (
                        <Grid item xs={12} sm={6} md={4} key={res.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {res.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {res.type} <br />
                                        Ville: {res.ville}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => router.push(`/pages/resourceList/${res.type.toLowerCase()}`)}
                                    >
                                        Voir les ressources
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}
