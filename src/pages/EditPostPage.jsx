import { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const {slug} = useParams();

  useEffect(() => {
    databaseService
      .getPost(slug)
      .then((post) => {
        if (post) setPost(post);
        else navigate("/");
      })
      .catch((error) =>
        console.log("Appwrite :: EditPostPage.jsx :: ERROR ", error)
      );
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPostPage;
