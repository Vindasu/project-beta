import React, { useEffect } from 'react';
import App from './App';
import {useState} from 'react'

export default function SalesHistoryList() {

    const [employees, setEmployees] = useState([]);

    const [employee, setEmployee] = useState([]);

    const [sales, setSales] = useState([]);

    const fetchEmployees = async () => {
        const url = 'http://localhost:8090/api/employees/';
        const result = await fetch(url);
        const recordsJSON = await result.json();
        setEmployees(recordsJSON.employees);
        console.log(recordsJSON.employees)
    }

    const fetchSales = async () => {
        const url = `http://localhost:8090/api/sales/`;
        const result = await fetch(url);
        const recordsJSON = await result.json();
        setSales(recordsJSON.sales);
    }

    useEffect(() => {
        fetchEmployees()
    }, []);

    useEffect(() => {
        fetchSales()
    }, []);

    return (
        <div className="row">
            <div className='className="offset-3 col-6"'>
                <div className="form-floating col-sm-5">
                    <select className="form-select input-small" aria-label="Default select example" onChange={(event) => {
                        setEmployee(event.target.value);
                    }}
                        required
                        name="employee"
                        id="employee">
                        <option value="">All</option>
                        {employees?.map(employee => {
                            return (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            )
                        })
                        }
                    </select>
                </div>
            </div>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Sales Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales?.filter((key) => {
                        if (key.employee.id == employee) {
                            return key;
                        } else if (employee == '') {
                            return key;
                        }
                    }).map((sale, index) => {
                        return (
                            <tr key={index}>
                                <td>{sale.employee.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}










