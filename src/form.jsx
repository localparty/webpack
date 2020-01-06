import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Input from './input.jsx';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: ''
        }
        this.changeHandler = 
            this.changeHandler.bind(this);
    }
    changeHandler(event){
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render(){
        const {
            title,
            description} = this.state
        return (
            <form id='form-article'>
                <Input 
                    label=
                        'title'
                    type=
                        'text'
                    id=
                        'title'
                    value=
                        {title}
                    changeHandler=
                        {this.changeHandler}/>
                <Input 
                    label=
                        'description'
                    type=
                        'text'
                    id=
                        'description'
                    value=
                        {description}
                    changeHandler=
                        {this.changeHandler}/>
            </form>
        );
    }
}
export default Form;

const wrapper = 
    document.getElementById("root");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;