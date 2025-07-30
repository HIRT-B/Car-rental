import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegCalendarCheck } from "react-icons/fa";

export default function ReservationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const { carId: carIdFromState } = location.state || {};
  const [carId, setCarId] = useState(carIdFromState || "");
  const [rental_date, setRentalDate] = useState("");
  const [return_date, setReturnDate] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setUserId(user.id);
      setFullName(user.fullname || "");
    }
  }, [navigate, user]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/car/cars")
      .then((res) => setCars(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des voitures:", err)
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const localUser = JSON.parse(localStorage.getItem("user"));
    const userId = localUser?.id;

    if (!userId) {
      alert("Utilisateur non connecté !");
      navigate("/login");
      return;
    }

    const data = {
      user_id: userId,
      car_id: carId,
      rental_date,
      return_date,
    };

    axios
      .post("http://localhost:3000/rental/rentals", data)
      .then(() => navigate("/confirmation"))
      .catch((err) => {
        console.error("Erreur:", err);
        alert("Erreur lors de la réservation.");
      });
  };

  return (
    <div className="reservation-page">
      <div className="container py-5">
        <div
          className="reservation-box row p-4"
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.08)", // shadow light
          }}
        >
          <div className="col-md-6">
            <div className="text-gold mb-3 glow">
              <h1>
                Reserve Your Car
                <FaRegCalendarCheck
                  className="me-2"
                  style={{ marginTop: "-15px", marginLeft: "10px" }}
                />
              </h1>
            </div>

            <p className="text-secondary">Choose your car and set the rental dates</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-gold">Full Name</label>
                <input
                  type="text"
                  className="form-control dark-input"
                  value={fullName}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-gold">Car</label>
                <select
                  className="form-select dark-input"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  required
                >
                  <option value="">-- Select a car --</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand} {car.model} - {car.licenseplate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-gold">Rental Date</label>
                <input
                  type="date"
                  className="form-control dark-input"
                  value={rental_date}
                  onChange={(e) => setRentalDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-gold">Return Date</label>
                <input
                  type="date"
                  className="form-control dark-input"
                  value={return_date}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold text-white w-100 mt-3"
                style={{ backgroundColor: "#000" }}
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            {carId && (
              <img
                src={`http://localhost:3000/uploads/${
                  cars.find((car) => car.id === parseInt(carId))?.filename
                }`}
                alt="Selected car"
                className="img-fluid"
                style={{
                  maxHeight: "300px",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.08)", // lighter image shadow
                  borderRadius: "10px",
                  marginTop:"8rem",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
