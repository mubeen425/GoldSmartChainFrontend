// import React, { Component } from "react";
// //import {Link} from 'react-router-dom';



// import cont3 from './../../../../images/contacts/3.jpg';
// import g1 from './../../../../images/group/g1.jpg';

// // we are using class component here bcoz functional components cant use react life cycle hooks such as componentDidUpdate
// export default class ChatWindow extends Component {
//   // if this component received new props, move scroll chat window
//   // to view latest message
//   componentDidUpdate = (prevProps, prevState) => {
//     // if component received new props
//     if (this.props.messagesList !== prevProps.messagesList) {
//       // call ref and scroll
//       this.messageListEnd.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   render() {
//     // messagesList the got the messages stored in state
//     // destructuring
//     const { messagesList } = this.props;
//     return (	
// 		<div className="chat-window">
// 			<div className="chat-box-area chat-box-area">
// 				<div className=" dz-scroll" id="ChatWindowInner">	
// 					<div className="media my-4  justify-content-start align-items-start">
// 						<div className="image-box me-sm-4 me-2">
// 							<img src={g1} alt="" className="rounded-circle img-1" />
// 							<span className="active1"></span>
// 						</div>
// 						<div className="message-received">
// 							<p className="mb-1">
// 								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptat
// 							</p>
// 							<span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
// 						</div>
// 					</div>
// 					<div className="media my-4  justify-content-start align-items-start">
// 						<div className="image-box me-sm-4 me-2">
// 							<img src={g1} alt="" className="rounded-circle img-1" />
// 							<span className="active1"></span>
// 						</div>
// 						<div className="message-received">
// 							<p className="mb-1 me-5">
// 								Hey, check my design update last night. Tell me what you think and if that is OK
// 							</p>
// 							<span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
// 						</div>
// 					</div>
// 					<div className="media mb-4 justify-content-end align-items-end">
// 						<div className="message-sent">
// 							<p className="mb-1">
// 								sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
// 							</p>
// 							<span className="fs-12">9.30 AM</span>
// 						</div>
// 						<div className="image-box ms-sm-4 ms-2 mb-4">
// 							<img src={cont3} alt="" className="rounded-circle img-1" />
// 							<span className="active"></span>
// 						</div>
// 					</div>
// 					<div className="media mb-4 justify-content-end align-items-end">
// 						<div className="message-sent">
// 							<p className="mb-1">
// 								sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
// 							</p>
// 							<span className="fs-12">9.30 AM</span>
// 						</div>
// 						<div className="image-box ms-sm-4 ms-2 mb-4">
// 							<img src={cont3} alt="" className="rounded-circle img-1" />
// 							<span className="active"></span>
// 						</div>
// 					</div>
// 					<div className="media my-4  justify-content-start align-items-start">
// 						<div className="image-box me-sm-4 me-2">
// 							<img src={g1} alt="" className="rounded-circle img-1" />
// 							<span className="active1"></span>
// 						</div>
// 						<div className="message-received">
// 							<p className="mb-1 me-5">
// 								Hey, check my design update last night. Tell me what you think and if that is OK
// 							</p>
// 							<span className="fs-12">Sunday, October 24th, 2020  at 4.30 AM</span>
// 						</div>
// 					</div>
// 					{Array.isArray(messagesList) && messagesList.map((oneMessage, index) => (
// 						<div className="media mb-4 justify-content-end align-items-end" key={index}>
// 							<div className="message-sent">
// 								<p className="mb-1 message" key={index} >
// 									{oneMessage.text}
// 								</p>
// 							</div>
// 							<div className="image-box ms-sm-4 ms-2 ">
// 								<img src={g1} alt="" className="rounded-circle img-1" />
// 								<span className="active1"></span>
// 							</div>
// 						</div>	
// 					))}
			   
// 					<div className="reference" ref={node => (this.messageListEnd = node)} />
// 				</div>
// 			</div>
// 		</div> 
//     );
//   }
// }