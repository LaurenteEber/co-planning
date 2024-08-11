import { useState } from 'react';
import { Button } from './Button';
import { FormPlanningData } from './FormPlanningData';
import { IndicatorResults } from './IndicatorResults';
import '../styles/SceneTwo.css';

export function SceneTwo({ onGoBack, formData }) {
  const [planningData, setPlanningData] = useState(
    { 
      selection: '', 
      inputs: { products: [] } 
    });
  const [showResults, setShowResults] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const handleBack = () => {
    onGoBack();
  };

  const handleShowResults = () => {
      setShowResults(true);
      setNeedsUpdate(false); 
  };

  const handlePlanningDataChange = (newSelection, newInputs) => {
    if (newSelection !== planningData.selection) {
      setShowResults(false);
    }
    if (newInputs !== planningData.inputs) {
      setNeedsUpdate(true);
      setShowResults(false);
    }
    setPlanningData({ selection: newSelection, inputs: newInputs });
    if (showResults) {
      setNeedsUpdate(false);
    }
  };

  return (
    <div className="SceneTwo">
      <div className="left-panel">
        <h2>Información del pliego</h2>
        <p><strong>Nombre:</strong> {formData.pliego}</p>
        <p><strong>Misión:</strong> {formData.mission}</p>
        <Button label="Volver" onClick={handleBack} />
      </div>
      <div className="right-panel">
        <h2>Seleccione e ingrese información</h2>
        <FormPlanningData onSelectionChange={handlePlanningDataChange} />
        {needsUpdate && 
          <p style={{color: 'red' }}>
            Hay cambios sin enviar. Por favor, vuelva a hacer clic en <strong>Enviar</strong> para actualizar las recomendaciones.
          </p>}
        {showResults && <IndicatorResults indicators={planningData} />}
        <Button label="Enviar" onClick={handleShowResults} />
      </div>
    </div>
  );
}
