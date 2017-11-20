import React from 'react';
import './Tree.css';
import Component from '../BaseComponent/BaseComponent'
import require_condition from '../../utils/condition';
import Node from '../TreeNode/Node';
import TreeStore from './model/treestore';

export default class Tree extends Component {
    constructor(props) {
      super(props);
      const {
        data, lazy, options, load, defaultCheckedKeys, defaultExpandedKeys, currentNodeKey, nodeKey,
        checkStrictly, autoExpandParent, defaultExpandAll, filterNodeMethod } = this.props;
      this.state = {
        store: new TreeStore({
          key: nodeKey, data, lazy, props: options, load, currentNodeKey, checkStrictly,
          defaultCheckedKeys, defaultExpandedKeys, autoExpandParent, defaultExpandAll, filterNodeMethod
        }),
        currentNode: null
      };
  
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.data instanceof Array) {
        this.root.setData(nextProps.data);
        this.setState({});
      }
    }
  
  
    get root(){
      return this.state.store.root;
    }
  
    get store() {
      return this.state.store
    }
  
  
    filter(value) {
      if (!this.props.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
      this.refresh();
    }
  
    refresh() {
      this.setState({})
    }
  
    getNodeKey(node, otherwise) {
      const nodeKey = this.props.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return otherwise;
    }
  
    getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    }
  
    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    }
  
    setCheckedNodes(nodes, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    }
  
    setCheckedKeys(keys, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedKeys(keys, leafOnly);
    }
  
    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    }
  

    getCurrentNode() {
      return this.state.currentNode;
    }
  
    setCurrentNode(node) {
      require_condition(node != null);
  
      let {onCurrentChange, onNodeClicked} = this.props;
      this.store.setCurrentNode(node);
      this.setState({
        currentNode: node
      }, ()=>{
        let nodeModel = node.props.nodeModel;
        onCurrentChange(nodeModel.data, node)
        onNodeClicked(nodeModel.data, node)
      });
    }
  
    closeSiblings(exclude){
      const {accordion} = this.props;
      if (!accordion) return;
      if (!this.root.childNodes || !this.root.childNodes.length) return;
  
      this.root.childNodes.filter(e=> e !== exclude).forEach(e=>e.collapse());
      this.refresh();
    }
  
    render() {
      const {
        options,
        renderContent,
        highlightCurrent,
        isShowCheckbox,
        onCheckChange,
        emptyText
      } = this.props;
  
      const renderEmptyText = ()=>{
        if (!this.root.childNodes || this.root.childNodes.length === 0){
          return (
            <div className="tree__empty-block">
              <span className="tree__empty-text">{emptyText}</span>
            </div>
          )
        } else return null;
      }
  
      return (
        <div
          style={this.style()}
          className={this.className('tree', {
            'tree--highlight-current': highlightCurrent
          })}
        >
          {this.root.childNodes.map((e, idx) => {
            return (
              <Node
                ref="cnode"
                key={this.getNodeKey(e,idx)}
                nodeModel={e}
                options={options}
                renderContent={renderContent}
                treeNode={this}
                parent={this}
                isShowCheckbox={isShowCheckbox}
                onCheckChange={onCheckChange}
              />
            );
          })}
          {renderEmptyText()}
        </div>
      );
    }
  }
  
  Tree.defaultProps = {
    data: [],
    emptyText: '无数据',
    indent: 16,
    options: { children: 'children', label: 'label', icon: 'icon' },
    onCheckChange() {},
    onNodeClicked() {},
    onCurrentChange(){},
    onNodeExpand(){},
    onNodeCollapse(){},
  };
  