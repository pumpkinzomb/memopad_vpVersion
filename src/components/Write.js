import React, { Component } from 'react';
import PropTypes from 'prop-types';
const $ = window.$;

class Write extends Component {
    constructor(props){
        super(props);
        this.handlePost = this.handlePost.bind(this)
    }
    handlePost(){
        let contents = this.textInput.value;
        this.props.onPost(contents).then(()=>{
            this.textInput.value = '';
            $(this.textInput).keyup();
        })
    }
    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea 
                            className="materialize-textarea" 
                            placeholder="Write down your memo"
                            ref={(ref)=>{
                                this.textInput = ref;
                            }}
                        ></textarea>
                    </div>
                    <div className="card-action">
                        <a href="/" onClick={(e)=>{
                            e.preventDefault();
                            this.handlePost();
                        }}>POST</a>
                    </div>
                </div>
            </div>
        )   
    }
}

Write.propTypes = {
    onPost: PropTypes.func
}

Write.defaultProps = {
    onPost: (contents) => {
        console.error('post function not defined')
    }
}

export default Write;