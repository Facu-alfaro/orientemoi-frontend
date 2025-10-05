"use client";
import { Box } from "@mui/material";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import ResourceTypeList from "@/components/resourceTypeList/resourceTypeList";

export default function ResourceTypeListPage() {
    return (
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fff" }}>
            <Navbar />
            <Box sx={{ pt: 9}}>
                <ResourceTypeList />
            </Box>
        </Box>
    );
}
