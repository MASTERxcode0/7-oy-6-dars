import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

function PotForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [street, setStreet] = useState("");
    const [suite, setSuite] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [vebsiteCompany, setVebsiteCompany] = useState("");
    const [phoneCompany, setPhoneCompany] = useState("");
    const [websitCompany, setWebsitCompany] = useState("");
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => alert("Geolocationni olishda muammo yuz berdi!")
            );
        }
    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: async (newUser) => {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                newUser
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Muvaffaqiyatli:", data);
            alert("Foydalanuvchi muvaffaqiyatli qo'shildi!");
        },
        onError: (err) => {
            console.error("Xato:", err);
            alert("Xato yuz berdi, qayta urinib ko‘ring.");
        },
    });

    function hendalSubmit(e) {
        e.preventDefault();
        const data = {
            id: Date.now(),
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: location,
            },
            phone,
            website,
            company: {
                name: vebsiteCompany,
                catchPhrase: phoneCompany,
                bs: websitCompany,
            },
        };

        mutate(data);
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    User Information Form
                </h1>
                <form
                    onSubmit={hendalSubmit}
                    id="userForm"
                    className="space-y-4"
                >
                    <div className="flex gap-4 ">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                            className="p-2  mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            name="surname"
                            placeholder="Enter your surname"
                            type="text"
                            className="p-2  mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        className="p-2  mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <fieldset className="border border-gray-300 rounded-lg p-4 flex flex-wrap gap-2 justify-between">
                        <legend className="text-sm font-medium text-gray-700">
                            Address
                        </legend>

                        <input
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Street"
                            type="text"
                            className="p-2 mt-1 block w-4/9 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setSuite(e.target.value)}
                            placeholder="Suite"
                            type="text"
                            className="p-2 mt-1 block w-4/9 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            type="text"
                            className="p-2 mt-1 block w-4/9 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setZipcode(e.target.value)}
                            placeholder="Zipcode"
                            type="text"
                            className="p-2 mt-1 block w-4/9 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </fieldset>
                    <div className="flex justify-between gap-2">
                        <input
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Website"
                            type="text"
                            className="p-2  mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            type="text"
                            className="p-2  mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <fieldset className="border border-gray-300 rounded-lg p-4 flex flex-wrap gap-4 justify-between">
                        <legend className="text-sm font-medium text-gray-700">
                            Company
                        </legend>

                        <input
                            onChange={(e) => setVebsiteCompany(e.target.value)}
                            placeholder="Website"
                            type="text"
                            className="p-2 mt-1 block w-3/10 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setPhoneCompany(e.target.value)}
                            placeholder="Phone"
                            type="text"
                            className="p-2 mt-1 block w-3/10 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            onChange={(e) => setWebsitCompany(e.target.value)}
                            placeholder="Website"
                            type="text"
                            className="p-2 mt-1 block w-3/10 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </fieldset>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-black text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PotForm;
