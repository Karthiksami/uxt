import React, { Component } from "react";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import $ from 'jquery';
import queryString from 'query-string';
import { Scrollbars } from 'react-custom-scrollbars';

class BuyButton extends Component {
    constructor(props) {
      super(props);
	  this.state = {		  
		top: (parseInt(this.props.topPosition) > 0 ? this.props.topPosition+'%':'40px'),
		left: (parseInt(this.props.leftPosition) > 0? this.props.leftPosition+'%':'40px'),
		right: (parseInt(this.props.rightPosition) > 0 ? this.props.rightPosition+'%':'auto'),
		bottom: (parseInt(this.props.bottomPosition) > 0 ? this.props.bottomPosition+'%':'auto'),
		passSearchVal:null,
       }
	}	
	
	componentDidMount() {  	
	 var parsed = queryString.parse(location.search);
	 if(parsed.keyword != undefined){
		 localStorage.removeItem('setkeyword');
		 localStorage.removeItem('spell_correction');
		 var setKeyword = parsed.keyword;
		 setKeyword = setKeyword.replace(/-/g,' ');
		 localStorage.setItem('setkeyword',setKeyword);
		 // setTimeout(() => {
			    $('#clickToggle').trigger('click');
				document.getElementById("pluginTxt").value = "";
				$('#pluginTxt').blur();
			// }, 500);
	}	

	if ($("#pluginTxt").length > 0) {
		$('#pluginTxt').focus(function() {
			$(this).parents('.search-box').addClass('focused');
		});
	}	
	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			if ($(".search-box").hasClass("focused")) {
				$('.search-box').removeClass('focused');
				$('#pluginTxt').blur();
			}				
		}
	});
	
	setTimeout(() => {
		$('.menu-toggle, .menu-toggle.logo-lg, .header-row-uxt a, .product_search_box input, .search-option h4, .minmax-filter span,  .minmax-filter label, .company-name p a, .pdt-price .price, .result_count span, .dtls-txt .item-name, h3.price, .amazon, .acs_control_sec h2, .acs_control_sec span, .acs_control_sec p, .accessiblity-wrap h3, .ac_buy_btn, .tag-input, .topfull-close, .close-icon, .package_tabnav li, .open-package .open-login, .profile-edit, .form-group, .form-control, .forgot-pwd, .alert-success, .alert, .alert-track, .notify, .downgrade-action, .pro-title, .clear-selection, .acc-package-desc center b, .custom-select-box, .cus-select-search input, .cus-select-options ul li, .tnk-header h2, .clear-search, .relevance, .btn, .copy-text, .upgrade-remainder p, .no-record, .relevantList h4, .relevantList .relevantList h4, .relevantList p, .sf-title, .minmax-filter, .error_sms, .recent-products-grid p, .recommended-products-grid p, .recent-products-grid p a, .recommended-products-grid p a').attr('style', 'font-family: '+ this.props.mainFontFamily +' !important');			
					
		$('.search-option li a, .recent-products-grid p, .uxt-menu-list li, .comparison-list .pdt-desc p, .comparison-list-row .pdt-desc p, .comparison-list .pdt-desc p a, .comparison-list-row .pdt-desc p a, .item-model, .acc-package-desc, .switch_text, .confirm-action p, .coupon-confirm p, .userListing-wrap p, .userListing-wrap p b, .google-login button, .tnk-header p, .recent-search-list .tag-input, .minmax-filter, .no-list').attr('style', 'font-family: '+ this.props.subFontFamily +' !important');
	}, 500);
	
	}
	handleChangeTxt = (item, event) => {
		this.setState({ [item]:event.target.value });
		localStorage.removeItem('setkeyword');
	}
    	 
	keyPressed(event){
    	if (event.key === "Enter") {
		localStorage.setItem('setkeyword',event.target.value);
		$('#clickToggle').trigger('click');
			document.getElementById("pluginTxt").value = "";
			$('#pluginTxt').blur();
			$('#wrap-srch-02').hide();
			$('.search-box').removeClass('focused');
		}		
	}
		
	handleChangeTxt = (item, event) => {
		this.setState({ [item]:event.target.value });
		localStorage.removeItem('setkeyword');
	}	   
	   
	clearSearch = () => {			
		$('.search-box').removeClass('focused');
	}
	    
    render() { 
	   
       let user = (localStorage.getItem('userDetails') != 'undefined'?JSON.parse(localStorage.getItem('userDetails')):'');
	   var buyThis = this;
	   
	   var listRecentSearches = {};
       var recentSearchResults = {};
	   if((localStorage.getItem('storeCommunitySearches') != undefined && localStorage.getItem('storeCommunitySearches') != null) || (localStorage.getItem('storeRecentSearches') != undefined && localStorage.getItem('storeRecentSearches') != null) || (this.props.storeCommunitySearches != undefined && this.props.storeCommunitySearches != null && this.props.storeCommunitySearches !='') || (this.props.storeRecentSearches != undefined && this.props.storeRecentSearches != null && this.props.storeRecentSearches !='')){
         
        if(user == null){
			recentSearchResults =  (localStorage.getItem('storeCommunitySearches')?JSON.parse(localStorage.getItem('storeCommunitySearches')):JSON.parse(this.props.storeCommunitySearches));
		}
		else{
			recentSearchResults =  (localStorage.getItem('storeRecentSearches')?JSON.parse(localStorage.getItem('storeRecentSearches')):JSON.parse(this.props.storeRecentSearches));
		}
         
		 if(recentSearchResults != null && recentSearchResults != undefined && recentSearchResults != ''){
	   	 listRecentSearches = Object.keys(recentSearchResults).slice(0,20).map((el, index) => {	
		 var searchKey = recentSearchResults[el].keyword;
		     searchKey = searchKey.replace(/\\/g,'');		 
			 var searchKeyImg = recentSearchResults[el].image;	
		 var setClassName='';
		 var setUniqueIndex = 'recent'+index;
				 
		return (
			<div className="recent-products-grid" key={setUniqueIndex}>
				<div className="recent-lf">
					<div className="product_img">
						<a className={setClassName} href="javascript://" onClick={this.props.getSelectedKeyword.bind(this,searchKey,'handle')}><img src={searchKeyImg} alt="" /></a>
					</div>
				</div>
				<div className="recent-rgt">
					<p className="item-name"><a className={setClassName} href="javascript://" onClick={this.props.getSelectedKeyword.bind(this,searchKey,'handle')}>{searchKey.toUpperCase()}</a></p>
				</div>
			</div>			
					
		);	
		});	
	   }		
	  }
	  
	  var recommendList  = (localStorage.getItem('recommended')?JSON.parse(localStorage.getItem('recommended')):JSON.parse(this.props.recommended));
		var listRecommendedItems = '';
		if(recommendList != null && recommendList != undefined){
		 listRecommendedItems =  Object.keys(recommendList).map(function(index){
			var currentProduct = recommendList[index]['main'];
			var masterID = recommendList[index]['recommend_id'];			
			var updatedProduct = recommendList[index]['new'];
			var recommended_user = recommendList[index]['user_id'];
			var recommended_keyword = recommendList[index]['keyword'];
			var newPriceAvailable = (typeof updatedProduct !='undefined' && typeof updatedProduct !='' && typeof updatedProduct.price !='undefined' && updatedProduct.price !='' && updatedProduct.price > 0?updatedProduct.price/100:0);
			var actualPrice = (typeof currentProduct.price != 'undefined' && currentProduct.price !='' && currentProduct.price > 0?currentProduct.price/100:0);
			newPriceAvailable = (newPriceAvailable > 0?newPriceAvailable.toFixed(2):newPriceAvailable);
		    actualPrice = (actualPrice >0?actualPrice.toFixed(2):actualPrice);
						
		    var searchKey = (recommended_keyword !=undefined?recommended_keyword:currentProduct.merchant);
		    searchKey = searchKey.replace(/ /g,'-'); 
			
			var productName = currentProduct.name;
			productName = productName.replace(/\\/g,"");
			
			//var share_product_link = (window.location.href).replace( "/#/", "" ).split("?")[0]+'?keyword='+searchKey+'&id='+currentProduct._id+'&type='+currentProduct.merchant;
			var storeUPC = (currentProduct.upc?currentProduct.upc:currentProduct.sku);
			var setNewIndex = 'recommend'+index;
			 if(currentProduct.name!=null) {			 
		 		return (
                     <div key={setNewIndex} className="recommended-products-grid">
						<div className="recommended-lf">
							<div className="product_img">
								<Link to="#" onClick={buyThis.props.loadUserLikes.bind(buyThis,currentProduct._id,searchKey,currentProduct.merchant,'handle')}><img src={(typeof currentProduct.image!=='undefined' && currentProduct.image!=='')?currentProduct.image:'assets/images/no-image.png'} alt="" /></Link>
							</div>
						</div>
						<div className="recommended-rgt">
							<p className="item-name"><Link to="#" onClick={buyThis.props.loadUserLikes.bind(buyThis,currentProduct._id,searchKey,currentProduct.merchant,'handle')}>{productName.toUpperCase()}</Link></p>
							{user != null && user.package_plan != undefined && user.package_plan == 'free'?<p className="price">${actualPrice}</p>:(newPriceAvailable == 0 || newPriceAvailable==actualPrice?<p className="price">${actualPrice}</p>:((newPriceAvailable > 0 && newPriceAvailable > actualPrice) ? <p className="price" ><strike>${actualPrice}</strike><span className="price-plus"> ${newPriceAvailable}</span></p>:((newPriceAvailable > 0 && newPriceAvailable < actualPrice)?<p className="price"><strike>${actualPrice}</strike><span className="price-minus"> ${newPriceAvailable}</span></p>:'')))}
						</div>
					</div>			
		 		);
		 	}
	 	});
		}
   	  return (
	   <div id="wrap-srch-02">
	    <div className={(listRecentSearches.length != 'undefined' && listRecentSearches.length > 0? "search-box logged" : "search-box" )} style={{left: this.state.left, top: this.state.top, right: this.state.right, bottom: this.state.bottom}}>
		<div className="open-back" onClick={this.props.toggleBuyBtn}></div>
		
	    <input id="pluginTxt" type="text" placeholder="Search" autoComplete="off" className={this.props.buyButtonOpened ? "close ac_ctl_btn ac_buy_btn" : " ac_buy_btn ac_ctl_btn"} onChange={this.handleChangeTxt.bind(this, 'passSearchVal')} onKeyPress={this.keyPressed.bind(this)} />
		{(listRecentSearches.length != 'undefined' && listRecentSearches.length > 0?
		<div className="search-option">
		 <Scrollbars className="acc-scroll-wrap">
			<div className="search-option-inner">            
			<div className="trending-search-list">			
				<div className="search-list-lft">
					<h4>{(user == null)?'Trending Searches':'Recent Searches'}</h4>
					{listRecentSearches}
				</div>
				<div className="search-list-rgt">
					<h4>User Likes</h4>
					{listRecommendedItems}					
				</div>			
			</div>
			
			</div>
		 </Scrollbars>
		<span className="clear-search" onClick = {this.clearSearch.bind(this)}>X</span>
		</div>:'')}
		</div>
		<div id="clickToggle" onClick={this.props.toggleBuyBtn}>&nbsp;</div>
	  </div>
      );
    }
  }

  export default BuyButton;