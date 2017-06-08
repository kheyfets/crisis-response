var socket = io('/');

socket.on('alert:new', function (data) {
	var table = document.querySelector('.dash');

	var row = document.createElement('tr');

	var priority = document.createElement('td');

	if (data.priority == 3) {
		priority.innerHTML = "<span class=\"label label-danger\">High</span>";
	} else if (data.priority == 2) {
		priority.innerHTML = "<span class=\"label label-info\">Medium</span>";
	} else {
		priority.innerHTML = "<span class=\"label label-success\">Low</span>";
	}

	var issueType = document.createElement('td');
	issueType.innerHTML = data.issueType;

	var flightNumber = document.createElement('td');
	flightNumber.innerHTML = data.flightNumber;

	var comments = document.createElement('td');
	comments.innerHTML = data.comments;

	var status = document.createElement('td');
	status.innerHTML = data.status;

	var dateCol = document.createElement('td');
	var date = new Date(data.created);
	console.log(data.created);
	dateCol.innerHTML = (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.toTimeString().substring(0, 5);

	row.appendChild(priority);
	row.appendChild(issueType);
	row.appendChild(flightNumber);
	row.appendChild(comments);
	row.appendChild(status);
	row.appendChild(dateCol)

	var action = document.createElement('td');
	action.innerHTML = "<span class=\"glyphicon glyphicon-th\"></span>";

	row.appendChild(action);
	
	table.appendChild(row);
});