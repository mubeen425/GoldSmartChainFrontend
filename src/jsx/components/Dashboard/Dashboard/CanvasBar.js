// import React, { Component } from "react";
// import { Line } from "react-chartjs-2";



// class CanvasBar extends Component {
//   render() {
//     var activityData = [
// 		{
// 			first: [ 30, 35, 30, 50, 30, 50, 40, 45],
// 			second: [ 20, 25, 20, 15, 25, 22, 24, 20]
			
// 		},
// 		{
// 			first: [ 35, 35, 40, 30, 38, 40, 50, 38],
// 			second: [ 30, 20, 35, 20, 25, 30, 25, 20]
			
// 		},
// 		{
// 			first: [ 35, 40, 40, 30, 38, 32, 42, 32],
// 			second: [ 20, 25, 35, 25, 22, 21, 21, 38]
			
// 		},
// 		{
// 			first: [ 35, 40, 30, 38, 32, 42, 30, 35],
// 			second: [ 25, 30, 35, 25, 20, 22, 25, 38]
		
// 		}
//     ];
//     const data = {
// 		labels: ["1","2","3","4","5",],
// 		datasets: [{
// 				label: "Active",
// 				backgroundColor: "rgba(82, 177, 65, 0)",
// 				borderColor: "#3FC55E",
// 				data: activityData[this.props.dataActive].first,
// 				borderWidth: 6,
// 				tension:0.4
// 			},
// 			{
// 				label: "Inactive",
// 				backgroundColor: 'rgba(255, 142, 38, 0)',
// 				borderColor: "#4955FA",
// 				data: activityData[this.props.dataActive].second,
// 				borderWidth: 6,
// 				tension:0.4
				
// 			},
// 		]};

//     const options = {
// 		responsive: true,
// 		maintainAspectRatio: false,
// 		plugins:{
// 			legend: {
// 				display: false,
// 			},
// 		},
// 		elements: {
// 			point:{
// 				radius: 0
// 			}
// 		},
// 		scales: {
// 			y:{
// 				gridLines: {
// 					color: "rgba(89, 59, 219,0.1)",
// 					drawBorder: true
// 				},
// 				ticks: {
// 					fontSize: 14,
// 					fontColor: "#6E6E6E",
// 					fontFamily: "Poppins"
// 				},
// 			},
				
// 			x: {
// 				//FontSize: 40,
// 				grid: {
// 					display: false,
// 					zeroLineColor: "transparent"
// 				},
// 				ticks: {
// 					fontSize: 14,
// 					stepSize: 5,
// 					fontColor: "#6E6E6E",
// 					fontFamily: "Poppins"
// 				}
// 			}
// 		},
// 		tooltips: {
// 			enabled: false,
// 			mode: "index",
// 			intersect: false,
// 			titleFontColor: "#888",
// 			bodyFontColor: "#555",
// 			titleFontSize: 12,
// 			bodyFontSize: 15,
// 			backgroundColor: "rgba(256,256,256,0.95)",
// 			displayColors: true,
// 			xPadding: 10,
// 			yPadding: 7,
// 			borderColor: "rgba(220, 220, 220, 0.9)",
// 			borderWidth: 2,
// 			caretSize: 6,
// 			caretPadding: 10
// 		}      
//     };

//     return (
//       <div style={{ minHeight: "235px" }}>
//         <Line
// 			data={data}
// 			width={this.props.width ? this.props.width : 433}
// 			height={this.props.height ? this.props.height : 300}
// 			options={options}
//         />
//       </div>
//     );
//   }
// }
// export default CanvasBar;