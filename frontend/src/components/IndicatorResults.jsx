import React from 'react';

export function IndicatorResults({ indicators }) {
  return (
    <div>
      <p>En base a la información ingresada le recomendamos los siguientes indicadores:</p>
      <ul>
        <li>Indicador 1</li>
        <li>Indicador 2</li>
        {/* Puedes iterar sobre los indicadores si se pasa una lista desde el backend */}
      </ul>
      <p>Estos indicadores son solo ejemplos y deberán ser actualizados con los datos reales del backend.</p>
    </div>
  );
}

