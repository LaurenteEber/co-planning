import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AEIData } from '../types/peiType';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

const AEIForm: React.FC<{ onSubmit: (data: AEIData) => void, initialData: AEIData }> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit } = useForm<AEIData>({
    defaultValues: initialData
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="denomination"
        control={control}
        defaultValue=""
        rules={{ required: 'Este campo es requerido' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Denominación de la AEI"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="contributingOEI"
        control={control}
        defaultValue=""
        rules={{ required: 'Este campo es requerido' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="OEI al que contribuye la AEI"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      
      <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 4, mb: 2 }}>
        ¿En qué productos se hace concreto la AEI?
        <Tooltip title="Ingrese la información de los productos que se concretan en la AEI">
						<InfoIcon fontSize="small" sx={{ marginLeft: 1, cursor: 'pointer' }} />
        </Tooltip>
      </Typography>

      {fields.map((field, index) => (
        <Paper key={field.id} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Producto N° {index + 1}
          </Typography>
          <Controller
            name={`products.${index}.denomination`}
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es requerido' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Denominación del Producto"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name={`products.${index}.targetPopulation`}
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es requerido' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Población objetivo del Producto"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name={`products.${index}.qualityCriteria`}
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es requerido' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Criterio de calidad del Producto"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Paper>
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          type="button"
          onClick={() => append({ denomination: '', targetPopulation: '', qualityCriteria: '' })}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Agregar Producto
        </Button>
        {fields.length > 1 && (
          <Button
            type="button"
            onClick={() => remove(fields.length - 1)}
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
          >
            Eliminar Producto
          </Button>
        )}
      </Box>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
        Enviar
      </Button>
    </form>
  );
};

export default AEIForm;
