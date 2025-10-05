'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// ⚠️ Si querés Poppins/Roboto, agregalas con next/font en el layout.
// No uses @import dentro de Global para evitar mismatches.

const theme = createTheme({
  typography: {
    // Esto usa tus fuentes de next/font si querés sumarlas después
    fontFamily: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(', '),
  },
  // palette, components, etc. acá si querés
});

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
