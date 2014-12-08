(function () {
	if (typeof require !== 'undefined') {
		_ = require('libs/underscore-min.js');
	}

	var students = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
		{"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
		{"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
		{"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
		{"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
		{"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
		{"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
		{"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
		{"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
		{"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}]

	console.log("Get all students with age between 18 and 24");
	var studentAgeRange = _.filter(students, function (s) {
		return s.age > 18 && s.age < 24;
	});

	printCollection(studentAgeRange);

	console.log("Get all students whose first name is alphabetically before their last name");
	var firstNameBeforeLast = _.filter(students, function (s) {
		return s.firstName.toLowerCase() < s.lastName.toLowerCase();
	});

	printCollection(firstNameBeforeLast);

	console.log("Get only the names of all students from Bulgaria");
	var bulgarianStudetns = _.map(
		_.filter(students, function (s) {
			return s.country === 'Bulgaria';
		}), function (s) {
			return s.firstName + ' ' + s.lastName;
		});

	console.log('\n' + bulgarianStudetns.join());
	console.log('-------------------------------------------------------------');

	console.log("Get the last five students");
	printCollection(_.last(students, 5));

	console.log("Get the first three students who are not from Bulgaria and are male");
	var firstNonBulgarianMaleStudents = _.first(
		_.filter(students, function (s) {
			return s.country !== 'Bulgaria' && s.gender === 'Male'
		}), 3);

	printCollection(firstNonBulgarianMaleStudents);

	function printCollection (collection) {
		console.log('');
		_.each(collection, function (c) {
			console.log(c.firstName + ' ' + c.lastName + ', age: ' + c.age +
				', country: ' + c.country + ', gender: ' + c.gender);
		})

		console.log('-------------------------------------------------------------');
	}
}());