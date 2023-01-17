import React, { useEffect, useState } from 'react';
import HeaderBar from "../components/HeaderBar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

const Home = () => {
    const [dataMap, setDataMap] = useState()
    const [inputData, setInputData] = useState()
    useEffect(() => {
        const center = { lat: -5, lng: 123 };
        const input = document.getElementById("pac-input");
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
            types: ["establishment"],
        };
        const google = window.google
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center,
            disableDefaultUI: true,
            zoomControl: true,
            draggingCursor: "all-scroll",
            gestureHandling: "greedy",
            clickableIcons: false,
            maxZoom: 22,
            minZoom: 1,
            tilt: 45,

        });
        setDataMap(map)

        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.bindTo("bounds", map);
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");

        infowindow.setContent(infowindowContent);

        const marker = new google.maps.Marker({
            map,
            anchorPoint: new google.maps.Point(0, -29),
        });

        autocomplete.addListener("place_changed", () => {
            infowindow.close();
            marker.setVisible(false);

            const place = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-address"].textContent =
                place.formatted_address;
            infowindow.open(map, marker);
        });

    }, [])
    return (
        <div>
            <HeaderBar>
                <Card style={{ width: "380px", height: "90px", position: "absolute", top: "100px", left: "200px", padding: "20px", zIndex: 2 }}>
                    <CardContent>
                        <TextField
                            style={{ width: "100%", marginTop: "-18px" }}
                            id="pac-input"
                            label="Search Location"
                            type="search"
                            variant="filled"
                        />
                    </CardContent>
                </Card>
                <div id="map" style={{ height: "calc(90vh)", width: "100%" }} />
                <div id="infowindow-content">
                    <span id="place-name" className="title"></span><br />
                    <span id="place-address"></span>
                </div>
            </HeaderBar>

        </div>
    )
}
export default Home