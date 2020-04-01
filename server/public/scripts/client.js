console.log('js');

// Used to convert the importance numbers to the words shown on the DOM
let importanceArray = ['Do it Later', 'Not Important', 'Moderate', 'Important', 'Very Important']

// When document is ready
$(document).ready(function () {
    console.log('JQ');
    getList();
    $('#select-importance').val(3)
    $('#btn-add').on('click', handleAddButton)
    $('#btn-search').on('click', handleSearch)
    $('#listTable').on('change', '.chk-complete', handleCheck)
    $('#listTable').on('click', '.btn-delete', handleDelete)


}); // end doc ready

// Buttons

// Updates the database and DOM when an item is checked/marked completed
function handleCheck() {

    // gets the ID
    let id = this.id

    // initialized the data
    let data = {};

    // Checks if the checkbox was checked to complete or incomplete
    if ($(this).is(':checked')) {
        // Box was checked
        data.status = 'YES';

        // adds the line-through
        $(`.${id}`).css('text-decoration', 'line-through');
    } else {
        // box not checked
        data.status = 'NO';

        // removed the line-through
        $(`.${id}`).css('text-decoration', 'none');
    } // ends if checked


    // requests the server to update the database
    $.ajax({
        type: 'PUT',
        url: `/list/${id}`,
        data
    }).then(function (response) {
        console.log('response:', response); // expect OK
    }).catch(function (error) {
        console.log('error in GET', error);
    }); // ends ajax
} // ends handleCheck

// deletes items from the database
function handleDelete() {
    // gets the ID
    let id = this.id

    // Uses Sweet Alerts to Ask the user to confirm the delete request
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            // User confirmed they wanted to delete the item
            $.ajax({
                type: 'DELETE',
                url: `/list/${id}`
            }).then(function (response) {
                // confirms to the user it was deleted
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
                // Regathers the new list without that item
                getList();
            }).catch(function (error) {
                console.log('error in GET', error);
            });
        } // Nothing happens when the user decides not to delete
    })
} // ends handleDelete

// adds item to the database
function handleAddButton(event) {
    // Prevents page refresh
    event.preventDefault();

    // Checks if input is valid
    if ($('#in-title').val() !== ''){
        // initialized data
        let data = {};

        // adds values to data from the DOM
        data.name = $('#in-title').val();
        data.importance = $('#select-importance').val();
        data.notes = $('#in-notes').val();


        // sends the data to the server using ajax
        $.ajax({
            type: 'POST',
            url: `/list`,
            data
        }).then(function (response) {
            console.log('response:', response); // expect OK

            // Clears inputs
            $('#in-title').val('');
            $('#select-importance').val(3);
            $('#in-notes').val('');

            // rerenders the list with the new item added to it
            getList();
        }).catch(function (error) {
            console.log('error in GET', error);
        });
    } else {
        // if not valid

        // uses Sweet Alerts to let the user know how to make it valid
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must include a Task Title!',
        })
    }
} // ends handleAddButton

// Finds items in the database based on the search bar
function handleSearch(event) {
    // Prevents page refresh
    event.preventDefault();

    // Creates data to send to the server based on the search bar on the DOM
    let data = { searchFor: $('#in-search').val()};

    // Sends data to the server in order to get back the search results
    $.ajax({
        type: 'POST',
        url: `/list/search`,
        data
    }).then(function (response) {
        console.log('response:', response); // expect OK

        // clear Search Bar input
        $('#in-search').val('');
        
        // render search results
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // ends handleSearch

// collects all items from the databse
function getList() {
    console.log('in getList');
    
    // uses ajax to request all items
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('getList response is', response); // expect OK

        // render the items
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // ends getList

// get a specific list (completed or incomplete)
function getThisList(toSearch) {
    console.log('in getThisList');

    // gets the list of all items that are completed or incomplete based on the button pressed
    $.ajax({
        type: 'GET',
        url: `/list/sort/${toSearch}`
    }).then(function (response) {
        console.log('getThisList response is', response); // expect OK

        // renders the results to the dom
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // ends getThisList

// gets all items from the server of a specific importance level (1-5)
function getImporList(toSearch) {
    console.log('in getImporList');
    
    // requests the items from the server
    $.ajax({
        type: 'GET',
        url: `/list/${toSearch}`
    }).then(function (response) {
        console.log('getImporList response is', response); // expect OK

        // render the results to the DOM
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // ends getImporList


// Rendering to DOM

// Renders the List to the DOM and makes the buttons useable
function renderList(items) {
    $('#listTable').empty();
    for (let item of items) {
        // appends the <tr> to the DOM
        $('#listTable').append(`<tr id="tr-${item.id}">`);

        // Adds the checkbox checked or not based on if its completed or not.
        if (item.completed === 'YES') {
            $('#listTable').append(`<td class="border-right"><input type="checkbox" class="chk-complete" id="${item.id}" checked></td>`);
        } else {
            $('#listTable').append(`<td class="border-right"><input type="checkbox" class="chk-complete" id="${item.id}" ></td>`);
        }

        // appends the rest of the information based on each item
        $('#listTable').append(`<td><span class="text-danger ${item.id}"><span class="text-dark">${item.name}</span></span></td>`);
        $('#listTable').append(`<td><span class="text-danger ${item.id}"><span class="text-dark">${item.notes}</span></span></td>`);
        $('#listTable').append(`<td><span class="text-danger ${item.id}"><span class="text-dark">${importanceArray[item.importance - 1]}</span></span></td>`);
        $('#listTable').append(`<td><button class="btn btn-outline-danger my-2 my-sm-0 btn-delete" type="button" id="${item.id}">DELETE</button></td>`);
        $('#listTable').append(`</tr>`); // ends the <tr>

        // Adds the red slash if nessesary 
        if (item.completed === 'YES') {
            $(`.${item.id}`).css('text-decoration', 'line-through');
        } else {
            $(`.${item.id}`).css('text-decoration', 'none');
        } // ends if completed
    }// ends for...of loop
}// ends renderList
