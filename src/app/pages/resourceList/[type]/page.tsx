"use client";

import React from "react";
import ResourceList from "@/components/resourceList/resourceList";
import { useParams } from "next/navigation";
import {Box} from "@mui/material";
import Navbar from "@/components/navbar/Navbar";

export default function ResourceListPage() {
    const params = useParams();
    const rawType = Array.isArray(params.type) ? params.type[0] : params.type ?? "inconnu";

    // Decode to get the correct spaces
    const type = decodeURIComponent(rawType);

    return (
        <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fff" }}>
            <Navbar />
            <Box sx={{ pt: 9}}>
                <ResourceList type={type} />
            </Box>
        </Box>
    );
}
