import React from 'react';
import './App.css';

class InventoryMfgForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        name: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const url = 'http://localhost:8100/api/manufacturers/';
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
        };
        this.setState(cleared);
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value})
  }

  render() {
    return (
        <>
          <button
            className="btn btn-outline-light"
            onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/inventory/manufacturers';
            }}
            >Back to Manufacturers
          </button>
          <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Manufacturer</h1>
                    <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                    <div className="form-floating mb-3">
                        <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
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

export default InventoryMfgForm;
