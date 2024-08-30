import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { OEIData } from '../types/peiType';

interface OEIFormProps {
  onSubmit: (data: OEIData) => void;
  initialData: OEIData;
}

const OEIForm: React.FC<OEIFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit } = useForm<OEIData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="denomination"
        control={control}
        defaultValue=""
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Denominación del OEI"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="targetPopulation"
        control={control}
        defaultValue=""
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Población Objetivo del OEI"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="expectedEffect"
        control={control}
        defaultValue=""
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Resultado (Efecto) Esperado en la población objetivo del OEI"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
        Enviar
      </Button>
    </form>
  );
};

export default OEIForm;
