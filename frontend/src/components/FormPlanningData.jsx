import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TextInput } from './TextInput';
import { Button } from './Button';
import '../styles/FormPlanningData.css';

export function FormPlanningData({ onDataSubmit }) {
  const [lastSuccessfulData, setLastSuccessfulData] = useState({ OEI: null, AEI: null });
  const [isIndicatorResultRendered, setIsIndicatorResultRendered] = useState(false);
  const [shouldWarnUser, setShouldWarnUser] = useState(false);

  const { register, control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      planningElementSelected: '',
      oeiName: '',
      oeiTheme: '',
      oeiTargetPopulation: '',
      oeiEffect: '',
      aeiName: '',
      aeiContributes: '',
      products: [{ name: '', targetPopulation: '', qualityCriteria: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const formValues = watch();
  const prevValuesRef = useRef({});
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (isIndicatorResultRendered && hasChanges(formValues, prevValuesRef.current)) {
      console.log("cambios en: ", formValues);
      setShouldWarnUser(true);
    }
  }, [formValues, isIndicatorResultRendered]);

  const onSubmit = (data) => {
    if (validateForm(data)) {
      onDataSubmit(data.planningElementSelected, data);
      setIsIndicatorResultRendered(true);
      setShouldWarnUser(false);
      prevValuesRef.current = JSON.parse(JSON.stringify(data));
      setLastSuccessfulData({
        ...lastSuccessfulData,
        [data.planningElementSelected]: data
      });
    } else {
      alert("Ingrese la información necesaria.");
    }
  };

  const handleSelectChange = (e) => {
    const newSelection = e.target.value;
    setValue('planningElementSelected', newSelection);
    
    const dataToRestore = lastSuccessfulData[newSelection];
    if (dataToRestore) {
      Object.entries(dataToRestore).forEach(([key, value]) => {
        if (key !== 'planningElementSelected') {
          setValue(key, value);
        }
      });
    } else {
      reset({
        planningElementSelected: newSelection,
        oeiName: '',
        oeiTheme: '',
        oeiTargetPopulation: '',
        oeiEffect: '',
        aeiName: '',
        aeiContributes: '',
        products: [{ name: '', targetPopulation: '', qualityCriteria: '' }]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-planning-data">
      <select 
        {...register('planningElementSelected')}
        onChange={handleSelectChange}
      >
        <option value="">Seleccionar</option>
        <option value="OEI">OEI</option>
        <option value="AEI">AEI</option>
      </select>
      {formValues.planningElementSelected === "OEI" && <OEIFields register={register} />}
      {formValues.planningElementSelected === "AEI" && (
        <AEIFields 
          register={register} 
          fields={fields} 
          append={append} 
          remove={remove} 
        />
      )}
      {shouldWarnUser && (
        <div className='warning-message' style={{color: 'red' }}>
          La información ingresada ha cambiado. Por favor, vuelva a enviar el formulario para obtener una recomendación de indicadores actualizada.
        </div>
      )}
      <Button label="Enviar" type="submit" />
    </form>
  );
}

function OEIFields({ register }) {
  return (
    <>
      <TextInput 
        label="Denominación de OEI" 
        {...register("oeiName", { required: true })}
      />
      <TextInput 
        label="¿A qué temática misional contribuye el OEI?" 
        {...register("oeiTheme", { required: true })}
      />
      <TextInput 
        label="¿Cuál es la población objetivo?" 
        {...register("oeiTargetPopulation", { required: true })}
      />
      <TextInput 
        label="¿Cuál es el efecto de cambio que se quiere alcanzar con el OEI en la población objetivo?" 
        {...register("oeiEffect", { required: true })}
      />
    </>
  );
}

function AEIFields({ register, fields, append, remove }) {
  return (
    <>
      <TextInput 
        label="Denominación de la AEI" 
        {...register("aeiName", { required: true })}
      />
      <TextInput 
        label="¿A qué OEI contribuye?" 
        {...register("aeiContributes", { required: true })}
      />
      <h4>¿En qué productos se hace concreto la AEI?</h4>
      {fields.map((field, index) => (
        <ProductFields 
          key={field.id} 
          index={index} 
          register={register} 
          remove={remove} 
        />
      ))}
      <Button 
        label="Agregar producto" 
        onClick={() => append({ name: '', targetPopulation: '', qualityCriteria: '' })}
      />
    </>
  );
}

function ProductFields({ index, register, remove }) {
  return (
    <div className="product-section">
      <h4>Producto N° {index + 1}</h4>
      <TextInput 
        label="Nombre de producto" 
        {...register(`products.${index}.name`, { required: true })}
      />
      <TextInput 
        label="Población objetivo" 
        {...register(`products.${index}.targetPopulation`, { required: true })}
      />
      <TextInput 
        label="Criterios de calidad" 
        {...register(`products.${index}.qualityCriteria`, { required: true })}
      />
      {index > 0 && (
        <Button label="Eliminar producto" onClick={() => remove(index)} />
      )}
    </div>
  );
}

function validateForm(data) {
  if (data.planningElementSelected === "OEI") {
    return data.oeiName && data.oeiTheme && data.oeiTargetPopulation && data.oeiEffect;
  } else if (data.planningElementSelected === "AEI") {
    return data.aeiName && data.aeiContributes && data.products.every(
      product => product.name && product.targetPopulation && product.qualityCriteria
    );
  }
  return false;
}

function hasChanges(current, prev) {
  for (const key in current) {
    if (key === 'products') {
      if (JSON.stringify(current[key]) !== JSON.stringify(prev[key])) {
        return true;
      }
    } else if (prev[key] && current[key] !== prev[key]) {
      return true;
    }
  }
  return false;
}
