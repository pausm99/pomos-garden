"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useUser } from "@clerk/nextjs";
import { actionGetAllTasksForUser } from "@/actions/tasks";
import { actionGetAllTagsForUser } from "@/actions/tags";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Stats = () => {
  const [taskData, setTaskData] = useState<
    Array<{ status: string; count: number }>
  >([]);
  const [tagData, setTagData] = useState<
    Array<{ tagDesc: string; count: number }>
  >([]);

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await actionGetAllTasksForUser("66c60077cfa9f183ca355e23");
        const taskCounts = data.reduce(
          (acc: { [key: string]: number }, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
          },
          {}
        );
        const chartData = Object.entries(taskCounts).map(([status, count]) => ({
          status,
          count,
        }));
        setTaskData(chartData);
      } catch (error) {
        console.error("Failed to fetch task data:", error);
      }
    };

    const fetchTagData = async () => {
      try {
        const tags = await actionGetAllTagsForUser("66c60077cfa9f183ca355e23");
        const tagCounts = tags.reduce((acc: { [key: string]: number }, tag) => {
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
      } catch (error) {
        console.error("Failed to fetch tag data:", error);
      }
    };

    if (isSignedIn && user.id) {
      fetchTaskData();
      fetchTagData();
    }
  }, [isSignedIn, user]);

  const renderCustomLabel = (entry: any) => {
    return `${entry.tagDesc}`;
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>You must be signed in to view this page</div>;
  }

  if (isSignedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Analytics Dashboard for User: {user.fullName}
        </h1>
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
