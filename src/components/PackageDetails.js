import React, { Component } from "react";
import classNames from 'classnames';
import Parse from 'html-react-parser';

function PackageDetails(props) {

   let class_name = classNames(
      'acc-step-wrap', 
      'acc-package-wrap',
      {'uxt-wa-active-step': (props.currentStep === 0 || props.currentStep === 5) }
    );
	
	let pricePlans = '';
	let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');
	
	if(props.package_all_data != '' && props.package_all_data != 'undefined'){
		
		pricePlans = <div className="PackageList">
		               	<div className="package_tabsec">
							<ul className="package_tabnav">
								{
									props.package_all_data.map(function(obj,index){
										return <li className={props.Plantype == obj.acc_id?'active':''} id={obj.acc_id}  onClick={props.packfunc} key={index} >{obj.acc_label}</li>
									})
								}
							</ul>
							
							{
								props.package_all_data.map(function(obj,index){
									var active_class = '';
									
									if(props.Plantype == obj.acc_id){
										active_class = 'hello';
									}
									
									return <div className={props.Plantype == obj.acc_id?'package_tabcontent active':'package_tabcontent'} key={index}>			<div className="standard" id={obj.acc_id}>
													<div className="acc-package-desc">
														{Parse(''+obj.acc_description)}
													</div>
												</div>
												 <div className="btn-section btn-group-sect">
													{user == null?<span className="open-login login-account package-det" onClick={props.showLogin}>Login</span>:''}
													{ props.children }
												</div>
											</div>
								})	
							}
							
						</div>
					 </div>
		
	}else{
		pricePlans = <div className="PackageList">
						<p>2</p>
					 </div>
		
	}
	
    return(
      <div className={class_name}>        
        <div className="acc-package-content">
			<h2>Open an account</h2>
			{pricePlans}
        </div>
      </div>
    );
	
}
export default PackageDetails;