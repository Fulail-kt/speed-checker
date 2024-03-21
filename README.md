# Speed Limit Checker

This project is a web application that allows users to check the speed limit for a given street address within San Francisco. It utilizes the OpenStreetMap API for geocoding and a CSV file containing speed limit data for San Francisco streets.

## Description

The Speed Limit Checker web application allows users to enter a street address, city, state, and their current speed. Upon submitting the form, the application fetches the speed limit data for the provided address from a CSV file. If the address is within San Francisco, it displays the speed limit for the corresponding street. Otherwise, it indicates that the location is not within San Francisco.

## Features

- Users can input a street address, city, state, and their current speed.
- The application fetches the speed limit data for the provided address from a CSV file.
- It displays the speed limit for the corresponding street if the address is within San Francisco.
- If the address is not within San Francisco, the application indicates so.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript) for server-side rendering
- Axios for making HTTP requests
- OpenStreetMap API for geocoding

## Installation

1. Clone the repository

```bash

   git clone https://github.com/Fulail-kt/speed-checker

   cd speed-checker
```

2. Install Dependencies

   npm install
     
4. Run the application

   npm start

4. Open your web browser and navigate to `http://localhost:3001` to view the application.

## Usage

1. Enter the street, city, state, and your current speed in the provided form fields.
2. Click the "Check Speed Limit" button to submit the form.
3. If the address is within San Francisco, the application will display the speed limit for the corresponding street.
4. If the address is not within San Francisco, the application will indicate that the location is not within San Francisco.


 
