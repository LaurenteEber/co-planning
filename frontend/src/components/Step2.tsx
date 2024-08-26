import React from 'react'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { PlusCircle, MinusCircle } from 'lucide-react'

const Step2 = ({ 
  planType, 
  planHorizon,
  entityName, 
  entityMission, 
  selectedType, 
  setSelectedType, 
  oeData, 
  setOeData, 
  aeData, 
  setAeData, 
  handleDataChange, 
  handleSubmit, 
  recommendation 
}) => {
  const addProduct = () => {
    if (aeData.products.length < 10) {
      setAeData({
        ...aeData,
        products: [...aeData.products, { denomination: '', targetPopulation: '', qualityCriteria: '' }]
      })
    }
  }

  const removeProduct = () => {
    if (aeData.products.length > 1) {
      setAeData({
        ...aeData,
        products: aeData.products.slice(0, -1)
      })
      handleDataChange()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/3 bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Datos ingresados:</h3>
          <p>Tipo de Plan: {planType}</p>
          <p>Horizonte de Planificación: {planHorizon}</p>
          <p>Entidad: {entityName}</p>
          <p>Misión: {entityMission}</p>
        </div>
        <div className="flex-grow space-y-4">
          <div>
            <Label>Seleccione OE o AE</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OE">OE</SelectItem>
                <SelectItem value="AE">AE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedType === 'OE' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="oe-denomination">Denominación de la OE</Label>
                <Input
                  id="oe-denomination"
                  value={oeData.denomination}
                  onChange={(e) => {
                    setOeData({...oeData, denomination: e.target.value})
                    handleDataChange()
                  }}
                />
              </div>
              <div>
                <Label htmlFor="oe-population">Población objetivo</Label>
                <Input
                  id="oe-population"
                  value={oeData.targetPopulation}
                  onChange={(e) => {
                    setOeData({...oeData, targetPopulation: e.target.value})
                    handleDataChange()
                  }}
                />
              </div>
              <div>
                <Label htmlFor="oe-effect">Efecto esperado</Label>
                <Input
                  id="oe-effect"
                  value={oeData.expectedEffect}
                  onChange={(e) => {
                    setOeData({...oeData, expectedEffect: e.target.value})
                    handleDataChange()
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="ae-denomination">Denominación de AE</Label>
                <Input
                  id="ae-denomination"
                  value={aeData.denomination}
                  onChange={(e) => {
                    setAeData({...aeData, denomination: e.target.value})
                    handleDataChange()
                  }}
                />
              </div>
              <div>
                <Label htmlFor="ae-oe">OE al que contribuye</Label>
                <Input
                  id="ae-oe"
                  value={aeData.contributingOe}
                  onChange={(e) => {
                    setAeData({...aeData, contributingOe: e.target.value})
                    handleDataChange()
                  }}
                />
              </div>
              <div>
                <Label>¿Qué productos constituyen la AE?</Label>
                {aeData.products.map((product, index) => (
                  <div key={index} className="space-y-2 mt-4 p-4 border rounded-lg">
                    <h4 className="font-semibold">Producto N° {index + 1}</h4>
                    <Input
                      placeholder="Denominación"
                      value={product.denomination}
                      onChange={(e) => {
                        const newProducts = [...aeData.products]
                        newProducts[index].denomination = e.target.value
                        setAeData({...aeData, products: newProducts})
                        handleDataChange()
                      }}
                    />
                    <Input
                      placeholder="Población objetivo"
                      value={product.targetPopulation}
                      onChange={(e) => {
                        const newProducts = [...aeData.products]
                        newProducts[index].targetPopulation = e.target.value
                        setAeData({...aeData, products: newProducts})
                        handleDataChange()
                      }}
                    />
                    <Input
                      placeholder="Criterio de calidad"
                      value={product.qualityCriteria}
                      onChange={(e) => {
                        const newProducts = [...aeData.products]
                        newProducts[index].qualityCriteria = e.target.value
                        setAeData({...aeData, products: newProducts})
                        handleDataChange()
                      }}
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <Button 
                    onClick={addProduct} 
                    disabled={aeData.products.length >= 10}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Producto
                  </Button>
                  <Button 
                    onClick={removeProduct} 
                    disabled={aeData.products.length <= 1}
                    variant="destructive"
                  >
                    <MinusCircle className="mr-2 h-4 w-4" />
                    Eliminar Producto
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Button onClick={handleSubmit}>Enviar</Button>
        </div>
      </div>
      {recommendation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  )
}

export default Step2