import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Timeline() {
    const [events, setEvents] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2026');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/timeline');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching timeline:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTimeline();
    }, []);

    const years = ['2026', '2025', '2024'];

    // Filter events by the selected year tab
    const filteredEvents = events.filter(event => {
        const eventYear = new Date(event.date).getFullYear().toString();
        return eventYear === selectedYear;
    });

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Timeline</h1>
            <p className="text-gray-600 mb-8">A running log of moments, milestones, and little proofs of progress.</p>

            {/* Year Tabs */}
            <div className="flex gap-6 mb-12 border-b border-gray-100 pb-4 text-sm font-medium">
                {years.map(year => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`transition-colors ${selectedYear === year ? 'text-gray-900 font-bold underline' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-gray-400 text-sm">Loading timeline...</p>
            ) : (
                <div className="border-l border-gray-100 ml-2 space-y-10 pb-8">
                    {filteredEvents.length === 0 ? (
                        <p className="text-gray-400 text-sm pl-8">No events logged for {selectedYear}.</p>
                    ) : (
                        filteredEvents.map((event) => {
                            const formattedDate = new Date(event.date).toLocaleDateString('en-US', { month: 'short', numeric: 'numeric' }).replace(',', '');

                            return (
                                <div key={event._id} className="relative pl-8 group">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-gray-200 rounded-full group-hover:bg-emerald-500 transition-colors duration-300"></div>

                                    <div className="text-sm">
                                        {event.link ? (
                                            <a
                                                href={event.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                {event.title}
                                            </a>
                                        ) : (
                                            <span className="text-gray-900 font-medium">{event.title}</span>
                                        )}

                                        <span className="text-gray-400"> — {formattedDate} {event.description && `· ${event.description}`}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}