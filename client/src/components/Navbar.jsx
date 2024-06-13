import React from 'react'
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'




const Navbar = () => {
  const [cookies,setCookie]=useCookies(["access_token"]);
  const navigate =useNavigate();

  const logout=(e)=>{
    e.preventDefault();
    setCookie("access_token","");
   
    

    navigate("/auth");

  }

  return (
    <div className='flex flex-col md:flex-row justify-between items-center bg-black p-4 text-white p-1'>
      <div className="flex justify-center md:justify-start">
      <Link to="/">
      <div className='flex flex-row items-center'>
  <span>స్వయం రుంచి</span>
  <img className='w-[60px] h-[80px]' src="https://mir-s3-cdn-cf.behance.net/projects/404/978ae455213803.Y3JvcCwxMjk3LDEwMTUsMCw0OTM.png" alt="Swayam runchi" />
  </div>
</Link>
      </div>
      <div className="flex justify-center flex-col space-x-2 md:flex md:flex-row justify-between md:space-x-4">

        <Link to="/create">Create Recipe</Link>
        
        {console.log(cookies.access_token)}
        {!cookies.access_token ? (
  <Link to="/auth">Login/Register</Link>
) : (
  <>
    <Link to="/saved">Saved Recipes</Link>
    <button onClick={logout} className='bg-white text-black'>LogOut</button>
  </>
)}


        
      </div>
    </div>
  )
}

export default Navbar;

