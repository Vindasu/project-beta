import React from 'react';

import './App.css';

class SaleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            employee: '',
            automobiles: [],
            automobile: '',
            customers: [],
            customer: '',
            price: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data)
        delete data.employees;
        delete data.automobiles;
        delete data.customers;
        const url = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            const cleared = {
                employee: '',
                automobile: '',
                customer: '',
                price: '',
            };
            this.setState(cleared);
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }
    handleEmployeeChange(event) {
        const value = event.target.value;
        this.setState({employee: value})
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
        const customerUrl = 'http://localhost:8090/api/customers/';
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const employeeUrl = 'http://localhost:8090/api/employees/';

        const customerResponse = await fetch(customerUrl);
        const automobileResponse = await fetch(automobileUrl);
        const employeeResponse = await fetch(employeeUrl);

        if (customerResponse.ok && automobileResponse.ok && employeeResponse.ok) {
            const customerdata = await customerResponse.json();
            const automobiledata = await automobileResponse.json();
            const employeedata = await employeeResponse.json();
            
            this.setState({
                customers: customerdata.customers, 
                automobiles: automobiledata.autos,
                employees: employeedata.employees
            })

        }
    }

    
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Sales Record</h1>
                <form onSubmit={this.handleSubmit} id="create-sale-record-form">
                <div className="mb-3">
                    <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                    <option value="">Choose an automobile</option>
                    {this.state.automobiles.map(automobile => {
                        return (
                        <option key={automobile.href} value={automobile.href}>
                            {automobile.vin}
                        </option>
                        );
                    })}
                    </select> 
                </div>
                <div className="mb-3">
                    <select value={this.state.employee} onChange={this.handleEmployeeChange} required name="employee" id="employee" className="form-select">
                    <option value="">Choose a Sales Rep</option>
                    {this.state.employees.map(employee => {
                        return (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
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

export default SaleForm;

