
import React from 'react'
import './Checkbox.css'
import Component from '../BaseComponent/BaseComponent'


class Checkbox extends Component {
  static elementType = 'Checkbox';

  state = {
      checked: false,
      focus: false,
      label: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      focus: props.focus,
      label: this.getLabel(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked, focus: nextProps.focus, label: this.getLabel(nextProps)
    })
  }

  onFocus() {
    this.setState({
      focus: true
    }, () => {
      if (this.props.onFocus) {
        this.props.onFocus(arguments);
      }
    });
  }

  onBlur() {
    this.setState({
      focus: false
    }, () => {
      if (this.props.onBlur) {
        this.props.onBlur(arguments);
      }
    });
  }

  onChange(e) {
    if (e.target instanceof HTMLInputElement || e.unitTest) {
      const { label } = this.state;
      const { trueLabel, falseLabel} = this.props;
      const checked = e.target.checked;

      let newLabel = label;
      if (this.props.trueLabel || this.props.falseLabel) {
        newLabel = checked ? trueLabel : falseLabel;
      }
      this.setState({
        checked: checked,
        label: newLabel,
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(checked);
        }
      });
    }
  }

  getLabel(props) {
    if (props.trueLabel || props.falseLabel) {
      return props.checked ? props.trueLabel : props.falseLabel;
    } else {
      return props.label;
    }
  }

  render() {
    return (
      <label style={this.style()} className={this.className('checkbox')}>
        <span className={this.classNames('checkbox__input', {
          'is-disabled': this.props.disabled,
          'is-checked': this.state.checked,
          'is-indeterminate': this.props.indeterminate,
          'is-focus': this.state.focus || false
        })}>
          <span className="checkbox__inner"></span>
          <input
            className="checkbox__original"
            type="checkbox"
            checked={this.state.checked || false}
            disabled={this.props.disabled || false}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </span>
        <span className="checkbox__label">
          {this.props.children || this.state.label}
        </span>
      </label>
    )
  }
}


export default Checkbox;