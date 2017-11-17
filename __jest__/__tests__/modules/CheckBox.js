import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import CheckBox from '../../../src/components/CheckBox/CheckBox'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        type: 'checkbox',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
    };
    const wrapper = shallow(<CheckBox   type={props.type}
                                        onChange={props.onChange}
                                        onFocus={props.onFocus}
                                        onBlur={props.onBlur}/>);
    return {
        props,
        wrapper
    }
};

let {wrapper, props} = setup();


test('Checkbox created successfully', () => {
    expect(wrapper.find('input').exists()).toBe(true);
});

test('state is correctly set after onFocus hooked', () => {
    wrapper.find('input').simulate('focus');
    expect(wrapper.state().focus).toBe(true);
})


test('onBlur hook bind successfully', () => {
    wrapper.find('input').simulate('blur');
    expect(props.onBlur).toBeCalled();
});

test('onFocus hook bind successfully', () => {
    wrapper.find('input').simulate('focus');
    expect(props.onFocus).toBeCalled();
});

test('state is correctly set after onBlur hooked', () => {
    wrapper.find('input').simulate('blur');
    expect(wrapper.state().focus).toBe(false);
});


test('onChange hook bind successfully', () => {
    const evt = {
        target: {
            checked: false
        },
        unitTest: true
    };
    wrapper.find('input').simulate('change', evt);
    expect(props.onChange).toBeCalled();
});


test('onChange successfully change checked states', () => {
    const evt = {
        target: {
            checked: true
        },
        unitTest: true
    };
    wrapper.find('input').simulate('change', evt);
    expect(wrapper.state().checked).toBe(true);
});


test('state changed after receive new props', () => {
    const prop = {
        focus: true
    };
    wrapper.setProps(prop);
    expect(wrapper.state().focus).toBe(true);
});


