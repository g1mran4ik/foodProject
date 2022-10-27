window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          calculator = require('./modules/calculator'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          timer = require('./modules/timer');
     
    tabs();
    modal();
    slider();
    calculator();
    cards();
    forms();
    timer();

});