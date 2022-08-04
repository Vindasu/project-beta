import React from 'react';
import './App.css';

class InventoryAutoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        color: '',
        year: '',
        vin: '',
        model_id: '',
        models: [],
    };
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.models;
    const url = 'http://localhost:8100/api/automobiles/';
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
            color: '',
            year: '',
            vin: '',
            model_id: '',
        };
        this.setState(cleared);
    }
  }

  handleColorChange(event) {
    const value = event.target.value;
    this.setState({color: value})
  }

  handleYearChange(event) {
    const value = event.target.value;
    this.setState({year: value})
  }

  handleVinChange(event) {
    const value = event.target.value;
    this.setState({vin: value})
  }

  handleModelChange(event) {
    const value = event.target.value;
    this.setState({model_id: value})
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({models: data.models});
    }
  }

  render() {
    return (
        <>
          <button
            className="btn btn-outline-light"
            onClick={(e) => {
                e.preventDefault();
                window.location.href='http://localhost:3000/inventory/autos';
            }}
            >Back to Automobiles
          </button>
          <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create Automobile</h1>
                    <form onSubmit={this.handleSubmit} id="create-automobile-form">
                    <div className="form-floating mb-3">
                        <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.year} onChange={this.handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.vin} onChange={this.handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                        <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="mb-3">
                        <select value={this.state.model_id} onChange={this.handleModelChange} required name="model" id="model" className="form-select">
                            <option value="">Choose a model</option>
                            {this.state.models.map(model => {
                                return (
                                    <option key={model.href} value={model.id}>
                                        {model.name}
                                    </option>
                                );
                            })}
                        </select>
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

export default InventoryAutoForm;
