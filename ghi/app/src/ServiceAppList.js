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
        if (response.ok) {
            setAppointments(
                appointments.filter((appointment) => {
                    return appointment.id !== id;
                })
            )
        }
    }

    const handleFinished = async (appointment) => {
        const url2 = `${url}${appointment.id}/`
        appointment['status'] = true
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("fetchConfig: ", fetchConfig);
        const response = await fetch(url2, fetchConfig)
        if (response.ok) {
            setAppointments(
                appointments.filter((app) => {
                    return app.id !== appointment.id;
                })
            )
        }
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
                            {appointments.map(appointment => {
                                return (appointment.status === false &&
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{appointment.date_time.slice(0, 10)}</td>
                                        <td>{appointment.date_time.slice(11, 16)}</td>
                                        <td>{appointment.technician.name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{ String(appointment.vip) }</td>
                                        <td><button onClick={() => handleCancel(appointment.id)} className="btn btn-outline-danger">Cancel</button></td>
                                        <td><button onClick={() => handleFinished(appointment)} className="btn btn-outline-success">Completed</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceAppList;