import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexPie4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // series: [42, 47, 52, 58],
      series: [100, 47, 52],

      options: {
        chart: {
          // width: 300,
          type: "polarArea",
          sparkline: {
            enabled: true,
          },
        },
        // labels: ["Total", "Active", "Inactive", "Economic"],
        labels: ["Total", "Active", "Inactive"],
        fill: {
          opacity: 1,
          colors: ["#709fba", "#ff5c00", "#00a15d", "#3693ff"],
        },
        stroke: {
          width: 0,
          colors: undefined,
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: "bottom",
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0,
            },
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: "light",
            shadeIntensity: 0.6,
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="polarArea"
          height={251}
          // width={300}
        />
      </div>
    );
  }
}

export default ApexPie4;
