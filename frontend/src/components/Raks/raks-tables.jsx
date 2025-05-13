import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getRaks } from '../../api/Rak/rak-api';


export const RaksTable = () => {
    const [raks, setRaks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRaks = async () => {
            try {
                const data = await getRaks();
                console.log(data);
                setRaks(data);
            } catch (err) {
                console.error('Error fetching Rame data:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRaks();
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
                        <th scope="col" className="px-4 py-2">ID Rame</th>
                        <th scope="col" className="px-4 py-2">Nom Rak</th>
                    </tr>
                </thead>
                <tbody>
                    {raks.map((rak, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } border-b border-gray-300 hover:bg-gray-200`}
                        >
                            <td className="w-4 p-4">
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
                            </td>
                            <td className="px-4 py-2">{rak.id}</td>
                            <td className="px-4 py-2">{rak.ID_RAME}</td>
                            <td className="px-4 py-2">{rak.NOM_RAK}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default RaksTable;
