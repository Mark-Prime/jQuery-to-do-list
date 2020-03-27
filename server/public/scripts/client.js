console.log('js');

let importanceArray = ['Do it Later', 'Not Important', 'Moderate', 'Important', 'Very Important']

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
function handleCheck() {
    let id = this.id
    let data = {};
    if ($(this).is(':checked')) {
        data.status = 'YES';
    } else {
        data.status = 'NO';
    }

    $.ajax({
        type: 'PUT',
        url: `/list/${id}`,
        data
    }).then(function (response) {
        console.log('response:', response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

function handleDelete() {
    let id = this.id

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
            $.ajax({
                type: 'DELETE',
                url: `/list/${id}`
            }).then(function (response) {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
                getList();
            }).catch(function (error) {
                console.log('error in GET', error);
            });
        }
    })
}

function handleAddButton(event) {
    event.preventDefault();

    if ($('#in-title').val() !== ''){
        let data = {};
        data.name = $('#in-title').val();
        data.importance = $('#select-importance').val();
        data.notes = $('#in-notes').val();


        $.ajax({
            type: 'POST',
            url: `/list`,
            data
        }).then(function (response) {
            console.log('response:', response);
            getList();
        }).catch(function (error) {
            console.log('error in GET', error);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must include a Task Title!',
        })
    }
}

function handleSearch(event) {
    event.preventDefault();

    let data = { searchFor: $('#in-search').val()};

    $('#in-search').val('');

    $.ajax({
        type: 'POST',
        url: `/list/search`,
        data
    }).then(function (response) {
        console.log('response:', response);
        renderList(response)
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

// Search
function getList() {
    console.log('in getList');
    
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('getList response is', response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

function getThisList(toSearch) {
    console.log('in getThisList');

    $.ajax({
        type: 'GET',
        url: `/list/sort/${toSearch}`
    }).then(function (response) {
        console.log('getThisList response is', response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

function getImporList(toSearch) {
    console.log('in getImporList');
    
    $.ajax({
        type: 'GET',
        url: `/list/${toSearch}`
    }).then(function (response) {
        console.log('getImporList response is', response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}


// Rendering to DOM
function renderList(items) {
    $('#listTable').empty();
    for (let item of items) {
        $('#listTable').append(`<tr>`);
        if (item.completed === 'YES') {
            $('#listTable').append(`<td class="border-right"><input type="checkbox" class="chk-complete" id="${item.id}" checked></td>`);
        } else {
            $('#listTable').append(`<td class="border-right"><input type="checkbox" class="chk-complete" id="${item.id}" ></td>`);
        }
        $('#listTable').append(`<td>${item.name}</td>`);
        $('#listTable').append(`<td>${item.notes}</td>`);
        $('#listTable').append(`<td>${importanceArray[item.importance - 1]}</td>`);
        $('#listTable').append(`<td><button class="btn btn-outline-danger my-2 my-sm-0 btn-delete" type="button" id="${item.id}">DELETE</button></td>`);
        $('#listTable').append(`</tr>`);
    }
}
