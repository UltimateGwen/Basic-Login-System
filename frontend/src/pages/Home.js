import React, { useContext, useEffect } from "react";

import { Redirect } from "react-router-dom";

import Context from "../context";

const Home = () => {
  const { getProducts, user, token } = useContext(Context);

  return (
    
      <div className="container">
        <div className="home">
          <div className="homeTitle">
            <h2 className="ciao">Ciao {user && user.firstname},</h2>
            <h3>vuoi ordinare qualcosa?</h3>
          </div>
        </div>
      </div>
    
  );
};

export default Home;
