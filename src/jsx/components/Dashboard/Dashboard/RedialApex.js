// import React from "react";
// import ReactApexChart from "react-apexcharts";

// class RedialApex extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			series: [70],
// 			options: {
// 				chart: {
// 					type: 'radialBar',
// 					height: 300,
// 					offsetY: 0,
// 					sparkline: {
// 						enabled: true
// 					}
// 				},
// 				plotOptions: {
// 					radialBar: {
// 						startAngle: -190,
// 						endAngle: 190,
// 						track: {
// 							background: "var(--rgba-primary-1)",
// 							strokeWidth: '100%',
// 							margin: 5,
// 						},
// 						dataLabels: {
// 							enabled: false,	
// 							name: {
// 								show: false
// 							},
// 							value: {
// 								offsetY: 5,
// 								fontSize: '22px',
// 								color:'var(--primary)',
// 								fontWeight:700,
// 							}
// 						},
// 					},
// 				},
// 				responsive: [{
// 					breakpoint: 1600,
// 					  options: {
// 						chart: {
// 							height:200
// 						},
// 					}
// 				}],
// 				grid: {
// 					padding: {
// 						top: -10
// 					}
// 				},
// 				fill: {
// 					type: 'gradient',
// 					colors:'var(--primary)',
// 				},
// 				labels: [""],					
// 			},
// 		};
// 	}

// 	render() {
// 		return (
// 			<div id="chart" >
// 				<ReactApexChart
// 				  options={this.state.options}
// 				  series={this.state.series}
// 				  type="radialBar"
// 				  height={300} 
// 				/>
// 			</div>
// 		);
// 	}
// }

// export default RedialApex;