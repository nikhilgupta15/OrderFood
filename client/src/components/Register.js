import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeSelect(e) {
    this.setState({
      role: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };

    register(newUser).then((res) => {
      this.props.history.push(`/login`);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3 mx-auto">
            <div className="form-group">
              <h1 className="mt-2 font-weight-large text-center">Register</h1>
              <label htmlFor="role">Select Your Role</label>
              <br></br>
              <select
                className="custom-select custom-select-m w-50"
                name="role"
                onChange={this.onChangeSelect}
              >
                <option>Select Role</option>
                <option>Restaurant</option>
                <option>Customer</option>
              </select>
            </div>
            {this.state.role === "Customer" ? (
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Enter your name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Preference</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Enter your preference(Veg/Non Veg)"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Register!
                </button>
              </form>
            ) : this.state.role === "Restaurant" ? (
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Restaurant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Enter your restaurant name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Register!
                </button>
              </form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
