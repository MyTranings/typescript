import axios from "axios";
// import google from "@types/googlemaps";

const form = document.querySelector("form")! as HTMLFormElement;
const addressField = document.getElementById("address")! as HTMLInputElement;

// type GoogleGeocodingResponse = {
//   results: {
//     formatted_address: string;
//     geometry: {
//       location: {
//         lat: number;
//         lng: number;
//       };
//     };
//     status: "OK" | "ZERO_RESULTS" | string;
//   }[];
// };
// console.log(GoogleGeocodingResponse);

function searchAddress(event: Event) {
  event.preventDefault();
  const enteredAddress = addressField.value;

  // send this to Google API
  const GOOGLE_API_KEY = "adssad";
  const GOOGLE_GEOCODE_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${GOOGLE_API_KEY}`;
  // const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;

  const fakeData = {
    results: [
      {
        formatted_address: "6th Ave, NY, USA",
        geometry: {
          location: {
            lat: 40.742903,
            lng: -73.992797799999999,
          },
        },
      },
    ],
  };

  axios
    // .get<GoogleGeocodingResponse>(GOOGLE_GEOCODE_API_URL)
    .get<{ results: {}[]; status: "OK" | "ZERO_RESULTS" | string }>(
      GOOGLE_GEOCODE_API_URL
    )
    .then((response) => {
      console.log(response);
      if (
        response.data.status !== "OK" &&
        response.data.status !== "REQUEST_DENIED"
      ) {
        throw new Error("Something went wrong!");
      }
      console.log(fakeData);
      const coordinates = fakeData.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map")! as HTMLDivElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      console.log(err);
    });
}

form!.addEventListener("submit", searchAddress);
