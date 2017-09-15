function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function extend(){
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
}

export default {
  randomNumber,
  extend,
};
