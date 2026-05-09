import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";
import "../styles/booking.css";

export default function Booking() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { expertId, slot } = state;

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    const book = async () => {
        if (!form.name || !form.email || !form.phone) {
            alert("Fill all fields");
            return;
        }

        await API.post("/bookings", {
            ...form,
            expertId,
            date: slot.date,
            time: slot.time
        });

        alert("Booking successful");

        // 🔥 redirect to home (safe)
        navigate("/");
    };

    return (
        <div className="container">
            <h2>Book Slot</h2>

            <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input className="input" placeholder="Notes" onChange={e => setForm({ ...form, notes: e.target.value })} />

            <button className="button" onClick={book}>
                Confirm Booking
            </button>
        </div>
    );
}