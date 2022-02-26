import { getResource } from '../services/requests';

const calc = (size, material, options, promocode, result) => {
	const sizeBlock = document.querySelector(size),
		  materialBlock = document.querySelector(material),
		  optionsBlock = document.querySelector(options),
		  promocodeBlock = document.querySelector(promocode),
		  resultBlock = document.querySelector(result);

	let sum = 0, sizeValue = '', materialValue = '0', optionsValue = '0';
	let state;

	getResource('assets/dbPrice.json')
				.then(res => state = res)
				.catch(error => console.log(error));

	function changePrice (event, elem) {
		elem.addEventListener(event, (e) => {
			const target = e.target,
                  select = target.id;
			
			function calcFunc(state) {
				for (let key in state[select]) {
					if (elem.value === key) {
						switch(select) {
							case "size":
								sizeValue = state[select][key];
								break;
							case "material":
								materialValue = state[select][key];
								break;
							case "options":
								optionsValue = state[select][key];
								break;
							default:
								return () => {}
						}
					}
				}
				sum = Math.round((+sizeValue) * (+materialValue) + (+optionsValue));
				
				if (sizeBlock.value == '' || materialBlock.value == '') {
					resultBlock.textContent = "Пожалуйта, выберите размер и материал картины";
				} else if (promocodeBlock.value === 'IWANTPOPART') {
					resultBlock.textContent = Math.round(sum * 0.7);
				} else {
					resultBlock.textContent = sum;
				}
			}
			calcFunc(state);
			// console.log(sizeValue, materialValue, optionsValue)
		})
	};

	changePrice('change', sizeBlock);
	changePrice('change', materialBlock);
	changePrice('change', optionsBlock);
	changePrice('input', promocodeBlock);

};

export default calc;