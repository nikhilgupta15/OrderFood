import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { decode } from "jsonwebtoken";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      resv: [],
      first_name: "",
      id: "",
      role: "",
      arr: [],
      errors: {},
    };

    this.deleteResv = this.deleteResv.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded._id,
      first_name: decoded.first_name,
      role: decoded.role,
    });

    axios
      .get("http://localhost:5000/users/profile?id=" + decoded._id)
      .then((res) => {
        this.setState({
          resv: res.data,
        });
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:5000/users/showOrdersforCustomers", {
        id: decoded._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          arr: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteResv(id) {
    axios
      .delete("http://localhost:5000/users/profile/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({
      resv: this.state.resv.filter((el) => el.id === this.state.id),
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="text-center mt-5 mb-2 text-dark">
            Welcome {this.state.first_name} !
          </h1>
        </div>
        <div className="col-sm-8 mx-auto">
          {this.state.role == "Restaurant" ? (
            <div>
              {" "}
              <div className="text-center">
                <button type="button" className="btn btn-danger m-3">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/profile/add",
                      state: { userId: this.state.id },
                    }}
                  >
                    Add Menu
                  </Link>
                </button>
                <button type="button" className="btn btn-danger m-3">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/profile/view",
                      state: { userId: this.state.id },
                    }}
                  >
                    View Orders
                  </Link>
                </button>
              </div>
              <table className="table table-bordered m-3">
                <thead className="bg-warning">
                  <tr>
                    <th>
                      Dish Name<div style={{ height: 13 }}></div>
                    </th>
                    <th>
                      Price<div style={{ height: 13 }}></div>
                    </th>
                    <th>
                      Veg/Non Veg<div style={{ height: 13 }}></div>
                    </th>
                    <th>
                      Addition Date
                      <div style={{ fontSize: 12, height: 13 }}>
                        (YYYY-MM-DD)
                      </div>
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.resv.map((resv) => {
                    return (
                      <tr className="table-success">
                        <th>{resv.customerName}</th>
                        <th>{resv.age}</th>
                        <th>{resv.gender}</th>
                        <th>{resv.date}</th>
                        <th>
                          <a
                            href="/profile"
                            onClick={() => this.deleteResv(resv._id)}
                          >
                            Delete
                          </a>
                        </th>
                        <th>
                          <button type="button" className="btn btn-info">
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to={{
                                pathname: "/profile/edit",
                                state: { userId: resv._id },
                              }}
                            >
                              Edit
                            </Link>
                          </button>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <table className="table table-bordered m-3">
              <thead className="bg-warning">
                <tr>
                  <th>
                    Dish Name<div style={{ height: 13 }}></div>
                  </th>
                  <th>
                    Price<div style={{ height: 13 }}></div>
                  </th>
                  <th>
                    Veg/Non Veg<div style={{ height: 13 }}></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.arr.map((user) => {
                  return (
                    <tr className="table-success">
                      <th>{user.dishName}</th>
                      <th>{user.age}</th>
                      <th>{user.gender}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
