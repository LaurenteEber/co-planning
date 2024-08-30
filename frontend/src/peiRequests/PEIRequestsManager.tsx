import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, Tooltip } from '@mui/material';
import ContextualPanel from './components/ContextualPanel';
import ElementSelector from './components/ElementSelector';
import OEIForm from './components/OEIForm';
import AEIForm from './components/AEIForm';
import IndicatorsRecommended from './components/IndicatorsRecommended'
import InfoIcon from '@mui/icons-material/Info';
import { setOEIData, setIndicatorsResponse as setOEIIndicatorsResponse } from './store/recommendationRequest/oeiSlice';
import { setAEIData, setIndicatorsResponse as setAEIIndicatorsResponse } from './store/recommendationRequest/aeiSlice';
import { fetchIndicators } from '../store/nlpSlice';

const PEIRequestsManager: React.FC = () => {
	const [selectedElement, setSelectedElement] = useState<'OEI' | 'AEI' | null>(null);
	const [showIndicators, setShowIndicators] = useState(false);

	const dispatch = useDispatch();
	const planningInstrument = useSelector((state: RootState) => state.planningInstrument);
	const oeiRequest = useSelector((state: RootState) => state.pei.oeiRequest);
	const aeiRequest = useSelector((state: RootState) => state.pei.aeiRequest);

	const handleElementSelect = (element: 'OEI' | 'AEI') => {
		setSelectedElement(element);
		setShowIndicators(false);
	};

	const handleFormSubmit = async (data: any) => {
		if (selectedElement === 'OEI') {
			dispatch(setOEIData(data));
			const response = await dispatch(fetchIndicators({ entity: planningInstrument, data, type: 'OEI' }));
			if (fetchIndicators.fulfilled.match(response)) {
				dispatch(setOEIIndicatorsResponse(response.payload));
			}
		} else if (selectedElement === 'AEI') {
			dispatch(setAEIData(data));
			const response = await dispatch(fetchIndicators({ entity: planningInstrument, data, type: 'AEI' }));
			if (fetchIndicators.fulfilled.match(response)) {
				dispatch(setAEIIndicatorsResponse(response.payload));
			}
		}
		setShowIndicators(true);
	};

	return (
		<Box sx={{ display: 'flex', flexGrow: 1 }}>
			<ContextualPanel planningInstrument={planningInstrument} />
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
						<OEIForm onSubmit={handleFormSubmit} initialData={oeiRequest.oeiData} />
						{showIndicators && <IndicatorsRecommended indicators={oeiRequest.indicatorsResponse.indicators} />}
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
						<AEIForm onSubmit={handleFormSubmit} initialData={aeiRequest.aeiData} />
						{showIndicators && <IndicatorsRecommended indicators={aeiRequest.indicatorsResponse.indicators} />}
					</>
				)}
			</Box>
		</Box>
	);
};

export default PEIRequestsManager;