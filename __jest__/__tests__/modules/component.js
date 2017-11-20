import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import BasicComponent from '../../../src/components/BaseComponent/BaseComponent'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        onclick: jest.fn()
    };
    const wrapper = shallow(<BasicComponent {...props}/>);
    return {
        props,
        wrapper
    }
};


test('Test Base Component no crashes', () => {
    let {wrapper, props} = setup();

    expect(typeof wrapper.find(BasicComponent)).toBe(typeof {});
});