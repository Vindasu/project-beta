import { useState, useEffect } from "react";

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([])

    const url = 'http://localhost:8080/api/appointments/'

    const fetchAppointments = async () => {
        const res = await fetch(url)
        const appointmentsJSON = await res.json()
        setAppointments(appointmentsJSON.appointments);
    }
    
    useEffect(() => {
        fetchAppointments()
    }, [])
    
    // const handleSearch = event => {
    //     const query = event.target.value;

    //     this.setState(prevState => {
    //         const filteredData = 
    //     })
    // }

    return (
        <>
            <div className="offset-0.5">
                <div className="shadow p-4 mt-4">
                    <h1>Service History</h1>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Reason</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceHistoryList;