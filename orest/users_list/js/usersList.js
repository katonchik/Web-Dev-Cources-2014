var user = {
	avatar : faker.internet.avatar(),
	name : faker.name.firstName(),
	lastName : faker.name.lastName(),
	email : faker.internet.email()
}

console.log(user);

/*var tempSource = document.getElementById('users_template');
console.log(tempSource);
var tableTemplate = Handlebars.compile(tempSource);

function generateUsers(number) {
	var tableOutput = document.querySelector('.table__body')
	for (var i = number; i >= 0; i--) {

	}
}*/