import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const {user,isAuthenticated, admin}=useUserStore()

  return (
    <> 
    {isAuthenticated?(
        <section className='heading'>
    {admin?(
        <h2>Welcome to youX Admin Dashboard</h2>
    ):(
        <h2>Welcome to youX User Dashboard</h2>
    )}
    </section>
    ):(
        <>
        <Separator/>
        <p className="mt-2">
            Not an authorized user, please {" "}
            <Link to="/login" className="text-blue-500">Login </Link>
            OR 
            <Link to="/signup" className="text-blue-500"> Signup</Link>
        </p>
        </>
    )}
    
    </>
  )
}

export default Dashboard