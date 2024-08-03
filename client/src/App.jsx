import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import FurnitureCatalog from './components/furniture-catalog/FurnitureCatalog';
import FurnitureDetails from './components/furniture-details/FurnitureDetails';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import FurnitureLiked from './components/furniture-liked/FurnitureLiked';
import FurnitureCreate from './components/furniture-create/FurnitureCreate';
import AboutUs from './components/about-us/AboutUs';
import FurnitureEdit from './components/furniture-edit/FurnitureEdit';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/furniture" element={<FurnitureCatalog />} />
              <Route path="/furniture/:id" element={<FurnitureDetails />} />
              <Route path="/furniture/liked" element={<FurnitureLiked />} />
              <Route path="/furniture/create" element={<FurnitureCreate />} />
              <Route path="/furniture/edit/:id" element={<FurnitureEdit />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </AuthProvider>
      </Provider>
    </Router>
  );
};

export default App;
