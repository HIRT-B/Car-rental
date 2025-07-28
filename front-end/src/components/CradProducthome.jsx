import { NavLink, useNavigate } from "react-router-dom";


export default function CardProducthome({ car }) {
  const navigate = useNavigate()

   const handleReserve = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/book", { state: { carId: car.id } });
    } else {
      
      navigate("/login", { state: { from: "/book", carId: car.id } });
    }
  };

  return (
    <div className="car-card">
      {car.filename && (
        <img
          src={`http://localhost:3000/uploads/${car.filename}`}
          className="car-card-img"
          alt={`${car.brand} ${car.model}`}
        />
      )}
      <div className="car-card-body">
        <h5 className="car-card-title">{car.brand} {car.model}</h5>
        <p className="car-card-sub">{car.year} • {car.licenseplate}</p>
        <p className="car-card-sub">{car.mileage} km</p>
        <h6 className="car-price">{car.price}Dh/day</h6>
        <div className="d-flex justify-content-between mt-3 gap-2">
          <NavLink to={`/car/${car.id}`} className="btn-gold-outline flex-fill">Details</NavLink>
          <button onClick={handleReserve}  className="btn-gold-outline flex-fill">Rent Now</button>
        </div>

      </div>
    </div>
  );
}
