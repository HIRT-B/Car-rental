import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate()

    const handleReserve = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            navigate("/book", { state: { carId: car.id } });
        } else {

            navigate("/login", { state: { from: "/book", carId: car.id } });
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/car/car/${id}`)
            .then((res) => setCar(res.data))
            .catch((err) => console.error("Error fetching car:", err));
    }, [id]);

    if (!car) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center py-5" style={{ background: '#000' }}>
            <div
                className="card shadow-lg border-0 rounded-4 overflow-hidden d-flex flex-row"
                style={{
                    maxWidth: "850px",
                    width: "100%",
                    background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)",
                    color: "#fff",
                    height: "320px",
                }}
            >
                {/* Image */}
                <div className="col-5 h-100">
                    <img
                        src={`http://localhost:3000/uploads/${car.filename}`}
                        alt={`${car.brand} ${car.model}`}
                        className="w-100 h-100"
                        style={{
                            objectFit: "cover",
                            borderTopLeftRadius: "1rem",
                            borderBottomLeftRadius: "1rem",
                        }}
                    />
                </div>

                {/* Details */}
                <div className="col-7 p-4 d-flex flex-column justify-content-between">
                    <div>
                        <h3 className="fw-bold" >
                            {car.brand} {car.model}
                        </h3>
                        <p className="text-secondary mb-2">{car.year} • {car.fuel_type} • {car.transmission}</p>

                        <div className="row text-sm">
                            <div className="col-6">
                                <span className="text-secondary">License Plate</span>
                                <div className="fw-semibold">{car.licenseplate}</div>
                            </div>
                            <div className="col-6">
                                <span className="text-secondary">Mileage</span>
                                <div className="fw-semibold">{car.mileage} km</div>
                            </div>
                            <div className="col-6 mt-2">
                                <span className="text-secondary">Color</span>
                                <div className="text-capitalize">{car.color}</div>
                            </div>
                            <div className="col-6 mt-2">
                                <span className="text-secondary">Status</span>
                                <span className={`badge rounded-pill px-3 py-1 ${car.status === "available" ? "bg-success" : "bg-danger"}`}>
                                    {car.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h4 className="fw-bold mb-0">${car.price} <small className="text-white">/day</small></h4>
                        <button onClick={handleReserve}
                            className="btn px-4 py-2 fw-bold"
                            style={{
                                backgroundColor: "transparent",
                                color: "#f4c04c",
                                border: "2px solid #f4c04c",
                                borderRadius: "30px",
                                boxShadow: "0 0 10px rgba(244, 192, 76, 0.4)",
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f4c04c";
                                e.target.style.color = "#000";
                                e.target.style.boxShadow = "0 0 16px rgba(244, 192, 76, 0.6)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#f4c04c";
                                e.target.style.boxShadow = "0 0 10px rgba(244, 192, 76, 0.4)";
                            }}
                        >
                            Rent Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
