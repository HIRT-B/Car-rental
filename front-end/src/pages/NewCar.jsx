import React, { useState } from "react";
import { LuCar } from "react-icons/lu";;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardForm from "../components/CardForm";

export default function NewCar() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licenseplate, setLicenseplate] = useState('');
    const [color, setColor] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuel_type, setFuel_type] = useState("gasoline");
    const [transmission, setTransmission] = useState("automatic");
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState("available");
    const [image, setImageFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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
        if (image) formData.append('images', image);

        try {
            const res = await axios.post('http://localhost:3000/car/new-car', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setShowModal(true);
            setTimeout(() => {
                const newCarId = res.data.carId;
                navigate(`/admin/update-car/${newCarId}`);
            }, 1000);
        } catch (err) {
            console.error('Erreur POST:', err);
        }
    };

    return (
        <>
            

            <div className="">
                <CardForm
                    brand={brand} setBrand={setBrand}
                    model={model} setModel={setModel}
                    year={year} setYear={setYear}
                    licenseplate={licenseplate} setLicenseplate={setLicenseplate}
                    color={color} setColor={setColor}
                    mileage={mileage} setMileage={setMileage}
                    fuel_type={fuel_type} setFuel_type={setFuel_type}
                    transmission={transmission} setTransmission={setTransmission}
                    price={price} setPrice={setPrice}
                    status={status} setStatus={setStatus}
                    setImageFile={setImageFile}
                    onSubmit={handleSubmit}
                    isEditing={false}
                />

                {showModal && (
                    <div className="submission-modal">
                        ✅ The car has been added successfully!
                    </div>
                )}
            </div>
        </>
    );
}
