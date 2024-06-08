/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import "./StateSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Paginations from "../pagination/Paginations" 
import  Axios from "axios";

const StatesSearch = () => {
  const [searchState, setSearchState] = useState("");
  const [states, setStates] = useState ("")
  // pagination feature 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(8);


  useEffect(() => {
    Axios.get("http://localhost:8000/States")
      .then((response) => {
        console.log(response.data);
        setStates(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPost = states && states.slice(firstPostIndex, lastPostIndex)
  

  return (
    <section className="container container__states" id="states">
      <div className="row">
        <div className="col-12 top_state">
          <h3 className="title">Major agricultural states in Nigeria</h3>
          <div className="state_search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              className="state_input"
              placeholder="Search for States..."
              onChange={(e)=> setSearchState(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 bottom_state">
          <div className="row states">

            {currentPost &&
              currentPost.filter((item) => {
                return searchState.toLowerCase() === "" ? item : item.location.toLowerCase().includes(searchState.toLowerCase());
              }).map((item, key) => {
                return (
                    <div className={"col-6 col-md-3 state "+item.image} key={key}>
                      <h4>{item.location}</h4>
                      <p>
                        {item.description}
                      </p>
                    </div>
                );
              })
            }
          
          </div>
          
          <div className="row">
            <Paginations  
              totalPosts = {states && states.length} 
              postsPerPage = {postsPerPage}
              setCurrentPage= {setCurrentPage}
              currentPage={currentPage}
              
              />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatesSearch;
