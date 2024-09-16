"use client";

import { actionGetAllTagsForUser } from "@/actions/tags";
import { actionGetAllTasksForUser } from "@/actions/tasks";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Stats = () => {
  const [taskData, setTaskData] = useState<
    Array<{ status: string; count: number }>
  >([]);
  const [tagData, setTagData] = useState<
    Array<{ tagDesc: string; count: number }>
  >([]);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (user) {
          const data = await actionGetAllTasksForUser(user!.id);
          const taskCounts = data.reduce(
            (acc: { [key: string]: number }, task) => {
              acc[task.status] = (acc[task.status] || 0) + 1;
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
          setTaskData(chartData);
        }
      } catch (error) {
        console.error("Failed to fetch task data:", error);
      }
    };

    const fetchTagData = async () => {
      try {
        if (user) {
          const tags = await actionGetAllTagsForUser(user!.id);
          const tagCounts = tags.reduce(
            (acc: { [key: string]: number }, tag) => {
              const taskCount = tag.taskIDs.length;
              acc[tag.tagDesc] = (acc[tag.tagDesc] || 0) + taskCount;
              return acc;
            },
            {}
          );
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

    if (user) {
      fetchTaskData();
      fetchTagData();
    }
  }, [user]);

  const renderCustomLabel = (entry: any) => {
    return `${entry.tagDesc}`;
  };

  if (user) {
    return (
      <div className="p-8 flex flex-col h-[75%] gap-2.5">
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
      </div>
    );
  }
};
