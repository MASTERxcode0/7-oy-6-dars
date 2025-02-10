import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../assets/loading.svg";

function Sahifalash() {
    const queryClient = useQueryClient();
    const [editingUser, setEditingUser] = useState(null);

    function fetchUsers() {
        return axios.get("https://jsonplaceholder.typicode.com/users");
    }
    const { data, isError, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        refetchInterval: 3000000,
    });

    const { mutate: deleteUser } = useMutation({
        mutationFn: (id) => {
            return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            alert("User deleted successfully!");
        },
        onError: () => {
            alert("Error occurred while deleting the user.");
        },
    });

    const { mutate: editUser } = useMutation({
        mutationFn: (updatedUser) => {
            return axios.put(
                `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
                updatedUser
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            alert("User updated successfully!");
            setEditingUser(null); 
        },
        onError: () => {
            alert("Error occurred while updating the user.");
        },
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = {
            id: editingUser.id,
            name: formData.get("name"),
            email: formData.get("email"),
            username: formData.get("username"),
            address: {
                street: formData.get("street"),
                suite: formData.get("suite"),
                city: formData.get("city"),
                zipcode: formData.get("zipcode"),
                geo: editingUser.address.geo,
            },
            phone: formData.get("phone"),
            website: formData.get("website"),
            company: {
                name: formData.get("companyName"),
                catchPhrase: formData.get("catchPhrase"),
                bs: formData.get("bs"),
            },
        };
        editUser(updatedUser);
    };

    return (
        <div className="bg-light p-5 m-5 mx-auto w-full flex flex-wrap gap-1 justify-between">
            {isLoading && <img src={Loading} alt="Loading..." />}
            {isError && <p>Error occurred while fetching data!</p>}

            {!isLoading &&
                data?.data.map((user, index) => (
                    <div
                        key={index}
                        className="w-[33%] shadow-lg bg-white p-4 rounded-xl"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {user.name}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.username}</p>

                        <ul className="mt-4 text-gray-700">
                            <li>
                                <strong>Street:</strong> {user.address.street}
                            </li>
                            <li>
                                <strong>Suite:</strong> {user.address.suite}
                            </li>
                            <li>
                                <strong>City:</strong> {user.address.city}
                            </li>
                            <li>
                                <strong>Zipcode:</strong> {user.address.zipcode}
                            </li>
                            <ul className="ml-6 mt-2 text-gray-500">
                                <li>
                                    <strong>Lat:</strong> {user.address.geo.lat}
                                </li>
                                <li>
                                    <strong>Lng:</strong> {user.address.geo.lng}
                                </li>
                            </ul>
                        </ul>

                        <p className="mt-4 text-gray-700">
                            <strong>Phone:</strong> {user.phone}
                        </p>
                        <p className="text-gray-700">
                            <strong>Website:</strong> {user.website}
                        </p>

                        <ul className="mt-4 text-gray-700">
                            <li>
                                <strong>Company:</strong> {user.company.name}
                            </li>
                            <li>
                                <strong>Catchphrase:</strong> {user.company.catchPhrase}
                            </li>
                            <li>
                                <strong>BS:</strong> {user.company.bs}
                            </li>
                        </ul>

                        <button
                            className="bg-red-500 text-white p-2 rounded-lg mt-2"
                            onClick={() => deleteUser(user.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg mt-2 ml-2"
                            onClick={() => setEditingUser(user)}
                        >
                            Edit
                        </button>
                    </div>
                ))}

            {editingUser && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <form
                        onSubmit={handleEditSubmit}
                        className="bg-white p-5 rounded-lg shadow-lg w-1/2"
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                        <input
                            name="name"
                            defaultValue={editingUser.name}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="email"
                            defaultValue={editingUser.email}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="username"
                            defaultValue={editingUser.username}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="street"
                            defaultValue={editingUser.address.street}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="suite"
                            defaultValue={editingUser.address.suite}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="city"
                            defaultValue={editingUser.address.city}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="zipcode"
                            defaultValue={editingUser.address.zipcode}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="phone"
                            defaultValue={editingUser.phone}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="website"
                            defaultValue={editingUser.website}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="companyName"
                            defaultValue={editingUser.company.name}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="catchPhrase"
                            defaultValue={editingUser.company.catchPhrase}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />
                        <input
                            name="bs"
                            defaultValue={editingUser.company.bs}
                            className="p-2 mb-2 w-full border rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-lg mt-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white p-2 rounded-lg mt-2 ml-2"
                            onClick={() => setEditingUser(null)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Sahifalash;
