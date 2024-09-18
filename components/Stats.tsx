"use client";

import { actionGetAllTagsForUser } from "@/actions/tags";
import { actionGetAllTasksForUser } from "@/actions/tasks";
import { actionGetAllSessionsForUser } from "@/actions/sessions";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Stats = () => {
  // Explicitly define the types for state variables
  const [taskData, setTaskData] = useState<
    Array<{ status: string; count: number }>
  >([]);
  const [tagData, setTagData] = useState<
    Array<{ tagDesc: string; count: number }>
  >([]);
  const [sessionData, setSessionData] = useState<
    Array<{ date: string; sessions: number; focusTime: number }>
  >([]);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (user) {
          const data = await actionGetAllTasksForUser(user.id);

          const taskCounts = data.reduce(
            (acc: { [key: string]: number }, task) => {
              const status = task.status as string;
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            },
            {}
          );

          const chartData = Object.entries(taskCounts).map(
            ([status, count]) => ({
              status,
              count,
            })
          );
          setTaskData(chartData); // No more TypeScript error here
        }
      } catch (error) {
        console.error("Failed to fetch task data:", error);
      }
    };

    const fetchTagData = async () => {
      try {
        if (user) {
          const tags = await actionGetAllTagsForUser(user.id);
          const tagCounts = tags.reduce((acc, tag) => {
            const taskCount = tag.taskIDs.length;
            acc[tag.tagDesc] = (acc[tag.tagDesc] || 0) + taskCount;
            return acc;
          }, {});
          const tagChartData = Object.entries(tagCounts).map(
            ([tagDesc, count]) => ({
              tagDesc,
              count,
            })
          );
          setTagData(tagChartData);
        }
      } catch (error) {
        console.error("Failed to fetch tag data:", error);
      }
    };

    const fetchSessionData = async () => {
      try {
        if (user) {
          const sessions = await actionGetAllSessionsForUser(user.id);
          const sessionCounts = sessions.reduce((acc, session) => {
            const date = new Date(session.startTime)
              .toISOString()
              .split("T")[0];
            const focusTime = session.focusDuration;
            if (!acc[date]) {
              acc[date] = { sessions: 0, focusTime: 0 };
            }
            acc[date].sessions += 1;
            acc[date].focusTime += focusTime;
            return acc;
          }, {});
          const sessionChartData = Object.entries(sessionCounts).map(
            ([date, { sessions, focusTime }]) => ({
              date,
              sessions,
              focusTime,
            })
          );
          setSessionData(sessionChartData);
          console.log("Fetched session data:", sessionChartData);
        }
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      }
    };

    if (user) {
      fetchTaskData();
      fetchTagData();
      fetchSessionData();
    }
  }, [user]);

  const renderCustomLabel = (entry) => {
    return `${entry.tagDesc}`;
  };

  if (user) {
    console.log("Session Data for Chart:", sessionData);
    return (
      <div className="p-8 flex flex-col h-full gap-2.5 overflow-y-auto">
        {/* Task Status Overview */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Task Status Overview</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={taskData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tag Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Tag Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={tagData}
                dataKey="count"
                nameKey="tagDesc"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={renderCustomLabel}
                labelLine={false}
              >
                {tagData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sessions Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Sessions Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={sessionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Sessions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Focus Time (mins)",
                  angle: -90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sessions"
                stroke="#8884d8"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="focusTime"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
