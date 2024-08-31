import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Container, 
  Box, 
  Grid,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { PlanningInstrument } from '../generalTypes/planningInstrumentType';
import { setPlanningInstrument } from '../store/planningInstrumentSlice';
import { setCurrentView } from '../store/navigationSlice';
import { RootState } from '../store';
import PEIRequestsManager from '../peiRequests/PEIRequestsManager';
import PESEMRequestsManager from '../pesemRequests/PESEMRequestsManager';
import { getSession, saveSession } from '../utils/localStorage';
import { setConsultationHistory } from '../peiRequests/store/consultationHistorySlice';
import { generateSessionId } from '../utils/sessionUtils';


const validateYear = (value: string) => {
  const numValue = Number(value);
  return (numValue > 2020 && numValue < 2050) || 'Año no soportado';
};

const validateEndYear = (startYear: string, endYear: string) => {
  const start = Number(startYear);
  const end = Number(endYear);
  if (end <= start + 2) {
    return 'El año de fin debe ser al menos 3 años mayor que el año de inicio';
  }
  return validateYear(endYear);
};

const MainView: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<PlanningInstrument>();
  const dispatch = useDispatch();
  const [showUnsupportedMessage, setShowUnsupportedMessage] = useState(false);
  const currentView = useSelector((state: RootState) => state.navigation.currentView);

  const planType = watch('planType');

  const onSubmit = (data: PlanningInstrument) => {
    const sessionId = generateSessionId(data);
    const existingSession = getSession(sessionId);
    if (existingSession) {
      dispatch(setPlanningInstrument(existingSession.planningInstrument));
      dispatch(setConsultationHistory(existingSession.consultations));
    } else {
      dispatch(setPlanningInstrument(data));
    }
    dispatch(setCurrentView(data.planType === 'PEI' ? 'peiRequests' : 'pesemRequests'));
  };

  if (currentView === 'peiRequests') {
    return <PEIRequestsManager />;
  }

  if (currentView === 'pesemRequests') {
    return <PESEMRequestsManager />;
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a Co-Planning
        </Typography>
        <Typography variant="body1" paragraph>
          Por favor, complete la información sobre el plan y la entidad formuladora.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={showUnsupportedMessage}>
                <InputLabel id="plan-type-label">Tipo de Plan</InputLabel>
                <Controller
                  name="planType"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Este campo es requerido' }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      labelId="plan-type-label"
                      label="Tipo de Plan"
                      error={!!error || showUnsupportedMessage}
                      onChange={(e) => {
                        field.onChange(e);
                        setShowUnsupportedMessage(e.target.value !== 'PEI' && e.target.value !== 'PESEM' && e.target.value !== '');
                      }}
                    >
                      <MenuItem value="" disabled>Seleccione el tipo de plan</MenuItem>
                      <MenuItem value="PN">PN</MenuItem>
                      <MenuItem value="PESEM">PESEM</MenuItem>
                      <MenuItem value="PDRC">PDRC</MenuItem>
                      <MenuItem value="PDLC-P">PDLC-P</MenuItem>
                      <MenuItem value="PDLC-D">PDLC-D</MenuItem>
                      <MenuItem value="PEI">PEI</MenuItem>
                    </Select>
                  )}
                />
                {showUnsupportedMessage && (
                  <FormHelperText>
                    Lo sentimos, actualmente solo damos soporte al PEI. Estamos trabajando para dar soporte a más planes en el futuro.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {(planType === 'PEI' || planType === 'PESEM') && (
              <>
                <Grid item xs={6}>
                  <Controller
                    name="planHorizon.startYear"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Este campo es requerido',
                      validate: validateYear
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Año de inicio"
                        error={!!error}
                        helperText={error?.message}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="planHorizon.endYear"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Este campo es requerido',
                      validate: (value) => validateEndYear(watch('planHorizon.startYear'), value)
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Año de fin"
                        error={!!error}
                        helperText={error?.message}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="entityName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nombre de la Entidad"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="entityMission"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label="Misión de la Entidad"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Continuar
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default MainView;

