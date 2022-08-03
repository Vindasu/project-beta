import { useState, useEffect } from "react";

function InventoryAutoList() {
    const [autos, setAutos] = useState([])

    const url = 'http://localhost:8100/api/automobiles/'

    const fetchAutos = async () => {
        const res = await fetch(url)
        const autosJSON = await res.json()
        setAutos(autosJSON.autos);
    }

    useEffect(() => {
        fetchAutos()
    }, [])

    return (
        <>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory/autos/new';
                }}
                >Create Automobile
            </button>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => (
                        <tr key={auto.id}>
                            <td>{auto.vin}</td>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.model.manufacturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default InventoryAutoList;