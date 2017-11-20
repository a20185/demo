import React from 'react';
import './Input.css'
import Component from '../BaseComponent/BaseComponent'

class Input extends Component {

  focus() {
    setTimeout(() => {
      (this.refs.input).focus();
    });
  }

  blur() {
    setTimeout(() => {
      (this.refs.input).blur();
    });
  }

  fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  handleChange(e) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }

  handleFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e)
  }

  handleBlur(e) {
    const { onBlur } = this.props;
    if (onBlur) onBlur(e)
  }


  render() {
    const { type, size, prepend, append, icon, autoComplete, validating, rows, onMouseEnter, onMouseLeave,
      ...otherProps
    } = this.props;

    const classname = this.classNames(
      type === 'textarea' ? 'textarea' : 'input',
      size && `input--${size}`, {
        'is-disabled': this.props.disabled,
        'input-group': prepend || append,
        'input-group--append': !!append,
        'input-group--prepend': !!prepend
      }
    );

    if ('value' in this.props) {
      otherProps.value = this.fixControlledValue(this.props.value);
      delete otherProps.defaultValue;
    }

    delete otherProps.resize;
    delete otherProps.style;
    delete otherProps.autosize;
    delete otherProps.onIconClick;
      return (
        <div style={this.style()} className={this.className(classname)}>
          { prepend && <div className="input-group__prepend">{prepend}</div> }
          <input { ...otherProps }
            ref="input"
            type={type}
            className="input__inner"
            autoComplete={'off'}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          { append && <div className="input-group__append">{append}</div> }
        </div>
      )
    }
  }

export default Input;