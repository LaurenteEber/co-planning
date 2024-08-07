import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { Button } from './Button';
import '../styles/SceneOne.css';

export function SceneOne({ onFormSubmit, onChange, formData }) {
  const handleSubmit = () => {
    if (!formData.name || !formData.mission) {
      alert('Por favor ingrese la información completa');
      return;
    }
    onFormSubmit();
  };

  return (
    <div>
      <h1>Bienvenido a Co-planning, su asistente en la formulación de indicadores</h1>
      <TextInput
        label="Nombre de pliego"
        name="name"
        value={formData.name}
        onChange={onChange}
      />
      <TextArea
        label="Misión del pliego"
        name="mission"
        value={formData.mission}
        onChange={onChange}
        large={true}
      />
      <Button label="Enviar" onClick={handleSubmit} />
    </div>
  );
}
