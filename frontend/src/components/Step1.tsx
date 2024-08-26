import React from 'react'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

const Step1 = ({ planType, setPlanType, planHorizon, setPlanHorizon, entityName, setEntityName, entityMission, setEntityMission }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="plan-type">Tipo de Plan Estratégico</Label>
      <Select value={planType} onValueChange={setPlanType}>
        <SelectTrigger id="plan-type">
          <SelectValue placeholder="Seleccione el tipo de plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PN">PN</SelectItem>
          <SelectItem value="PESEM">PESEM</SelectItem>
          <SelectItem value="PEI">PEI</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="plan-horizon">Horizonte de Planificación</Label>
      <Input id="plan-horizon" value={planHorizon} onChange={(e) => setPlanHorizon(e.target.value)} />
    </div>
    <div>
      <Label htmlFor="entity-name">Nombre de la Entidad</Label>
      <Input id="entity-name" value={entityName} onChange={(e) => setEntityName(e.target.value)} />
    </div>
    <div>
      <Label htmlFor="entity-mission">Misión de la Entidad</Label>
      <Textarea id="entity-mission" value={entityMission} onChange={(e) => setEntityMission(e.target.value)} />
    </div>
  </div>
)

export default Step1