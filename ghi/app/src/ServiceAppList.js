import { useState, useEffect } from "react";

function ServiceAppList() {
    const [appointments, setAppointments] = useState([])

    const url = 'http://localhost:8080/api/appointments/'

    const fetchAppointments = async () => {
        const res = await fetch(url)
        const appointmentsJSON = await res.json()
        setAppointments(appointmentsJSON.appointments);
    }

    const handleCancel = async (id) => {
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

    const handleFinished = async (id) => {
        setAppointments(
            appointments.filter((appointment) => {
                return appointment.id !== id;
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
                    window.location.href='http://localhost:3000/services/technicians';
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
            &nbsp;
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/services/history';
                }}
                >Service History
            </button>
            <button
                className="btn btn-outline-light"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='http://localhost:3000/services/history/beta';
                }}
                >Service History Beta
            </button>
            <div className="offset-0.5">
                <div className="shadow p-4 mt-4">
                    <h1>Service Appointments</h1>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Time</th>
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
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                    <td></td>
                                    <td><button onClick={() => handleCancel(appointment.id)} className="btn btn-outline-danger">Cancel</button></td>
                                    <td><button onClick={() => handleFinished(appointment.id)} className="btn btn-outline-success">Finished</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceAppList;