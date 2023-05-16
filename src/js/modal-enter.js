const openModalBtn = document.querySelectorAll('[data-action="open-modal-enter"]');
const closeModalBtn = document.querySelector('[data-action="close-modal-enter"]');
const backdrop = document.querySelector('.js-backdrop-enter');

openModalBtn.forEach(btn => btn.addEventListener('click', onOpenModal));
closeModalBtn.addEventListener('click', onCloseModal);


function onOpenModal(event){
	window.addEventListener('keydown', onEscKeyPress);
	backdrop.classList.add('show-modal-enter');
};

function onCloseModal() {
	window.removeEventListener('keydown', onEscKeyPress);
	backdrop.classList.remove('show-modal-enter');
};


function onEscKeyPress(event) {
	const ESC_KEY_CODE = 'Escape';
	const isEscKey = event.code === ESC_KEY_CODE;

	if(isEscKey) {
		onCloseModal();
	}
}
