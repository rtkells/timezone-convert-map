# Timezone Converter

This application aims to make the process of converting between timezones less confusing through visualization. The user can pick two points on the map and click "calculate" to display the current times in each location. Then, if needed, the user can edit either calculated timestamp to instantly calculate different times.

Please keep in mind, this application can only display and convert times given in the 24 hour format (for now). (ex: if you want to type in 5:34 PM, you will need to type in 17:34)

# Usage

This project is available on [github pages!](https://rtkells.github.io/timezone-convert-map/) The setup below only applies if you would like to use this project locally.

# Prerequisites

- Node.js
- npm
- A valid Google Maps API key
- A valid GeoNames API username

# Configuration

This project uses the Google Maps and GeoNames APIs, and as such, you are required to have information for both to function as intended.

## Google Maps API Key

Refer to [this link](https://developers.google.com/maps/documentation/javascript/get-api-key) for setting up your Google Maps API Key.

## GeoNames API username

1. Go to the GeoNames [website](https://www.geonames.org) and create a free account
2. After registering, go to the [account management page](https://www.geonames.org/manageaccount) and locate where the page says "Free Web Services"
3. Click the link to activate web services for your account

# Installation

1. Clone the repository:

   ```
   git clone https://github.com/rtkells/timezone-convert-map.git
   ```
2. Navigate to the project directory:

   ```
   cd timezone-convert-map
   ```
3. Install any dependencies:
   
   ```
   npm install
   ```
4. Create a .env file in the root to add your Google Maps API key and GeoNames username
   
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_GEONAMES_USERNAME=your_geonames_username
   ```
5. Start the development server

   ```
   npm start
   ```

# Acknowledgements
- Google Maps API (For interacting and displaying the map)
- GeoNames API (For reverse geolocation and timezone information)
- moment-timezone (For timezone conversions)
- Material UI (For the user interface)
