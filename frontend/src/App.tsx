import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainView from './views/MainView'
import FeedbackView from './views/FeedbackForm'

export default function App() {
  const [currentView, setCurrentView] = useState('main')

  const toggleView = () => {
    setCurrentView(currentView === 'main' ? 'feedback' : 'main')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggleView={toggleView} currentView={currentView} />
      <div style={{ flex: 1, display: 'flex' }}>
        {currentView === 'main' ? <MainView /> : <FeedbackView />}
      </div>
      <Footer />
    </div>
  )
}