import React, { FC, useRef, useEffect, useState } from "react";
import D3BarChart from "../../charts/BarChart";
import Margin from "../../charts/utils/Margin";
import ReactResizeDetector from "react-resize-detector";

interface BarChartProps {
    dataset?: number[];
}

const BarChart: FC<BarChartProps> = ({ dataset = [] }) => {
    const svg = useRef();
    const barChart = useRef<D3BarChart>();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!svg.current) return;

        if (!barChart.current) barChart.current = new D3BarChart(svg.current);

        barChart.current
            .setData(
                dataset.map((value, index) => ({ label: `${index}`, value }))
            )
            .setSize(width, height)
            .setMargin(new Margin(50, 30, 30, 30))
            .render();
    }, [svg.current, width, height]);

    return (
        <ReactResizeDetector handleWidth handleHeight>
            {({ width, height }) => {
                setWidth(width);
                setHeight(height);
                return <svg ref={svg} width={width} height={height}></svg>;
            }}
        </ReactResizeDetector>
    );
};

export default BarChart;
