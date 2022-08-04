import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import EmployeeForm from './EmployeeForm';
import CustomerForm from './CustomerForm';
// import SalesRecordForm from './SalesRecordForm';
import SaleForm from './SaleForm';
import SalesList from './SalesList';
import SalesHistoryList from './SalesHistoryList';
import ServiceHistoryList from './ServiceHistoryList';

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

import Rolled from './Rolled';
import Trolled from './Trolled';

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
          <Route path="/employee/new" element={<EmployeeForm />} />
          <Route path="/customer/new" element={<CustomerForm />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/saleshistory" element={<SalesHistoryList />} />
          <Route path="services" element={<ServiceAppList />} />
          <Route path="/services/technicians" element={<ServiceTechnicianForm />} />
          <Route path="services/new" element={<ServiceAppForm />} />
          <Route path="services/history" element={<ServiceHistoryList />} />
          <Route path="/rolled" element={<Rolled/>} />
          <Route path="/rolled/trolled" element={<Trolled/>} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
