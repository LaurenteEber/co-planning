import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { RootState } from '../store';
import ContextualPanel from './components/ContextualPanel';
import ElementSelector from './components/ElementSelector';
import OEIForm from './components/OEIForm';
import AEIForm from './components/AEIForm';
import IndicatorsRecommended from './components/IndicatorsRecommended';
import { useOEIForm } from './hooks/useOEIForm';
import { useAEIForm } from './hooks/useAEIForm';
import { fetchIndicators } from '../store/nlpSlice';
import { OEIData, AEIData } from './types/peiType';

const PEIRequestsManager: React.FC = () => {
	const dispatch = useDispatch();
	const planningInstrument = useSelector((state: RootState) => state.planningInstrument);
	const [selectedElement, setSelectedElement] = useState<'OEI' | 'AEI' | null>(null);
	const [showIndicators, setShowIndicators] = useState(false);

	const { initialData: oeiInitialData, loadHistory: loadOEIHistory, handleSubmit: handleOEISubmit } = useOEIForm(planningInstrument);
	const { initialData: aeiInitialData, loadHistory: loadAEIHistory, handleSubmit: handleAEISubmit } = useAEIForm(planningInstrument);

	const handleElementSelect = useCallback((element: 'OEI' | 'AEI') => {
		setSelectedElement(element);
		setShowIndicators(false);
		if (element === 'OEI') {
			loadOEIHistory();
		} else {
			loadAEIHistory();
		}
	}, [loadOEIHistory, loadAEIHistory]);

	const handleFormSubmit = useCallback((data: OEIData | AEIData, type: 'OEI' | 'AEI') => {
		if (type === 'OEI') {
			handleOEISubmit(data as OEIData);
		} else {
			handleAEISubmit(data as AEIData);
		}
		dispatch(fetchIndicators({ data, type }));
		setShowIndicators(true);
	}, [handleOEISubmit, handleAEISubmit, dispatch]);

	return (
		<Box sx={{ display: 'flex', flexGrow: 1 }}>
			<ContextualPanel planningInstrument={planningInstrument} />
			<Box sx={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
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
						<OEIForm onSubmit={(data) => handleFormSubmit(data, 'OEI')} initialData={oeiInitialData} />
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
						<AEIForm onSubmit={(data) => handleFormSubmit(data, 'AEI')} initialData={aeiInitialData} />
					</>
				)}
				{showIndicators && <IndicatorsRecommended formData={selectedElement === 'OEI' ? oeiInitialData : aeiInitialData} />}
			</Box>
		</Box>
	);
};

export default PEIRequestsManager;