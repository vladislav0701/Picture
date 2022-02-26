import { getResource } from '../services/requests';


const showMoreStyles = (trigger, wrapper) => {
	const btn = document.querySelector(trigger);

	btn.addEventListener('click', function() {
		getResource('http://localhost:3000/styles')
			.then(res => createCards(res))
			.catch(() => errorMessage());

		this.remove();
	});

	function errorMessage() {
		let message = document.createElement('div');
		message.classList.add('status');
		message.textContent = 'Что-то пошло не так...';
		message.style.cssText = 'font-size: 1.7rem; color: red; margin: 40px';
		document.querySelector(wrapper).appendChild(message);
	}

	function createCards(response) {
		response.forEach(({src, title, link}) => {
			let card = document.createElement('div');

			card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

			card.innerHTML = `
				<div class="styles-block">
					<img src=${src} alt=${title}>
					<h4>${title}</h4>
					<a href=${link}>Подробнее</a>
				</div>
			`;

			document.querySelector(wrapper).appendChild(card);
		})
	}
};

export default showMoreStyles;