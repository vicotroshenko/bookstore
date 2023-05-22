const axios = require('axios').default;

// getting backend data (all categories) and preparing them for work
const urlCategories = 'https://books-backend.p.goit.global/books/category-list';
const urlBooks = 'https://books-backend.p.goit.global/books/';
const refs = {
  categoriesListenRef: document.querySelector('.js-listener-categories'),
  categoriesListRef: document.querySelector('.js-list-categories'),
  preloaderBoxRef: document.querySelector('.js-preloader'),
  preloaderRef: document.querySelector('.js-loader'),
  titleRef: document.querySelector('.js-title'),
	btnAddShopList: document.querySelector('.js-button-addlist'),
	btnCnangeThemeRef:document.querySelector('.js-theme-checked')
};
refs.categoriesListenRef.addEventListener('click', getName);


// goten name give us necessary books
async function getBooks(url) {
  try {
    const response = await axios.get(url);
		startPreloader()
		return response;
  } catch (error) {
    console.error(error);
  }
}

// create markup Top Books form all categories 
getBooks("https://books-backend.p.goit.global/books/top-books")
		.then(response => {
			markupTopBooks(response);
			onModalWindowInform(response);
		})
		.catch(error => console.log(error));

getBooks(urlCategories)
		.then(response => {
			startPreloader()
			makeCategories(response);
		})
		.catch(error => console.log(error));


// preloader
function startPreloader() {
		refs.preloaderBoxRef.classList.add("preloader")
		refs.preloaderRef.classList.add("loader")
};
function stopPreloader() {
		refs.preloaderBoxRef.classList.remove("preloader")
		refs.preloaderRef.classList.remove("loader")
};

// after click we're getting categories name
function getName(event) {
  const categoryName = event.target.getAttribute('data-name');
	let urlCategory = '';
	if(categoryName === 'top-books') {
		urlCategory=urlBooks+categoryName;
		startPreloader();
		getBooks(urlCategory)
						.then(response => {
								markupTopBooks(response);
								onModalWindowInform(response);
						})
						.catch(error => console.log(error));
	} else {
		urlCategory=urlBooks+'category?category='+categoryName;
		startPreloader();
		getBooks(urlCategory)
							.then(response => {
									setAllBooksAfterClick(response);
									onModalWindowInform(response);
							})
							.catch(error => console.log(error));
	}
	setStatusActive(categoryName);
};

// creating markup "all categories"
function makeCategories(response) {
	const categoriesArray = response.data;
	const markupCategor = categoriesArray.map(category =>
		`<li class="item" data-name="${category.list_name}" tabindex="0">${category.list_name}
		</li>`).join('');
		refs.categoriesListRef.insertAdjacentHTML('beforeend', markupCategor)
};

// creating markup "site main page top books"
refs.booksBoxRef = document.querySelector('.js-list-books');

function markupTopBooks(response) {
	refs.booksBoxRef.innerHTML = '';
	refs.titleRef.textContent = 'Best Sellers Books';
	const booksData = response.data;
	let markupFull='';
	
	for(const category of booksData){
		let sumAllBooks ='';
		const books = category.books;
		for(let i=0; i<books.length; i+=1){
			let markupInner = ` <li class="item book-info modal-open" tabindex="0" id="${books[i]._id}">
				<div class="book-cover">
						 <img src="${books[i].book_image}" alt="${books[i].title}" class="img" loading="lazy">
						 <div class="quick-view">quick view</div>
				</div>
				<h3 class="subject">${books[i].title}</h3>
				<span class="author">${books[i].author}</span>
			</li>`
			if(books[i].list_name === category.list_name) {
				sumAllBooks += markupInner;
			}
		}
		markupFull = `<li class="item ">
		<span class="category-name js-ctg-name">${category.list_name}</span>
		<ul class="list list-books-wrapper">`
		+sumAllBooks
		+`</ul><div class="primery-btn-wrapper">
		<button type="button" class="button primery js-button" name="${category.list_name}">SEE MORE</button>
		</div></li>`;
		refs.booksBoxRef.insertAdjacentHTML('beforeend', markupFull);
		refs.buttonListenRef = document.querySelectorAll('.js-button');
		refs.buttonListenRef.forEach(btn => btn.addEventListener('click', getName));
		stopPreloader();
		startOpenModal();
	}
};

