import React from 'react';
import './App.css';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phone_number: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const url = 'http://localhost:8090/api/customers/'
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

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({address: value})
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({phone_number: value})
    }
    
    // async componentDidMount() {
    //     const url = 'http://localhost:8100/api/automobiles/';
    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState(data)
    //     }
    // }

    
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
                    <input value={this.state.phone_number} onChange={this.handlePhoneNumberChange} placeholder="Phone_number" required type="number" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                </div>
                <button className="btn btn-outline-success">Create</button>
                </form>
            </div>
            </div>
        </div>

        );
    }
}

export default CustomerForm;