import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import SalesPersonForm from './SalesPersonForm';
import PotentialCustomerForm from './PotentialCustomerForm';
import SalesRecordForm from './SalesRecordForm';
import SalesList from './SalesList';
import SalesHistoryList from './SalesHistoryList';

import ServiceAppList from './ServiceAppList';
import ServiceTechnicianForm from './ServiceTechnicianForm';
import ServiceAppForm from './ServiceAppForm';

import InventoryPage from './InventoryPage';
import InventoryMfgList from './InventoryMfgList';
import InventoryMfgForm from './InventoryMfgForm';
import InventoryModelList from './InventoryModelList';
import InventoryModelForm from './InventoryModelForm';
import InventoryAutoList from './InventoryAutoList';
import InventoryAutoForm from './InventoryAutoForm';

function App() {
  return (
    <div  className="BackGround">
    <BrowserRouter>
      <Nav />
      
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/manufacturers" element={<InventoryMfgList />} />
          <Route path="inventory/manufacturers/new" element={<InventoryMfgForm />} />
          <Route path="inventory/models" element={<InventoryModelList />} />
          <Route path="inventory/models/new" element={<InventoryModelForm />} />
          <Route path="inventory/autos" element={<InventoryAutoList />} />
          <Route path="inventory/autos/new" element={<InventoryAutoForm />} />

          <Route path="/salesperson/new" element={<SalesPersonForm />} />
          <Route path="/customer/new" element={<PotentialCustomerForm />} />
          <Route path="/sales/new" element={<SalesRecordForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/saleshistory" element={<SalesHistoryList />} />

          <Route path="services" element={<ServiceAppList />} />
          <Route path="/services/technicians" element={<ServiceTechnicianForm />} />
          <Route path="services/new" element={<ServiceAppForm />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
