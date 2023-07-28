import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./map.css";

const MapComponent = ({ placeName }) => {
  const [coordinates, setCoordinates] = useState(null);
  console.log(placeName);
  useEffect(() => {
    const handleGeocode = async () => {
      try {
        const apiKey = "AIzaSyBkcgroM0H9EID0kgAmiQI229WxMWjPz-Y";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            placeName
          )}&key=${apiKey}`
        );

        const data = await response.json();
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ latitude: lat, longitude: lng });
        } else {
          // Handle error here
        }
      } catch (error) {
        // Handle error here
      }
    };

    handleGeocode();
  }, [placeName]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBkcgroM0H9EID0kgAmiQI229WxMWjPz-Y",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Address not valid!</div>;
  }

  return (
    <div>
      {placeName && (
        <div>
          {coordinates ? (
            <div>
              <p>
                Latitude: {coordinates.latitude}, Longitude:{" "}
                {coordinates.longitude}
              </p>
              <Map lat={coordinates.latitude} lng={coordinates.longitude} />
            </div>
          ) : (
            <p>Loading coordinates...</p>
          )}
        </div>
      )}
    </div>
  );
};

function Map({ lat, lng }) {
  const center = { lat, lng };

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default MapComponent;
