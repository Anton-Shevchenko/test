import React, {Component} from 'react';
import 'whatwg-fetch'
import cookie from "react-cookies";


class Payment extends Component {

    createOrder(data) {

        const endpoint = '/order/';
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        if (csrfToken !== undefined) {
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
                    return response.json()
                }).then(function (responseData) {
                console.log(responseData)

            }).catch(function (error) {
                console.log("error", error);
                alert("An error occured, please try again later.")
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state)
        let data = this.state;

        // console.log(data)
        this.createPost(data)
    }

    render() {
        return (
            <form>
                <div className='form-group'>
                    <label for='title'>Post title</label>
                    <input type='text' id='title' name='title' className='form-control' placeholder='Blog post title'
                           required='required'/>
                </div>
                <div className='form-group'>
                    <label for='content'>Content</label>
                    <textarea id='content' name='content' className='form-control' placeholder='Post content'
                              required='required'/>

                </div>
                <div className='form-group'>
                    <label for='draft'>
                        <input type='checkbox' id='draft' name='draft' className='mr-2'
                        />
                        Draft </label>
                </div>
                <div className='form-group'>
                    <label for='publish'>Publish Date</label>
                    <input type='date' id='publish' name='publish' className='form-control'
                           required='required'/>
                </div>
                <button className='btn btn-primary'>Save</button>
            </form>
        )
    }
}

export default Payment;
