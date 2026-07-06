"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type Task = {
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
  createdAt: number;
};

type CalendarViewProps = {
  tasks: Task[];
};

export default function CalendarView({
  tasks,
}: CalendarViewProps) {
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date()
  );

  const selectedDateString = selectedDate
    .toISOString()
    .split("T")[0];

  const tasksForDay = tasks.filter(
    (task) => task.dueDate === selectedDateString
  );

  return (
    <section
      id="calendar"
      className={`mt-20 transition-all duration-300 ${
        theme === "dark"
          ? "text-white"
          : "text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">
        📅 Calendar
      </h2>

      <div
        className={`rounded-xl p-6 ${
          theme === "dark"
            ? "bg-slate-800"
            : "bg-white shadow-md border border-gray-200"
        }`}
      >
        <Calendar
          onChange={(value) =>
            setSelectedDate(value as Date)
          }
          value={selectedDate}
          className="w-full rounded-lg"
          tileContent={({ date }) => {
            const dateString = date
              .toISOString()
              .split("T")[0];

            const hasTask = tasks.some(
              (task) => task.dueDate === dateString
            );

            return hasTask ? (
              <div className="flex justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            ) : null;
          }}
        />
      </div>

      <div
        className={`rounded-xl p-6 mt-8 ${
          theme === "dark"
            ? "bg-slate-800"
            : "bg-white shadow-md border border-gray-200"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">
          Tasks on {selectedDateString}
        </h3>

        {tasksForDay.length === 0 ? (
          <p>No tasks for this day.</p>
        ) : (
          <ul className="space-y-3">
            {tasksForDay.map((task) => (
              <li
                key={task.createdAt}
                className="flex justify-between items-center"
              >
                <span>{task.text}</span>

                <span>
                  {task.completed ? "✅" : "⏳"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}