import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const IndicatorsRecommended: React.FC = () => {
  const { indicatorsResponse, loading, error } = useSelector((state: RootState) => state.nlp);

  if (loading) {
    return <Typography>Cargando indicadores...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!indicatorsResponse) {
    return null;
  }

  if (!indicatorsResponse.indicators || indicatorsResponse.indicators.length === 0) {
    return <Typography>
        No se encontraron indicadores recomendados.
      </Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Indicadores Recomendados:</Typography>
      <List>
        {indicatorsResponse.indicators.map((indicator: string, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={indicator} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default IndicatorsRecommended;