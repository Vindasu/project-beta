// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import PotentialCustomerForm from './PotentialCustomerForm';
import SalesRecordForm from './SalesRecordForm';
import SalesList from './SalesList';
import SalesHistoryList from './SalesHistoryList';
import ServiceTechnicianForm from './ServiceTechnicianForm';

function App() {
  return (
    <div  className="BackGround">
    <BrowserRouter>
      <Nav />
      
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Sales */}
          <Route path="/salesperson/new" element={<SalesPersonForm />} />
          <Route path="/customer/new" element={<PotentialCustomerForm />} />
          <Route path="/sales/new" element={<SalesRecordForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/saleshistory" element={<SalesHistoryList />} />
          {/* Services */}
          <Route path="services" element={<ServiceTechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
