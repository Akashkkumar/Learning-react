import { useState } from "react";
import { Logo, Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const isDark = useSelector((state) => state.theme.isDark);

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name: "Signup",
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Post",
      slug: '/add-post',
      active: authStatus
    },

    {
      name: 'Profile',
      slug: '/profile',
      active: authStatus
    }
   
  ]

  const [isMenubarOpen, setIsMenubarOpen] = useState(false);
  const toggleMenubar = () => {
    setIsMenubarOpen(!isMenubarOpen);
  };
  return (
    <Container>
      <nav className={` sticky top-0 rounded-md ${isDark ? "bg-[#555D50] shadow-md shadow-black" : 'bg-[#212121]'}`}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                onClick={toggleMenubar}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <a className="flex flex-shrink-0 items-center" href="/">
                <Logo />
              </a>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                 

                 {
                   navItems.map((item) => 
                    item.active ? (
                      <a
                      key={item.name}
                      onClick={() => {
                        navigate(item.slug);
                      
                      }}
                      className={` text-gray-200 hover:bg-gray-100 hover:text-black rounded-md px-3 py-2 text-sm font-medium`}>
                      {item.name}
                    </a>
                    ) : null
                   
                   )
                 }
                  

                  {
                    authStatus && <LogoutBtn /> 
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`sm:hidden" id="mobile-menu ${
            isMenubarOpen ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col justify-start items-center gap-4 py-3 ">
          {
                   navItems.map((item) => 
                    item.active ? (
                      <a
                      key={item.name}
                      onClick={() => {
                        navigate(item.slug)
                        setIsMenubarOpen(!isMenubarOpen)
                      }}
                      className="text-gray-200  hover:bg-white hover:text-black rounded-md px-2 py-1 text-sm font-medium"
                    >
                      {item.name}
                    </a>
                    ) : null
                   
                   )
                 }

{
                    authStatus && <LogoutBtn /> 
                  }
          </div>
        </div>
      </nav>
    </Container>
  );
}

export default Header;