// markup all books after click on button to Category name
function setAllBooksAfterClick(response) {
if(response.request.responseURL.includes('top-books')){
	markupTopBooks(response);
	return;
};
refs.booksBoxRef.innerHTML = '<div class="books-box js-preloader" id="preloader"><div class="js-loader"></div></div>';
let sumAllBooks ='';
const booksData = response.data;
for(const book of booksData){
	let markupInner  =` <li class="item book-info modal-open" tabindex="0" id="${book._id}">
	<div class="book-cover">
			 <img src="${book.book_image}" alt="${book.title}" class="img" loading="lazy">
			 <div class="quick-view">quick view</div>
	</div>
	<h3 class="subject">${book.title}</h3>
	<span class="author">${book.author}</span>
</li>`;
	sumAllBooks+=markupInner
	refs.titleRef.textContent = book.list_name;
}
refs.booksBoxRef.classList.add("all-books-show");

refs.booksBoxRef.innerHTML = sumAllBooks;
stopPreloader();
startOpenModal();
};

// change status (styles) category in categories section
function setStatusActive(categoryName){
	const categoriesChild = refs.categoriesListRef.children;
	for (const catName of categoriesChild) {
		if(categoryName !== null){
			catName.classList.remove('active');
			if(catName.getAttribute('name') === categoryName) {
				catName.classList.add('active');
			}
		}
	}
}
// setup dropbtn of user's menu
refs.btnDropDownRef = document.querySelector('.dropbtn');
refs.btnDropDownRef.addEventListener('click', makeDropDown);

