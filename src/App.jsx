import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import './assets/css/index.css'

function App() {

  return (
    <>
      <Router>
        <section className="grid-container">
          <AppHeader className="app-header-section"/>
          <main className="main-section">
              <h1>Hello From Main</h1>
              <Routes>
                
              </Routes>
          </main>
          <AppFooter className="app-footer-section"/>
        </section>
      </Router>
    </>
  )
}

export default App
