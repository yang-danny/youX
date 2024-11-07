import {Navigate, Route, Routes} from 'react-router-dom'
const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<span>Home Page</span>}/>
            <Route path="user" element={<span>User Page</span>}/>
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    )
}
export default AppRoutes;