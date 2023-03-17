// import React, { Component } from "react";
// import ChatWindow from "./ChatWindow";
// import ChatComposer from "./ChatComposer";
// import {Link} from 'react-router-dom';
// import {Dropdown} from 'react-bootstrap';
// import PerfectScrollbar from "react-perfect-scrollbar";
// //import pic1 from './../../../../images/profile/Untitled-2.jpg';

// class ChatRoom extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			messages: [
// 				//{ text: "Ok, thank you have a good day" },
// 				//{ text: "Ok, thank you have a good day" },
// 				{ text: "Ok, thank you have a good day" },
// 			]
// 		};
// 	}

//   // if new message was submitted from child component // process
// 	submitted = getNewMessage => {		
// 		if (getNewMessage !== "") {
// 		  // match the state format
// 			const newMessage = { text: getNewMessage };
// 			// merge new message in copy of state stored messages
// 			let updatedMessages = [...this.state.messages, newMessage];
// 			// update state
// 			this.setState({
// 			  messages: updatedMessages
// 			});
			
// 			setTimeout(function(){
// 				var element = document.getElementById("chartBox");
// 				element.scrollTop = element.scrollHeight - 100;	
// 			}, 50);
			
// 		}		
// 	};
// 	render() {		
// 		return (
			
// 				<>
// 					<div className="d-flex justify-content-between align-items-center border-bottom px-4 pt-4 flex-wrap">
// 						<div className="d-flex align-items-center pb-3">
// 							<div className="fillow-design">
// 								<Link to={"#"}><i className="fas fa-user-friends"></i></Link>
// 							</div>
// 							<div className="ms-3">
// 								<h4 className="fs-20 font-w700">Weekly Meet</h4>
// 								<span>We share about daily life as designer in the world</span>
// 							</div>
// 						</div>
// 						<div className="activity d-flex align-items-center pb-3">
// 							<ul className="d-flex">
// 								<li><Link to={"#"}><i className="fas fa-video"></i></Link></li>
// 								<li><Link to={"#"}><i className="fas fa-search"></i></Link></li>
// 								<li><Link to={"#"}><i className="fas fa-star text-orange"></i></Link></li>
// 							</ul>
// 							<Dropdown className="dropdown ms-2">
// 								<Dropdown.Toggle as="div" className="btn-link i-false" >
// 									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 										<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
// 										<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
// 										<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
// 									</svg>
// 								</Dropdown.Toggle>
// 								<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
// 									<Dropdown.Item>Delete</Dropdown.Item>
// 									<Dropdown.Item>Edit</Dropdown.Item>
// 								</Dropdown.Menu>
// 							</Dropdown>
// 						</div>
// 					</div>
					
					
					
// 					<PerfectScrollbar className="dlab-scroll" id="chartBox" >
// 					{/* send stored messages as props to chat window */}
// 						<ChatWindow messagesList={this.state.messages} />
// 						{/* send submitted props to chat composer */}
// 					</PerfectScrollbar>
// 					<div className="card-footer border-0">
// 						<ChatComposer submitted={this.submitted} />
// 					</div>
					
										
// 				</>
				
// 		);
// 	}
// }

// export default  ChatRoom;