import { useState } from 'react';
import { TextInput } from './TextInput';
import { Button } from './Button';

export function IndicatorSelector({ onSelectionChange }) {
  const [selection, setSelection] = useState('');
  const [products, setProducts] = useState([{
    id: 1,
    name: '',
    targetPopulation: '',
    qualityCriteria: '',
  }]);
  const [indicatorsInputs, setIndicatorsInputs] = useState({
    oeiName: '',
    oeiTheme: '',
    oeiTargetPopulation: '',
    oeiEffect: '',
    aeiName: '',
    aeiContributes: '',
    aeiProducts: [],
  });

  const handleSelectChange = (e) => {
    const newSelection = e.target.value;
    setSelection(newSelection);
    setProducts([{
      id: 1,
      name: '',
      targetPopulation: '',
      qualityCriteria: '',
    }]);
    setIndicatorsInputs({
      oeiName: '',
      oeiTheme: '',
      oeiTargetPopulation: '',
      oeiEffect: '',
      aeiName: '',
      aeiContributes: '',
      aeiProducts: [],
    });
    onSelectionChange(newSelection, {products: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIndicatorsInputs((prev) => ({ ...prev, [name]: value }));
    onSelectionChange(
      selection, 
      { ...indicatorsInputs, [name]: value, products }
    );
  };

  const handleProductChange = (id, field, value) => {
    const updatedProducts = products.map((product) => 
      product.id === id ? { ...product, [field]: value } : product
    )
    setProducts(updatedProducts);
    onSelectionChange(
      selection, 
      { ...indicatorsInputs, products: updatedProducts }
    );
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: '',
      targetPopulation: '',
      qualityCriteria: '',
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    onSelectionChange(
      selection, 
      { ...indicatorsInputs, products: newProducts }
    );
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
          <TextInput 
            label="Denominación de OEI" 
            name="oeiName" 
            value={indicatorsInputs.oeiName}
            onChange={handleInputChange}  
          />
          <TextInput 
            label="¿A qué temática misional contribuye el OEI?" 
            name="oeiTheme" 
            value={indicatorsInputs.oeiTheme}
            onChange={handleInputChange}
          />
          <TextInput 
            label="¿Cuál es la población objetivo?" 
            name="oeiTargetPopulation" 
            value={indicatorsInputs.oeiTargetPopulation}
            onChange={handleInputChange}
          />
          <TextInput 
            label="¿Cuál es el efecto de cambio que se quiere alcanzar con el OEI en la población objetivo?" 
            name="oeiEffect" 
            value={indicatorsInputs.oeiEffect}
            onChange={handleInputChange}
          />
        </>
      )}
      {selection === "AEI" && (
        <>
          <TextInput 
            label="Denominación de la AEI" 
            name="aeiName" 
            value={indicatorsInputs.aeiName}
            onChange={handleInputChange}
          />
          <TextInput 
            label="¿A qué OEI contribuye?" 
            name="aeiContributes" 
            value={indicatorsInputs.aeiContributes}
            onChange={handleInputChange}
          />
          <h4>¿En qué productos se hace concreto la AEI?</h4>
          {products.map((product) => (
            <div key={product.id}>
              <h4>Producto N° {product.id}</h4>
              <TextInput 
                label="Nombre de producto" 
                name={`nameProduct${product.id}AEI`} 
                value={product.name}
                onChange={(e) => handleProductChange(
                  product.id, 'name', e.target.value
                )}
              />
              <TextInput 
                label="Población objetivo" 
                name={`targetProduct${product.id}AEI`}  
                value={product.targetPopulation}
                onChange={(e) => handleProductChange(
                  product.id, 'targetPopulation', e.target.value
                )}
              />
              <TextInput 
                label="Criterios de calidad" 
                name={`qualityCriteriaProduct${product.id}AEI`}
                value={product.qualityCriteria}
                onChange={(e) => handleProductChange(
                  product.id, 'qualityCriteria', e.target.value
                )}
              />
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