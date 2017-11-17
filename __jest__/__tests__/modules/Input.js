import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import Input from '../../../src/components/Input/Input'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        placeholder: 'stub',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn()
    };
    const wrapper = shallow(<Input placeholder={props.placeholder}
                                    onChange={props.onChange}
                                    onFocus={props.onFocus}
                                    onBlur={props.onBlur}/>);
    return {
        props,
        wrapper
    }
};

let {wrapper, props} = setup();


test('Input created successfully', () => {
    expect(wrapper.find('input').exists()).toBe(true);
});

test('onBlur hook bind successfully', () => {
    wrapper.find('input').simulate('blur');
    expect(props.onBlur).toBeCalled();
});

test('onFocus hook bind successfully', () => {
    wrapper.find('input').simulate('focus');
    expect(props.onFocus).toBeCalled();
});


test('onChange hook bind successfully', () => {
    const evt = {
        target: jest.fn()
    };
    wrapper.find('input').simulate('change', evt);
    expect(props.onChange).toBeCalled();
});

