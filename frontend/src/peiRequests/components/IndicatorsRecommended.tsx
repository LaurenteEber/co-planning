import React from 'react';

interface IndicatorsRecommendedProps {
  formData: any;
}

const IndicatorsRecommended: React.FC<IndicatorsRecommendedProps> = ({ formData }) => {
  return (
    <div>
      <h2>Se recomienda:</h2>
      <ul>
        <li>Indicador 1</li>
        <li>Indicador 2</li>
      </ul>
      <h3>Información ingresada:</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default IndicatorsRecommended;