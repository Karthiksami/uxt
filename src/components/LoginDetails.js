import React, { Component } from "react";
import classNames from 'classnames';
import Parse from 'html-react-parser';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import country_data from '../resources/country_data';
import CustomSelect from './CustomSelect';
const config = require('./config');
const APIURL = config.path.apiUrl;
import { API_BASE_URL } from '../config/api';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
const clientId  = '981059671608-s624g75i1vh18nn377mgkmfjn7oujg0n.apps.googleusercontent.com';
var qs = require('qs');
import $ from 'jquery';
var cusName = '';
var customerEmail = '';
var customerPhone = '';
var customerCntry = '';
var customerStreet = '';
var customerCity = '';
var customerZip = '';
var customerDetails = '';

let country_list = [];

    country_data.forEach((item)=>{
      country_list.push({
        value: item.name,
        label: item.name
      });
    });
	
	customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	if(customerDetails != ''){
	 cusName = customerDetails.user_fname;
	 customerEmail = customerDetails.user_email_address;
	 customerPhone = customerDetails.user_phone_number;
	 customerCntry = customerDetails.user_country;
	 customerStreet = customerDetails.user_street;
	 customerCity = customerDetails.user_city_town;
	 customerZip = customerDetails.user_zipcode;
	}
	

class LoginDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
			submittedGoogle: false,
            submittedEmail: false,
            submittedEdit: false,
            downgraded: false,
			loading: false,
            error_msg: '',
            userData: (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):''),
            loadAjaxStatus:'',
            count:0,
			showForgotPwd: false,
			message: '',
			emailAddress: '',
			error_fields: {},
			edit_first_name: cusName,
			edit_email: customerEmail,
			edit_phone_num: customerPhone,
			edit_street: customerStreet,
			edit_city_town: customerCity,
			edit_country: customerCntry,
			edit_zipcode: customerZip,
			edit_password: '',
			edit_cpassword: '',
			isform_valid: false,
			clickEdit: false,
			upDownGrade: false
        };
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this); 
		//this.handleSelectChange  = this.handleSelectChange.bind(this);		
    }
	
	
	componentWillReceiveProps(lstProps) {
	   if(lstProps.enableLogin != '' && lstProps.enableLogin != this.props.enableLogin){
		   	this.onForceLogin(lstProps.enableLogin);
	   }		        
    }
      
	   onSuccess = (res) => {		
		if(typeof res != 'undefined' && typeof res.profileObj != 'undefined'){
			var googleId = (typeof res.profileObj.googleId != 'undefined'?res.profileObj.googleId:'');
		
			this.setState({ submittedGoogle: true, submitted:false, submittedEdit:false, submittedEmail: false, downgraded: false,  loadAjaxStatus: true, loading: true});
         	
		    axios.post(APIURL+'user/googleLogin', qs.stringify({googleId:googleId})).then(response => {
			if(response.data.status === "ok"){	
			   this.setState({ loadAjaxStatus: false, userData: response.data.result, error_msg: '', message:'' }); 
			   localStorage.setItem('userDetails', JSON.stringify(response.data.result));
               localStorage.removeItem('loggedIn');	
			   localStorage.setItem('loggedIn', 1);	
			   localStorage.setItem('relevanceChecked', (this.state.userData.relevance == '0'?false:true));
               localStorage.setItem('liteVersionChecked', (this.state.userData.lite_version == '0'?false:true));
			   localStorage.setItem('checkedTwoColumn', (this.state.userData.two_column == '0'?false:true));
			   localStorage.setItem('checkedCarousel', (this.state.userData.carousel_mode == '0'?false:true));
			   localStorage.setItem('twoRowActive', (this.state.userData.twoRowActive == '0'?false:true));
			   localStorage.setItem('notificationsEnable', (this.state.userData.notifications == '0'?false:true));
	           localStorage.setItem('storeRecentSearches',JSON.stringify(response.data.recent_searches));					
			   localStorage.setItem('wishlistCount', response.data.count);
			   this.props.transferData(JSON.stringify(response.data.result));			   
			   $('.h-favourite').html(response.data.count);
				
			   $('a.login.user').html(this.state.userData.user_fname.substr(0,7));
			   $('.h-favourite').removeClass('hidden');
			   $('.uxt-side-menu').removeClass('open-package');
			   
			   var loginDetails = JSON.stringify(response.data.result);
			 		   
			   this.setState({ edit_first_name: loginDetails.user_fname, edit_email: loginDetails.user_email_address, edit_phone_num:(loginDetails.user_phone_number != null?loginDetails.user_phone_number:''), edit_street:(loginDetails.user_street != null?loginDetails.user_street:''), edit_city_town:(loginDetails.user_city_town != null?loginDetails.user_city_town:''), edit_country: (loginDetails.user_country != null?loginDetails.user_country:''), edit_zipcode: (loginDetails.user_zipcode != null?loginDetails.user_zipcode:'')},()=>{
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
					$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
	
		
			   }); 
			}
			else if(response.data.status === "error"){
				 this.setState({error_msg : response.data.message, loadAjaxStatus: false, loading: false, message:''});
			}
	        }).catch(function (e) {
	            console.log(e);
	        }); 
			
		setTimeout(function(){ 
		 refreshTokenSetup(res);
		  }, 2000);
		}	
    }

	   onFailure = (res) => {
		console.log('Login failed: res:', res);
	  }
	  
	  
	    onForceLogin = (googleId) => {	
       	if(typeof googleId !=''){		   
		
			this.setState({ submittedGoogle: true, submitted:false, submittedEdit:false, submittedEmail: false, downgraded: false,  loadAjaxStatus: true, loading: true });
         			
		    axios.post(APIURL+'user/googleLogin', qs.stringify({googleId:googleId})).then(response => {
			if(response.data.status === "ok"){	
			   this.setState({ loadAjaxStatus: false, userData: response.data.result, error_msg: '', message:'' }); 
			   localStorage.setItem('userDetails', JSON.stringify(response.data.result));	
			   localStorage.removeItem('loggedIn');	
			   localStorage.setItem('loggedIn', 1);	
			   $('a.login.user').html(this.state.userData.user_fname.substr(0,7));
			   $('.h-favourite').removeClass('hidden');
			   $('.uxt-side-menu').removeClass('open-package');
			   
			   var loginDetails = JSON.stringify(response.data.result);
			 		   
			   this.setState({ edit_first_name: loginDetails.user_fname, edit_email: loginDetails.user_email_address, edit_phone_num:(loginDetails.user_phone_number != null?loginDetails.user_phone_number:''), edit_street:(loginDetails.user_street != null?loginDetails.user_street:''), edit_city_town:(loginDetails.user_city_town != null?loginDetails.user_city_town:''), edit_country: (loginDetails.user_country != null?loginDetails.user_country:''), edit_zipcode: (loginDetails.user_zipcode != null?loginDetails.user_zipcode:'')},()=>{
			   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
		
				$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
		
			   }); 
			}
			else if(response.data.status === "error"){
				 this.setState({error_msg : response.data.message, loadAjaxStatus: false, loading: false, message:''});
			}
	        }).catch(function (e) {
	            console.log(e);
	        }); 
		}	
    }

	 _isEmailField(email){
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
  
      if (reg.test(email) == false) 
      {
          return false;
      }
  
      return true;
  
    }
	
	strongPwd(str) { 
		if (str.match(/[a-z]/g) && str.match( 
				/[A-Z]/g) && str.match( 
				/[0-9]/g) && str.match( 
				/[^a-zA-Z\d]/g) && str.length >= 8) 
			return true; 
		else 
			return false; 
    } 
	
	nameValidation(name){
      //var regName = /^\p{L}[a-zA-Z. ]{2,30}$/u;
      var regName = /\p{L}/u;
      if (regName.test(name) == false) 
      {
        return false;
      }
      return true;  
    }
		
	
	 _handleValidation(){
		
	  var error_fields = {};

      var formIsValid = true;

      const { edit_first_name, edit_email, edit_phone_num, edit_street, edit_city_town, edit_country, edit_zipcode, edit_password, edit_cpassword } = this.state;

        if(edit_first_name=='') {
          formIsValid = false;
          error_fields.edit_first_name = 'First Name required';
        }
		else if(!this.nameValidation(edit_first_name)){
		  formIsValid = false;
          error_fields.edit_first_name = 'Enter valid Name';
		}


        if(edit_email=='') {
          formIsValid = false;
          error_fields.edit_email = 'Email Address required';
        } else if (!this._isEmailField(edit_email)) {
          formIsValid = false;
          error_fields.edit_email = 'Invalid Email Address';
        }

		if(edit_password !='' && edit_cpassword == ''){
		  formIsValid = false;
          error_fields.edit_cpassword = 'Confirm Password is required';
		}
		else if(edit_password !='' && !this.strongPwd(edit_password)){
		  formIsValid = false;
          error_fields.edit_password = 'Password must have atleast 1 uppercase, 1 lowercase, 1 digit, 1 special and minimum 6 characters';
		}
		else if(edit_password !='' && edit_cpassword !='' && !this.strongPwd(edit_cpassword)){
		  formIsValid = false;
          error_fields.edit_cpassword = 'Confirm Password must have atleast 1 uppercase, 1 lowercase, 1 digit, 1 special and minimum 6 characters';
		}
		else if(edit_password != edit_cpassword){
		  formIsValid = false;
          error_fields.edit_cpassword = 'Password mismatch';
		}
		
        if(edit_phone_num=='') {
          formIsValid = false;
          error_fields.edit_phone_num = 'Phone Number required';
        } 

        if(edit_city_town=='') {
          formIsValid = false;
          error_fields.edit_city_town = 'City/Town required';
        }

        if(edit_country=='') {
          formIsValid = false;
          error_fields.edit_country = 'Country required';
        }

        if(edit_zipcode=='') {
          formIsValid = false;
          error_fields.edit_zipcode = 'Zipcode required';
        }
      

      this.setState({
        error_fields: error_fields,
        isform_valid: formIsValid
      });
      return formIsValid;

    }
    
	getWishlistCount(user_id) {		
	 	axios.post(APIURL+'products/getWishlistCount', qs.stringify({user_id: user_id})).then(response => {
			if(response.data.status === "ok"){				
				this.setState({ count : response.data.count});					
			  	localStorage.setItem('wishlistCount', this.state.count);
				this.props.transferData(JSON.stringify(response.data.result));			   
			  	$('.h-favourite').html(this.state.count);
	 		}
        }).catch(function (error) {
            console.log(error);
        });		
	}	
    
     handleChange(e) {
		$('.uxt-side-menu').addClass('active');
		const { name, value } = e.target;
        this.setState({ [name]: value });
    }
	
    handleSelectChange(name, value) {
      this.setState({
        [name]: value
      });

      let formWrap = document.querySelectorAll(".acc-form-wrapper")[0];
      formWrap.classList.remove('custom-select-active');
    }
	
    handleSubmit(e) {
        e.preventDefault();       
        this.setState({ submitted: true, submittedGoogle:false, submittedEdit:false, submittedEmail: false, downgraded: false });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }       
        this.setState({ loadAjaxStatus: true, loading: true });
        axios.post(APIURL+'user/login', qs.stringify({username:username,password:password})).then(response => {
				if(response.data.status === "ok"){	
				   this.setState({ loadAjaxStatus: false, userData: response.data.result, error_msg: '', message:'' }); 
				   localStorage.setItem('userDetails', JSON.stringify(response.data.result));	
				   localStorage.removeItem('loggedIn');	
				   localStorage.setItem('loggedIn', 1);	
				   localStorage.setItem('relevanceChecked', (this.state.userData.relevance == '0'?false:true));
                   localStorage.setItem('liteVersionChecked', (this.state.userData.lite_version == '0'?false:true));
				   localStorage.setItem('checkedTwoColumn', (this.state.userData.two_column == '0'?false:true));
				   localStorage.setItem('checkedCarousel', (this.state.userData.carousel_mode == '0'?false:true));
				   localStorage.setItem('twoRowActive', (this.state.userData.twoRowActive == '0'?false:true));
				   localStorage.setItem('notificationsEnable', (this.state.userData.notifications == '0'?false:true));
	 			   localStorage.setItem('wishlistCount', response.data.count);
				   localStorage.setItem('storeRecentSearches',JSON.stringify(response.data.recent_searches));					
				   localStorage.setItem('wishlistCount', response.data.count);
				   this.props.transferData(JSON.stringify(response.data.result));			   
			  	   $('.h-favourite').html(response.data.count);
				   $('a.login.user').html(this.state.userData.user_fname.substr(0,7));
				   $('.h-favourite').removeClass('hidden');
				   $('.uxt-side-menu').removeClass('open-package');
				   
				   var loginDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
 
				   this.setState({ edit_first_name: loginDetails.user_fname, edit_email: loginDetails.user_email_address, edit_phone_num:loginDetails.user_phone_number, edit_street:loginDetails.user_street, edit_city_town:loginDetails.user_city_town, edit_country: loginDetails.user_country, edit_zipcode: loginDetails.user_zipcode},()=>{
					   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
					   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
				   }); 
				}
		 		else if(response.data.status === "error"){
					 this.setState({error_msg : response.data.message, loadAjaxStatus: false, loading: false, message:''});
				}
	        }).catch(function (e) {
	            console.log(e);
	        });      
    }
	
	updateProfile = (event) => {
	  event.preventDefault(); 
	  this.setState({ submittedEdit: true, submitted:false, submittedGoogle:false, submittedEmail: false, downgraded:false });
	  if( !this._handleValidation()) {
		return;
      }	
	  const { edit_first_name, edit_email, edit_phone_num, edit_street, edit_city_town, edit_country, edit_zipcode, edit_password }  = this.state;
	  	
	  let formData = {
        edit_first_name:edit_first_name, 
        edit_email: edit_email, 
        edit_phone_num: edit_phone_num, 
        edit_street: edit_street, 
        edit_city_town: edit_city_town, 
        edit_country: (edit_country != null && edit_country.value != null?edit_country.value:(edit_country != null?edit_country:'')), 
        edit_zipcode: edit_zipcode,
		user_id: this.state.userData.user_id,
		edit_password: edit_password
      };
	  
      this.setState({loadAjaxStatus : true});
	  axios.get(API_BASE_URL+'/update_profile',{
		  params:formData
	  })
      .then( response => {
        this.setState({loadAjaxStatus : false});
                
		if(response.data.status =='success'){
          this.setState({
		   userData: response.data.result,
           message: response.data.message,
		   error_msg:'',
		   edit_password: '',
		   edit_cpassword: ''
          },()=>{				   
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				   
				   $('a.login.user').html(this.state.userData.user_fname.substr(0,7));
				   
				   });
		  localStorage.removeItem('userDetails');
		  localStorage.setItem('userDetails', JSON.stringify(response.data.result));	
		 }	
		else if(response.data.status =='error'){
		this.setState({
           message:'',
		   error_msg:response.data.message
          });	
		}
	   })
      .catch(error => {
        this.setState({loadAjaxStatus : false}); 
        if(error.response) {
          this.setState({
			 message: '',
			 error_msg: error.response.data.message
          });
        } else {
          this.setState({
           message: '',
		   error_msg:'Something went wrong'
          });
        }
      });
	  
	}
      
	 forgotPwd = (event) => {
        event.preventDefault();       
        this.setState({ submittedEmail: true, submitted:false, submittedGoogle:false, submittedEdit: false, downgraded:false });
        const { emailAddress } = this.state;
        var newThis = this;
        // stop here if form is invalid
        if (!(emailAddress)) {
            return;
        }       
        newThis.setState({loading: true, loadAjaxStatus: true, message:'', error_msg:''});
        		
	 axios.get(APIURL+'user/forgotpassword', {
			params: {
			  email_address: emailAddress
			}
		  })
		  .then(function (response) {
			if(response.data.status === "ok"){	
				   newThis.setState({ loadAjaxStatus: false, message: response.data.message,error_msg:''} ,()=>{				   
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ newThis.props.mainFontFamily +' !important');			
			
				   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ newThis.props.subFontFamily +' !important');
				   }); 
		
			}
		 	else if(response.data.status == "error"){
				   newThis.setState({ error_msg : response.data.message, message:'', loadAjaxStatus: false});
			}
		  });
	 }
	 
	manageProdView(){	  
	 $('.acc-form-wrapper, .upgrade-plan').removeClass('active');	  
	 $('.acc-step-wrap').removeClass('uxt-wa-active-step');
	 $('.acc-login-wrap').removeClass('uxt-wa-active-step');
	 $('.uxt-side-menu-inner').addClass('active'); 
	 this.props.goBack();
	 
	 setTimeout(() => {
		  if($(".uxt-side-menu").hasClass("open-package")){
			//$('.acc-package-wrap').addClass('uxt-wa-active-step');
		  }
		  else{
			$('.watchlist_wrap').removeClass('active');
			$('.product-lists-uxt .comparison-list').addClass('active');
			$('.full-close').show(); 
			$('.uxt-side-menu-inner').addClass('active'); 	
		  }
		}, 100);	  
    }
	
	upgradetoPro(){	  	  
	    $('.uxt-side-menu').addClass('active');
		$('.full-close, .merchant-filter-list').hide();
		$('.acc-form-wrapper').removeClass('active');
		$('.acc-form-wrapper .acc-step-wrap').removeClass('uxt-wa-active-step');
		$('.upgrade-plan-inner .acc-step-wrap').removeClass('uxt-wa-active-step');	
		$('.accessiblity-wrap, .uxt-side-menu-inner').removeClass('active');	
		$('.upgrade-remainder').removeClass('active');
		$('.acc-package-content .open-login.login-account').hide();
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
		let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
					
		setTimeout(() => {	
			if(user_id != null && customerDetails.package_plan == 'free'){
			  $('.upgrade-plan').addClass('active');
			  $('.upgrade-plan-inner .acc-package-wrap').addClass('uxt-wa-active-step');
			}
			else{
			  $('#acc-subscribe-form .acc-package-wrap').addClass('uxt-wa-active-step');         
			}
		 }, 500); 	  
    }
	
	manageViews(){	  	  
	 $('.acc-step-wrap').removeClass('uxt-wa-active-step');
	 $('.forgot-password-sec').removeClass('active');
	 setTimeout(() => {
		 $('.watchlist_wrap').removeClass('active');
		 $('.acc-login-wrap').addClass('uxt-wa-active-step');
		 $('.login-form').addClass('active');
		 }, 100);  
    }
	
	manageProfileBack(){	
     this.setState({clickEdit: false, upDownGrade: false});
     setTimeout(() => {
		      $('.userListing').addClass('active');
		      $('.uxt-side-menu').addClass('active');
     	      $('.edit-profile-form').removeClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
          }, 100); 		  
	}
	
	manageViewsPwd(){	  	  
	 $('.acc-step-wrap').removeClass('uxt-wa-active-step');
	 $('.change-password-sec').removeClass('active');
	 setTimeout(() => {
		 $('.acc-login-wrap').addClass('uxt-wa-active-step');
	     $('.uxt-side-menu').removeClass('active');
		 }, 100);	  
    }
	
	enableForgotPwd(){		
      //$('.uxt-side-menu').removeClass('active');
		$('.login-form').removeClass('active');
		$('.forgot-password-sec').addClass('active');
       this.setState({error_msg:'', message:''});		
	}
	
	editProfile = () =>{
	this.setState({clickEdit:true},()=>{
		$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
	});			
   	 setTimeout(() => {
		      $('.uxt-side-menu').addClass('active');
		      $('.full-close').hide();
		      $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		      $('.acc-login-wrap').addClass('uxt-wa-active-step');
			  $('.userListing, .uxt-side-menu-inner').removeClass('active');	
			  $('.downgrade-plan').removeClass('active');		
			  $('.edit-profile-form').addClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
          }, 100); 
		
	}
	
	
	downGrade = () =>{
	this.setState({upDownGrade:true});			
   	 setTimeout(() => {
		      $('.uxt-side-menu').addClass('active');
		      $('.full-close').hide();
		      $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		      $('.acc-login-wrap').addClass('uxt-wa-active-step');
			  $('.userListing, .uxt-side-menu-inner').removeClass('active');		
			  $('.edit-profile-form').removeClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
          }, 100); 
		
	}
	
	downgradeUser = () => { 
		
		 this.setState({upDownGrade: true, downgraded:true, message:'', error_msg: ''});
		 let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');
		 
		 let formData = {
          user_id: user.user_id,
		 };
	  
         if(user.package_plan == 'pro'){
	        axios.get(API_BASE_URL+'/downgradeUser',{
		     params:formData
			})
		.then( response => {
		if(response.data.status =='success'){
			localStorage.removeItem('userDetails');
			localStorage.removeItem('loggedIn');	
			localStorage.setItem('userDetails', JSON.stringify(response.data.result));
			localStorage.setItem('loggedIn', 1);	
			  this.setState({
				  message:response.data.message,
		          error_msg:''
			  },
            () => {
				$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
			  setTimeout(() => {
				  this.setState({ upDownGrade: false });
				  this.manageProfileBack();
			   }, 1000);			   
            });             			  
		}	
		else if(response.data.status =='error'){
		this.setState({
           message:'',
		   error_msg:response.data.message,
		   upDownGrade: false
          },
            () => {
			  setTimeout(() => {
				  this.manageProfileBack();
			   }, 1000);			   
           });	
		}
	   })
      .catch(error => {
        if(error.response) {
          this.setState({
			 message: '',
			 error_msg: error.response.data.message,
			 upDownGrade: false
          },
            () => {
			  setTimeout(() => {
				  this.manageProfileBack();
			   }, 1000);			   
            });
        } else {
          this.setState({
           message: '',
		   error_msg:'Something went wrong',
		   upDownGrade: false
          },
           () => {
			  setTimeout(() => {
				  this.setState({ upDownGrade: false });
				  this.manageProfileBack();
			   }, 1000);			   
         });
        }
      });
	  }
	 }
	
	render() {
		const { username, password, submitted, submittedGoogle, submittedEmail, submittedEdit, error_msg, emailAddress, message, loading, downgraded } = this.state;
		let class_name = classNames(
		  'acc-step-wrap', 
		  'acc-login-wrap',
		  {'uxt-wa-active-step': (this.props.currentStep === 0) }
		);
			    
	    let loginFormDOM = '';
	    let loginUserDetails = '';
	    let userLogout = '';
		let error_msgs = this.state.error_msg;	
		let userDataLists = this.state.userData;
		var current = this;
		var getupdateDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
		
		loginUserDetails = <div className="userListing active">
		    {downgraded && (this.state.message || this.state.error_msg)? <p className={this.state.message?"alert alert-success":"alert alert-error"}>{(this.state.message)?this.state.message:this.state.error_msg}</p>:''}			
			<div className="userListing-wrap">
			<a href="javascript://" className="profile-edit" onClick={this.editProfile.bind(this)}>Edit</a>
		    <h2>Profile</h2>
			<p><span className="label">Plan</span>:<span className="txt">{getupdateDetails.package_label}
				{getupdateDetails.package_plan == "pro"?<a href="javascript://" className="downgrade-txt" onClick={this.downGrade.bind(this)}> / <b>Downgrade</b></a>:null}
			</span></p>
			<p><span className="label">Name</span>:<span className="txt">{getupdateDetails.user_fname?getupdateDetails.user_fname:''}</span></p>
			
			<p><span className="label">Email</span>:<span className="txt">{getupdateDetails.user_email_address?getupdateDetails.user_email_address:''}</span></p>
			
			{getupdateDetails.user_phone_number !=null?<p><span className="label">Phone</span>:<span className="txt">{getupdateDetails.user_phone_number}</span></p>:''}
			
			{getupdateDetails.user_country?<p><span className="label">Country</span>:<span className="txt">{getupdateDetails.user_country}</span></p>:''}
			
			{getupdateDetails.user_street?<p><span className="label">Street</span>:<span className="txt">{getupdateDetails.user_street}</span></p>:''}
			
			{getupdateDetails.user_city_town?<p><span className="label">City</span>:<span className="txt">{getupdateDetails.user_city_town}</span></p>:''}
			
			{getupdateDetails.user_zipcode?<p><span className="label">ZipCode</span>:<span className="txt">{getupdateDetails.user_zipcode}</span></p>:''}
			
			{getupdateDetails.package_plan == 'free'?<p className="come-back"><a className="" href='javascript://' onClick = {this.upgradetoPro.bind(this)}>Go Back to PRO</a></p>:''}
			
		    </div>
			<div className="btn-section btn-group-sect">
				<a className="btn btn-primary btn-back" href='javascript://' onClick = {this.manageProdView.bind(this)}></a>
			</div>
		</div>			
		
		loginFormDOM = <div className="login-form active"><form name="form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
		  <div className={'login-sec' + (submitted && !username ? ' has-error' : '')}>
		  <h2>Login</h2>
		   <div className="form-group">
		   {(submitted || submittedGoogle) && (this.state.message || this.state.error_msg)? <p className={this.state.message?"alert alert-success":"alert alert-error"}>{(this.state.message)?this.state.message:this.state.error_msg}</p>:''}
		   		
		    <div className="input-box">
			  <input type="text" placeholder="Username" className={ 'form-control '+(submitted && !username ? 'error-field' : '') } name="username" value={username} onChange={this.handleChange.bind(this)} />			  
		   </div>		   
		   </div>
		   <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
		   <div className="input-box">
              <input type="password" placeholder="Password" className={ 'form-control '+(submitted && !password ? 'error-field' : '') } name="password" value={password} onChange={this.handleChange.bind(this)} />                
			</div>		   
		   </div>
              <a className="forgot-pwd" id="profile-edit" href='javascript://' onClick = {this.enableForgotPwd.bind(this)}>Forgot Password?</a>	
			  <div className="form-group google-login">
					<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={this.onSuccess.bind(this)}
					onFailure={this.onFailure.bind(this)}
					cookiePolicy={'single_host_origin'}
					style={{ marginTop: '100px' }}
					isSignedIn={true}
					/>
				</div>
			 </div>
		   <div className="btn-section btn-group-sect">	
		   <button className="btn btn-primary btn-back" onClick = {this.manageProdView.bind(this)}>Back</button> 
           <button className="btn btn-primary btn-next" disabled={localStorage.getItem('userDetails') !== null?loading:''}>Login</button> 
		   </div>	
		 </form>
		</div>
		 
    return(
      <div className={class_name}>  
	  
      {/*<div className={(this.state.loadAjaxStatus===true)?'uxt-loading active':'uxt-loading'}></div>  */}
	  
		{this.state.productViewStatus === true && this.state.loadAjaxStatus===true?
			<div className="uxt-loading dynamic-loader login-loader">
			<div className="loading-inner"><span className="load-text">{this.props.loaderText}</span>{(this.props.loaderImage !== '')? <img src={this.props.loaderImage} alt=""/> : ''}		
			</div>
		</div>:''}
	  
           	{localStorage.getItem('userDetails') !== null?loginUserDetails:loginFormDOM}	
        	{localStorage.getItem('userDetails') !== null?userLogout:''}
			
			
	<div className={(this.state.upDownGrade===true)?'downgrade-plan active':'downgrade-plan'}>	
	<div className="downgrade-action">
			<p>Are you sure you want to downgrade your PLAN?</p>
			<a href="javascript://" className="btn" onClick={this.downgradeUser.bind(this)} >Yes</a>			
			<a href="javascript://" className="btn" onClick={this.manageProfileBack.bind(this)}>No</a>
	</div>
	<div className="btn-section btn-group-sect">
		<a className="btn btn-primary btn-back" href='javascript://' onClick = {this.manageProdView.bind(this)}></a>
	</div>				
	</div>
		
	{this.state.clickEdit == true && localStorage.getItem('userDetails') !== null?<div className="edit-profile-form">        
     <div className="acc-step-wrap acc-signup-wrap">
	  <div className="signup-form-sec">
	    <h2>Profile</h2>
		{submittedEdit && (this.state.message || this.state.error_msg)? <p className={this.state.message?"alert alert-success":"alert alert-error"}>{(this.state.message)?this.state.message:this.state.error_msg}</p>:''}
		
		<form name="form" method="post" onSubmit={current.updateProfile.bind(current)} id="acc-edit-form" autoComplete="off">
		<div className="edit-profile-inner">
		<Scrollbars className="acc-scroll-wrap"> 
		<div className="form-wrap-inner">
		<div className="form-group">
		<input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_first_name!=undefined ? 'error-field' : '') }
            id="edit_first_name"
            name="edit_first_name"
            type="text"
            placeholder="Name"
            value={this.state.edit_first_name}
            onChange={this.handleChange.bind(this)}
            />
			<label className={submittedEdit && this.state.error_fields.edit_first_name!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_first_name!=undefined ? this.state.error_fields.edit_first_name : ''}</label>
		</div>	
					
        <div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_email!=undefined ? 'error-field' : '') }
            id="edit_email"
            name="edit_email"
            type="text"
            placeholder="Email Address"
            value={this.state.edit_email}
            onChange={this.handleChange.bind(this)}
            />
		<label className={submittedEdit && this.state.error_fields.edit_email!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_email!=undefined ? this.state.error_fields.edit_email : ''}</label>
        </div>
		
		<div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_password!=undefined ? 'error-field' : '') }
            id="edit_password"
            name="edit_password"
            type="password"
            placeholder="Change Password"
            value={this.state.edit_password}
            onChange={this.handleChange.bind(this)}
            />
		<label className={submittedEdit && this.state.error_fields.edit_password!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_password!=undefined ? this.state.error_fields.edit_password : ''}</label>
        </div>
		
		<div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_cpassword!=undefined ? 'error-field' : '') }
            id="edit_cpassword"
            name="edit_cpassword"
            type="password"
            placeholder="Confirm Password"
            value={this.state.edit_cpassword}
            onChange={this.handleChange.bind(this)}
            />
		<label className={submittedEdit && this.state.error_fields.edit_cpassword!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_cpassword!=undefined ? this.state.error_fields.edit_cpassword : ''}</label>
        </div>
		
		<div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_phone_num!=undefined ? 'error-field' : '') }
            id="edit_phone_num"
            name="edit_phone_num"
            type="text"
            placeholder="Phone Number"
            value={(this.state.edit_phone_num != null?this.state.edit_phone_num:'')}
            onChange={this.handleChange.bind(this)}
            />
		<label className={submittedEdit && this.state.error_fields.edit_phone_num!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_phone_num!=undefined ? this.state.error_fields.edit_phone_num : ''}</label>
        </div>
		
        <div className="form-group">
          <input
            className="form-control"
            id="edit_street"
            name="edit_street"
            type="text"
            placeholder="Street"
            value={(this.state.edit_street != null?this.state.edit_street:'')}
            onChange={this.handleChange.bind(this)}
            />
        </div>
        <div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_city_town!=undefined ? 'error-field' : '') }
            id="edit_city_town"
            name="edit_city_town"
            type="text"
            placeholder="City/Town"
            value={(this.state.edit_city_town != null?this.state.edit_city_town:'')}
            onChange={this.handleChange.bind(this)}
            />
			<label className={submittedEdit && this.state.error_fields.edit_city_town!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_city_town!=undefined ? this.state.error_fields.edit_city_town : ''}</label>
        </div>
        <div className="form-group custom-select-wrap country-select">
             <CustomSelect
			 id="edit_country"
             handleSelect={this.handleSelectChange.bind(this)}
             title="Country" 
             className={ 'form-select-control '+(submittedEdit && this.state.error_fields.edit_country!=undefined ? 'error-field' : '') } 
             options={ country_list } 
             selected={ (this.state.edit_country != null?this.state.edit_country:'') } 
             name="edit_country" 
             placeholder="Country"
			 mainFontFamily={this.props.mainFontFamily} 
			 subFontFamily={this.props.subFontFamily}
             />
		<label className={submittedEdit && this.state.error_fields.edit_country!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_country!=undefined ? this.state.error_fields.edit_country : ''}</label>
        </div>
        <div className="form-group">
          <input
            className={ 'form-control '+(submittedEdit && this.state.error_fields.edit_zipcode!=undefined ? 'error-field' : '') }
            id="edit_zipcode"
            name="edit_zipcode"
            type="text"
            placeholder="Zipcode"
            value={(this.state.edit_zipcode != null?this.state.edit_zipcode:'')}
            onChange={this.handleChange.bind(this)}
            />
			<label className={submittedEdit && this.state.error_fields.edit_zipcode!=undefined ? 'error-msg' : ''}>{submittedEdit && this.state.error_fields.edit_zipcode!=undefined ? this.state.error_fields.edit_zipcode : ''}</label>
        </div>
		</div>			
		</Scrollbars>
		</div>		
		<div className="btn-section btn-group-sect">
          	<a className="btn btn-primary btn-back" href='javascript://' onClick = {this.manageProfileBack.bind(this)}></a>   
			<button className="btn btn-primary btn-next">Update</button> 
        </div>
		</form>
      </div>
    </div>
	</div>:''}			
		
		{localStorage.getItem('userDetails') == null?<div className="forgot-password-sec">
		   <form name="form" onSubmit={current.forgotPwd.bind(current)} autoComplete="off">
		   <div className="forgot-password-wrap">
		   <h2>Forgot password</h2>
		   {submittedEmail && (this.state.message || this.state.error_msg)? <p className={this.state.message?"alert alert-success":"alert alert-error"}>{(this.state.message)?this.state.message:this.state.error_msg}</p>:''}
		    <div className="form-group">
		    <div className="input-box">
			 <input type="email" placeholder="Email Address" className={ 'form-control '+(submittedEmail && !emailAddress ? 'error-field' : '') } name="emailAddress" value={emailAddress} onChange={this.handleChange.bind(this)} />  				
		   </div>		   
		   </div>			
		   </div>  	
		   <div className="btn-section btn-group-sect">		 
				<a className="btn btn-primary btn-back" href='javascript://' onClick = {this.manageViews.bind(this)}></a>   
			   <button className="btn btn-primary btn-next">Send</button> 
		   </div>	
		   </form>
	</div>:''}
   </div>
  );
}
}
export default LoginDetails;