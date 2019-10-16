import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cookie from "react-cookies";

class Modal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
            username: null,
            email: null,
            errors: {},
            form: 'signup',
            items: [
                {"name": "name", "type": "text"},
                {"name": "email", "type": "email"},
                {"name": "password", "type": "password"},
                {"name": "password2", "type": "password"}
            ]
        };
    }

    createPost(data) {
        const endpoint = '/signup/';
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        if (csrfToken !== undefined) {
            console.log('pooooooo');
            console.log(data);
            let lookupOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            };

            fetch(endpoint, lookupOptions)
                .then(function (response) {
                    window.location.reload();

                }).then(function (responseData) {

            }).catch(function (error) {
                console.log("error", error);
                alert("An error occured, please try again later.")
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        let data = this.state;

        console.log(data)
        this.createPost(data)
    }

    handleInputChange(event) {
        event.preventDefault();
        console.log(event.target.name, event.target.value);
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    componentDidMount() {
        this.setState({
            username: null,
            email: null,
        })
    }

    signIn() {
        if (this.state.form === 'signup') {
            this.setState({
                form: 'signin',
                items: [
                    {"name": "email", "type": "email"},
                    {"name": "password", "type": "password"}
                ]
            });
        } else {
            this.setState({
                form: 'signup',
                items: [
                    {"name": "name", "type": "text"},
                    {"name": "email", "type": "email"},
                    {"name": "password", "type": "password"},
                    {"name": "password2", "type": "password"}
                ]
            });
        }
    }

    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        return (
            <div className="backdrop" style={{backdropStyle}}>
                <div className="modal" style={{modalStyle}}>
                    {this.props.children}
                    <form onSubmit={this.handleSubmit}>
                        {this.state.items.map(item => (
                            <div className='form-group'>
                                <label htmlFor='title'>{item.name}</label>
                                <input type={item.type} id={item.name} name={item.name} className='form-control'
                                       placeholder={item.name}
                                       onChange={this.handleInputChange}
                                       required='required'/>
                            </div>
                        ))}
                        <button className='btn btn-primary'>Save</button>
                    </form>
                    <div className="footer">
                        <div>
                            <button onClick={this.props.onClose}>
                                Close
                            </button>
                            <button onClick={this.signIn}>
                                {this.state.form}
                            </button>
                        </div>
                        <div>
                            <a className="btn btn-primary" href="/signin/login/facebook">Login with Facebook</a>
                            <a className="btn btn-primary" href="/signin/login/google-oauth2">Google</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};


export default Modal;