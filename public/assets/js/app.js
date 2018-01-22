$(document).on("click", "#scrape_button", function() {

	$.ajax({
			type: "POST",
			dataType: "json",
			url: "/scrape"
		})

		.done(function(data) {
			console.log(data);
		});
});