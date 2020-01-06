import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    const {
        label, type, id, 
        value, changeHandler
        } = props;
    return (
        <div className= 'form-group'>
            <label htmlFor={id}>
                {label}
                <input type={type}
                    className='form-control'
                    id={id}
                    value={value}
                    onChange={changeHandler} />
            </label>
        </div>
    );
}
    
Input.propTypes = {
    label: 
        PropTypes.string.isRequired,
    type:
        PropTypes.string.isRequired,
    id:
        PropTypes.string.isRequired,
    value:
        PropTypes.string.isRequired,
    changeHandler:
        PropTypes.func.isRequired
}

export default Input;