"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ChartBarProps {
  data: Array<{ label: string; value: number; color: string }>;
  maxValue?: number;
  height?: number;
}

export const ChartBar: React.FC<ChartBarProps> = ({ 
  data, 
  maxValue = Math.max(...data.map(d => d.value)), 
  height = 300 
}) => {
  return (
    <div className="w-full" style={{ height: height + 60 }}>
      <div className="flex items-end justify-between h-full pb-8">
        {data.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex flex-col items-center justify-end flex-1 mx-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="w-full rounded-t-lg relative"
              style={{ backgroundColor: item.color }}
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * height}px` }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
            >
              {/* Value label on top of bar */}
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
              >
                {item.value}
              </motion.div>
            </motion.div>
            
            {/* Label below bar */}
            <motion.div
              className="text-[#BABABA] text-xs mt-2 text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.4 }}
            >
              {item.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  size = 200, 
  strokeWidth = 20 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#2A2A2A"
            strokeWidth={strokeWidth}
          />
          
          {/* Data segments */}
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
            
            const segment = (
              <motion.circle
                key={item.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              />
            );
            
            accumulatedPercentage += percentage;
            return segment;
          })}
        </svg>
        
        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-2xl font-bold text-white">{total}</span>
          <span className="text-[#BABABA] text-xs">Total</span>
        </motion.div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-4 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#BABABA] text-sm">
              {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

interface LineChartProps {
  data: Array<{ x: string; y: number }>;
  height?: number;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  height = 200, 
  color = "#FF8500" 
}) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.y));
  const minValue = Math.min(...data.map(d => d.y));
  const range = maxValue - minValue || 1;

  const width = 400;
  const padding = 40;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (((point.y - minValue) / range) * (height - padding * 2)) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <motion.svg
        width={width}
        height={height + 40}
        className="overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A2A2A" strokeWidth="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Line */}
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - (((point.y - minValue) / range) * (height - padding * 2)) - padding;
          
          return (
            <motion.g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
              />
              <motion.text
                x={x}
                y={y - 15}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
              >
                {point.y.toFixed(1)}
              </motion.text>
            </motion.g>
          );
        })}

        {/* X-axis labels */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
          
          return (
            <motion.text
              key={index}
              x={x}
              y={height + 20}
              textAnchor="middle"
              className="fill-[#BABABA] text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.4 }}
            >
              {point.x}
            </motion.text>
          );
        })}
      </motion.svg>
    </div>
  );
};