import React, { useState } from 'react';
import { Button, Typography, Paper, Box, Tooltip } from '@mui/material';


interface ElementSelectorProps {
  onSelect: (element: 'OEI' | 'AEI') => void;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({ onSelect }) => {
  const [selectedElement, setSelectedElement] = useState<'OEI' | 'AEI' | null>(null);

  const handleSelect = (element: 'OEI' | 'AEI') => {
    setSelectedElement(element);
    onSelect(element);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Button
          variant={selectedElement === 'OEI' ? 'contained' : 'outlined'}
          onClick={() => handleSelect('OEI')}
          fullWidth
          size="large"
          sx={{ 
            height: '100px', 
            fontSize: '1.2rem',
            backgroundColor: selectedElement === 'OEI' ? 'primary.main' : 'background.paper',
            color: selectedElement === 'OEI' ? 'white' : 'text.primary',
            '&:hover': {
              backgroundColor: selectedElement === 'OEI' ? 'primary.dark' : 'action.hover',
            }
          }}
        >
          <Typography variant="body2" sx={{ mt: 1 }}>
            Objetivo Estratégico Institucional (OEI)
          </Typography>
        </Button>
        
        <Button
          variant={selectedElement === 'AEI' ? 'contained' : 'outlined'}
          onClick={() => handleSelect('AEI')}
          fullWidth
          size="large"
          sx={{ 
            height: '100px', 
            fontSize: '1.2rem',
            backgroundColor: selectedElement === 'AEI' ? 'primary.main' : 'background.paper',
            color: selectedElement === 'AEI' ? 'white' : 'text.primary',
            '&:hover': {
              backgroundColor: selectedElement === 'AEI' ? 'primary.dark' : 'action.hover',
            }
          }}
        >
          <Typography variant="body2" sx={{ mt: 1 }}>
            Acción Estratégica Institucional (AEI)
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default ElementSelector;
