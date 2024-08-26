import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import Header from './components/Header'
import Footer from './components/Footer'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import FeedbackForm from './components/FeedbackForm'

export default function App() {
  const [currentView, setCurrentView] = useState('main')
  const [step, setStep] = useState(1)
  const [planType, setPlanType] = useState('')
  const [planHorizon, setPlanHorizon] = useState('')
  const [entityName, setEntityName] = useState('')
  const [entityMission, setEntityMission] = useState('')
  const [selectedType, setSelectedType] = useState('OE')
  const [oeData, setOeData] = useState({
    denomination: '', 
    targetPopulation: '', 
    expectedEffect: '' 
  })
  const [aeData, setAeData] = useState({ 
    denomination: '', 
    contributingOe: '', 
    products: [{ 
      denomination: '', 
      targetPopulation: '', 
      qualityCriteria: '' 
    }] 
  })
  const [recommendation, setRecommendation] = useState('')
  const [isDataModified, setIsDataModified] = useState(false)

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    setRecommendation("En base a la información ingresada se le recomienda los indicadores: Indicador 1, Indicador 2")
    setIsDataModified(false)
  }

  const handleDataChange = () => {
    if (!isDataModified) {
      setIsDataModified(true)
      setRecommendation("Información modificada, vuelva a enviar para actualizar la recomendación")
    }
  }

  const toggleView = () => {
    setCurrentView(currentView === 'main' ? 'feedback' : 'main')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleView={toggleView} currentView={currentView} />
      <main className="flex-grow container mx-auto p-4">
        {currentView === 'main' ? (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Co-Planning: Recomendación de Indicadores</CardTitle>
              <CardDescription>Paso {step} de 2</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <Step1
                  planType={planType}
                  setPlanType={setPlanType}
                  planHorizon={planHorizon}
                  setPlanHorizon={setPlanHorizon}
                  entityName={entityName}
                  setEntityName={setEntityName}
                  entityMission={entityMission}
                  setEntityMission={setEntityMission}
                />
              )}
              {step === 2 && (
                <Step2
                  planType={planType}
                  planHorizon={planHorizon}
                  entityName={entityName}
                  entityMission={entityMission}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  oeData={oeData}
                  setOeData={setOeData}
                  aeData={aeData}
                  setAeData={setAeData}
                  handleDataChange={handleDataChange}
                  handleSubmit={handleSubmit}
                  recommendation={recommendation}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && <Button onClick={handlePrevStep}>Anterior</Button>}
              {step < 2 && <Button onClick={handleNextStep}>Siguiente</Button>}
            </CardFooter>
          </Card>
        ) : (
          <FeedbackForm />
        )}
      </main>
      <Footer />
    </div>
  )
}