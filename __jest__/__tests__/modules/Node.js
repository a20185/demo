import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import Node from '../../../src/components/TreeNode/Node'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        ref: "cnode",
        key: jest.fn(),
        nodeModel: {
            isLeaf: false,
            visible: true,
            expand: jest.fn(),
            expanded: false,
            setChecked: jest.fn(),
            checked: false,
            indeterminate: false,
            collapse: jest.fn(),
            level: 1,
            childNodes: []
        },
        options: {}, 
        treeNode: {
            getCurrentNode: jest.fn(),
            setCurrentNode: jest.fn(),
            isShowCheckbox: true,
            nodeModel: {
                indeterminate: true,
                setChecked: jest.fn()
            },
            props: {
                indent: 10,
                renderContent: jest.fn(),
                expandOnClickNode: false,
                onNodeCollapse: jest.fn(),
                onNodeExpand: jest.fn()
            }
        },
        parent: {
            closeSiblings: jest.fn()
        },
        isShowCheckbox: true,
        onCheckChange: jest.fn()
    };
    const wrapper = shallow(<Node   ref={props.ref}
                                    key={props.key}
                                    nodeModel={props.nodeModel}
                                    options={props.options}
                                    treeNode={props.treeNode}
                                    parent={props.parent}
                                    isShowCheckbox={props.isShowCheckbox}
                                    onCheckChange={props.onCheckChange}/>);
    return {
        props,
        wrapper
    }
};

let {wrapper, props} = setup();


test('Node initialized properly', () => {
    expect(wrapper.find('div').exists()).toBe(true);
});


test('getCurrentNode got called', () => {
    expect(props.treeNode.getCurrentNode).toBeCalled();
});


test("node's handler got called on clicked and change state", () => {
    wrapper.find('div').first().simulate('click');
    expect(props.treeNode.setCurrentNode).toBeCalled();
    expect(props.nodeModel.expand).not.toBeCalled();
    expect(wrapper.state().childNodeRendered).toBe(false);
});


test('state got changed on expandIcon got clicked', () => {
    wrapper.find('span').first().simulate('click');
    expect(props.treeNode.setCurrentNode).toBeCalled();
    expect(props.nodeModel.expand).toBeCalled();
});


test('checkbox state changed', () => {
    const evt = {
        target: null
    }
    wrapper.find('Checkbox').first().simulate('change',evt);
    expect(props.nodeModel.setChecked).toBeCalled();
});

test('checkbox clicked', () => {
    wrapper.find('Checkbox').first().simulate('click');
    expect(props.treeNode.nodeModel.setChecked).toBeCalled();
})


