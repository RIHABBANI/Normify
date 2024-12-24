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

                const initialChaptersExpanded = {};
                const initialSubChaptersExpanded = {};
                chaptersData.forEach(chapter => {
                    initialChaptersExpanded[chapter.id] = false;
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
        event.stopPropagation();
        setExpandedSubChapters(prev => ({
            ...prev,
            [subChapterId]: !prev[subChapterId]
        }));
    };

    const renderExigencyRow = (exigency, subChapterId) => (
        <tr key={`exigency-${subChapterId}-${exigency.id}`} className="bg-white hover:bg-gray-50">
            <td className="w-10 px-2 py-2">
                <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
            </td>
            <td className="px-4 py-2 text-center">{exigency.id}</td>
            <td className="px-4 py-2">{exigency.exigency_title}</td>
            <td className="px-4 py-2">{exigency.exigency_description}</td>
            <td className="px-4 py-2">
                <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    <option value="" disabled selected>Select</option>
                    <option value="conformed">Conforme</option>
                    <option value="nc_major">NC Majeur</option>
                    <option value="non_conformed">Non Conforme</option>
                    <option value="nc_minor">NC Mineur</option>
                </select>
            </td>
            <td className="px-4 py-2">
                <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-600">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-600">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );

    const renderSubChapterRow = (subChapter, chapterId) => {
        const rows = [];
        rows.push(
            <tr key={`subchapter-${chapterId}-${subChapter.id}`} className="bg-gray-50 hover:bg-gray-100">
                <td colSpan="6" className="px-2 py-2">
                    <button 
                        className="flex items-center w-full text-left pl-8"
                        onClick={(e) => toggleSubChapter(subChapter.id, e)}
                    >
                        <svg
                            className={`w-4 h-4 mr-2 transform transition-transform ${expandedSubChapters[subChapter.id] ? 'rotate-90' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium">{subChapter.sub_chapter_title}</span>
                    </button>
                </td>
            </tr>
        );

        if (expandedSubChapters[subChapter.id]) {
            const filteredExigencies = exigencies.filter(exigency => exigency.norm_sub_chapter_id === subChapter.id);
            filteredExigencies.forEach(exigency => {
                rows.push(renderExigencyRow(exigency, subChapter.id));
            });
        }

        return rows;
    };

    const renderChapterRow = (chapter) => {
        const rows = [];
        rows.push(
            <tr key={`chapter-${chapter.id}`} className="bg-blue-50 hover:bg-blue-100">
                <td colSpan="6" className="px-2 py-2">
                    <button 
                        className="flex items-center w-full text-left"
                        onClick={() => toggleChapter(chapter.id)}
                    >
                        <svg
                            className={`w-4 h-4 mr-2 transform transition-transform ${expandedChapters[chapter.id] ? 'rotate-90' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-semibold">{chapter.chapter_ref} {chapter.chapter_title}</span>
                    </button>
                </td>
            </tr>
        );

        if (expandedChapters[chapter.id]) {
            const filteredSubChapters = subChapters.filter(subChapter => subChapter.norm_chapter_id === chapter.id);
            filteredSubChapters.forEach(subChapter => {
                rows.push(...renderSubChapterRow(subChapter, chapter.id));
            });
        }

        return rows;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs bg-gray-50 uppercase">
                    <tr>
                        <th className="w-10 px-2 py-3">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                            />
                        </th>
                        <th className="px-4 py-3 text-center">ID</th>
                        <th className="px-4 py-3">EXIGENCE TITLE</th>
                        <th className="px-4 py-3">EXIGENCE DESCRIPTION</th>
                        <th className="px-4 py-3">EVALUATION</th>
                        <th className="px-4 py-3">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map(chapter => renderChapterRow(chapter)).flat()}
                </tbody>
            </table>
        </div>
    );
};

export default DiagnosticsTable;