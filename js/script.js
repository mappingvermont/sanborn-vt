
// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet) {
    Tabletop.init({
        key: dataSpreadsheet,
        callback: startUpLeafet,
        simpleSheet: true,
        debug: false
    });

    divNode = "";

    // This function gets our data from our spreadsheet
    // Then gets it ready for Leaflet.
    // It creates the marker, sets location
    // And plots on it on our map

    function startUpLeafet(tabletopData) {
    	    var map = new L.Map('map', {
        center: new L.LatLng(44.260144, -72.574553),
        zoom: 18,
        minZoom: 8,
        maxZoom: 21,
        layers: [HERE_satelliteDay, BFSanborn]
    });

        // Tabletop creates arrays out of our data
        // We'll loop through them and create markers for each

        for (var num = 0; num < tabletopData.length; num++) {
            // Our table columns
            var name = tabletopData[num].name;
            var imageLink = tabletopData[num].imagelink;
            var imageDescription = tabletopData[num].imagedescripton;

            // Pull in our lat, long information
            var dataLat = tabletopData[num].latitude;
            var dataLong = tabletopData[num].longitude;

            // Add to our marker
            marker_location = new L.LatLng(dataLat, dataLong);

            // Create the marker
            layer = new L.Marker(marker_location);

            // Create the popup
            var divNode = document.createElement('DIV' + num);
            var popup = "<div class='popup_box_header'><strong>" + name + "</strong></div>";
            popup += "<hr />";
            popup += "<img style='height:auto; width:auto; max-width:300px; max-height:300px;' src=" + imageLink + ">";
            popup += "<hr />" + imageDescription;

            // Add to our marker

            divNode.innerHTML = popup
            layer.bindPopup(divNode, {
                maxWidth: 800,
                autoPan: true
            });

            // Add marker to our to map
            map.addLayer(layer);
        }

        // initialize leaflet-hash
        var hash = new L.Hash(map);
    };

    var BFSanborn = new L.tileLayer('http://mapping-vt-tiles.s3.amazonaws.com/sanborn/{z}/{x}/{y}.png', {
  attribution: '<a href="http://www.loc.gov/rr/geogmap/sanborn/city.php?CITY=Montpelier&stateID=52" target="_blank">Library of Congress</a>',
      minZoom: 15,
      maxZoom: 21
});



    var HERE_satelliteDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com" target="_blank">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: '0pJkGAtXILXbrXNdW6Dm',
        app_code: 'LenN6iBjo2q1FHUo5bxccw',
        base: 'aerial',

        minZoom: 0,
        maxZoom: 20

    });

    BFSanborn.setOpacity(0.7);

    $(function() {
        $("#slider").slider({
            range: "max",
            min: 0,
            max: 10,
            value: 7,

            slide: function(event, ui) {
                BFSanborn.setOpacity(ui.value * 0.1);
                //alert( ui.value );
            }
        });
    });

};

$(document).ready(function() {
    initializeTabletopObject('0AiMWlGsLkMgodFpIVFU5Y2hWLWJGNjc4RTZtak9qcmc');
});

// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;

// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();

// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();

$('.toggle_description').click(function() {
    if (isVisibleDescription === false) {
        $('.description_box_cover').show();

        // Add Sidebar header into our description box
        // And 'Scroll to read more...' text on wide mobile screen
        $('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');

        // Add the rest of our sidebar content, credit information
        $('.description_box_text').html(sidebarContent + '<br />');
        $('#caption_box').html('Credits: ' + creditsContent);
        $('.description_box').show();

        isVisibleDescription = true;

    } else {

        $('.description_box').hide();
        $('.description_box_cover').hide();

        isVisibleDescription = false;

    }

});
