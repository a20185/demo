export default function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      console.log(args);
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
}