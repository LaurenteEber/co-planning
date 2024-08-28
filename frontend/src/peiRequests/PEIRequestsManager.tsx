import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Box, Typography, Tooltip} from '@mui/material';
import ContextualPanel from './components/ContextualPanel';
import ElementSelector from './components/ElementSelector';
import OEIForm from './components/OEIForm';
import AEIForm from './components/AEIForm';
import IndicatorsRecommended from './components/IndicatorsRecommended'
import InfoIcon from '@mui/icons-material/Info';

const PEIRequestsManager: React.FC = () => {
	const [selectedElement, setSelectedElement] = useState<'OEI' | 'AEI' | null>(null);
	const [showIndicators, setShowIndicators] = useState(false);
	const [formData, setFormData] = useState<any>(null);

	const entity = useSelector((state: RootState) => state.entityEnter);

	const handleElementSelect = (element: 'OEI' | 'AEI') => {
		setSelectedElement(element);
		setShowIndicators(false);
	};

	const handleFormSubmit = (data: any) => {
		setFormData(data);
		setShowIndicators(true);
	};

	return (
		<Box sx={{ display: 'flex', flexGrow: 1 }}>
			<ContextualPanel entity={entity} />
			<Box sx={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
				{/* <Typography variant="h4" gutterBottom>Recomendaciones de Indicadores</Typography> */}
				<Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
        	Seleccione el elemento del PEI
					<Tooltip title="Elija entre OEI o AEI">
						<InfoIcon fontSize="small" sx={{ marginLeft: 1, cursor: 'pointer' }} />
					</Tooltip>
				</Typography>


				<ElementSelector onSelect={handleElementSelect} />

				{selectedElement === 'OEI' && (
					<>
						<Typography variant="h6" gutterBottom color="primary">
						Ingrese los datos del OEI
						<Tooltip title="Ingrese la información sobre el OEI">
							<InfoIcon fontSize="small" sx={{ marginLeft: 1, cursor: 'pointer' }} />
							</Tooltip>
						</Typography>
						<OEIForm onSubmit={handleFormSubmit} />
						{showIndicators && <IndicatorsRecommended formData={formData} />}
					</>
				)}
				{selectedElement === 'AEI' && (
					<>
						<Typography variant="h6" gutterBottom color="primary">
						Ingrese los datos de la AEI
						<Tooltip title="Ingrese la información sobre la AEI">
							<InfoIcon fontSize="small" sx={{ marginLeft: 1, cursor: 'pointer' }} />
							</Tooltip>
						</Typography>
						<AEIForm onSubmit={handleFormSubmit} />
						{showIndicators && <IndicatorsRecommended formData={formData} />}
					</>
				)}
			</Box>
		</Box>
	);
};

export default PEIRequestsManager;