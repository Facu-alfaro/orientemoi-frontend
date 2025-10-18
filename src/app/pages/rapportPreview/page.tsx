"use client";
import { Box } from "@mui/material";
import React from "react";
import RapportPreview from "@/components/rapportPreview/rapportPreview";
import Navbar from "@/components/navbar/Navbar";

export default function RapportFormPage() {
    return (
        <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <Box sx={{ pt: 9 }}>
                <RapportPreview />
            </Box>
        </Box>
    );
}
