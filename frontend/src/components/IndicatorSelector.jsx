import { useState } from 'react';
import { TextInput } from './TextInput';
import { Button } from './Button';

export function IndicatorSelector({ onSelectionChange }) {
  const [selection, setSelection] = useState('');
  const [products, setProducts] = useState([]);

  const handleSelectChange = (e) => {
    setSelection(e.target.value);
    // En un escenario real, aquí podrías llamar a una función para obtener indicadores del backend.
    setProducts([])
    onSelectionChange(`Indicadores para ${e.target.value}`);
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1}
    ]);
  };

  return (
    <div>
      <p>¿Desea consultar indicadores de OEI o AEI?</p>
      <select onChange={handleSelectChange}>
        <option value="">Seleccionar</option>
        <option value="OEI">OEI</option>
        <option value="AEI">AEI</option>
      </select>
      {selection === "OEI" && (
        <>
          <TextInput label="Denominación de OEI" name="oeiName" />
          <TextInput label="¿A qué temática misional contribuye el OEI?" name="oeiTheme" />
          <TextInput label="¿Cuál es la población objetivo?" name="oeiTargetPopulation" />
          <TextInput label="¿Cuál es el efecto de cambio que se quiere alcanzar con el OEI en la población objetivo?" name="oeiEffect" />
        </>
      )}
      {selection === "AEI" && (
        <>
          <TextInput label="Denominación de la AEI" name="aeiName" />
          <TextInput label="¿A qué OEI contribuye?" name="aeiContributes" />
          {products.map((product) => (
            <div key={product.id}>
              <h4>Producto N° {product.id}</h4>
              <TextInput label="¿En qué productos se hace concreto la AEI?" name="aeiProducts" />
              <TextInput label="¿Cuál es la población objetivo?" name="aeiTargetPopulation" />
              <TextInput label="¿Cuáles son los criterios de calidad?" name="aeiQualityCriteria" />
            </div>
          ))}
          <Button 
            label="Agregar producto" 
            onClick={handleAddProduct}
          />
        </>
      )}
    </div>
  );
}