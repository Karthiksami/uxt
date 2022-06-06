import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
  LineIcon
} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import $ from 'jquery';
const config = require('./config');
const APIURL = config.path.apiUrl;
var qs = require('qs');
let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
var lastScrollTop = 0;
class Watchlist extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loadAjaxStatus: false, loadWatchListDisplay : false, manageWatchlist:'', watchList :[], productViewStatus: false, viewProductscroll:false, setDeleteMessage: false, count:localStorage.getItem('wishlistCount'),  copied: false, socialMedia: false, showWatchlist:props.showWatchlist, setMessage:'',
			sort:'desc', deleteProdID:'', deleteKey:'', deleteUserID: '', showProductDetails: '', showProductDetailsSms:'', message: { to: '', body: ''}, submitting: false, error: false, error_response:'', enableDelete: false
        };   
		this.OutsideClickforDetails = this.OutsideClickforDetails.bind(this); 
		//this.onHandleChange = this.onHandleChange.bind(this);
		//this.onSubmit = this.onSubmit.bind(this);
        $('.watchlist_wrap .manageSmsForm').removeClass('active');			
    }
    
	scrollToSection = () => {			
		var st = $('.watchlist_list .acc-scroll-wrap > div').scrollTop();		
		setTimeout(() => {	
			if (st > lastScrollTop){
			   $('.header-uxt').addClass('fade-out');
			   $('.header-row-uxt').removeClass('focused');
			   $('#search_val').blur();
			} else {					
			   $('.header-uxt').removeClass('fade-out');
			}
		lastScrollTop = st;
		}, 100);	
	}
	
    componentDidMount() {	
	 if(this.props.wishlistactive === true){
		 this.setState({productViewStatus:false, loadAjaxStatus : false });
	  }
	     			   
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');  
		if(user !=null && user.user_fname != undefined && this.props.wishlistactive === true){
		 var store_list = this.loadWlists(user.user_id);
	    }
		else{
		 var store_list = this.noResultFound();	
	    }	 
		this.setState({ manageWatchlist:store_list});
		
    }
	
	
     componentWillReceiveProps(wishProps) {	
		if(this.props.wishlistactive === true){
		 this.setState({productViewStatus:false});		
	    }
	  
	     this.setState({loadAjaxStatus : false});
	    
	    let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
        
		if(user != null && user.user_id != undefined && this.props.wishlistactive === true){
		 var store_list = this.loadWlists(user.user_id);
	    }
		else{
		 var store_list = this.noResultFound();	
	    }	 
		this.setState({ manageWatchlist:store_list});
		
	 }
	 
    Logintrigger(){	
		e.preventDefault();
	}
	
    deleteItemSelected(product_id) {
	  this.setState({enableDelete:true},()=>{
		  $('.delete-select-remove').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');						
	  });
	  if ($('.wishlist-row#grid_'+product_id+ '.selected')[0]){
		   $('.wishlist-row#grid_'+product_id).removeClass('selected');
		} else{
		   $('.wishlist-row#grid_'+product_id).addClass('selected');
		}
	 }	
	
	multiDeleteItem(){
		this.deleteProductPrompt();
	}

   deleteProductPrompt() {	   
   let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
   var user_id = user.user_id;
		this.setState({deleteUserID: user_id});
		$('.watchlist_wrap .confirm-action').addClass('show');
	}	
	
    deleteProduct(val,user_id) {
	 $('.watchlist_wrap .confirm-action').removeClass('show');
	 if(val == 'no')
	 return;
    
		$('.alert').show();
		var code = 'grid_0';
		var recIds = [];
		 $(".wishlist-row.selected").each(function() {
				code = $(this).attr('id');
				code = code.split('_');
				recIds.push(code[1]);
				$('.wishlist-row#grid_'+code[1]).addClass('delete-row');
				setTimeout(() => {
				   $('.wishlist-row#grid_'+code[1]).hide();
				},100);
         });
				
	   setTimeout(() => {
			axios.post(APIURL+'products/deleteWishlists', qs.stringify({user_id: user_id,product_id:recIds})).then(response => {
			if(response.data.status === "ok"){	
           	    var store_list_delete = this.loadWlists(user_id);
			    this.setState({ manageWatchlist:store_list_delete, productViewStatus: false, enableDelete:false});			    
			  	this.setState({setDeleteMessage:response.data.message, msgSuccess:true}, ()=>{
					 $('.alert-success, .alert').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');						
				});
				$('.wishlist-row').removeClass('delete-row'); 
			}
        }).catch(function (error) {
            console.log(error);
        });		
		}, 1000);
		
	 setTimeout(() => {
		  $('.alert').hide();
		  this.setState({setDeleteMessage:'', msgSuccess:false});
		 }, 5000);
	}	
	
	socialMediaShare = () => {
	$('.watchlist_wrap .manageSmsForm').removeClass('active');		
	  this.setState(prevState => ({
			socialMedia: !prevState.socialMedia
		  })); 
	if($('.social-media.active').length > 0)	
	 $('.social-media').removeClass('active');
	else
	 $('.social-media').addClass('active');
	}
	
	onCopy = () => { 
		
		this.setState({
			copied: true
			});  
						
			$('.copy-text').html('Copied');
			 setTimeout(() => {
		      $('.copy-text').html('');
		      }, 3000);			      
			$('.social-media').removeClass('active');		
     };
	 
	 loadSmsForm = (shareLink, productID) => {
		this.viewProduct(productID,'sms');
		this.setState({error_response:''});
		setTimeout(() => {
			 $('.watchlist_wrap .manageSmsForm').addClass('active');
		     $('#share_link_wishlist').val(shareLink);
        }, 100);
		setTimeout(() => {
	        $('.watchlist_wrap .product-detail-content').removeClass('active'); 	    
	    }, 200);
		document.removeEventListener('click', this.OutsideClickforDetails, true);
	};
	
   smsCloseWish = () =>{
	   $('.watchlist_wrap .manageSmsForm').removeClass('active');
	   setTimeout(() => {
		     $('.watchlist_wrap .product-detail-content').addClass('active'); 
		     $('.product-lists-uxt .product-detail-content').removeClass('active'); 
	    }, 100);
  }
  
   onHandleChange(event) {
		const name = event.target.getAttribute('name');
	    this.setState({
		  message: { ...this.state.message, [name]: event.target.value }
		});
	}
	
	onSubmit(event) {
    event.preventDefault();
	$('.watchlist_wrap .manageSmsForm').addClass('active');
    this.setState({ submitting: true });
	var getShareLink = '';
	if(document.getElementById("share_link_wishlist")){
	getShareLink = document.getElementById("share_link_wishlist").value;
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
				       $('#to_w').val('');
				       $('#body_w').val('');
				       $('#share_link_wishlist').val('');
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
  
        
    
    showProductDetails(updatedTotalRes='', added_on = '', masterID = '', keyword = '') {
		var currentView = this;		
		var buy_link = this.state.productDetails.direct_url;	
		var storeUPC = (this.state.productDetails.upc?this.state.productDetails.upc:this.state.productDetails.sku);
		var searchKey = (keyword !=''?keyword:this.state.productDetails.merchant);
		searchKey = searchKey.replace(/ /g,'-');
		var user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		var newPriceAvailable = (typeof updatedTotalRes.price != 'undefined' && updatedTotalRes.price !=''?updatedTotalRes.price/100:0);
		var actualPrice = (typeof this.state.productDetails.price != 'undefined' && this.state.productDetails.price !=''?this.state.productDetails.price/100:0);
		newPriceAvailable = (newPriceAvailable > 0?newPriceAvailable.toFixed(2):newPriceAvailable);
		actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
		
		var aff_link = this.state.productDetails.url;
			if(this.state.productDetails.source_id == 3){
				buy_link = aff_link.replace("@@@", "5503414");
			}
			/*else if(this.state.productDetails.source_id == 6){
				buy_link = aff_link.replace("@@@", "2567784");
			}*/
			else if(this.state.productDetails.source_id == 335){
				buy_link = aff_link.replace("@@@", "2605681");
			}
			/*else if(this.state.productDetails.source_id == 600){
				buy_link = aff_link.replace("@@@", "1231303");
			}*/
			
		var share_link = (window.location.href).replace( "/#/", "" ).split("?")[0]+'?keyword='+searchKey+'&id='+this.state.productDetails._id+'&type='+encodeURIComponent(this.state.productDetails.merchant);
		 
		return(			 			   
			   <div className="product-dtls-grid">	
				<div className="dtls-lf">
				   <div className="product_img"><img src={(typeof this.state.productDetails.image!=='undefined' && this.state.productDetails.image!=='' && this.state.productDetails.image!==null)?this.state.productDetails.image:'assets/images/no-image.png'} alt="" /></div>					
				</div>
				  <div className="dtls-rgt">				
					<div className="share-link">						
							
							<CopyToClipboard onCopy={this.onCopy} text={share_link}>
							 <span><a className="sl-icon link"></a></span>
							</CopyToClipboard>
							<a href="javascript://" className="sl-icon share" onClick = {this.socialMediaShare.bind(this)}></a>	
						<span className="copy-text"></span>
					</div>
					<div className="social-media">					
						<FacebookShareButton url={share_link}><FacebookIcon size={32} round={true} /></FacebookShareButton>	
						<LinkedinShareButton url={share_link}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
						<TwitterShareButton url={share_link}><TwitterIcon size={32} round={true} /></TwitterShareButton>
						<WhatsappShareButton url={share_link}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
						<EmailShareButton url={share_link}><EmailIcon size={32} round={true} /></EmailShareButton>
						<LineShareButton url={share_link}><LineIcon size={32} round={true} /></LineShareButton>
						<Link to="#" className="sms-share" onClick={this.loadSmsForm.bind(this,share_link,masterID)}>SMS</Link>
					</div>					
					<div className="dtls-btm">
					<h4 className="amazon">{this.state.productDetails.merchant}</h4>		
						<div className="dtls-txt">					   
							<p className="item-model">
							{(this.state.productDetails.brand !== undefined)?<><span>Brand :{this.state.productDetails.brand}</span><br></br></>:''}
							{(storeUPC !== undefined && storeUPC !== '')?<><span>UPC :{storeUPC}</span><br></br></>:''}
							{(this.state.productDetails.shippingweight !== undefined && this.state.productDetails.shippingweight !== '')?<><span>Weight :{this.state.productDetails.shippingweight}</span><br></br></>:''}
						    {(added_on !='')?<span>Added On: {added_on}</span>:''}
						    </p>
							<h4 className="item-name">{this.state.productDetails.name}</h4>
						</div>
					</div>									
					
					{user != null && user.package_plan != undefined && user.package_plan == 'free'?<h3 className="price">${actualPrice>0?actualPrice:0}</h3>:(newPriceAvailable == 0 || newPriceAvailable == actualPrice?<h3 className="price">${actualPrice>0?actualPrice:0}</h3>:(newPriceAvailable > 0 && newPriceAvailable > actualPrice?<h3 className="price"><strike>${actualPrice>0?actualPrice:0}</strike><span className="price-plus"> ${newPriceAvailable}</span></h3>:(newPriceAvailable > 0 && newPriceAvailable < actualPrice)?<h3 className="price"><strike>${actualPrice>0?actualPrice:0}</strike><span className="price-minus"> ${newPriceAvailable}</span></h3>:''))}			
													
					<div className="dtls-btn">
						<a className="btn btn-buy" href={buy_link} target="_blank">Buy</a>		
					</div>
				</div>				
			</div>
	 	);
   }	   

   showProductDetailsSms(updatedTotalRes='') {
	    var currentView = this;		
		var user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		var newPriceAvailable = (typeof updatedTotalRes.price != 'undefined' && updatedTotalRes.price !=''?updatedTotalRes.price/100:0);
		var actualPrice = (typeof this.state.productDetails.price != 'undefined' && this.state.productDetails.price !=''?this.state.productDetails.price/100:0);
		newPriceAvailable = (newPriceAvailable > 0?newPriceAvailable.toFixed(2):newPriceAvailable);
		actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
				 
		return(			 			   
			   <div className="product-dtls-sms">	
				<div className="dtls-lf-sms">
				   <div className="product_img"><img src={(typeof this.state.productDetails.image!=='undefined' && this.state.productDetails.image!=='' && this.state.productDetails.image!==null)?this.state.productDetails.image:'assets/images/no-image.png'} alt="" /></div>					
				</div>
				<div className="dtls-rgt-sms">
					<h4 className="amazon">{this.state.productDetails.merchant}</h4>		
						<div className="dtls-txt">					   
							<h4 className="item-name">{this.state.productDetails.name}</h4>
						</div>													
						{user != null && user.package_plan != undefined && user.package_plan == 'free'?<h3 className="price">${actualPrice>0?actualPrice:0}</h3>:(newPriceAvailable == 0 || newPriceAvailable == actualPrice?<h3 className="price">${actualPrice>0?actualPrice:0}</h3>:(newPriceAvailable > 0 && newPriceAvailable > actualPrice?<h3 className="price"><strike>${actualPrice>0?actualPrice:0}</strike><span className="price-plus"> ${newPriceAvailable}</span></h3>:(newPriceAvailable > 0 && newPriceAvailable < actualPrice)?<h3 className="price"><strike>${actualPrice>0?actualPrice:0}</strike><span className="price-minus"> ${newPriceAvailable}</span></h3>:''))}					
					</div>	
				</div>
	 	);
   }	   
    	 
    loadProduct(masterID, viewType = '') {
		if(viewType == 'sms'){
			this.setState({loadAjaxStatus : false});		
		}
		else{
			this.setState({loadAjaxStatus : true},()=>{ $('.load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');});	
		}
		
		this.props.changeStatus(true,'Detail')
	 	axios.post(APIURL+'products/productWatchlistDetails', qs.stringify({masterID:masterID })).then(response => {
			if(response.data.status === "ok"){
				var result = response.data.result; 			
				this.setState({productDetails:JSON.parse(result.product_details), loadAjaxStatus : false, productViewStatus:true});
				var updated_priceList = (result.updated_product_details !=''?JSON.parse(result.updated_product_details):'');
				var searchKey = (result.keyword != ''?result.keyword:this.state.productDetails.merchant);
				searchKey = searchKey.replace(/ /g,'-');
				var share_link = '?keyword='+searchKey+'&id='+this.state.productDetails._id+'&type='+encodeURIComponent(this.state.productDetails.merchant);
				window.history.replaceState(null, null, share_link)
				this.setState({showProductDetails:this.showProductDetails(updated_priceList,result.added_on,masterID,result.keyword), showProductDetailsSms: this.showProductDetailsSms(updated_priceList)}, () => {
					 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .delete-select-remove, .load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
		
					 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				
			  });				
				
	 		}
			else if(response.data.status === "error"){				
				this.setState({loadAjaxStatus : false, productDetails:'', showProductDetails:''});
	 		}
        }).catch(function (error) {
            console.log(error);
        });
	}
	
	productDetailsScroll =() =>{	
		$(".watchlist_list .acc-scroll-wrap > div").animate({ scrollTop: 0 }, 600);	
		return false;	
	}
	
	viewProduct = (masterID, viewType='') => {
		$('.watchlist_wrap .manageSmsForm').removeClass('active');
		this.setState({
				  message: {
				  to: '',
				  body: ''
				 },
				  error_response: ''
			    });
		$('.watchlist_wrap .product-detail-content').removeClass('active'); 
		this.setState({viewProductscroll:true}, () => { this.loadProduct(masterID, viewType);	});
		setTimeout(() => {
          $('.watchlist_wrap .product-detail-content').addClass('active');
         }, 100); 	
		document.addEventListener('click', this.OutsideClickforDetails, true);
		this.productDetailsScroll();
    } 
	
	 
	OutsideClickforDetails(e) {		
	
	  // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
       return;
      }
	  else{		
	  	var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
			this.props.changeStatus(false,'Tracking');
		$('.watchlist_wrap .product-detail-content').removeClass('active'); 
		$('.watchlist_wrap .manageSmsForm').removeClass('active');
	  } 	
		
    }
     
   loadWlists = (user_id) => {	
   $('.watchlist_list .confirm-action').removeClass('show');
  	   if(user_id != undefined){	
	   	this.setState({loadAjaxStatus : true},()=>{ $('.load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');});
		axios.post(APIURL+'products/watchListDetails', qs.stringify({user_id:user_id})).then(response => {
			if(response.data.status === "ok"){		
			    this.setState({watchList:response.data.result, count:response.data.count, setMessage:'', loadWatchListDisplay:'', loadAjaxStatus : false});
			    localStorage.setItem('wishlistLoad', response.data.result);				    			
     			localStorage.removeItem('wishlistCount');     				
     			localStorage.setItem('wishlistCount', this.state.count);
     			$('.h-favourite').html(response.data.count);
				this.setState({loadWatchListDisplay:this.loadWatchList(response.data.result)}, () => {
					 $('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .manageSmsForm, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a, .delete-select-remove, .load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
		
					 $('.search-option li a, .uxt-menu-list li,.comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
				
			  });
			setTimeout(function(){ 		
				$('.wishlist-row').removeClass('delete-row'); }, 100);				
			}
			else{
			 setTimeout(function(){ 
			  $('.wishlist-row').removeClass('delete-row');
			 }, 100);
			 this.setState({setMessage:response.data.message, count:response.data.count, loadWatchListDisplay:false});
			 localStorage.removeItem('wishlistLoad');     				
			 localStorage.removeItem('wishlistCount');     				
     		 localStorage.setItem('wishlistCount', this.state.count);
     		 $('.h-favourite').html(this.state.count);
     		}
		 }).catch(function (error) {
			console.log(error);				
		 });     
	 }  	
	}	

	loadWatchList(watchList) {
	 	var current = this;		
		var user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		const listItems =  Object.keys(watchList).map(function(index){
			var currentProduct = current.state.watchList[index]['main'];
			var masterID = current.state.watchList[index]['master_id'];			
			var updatedProduct = current.state.watchList[index]['new'];
			var newPriceAvailable = (typeof updatedProduct !='undefined' && typeof updatedProduct !='' && typeof updatedProduct.price !='undefined' && updatedProduct.price !=''?updatedProduct.price/100:0);
			var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !=''?currentProduct.price/100:0);
			newPriceAvailable = (newPriceAvailable > 0?newPriceAvailable.toFixed(2):newPriceAvailable);
		    actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
			var setUniqKi = 'wishlist'+index;			
			var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
			 if(currentProduct.name!=null) {			 
		 		return (	
		 		  	 <div key={setUniqKi} className="comparison-list-row wishlist-row" id={'grid_'+masterID}>	  
  					 <div className="product-img-top"> 	 			
						 <div className="company-name forbig">
						  <p><Link to='#' onClick={current.viewProduct.bind(current,masterID)}>{currentProduct.merchant}</Link></p>
						 </div>
						 <div className="pdt-img">
						  <Link to='#' onClick={current.viewProduct.bind(current,masterID)}><img src={(typeof currentProduct.image!=='undefined' && currentProduct.image!=='')?currentProduct.image:'assets/images/no-image.png'} alt="" />
						  </Link>
						 </div>	
					</div>	 
					<div className="product-dtls-bottom">	 
						 <div className="company-name formobi">
						  <p><Link to='#' onClick={current.viewProduct.bind(current,masterID)}>{currentProduct.merchant}</Link></p>
						  <p className="item-model">
							{(currentProduct.brand !== undefined)?<><span>Brand :{currentProduct.brand}</span><br></br></>:''}
							{(storeUPC !== undefined && storeUPC !== '')?<><span>UPC :{storeUPC}</span><br></br></>:''}
							{(currentProduct.shippingweight !== undefined && currentProduct.shippingweight !== '')?<span>Weight :{currentProduct.shippingweight}</span>:''}
						    </p>
						 </div>
						 
						 <div className="pdt-desc">
						  <p><Link to='#' onClick={current.viewProduct.bind(current,masterID)}>{currentProduct.name}</Link></p>
						 </div>   
						 <div className="pdt-price">
							  <div className="btn-grp">
								 {user != null && user.package_plan != undefined && user.package_plan == 'free'?<p className="price" onClick={current.viewProduct.bind(current,masterID)}>${actualPrice}</p>:(newPriceAvailable == 0 || newPriceAvailable==actualPrice?<p className="price" onClick={current.viewProduct.bind(current,masterID)}>${actualPrice}</p>:((newPriceAvailable > 0 && newPriceAvailable > actualPrice) ? <p className="price" onClick={current.viewProduct.bind(current,masterID)}><strike>${actualPrice}</strike><span className="price-plus"> ${newPriceAvailable}</span></p>:((newPriceAvailable > 0 && newPriceAvailable < actualPrice)?<p className="price" onClick={current.viewProduct.bind(current,masterID)}><strike>${actualPrice}</strike><span className="price-minus"> ${newPriceAvailable}</span></p>:'')))}
								 							  
							  <i className="view-nxt-arrow"></i>						  
							  </div>
							  <Link className="close-icon" to='#' onClick={current.deleteItemSelected.bind(current,masterID)}>X</Link>
								{/*<Link className="close-icon" to='#' onClick={current.deleteProductPrompt.bind(current,masterID,user.user_id,index)}>X</Link>*/	}
						 </div>	
					</div>			
				 </div>

				
		 		);
		 	}
	 	});
	 	return listItems;
	 }
	
	noResultFound(){
		 return (
			<div className="notify">Please login to view your Track.</div>
			);			
	}
	
	manageProdView(){	  
      this.props.changeStatus(false,'Home');	
	  setTimeout(() => {
	  $('.uxt-side-menu').removeClass('active');		  
	  $('.watchlist_wrap, .watchlist_wrap .product-detail-content').removeClass('active');
	  $('.product-lists-uxt .comparison-list').addClass('active');
	 }, 100);	  
	 
	}
	
	removeSelection(){
		this.setState({enableDelete:false});
		$('.wishlist-row').removeClass('selected');
	}
	
   gridView = () => {	
	   $('.product-list-view').removeClass('row-active'); 
	   $('.product-list-view').addClass('grid-active');
	   $('.wish_list').removeClass('row-view-active');
	   $('.wish_list').addClass('grid-view-active');
	   
   }
   rowView = () => {
	   $('.product-list-view').removeClass('grid-active');
	   $('.product-list-view').addClass('row-active');
	   $('.wish_list').removeClass('grid-view-active');
	   $('.wish_list').addClass('row-view-active');
   }

   componentDidMount() {		
	
	$(".close-icon").click(function(){
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
	$('.watchlist_wrap .product-detail-content').removeClass('active');
	});
  }
 
   	sortWishlistProducts = (sort_type) => {
	   	this.setState({loadAjaxStatus : true},()=>{ $('.load-text').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');});
		  var search_results = this.state.watchList;
		  if(sort_type === 'asc'){
			   search_results.sort(function(a, b){ 
			   return a.main.price - b.main.price });  
		  }
		  else if(sort_type === 'desc') {
			 search_results.sort(function(a, b){ return b.main.price - a.main.price });
		  }
			 		  
			   var set_sort = (sort_type == 'asc'?'desc':'asc'); 
			   this.setState({sort:set_sort, watchList:search_results, loadAjaxStatus : false, loadWatchListDisplay:this.loadWatchList(search_results)});  	
       }
	   
	   getListTwoColumn = () => {		
		this.props.ListTwoColumn();
	}
	
    render() {
		let { count } = this.state;		
		var newthis = this;				
		let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):''); 
		
		if(user != null && user.user_id != undefined){
		 var manageDisplay = this.state.loadWatchListDisplay;
		}
		else{
		 var manageDisplay = this.state.manageWatchlist;
		}	
		
		 if(this.state.msgSuccess===true && this.state.setDeleteMessage)
		 {
			 setTimeout(function(){ $('.wishlist-row').removeClass('delete-row');
				}, 500);
		 }
		 else if(this.state.setMessage){
			 setTimeout(function(){ $('.wishlist-row').removeClass('delete-row');
			  }, 500);
		 }
		
		var viewProductDetails = this.state.showProductDetails;
		var viewProductDetailsSms = this.state.showProductDetailsSms;
		
		
	 var product_id = this.state.deleteProdID;
	 var key = this.state.deleteKey;
     var user_id = this.state.deleteUserID;
		return (
		<>	
			
		{((this.state.productViewStatus === true && this.state.loadAjaxStatus===true) || (this.state.loadAjaxStatus===true && this.props.wishlistactive===false))?
		<div className="uxt-loading dynamic-loader wl-loader">
		<div className="loading-inner"><span className="load-text">{this.props.loaderText}</span>{(this.props.loaderImage !== '')? <img src={this.props.loaderImage} alt=""/> : ''}		
		</div>
		</div>:''}
		
        <div className={(this.props.showWatchlist===true)?'watchlist_wrap active':'watchlist_wrap'}>		
			
			<div className={((this.state.productViewStatus===true && this.props.showWatchlist===true)?'product-detail-content active':'product-detail-content')+(this.props.topToBottom == true?' top-view':' right-view')} ref={node => { this.node = node; }}>
			<Scrollbars className="acc-scroll-wrap">
				<div className="product-detail-inner">
				<Link className="close-icon" to='#'>X</Link>
				{this.state.productViewStatus === true?<div className="product-detail-panel results_panel">{viewProductDetails?viewProductDetails:'No product found'}</div>:''}				         				        
				</div>
			</Scrollbars>
			</div>	
			
			<div className={"manageSmsForm "+(this.props.topToBottom ===true ? "top-view" : "right-view")}>
				<a className="close-icon" href="javascript://" onClick = {this.smsCloseWish.bind(this)}>X</a>
				<div className="manageSmsForm-inner">
				<div className="product-sendSms">{viewProductDetailsSms}</div>
				<div className="product-smsform">
				<h4 className="title">Send a text message of this find</h4>
				  <form onSubmit={this.onSubmit.bind(this)} className={this.state.error ? 'error sms-form' : 'sms-form'}>
					<div className="form-group">
					  <input
						id="to_w"
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
						id="body_w"
						name="body"
						className="form-control"
						placeholder='Message'
						defaultValue={this.state.message.body !=''?this.state.message.body:''}
						onChange={this.onHandleChange.bind(this)}
					  />
					 <input
						type="hidden"
						name="share_link_wishlist"
						className="form-control"
						id={"share_link_wishlist"}
					  />								  
					</div>
					<button className="btn" type="submit" disabled={this.state.submitting}>Send</button>
				   </form>	
				   {this.state.error_response != ''?<p className="error_sms">{this.state.error_response}</p>:''}
				   </div>
			</div>		
			</div>			
			
			<div className="confirm-action">
				<p>Are you sure you want to delete the Tracked items?</p>
				<a href="javascript://" className="btn" onClick={this.deleteProduct.bind(this,'yes',user_id)}>Yes</a>
				<a href="javascript://" className="btn" onClick={this.deleteProduct.bind(this,'no',user_id)}>No</a>
			</div>
		
			<div className={(this.props.wishlistactive===true || this.props.showWatchlist===true)?'watchlist_list active':'watchlist_list'}>						
	
			<Scrollbars className="acc-scroll-wrap" onScroll={this.scrollToSection.bind(this)}> 			 
			
			<div className="results-list">
							
			{(this.state.setDeleteMessage)? <p className={((this.state.msgSuccess===true && this.state.setDeleteMessage)?'alert alert-success':(this.state.msgSuccess===false && this.state.setMessage)?'alert alert-error':'')}>{this.state.setDeleteMessage}</p>:'' }

			{user != null && user.package_plan != undefined && user.package_plan == 'free'?<p className='alert-track'>Upgrade to PRO for accessing price drop/up of items saved in Track</p>:''}
		
			<div className='rearrange-result wishlist-rearrange fixedCls'>				
			<div className="result_count">
			<span>Tracking {localStorage.getItem('wishlistCount')} {localStorage.getItem('wishlistCount') == 1?'item':'items'}</span>	
			<div className="product-list-view"> 			 
			<span className={(this.state.sort=='asc')?'sort-icon active':'sort-icon'} onClick={this.sortWishlistProducts.bind(this,this.state.sort)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="23.3" height="23.292" viewBox="0 0 23.3 23.292">
					<g id="Triangle_Copy_2" data-name="Triangle Copy 2" transform="translate(-188.35 -154)">
						<path id="Triangle_Copy_2-2" data-name="Triangle Copy 2" d="M-10.817,5.367a3,3,0,0,0-5.367,0l-8.646,17.292A3,3,0,0,0-22.146,27H-4.854a3,3,0,0,0,2.683-4.342Z" transform="translate(186.5 181) rotate(-180)" fill="#000"/>
						<path id="Triangle_Copy_2-3" data-name="Triangle Copy 2" d="M-10.817,5.367a3,3,0,0,0-5.367,0l-8.646,17.292A3,3,0,0,0-22.146,27H-4.854a3,3,0,0,0,2.683-4.342Z" transform="translate(186.5 181) rotate(-180)" fill="none"/>
					</g>
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
				
				
				{this.state.enableDelete == true?<span className={(this.state.sort=='asc')?'multi-delete-icon active':'multi-delete-icon'} onClick={this.multiDeleteItem.bind(this)}>
			<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <symbol id="t" overflow="visible">
   <path d="m1.9531-0.10938c-0.09375 0.054688-0.19922 0.089844-0.3125 0.10938-0.10547 0.03125-0.21875 0.046875-0.34375 0.046875-0.35547 0-0.63672-0.097656-0.84375-0.29688-0.21094-0.19531-0.3125-0.46875-0.3125-0.8125s0.10156-0.61328 0.3125-0.8125c0.20703-0.19531 0.48828-0.29688 0.84375-0.29688 0.125 0 0.23828 0.015625 0.34375 0.046875 0.11328 0.023438 0.21875 0.058594 0.3125 0.10938v0.45312c-0.09375-0.070312-0.19531-0.125-0.29688-0.15625-0.09375-0.03125-0.19922-0.046875-0.3125-0.046875-0.19922 0-0.35547 0.0625-0.46875 0.1875-0.10547 0.125-0.15625 0.29688-0.15625 0.51562s0.050781 0.39062 0.15625 0.51562c0.11328 0.125 0.26953 0.1875 0.46875 0.1875 0.11328 0 0.21875-0.015625 0.3125-0.046875 0.10156-0.03125 0.20312-0.082031 0.29688-0.15625z"/>
  </symbol>
  <symbol id="a" overflow="visible">
   <path d="m1.4375-1.1562c-0.054688-0.019531-0.10156-0.035156-0.14062-0.046875-0.042969-0.007813-0.085937-0.015625-0.125-0.015625-0.13672 0-0.24219 0.042969-0.3125 0.125-0.074219 0.085938-0.10938 0.20312-0.10938 0.35938v0.73438h-0.5v-1.5938h0.5v0.26562c0.070312-0.11328 0.14844-0.19141 0.23438-0.23438 0.082031-0.050781 0.17969-0.078125 0.29688-0.078125 0.019531 0 0.039062 0.007813 0.0625 0.015625h0.09375z"/>
  </symbol>
  <symbol id="d" overflow="visible">
   <path d="m1.8438-0.79688v0.14062h-1.2031c0.019531 0.11719 0.066406 0.20312 0.14062 0.26562 0.070312 0.0625 0.17578 0.09375 0.3125 0.09375 0.10156 0 0.21094-0.015625 0.32812-0.046875 0.11328-0.03125 0.22656-0.078125 0.34375-0.14062v0.39062c-0.125 0.042969-0.25 0.074219-0.375 0.09375-0.11719 0.03125-0.23047 0.046875-0.34375 0.046875-0.29297 0-0.52344-0.070312-0.6875-0.21875-0.15625-0.15625-0.23438-0.36328-0.23438-0.625 0-0.25781 0.078125-0.46094 0.23438-0.60938 0.15625-0.15625 0.375-0.23438 0.65625-0.23438 0.25 0 0.44531 0.078125 0.59375 0.23438 0.15625 0.14844 0.23438 0.35156 0.23438 0.60938zm-0.53125-0.17188c0-0.10156-0.03125-0.17969-0.09375-0.23438-0.054688-0.0625-0.12109-0.09375-0.20312-0.09375-0.10547 0-0.1875 0.03125-0.25 0.09375-0.0625 0.054687-0.10156 0.13281-0.10938 0.23438z"/>
  </symbol>
  <symbol id="e" overflow="visible">
   <path d="m0.96875-0.71875c-0.11719 0-0.19922 0.023438-0.25 0.0625-0.054688 0.03125-0.078125 0.085938-0.078125 0.15625 0 0.0625 0.019531 0.11719 0.0625 0.15625 0.039063 0.03125 0.10156 0.046875 0.1875 0.046875 0.09375 0 0.17188-0.03125 0.23438-0.09375 0.070312-0.070313 0.10938-0.16016 0.10938-0.26562v-0.0625zm0.76562-0.1875v0.90625h-0.5v-0.23438c-0.074219 0.09375-0.15234 0.16797-0.23438 0.21875-0.085938 0.039062-0.1875 0.0625-0.3125 0.0625-0.16797 0-0.30469-0.046875-0.40625-0.14062-0.10547-0.10156-0.15625-0.23438-0.15625-0.39062 0-0.1875 0.0625-0.32031 0.1875-0.40625 0.13281-0.082031 0.33594-0.125 0.60938-0.125h0.3125v-0.046875c0-0.082031-0.039063-0.14062-0.10938-0.17188-0.0625-0.039063-0.16406-0.0625-0.29688-0.0625-0.10547 0-0.20312 0.011719-0.29688 0.03125-0.09375 0.023437-0.18359 0.054687-0.26562 0.09375v-0.39062c0.10156-0.019531 0.21094-0.035156 0.32812-0.046875 0.11328-0.019531 0.22266-0.03125 0.32812-0.03125 0.28906 0 0.5 0.058594 0.625 0.17188 0.125 0.11719 0.1875 0.30469 0.1875 0.5625z"/>
  </symbol>
  <symbol id="c" overflow="visible">
   <path d="m0.79688-2.0469v0.45312h0.53125v0.35938h-0.53125v0.67188c0 0.085938 0.015625 0.14062 0.046875 0.17188 0.03125 0.023437 0.085938 0.03125 0.17188 0.03125h0.26562v0.35938h-0.4375c-0.19922 0-0.33984-0.039062-0.42188-0.125-0.085937-0.082031-0.125-0.22656-0.125-0.4375v-0.67188h-0.26562v-0.35938h0.26562v-0.45312z"/>
  </symbol>
  <symbol id="m" overflow="visible">
   <path d="m1.3281-1.3594v-0.85938h0.51562v2.2188h-0.51562v-0.23438c-0.0625 0.09375-0.14062 0.16797-0.23438 0.21875-0.085938 0.039062-0.17969 0.0625-0.28125 0.0625-0.19922 0-0.36719-0.078125-0.5-0.23438-0.125-0.15625-0.1875-0.35938-0.1875-0.60938s0.0625-0.45312 0.1875-0.60938c0.13281-0.15625 0.30078-0.23438 0.5-0.23438 0.10156 0 0.19531 0.027344 0.28125 0.078125 0.09375 0.042969 0.17188 0.10938 0.23438 0.20312zm-0.32812 1.0312c0.10156 0 0.17969-0.035156 0.23438-0.10938 0.0625-0.082031 0.09375-0.20312 0.09375-0.35938s-0.03125-0.26953-0.09375-0.34375c-0.054687-0.082031-0.13281-0.125-0.23438-0.125-0.11719 0-0.20312 0.042969-0.26562 0.125-0.054687 0.074219-0.078125 0.1875-0.078125 0.34375s0.023438 0.27734 0.078125 0.35938c0.0625 0.074219 0.14844 0.10938 0.26562 0.10938z"/>
  </symbol>
  <symbol id="l" overflow="visible">
   <path d="m1.0938-0.32812c0.11328 0 0.19531-0.035156 0.25-0.10938 0.0625-0.082031 0.09375-0.20312 0.09375-0.35938s-0.03125-0.26953-0.09375-0.34375c-0.054688-0.082031-0.13672-0.125-0.25-0.125-0.10547 0-0.1875 0.042969-0.25 0.125-0.0625 0.074219-0.09375 0.1875-0.09375 0.34375 0 0.14844 0.03125 0.26172 0.09375 0.34375 0.0625 0.085937 0.14453 0.125 0.25 0.125zm-0.34375-1.0312c0.070312-0.09375 0.14844-0.16016 0.23438-0.20312 0.09375-0.050781 0.19141-0.078125 0.29688-0.078125 0.19531 0 0.35938 0.078125 0.48438 0.23438s0.1875 0.35938 0.1875 0.60938-0.0625 0.45312-0.1875 0.60938-0.28906 0.23438-0.48438 0.23438c-0.10547 0-0.20312-0.023438-0.29688-0.0625-0.085937-0.050781-0.16406-0.125-0.23438-0.21875v0.23438h-0.5v-2.2188h0.5z"/>
  </symbol>
  <symbol id="g" overflow="visible">
   <path d="m0.03125-1.5938h0.51562l0.42188 1.0781 0.375-1.0781h0.51562l-0.67188 1.75c-0.074219 0.17578-0.15625 0.29688-0.25 0.35938-0.085938 0.070313-0.19922 0.10938-0.34375 0.10938h-0.29688v-0.32812h0.15625c0.082031 0 0.14453-0.015625 0.1875-0.046875 0.039063-0.023438 0.070313-0.070312 0.09375-0.14062l0.015625-0.046875z"/>
  </symbol>
  <symbol id="k" overflow="visible">
   <path d="m0.09375-2.125h0.51562l0.375 1.5469 0.35938-1.5469h0.53125l0.35938 1.5469 0.375-1.5469h0.51562l-0.5 2.125h-0.625l-0.39062-1.625-0.375 1.625h-0.64062z"/>
  </symbol>
  <symbol id="f" overflow="visible">
   <path d="m1.8594-0.96875v0.96875h-0.51562v-0.73438c0-0.14453-0.007812-0.24219-0.015625-0.29688-0.011719-0.050781-0.023437-0.085938-0.03125-0.10938-0.023437-0.039063-0.046875-0.066406-0.078125-0.078125-0.03125-0.019531-0.074219-0.03125-0.125-0.03125-0.10547 0-0.1875 0.042969-0.25 0.125-0.0625 0.085938-0.09375 0.19922-0.09375 0.34375v0.78125h-0.5v-2.2188h0.5v0.85938c0.082031-0.09375 0.16406-0.16016 0.25-0.20312 0.082031-0.050781 0.17578-0.078125 0.28125-0.078125 0.1875 0 0.32812 0.058594 0.42188 0.17188 0.10156 0.11719 0.15625 0.28125 0.15625 0.5z"/>
  </symbol>
  <symbol id="j" overflow="visible">
   <path d="m0.23438-0.625v-0.96875h0.5v0.15625 0.32812 0.26562c0 0.125 0.003906 0.21875 0.015625 0.28125 0.007812 0.054688 0.019531 0.089844 0.03125 0.10938 0.019531 0.03125 0.046875 0.058594 0.078125 0.078125 0.039063 0.023438 0.082031 0.03125 0.125 0.03125 0.10156 0 0.1875-0.039062 0.25-0.125 0.0625-0.082031 0.09375-0.19531 0.09375-0.34375v-0.78125h0.5v1.5938h-0.5v-0.23438c-0.085937 0.09375-0.16797 0.16797-0.25 0.21875-0.085937 0.039062-0.17969 0.0625-0.28125 0.0625-0.1875 0-0.32812-0.054688-0.42188-0.17188-0.09375-0.11328-0.14062-0.28125-0.14062-0.5z"/>
  </symbol>
  <symbol id="i" overflow="visible">
   <path d="m0.26562-2.125h0.92188c0.26953 0 0.47266 0.0625 0.60938 0.1875 0.14453 0.11719 0.21875 0.28125 0.21875 0.5 0 0.23047-0.074219 0.40625-0.21875 0.53125-0.13672 0.11719-0.33984 0.17188-0.60938 0.17188h-0.375v0.73438h-0.54688zm0.54688 0.39062v0.59375h0.3125c0.10156 0 0.17969-0.023437 0.23438-0.078125 0.0625-0.050781 0.09375-0.125 0.09375-0.21875s-0.03125-0.16406-0.09375-0.21875c-0.054687-0.050781-0.13281-0.078125-0.23438-0.078125z"/>
  </symbol>
  <symbol id="s" overflow="visible">
   <path d="m0.25-1.5938h0.5v1.5938h-0.5zm0-0.625h0.5v0.42188h-0.5z"/>
  </symbol>
  <symbol id="h" overflow="visible">
   <path d="m1.8594-0.96875v0.96875h-0.51562v-0.75c0-0.13281-0.007812-0.22656-0.015625-0.28125-0.011719-0.050781-0.023437-0.085938-0.03125-0.10938-0.023437-0.039063-0.046875-0.066406-0.078125-0.078125-0.03125-0.019531-0.074219-0.03125-0.125-0.03125-0.10547 0-0.1875 0.042969-0.25 0.125-0.0625 0.085938-0.09375 0.19922-0.09375 0.34375v0.78125h-0.5v-1.5938h0.5v0.23438c0.082031-0.09375 0.16406-0.16016 0.25-0.20312 0.082031-0.050781 0.17578-0.078125 0.28125-0.078125 0.1875 0 0.32812 0.058594 0.42188 0.17188 0.10156 0.11719 0.15625 0.28125 0.15625 0.5z"/>
  </symbol>
  <symbol id="b" overflow="visible">
   <path d="m1-1.2656c-0.10547 0-0.1875 0.042969-0.25 0.125-0.0625 0.074219-0.09375 0.1875-0.09375 0.34375s0.03125 0.27734 0.09375 0.35938c0.0625 0.074219 0.14453 0.10938 0.25 0.10938 0.11328 0 0.19531-0.035156 0.25-0.10938 0.0625-0.082031 0.09375-0.20312 0.09375-0.35938s-0.03125-0.26953-0.09375-0.34375c-0.054688-0.082031-0.13672-0.125-0.25-0.125zm0-0.375c0.28125 0 0.49219 0.078125 0.64062 0.23438 0.15625 0.14844 0.23438 0.35156 0.23438 0.60938 0 0.26172-0.078125 0.46875-0.23438 0.625-0.14844 0.14844-0.35938 0.21875-0.64062 0.21875-0.27344 0-0.48438-0.070312-0.64062-0.21875-0.15625-0.15625-0.23438-0.36328-0.23438-0.625 0-0.25781 0.078125-0.46094 0.23438-0.60938 0.15625-0.15625 0.36719-0.23438 0.64062-0.23438z"/>
  </symbol>
  <symbol id="r" overflow="visible">
   <path d="m1.2969-2.2188v0.32812h-0.28125c-0.074219 0-0.125 0.015625-0.15625 0.046875-0.023437 0.023438-0.03125 0.070312-0.03125 0.14062v0.10938h0.42188v0.35938h-0.42188v1.2344h-0.51562v-1.2344h-0.25v-0.35938h0.25v-0.10938c0-0.17578 0.046875-0.30469 0.14062-0.39062 0.09375-0.082031 0.24219-0.125 0.45312-0.125z"/>
  </symbol>
  <symbol id="q" overflow="visible">
   <path d="m1.7188-1.3281c0.070312-0.10156 0.14844-0.17969 0.23438-0.23438 0.09375-0.050781 0.19141-0.078125 0.29688-0.078125 0.1875 0 0.32812 0.058594 0.42188 0.17188 0.09375 0.11719 0.14062 0.28125 0.14062 0.5v0.96875h-0.51562v-0.82812-0.046875-0.046875c0-0.11328-0.015625-0.19531-0.046875-0.25-0.03125-0.050781-0.085938-0.078125-0.15625-0.078125-0.09375 0-0.17188 0.042969-0.23438 0.125-0.054687 0.074219-0.078125 0.1875-0.078125 0.34375v0.78125h-0.51562v-0.82812c0-0.17578-0.015625-0.28906-0.046875-0.34375-0.023438-0.050781-0.074219-0.078125-0.15625-0.078125-0.09375 0-0.17188 0.042969-0.23438 0.125-0.054687 0.074219-0.078125 0.1875-0.078125 0.34375v0.78125h-0.5v-1.5938h0.5v0.23438c0.0625-0.09375 0.13281-0.16016 0.21875-0.20312 0.082031-0.050781 0.17188-0.078125 0.26562-0.078125 0.11328 0 0.21094 0.027344 0.29688 0.078125 0.082031 0.054688 0.14453 0.13281 0.1875 0.23438z"/>
  </symbol>
  <symbol id="p" overflow="visible">
   <path d="m0.26562-2.125h0.60938l0.78125 1.4531v-1.4531h0.51562v2.125h-0.60938l-0.78125-1.4688v1.4688h-0.51562z"/>
  </symbol>
  <symbol id="o" overflow="visible">
   <path d="m0.25-1.5938h0.5v1.5625c0 0.21875-0.054688 0.37891-0.15625 0.48438-0.09375 0.11328-0.24219 0.17188-0.4375 0.17188h-0.25v-0.32812h0.078125c0.10156 0 0.17188-0.023437 0.20312-0.0625 0.039062-0.042969 0.0625-0.13281 0.0625-0.26562zm0-0.625h0.5v0.42188h-0.5z"/>
  </symbol>
  <symbol id="n" overflow="visible">
   <path d="m1.5312-1.5469v0.42188c-0.0625-0.050781-0.13281-0.085938-0.20312-0.10938-0.074219-0.019531-0.14844-0.03125-0.21875-0.03125-0.14844 0-0.26172 0.042969-0.34375 0.125-0.074219 0.085937-0.10938 0.19922-0.10938 0.34375 0 0.14844 0.035156 0.26172 0.10938 0.34375 0.082031 0.085937 0.19531 0.125 0.34375 0.125 0.082031 0 0.15625-0.007813 0.21875-0.03125 0.070313-0.019531 0.14062-0.054687 0.20312-0.10938v0.42188c-0.074219 0.03125-0.15234 0.050781-0.23438 0.0625-0.085937 0.019531-0.16797 0.03125-0.25 0.03125-0.29297 0-0.52344-0.070312-0.6875-0.21875-0.15625-0.15625-0.23438-0.36328-0.23438-0.625 0-0.25781 0.078125-0.46094 0.23438-0.60938 0.16406-0.15625 0.39453-0.23438 0.6875-0.23438 0.082031 0 0.16406 0.011719 0.25 0.03125 0.082031 0.011719 0.16016 0.03125 0.23438 0.0625z"/>
  </symbol>
 </defs>
 <g>
  <path d="m245 408.33c0 12.832 10.5 23.332 23.332 23.332h163.33c12.832 0 23.332-10.5 23.332-23.332l0.003906-233.32h-210z"/>
  <path d="m463.16 140.01h-66.488v-11.676h-93.336v11.676h-66.516c-1.9141 0-3.4805 1.5664-3.4805 3.4805l-0.003907 16.344c0 1.9336 1.5664 3.5078 3.4805 3.5078h226.34c1.9414 0 3.5078-1.5781 3.5078-3.5078v-16.344c0.003907-1.9102-1.5664-3.4805-3.5078-3.4805z"/>

 </g>
</svg>
				</span>:''}	
				</div>	
				</div>
				{this.state.enableDelete == true?<a className="delete-select-remove" href='javascript://' onClick = {this.removeSelection.bind(this)}>Clear</a>:''}
				</div>		
				<div className="product_list wish_list grid-view-active">	
					{manageDisplay}
					<div className="no-list">{this.state.setMessage}</div>
				</div>	
			</div>
			<div className="product-list-back">
				<a className="" href='javascript://' onClick = {this.manageProdView.bind(this)}></a>
			</div>			  
			</Scrollbars>	
		</div>			
	</div>
	</>
    );
  }
}
export default Watchlist;