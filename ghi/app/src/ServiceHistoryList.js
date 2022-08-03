import { useState, useEffect } from "react";

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const url = 'http://localhost:8080/api/appointments/'

    const fetchAppointments = async () => {
        const res = await fetch(url)
        const appointmentsJSON = await res.json()
        setAppointments(appointmentsJSON.appointments);
    }
    
    useEffect(() => {
        fetchAppointments()
    }, [])

    return (
        <>  
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
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
                            {appointments.filter((val) => {
                                if (searchTerm == "") {
                                    return val
                                } else if (val.vin.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val
                                }
                            }).map(appointment => {
                                return (appointment.status == true &&
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{appointment.date_time.slice(0, 10)}</td>
                                    <td>{appointment.date_time.slice(11, 16)}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
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

export default ServiceHistoryList;