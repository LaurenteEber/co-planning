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

  const handleBack = () => {
    onGoBack();
  };

  const handleDataSubmit = (newSelection, newData) => {
    setPlanningData({ selection: newSelection, inputs: newData });
    setShowResults(true);
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
        <FormPlanningData 
          onDataSubmit={handleDataSubmit}
        />
        {showResults && <IndicatorResults indicators={planningData} />}
      </div>
    </div>
  );
}