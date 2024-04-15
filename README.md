# Capstone: Restaurant Reservation System
## Live site:
https://starter-restaurant-reservation-1.onrender.com/dashboard

## Technology Used

### Frontend
ReactJS
CSS
JSX

### Backend
Postgres (knex)
NodeJS
Express

## Summary
Periodic Tables is a reservation system for fine dining restaurants. The software is used only by restaurant personnel when a customer calls to request a reservation.

## Installation

1. Fork and clone this repository
1. Run `npm install`
1. Run `npm reset` from back-end folder to rollback, migrate, and seed the database
1. Run `npm start` from starter-restaurant-reservation folder

# Features

## Manage Reservations
Managing reservations can be done via the Dashboard.

The dashboard by default lists the tables and any reservations that are for the current day. Using the previous and next buttons, users are able to cycle through the days to look at reservations, past or future.

The tables and their availability are listed in a table on the main page.

(./images/manageRes.png)

## Create a Reservation
Creating a reservations is done by clicking 'New Reservation' on the navigation bar.

(./images/createRes.png)

## Searching for a Reservation
Users can search for a particular reservation by the mobile number associated with the reservation. This can be done by clicking the 'Search' option in the left-hand navigation.

(./images/searchRes.png)

## Edit Reservation
Users can also edit existing reservations if information needs to be changed and updated.

(./images/editRes.png)

## Manage Tables
Expanding the restaurant? Create new tables by selecting the 'New Table' option in the left-hand navigation.

(./images/manageTables.png)

# API

## Create Reservation
**Post** `/reservations`

Required Body:
1. `first_name` `str`
1. `last_name`  `str`
1. `party` `int`
1. `reservation_date` `date`
1. `reservation_time` `str`
1. `mobile_number` `str`

## Get Reservations by Date
`/reservations/:reservation_id`

### Available Methods
**GET** - Returns a reservations given an existing reservation ID
**PUT** = Modifies an existing reservation given an existing reservation ID

Required Body:
1. `first_name` `str`
1. `last_name`  `str`
1. `party` `int`
1. `reservation_date` `date`
1. `reservation_time` `str`
1. `mobile_number` `str`

## Get Reservation Status
**GET** `/reservations/:reservation_id/status`
Returns a status of [`booked, seated, finished, canceled`] for the particular reservation

## Get Tables
**GET** `/tables`
Returns the available tables

## Create Table
**POST** `/tables`
Creates a table to be listed in the table list

Required Body
1. `table_name` `str`
1. `capacity`  `int`

## Update Table Status

**PUT** `/tables/:table_id/seat`
Sets table status to occupied and ties a `restaurant_id` to it

Required Body
1. `reservation_id` `int`

## Finish Table

**DELETE** `/tables/:table_id/seat`
Sets the table status to `free` and the acoompanying reservation status to `finished`

Required Body
1. `reservation_id` `int`