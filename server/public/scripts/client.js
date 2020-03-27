console.log('js');

let importanceArray = ['Do it Later', 'Not Important', 'Moderate', 'Important', 'Very Important']

$(document).ready(function () {
    console.log('JQ');
    getList();

}); // end doc ready

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
        url: `/list/${toSearch}`
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

function renderList(items) {
    $('#listTable').empty();
    for (let item of items) {
        $('#listTable').append(`<tr>`);
        if (item.completed === 'YES') {
            $('#listTable').append(`<td><input type="checkbox" class="chk-complete" id="${item.id}" checked></td>`);
        } else {
            $('#listTable').append(`<td><input type="checkbox" class="chk-complete" id="${item.id}" ></td>`);
        }
        $('#listTable').append(`<td>${item.name}</td>`);
        $('#listTable').append(`<td>${item.notes}</td>`);
        $('#listTable').append(`<td>${importanceArray[item.importance - 1]}</td>`);
        $('#listTable').append(`<td></td>`);
        $('#listTable').append(`</tr>`);
    }
}
