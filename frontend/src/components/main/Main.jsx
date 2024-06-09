import React, {useState, useEffect} from "react";
import { defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import "./Main.css";
import { ChartData } from "./Chartdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import  Axios  from "axios";
import { userInfo } from "../../atoms/User.jsx";
import { useRecoilValue } from "recoil";



defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Main = () => {
  let user = useRecoilValue(userInfo);

  const [prods, setProduct] = useState();
  const [admins, setAdmins] = useState();
  const [users, setUsers] = useState();


  
  useEffect(() => {

    Axios.get("http://localhost:8000/Products")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));



    Axios.get("http://localhost:8000/Admin")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => console.error(error));

    Axios.get("http://localhost:8000/Users")
      .then((response) => {
        setUsers(response.data);
        })
        .catch((error) => console.error(error));
  }, []);

  // console.log(user.data)


  return (
    <main className="col-md-9 ms-sm-auto bg-light col-lg-10 px-md-4">
      <div className="d-flex justify-content-even align-items-center flex-wrap flex-md-nowrap gap-5 align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className=" mb-2 mb-md-0">
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon d-icon"></span>
          </button>
        </div>
        <h1 className="h2">Dashboard</h1>
      </div>
      <section className="container container__data">
        { user.data.role === "admin" &&
            <div className="row">
              <div className="cards">
                <div className="card">
                  <div className="card-body">
                    <span>
                      <FontAwesomeIcon className="dash-icon me-2" icon={faUser} />
                    </span>
                    <span className="title">
                      <h2>{admins && admins.length}</h2>
                      <p>No. of Admin</p>
                    </span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <span>
                      <FontAwesomeIcon
                        className="dash-icon me-2"
                        icon={faProductHunt}
                      />
                    </span>
                    <span className="title">
                      <h2>{prods && prods.length}</h2>
                      <p>No. of Agro Products</p>
                    </span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <span>
                      <FontAwesomeIcon
                        className="dash-icon me-2"
                        icon={faUserGroup}
                      />
                    </span>
                    <span className="title">
                      <h2>{users && users.length}</h2>
                      <p>No. of Users</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        }

        <div className="row mt-2 app">
          <div className="col-12 chart">
            <Line
              data={{
                labels: ChartData.map((item) => item.states),
                datasets: [
                  {
                    label: "Agro Products",
                    data: ChartData.map((item) => item.quantity),
                    backgroundColor: "#00800bcc",
                    borderColor: "#00800bcc",
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                },
                plugins: {
                  title: {
                    text: "Quantity of Products in States",
                  },
                },
              }}
            />
          </div>
          <div className="col-12 chart">
            <Bar
              data={{
                labels: ChartData.map((item) => item.states),
                datasets: [
                  {
                    label: "Agro Products",
                    data: ChartData.map((item) => item.quantity),
                    backgroundColor: [
                      "rgba(0, 128, 11, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
