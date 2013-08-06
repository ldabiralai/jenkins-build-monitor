$(document).ready(function () { Main.run(); });

var Main = {
	run: function () {
		console.log("running...");
		JenkinsJSON.run();
	}
}

var JenkinsJSON = {

	mainJenkinsUrl: "http://10.0.0.80:8080",

	run: function () {
		console.log("JSON functions running");
		console.log(JenkinsJSON.mainJenkinsUrl);
		JenkinsJSON.getData();
	},

	getData: function () {
		$.getJSON(JenkinsJSON.mainJenkinsUrl + "/api/json", function(json) {
			console.log("Result: " + json.jobs.color);
		})
	}
}