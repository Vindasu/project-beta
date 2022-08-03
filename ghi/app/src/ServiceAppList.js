import { useState, useEffect } from "react";

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
        setAppointments(
            appointments.filter((appointment) => {
                return appointment.id !== id;
            })
        )
    }

    // handle Finished just filters and removes from table, the second part of the delete fxn

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
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer Name</th>
                        {/* <th>Date</th>
                        <th>Time</th> */}
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer}</td>
                            {/* <td>{appointment.date_time}</td>
                            <td>{appointment.date_time}</td> */}
                            <td>{appointment.technician.name}</td>
                            <td>{appointment.reason}</td>
                            <td></td>
                            <td><button onClick={() => handleDelete(appointment.id)} className="btn btn-outline-danger">Cancel</button></td>
                            <td><button onClick={() => handleDelete(appointment.id)} className="btn btn-outline-success">Finished</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ServiceAppList;