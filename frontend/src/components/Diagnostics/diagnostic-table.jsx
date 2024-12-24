import React, { useEffect, useState } from 'react';
import '../../index.css';
import { getNormChapters } from '../../api/NormChapter/norm-chapter-api';
import { getNormSubChapters } from '../../api/NormSubChapter/norm-sub-chapter-api';
import { getAllExigencies } from '../../api/Exigency/exigency-api';

export const DiagnosticsTable = () => {
    const [chapters, setChapters] = useState([]);
    const [subChapters, setSubChapters] = useState([]);
    const [exigencies, setExigencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState({});
    const [expandedSubChapters, setExpandedSubChapters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chaptersData = await getNormChapters();
                const subChaptersData = await getNormSubChapters();
                const exigenciesData = await getAllExigencies();

                setChapters(chaptersData);
                setSubChapters(subChaptersData);
                setExigencies(exigenciesData);

                // Initialize all chapters and subchapters as expanded
                const initialChaptersExpanded = {};
                const initialSubChaptersExpanded = {};
                chaptersData.forEach(chapter => {
                    initialChaptersExpanded[chapter.id] = true;
                });
                subChaptersData.forEach(subChapter => {
                    initialSubChaptersExpanded[subChapter.id] = false;
                });
                setExpandedChapters(initialChaptersExpanded);
                setExpandedSubChapters(initialSubChaptersExpanded);
            } catch (err) {
                console.error('Error fetching data:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    const toggleSubChapter = (subChapterId, event) => {
        event.stopPropagation(); // Prevent triggering chapter toggle
        setExpandedSubChapters(prev => ({
            ...prev,
            [subChapterId]: !prev[subChapterId]
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-4 py-2">id</th>
            <th scope="col" className="px-4 py-2">Exigence Title</th>
            <th scope="col" className="px-4 py-2">Exigence Description</th>
            <th scope="col" className="px-4 py-2">Evaluation</th>
            <th scope="col" className="px-4 py-2">Actions</th>
        </tr>
    </thead>
    <tbody>
        {chapters.map((chapter) => (
            <React.Fragment key={chapter.id}>
                <tr
                    className="bg-blue-50 border-b border-gray-300 hover:bg-blue-100 cursor-pointer"
                    onClick={() => toggleChapter(chapter.id)}
                >
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap flex items-center">
                        <svg
                            className={`w-4 h-4 mr-2 transform transition-transform ${expandedChapters[chapter.id] ? 'rotate-90' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {chapter.chapter_ref + " " + chapter.chapter_title}
                    </td>
                </tr>
                {expandedChapters[chapter.id] &&
                    subChapters
                        .filter(subChapter => subChapter.norm_chapter_id === chapter.id)
                        .map((subChapter) => (
                            <React.Fragment key={`${chapter.id}-${subChapter.id}`}>
                                <tr
                                    className="bg-gray-50 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                    onClick={(e) => toggleSubChapter(subChapter.id, e)}
                                >
                                    <td className="px-4 py-2 pl-8 text-gray-900 whitespace-nowrap flex items-center">
                                        <svg
                                            className={`w-4 h-4 mr-2 transform transition-transform ${expandedSubChapters[subChapter.id] ? 'rotate-90' : ''}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {subChapter.sub_chapter_title}
                                    </td>
                                </tr>
                                {expandedSubChapters[subChapter.id] &&
                                    exigencies
                                        .filter(exigency => exigency.norm_sub_chapter_id === subChapter.id)
                                        .map((exigency) => (
                                            <React.Fragment key={`${subChapter.id}-${exigency.id}`}>
                                                <tr className="bg-white border-b border-gray-300 hover:bg-gray-50">
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center">
                                                            <input
                                                                id={`checkbox-${exigency.id}`}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-blue-500 bg-gray-200 rounded focus:ring-2 focus:ring-blue-400"
                                                            />
                                                            <label htmlFor={`checkbox-${exigency.id}`} className="sr-only">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">{exigency.id}</td>
                                                    <td className="px-4 py-2">{exigency.exigency_title}</td>
                                                    <td className="px-4 py-2">{exigency.exigency_description}</td>
                                                    <td className="px-4 py-2">
                                                        <div className="relative">
                                                            <select
                                                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                                defaultValue=""
                                                            >
                                                                <option value="" disabled>
                                                                    Select Status
                                                                </option>
                                                                <option value="conformed">Conforme</option>
                                                                <option value="nc_major">NC Majeur</option>
                                                                <option value="non_conformed">Non Conforme</option>
                                                                <option value="nc_minor">NC Mineur</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 flex py-2">
                                                        <a href="#" className="hover:text-blue-600">
                                                            <svg
                                                                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </a>
                                                        <a href="#" className="ml-3 hover:text-red-600">
                                                            <svg
                                                                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-800 size-6"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                            </React.Fragment>
                        ))}
            </React.Fragment>
        ))}
    </tbody>
</table>

        </div>
    );
}

export default DiagnosticsTable;