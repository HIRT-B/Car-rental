import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardForm from '../components/CardForm'





export default function UpdateCar() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [licenseplate, setLicenseplate] = useState('')
    const [color, setColor] = useState('')
    const [mileage, setMileage] = useState('')
    const [fuel_type, setFuel_type] = useState("gasoline")
    const [transmission, setTransmission] = useState("automatic")
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState("available")
    const [images, setImageFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);


    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:3000/car/car/${id}`)
            .then(res => {
                console.log("Response from backend:", res.data);

                const car = Array.isArray(res.data) ? res.data[0] : res.data;

                if (!car) {
                    console.error("Car not found in response.");
                    return;
                }

                setBrand(car.brand || '');
                setModel(car.model || '');
                setYear(car.year || '');
                setLicenseplate(car.licenseplate || '');
                setColor(car.color || '');
                setMileage(car.mileage || '');
                setPrice(car.price || '');
                setFuel_type((car.fuel_type || 'gasoline').trim().toLowerCase());
                setTransmission((car.transmission || 'automatic').trim().toLowerCase());
                setStatus((car.status || 'available').trim().toLowerCase());
            })
            .catch(err => {
                console.error("Error fetching car:", err);
            });
    }, [id]);


    const handleUpdate = async (e) => {
        console.log({ brand, model, year, price, images });
        e.preventDefault();

        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('year', year);
        formData.append('color', color);
        formData.append('price', price);
        formData.append('mileage', mileage);
        formData.append('licenseplate', licenseplate);
        formData.append('fuel_type', fuel_type);
        formData.append('status', status);
        formData.append('transmission', transmission);

        if (images) {
            formData.append('images', images);
        }



        await axios.put(`http://localhost:3000/car/update-car/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/admin/cars');
        }, 1500);
    };


    return (
        <>
        
            <div className="d-flex">
                <div className="mx-4">
                    <h1 style={{fontSize:"60px"}}>Edit Car</h1>
                    <p>Edit car to your rental fleet</p>
                </div>
            </div>

            <div className="container mt-5">

                <CardForm brand={brand} setBrand={setBrand}
                    model={model} setModel={setModel}
                    year={year} setYear={setYear}
                    price={price} setPrice={setPrice}
                    color={color} setColor={setColor}
                    mileage={mileage} setMileage={setMileage}
                    licenseplate={licenseplate} setLicenseplate={setLicenseplate}
                    fuel_type={fuel_type} setFuel_type={setFuel_type}
                    transmission={transmission} setTransmission={setTransmission}
                    status={status} setStatus={setStatus}
                    setImageFile={setImageFile}
                    onSubmit={handleUpdate}
                    isEditing={true}
                />

            </div>
             {showSuccess && (
                    <div style={{
                        position: 'fixed',
                        top: '20%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#454954',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        zIndex: 1000,
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                    }}>
                        ✅ Vehicle updated successfully!
                    </div>
                )}

            


        </>
    )
}