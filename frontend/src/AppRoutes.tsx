import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "./layout/layout";
import HomePage from './pages/HomePage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './pages/Dashboard';
const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout ><HomePage /> </Layout>}/>
            <Route path="dashboard" element={ <Layout ><Dashboard /></Layout>}/>
            <Route path="user" element={<span>User Page</span>}/>
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
            
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    )
}
export default AppRoutes;