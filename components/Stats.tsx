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

export const Stats = () => {
  const [taskData, setTaskData] = useState<
    Array<{ status: string; count: number }>
  >([]);
  const [tagData, setTagData] = useState<
    Array<{ tagDesc: string; count: number }>
  >([]);

  const COLORS = generateUniqueColors(tagData.length)

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
      <div className="h-full overflow-y-auto p-8 flex flex-col gap-2.5">
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
                    fill={COLORS[index]}
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

export function generateUniqueColors(numberOfColors: number) {
  const colors = [];
  const hueStep = 360 / numberOfColors;

  for (let i = 0; i < numberOfColors; i++) {
    const hue = i * hueStep;
    const saturation = 50 + Math.random() * 50; // Saturación aleatoria entre 50% y 100%
    const lightness = 40 + Math.random() * 20;  // Luminosidad aleatoria entre 40% y 60%

    const color = hslToHex(hue, saturation, lightness);
    colors.push(color);
  }

  return colors;
}

// Convertir HSL a HEX
function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (300 <= h && h < 360) {
    [r, g, b] = [c, 0, x];
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