function makeDropDown() {
	document.getElementById("myDropdown").classList.toggle("show");
};
document.addEventListener('click', makeDropClose);
function makeDropClose(event) {
	if (!event.target.matches('.dropbtn') 
	&& !event.target.matches('.dropbtn span')
	&& !event.target.matches('.dropbtn use')
	&& !event.target.matches('.dropbtn img')
	&& !event.target.matches('.dropbtn svg')) {
		refs.dropdowns = document.getElementsByClassName("dropdown-content");
		for (let i = 0; i < refs.dropdowns.length; i++) {
			let openDropdown = refs.dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
};

// modal window (function onOpenModal start in function markupTopBooks and setAllBooksAfterClick)
const refsModal = {
	closeModalBtn: document.querySelector('[data-action="close-modal"]'),
	backdrop: document.querySelector('.js-backdrop'),

};

function startOpenModal(){
	refsModal.openModalBtn = document.querySelectorAll('.modal-open');
	refsModal.openModalBtn.forEach(btn => btn.addEventListener('click', onOpenModal));
	refsModal.openModalBtn.forEach(btn => btn.addEventListener('keydown', enterModal));
}

refsModal.closeModalBtn.addEventListener('click', onCloseModal);
refsModal.backdrop.addEventListener('click', onBackdropClick);	

let booksArrayTop = [];
function onModalWindowInform(response) {
	booksArrayTop.splice(0, booksArrayTop.length)
	const bookIform = response.data;
	for (const bookBox of bookIform){
		if(Object.keys(bookBox).includes("books")){
			for(const book of bookBox.books){
				booksArrayTop.push(book);
			}
		} else {
			booksArrayTop.push(bookBox);
		}
	}
}
let id = '';
function onOpenModal(event) {
	window.addEventListener('keydown', onEscKeyPress);
	refsModal.backdrop.classList.add('show-modal');
	
	id = this.id;
	makeMarkupOnModal(id);
	checkLocalData(id);
};

function onCloseModal() {
	window.removeEventListener('keydown', onEscKeyPress);
	refsModal.backdrop.classList.remove('show-modal');
};

function onBackdropClick(event) {
	if(event.currentTarget === event.target) {
		onCloseModal();
	}
};

function onEscKeyPress(event) {
	const ESC_KEY_CODE = 'Escape';
	const isEscKey = event.code === ESC_KEY_CODE;
	if(isEscKey) {
		onCloseModal();
	}
};
function enterModal(event) {
	const ENTER_KEY_CODE = 'Enter'
	const isEnterKey = event.code === ENTER_KEY_CODE;
	if(isEnterKey){
		onOpenModal();
	}	
};		

const modalContainerRef = document.querySelector(".modal-wrapper")
modalContainerRef.innerHTML = '';

function makeMarkupOnModal(id){
	let bookIform = booksArrayTop;
	for(const book of bookIform){
		if(book._id === id){
			const markupBookOnModal = `<div class="book-cover">
			<img 
			src="${book.book_image}" 
			alt="${book.title}" 
			class="img">
		</div>
		<div class="book-describe">
			<h2 class="subject">${book.title}</h2>
			<span class="author">${book.author}</span>
			<p class="describe">${book.description}</p>
			<ul class="list">
				<li class="item book-link" >
						<a href="${book.buy_links[0].url}" tabindex="0" class="link" target=”_blank”>
						<img 
							src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/amazon.png?raw=true" 
							alt="amazon shop" 
							class="img">
						</a>
				</li>
				<li class="item book-link">
						<a href="${book.buy_links[1].url}" tabindex="0" class="link" target=”_blank”>
						<img 
							src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/appel-books.png?raw=true" 
							alt="apple-books shop" 
							class="img">
						</a>
				</li>
				<li class="item book-link">
						<a href="${book.buy_links[4].url}" tabindex="0" class="link" target=”_blank”>
						<img 
							src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/bookshop.png?raw=true" 
							alt="bookshop" 
							class="img">
						</a>
				</li>
			</ul>
		</div>`
		modalContainerRef.innerHTML = markupBookOnModal;
		
		}
	}
}

// making local storage data
const KEY_ADD_BOOKS = "shoplist";

refs.btnAddShopList.addEventListener('click', makeLocalData);

function makeLocalData(event) {
	let booksAddShopList = [];
	let bookArray = booksArrayTop;
	refs.btnAddShopList.textContent ='remove from the shopping list';
	for(const book of bookArray){
		if(book._id === id){
			if(getLocalData(KEY_ADD_BOOKS) !== null){
				const parsedBooks = getLocalData(KEY_ADD_BOOKS);
				if(refs.btnAddShopList.hasAttribute("data-buy") === false){
					parsedBooks.push(book);
					setLocalData(KEY_ADD_BOOKS ,parsedBooks)
					return refs.btnAddShopList.setAttribute("data-buy", "addlist");
				} 
				if(refs.btnAddShopList.hasAttribute("data-buy") === true) {
					const newParsedBooks = parsedBooks.filter(element => element._id !== id);
					setLocalData(KEY_ADD_BOOKS, newParsedBooks)
					refs.btnAddShopList.removeAttribute("data-buy")
					refs.btnAddShopList.textContent ='add to shopping list';
				}
			} else {
				booksAddShopList.push(book)
				setLocalData(KEY_ADD_BOOKS, booksAddShopList);
			}
		}
	}
};

function setLocalData(key, book){
	try {
		const bookJSON = JSON.stringify(book)
		return localStorage.setItem(key, bookJSON);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

function getLocalData(list){
	try {
		const savedBooks = localStorage.getItem(list);
		const parsedBooks = JSON.parse(savedBooks);
		return parsedBooks;
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};
export {setLocalData, getLocalData};

function checkLocalData(id) {
	let parsedBooks = getLocalData(KEY_ADD_BOOKS);
	const localStoreBookStatus = parsedBooks.find(book => book._id === id)
	if(localStoreBookStatus){
		refs.btnAddShopList.setAttribute("data-buy", "addlist");
		refs.btnAddShopList.textContent ='remove from the shopping list';
		return;
	} else {
		refs.btnAddShopList.removeAttribute("data-buy")
		refs.btnAddShopList.textContent ='add to shopping list';
		return;
	} 
}
// changed site theme
const bodyRef = document.querySelector('body');
const btnCnangeThemeRef = document.querySelector('.js-theme-checked');
refs.btnCnangeThemeRef.addEventListener('change', changeTheme);

const KEY_THEME ='themeStatus';
let checkStatus = '';
function changeTheme(event) {
	if (event.target.checked) {
		checkStatus =true;
		bodyRef.classList.add("dark-theme")
  } else {
		checkStatus =false;
		bodyRef.classList.remove('dark-theme')
  }
	setLocalData(KEY_THEME, checkStatus)
};
function checkingStatusTheme(){
	if(getLocalData(KEY_THEME) === true) {
		btnCnangeThemeRef.checked = true;
		checkStatus =true;
		bodyRef.classList.add("dark-theme")
	} else {
		checkStatus =false;
		bodyRef.classList.remove('dark-theme')
		return;
	}
};

checkingStatusTheme();


const bookRef =document.getElementsByClassName('.book-info');

// show password
const passwordPicRef = document.querySelector('.js-icon-box');
const iputPassword = document.querySelector('.js-form-input');
passwordPicRef.addEventListener('click', (event) => {
	if(iputPassword.getAttribute("type") === 'password'){
		iputPassword.removeAttribute('type');
		iputPassword.setAttribute('type', 'text');
		passwordPicRef.removeEventListener('click', event)
	} else {
		iputPassword.removeAttribute('type');
		iputPassword.setAttribute('type', 'password');
		passwordPicRef.removeEventListener('click', event)
	}
})


