import React from 'react';
import Component from '../../utils/component';
import PropTypes from '../../utils/proptypes';

class Input extends Component {
  static defaultProps = {
    type: 'text',
    autosize: false,
    rows: 2,
    autoComplete: 'off'
  }

  constructor(props) {
    super(props);
    console.log("Input Created");
  }

  focus() {
    setTimeout(() => {
      (this.refs.input || this.refs.textarea).focus();
    });
  }

  blur() {
    setTimeout(() => {
      (this.refs.input || this.refs.textarea).blur();
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

  handleIconClick() {
    if (this.props.onIconClick) {
      this.props.onIconClick()
    }
  }


  render() {
    const { type, size, prepend, append, icon, autoComplete, validating, rows, onMouseEnter, onMouseLeave,
      ...otherProps
    } = this.props;

    const classname = this.classNames(
      type === 'textarea' ? 'el-textarea' : 'el-input',
      size && `el-input--${size}`, {
        'is-disabled': this.props.disabled,
        'el-input-group': prepend || append,
        'el-input-group--append': !!append,
        'el-input-group--prepend': !!prepend
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
          { prepend && <div className="el-input-group__prepend">{prepend}</div> }
          <input { ...otherProps }
            ref="input"
            type={type}
            className="el-input__inner"
            autoComplete={autoComplete}
            onChange={this.handleChange.bind(this)}
          />
          { append && <div className="el-input-group__append">{append}</div> }
        </div>
      )
    }
  }

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,

  size: PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: PropTypes.node,
  append: PropTypes.node,

  onChange: PropTypes.func,
}

export default Input;