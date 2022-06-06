import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import WordLimit from 'react-word-limit';
import InfiniteLoader from 'react-infinite-loader';
import $ from 'jquery';
import queryString from 'query-string';
import Slider from "react-slick"; 
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { API_FRONT_URL } from '../config/api';
// Import Swiper styles
import 'swiper/swiper-bundle.css';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  TumblrShareButton,
  EmailShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  TumblrIcon,
  EmailIcon,
  LineIcon
} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const config = require('./config');
const APIURL = config.path.apiUrl;
const BaseURL = config.path.baseUrl;
const loginUser = config.login_user;

var qs = require('qs');
const unique = (value, index, self) => {
      return self.indexOf(value) === index
     }
 var idArray = [];     
 var return_response ='';
 var lastScrollTop = 0;
class Search extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            loadProductList:'', showProductDetails:'', productList:[], setErrormsg: '',productId:'', productDetails: [], productViewStatus:false,  count:0, loadAjaxStatus: this.props.manageproductView ,addTowishlistsLoad: false, setMessage:'', loadWishlist : false, viewProductscroll:false,selectedItem:0, msgSuccess:'', productSearch: false, sort:'desc',loadProductCompare:'', showProductCount: 0, socialMedia: false, copied: false, wishlistExists:0, searchByMerchant:true, gridView:false, rowView:false, merchantFilterVal:'', page:0, slice_items: [], processing: false,  showMerchantProductCount:0, slider_available: 0, checked: true, productRelevant:'',twoColumn:false,  message: { to: '', body: ''}, submitting: false, error: false, error_response:'', id: 0, showProductDetailsSms:'', setRecMessage: '', msgSuccess: false, loadMoreClicked: false, setRelevantProductClass: false, smsActive: false, userlikesClicked:false,ListTwoColumns: false,
           };
				
		   this.OutsideClickforDetails = this.OutsideClickforDetails.bind(this); 
		  // this.onHandleChange = this.onHandleChange.bind(this);
		  // this.onSubmit = this.onSubmit.bind(this);
           $('.product-lists-uxt .manageSmsForm').removeClass('active');		   
    }
    
  
    componentDidMount() {
		
		setTimeout(() => {
			var parsed = queryString.parse(location.search);
			
		 if(parsed.id != undefined){
			localStorage.removeItem('setkeyword');
			var setKeyword = parsed.keyword;
			setKeyword = setKeyword.replace(/-/g,' ');
		    localStorage.setItem('setkeyword',setKeyword);	
            this.viewProduct(parsed.id,parsed.item,parsed.type);
		 }
		 else{
			this.setState({ productId: '' });
		 }
		}, 1000);
		
		this.props.onRef(this); 
		$('.alert').show();
		
		$(document).on('click','.clear-count',function(e){	
			$('.showChosenCount, .uxt-side-menu').removeClass('active');				
			return false;
		});
		
	}
	
	closeOrBackFnc = () =>{
		this.props.changeStatus();
			$('.uxt-loading').removeClass('detail-loading active');
			this.setState({loadAjaxStatus: false});
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			} 
			
	         var uriNew = window.location.toString();
			if (uriNew.indexOf("?") <= 0) {
				setTimeout(() => {
                       this.setState({productViewStatus: false, productId : ''});
					   $('.product-lists-uxt .manageSmsForm').removeClass('active');
					   $('.comparison-list').addClass('active');					   
					   }, 100); 		 
			}			
	}
	
	
	onHandleChange(event) {
		const name = event.target.getAttribute('name');
	    if(name == 'to'){
			this.setState({'id':event.target.id});
		}
		
		this.setState({
		  message: { ...this.state.message, [name]: event.target.value }
		});
	}
	
  onSubmit(event) {
    event.preventDefault();
    this.props.changeStatus();	
	$('.product-lists-uxt .manageSmsForm').addClass('active');
    this.setState({ submitting: true, productViewStatus: false });
	var getShareLink = '';
	if(document.getElementById("share_link")){
	getShareLink = document.getElementById("share_link").value;
	}
	
	 axios.post(APIURL+'products/sendSms', qs.stringify({data:this.state.message, link_append:getShareLink})).then(response => {
			if(response.data.status === "ok"){				
				  this.setState({
					error: false,
					submitting: false,
					message: {
					  to: '',
					  body: ''
					},
					error_response: response.data.message
				  }, ()=>{ this.setState({showProductDetailsSms:this.showProductDetailsSms()});
				       $('#to_v').val('');
				       $('#body_v').val('');
				       $('#share_link').val('');
				  });
	 		}
			else{
				this.setState({
				error: true,
				submitting: false,
				error_response: (response.data.response?response.data.response:response.data.message)
			    },()=>{ 
				 this.setState({showProductDetailsSms:this.showProductDetailsSms()});
				 });
				
			}
			
			
		}).catch(function (error) {
            console.log(error);
        });	
    }
  
	loadItems(page_no) {
	/* just simulating a load of more items from an api here */
	//this.setState({loadAjaxStatus : true});
	$('div.widget-list > span').show();
	   	this.getItems(page_no);
	}
  
  
  getItems(page_no) {
	let slice_items = this.state.slice_items;
	let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
	let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
	var keyword = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
	keyword = keyword.replace(/-/g,' ');
	var storedNames = '';
	 if(localStorage.getItem("storeSelectedMerchants")){
	 storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants"));
	 }	 
	 
	 var sort_type = '';
	 if(localStorage.getItem("sortValue")){
	  sort_type = localStorage.getItem("sortValue");
	 }
	 let storesDetail = (localStorage.getItem('feedrStores') != null?localStorage.getItem('feedrStores'):'');
		axios.post(APIURL+'products/listProducts', qs.stringify({searchKeyword:keyword, user_id:user_id, page:page_no, merchantIds:storedNames, sort:sort_type, user_type:user_type,storeNetworks: storesDetail, storeSendFilters:this.props.storeSendFilters})).then(response => {
	 		if(response.data.status === "ok"){
         		this.setState({processing:false, loadAjaxStatus : false, loadMoreClicked: false});				
				var sortedArray = [];
		    	var return_response = response.data.result;
			for(var i in return_response)
			{
				// Push each JSON Object entry in array by [value, key]
				sortedArray.push(['xyz'+new Date().getUTCMilliseconds()+i,return_response[i]]);
			}
			var search_results_sort = {};
			for(var j=0; j<sortedArray.length; j++){
				search_results_sort[sortedArray[j][0]] = sortedArray[j][1];
			}
			search_results_sort = Object.assign({},slice_items,search_results_sort);
			
			if(sort_type !=''){
			  var sortedArray = [];
			  for(var i in search_results_sort)
			  {
				// Push each JSON Object entry in array by [value, key]
				sortedArray.push([new Date().getUTCMilliseconds()+i,search_results_sort[i]]);
			  }
			  if(sort_type === 'asc'){
				  sortedArray.sort(function(a, b){
				  return a[1].price - b[1].price });
			  }
			  else if(sort_type === 'desc') {
				  sortedArray.sort(function(a, b){
				  return b[1].price - a[1].price });
			  }
			  
			   var search_results_sort = {};
				for(var j=0; j<sortedArray.length; j++){
					search_results_sort[j] = sortedArray[j][1];
				}
			  }
				localStorage.removeItem('setResultCnt');
				var totLength = Object.keys(search_results_sort).length;
				this.setState({ slice_items: search_results_sort, showProductCount:totLength, loadProductList:this.loadProductList(search_results_sort) })
								
				this.props.productExist(totLength);
				localStorage.setItem('setResultCnt', totLength);	
				this.setState({setErrormsg: ''});
			}
	 		else if(response.data.status == "error"){
	 			this.props.productExist(0);
				this.setState({loadAjaxStatus : false, setErrormsg:response.data.message, page: 0});
				$('div.widget-list > span').hide();
			}
        });
  }
  
  handleScrollFrame =()=> {
	  
	 if($('.uxt-side-menu').hasClass('open-package')){
		$('.uxt-side-menu').addClass('active');
	 }	  
	 var st = this.refs.scrollbars.getScrollTop();
	 setTimeout(() => {	
			if (st > lastScrollTop){
			   $('.header-uxt').addClass('fade-out');
			   $('.spell-correction').hide();
			   $('.header-row-uxt').removeClass('focused');
			   $('#search_val').blur();
			   $('.rearrange-result').addClass('sticky');
			   /*if(this.props.filterClosed == 0){
                this.getProductFilters();
			   }*/			   
			} else {
				$('.uxt-side-menu').removeClass('active');
			    $('.uxt-side-menu-inner').removeClass('active');			
		        $('.header-uxt').removeClass('fade-out');
			    $('.rearrange-result').removeClass('sticky');		   
			    $('.spell-correction').show();
				this.props.changeStatus();
			}
		lastScrollTop = st;
		}, 100);		
  }
  
  loadMore = () => {
	 
	 if(this.state.setErrormsg == ''){
		 setTimeout( () => {
			this.setState({loadMoreClicked:true});
		    this.loadItems(this.state.page)
		  }, 300)
	 } 
  }
  
  handlenScrollStop =() => {
	  
	let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	let package_plan = (customerDetails.package_plan?customerDetails.package_plan:'');
	
	if (this.state.processing == true)
    return false;

    if(package_plan == 'free' && this.state.page > 0)
	return false;

	if(this.refs.scrollbars.getScrollTop() >= (this.refs.scrollbars.getScrollHeight() - this.refs.scrollbars.getValues().clientHeight)*0.8){
		this.setState({processing:true});
		if(this.state.setErrormsg == ''){
		 setTimeout( () => {
		   this.setState({page:this.state.page+1}, () => { 
			  $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, button.load-more-btn, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
			 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
		
		});
          }, 300)
	 } 
     }	
  }	
  
  handleForceUpgrade = () => {
	if(this.refs.scrollbars.getScrollTop() >= (this.refs.scrollbars.getScrollHeight() - this.refs.scrollbars.getValues().clientHeight)*1){
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
		if(user_id !=''){
		  $('.upgrade-remainder').addClass('active');
		  $('.two-columns').hide();
		}		
    }	 
	else{
		$('.upgrade-remainder').removeClass('active');
		$('.two-columns').show();	
	}
  }
  
   socialMediaShare = () => {
	$('.product-lists-uxt .manageSmsForm').removeClass('active');
	 this.setState({
				  message: {
				  to: '',
				  body: '',
				  },
				  error_response: ''
			    });
	 this.setState(prevState => ({
			socialMedia: !prevState.socialMedia
		  })); 
	if($('.social-media.active').length)	
	 $('.social-media').removeClass('active');
	else
	 $('.social-media').addClass('active');
	}
	
	componentWillReceiveProps(lstProps) {	
	 if(this.state.productId == ''){
	  var parsed = queryString.parse(location.search);
	   if(parsed.id != undefined){
		    this.setState({userlikesClicked:true});
		  	localStorage.removeItem('setkeyword');
			var setKeyword = parsed.keyword;
			setKeyword = setKeyword.replace(/-/g,' ');
		    localStorage.setItem('setkeyword',setKeyword);	
            this.viewProduct(parsed.id,parsed.item,parsed.type);
		 }
	 }
	
	
	  $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
		
	   var setkeyword = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
	   setkeyword = setkeyword.replace(/-/g,' ');
	 	  
	if(setkeyword !== null && lstProps.searchProd != this.props.searchProd){
	   setTimeout(() => {	
        $("#search_val").val(setkeyword);   
		$('#search_val').blur();
	   }, 100);
	 }	      
	
	 if(lstProps.merchantClicked == true && lstProps.merchantFilterVal != this.props.merchantFilterVal){
	   this.setState({merchantFilterVal:lstProps.merchantFilterVal}, function() {
		this.getSelectedMerchants(this.state.merchantFilterVal);
	   })
	  }

      if(lstProps.recentSearchesClicked == true && this.props.recentSearches !=lstProps.recentSearches){
		 	this.loadProducts(lstProps.recentSearches);	
			this.setState({productViewStatus:false});		   
	  }
	  else if(this.props.storeSendFilters != lstProps.storeSendFilters && (lstProps.storeSendFilters != '' || lstProps.storeSendFilters.length == 0)){
		  	this.loadProducts(setkeyword,lstProps.storeSendFilters);	
			this.setState({productViewStatus:false});		   
	  }
	  else if(lstProps.merchantFilterVal==="" && lstProps.triggerfun===true && setkeyword !== null && typeof setkeyword !== 'undefined' && lstProps.searchProd !== null && this.props.searchProd == null){ 
	  	//this.setState({ minPrice:lstProps.minPrice, maxPrice:lstProps.maxPrice }, () => { 
		this.loadProducts(setkeyword);	
		this.setState({productViewStatus:false}); 
		//});            		    
		}
	  else if(lstProps.merchantFilterVal==="" && lstProps.triggerfun===true && setkeyword !== null && typeof setkeyword !== 'undefined' && lstProps.searchProd != this.props.searchProd && lstProps.searchProd !== null){ 
					
		    setTimeout(() => {	
				$("#search_val").val(setkeyword);   
				$('#search_val').blur();
			}, 100);
			
		       this.loadProducts(setkeyword);	
		       this.setState({productViewStatus:false});
		}
		else if(this.props.enableRelevance !=lstProps.enableRelevance){
			let sort_products = (lstProps.enableRelevance == true?'relevant':'asc');
		   	this.sortProducts(setkeyword,sort_products);	
			this.setState({productViewStatus:false}); 
	    }			
		else if(this.state.productId!==null && this.state.productId !='' && typeof this.state.productId!='undefined' && this.state.smsActive == false) {
			this.setState({productViewStatus:true});							
		}
		else {
			this.setState({productViewStatus:false});
		}
		
		if(localStorage.getItem('loggedIn') == 1){
				this.loadProducts(setkeyword);	
				localStorage.removeItem('loggedIn');
				localStorage.setItem('loggedIn',0);
				this.setState({processing:false});
			}

	}
       
    componentWillUnmount() {
		 this.props.onRef(undefined)       
    }

   storeRecommendedItems= (product_id,product_upc,merchant) => {
	
	let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
	let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
	var setkeyword = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
	setkeyword = setkeyword.replace(/-/g,' ');
	
	if(customerDetails !='' && user_id !=''){	
		axios.post(APIURL+'products/addToRecommend', qs.stringify({productID: product_id,product_upc:product_upc,user_id:user_id, merchant_type:merchant, user_type:user_type, keyword: setkeyword})).then(response => {
			if(response.data.status === "ok"){
			    $('.recommend-msg').html(response.data.message);				 
			}
			else if(response.data.status === "error"){
     		    $('.recommend-msg').html(response.data.message);	
			}
			else if(response.data.status === "restrict"){
				 $('.recommend-msg').html(response.data.message);				 	
			}
		 }).catch(function (error) {
			console.log(error);				
		 });     
	 }	 
	 else{		 
		$('.recommend-msg').html('Login');		
	 }  
	 
    setTimeout(() => {
		     $('.recommend-msg').html('');
             }, 5000);
	 }
	 
   addToWishist= (product_id,product_upc,merchant, type='') => {
	
	$('.alert').show();
	this.setState({loadWishlist:false});	 	   
    var e_msg = "Login";
	
	let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
	let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
	var setkeyword = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
	setkeyword = setkeyword.replace(/-/g,' ');
	
	this.setState({addTowishlistsLoad:false});
	if(customerDetails !='' && user_id !=''){	
		axios.post(APIURL+'products/addToWishlist', qs.stringify({productID: product_id,product_upc:product_upc,user_id:user_id, merchant_type:merchant, user_type:user_type, keyword:setkeyword })).then(response => {
			this.setState({addTowishlistsLoad:false});
			if(response.data.status === "ok"){
				
				this.setState({	count:response.data.count });
								
				this.setState({ wishlistExists: product_id }, () => {
			     if(type == 'list'){
					 var productList = this.state.productList;	  
	                 this.setState({loadProductList:this.loadProductList(productList)});
       			 }else{
					 this.setState({showProductDetails:this.showProductDetails()});
				 }
				});				
				
				$('.h-favourite').html(this.state.count);
				localStorage.setItem('wishlistCount', this.state.count);
				
				
				this.setState({setMessage:response.data.message, msgSuccess:true});	        			
				
			}
			else if(response.data.status === "error"){
				
				this.setState({ wishlistExists: 0 }, () => {
				if(type == 'list'){
				  var productList = this.state.productList;	  
	              this.setState({loadProductList:this.loadProductList(productList)});
				}
				else {
				 this.setState({showProductDetails:this.showProductDetails()});
				}
				});	
				
				this.setState({setMessage:response.data.message, msgSuccess:false});	
			}
			else if(response.data.status === "restrict"){
				
				this.setState({ wishlistExists: 0 }, () => {
				 $('.userListing, .upgrade-plan, .uxt-side-menu-inner, .product-filter-wrap, .mysearch-list, .merchant-filter-list, .trending-list, .couponlist-wrap').removeClass('active');
				// $('.merchant-filter-list').hide();
				 $('.uxt-side-menu, .restrict-track-wrap').addClass('active');
				 this.props.goBack();
				 
				});	
				
				this.setState({setMessage:response.data.message, msgSuccess:false});	
			}
		 }).catch(function (error) {
			console.log(error);				
		 });     
	 }	 
	 else{		 
		 this.setState({setMessage:e_msg, addTowishlistsLoad:false, msgSuccess:false});	  
	 }  
	 
    setTimeout(() => {
		      $('.alert').hide();
			  $('div.dtls-btn a.'+product_id+'.btn.btn-wl').html(this.state.setMessage);
             }, 2000);
	 }

       
    loadProducts(keyword,filter=null) {	
     $('.results-list .widget-list.store-filter-grid').removeClass('grid-view-list');
	 let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	 let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
	 let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
	 let storesDetail = (localStorage.getItem('feedrStores') != null?localStorage.getItem('feedrStores'):'');
	 localStorage.setItem('setkeyword',keyword);
	 localStorage.removeItem('spell_correction');
	 localStorage.removeItem('propsCheck');
		if(keyword !== null && keyword !== undefined){
		 this.refs.scrollbars.scrollTop(0);
		  this.setState({loadAjaxStatus : true, loadWishlist:false, searchByMerchant:false, productSearch:true, productViewStatus: false},()=>{ $('.load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');});
		$('.tag-input-filter span.tag-input').removeClass('active');	
		var sort_type = (this.props.enableRelevance == true?'relevant':'asc');
		var parsed = queryString.parse(location.search);
		if(parsed.keyword != undefined){
			this.setState({productViewStatus: true});
			  $('.comparison-list').removeClass('active');
		}
		else{
			this.setState({productViewStatus: false});	
		}
	
	  	axios.post(APIURL+'products/listProducts', qs.stringify({searchKeyword:keyword, user_id:user_id, sort:sort_type, user_type:user_type,storeNetworks: storesDetail,storeSendFilters:filter})).then(response => {
			this.setState({page: 0});
			
			if(response.data.status === "ok"){			
				this.setState({loadAjaxStatus : false});
				localStorage.removeItem('storeProducts');			
                localStorage.removeItem('setResultCnt');			
                localStorage.removeItem('sortValue');	
				localStorage.removeItem('showMerchantFilter');
				localStorage.removeItem('storeSelectedMerchants');
				localStorage.setItem('showMerchantFilter', response.data.merchant_filter);	
				this.props.transferSize(response.data.filterSize, response.data.filterColor, response.data.filterCategory);
				localStorage.setItem('spell_correction',response.data.spell_correction);
				if(response.data.spell_correction != ''){
					localStorage.setItem('setkeyword',response.data.spell_correction);
				}

				setTimeout(() => {	
				  localStorage.removeItem('spell_correction');	
				  $('.spell-correction').html('');	
				 }, 10000); 
				 
			   var get_response = JSON.stringify(response.data.result);
			   get_response = JSON.parse(get_response);
			   
			  /*if(sort_type === 'asc'){
				  get_response.sort(function(a, b){ return a.price - b.price });
			  }
			   else if(sort_type === 'desc') {
				   get_response.sort(function(a, b){ return b.price - a.price });
			   }*/
			  			  			  			              
			   var set_sort = (sort_type == 'asc'?'desc':'asc');
			   this.setState({sort:set_sort, productList:get_response, slice_items: get_response, loadProductList:this.loadProductList(get_response), setErrormsg:''});	
					  		   
			    localStorage.setItem('sortValue',sort_type);	
			    localStorage.setItem('storeProducts',JSON.stringify(get_response));	
				this.props.productExist(response.data.result.length);
				this.setState({showProductCount:response.data.product_count});
				localStorage.setItem('setResultCnt', response.data.product_count);	
				
			if(user_id == ''){
                if($(".uxt-side-menu").hasClass("open-package")){
			    }				
				else{
					$('.uxt-side-menu').removeClass('active');
				}
				setTimeout(() => {				 
				 if($(".uxt-side-menu").hasClass("active")){
				  //$('.uxt-side-menu').removeClass('active');
				 }
				 else{
				  this.upgradeDowngradeUser();
				  $('.uxt-side-menu').addClass('open-package');	
				  $('.acc-form-wrapper').addClass('active');				  
				  $('.acc-step-wrap .acc-login-wrap').removeClass('uxt-wa-active-step');
				  $('.uxt-side-menu-inner').removeClass('active');
				 }			  
				}, 15000);
			}		
				this.storeFilterView('gridView');
			}
	 		else if(response.data.status == "error"){
	 			this.props.productExist(0);
				this.setState({loadAjaxStatus : false, setErrormsg:response.data.message, loadProductList:''});
			}
        });
	 }
	}
	
	
	loadProduct(item_no=0,product_type='',el='', keyword, viewType='') {	
	   	$('.btn-wl').html('Track');
		if(viewType == 'sms'){
		   this.setState({loadAjaxStatus : false});	
		}
		else{
		   this.setState({loadAjaxStatus : false});
		}
	   
	    this.props.changeStatus(true, 'Detail');
		this.setState({loadWishlist:false, selectedItem:item_no});		
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
	    axios.post(APIURL+'products/productDetails', qs.stringify({productID: this.state.productId,user_id:user_id,product_type:product_type,product_list_id: el,keyword:keyword})).then(response => {
			this.setState({loadAjaxStatus : false});
			 if(user_id == ''){
			  $('.btn-wl').html('Track');
		     }
			if(response.data.status === "ok"){
				var result = response.data.result;				
				this.setState({productDetails:response.data.result, productRelevant:response.data.result_lists,wishlistExists:response.data.wishlist_exists});
				this.setState({showProductDetails:this.showProductDetails(), showProductDetailsSms:this.showProductDetailsSms()},()=>{
					$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
					$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
					
				 if(Object.keys(this.state.productRelevant).length > 2){
					 this.setState({setRelevantProductClass:true})
				  }
				  else{
					  this.setState({setRelevantProductClass:false})
				  }
				  			  
				});	
			}
        }).catch(function (error) {
            console.log(error);
        });		
	}
	
	getWishlistCount() {		
	  let customerDetails = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails != null && customerDetails.user_id?customerDetails.user_id:'');
	 	axios.post(APIURL+'products/getWishlistCount', qs.stringify({user_id: user_id})).then(response => {
			if(response.data.status === "ok"){				
			
				this.setState({ count : response.data.count});					
			  	localStorage.setItem('wishlistCount', this.state.count);
				this.props.userSettings(response.data.user_data);
   	 		}
        }).catch(function (error) {
            console.log(error);
        });		
	}	
	
   onCopy = () => { 
		
		this.setState({
			copied: true
			}, () => {
			this.showProductDetails();
			});  
						
			$('.copy-text').html('Copied');	
			 setTimeout(() => {
		      $('.copy-text').html('');
		      }, 3000);
		 
			$('.social-media').removeClass('active');		
     };
     
    base64EncodeUnicode(str='') {
		if(str !=''){
			str = str.replace(" ", "-");
			str = window.btoa(unescape(encodeURIComponent(str))); //btoa(str);
			str = str.replace(/[^A-Za-z\-]/g, '');	 
			return str.toLowerCase();
		}
    }
     
	sortProducts(search,sort_type){
		var search = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
		search = search.replace(/-/g,' ');
		if(search !== null && search !== undefined){
		this.setState({loadAjaxStatus : false, loadWishlist:false, productSearch:true});
		var storedNames = '';
		if(localStorage.getItem("storeSelectedMerchants")){
		 var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		}
		
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
        let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
		let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
		let storesDetail = (localStorage.getItem('feedrStores') != null?localStorage.getItem('feedrStores'):'');
			
	   	axios.post(APIURL+'products/listProducts', qs.stringify({searchKeyword:search,sort:sort_type, page:0, merchantIds:storedNames, user_type: user_type, user_id:user_id, storeNetworks: storesDetail,storeSendFilters:this.props.storeSendFilters})).then(response => {
	 		this.setState({page:0});
	 		if(response.data.status === "ok"){
			  this.setState({loadAjaxStatus : false});				
			  localStorage.removeItem('storeProducts');
			  localStorage.removeItem('setResultCnt');
			  localStorage.removeItem('sortValue');
			  
			  var search_results = response.data.result;
			  var sortedArray = [];
			  for(var i in search_results)
			  {
			   // Push each JSON Object entry in array by [value, key]
				sortedArray.push([i,search_results[i]]);
			  }
			  
			  if(sort_type === 'asc'){
				  sortedArray.sort(function(a, b){
				  return a[1].price - b[1].price });
			  }
			  else if(sort_type === 'desc') {
				  sortedArray.sort(function(a, b){
				  return b[1].price - a[1].price });
			  }
			  
			  var search_results_sort = {};
				for(var j=0; j<sortedArray.length; j++){
					search_results_sort[j] = sortedArray[j][1];
				}
			
			   var set_sort = (sort_type == 'asc'?'desc':'asc'); 
			   this.setState({sort:set_sort, productList:search_results_sort, slice_items:search_results_sort, loadProductList:this.loadProductList(search_results_sort)});  	
			   localStorage.setItem('storeProducts',JSON.stringify(search_results_sort));				   
						 			   
			   localStorage.setItem('sortValue',sort_type);				   
			   this.props.productExist(sortedArray.length);	
			   localStorage.setItem('setResultCnt', sortedArray.length);
			   this.setState({showProductCount:sortedArray.length, setErrormsg: ''});			   
	 		}
	 		else if(response.data.status == "error"){
				this.setState({loadAjaxStatus : false, setErrormsg:response.data.message, loadProductList:''});
				this.props.productExist(0);
			}
        });
      }	  
	}	
	
    loadSmsForm = (shareLink, productID, productType) => {		
		setTimeout(() => {			
			this.setState({productViewStatus:false, smsActive: true});
		}, 100);		
		setTimeout(() => {			
			 $('.product-lists-uxt .manageSmsForm').addClass('active');			 
			 $('#share_link').val(shareLink); 
		}, 1200);	
		this.viewProduct(productID,0,productType,'','sms');
		this.setState({error_response:''});				
		document.removeEventListener('click', this.OutsideClickforDetails, true);
	};
	
	smsClose = () =>{
       setTimeout(() => {		
			$('.product-lists-uxt .manageSmsForm').removeClass('active');
			}, 100);	
		if(this.state.productId != ''){		
		setTimeout(() => {
			this.setState({productViewStatus:true, smsActive: false}, ()=>{
				$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
				$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
		
			});	
			document.addEventListener('click', this.OutsideClickforDetails, true);			
		}, 1200);	   
		}
		
    }
	
	showProductDetails() {
	 var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
	 searchKey = searchKey.replace(/ /g,"-");
	 var current = this;
		this.setState({loadWishlist:false, productSearch:false});
	 		 	 	
	 	    var currentProduct = current.state.productDetails;
	 		var currentRelevantProduct = current.state.productRelevant;
			var relevantLists = '';
			
			if(Object.keys(current.state.productRelevant).length > 2){
				var relevantProducts = JSON.parse(currentRelevantProduct);
				relevantLists = relevantProducts.map(function(index,el){
				var relvProduct = index.product_details;
				relvProduct = JSON.parse(relvProduct);
				
				var setUniqRel = 'relProdct'+el;
				var actualRelPrice = (typeof relvProduct.price != 'undefined' && relvProduct.price !='' && relvProduct.price > 0?relvProduct.price/100:0);
				actualRelPrice = (actualRelPrice >0?actualRelPrice.toFixed(2):actualRelPrice);
				
				if(relvProduct.merchant !== '' && typeof relvProduct.merchant !== 'undefined'){
					var relImgurl = (typeof relvProduct.image!=='undefined' && relvProduct.image!=='' && relvProduct.image!==null)?relvProduct.image:API_FRONT_URL+'assets/images/no-image.png';
				return(					
				<SwiperSlide key={setUniqRel}>					   
		   	   <div key={setUniqRel} className="product-dtls-grid" className={relvProduct.merchant_id!='nft'?'product-dtls-grid':'product-dtls-grid product-dtls-nft-grid'}>	
					<div className="dtls-lf">			
						<div className="product_img">
				         <Link to='#' onClick={current.viewRelevantProduct.bind(current,relvProduct._id,parseInt(index),relvProduct.merchant,event)}><img src={relImgurl} alt="" /></Link>
						</div>					
					</div>
					<div className="dtls-rgt">						
						<div className="dtls-btm">
							<h4 className="amazon"><Link to='#' onClick={current.viewRelevantProduct.bind(current,relvProduct._id,parseInt(index),relvProduct.merchant,event)}>{relvProduct.merchant}</Link></h4>	
							{(actualRelPrice > 0 || relvProduct.merchant_id=='nft')?<h3 className="price">{relvProduct.merchant_id!='nft'?'$':'Points: '}{current,actualRelPrice}</h3>:''}
						</div>					
					</div>								
				</div>	
				</SwiperSlide>					   
					);
				}
				});
			}
			 
			var buy_link = currentProduct.direct_url;
			var aff_link = currentProduct.url;
			if(currentProduct.source_id == 3){
				buy_link = aff_link.replace("@@@", "5503414");
			}
			else if(currentProduct.source_id == 335){
				buy_link = aff_link.replace("@@@", "2605681");
			}
			
			var share_link = (window.location.href).replace( "/#/", "" ).split("?")[0]+'?keyword='+searchKey+'&id='+currentProduct._id+'&type='+encodeURIComponent(currentProduct.merchant);
			var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
    	 	    	 
			if(currentProduct.image !== undefined) {					
				
		 	var url = (typeof currentProduct.image!=='undefined' && currentProduct.image!=='' && currentProduct.image!==null)?currentProduct.image:API_FRONT_URL+'assets/images/no-image.png';	 	 		 	 
		 				 	
            var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !='' && currentProduct.price > 0?currentProduct.price/100:0);
				actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
				
			this.setState({'slider_available':0});			
			return (
		 	<>
			<div className="product-dtls-grid-main">
		   	   <div className={currentProduct.merchant_id!='nft'?'product-dtls-grid':'product-dtls-grid product-dtls-nft-grid'}>	
					 <div className="dtls-lf">			
						<div className="product_img">					
						 <img src={url} alt="" />
						</div>					
					 </div>
				   <div className="dtls-rgt">				
						<div className="share-link">						
								<CopyToClipboard onCopy={current.onCopy.bind(current)} text={share_link}>
							     <span><a className="sl-icon link"></a></span>
							    </CopyToClipboard>
								<a className="recommended-icon" href="#/" target="" onClick = {current.storeRecommendedItems.bind(current,currentProduct._id,storeUPC,currentProduct.merchant)}></a>
								<a href="javascript://" className="sl-icon share" onClick = {current.socialMediaShare.bind(current)}></a>
								<span className="copy-text"></span>								
								<span className="recommend-msg"></span>
						</div>	
						<div className={current.state.socialMedia===true?'social-media active':'social-media'}>
							<FacebookShareButton url={share_link}><FacebookIcon size={34} round={true} /></FacebookShareButton>			
							<LinkedinShareButton url={share_link}><LinkedinIcon size={34} round={true} /></LinkedinShareButton>
							<TwitterShareButton url={share_link}><TwitterIcon size={34} round={true} /></TwitterShareButton>
							<WhatsappShareButton url={share_link}><WhatsappIcon size={34} round={true} /></WhatsappShareButton>
							<EmailShareButton url={share_link}><EmailIcon size={34} round={true} /></EmailShareButton>
							<LineShareButton url={share_link}><LineIcon size={34} round={true} /></LineShareButton>
							<Link to="#" className="sms-share" onClick={current.loadSmsForm.bind(current,share_link,currentProduct._id,currentProduct.merchant)}>SMS</Link>						
						</div>	
						<div className="dtls-btm">
						<h4 className="amazon">{currentProduct.merchant}</h4>	
							<div className="dtls-txt">	
 							<p className="item-model">
								{(currentProduct.brand !== undefined && currentProduct.brand !== '')?<><span>Brand: {currentProduct.brand}</span><br></br></>:''}
								{(storeUPC !== undefined && storeUPC !== '')?<><span>UPC: {storeUPC}</span><br></br></>:''}			
								{(currentProduct.color !== undefined && currentProduct.color !== '')?<><span>Color: {currentProduct.color}</span><br></br></>:''}
								{(currentProduct.shippingweight !== undefined && currentProduct.shippingweight !== '')?<span>Weight: {currentProduct.shippingweight}</span>:''}								
								</p>		
								
												
								<>								
								{(currentProduct.nft_collections !== undefined && currentProduct.nft_collections !== '')?<p>Collections: <a href={currentProduct.nft_collections} target="_blank">{currentProduct.nft_collection_name}</a></p>:''}
								
								{(currentProduct.nft_symbol !== undefined && currentProduct.nft_symbol !== '')?<p>Symbol: {currentProduct.nft_symbol}</p>:''}
								
								{(currentProduct.nft_owner !== undefined && currentProduct.nft_owner !== '' && currentProduct.nft_owner != null)?<p className="owned-by">Owner: <img src={currentProduct.nft_owner_profile}/> #{currentProduct.nft_owner}</p>:''}
								{(currentProduct.nft_creator !== undefined && currentProduct.nft_creator !== '' && currentProduct.nft_creator != null)?<p className="created-by">Creator: <img src={currentProduct.nft_creator_profile}/> #{currentProduct.nft_creator}</p>:''}
								
								{(currentProduct.nft_created_date !== undefined && currentProduct.nft_created_date !== '')?<p>Created on: {currentProduct.nft_created_date}</p>:''}									
								</>								
								<h4 className="item-name">{currentProduct.name}</h4>						
							</div>
					   </div>				
					   
					   {(actualPrice > 0 || currentProduct.merchant_id=='nft')?<h3 className="price">{currentProduct.merchant_id!='nft'?'$':'Points: '}{actualPrice >0?actualPrice:0}</h3>:''}					
					<div className="dtls-btn">
						<a className="btn btn-buy" href={buy_link} target="_blank">Buy</a>
						{currentProduct.merchant_id !='nft'?<Link to="#" className={this.state.wishlistExists === currentProduct._id?currentProduct._id + ' btn btn-wl added-wishlist':currentProduct._id + ' btn btn-wl'} onClick = {this.state.wishlistExists === currentProduct._id?(event) => event.preventDefault():current.addToWishist.bind(current,currentProduct._id,storeUPC,currentProduct.merchant,'view')}>{this.state.wishlistExists === currentProduct._id?'Tracking':'Track'}</Link>:''}	
					</div>	
				</div>								
			</div>	
			</div>	
			{relevantLists != ''?<div className="relevantList"><h4>Related Items</h4>
							<Swiper	
							spaceBetween={20}							
							slidesPerView={4}
							freeMode={true}
							autoplay={{ delay: 1500 }}
							loop={true}
							navigation={false}
							breakpoints={{								
								320: {
								  width: 320,
								  slidesPerView: 1,
								  spaceBetween: 20,
								},
								600: {
								  width: 600,
								  slidesPerView: 2,
								  spaceBetween: 20,
								},
								900: {
								  width: 900,
								  slidesPerView: 4,
								  spaceBetween: 20,
								}
							}}
							>
			{relevantLists}
			</Swiper>
			</div>:''}			
			</>			
		 );
		
	 }
   }				

   showProductDetailsSms() {
	 var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
	 searchKey = searchKey.replace(/ /g,"-");
	 var current = this;
     this.setState({loadWishlist:false, productSearch:false});
	 		 	 	
		    var currentProduct = current.state.productDetails;
		 	var buy_link = currentProduct.direct_url;
			var aff_link = currentProduct.url;
			if(currentProduct.source_id == 3){
				buy_link = aff_link.replace("@@@", "5503414");
			}
			else if(currentProduct.source_id == 335){
				buy_link = aff_link.replace("@@@", "2605681");
			}
			
			var share_link = (window.location.href).replace( "/#/", "" ).split("?")[0]+'?keyword='+searchKey+'&id='+currentProduct._id+'&type='+encodeURIComponent(currentProduct.merchant);
			var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
    	 	    	 	
	 		if(currentProduct.image !== undefined) {					
					 				 	
		 	var url = (typeof currentProduct.image!=='undefined' && currentProduct.image!=='' && currentProduct.image!==null)?currentProduct.image:API_FRONT_URL+'assets/images/no-image.png';	 	 		 	 
		 				 	
			 var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !='' && currentProduct.price > 0?currentProduct.price/100:0);
			 actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
				
			this.setState({'slider_available':0});			
			return (
				<div className={currentProduct.merchant_id!='nft'?'product-dtls-sms':'product-dtls-sms product-dtls-nft-sms'}>	
					<div className="dtls-lf-sms">			
						<div className="product_img">					
						 <img src={url} alt="" />
						</div>					
					</div>
					<div className="dtls-rgt-sms">	
						<h4 className="amazon">{currentProduct.merchant}</h4>	
						<div className="dtls-txt">	
						<h4 className="item-name">{currentProduct.name}</h4>
							{(currentProduct.shippingweight !== undefined && currentProduct.shippingweight !== '')?<span>Weight: {currentProduct.shippingweight}</span>:''}
								{(currentProduct.nft_collections !== undefined && currentProduct.nft_collections !== '')?<p>Collections: <a href={currentProduct.nft_collections} target="_blank">{currentProduct.nft_collection_name}</a></p>:''}
								
								{(currentProduct.nft_symbol !== undefined && currentProduct.nft_symbol !== '')?<p>Symbol: {currentProduct.nft_symbol}</p>:''}
								
								{(currentProduct.nft_owner !== undefined && currentProduct.nft_owner !== '' && currentProduct.nft_owner != null)?<p className="owned-by">Owner: <img width="50" src={currentProduct.nft_owner_profile}/> #{currentProduct.nft_owner}</p>:''}
								{(currentProduct.nft_creator !== undefined && currentProduct.nft_creator !== '' && currentProduct.nft_creator != null)?<p className="created-by">Creator: <img width="50" src={currentProduct.nft_owner_profile}/> #{currentProduct.nft_creator}</p>:''}
								
								{(currentProduct.nft_created_date !== undefined && currentProduct.nft_created_date !== '')?<p>Created on: {currentProduct.nft_created_date}</p>:''}
						</div>	
                        {(actualPrice > 0 || currentProduct.merchant_id=='nft')?<h3 className="price">{currentProduct.merchant_id!='nft'?'$':'Points: '}{actualPrice >0?actualPrice:0}</h3>:''}	
										
					</div>								
				</div>								
		 );
	 }
   }					
   
	loadProductList(productList) {	
	  if(productList == ''){
			var productList = this.state.productList;
		}	
		var current = this;
	 	this.setState(prevState => ({
					showactive: false
				}));	
		this.setState({loadWishlist:false});
		
	   var addActive = this.state.showactive;	  
  	    
	   var slice_items = productList;
	   var s=1;
	   var htmlItem = Object.keys(slice_items).map((el, index) => {			
	   
	   var currentProduct = productList[el];	
	   var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !='' && currentProduct.price > 0?currentProduct.price/100:0);
       actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
	   
       if(currentProduct.name !=='' && currentProduct.merchant !== '' && typeof currentProduct.merchant !== 'undefined') {
		  	var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
            var buy_link = currentProduct.direct_url;
			var aff_link = currentProduct.url;
			if(currentProduct.source_id == 3){
				buy_link = aff_link.replace("@@@", "5503414");
			}
			else if(currentProduct.source_id == 335){
				buy_link = aff_link.replace("@@@", "2605681");
			}
		   var index = parseInt(index)+1;
		   var setUnikIndex = 'productList'+index;
			   $('div.widget-list > span').hide();
				return (
			   	 <div key={setUnikIndex} className={(currentProduct.merchant?this.base64EncodeUnicode(currentProduct.merchant):'')+(currentProduct.merchant_id != 'nft'?' comparison-list-row product-dtls-grid':' comparison-list-row product-dtls-grid nft-list-row')}>
                         <div className="product-img-top">				 
						 <div className="company-name forbig">
						  <p><Link to='#' onClick={current.viewProduct.bind(current,currentProduct._id,parseInt(index),currentProduct.merchant,el)}>{currentProduct.merchant}</Link></p>
						 </div>
						 <div className="pdt-img">
						  <Link to='#' onClick={current.viewProduct.bind(current,currentProduct._id,parseInt(index),currentProduct.merchant,el)}><img src={(typeof currentProduct.image!=='undefined' && currentProduct.image!=='')?currentProduct.image:API_FRONT_URL+'assets/images/no-image.png'} alt="" />
						  </Link>
						 </div>
						 </div>						 
                         <div className="product-dtls-bottom">
						  <div className="company-name formobi">
						  <p><Link to='#' onClick={current.viewProduct.bind(current,currentProduct._id,parseInt(index),currentProduct.merchant,el)}>{currentProduct.merchant}</Link></p>
						 </div>						 					  
						  <div className="item-model">
								{(currentProduct.brand !== undefined && currentProduct.brand !== '')?<p>Brand: {currentProduct.brand}</p>:''}
								{(storeUPC !== undefined && storeUPC !== '')?<p>UPC: {storeUPC}</p>:''}			
								{(currentProduct.color !== undefined && currentProduct.color !== '')?<p>Color: {currentProduct.color}</p>:''}
								{(currentProduct.shippingweight !== undefined && currentProduct.shippingweight !== '')?<p>Weight: {currentProduct.shippingweight}</p>:''}	

										
								{(currentProduct.nft_collections !== undefined && currentProduct.nft_collections !== '')?<p>Collections: <a href={currentProduct.nft_collections} target="_blank">{currentProduct.nft_collection_name}</a></p>:''}
								
								{(currentProduct.nft_symbol !== undefined && currentProduct.nft_symbol !== '')?<p>Symbol: {currentProduct.nft_symbol}</p>:''}
								
								{(currentProduct.nft_owner !== undefined && currentProduct.nft_owner !== '' && currentProduct.nft_owner != null)?<p className="owned-by">Owner: <img src={currentProduct.nft_owner_profile}/> #{currentProduct.nft_owner}</p>:''}
								
								{(currentProduct.nft_creator !== undefined && currentProduct.nft_creator !== '' && currentProduct.nft_creator != null)?<p className="created-by">Creator: <img src={currentProduct.nft_creator_profile}/> #{currentProduct.nft_creator}</p>:''}
								
								{(currentProduct.nft_created_date !== undefined && currentProduct.nft_created_date !== '')?<p>Created on: {currentProduct.nft_created_date}</p>:''}		
						  </div>
						  
						     								
						  
						  
						 <div className="pdt-desc">
						  <p><Link to='' onClick={current.viewProduct.bind(current,currentProduct._id,parseInt(index),currentProduct.merchant,el)}>{currentProduct.name}</Link></p>
						 {currentProduct.merchant_id == 'nft' && currentProduct.description?<p>{currentProduct.description}</p>:''}
						 </div>   
						 <div className="pdt-price">
						  <div className="btn-grp">
						  						  
						  {(actualPrice > 0 || currentProduct.merchant_id=='nft')?<p className="price" onClick={current.viewProduct.bind(current,currentProduct._id,parseInt(index),currentProduct.merchant,el)}>{currentProduct.merchant_id!='nft'?'$':'Points: '}{current,actualPrice} 
						  <i className="view-nxt-arrow"></i>
						  </p>:''}	
						 </div>
						 </div>	
						 
					<div className="dtls-btn">
						<a className="btn btn-buy" href={buy_link} target="_blank">Buy</a>
						{currentProduct.merchant_id!='nft'?<Link to="#" className={this.state.wishlistExists === currentProduct._id?currentProduct._id + ' btn btn-wl added-wishlist': currentProduct._id + ' btn btn-wl'} onClick = {this.state.wishlistExists === currentProduct._id?(event) => event.preventDefault():current.addToWishist.bind(current,currentProduct._id,storeUPC,currentProduct.merchant,'list')}>{this.state.wishlistExists === currentProduct._id?'Tracking':'Track'}</Link>:''}
					</div>
					</div>			
				 </div>				
				 );
			
			}
		});	  		  
	
	 	return (
	 	<> 	 	   
		 {htmlItem}	
		</>
      );  
     }
	 
	
	productDetailsScroll =() =>{
		$(".comparison-list .acc-scroll-wrap > div").animate({ scrollTop: 0 }, 600);
		return false;
	}
	
	viewProduct = (product_id,item_no=0,product_type='',el='', sms = '') => {
	this.setState({userlikesClicked:false});
	   $('.product-lists-uxt .manageSmsForm').removeClass('active');	   
	   this.setState({
				  message: {
				  to: '',
				  body: ''
				 },
				  error_response: ''
			    });

	var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
	searchKey = searchKey.replace(/ /g,'-');
	var share_link = '?keyword='+searchKey+'&id='+product_id+'&type='+encodeURIComponent(product_type);
	window.history.replaceState(null, null, share_link)
	
	  if($('.uxt-side-menu').hasClass('open-package')){
		//$('.uxt-side-menu').addClass('active');
	  }
	  else{
		$('.uxt-side-menu').removeClass('active');
	  }
		this.setState({loadWishlist:false});
       		
    	this.setState({ productId: product_id}, () => { 
		if(this.props.enableLiteVersion === true && el != 0){
			this.loadProduct(item_no,product_type,el,searchKey,sms); 
		}
		else{
			this.loadProduct(item_no,product_type,'',searchKey, sms); 
		}
		
		
			if(sms != 'sms'){
			 var uri = window.location.toString();
			 if (uri.indexOf("?") > 0 && this.state.productId != '') {
				 setTimeout(() => {	
				 this.setState({productViewStatus: true}, ()=> {
					$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
					$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
				   });
				   
			  $('.comparison-list').removeClass('active');
				}, 300); 
									 
				}
			}
		});				
		
		this.setState({viewProductscroll:true, socialMedia:false});
		$('.social-media').removeClass('active');		

		//event.persist();
		document.addEventListener('click', this.OutsideClickforDetails, true);
		
	}  
	
	relProductDetailsScroll =() =>{	
		$(".product-detail-content .acc-scroll-wrap > div").animate({ scrollTop: 0 }, 600);	
		return false;	
	}
	
	viewRelevantProduct = (product_id,item_no=0,product_type='',el='',event) => {		
		$('.product-lists-uxt .manageSmsForm').removeClass('active');	
		var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
		searchKey = searchKey.replace(/ /g,'-');
		var share_link = '?keyword='+searchKey+'&id='+product_id+'&type='+encodeURIComponent(product_type);
		window.history.replaceState(null, null, share_link)
		
		this.relProductDetailsScroll();
		  if($('.uxt-side-menu').hasClass('open-package')){
			 // $('.uxt-side-menu').addClass('active');
		  }
		  else{
			$('.uxt-side-menu').removeClass('active');
		  }
		this.setState({loadWishlist:false});		
    	this.setState({productId: product_id}, () => { 
		if(this.props.enableLiteVersion === true && el != 0){
			this.loadProduct(item_no,product_type,el,searchKey); 
		}
		else{
			this.loadProduct(item_no,product_type,'',searchKey); 
		}
		});				
		this.setState({viewProductscroll:true, socialMedia:false});
		if(this.state.productId != ''){
			setTimeout(() => {		
			  this.setState({productViewStatus: true});
			  $('.comparison-list').removeClass('active');			  
			}, 0);
		 }
		//event.persist();
		document.addEventListener('click', this.OutsideClickforDetails, true);
		
	}  	      
   		 
	OutsideClickforDetails(e) {

    var uriOutside = window.location.toString();
    // ignore clicks on the component itself
	 if (this.node && this.node.contains(e.target)) {
		return;
      }
	  else{	
	     var uri = window.location.toString();
		 if (uri.indexOf("?") > 0) {
			     if(!this.state.productId){
			  	   setTimeout(() => {	
				     this.setState({productViewStatus: true});					 
					 $('.comparison-list').removeClass('active');
				   }, 100); 
				 }
						
				setTimeout(() => {		
				      var clean_uri = uri.substring(0, uri.indexOf("?"));
				      window.history.replaceState({}, document.title, clean_uri);
				}, 300);				
				
				
				var uriNew = window.location.toString();
				if (uriNew.indexOf("?") <= 0) {
				setTimeout(() => {
                        $('.product-lists-uxt .manageSmsForm').removeClass('active');
					   }, 100); 		 
		         this.setState({ productId: '', productViewStatus:false });
				 this.props.changeStatus();
				}
			}		
            else{				
				setTimeout(() => {	
					     $('.product-lists-uxt .manageSmsForm').removeClass('active');
					   }, 100); 		 
		         this.setState({ productId: '', productViewStatus:false });
				 this.props.changeStatus();
				}				
	  } 	
		
    }
  
   getMerchantFilters(){
		
		setTimeout(() => {			 
	     $('.product_search_box .product-filter-header').trigger('click');
			$('.uxt-side-menu').addClass('active');
			$('.uxt-side-menu-inner').removeClass('active');			
		}, 100); 
		 	
		 return false;
   }
   
   getCouponFilters(){
		
		setTimeout(() => {			 
	     $('.product_search_box .coupon-filter-search').trigger('click');
			$('.uxt-side-menu').addClass('active');
			$('.uxt-side-menu-inner').removeClass('active');			
		}, 100); 
		 	
		 return false;
   }

  manageProductlist(){
	  this.setState({productSearch:true, productViewStatus:false});
	  this.props.backStatus();
	  setTimeout(() => {
         $(".acc-scroll-wrap > div").animate({ scrollTop: 0 }, "slow");
         return false;
       }, 100);           
	  
  }  
  
  getProductFilters(){
		 setTimeout(() => {			 
	     $('.product_search_box .product-filter-search').trigger('click');
			$('.uxt-side-menu').addClass('active');
			$('.uxt-side-menu-inner').removeClass('active');			
		}, 100); 
		 	
		 return false;
   }
  
  handleVisit(storeProduct) {
	var productList = (storeProduct != null && storeProduct != 'undefined'?storeProduct:this.state.productList);	  
	   setTimeout( () => {
          this.setState({loadProductList:this.loadProductList(productList)});
       }, 100);     	
  }
  
  gridView = () => {	
	   $('.product-list-view').removeClass('row-active'); 
	   $('.product-list-view').addClass('grid-active');
	   $('div.widget-list').removeClass('row-view-active');
	   $('div.widget-list').addClass('grid-view-active');
	   
   }
   rowView = () => {
	   $('.product-list-view').removeClass('grid-active');
	   $('.product-list-view').addClass('row-active');
	   $('div.widget-list').removeClass('grid-view-active');
	   $('div.widget-list').addClass('row-view-active');
   }
   
   
  storeFilterView = (elementVal) => {
	  localStorage.removeItem('setResultCnt');
	  if(elementVal == 'gridView'){		 
          this.setState({processing: false});	   
	      $('.results-list .widget-list.grid-view-list').addClass('active');
	      $('.store-filter-list').removeClass('active'); 
		  $('.results-list .widget-list.store-filter-grid').show();
		  $('.load-more').show();
		  localStorage.setItem('setResultCnt', this.state.showProductCount);
	   }
	   
   }
   
   upgradeDowngradeUser = () => {   
    $('.uxt-side-menu').addClass('active');
	$('.full-close').hide();
	$('.acc-form-wrapper .acc-step-wrap').removeClass('uxt-wa-active-step');
    $('.upgrade-plan-inner .acc-step-wrap').removeClass('uxt-wa-active-step');	
    $('.accessiblity-wrap, .uxt-side-menu-inner').removeClass('active');	
	$('.upgrade-remainder').removeClass('active');
    
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
	}, 100);  
   }
   
   upgradeClose = () =>{
	   $('.upgrade-remainder').removeClass('active');	
	   $('.two-columns').show();   
   }
   
   getSelectedMerchants = (merchantVal) => {
	let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
			
     $('div.widget-list.store-filter-grid.grid-view-active').removeClass('grid-view-list');
	 $('div.widget-list.grid-view-active.store-filter-grid').removeClass('active');	
		
	  if(merchantVal!=="" && typeof merchantVal!=="undefined") {
		   this.refs.scrollbars.scrollTop(0);
		if($(".tag-input-filter li#"+merchantVal).length>0) {

		 if($(".tag-input-filter li#"+merchantVal).hasClass("active")) {
			$('.tag-input-filter li#'+merchantVal).removeClass('active');	
						
			 var uniqueVal = idArray.filter(item => item !== merchantVal)
			 idArray = uniqueVal; 			
		}
		 else{		
			 $('.tag-input-filter li#'+merchantVal).addClass('active');	
		  
		  if($('.tag-input-filter li.active').length === 1 && localStorage.getItem("storeSelectedMerchants") == null){
			idArray = [];
		  }		 
		 
		   idArray.push(merchantVal);
		   var uniqueVal = idArray.filter(unique);	
		 } 
		 
		localStorage.setItem("storeSelectedMerchants", JSON.stringify(idArray)); 
		 var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants")); 
		}
		else if(merchantVal == 'clear'){
		 $('.tag-input-filter li').removeClass('active');	
		 $('.showChosenCount').html('');
		 $('.showChosenCount').removeClass('active');
         idArray = [];
		 localStorage.setItem("storeSelectedMerchants", JSON.stringify(idArray)); 
		 var storedNames = JSON.parse(localStorage.getItem("storeSelectedMerchants"));		 
		}
	 	}	 	
 	
	    $('div.widget-list > span').hide();
		 var obj = '';

		this.setState({productSearch:true, loadAjaxStatus : false});
		var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val());
		if(searchKey != undefined){
		 searchKey = searchKey.replace(/-/g,' ');
		}
		let user_type = (customerDetails.package_plan?customerDetails.package_plan:''); 
		let storesDetail = (localStorage.getItem('feedrStores') != null?localStorage.getItem('feedrStores'):'');
		
		var getSelectedStores = Object.keys(storedNames).length;
		 if(getSelectedStores == 1){							
			$('.showChosenCount').addClass('active');	
			$('.showChosenCount').html('<div class="chosen-count"><span class="clear-count">X</span><span class="count">'+getSelectedStores+'</span><p>Store is selected</p></div>');
		 }
		 else if(getSelectedStores > 1){					
			$('.showChosenCount').addClass('active');
			$('.showChosenCount').html('<div class="chosen-count"><span class="clear-count">X</span><span class="count">'+getSelectedStores+'</span><p>Stores are selected</p></div>');
		 }
		 else{
			$('.showChosenCount').html('');
			$('.showChosenCount').removeClass('active');								
		 }
		 
		
		axios.post(APIURL+'products/listProducts', qs.stringify({searchKeyword:searchKey, merchantIds:storedNames, user_type: user_type, user_id:user_id,storeNetworks: storesDetail, storeSendFilters:this.props.storeSendFilters})).then(response => {
	 		this.setState({page:0});
	 		if(response.data.status === "ok"){
				this.setState({loadAjaxStatus : false});
				localStorage.removeItem('storeProducts');	
				localStorage.removeItem('storeStoreFilterProducts');	
				localStorage.removeItem('setResultCnt');	
			    localStorage.removeItem('sortValue');				
				var return_response = JSON.stringify(response.data.result);
			    return_response = JSON.parse(return_response);
				
				this.setState({productList:return_response, slice_items: return_response, loadProductList:this.loadProductList(return_response), showProductCount:response.data.product_count});	
				localStorage.setItem('storeProducts',JSON.stringify(return_response));	
				this.props.productExist(response.data.result.length);
				
				localStorage.setItem('setResultCnt', response.data.product_count);
				this.setState({setErrormsg: '', processing: false});
	 		}
	 		else if(response.data.status == "error"){
	 			this.props.productExist(0);
				this.setState({loadAjaxStatus : false, setErrormsg:response.data.message, loadProductList:''});	
			}
        });
    }
	
	getTwoColumn = () => {		
		this.setState({	
				twoColumn: !this.state.twoColumn,	
		});	
		this.props.twoColumn('Profile');	
		
	}
	getListTwoColumn = () => {		
		this.props.ListTwoColumn();
	}
   
    render() {					
		$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .dtls-txt p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
			
		$('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .item-model p a, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list, .no-result').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');	
		
		let class_name = 'header_uxt';    
		var loadProductListCheck = this.state.loadProductList;		
		var viewProductDetails = this.state.showProductDetails;
		var viewProductDetailsSms = this.state.showProductDetailsSms;
		var setErrormsgCheck = this.state.setErrormsg;	    		
		var errormsgCheck = this.state.setMessage;	    		
		var newthis = this;	
			
		let customerDetails = (localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):'');
	    let user_id = (customerDetails.user_id?customerDetails.user_id:''); 
       	
	    var searchKey = (localStorage.getItem('setkeyword')?localStorage.getItem('setkeyword'):$('#search_val').val()); 
		if(searchKey != undefined){
	     searchKey = searchKey.replace(/-/g,' ');
		}
		var storeProduct = JSON.parse(localStorage.getItem('storeProducts'));
		return (
        <> 
		
		{/*<div className={this.state.productViewStatus===true && this.state.loadAjaxStatus === true?'uxt-loading detail-loading active':(this.state.loadAjaxStatus===true || this.state.addTowishlistsLoad === true)?'uxt-loading active':'uxt-loading'}>		
		 <a className="close-icon" href="javascript://" onClick={this.closeOrBackFnc.bind(this)}>X</a>
		</div>*/}

	
		{((this.state.productViewStatus===true && this.state.loadAjaxStatus === true) || (this.state.loadAjaxStatus===true || this.state.addTowishlistsLoad === true))?
		<div className="uxt-loading dynamic-loader sl-loader">
		<div className="loading-inner"><span className="load-text">{this.props.loaderText}</span>{(this.props.loaderImage !== '')? <img src={this.props.loaderImage} alt=""/> : ''}		
		<a className="close-icon" href="javascript://" onClick={this.closeOrBackFnc.bind(this)}>X</a>
		</div>
		</div>:''}		 
			 
	    <div className="product-lists-uxt"> 

		<div className={((this.state.productViewStatus===true && this.state.slider_available == 1)?'product-detail-content product-slider active':((this.state.productViewStatus===true)?'product-detail-content active':'product-detail-content'))+(this.props.topToBottom == true?' ':'')+(this.state.setRelevantProductClass == true?' relProduct':'')} ref={node => { this.node = node; }}>
			<div className="product-list-back">
				<a className="" href="javascript://" onClick={this.closeOrBackFnc.bind(this)}></a>
			</div>	
			<Scrollbars className="acc-scroll-wrap">
				<div className="product-detail-inner">
				{this.state.productViewStatus === true?<div className="product-detail-panel results_panel">{viewProductDetails}</div>:''}			
				
				</div>
				</Scrollbars>
				{/*<a className="btn-back" href="javascript://" onClick={this.closeOrBackFnc.bind(this)}><span>Go back to results</span></a>*/}
			</div>	
			
			<div className={"manageSmsForm "+(this.props.topToBottom ===true ? "top-view" : "right-view")}>			
			<a className="close-icon" href="javascript://" onClick = {this.smsClose.bind(this)}>X</a>
			<div className="manageSmsForm-inner">
			<div className="product-sendSms">{viewProductDetailsSms}</div>
			<div className="product-smsform">
			<h4 className="title">Send a text message of this find</h4>
			  <form onSubmit={this.onSubmit.bind(this)} className={this.state.error ? 'error sms-form' : 'sms-form'}>
				<div className="form-group">
				  <input
					id="to_v"
					type="tel"
					name="to"
					className="form-control"
					placeholder='+18588429239'
					defaultValue={this.state.message.to}
					onChange={this.onHandleChange.bind(this)}
				  />
				</div>
				<div className="form-group">
				 <textarea
					id="body_v"
					name="body"
					className="form-control"
					placeholder='Message'
					defaultValue={this.state.message.body !=''?this.state.message.body:''}
					onChange={this.onHandleChange.bind(this)}
				  />
				 <input
					type="hidden"
					name="share_link"
					className="form-control"
					id={"share_link"}
				  />								  
				</div>
				<button className="btn" type="submit" disabled={this.state.submitting}>Send</button>
			   </form>				   
			   {this.state.error_response != ''?<p className="error_sms">{this.state.error_response}</p>:''}
			   </div>
			</div>		
			</div>	
			
			
	    <div className={(this.props.productLoadStatus==true)?'comparison-list active':'comparison-list'}>	 
		
				
		<Scrollbars ref="scrollbars" onScrollFrame={this.handleScrollFrame} className="acc-scroll-wrap" onScroll={user_id !='' && user_id != 'undefined' && customerDetails.package_plan == 'pro'?this.handlenScrollStop:this.handleForceUpgrade}>
								 		
			{loadProductListCheck?<div className={(this.state.productSearch===false)?'results-list active':'results-list active'}>
									
			<div className={(this.state.productViewStatus === true && this.state.productSearch ===false)?' rearrange-result':' rearrange-result fixedCls'}>
			<div className="result_count"><span>{localStorage.getItem('setResultCnt')?localStorage.getItem('setResultCnt'):this.state.showProductCount}{(this.state.productViewStatus === true && this.state.productSearch ===false)?' related products':' results'}</span>
			
			<div className="product-list-view row-active"> 
				<span className={(this.state.sort=='desc')?'sort-icon active':'sort-icon'} onClick={this.sortProducts.bind(this,searchKey,this.state.sort)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="23.3" height="23.292" viewBox="0 0 23.3 23.292">
					<g id="Triangle_Copy_2" data-name="Triangle Copy 2" transform="translate(-188.35 -154)">
						<path id="Triangle_Copy_2-2" data-name="Triangle Copy 2" d="M-10.817,5.367a3,3,0,0,0-5.367,0l-8.646,17.292A3,3,0,0,0-22.146,27H-4.854a3,3,0,0,0,2.683-4.342Z" transform="translate(186.5 181) rotate(-180)" fill="#000"/>
						<path id="Triangle_Copy_2-3" data-name="Triangle Copy 2" d="M-10.817,5.367a3,3,0,0,0-5.367,0l-8.646,17.292A3,3,0,0,0-22.146,27H-4.854a3,3,0,0,0,2.683-4.342Z" transform="translate(186.5 181) rotate(-180)" fill="none"/>
					</g>
					</svg>
				</span>	
				<span className="store-filter" onClick={this.getMerchantFilters.bind(this)}>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" ><rect x="13.449" y="11.384" width="72.934" height="2.498"></rect><path d="M91.295,86.732c0,1.038-0.846,1.883-1.888,1.883H10.425c-1.042,0-1.888-0.845-1.888-1.883v-2.219  c0-1.046,0.846-1.891,1.888-1.891h78.982c1.042,0,1.888,0.845,1.888,1.891V86.732z"></path><polygon points="14.824,16.878 5.166,33.861 18.653,33.861 25.48,16.878 "></polygon><polygon points="35.138,16.878 30.308,33.861 43.631,33.861 45.628,16.878 "></polygon><polygon points="85.343,16.878 95,33.861 81.513,33.861 74.686,16.878 "></polygon><polygon points="65.026,16.878 69.854,33.861 56.535,33.861 54.538,16.878 "></polygon><path d="M18.48,36.396c0,3.722-3.017,6.741-6.741,6.741l0,0C8.016,43.137,5,40.118,5,36.396H18.48z"></path><path d="M43.623,36.396c0,3.722-3.017,6.741-6.74,6.741l0,0c-3.72,0-6.741-3.019-6.741-6.741H43.623z"></path><path d="M69.69,36.396c0,3.722-3.019,6.741-6.74,6.741l0,0c-3.722,0-6.74-3.019-6.74-6.741H69.69z"></path><path d="M94.833,36.396c0,3.722-3.017,6.741-6.741,6.741l0,0c-3.719,0-6.737-3.019-6.737-6.741H94.833z"></path><path d="M88.092,44.645c-3.724,0-6.877-2.48-7.898-5.876H70.85c-1.022,3.396-4.176,5.876-7.899,5.876  c-3.726,0-6.878-2.48-7.899-5.876H44.783c-1.021,3.396-4.174,5.876-7.9,5.876c-3.725,0-6.877-2.48-7.899-5.876H19.64  c-1.022,3.396-4.175,5.876-7.9,5.876c-0.978,0-1.914-0.18-2.786-0.493v33.939c0,1.041,0.846,1.888,1.888,1.888h78.149  c1.042,0,1.888-0.847,1.888-1.888V44.15C90.007,44.464,89.071,44.645,88.092,44.645z M59.414,78.077H40.419V56.882  c0-3.186,2.583-5.768,5.768-5.768h7.459c3.186,0,5.768,2.582,5.768,5.768V78.077z"></path></svg>	
      			</span>	
				<span className="product-filter" onClick={this.getProductFilters.bind(this)}>								
				<svg width="30" height="30" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" >
				 <defs>
				  <symbol id="f" overflow="visible">
				   <path d="m39.078-2.3281c-2.0117 1.043-4.1094 1.8281-6.2969 2.3594s-4.4648 0.79688-6.8281 0.79688c-7.0859 0-12.699-1.9766-16.844-5.9375-4.1367-3.957-6.2031-9.3281-6.2031-16.109 0-6.7891 2.0664-12.164 6.2031-16.125 4.1445-3.9688 9.7578-5.9531 16.844-5.9531 2.3633 0 4.6406 0.26562 6.8281 0.79688s4.2852 1.3242 6.2969 2.375v8.7969c-2.0312-1.3828-4.0391-2.3984-6.0156-3.0469-1.9688-0.64453-4.0469-0.96875-6.2344-0.96875-3.9062 0-6.9844 1.2578-9.2344 3.7656-2.2422 2.5-3.3594 5.9531-3.3594 10.359 0 4.3867 1.1172 7.8359 3.3594 10.344 2.25 2.5 5.3281 3.75 9.2344 3.75 2.1875 0 4.2656-0.32031 6.2344-0.96875 1.9766-0.64453 3.9844-1.6602 6.0156-3.0469z"/>
				  </symbol>
				  <symbol id="e" overflow="visible">
				   <path d="m16.031-40.953v9.0625h10.516v7.2812h-10.516v13.531c0 1.4805 0.28906 2.4805 0.875 3 0.59375 0.52344 1.7656 0.78125 3.5156 0.78125h5.2344v7.2969h-8.7344c-4.0312 0-6.8867-0.83594-8.5625-2.5156-1.6797-1.6875-2.5156-4.5391-2.5156-8.5625v-13.531h-5.0781v-7.2812h5.0781v-9.0625z"/>
				  </symbol>
				  <symbol id="d" overflow="visible">
				   <path d="m26.594-27.234v-17.078h10.266v44.312h-10.266v-4.6094c-1.3984 1.875-2.9453 3.25-4.6406 4.125-1.6875 0.875-3.6406 1.3125-5.8594 1.3125-3.9297 0-7.1562-1.5625-9.6875-4.6875-2.5234-3.125-3.7812-7.1445-3.7812-12.062 0-4.9141 1.2578-8.9375 3.7812-12.062 2.5312-3.125 5.7578-4.6875 9.6875-4.6875 2.1953 0 4.1445 0.44531 5.8438 1.3281 1.707 0.88672 3.2578 2.2578 4.6562 4.1094zm-6.7188 20.656c2.1875 0 3.8516-0.79688 5-2.3906 1.1445-1.5938 1.7188-3.9102 1.7188-6.9531 0-3.0391-0.57422-5.3594-1.7188-6.9531-1.1484-1.5938-2.8125-2.3906-5-2.3906-2.168 0-3.8242 0.79688-4.9688 2.3906-1.1484 1.5938-1.7188 3.9141-1.7188 6.9531 0 3.043 0.57031 5.3594 1.7188 6.9531 1.1445 1.5938 2.8008 2.3906 4.9688 2.3906z"/>
				  </symbol>
				  <symbol id="c" overflow="visible">
				   <path d="m21.875-6.5781c2.1758 0 3.8359-0.79688 4.9844-2.3906 1.1562-1.5938 1.7344-3.9102 1.7344-6.9531 0-3.0391-0.57812-5.3594-1.7344-6.9531-1.1484-1.5938-2.8086-2.3906-4.9844-2.3906-2.1875 0-3.8672 0.80469-5.0312 2.4062-1.168 1.6055-1.75 3.918-1.75 6.9375 0 3.0234 0.58203 5.3359 1.75 6.9375 1.1641 1.6055 2.8438 2.4062 5.0312 2.4062zm-6.7812-20.656c1.4062-1.8516 2.9609-3.2227 4.6719-4.1094 1.707-0.88281 3.6719-1.3281 5.8906-1.3281 3.9375 0 7.1641 1.5625 9.6875 4.6875 2.5195 3.125 3.7812 7.1484 3.7812 12.062 0 4.918-1.2617 8.9375-3.7812 12.062-2.5234 3.125-5.75 4.6875-9.6875 4.6875-2.2188 0-4.1836-0.44531-5.8906-1.3281-1.7109-0.88281-3.2656-2.2539-4.6719-4.1094v4.6094h-10.188v-44.312h10.188z"/>
				  </symbol>
				  <symbol id="b" overflow="visible">
				   <path d="m0.28125-42.516h39.188v8.2812h-14.094v34.234h-10.969v-34.234h-14.125z"/>
				  </symbol>
				  <symbol id="a" overflow="visible">
				   <path d="m5.3594-42.516h13.953l9.6875 22.75 9.7344-22.75h13.922v42.516h-10.359v-31.094l-9.7969 22.922h-6.9531l-9.7969-22.922v31.094h-10.391z"/>
				  </symbol>
				 </defs>
				 <g>
				  <path d="m376.27 140c10.359-40.254 46.902-70 90.395-70 43.488 0 80.031 29.746 90.391 70h49.594c12.895 0 23.348 10.355 23.348 23.332 0 12.887-10.441 23.336-23.348 23.336h-49.594c-10.359 40.254-46.902 70-90.391 70-43.492 0-80.035-29.746-90.395-70h-282.93c-12.895 0-23.348-10.359-23.348-23.336 0-12.887 10.441-23.332 23.348-23.332zm-233.33 233.33c10.359-40.254 46.902-70 90.391-70 43.492 0 80.035 29.746 90.395 70h282.93c12.895 0 23.348 10.359 23.348 23.336 0 12.887-10.441 23.332-23.348 23.332h-282.93c-10.359 40.254-46.902 70-90.395 70-43.488 0-80.031-29.746-90.391-70h-49.594c-12.895 0-23.348-10.355-23.348-23.332 0-12.887 10.441-23.336 23.348-23.336zm90.391 70c25.773 0 46.668-20.891 46.668-46.664 0-25.773-20.895-46.668-46.668-46.668-25.773 0-46.664 20.895-46.664 46.668 0 25.773 20.891 46.664 46.664 46.664zm233.34-233.33c25.773 0 46.664-20.895 46.664-46.668 0-25.773-20.891-46.664-46.664-46.664-25.773 0-46.668 20.891-46.668 46.664 0 25.773 20.895 46.668 46.668 46.668z" fillRule="evenodd"/>

				 </g>
				</svg>			
				
      			</span>	
				
				<span className="coupon-icon" onClick={this.getCouponFilters.bind(this)}>
				
					<svg width="30" height="30" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
					 <path d="m420 407.05c-3.8789 6.4727-10.176 11.133-17.5 12.949-8.9453 1.9688-18.285-0.62109-24.938-6.9141-6.6562-6.293-9.7617-15.473-8.2969-24.516 1.4648-9.0391 7.3125-16.766 15.613-20.637 8.3008-3.8672 17.98-3.375 25.848 1.3164 6.1445 3.8672 10.547 9.9727 12.277 17.023 1.7305 7.0547 0.65234 14.504-3.0039 20.777zm-95.727-176.57c6.2773 3.8633 13.84 5.0586 21 3.3242 7.2383-1.6875 13.523-6.1523 17.5-12.426 3.8398-6.3008 5.0352-13.855 3.332-21.035-1.707-7.1758-6.1719-13.387-12.43-17.289-4.3555-2.7305-9.3867-4.1875-14.527-4.1992-2.1484-0.26953-4.3242-0.26953-6.4727 0-7.5586 1.8398-13.98 6.8008-17.676 13.648-3.7578 6.2773-4.8906 13.781-3.1562 20.891 1.7383 7.1055 6.2031 13.246 12.43 17.086zm242.9 102.02-164.68 164.68c-7.1641 6.7227-16.68 10.359-26.5 10.129-9.8203-0.22656-19.16-4.3047-26-11.355l-192.5-192.5c-6.4141-6.3086-10.594-14.543-11.898-23.449l-17.5-149.27-5.6016-37.801c-1.9258-11.203 1.707-22.645 9.7461-30.68 8.0352-8.0391 19.477-11.672 30.68-9.7461l37.977 4.5508 149.27 17.5c8.9102 1.6641 17.031 6.2148 23.098 12.949l192.5 192.5c7.0742 6.8164 11.184 16.145 11.445 25.965 0.26172 9.8203-3.3438 19.348-10.043 26.535zm-374.68-227.5c0-4.6406-1.8438-9.0938-5.125-12.375s-7.7344-5.125-12.375-5.125-9.0938 1.8438-12.375 5.125-5.125 7.7344-5.125 12.375 1.8438 9.0938 5.125 12.375 7.7344 5.125 12.375 5.125 9.0938-1.8438 12.375-5.125 5.125-7.7344 5.125-12.375zm102.2 112.18c2.2695 9.9805 7.8789 18.891 15.898 25.254 8.0156 6.3633 17.965 9.8008 28.203 9.7461 3.5352 0.023438 7.0625-0.38672 10.5-1.2266 14.777-3.4453 26.848-14.059 32.16-28.273 5.3125-14.211 3.1602-30.141-5.7344-42.434-8.8945-12.293-23.352-19.32-38.512-18.723-15.164 0.60156-29.02 8.7461-36.914 21.707-6.293 10.125-8.3086 22.336-5.6016 33.949zm125.3 136.68c-10.191-6.25-22.438-8.2227-34.078-5.4844-11.637 2.7383-21.719 9.9648-28.055 20.102-6.3359 10.141-8.4062 22.371-5.7656 34.031 2.6836 11.746 10.004 21.91 20.297 28.176 10.191 7.4648 23.035 10.344 35.434 7.9336 12.402-2.4062 23.234-9.8828 29.891-20.621 6.6523-10.738 8.5234-23.766 5.1562-35.941-3.3633-12.176-11.656-22.398-22.879-28.195zm61.426-87.5c-0.64844-2.2695-2.1836-4.1797-4.2578-5.3008-2.0781-1.1211-4.5156-1.3555-6.7695-0.65234l-210 63.352c-4.5664 1.4297-7.1406 6.2617-5.7734 10.852 1.0352 3.7695 4.4922 6.3594 8.3984 6.2969h2.4492l210.88-63.352 0.003906 0.003906c2.3711-0.80469 4.2812-2.5859 5.2539-4.8945 0.96875-2.3086 0.90234-4.9258-0.17969-7.1797z"/>
					</svg>			
      			</span>	
				
			<span className="grid-view" onClick = {this.getListTwoColumn.bind(this,'gridView')}>
				<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <symbol id="w" overflow="visible">
   <path d="m18.766-1.125c-0.96875 0.5-1.9805 0.875-3.0312 1.125-1.043 0.25781-2.1367 0.39062-3.2812 0.39062-3.3984 0-6.0898-0.94531-8.0781-2.8438-1.9922-1.9062-2.9844-4.4844-2.9844-7.7344 0-3.2578 0.99219-5.8359 2.9844-7.7344 1.9883-1.9062 4.6797-2.8594 8.0781-2.8594 1.1445 0 2.2383 0.13281 3.2812 0.39062 1.0508 0.25 2.0625 0.625 3.0312 1.125v4.2188c-0.98047-0.65625-1.9453-1.1406-2.8906-1.4531-0.94922-0.3125-1.9492-0.46875-3-0.46875-1.875 0-3.3516 0.60547-4.4219 1.8125-1.0742 1.1992-1.6094 2.8555-1.6094 4.9688 0 2.1055 0.53516 3.7617 1.6094 4.9688 1.0703 1.1992 2.5469 1.7969 4.4219 1.7969 1.0508 0 2.0508-0.14844 3-0.45312 0.94531-0.3125 1.9102-0.80078 2.8906-1.4688z"/>
  </symbol>
  <symbol id="e" overflow="visible">
   <path d="m13.734-11.141c-0.4375-0.19531-0.87109-0.34375-1.2969-0.4375-0.41797-0.10156-0.83984-0.15625-1.2656-0.15625-1.2617 0-2.2305 0.40625-2.9062 1.2188-0.67969 0.80469-1.0156 1.9531-1.0156 3.4531v7.0625h-4.8906v-15.312h4.8906v2.5156c0.625-1 1.3438-1.7266 2.1562-2.1875 0.82031-0.46875 1.8008-0.70312 2.9375-0.70312 0.16406 0 0.34375 0.011719 0.53125 0.03125 0.19531 0.011719 0.47656 0.039062 0.84375 0.078125z"/>
  </symbol>
  <symbol id="c" overflow="visible">
   <path d="m17.641-7.7031v1.4062h-11.453c0.125 1.1484 0.53906 2.0078 1.25 2.5781 0.70703 0.57422 1.7031 0.85938 2.9844 0.85938 1.0312 0 2.082-0.14844 3.1562-0.45312 1.082-0.3125 2.1914-0.77344 3.3281-1.3906v3.7656c-1.1562 0.4375-2.3125 0.76562-3.4688 0.98438-1.1562 0.22656-2.3125 0.34375-3.4688 0.34375-2.7734 0-4.9297-0.70312-6.4688-2.1094-1.5312-1.4062-2.2969-3.3789-2.2969-5.9219 0-2.5 0.75391-4.4609 2.2656-5.8906 1.5078-1.4375 3.582-2.1562 6.2188-2.1562 2.4062 0 4.332 0.73047 5.7812 2.1875 1.4453 1.4492 2.1719 3.3828 2.1719 5.7969zm-5.0312-1.625c0-0.92578-0.27344-1.6719-0.8125-2.2344-0.54297-0.57031-1.25-0.85938-2.125-0.85938-0.94922 0-1.7188 0.26562-2.3125 0.79688s-0.96484 1.2969-1.1094 2.2969z"/>
  </symbol>
  <symbol id="b" overflow="visible">
   <path d="m9.2188-6.8906c-1.0234 0-1.793 0.17188-2.3125 0.51562-0.51172 0.34375-0.76562 0.85547-0.76562 1.5312 0 0.625 0.20703 1.1172 0.625 1.4688 0.41406 0.34375 0.98828 0.51562 1.7188 0.51562 0.92578 0 1.7031-0.32812 2.3281-0.98438 0.63281-0.66406 0.95312-1.4922 0.95312-2.4844v-0.5625zm7.4688-1.8438v8.7344h-4.9219v-2.2656c-0.65625 0.92969-1.3984 1.6055-2.2188 2.0312-0.82422 0.41406-1.8242 0.625-3 0.625-1.5859 0-2.8711-0.45703-3.8594-1.375-0.99219-0.92578-1.4844-2.1289-1.4844-3.6094 0-1.7891 0.61328-3.1016 1.8438-3.9375 1.2383-0.84375 3.1797-1.2656 5.8281-1.2656h2.8906v-0.39062c0-0.76953-0.30859-1.332-0.92188-1.6875-0.61719-0.36328-1.5703-0.54688-2.8594-0.54688-1.0547 0-2.0312 0.10547-2.9375 0.3125-0.89844 0.21094-1.7305 0.52344-2.5 0.9375v-3.7344c1.0391-0.25 2.0859-0.44141 3.1406-0.57812 1.0625-0.13281 2.125-0.20312 3.1875-0.20312 2.7578 0 4.75 0.54688 5.9688 1.6406 1.2266 1.0859 1.8438 2.8555 1.8438 5.3125z"/>
  </symbol>
  <symbol id="a" overflow="visible">
   <path d="m7.7031-19.656v4.3438h5.0469v3.5h-5.0469v6.5c0 0.71094 0.14062 1.1875 0.42188 1.4375s0.83594 0.375 1.6719 0.375h2.5156v3.5h-4.1875c-1.9375 0-3.3125-0.39844-4.125-1.2031-0.80469-0.8125-1.2031-2.1797-1.2031-4.1094v-6.5h-2.4219v-3.5h2.4219v-4.3438z"/>
  </symbol>
  <symbol id="h" overflow="visible">
   <path d="m12.766-13.078v-8.2031h4.9219v21.281h-4.9219v-2.2188c-0.66797 0.90625-1.4062 1.5703-2.2188 1.9844s-1.7578 0.625-2.8281 0.625c-1.8867 0-3.4336-0.75-4.6406-2.25-1.2109-1.5-1.8125-3.4258-1.8125-5.7812 0-2.3633 0.60156-4.2969 1.8125-5.7969 1.207-1.5 2.7539-2.25 4.6406-2.25 1.0625 0 2 0.21484 2.8125 0.64062 0.82031 0.42969 1.5664 1.0859 2.2344 1.9688zm-3.2188 9.9219c1.0391 0 1.8359-0.37891 2.3906-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3516-1.1562-2.3906-1.1562-1.043 0-1.8398 0.38672-2.3906 1.1562-0.55469 0.76172-0.82812 1.8711-0.82812 3.3281 0 1.4609 0.27344 2.5742 0.82812 3.3438 0.55078 0.76172 1.3477 1.1406 2.3906 1.1406z"/>
  </symbol>
  <symbol id="l" overflow="visible">
   <path d="m10.5-3.1562c1.0508 0 1.8516-0.37891 2.4062-1.1406 0.55078-0.76953 0.82812-1.8828 0.82812-3.3438 0-1.457-0.27734-2.5664-0.82812-3.3281-0.55469-0.76953-1.3555-1.1562-2.4062-1.1562-1.0547 0-1.8594 0.38672-2.4219 1.1562-0.55469 0.77344-0.82812 1.8828-0.82812 3.3281 0 1.4492 0.27344 2.5586 0.82812 3.3281 0.5625 0.77344 1.3672 1.1562 2.4219 1.1562zm-3.25-9.9219c0.67578-0.88281 1.4219-1.5391 2.2344-1.9688 0.82031-0.42578 1.7656-0.64062 2.8281-0.64062 1.8945 0 3.4453 0.75 4.6562 2.25 1.207 1.5 1.8125 3.4336 1.8125 5.7969 0 2.3555-0.60547 4.2812-1.8125 5.7812-1.2109 1.5-2.7617 2.25-4.6562 2.25-1.0625 0-2.0078-0.21094-2.8281-0.625-0.8125-0.42578-1.5586-1.0859-2.2344-1.9844v2.2188h-4.8906v-21.281h4.8906z"/>
  </symbol>
  <symbol id="g" overflow="visible">
   <path d="m0.34375-15.312h4.8906l4.125 10.391 3.5-10.391h4.8906l-6.4375 16.766c-0.64844 1.6953-1.4023 2.8828-2.2656 3.5625-0.86719 0.6875-2 1.0312-3.4062 1.0312h-2.8438v-3.2188h1.5312c0.83203 0 1.4375-0.13672 1.8125-0.40625 0.38281-0.26172 0.67969-0.73047 0.89062-1.4062l0.14062-0.42188z"/>
  </symbol>
  <symbol id="k" overflow="visible">
   <path d="m2.5781-20.406h6.6875l4.6562 10.922 4.6719-10.922h6.6875v20.406h-4.9844v-14.938l-4.7031 11.016h-3.3281l-4.7031-11.016v14.938h-4.9844z"/>
  </symbol>
  <symbol id="f" overflow="visible">
   <path d="m17.75-9.3281v9.3281h-4.9219v-7.1406c0-1.3203-0.03125-2.2344-0.09375-2.7344s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-15.312h4.8906v2.2344c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z"/>
  </symbol>
  <symbol id="j" overflow="visible">
   <path d="m12.766-2.5938c-0.66797 0.88672-1.4062 1.543-2.2188 1.9688-0.8125 0.41797-1.7578 0.625-2.8281 0.625-1.8672 0-3.4062-0.73438-4.625-2.2031-1.2188-1.4766-1.8281-3.3516-1.8281-5.625 0-2.2891 0.60938-4.1641 1.8281-5.625 1.2188-1.4688 2.7578-2.2031 4.625-2.2031 1.0703 0 2.0156 0.21484 2.8281 0.64062 0.8125 0.41797 1.5508 1.0742 2.2188 1.9688v-2.2656h4.9219v13.766c0 2.457-0.77734 4.3359-2.3281 5.6406-1.5547 1.3008-3.8086 1.9531-6.7656 1.9531-0.94922 0-1.8711-0.074219-2.7656-0.21875-0.89844-0.14844-1.7969-0.37109-2.7031-0.67188v-3.8125c0.86328 0.48828 1.7031 0.85156 2.5156 1.0938 0.82031 0.23828 1.6484 0.35938 2.4844 0.35938 1.6016 0 2.7734-0.35156 3.5156-1.0469 0.75-0.69922 1.125-1.7969 1.125-3.2969zm-3.2188-9.5312c-1.0117 0-1.8047 0.375-2.375 1.125-0.5625 0.74219-0.84375 1.7969-0.84375 3.1719 0 1.3984 0.26953 2.4609 0.8125 3.1875 0.55078 0.71875 1.3516 1.0781 2.4062 1.0781 1.0195 0 1.8125-0.36719 2.375-1.1094 0.5625-0.75 0.84375-1.8008 0.84375-3.1562 0-1.375-0.28125-2.4297-0.84375-3.1719-0.5625-0.75-1.3555-1.125-2.375-1.125z"/>
  </symbol>
  <symbol id="v" overflow="visible">
   <path d="m2.3594-21.281h4.8906v21.281h-4.8906z"/>
  </symbol>
  <symbol id="u" overflow="visible">
   <path d="m14.312-14.828v3.7188c-1.043-0.4375-2.0547-0.76562-3.0312-0.98438-0.98047-0.21875-1.9023-0.32812-2.7656-0.32812-0.92969 0-1.6211 0.11719-2.0781 0.34375-0.44922 0.23047-0.67188 0.58984-0.67188 1.0781 0 0.38672 0.17188 0.68359 0.51562 0.89062 0.34375 0.21094 0.95703 0.36719 1.8438 0.46875l0.85938 0.125c2.5078 0.32422 4.1953 0.85156 5.0625 1.5781 0.86328 0.73047 1.2969 1.8711 1.2969 3.4219 0 1.6367-0.60547 2.8672-1.8125 3.6875-1.1992 0.8125-2.9922 1.2188-5.375 1.2188-1.0234 0-2.0742-0.078125-3.1562-0.23438-1.0742-0.15625-2.1797-0.39453-3.3125-0.71875v-3.7188c0.96875 0.48047 1.9609 0.83984 2.9844 1.0781 1.0312 0.23047 2.0781 0.34375 3.1406 0.34375 0.95703 0 1.6758-0.12891 2.1562-0.39062 0.47656-0.26953 0.71875-0.66406 0.71875-1.1875 0-0.4375-0.16797-0.75781-0.5-0.96875-0.33594-0.21875-0.99609-0.38281-1.9844-0.5l-0.85938-0.10938c-2.1797-0.26953-3.7031-0.77344-4.5781-1.5156-0.875-0.73828-1.3125-1.8594-1.3125-3.3594 0-1.625 0.55078-2.8281 1.6562-3.6094 1.1133-0.78906 2.8203-1.1875 5.125-1.1875 0.89453 0 1.8359 0.074219 2.8281 0.21875 1 0.13672 2.082 0.35156 3.25 0.64062z"/>
  </symbol>
  <symbol id="i" overflow="visible">
   <path d="m2.1875-5.9688v-9.3438h4.9219v1.5312c0 0.83594-0.007813 1.875-0.015625 3.125-0.011719 1.25-0.015625 2.0859-0.015625 2.5 0 1.2422 0.03125 2.1328 0.09375 2.6719 0.070313 0.54297 0.17969 0.93359 0.32812 1.1719 0.20703 0.32422 0.47266 0.57422 0.79688 0.75 0.32031 0.16797 0.69141 0.25 1.1094 0.25 1.0195 0 1.8203-0.39062 2.4062-1.1719 0.58203-0.78125 0.875-1.8672 0.875-3.2656v-7.5625h4.8906v15.312h-4.8906v-2.2188c-0.74219 0.89844-1.5234 1.5586-2.3438 1.9844-0.82422 0.41406-1.7344 0.625-2.7344 0.625-1.7617 0-3.1055-0.53906-4.0312-1.625-0.92969-1.082-1.3906-2.6602-1.3906-4.7344z"/>
  </symbol>
  <symbol id="t" overflow="visible">
   <path d="m2.3594-15.312h4.8906v15.312h-4.8906zm0-5.9688h4.8906v4h-4.8906z"/>
  </symbol>
  <symbol id="d" overflow="visible">
   <path d="m9.6406-12.188c-1.0859 0-1.9141 0.39062-2.4844 1.1719-0.57422 0.78125-0.85938 1.9062-0.85938 3.375s0.28516 2.5938 0.85938 3.375c0.57031 0.77344 1.3984 1.1562 2.4844 1.1562 1.0625 0 1.875-0.38281 2.4375-1.1562 0.57031-0.78125 0.85938-1.9062 0.85938-3.375s-0.28906-2.5938-0.85938-3.375c-0.5625-0.78125-1.375-1.1719-2.4375-1.1719zm0-3.5c2.6328 0 4.6914 0.71484 6.1719 2.1406 1.4766 1.418 2.2188 3.3867 2.2188 5.9062 0 2.5117-0.74219 4.4805-2.2188 5.9062-1.4805 1.418-3.5391 2.125-6.1719 2.125-2.6484 0-4.7148-0.70703-6.2031-2.125-1.4922-1.4258-2.2344-3.3945-2.2344-5.9062 0-2.5195 0.74219-4.4883 2.2344-5.9062 1.4883-1.4258 3.5547-2.1406 6.2031-2.1406z"/>
  </symbol>
  <symbol id="s" overflow="visible">
   <path d="m12.422-21.281v3.2188h-2.7031c-0.6875 0-1.1719 0.125-1.4531 0.375-0.27344 0.25-0.40625 0.6875-0.40625 1.3125v1.0625h4.1875v3.5h-4.1875v11.812h-4.8906v-11.812h-2.4375v-3.5h2.4375v-1.0625c0-1.6641 0.46094-2.8984 1.3906-3.7031 0.92578-0.80078 2.3672-1.2031 4.3281-1.2031z"/>
  </symbol>
  <symbol id="r" overflow="visible">
   <path d="m16.547-12.766c0.61328-0.94531 1.3477-1.6719 2.2031-2.1719 0.85156-0.5 1.7891-0.75 2.8125-0.75 1.7578 0 3.0977 0.54688 4.0156 1.6406 0.92578 1.0859 1.3906 2.6562 1.3906 4.7188v9.3281h-4.9219v-7.9844-0.35938c0.007813-0.13281 0.015625-0.32031 0.015625-0.5625 0-1.082-0.16406-1.8633-0.48438-2.3438-0.3125-0.48828-0.82422-0.73438-1.5312-0.73438-0.92969 0-1.6484 0.38672-2.1562 1.1562-0.51172 0.76172-0.77344 1.8672-0.78125 3.3125v7.5156h-4.9219v-7.9844c0-1.6953-0.14844-2.7852-0.4375-3.2656-0.29297-0.48828-0.8125-0.73438-1.5625-0.73438-0.9375 0-1.6641 0.38672-2.1719 1.1562-0.51172 0.76172-0.76562 1.8594-0.76562 3.2969v7.5312h-4.9219v-15.312h4.9219v2.2344c0.60156-0.86328 1.2891-1.5156 2.0625-1.9531 0.78125-0.4375 1.6406-0.65625 2.5781-0.65625 1.0625 0 2 0.25781 2.8125 0.76562 0.8125 0.51172 1.4258 1.2305 1.8438 2.1562z"/>
  </symbol>
  <symbol id="q" overflow="visible">
   <path d="m17.75-9.3281v9.3281h-4.9219v-7.1094c0-1.3438-0.03125-2.2656-0.09375-2.7656s-0.16797-0.86719-0.3125-1.1094c-0.1875-0.3125-0.44922-0.55469-0.78125-0.73438-0.32422-0.17578-0.69531-0.26562-1.1094-0.26562-1.0234 0-1.8242 0.39844-2.4062 1.1875-0.58594 0.78125-0.875 1.8711-0.875 3.2656v7.5312h-4.8906v-21.281h4.8906v8.2031c0.73828-0.88281 1.5195-1.5391 2.3438-1.9688 0.83203-0.42578 1.75-0.64062 2.75-0.64062 1.7695 0 3.1133 0.54688 4.0312 1.6406 0.91406 1.0859 1.375 2.6562 1.375 4.7188z"/>
  </symbol>
  <symbol id="p" overflow="visible">
   <path d="m2.5781-20.406h5.875l7.4219 14v-14h4.9844v20.406h-5.875l-7.4219-14v14h-4.9844z"/>
  </symbol>
  <symbol id="o" overflow="visible">
   <path d="m2.5781-20.406h8.7344c2.5938 0 4.582 0.57812 5.9688 1.7344 1.3945 1.1484 2.0938 2.7891 2.0938 4.9219 0 2.1367-0.69922 3.7812-2.0938 4.9375-1.3867 1.1562-3.375 1.7344-5.9688 1.7344h-3.4844v7.0781h-5.25zm5.25 3.8125v5.7031h2.9219c1.0195 0 1.8047-0.25 2.3594-0.75 0.5625-0.5 0.84375-1.2031 0.84375-2.1094 0-0.91406-0.28125-1.6172-0.84375-2.1094-0.55469-0.48828-1.3398-0.73438-2.3594-0.73438z"/>
  </symbol>
  <symbol id="n" overflow="visible">
   <path d="m2.3594-15.312h4.8906v15.031c0 2.0508-0.49609 3.6172-1.4844 4.7031-0.98047 1.082-2.4062 1.625-4.2812 1.625h-2.4219v-3.2188h0.85938c0.92578 0 1.5625-0.21094 1.9062-0.625 0.35156-0.41797 0.53125-1.2461 0.53125-2.4844zm0-5.9688h4.8906v4h-4.8906z"/>
  </symbol>
  <symbol id="m" overflow="visible">
   <path d="m14.719-14.828v3.9844c-0.65625-0.45703-1.3242-0.79688-2-1.0156-0.66797-0.21875-1.3594-0.32812-2.0781-0.32812-1.3672 0-2.4336 0.40234-3.2031 1.2031-0.76172 0.79297-1.1406 1.9062-1.1406 3.3438 0 1.4297 0.37891 2.543 1.1406 3.3438 0.76953 0.79297 1.8359 1.1875 3.2031 1.1875 0.75781 0 1.4844-0.10938 2.1719-0.32812 0.6875-0.22656 1.3203-0.56641 1.9062-1.0156v4c-0.76172 0.28125-1.5391 0.48828-2.3281 0.625-0.78125 0.14453-1.5742 0.21875-2.375 0.21875-2.7617 0-4.9219-0.70703-6.4844-2.125-1.5547-1.4141-2.3281-3.3828-2.3281-5.9062 0-2.5312 0.77344-4.5039 2.3281-5.9219 1.5625-1.4141 3.7227-2.125 6.4844-2.125 0.80078 0 1.5938 0.074219 2.375 0.21875 0.78125 0.13672 1.5547 0.35156 2.3281 0.64062z"/>
  </symbol>
 </defs>
 <g>
  <path d="m336 22.398h-220.47c-6.1328 0-12.016 2.4375-16.352 6.7773-4.3398 4.3359-6.7773 10.219-6.7773 16.352v468.95c0 6.1328 2.4375 12.016 6.7773 16.352 4.3359 4.3398 10.219 6.7773 16.352 6.7773h220.47z"/>
  <path d="m584.47 22.398h-220.47v515.2h220.47c6.1328 0 12.016-2.4375 16.352-6.7773 4.3398-4.3359 6.7773-10.219 6.7773-16.352v-468.95c0-6.1328-2.4375-12.016-6.7773-16.352-4.3359-4.3398-10.219-6.7773-16.352-6.7773z"/>
 </g>
</svg>
				</span>
			
				<a href="javascript://" className={(this.state.twoColumn===true)?'two-columns-btn active':'two-columns-btn'}  onClick = {this.getTwoColumn.bind(this)}></a>
			</div>	
		</div>
	</div>
		
		
			
		    <div className="widget-list grid-view-active store-filter-grid"> 			
				{loadProductListCheck?loadProductListCheck:<div className="no-result">No product found</div>}
			</div>	
			
		    <div className="load-more"> 
				{(customerDetails.package_plan == 'pro' && this.state.page > 0 && this.state.loadMoreClicked == true)?<InfiniteLoader />:((customerDetails.package_plan == 'pro' && this.state.page > 0 && this.state.loadMoreClicked == false)?<button className="load-more-btn" onClick={this.loadMore.bind(this)}><span>More</span></button>:null)}
			</div>	
			
			<div className="upgrade-remainder">	
				<a href="javascript://" className="close-icon" onClick = {this.upgradeClose.bind(this)}>X</a>
			<div className="upgrade-remainder-inner">	
				<p><a href="javascript://" className="" onClick = {this.upgradeDowngradeUser.bind(this)}>
				Upgrade to PRO for full access</a></p>
			</div>	
			</div>
			</div>:<div className="no-result">{setErrormsgCheck}</div>}
				
			{this.state.productViewStatus === true && this.state.productSearch ===false?<div className="product-list-back">
				<Link className="" to='#' onClick = {this.manageProductlist.bind(this)}></Link>
			</div>:''}
		     	
		</Scrollbars>		
		</div>
	  </div> 
	  </>
    );
  }
}
export default Search;