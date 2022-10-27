function calculator() {
// Calculator

const result = document.querySelector('.calculating__result span');

// Сохранение стандартных значений, введенных пользователем с помощью localStorage
let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

// Добавление стандартных значений для калькулятора
// let sex = 'female', 
//     height, 
//     weight, 
//     age, 
//     ratio = 1.375;

function calcTotal() { //Если пользователь что-то не ввел, будет отображаться нужный текст(в данном случае "____")
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex == 'female') { // условия расчета по формулам в зависимости от выбранного пола
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

// function getStaticInformation(parentSelector, activeClass) {
//     const elements = document.querySelectorAll(`${parentSelector} div`);

// Вариант написания функции без использования делегирования
function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    // Вместо делегирования событий используется forEach
    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
        });
    });

    // Делегирование событий в данном случае не практично, т.к. при клике на пустые места будет неприятный баг
    // document.querySelector(parentSelector).addEventListener('click', (e) => {
    //     if (e.target.getAttribute('data-ratio')) {
    //         ratio = +e.target.getAttribute('data-ratio');
    //     } else {
    //         sex = e.target.getAttribute('id');
    //     }

    //     elements.forEach(elem => {
    //         elem.classList.remove(activeClass);
    //     });

    //     e.target.classList.add(activeClass);

    //     calcTotal();
    // });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        // Добавляем условие подсветки блока если пользователь вводит несоответствующее значение
        if (input.value.match(/\D/g)) { // если пользователь вводит в графу НЕ число
            input.style.border = '1px solid red'
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }

        calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
}

module.exports = calculator;