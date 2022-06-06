import React, { Component } from "react";
import country_data from '../resources/country_data';
import CustomSelect from './CustomSelect';
import classNames from 'classnames';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId  = '981059671608-s624g75i1vh18nn377mgkmfjn7oujg0n.apps.googleusercontent.com';

function FormStep1(props) {
	let country_list = [];

    country_data.forEach((item)=>{
      country_list.push({
        value: item.name,
        label: item.name
      });
    });

	let error_msg = (props.error_message!='') ? <div className="acc-payment-error"> {props.error_message} </div> : '';
	 
    let class_name = classNames(
        'acc-step-wrap', 
        'acc-signup-wrap',
        {'uxt-wa-active-step': (props.currentStep === 1) }
      );
	  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
	$('.signup-form-sec .form-group #first_name').val(res.profileObj.name);
	$('.signup-form-sec .form-group #email').val(res.profileObj.email);
	props.handleChangeSocialLogin(res.profileObj);
	setTimeout(function(){ 
	 refreshTokenSetup(res);
	  }, 2000);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };
  
    return(
      <div className={class_name}>
	  <div className="signup-form-sec">
	  <h2>Sign Up</h2>
	  {error_msg}
      <div className="form-group">
		<input
            className={ 'form-control '+(props.error_fields.first_name!=undefined ? 'error-field' : '') }
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Name"
            value={props.first_name}
            onChange={props.handleChange}
            />
			<label className={props.error_fields.first_name!=undefined ? 'error-msg' : ''}>{props.error_fields.first_name!=undefined ? props.error_fields.first_name : ''}</label>
		</div>	
        <div className="form-group">
        
          <input
            className={ 'form-control'}
            id="package_idis"
            name="package_idis"
            type="hidden"
            placeholder="Package Id"
            value={props.packagePlan?props.packagePlan:'MQ'}
			onChange={props.handleChange}
            />
        </div>
        <div className="form-group">
          <input
            className={ 'form-control '+(props.error_fields.email!=undefined ? 'error-field' : '') }
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            value={props.email}
            onChange={props.handleChange}
            />
		<label className={props.error_fields.email!=undefined ? 'error-msg' : ''}>{props.error_fields.email!=undefined ? props.error_fields.email : ''}</label>
        </div>
        
        <div className="form-group google-login">
			<GoogleLogin
			clientId={clientId}
			buttonText="Sign Up"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={'single_host_origin'}
			style={{ marginTop: '100px' }}
			isSignedIn={false}
		  />
	    </div>
	  
		</div>
        <div className="btn-section btn-group-sect">
          { props.children }
        </div>		
      </div>
    );
}

export default FormStep1;