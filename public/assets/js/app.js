$(document).on("click", "#scrape_button", function () {

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/scrape"
	}).done(function (data) {
		console.log(data);
		alert(data.tedad + " articles added!");
		//setTimeout(function() { location.reload(); }, 3000);
		location.reload();

	});
});