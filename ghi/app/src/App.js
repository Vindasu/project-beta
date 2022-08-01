import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import PotentialCustomerForm from './PotentialCustomerForm';
import SalesRecordForm from './SalesRecordForm';
import SalesList from './SalesList';
import SalesHistoryList from './SalesHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/SalesPerson" element={<SalesPersonForm />} />
          <Route path="/Potential_Customer" element={<PotentialCustomerForm />} />
          <Route path="/SalesRecord" element={<SalesRecordForm />} />
          <Route path="/Sales" element={<SalesList />} />
          <Route path="/SalesHistory" element={<SalesHistoryList />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
