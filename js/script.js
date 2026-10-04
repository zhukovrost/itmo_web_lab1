const modal = document.getElementById('orderModal');
const openBtn = document.querySelector('.icon-btn--cart');
const closeBtn = modal.querySelector('[data-close]');
const form = document.getElementById('orderForm');
const success = document.getElementById('orderSuccess');

function openModal() {
  form.hidden = false;
  success.hidden = true;
  form.reset();
  modal.classList.add('modal--open');
}

function closeModal() {
  modal.classList.remove('modal--open');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  form.hidden = true;
  success.hidden = false;
});
