import axios from "axios";
import { useEffect, useState } from "react";
import CardProducthome from "../components/CradProducthome";
import ResearchZone from "../components/ResearchZone";

export default function ProductPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/car/cars")
      .then((res) => {
        setCars(res.data);
        setFilteredCars(res.data);
      })
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  const handleSearch = (filtered) => {
    const finalFiltered = filtered.filter(car =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(finalFiltered);
  };

  return (
    <div className="home">
      <div className="container mt-5">
        <h2 className="section-title ">
          <i className="bi bi-car-front me-2 "></i>
          Available Cars
        </h2>

        <div className="mb-4">
          <ResearchZone cars={cars} onSearch={handleSearch} />
        </div>

        <div className="row">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div className="col-md-4 mb-3" key={car.id}>
                <CardProducthome car={car} />
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No cars match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
