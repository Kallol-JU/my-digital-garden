import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080/api";

export default function List100() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`${API_URL}/list100`);
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching list 100:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="animate-fade-in max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">List 100</h1>

      <div className="text-gray-600 mb-12 space-y-2 leading-relaxed">
        <p>Created on September 13, 2025.</p>
        <p>
          Note: I have intentionally decided to never add/remove any items from
          this list. It is here to capture a moment in time when I was a
          3rd-year student and thought I wanted all of the following things to
          happen before I turn 100.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading list...</p>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="flex items-center gap-4 text-sm font-bold text-gray-900 mb-10">
            <span>
              {completedCount} of {totalCount} done ({percentage}%)
            </span>
            <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-800 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <ul className="space-y-6">
            {goals.map((goal) => (
              <li key={goal._id} className="flex gap-2">
                {goal.completed ? (
                  <span className="text-gray-400 line-through">
                    ✓ {goal.text}
                  </span>
                ) : (
                  <span className="text-gray-800">— {goal.text}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
