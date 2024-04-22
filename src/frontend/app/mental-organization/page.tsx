// 'use client'

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// interface Organization {
//   id: number
//   name: string
//   description: string
//   city: string
//   state: string
//   zip: string
//   imageUrl: string
// }

// const OrganizationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [organizations, setOrganizations] = useState([])

//   useEffect(() => {
//     // Function to fetch organizations from backend API
//     const fetchOrganizations = async () => {
//       try {
//         const response = await axios.get('/api/organizations') // Assuming your backend server exposes this endpoint
//         setOrganizations(response.data)
//       } catch (error) {
//         console.error('Error fetching organizations:', error)
//       }
//     }

//     // Call the fetchOrganizations function
//     fetchOrganizations()
//   }, [])

//   // Function to handle search term change
//   const handleSearchTermChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase())
//   }

//   // Filter organizations based on search term
//   const filteredOrganizations = organizations.filter((org) =>
//     org.name.toLowerCase().includes(searchTerm)
//   )

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search organizations..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           value={searchTerm}
//           onChange={handleSearchTermChange}
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredOrganizations.map((org) => (
//           <div key={org.id} className="bg-white shadow-md rounded-md p-4">
//             <img
//               src={org.imageUrl}
//               alt={org.name}
//               className="w-full h-32 object-cover rounded-md mb-4"
//             />
//             <h2 className="text-lg font-semibold">{org.name}</h2>
//             <p className="text-gray-600 mb-2">{org.description}</p>
//             <p className="text-gray-500">
//               {`${org.city}, ${org.state} ${org.zip}`}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default OrganizationsPage
