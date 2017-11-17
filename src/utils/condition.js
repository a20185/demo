class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message; 
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack;
    }
  }
} 

class ErrorConditionFailed extends ExtendableError {
  constructor(...args) {
    super(args)
  }
}
export default function require_condition(condition, msg = 'pre-condition failed') {
    if (!condition) {
      throw new ErrorConditionFailed(msg)
    }
    return true;
}