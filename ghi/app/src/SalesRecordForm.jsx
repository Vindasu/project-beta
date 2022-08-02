import React from 'react';
import { renderMatches } from 'react-router-dom';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_people: [],
            automobiles: [],
            customers: [],
            price: '',
        };
        this.handAutomobileChange = this.handAutomobileChange.bind(this);
        this.handleSalesPeopleChange = this.handleSalesPeopleChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const url = 'http://localhost:8090/api/sales/'
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
                address: '',
                phone_number: '',
            };
            this.setState(cleared);
        }
    }

    handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({bins: data.bins})
        }
    }

    
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a New Customer</h1>
                <form onSubmit={this.handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="Name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={this.state.phone_number} onChange={this.handlePhoneNumberChange} placeholder="Phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
        );
    }
}

export default SalesRecordForm;