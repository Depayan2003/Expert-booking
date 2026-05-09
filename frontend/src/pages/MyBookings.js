import { useState } from "react";
import API from "../api";
import "../styles/bookings.css";

export default function MyBookings() {
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);

    const fetch = async () => {
        const res = await API.get(`/bookings?email=${email}`);
        setData(res.data);
    };

    return (
        <div className="container">
            <h2>My Bookings</h2>

            <input className="input" onChange={e => setEmail(e.target.value)} />
            <button className="button" onClick={fetch}>Fetch</button>

            {data.map(b => (
                <div key={b._id} className="item">
                    {b.date} - {b.time} ({b.status})
                </div>
            ))}
        </div>
    );
}