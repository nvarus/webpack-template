import './styles/index.scss';

const getUser = (age:number, name:string):object => {

	return {
		name: name,
		age: age,
	}
}

console.log(getUser(42, 'Alexey'))

let number: number | string = 100

number = 10.2
number = 'alx'

console.log(number)

const userName = document.querySelector('.userName')
userName?.addEventListener('click', () => {
	console.log('hello')
})