import { NavLink } from "react-router-dom";


export default function CardProduct({
  brand,
  model,
  year,
  licenseplate,
  mileage,
  price,
  filename,
  onDelete,
  id
}) {
  return (
    <div className="car-card">
      {filename && (
        <img src={`http://localhost:3000/uploads/${filename}`} className="car-card-img" alt={`${brand} ${model}`} />
      )}
      <div className="car-card-body">
        <h5 className="car-card-title">{brand} {model}</h5>
        <p className="car-card-sub">{year} • {licenseplate}</p>
        <p className="car-card-sub">{mileage} km</p>
        <h6 className="car-price">Price: Dh{price}/day</h6>
        <div className="d-flex justify-content-between mt-3 gap-2">
          <NavLink to={`/admin/update-car/${id}`}
            style={{
              backgroundColor: "#000",
              textDecoration: "none",
              color: "#fff",
              padding: "10px 26px",
              borderRadius: "30px",
              border: "1px solid #F4C04C",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(244, 192, 76, 0.5)", // shadow hmer
              textShadow: "0 0 10px rgba(244, 192, 76, 0.5)", // glow f l text
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 8px rgba(244, 192, 76, 0.6)";
              e.currentTarget.style.textShadow = "0 0 8px rgba(244, 192, 76, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 8px rgba(244, 192, 76, 0.6)";
              e.currentTarget.style.textShadow = "0 0 8px rgba(244, 192, 76, 0.6)";
            }}
          >
          Up Date</NavLink>
          <button
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 26px",
              borderRadius: "30px",
              border: "1px solid #d32f2f",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(211, 47, 47, 0.5)", // shadow hmer
              textShadow: "0 0 6px rgba(255, 0, 0, 0.4)", // glow f l text
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.7)";
              e.currentTarget.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(211, 47, 47, 0.5)";
              e.currentTarget.style.textShadow = "0 0 6px rgba(255, 0, 0, 0.4)";
            }}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
