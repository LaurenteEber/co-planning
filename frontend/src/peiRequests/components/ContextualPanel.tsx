import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';
import ConsultationHistory from './ConsultationHistory';
import { useConsultationHistory } from '../hooks/useConsultationHistory';

interface ContextualPanelProps {
  planningInstrument: PlanningInstrument;
}

const ContextualPanel: React.FC<ContextualPanelProps> = ({ planningInstrument }) => {
  const { history, loadHistory, selectConsultation } = useConsultationHistory(planningInstrument);

  React.useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <Box sx={{ width: 300, padding: 2, borderRight: '1px solid #ccc' }}>
      <Typography variant="h6" gutterBottom>
        Información del Plan
      </Typography>
      <Typography>Tipo de Plan: {planningInstrument.planType}</Typography>
      <Typography>
        Horizonte: {planningInstrument.planHorizon.startYear} - {planningInstrument.planHorizon.endYear}
      </Typography>
      <Typography>Entidad: {planningInstrument.entityName}</Typography>
      <Typography>Mision: {planningInstrument.entityMission}</Typography>
      <Divider sx={{ my: 2 }} />
      <ConsultationHistory history={history} onSelectConsultation={selectConsultation} />
    </Box>
  );
};

export default ContextualPanel;