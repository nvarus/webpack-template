import './styles/index.scss';

const getUser = (age:number, name:string):object => {

	return {
		name: name,
		age: age,
	}
}

console.log(getUser(42, 'Alexey'))

let number: number = 100

number = 10.2

console.log(number)

