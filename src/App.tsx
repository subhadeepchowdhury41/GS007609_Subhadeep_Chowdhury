import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import NotFound from "./pages/NotFound";
import "./App.css";
import Dashboard from "./components/layouts/Dashboard";
import Charts from "./pages/Charts";
import Planning from "./pages/Plannning";
import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";
import { Login } from "./pages/Login";
import { useAuth } from "./hooks/useAuth";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App() {
  const auth = useAuth();
  const isAuthenticated = !!auth?.user;
  console.log(isAuthenticated);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            >
              <Route
                index
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard/store" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="store" element={<Stores />} />
              <Route path="sku" element={<SKUs />} />
              <Route path="planning" element={<Planning />} />
              <Route path="charts" element={<Charts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
