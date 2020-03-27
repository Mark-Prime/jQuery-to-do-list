console.log('js');

$(document).ready(function () {
    console.log('JQ');
    getList();

}); // end doc ready

function getList() {
    console.log('in getList');
    // ajax call to server to get koalas
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('getList response is', response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // end getKoalas

function renderList(items) {
    $('#listTable').empty();
    for (let item of items) {
        $('#listTable').append(`<tr>`);
        $('#listTable').append(`<td>${item.name}</td>`);
        $('#listTable').append(`<td>${item.notes}</td>`);
        $('#listTable').append(`<td>${item.importance}</td>`);
        if (item.completed === 'YES') {
            $('#listTable').append(`<td>DONE</td>`);
        } else {
            $('#listTable').append(`<td></td>`);
        }
        $('#listTable').append(`<td></td>`);
        $('#listTable').append(`</tr>`);
    }
}
