import * as d3 from "d3";
import Margin from "./utils/Margin";

export interface BarChartSeries {
    label: string;
    value: number;
}

export default class BarChart {
    private context: d3.Selection<SVGGElement, unknown, null, undefined>;
    private data: BarChartSeries[];
    private xScale = d3.scaleBand().padding(0.1);
    private yScale = d3.scaleLinear();
    private height: number;
    private width: number;
    private margin: Margin;
    private xAxis: d3.Selection<SVGGElement, unknown, null, undefined>;
    private yAxis: d3.Selection<SVGGElement, unknown, null, undefined>;

    constructor(context: SVGElement) {
        this.context = d3.select(context).append("g");
        this.appendXAxis();
        this.appendYAxis();
    }

    private appendXAxis(): BarChart {
        this.xAxis = this.context.append("g");
        return this;
    }

    private appendYAxis(): BarChart {
        this.yAxis = this.context.append("g");
        return this;
    }

    private updateXAxis(): BarChart {
        return this;
    }

    private updateYAxis(): BarChart {
        this.yAxis.call(d3.axisLeft(this.yScale));
        return this;
    }

    setMargin(margin: Margin): BarChart {
        this.margin = margin;
        this.setSize(
            this.width - margin.left - margin.right,
            this.height - margin.top - margin.bottom
        );
        this.context.attr(
            "transform",
            `translate(${margin.left}, ${margin.right})`
        );
        return this;
    }

    setSize(width: number, height: number): BarChart {
        this.width = width;
        this.height = height;
        this.updateScales();
        return this;
    }

    setData(data: BarChartSeries[]): BarChart {
        this.data = data;
        this.updateDomains();
        return this;
    }

    updateScales(): BarChart {
        this.xScale = this.xScale.range([0, this.width]);
        this.yScale = this.yScale.range([this.height, 0]);
        this.updateXAxis();
        this.updateYAxis();
        return this;
    }

    updateDomains(): BarChart {
        this.xScale.domain(this.data.map(d => d.label));
        this.yScale.domain([0, d3.max(this.data, d => d.value)]);
        this.updateXAxis();
        this.updateYAxis();
        return this;
    }

    render(): BarChart {
        const selectionWithBoundData = this.context
            .selectAll(".bar")
            .data<BarChartSeries>(this.data);

        selectionWithBoundData.exit().remove();

        const enter = selectionWithBoundData
            .enter()
            .append("rect")
            .attr("class", "bar");

        selectionWithBoundData
            .merge(enter)
            .attr("width", this.xScale.bandwidth())
            .attr("y", d => this.yScale(d.value))
            .attr("height", d => this.height - this.yScale(d.value))
            .transition()
            .duration(100)
            .attr("x", d => this.xScale(d.label));
        return this;
    }
}
