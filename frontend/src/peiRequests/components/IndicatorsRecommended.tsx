import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OEIData, AEIData } from '../types/peiType';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

interface IndicatorsRecommendedProps {
  formData: OEIData | AEIData;
}

const IndicatorsRecommended: React.FC<IndicatorsRecommendedProps> = ({ formData }) => {
  const { indicatorsResponse, loading, error } = useSelector((state: RootState) => state.nlp);

  if (loading) {
    return <Typography>Loading recommendations...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Indicadores Recomendados:</Typography>
      {indicatorsResponse && indicatorsResponse.indicators.length > 0 ? (
        <List>
          {indicatorsResponse.indicators.map((indicator, index) => (
            <ListItem key={index}>
              <ListItemText primary={indicator} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No se han generado recomendaciones aún.</Typography>
      )}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Información ingresada:</Typography>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </Paper>
  );
};

export default IndicatorsRecommended;