import React from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ChequeUpload from './pages/ChequeUpload';
import LocalTransfer from './pages/LocalTransfer';
import InternationalTransfer from './pages/InternationalTransfer';
import Cards from './pages/Cards';
import LoanRequest from './pages/LoanRequest';
import MyLoans from './pages/MyLoans';
import HistoryPage from './pages/HistoryPage';
import MyAccountPage from './pages/MyAccountPage';
import KycVerificationPage from './pages/KycVerificationPage';
import NextOfKinForm from './pages/NextOfKinForm';
import ManagePassword from './pages/ManagePassword';
import ManagePin from './pages/ManagePin';
import ActivitiesPage from './pages/ActivitiesPage';
import NewTicket from './pages/NewTicket';
import TicketHistory from './pages/TicketHistory';
import Helpdesk from './pages/Helpdesk';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRoute from './Components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="RegisterPage" element={<RegisterPage />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/ChequeDeposit' element={<ChequeUpload />} />
        <Route path='/LocalTransfer' element={<LocalTransfer />} />
        <Route path='/InternationalTransfer' element={<InternationalTransfer />} />
        <Route path='/Cards' element={<Cards />} />
        <Route path='/LoanRequest' element={<LoanRequest />} />
        <Route path='/Myloans' element={<MyLoans />} />
        <Route path='/HistoryPage' element={<HistoryPage />} />
        <Route path='/MyAccountPage' element={<MyAccountPage />} />
        <Route path='/KycVerificationPage' element={<KycVerificationPage />} />
        <Route path='/NextOfKinForm' element={<NextOfKinForm />} />
        <Route path='/ManagePassword' element={<ManagePassword />} />
        <Route path='/ManagePin' element={<ManagePin />} />
        <Route path='/ActivitiesPage' element={<ActivitiesPage />} />
        <Route path='/NewTicket' element={<NewTicket />} />
        <Route path='/TicketHistory' element={<TicketHistory />} />
        <Route path='/Helpdesk' element={<Helpdesk />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
    </>
  )
}


export default App