require('es6-promise').polyfill();
// Когда мы устанавливаем npm пакеты, они заносятся в node_modules
// Поэтому после установки мы ИМПОРТИРУЕМ его из этой папки
import 'nodelist-foreach-polyfill';
// такой импорт - ОЧЕНЬ полезная фича


import tabs from './modules/tabs';
import modal from './modules/modal';
import slider from './modules/slider';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });
    calc();
    cards();
    forms('form', modalTimerId);
    timer('.timer', '2022-11-01');

});