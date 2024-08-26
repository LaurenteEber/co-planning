import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainView from './views/MainView'

export default function App() {
  return (
    <div>
      <Header />
      <MainView/>
      <Footer />
    </div>
  )
}