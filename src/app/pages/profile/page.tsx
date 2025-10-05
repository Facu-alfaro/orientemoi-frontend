"use client";
import Navbar from "@/components/navbar/Navbar";
import { Box } from "@mui/material";
import React from "react";
import Profile from "@/components/profile/profile";

export default function ProfilePage() {
    return (
        <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <Box sx={{ pt: 10 }}>
                <Profile />
            </Box>
        </Box>

    );
}
