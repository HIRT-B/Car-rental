import { BsFillCarFrontFill } from "react-icons/bs";

export default function CardForm(props) {
  const {
    brand, setBrand,
    model, setModel,
    year, setYear,
    price, setPrice,
    color, setColor,
    mileage, setMileage,
    licenseplate, setLicenseplate,
    fuel_type, setFuel_type,
    status, setStatus,
    transmission, setTransmission,
    setImageFile,
    onSubmit,
    isEditing
  } = props;

  return (
    <form className="car-form" onSubmit={onSubmit}>
      <div className="form-header">
        <h2>{isEditing ? "Edit Car" : "Add New Car"}</h2>
        <p>Fill in the car details below</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Brand</label>
          <input type="text" value={brand} onChange={e => setBrand(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input type="text" value={model} onChange={e => setModel(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>License Plate</label>
          <input type="text" value={licenseplate} onChange={e => setLicenseplate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mileage (km)</label>
          <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price ($/day)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input type="text" value={color} onChange={e => setColor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Fuel Type</label>
          <select value={fuel_type} onChange={e => setFuel_type(e.target.value)}>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission</label>
          <select value={transmission} onChange={e => setTransmission(e.target.value)}>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label>Car Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        </div>
      </div>

      <div className="form-footer">
        <button type="submit">
          {isEditing ? "Update Car" : "Add Car"}
        </button>
        <img src="/public/logo.png" alt="car logo" style={{width:"100px",height:"100px", marginRight:"20px"}}/>
      </div>
    </form>
  );
}
