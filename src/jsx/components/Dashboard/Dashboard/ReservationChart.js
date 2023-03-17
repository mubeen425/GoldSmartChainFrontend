import React from "react";
import ReactApexChart from "react-apexcharts";

class ReservationChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [{
				name: 'series1',
				data: [400, 600, 200, 500, 900, 200, 300 ,100]
			}, 
			{
			  name: 'series2',
			  data: [200, 400, 250, 200, 300, 100, 400, 100]
			}],

			options: {
				chart: {
					type: 'line',
					height: 350,
					toolbar: {
						show: false,
					},
				},
				colors:["var(--primary)",'#FF5E4B'],
				//colors:['var(--primary)'],
				dataLabels: {
					enabled: false,
				},
				stroke: {
					width:6,
					curve: 'smooth',
				},
				legend:{
					show:false
				},
				grid:{
					borderColor: '#EBEBEB',
					strokeDashArray: 6,
				},
				markers:{
					strokeWidth: 6,
					 hover: {
					  size: 15,
					}
				},
				yaxis: {
					labels: {
						offsetX:-12,
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
							
						}
					},
				},
				xaxis: {
					categories: ["April","May","June","July","August","September","October","November"],
					labels:{
						  style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
							
						},
					}
				},
				fill:{
					type:"",
					opacity:1
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
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
				  type="line"
				  height={350} 
				/>
			</div>
		);
	}
}

export default ReservationChart;