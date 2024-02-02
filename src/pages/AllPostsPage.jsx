import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService
      .getPosts([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((error) => {
        console.log("Appwrite :: AllPostsPage.jsx :: ERROR ", error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 max-w-[200px] m-2" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPostsPage;
