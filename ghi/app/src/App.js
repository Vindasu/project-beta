import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import PotentialCustomerForm from './PotentialCustomerForm';
import SalesRecordForm from './SalesRecordForm';
import SalesList from './SalesList';
import SalesHistoryList from './SalesHistoryList';
import './App.css';

function App() {
  return (
    <div  className="BackGround">
    <BrowserRouter>
      <Nav />
      
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salesperson/new" element={<SalesPersonForm />} />
          <Route path="/customer/new" element={<PotentialCustomerForm />} />
          <Route path="/sales/new" element={<SalesRecordForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/saleshistory" element={<SalesHistoryList />} />

        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
