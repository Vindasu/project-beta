import React, { useEffect } from 'react';
import App from './App';


class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {sales: []}
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            this.setState({ sales: data.sales })
        }
    }

    // async handleDelete(id) {
    //     const url = `http://localhost:8090/api/sales/${id}/`
    //     const fetchConfig = {method:"DELETE"}
    //     const response = fetch(url, fetchConfig)
    //     setSales(sales.filter(
    //         function(sale) {
    //             return sale.id !== sale;
    //         }
    //     ))
    // }
    render () {
        return (
            <>
            <h1>View Sales</h1>
            <table className="table table-dark table-hover">
            <thead>
                <tr>
                <th>Sales Person</th>
                <th>Employee Number</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Sale Price</th>
                </tr>
            </thead>
            <tbody>
                {this.state.sales.map((sale, index)=> {
                return (
                    <tr key={index}>
                    <td>{ sale.employee.name }</td>
                    <td>{ sale.employee.employee_number }</td>
                    <td>{ sale.customer.name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>${ sale.price }</td>                 
                    </tr>
                );
                })}
            </tbody>
            </table>
            </>
        )        
    }
}


    export default SalesList