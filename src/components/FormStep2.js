import React, { Component } from "react";
import NumberFormat from "react-number-format";
import CustomSelect from './CustomSelect';
import classNames from 'classnames';

function FormStep2(props) {
	const card_types = [
        { value: 'Visa', label: 'Visa' },
        { value: 'MasterCard', label: 'Mastercard' },
        { value: 'AmEx', label: 'Amex' },
        { value: 'Discover', label: 'Discover' }
      ];

      const expiry_month = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
      ];


    let expiry_year = [];

    let curr_year = (new Date()).getFullYear();

    for (var i = 0; i < 10; i++) {
      expiry_year.push({
        value: curr_year+i,
        label: curr_year+i
      }) 
    };

    let error_msg = (props.error_message!='') ? <div className="form-group acc-payment-error"> {props.error_message} </div> : '';
    

    let class_name = classNames(
      'acc-step-wrap', 
      'acc-credit-wrap',
      {'uxt-wa-active-step': (props.currentStep === 2) }
    );


    return(
      <div className={class_name}>
	  <div className="credit-card-form">
	  <h2>Credit Card</h2>         
	   { error_msg  }
        <div className="form-group custom-select-wrap">

        <CustomSelect
             handleSelect={props.handleSelectChange}
             title="Card Type" 
             className={ 'form-select-control '+(props.error_fields.card_type!=undefined ? 'error-field' : '') } 
             options={ card_types } 
             selected={ props.card_type } 
             name="card_type" 
             placeholder="Card Type"
             />
          
        </div>
        <div className="form-group">

          <NumberFormat
            className={ 'form-control '+(props.error_fields.credit_card_number!=undefined ? 'error-field' : '') }
            id="credit_card_number"
            name="credit_card_number"
            type="text"
            placeholder="Credit Card Number"
            value={props.credit_card_number}
            onChange={props.handleChange}
            format="#### #### #### ####"
            />
        </div>

        <div className="form-group custom-select-wrap">
        <CustomSelect
             handleSelect={props.handleSelectChange}
             title="Month" 
             className={ 'form-select-control '+(props.error_fields.expiry_month!=undefined ? 'error-field' : '') } 
             options={ expiry_month } 
             selected={ props.expiry_month } 
             name="expiry_month" 
             placeholder="Month"
             />
        </div>

        <div className="form-group custom-select-wrap">
        <CustomSelect
             handleSelect={props.handleSelectChange}
             title="Year" 
             className={ 'form-select-control '+(props.error_fields.expiry_year!=undefined ? 'error-field' : '') } 
             options={ expiry_year } 
             selected={ props.expiry_year } 
             name="expiry_year" 
             placeholder="Year"
             />
        </div>

        <div className="form-group">
          <NumberFormat
            className={ 'form-control '+(props.error_fields.d_cvv!=undefined ? 'error-field' : '') }
            id="d_cvv"
            name="d_cvv"
            type="text"
            placeholder="CVV"
            value={props.d_cvv}
            onChange={props.handleChange}
            />
        </div>
		</div>	
        <div className="btn-section card-dtls-btn">
          { props.children }
        </div>
        
      </div>
    );
}

export default FormStep2;