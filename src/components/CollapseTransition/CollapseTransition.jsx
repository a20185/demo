import React, { Component } from 'react';
import './CollapseTransition.css';
const ANIMATION_DURATION = 300;


export default class CollapseTransition extends Component {
  constructor(props) {
    super(props);
    if (!this.selfRef) {
      this.selfRef = {};
      if (!this.selfRef.style) this.selfRef.style = {};
      if (!this.selfRef.dataset) this.selfRef.dataset = {};
    }
  }
  componentDidMount() {
    this.beforeEnter();
    if (this.props.isShow) {
      this.enter();
    }
  }

  componentWillUnmount() {
    this.beforeLeave();
    this.leave();
  }

  componentWillReceiveProps(nextProps){
    if (this.props.isShow !== nextProps.isShow) this.triggerChange(nextProps.isShow);
  }

  triggerChange(isShow) {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (isShow) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
    return isShow;
  }

  beforeEnter() {
    const element = this.selfRef;
    //prepare
    element.dataset.oldPaddingTop = element.style.paddingTop;
    element.dataset.oldPaddingBottom = element.style.paddingBottom;
    element.dataset.oldOverflow = element.style.overflow;
    element.style.height = '0';
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
  }

  enter() {
    const element = this.selfRef;
    //start
    element.style.display = 'block';
    if (element.scrollHeight !== 0) {
      element.style.height = element.scrollHeight + 'px';
      element.style.paddingTop = element.dataset.oldPaddingTop;
      element.style.paddingBottom = element.dataset.oldPaddingBottom;
    } else {
      element.style.height = '';
      element.style.paddingTop = element.dataset.oldPaddingTop;
      element.style.paddingBottom = element.dataset.oldPaddingBottom;
    }

    element.style.overflow = 'hidden';

    this.enterTimer = setTimeout(() => this.afterEnter(), ANIMATION_DURATION);
  }

  afterEnter() {
    const element = this.selfRef;
    element.style.display = 'block';
    element.style.height = '';
    element.style.overflow = element.dataset.oldOverflow;
  }

  beforeLeave() {
    const element = this.selfRef;
    element.dataset.oldPaddingTop = element.style.paddingTop;
    element.dataset.oldPaddingBottom = element.style.paddingBottom;
    element.dataset.oldOverflow = element.style.overflow;

    element.style.display = 'block';
    if (element.scrollHeight !== 0) {
      element.style.height = element.scrollHeight + 'px';
    }
    element.style.overflow = 'hidden';
  }

  leave() {
    const element = this.selfRef;
    if (element.scrollHeight !== 0) {
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
    }
    this.leaveTimer = setTimeout(() => this.afterLeave(), ANIMATION_DURATION);
  }

  afterLeave() {
    const element = this.selfRef;
    if (!element) return ;

    element.style.display = 'none';
    element.style.height = '';
    element.style.overflow = element.dataset.oldOverflow;
    element.style.paddingTop = element.dataset.oldPaddingTop;
    element.style.paddingBottom = element.dataset.oldPaddingBottom;
  }

  render() {
    return (
      <div
        className="collapse-transition"
        style={{ overflow: 'hidden' }}
        isShow={ this.props.isShow }
        ref={e => this.selfRef = e}
      >
        {this.props.children}
      </div>
    );
  }
}
