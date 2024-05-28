import React from "react";
import "./StateSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StatesSearch = () => {
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
            />
          </div>
        </div>
        <div className="col-12 bottom_state">
          <div className="row states">
            <div className="col-6 col-md-3 state state-1">
              <h4>Oyo</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae.
              </p>
            </div>
            <div className="col-6 col-md-3 state state-2">
              <h4>Kwara</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae.
              </p>
            </div>
            <div className="col-6 col-md-3 state state-3">
              <span>
                <h4>Ogun</h4>
              </span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae.
              </p>
            </div>
            <div className="col-6 col-md-3 state state-4">
              <h4>Rivers</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae.
              </p>
            </div>
            <div className="col-6 col-md-3 state state-5">
              <h4>Kano</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                molestiae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatesSearch;
