import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { ConsultationData } from '../types/consultationType';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../store/navigationSlice';
import { setSelectedConsultation } from '../store/consultationHistorySlice';

interface ConsultationHistoryProps {
  history: ConsultationData[];
  onSelectConsultation: (consultation: ConsultationData) => void;
}

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ history, onSelectConsultation }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Historial de Consultas
      </Typography>
      <List>
        {history.map((consultation) => (
          <ListItem
            key={consultation.id}
            component="button"
            onClick={() => {
              onSelectConsultation(consultation);
              dispatch(setSelectedConsultation(consultation));
              setSelectedId(consultation.id);
            }}
            sx={{
              backgroundColor: selectedId === consultation.id ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
              },
            }}
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