// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SinglePost = () => {
//   const { id } = useParams(); // Obtener el ID del post desde la URL
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState(null);
//   const [comment, setComment] = useState(""); // Estado para el nuevo comentario

//   useEffect(() => {
//     // Llamada a la API para obtener los datos del post
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`/api/posts/${id}`);
//         setPost(response.data);
//       } catch (err) {
//         console.error("Error al obtener la publicación:", err);
//         setError("No se pudo cargar la publicación.");
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleLike = async () => {
//     try {
//       const response = await axios.put(`/api/posts/${id}/like`);
//       setPost(response.data);
//     } catch (err) {
//       console.error("Error al dar me gusta:", err);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await axios.put(`/api/posts/${id}/dislike`);
//       setPost(response.data);
//     } catch (err) {
//       console.error("Error al dar no me gusta:", err);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`/api/posts/${id}/comments`, {
//         content: comment,
//       });
//       setPost(response.data);
//       setComment(""); // Limpiar el campo de comentario
//     } catch (err) {
//       console.error("Error al agregar comentario:", err);
//     }
//   };

//   if (error) {
//     return (
//       <div className="container-xxl py-5">
//         <div className="text-center">
//           <h2>{error}</h2>
//         </div>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="container-xxl py-5">
//         <div className="text-center">
//           <h2>Cargando publicación...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="single-post-wrapper py-5">
//       <div className="container-xxl">
//         <div className="row">
//           <div className="col-12">
//             <div className="single-post">
//               <h1 className="post-title">{post.titulo}</h1>
//               <p className="post-author">
//                 Por: <strong>{post.autor}</strong> |{" "}
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//               <p className="post-views">Vistas: {post.numVistas}</p>
//               <div className="post-content">
//                 <p>{post.descripcion}</p>
//               </div>
//               <div className="post-interactions">
//                 <button className="button like-button" onClick={handleLike}>
//                   Me gusta ({post.likes.length})
//                 </button>
//                 <button
//                   className="button dislike-button"
//                   onClick={handleDislike}
//                 >
//                   No me gusta ({post.dislikes.length})
//                 </button>
//               </div>
//               <hr />
//               <div className="post-comments">
//                 <h3>Comentarios:</h3>
//                 <ul>
//                   {post.comments?.map((comment, index) => (
//                     <li key={index}>
//                       <p>
//                         <strong>{comment.user}:</strong> {comment.content}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//                 <form onSubmit={handleAddComment}>
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Escribe tu comentario aquí..."
//                     required
//                   ></textarea>
//                   <button type="submit" className="button">
//                     Agregar comentario
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePost;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SinglePost = () => {
  // Datos de ejemplo para simular una publicación
  const mockPost = {
    id: "1",
    titulo: "Top plantas carnívoras 2024",
    descripcion:
      "Descubre las plantas carnívoras más impresionantes para el 2024, incluyendo consejos de cuidado y mantenimiento.",
    numVistas: 150,
    isLiked: false,
    isDisliked: false,
    likes: ["Usuario1", "Usuario2"], // Nombres de ejemplo
    dislikes: [],
    autor: "Admin",
    createdAt: "2024-11-15T12:00:00Z",
    comments: [
      { user: "Usuario1", content: "¡Me encantó este artículo!" },
      { user: "Usuario2", content: "Muy interesante, gracias por compartir." },
    ],
  };

  const [post, setPost] = useState(mockPost);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    // Simular "Me gusta"
    setPost((prevPost) => ({
      ...prevPost,
      likes: prevPost.isLiked
        ? prevPost.likes.filter((user) => user !== "Tú")
        : [...prevPost.likes, "Tú"],
      dislikes: prevPost.dislikes.filter((user) => user !== "Tú"),
      isLiked: !prevPost.isLiked,
      isDisliked: false,
    }));
  };

  const handleDislike = () => {
    // Simular "No me gusta"
    setPost((prevPost) => ({
      ...prevPost,
      dislikes: prevPost.isDisliked
        ? prevPost.dislikes.filter((user) => user !== "Tú")
        : [...prevPost.dislikes, "Tú"],
      likes: prevPost.likes.filter((user) => user !== "Tú"),
      isLiked: false,
      isDisliked: !prevPost.isDisliked,
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return; // Validación simple para evitar comentarios vacíos
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, { user: "Tú", content: comment }],
    }));
    setComment("");
  };

  return (
    <div className="single-post-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="single-post-card">
              <Link to="/posts" className="d-flex align-items-center g-10">
                {" "}
                <FaArrowLeft /> Regresar a publicaciones
              </Link>
              <h1 className="post-title">{post.titulo}</h1>
              <img src="images/post1.jpg" alt="post-details-1" />
              <p className="post-author">
                Por: <strong>{post.autor}</strong> |{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="post-views">Vistas: {post.numVistas}</p>
              <div className="post-content">
                <p>{post.descripcion}</p>
              </div>
              <div className="post-interactions">
                <button className="button like-button" onClick={handleLike}>
                  Me gusta ({post.likes.length})
                </button>
                <button
                  className="button dislike-button"
                  onClick={handleDislike}
                >
                  No me gusta ({post.dislikes.length})
                </button>
              </div>
              <hr />
              <div className="post-comments">
                <h3>Comentarios:</h3>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index}>
                      <p>
                        <strong>{comment.user}:</strong> {comment.content}
                      </p>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddComment}>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    required
                  ></textarea>
                  <button type="submit" className="button">
                    Agregar comentario
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
