import React, { Component } from "react";
import axios from "axios";

class AddReservation extends Component {
  constructor(props) {
    super(props);

    this.changeCustomerName = this.changeCustomerName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customerName: "",
      age: 0,
      gender: "",
      date: new Date().toLocaleString(),
      id: props.location.state.userId,
    };
  }

  changeCustomerName(e) {
    this.setState({
      customerName: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeDate(e) {
    console.log(e.target.value.toLocaleString());
    this.setState({
      date: e.target.value.toLocaleString(),
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const resv = {
      userid: this.state.id,
      customerName: this.state.customerName,
      age: this.state.age,
      gender: this.state.gender,
      date: this.state.date,
    };

    console.log(resv);

    axios
      .post(`http://localhost:5000/users/profile/${this.state.id}/add`, resv)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/profile";
  }
  render() {
    return (
      <div>
        <h1 className="mt-5 text-center">Add Food Item</h1>
        <form onSubmit={this.onSubmit} className="mt-5">
          <div className="form-group">
            <label>Dish Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.customerName}
              onChange={this.changeCustomerName}
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>

          <div className="form-group">
            <label>Veg/Non Veg: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}
            />
          </div>
          <div>
            <label>Addition Date: </label>
            <input
              type="date"
              className="form-control"
              onChange={this.onChangeDate}
            ></input>
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary mt-3" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddReservation;
