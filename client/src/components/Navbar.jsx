import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    setCookie("access_token", "");
    navigate("/auth");
  }

  return (
    <nav className='flex flex-col md:flex-row justify-between items-center bg-black text-white p-4'>
      <div className="flex justify-center md:justify-start items-center">
        <Link to="/">
          <div className='flex flex-row items-center'>
            <span>స్వయం రుంచి</span>
            <img
              className='w-[60px] h-[80px] ml-2'
              src="https://mir-s3-cdn-cf.behance.net/projects/404/978ae455213803.Y3JvcCwxMjk3LDEwMTUsMCw0OTM.png"
              alt="Swayam runchi"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
        <Link to="/create" className='mb-2 md:mb-0'>Create Recipe</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <>
            <Link to="/saved">Saved Recipes</Link>
            <button
              onClick={logout}
              className='bg-white text-black py-1 px-2 rounded-md'
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
