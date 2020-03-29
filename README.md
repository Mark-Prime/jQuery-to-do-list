![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# To do List

## Description

_Duration: Weekend Project_

This project I decided to make a todo list page with javascript, jQuery, and SQL. This was my first "big" project using SQL so I tried to come up with as many ways to have it included as possible. I came up with the idea of having buttons on the navbar that sort and order the tasks be done with SQL on the server. The SQL portion of the project is actually really simple but I feel it adds a lot to the overall useability and general quality of the project.

I put a lot of effort into styling in this project, specifically using bootstrap. I tried to keep a generally paper themed aesthetic, so everything in the page is generally very white or atleast grayscale. The only real colors that appear are the ones that are accociated with paper (such as the dark brown in the clip board image or the red-ink colored lines through completed tasks). I feel the project visually is one of my strongest so far.

One major benefit of using bootstrap is that the website actually scales very well to different sizes. On mobile it does look a little weird, the table ends up being longer than the container its in so you see the background of the table end shortly before the delete button. At the moment I don't fully know how to fix this but its something I hope to learn shortly.

I really enjoy the way I decided to sort tasks on the DOM, using SQL I was able to seperate the completed and incomplete tasks then sort them again based on the most important tasks and finally it sorts by the name of the task. The sorting changes as well based on the buttons clicked on the navbar, for example selecting by importance only sorts by completed and the title of the task.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Express and Postgres (both can be installed by typing `npm install` into the console)

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm start` in your terminal
5. Open localhost:5000 in your browser and enjoy the app.

## Usage

### Add a task to the To-Do List

1. Type a task title into the Task Title text section. (Optionally add a note as well)
2. Select the level of importance of the task.
3. Hit Add or Enter on your keyboard to add the task to the To-Do List.

### Mark a task as complete

1. Find the task you want to mark as completed.
2. Click on the checkbox to the left of the task title.
3. You'll know it was successfully marked as completed when you see the title, notes, and importance all crossed off with a red line.
4. To mark the task as incomplete again just reclick the checkbox.

### Delete a task

1. Find the task you wish to delete.
2. Click on the Delete button to the right of the task importance.
3. An alert will appear on screen asking you if you are sure you want to delete that task.
4. If you are sure click `Yes, delete it.`
5. Another alert will pop up letting you know the deleting was successful.

### Sorting The Task List

1. Decide how you would like to sort (Complete, Incomplete, or level of importance)
2. Click the button at the top left of the screen.
3. If you want to sort by importance make sure to click the importance level you wish to sort by.
4. To return to everything again, click `Home`.

### Searching through the tasks

1. Decide the word/words you would like to search.
2. Locate the search bar at the top right of the screen on the navbar. 
3. Type the word you wish to search into the search bar.
4. Hit search or Enter on your keyboard.
5. The Tasks are now showing on the ones including the word/words you searched in the title or the notes.

## Built With

 - HTML
 - CSS
 - Javascript
 - jQuery
 - Bootstrap
 - Express
 - Postgres
 - SweetAlerts