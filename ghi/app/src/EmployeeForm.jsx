import React from 'react';
import './App.css';

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const url = 'http://localhost:8090/api/employees/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const cleared = {
                name: '',
                employee_number: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employee_number: value})
    }
    
    // async componentDidMount() {
    //     const url = 'http://localhost:8090/api/employees/';
    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({data})
    //     }
    // }

    
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a New Sales Person</h1>
                <form onSubmit={this.handleSubmit} id="create-employee-form">
                <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="Name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange} placeholder="Employee_number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="employee_number">Employee Number</label>
                </div>
                <button className="btn btn-outline-success">Create</button>
                </form>
            </div>
            </div>
        </div>
        );
    }
}

export default EmployeeForm;