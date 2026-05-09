import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket";
import "../styles/detail.css";

export default function ExpertDetail() {
    const { state } = useLocation();
    const [expert, setExpert] = useState(state);
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("join_expert", expert._id);

        socket.on("slotBooked", ({ date, time }) => {
            setExpert(prev => ({
                ...prev,
                slots: prev.slots.map(s =>
                    s.date === date && s.time === time
                        ? { ...s, isBooked: true }
                        : s
                )
            }));
        });

        return () => socket.off("slotBooked");
    }, []);

    return (
        <div className="container">
            <h2>{expert.name}</h2>

            {expert.slots.map((s, i) => (
                <div key={i} className="slot">
                    <span>{s.date} - {s.time}</span>

                    <button
                        disabled={s.isBooked}
                        onClick={() =>
                            navigate("/booking", { state: { expertId: expert._id, slot: s } })
                        }
                    >
                        {s.isBooked ? "Booked" : "Book"}
                    </button>
                </div>
            ))}
        </div>
    );
}