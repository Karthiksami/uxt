import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Route} from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { API_BASE_URL } from '../config/api';
import Search from './Search';
import BuyButton from './BuyButton';
import UxtLoginForm from './UxtLoginForm';
import InvalidDomain from './InvalidDomain';
import Watchlist from './Watchlist';
import Recommendeditems from './Recommendeditems';
import $ from 'jquery';
import PackageDetails from './PackageDetails';
import FormStep2 from './FormStep2';
import ThankYou from './ThankYou';
import CustomSelect from './CustomSelect';
import NumberFormat from "react-number-format";
import { GoogleLogout } from 'react-google-login';
const clientId  = '981059671608-s624g75i1vh18nn377mgkmfjn7oujg0n.apps.googleusercontent.com';

var qs = require('qs');
const config = require('./config');
const APIURL = config.path.apiUrl;
import { API_FRONT_URL, API_MEDIA_URL } from '../config/api';

var idArray = []; 
	
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
	
class AccessibilityButton extends Component {
    constructor(props, context) {
			
        super(props, context); 
    	this.state = {
            merchantFilterVal:'',
            allmerchantFilterVal:'',
            isButtonOpened: false,
            isBuyButtonOpened: false,
            colorMode: true,
            domainVerified: 'error',
            show_subscribe: false,
			tab_colors: '',
			isLoginButtonOpened: false,
			show_login: false,
			productLoadStatus:false,
            loadAjaxStatus: false,addTowishlistsLoad: false, passSearchVal:null, showWatchlist: false, Wishlistactive: false, passSearchValprops:null, searchClicked : false,
            handleView: false, searchValueReset:false, show_package: false, sidemenu: false, showpackage:false, left_position: '', right_position: '', top_position: '', bottom_position: '', productEx:0, triggerfun:true, sideFilterList: false, menuList: false, merchantClicked:false, recentSearchesList : false, recentSearchesClicked:false, recentSearches:'',
			twoColumn: false, showlogin: false, activeBackground: null, showAccessiblity: false, message:'', error_msg:'', upDownGrade: false, menuClicked: false, upGrade:false, downGrade: false, package_all_data:'', pack_pre_id: '', card_type: '',
			credit_card_number: '',
			expiry_month: '',
			expiry_year: '',
			d_cvv: '',
			error_message: '',
			thankyou_message: null,
			error_fields: {},
			package_idis: '',
			searchStore: [],
			searchAllStore: [],
			communitySearchesList: false,
			couponsList: false, 
			liteVersionChecked: true,
			relevanceChecked: (localStorage.getItem('relevanceChecked')?(localStorage.getItem('relevanceChecked') == 'true'?true:false):false),
			checkedTwoColumn: (localStorage.getItem('checkedTwoColumn')?(localStorage.getItem('checkedTwoColumn') == 'true'?true:false):true),
			notifications: (localStorage.getItem('notifications')?(localStorage.getItem('notifications') == 'true'?true:false):false),
			bgColor: 'white',
			showSetting: false, 	
			couponConfirm:false,
			stay: false,
			href: '',
			mainFontUrl:'',	
			mainFontFamily:'',	
			subFontUrl:'',	
			subFontFamily:'',
			restrictTrack:false,
			upgradeContent:'',
			showRecommendedList:false,
			recommendedListactive:false,
			defaultFont:'Goldman Sans',
			myStores: false,
			addStores: false,
			topToBottom:false,
			rightToLeft:false,	
            showCouponDetails:'',
			notificationShow: false,
			productFilter: false,
			notificationInnerShow: false,
			notificationMenu: false,
			storeSendFilters:'',
			filterClosed: 0,
			notificationKey:'',
			overRideClick: false,
			overRideKey:'',
			enableNotify: false,
			loaderText:'',
			loaderImage:'',
			couponIconHit: false,
			ListTwoColumn: true,
		};
		      
        this.handleToggleBtn = this.handleToggleBtn.bind(this);
        this.handleToggleBuyBtn = this.handleToggleBuyBtn.bind(this);
        this.getSelectedKeyword = this.getSelectedKeyword.bind(this);
        this.handleToggleLoginBtn = this.handleToggleLoginBtn.bind(this);

       	//this.handleMenuHead = this.handleMenuHead.bind(this);
        //this.handleSideMenu = this.handleSideMenu.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);  
			
		this.handleBackground = this.handleBackground.bind(this);
        this.backgroundColors = {
            white: "#ffffff",
            blue: "#cccccc",
            black: "#000000",
			grey: "#4F4F4F",
			offWhite: "#fcf2dc",
			blueYellow: "",
            blackYellow: "",
			greyYellow: "",
        };	
		
		this.productFilterPrice = {
			"1-500":"From $1 - $500",
			"501-2000":"From $501 - $2000",
			"2001-5000":"From $2001 - $5000",
			"5001-10000":"From $5001 - $10000",
			"10000 Above":"Above $10000"
		}
				
		
			
		this.handleBackgroundSettings = this.handleBackgroundSettings.bind(this);
		this.packfunc  = this.packfunc.bind(this);
		//this.handleChange = this.handleChange.bind(this);
        //this.handleReset  = this.handleReset.bind(this);
        //this.handleSelectChange  = this.handleSelectChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
		
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails.user_id?customerDetails.user_id:'');
		axios.get(API_BASE_URL+'/accessiblity_details').then(res => {
			this.setState({
              package_all_data: res.data,
			  pack_pre_id:(user_id != null && customerDetails.package_plan == 'free'?res.data[1].acc_id:res.data[0].acc_id),
			 });
		});
    }

	onSuccess = () => {
       this.logoutUser();
    }
	
	fontStyleMain = (mainFont) =>{ 
			var css = document.createElement('style'); 
            css.type = 'text/css';        
            if (css.styleSheet) { 
                css.styleSheet.cssText = mainFont; 
			}
            else { 
                css.appendChild(document.createTextNode(mainFont)); 
			}              
            document.getElementsByTagName("head")[0].appendChild(css); 
	}
	
    fontStyleSub = (subFont) =>{ 
			var css = document.createElement('style'); 
            css.type = 'text/css';        
            if (css.styleSheet) { 
                css.styleSheet.cssText = subFont; 
			}
            else { 
                css.appendChild(document.createTextNode(subFont)); 
			}              
            document.getElementsByTagName("head")[0].appendChild(css); 
	}
	
	
	 componentDidMount() {		 
			
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails.user_id?customerDetails.user_id:'');
		
	   const access_id = document.querySelector("#uxt_container").getAttribute("data-client");
        axios.get(API_BASE_URL+'/check_domain/'+access_id)
        .then(res => {
           
            const data = res.data;     
			cookie.save("tab_color",data.result_set.tab_color);			
            this.setState(nextState => {
                return { 
                    domainVerified: data.status, 
                    show_subscribe: data.result_set.show_subscribe,
					tab_colors: data.result_set.tab_color,
					show_login: data.result_set.show_login,
					show_package: data.result_set.show_package,
					left_position: data.result_set.left_position,
					right_position: data.result_set.right_position,
					top_position: data.result_set.top_position,
					bottom_position: data.result_set.bottom_position,
					upgradeContent: data.result_set.upgrade_content,
					loaderText: data.result_set.st_loader_text,
					loaderImage: data.result_set.st_loader_image
					
                };
            }, () => {

                if( this.state.domainVerified=='success' ) { 					
					
					if(data.main_font.font_family == 'Goldman Sans' || data.main_font.font_family == 'Goldman'){		
						this.setState({mainFontFamily: data.main_font.font_family, subFontFamily: data.main_font.font_family}); 			
						
					}else{	
						this.setState({mainFontUrl: data.main_font.import_url, mainFontFamily: data.main_font.font_family,	subFontUrl: data.sub_font.import_url,
					subFontFamily: data.sub_font.font_family});						 
						var mainFont = this.state.mainFontUrl;
						var subFont = this.state.subFontUrl;
						this.fontStyleMain(mainFont);	
						this.fontStyleSub(subFont);						
					} 	
				
                    let body = document.querySelectorAll("body")[0];
                    body.classList.add("acc-initialized");
                    body.classList.remove("acc-invalid-domain");
        
                    if(this.state.colorMode) {
                        
                        if(cookie.load("tab_color") == '#1170FF')
                          body.classList.add("acc-blue-theme");
                        else if(cookie.load("tab_color") == '#001B93')
                          body.classList.add("acc-dark-blue-theme"); 
                        else if(cookie.load("tab_color") == '#9E4C01')
                          body.classList.add("acc-orange-theme"); 
                        else if(cookie.load("tab_color") == '#4A9E01')
                          body.classList.add("acc-green-theme"); 
                        else if(cookie.load("tab_color") == '#38019E')
                          body.classList.add("acc-purple-theme"); 
					    else if(cookie.load("tab_color") == '#000000')
                          body.classList.add("acc-black-theme");
                        else
                         body.classList.add("acc-blue-theme");
                    }                   
                }				
		  });
        });

		
        let body = document.querySelectorAll("body")[0];

        if( this.state.domainVerified=='error' ) {
            body.classList.add("acc-invalid-domain");
        }
        body.classList.add("acc-client-"+access_id);
	
		
		if ($("#search_val").length > 0) {
				$('#search_val').focus(function() {
				$(this).parents('.header-row-uxt').addClass('focused');
				$('.reset').addClass('active');				 	
				$('.topfull-close').hide();
			});
		}			
		
		$('.product-lists-uxt').click(function(){
			$('.header-row-uxt').removeClass('focused');
			$('.reset').removeClass('active');		
			$('.topfull-close').show();				
		});
		
		$('.comparison-list .acc-scroll-wrap > div').scroll(function() {
				if ($('.comparison-list .acc-scroll-wrap > div').scrollTop() > 100) {	
					$('.scrollup').addClass('active');	
				} else {
					$('.scrollup').removeClass('active');
				}
		});	
		
		$('.scrollup').click(function(){
			$(".comparison-list .acc-scroll-wrap > div").animate({ scrollTop: 0 }, 600);
			$(".watchlist_list .acc-scroll-wrap > div").animate({ scrollTop: 0 }, 600);
			return false;
		});
		
		$('.watchlist_wrap').click(function(){
			$('.header-row-uxt').removeClass('focused');			
		});
		
		$('.watchlist_list .acc-scroll-wrap > div').scroll(function() {
			if ($('.watchlist_list .acc-scroll-wrap > div').scrollTop() > 100) {	
				$('.scrollup').addClass('active');	
			} else {
				$('.scrollup').removeClass('active');
			}
		});	
		
				
		$(window).on('resize', function(){  
			if ($(window).width() < 768) {	
				$('.acs_control_sec').removeClass('two-column');
				$('.two-columns').removeClass('active');				
			}
		});
		if(customerDetails != null){
			axios.post(APIURL+'products/getMenuDetails', qs.stringify({user_id:customerDetails.user_id})).then(response => {
			if(response.data.status === "ok"){	
	  			localStorage.setItem('storeRecentSearches',JSON.stringify(response.data.recent_searches));					
    			localStorage.setItem('storeCommunitySearches',JSON.stringify(response.data.community_searches));					
				localStorage.setItem('wishlistCount', response.data.count);	
        	  	localStorage.setItem('feedrStores', response.data.feedrStores);	
        	  	localStorage.setItem('recommended', JSON.stringify(response.data.recommended));	
        	  	localStorage.setItem('notifications', JSON.stringify(response.data.allNotifications));	
				this.saveSettings(response.data.user_data);
				this.setState({showCouponDetails:this.doListCopons(JSON.stringify(response.data.coupon_results))});
				
			}	 		
        });
		}
		else{
			axios.post(APIURL+'products/getMenuDetails', qs.stringify({user_id:0})).then(response => {
			if(response.data.status === "ok"){	
				localStorage.setItem('storeCommunitySearches',JSON.stringify(response.data.community_searches));					
				localStorage.setItem('wishlistCount', 0);	
        	  	localStorage.setItem('recommended', JSON.stringify(response.data.recommended));	
				localStorage.setItem('feedrStores', response.data.feedrStores);	
				localStorage.setItem('notifications', JSON.stringify(response.data.allNotifications));	
				this.setState({showCouponDetails:this.doListCopons(JSON.stringify(response.data.coupon_results))});
			}	 		
        });
		}
		
		$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notify-remove, .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
			
		 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
		 
	}
	
	componentWillUnmount() {
     clearTimeout();
    }
	
    handleToggleBtn(e) {
        this.setState({
            isButtonOpened: !this.state.isButtonOpened,
            isBuyButtonOpened: false,
            isLoginButtonOpened: false,
        });
    }

    handleToggleBuyBtn(e) {
	       this.setState(nextState => {
            return {
                isButtonOpened: false,
                isLoginButtonOpened: false,
                isBuyButtonOpened: !this.state.isBuyButtonOpened
            };
        }, () => {
	
	 $('#wrap-srch-02').hide();
     setTimeout(() => {	
	 localStorage.removeItem('storeProducts');
     var setKeyword = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
	 setKeyword = setKeyword.replace(/-/g,' ');
	 if(setKeyword !== null){
		   localStorage.removeItem('storeSelectedMerchants');	  		
		   this.setState({ searchClicked: true, triggerfun:true, merchantFilterVal:'', productEx:0,  sideFilterList: false, recentSearchesList: true, couponsList: true, couponConfirm: false, communitySearchesList: true, passSearchValprops:setKeyword, productLoadStatus:true});		  
		   localStorage.setItem('setkeyword', setKeyword);		
         } 
		
      }, 100);
	  
	   setTimeout(() => {
         var defaultOpen = (localStorage.getItem('Home') == 'Close'?'':'Home') ;		   
	     this.setState({notificationInnerShow:true, notificationMenu: false, notificationKey:defaultOpen, overRideKey:'Home'}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });	
		 this.hideNotification();
	   }, 5000);               
    });	
   }
	
		
	handleToggleLoginBtn(e) {
       this.setState(nextState => {
            return {
                isButtonOpened: false,
                isLoginButtonOpened: !this.state.isLoginButtonOpened,
                isBuyButtonOpened: false,
            };
        });
    }
	
	handleSideMenu = (elementVal) => {	
	var uri = window.location.toString();
	if (uri.indexOf("?") > 0) {
		var clean_uri = uri.substring(0, uri.indexOf("?"));
		window.history.replaceState({}, document.title, clean_uri);
	}
	$('.product-lists-uxt .product-detail-content, .restrict-track-wrap').removeClass('active');
	$('.acc-form-wrapper, .upgrade-plan').removeClass('active');
	setTimeout(() => {	
	    $('.acc-step-wrap').removeClass('uxt-wa-active-step');
	}, 100);
	     		
	this.setState({ merchantClicked: false, Wishlistactive: false, recentSearchesClicked:false, productLoadStatus:true, sidemenu: true, passSearchValprops:'', menuClicked: true, upDownGrade: false, couponConfirm: false, notificationKey:'', overRideKey:'Home', enableNotify: false, couponIconHit: false}); 

    var userDet = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
	 if(userDet !=  null && this.state.showWatchlist == true){
		 this.setState({ showWatchlist: true });
	 }
	 else{
		 this.setState({ showWatchlist: false });
	 }
	 
	 if(userDet !=  null && this.state.showRecommendedList == true){
		 this.setState({ showRecommendedList: true });
	 }
	 else{
		 this.setState({ showRecommendedList: false });
	 }
 
	 if(elementVal == 'menulist' && this.state.recentSearchesList === true && this.state.menuClicked == false){
		this.setState({menuList: true, recentSearchesList: false, sidemenu: true, sideFilterList: false, showAccessiblity: false, menuClicked:false, upDownGrade: false, communitySearchesList: false, couponsList:false, couponConfirm: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false});
		setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active');
		}, 500);
	 }   
      else if(elementVal == 'menulist' && this.state.communitySearchesList === true && this.state.menuClicked == false){
		this.setState({menuList: true, communitySearchesList: false, sidemenu: true, sideFilterList: false, showAccessiblity: false, menuClicked:false, upDownGrade: false, couponsList:false, couponConfirm: false, recentSearchesList: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false});		
		setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active');
		}, 500); 
	}	
	else if(elementVal == 'menulist' && this.state.couponsList === true && this.state.menuClicked == false){
		this.setState({menuList: true, communitySearchesList: false, sidemenu: true, sideFilterList: false, showAccessiblity: false, menuClicked:false, upDownGrade: false, couponsList:false, couponConfirm: false, recentSearchesList: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false});	 
		setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active'); 
		}, 500);
	}
	else if(elementVal == 'menulist' && this.state.sideFilterList === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false });		
		setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active');
		}, 500);
	}
	else if(elementVal == 'menulist' && (this.state.showlogin === true  || this.state.showpackage == true)){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:false, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false});
		 $('.full-close').show();
		setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active'); 
		}, 500);
		if(this.state.showlogin != this.state.showpackage){
			 this.setState({menuClicked:true});
		}
	}
	else if(elementVal == 'menulist' && this.state.showAccessiblity === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false },()=>{
			setTimeout(() => {			
				$('.uxt-side-menu-inner').addClass('active'); 
			}, 500);
		});
		$('.full-close').show();		 
	
	} 
	else if(elementVal == 'menulist' && this.state.productFilter === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false},()=>{
			setTimeout(() => {			
				$('.uxt-side-menu-inner').addClass('active'); 
			}, 500);
		});
		$('.full-close').show();		 
	
	} 
	else if(elementVal == 'menulist' && this.state.notificationShow === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false},()=>{
			setTimeout(() => {			
				$('.uxt-side-menu-inner').addClass('active'); 
			}, 500);
		});
		$('.full-close').show();		 
	
	}
	else if(elementVal == 'menulist' && this.state.showSetting === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false}, ()=>{
			setTimeout(() => {	
			$('.uxt-side-menu-inner').addClass('active'); 
		}, 500);
		});
		 $('.full-close').show();		 
	}
	else if(elementVal == 'menulist' && this.state.upDownGrade === true){
		this.setState({menuList: true, sideFilterList: false, sidemenu: true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showlogin: false, showpackage:false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, notificationInnerShow: false, notificationMenu:false, overRideKey:''});
		$('.full-close').show();
		$('.uxt-side-menu-inner').addClass('active'); 
	}
	 else if(elementVal == 'menulist'){
		this.setState({sidemenu: !this.state.sidemenu, menuList: true,sideFilterList:false, recentSearchesList: false, communitySearchesList: false, showAccessiblity: false,menuClicked:true, upDownGrade: false, couponsList: false, couponConfirm: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false});		
		$('.uxt-side-menu-inner').addClass('active'); 		
	 }
	 else if(elementVal == 'filterlist'){
		var defaultOpen = (localStorage.getItem('StoreFilter') == 'Close'?'':'StoreFilter');
		this.setState({sidemenu: true, menuList: true,sideFilterList:true, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, notificationInnerShow: false, notificationMenu: true, notificationKey: defaultOpen, overRideKey: 'StoreFilter', enableNotify: true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 }); 
		 $('.uxt-side-menu-inner').removeClass('active'); 
		 this.hideNotification();
	 }
	 else if(elementVal == 'searchlist'){
		var defaultOpen = (localStorage.getItem('ProductFilter') == 'Close'?'':'ProductFilter');
		this.setState({sidemenu: true, menuList: true,sideFilterList:false, recentSearchesList: false, communitySearchesList:false, couponsList:false, couponConfirm: false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: true, notificationShow: false,notificationInnerShow: false, notificationMenu: true, notificationKey: defaultOpen, overRideKey: 'ProductFilter', enableNotify: true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 }); 
		 $('.uxt-side-menu-inner').removeClass('active'); 
		 
		//this.hideNotification();
	 }
	 else if(elementVal == 'couponlist'){
		var defaultOpen = (localStorage.getItem('Coupons') == 'Close'?'':'Coupons');
		this.setState({sidemenu: true, menuList: true,sideFilterList:false, recentSearchesList: false, communitySearchesList:false, couponsList:true, couponConfirm: false, showAccessiblity: false, menuClicked:true, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false,notificationInnerShow: false, notificationMenu: true, notificationKey: defaultOpen, overRideKey: 'Coupons', enableNotify: true, couponIconHit: true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 }); 
		 $('.uxt-side-menu-inner').removeClass('active'); 
		 
		//this.hideNotification();
	 }	 
	 else if(elementVal == 'storelist'){
		this.setState({sidemenu: true, menuList: true,sideFilterList:true, recentSearchesList:false, communitySearchesList: false, couponsList:false, couponConfirm: false, showAccessiblity: false, menuClicked:false, upDownGrade: false, showSetting:false, productFilter: false, notificationShow: false, enableNotify: false});
		$('.uxt-side-menu-inner').removeClass('active');
       this.hideNotification();		
	 }
	 document.addEventListener('click', this.handleOutsideClick, false);
	}
		
    
	handleMenuHead = () => {
		
		this.setState({notificationKey:'',overRideKey:'Home',enableNotify: false});
	    if (this.state.sidemenu === false) { 
		 if(this.state.upDownGrade == true){
			this.setState(prevState => ({
             sidemenu: !prevState.sidemenu,
            })); 
			document.removeEventListener('click', this.handleOutsideClick, true);
		 }
		 else{
		  document.addEventListener('click', this.handleOutsideClick, true);
		 }
     } 
	 else if(this.state.sidemenu === this.state.showpackage && this.state.sidemenu == true){
		document.addEventListener('click', this.handleOutsideClick, false);
	 }
	 else if(this.state.sidemenu === this.state.showlogin && this.state.sidemenu == true){
		document.removeEventListener('click', this.handleOutsideClick, true);
	 }
	 else {
		if(this.state.sidemenu != this.state.showpackage && (this.state.showlogin != false  && this.state.showpackage != false) && this.state.upDownGrade == true){
			this.setState(prevState => ({
             sidemenu: !prevState.sidemenu,
            }));
		    document.addEventListener('click', this.handleOutsideClick, false);
		 }	
		 else if(this.state.showlogin == false  && this.state.showpackage == false && this.state.menuClicked == false && this.state.upDownGrade == false){
			 this.setState({menuClicked:true})
			 this.setState(prevState => ({
             sidemenu: !prevState.sidemenu,
            }));
			 document.removeEventListener('click', this.handleOutsideClick, true);
		 }		 
		 else if(this.state.showlogin == false  && this.state.showpackage == false && this.state.menuClicked == true && this.state.upDownGrade == true){
			  document.addEventListener('click', this.handleOutsideClick, false);
		 }
		 else if(this.state.showlogin == false  && this.state.showpackage == false && this.state.menuClicked == true){
			 this.setState({menuClicked:false})
			 document.addEventListener('click', this.handleOutsideClick, false);
		 }
		 else if(this.state.upDownGrade == true){
			 document.removeEventListener('click', this.handleOutsideClick, true);
		 }
     }         
   }
		 
	handleOutsideClick(e) {
	 this.setState({merchantClicked:false, Wishlistactive:false, recentSearchesClicked:false, couponIconHit: false},()=>{
		  setTimeout(() => {
			   $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notify-remove, .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
			
			 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
			   }, 200);
		
	 });
	 
	 // ignore clicks on the component itself
     if(this.state.sideFilterList == true && this.state.merchantClicked == false && this.node.contains(e.target) == false) {
		  this.setState({sidemenu:false,notificationKey:'',overRideKey:'Home'});
		  return;
      }
	  else if(this.state.couponsList == true && this.state.couponIconHit == true) {
		  this.setState({sidemenu:false,notificationKey:'',overRideKey:'Home'});
		  return;
      }
	  /*else if(this.state.showSetting == true && this.node.contains(e.target) == true) {
		  this.setState({sidemenu:true});
	  }	  
	  else if(this.state.productFilter == true && this.state.menuList == false && this.node.contains(e.target) == false) {
		  this.setState({sidemenu:false});
		   console.log('close menu');
		   return;
      }*/
      else if(this.state.merchantClicked == true && this.node.contains(e.target)) {
		  if($(".uxt-side-menu").hasClass("open-package")){
				this.setState({sidemenu:false,notificationKey:'',overRideKey:'Home'});
			}			  
		console.log('return else if');
		return;
      } 
      else if(this.node.contains(e.target)) {
		  if($(".uxt-side-menu").hasClass("open-package")){
				this.setState({sidemenu:false,notificationKey:'',overRideKey:'Home'});
			}			  
		console.log('return');
		return;
      }     
      this.handleMenuHead.bind(this);
    }
	
     
   hideX = (event) => {
	   setTimeout(() => {
		     this.setState({searchValueReset:true})
	   }, 200);	 	
   }
   
   showX = (event) => {
	    setTimeout(() => {
			this.setState({searchValueReset:false},()=>{
				$('.topfull-close').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');					
			});
		}, 200);	   	
   }
   
   getCouponKeywords  = (event) => {
	   var setCouponKeyword = event.target.value;
	     axios.post(APIURL+'products/getCouponSearchRecords', qs.stringify({searchWords:setCouponKeyword})).then(response => {
			if(response.data.status === "ok"){	
			   setTimeout(() => {
				 this.setState({showCouponDetails:this.doListCopons(JSON.stringify(response.data.coupon_results))},()=>{
				 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notify-remove, .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
					
				 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
			 });
		    }, 100);                
			}	   
           });
   }
   
   enterPressed = (event) => {
		   
	   var current = this;
	   $('.product-lists-uxt .comparison-list').addClass('active');
	   var user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		if(user != null){
	      $('.uxt-side-menu').removeClass('active');
		}
		
	   this.setState({searchValueReset: true, productLoadStatus:false});	
	   var code = event.keyCode || event.which;		
        if(code === 13) { //13 is the enter keycode    
   
       setTimeout(function(){ 
	     current.setState({ searchValueReset: false, Wishlistactive:false, showWatchlist: false, searchClicked: false, showRecommendedList : false, recommendedListactive: false, couponsList:false, couponConfirm: false});		
		 localStorage.removeItem('setkeyword');
		 localStorage.removeItem('storeProducts');
		}, 100);
		
		  var setKeyword = event.target.value;
		  if(setKeyword !== null){
			  this.setState({ searchClicked: true, triggerfun:true, merchantFilterVal:'', productEx:0, passSearchValprops:setKeyword, productLoadStatus:true });	
			localStorage.setItem('setkeyword', setKeyword);	
		    localStorage.removeItem('storeSelectedMerchants');	  
		  }	
		  $('.header-row-uxt').removeClass('focused');	
        }
			
      }	
	
	reSetSearchVal(){		
		localStorage.removeItem('setkeyword');
		localStorage.removeItem('storeProducts');
		//localStorage.removeItem('showMerchantFilter');
		localStorage.removeItem('storeSelectedMerchants');
		document.getElementById('search_val').value = '';
		this.setState({searchValueReset: false, productLoadStatus:true});	
		this.setState(prevState => ({
         sidemenu: false
        })); 	
	}
	
	reSetSearch(){		
	      var current = this;
	      $('.product-lists-uxt .comparison-list').addClass('active');
		  
		  var user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		  if(user != null){
	       $('.uxt-side-menu').removeClass('active');
		  }
	    
		 setTimeout(() => {
		  current.setState({ searchValueReset: true, Wishlistactive:false, showWatchlist: false, showRecommendedList : false, recommendedListactive: false, searchClicked: false, couponsList:false, couponConfirm: false});		
		  localStorage.removeItem('setkeyword');
		  localStorage.removeItem('storeProducts');
		 }, 100);
		             
		  var setKeyword = $(".search_val").val();
		   if(setKeyword !== null){
			current.setState({ searchClicked: true, triggerfun:true, merchantFilterVal:'', productEx:0, passSearchValprops:setKeyword, productLoadStatus:true });	
		    localStorage.setItem('setkeyword', setKeyword);	
		    localStorage.removeItem('storeSelectedMerchants');	  
		  }	
		  
		$('.header-row-uxt').removeClass('focused');		
		
	}
    	
	loadWatchList = (getVal) => {		
	$('.couponlist_wrap').hide();
	 if(getVal == 'clicked' && $('.h-favourite').hasClass('show')){
			this.setState({ sidemenu: false, showWatchlist: false, Wishlistactive:false, showRecommendedList : false, recommendedListactive: false, couponsList:false, couponConfirm: false }); 
			setTimeout(() => {
				  $('.watchlist_wrap, .uxt-side-menu').removeClass('active');
				  $('.product-lists-uxt .comparison-list').addClass('active');
				  $('.h-favourite').removeClass('show').addClass('hide');
				  }, 200);			
		}
		else{
			this.setState({ sidemenu: false, showWatchlist: true, Wishlistactive:false, showRecommendedList : false, recommendedListactive: false, couponsList:false, couponConfirm: false}); 		
			this.loadWatchListSideMenu('clicked');
			$('.recommended_wrap').removeClass('active');
		}
  	}	
	
	hideNotification(){
		setTimeout(() => {
		 this.setState({notificationInnerShow : false, notificationMenu : false, overRideClick: false}); 
	}, 5000);
	}
	
	loadWatchListSideMenu = (getValue) => {
	 var defaultOpen = (localStorage.getItem('Tracking') == 'Close'?'':'Tracking');
	 this.setState({showWatchlist : true, Wishlistactive: true, showRecommendedList : false, recommendedListactive: false, couponsList:false, couponConfirm: false, notificationInnerShow : true, notificationMenu: false, notificationKey : defaultOpen, overRideKey:'Tracking'}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 }); 
		$('.product-lists-uxt .comparison-list, .product-lists-uxt .product-detail-content').removeClass('active');
		$('.acc-step-wrap').removeClass('uxt-wa-active-step');
		$('.acc-login-wrap').removeClass('uxt-wa-active-step');
		$('.recommended_wrap').removeClass('active');
	  setTimeout(() => {
		this.setState({ sidemenu: false, Wishlistactive: false});
        $('.watchlist_wrap').addClass('active');		
        $('.h-favourite').addClass('show');		
      }, 100); 

       this.hideNotification();	  
	}
	
	
	loadRecommendedListSideMenu = (getValue) => {
	 var defaultOpen = (localStorage.getItem('UserLikes') == 'Close'?'':'UserLikes');
	 this.setState({ showRecommendedList : true, recommendedListactive: true, showWatchlist: false, Wishlistactive:false, couponsList:false, couponConfirm: false, notificationInnerShow:true, notificationMenu: false, notificationKey:defaultOpen, overRideKey:'UserLikes'}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 }); 
		$('.product-lists-uxt .comparison-list, .product-lists-uxt .product-detail-content').removeClass('active');		
	  setTimeout(() => {
		this.setState({ sidemenu: false, recommendedListactive: false});
        $('.recommended_wrap').addClass('active');	
      }, 100);

      this.hideNotification();	  	  
	}

		
	ClosePlugin(){
		$('#wrap-srch-02').show();
		this.setState({ isBuyButtonOpened : false, sideFilterList: false, sidemenu:false , notificationKey:'',overRideKey:'Home' });	
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
	
	showLogin = () =>{	
	 setTimeout(() => {
		 var defaultOpen = (localStorage.getItem('Profile') == 'Close'?'':'Profile');
		 this.setState({showWatchlist: false, productLoadStatus: true, showpackage:false, showlogin:true, sidemenu: true, menuList: true, upDownGrade: false, showRecommendedList : false, couponsList:false, couponConfirm: false, notificationInnerShow: false, notificationMenu: true, notificationKey: defaultOpen, overRideKey:'Profile', sideFilterList: false, enableNotify: true, productFilter: false }, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });
			  $('.uxt-side-menu').addClass('active');
			  $('.full-close').hide();
		      $('.uxt-side-menu-inner').removeClass('active');
		      $('.acc-form-wrapper').addClass('active');			  
		      $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		      $('.acc-login-wrap').addClass('uxt-wa-active-step');
			  $('.userListing').addClass('active');
			  $('.userListing .alert').hide();
			  $('.edit-profile-form, .downgrade-plan, .upgrade-plan').removeClass('active');
			  $('.login-form').addClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
		      //$('.product-lists-uxt .comparison-list').removeClass('active');
			  document.removeEventListener('click', this.handleOutsideClick, false);
          }, 100);  

        this.hideNotification();	  		  
	 }
	 
	 
	headProfile = () =>{	
   	 setTimeout(() => {
		 this.setState({showpackage:false, showlogin:true, menuList: true, sideFilterList: false, recentSearchesList: false, communitySearchesList: false, showSetting: false, couponsList:false, couponConfirm: false, showAccessiblity: false, upDownGrade: false, productFilter: false, notificationShow: false});
		this.setState(prevState => ({
			sidemenu: !prevState.sidemenu,
		})); 
		      $('.full-close').hide();
		      $('.uxt-side-menu-inner').removeClass('active');
		      $('.acc-form-wrapper').addClass('active');			  
		      $('.acc-step-wrap').removeClass('uxt-wa-active-step');
		      $('.acc-login-wrap').addClass('uxt-wa-active-step');
			  $('.userListing').addClass('active');
			  $('.userListing .alert').hide();
			  $('.edit-profile-form, .downgrade-plan').removeClass('active');
			  $('.login-form').addClass('active');
			  $('.change-password-sec, .forgot-password-sec').removeClass('active');
          }, 100);  	 
	 }
	 
	 	 
	upgradeUser = () => { 
		
		 this.setState({sidemenu: true, menuList: false, upDownGrade: true, message:'', error_msg: ''});
	 	 axios.get(API_BASE_URL+'/accessiblity_details').then(res => {
			  this.setState({
              package_all_data: res.data,
			  pack_pre_id:res.data[1].acc_id,
			  message: '',
			  error_msg: '',
			  upDownGrade: true, 
			  menuList: false,
			  sidemenu: true
			});
		});		
		$('.upgrade-plan-inner .acc-package-wrap').addClass('uxt-wa-active-step');
       }
 
	showSignup = () =>{	 
	  setTimeout(() => {
		  $('.uxt-side-menu').addClass('active');
		  this.setState( {Wishlistactive:false, showWatchlist: false, productLoadStatus: true, showpackage:true, showlogin:false, sidemenu: true, menuList: true, showRecommendedList : false, recommendedListactive : false, couponsList:false, couponConfirm: false, sideFilterList: false });
		  $('.full-close').hide();
		  $('.uxt-side-menu-inner').removeClass('active');
		      $('.acc-form-wrapper').addClass('active');
	      $('.acc-step-wrap, .acc-login-wrap').removeClass('uxt-wa-active-step');			
           	if(this.state.show_package === true){
				 $('.acc-package-wrap').addClass('uxt-wa-active-step');
		    }
		    else{
				 $('.acc-signup-wrap').addClass('uxt-wa-active-step');
			}	
           document.removeEventListener('click', this.handleOutsideClick, false);			
			}, 100);     		 		 
	 }
	 
	productExist = (productExist) => { 
		this.setState({productEx:productExist, triggerfun:false});
	}  
	
	 logoutUser() {
		 this.handleBackground('white');
		setTimeout(() => {
			  localStorage.removeItem('propsCheck');
			  localStorage.removeItem('customerDetails');
			  localStorage.removeItem('userDetails');
			  localStorage.removeItem('wishlistCount');
			  localStorage.removeItem('loggedIn');
			  localStorage.removeItem('storeRecentSearches');
			  localStorage.removeItem('liteVersionChecked');
			  localStorage.removeItem('notifications');
			  localStorage.removeItem('relevanceChecked');
			  localStorage.removeItem('checkedTwoColumn');
			  localStorage.removeItem('storeCoupons');
			  localStorage.removeItem('storeCouponsDefault');
			  localStorage.removeItem('replaceCouponFilters');
			  localStorage.removeItem('showAllMerchants');
			  localStorage.removeItem('showAllMerchantsDefault');
			  localStorage.removeItem('wishlistLoad');     				
			  localStorage.removeItem('wishlistCount'); 
			  localStorage.setItem('loggedIn', 1);
			  $('a.login.user').html('');
			  $('.h-favourite').addClass('hidden');
			  this.setState({ loadAjaxStatus: false, Wishlistactive:false, showWatchlist: false, sidemenu: false, upDownGrade: false, productLoadStatus:true, showRecommendedList : false, recommendedListactive : false, couponsList: false, couponConfirm: false, enableNotify: false, productFilter: false, notificationShow: false, notificationInnerShow: false, notificationMenu:false, notifications: false});
			  document.removeEventListener('click', this.handleOutsideClick, false);
				
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
			$('.product-lists-uxt .product-detail-content, .upgrade-plan').removeClass('active');		      
		}, 500);
    }    
	 	 
	getSelectedMerchants(merchantFilterVal) {
        this.setState({merchantFilterVal:merchantFilterVal, merchantClicked: true, recentSearchesClicked: false, sidemenu: true, couponsList:false, couponConfirm: false});
		
		//document.removeEventListener('click', this.handleOutsideClick, false);
    }
	
	getAllSelectedMerchants(merchantFilterVal) {
        this.setState({allmerchantFilterVal:merchantFilterVal, allmerchantClicked: true, recentSearchesClicked: false, sidemenu: true, couponsList:false, couponConfirm: false});
		
		document.removeEventListener('click', this.handleOutsideClick, false);
    }
	
	getSelectedKeyword(recentSearchKeywords,type='') {
		localStorage.removeItem('setkeyword');
		localStorage.setItem('setkeyword', recentSearchKeywords);	
		$('.header-row-uxt').removeClass('focused');
		$('.search-box').removeClass('focused');
		this.setState({ recentSearchesClicked: true, sidemenu: false, recentSearches: recentSearchKeywords, merchantClicked: false, searchClicked: true, passSearchValprops: recentSearchKeywords, showWatchlist: false, productLoadStatus: true, showRecommendedList : false, couponsList: false, couponConfirm: false});
		$('#search_val').val(recentSearchKeywords);
		$('.product-lists-uxt .comparison-list').addClass('active');
		if(type == 'handle'){
			this.handleToggleBuyBtn();
		}
		$('.reset').removeClass('active');
	}
	
	clearSearch = () => {		
		$('.header-row-uxt').removeClass('focused');
	}
	
	clearCoupon = () => {			
		$('.coupon-confirm').removeClass('active');	
	}
	
	GoCoupon = (href) => {			
		this.setState({stay:true});	
		this.clearCoupon();
		window.open(href, '_blank');
	}
	
    doListRecentSearches = () => {
     var currentBack = this;	
		if(localStorage.getItem('storeRecentSearches') != null && localStorage.getItem('storeRecentSearches') !== 'undefined' && typeof localStorage.getItem('storeRecentSearches') !== undefined){		
       	      							 
	     var recentSearchResults =  (localStorage.getItem('storeRecentSearches')?JSON.parse(localStorage.getItem('storeRecentSearches')):'');
	   	 var listRecentSearches = Object.keys(recentSearchResults).map((el, index) => {	
		 var searchKey = recentSearchResults[el].keyword;
		 searchKey = searchKey.replace(/\\/g,'');		 
		 var setClassName = 'tag-input';
		 var setUniqNme ='listRecent'+index;
		 		 
		return (
		<li key={setUniqNme} className={setClassName} id={searchKey}>
		<span onClick={currentBack.getSelectedKeyword.bind(currentBack,searchKey)}>{searchKey}</span></li>
		);		
		});	 	
		
	return (
	<div className="merchant-filter-list recent-search-list">	 
	  <h2>My Searches</h2>
			
		<div className="tag-input-filter">		
			<Scrollbars className="acc-scroll-wrap">
			<ul>
			{listRecentSearches.length > 0?listRecentSearches:<div className="no-record">No data found</div>}
			</ul>
			</Scrollbars>  
			</div>	
		<div className="list-back"><a className="" href="javascript://" onClick={currentBack.goBack.bind(currentBack)}></a></div>					
	</div>); 
	}	
   }
   
    doListCommunitySearches = () => {
     var currentBack = this;
        if(localStorage.getItem('storeCommunitySearches') != undefined && localStorage.getItem('storeCommunitySearches') != null){		
       	      							 
	     var recentSearchResults =  (localStorage.getItem('storeCommunitySearches')?JSON.parse(localStorage.getItem('storeCommunitySearches')):'');
	   	 var listRecentSearches = Object.keys(recentSearchResults).map((el, index) => {	
		 var searchKey = recentSearchResults[el].keyword;	
		 searchKey = searchKey.replace(/\\/g,'');
		 var setClassName = 'tag-input'; 
		 var setRandom = 'listRecomm'+index;	 
		return (
		<li key={setRandom} className={setClassName} id={searchKey}>
		<span onClick={currentBack.getSelectedKeyword.bind(currentBack,searchKey)}>{searchKey}</span>
		</li>
		);		
		});	 	
		
	return (
	<div className="merchant-filter-list recent-search-list community-search-list">	 
	  <h2>Trending</h2>
	    
		<div className="tag-input-filter">		
			<Scrollbars className="acc-scroll-wrap">
			<ul>
			{listRecentSearches.length > 0?listRecentSearches:<div className="no-record">No data found</div>}
			</ul>
			</Scrollbars>  
			</div>	
		<div className="list-back"><a className="" href="javascript://" onClick={currentBack.goBack.bind(currentBack)}></a></div>					
	</div>); 
	}	
   }
   
    doListCopons(getReplace = null){
     var currentBack = this;
	 var listCoupons = {}
	  if(getReplace != null){    	      							 
	     var couponResults = ((typeof getReplace !== undefined && getReplace !== 'undefined' && getReplace != null)?JSON.parse(getReplace):'');
		 listCoupons = Object.keys(couponResults).map((el, index) => {	
		 var searchKey = couponResults[el];	
		 var coupon_link = searchKey.affiliate_link;
		 //var end_date = new Date(searchKey.end_date);
		 var end_date = '';
		 var end_date_int = searchKey.end_date+'Z';
		 end_date = end_date_int.replace(/ /g,"T");
		 end_date = Date.parse(end_date);
		 
		 var ToDate = new Date();
         var setCouponId = 'coupon'+index;
		 if(coupon_link !='undefined' && searchKey.coupon_store !='undefined' && searchKey.title != 'undefined' && end_date >= ToDate.getTime()){
			var dateSplit = end_date_int.substr(0, 10).split("-");
			var formatDate = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
			return (
			<div key={setCouponId} className="tag-input"><div className="merchant_name" onClick={currentBack.couponConfirm.bind(currentBack, coupon_link)}>	
			<span className="coupon-store">{searchKey.coupon_store}</span>	
			<span className="coupon-title">{searchKey.title}</span><br></br>
			<span className="coupon-title coupon-date">Expiration: {formatDate}</span>
			</div></div>
		    );	
		 }
		 });
	
	return (
	<div className="merchant-filter-list coupons-list">	 
	  <h2>Coupons</h2>
	    <div className="cus-select-search">
			 <input type="text" placeholder="Search" autoComplete="off"  onChange={this.getCouponKeywords.bind(this)}/>
			</div>
		<div className="tag-input-filter">		
			<Scrollbars className="acc-scroll-wrap">
			{listCoupons.length > 0?listCoupons:<div className="no-record">No coupon found</div>}
			</Scrollbars>  
			</div>	
		<div className="list-back"><a className="" href="javascript://" onClick={currentBack.goBack.bind(currentBack)}></a></div>					
	</div>); 
	}	
   }
   
	doCreateFilter = () => {	
     var currentFilter = this;	
	 var storesUXT = [];
	 
	  if(localStorage.getItem('showMerchantFilter') != null){		
	  
       var setClassName = '';    			
       var listMerchantOptions = '';
       var merchantDetails =  (localStorage.getItem('showMerchantFilter')?JSON.parse(localStorage.getItem('showMerchantFilter')):'');
	   	   	   
	  	var listMerchantOptions = Object.keys(merchantDetails).map((el, index) => {	
		var merchantKy = merchantDetails[el].merchantkey;		
        var merchantId = merchantDetails[el].merchantID;	
		var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		storesUXT[el] = merchantKy;
        			  
		 if($.inArray(merchantId, storedNames) !== -1){
			setClassName='tag-input active';				 
		 }
		 else{
			setClassName='tag-input';
		 }	 
		 var setUniqMer = 'merchantId'+index;		
		return (
		<li key={setUniqMer} className={setClassName} id={merchantId}>
		<span onClick={this.getSelectedMerchants.bind(this,merchantId)}>{merchantKy}</span>
		</li>
		);		
		});	
       	localStorage.setItem("storeMerchantsDefault",JSON.stringify(storesUXT));
		
		if(localStorage.getItem('replaceStoreFilters') != null){
		 var merchantDetails =  JSON.parse(localStorage.getItem('replaceStoreFilters'));  
		 var listMerchantOptions = Object.keys(merchantDetails).map((el, index) => {	
		 var merchantKy = merchantDetails[el].merchantkey;		
		 var merchantId = merchantDetails[el].merchantID;	
		 var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		        			  
		 if($.inArray(merchantId, storedNames) !== -1){
			setClassName='tag-input active';				 
		 }
		 else{
			setClassName='tag-input';
		 }	 
		var setReplaceUniq = 'replaceMer'+index;	 		
		return (
		<li key={setReplaceUniq} className={setClassName} id={merchantId}>
		 <span onClick={this.getSelectedMerchants.bind(this,merchantId)}>{merchantKy}</span>
		</li>
		);		
		});			
	    }
		
	   		   
	return (		
		<div className="merchant-filter-list">		
		<h2>Store Filter</h2>
		<h4 className="sf-title">For beginners we recommend to select 3-4 stores to compare prices from </h4>
		<span className="clear-selection" onClick={this.getSelectedMerchants.bind(this,'clear')}>Clear Selection</span>		
		<div className="showChosenCount"></div>
			<div className="cus-select-search">
			 <input type="text" placeholder="Search" autoComplete="off" onChange={(e) => this.setState({searchStore: e.target.value.split(' ')},()=>{
						 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notify-remove, .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
							
						 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
					 })}/>
			</div>			
			<div className="tag-input-filter tag-input-filter-store">
			<Scrollbars className="acc-scroll-wrap"> 
			<ul>
			  {listMerchantOptions !=''?listMerchantOptions:<div className="no-record">No stores found</div>} 
			</ul>
			</Scrollbars>
            </div>	
			<div className="list-back"><a className="" href="javascript://" onClick={currentFilter.goBack.bind(currentFilter)}></a></div>	
		</div>		
	        ); 		
	 }	
	}
	
	doCreateMerchantFilter = () => {	
     var currentFilter = this;	
	 var storesAllUXT = [];
	 
	   if(localStorage.getItem('showAllMerchants') != null && localStorage.getItem('showAllMerchants') !== 'undefined' && typeof localStorage.getItem('showAllMerchants') !== undefined){		
	  
       var setClassName = '';    			
       var listAllMerchantOptions = '';
       var allMerchantDetails =  (localStorage.getItem('showAllMerchants')?JSON.parse(localStorage.getItem('showAllMerchants')):'');
	   	   	   
	  	var listAllMerchantOptions = Object.keys(allMerchantDetails).map((el, index) => {	
		var merchantKy = allMerchantDetails[el].merchant;		
        var merchantId = allMerchantDetails[el].merchant_id;	
		var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		storesAllUXT[el] = merchantKy;
        			  
		 if($.inArray(merchantId, storedNames) !== -1){
			setClassName='tag-input active';				 
		 }
		 else{
			setClassName='tag-input';
		 }	 
		var createMerFilter = 'filterId'+index;	 		
		return (
		<span key={createMerFilter} className={setClassName} id={merchantId} onClick={this.getAllSelectedMerchants.bind(this,merchantId)} >
		{merchantKy}</span>
		);		
		});	
       	localStorage.setItem("storeAllMerchantsDefault",JSON.stringify(storesAllUXT));
		
		if(localStorage.getItem('replaceAllStoreFilters') != null){
		 var allMerchantDetails =  JSON.parse(localStorage.getItem('replaceAllStoreFilters'));  
		 var listAllMerchantOptions = Object.keys(allMerchantDetails).map((el, index) => {	
		 var merchantKy = allMerchantDetails[el].merchant;		
		 var merchantId = allMerchantDetails[el].merchant_id;	
		 var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		        			  
		 if($.inArray(merchantId, storedNames) !== -1){
			setClassName='tag-input active';				 
		 }
		 else{
			setClassName='tag-input';
		 }	 
		var createRepMerFilter = 'filterRepId'+index;		 		
		return (
		<span key={createRepMerFilter} className={setClassName} id={merchantId} onClick={this.getAllSelectedMerchants.bind(this,merchantId)} >
		{merchantKy}</span>
		);		
		});			
	    }
		
	   		   
	return (		
		<div className="merchant-filter-list">		
		<h2>Add Stores</h2>
		<span className="clear-selection" onClick={this.getAllSelectedMerchants.bind(this,'clear')}>Clear Selection</span>		
		<div className="showChosenCount"></div>
			<div className="cus-select-search">
			 <input type="text" placeholder="Search" autoComplete="off" onChange={(e) => this.setState({searchAllStore: e.target.value.split(' ')},()=>{
						 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notify-remove, .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
							
						 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
					 })}/>
			</div>			
			<div className="tag-input-filter tag-input-filter-store">
			<Scrollbars className="acc-scroll-wrap"> 
			  {listAllMerchantOptions !=''?listAllMerchantOptions:<div className="no-record">No stores found</div>} 
			</Scrollbars>
            </div>	
			<div className="list-back"><a className="" href="javascript://" onClick={currentFilter.goBack.bind(currentFilter)}></a></div>	
		</div>		
	        ); 		
	 }	
	}
	 
	getMerchantFiltersMenu(){
		var defaultOpen = (localStorage.getItem('StoreFilter') == 'Close'?'':'StoreFilter');
		setTimeout(() => {
			 $('.product_search_box .product-filter-header').trigger('click');
			 this.setState({ sidemenu: true, productLoadStatus:true, sideFilterList:true, showWatchlist: false, 
			 showRecommendedList : false, couponsList: false, couponConfirm: false, notificationInnerShow: false, notificationMenu: true, notificationKey :defaultOpen, overRideKey:'StoreFilter', enableNotify : true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });
		}, 100);		 
		this.hideNotification();	  
		 $('.uxt-side-menu-inner').removeClass('active'); 
         $('.product-lists-uxt .comparison-list').addClass('active');		 
		 document.addEventListener('click', this.handleOutsideClick, false);
	}
	
	getRecentSearchesList(){
		var defaultOpen = (localStorage.getItem('MySearches') == 'Close'?'':'MySearches');
		setTimeout(() => {
			 this.setState({sidemenu: true, menuList: true, sideFilterList:false, recentSearchesList: true, communitySearchesList: false, productLoadStatus:true, showWatchlist: false, menuClicked:false, couponsList: false, couponConfirm: false, showRecommendedList : false,  notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey:'MySearches', enableNotify: true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });
			 $('.uxt-side-menu').addClass('active');
		 }, 100);
		 this.hideNotification();	  
		 $('.uxt-side-menu-inner').removeClass('active'); 		 
		 $('.watchlist_wrap').removeClass('active');
		 $('.product-lists-uxt .comparison-list').addClass('active');
	}
	
	getCommunitySearchesList(){
		var defaultOpen = (localStorage.getItem('Trending') == 'Close'?'':'Trending');
		setTimeout(() => {
			 this.setState({sidemenu: true, menuList: true, sideFilterList:false, recentSearchesList: false, communitySearchesList: true, productLoadStatus:true, showWatchlist: false, menuClicked:false, couponsList: false, couponConfirm: false, showRecommendedList : false,  notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey:'Trending', enableNotify:true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });
			 $('.uxt-side-menu').addClass('active');
		 }, 100);			 
		 this.hideNotification();	  
		 $('.uxt-side-menu-inner').removeClass('active'); 	 
		 $('.watchlist_wrap').removeClass('active');
		 $('.product-lists-uxt .comparison-list').addClass('active');
		
	}
	
	getCoupons(){
		var defaultOpen = (localStorage.getItem('Coupons') == 'Close'?'':'Coupons');
		setTimeout(() => {
			var couponthis = this;
			couponthis.setState({sidemenu: true, menuList: true, sideFilterList:false, recentSearchesList: false, couponsList: true, couponConfirm: false,communitySearchesList: false, productLoadStatus:true, showWatchlist: false, menuClicked:false, showRecommendedList : false, notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey:'Coupons', enableNotify:true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });
		 $('.uxt-side-menu').addClass('active');
		}, 100);
		this.hideNotification();	  
		 $('.uxt-side-menu-inner').removeClass('active'); 		 
		 $('.watchlist_wrap').removeClass('active');
		 $('.product-lists-uxt .comparison-list').addClass('active');
   
	}
	
	twoColumn = () => {
		
		setTimeout(() => {		  
			$('.acs_control_sec').removeClass('mobi-two-columns');
		}, 100);	    
		$(window).on('resize', function(){  
			if ($(window).width() < 768) {	
				$('.acs_control_sec').removeClass('two-column');
				$('.two-columns').removeClass('active');				
			}
		});			
		this.setState({
            twoColumn: !this.state.twoColumn,
		});
		setTimeout(() => {		  
			if(this.state.twoColumn === false){
				$('.two-columns-btn').removeClass('active');
			}
		}, 600);
		 
		$('.results-list .widget-list.grid-view-list').addClass('active');
	    $('.store-filter-list').removeClass('active'); 		
		if($('.uxt-side-menu').hasClass('open-package')){
		  //$('.uxt-side-menu').hasClass('open-package')	
		}
		else{
			$('.uxt-side-menu').removeClass('active')	
		}		
	 }
	
	goBackData = () =>{
		this.setState({ sidemenu: true, menuList: true, notificationInnerShow: false, notificationMenu:false, enableNotify: false });
	}
	
	goBackDataAdv = () =>{
		this.setState({ sidemenu: true, menuList: false, notificationInnerShow: false, notificationMenu:false, enableNotify: false });
	}
	
	goBack(){	
		this.setState({ sidemenu: true, menuList: true, recentSearchesList: false, sideFilterList: false, menuClicked: false, upDownGrade: false, communitySearchesList:false, couponConfirm: false, couponConfirm: false, showAccessiblity: false, couponsList: false, showSetting: false, addStores: false, myStores: false, productFilter: false, notificationShow: false, notificationInnerShow: false, notificationMenu:false, overRideKey:'', enableNotify: false });
			 
		setTimeout(() => {
		 $('.uxt-side-menu-inner').addClass('active'); 
		 document.addEventListener('click', this.handleOutsideClick, false);
		}, 600);

	    $('.upgrade-plan').removeClass('active');
		$('.upgrade-plan .acc-package-wrap').removeClass('uxt-wa-active-step');
		$('.upgrade-plan .acc-credit-wrap').removeClass('uxt-wa-active-step');	
		$('.upgrade-plan .acc-thankyou-wrap').removeClass('uxt-wa-active-step');	
		$('.restrict-track-wrap').removeClass('active');	
	 
	}
	
	 ApplyFilter = () => {
		
		/*const storeSendFilters = $('.product-filter-inner-wrap input:checked').serializeArray().concat({
			name: "filter_by_color", value: $('ul.filter-clr li.active').attr('class')
		});	*/	
		
		var result = [];
		$.each($('.product-filter-inner-wrap input:checked').serializeArray(), function() {
			if(this.name == 'filter_by_price'){
				 $("input[name='"+this.name+"'][value='"+this.value+"']").prop("checked", true);
			}
			else{
			 $("input[name='"+this.name+"']").prop("checked", true);
			}
			this.name = this.name.replace(/[0-9]/g, "");
			result.push({"name": this.name, "value": this.value});
		});
		result.push({"name": "filter_by_color", "value": $('ul.filter-clr li.active').attr('class') });
		
		this.setState({storeSendFilters:result, sidemenu:false, notificationKey:'', overRideKey:'Home'},()=>{
			localStorage.setItem('propsCheck',JSON.stringify($('.product-filter-inner-wrap input:checked').serializeArray()));
		});
		
	}
	 
	 ClearFilter = () => {
		   $('.ul-filter input:checkbox').prop("checked", false);
		   $('.ul-filter input:radio').prop("checked", false);
		   $('ul.filter-clr li').removeClass('active');
		   this.activeFilterByColor = '';
		   const clearSendFilters = $('.product-filter-inner-wrap input:checked').serializeArray();
		   this.setState({storeSendFilters:clearSendFilters});		
		   localStorage.removeItem('propsCheck');
		   
	 }
	 
	showCardPage(){
		$('.restrict-track-wrap').removeClass('active');
		$('.upgrade-plan').addClass('active');
		$('.upgrade-plan .acc-step-wrap').removeClass('uxt-wa-active-step');	
		$('.upgrade-plan .acc-credit-wrap').addClass('uxt-wa-active-step');
	}

	gotoPackage(){	  	  
	  setTimeout(() => {
	     this.setState({menuList:false, recentSearchesList:false, sideFilterList:false, showAccessiblity:false, showSetting:false, menuClicked: false, enableNotify: false});
		 $('.uxt-side-menu-inner').addClass('active'); 
		 document.addEventListener('click', this.handleOutsideClick, false);
		}, 100);
	 
		$('.upgrade-plan .acc-credit-wrap').removeClass('uxt-wa-active-step');	
		$('.upgrade-plan .acc-thankyou-wrap').removeClass('uxt-wa-active-step');	
		$('.upgrade-plan .acc-package-wrap').addClass('uxt-wa-active-step');
	 
	}
	
	
	addStores = () => { 
	   setTimeout(() => { 
		 this.setState({sidemenu: true, addStores: true, showAccessiblity:false, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, menuClicked: false, showSetting:false});	
          $('.addstores-wrap .merchant-filter-list').show();		 
		}, 100);		
	}
	
	myStores = () => { 
		setTimeout(() => { 
		 this.setState({sidemenu: true, myStores: false, showAccessiblity:false, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, menuClicked: false, showSetting:false});
         $('.mystores-wrap .merchant-filter-list').show();
		}, 100);
		$('.uxt-side-menu-inner').removeClass('active'); 		
	}
	
	showAccessiblity = () => { 
	    var defaultOpen = (localStorage.getItem('Accessibility') == 'Close'?'':'Accessibility');
		setTimeout(() => { 
		 this.setState({sidemenu: true, showAccessiblity:true, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, menuClicked: false, showSetting:false, notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey: 'Accessibility', enableNotify:true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });			
		}, 100);		
		this.hideNotification();	  
		$('.uxt-side-menu-inner').removeClass('active'); 	
		document.removeEventListener('click', this.handleOutsideClick, false);
	}
		
	showSetting = () => { 
        var defaultOpen = (localStorage.getItem('Settings') == 'Close'?'':'Settings');	
		setTimeout(() => { 	
			 this.setState({sidemenu: true, showSetting:true, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, menuClicked: false,  notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey: 'Settings', enableNotify:true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });			
		}, 100);	
		this.hideNotification();	  
		$('.uxt-side-menu-inner').removeClass('active'); 
	   // document.addEventListener('click', this.handleOutsideClick, true);
	}	
		
	couponConfirm =(href) => { 	
	 if(this.state.stay == false){
		setTimeout(() => { 	
	    this.setState({couponConfirm:true, menuList: false, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, menuClicked: false, href, href});			
		}, 100);
		$('.coupon-confirm').addClass('active');		
	 }
	 else{
		window.open(href, '_blank'); 
	 }
	}
	
	loadNext = (elementVal) =>{	
	this.setState({menuClicked:true, recentSearchesList: false, communitySearchesList:false, sideFilterList: false, showAccessiblity:false, showSetting:false, menuList: false});
	 	if(elementVal == 'creditCard'){
			$('.upgrade-plan .acc-package-wrap').removeClass('uxt-wa-active-step');
			$('.upgrade-plan .acc-credit-wrap').addClass('uxt-wa-active-step');	
		}
    }
	
    handleBackground(bgColor) {
		$('.ctrl-lst li').removeClass('active');
		if(bgColor == 'white'){			
			$('.bg_white').addClass('active');
		}
		if(bgColor == 'blue'){			
			$('.bg_blue').addClass('active');
		}
		if(bgColor == 'black'){			
			$('.bg_black').addClass('active');
		}
		if(bgColor == 'grey'){			
			$('.bg_grey').addClass('active');
		}
		if(bgColor == 'offWhite'){			
			$('.bg_offWhite').addClass('active');
		}
		if(bgColor == 'blueYellow'){			
			$('.bg_blueYellow').addClass('active');
		}
		if(bgColor == 'blackYellow'){			
			$('.bg_blackYellow').addClass('active');
		}
		if(bgColor == 'greyYellow'){			
			$('.bg_greyYellow').addClass('active');
		}
        this.setState(
            state => {
                return {
                    activeBackground: this.state.activeBackground == bgColor ? null : bgColor
                };
            },
            () => {

                if (this.state.activeBackground != null) {
					let mainElement = document.querySelectorAll("#uxt_container")[0];	
                    mainElement.classList.add("uxt-bg-" + this.state.activeBackground);

                    setTimeout(() => {
                        Object.keys(this.backgroundColors).map(item => {
                            if (item != this.state.activeBackground) {
                                mainElement.classList.remove("uxt-bg-" + item);
                            }
                        });
                    }, 400);

                } 
            }
        );
    }	
	
	handleBackgroundSettings(bgColor) {
	  $('.ctrl-lst li').removeClass('active');
		if(bgColor == 'white'){			
			$('.bg_white').addClass('active');
		}
		if(bgColor == 'blue'){			
			$('.bg_blue').addClass('active');
		}
		if(bgColor == 'black'){			
			$('.bg_black').addClass('active');
		}
		if(bgColor == 'grey'){			
			$('.bg_grey').addClass('active');
		}
		if(bgColor == 'offWhite'){			
			$('.bg_offWhite').addClass('active');
		}
		if(bgColor == 'blueYellow'){			
			$('.bg_blueYellow').addClass('active');
		}
		if(bgColor == 'blackYellow'){			
			$('.bg_blackYellow').addClass('active');
		}
		if(bgColor == 'greyYellow'){			
			$('.bg_greyYellow').addClass('active');
		}
        this.setState(
            state => {
                return {
                    activeBackground: this.state.activeBackground == bgColor ? null : bgColor
                };
            },
            () => {

                if (this.state.activeBackground != null) {
					let mainElement = document.querySelectorAll("#uxt_container")[0];	
                    mainElement.classList.add("uxt-bg-" + this.state.activeBackground);

                    setTimeout(() => {
                        Object.keys(this.backgroundColors).map(item => {
                            if (item != this.state.activeBackground) {
                                mainElement.classList.remove("uxt-bg-" + item);
                            }
                        });
                    }, 400);

                } else {
                    this.removeBackgroundClass();
                }
            }
        );
		
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');		 
		if(user.user_id != null){
		 axios.get(APIURL+'user/saveSettings', {
			params: {
			  item: 'color_theme',
			  enable: bgColor,
			  userid: user.user_id
			}
		  })
		  .then(function (response) {
			if(response.data.status === "ok"){	
				console.log('success');
			}
		 	else if(response.data.status == "error"){
				console.log('error');
			}
		  });
		}
    }
	
	
    removeBackgroundClass() {
        let mainElement = document.querySelectorAll("#uxt_container")[0];	

        let bodyClass = Object.keys(this.backgroundColors).map(item => {
            return "uxt-bg-" + item;
        });

        mainElement.classList.remove(...bodyClass);
    }
	
	handleChange(event) {
      const {name, value} = event.target
      this.setState({
        [name]: value
      });
	}

    handleSelectChange(name, value) {
      this.setState({
        [name]: value
      });
	  
      let formWrap = document.querySelectorAll(".acc-form-wrapper")[0];
      formWrap.classList.remove('custom-select-active');
    }   
	
    
	loadUserLikes = (product_id,keyword,product_type='',toggle='') => {
	 var searchKey = keyword;
	 searchKey = searchKey.replace(/ /g,'-');
	 var share_link = '?keyword='+searchKey+'&id='+product_id+'&type='+encodeURIComponent(product_type);
	 window.history.replaceState(null, null, share_link);
	 this.getSelectedKeyword(searchKey,toggle);
	}
	
	
    handleCheckboxOption = (item, event) => {
		if(event.target.checked === true) {
			setTimeout(() => {
				if(item == 'relevance'){
					this.setState({relevanceChecked: true });
					localStorage.setItem('relevanceChecked',true);
	 			}
				else if(item == 'notifications'){
					this.setState({notifications: true });
					localStorage.setItem('notificationsEnable',true);
	 			}
				else{
					this.setState({liteVersionChecked: true });
					localStorage.setItem('liteVersionChecked',true);
				}
		}, 100);			
		}else{
			setTimeout(() => {
				if(item == 'relevance'){
					this.setState({relevanceChecked: false });
					localStorage.setItem('relevanceChecked',false);
				}
				else if(item == 'notifications'){
					this.setState({notifications: false });
					localStorage.setItem('notificationsEnable',false);
	 			}
				else{
					this.setState({liteVersionChecked: false });
					localStorage.setItem('liteVersionChecked',false);
				}
			}, 100);				
		}
		
        let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');		 
		if(user.user_id != null){
		 axios.get(APIURL+'user/saveSettings', {
			params: {
			  item: item,
			  enable: event.target.checked,
			  userid: user.user_id
			}
		  })
		  .then(function (response) {
			if(response.data.status === "ok"){	
				console.log('success');
			}
		 	else if(response.data.status == "error"){
				console.log('error');
			}
		  });
		}
	}  


	
	handleCheckboxOptionTwoColumn = (item, event) => {
		if(event.target.checked === true) {
			setTimeout(() => {
				$('.acs_control_sec').addClass('mobi-two-columns');
				$('.two-columns-btn').addClass('active');
                this.setState({checkedTwoColumn: true });
				localStorage.setItem('checkedTwoColumn', true);				
		}, 100);			
		}else{
		    setTimeout(() => {
				$('.acs_control_sec').removeClass('mobi-two-columns');				
				$('.two-columns-btn').removeClass('active');
				this.setState({checkedTwoColumn: false });
				localStorage.setItem('checkedTwoColumn', false);				
			}, 100);				
		}
		
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');		 
		if(user.user_id != null){
		 axios.get(APIURL+'user/saveSettings', {
			params: {
			  item: 'two_column',
			  enable: event.target.checked,
			  userid: user.user_id
			}
		  })
		  .then(function (response) {
			if(response.data.status === "ok"){	
				console.log('success');
			}
		 	else if(response.data.status == "error"){
				console.log('error');
			}
		  });
		}
		
	}
	
     handleReset() {
	  if(this.state.thankyou_message != null){
      this.setState({
        currentStep: 0,
        package_idis:'',
        card_type: '',
        credit_card_number: '',
        expiry_month: '',
        expiry_year: '',
        d_cvv: '',
        error_message: '',
        thankyou_message: null,
        error_fields: {}
      });
	  }
    }	  
	
	 _handleValidation(){
		
	  var error_fields = {};

      var formIsValid = true;

      const { card_type, credit_card_number, expiry_month, expiry_year, d_cvv }  = this.state;

        if(card_type=='') {
          formIsValid = false;
          error_fields.card_type = 'Card Type is required';
        }

        if(credit_card_number.trim()=='') {
          formIsValid = false;
          error_fields.credit_card_number = 'Credit Card is required';
        }

        if(credit_card_number.trim().length<18) {
          formIsValid = false;
          error_fields.credit_card_number = 'Invalid Credit Card';
        }

        if(expiry_month=='') {
          formIsValid = false;
          error_fields.expiry_month = 'Expiry Month is required';
        }

        if(expiry_year=='') {
          formIsValid = false;
          error_fields.expiry_year = 'Expiry Year is required';
        }

        if(d_cvv=='') {
          formIsValid = false;
          error_fields.d_cvv = 'CVV is required';
        }
      
      this.setState({
        error_fields: error_fields,
      });

      return formIsValid;
    }

	 handleSubmit(event) {
	  event.preventDefault();
	  if( !this._handleValidation()) {
		return;
      }
	  let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
      const { card_type, credit_card_number, expiry_month, expiry_year, d_cvv }  = this.state;
      let formData = {
        package_planId: (this.state.pack_pre_id?this.state.pack_pre_id:'Mg'),
        card_type: card_type.value, 
        credit_card_number: credit_card_number.replace(/ /g,''), 
        expiry_month: expiry_month.value, 
        expiry_year: expiry_year.value, 
        d_cvv: d_cvv,
		user_id: user.user_id
      };

     this.setState({loadAjaxStatus : true},()=>{ $('.load-text').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');});
      axios.post(API_BASE_URL + '/upgrade_user/', qs.stringify(formData))
      .then( response => {
        this.setState({loadAjaxStatus : false});
                 
		if(response.data.status =='success'){
			localStorage.removeItem('userDetails');
			localStorage.removeItem('loggedIn');	
			localStorage.setItem('userDetails', JSON.stringify(response.data.result));
			localStorage.setItem('loggedIn', 1);
			$('.upgrade-plan .acc-package-wrap').removeClass('uxt-wa-active-step');
			$('.upgrade-plan .acc-credit-wrap').removeClass('uxt-wa-active-step');	
			$('.upgrade-plan .acc-thankyou-wrap').addClass('uxt-wa-active-step');
		    this.setState({
			 thankyou_message: response.data.message,
			 error_message: ''
			},
            () => {
			  setTimeout(() => {
				  this.setState({ upDownGrade: false });
				  this.showLogin();
			   }, 3000);			   
            });
		 }	
		else if(response.data.status =='error'){
		  this.setState({
            thankyou_message:null,
		    error_message:response.data.message,
			upDownGrade: true
		   });	
		}
	   })
      .catch(error => {
        this.setState({loadAjaxStatus : false}); 
        if (error.response) {
          this.setState({
           error_message: error.response.data.message,
		   thankyou_message: null,
		   upDownGrade: true
          });
        } else {
          this.setState({
			thankyou_message: null,
            error_message: 'Something went wrong',
			upDownGrade: true
          });
        }
      });    
    }
	
	saveData = (userdata) =>{
		this.setState({sideFilterList:false, recentSearchesList: false, communitySearchesList: false, productLoadStatus:true, showWatchlist: false, menuClicked:false, couponsList: false, couponConfirm: false, showRecommendedList : false});
		
		if(userdata != null){
		 userdata = JSON.parse(userdata);
		 localStorage.setItem('relevanceChecked', (userdata.relevance == '0'?false:true));
		 localStorage.setItem('liteVersionChecked', true);
		 localStorage.setItem('checkedTwoColumn', (userdata.two_column == '0'?false:true));
		 localStorage.setItem('notificationsEnable', (userdata.notifications == '0'?false:true));
		 this.setState({relevanceChecked:(userdata.relevance == '0'?false:true), liteVersionChecked: true, checkedTwoColumn: (userdata.two_column == '0'?false:true), bgColor:userdata.color_theme, notifications: (userdata.notifications == '0'?false:true)});

		 this.handleBackground(userdata.color_theme);
	    }
		this.forceUpdate();
	}
	
	saveSettings = (userdata) =>{
	 if(userdata != null){
		 localStorage.setItem('relevanceChecked', (userdata.relevance == '0'?false:true));
		 localStorage.setItem('liteVersionChecked', true);
		 localStorage.setItem('checkedTwoColumn', (userdata.two_column == '0'?false:true));
		 localStorage.setItem('notificationsEnable', (userdata.notifications == '0'?false:true));
		 this.setState({relevanceChecked:(userdata.relevance == '0'?false:true), liteVersionChecked: true, checkedTwoColumn: (userdata.two_column == '0'?false:true), bgColor:userdata.color_theme, notifications: (userdata.notifications == '0'?false:true)});
		
		 if(userdata.detail_view == 'topToBottom'){
			 this.setState({topToBottom:true, rightToLeft:false});
		 }
		 else if(userdata.detail_view == 'rightToLeft'){
			this.setState({rightToLeft:true, topToBottom:false}); 
		 }
		 
		 this.handleBackground(userdata.color_theme);
		 this.forceUpdate();
	 }
	}
	
	
	viewChange = (e) => {
		const { name, value } = e.target;		
		if(e.target.value == 'topToBottom') {	
		    this.setState({topToBottom:true, rightToLeft:false});
					
		}else{			
		     this.setState({topToBottom:false, rightToLeft:true});
		}
       
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');		 
		if(user.user_id != null){
		 axios.get(APIURL+'user/saveSettings', {
			params: {
			  item: e.target.value,
			  enable: event.target.checked,
			  userid: user.user_id
			}
		  })
		  .then(function (response) {
			if(response.data.status === "ok"){	
				console.log('success');
			}
		 	else if(response.data.status == "error"){
				console.log('error');
			}
		  });
		}
		
	}
	
	
	setNotificationstep = (elementVal) =>{		
		$("."+elementVal).removeClass('active');
		var closeTemp = (this.state.notificationKey !=''?this.state.notificationKey:this.state.overRideKey);
		localStorage.setItem(this.state.overRideKey,'Close');
	    this.setState({notificationInnerShow: false, notificationMenu: false, overRideClick: false});
        this.hideNotification();		
    }
	
	NotifyInfo = (elementVal) =>{ 
	
	    if(elementVal === "first"){
			$('.first-alert').addClass('active');
			this.setState({notificationInnerShow: true, notificationMenu: false, overRideClick: true}, () => {
			setTimeout(() => {
		      $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
            }, 100);
			});		
		}
		if(elementVal === "profile-step"){
			$('.profile-step').addClass('active');
			this.setState({notificationMenu: true, notificationInnerShow: false, overRideClick: true}, () => {
				setTimeout(() => {
		         $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
                }, 100);
			});		
		}	
				
	}
	
	notificationShow = () => {
		var defaultOpen = (localStorage.getItem('Notifications') == 'Close'?'':'Notifications') ;
		this.setState({notificationShow: true, menuList: false, notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey: 'Notifications', enableNotify:true}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });	
		this.hideNotification();	  
	}
	
	productFilter = () => {
		var defaultOpen = (localStorage.getItem('ProductFilter') == 'Close'?'':'ProductFilter') ;
		this.setState({productFilter: true, menuList: false, notificationInnerShow: false, notificationMenu: true, notificationKey : defaultOpen, overRideKey:'ProductFilter', enableNotify:true}, () => {
			$('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
			let propsCheck = ((localStorage.getItem('propsCheck') != 'undefined' && localStorage.getItem('propsCheck') != '')?JSON.parse(localStorage.getItem('propsCheck')):'');
			if(propsCheck != '' && propsCheck != null){
				$.each(propsCheck, function(key,values) {
					if(this.name == 'filter_by_price'){
						 $("input[name='"+values.name+"'][value='"+values.value+"']").prop("checked", true);
					}
					else{
						$("input[name='"+values.name+"']").prop("checked", true);
					}
				});
			}
						
		});
		//this.hideNotification();	  
	}
	
	transfersize = (size, colors, categories) =>{
		this.productFilterSize = size;
		this.productFilterColors = colors;
		this.productFilterCategory = categories;
	}
	
	changeStatus = (bolean = false, page='Home') =>{
		
		var defaultOpen = (localStorage.getItem(page) == 'Close'?'':page) ;
		this.setState({notificationInnerShow : bolean, notificationMenu: false, notificationKey:defaultOpen, overRideKey:page}, ()=>{
			 $('.notification-content p, .notify-remove').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
		 });	
			if(bolean == true){
				this.hideNotification();	  
			}		
	}
	
	backStatus = () =>{
		this.setState({notificationInnerShow : false, notificationMenu: false });
	}
	
	
	setColorActive = (filterColor) => {
		this.activeFilterByColor = filterColor;
		setTimeout(() => {
		         this.ApplyFilter();				 
                }, 100);
		
	}
	      
    	
	productFilterClose = () => {
		this.setState({sidemenu: false, productFilter: false, filterClosed: 1})
	}
	
	ListTwoColumn = () => {		
		this.setState({	
			 twoColumn: false, ListTwoColumn: !this.state.ListTwoColumn,	
		});		
	}
	
	
    render() {
        const { upDownGrade } = this.state;
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');
		let wishListCnt = (localStorage.getItem('wishlistCount')?localStorage.getItem('wishlistCount'):''); 
		var viewCouponDetails = this.state.showCouponDetails;
		let class_name = 'header_uxt';    
		var newthis = this;	 		
        let wrap_class = 'acs_control_sec ';
        wrap_class += (this.state.isButtonOpened ? "ac-open control-open " : "");
        wrap_class += (this.state.isBuyButtonOpened ? "ac-open form-open " : "");		
        wrap_class += (this.state.isLoginButtonOpened ? "ac-open loginform-open " : "");	
        wrap_class += (this.state.twoColumn ? " two-column " : "");	
		wrap_class += (this.state.ListTwoColumn ? " list-two-column " : "");		
		wrap_class += (this.state.checkedTwoColumn ? " mobi-two-columns" : "");  					
		if(newthis.state.checkedTwoColumn===true && newthis.state.twoColumn===false){
			setTimeout(() => {
		      $('.two-columns-btn').addClass('active');				 	
            }, 300);		
		}	

        let colors_list = Object.keys(this.backgroundColors).map((key, value) => {
            return <li key={value} onClick={ () => this.handleBackground(key) } className={"bg_" + key + (key == this.activeBackground ? " active " : "")}></li>
       });	
		
       let colors_list_settings = Object.keys(this.backgroundColors).map((key, value) => {
            return <li key={value} onClick={ () => this.handleBackgroundSettings(key) } className={"bg_" + key + (key == this.activeBackground ? " active " : "")}></li>
       });
	   
	   let notification_lists = '';
	   let show_notification_content = '';
	   var storeNotify = '';
	   var storeNotifyInner = '';
	   var parsedNotifications = (localStorage.getItem('notifications') != null?JSON.parse(localStorage.getItem('notifications')):'');
		   
	   if(this.state.notificationShow == true){
		   notification_lists = Object.keys(parsedNotifications).map((key, value) => {
			   storeNotify = parsedNotifications[key];
			   return <li>
					<div className="notification-inner">
					{(storeNotify.notification_image != null && storeNotify.notification_image != '' && storeNotify.notification_image != 'undefined' && typeof storeNotify.notification_image != undefined)?<div className="notification-left">	 
						 <img src={API_MEDIA_URL+storeNotify.notification_image} alt={storeNotify.notification_name} />
					</div>:''}
						<div className="notification-right">
						     <p className="notify_label">{storeNotify.notification_name}</p>
							 <p className="notify_txt">{storeNotify.notification_content}</p>
						</div>	 
					</div>	
				</li>
				});
	   }
				
		if(this.state.notifications == true && ((this.state.notificationKey !='' && this.state.overRideClick == false) || (this.state.overRideKey !='' && this.state.overRideClick == true))  && (this.state.notificationInnerShow == true || this.state.notificationMenu == true)){
			var storePageName = '';
			if(this.state.notificationKey != ''){
				storePageName = this.state.notificationKey;
			}
			else{
				storePageName = this.state.overRideKey;
			}
						
			 show_notification_content = Object.keys(parsedNotifications).map((key, value) => {
			    storeNotifyInner = parsedNotifications[key];
				
				if(storeNotifyInner.notification_name == storePageName){
				 return <div className="notification-inner">
							{(storeNotifyInner.notification_image != null && storeNotifyInner.notification_image != '' && storeNotifyInner.notification_image != 'undefined' && typeof storeNotifyInner.notification_image != undefined)?<div className="notification-left">	 						 
								<img src={storeNotifyInner.notification_image != null?API_MEDIA_URL+storeNotifyInner.notification_image:API_FRONT_URL+'assets/images/no-image.png'} alt={storeNotifyInner.notification_name} />
							</div>:''}
							<div className="notification-right">
							   <Scrollbars className="cb-scroll-wrap">
								<div className="notification-content">
								{/* <p className="notify_label">{storeNotifyInner.notification_name}</p>*/}
									 <p className="notify_txt">{storeNotifyInner.notification_content}</p>
								</div>	 
							   </Scrollbars>
							</div>	 
						   </div>
				   }
		   });	  
		}
	   let product_filter_colors = '';
	   let product_filter_size = '';
	   let product_filter_price = '';
	   let product_filter_category = '';
	   let replaceStrC = '';
	   let replaceStrS = '';
	   let replaceStrc = '';
	   
	   if(this.state.productFilter == true){
		  
		 if(this.productFilterPrice != '' && this.productFilterPrice != null){
		   var parsedPrice = this.productFilterPrice;
		   product_filter_price = Object.keys(parsedPrice).map((key, value) => {
			   return  <li className="filter-item">	
						  <a href="javascript://">{parsedPrice[key]}</a>	
						  <label className="custom_radio"> 	
							<input 
							type="radio" 
							name="filter_by_price"  
							id="price"
							value={parsedPrice[key]}	
							onChange={this.ApplyFilter.bind(this)}
							/>
							<span></span> 	
						  </label>	
						</li>
				 });
		  }
		  
		  if(this.productFilterCategory != '' && this.productFilterCategory != null){
		   var filterName = 'filter_by_category[]';
		   var parsedCategory = JSON.parse(this.productFilterCategory);
		   product_filter_category = Object.keys(parsedCategory).map((key, value) => {
			   replaceStrc = parsedCategory[key].replace(/\//g,' ');
			   filterName = "filter_by_category["+value+"]";
				return 	<li key={replaceStrc} className="filter-item">	
						   <a href="javascript://">{parsedCategory[key]}</a>	
							  <label className="custom_checkbox"> 	
								<input 
								type="checkbox" 
								name={filterName} 
								id="categories_filter"
								value={replaceStrc}	
                                onChange={this.ApplyFilter.bind(this)}								
								/>
								<span></span> 	
							  </label>	
						</li>		
		   });	
		  }
		
		 if(this.productFilterColors != '' && this.productFilterColors != null){
	     var parsedColors = JSON.parse(this.productFilterColors);
		   product_filter_colors = Object.keys(parsedColors).map((key, value) => {
			   replaceStrC = parsedColors[key].replace(/\//g,' ');
			   return <li key={replaceStrC} className={replaceStrC+(replaceStrC == this.activeFilterByColor ? " active" : "")} onClick={this.setColorActive.bind(this,replaceStrC)}>{parsedColors[key]}</li>
		   });
		  }
		  
		  if(this.productFilterSize != '' && this.productFilterSize != null){
		   var parsedSize = JSON.parse(this.productFilterSize);
		   var filterSizeName = 'filter_by_size[]';
		   product_filter_size = Object.keys(parsedSize).map((key, value) => {
			   replaceStrS = parsedSize[key].replace(/\//g,' ');
			   filterSizeName = "filter_by_size["+value+"]";
				return 	<li key={replaceStrS} className="filter-item">	
						   <a href="javascript://">{parsedSize[key]}</a>	
							  <label className="custom_checkbox"> 	
								<input 
								type="checkbox" 
								name={filterSizeName}  
								id="size"
								value={replaceStrS}		
								onChange={this.ApplyFilter.bind(this)}
								/>
								<span></span> 	
							  </label>	
						</li>		
		   });	
		  }			  
	     }

		//Apply font
		if(newthis.state.menuList===true){
			setTimeout(() => {
		      $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .product-filter-wrap a, .notification-content p, .notify-remove,  .upgrade-remainder a').attr('style', 'font-family: '+ this.state.mainFontFamily +' !important');			
			
			 $('.search-option li a, .recent-products-grid p, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.state.subFontFamily +' !important');
            }, 300);		
		}	
		
		//Search Store Filter section
		let options;
		var storesUXT = localStorage.getItem('storeMerchantsDefault');
		var searchStoreRes = [];
		if (this.state.searchStore.length) {
		  const searchPattern = new RegExp(this.state.searchStore.map(term => `(?=.*${term})`).join(''), 'i');
		  options = JSON.parse(storesUXT).filter(option => 
			option.match(searchPattern)
		  );
		  
		var merchantDetails =  (localStorage.getItem('showMerchantFilter')?JSON.parse(localStorage.getItem('showMerchantFilter')):'');
	   	   
	  	var listMerchantOptions = Object.keys(merchantDetails).map((el, index) => {	
		var merchantKy = merchantDetails[el].merchantkey;		
        var merchantId = merchantDetails[el].merchantID;	
		       			  
		 if($.inArray(merchantKy, options) !== -1){
			 searchStoreRes[el] = {merchantID:merchantId,merchantkey:merchantKy}				 
		 }
		});
		 searchStoreRes = searchStoreRes.filter(function(x) { return x !== null });
		 localStorage.setItem('replaceStoreFilters', JSON.stringify(searchStoreRes));
		} 	
		else{
			localStorage.removeItem('replaceStoreFilters');
		}
		
		//Search All Store Filter section
		let optionsAll;
		var storesAllUXT = localStorage.getItem('storeAllMerchantsDefault');
		var searchAllStoreRes = [];
		if (this.state.searchAllStore.length) {
		  const searchPattern = new RegExp(this.state.searchAllStore.map(term => `(?=.*${term})`).join(''), 'i');
		  optionsAll = JSON.parse(storesAllUXT).filter(option => 
			option.match(searchPattern)
		  );
		  
		var allmerchantDetails =  (localStorage.getItem('showAllMerchants')?JSON.parse(localStorage.getItem('showAllMerchants')):'');
	   	   
	  	var listAllMerchantOptions = Object.keys(allmerchantDetails).map((el, index) => {	
		var merchantAllKy = allmerchantDetails[el].merchant;		
        var merchantAllId = allmerchantDetails[el].merchant_id;	
		       			  
		 if($.inArray(merchantAllKy, optionsAll) !== -1){
			 searchAllStoreRes[el] = {merchantID:merchantAllId,merchantkey:merchantAllKy}				 
		 }
		});
		 searchAllStoreRes = searchAllStoreRes.filter(function(x) { return x !== null });
		 localStorage.setItem('replaceAllStoreFilters', JSON.stringify(searchAllStoreRes));
		} 	
		else{
			localStorage.removeItem('replaceAllStoreFilters');
		}
		
			
		var listRecentSearchesInner = {};
   		var recentSearchResults = {};	
			
	    if((localStorage.getItem('storeCommunitySearches') != null && localStorage.getItem('storeCommunitySearches') != 'undefined' && typeof localStorage.getItem('storeCommunitySearches') != undefined) || (localStorage.getItem('storeRecentSearches') != null && localStorage.getItem('storeRecentSearches') != 'undefined' && typeof localStorage.getItem('storeRecentSearches') != undefined)) {	
            if(user == null){	
			    recentSearchResults =  ((localStorage.getItem('storeCommunitySearches') != null && localStorage.getItem('storeCommunitySearches') != 'undefined' && typeof localStorage.getItem('storeCommunitySearches') != undefined)?JSON.parse(localStorage.getItem('storeCommunitySearches')):'');	
			}	
			else{	
				recentSearchResults =  ((localStorage.getItem('storeRecentSearches') != null && localStorage.getItem('storeRecentSearches') != 'undefined' && typeof localStorage.getItem('storeRecentSearches') != undefined)?JSON.parse(localStorage.getItem('storeRecentSearches')):'');	
			}
			 listRecentSearchesInner = Object.keys(recentSearchResults).slice(0,20).map((el, index) => {	
			 var searchKey = recentSearchResults[el].keyword;	
			 searchKey = searchKey.replace(/\\/g,"");
			 
			 var searchKeyImg = recentSearchResults[el].image;	
			 
			 var setClassName='';
					 
			return (
			<div key={index} className="recent-products-grid">
				<div className="recent-lf">
					<div className="product_img">
						<a className={setClassName} href="javascript://" onClick={this.getSelectedKeyword.bind(this,searchKey)}><img src={searchKeyImg} alt="" /></a>
					</div>
				</div>
				<div className="recent-rgt">
					<p className="item-name"><a className={setClassName} href="javascript://" onClick={this.getSelectedKeyword.bind(this,searchKey)}>{searchKey.toUpperCase()}</a></p>
				</div>
			</div>
			);		
			});	
			
	    }
		
		var recommendList  = (localStorage.getItem('recommended')?JSON.parse(localStorage.getItem('recommended')):'');
		var listRecommendedItems = '';
		if(recommendList != null && recommendList != undefined){
		 listRecommendedItems =  Object.keys(recommendList).map(function(index){
			var currentProduct = recommendList[index]['main'];
			var masterID = recommendList[index]['recommend_id'];			
			var updatedProduct = recommendList[index]['new'];
			var recommended_user = recommendList[index]['user_id'];
			var recommended_keyword = (recommendList[index]['keyword'] !=''?recommendList[index]['keyword']:'');
			
			var newPriceAvailable = (typeof updatedProduct !='undefined' && typeof updatedProduct !='' && typeof updatedProduct.price !='undefined' && updatedProduct.price !='' && updatedProduct.price > 0 ?updatedProduct.price/100:0);
			var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !='' && currentProduct.price > 0 ?currentProduct.price/100:0);
			newPriceAvailable = (newPriceAvailable > 0?newPriceAvailable.toFixed(2):newPriceAvailable);
		    actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
						
		     var searchKey = (recommended_keyword !=undefined?recommended_keyword:currentProduct.merchant);
			     searchKey = searchKey.replace(/ /g,'-'); 
			
			var productName = currentProduct.name;
			productName = productName.replace(/\\/g,"");
			
			var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
			 if(currentProduct.name!=null) {			 
		 		return (
                     <div key={index} className="recommended-products-grid">
						<div className="recommended-lf">
							<div className="product_img">
							<Link to='#' onClick={newthis.loadUserLikes.bind(newthis,currentProduct._id,searchKey,currentProduct.merchant)}><img src={(typeof currentProduct.image!=='undefined' && currentProduct.image!=='')?currentProduct.image:API_FRONT_URL+'assets/images/no-image.png'} alt="" /></Link>
							</div>
						</div>
						<div className="recommended-rgt">
							<p className="item-name"><Link to='#' onClick={newthis.loadUserLikes.bind(newthis,currentProduct._id,searchKey,currentProduct.merchant)}>{productName.toUpperCase()}</Link></p>
							{user != null && user.package_plan != undefined && user.package_plan == 'free'?<p className="price">${actualPrice}</p>:(newPriceAvailable == 0 || newPriceAvailable==actualPrice?<p className="price">${actualPrice}</p>:((newPriceAvailable > 0 && newPriceAvailable > actualPrice) ? <p className="price" ><strike>${actualPrice}</strike><span className="price-plus"> ${newPriceAvailable}</span></p>:((newPriceAvailable > 0 && newPriceAvailable < actualPrice)?<p className="price"><strike>${actualPrice}</strike><span className="price-minus"> ${newPriceAvailable}</span></p>:'')))}
						</div>
					</div>			
		 		);
		 	}
	 	});
		}
 	return (
		
			<HashRouter>			
            <section className="main-acblty" data-articulate-ignore>		
             {	
              (this.state.show_subscribe) ? 						
				<BuyButton 
					leftPosition={this.state.left_position} 
					topPosition={this.state.top_position} 
					rightPosition={this.state.right_position} 
					bottomPosition={this.state.bottom_position} 
					buyButtonOpened={this.state.isBuyButtonOpened}
					toggleBuyBtn={this.handleToggleBuyBtn}
					getSelectedKeyword={this.getSelectedKeyword}
					loadUserLikes={this.loadUserLikes.bind(this)}
					mainFontFamily={this.state.mainFontFamily} 
					subFontFamily={this.state.subFontFamily}
					storeCommunitySearches={localStorage.getItem('storeCommunitySearches') != null?localStorage.getItem('storeCommunitySearches'):null}
					storeRecentSearches={user != null?localStorage.getItem('storeRecentSearches'):''}
					recommended={localStorage.getItem('recommended')}
				/>
			 : ''
           }					
    <div className={ wrap_class }>             
    <div className="header-uxt" ref={node => { this.node = node; }}>
	{newthis.state.searchValueReset===false?	
	<span className="topfull-close" onClick={newthis.ClosePlugin.bind(newthis)}>X</span>: ''}
	 <div className={(newthis.state.sidemenu===true && user == null)?'uxt-side-menu open-package active':(newthis.state.sidemenu===true?'uxt-side-menu active':'uxt-side-menu')}> 
     <a href="javascript://" onClick={newthis.handleSideMenu.bind(newthis, 'menulist')} className="menu-toggle" id="headerMenu">Menu</a>
     {(this.state.notifications == true && this.state.enableNotify == true)?<a href="javascript://" className="info-notify" onClick={this.NotifyInfo.bind(this,'profile-step')}></a>:''} 
	 {newthis.state.menuList===true?		
		(user !== null?<div className="uxt-side-menu-inner active"><ul className="uxt-menu-list"><li><a href="javascript://" onClick={newthis.showLogin.bind(newthis)}>Profile</a></li><li><a href="javascript://" onClick={newthis.loadWatchListSideMenu.bind(newthis,'clicked')} >Tracking {wishListCnt} items</a></li><li><a href="javascript://" onClick={newthis.loadRecommendedListSideMenu.bind(newthis,'clicked')} >User Likes</a></li><li><a href="javascript://" onClick={newthis.getRecentSearchesList.bind(newthis)}>My Searches</a></li><li><a href="javascript://" onClick={newthis.getCommunitySearchesList.bind(newthis)}>Trending</a></li><li><a href="javascript://" onClick={newthis.getMerchantFiltersMenu.bind(newthis)}>Store Filter</a></li>
		<li><a href="#/" onClick={this.productFilter.bind(this)}>Product Filter</a></li>
		<li><a href="javascript://" onClick={newthis.getCoupons.bind(newthis)}>Coupons</a></li>
		<li><a href="javascript://" onClick={newthis.showAccessiblity.bind(newthis)}>Accessibility</a></li>
		<li><a href="#/" onClick={this.notificationShow.bind(this)}>Notifications</a></li>
		<li><a href="javascript://" onClick={newthis.showSetting.bind(newthis)}>Settings</a></li>
	  {(typeof user.google_loggedin_user != 'undefined' && user.google_loggedin_user != null && user.google_loggedin_user != 0)?<li className="google-login"><GoogleLogout
        clientId={clientId}
        buttonText="Sign Out"
        onLogoutSuccess={this.onSuccess.bind(this)}
        ></GoogleLogout></li>:<li><a href="javascript://" onClick={newthis.logoutUser.bind(newthis)}>Sign Out</a></li>}
	  {user.package_plan == 'free'?<li><a href="javascript://" id="click_upgrade" onClick={newthis.upgradeUser.bind(newthis)}>Save more with a pro account</a></li>:null}</ul></div>:<div className="uxt-side-menu-inner active"><ul className="uxt-menu-list"><li><a href="javascript://" onClick={newthis.showLogin.bind(newthis)} >Login</a></li><li><a href="javascript://" onClick={newthis.showSignup.bind(newthis)} id="sign_up">Sign Up</a></li><li><a href="javascript://" onClick={newthis.getMerchantFiltersMenu.bind(newthis)} >Store Filter</a></li><li><a href="javascript://" onClick={newthis.showAccessiblity.bind(newthis)}>Accessibility</a></li>
      </ul></div>):''
	 
	  }	
	  
        {
			(this.state.domainVerified=='success') ? (
				<React.Fragment>
		  			{
						(this.state.show_subscribe) ? <UxtLoginForm  mainFontFamily={this.state.mainFontFamily} subFontFamily={this.state.subFontFamily} showlogin={this.state.showlogin} showpackage={this.state.showpackage} managepackage={this.state.show_package} userData={this.saveData} goBack={this.goBackData} /> : ''
					}					
				</React.Fragment>
			) : <InvalidDomain />
    
		}
		
		<div className={newthis.state.couponConfirm===true?'coupon-confirm active':'coupon-confirm'}>		
		   <div className="coupon-confirm-inner">	
		   <p>You will now go the selected coupons website?</p>	
		   <a href="javascript://" className="btn" onClick = {this.GoCoupon.bind(this, this.state.href)}>Go</a><a href="javascript://" className="btn" onClick = {this.clearCoupon.bind(this)}>Stay</a>	
		   </div>	
		   <span className="clear-search" onClick = {this.clearCoupon.bind(this)}>X</span>
		</div>	
	
	{/*=========Notification Starts here=========*/}				
		
		{(this.state.notifications == true && show_notification_content !='')?<div className={this.state.notificationMenu == true?'notification-alert profile-step active':'notification-alert profile-step'}><span className="notify-remove" onClick={this.setNotificationstep.bind(this,'profile-step')}>X</span>{show_notification_content}</div>:''}
	{/*==============================*/}
	
	
	<div className={(newthis.state.sideFilterList===true)?'storefilter-list active':'storefilter-list'}>	
		{newthis.doCreateFilter()}	
	</div>
	<div className={(newthis.state.recentSearchesList===true && user != null)?'mysearch-list active':'mysearch-list'}>	
		{newthis.doListRecentSearches()}	
	</div>		
	<div className={(newthis.state.communitySearchesList===true && user != null)?'trending-list active':'trending-list'}>	
		{newthis.doListCommunitySearches()}	
	</div>	
	<div className={(newthis.state.couponsList===true && user != null)?'couponlist-wrap active':'couponlist-wrap'}>	
		{viewCouponDetails}		
	</div>	
	<div className={(this.state.showAccessiblity===true)?'accessiblity-wrap active':'accessiblity-wrap'}>
	<h2 className="title">Accessibility</h2>
		<div className="color-mode-wrap">
			<h3>Color Mode</h3>								
		<ul className="ctrl-lst">
			{colors_list}
		</ul>
		</div>			
		<div className="list-back"><a className="" href="javascript://" onClick={this.goBack.bind(this)}></a></div>	
	</div>	
    <div className="restrict-track-wrap">	
	<div className="downgrade-action restrict-track-inner">	
		<p>{this.state.upgradeContent}</p>	
		<a href="javascript://" className="btn" onClick={newthis.showCardPage.bind(newthis)}>UPGRADE TO PRO</a>	
	</div>		
		<div className="list-back"><a className="" href="javascript://" onClick={this.goBack.bind(this)}></a></div>
	</div>
	
	<div className={(this.state.showSetting===true)?'setting-wrap active':'setting-wrap'}>	
	<h2 className="title">Settings</h2>	
		<div className="setting-wrap-inner">	
						
		<ul className="uxt-menu-list">
		{<li className="version">	
		  <a href="javascript://">Relevance</a>		  	
		  <label className="switch_label" htmlFor="toggleRelevance"> 		
			  <input type="checkbox" id="toggleRelevance" className="switch_input" onChange={this.handleCheckboxOption.bind(this, 'relevance')} value= "1" checked={Boolean(newthis.state.relevanceChecked)} />
			  <span className="switch_text" data-on="ON" data-off="OFF"></span>		
			  <span className="switch_handle"></span>		
		  </label>	
		 </li>}			
		 <li className="version two-column">
		  <a href="javascript://">Two Column</a>	
		  <label className="switch_label" htmlFor="columnCheck"> 	
			  <input id="columnCheck" type="checkbox" className="switch_input" onChange={this.handleCheckboxOptionTwoColumn.bind(this, 'status')} value= "1" checked={Boolean(newthis.state.checkedTwoColumn)} />
			  <span className="switch_text" data-on="ON" data-off="OFF"></span>	
			  <span className="switch_handle"></span>	
		  </label>	
		</li>
		
		{/*
		<li className="detail-view">	
		  <a href="javascript://">Top to Bottom</a>	
		  <label className="custom_radio"> 	
			<input 
			type="radio" 
			name="view"  
			id="bottom"
			value="topToBottom"
			onChange={this.viewChange} 
            checked={this.state.topToBottom}			
			/>
			<span></span> 	
		  </label>	
		</li>
		*/}	
        <li className="version">	
		  <a href="javascript://">Notifications</a>		  	
		  <label className="switch_label" htmlFor="notifyActive"> 		
			  <input type="checkbox" id="notifyActive" className="switch_input" onChange={this.handleCheckboxOption.bind(this, 'notifications')} value= "1" checked={Boolean(newthis.state.notifications)} />
			  <span className="switch_text" data-on="ON" data-off="OFF"></span>		
			  <span className="switch_handle"></span>		
		  </label>	
		 </li>		
		<li className="setting-color-mode">
			<a href="javascript://">Color Mode</a>								
			<ul className="ctrl-lst">
				{colors_list_settings}
			</ul>
		</li>	  	
      </ul>		
		</div>				
		<div className="list-back"><a className="" href="javascript://" onClick={this.goBack.bind(this)}></a></div>	
	</div>	
	
	
						
	<div className={(this.state.notificationShow===true)?'notification-wrap active':'notification-wrap'}>
		<h2 className="title">Notifications</h2>	
		<div className="notification-inner-wrap">
			<Scrollbars className="cb-scroll-wrap" >									
				<ul>
				 {notification_lists}									
				</ul>
			</Scrollbars>	
		</div>									
		
		<div className="list-back">
		<a className="" href="javascript://" onClick={this.goBack.bind(this)}></a>
		</div>	
	</div>
	
	
						
	<div className={(this.state.productFilter===true)?'product-filter-wrap active':'product-filter-wrap'}>
		<span className="product-filter-close" onClick={this.productFilterClose.bind(this)}>X</span>
		<h2 className="title">Filter By</h2>
		<a className="filter-clear" href="#" onClick={this.ClearFilter.bind(this)}>Clear</a>
		<div className="product-filter-inner-wrap">
			<Scrollbars className="cb-scroll-wrap" >
            {product_filter_price != ''?
				<><ul key="filter_by_price" className="uxt-menu-list">	
				   <li className="setting-price-mode">
					<a href="javascript://">Price</a>
						<ul className="uxt-menu-list ul-filter">		
							{product_filter_price}
					    </ul>
					</li></ul></>:''}
			
			{product_filter_category != ''?
				<><ul key="filter_by_cat" className="uxt-menu-list">	
				   <li className="setting-category-mode">
					<a href="javascript://">Category</a>
						<ul className="uxt-menu-list ul-filter">		
							{product_filter_category}
					    </ul>
					</li></ul></>:''}
			
			{product_filter_size != ''?
				<><ul key="filter_by_size" className="uxt-menu-list">	
				   <li className="setting-size-mode">
					<a href="javascript://">Size/Features</a>
						<ul className="uxt-menu-list ul-filter">				
						 {product_filter_size}
						</ul></li></ul></>
			:''}   
		
		    {product_filter_colors != ''?
				<>
				<ul key="filter_by_color" className="uxt-menu-list">	
				<li className="setting-color-mode">
					<a href="javascript://">Color</a>								
					<ul className="ctrl-lst filter-clr">
						{product_filter_colors}
					</ul>
				</li>	  	
			</ul></>:''}
			
	  </Scrollbars>	
	</div>	
	
	{/*<div className="filter_group_btn">		
		  <a href="#" onClick={this.ApplyFilter.bind(this)}>Apply Filter</a>
	</div>*/}							
		
		<div className="list-back">
		<a className="" href="javascript://" onClick={this.goBack.bind(this)}></a>
		</div>	
	</div>
	
	
	
	
	<div className={(this.state.upDownGrade===true && (user == null || user.package_plan == 'free'))?'upgrade-plan active':'upgrade-plan'}>
	<div className="upgrade-plan-inner">
		<PackageDetails
	    currentStep={5} 
		package_all_data={this.state.package_all_data}
		packfunc={this.packfunc}
		Plantype= {this.state.pack_pre_id}				
		>
		<div className="btn-section btn-group-sect">
			<a href="#" className="btn btn-back btn-primary" onClick={this.goBack.bind(this)}>Prev</a>
			{user == null?<a href="#" className="open-login login-account" onClick={this.showLogin.bind(this)}>Login</a>:''}
				{this.state.pack_pre_id =='Mg'?<button className="btn btn-primary btn-next" onClick={this.loadNext.bind(this, 'creditCard')} type="button">Next</button>:null}
		</div>
		</PackageDetails> 
		
	 <div className="acc-step-wrap acc-credit-wrap uxt-wa-active-step">
	 <form onSubmit={this.handleSubmit.bind(this)} id="acc-subscribe-form" autoComplete="off">
	  <div className="credit-card-form">
	  {upDownGrade && (this.state.message || this.state.error_message)? <div className={this.state.message?"form-group acc-payment-success":"form-group acc-payment-error"}>{(this.state.message)?this.state.message:this.state.error_message}</div>:''}
        <h2>Credit Card</h2>         
	    <div className="form-group custom-select-wrap">

        <CustomSelect
             handleSelect={this.handleSelectChange.bind(this)}
             title="Card Type" 
             className={ 'form-select-control '+(this.state.error_fields.card_type!=undefined ? 'error-field' : '') } 
             options={ card_types } 
             selected={ this.state.card_type } 
             name="card_type" 
             placeholder="Card Type"
             />
          
        </div>
        <div className="form-group">

          <NumberFormat
            className={ 'form-control '+(this.state.error_fields.credit_card_number!=undefined ? 'error-field' : '') }
            id="credit_card_number"
            name="credit_card_number"
            type="text"
            placeholder="Credit Card Number"
            value={this.state.credit_card_number}
            onChange={this.handleChange.bind(this)}
            format="#### #### #### ####"
            />
        </div>

        <div className="form-group custom-select-wrap">
        <CustomSelect
             handleSelect={this.handleSelectChange.bind(this)}
             title="Month" 
             className={ 'form-select-control '+(this.state.error_fields.expiry_month!=undefined ? 'error-field' : '') } 
             options={ expiry_month } 
             selected={ this.state.expiry_month } 
             name="expiry_month" 
             placeholder="Month"
             />
        </div>

        <div className="form-group custom-select-wrap">
        <CustomSelect
             handleSelect={this.handleSelectChange.bind(this)}
             title="Year" 
             className={ 'form-select-control '+(this.state.error_fields.expiry_year!=undefined ? 'error-field' : '') } 
             options={ expiry_year } 
             selected={ this.state.expiry_year } 
             name="expiry_year" 
             placeholder="Year"
             />
        </div>

        <div className="form-group">
          <NumberFormat
            className={ 'form-control '+(this.state.error_fields.d_cvv!=undefined ? 'error-field' : '') }
            id="d_cvv"
            name="d_cvv"
            type="text"
            placeholder="CVV"
            value={this.state.d_cvv}
            onChange={this.handleChange.bind(this)}
            />
       </div>	
       </div>
	   <div className="btn-section btn-group-sect">
          <a href="javascript://" className="btn btn-back btn-primary" onClick={this.gotoPackage.bind(this)}>Prev</a>
		  <button className="btn btn-primary btn-next">Next</button>
       </div>
	   </form>
	  </div>
	  {this.state.thankyou_message != null?<ThankYou
		  thankyou_message={this.state.thankyou_message}
		  handleReset={this.handleReset.bind(this)}
		>
	  </ThankYou>:''}				
	</div>					
	</div>
    </div>
	
	
	{(this.state.loadAjaxStatus===true || this.state.addTowishlistsLoad === true)?
	<div className="uxt-loading dynamic-loader">
	<div className="loading-inner"><span className="load-text">{this.state.loaderText}</span>{(this.state.loaderImage !== '')? <img src={this.state.loaderImage} alt=""/> : ''}		
    </div>
	</div>:''}
		  
	<div className="header-row-uxt">			
		<div className="menu">
			<a href="javascript://" onClick={newthis.handleSideMenu.bind(newthis, 'menulist')} className="menu-toggle logo-lg">Menu</a>
			<a href="javascript://" onClick={newthis.handleSideMenu.bind(newthis, 'menulist')} className="menu-toggle logo-sm">
				<svg width="32px" height="32px" id="a2fd0cef-1375-45db-987a-70953acfb53e" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.53 25.99"><defs></defs><g id="b6e245fb-d4e7-4324-b856-0c4310ce4d41" data-name="Page-1"><g id="a51eecda-f340-4e29-93cb-90b2222dda2b" data-name="Login-Copy-7"><g id="ad8698f6-c6e0-455c-84d5-70f56b061d60" data-name="M"><g className="ece6020c-0800-4016-94fa-c04f8a463efb"><g className="ece6020c-0800-4016-94fa-c04f8a463efb"><path d="M41.41,26H34.79V9.12L24.35,26H17.94L7.5,9.12V26H.88V0H8.73L21.15,19.88,33.56,0h7.85Z" transform="translate(-0.88 -0.01)"/></g></g></g></g></g></svg>
			</a>
		</div> 				 	
		<div className='product_search_box'>
			<div className="search-input-container">
				<input type="text" id="search_val" className="form-control search_val" onFocus={this.hideX.bind(this)} onBlur={this.showX.bind(this)} onKeyPress={newthis.enterPressed.bind(newthis)}  placeholder='Search' autoComplete="off" />	
				<span className={(this.state.searchValueReset===true)?'reset active':'reset'} onClick={newthis.reSetSearchVal.bind(newthis)}>X</span>
			</div>
			{localStorage.getItem('spell_correction') != null && localStorage.getItem('spell_correction') != ''?<h2 className="spell-correction">Showing results for: "{localStorage.getItem('spell_correction')}"</h2>:''}
		{(listRecentSearchesInner.length > 0)?
		<div className="search-option">
			<Scrollbars className="acc-scroll-wrap">
			<div className="search-option-inner">
			  <div className="trending-search-list">			
				<div className="search-list-lft">
					<h4>{(user == null)?'Trending Searches':'Recent Searches'}</h4> 
					{listRecentSearchesInner}
				</div>
				<div className="search-list-rgt">
					<h4>User Likes</h4> 
					{listRecommendedItems}
				</div>			
			</div>				
				
			</div>
			</Scrollbars>
		<span className="clear-search" onClick = {this.clearSearch.bind(this)}>X</span>
		</div>:''}	                    
			
		 <span className="product-filter-header" onClick={newthis.handleSideMenu.bind(newthis, 'filterlist')} ></span>
		 <span className="product-filter-search" onClick={newthis.handleSideMenu.bind(newthis, 'searchlist')} ></span>
		 <span className="coupon-filter-search" onClick={newthis.handleSideMenu.bind(newthis, 'couponlist')} ></span>
		</div> 	
		<div className="nav-right">
		{user != null?<>	
			<a href="javascript://" onClick={newthis.headProfile.bind(newthis)} className="login user">{user.user_fname.substr(0,7)}</a>							
			<a href="javascript://" className={user.user_fname?'h-favourite':'h-favourite hidden'} onClick={() => this.loadWatchList('clicked')}>{wishListCnt}</a></>
		:''}
		
		{this.state.notifications == true?<a href="javascript://" className="info-notify active" onClick={this.NotifyInfo.bind(this,'first')}></a>:''}	
		
		</div></div>			
	  </div>	


	{/*=========Notification Starts here=========*/}				
		
		{this.state.notifications == true && show_notification_content != ''?<div className={(this.state.notificationInnerShow == true && this.state.notificationMenu == false)?'notification-alert first-alert active':'notification-alert first-alert'}><span className="notify-remove" onClick={this.setNotificationstep.bind(this,'first-alert')}>X</span>
			{show_notification_content}		
		</div>:''}
		{/*==============================*/}
				
	  
	  <Watchlist ListTwoColumn={this.ListTwoColumn} mainFontFamily={this.state.mainFontFamily} subFontFamily={this.state.subFontFamily} showWatchlist={this.state.showWatchlist} wishlistactive={this.state.Wishlistactive} topToBottom={this.state.topToBottom} rightToLeft={this.state.rightToLeft} changeStatus={this.changeStatus} backStatus={this.backStatus} loaderText = {this.state.loaderText} loaderImage = {this.state.loaderImage} />
	  
	  <Recommendeditems ListTwoColumn={this.ListTwoColumn} mainFontFamily={this.state.mainFontFamily} subFontFamily={this.state.subFontFamily} showRecommendedList={this.state.showRecommendedList} recommendedListactive={this.state.recommendedListactive} topToBottom={this.state.topToBottom} rightToLeft={this.state.rightToLeft} changeStatus={this.changeStatus} backStatus={this.backStatus} loaderText = {this.state.loaderText} loaderImage = {this.state.loaderImage} />	  
	  
	  <Search ListTwoColumn={this.ListTwoColumn} twoColumn={this.twoColumn} mainFontFamily={this.state.mainFontFamily} subFontFamily={this.state.subFontFamily}  manageproductView={this.state.handleView} merchantFilterVal={this.state.merchantFilterVal} merchantClicked={this.state.merchantClicked} productLoadStatus={this.state.productLoadStatus} onRef={ref => (this.top = ref)} productExist={this.productExist}  triggerfun={this.state.triggerfun} searchProd = {this.state.searchClicked === true? this.state.passSearchValprops : null} recentSearchesClicked={this.state.recentSearchesClicked} recentSearches={this.state.recentSearches} enableLiteVersion={true} enableRelevance={Boolean(this.state.relevanceChecked)} userSettings={this.saveSettings} topToBottom={this.state.topToBottom} rightToLeft={this.state.rightToLeft} allmerchantFilterVal={this.state.allmerchantFilterVal} allmerchantClicked={this.state.allmerchantClicked} transferSize={this.transfersize} changeStatus={this.changeStatus} backStatus={this.backStatus} storeSendFilters={this.state.storeSendFilters} filterClosed={this.state.filterClosed} goBack={this.goBackDataAdv} loaderText = {this.state.loaderText} loaderImage = {this.state.loaderImage}/>
	  
	{(this.state.productLoadStatus == true)?<div className={(this.state.twoColumn===true)?'two-columns active':'two-columns'}>	
		<a href="javascript://" className="two-columns-btn" onClick = {this.twoColumn.bind(this)}></a>	
	</div>:''}	
	<a href="javascript://" className="scrollup"></a>
	
    </div>
	</section>
   </HashRouter>
    );
    }
}
export default AccessibilityButton;