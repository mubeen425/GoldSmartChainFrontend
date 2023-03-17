import React from "react";
import ReactApexChart from "react-apexcharts";

class Emailchart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [27, 11, 22,15,25],
			options: {
				chart: {
					type: 'donut',
					height: 250,
				},
				dataLabels: {
				  enabled: false,
				},
				stroke: {
				  width: 0,
				},
				colors:['#8621C3', 'var(--primary)', '#FAF119','#FF5151','#6499FF'],

				legend: {
					position: 'bottom',
					show:false
				},
				responsive: [
					{
						breakpoint: 1800,
						options: {
							chart: {
								height:200
							},
						}
					},
					{
						breakpoint: 1800,
						options: {
							chart: {
								height:200
							},
						}
					}
				]
			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={250} 
				/>
			</div>
		);
	}
}

export default Emailchart;