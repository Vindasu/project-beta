import React, { useEffect } from 'react';
import App from './App';
import {useState} from 'react'

function SalesList() {
    const [sales, setSales] = useState([])

    const fetchSales = async () => {
        const url = 'http://localhost8090/api/sales/'
        const res = await fetch(url)
        const salesJSON = await res.json()
        setSales(salesJSON.sales)
    }
    useEffect(() => {
        fetchSales()
    }, [])

    function handleDelete(id) {
        const url = `http://localhost:8090/api/sales/${id}/`
        const fetchConfig = {method:"DELETE"}
        const response = fetch(url, fetchConfig)
        setSales(sales.filter(
            function(sale) {
                return sale.id !== sale;
            }
        ))
    }
    return (
        <table className="table table-dark table-hover">
            <thead>
            <tr>
                <th>Sales Person</th>
                <th>Automobile</th>
                <th>Customer</th>
                <th>Picture</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {sales.map(sale => {
                return (
                <tr key={sale.employee_id}>
                    <td>{ sale.employee }</td>
                    <td>{ sale.automobile }</td>
                    <td>{ sale.customer }</td>
                    <td>
                    <img src={sale.picture_url} className="" alt= "..." width="100" height="100"></img>
                    </td>
                    <td><button variant="outline-danger" onClick={() => handleDelete(sale.id)}>Delete</button></td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}
    

export default SalesList