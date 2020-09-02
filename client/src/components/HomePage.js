import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      resv: [],
      user: [],
      role: "",
      loggedIn: false,
      clickID: [],
    };
    this.orderClick = this.orderClick.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({
        loggedIn: true,
        role: decoded.role,
      });
    }
    axios.get("http://localhost:5000/users/").then((res) => {
      this.setState({
        resv: res.data.resv,
        user: res.data.user,
      });
    });
  }

  orderClick(id, ID) {
    console.log(id);
    if (localStorage.getItem("usertoken") === null) {
      window.location = "/login";
      this.setState({
        visible: false,
      });
    } else {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        role: decoded.role,
      });
      axios.post("http://localhost:5000/users/viewOrders", {
        ID: ID,
        id: id,
        Name: decoded.first_name,
        new_id: decoded._id,
      });
      let a = this.state.clickID.slice();
      a.push(id);
      this.setState({
        clickID: a,
      });
      console.log(this.state.clickID);
      //window.location = "/";
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center m-5">Pick Your Food!</h1>
            <table className="table m-3">
              <thead className="bg-warning">
                <tr>
                  <th>
                    Restaurant Name<div style={{ height: 13 }}></div>
                  </th>
                  <th>
                    Dish Name<div style={{ height: 13 }}></div>
                  </th>
                  <th>
                    Price<div style={{ height: 13 }}></div>
                  </th>
                  <th>
                    Veg/Non Veg<div style={{ height: 13 }}></div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.resv.map((resv) => {
                  if (resv.customerName && resv.gender && resv.age) {
                    var userName = "";
                    this.state.user.map((user) => {
                      if (resv.id == user._id) {
                        userName = user.first_name;
                      }
                    });
                    return (
                      <tr className="table-success">
                        <th>{userName}</th>
                        <th>{resv.customerName}</th>
                        <th>{resv.age}</th>
                        <th>{resv.gender}</th>
                        {this.state.loggedIn === false ? (
                          <th>
                            <button
                              type="button"
                              onClick={() => this.orderClick(resv._id, resv.id)}
                              className="btn btn-danger"
                            >
                              Order
                            </button>
                          </th>
                        ) : this.state.role == "Customer" ? (
                          <th>
                            <button
                              type="button"
                              onClick={() => this.orderClick(resv._id, resv.id)}
                              className="btn btn-danger"
                            >
                              Order
                            </button>
                          </th>
                        ) : (
                          <div></div>
                        )}
                        {this.state.clickID.map((id) => {
                          if (id == resv._id) {
                            return (
                              <th>
                                <img
                                  src="https://cms-assets.tutsplus.com/uploads/users/523/posts/32694/preview_image/tutorial-preview-small.png"
                                  style={{ height: 35, width: 50 }}
                                ></img>
                              </th>
                            );
                          }
                        })}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
