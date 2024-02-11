import React from "react";

function Card({ data }) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noreferrer"

      className="text-decoration-none col-md-3 col-lg-2 col-sm-6 col-12 card cardHover text-dark  shadow border-0"
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
        <div className="card-image d-flex justify-content-center mb-2">
          <img src={data.image} className="w-100" alt={data.name} />
        </div>
        <div>{data.trust_score_rank}</div>
        <div className="text-dark fs10">{data.name}</div>
      </div>
    </a>
  );
}

export default Card;
