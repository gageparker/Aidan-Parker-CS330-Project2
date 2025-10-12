const API_KEY = "AIzaSyBMQW6baENHCbwX56iEoOeqGsBGBBzR8_k";
const CX = "2688b078359474b44";

$("#button").click(function() {
    const query = $("#query").val().trim();
    if (!query) return; 

    $("#searchHeader").text(`Search Results for "${query}"`);
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

    $.getJSON(url, function(data) {
        $("#searchResults").empty();

        if (!data.items) {
            $("#searchResults").html("<p>No results found.</p>");
            return;
        }

        data.items.forEach(item => {
            const html = `
                <div class="result">
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.snippet}</p>
                    <a href="${item.link}" target="_blank">${item.link}</a>
                </div>
                <hr>
            `;
            $("#searchResults").append(html);
        });
    });
});

const images= [
    "CS330Project2BG.jpg",
    "background2.jpg",
    "background3.jpg",
    "background4.jpg",
];

let current = 0;
$("#MainHeader").click(function() {
    current = (current + 1) % images.length; 
    $("body").css({
        "background-image": `url(${images[current]})`,
        "background-size": "cover",
        "background-position": "center",
        "transition": "background-image 0.5s ease-in-out"
    });
});

$("#timeButton").click(function() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    
    $("#time").text(`Current Time: ${hours}:${minutes}`);
    
    $("#time").dialog({
        modal: true,
        title: "Current Time",
        width: 250,
        buttons: {
            Close: function() {
                $(this).dialog("close");
            }
        }
    });
});