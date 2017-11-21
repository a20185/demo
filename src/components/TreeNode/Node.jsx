import React from 'react';
import Component from '../BaseComponent/BaseComponent'
import CollapseTransition from '../CollapseTransition/CollapseTransition';
import IDGenerator from '../../utils/idgen';
import Checkbox from '../CheckBox/CheckBox';
import './Node.css'



function NodeContent({context, renderContent}) {
  const {nodeModel, treeNode} = context.props;

  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return <span className="tree-node__label">{nodeModel.label}</span>;
  }
}

export default class Node extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childNodeRendered: false,
      isShowCheckbox: false
    };
    this.state.isShowCheckbox = props.treeNode.isShowCheckbox;

    this.oldChecked = false;
    this.oldIndeterminate = false;
    this.idGen = new IDGenerator();
  }

  componentWillUnmount() {
    this.isDeconstructed = true;
  }
  handleSelectChange(checked, indeterminate) {
    const { onCheckChange, nodeModel } = this.props;

    if (this.oldChecked !== checked || this.oldIndeterminate !== indeterminate) {
      onCheckChange(nodeModel.data, checked, indeterminate);
    }
    this.oldChecked = checked;
    this.oldIndeterminate = indeterminate;
  }

  getNodeKey(node, otherwise) {
    const nodeKey = this.props.nodeKey;
    if (nodeKey && node) {
      return node.data[nodeKey];
    }
    return otherwise;
  }


  handleClick(evt) {
    if (evt) evt.stopPropagation();
    const { treeNode } = this.props;

    treeNode.setCurrentNode(this);
    if (treeNode.props.expandOnClickNode){
      this.handleExpandIconClick()
    }
  }

  handleExpandIconClick(evt) {
    if (evt) evt.stopPropagation();

    const { nodeModel, parent } = this.props;
    const {onNodeCollapse, onNodeExpand} = this.props.treeNode.props;

    if (nodeModel.isLeaf) return;

    if (nodeModel.expanded) {
      nodeModel.collapse()
      this.props.sync({
        type: 'COLLAPSE_CLICKED'
      })
      onNodeCollapse(nodeModel.data, nodeModel, this)
    } else {
      nodeModel.expand(() => {
        this.setState({childNodeRendered: true }, () => {
          onNodeExpand(nodeModel.data, nodeModel, this)
        });
        parent.closeSiblings(nodeModel)
      });
    }
  }

  closeSiblings(exclude) {
    const {treeNode, nodeModel} = this.props;
    if (!treeNode.props.accordion) return;
    if (nodeModel.isLeaf || !nodeModel.childNodes || !nodeModel.childNodes.length) return;
    nodeModel.childNodes.filter(e => e !== exclude).forEach(e => e.collapse());
    this.props.sync({
      type: 'COLLAPSE_CLICKED',
    });
  }

  handleUserClick() {
    let {nodeModel, checkStrictly} = this.props.treeNode;
    if (nodeModel.indeterminate) {
      nodeModel.setChecked(nodeModel.checked, !checkStrictly);
    }
  }

  handleCheckChange(checked) {
    this.props.nodeModel.setChecked(checked, true);
    if (this.props.sync) {
      this.props.sync({
        type: 'CHECK_CHANGED'
      })
    }
  }

  render() {
    const { childNodeRendered } = this.state;
    const { treeNode, nodeModel, isShowCheckbox} = this.props;
    let expanded = nodeModel.expanded;

    return (
      <div
        onClick={this.handleClick.bind(this)}
        className={this.classNames('tree-node', {
          expanded: childNodeRendered && expanded,
          'is-current': treeNode.getCurrentNode() === this,
          'is-hidden': !nodeModel.visible
        })}
        style={{display: nodeModel.visible ? '': 'none'}}
      >
        <div
          className="tree-node__content"
          style={{ paddingLeft: `${(nodeModel.level - 1) * treeNode.props.indent}px`}}
        >
          <span
            className={this.classNames('tree-node__expand-icon', {
              'is-leaf': nodeModel.isLeaf,
              expanded: !nodeModel.isLeaf && expanded
            })}
            onClick={this.handleExpandIconClick.bind(this)}
          />
          {isShowCheckbox &&
            <Checkbox
              checked={nodeModel.checked}
              onChange={this.handleCheckChange.bind(this)}
              indeterminate={nodeModel.indeterminate}
              onClick={this.handleUserClick.bind(this)}
            />}
          {nodeModel.loading &&
            <span className="tree-node__loading-icon icon-loading"> </span>}
          <NodeContent
            nodeModel={nodeModel}
            renderContent={treeNode.props.renderContent}
            context={this}
          />
        </div>
        <CollapseTransition isShow={expanded} ref="collapse">
          <div className="tree-node__children">
            {nodeModel.childNodes.map((e, idx) => {
              let props = Object.assign({}, this.props, { nodeModel: e, parent: this });
              return <Node {...props} key={this.getNodeKey(e, idx)} />;
            })}
          </div>
        </CollapseTransition>
      </div>
    );
  }
}
