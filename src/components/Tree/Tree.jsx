import React from 'react';
import './Tree.css';
import Component from '../BaseComponent/BaseComponent'
import Node from '../TreeNode/Node';

export default class Tree extends Component {
    constructor(props) {
      super(props);
      const {childNodes, nodeSelection} = this.props;
      this.state = {
        childNodes: childNodes,
        select: nodeSelection
      };
    }
  
    componentWillReceiveProps(nextProps) {
      this.setState({childNodes: nextProps.childNodes});
    }
  
  
    getNodeKey(node, otherwise) {
      const nodeKey = this.props.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return otherwise;
    }
  
    getCurrentNode() {
      if (this.state.select) return this.state.select.get();
      else return null;
    }
  
    setCurrentNode(node) {
      if (this.state.select) {
        this.state.select.set(node, ()=> {
          let nodeModel = node.props.nodeModel;
          if (this.props.onCurrentChange) this.props.onCurrentChange(nodeModel.data,node);
          if (this.props.onNodeClicked) this.props.onNodeClicked(nodeModel.data, node);
        })
      }
    }
  
    closeSiblings(exclude){
      const {accordion} = this.props;
      if (!accordion) return;
      if (!this.state.childNodes || !this.state.childNodes.length) return;
  
      this.state.childNodes.filter(e=> e !== exclude).forEach(e=>e.collapse());
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
        if (!this.state.childNodes || this.state.childNodes.length === 0){
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
          {this.state.childNodes.map((e, idx) => {
            return (
              <Node
                ref="cnode"
                key={this.getNodeKey(e,idx)}
                sync={this.props.nodeStateSync}
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
    childNodes: [],
    emptyText: '无数据',
    indent: 16,
    options: { children: 'children', label: 'label', icon: 'icon' },
    onCheckChange() {},
    onNodeExpand(){},
    onNodeCollapse(){},
  };
  