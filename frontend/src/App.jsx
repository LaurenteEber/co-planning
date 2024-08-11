import { useState } from 'react';
import { SceneOne } from './components/SceneOne';
import { SceneTwo } from './components/SceneTwo';
import './styles/App.css';

export function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [formData, setFormData] = useState({ pliego: '', mission: '' });

  const handleGoSceneTwo = () => setCurrentScene(2);
  const handleGoBack = () => setCurrentScene(1);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      {currentScene === 1 ? (
        <SceneOne
          onFormSubmit={handleGoSceneTwo}
          onChange={handleChange}
          formData={formData}
        />
      ) : (
        <SceneTwo
          onGoBack={handleGoBack}
          formData={formData}
        />
      )}
      <div className="footer">
        Centro Nacional de Planeamiento Estratégico | Dirección Nacional de Seguimiento y Evaluación | Desarrollado por TechNision
      </div>
    </div>
  );
}