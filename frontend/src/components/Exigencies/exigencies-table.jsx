import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getExigencyBySubChapterAndChapter } from '../../api/Exigency/exigency-api';


export const ExigenciesTable = () => {
    const [exigencies, setExigencies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExigencies = async () => {
            try {
                const data = await getExigencyBySubChapterAndChapter();
                console.log(data);
                setExigencies(data);
            } catch (err) {
                console.error('Error fetching exigencies:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExigencies();
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
                        <th scope="col" className="px-4 py-2">Chap Title</th>
                        <th scope="col" className="px-4 py-2">Sub Chap Title</th>
                        <th scope="col" className="px-4 py-2">Exigency Title</th>
                        <th scope="col" className="px-4 py-2">Description</th>
                        <th scope="col" className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exigencies.map((exigency, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } border-b border-gray-300 hover:bg-gray-200`}
                        >
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${index}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-500 bg-gray-200 border-gray-400 rounded focus:ring-2 focus:ring-blue-400"
                                    />
                                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-4 py-2 font-semibold text-gray-900 whitespace-nowrap"
                            >
                                {exigency.id}
                            </th>
                            <td className="px-4 py-2">{exigency.chapter_title}</td>
                            <td className="px-4 py-2">{exigency.sub_chapter_title}</td>
                            <td className="px-4 py-2">{exigency.exigency_title}</td>
                            <td className="px-4 py-2">{exigency.exigency_description}</td>
                            <td className="flex justify-center items-center px-4 py-2">
                                <a
                                    href="#"
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="ml-3"
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ExigenciesTable;