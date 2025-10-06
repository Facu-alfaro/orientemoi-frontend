"use client";

import {useState} from "react";
import {Box, Paper, Typography, TextField, FormControlLabel, Checkbox, Button} from "@mui/material";
import {useRouter} from "next/navigation";

export default function RapportForm() {
    const [patient, setPatient] = useState({nom: "", prenom: "", ville: ""});
    const [selected, setSelected] = useState<string[]>([]);
    const router = useRouter();
    const ressources = ["Aide alimentaire", "Anxiété", "Logement"];

    const toggle = (r: string) =>
        setSelected(selected.includes(r) ? selected.filter((s) => s !== r) : [...selected, r]);

    return (
        <Box>
            <Paper sx={{maxWidth: 700, margin: "0 auto", p: 4, borderRadius: 3}} elevation={3}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Créer un Rapport
                </Typography>

                {/* Infos du patient */}
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mb: 4}}>
                    <TextField
                        label="Nom"
                        value={patient.nom}
                        onChange={(e) => setPatient({...patient, nom: e.target.value})}
                        fullWidth
                    />
                    <TextField
                        label="Prénom"
                        value={patient.prenom}
                        onChange={(e) => setPatient({...patient, prenom: e.target.value})}
                        fullWidth
                    />
                    <TextField
                        label="Ville"
                        value={patient.ville}
                        onChange={(e) => setPatient({...patient, ville: e.target.value})}
                        fullWidth
                    />
                </Box>

                {/* Choix des ressources */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Choisir les ressources
                </Typography>
                <Box sx={{display: "flex", flexDirection: "column", gap: 1, mb: 4}}>
                    {ressources.map((r) => (
                        <FormControlLabel
                            key={r}
                            control={<Checkbox checked={selected.includes(r)} onChange={() => toggle(r)}/>}
                            label={r}
                        />
                    ))}
                </Box>

                {/* Preview Button */}
                <Box sx={{textAlign: "right"}}>
                    <Button variant="contained" color="success" onClick={() => router.push('/pages/rapportPreview')}>
                        Review / Aperçu
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
