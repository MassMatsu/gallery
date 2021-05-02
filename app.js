import { selector } from './util/selector.js';

function Gallery(element) {
  this.section = element;
  this.list = [...element.querySelectorAll('.img')];
  this.modal = selector('.modal');
  this.imageName = selector('.image-name');
  this.mainImg = selector('.main-img');
  this.modalImages = selector('.modal-images');
  this.closeBtn = selector('.close-btn');
  this.prevBtn = selector('.prev-btn');
  this.nextBtn = selector('.next-btn');

  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);

  this.section.addEventListener('click', (e) => {
    if (e.target.classList.contains('img')) {
      this.openModal(e.target, this.list);
    }
  });
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.modal.classList.add('open');
  this.setMainImage(selectedImage);
  this.setModalImages(selectedImage, list);
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.chooseImage);
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.mainImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.setModalImages = function (selectedImage, list) {
  this.modalImages.innerHTML = list
    .map((image) => {
      console.log(image);
      return `<img 
    src="${image.src}" 
    title="${image.title}" 
    class="${
      selectedImage.dataset.id === image.dataset.id
        ? 'modal-img selected'
        : 'modal-img'
    }" 
    alt="${image.alt}" 
    data-id="${image.dataset.id}" 
    />`;
    })
    .join('');
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.chooseImage);
};

Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;

  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};

Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.previousElementSibling || this.modalImages.lastElementChild;

  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};

Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected')
    
    selected.classList.remove('selected')
    e.target.classList.add('selected')
    this.setMainImage(e.target);
  }
};

const nature = new Gallery(selector('.nature'));
const city = new Gallery(selector('.city'));
