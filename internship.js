//Подключение JSON, nativeJS
var requestEventsURL = 'http://localhost:3000/Events';
var requestEvents = new XMLHttpRequest();
requestEvents.open('GET', requestEventsURL);
requestEvents.responseType = 'json';
requestEvents.send();

var requestIncidentsURL = 'http://localhost:3000/Incidents';
var requestIncidents = new XMLHttpRequest();
requestIncidents.open('GET', requestIncidentsURL);
requestIncidents.responseType = 'json';
requestIncidents.send();

var Events = {};
var Incidents = {};
var events = {};

requestEvents.onload = function() {
    Events = requestEvents.response;
    //100 seconds
}

requestIncidents.onload = function() {
    Incidents = requestIncidents.response;
    //100 seconds
}

function formObject() {
    events = {Events, Incidents};
    //console.log(events.Events.length);
}

//Реализация механизма сортировки столбцов с различными типами данных

var getRows = tbl.querySelectorAll('tr');
var clearRows = Array.from(getRows);
clearRows.splice(0, 2);

idSortTable = function (index, mult) {
    clearRows.sort(function(firstRow, secondRow) {
        var firstCell = firstRow.querySelectorAll('td')[index].innerText;
        var secondCell = secondRow.querySelectorAll('td')[index].innerText;
        return (firstCell - secondCell) * mult;
    });

    while (tbl.rows.length > 2)
            tbl.deleteRow(2);
    for (var i = 0; i < clearRows.length; i++)
        tbl.appendChild(clearRows[i]);
}

dateSortTable = function (index, mult) {
    clearRows.sort(function(firstRow, secondRow) {
        var firstCell = firstRow.querySelectorAll('td')[index].innerHTML;
        var firstDate = moment(firstCell);
        var secondCell = secondRow.querySelectorAll('td')[index].innerHTML;
        var secondDate = moment(secondCell);

        switch(true) {
            case firstDate > secondDate: return 1 * mult;
            case firstDate < secondDate: return -1 * mult;
            case firstDate === secondDate: return 0;
        }
    });

    while (tbl.rows.length > 2)
            tbl.deleteRow(2);
    for (var i = 0; i < clearRows.length; i++)
        tbl.appendChild(clearRows[i]);
}

stringSortTable = function (index, mult) {
    clearRows.sort(function(firstRow, secondRow) {
        var firstCell = firstRow.querySelectorAll('td')[index].innerHTML;
        var secondCell = secondRow.querySelectorAll('td')[index].innerHTML;

        switch(true) {
            case firstCell > secondCell: return 1 * mult;
            case firstCell < secondCell: return -1 * mult;
            case firstCell === secondCell: return 0;
        }
    });

    while (tbl.rows.length > 2)
            tbl.deleteRow(2);
    for (var i = 0; i < clearRows.length; i++)
        tbl.appendChild(clearRows[i]);
}

intSortTable = function (index, mult) {
    clearRows.sort(function(firstRow, secondRow) {
        var firstCell = firstRow.querySelectorAll('td')[index].innerHTML;
        var secondCell = secondRow.querySelectorAll('td')[index].innerHTML;
        return (firstCell - secondCell) * mult;
    });

    while (tbl.rows.length > 2)
            tbl.deleteRow(2);
    for (var i = 0; i < clearRows.length; i++)
        tbl.appendChild(clearRows[i]);
}

realSortTable = function (index, mult) {
    clearRows.sort(function(firstRow, secondRow) {
        var firstCell = firstRow.querySelectorAll('td')[index].innerHTML;
        firstCell = firstCell.replace(',', '.');
        firstCell = parseFloat(firstCell);

        var secondCell = secondRow.querySelectorAll('td')[index].innerHTML;
        secondCell = secondCell.replace(',', '.');
        secondCell = parseFloat(secondCell);

        return (firstCell - secondCell) * mult;
    });

    while (tbl.rows.length > 2)
            tbl.deleteRow(2);
    for (var i = 0; i < clearRows.length; i++)
        tbl.appendChild(clearRows[i]);
}

//Главная функция сортировки по клику
sortingEventList = function (tr) {
    var directions = Array.from(tr.children).map(function() {
        return '';
    });

    for (var i = 0; i <tr.children.length; i++) {
        tr.children[i].style.cursor = 'pointer';
        (function(x) {
            tr.children[x].addEventListener('click', function(event) {

            var index = 0;
            var cell = event.target;
            var row = cell.parentElement;
            var columns = row.children;
            for (index; index < columns.length; index++) {
                if (columns[index] === cell)
                    break;
            }

            var direction = directions[index] || 'direct';
            var factor = (direction === 'direct') ? 1 : -1;

            if (index === 0)
                idSortTable(index, factor);
            else if (index === 1 || index === 2) {
                dateSortTable(index, factor);
            }
            else if (index > 2 && index < 11)
                stringSortTable(index, factor);
            else if (index === 11)
                intSortTable(index, factor);
            else if (index > 11)
                realSortTable(index, factor);

            for (var j = 0; j < tr.children.length; j++) {
                var textCell = tr.children[j].innerHTML;
                var lastSymbol = textCell[textCell.length - 1];
                if (lastSymbol === '↓' || lastSymbol === '↑') {
                    tr.children[j].innerHTML = tr.children[j].innerHTML.substring(0, tr.children[j].innerHTML.length - 1);
                }
            }
            if (factor === 1)
                tr.children[x].innerHTML = tr.children[x].innerHTML + '↓';
            else if (factor === -1)
                tr.children[x].innerHTML = tr.children[x].innerHTML + '↑';
            directions[index] = direction === 'direct' ? 'reverse' : 'direct';
            });
        })(i)
    }
}
