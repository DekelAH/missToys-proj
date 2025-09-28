import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './assets/css/index.css'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

function App() {

  return (
    <Router>
      <section className="grid-container">
        <AppHeader className="app-header-section" />
        <main className="main-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toys" element={<ToyIndex />} />
            <Route path="/toys/:toyId" element={<ToyDetails />} />
          </Routes>
        </main>
        <AppFooter className="app-footer-section" />
      </section>
    </Router>
  )
}

export default App
