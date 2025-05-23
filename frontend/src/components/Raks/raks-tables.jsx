import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { getRaks } from '../../api/Rak/rak-api';


export const RaksTable = () => {
    const [raks, setRaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRak, setSelectedRak] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRaks = async () => {
            try {
                const data = await getRaks();
                console.log(data);
                setRaks(data);
            } catch (err) {
                console.error('Error fetching Rak data:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRaks();
    }, []);

    const handleRakClick = (rak) => {
        setSelectedRak(rak.id);
        // Navigate to cartes with the rak id
        navigate(`/cartes/rak/${rak.id}`);
    };

    // Show a loading indicator while fetching data
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    // Render the table
    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Raks Management</h2>
            <div className="relative overflow-x-auto rounded-lg border border-gray-300">
                <table className="w-full text-sm text-left text-gray-900 bg-white">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="p-3">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-500 bg-white rounded focus:ring-2 focus:ring-blue-400"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-4 py-3">ID</th>
                            <th scope="col" className="px-4 py-3">Rame ID</th>
                            <th scope="col" className="px-4 py-3">Nom Rak</th>
                            <th scope="col" className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raks.map((rak, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } border-b border-gray-300 hover:bg-blue-100 cursor-pointer transition-all duration-200 ${
                                    selectedRak === rak.id ? "bg-blue-100" : ""
                                }`}
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-${rak.id}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <label htmlFor={`checkbox-${rak.id}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium">{rak.id}</td>
                                <td className="px-4 py-3">{rak.ID_RAME}</td>
                                <td className="px-4 py-3">{rak.NOM_RAK}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleRakClick(rak)}
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 transition-colors duration-200"
                                    >
                                        View Cartes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                Click on "View Cartes" to see all cards in the selected Rak
            </div>
        </div>
    );
}

export default RaksTable;
