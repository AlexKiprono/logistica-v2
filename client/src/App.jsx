import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import WebSocketComponent from "./components/WebSocketComponent"; 
import { AuthProvider } from './context/AuthContext';
import Dashboard from './superadmin/dashboard';
import CompanyDashboard from './companyadmin/dashboard';
import { SuperAdminProvider } from './context/SuperAdminContext';
import { CompanyAdminProvider } from './context/CompanyAdminContext';
import { PassengerProvider } from './context/PassengerContext';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import DriverDashboard from './Driver/Dashboard';
import { DriverProvider } from './context/DriverContext';
import Schedules from './passenger/Schedules';
import StationDashboard from './stationadmin/dashboard';
import { StationAdminProvider } from './context/StationAdminContext';
import BookingsPage from './passenger/dashboard';

function App() {
  return (
    <AuthProvider>
      <SuperAdminProvider>
        <CompanyAdminProvider>
          <StationAdminProvider>
            <DriverProvider>
              <PassengerProvider>
                <BrowserRouter>
                  <div>
                    <WebSocketComponent />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth/login" element={<Login />} />
                      <Route path="/auth/register" element={<Register />} />
                      <Route path="/auth/signup" element={<SignUp />} />
                      <Route
                        path="/superadmin/dashboard"
                        element={<Dashboard />}
                      />
                      <Route
                        path="/companyadmin/dashboard"
                        element={<CompanyDashboard />}
                      />
                      <Route
                        path="/stationadmin/dashboard"
                        element={<StationDashboard />}
                      />
                      <Route
                        path="/driver/dashboard"
                        element={<DriverDashboard />}
                      />
                      {/* <Route path="/dashboard" element={<Schedules />} />{" "} */}
                      <Route path="/dashboard" element={<BookingsPage />} />{" "}
                    </Routes>
                  </div>
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={true}
                  />
                </BrowserRouter>
              </PassengerProvider>
            </DriverProvider>
          </StationAdminProvider>
        </CompanyAdminProvider>
      </SuperAdminProvider>
    </AuthProvider>
  );
}

export default App;
