"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar>
            <Toolbar>
                {/* Logo / Title at the left */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    OrienteMoi
                </Typography>

                {/* Navigation links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} href="/resourceTypeList">
                        Types de Ressources
                    </Button>
                    <Button color="inherit" component={Link} href="/rapportForm">
                        Créer un rapport
                    </Button>
                </Box>

                {/* Profile completely at the right */}
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button color="inherit" component={Link} href="/profile">
                        Profil
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
