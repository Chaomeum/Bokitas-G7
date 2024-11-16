import React from "react";
import { Link } from "react-router-dom";

const PostCard = () => {
  return (
    <div className="col-3">
      <div className="post-card">
        <div className="card-image">
          <img src="images/post1.jpg" className="img-fluid" alt="post" />
        </div>
        <div className="post-content">
          <p className="date">15 Nov 2024</p>
          <h5 className="title">Top plantas carnivoras 2024</h5>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus atque officiis nulla quae cum nihil eum aliquam.
            Quaerat aspernatur, deleniti eum consequatur accusamus similique
            odio sint, labore excepturi tenetur qui.
          </p>
          <Link to="/" className="button">
            Leer Mas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
