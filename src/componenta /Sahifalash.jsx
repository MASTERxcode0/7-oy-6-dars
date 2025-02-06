import React from "react";
import { useQuery , useMutation } from "@tanstack/react-query";
import axios from "axios";
import  Loading from '../assets/loading.svg'

function Sahifalash() {
	function fetchUsers() {
		return axios.get("https://jsonplaceholder.typicode.com/users");
	}
	const {data, isError, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
		refetchInterval: 3000000,
	});
	const {mutate} = useMutation({
		mutationFn: (id) => {
			return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
		}
	})
	return (
		<div className='  bg-light p-5 m-5 mx-auto w-full flex flex-wrap gap-1 justify-between  '>
			{isLoading && (
				<img
					src={Loading}
					alt=''
				/>
			)}
            {
                isError && <p>Hatolik yuz berdi!</p>
            }

			{!isLoading &&
				data?.data.map((user, index) => {
					return (
						<div
							key={index}
							className='w-[33%] shadow-lg bg-white p-4 rounded-xl  '>
							<h2 className='text-lg font-semibold text-gray-800 mb-2'>
								{user.name}
							</h2>
							<p className='text-gray-600'>{user.email}</p>
							<p className='text-gray-600'>{user.username}</p>

							<ul className='mt-4 text-gray-700'>
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
								<ul className='ml-6 mt-2 text-gray-500'>
									<li>
										<strong>Lat:</strong> {user.address.geo.lat}
									</li>
									<li>
										<strong>Lng:</strong> {user.address.geo.lng}
									</li>
								</ul>
							</ul>

							<p className='mt-4 text-gray-700'>
								<strong>Phone:</strong> {user.phone}
							</p>
							<p className='text-gray-700'>
								<strong>Website:</strong> {user.website}
							</p>

							<ul className='mt-4 text-gray-700'>
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
                            <button className='bg-red-500 text-white p-2 rounded-lg'  onClick={()=>mutate(user.id)}>delete</button>
                            <button className='bg-red-500 text-white p-2 rounded-lg'  onClick={()=>mutate(user.id , user )}>edit</button>
							
						</div>
					);
				})}
		</div>
	);
}

export default Sahifalash;
