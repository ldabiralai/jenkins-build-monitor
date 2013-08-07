$(document).ready(function () { Main.run(); });

var returnedJSON;
var returnedJSONofJob;

var Main = {
	run: function () {
		//run this every 1 second to keep up to date info
		setInterval(function () {
			JenkinsJSON.run(JenkinsJSON.mainJenkinsUrl);
		}, 500);
		//delay this so as to have JSON needed above
		setTimeout(function () {
			pageInfo.run();
		}, 501);
		
	}
}

var JenkinsJSON = {

	mainJenkinsUrl: "http://10.0.0.80:8080/job/test/",

	run: function (url) {
		JenkinsJSON.getData(url);
	},

	getData: function (url) {
		$.ajax({
			type: 'GET',
			url: url + "api/json",
			contentType: "application/json",
			dataType: 'jsonp',
			success: function (jsonp) {
				returnedJSON = jsonp;
			},
			jsonp: 'jsonp'
		});
	},

	getDataOfJob: function (url) {
		$.ajax({
			type: 'GET',
			url: url += "api/json",
			contentType: "application/json",
			dataType: 'jsonp',
			success: function (jsonp) {
				returnedJSONofJob = jsonp;
			},
			jsonp: 'jsonp'
		});
	}
}

var pageInfo = {
	run: function (jsonp) {
		setInterval(function() {
			console.log(returnedJSON.lastBuild.url);
			pageInfo.update(returnedJSON);
		}, 1001);
	},

	update: function (jsonp) {
		// update project name..
		$("#job").html('').append("Job: " + jsonp.displayName);
		
		// get current build status
		url = JenkinsJSON.getDataOfJob(jsonp.lastBuild.url);
		console.log(returnedJSONofJob);
		if(returnedJSONofJob.result == "FAILURE") {
			$("#buildStatus").removeClass();
			$("#buildStatus").addClass("fail");
		} else if (returnedJSONofJob.result == null) {
			$("#buildStatus").removeClass();
			$("#buildStatus").addClass("building");
		} else {
			$("#buildStatus").removeClass();
			$("#buildStatus").addClass("success");
		}
	}
}