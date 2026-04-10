import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CustomLegend } from '../ui/CustomLegend';
import { ChartWrapper } from '../ui/ChartWrapper';

interface LineChartBaseProps {
  title: string;
  desc: string;
  data: any[];
  legendItems: { label: string; color: string }[];
  yAxisLabel: string;
  lines: { key: string; color: string }[];
  height?: number;
}

export function LineChartBase({
  title,
  desc,
  data,
  legendItems,
  yAxisLabel,
  lines,
  height = 360,
}: LineChartBaseProps) {
  return (
    <ChartWrapper title={title} desc={desc}>
      {/* Legend removed as per user request */}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#ccc', fontSize: 12 }}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#ccc', fontSize: 13, dy: 0, textAnchor: 'middle' }}
          />
          <Tooltip
            contentStyle={{ background: '#18181b', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(162,89,236,0.08)' }}
          />
          {lines.map(line => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
