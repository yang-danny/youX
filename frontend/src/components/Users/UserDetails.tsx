import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useUserStore } from "@/store/useUserStore";
  import {SignupInputState, userSignupSchema} from  "@/schema/userSchema"
import { Input } from '../ui/input';
  const API=import.meta.env.BACKEND_API_URL
const UserDetails = () => {
    const { id } = useParams();
    const {loading,updateUserDetails}=useUserStore()
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState<SignupInputState>({
        name:'',
        email:"",
        phone:"", 
        password: "",
        role:"",
    });
    const [errors, setErrors] = useState<Partial<SignupInputState>>({});
    const getUser=async()=>{
        try {
            const response = await axios.get(`${API}/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {   
             setUser(response.data);
            }
        } catch (error:any) {
        console.log(error)
        }
    }
    const setEditValues =()=>{
        setEdit(true)
        setInput({
        name:user.name,
        email:user.email,
        phone:user.phone, 
        password: user.password,
        role:user.role, 
      })
      }
      const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
      }
      useEffect(() => {
        getUser()
    }, [])
  
    const userSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        // form validation check start
        const result = userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;
        }
        // Update api implementation start here
        console.log('====================================');
        console.log(input);
        console.log('====================================');
        try {
          await updateUserDetails(id!,input);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className="mb-4 mt-4">
    <div className="mb-4 mt-4">
    <h1 className="font-bold text-2xl">User Details:</h1>
    {edit ? (
      <form onSubmit={userSubmitHandler} className="md:p-8 w-full  rounded-lg border border-gray-200 my-4">
      <div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-5 ">

          <div className="mb-4">
           <div className="relative">
            <Label htmlFor="name">Name*</Label>
            <Input
            type="text"
            placeholder="Please enter name"
            name="name"
            id="name"
            value={input.name}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
            { errors && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
          </div>
          <div className="mb-4">
           <div className="relative">
            <Label htmlFor="email">Email*</Label>
            <Input
            type="email"
            placeholder="Please enter email"
            name="email"
            id="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
            { errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
          </div>
          <div className="mb-4">
           <div className="relative">
            <Label htmlFor="phone">Phone*</Label>
            <Input
            type="text"
            placeholder="Please enter phone"
            name="phone"
            id="phone"
            value={input.phone}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
            { errors && <span className="text-xs text-red-500">{errors.phone}</span>}
          </div>
          </div>
          <div className="mb-4">
           <div className="relative">
            <Label htmlFor="password">Password*</Label>
            <Input
            type="password"
            placeholder="Please enter password"
            name="password"
            id="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
            { errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
          </div>

          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="type">Role</Label>
            <Select 
                 onValueChange={value=>setInput({...input, role:value})}
                 defaultValue={input.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                     "Admin" , "User"
                    ].map((user: string, index: number) => (
                      <SelectItem key={index} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
            </Select>
          { errors && <span className="text-xs text-red-500">{errors.role}</span>}
            </div>
          </div>
      </div>
      <div className="mb-4 space-x-4">
          <div className=" space-x-4 flex justify-center">
          <Button type="submit" className=" bg-black text-white hover:bg-hoverOrange">
            Update User
          </Button>
          <Button onClick={()=>setEdit(false)} className=" bg-black text-white hover:bg-hoverOrange">
            Cancel
          </Button>
          </div>
      </div>
      </div>
      </form>
    ):(
        <>
          <div className="grid rounded-lg my-4 px-4 py-4 grid-cols-1 gap-4 md:grid-cols-4 bg-slate-200" >
          <div className="mb-4">
            <div className="relative">
            <Label className="font-bold ">Application Name: </Label>
            <Label htmlFor="name">{user?.name}</Label>
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label className="font-bold ">Email: </Label>
            <Label htmlFor="name">{user?.email}</Label>
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Label className="font-bold ">Phone: </Label>
              <Label htmlFor="name">{user?.phone}</Label>
          </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Label className="font-bold ">Role: </Label>
              <Label htmlFor="name">{user?.role}</Label>
            </div>
          </div>
         </div>
         <div className="mb-10 flex justify-center">
           <Button className=" bg-black text-white "
             onClick={setEditValues}>
               Edit
           </Button>
         </div>
         </>
    )}
    </div>
    </div>
  )
}

export default UserDetails