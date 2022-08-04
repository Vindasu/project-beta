import { useState, useEffect } from "react";

function InventoryMfgList() {
    const [manufacturers, setManufacturers] = useState([])

    const url = 'http://localhost:8100/api/manufacturers/'

    const fetchManufacturers = async () => {
        const res = await fetch(url)
        const manufacturersJSON = await res.json()
        setManufacturers(manufacturersJSON.manufacturers);
    }

    useEffect(() => {
        fetchManufacturers()
    }, [])

    return (
        <>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory';
                }}
                >Back to Inventory Home
            </button>
            &nbsp;
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory/manufacturers/new';
                }}
                >Create Manufacturer
            </button>
            <div className="offset-0.5">
                <div className="shadow p-4 mt-4">
                    <h1>Manufacturers</h1>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturers.map(manufacturer => (
                                <tr key={manufacturer.id}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default InventoryMfgList;