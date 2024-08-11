export function IndicatorResults({ indicators }) {
  const { selection, inputs } = indicators;
  return (
    <div>
      <h2>Indicadores recomendados para {selection}:</h2>
      {selection === 'OEI' ? (
        <>
          <p>En base a la siguiente información ingresada:</p>
          <ul>
            <li>Denominación de OEI: {inputs.oeiName}</li>
            <li>Temática misional: {inputs.oeiTheme}</li>
            <li>Población objetivo: {inputs.oeiTargetPopulation}</li>
            <li>Efecto de cambio: {inputs.oeiEffect}</li>
            {/* Puedes añadir más lógica aquí para mostrar indicadores sugeridos */}
          </ul>
          <p>Le recomendamos:</p>
          <ul>
            <li>Indicador OEI 1</li>
            <li>Indicador OEI 2</li>
          </ul>
        </>
      ) : selection === 'AEI' ? (
        <>
          <p>En base a la siguiente información ingresada:</p>
          <ul>
            <li>Denominación de AEI: {inputs.aeiName}</li>
            <li>OEI contribuyente: {inputs.aeiContributes}</li>
            <h4>Productos de la AEI:</h4>
            {inputs.products.map((product, index) => (
              <div key={index}>
                <h5>Product N° {index + 1}</h5>
                <p>Nombre: {product.name}</p>
                <p>Población objetivo: {product.targetPopulation}</p>
                <p>Criterio de calidad: {product.qualityCriteria}</p>
              </div>
            ))}
          </ul>
          <p>Le recomendamos:</p>
          <ul>
            <li>Indicador AEI 1</li>
            <li>Indicador AEI 2</li>
            <li>Indicador AEI 3</li>
          </ul>
        </>
      ) : (
        <p>Por favor, seleccione una opción para obtener recomendaciones.</p>
      )}
      <p>Estos indicadores son solo ejemplos y deberán ser actualizados con los datos reales del backend.</p>
    </div>
  );
}