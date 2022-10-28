import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
// Forms

const forms = document.querySelectorAll(formSelector);

const message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        // form.append(statusMessage); // визуально не практично изза наличия flex в css. Элемент добавляется к существующим и весь набор смещается влево
        form.insertAdjacentElement('afterend', statusMessage); // Альтернатива append в данном случае

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php');
        // request.setRequestHeader('Content-type', 'application/json'); // при использовании связки XMLHttpRequest объекта + formData ЗАГОЛОВКИ УСТАНАВЛИВАТЬ НЕ НУЖНО, они устанавливаются автоматически
        const formData = new FormData(form); // для правильной работы FormData в html коде всегда должна присутствовать форма name!!!
        
        // const object = {};
        // formData.forEach(function(value, key) {
        //     object[key] = value;
        // });

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // const json = JSON.stringify(object);

        // fetch('server.php', {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(object)
        // })
        postData('http://localhost:3000/requests', json/*JSON.stringify(object)*/)
        // .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.succes);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });

        // request.addEventListener('load', () => {
        //     if (request.status === 200) {
        //         console.log(request.response);
        //         showThanksModal(message.succes);
        //         form.reset();
        //         statusMessage.remove();
        //     } else {
        //         showThanksModal(message.failure);
        //     }
        // });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    
    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal('.modal');
    }, 4000);
}
}

export default forms;