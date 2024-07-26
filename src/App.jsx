import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import FurnitureCatalog from './components/furniture-catalog/FurnitureCatalog';
import FurnitureDetails from './components/furniture-details/FurnitureDetails';
import Home from './components/home/Home';

const App = () => {
  return (
    <Router>
      <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/furniture" element={<FurnitureCatalog />} />
            <Route path="/furniture/:id" element={<FurnitureDetails />} />
            {/* <Route path="/login" element={LoginPage} /> */}
            {/* <Route path="/register" element={RegisterPage} /> */}
          </Routes>
      </Layout>
    </Router>
  );
};

export default App;
