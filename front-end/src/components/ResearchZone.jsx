import { useEffect, useState } from "react";

export default function ResearchZone({ cars, onSearch }) {
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    model: "",
    licenseplate: "",
    mileage: "",
    transmission: "",
    color: ""
  });

  const brands = [...new Set(cars.map(car => car.brand?.trim()))];
  const models = [...new Set(cars.map(car => car.model?.trim()))];
  const licensePlates = [...new Set(cars.map(car => car.licenseplate?.trim()))];
  const mileages = [...new Set(cars.map(car => car.mileage?.toString()))];
  const transmissions = [...new Set(cars.map(car => car.transmission?.trim()))];
  const colors = [...new Set(cars.map(car => car.color?.trim()))];

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const [min, max] = filters.price.split("-").map(Number);

    const result = cars.filter(car =>
      (!filters.brand || car.brand?.toLowerCase().trim() === filters.brand.toLowerCase().trim()) &&
      (!filters.model || car.model?.toLowerCase().trim() === filters.model.toLowerCase().trim()) &&
      (!filters.licenseplate || car.licenseplate?.toLowerCase().trim() === filters.licenseplate.toLowerCase().trim()) &&
      (!filters.mileage || car.mileage?.toString() === filters.mileage) &&
      (!filters.color || car.color?.toLowerCase().trim() === filters.color.toLowerCase().trim()) &&
      (!filters.transmission || car.transmission?.toLowerCase().trim() === filters.transmission.toLowerCase().trim()) &&
      (!filters.price || (car.price >= min && (isNaN(max) || car.price <= max)))
    );

    onSearch(result);
  }, [filters, cars]);

  // Styling
  const wrapperStyle = {
    backgroundColor: "#000",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "6rem",
    border: "1px solid #2c2c2c",
    boxShadow: "0px 15px 35px -5px rgba(244, 192, 76, 0.35)", // Shadow only bottom
  };

  const labelStyle = {
    color: "#f4f4f4",
    marginBottom: "0.5rem",
    fontWeight: "500"
  };

  const selectStyle = {
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "12px",
    padding: "0.5rem 0.75rem",
    width: "100%"
  };

  return (
    <div className="row g-3" style={wrapperStyle}>
      {/* Brand */}
      <div className="col-md-3">
        <label style={labelStyle}>Brand</label>
        <select name="brand" onChange={handleChange} style={selectStyle}>
          <option value="">All Brands</option>
          {brands.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div className="col-md-3">
        <label style={labelStyle}>Model</label>
        <select name="model" onChange={handleChange} style={selectStyle}>
          <option value="">All Models</option>
          {models.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="col-md-3">
        <label style={labelStyle}>Price Range</label>
        <select name="price" onChange={handleChange} style={selectStyle}>
          <option value="">All Prices</option>
          <option value="0-100">0 - 100</option>
          <option value="100-200">100 - 200</option>
          <option value="200-500">200 - 500</option>
          <option value="500-1000">500 - 1000</option>
          <option value="1000-100000">1000+</option>
        </select>
      </div>

      {/* Transmission */}
      <div className="col-md-3">
        <label style={labelStyle}>Transmission</label>
        <select name="transmission" onChange={handleChange} style={selectStyle}>
          <option value="">All Transmissions</option>
          {transmissions.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Mileage */}
      <div className="col-md-3">
        <label style={labelStyle}>Mileage</label>
        <select name="mileage" onChange={handleChange} style={selectStyle}>
          <option value="">All Mileages</option>
          {mileages.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* License Plate */}
      <div className="col-md-3">
        <label style={labelStyle}>License Plate</label>
        <select name="licenseplate" onChange={handleChange} style={selectStyle}>
          <option value="">All Plates</option>
          {licensePlates.map((l, i) => (
            <option key={i} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="col-md-3">
        <label style={labelStyle}>Color</label>
        <select name="color" onChange={handleChange} style={selectStyle}>
          <option value="">All Colors</option>
          {colors.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
