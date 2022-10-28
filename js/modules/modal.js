function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // использование toggle
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    // добавляем modalTimerId в качестве аргумента, и при его наличии (условие if запускаем очистку интервала)
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    // использование toggle
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
// Modal

const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

modalTrigger.forEach(btn => {
    btn.addEventListener('click',() => openModal(modalSelector, modalTimerId));      
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        // плохая практика - отсутствие аргумента на ввод и использование event.targer
        // modal.addEventListener('click', () => {
        //     if (event.target === modal) {
        closeModal(modalSelector);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal(modalSelector);
    }
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.
        clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};