# React Jobly

## Description

The goal of this exercise was to create a React front end for the Jobly backend (_see:_ [Jobly API](https://github.com/SeanBailey15/Jobly)). Though this exercise does not use my **_exact_** version of the API, a full-featured version was provided with the exercise starter code, and the exercise requirements dictated this version be used.

Students are tasked with creating a Component hierarchy, building upon an API helper class to handle communication between front and backend, client-side routing, fetching and processing data within Components, handling user authentication/authorization, and deployment of the app.

The final product here utilizes all I have learned (and continue to learn) about React, and the many tools that can be harnessed to create a React application.

## Installation

If you prefer, you can install the project locally to your machine.

However, this app is currently hosted at (TBD - will update once finished with deployment)

**_This application is built with a PostgreSQL database for the backend. Please ensure you have installed PostgreSQL before proceeding._**

For local installation, follow these instructions :

1. Clone the repository :

   ```bash
   git clone https://github.com/SeanBailey15/React_Jobly.git
   ```

2. Navigate into the directory :

   ```bash
   cd React_Jobly
   ```

3. Navigate into each subdirectory and install the dependencies :

   ```bash
   # Navigate into frontend directory and install dependencies
   cd frontend
   npm install
   ```

   ```bash
   # Navigate back to the root directory
   cd ..
   ```

   ```bash
   # Navigate into backend directory and install dependencies
   cd backend
   npm install
   ```

   ```bash
   # While in the backend directory, seed the database
   psql < jobly.sql
   # You will be prompted to confirm in the terminal
   ```

   ```bash
   # Navigate back to the root directory
   cd ..
   ```

4. Install the dependencies for the root directory :

   ```bash
   # Your working directory here should be /React_Jobly
   npm install
   ```

5. Run the app :

   ```bash
   # Your working directory here should be /React_Jobly
   # The following script will launch the front end and backend simultaneously
   npm run start
   # The front end is set to run on http://localhost:5173/
   ```

\*_The terminal window will display a `Ctrl + click`-able link to the app_

## Now What?

The app contains routes that are protected from non-registered users. Your first step should be to register. After that, you can explore the app at will.

Check out the "Company Directory", where you can filter companies by name and number of employees.

Click on a company to see more information about them, as well as what job openings they may be hiring for.

See a job you like? Click the link to see more information about the job. If you want to apply, simply click the "Apply" button at the bottom of the job listing.

Click the user profile icon in the upper-right corner of the navbar. Here you can edit your user information.

## Thank you for checking out my project!

Again, this app is being hosted at (TBD - will update once finished with deployment)

Please stop by and have a look!

## Contact Me

You can reach out to me on social media:

- [Discord](https://discordapp.com/users/792831510515548220)
- [LinkedIn](https://www.linkedin.com/in/sean-bailey-619723279)
- [Facebook](https://www.facebook.com/profile.php?id=61556172566858)

Feel free to connect with me on any of these platforms!

I welcome any and all feedback with an open mind, and open arms!
