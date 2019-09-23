# Interview Scheduler
Interview Scheduler is a full stack application where users can book or update their interviwes with different interviewers. 
The project has been tested through Jest and Cypress.

## Dependencies
- axios
- classnames
- normalize.css
- react-hooks-testing-library
- react-scripts
- react-test-renderer

## Setup

Install dependencies with `npm install`.
 * make sure PORT 8000 and 8001 is clear.

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory 
(NOT within our current scheduler directory) and follow the README.md instructions to configure and run the API server. 
  * Open two terminals and `npm start` both scheduler-api and scheduler simultaneously in order for the app to work properly.
  * To run in error mode => within the scheduler-api `npm run error`


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Product screenshots
1. Users can see all the interview appointments of different people and can choose the day and time slot they prefer.

![initialPage](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/1.%20all_schedules.png)

2. Users can save interviews with their name and interviewer and the expected day updates the number of spots available when an interview is booked.

![bookAppointment](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/3.%20book_appointment.png)

3. A user is presented with a confirmation/warning message when they attempt to cancel an interview and the expected day updates the number of spots available when an interview is deleted.

![deleteInterview](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/4.%20delete_appointment.png)

4. Interviews are booked through 12pm-5pm and no spots are remaining for that particular day.

![no spots remaining](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/5.%20all_spots_booked.png)

5. A user is shown an error if an interview cannot be saved.

![errorSave](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/6.error_save.png)

6. A user is shown an error if an interview cannot be deleted.

![errorDelete](https://github.com/ChaiUrs/scheduler/blob/master/screenshots/7.%20error_delete.png)
