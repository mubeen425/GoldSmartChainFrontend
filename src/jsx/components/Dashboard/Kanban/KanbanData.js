// import React from 'react';
// import {Link} from 'react-router-dom';
// import {Dropdown} from 'react-bootstrap';


// import pic11 from './../../../../images/contacts/pic11.jpg';
// import pic22 from './../../../../images/contacts/pic22.jpg';
// import pic33 from './../../../../images/contacts/pic33.jpg';
// import pic222 from './../../../../images/contacts/pic222.jpg';

// function ColumnHeader1(){
// 	return(
// 		<>
// 			<div className="sub-card align-items-center d-flex justify-content-between mb-4">
// 				<div>
// 					<h4 className="fs-20 mb-0 font-w600">To-Do List (<span className="totalCount">24</span>)</h4>
// 				</div>
// 				<div className="plus-bx">
// 					<Link to={"#"}><i className="fas fa-plus"></i></Link>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
// function ColumnHeader2(){
// 	return(
// 		<>
// 			<div className="sub-card align-items-center d-flex justify-content-between mb-4">
// 				<div>
// 					<h4 className="fs-20 mb-0 font-w600">On Progress(<span className="totalCount">2</span>)</h4>
// 				</div>
// 				<div className="plus-bx">
// 					<Link to={"#"}><i className="fas fa-plus"></i></Link>
// 				</div>
// 			</div>
// 		</>		
// 	)
// }
// function ColumnHeader3(){
// 	return(
// 		<>
// 			<div className="sub-card align-items-center d-flex justify-content-between mb-4">
// 				<div>
// 					<h4 className="fs-20 mb-0 font-w600">Done(<span className="totalCount">3</span>)</h4>
// 				</div>
// 				<div className="plus-bx">
// 					<Link to={"#"}><i className="fas fa-plus"></i></Link>
// 				</div>
// 			</div>
// 		</>		
// 	)
// }
// function ColumnHeader4(){
// 	return(
// 		<>
// 			<div className="sub-card align-items-center justify-content-between d-flex mb-4 text-white">
// 				<div>
// 					<h4 className="fs-20 mb-0 font-w600">Done(<span className="totalCount">3</span>)</h4>
// 				</div>
// 				<div className="plus-bx">
// 					<Link to={"#"}><i className="fas fa-plus"></i></Link>
// 				</div>
// 			</div>
// 		</>		
// 	)
// }


// function SubCard1(){
// 	return(
// 		<>
// 			<div className="card draggable-handle draggable">
// 				<div className="card-body">
// 					<div className="d-flex justify-content-between mb-2">
// 						<span className="sub-title">
// 							<svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<circle cx="5" cy="5" r="5" fill="#FFA7D7"/>
// 							</svg>
// 							Deisgner
// 						</span>
// 						<DropdownBox />
// 					</div>
// 					<p className="font-w600 fs-18"><Link to={"#"} className="text-black">Create wireframe for landing page phase 1</Link></p>
// 					<div className="progress default-progress my-4">
// 						<div className="progress-bar bg-design progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
// 							<span className="sr-only">45% Complete</span>
// 						</div>
// 					</div>
// 					<div className="row justify-content-between align-items-center kanban-user">
// 						<ul className="users col-6">
// 							<li><img src={pic11} alt="" /></li>
// 							<li><img src={pic22} alt="" /></li>
// 							<li><img src={pic33} alt="" /></li>
// 						</ul>
// 						<div className="col-6 d-flex justify-content-end">
// 							<span className="fs-14"><i className="far fa-clock me-2"></i>Due in 4 days</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// function SubCard2(){
// 	return(
// 		<>
// 			<div className="card draggable-handle draggable">
// 				<div className="card-body">
// 					<div className="d-flex justify-content-between mb-2">
// 						<span className="text-warning">
// 							<svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<circle cx="5" cy="5" r="5" fill="#FFCF6D"/>
// 							</svg>
// 							Important
// 						</span>
// 						<DropdownBox />
// 					</div>
// 					<p className="font-w600 fs-18"><Link to={"#"} className="text-black">Visual Graphic for Presentation to Client</Link></p>
// 					<div className="progress default-progress my-4">
// 						<div className="progress-bar bg-warning progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
// 							<span className="sr-only">45% Complete</span>
// 						</div>
// 					</div>
// 					<div className="row justify-content-between align-items-center kanban-user">
// 						<ul className="users col-6">
// 							<li><img src={pic11} alt="" /></li>
// 							<li><img src={pic22} alt="" /></li>
// 							<li><img src={pic33} alt="" /></li>
// 							<li><img src={pic222} alt="" /></li>
// 						</ul>
// 						<div className="col-6 d-flex justify-content-end">
// 							<span className="fs-14"><i className="far fa-clock me-2"></i>Due in 4 days</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
// function SubCard3(){
// 	return(
// 		<>
// 			<div className="card draggable-handle draggable">
// 				<div className="card-body">
// 					<div className="d-flex justify-content-between mb-2">
// 						<span className="text-success">
// 							<svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<circle cx="5" cy="5" r="5" fill="#09BD3C"/>
// 							</svg>

