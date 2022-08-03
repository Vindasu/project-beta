import { useState, useEffect } from "react";

function InventoryModelList() {
    const [models, setModels] = useState([])

    const url = 'http://localhost:8100/api/models/'

    const fetchModels = async () => {
        const res = await fetch(url)
        const modelsJSON = await res.json()
        setModels(modelsJSON.models);
    }

    useEffect(() => {
        fetchModels()
    }, [])

    return (
        <>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/inventory/models/new';
                }}
                >Create Model
            </button>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td>{model.picture_url}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default InventoryModelList;