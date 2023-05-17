const charitiesData = [
  {
    title: 'Save the Children',
    url:
      'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/save-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/save-image-2x.png?raw=true",
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/hope-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/hope-image-2x.png?raw=true",
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/united-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/united-image-2x.png?raw=true",
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/medical-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/medical-image-2x.png?raw=true",
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/sans-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/sans-image-2x.png?raw=true",
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/razom-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/razom-image-2x.png?raw=true",
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/hunger-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/hunger-image-2x.png?raw=true",
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/vision-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/vision-image-2x.png?raw=true",
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/pryrula-image-1x.png?raw=true",
    retinaImg: "https://github.com/vicotroshenko/bookstore/blob/main/src/images/pryrula-image-2x.png?raw=true",
  },
];

const charitiesContainerRef = document.querySelector('.js-slider-line');
const scrollBtnRef = document.querySelector('.js-btn-support');
const arrowScrollBtnRef = document.querySelector('.js-btn-arrow-pic');
const sliderBox = document.querySelector('.js-slider-box');


// slider
let offset = 0;
let counter = 0;
scrollBtnRef.addEventListener('click', ()=> {
  if(counter === 0) {
    console.log(sliderBox.offsetHeight)
    offset+=32;
    charitiesContainerRef.style.top = -offset + 'px';
  } else {
    offset-=32;
    charitiesContainerRef.style.top = -offset + 'px';
  }
  if(offset === 0){
    counter = 0;
    scrollBtnRef.style.backgroundColor = "#FFFFFF";
    arrowScrollBtnRef.style.transform = "rotate(0turn)";
    arrowScrollBtnRef.style.fill = "#4F2EE8"
  }
  if(offset >= 434 - sliderBox.offsetHeight) {
    counter = 1;
    scrollBtnRef.style.backgroundColor = "#4F2EE8";
    arrowScrollBtnRef.style.transform = "rotate(0.5turn)";
    arrowScrollBtnRef.style.fill = "#FFFFFF";
  }
});
// markup charities with logo
makeMarkup(charitiesData)

function makeMarkup(elements) {
  const markup = elements.map((element, index) => {
     const items = `<div class="charity-row">
    <a href="${element.url}" class="link">
      <span class="js-charity-number"></span>
      <div class="charity-img">
        <img srcset="${element.img} 1x, ${element.retinaImg} 2x"
        src="${element.img}" 
        alt="${element.title}"
        class="img">
      </div>
    </a>
  </div>`
  return items;
  }).join('');
  charitiesContainerRef.innerHTML = markup;
};
// add number of charity with zero ahead
const numberCharityRef = document.querySelectorAll('.js-charity-number');

numberCharityRef.forEach((number, index) => {
  if(index < 10) {
    number.textContent = "0"+(index+1)
  } else {
    number.textContent = index+1
  }
});

