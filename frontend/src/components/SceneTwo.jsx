import { useState } from 'react';
import { Button } from './Button';
import { IndicatorSelector } from './IndicatorSelector';
import { IndicatorResults } from './IndicatorResults';
import '../styles/SceneTwo.css';

export function SceneTwo({ onGoBack, formData }) {
  const [indicators, setIndicators] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleBack = () => {
    onGoBack();
  };

  // Aquí, ajusta el código según los detalles específicos de cómo se manejarán las entradas
  // y cómo se interactuará con el backend para obtener los indicadores.

  const handleShowResults = () => {
    // Implement any validaction logic
    setShowResults(true);
  };

  return (
    <div className="SceneTwo">
      <div className="left-panel">
        <p><strong>Pliego:</strong> {formData.name}</p>
        <p><strong>Misión:</strong> {formData.mission}</p>
        <Button label="Volver" onClick={handleBack} />
      </div>
      <div className="right-panel">
        <IndicatorSelector onSelectionChange={setIndicators} />
        <Button label="Enviar" onClick={handleShowResults} />
        {showResults && <IndicatorResults indicators={indicators} />}
      </div>
    </div>
  );
}
