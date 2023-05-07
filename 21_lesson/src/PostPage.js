import { useParams, Link } from "react-router-dom";
import { useContext} from 'react'
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';

const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext);
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      goBack();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>

    </main>
  )
}

export default PostPage