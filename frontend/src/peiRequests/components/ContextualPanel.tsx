import React from 'react';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';
import { Box, Typography, Divider, Paper } from '@mui/material';

interface ContextualPanelProps {
  planningInstrument: PlanningInstrument;
}

const ContextualPanel: React.FC<ContextualPanelProps> = ({ planningInstrument }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '250px',
        height: '100%',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        zIndex: 1,
      }}
    >
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom color="primary">
          Entidad formuladora
        </Typography>
        <Typography variant="body2"><strong>Nombre:</strong> {planningInstrument.name}</Typography>
        <Typography variant="body2" mt={1}><strong>Misión:</strong></Typography>
        <Typography variant="body2" paragraph>{planningInstrument.mission}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom color="primary">
          Instrumento de Planeamiento
        </Typography>
        <Typography variant="body2"><strong>Tipo de Plan:</strong> {planningInstrument.planType}</Typography>
        <Typography variant="body2">
          <strong>Horizonte:</strong> {planningInstrument.planHorizon.startYear} - {planningInstrument.planHorizon.endYear}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ContextualPanel;
