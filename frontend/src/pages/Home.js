import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    const [experts, setExperts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {
        API.get("/experts?limit=100")
            .then(res => setExperts(res.data.data))
            .catch(console.log);
    }, []);

    const categories = ["All", ...new Set(experts.map(e => e.category))];

    const filtered = experts.filter(e =>
        (category === "All" || e.category === category) &&
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="title">Expert Booking System</h1>

            <input
                className="search"
                placeholder="Search..."
                onChange={e => setSearch(e.target.value)}
            />

            <div className="categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${category === cat ? "active" : ""}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <button className="button" onClick={() => navigate("/my-bookings")}>
                My Bookings
            </button>

            {filtered.map(e => (
                <div
                    key={e._id}
                    className="card"
                    onClick={() => navigate(`/expert/${e._id}`, { state: e })}
                >
                    <h3>{e.name}</h3>
                    <p>{e.category}</p>
                </div>
            ))}
        </div>
    );
}