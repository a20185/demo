import PropTypes from 'prop-types';

function createPropType(validate) {
    // Chainable isRequired
    function checkType(isRequired, props, propName, componentName) {
      componentName = componentName || '<<anonymous>>';
      if (props[propName] == null) {
        if (isRequired) {
          return new Error(
            ("Required `" + propName + "` was not specified in ") +
            ("`" + componentName + "`.")
          );
        }
        return null;
      } else {
        return validate(props, propName, componentName);
      }
    }
  
    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
  
    return chainedCheckType;
}

var createRegex = createPropType((props, propName, componentName) => {
    const value = props[propName];
  
    if (!(value instanceof RegExp)) {
      return new Error(`Invalid prop ${propName} of ${componentName}, should be valid regex.`);
    }
});

var createRange = function(min, max) {
    return createPropType((props, propName, componentName) => {
      const value = props[propName];
  
      if (value < min || value > max) {
        return new Error(`Invalid prop ${propName} of ${componentName}, should between ${min} and ${max}.`);
      }
    });
};


PropTypes.range = createRange;
PropTypes.regex = createRegex;

export default PropTypes;

