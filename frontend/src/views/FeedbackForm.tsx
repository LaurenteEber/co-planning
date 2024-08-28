import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Container, Box } from '@mui/material';

const FeedbackForm = () => (
  <Container maxWidth="md">
    <Box my={4}>
      <Card className="w-full mx-auto">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Recomendaciones de mejora para Co-Planning
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Ayúdenos a mejorar nuestra aplicación
          </Typography>
          <Box mt={2}>
            <TextField
              id="feedback"
              label="Sus recomendaciones"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Escriba sus recomendaciones aquí..."
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary">
              Enviar Recomendaciones
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Container>
);

export default FeedbackForm;