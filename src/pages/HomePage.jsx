import { useEffect, useState } from "react";
import databaseService from "../appwrite/database_service";
import { Container, PostCard } from "../components";
import loginImage from "../assets/loginImage.jpg"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import loginImage2 from '../assets/loginImage2.gif'

function HomePage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status);
  const isDark = useSelector(state => state.theme.isDark)

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((error) =>
        console.log("Appwrite :: HomePage.jsx :: ERROR ", error)
      );
  }, []);

  if(!authStatus){
    return(
      <div className=" min-h-[70vh] py-10">

      <h1 className="font-bold text-3xl text-center mb-5">Login to see posts</h1>

      <div className="flex justify-center gap-12 items-center flex-wrap p-4">
          <div className="h-[300px] w-[300px] ">
              <img
              className="object-contain" 
              src={isDark ? loginImage2 :loginImage} alt="loginImage" />
          </div>
          <div className="flex flex-col gap-5 w-56 ">
              <button
              onClick={() => navigate('/login')}
              className="rounded-md  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Login</button>
              <button 
               onClick={() => navigate('/signup')}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Signup</button>
          </div>
      </div>



   </div>
    )
  }

  if (posts.length === 0) {
    return (
     <div className={`  min-h-[70vh] py-10`}>

        <h1 className="font-bold text-3xl text-center mb-5">Empty posts</h1>

     </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 max-w-[200px] m-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
