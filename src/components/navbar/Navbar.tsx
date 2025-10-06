"use client";

import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
    const router = useRouter();
    return (
        <AppBar>
            <Toolbar>
                {/* Logo / Title at the left */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    OrienteMoi
                </Typography>

                {/* Navigation links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => router.push(`/pages/resourceTypeList`)}>
                        Types de Ressources
                    </Button>
                    <Button color="inherit" onClick={() => router.push(`/pages/rapportForm`)}>
                        Créer un rapport
                    </Button>
                </Box>

                {/* Profile completely at the right */}
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button color="inherit" onClick={() => router.push(`/pages/profile`)}>
                        Profile
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