// 							Databse
// 						</span>
// 						<DropdownBox />
// 					</div>
// 					<p className="font-w600 fs-18"><Link to={"#"} className="text-black">Setup database for create API connection</Link></p>
// 					<div className="progress default-progress my-4">
// 						<div className="progress-bar bg-success progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
// 							<span className="sr-only">45% Complete</span>
// 						</div>
// 					</div>
// 					<div className="row justify-content-between align-items-center kanban-user">
// 						<ul className="users col-6">
// 							<li><img src={pic22} alt="" /></li>
// 							<li><img src={pic222} alt="" /></li>
// 						</ul>
// 						<div className="col-6 d-flex justify-content-end">
// 							<span className="fs-14"><i className="far fa-clock me-2"></i>Due in 4 days</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
// function SubCard4(){
// 	return(
// 		<>
// 			<div className="card draggable-handle draggable">
// 				<div className="card-body">
// 					<div className="d-flex justify-content-between mb-2">
// 						<span className="text-danger">
// 							<svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 								<circle cx="5" cy="5" r="5" fill="#FC2E53"/>
// 							</svg>
// 							BUGS FIXING
// 						</span>
// 						<DropdownBox/>
// 					</div>
// 					<p className="font-w600 fs-18"><Link to={"#"} className="text-black">Update information in footer section</Link></p>
// 					<div className="progress default-progress my-4">
// 						<div className="progress-bar bg-danger progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
// 							<span className="sr-only">45% Complete</span>
// 						</div>
// 					</div>
// 					<div className="row justify-content-between align-items-center kanban-user">
// 						<ul className="users col-6">
// 							<li><img src={pic11} alt="" /></li>
// 							<li><img src={pic22} alt="" /></li>
// 							<li><img src={pic33} alt="" /></li>
// 						</ul>
// 						<div className="col-6 d-flex justify-content-end">
// 							<span className="fs-14"><i className="far fa-clock me-2"></i>Due in 4 days</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
// function DropdownBox(){
// 	return(
// 		<Dropdown>
// 			<Dropdown.Toggle variant="" as="div" className="i-false" >	
// 				<Link to={"#"} data-toggle="dropdown" aria-expanded="false">
// 					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 						<circle cx="3.5" cy="11.5" r="2.5" transform="rotate(-90 3.5 11.5)" fill="#717579"/>
// 						<circle cx="11.5" cy="11.5" r="2.5" transform="rotate(-90 11.5 11.5)" fill="#717579"/>
// 						<circle cx="19.5" cy="11.5" r="2.5" transform="rotate(-90 19.5 11.5)" fill="#717579"/>
// 					</svg>
// 				</Link>
// 			</Dropdown.Toggle>	
// 			<Dropdown.Menu  className="dropdown-menu-right"  menuAlign="right">
// 				<Dropdown.Item >Edit </Dropdown.Item>		
// 				<Dropdown.Item >Delete </Dropdown.Item>
// 			</Dropdown.Menu>	
// 		</Dropdown>
// 	)
// }
// const board = {
//   columns: [
//     {
// 		id: 1,
// 	//title: "Q&A",	
// 		title: <ColumnHeader1/>,
// 		cards: [
// 			{
// 			  id: 11,
// 			  title: <SubCard1 />,
// 			  //description: "Card content"
// 			},
// 			{
// 			  id: 12,
// 			  title: <SubCard2 />,
			  
// 			},
// 			{
// 			  id: 13,
// 			  title: <SubCard2 />,
			  
// 			},
// 			{
// 			  id: 14,
// 			  title: <SubCard1 />,
			  
// 			},
// 			{
// 			  id: 15,
// 			  title: <SubCard1 />,
			  
// 			},
// 		]
//     },
//     {
// 		id: 2,
// 		title: <ColumnHeader2 />,
// 		cards: [
// 			{
// 			  id: 16,
// 			  title: <SubCard3/>,
// 			},
// 			{
// 			  id: 17,
// 			  title: <SubCard3/>,
// 			},
// 		]
//     },
//     {
//       id: 3,
      
//       title: <ColumnHeader3 />,
// 		cards: [
// 			{
// 			  id: 18,
// 			  title: <SubCard1 />,
// 			},
// 			{
// 			  id: 19,
// 			  title: <SubCard4 />,
			  
// 			},
// 			{
// 			  id: 20,
// 			  title: <SubCard1 />,
// 			},
// 		]
//     },
// 	{
// 		id: 4,
// 		title: <ColumnHeader4 />,
// 		cards: [
// 			{
// 			  id: 21,
// 			  title: <SubCard4 />,
// 			},
			
// 		]
//     },	
// 	{
// 		id: 5,
// 		title: <ColumnHeader2 />,
// 		cards: [
// 			{
// 			  id: 22,
// 			  title: <SubCard3/>,
// 			},
// 			{
// 			  id: 23,
// 			  title: <SubCard2/>,
// 			},
// 		]
//     },
//   ]
// };

// const KanbanData = () =>{
// 	return(
// 		<>
// 		</>
// 	)
// } 

// export { ColumnHeader1, ColumnHeader2, ColumnHeader3, ColumnHeader4,
// 	SubCard1, SubCard2, SubCard3, SubCard4, board };
// export default  KanbanData;