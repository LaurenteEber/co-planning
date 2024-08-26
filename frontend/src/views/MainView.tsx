import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Container, 
  Box, 
  Grid 
} from '@mui/material';
import { Entity } from '../generalTypes/entityType';
import { setEntity } from '../peiRequests/store/entitySilce';

const MainView: React.FC = () => {
  const { control, handleSubmit } = useForm<Entity>();
  const dispatch = useDispatch();

  const onSubmit = (data: Entity) => {
    dispatch(setEntity(data));
    // Aquí puedes agregar la lógica para navegar a la siguiente vista
  };

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
              <Controller
                name="planType"
                control={control}
                defaultValue=""
                rules={{ required: 'Este campo es requerido' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    error={!!error}
                    label="Tipo de Plan"
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
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="planHorizon.startYear"
                control={control}
                defaultValue=""
                rules={{ required: 'Este campo es requerido' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Año de inicio"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="planHorizon.endYear"
                control={control}
                defaultValue=""
                rules={{ required: 'Este campo es requerido' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Año de fin"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
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
                name="mission"
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
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default MainView;

