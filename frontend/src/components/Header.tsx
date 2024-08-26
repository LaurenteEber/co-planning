import { LayoutDashboard } from 'lucide-react'
import { Button } from "./ui/button"

const Header = ({ toggleView, currentView }: { toggleView: () => void, currentView: string }) => (
  <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
    <div className="flex items-center">
      <LayoutDashboard className="mr-2 h-6 w-6" />
      <h1 className="text-2xl font-bold">Co-Planning</h1>
    </div>
    <Button 
      variant="secondary" 
      onClick={toggleView}
      className="text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20"
    >
      {currentView === 'main' ? 'Recomendaciones de mejora' : 'Volver a la aplicación'}
    </Button>
  </header>
)

export default Header