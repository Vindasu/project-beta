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
                    window.location.href='http://localhost:3000/inventory/manufacturers/new';
                }}
                >Create Manufacturer
            </button>
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
        </>
    )
}

export default InventoryMfgList;