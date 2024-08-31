import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { ConsultationData } from '../types/consultationType';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../store/navigationSlice';

interface ConsultationHistoryProps {
  history: ConsultationData[];
  onSelectConsultation: (consultation: ConsultationData) => void;
}

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ history, onSelectConsultation }) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Historial de Consultas
      </Typography>
      <List>
        {history.map((consultation) => (
          <ListItem
            key={consultation.id}
            button
            onClick={() => onSelectConsultation(consultation)}
          >
            <ListItemText
              primary={`${consultation.type} - ${new Date(consultation.timestamp).toLocaleDateString()}`}
              secondary={consultation.data.denomination}
            />
          </ListItem>
        ))}
      </List>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => dispatch(setCurrentView('main'))} 
        fullWidth
        sx={{ mt: 2 }}
      >
        Volver a la página principal
      </Button>
    </Box>
  );
};

export default ConsultationHistory;