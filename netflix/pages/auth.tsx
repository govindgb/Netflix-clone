import React, { useCallback, useState } from "react";
import Input from "@/components/Input";

const Auth = () => {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [variant, setVariant] = useState('login');

const toggleVariant = useCallback(() => {
  setVariant((currentVariant) => 
    currentVariant === 'login' ? 'register' : 'login'
  );
  
}, []);
  return (
    <div className="relative h-full w-full bg-[url('/images/Netflix-background.webp')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/netflix-logo.jpg" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 self-center px-16 py-16 lg:w-2/5  lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">{variant === "login" ? "Sign in" : "Resgister"}</h2>
            <div className="flex flex-col gap-4">
             {variant == "register" &&  (<Input 
                 value = {name} 
                 id = "name" 
                 label = "Username" 
                 onChange={(e:any)=> setName(e.target.value)} 
              />)}
              <Input 
                 type="email" 
                 value = {email} 
                 id = "email" 
                 label = "Email" 
                 onChange={(e:any)=> setEmail(e.target.value)} 
              />
               <Input 
                 type="password" 
                 value = {password} 
                 id = "password" 
                 label = "Password" 
                 onChange={(e:any)=> setPassword(e.target.value)} 
              />
            </div>
            <div>
              <button  className="bg-red-600 py-3 text-white hover:bg-red-700 w-full rounded-md mt-10 transition">
                 {variant === "login" ? "Login" : "Sign Up" }
              </button>
              <p className="text-neutral-500 mt-12">
               { variant === "login" ? "first time using netflix" : "Allready have an account" } <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer"> {variant === "login" ? "Create an Account" : "Login"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
