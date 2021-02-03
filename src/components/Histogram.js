import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";

function Histogram({ postsDistribution }) {
  const graphColor = "rgba(23, 233, 217, .5)";
  const attributes = {
    width: 800,
    height: 800,
    rectBackgroundColor: "#282c34",
    margin: { top: 10, bottom: 10, left: 10, right: 10 },
  };

  const xMax = attributes.width;
  const yMax = attributes.height - 120;

  const getMonth = (p) => p.month;
  const getDistribution = (d) => d.postNumber;

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: postsDistribution.map(getMonth),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...postsDistribution.map(getDistribution))],
      }),
    [yMax]
  );

  return (
    <svg width={attributes.width} height={attributes.height}>
      <rect
        x={0}
        y={0}
        width={attributes.width - 100}
        height={attributes.height - 100}
        fill={attributes.rectBackgroundColor}
      />
      <AxisLeft
        left={10}
        top={10}
        tickFormat={getDistribution}
        scale={yScale}
        stroke={graphColor}
        tickStroke={graphColor}
      />
      <Group top={10}>
        {postsDistribution.map((d) => {
          const events = false;
          const value = getDistribution(d);
          const month = getMonth(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getDistribution(d)) ?? 0);
          const barX = xScale(month);
          const barY = yMax - barHeight;
          return (
            <Group key={`bar-${month}`}>
              <text
                x={barX}
                y={720}
                fontSize={11}
                fill={graphColor}
                textAnchor="start"
              >
                {month}
              </text>

              <text
                x={value < 10 ? barX + 16 : barX + 13}
                y={barY + 20}
                fontSize={11}
                fill={value > 0 ? "white" : attributes.rectBackgroundColor}
                textAnchor="start"
              >
                {value}
              </text>

              <Bar
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={graphColor}
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              />
            </Group>
          );
        })}
      </Group>

      <AxisBottom
        left={0}
        top={710}
        tickFormat={getMonth}
        scale={xScale}
        stroke={graphColor}
        tickStroke={graphColor}
      />
    </svg>
  );
}

export default Histogram;
