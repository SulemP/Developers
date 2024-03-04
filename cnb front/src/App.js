import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TablaDesarrolladores from './components/Desarrolladores/Desarrolladores';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/desarrolladores" element={<TablaDesarrolladores />} />
    //   </Routes>
    // </Router>

    <div className="App">
      <header className="App-header">
        <TablaDesarrolladores/>
      </header>
    </div>
  );
}

export default App;
