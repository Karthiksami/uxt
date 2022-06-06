import React, { Component } from "react";
import classNames from 'classnames';

function ThankYou(props) {
	
	setTimeout(() => {
		props.handleReset();
	}, 5000);

 let class_name = '';	
 if(props.cridential_type == 'login'){
	
      class_name = classNames(
      'acc-step-wrap', 
      'acc-thankyou-wrap',
      'acc-thankyou_message',
      {'uxt-wa-active-step': (props.currentStep === 2 ) }
    );
}
else{
	  class_name = classNames(
      'acc-step-wrap', 
      'acc-thankyou-wrap',
      'acc-thankyou_message',
      {'uxt-wa-active-step': (props.currentStep >=3) }
    );
	
}	
   
    return(
      <div className={class_name}>
        <div className="tk-icon"></div>
		
		<div className="tnk-you">
				<div className="tnk-header">

					<div className="tick">
					<h2>Thank You </h2>
						<p>{props.thankyou_message}</p>
					</div>					
					</div>
				</div>
		 <button className="tk-close-btn" onClick={props.handleReset}>Close</button>
      </div>
    );
}

export default ThankYou;