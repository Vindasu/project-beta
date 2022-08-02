import React from 'react';
import './App.css';
class ServiceAppForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        vin: '',
        customer: '',
        date_time: '',
        reason: '',
        technician: '',
        technicians: [],
    };
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.technicians;

    const url = 'http://localhost:8080/api/appointments/';
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
        vin: '',
        customer: '',
        date_time: '',
        reason: '',
      };
      this.setState(cleared);
    }
  }

  handleVinChange(event) {
    const value = event.target.value;
    this.setState({vin: value})
  }

  handleCustomerChange(event) {
    const value = event.target.value;
    this.setState({customer: value})
  }
  handleDateTimeChange(event) {
    const value = event.target.value;
    this.setState({date_time: value})
  }

  handleReasonChange(event) {
    const value = event.target.value;
    this.setState({reason: value})
  }

  handleTechnicianChange(event) {
    const value = event.target.value;
    this.setState({technician: value})
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({technicians: data.technicians});
    }
  }

  render() {
    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.vin} onChange={this.handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.customer} onChange={this.handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.date_time} onChange={this.handleDateTimeChange} placeholder="Date Time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                            <label htmlFor="date_time">Date Time</label>
                        </div>
                        <div className="mb-3">
                            <select value={this.state.technician} onChange={this.handleTechnicianChange} required name="technician" id="technician" className="form-select">
                            <option value="">Choose a technician</option>
                            {this.state.technicians.map(technician => {
                                return (
                                <option key={technician.id} value={technician.employee_num}>
                                    {technician.name}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason">Reason</label>
                            <textarea value={this.state.reason} onChange={this.handleReasonChange} rows="3" name="reason" id="reason" className="form-control"></textarea>
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

export default ServiceAppForm;
