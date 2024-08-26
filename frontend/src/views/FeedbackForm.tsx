import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

const FeedbackForm = () => (
  <Card className="w-full max-w-4xl mx-auto">
    <CardHeader>
      <CardTitle>Recomendaciones de mejora para Co-Planning</CardTitle>
      <CardDescription>Ayúdenos a mejorar nuestra aplicación</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label htmlFor="feedback">Sus recomendaciones</Label>
        <Textarea id="feedback" placeholder="Escriba sus recomendaciones aquí..." />
        <Button>Enviar Recomendaciones</Button>
      </div>
    </CardContent>
  </Card>
)

export default FeedbackForm