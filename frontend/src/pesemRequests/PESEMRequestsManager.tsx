import React from 'react';
import { Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../store/navigationSlice';

const PESEMRequestsManager: React.FC = () => {
  const dispatch = useDispatch();
  return <div>
    <Typography variant="h4" gutterBottom>
      PESEMRequestsManager en construcción
    </Typography>
    <Button variant="contained" color="primary" onClick={() => {
      dispatch(setCurrentView('main'));
      }}>
        Volver a la página principal
    </Button>
    </div>;
};

export default PESEMRequestsManager;