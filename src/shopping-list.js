const btnDropDownRef = document.querySelector('.dropbtn');
const btnAddShopList = document.querySelector('.js-btn-addlist');
const pileBooksRef = document.querySelector('.js-screen-saver')
btnDropDownRef.addEventListener('click', makeDropDown);

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
		const dropdowns = document.getElementsByClassName("dropdown-content");
		for (let i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
};
const onShopListRef = document.querySelector('.js-container-list-shop');

import { setLocalData, getLocalData } from "./index.js";
const KEY_ADD_BOOKS = "shoplist";

function markupShopList(parsedBooks){
	let markup = '';
	if(parsedBooks === undefined){
		return;
	};
	onShopListRef.innerHTML = '';
	markup = parsedBooks.map(book =>`<li class="item ">
	<button type="button" class="button close js-btn-addlist" data-buy="delete-book">
	<img class="img" src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/trash.png?raw=true" alt="${book.title}">
</button>
	<div class="book-cover shop-list">
		<img src="${book.book_image}" alt="${book.title}" class="img">
	</div>
	<div class="book-describe">
		<h2 class="subject">${book.title}</h2>
		<span class="category">${book.list_name}</span>
		<p class="describe">${book.description}</p>
		<div>
			<span class="author">${book.author}</span>
		<ul class="list">
			<li class="book-link">
				<a href="${book.buy_links[0].url}" class="link" target=”_blank”>
					<img src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/amazon.png?raw=true"
						alt="amazon shop" class="img">
				</a>
			</li>
			<li class="book-link">
				<a href="${book.buy_links[1].url}" class="link" target=”_blank”>
					<img
						src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/appel-books.png?raw=true"
						alt="apple-books shop" class="img">
				</a>
			</li>
			<li class="book-link">
				<a href="${book.buy_links[4].url}" class="link" target=”_blank”>
					<img src="https://github.com/vicotroshenko/bookstore/blob/main/src/images/bookshop.png?raw=true"
						alt="bookshop" class="img">
				</a>
			</li>
		</ul>
		</div>
	</div>
</li>`).join('');
onShopListRef.innerHTML= markup;
const btnDeleteRef = document.querySelectorAll('[data-buy="delete-book"]');
btnDeleteRef.forEach(btn => btn.addEventListener('click', deleteBookFromList));
};

function deleteBookFromList(event){
	const parsedBooks = getLocalData(KEY_ADD_BOOKS).filter(element => element.title !== event.target.alt);
	setLocalData(KEY_ADD_BOOKS, parsedBooks);
	getFirstPage();
	markupShopList();
};

import Pagination from 'tui-pagination'; 
import 'tui-pagination/dist/tui-pagination.css';
const container = document.getElementById('pagination');
const options = {
  totalItems: getLocalData(KEY_ADD_BOOKS).length,
  itemsPerPage: 3,
  visiblePages: 2,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-own-styles">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected tui-own-styles">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} tui-own-styles">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} tui-own-styles">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip tui-own-styles">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};
const pagination = new Pagination(container, options);

function getFirstPage(){
	pileBooksRef.style.display = 'none';
	const sliceBooks = getLocalData(KEY_ADD_BOOKS).slice((options.page-1)*options.itemsPerPage, options.page*options.itemsPerPage);
	markupShopList(sliceBooks);
	if(getLocalData(KEY_ADD_BOOKS).length === 0 || getLocalData(KEY_ADD_BOOKS) === null){
		container.style.display = 'none';
		pileBooksRef.style.display = 'flex';
		return;
	}
};
getFirstPage();


pagination.on('afterMove', (event) => {
	const pageNumber = event.page;
	const sliceBooks = getLocalData(KEY_ADD_BOOKS).slice((pageNumber-1)*options.itemsPerPage, pageNumber*options.itemsPerPage);
	markupShopList(sliceBooks);
});

const bodyRef = document.querySelector('body');
const btnCnangeThemeRef = document.querySelector('.js-theme-checked');
btnCnangeThemeRef.addEventListener('change', changeTheme);

const KEY_THEME ='themeStatus';

function changeTheme(event) {
	let checkStatus = '';
	if (this.checked) {
		checkStatus =true;
		bodyRef.classList.add("dark-theme")
  } else {
		checkStatus =false;
		bodyRef.classList.remove('dark-theme')
  }
	setLocalData(KEY_THEME, checkStatus)
}

function checkingStatusTheme(){
	if(getLocalData(KEY_THEME) === true) {
		btnCnangeThemeRef.checked = true;
		bodyRef.classList.add("dark-theme")
	} else {
		bodyRef.classList.remove('dark-theme')
		return;
	}
}
checkingStatusTheme()

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
