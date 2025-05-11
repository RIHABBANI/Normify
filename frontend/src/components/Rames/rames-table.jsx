import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getRames } from '../../api/Rames/rames-api';


export const RamesTable = () => {
    const [rames, setRames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRames = async () => {
            try {
                const data = await getRames();
                console.log(data);
                setRames(data);
            } catch (err) {
                console.error('Error fetching Rame data:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRames();
    }, []);

    // Show a loading indicator while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render the table
    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border border-gray-300">
            <table className="w-full text-xs text-left text-gray-900 bg-white">
                <thead className="text-xs uppercase text-gray bg-white-700">
                    <tr>
                        <th scope="col" className="p-3 border-gray-300">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-4 py-2">id</th>
                        <th scope="col" className="px-4 py-2">NUMERO_RAME</th>
                        <th scope="col" className="px-4 py-2">TYPE_RAME</th>
                        <th scope="col" className="px-4 py-2">DATE_MISE_EN_SERVICR_RAME</th>
                    </tr>
                </thead>
                <tbody>
                    {rames.map((rame, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } border-b border-gray-300 hover:bg-gray-200`}
                        >
                            {/* Add your table data here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
