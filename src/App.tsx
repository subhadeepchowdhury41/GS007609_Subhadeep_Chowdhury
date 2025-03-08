import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="/store" element={<Stores />} />
              <Route path="/sku" element={<SKUs />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/charts" element={<Charts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
