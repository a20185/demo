import React from 'react';
import Component from '../BaseComponent/BaseComponent'
import './Button.css'


class Button extends Component {
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <button style={this.style()} className={this.className('button', this.props.type && `button--${this.props.type || 'default'}`, this.props.size && `button--${this.props.size}`, {
          'is-disabled': this.props.disabled,
          'is-loading': this.props.loading,
          'is-plain': this.props.plain
      })} disabled={this.props.disabled} type={this.props.nativeType || 'button'} onClick={this.onClick.bind(this)}>
        { this.props.loading && <i className="icon-loading" /> }
        { this.props.icon && !this.props.loading && <i className={`icon-${this.props.icon}`} /> }
        <span>{this.props.children}</span>
      </button>
    )
  }
}

export default Button;
