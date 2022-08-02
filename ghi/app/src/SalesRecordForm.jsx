import React from 'react';
import { renderMatches } from 'react-router-dom';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            automobiles: [],
            customers: [],
            price: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const url = 'http://localhost:8090/api/sales_rest/'
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

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }
    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({sales_person: value})
    }
    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }
    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({automobiles: data.automobiles})
        }
    }

    // async componentDidMount() {
    //     const url = 'http://localhost:8090/api/employees/';
    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({employees: data.employees})
    //     }
    // }

    // async componentDidMount() {
    //     const url = 'http://localhost:8090/api/customers/';
    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({customers: data.customers})
    //     }
    // }

    
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Sales Record</h1>
                <form onSubmit={this.handleSubmit} id="create-sale-request-form">
                <div className="mb-3">
                    <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="vin" className="form-select">
                    <option value="">Choose an automobile</option>
                    {this.state.automobiles.map(automobile => {
                        return (
                        <option key={automobile.id} value={automobile.href}>
                            {automobile.vin}
                        </option>
                        );
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={this.state.sales_person} onChange={this.handleSalesPersonChange} required name="employees" id="employee_number" className="form-select">
                    <option value="">Choose a Sales Rep</option>
                    {this.state.employees.map(employee => {
                        return (
                        <option key={employee.id} value={employee.href}>
                            {employee.employee_number}
                        </option>
                        );
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={this.state.customer} onChange={this.handleCustomerChange} required name="customer" id="id" className="form-select">
                    <option value="">Choose a customer</option>
                    {this.state.customers.map(customer => {
                        return (
                        <option key={customer.id} value={customer.href}>
                            {customer.id}
                        </option>
                        );
                    })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={this.state.price} onChange={this.handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
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