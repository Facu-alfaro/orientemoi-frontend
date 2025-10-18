"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Box, Typography, Paper, Button, Grid, Divider } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function RapportPreview() {
    const searchParams = useSearchParams();
    const [resources, setResources] = useState<any[]>([]);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = searchParams.get("data");
        if (data) {
            try {
                setResources(JSON.parse(decodeURIComponent(data)));
            } catch {
                console.error("Erreur lors du décodage des données");
            }
        }
    }, [searchParams]);

    const handleDownloadPDF = async () => {
        if (!previewRef.current) return;
        const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth - 20; // marge gauche/droite
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("rapport_preview.pdf");
    };


    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ p: 4, bgcolor: "#fafafa", minHeight: "100vh" }}>
            <Paper
                ref={previewRef}
                sx={{
                    width: 800,       // largeur fixe pour le PDF
                    maxWidth: "100%",
                    mx: "auto",       // centre horizontal
                    p: 6,             // padding interne
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Rapport de Ressources
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Généré le {new Date().toLocaleDateString("fr-CA")}
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 3 }} />
                </Box>

                {/* Contenu */}
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                    {resources.length} ressources sélectionnées :
                </Typography>

                <Grid container spacing={2}>
                    {resources.map((res, idx) => (
                        <Grid item xs={12} key={idx}>
                            <Paper sx={{ p: 2, borderRadius: 2, backgroundColor: "#f9f9f9", border: "1px solid #e0e0e0" }}>
                                <Typography variant="h6" color="primary" fontWeight="bold">
                                    {res.name}
                                </Typography>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                    Type : {res.type} <br />
                                    Ville : {res.ville}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ mt: 5, mb: 2 }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
                    © {new Date().getFullYear()} OrienteMoi - Rapport généré automatiquement
                </Typography>
            </Paper>


            {/* --------- Boutons --------- */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleDownloadPDF}
                    sx={{ mr: 2 }}
                >
                    Télécharger PDF
                </Button>
                <Button variant="outlined" color="primary" onClick={handlePrint}>
                    Imprimer
                </Button>
            </Box>
        </Box>
    );
}
