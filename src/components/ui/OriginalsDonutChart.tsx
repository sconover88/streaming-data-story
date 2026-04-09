import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface OriginalsDonutChartProps {
  originals: number; // percent
  licensed: number; // percent
  platformColor: string;
  platformName: string;
}

const COLORS = ['#a259ec', '#6366f1'];

export function OriginalsDonutChart({ originals, licensed, platformColor, platformName }: OriginalsDonutChartProps) {
  const data = [
    { name: 'Originals', value: originals },
    { name: 'Licensed', value: licensed },
  ];
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={40}
            outerRadius={55}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell key="originals" fill={platformColor} />
            <Cell key="licensed" fill="#6366f1" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-sm text-white mt-2 font-semibold">{platformName}</div>
      <div className="text-xs text-gray-300">Originals: <span className="text-white font-bold">{originals}%</span></div>
    </div>
  );
}
