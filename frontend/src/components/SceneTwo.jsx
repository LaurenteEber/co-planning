import { useState } from 'react';
import { Button } from './Button';
import { IndicatorSelector } from './IndicatorSelector';
import { IndicatorResults } from './IndicatorResults';
import '../styles/SceneTwo.css';

export function SceneTwo({ onGoBack, formData }) {
  const [indicators, setIndicators] = useState(
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
    if (!needsUpdate) {
      setShowResults(true);
      setNeedsUpdate(false);
    }    
  };

  const handleIndicatorChange = (newSelection, newInputs) => {
    if (newSelection !== indicators.selection) {
      setShowResults(false);
      setNeedsUpdate(false);
    }
    setIndicators({ selection: newSelection, inputs: newInputs });
    if (showResults) {
      setNeedsUpdate(true)
    }
  };

  return (
    <div className="SceneTwo">
      <div className="left-panel">
        <p><strong>Pliego:</strong> {formData.pliego}</p>
        <p><strong>Misión:</strong> {formData.mission}</p>
        <Button label="Volver" onClick={handleBack} />
      </div>
      <div className="right-panel">
        <h2>Seleccione e ingrese información</h2>
        <IndicatorSelector onSelectionChange={handleIndicatorChange} />
        {needsUpdate && 
          <p style={{color: 'red' }}>
            Hay cambios sin enviar. Por favor, vuelva a hacer clic en <strong>Enviar</strong> para actualizar las recomendaciones.
          </p>}
        {showResults && <IndicatorResults indicators={indicators} />}
        <Button label="Enviar" onClick={handleShowResults} />
      </div>
    </div>
  );
}
