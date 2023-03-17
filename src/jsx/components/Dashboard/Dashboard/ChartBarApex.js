import React from "react";
import ReactApexChart from "react-apexcharts";

class ChartBarApex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [
				{
					name: 'Running',
					data: [50, 18, 90, 40, 90],
					//radius: 12,	
				}, 
				{
				  name: 'Cycling',
				  data: [80, 40, 55, 20, 45]
				}, 				
			],
			options: {
				chart: {
					type: 'bar',
					height: 350,
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '60%',
						endingShape: "rounded",
						borderRadius: 12,
					},
				},
				states: {
					hover: {
						filter: 'none',
					}
				},
				colors:['#008F53', '#FF5E4B'],
				//colors:['var(--primary)'],
				dataLabels: {
					enabled: false,
				},
				markers: {
					shape: "circle",
				},
				legend: {
					show: false,
					fontSize: '12px',
					labels: {
						colors: '#000000',
						
						},
					markers: {
					width: 18,
					height: 18,
					strokeWidth: 10,
					strokeColor: '#fff',
					fillColors: undefined,
					radius: 12,	
					}
				},
				stroke: {
				  show: true,
				  width: 4,
				  curve: 'smooth',
				  lineCap: 'round',
				  colors: ['transparent']
				},
				grid: {
					borderColor: '#eee',
				},
				xaxis: {
					position: 'bottom',
					categories: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05'],
					labels: {
					   style: {
						  colors: '#787878',
						  fontSize: '13px',
						  fontFamily: 'poppins',
						  fontWeight: 100,
						  cssClass: 'apexcharts-xaxis-label',
						},
					},
					crosshairs: {
						show: false,
					}
				},
				yaxis: {
					labels: {
						offsetX:-16,
					    style: {
						  colors: '#787878',
						  fontSize: '13px',
						   fontFamily: 'poppins',
						  fontWeight: 100,
						  cssClass: 'apexcharts-xaxis-label',
					  },
				  },
				},
				fill: {
					type: 'gradient',
					gradient: {
						shade: 'white',
						type: "vertical",
						shadeIntensity: 0.2,
						gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
						inverseColors: true,
						opacityFrom: 1,
						opacityTo: 1,
						stops: [0, 50, 50],
						colorStops: []
					}
				}, 
				tooltip: {
					y: {
						formatter: function (val) {
						  return "$ " + val + " thousands"
						}
					}
				},
				
			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="bar"
				  height={350} 
				/>
			</div>
		);
	}
}

export default ChartBarApex;