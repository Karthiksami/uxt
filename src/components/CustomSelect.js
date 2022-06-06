import React, { Component } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
class CustomSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_option: '',
            filtered_options: [],
            show_popup: false
        }
        
        //this.handleSearch = this.handleSearch.bind(this);
        //this.handlePopup = this.handlePopup.bind(this);
        //this.closePopup = this.closePopup.bind(this);
    }
	
    handleSearch(event) {
        let target_val = event.target.value;

        this.setState(()=>{
            return {
                search_option: target_val
            }
        },()=>{
            
            let filtered_options = this.props.options.filter((option)=> {
            return option.value.toLowerCase().startsWith(this.state.search_option);
             });

            this.setState({
                filtered_options: filtered_options
            });
        });
		this.setState({ searchOpen:true});
    }

    handleSelect(selectedOption) {
		this.props.handleSelect(this.props.name, selectedOption);
        this.closePopup.bind(this);
	}
	
	handlePopup() {
        this.setState((preState)=>{
            return {
                show_popup: !preState.show_popup
            }
        }, ()=>{

            if(this.state.show_popup) {
                let formWrap = document.querySelectorAll(".acc-form-wrapper")[0];
                formWrap.classList.add('custom-select-active');
            }
        });

        
    }
	
    closePopup() {
        this.setState({
            search_option: '',
            filtered_options: [],
            show_popup: false
        });

        let formWrap = document.querySelectorAll(".acc-form-wrapper")[0];
        formWrap.classList.remove('custom-select-active');

    }

    render() {

        let req_options = [];

        if(this.state.filtered_options.length) {
            req_options = this.state.filtered_options;
        } else {
            req_options = this.props.options;
        }
	    if( this.state.show_popup ) {
              return (
                <div className="cus-select-popup" ref={node => { this.node = node; }}>
					
					<div className="cus-select-close" onClick={this.closePopup.bind(this)}>Close</div>
                    <div className="cus-select-search">
                        <input name="search_option" placeholder="Country" onChange={ this.handleSearch.bind(this) } value={this.search_option} style={{ fontFamily: this.props.mainFontFamily }}/>
                    </div>
                    <div className="cus-select-options">
                    
                        { 
                            (this.state.filtered_options.length==0 && this.state.search_option!='')
                            
                            ? 
                                <div>No {this.props.placeholder} found</div>
                            :  
                            <Scrollbars className="acc-scroll-wrap">
                                <ul>
                                    {
                                        req_options.map((option)=> {
                                            return <li key={option.value} className={ 'cus-select-option '+((this.props.selected!='' && this.props.selected.value==option.value) ? 'selected-option' : '')} onClick={ ()=>this.handleSelect(option) }>{option.label} </li>
                                        })
                                    }
                                </ul>
                            </Scrollbars>
                        }
                    </div>
                </div>
            );
        } else {
			 return ( 
                <div tabIndex={0} onFocus={this.handlePopup.bind(this)} className={ 'custom-select-box '+this.props.className } onClick={this.handlePopup.bind(this)}>
                    { (this.props.selected!='') ? (this.props.selected.label?this.props.selected.label:this.props.selected) : this.props.placeholder }
                </div>
            );
        }
    }
}

export default CustomSelect;