import { useState, useEffect } from "react";

// export default () => {
function ServiceAppList() {
    const [appointments, setAppointments] = useState([])

    const url = 'http://localhost:8080/api/appointments/'

    const fetchAppointments = async () => {
        const res = await fetch(url)
        const appointmentsJSON = await res.json()
        setAppointments(appointmentsJSON.appointments);
    }

    const handleDelete = async (id) => {
        const url2 = `${url}${id}`
        const fetchConfig = {
            method: "delete"
        };
        const response = await fetch(url2, fetchConfig);
        setShoes(
            shoes.filter((shoe) => {
                return shoe.id !== id;
            })
        )
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    return (
        <>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/technicians';
                }}
                >Enter Technician
            </button>
            &nbsp;
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/services/new';
                }}
                >Create Appointment
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.technician.name}</td>
                            <td>{appointment.reason}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ServiceAppList;