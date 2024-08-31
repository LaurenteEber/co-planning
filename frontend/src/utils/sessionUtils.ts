import { PlanningInstrument } from '../generalTypes/planningInstrumentType';

export const generateSessionId = (planningInstrument: PlanningInstrument): string => {
  const normalizeEntityName = (name: string): string => {
    return name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
      .replace(/[^a-z0-9\s]/g, "") // Eliminar caracteres especiales
      .replace(/\s+/g, "_") // Reemplazar espacios con guiones bajos
      .slice(0, 20); // Limitar a 15 caracteres
  };

  const entityName = normalizeEntityName(planningInstrument.entityName);

  return `${planningInstrument.planType}-${planningInstrument.planHorizon.startYear}-${planningInstrument.planHorizon.endYear}-${entityName}`;
};