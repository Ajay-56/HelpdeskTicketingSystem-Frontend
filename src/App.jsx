
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./auth/AuthContext";
// import Login from "./components/Login";
// import Register from "./components/Register";

// // Admin Components
// import AdminDashboard from "./components/admin/AdminDashboard.jsx";
// import AdminTickets from "./components/admin/AdminTickets.jsx";
// import AdminUsers from "./components/admin/AdminUsers.jsx";
// import AdminReports from "./components/admin/AdminReports.jsx";
// import AdminLayout from "./components/admin/AdminLayout.jsx";

// // Agent Components
// import AgentLayout from "./components/agent/AgentLayout.jsx";
// import AgentDashboard from "./components/agent/AgentDashboard.jsx";
// import AgentAllTickets from "./components/agent/AgentAllTickets.jsx";
// import AgentMyTickets from "./components/agent/AgentMyTickets.jsx";



// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// // Protected Route wrapper component
// function ProtectedRouteWrapper({ children, requiredRole }) {
//   const { auth } = useAuth();
  
//   if (!auth) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (requiredRole && auth.role !== requiredRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           {/* Admin Routes */}
//           <Route path="/admin" element={
//             <ProtectedRouteWrapper requiredRole="ADMIN">
//               <AdminLayout />
//             </ProtectedRouteWrapper>
//           }>
//             <Route index element={<AdminDashboard />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="tickets" element={<AdminTickets />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="reports" element={<AdminReports />} />
//           </Route>
          
//           {/* Agent Routes */}
//           <Route path="/agent" element={
//             <ProtectedRouteWrapper requiredRole="AGENT">
//               <AgentLayout />
//             </ProtectedRouteWrapper>
//           }>
//             <Route index element={<AgentDashboard />} />
//             <Route path="dashboard" element={<AgentDashboard />} />
//             <Route path="all-tickets" element={<AgentAllTickets />} />
//             <Route path="my-tickets" element={<AgentMyTickets />} />
//           </Route>
          
//           {/* Employee Routes - You can add these later */}
//           {/* <Route path="/employee" element={
//             <ProtectedRouteWrapper requiredRole="EMPLOYEE">
//               <EmployeeLayout />
//             </ProtectedRouteWrapper>
//           }>
//             <Route index element={<EmployeeDashboard />} />
//             <Route path="tickets" element={<EmployeeTickets />} />
//             <Route path="create-ticket" element={<CreateTicket />} />
//           </Route> */}
          
//           {/* Default Routes */}
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/unauthorized" element={
//             <div className="container mt-5">
//               <div className="alert alert-danger text-center">
//                 <h4>Access Denied</h4>
//                 <p>You don't have permission to access this page.</p>
//                 <p>Your role might not match the required permissions.</p>
//                 <a href="/login" className="btn btn-primary">Back to Login</a>
//               </div>
//             </div>
//           } />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./components/Login";
import "./mobile-fixes.css";
import Register from "./components/Register";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import AdminTickets from "./components/admin/AdminTickets.jsx";
import AdminUsers from "./components/admin/AdminUsers.jsx";
import AdminReports from "./components/admin/AdminReports.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

// Agent Components
import AgentLayout from "./components/agent/AgentLayout.jsx";
import AgentDashboard from "./components/agent/AgentDashboard.jsx";
import AgentAllTickets from "./components/agent/AgentAllTickets.jsx";
import AgentMyTickets from "./components/agent/AgentMyTickets.jsx";

// Employee Components
import EmployeeDashboard from "./components/employee/EmployeeDashboard.jsx";
import EmployeeTickets from "./components/employee/EmployeeTickets.jsx";
import CreateTicket from "./components/employee/CreateTicket.jsx";
import TicketDetails from "./components/employee/TicketDetails.jsx";
import EmployeeLayout from "./components/employee/EmployeeLayout.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Protected Route wrapper component
function ProtectedRouteWrapper({ children, requiredRole }) {
  const { auth } = useAuth();
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRouteWrapper requiredRole="ADMIN">
              <AdminLayout />
            </ProtectedRouteWrapper>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
          
          {/* Agent Routes */}
          <Route path="/agent" element={
            <ProtectedRouteWrapper requiredRole="AGENT">
              <AgentLayout />
            </ProtectedRouteWrapper>
          }>
            <Route index element={<AgentDashboard />} />
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="all-tickets" element={<AgentAllTickets />} />
            <Route path="my-tickets" element={<AgentMyTickets />} />
          </Route>
          
          {/* Employee Routes */}
          <Route path="/employee" element={
            <ProtectedRouteWrapper requiredRole="EMPLOYEE">
              <EmployeeLayout />
            </ProtectedRouteWrapper>
          }>
            <Route index element={<EmployeeDashboard />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="tickets" element={<EmployeeTickets />} />
            <Route path="create-ticket" element={<CreateTicket />} />
            <Route path="ticket/:id" element={<TicketDetails />} />
          </Route>
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/unauthorized" element={
            <div className="container mt-5">
              <div className="alert alert-danger text-center">
                <h4>Access Denied</h4>
                <p>You don't have permission to access this page.</p>
                <p>Your role might not match the required permissions.</p>
                <a href="/login" className="btn btn-primary">Back to Login</a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
