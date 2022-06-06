import React, { Component } from "react";
import axios from 'axios';
import qs from 'qs';
import { Scrollbars } from 'react-custom-scrollbars';
import { API_BASE_URL } from '../config/api';
import PackageDetails from './PackageDetails';
import LoginDetails from './LoginDetails';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import ThankYou from './ThankYou';
const config = require('./config');
const BaseURL = config.path.baseUrl;

class UxtLoginForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        currentStep: 0,
        first_name:  '',
        email: '',
        phone_num: '',
        street: '',
        city_town: '',
        country: '',
        zipcode: '',
        card_type: '',
        credit_card_number: '',
        expiry_month: '',
        expiry_year: '',
        d_cvv: '',
        error_message: '',
        thankyou_message: null,
        error_fields: {},
        package_price: '',
        package_text: '',
		pack_pre_id: '',
		package_idis: '',
		package_all_data:'',
		planDes: '',
        loadAjaxStatus: false,
		googleID: '',
		registeredGid: ''
		}

      //this.handleChange = this.handleChange.bind(this);
      //this.handleChangeSocialLogin = this.handleChangeSocialLogin.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      //this._prev        = this._prev.bind(this);
      //this.handleReset  = this.handleReset.bind(this);
      //this.handleSelectChange  = this.handleSelectChange.bind(this);
      //this.packfunc  = this.packfunc.bind(this);
      //this.showLogin  = this.showLogin.bind(this);
    }

    componentDidMount() {
	  let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	  let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
        
      axios.get(API_BASE_URL+'/accessiblity_details').then(res => {
     
            this.setState({
              package_all_data: res.data,
			  package_price: (user_id != null && customerDetails.package_plan == 'free'?res.data[1].acc_price:res.data[0].acc_price),
              package_text: (user_id != null && customerDetails.package_plan == 'free'?res.data[1].acc_description:res.data[0].acc_description),
			  pack_pre_id: (user_id != null && customerDetails.package_plan == 'free'?res.data[1].acc_id:res.data[0].acc_id)
            });
		});		
    }  
    
    packfunc(event){ 
		let Plantype = event.target.id;
		let PackageDiv = '';
		if(Plantype == 'Mg'){
		 this.setState({pack_pre_id:Plantype});
		}else{
		 this.setState({pack_pre_id:Plantype});
		}
	}	
  
    showLogin(){ 
	 setTimeout(() => {
		      $('.full-close').hide();
			  $('.uxt-side-menu-inner').removeClass('active');
		      $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		      $('.acc-login-wrap').addClass('uxt-wa-active-step');
			  $('.userListing').addClass('active');
			  $('.userListing .alert').hide();
			  $('.edit-profile-form, .downgrade-plan').removeClass('active');
			  $('.login-form').addClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
		      //$('.product-lists-uxt .comparison-list').removeClass('active');
	   }, 500); 
	}

    showSignup(){
		setTimeout(() => {
     	  $('.full-close').hide();
		  $('.uxt-side-menu-inner').removeClass('active');
	      $('.acc-step-wrap, .acc-login-wrap').removeClass('uxt-wa-active-step');			
		  $('.acc-package-wrap').addClass('uxt-wa-active-step');
		}, 500);
	}		
	
    handleChange(event) {
	  const {name, value} = event.target
      this.setState({
        [name]: value
      });
    }
	
	handleChangeSocialLogin(res) {
	  this.setState({
        first_name: res.name,
        email: res.email,
        googleId: res.googleId,
      });

	  if(this.state.googleId !=''){
	   setTimeout(() => {
		  this.setState({currentStep: 2});
		  if(this.state.package_idis == 'Mg'){
			 this.handleSubmitGooglePro();
			 return;
		  }
		  else{
           this.handleSubmitPluginGoogle();
		   return;
		  }
		}, 1000);
	  }
    }

    handleSelectChange(name, value) {
      this.setState({
        [name]: value
      });

      let formWrap = document.querySelectorAll(".acc-form-wrapper")[0];
      formWrap.classList.remove('custom-select-active');
    }

    handleReset() {
      //event.preventDefault();
      this.setState({
        currentStep: 0,
        first_name:  '',
        email: '',
        phone_num: '',
        street: '',
        city_town: '',
        country: '',
        idval:'',
        zipcode: '',
		package_idis:'',
        card_type: '',
        credit_card_number: '',
        expiry_month: '',
        expiry_year: '',
        d_cvv: '',
        error_message: '',
        thankyou_message: null,
        error_fields: {},
        isform_valid: false
      });
	  
	  if(this.state.registeredGid != '')
	  {
		 $('.uxt-side-menu').removeClass('active'); 
		 $('.uxt-side-menu-inner').addClass('active');
		 $('.acc-package-wrap').removeClass('uxt-wa-active-step');
		 this.setState({registeredGid: ''});
	  }
	  else{
		 // $('.uxt-side-menu').removeClass('open-package');
	     $('.acc-package-wrap').addClass('uxt-wa-active-step');
	  }

    }
     
    handleSubmit(event) {
	  event.preventDefault();
	  
      if( !this._handleValidation()) {
		return;
      }

      const { first_name, email, card_type, credit_card_number, expiry_month, expiry_year, d_cvv }  = this.state;
	  	
      let formData = {
        first_name: this.state.first_name, 
        email: email, 
        /*phone_num: phone_num, 
        street: street, 
        city_town: city_town, 
        country: country.value, 
        zipcode: zipcode, */
		package_planId: (this.state.package_idis?this.state.package_idis:'MQ'),
        card_type: card_type.value, 
        credit_card_number: credit_card_number.replace(/ /g,''), 
        expiry_month: expiry_month.value, 
        expiry_year: expiry_year.value, 
        d_cvv: d_cvv
      };

     let subscribeForm = document.querySelectorAll("#acc-subscribe-form")[0];

      subscribeForm.classList.add("payment-loading");
      this.setState({loadAjaxStatus : true});
      axios.post(API_BASE_URL + '/insert_accessibilty/', qs.stringify(formData))
      .then( response => {
        this.setState({loadAjaxStatus : false});
        subscribeForm.classList.remove("payment-loading");
         
		if(response.data.status =='success'){
         this.setState({
			currentStep: 4,
			thankyou_message: response.data.message
			},()=>{				   
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				   $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				   });	
		 }	
	   })
      .catch(error => {

        this.setState({loadAjaxStatus : false}); 
        subscribeForm.classList.remove("payment-loading");

        if (error.response) {
          this.setState({
			currentStep: (error.response.data.status =='error'?error.response.data.step:1),
            error_message: error.response.data.message
          });
        } else {
          this.setState({
			currentStep: 1,
            error_message: 'Something went wrong'
          });
        }
		 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
      });
    
    }
	
	
	handleSubmitGooglePro() {
	 
      if( !this._handleValidation()) {
		return;
      }

      const { first_name, email, card_type, credit_card_number, expiry_month, expiry_year, d_cvv, googleId }  = this.state;
	  	
      let formData = {
        first_name: this.state.first_name, 
        email: email, 
       	package_planId: (this.state.package_idis?this.state.package_idis:'MQ'),
        card_type: card_type.value, 
        credit_card_number: credit_card_number.replace(/ /g,''), 
        expiry_month: expiry_month.value, 
        expiry_year: expiry_year.value, 
        d_cvv: d_cvv,
		googleId: this.state.googleId
      };

     let subscribeForm = document.querySelectorAll("#acc-subscribe-form")[0];

      subscribeForm.classList.add("payment-loading");
      this.setState({loadAjaxStatus : true});
      axios.post(API_BASE_URL + '/insert_accessibilty/', qs.stringify(formData))
      .then( response => {
        this.setState({loadAjaxStatus : false});
        subscribeForm.classList.remove("payment-loading");
         
		if(response.data.status =='success'){
         this.setState({
			currentStep: 4,
			thankyou_message: response.data.message,
			registeredGid: this.state.googleId
			},()=>{				   
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				   });	
		 }	
	   })
      .catch(error => {

        this.setState({loadAjaxStatus : false}); 
        subscribeForm.classList.remove("payment-loading");

        if (error.response) {
          this.setState({
			currentStep: (error.response.data.status =='error'?error.response.data.step:1),
            error_message: error.response.data.message
          });
        } else {
          this.setState({
			currentStep: 1,
            error_message: 'Something went wrong'
          });
        }
		 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
      });
    
    }
    
	  handleSubmitPluginGoogle = () => {
      const { first_name, email, googleId }  = this.state;	  	
      let formData = {
        first_name: this.state.first_name, 
        email: email, 
        package_planId: this.state.package_idis,
        googleId: this.state.googleId		
      };     
  
      let subscribeForm = document.querySelectorAll("#acc-subscribe-form")[0];

      subscribeForm.classList.add("payment-loading");
      this.setState({loadAjaxStatus : true});     
     
      if(this.state.currentStep == 2){	 	      
       axios.post(API_BASE_URL + '/insert_pluginUser/', qs.stringify(formData))
      .then( response => {
        //this.setState(prevstate => ({ loadAjaxStatus: !this.state.loadAjaxStatus}));
		this.setState({loadAjaxStatus : false});     
        subscribeForm.classList.remove("payment-loading");
        if(response.data.status =='success'){			
         this.setState({
			currentStep: 4,
			thankyou_message: response.data.message,
			registeredGid: this.state.googleId
			},()=>{			
			   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
			   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				   });	
		 }	
	   })
      .catch(error => {
      
        subscribeForm.classList.remove("payment-loading");
        this.setState({loadAjaxStatus : false});     
        if (error.response) {
          this.setState({
		    currentStep: (error.response.data.status =='error'?error.response.data.step:1),
            error_message: error.response.data.message
          });
        } else {
          this.setState({
			currentStep: 1,
            error_message: 'Something went wrong'
          });
        }
         //this.setState(prevstate => ({ loadAjaxStatus: !this.state.loadAjaxStatus}));
		  $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
      
      });
      
    }
    }
	
    handleSubmitPlugin = (e) => {
      e.preventDefault(); 
      const { first_name, email }  = this.state;	  	
      let formData = {
        first_name: this.state.first_name, 
        email: email, 
        /*phone_num: phone_num, 
        street: street, 
        city_town: city_town, 
        country: country.value, 
        zipcode: zipcode,*/ 
		package_planId: this.state.package_idis       
      };     
  
      let subscribeForm = document.querySelectorAll("#acc-subscribe-form")[0];

      subscribeForm.classList.add("payment-loading");
      this.setState({loadAjaxStatus : true});     
     
      if(this.state.currentStep == 2){	 	      
       axios.post(API_BASE_URL + '/insert_pluginUser/', qs.stringify(formData))
      .then( response => {
        this.setState(prevstate => ({ loadAjaxStatus: !this.state.loadAjaxStatus}));
        subscribeForm.classList.remove("payment-loading");
        if(response.data.status =='success'){
         this.setState({
			currentStep: 4,
			thankyou_message: response.data.message
			},()=>{				   
				   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				   $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				   });	
		 }	
	   })
      .catch(error => {
      
        subscribeForm.classList.remove("payment-loading");

        if (error.response) {
          this.setState({
		    currentStep: (error.response.data.status =='error'?error.response.data.step:1),
            error_message: error.response.data.message
          });
        } else {
          this.setState({
			currentStep: 1,
            error_message: 'Something went wrong'
          });
        }
         this.setState(prevstate => ({ loadAjaxStatus: !this.state.loadAjaxStatus}));
		 
		 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span, .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .item-name a, .sf-title, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .acc-form-wrapper .acc-payment-error').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
      
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
	
	nameValidation(name){
      //var regName = /^[a-zA-Z. ]{2,30}$/;
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

      if(this.state.currentStep==1) {

        const { first_name, email } = this.state;

        if(first_name=='') {
          formIsValid = false;
          error_fields.first_name = 'Name is required';
        }
		else if(!this.nameValidation(first_name)){
		  formIsValid = false;
          error_fields.first_name = 'Enter valid Name';
		}

        if(email=='') {
          formIsValid = false;
          error_fields.email = 'Email Address required';
        } else if (!this._isEmailField(email)) {
          formIsValid = false;
          error_fields.email = 'Invalid Email Address';
        }

        /*if(phone_num=='') {
          formIsValid = false;
          error_fields.phone_num = 'Phone Number required';
        } 

        if(city_town=='') {
          formIsValid = false;
          error_fields.city_town = 'City/Town required';
        }

        if(country=='') {
          formIsValid = false;
          error_fields.country = 'Country required';
        }

        if(zipcode=='') {
          formIsValid = false;
          error_fields.zipcode = 'Zipcode required';
        }*/
      }

      if(this.state.currentStep==2 && this.props.managepackage === true) {        
        const { card_type, credit_card_number, expiry_month, expiry_year, d_cvv }  = this.state;

        if(card_type=='') {
          formIsValid = false;
          error_fields.card_type = 'Card Type required';
        }

        if(credit_card_number.trim()=='') {
          formIsValid = false;
          error_fields.credit_card_number = 'Credit Card required';
        }

        if(credit_card_number.trim().length<18) {
          formIsValid = false;
          error_fields.credit_card_number = 'Credit Card required';
        }


        if(expiry_month=='') {
          formIsValid = false;
          error_fields.expiry_month = 'Expiry Month required';
        }

        if(expiry_year=='') {
          formIsValid = false;
          error_fields.expiry_year = 'Expiry Year required';
        }

        if(d_cvv=='') {
          formIsValid = false;
          error_fields.d_cvv = 'CVV required';
        }
      }

      this.setState({
        error_fields: error_fields,
        isform_valid: formIsValid
      });
      return formIsValid;

    }
    
    _next(val,steps=null) {
	  let currentStep = (steps != null?steps:this.state.currentStep);
	  
	  setTimeout(() => {
          $('.uxt-side-menu').addClass('active');
		  $('.uxt-side-menu-inner').removeClass('active');
      }, 100);
	  
	  if(currentStep == 0){
		 this.setState({package_idis:val});
	  setTimeout(() => {	
	    $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		$('.acc-signup-wrap').addClass('uxt-wa-active-step');
	   }, 100);
	  }
	  else if(!this._handleValidation()) {
		return;
      }	 
	  
      currentStep = currentStep + 1;
       this.setState({
        currentStep: currentStep,
        idval: val,
		
      }, () => {
         if(currentStep >= 2 && val == 'MQ'){  
          this.handleSubmitPlugin(event);
		 }
		 else if(currentStep >= 3 && val == 'Mg'){
		  this.handleSubmit(event);
		 }
       })      
    }
      
    _prev() {
	
	  setTimeout(() => {
          $('.uxt-side-menu').addClass('active');
		  //$('.uxt-menu-list').hide();
		  $('.uxt-side-menu-inner').removeClass('active');
      }, 100);	
	  
	  let currentStep = this.state.currentStep	  
	  
	   if(currentStep > 0){		 		  
		  if($(".uxt-side-menu").hasClass("open-package") && currentStep == 1){
				setTimeout(() => {
				   $('.acc-step-wrap').removeClass('uxt-wa-active-step');
				   $('.acc-package-wrap').addClass('uxt-wa-active-step');
				  }, 200);
		  }
		  else if($(".uxt-side-menu").hasClass("open-package") && currentStep == 2){
				setTimeout(() => {
				   $('.acc-step-wrap').removeClass('uxt-wa-active-step');
				   $('.acc-signup-wrap').addClass('uxt-wa-active-step');
			 }, 200);
		  }
		  else if(currentStep == 1){
				setTimeout(() => {
				   $('.acc-step-wrap').removeClass('uxt-wa-active-step');
				   $('.acc-package-wrap').addClass('uxt-wa-active-step');
				  }, 200);
		  }
		  else if(currentStep == 2){
				setTimeout(() => {
				   $('.acc-step-wrap').removeClass('uxt-wa-active-step');
				   $('.acc-signup-wrap').addClass('uxt-wa-active-step');
			 }, 200);
		  }
		  else if(currentStep == 0){
			  setTimeout(() => {
				   $('.acc-step-wrap').removeClass('uxt-wa-active-step');
				   $('.uxt-side-menu-inner').addClass('active');
				   $('.full-close').show();
			 }, 200);
		  }
		 currentStep = currentStep - 1;
	     this.setState({
			currentStep: currentStep
		  })
	  }
      else if(currentStep <= 0){
		 setTimeout(() => {
           $('.acc-package-wrap').removeClass('uxt-wa-active-step');
		   $('.uxt-side-menu-inner').addClass('active');
		   $('.full-close').show();
          }, 200);
	  }  
    }
  
  /*
  * the functions for our button
  */
  previousButton() {	
	let currentStep = this.state.currentStep;
	
	if(currentStep ==3 && this.props.managepackage === false && this.state.thankyou_message === null){
		this.setState({
         currentStep: 4
        },
        () => {
		 this.handleSubmitPlugin(event);
	   });    	  	    
      return null;
    }
    else if(currentStep ==3){
	  return null;
    }

   // if(currentStep !==0){
      return (
        <button 
          className="btn btn-back btn-primary" 
          type="button" onClick={this._prev.bind(this)}>
        Back
        </button>
      )
   // }
    return null;
  }
  
  nextButton(idval,initial=null){
	var current = this;
	let currentStep = (initial ==1?0:this.state.currentStep);
    //currentStep = current.state.currentStep;
    let stepText = (currentStep==0) ? 'Sign Up' : 'Next';

	let clas = (currentStep==0) ? "" : " float-right";

	//if(currentStep <2){
      return (
        <button 
          className={'btn btn-primary btn-next '+clas}
          type="button" onClick={current._next.bind(current,idval,currentStep)}>
          <span>{stepText}</span>
        </button>        
      )
    //}

    if(currentStep ==2){
      return (
        <button className="btn btn-proceed">Proceed</button>
      )
    }
    return null;
  }

  passData = () =>{
		this.props.userData(localStorage.getItem('userDetails'));
	}
	
  goBack = () =>{
		this.props.goBack();
  }
	
    render() { 				
	   return (
        <React.Fragment>
          <div className="acc-form-wrapper">
		  
		  {/*<div className={(this.state.loadAjaxStatus===true)?'uxt-loading active':'uxt-loading'}></div>*/} 
			
			{this.state.productViewStatus === true && this.state.loadAjaxStatus===true?
		<div className="uxt-loading dynamic-loader login-loader">
	<div className="loading-inner"><span className="load-text">{this.props.loaderText}</span>{(this.props.loaderImage !== '')? <img src={this.props.loaderImage} alt=""/> : ''}		
    </div>
		</div>:''}
			
            <Scrollbars className="acc-scroll-wrap">
                            
                <LoginDetails 
				mainFontFamily={this.props.mainFontFamily} 
				subFontFamily={this.props.subFontFamily} 
				enableLogin = {this.state.currentStep == 4?this.state.registeredGid:''}
				currentStep={(this.props.showpackage === false && this.props.showlogin == true)?this.state.currentStep:-1}
				transferData = {this.passData}
				goBack = {this.goBack}>
				</LoginDetails> 
				          
              <form onSubmit={this.handleSubmitPlugin} id="acc-subscribe-form" autoComplete="off">          
                
                <PackageDetails
                currentStep={(this.props.showpackage === true && this.props.managepackage === true)?this.state.currentStep:-1} 
				package_all_data={this.state.package_all_data}
                package_text={this.state.package_text}
                package_price={this.state.package_price}
                packfunc={this.packfunc.bind(this)}
				showLogin={this.showLogin.bind(this)}
				PackageDiv={this.state.planDes}
                Plantype={this.state.pack_pre_id}				
                >
				  {this.previousButton()}
                  {this.nextButton(this.state.pack_pre_id,1)}
                </PackageDetails>                
                         
                {/*** Sign up fields ***/}                
                               
                <FormStep1 
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange.bind(this)}
                  handleChangeSocialLogin={this.handleChangeSocialLogin.bind(this)}
                  first_name={this.state.first_name}
                  email={this.state.email}
                  error_fields={this.state.error_fields}
                  error_message={this.state.error_message}
				  packagePlan={this.state.package_idis}
                >
                  {this.props.managepackage === false?this.previousButton.bind(this):this.previousButton()}
                  {this.nextButton(this.state.package_idis)}
                </FormStep1>

                {/*** Payment(Credit card) fields ***/}
                {
				<FormStep2
                  currentStep={this.state.currentStep} 
                  handleChange={this.handleChange.bind(this)}
                  handleSelectChange={this.handleSelectChange.bind(this)}
                  card_type={this.state.card_type}
                  credit_card_number={this.state.credit_card_number}
                  expiry_month={this.state.expiry_month}
                  expiry_year={this.state.expiry_year}
                  d_cvv={this.state.d_cvv}
                  error_fields={this.state.error_fields}
                  error_message={this.state.error_message}
				  packagePlan={this.state.package_idis}
                >
                  {this.previousButton()}
                  {this.nextButton(this.state.package_idis)}
                </FormStep2>
			    }
		
                {/*** Thankyou fields ***/
				this.state.currentStep == 4?
                <ThankYou
                  currentStep={this.state.currentStep} 
                  thankyou_message={this.state.thankyou_message}
                  handleReset={this.handleReset.bind(this)}
                >
              </ThankYou>:''
				}
              </form>
            </Scrollbars>
          </div>
        </React.Fragment>
      );
    }
  }

export default UxtLoginForm;