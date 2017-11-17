import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import Button from '../../../src/components/Button/Button'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        type: 'primary',
        plain: false,
        loading: false,
        disabled: false,
        icon: 'stub',
        onClick: jest.fn()
    };
    const wrapper = shallow(<Button type={props.type} 
                                    plain={props.plain}
                                    loading={props.loading}
                                    disabled={props.disabled}
                                    onClick={props.onClick}
                                    icon={props.icon}/>);
    return {
        props,
        wrapper
    }
};

let {wrapper, props} = setup();

test('Button created successfully' , () => {
    expect(wrapper.find('button').exists()).toBe(true);
});


test('should call onclick function when was clicked', () => {
    wrapper.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
});


