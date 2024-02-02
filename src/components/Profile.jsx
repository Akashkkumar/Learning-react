import { useEffect, useState } from "react";
import authService from "../appwrite/auth_service";
import { Logo } from "./index";
import { useSelector } from "react-redux";



function Profile() {
  const [user, setUser] = useState("");
  const isDark = useSelector((state) => state.theme.isDark);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) setUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  

  const dateString = user.$createdAt;
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <>
      <div className={`${isDark ? 'bg-slate-700' : null} relative rounded-bl-lg rounded-br-full`}>
        <div className={`  max-w-2xl shadow overflow-hidden sm:rounded-lg`}>
          <div className="px-4 py-5 sm:px-6">
            <Logo />
            <h3 className={`text-lg leading-6 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Profile
            </h3>
            <p className={`mt-1 max-w-2xl text-sm ${isDark ? 'text-white' : 'text-gray-500'} `}>
              Details and informations about user.
            </p>
          </div>
          <div className={`${isDark ? null : 'bg-gray-50 text-gray-500'} border-t border-gray-200`}>
            <dl>
              <div className={` px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium ">Full name</dt>
                <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>

              <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">
                  Email address
                </dt>
                <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium ">
                  Account created on
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  {formattedDate}
                </dd>
              </div>

              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium">Status</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 ">
                  {user.status ? "Active" : "Inactive"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default Profile;
