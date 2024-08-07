import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import FurnitureCatalog from './components/furniture-catalog/FurnitureCatalog';
import FurnitureDetails from './components/furniture-details/FurnitureDetails';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';  // Import PublicRoute
import FurnitureLiked from './components/furniture-liked/FurnitureLiked';
import FurnitureCreate from './components/furniture-create/FurnitureCreate';
import AboutUs from './components/about-us/AboutUs';
import FurnitureEdit from './components/furniture-edit/FurnitureEdit';
import Profile from './components/profile/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/furniture" element={<FurnitureCatalog />} />
            <Route path="/furniture/:id" element={<FurnitureDetails />} />
            <Route path="/furniture/liked" element={<FurnitureLiked />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Private Routes */}
            <Route
              path="/furniture/create"
              element={
                <PrivateRoute>
                  <FurnitureCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/furniture/edit/:id"
              element={
                <PrivateRoute>
                  <FurnitureEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
