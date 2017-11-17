import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme'
import Tree from '../../../src/components/Tree/Tree'

configure({adapter: new Adapter()});

const setup = () => {
    const props = {
        ref: e => this.tree = e,
        className: 'filter-tree',
        data: [{
            id: 1,
            label: '网络不佳，请重试',
            children: [{
              id: 4,
              label: '网络不佳，请重试',
              children: [{
                id: 9,
                label: '网络不佳，请重试'
              }, {
                id: 10,
                label: '网络不佳，请重试'
              }]
            }]
          }, {
            id: 2,
            label: '网络不佳，请重试',
            children: [{
              id: 5,
              label: '网络不佳，请重试'
            }, {
              id: 6,
              label: '网络不佳，请重试'
            }]
          }, {
            id: 3,
            label: '网络不佳，请重试',
            children: [{
              id: 7,
              label: '网络不佳，请重试'
            }, {
              id: 8,
              label: '网络不佳，请重试'
            }]
          }],
        lazy: true,
        load: jest.fn(),
        isShowCheckbox: true,
        expandOnClickNode: false,
        highlightCurrent: true,
        options:  {
            children: 'children',
            label: 'label'
        },
        onNodeClicked: jest.fn(),
        nodeKey: 'id',
        defaultExpandAll: false,
        filterNodeMethod: jest.fn()
    };
    const wrapper = shallow(<Tree   ref={props.ref.bind(this)}
                                    className="filter-tree"
                                    data={props.data}
                                    lazy={props.lazy}
                                    load={props.load}
                                    isShowCheckbox={props.isShowCheckbox}
                                    expandOnClickNode={props.expandOnClickNode}
                                    highlightCurrent={props.highlightCurrent}
                                    options={options}
                                    onNodeClicked={props.onNodeClicked}
                                    nodeKey={props.nodeKey}
                                    defaultExpandAll={props.defaultExpandAll}
                                    filterNodeMethod={props.filterNodeMethod}
                                />);
    return {
        props,
        wrapper
    }
};



test('Tree Renders Successfully', () => {
    
});



