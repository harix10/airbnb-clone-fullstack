document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Retrieve data securely from HTML attributes
    const coordinatesString = mapElement.getAttribute('data-coordinates');
    const listingTitle = mapElement.getAttribute('data-title');
    
    const listingCoordinates = JSON.parse(coordinatesString);
    
    // GeoJSON format stores coordinates as [longitude, latitude]
    // Leaflet expects [latitude, longitude]
    const lon = listingCoordinates[0];
    const lat = listingCoordinates[1];

    // Initialize the Leaflet map
    const map = L.map('map').setView([lat, lon], 13);

    // Set up the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create a custom red Airbnb-style home icon
    const airbnbIcon = L.divIcon({
        className: '', // Removes the default Leaflet div icon styles
        html: `
            <div style="
                background-color: #FF385C; 
                width: 36px; 
                height: 36px; 
                border-radius: 50%;
                display: flex; 
                justify-content: center; 
                align-items: center; 
                box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
                border: 2px solid white;
            ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 3L2 12h3v8h14v-8h3L12 3zm-1 15h-2v-4h4v4h-2z"/>
                </svg>
            </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });

    // Add a marker pointing to the location with the custom icon
    L.marker([lat, lon], { icon: airbnbIcon }).addTo(map)
        .bindPopup(`<b>${listingTitle}</b><br>Exact location provided after booking.`)
        .openPopup();
});