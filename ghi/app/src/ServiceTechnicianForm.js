import React from 'react';
import './App.css';

class ServiceTechnicianForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        name: '',
        employee_num: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmployeeNumChange = this.handleEmployeeNumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const url = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const cleared = {
            name: '',
            employee_num: '',
        };
        this.setState(cleared);
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value})
  }

  handleEmployeeNumChange(event) {
    const value = event.target.value;
    this.setState({employee_num: value})
  }


  render() {
    return (
        <>
          <button
            className="btn btn-outline-light"
            onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/services';
            }}
            >Back to Services Home
          </button>
          <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Enter Technician</h1>
                    <form onSubmit={this.handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.employee_num} onChange={this.handleEmployeeNumChange} placeholder="Employee Num" required type="number" name="employee_num" id="employee_num" className="form-control" />
                        <label htmlFor="employee_num">Employee Number</label>
                    </div>
                    <button className="btn btn-outline-success">Create</button>
                    </form>
                </div>
              </div>
          </div>
        </>
    );
  }
}

export default ServiceTechnicianForm;
