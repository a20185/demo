import CollapseTransition from '../../../src/components/CollapseTransition/CollapseTransition'

import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'


configure({adapter: new Adapter()});

const emptyChildrenSetup = () => {
    const nprops = {
        children: undefined,
        isShow: false
    };
    const nwrapper = shallow(<CollapseTransition {...nprops}/>);
    return {
        nprops,
        nwrapper
    }
};


const setup = () => {
    const props = {
        children: ['a', 'b', 'c'],
        isShow: true
    };
    const wrapper = shallow(<CollapseTransition {...props}/>);
    return {
        props,
        wrapper
    }
};

let {wrapper, props} = setup();
let {nwrapper, nprops} = emptyChildrenSetup();


test('The Component is created successfully', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(nwrapper.find('div').exists()).toBe(true);
});


test('Check trigger collapse status for true', () => {
    wrapper.setProps({isShow: true});
    expect(wrapper.prop('isShow')).toBe(true);
});

test('Check trigger collapse status for false', () => {
    wrapper.setProps({isShow: false});
    expect(wrapper.prop('isShow')).toBe(false);
});
