import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
class ViewOrders extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    axios
      .post("http://localhost:5000/users/showOrders", {
        id: decoded._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          arr: res.data,
        });
      });
  }
  render() {
    return (
      <div>
        <table className="table table-bordered m-3">
          <thead className="bg-warning">
            <tr>
              <th>
                Price<div style={{ height: 13 }}></div>
              </th>
              <th>
                Customer Name<div style={{ height: 13 }}></div>
              </th>
              <th>
                Veg/Non Veg<div style={{ height: 13 }}></div>
              </th>
              <th>
                Dish Name<div style={{ height: 13 }}></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.arr.map((user) => {
              return (
                <tr className="table-success">
                  <th>{user.age}</th>
                  <th>{user.name}</th>
                  <th>{user.gender}</th>
                  <th>{user.dishName}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewOrders;
