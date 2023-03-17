// import React from 'react';
// import {Tab, Nav} from 'react-bootstrap';

// import CanvasBar from './CanvasBar';

// const CurrentBalance = () => {
// 	return(
// 		<>
// 			<Tab.Container defaultActiveKey="Daily">
// 				<div className="card-body">
// 					<div className="current-tab">
// 						<Nav as="ul" className="nav nav-tabs" role="tablist">
// 							<Nav.Item as="li" className="nav-item">
// 								<Nav.Link className="nav-link" eventKey="Daily">Daily</Nav.Link>
// 							</Nav.Item>
// 							<Nav.Item as="li" className="nav-item">
// 								<Nav.Link className="nav-link" eventKey="Weekly">Weekly</Nav.Link>
// 							</Nav.Item>
// 							<Nav.Item as="li" className="nav-item">
// 								<Nav.Link className="nav-link" eventKey="Monthly">Monthly</Nav.Link>
// 							</Nav.Item>
// 						</Nav>
// 					</div>
// 					<Tab.Content>
// 						<Tab.Pane eventKey="Daily">
// 							<CanvasBar dataActive={0} />
// 						</Tab.Pane>
// 						<Tab.Pane eventKey="Weekly">
// 							<CanvasBar dataActive={1} />
// 						</Tab.Pane>
// 						<Tab.Pane eventKey="Monthly">
// 							<CanvasBar dataActive={2} />
// 						</Tab.Pane>
// 					</Tab.Content>
// 				</div>
// 			</Tab.Container>
// 		</>
// 	)
// }
// export default CurrentBalance;