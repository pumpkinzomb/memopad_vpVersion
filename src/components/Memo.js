import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
const $ = window.$;

class Memo extends Component {
    constructor(props){
        super(props)
        this.state={
            editMode:false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }

    toggleEdit(e){
        e.preventDefault();
        if(this.state.editMode){
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.editInput.value;

            this.props.onEdit(id, index, contents).then(()=>{
                this.setState({
                    editMode: !this.state.editMode
                });
            });
        }else{
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }
    handleRemove(e){
        e.preventDefault();
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }
    handleStar(){
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onStar(id, index);
    }
    componentDidMount(){
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
    shouldComponentUpdate(nextProps,nextState){
        let current={
            props: this.props,
            state: this.state
        }

        let next={
            props: nextProps,
            state: nextState
        }
        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }
    componentDidUpdate(){
        if(this.editInput){
            this.editInput.focus();
            $(this.editInput).keyup();
        }
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

  render() {
    const { data, ownership } = this.props;
    // EDITED info
    let editedInfo = (
        <span style={{ paddingLeft: '10px' }}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
    );
    // IF IT IS STARRED ( CHECKS WHETHER THE NICKNAME EXISTS IN THE ARRAY )
    // RETURN STYLE THAT HAS A YELLOW COLOR
    let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1 ? { color: '#ff9980' } : {})
    const dropDownMenu = (
        <div className="option-button">
            <a className='dropdown-button' 
                id={`dropdown-button-${data._id}`}
                data-activates={`dropdown-${data._id}`}>
                <i className="material-icons icon-button">more_vert</i>
            </a>
            <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                <li><a href="/" onClick={this.toggleEdit}>Edit</a></li>
                <li><a href="/" onClick={this.handleRemove}>Remove</a></li>
            </ul>
        </div>
    );

    const memoView = (
        <div className="card">
            <div className="info">
                <Link to={`/wall/${this.props.data.writer}`} className="username">{data.writer}</Link>
                <span className="timeStamp">wrote a log · <TimeAgo date={this.props.data.date.created} />
                { this.props.data.is_edited ? editedInfo : undefined }</span>
                { ownership ? dropDownMenu : undefined }
            </div>
            <div className="card-content">
                {data.contents}
            </div>
            <div className="footer">
                <i className="material-icons log-footer-icon star icon-button"
                    style={starStyle}
                    onClick={this.handleStar}>star</i>
                <span className="star-count">{data.starred.length}</span>
            </div>
        </div>
    );

    const editView = (
        <div className="write">
            <div className="card">
                <div className="card-content">
                    <textarea
                        ref={ref=> this.editInput = ref}
                        defaultValue={this.props.data.contents}
                        className="materialize-textarea"></textarea>
                </div>
                <div className="card-action">
                    <a onClick={this.toggleEdit}>OK</a>
                </div>
            </div>
        </div>
    );

    

    return (
        <div className="container memo">
            { this.state.editMode ? editView : memoView }
        </div>
    )
  }
}

Memo.propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool,
    onEdit: PropTypes.func,
    index: PropTypes.number,
    onRemove: PropTypes.func,
    onStar: PropTypes.func,
    currentUser: PropTypes.string
}

Memo.defaultProps = {
    data: {
        _id: 'id123456890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    onEdit: (id, index, contents) =>{
        console.error('onEdit function not defined')
    },
    onRemove: (id, index) =>{
        console.error('remove function not defined')
    },
    onStar: (id, index)=>{
        console.error('star function not defined')
    },
    currentUser: '',
    ownership: true
}

export default Memo;