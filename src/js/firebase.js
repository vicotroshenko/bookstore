
const formModalRef = document.querySelector('.form-field');
formModalRef.addEventListener('submit', getEnterData);

function getEnterData(event) {
	event.preventDefault()
	const NAME = event.target[0].value
	const EMAIL = event.target[1].value
	const PASSWORD = event.target[2].value
	console.log(NAME, EMAIL, PASSWORD)
}
