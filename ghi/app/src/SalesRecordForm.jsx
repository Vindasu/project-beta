import React from 'react';
import { renderMatches } from 'react-router-dom';
import './App.css';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales_people: [],
            sales_person: '',
            automobiles: [],
            automobile: '',
            customers: [],
            customer: '',
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
        delete data.sales_people;
        delete data.automobiles;
        delete data.customers;
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
                sales_people: [],
                automobiles: [],
                customers: [],
                price: '',
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

    async componentDidMount() {
        const url = 'http://localhost:8090/api/employees/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({sales_people: data.sales_people})
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({customers: data.customers})
        }
    }

    
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Sales Record</h1>
                <form onSubmit={this.handleSubmit} id="create-sale-request-form">
                <div className="mb-3">
                    <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
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
                    <select value={this.state.sales_person} onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                    <option value="">Choose a Sales Rep</option>
                    {this.state.sales_people.map(sales_person => {
                        return (
                        <option key={sales_person.id} value={sales_person.id}>
                            {sales_person.employee_number}
                        </option>
                        );
                    })}
                    </select>
                </div>
                <div className="mb-3">
                        <select value={this.state.customer} onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                        <option value="">Choose a customer</option>
                        {this.state.customers.map(customer => {
                            return (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
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