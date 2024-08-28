import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { LayoutDashboard } from 'lucide-react';

const Header = ({ toggleView, currentView }: { toggleView: () => void, currentView: string }) => (
  <AppBar position="static" className="bg-primary">
    <Toolbar className="flex justify-between">
      <Box className="flex items-center">
        <LayoutDashboard className="mr-2 h-6 w-6" />
        <Typography variant="h6" component="h1" className="font-bold">
          Co-Planning
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        onClick={toggleView}
        className="bg-white text-primary hover:bg-white/90"
      >
        {currentView === 'main' ? 'Sugerencias de mejora' : 'Volver a la aplicación'}
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;