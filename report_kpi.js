Dict = {
    kpi1: [{ priority: 'Низкий', time: 4, timeView: 1.5 }, { priority: 'Средний', time: 2, timeView: 1 }, { priority: 'Высокий', time: 0.4, timeView: 0.2 }],
    kpi2: [{ priority: 'Низкий', time: 24 }, { priority: 'Средний', time: 8 }, { priority: 'Высокий', time: 4 }],
    kpi1New: { time: 2 }
};

workerRegionList = [
    {
        name: 'Московский регион',
        region: [{ region: 'fill.moscow.srsh.ru' }],
        kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
        allevent: 0,
        inWork: 0,
        kpi2: [
            { priority: 1, eventCount: 0, offHour: 0 },
            { priority: 2, eventCount: 0, offHour: 0 },
            { priority: 3, eventCount: 0, offHour: 0 }
        ],
        kpi3: 0,
        kpi4: { grade:0, eventCount: 0}
    },
    {
        name: 'Учет и Отчетность',
        region: [{ region: 'other.buh.volzhsky.srsh.ru' }],
        kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
        allevent: 0,
        inWork: 0,
        kpi2: [
            { priority: 1, eventCount: 0, offHour: 0 },
            { priority: 2, eventCount: 0, offHour: 0 },
            { priority: 3, eventCount: 0, offHour: 0 }
        ],
        kpi3: 0,
        kpi4: { grade: 0, eventCount: 0 }
    },
    {
        name: 'Ярославская площадка',
        region: [{ region: 'fill.yaroslavl.srsh.ru' }, { region: 'zavod.yaroslavl.srsh.ru' }],
        kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
        allevent: 0,
        inWork: 0,
        kpi2: [
            { priority: 1, eventCount: 0, offHour: 0 },
            { priority: 2, eventCount: 0, offHour: 0 },
            { priority: 3, eventCount: 0, offHour: 0 }
        ],
        kpi3: 0,
        kpi4: { grade: 0, eventCount: 0 }
    },
    {
        name: 'Омская площадка',
        region: [{ region: 'fill.omsk.srsh.ru' }, { region: 'zavod.omsk.srsh.ru' }],
        kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
        allevent: 0,
        inWork: 0,
        kpi2: [
            { priority: 1, eventCount: 0, offHour: 0 },
            { priority: 2, eventCount: 0, offHour: 0 },
            { priority: 3, eventCount: 0, offHour: 0 }
        ],
        kpi3: 0,
        kpi4: { grade: 0, eventCount: 0 }
    }
];

incident = [];//
typeWorkerArr = [{ value: '0', text: 'Сотрудник' }, { value: '1', text: 'Подрядчик' }];
filterInWork_dStart = '01.01.2022';
filterInWork_dEnd = '01.04.2022';
filterInWork_workerType = 2;
events_curr_type_filter = [];


//var myCalenderIn;
//var myCalenderOut;
document.onload = function() {
    document.getElementById('dContent').innerHTML='';
    document.getElementById('dHeaderLogoText').innerText = 'Статистика и Отчеты -> Отчет по KPI';
    document.title = 'HD IT -> Статистика и Отчеты -> Отчет по KPI';
}

//init = function () {
    //master.init('report', null, false);
    //document.getElementById('dContent').innerHTML='';
    //document.getElementById('dHeaderLogoText').innerText = 'Статистика и Отчеты -> Отчет по KPI';
    //document.title = 'HD IT -> Статистика и Отчеты -> Отчет по KPI';
    //loadEvent(filterInWork_dStart, filterInWork_dEnd);
    //common.loadJs('/WebComponents/Master/Calendar/CalendarPicker.js', function () { });
    //common.loadCss('/WebComponents/Master/Calendar/CalendarPicker.style.css');
//}

//init();

//Подключение JSON

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

setTimeout(formObject, 1000);
// loadEvent = function (dStart, dEnd) {
//     master.Wait(10);
//     $.ajax({ 
//         cache: false,
//         url: 'controller/report_kpi_it.ashx?a=eventList&dStart=' + dStart + '&dEnd=' + dEnd,
//         success: function (html) {
//             events = JSON.stringify(html);
//             events = JSON.parse(events);
//             if (typeof events != 'object') {
//                 events = JSON.parse(events);
//             }
            
//             normalizeEvent();
//         },
//         error: function (request, status, error) {
//             alert(request.responseText);
//             alert(status);
//             alert(error);
//         }
//     });
// }

normalizeEvent = function () {
    document.getElementById('dContent').innerHTML = '';
    workerRegionList = [
        {
            name: 'Московский регион',
            region: [{ region: 'fill.moscow.srsh.ru' }],
            kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
            allevent: 0,
            inWork: 0,
            kpi2: [
                { priority: 1, eventCount: 0, offHour: 0 },
                { priority: 2, eventCount: 0, offHour: 0 },
                { priority: 3, eventCount: 0, offHour: 0 }
            ],
            kpi3: 0,
            kpi4: { grade: 0, eventCount: 0 }
        },
        {
            name: 'Учет и Отчетность',
            region: [{ region: 'other.buh.volzhsky.srsh.ru' }],
            kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
            allevent: 0,
            inWork: 0,
            kpi2: [
                { priority: 1, eventCount: 0, offHour: 0 },
                { priority: 2, eventCount: 0, offHour: 0 },
                { priority: 3, eventCount: 0, offHour: 0 }
            ],
            kpi3: 0,
            kpi4: { grade: 0, eventCount: 0 }
        },
        {
            name: 'Ярославская площадка',
            region: [{ region: 'fill.yaroslavl.srsh.ru' }, { region: 'zavod.yaroslavl.srsh.ru' }],
            kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
            allevent: 0,
            inWork: 0,
            kpi2: [
                { priority: 1, eventCount: 0, offHour: 0 },
                { priority: 2, eventCount: 0, offHour: 0 },
                { priority: 3, eventCount: 0, offHour: 0 }
            ],
            kpi3: 0,
            kpi4: { grade: 0, eventCount: 0 }
        },
        {
            name: 'Омская площадка',
            region: [{ region: 'fill.omsk.srsh.ru' }, { region: 'zavod.omsk.srsh.ru' }],
            kpi1: { allEvent: 0, outOfHour: 0, inHour: 0 },
            allevent: 0,
            inWork: 0,
            kpi2: [
                { priority: 1, eventCount: 0, offHour: 0 },
                { priority: 2, eventCount: 0, offHour: 0 },
                { priority: 3, eventCount: 0, offHour: 0 }
            ],
            kpi3: 0,
            kpi4: { grade: 0, eventCount: 0 }
        }
    ];
    var k = 0;
    var kpi2;
    var kpi1;

    //цикл пробегает по событиям из JSON, и устанавливает значения kpi в элементы листа, соотвествующим регионам
    for (var i = 0; i < events.Events.length; i++) {
        //установка нужного коэффициента k для фиксирования региона
        switch (events.Events[i].Worker.Region.Code) {
            case 'fill.moscow.srsh.ru':
                k = 0;
                break;
            case 'other.buh.volzhsky.srsh.ru':
                k = 1;
                break;
            case 'fill.yaroslavl.srsh.ru':
                k = 2;
                break;
            case 'zavod.yaroslavl.srsh.ru':
                k = 2;
                break;
            case 'fill.omsk.srsh.ru':
                k = 3;
                break;
            case 'zavod.omsk.srsh.ru':
                k = 3;
                break;
        }
//         //
        switch  (filterInWork_workerType) {                                             
            case 0: //для сотрудников
                if (!events.Events[i].Worker.IsOutsource) {
                    //работа с kpi1
                    workerRegionList[k].kpi1.allEvent++;
                    if (events.Events[i].TimeInWorkClear > Dict.kpi1New.time) {
                        workerRegionList[k].kpi1.outOfHour++;
                    }
                    else {
                        workerRegionList[k].kpi1.inHour++;
                    }
                    //
                    //работа с kpi2
                    if (events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') {
                        switch (events.Events[i].Priority) {
                            case 'Низкий':
                                kpi2 = 0;
                                break;
                            case 'Средний':
                                kpi2 = 1;
                                break;
                            case 'Высокий':
                                kpi2 = 2;
                                break;
                        }
                        workerRegionList[k].kpi2[kpi2].eventCount++;

                        if (events.Events[i].TimeWorkAll > Dict.kpi2[kpi2].time) {
                            workerRegionList[k].kpi2[kpi2].offHour++;
                        }

                    }
                    //
                    //работа с kpi3
                    workerRegionList[k].kpi3 = workerRegionList[k].kpi3 + events.Events[i].TimeIncident;
                    //
                    //работа с kpi4
                    if (events.Events[i].Grade >= 1 && events.Events[i].Grade < 6) {
                        workerRegionList[k].kpi4.grade = workerRegionList[k].kpi4.grade + events.Events[i].Grade;
                        workerRegionList[k].kpi4.eventCount++;
                    }
                    //
                }
                //
                break;
            //
            //для подрядчиков (аутсорсеры)
            case 1:
                if (events.Events[i].Worker.IsOutsource) {
                    workerRegionList[k].kpi1.allEvent++;
                    if (events.Events[i].TimeInWorkClear > Dict.kpi1New.time) {
                        workerRegionList[k].kpi1.outOfHour++;
                    }
                    else {
                        workerRegionList[k].kpi1.inHour++;
                    }

                    if (events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') {
                        switch (events.Events[i].Priority) {
                            case 'Низкий':
                                kpi2 = 0;
                                break;
                            case 'Средний':
                                kpi2 = 1;
                                break;
                            case 'Высокий':
                                kpi2 = 2;
                                break;
                        }
                        workerRegionList[k].kpi2[kpi2].eventCount++;

                        if (events.Events[i].TimeWorkAll > Dict.kpi2[kpi2].time) {
                            workerRegionList[k].kpi2[kpi2].offHour++;
                        }

                    }

                    workerRegionList[k].kpi3 = workerRegionList[k].kpi3 + events.Events[i].TimeIncident;

                    if (events.Events[i].Grade >= 1 && events.Events[i].Grade < 6) {
                        workerRegionList[k].kpi4.grade = workerRegionList[k].kpi4.grade + events.Events[i].Grade;
                        workerRegionList[k].kpi4.eventCount++;
                    }
                }
                break;
            //
            default:
                workerRegionList[k].kpi1.allEvent++;
                if (events.Events[i].TimeInWorkClear > Dict.kpi1New.time) {
                    workerRegionList[k].kpi1.outOfHour++;
                }
                else {
                    workerRegionList[k].kpi1.inHour++;
                }

                if (events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') {
                    switch (events.Events[i].Priority) {
                        case 'Низкий':
                            kpi2 = 0;
                            break;
                        case 'Средний':
                            kpi2 = 1;
                            break;
                        case 'Высокий':
                            kpi2 = 2;
                            break;
                    }
                    workerRegionList[k].kpi2[kpi2].eventCount++;

                    if (events.Events[i].TimeWorkAll > Dict.kpi2[kpi2].time) {
                        workerRegionList[k].kpi2[kpi2].offHour++;
                    }

                }

                workerRegionList[k].kpi3 = workerRegionList[k].kpi3 + events.Events[i].TimeIncident;

                if (events.Events[i].Grade >= 1 && events.Events[i].Grade < 6) {
                    workerRegionList[k].kpi4.grade = workerRegionList[k].kpi4.grade + events.Events[i].Grade;
                    workerRegionList[k].kpi4.eventCount++;
                }
                break;
        }
    }
    //цикл пробегает по инцидентам
    for (var i = 0; i < events.Incidents.length; i++) {
        //фиксирование региона
        switch (events.Incidents[i].Region) {
            case 'fill.moscow.srsh.ru':
                k = 0;
                break;
            case 'other.buh.volzhsky.srsh.ru':
                k = 1;
                break;
            case 'fill.yaroslavl.srsh.ru':
                k = 2;
                break;
            case 'zavod.yaroslavl.srsh.ru':
                k = 2;
                break;
            case 'fill.omsk.srsh.ru':
                k = 3;
                break;
            case 'zavod.omsk.srsh.ru':
                k = 3;
                break;
        }
        //
        var kpi3Is = true;
        for (var j = 0; j < incident.length; j++) {
            if (events.Incidents[i].Service != undefined) {
                if (incident[j].k == k && incident[j].name == events.Incidents[i].Service.Name) {
                    kpi3Is = false;
                }
            }
        }

        if (kpi3Is) {
            if (events.Incidents[i].TimeNotWork > 0) {
                var newEl = {};
                newEl.k = k;
                newEl.name = events.Incidents[i].Service.Name;
                newEl.value = Math.round((events.Incidents[i].TimeNotWork / (60 * 60)) * 100) / 100;
                switch (events.Incidents[i].OperationMode) {
                    case 1:
                        newEl.min = ((176.0 * (100.0 - events.Incidents[i].Service.Availability)) / 100.0) * 3;
                        newEl.inPeriod = 176.0 * 3;
                        break;
                    case 2:
                        newEl.min = ((240.0 * (100.0 - events.Incidents[i].Service.Availability)) / 100.0) * 3;
                        newEl.inPeriod = 240.0 * 3;
                        break;
                    case 3:
                        newEl.min = ((720.0 * (100.0 - events.Incidents[i].Service.Availability)) / 100.0) * 3;
                        newEl.inPeriod = 720.0 * 3;
                        break;
                }

                incident.push(newEl);
            }
        }
    }

    //master.Wait(100);
    renderHead();
}

setTimeout(normalizeEvent, 1000);

renderHead = function () {
    var tbl = document.createElement('table');
    tbl.id = 'headTable';
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = '<h2>Отчет по KPI</h2>';
    tr.appendChild(td);
    td = document.createElement('td');
    td.className = 'lnkTd';
    td.innerHTML = '<span id="lnkBtn" onclick="exportToExcel();"><img src="/images/note.png" />выгрузить в эксель</span>';
    tr.appendChild(td);

    tbl.appendChild(tr);
    
    // tr = document.createElement('tr');
    // td = document.createElement('td');
    // td.colSpan = 2;
    // td.innerHTML = 'first cell';
    // tr.appendChild(td);
    // td = document.createElement('td');
    // td.innerHTML = 'second cell';
    // tr.appendChild(td);

    // tbl.appendChild(tr);
    // document.getElementById('dContent').appendChild(tbl);

    renderFilter();
}

renderFilter = function() {
    var fieldset = document.createElement('fieldset');
    fieldset.className = 'text_block';
    var p = document.createElement('p');
    p.className = 'filterLnkContainer';
    p.onclick = function () { renderFilterPanelVisible(); };
    p.innerHTML = '<span id="filterStartBtn" class=""><img src="/images/filter.png" /> Фильтры</span>';
    fieldset.appendChild(p);
    var dv = document.createElement('div');
    dv.id = 'FilterInfoPanel';
    dv.innerText = 'Текущие даты отчета: с ' + filterInWork_dStart + ' по ' + filterInWork_dEnd;
    fieldset.appendChild(dv);

    var dv = document.createElement('div');
    dv.id = 'FilterInfoPanel';
    switch (filterInWork_workerType) {
        case 0:
            dv.innerText = 'Исполнители: только сотрудники';
            break;
        case 1:
            dv.innerText = 'Исполнители: только подрядчики';
            break;
        default:
            dv.innerText = 'Исполнители: все';
            break;
    }
    
    fieldset.appendChild(dv);

    document.getElementById('dContent').appendChild(fieldset);
    renderForm();
    renderFilterPanel();
}

renderForm = function () {
    renderForm_kpi1();
    renderForm_kpi2();
    renderForm_kpi3();
    renderForm_kpi4();
}

renderForm_kpi1 = function () {
    var h3 = document.createElement('h3');
    h3.innerText = ' Время принятия в работу';
    document.getElementById('dContent').appendChild(h3);

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    var td = document.createElement('td');
    td.innerText = '';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Всего';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Количество обращений со взятием в работу > ' + Dict.kpi1New.time + ' ч.';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Нарушение';
    tr.appendChild(td);
    tbl.appendChild(tr);

    for (var i = 0; i < workerRegionList.length; i++) {
        if (workerRegionList[i].kpi1.allEvent != 0) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.className = 'regionTd';
            td.innerText = workerRegionList[i].name;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' + workerRegionList[i].kpi1.allEvent + '</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, ''); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, ''); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, ''); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, ''); };
                    break;
            }
            tr.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' + workerRegionList[i].kpi1.outOfHour + '</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'OutOffHour'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'OutOffHour'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'OutOffHour'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'OutOffHour'); };
                    break;
            }
            tr.appendChild(td);


            var td = document.createElement('td');
            td.innerText = (Math.round((workerRegionList[i].kpi1.outOfHour / workerRegionList[i].kpi1.allEvent) * 10000) / 100) + '%';
            tr.appendChild(td);

            tbl.appendChild(tr);
        }
    }

    document.getElementById('dContent').appendChild(tbl);
}

renderForm_kpi2 = function () {
    var h3 = document.createElement('h3');
    h3.innerText = ' Время выполнения обращений по поддержке сервисов (Консультация и Инцидент)';
    document.getElementById('dContent').appendChild(h3);

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    var td = document.createElement('td');
    td.innerText = '';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Приоритет и количество обращений с нарушением лимита времени выполнения';
    td.colSpan = 3;
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = '';
    tr.appendChild(td);
    tbl.appendChild(tr);

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    var td = document.createElement('td');
    td.innerText = '';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Высокий, ' + Dict.kpi2[2].time + ' ч.';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Средний, ' + Dict.kpi2[1].time + ' ч.';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Низкий, ' + Dict.kpi2[0].time + ' ч.';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Нарушения';
    tr.appendChild(td);
    tbl.appendChild(tr);

    for (var i = 0; i < workerRegionList.length; i++) {
        if (workerRegionList[i].kpi1.allEvent != 0) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.className = 'regionTd';
            td.innerText = workerRegionList[i].name;
            tr.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' + Math.round((workerRegionList[i].kpi2[2].offHour / workerRegionList[i].kpi2[2].eventCount) * 10000) / 100 + '% ('+ workerRegionList[i].kpi2[2].offHour + ' из ' + workerRegionList[i].kpi2[2].eventCount + ')</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'priority3'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'priority3'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'priority3'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'priority3'); };
                    break;
            }
            tr.appendChild(td);

            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' + Math.round((workerRegionList[i].kpi2[1].offHour / workerRegionList[i].kpi2[1].eventCount) * 10000) / 100 + '% (' + workerRegionList[i].kpi2[1].offHour + ' из ' + workerRegionList[i].kpi2[1].eventCount + ')</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'priority2'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'priority2'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'priority2'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'priority2'); };
                    break;
            }
            tr.appendChild(td);

            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' + Math.round((workerRegionList[i].kpi2[0].offHour / workerRegionList[i].kpi2[0].eventCount) * 10000) / 100 + '% (' + workerRegionList[i].kpi2[0].offHour + ' из ' + workerRegionList[i].kpi2[0].eventCount + ')</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'priority1'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'priority1'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'priority1'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'priority1'); };
                    break;
            }
            tr.appendChild(td);

            var td = document.createElement('td');
            var badEv = workerRegionList[i].kpi2[0].offHour + workerRegionList[i].kpi2[1].offHour + workerRegionList[i].kpi2[2].offHour;
            var allEv = workerRegionList[i].kpi2[0].eventCount + workerRegionList[i].kpi2[1].eventCount + workerRegionList[i].kpi2[2].eventCount;

            td.innerHTML = '<span class="lnk">' + (Math.round((badEv / allEv) * 10000) / 100) + '% (' + badEv + ' из ' + allEv + ')</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'kons&inc'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'kons&inc'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'kons&inc'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'kons&inc'); };
                    break;
            }
            tr.appendChild(td);
            tbl.appendChild(tr);
        }
    }

    document.getElementById('dContent').appendChild(tbl);
}

renderForm_kpi3 = function () {
    var h3 = document.createElement('h3');
    h3.innerText = ' Доступность сервисов';
    document.getElementById('dContent').appendChild(h3);

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    var td = document.createElement('td');
    td.innerText = '';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Сервис';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Время недоступности (в часах)';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Лимит простоя (в часах)';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Простой';
    tr.appendChild(td);
    tbl.appendChild(tr);

    for (var i = 0; i < incident.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.className = 'regionTd';
        td.innerText = workerRegionList[incident[i].k].name;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerText = incident[i].name;
        td.className = 'lnk';
        td.onclick = function () { renderIncidentList('', ''); };
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerText = incident[i].value;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerText = Math.round(incident[i].min * 100) / 100;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerText = Math.round((incident[i].value / incident[i].inPeriod) * 10000) / 100 + ' % (' + incident[i].value + ' из ' + incident[i].inPeriod + ')';
        tr.appendChild(td);
        tbl.appendChild(tr);
    }

    document.getElementById('dContent').appendChild(tbl);
}

renderForm_kpi4 = function () {
    var h3 = document.createElement('h3');
    h3.innerText = ' Средняя удовлетворенность заказчика по каждому обращению';
    document.getElementById('dContent').appendChild(h3);

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    var td = document.createElement('td');
    td.innerText = '';
    td.className = 'regionTd';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerText = 'Средняя оценка';
    tr.appendChild(td);
    tbl.appendChild(tr);

    for (var i = 0; i < workerRegionList.length; i++) {
        if (workerRegionList[i].kpi1.allEvent != 0) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.className = 'regionTd';
            td.innerText = workerRegionList[i].name;
            tr.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = '<span class="lnk">' +  Math.round((workerRegionList[i].kpi4.grade / workerRegionList[i].kpi4.eventCount) * 100) / 100 + '</span>';
            switch (i) {
                case 0:
                    td.onclick = function () { renderEventList(0, 'grade'); };
                    break;
                case 1:
                    td.onclick = function () { renderEventList(1, 'grade'); };
                    break;
                case 2:
                    td.onclick = function () { renderEventList(2, 'grade'); };
                    break;
                case 3:
                    td.onclick = function () { renderEventList(3, 'grade'); };
                    break;
                case 5:
                    td.onclick = function () { renderEventList(5, 'grade'); };
                    break;
            }

            tr.appendChild(td);
            tbl.appendChild(tr);
        }
    }

    document.getElementById('dContent').appendChild(tbl);
}

renderFilterPanel= function () {
    //.Wait(9);
    var container = document.createElement('div');
    container.id = 'filterPanelBg';
    container.style.display = 'none';
    document.getElementById('dContent').appendChild(container);

    container.onclick = function () { closeFilterPanel(); };
    var dv = document.createElement('div');
    dv.id = 'filterPanel';
    dv.style.display = 'none';
    var h2 = document.createElement('h2');
    h2.innerText = 'Фильтры';
    dv.append(h2);

    filterBlockCreate(dv, 'Тип исполнителя', 'WorkerType', typeWorkerArr);
    filterBlockCreateDate(dv, 'Дата с:', 'DateStart', filterInWork_dStart);
    filterBlockCreateDate(dv, 'Дата по:', 'DateEnd', filterInWork_dEnd);

    var dvbtn = document.createElement('div');
    dvbtn.id = 'dvFilterSearchPanel';

    var span = document.createElement('span');
    span.id = 'filterSearchOkBtn';
    span.onclick = function () { applyFilter(); };
    span.innerText = 'Применить';
    dvbtn.appendChild(span);
    dv.appendChild(dvbtn);

    document.getElementById('dContent').appendChild(dv);
    myCalenderIn = new CalendarPicker('#myCalendarWrapper', { });
    myCalenderOut = new CalendarPicker('#myCalendarWrapperOut', { });

    var dStart_Year = filterInWork_dStart.split('.')[2];
    var dStart_Month = filterInWork_dStart.split('.')[1] - 1;
    var dStart_Date = filterInWork_dStart.split('.')[0];

    var dEnd_Year = filterInWork_dEnd.split('.')[2];
    var dEnd_Month = filterInWork_dEnd.split('.')[1] - 1;
    var dEnd_Date = filterInWork_dEnd.split('.')[0];

    myCalenderIn.value = new Date(dStart_Year, dStart_Month, dStart_Date);
    myCalenderOut.value = new Date(dEnd_Year, dEnd_Month, dEnd_Date);
    //master.Wait(100);
}

filterBlockCreate = function (dv, titleRu, tp, arr) {
    var title = document.createElement('p');
    title.className = 'bTitle';
    title.innerText = titleRu;
    var span = document.createElement('span');
    span.id = 'FilterBlock_' + tp + '_Title';
    span.innerText = '↑';
    title.appendChild(span);
    title.onclick = function () { filterBlockDisplayChange(tp); };
    dv.append(title);

    var dvblock = document.createElement('div');
    dvblock.id = 'FilterBlock_' + tp;
    dvblock.style.display = 'none';
    for (var i = 0; i < arr.length; i++) {
        var p = document.createElement('p');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.value = arr[i].text;
        p.appendChild(input);
        p.appendChild(document.createTextNode(' ' + arr[i].text));
        dvblock.appendChild(p);
    }

    var WorkerTypeChbk = dvblock.getElementsByTagName('input');
    switch (filterInWork_workerType) {
        case 0:
            WorkerTypeChbk[0].checked = true;
            WorkerTypeChbk[1].checked = false;
            break;
        case 1:
            WorkerTypeChbk[0].checked = false;
            WorkerTypeChbk[1].checked = true;
            break;
        default:
            WorkerTypeChbk[0].checked = true;
            WorkerTypeChbk[1].checked = true;
            break;
    }

    dv.appendChild(dvblock); 
}

filterBlockCreateDate = function (dv, titleRu, tp, currentDate) {
    var title = document.createElement('p');
    title.className = 'bTitle';
    title.innerText = titleRu;
    var span = document.createElement('span');
    span.id = 'FilterBlock_' + tp + '_Title';
    span.innerText = '↑';
    title.appendChild(span);
    title.onclick = function () { filterBlockDisplayChange(tp); };
    dv.append(title);

    var dvblock = document.createElement('div');
    dvblock.id = 'FilterBlock_' + tp;
    dvblock.style.display = 'none';

    var subDiv = document.createElement('div');
    if (tp == 'DateStart') {
        subDiv.id = 'myCalendarWrapper';
    }
    else {
        subDiv.id = 'myCalendarWrapperOut';
    }
    
    dvblock.appendChild(subDiv);

    dv.appendChild(dvblock);
}

renderEventList = function (region, tp) {
    var div = document.createElement('div');
    div.style.border = '1px solid black'; //edited
    div.id = 'divEventListBg';
    div.innerHTML = "Закрыть таблицу"; //edited
    div.style.cursor = 'pointer';   //edited
    div.onclick = function () { closeEventList(); };
    document.getElementById('dContent').appendChild(div);

    var divContainer = document.createElement('div');
    divContainer.id = 'divEventList';
    divContainer.style.border = '1px solid black';

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';
    tbl.id = 'reportEventTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, 'Дата', 2);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, 'Исполнитель', 4);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, 'Время', 3);
    tbl.appendChild(tr);

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    serviceAddTd(tr, '№', 1);
    serviceAddTd(tr, 'Создания', 1);
    serviceAddTd(tr, 'Закрытия', 1);
    serviceAddTd(tr, 'Приоритет', 1);
    serviceAddTd(tr, 'Тип', 1);
    serviceAddTd(tr, 'Сервис', 1);
    serviceAddTd(tr, 'ФИО', 1);
    serviceAddTd(tr, 'Регион', 1);
    serviceAddTd(tr, 'Подразделение', 1);
    serviceAddTd(tr, 'Подрядчик', 1);
    serviceAddTd(tr, 'Состояние', 1);
    serviceAddTd(tr, 'Оценка', 1);
    serviceAddTd(tr, 'Реакции', 1);
    serviceAddTd(tr, 'Взятия в работу', 1);
    serviceAddTd(tr, 'Выполнения', 1);

    sortingEventList(tr);

    tbl.appendChild(tr);

    for (var i = 0; i < events.Events.length; i++) {
        var isFilterRegion = false;
        var isFilterTp = false;
        var isFilterWorkerType = false;

        switch (region) {
            case 0:
                if (events.Events[i].Worker.Region.Code == 'fill.moscow.srsh.ru') {
                    isFilterRegion = true;
                }
                break;
            case 1:
                if (events.Events[i].Worker.Region.Code == 'other.buh.volzhsky.srsh.ru') {
                    isFilterRegion = true;
                }
                break;
            case 2:
                if (events.Events[i].Worker.Region.Code == 'fill.yaroslavl.srsh.ru' || events.Events[i].Worker.Region.Code == 'zavod.yaroslavl.srsh.ru') {
                    isFilterRegion = true;
                }
                break;
            case 3:
                if (events.Events[i].Worker.Region.Code == 'fill.omsk.srsh.ru' || events.Events[i].Worker.Region.Code == 'zavod.omsk.srsh.ru') {
                    isFilterRegion = true;
                }
                break;
            default:
                isFilterRegion = true;
                break;
        }

        switch (tp) {
            case 'OutOffHour':
                if (events.Events[i].TimeInWorkClear > Dict.kpi1New.time) {
                    isFilterTp = true;
                }
                break;
            case 'inHour':
                if (events.Events[i].TimeInWorkClear <= 3) {
                    isFilterTp = true;
                }
                break;
            case 'priority3':
                if ((events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') && events.Events[i].Priority == 'Высокий' && events.Events[i].TimeWorkAll > Dict.kpi2[2].time) {
                    isFilterTp = true;
                }
                break;
            case 'priority2':
                if ((events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') && events.Events[i].Priority == 'Средний' && events.Events[i].TimeWorkAll > Dict.kpi2[1].time) {
                    isFilterTp = true;
                }
                break;
            case 'priority1':
                if ((events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') && events.Events[i].Priority == 'Низкий' && events.Events[i].TimeWorkAll > Dict.kpi2[0].time) {
                    isFilterTp = true;
                }
                break;
            case 'kons&inc':
                if ((events.Events[i].Type == 'Консультация' || events.Events[i].Type == 'Инцидент') && ((events.Events[i].Priority == 'Низкий' && events.Events[i].TimeWorkAll > Dict.kpi2[0].time) || (events.Events[i].Priority == 'Высокий' && events.Events[i].TimeWorkAll > Dict.kpi2[2].time) || (events.Events[i].Priority == 'Средний' && events.Events[i].TimeWorkAll > Dict.kpi2[1].time))) {
                    isFilterTp = true;
                }
                break;
            case 'grade':
                if (events.Events[i].Grade > 0) {
                    isFilterTp = true;
                }
                break;
            default:
                isFilterTp = true;
                break;
        }

        switch (filterInWork_workerType) {
            case 0:
                if (!events.Events[i].Worker.IsOutsource) {
                    isFilterWorkerType = true;
                }
                break;
            case 1:
                if (events.Events[i].Worker.IsOutsource) {
                    isFilterWorkerType = true;
                }
                break;
            default:
                isFilterWorkerType = true;
                break;
        }

        if (isFilterRegion && isFilterTp && isFilterWorkerType) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = '<a href="http://web.moscow.srsh.ru/order_view.aspx?id=' + events.Events[i].Id + '">' + events.Events[i].Id + '</a>';;
            tr.appendChild(td);
            serviceAddTd(tr, '<i></i>' + normalizeDate(events.Events[i].DateCreate), 1);
            serviceAddTd(tr, '<i></i>' + normalizeDate(events.Events[i].DateOut), 1);
            serviceAddTd(tr, events.Events[i].Priority, 1);
            serviceAddTd(tr, events.Events[i].Type, 1);
            serviceAddTd(tr, events.Events[i].Service.Name, 1);
            serviceAddTd(tr, events.Events[i].Worker.Fio, 1);
            serviceAddTd(tr, events.Events[i].Worker.Region.Name, 1);
            serviceAddTd(tr, events.Events[i].Worker.Otd, 1);
            if (events.Events[i].Worker.IsOutsource) {
                serviceAddTd(tr, 'Да', 1);
            }
            else {
                serviceAddTd(tr, '', 1);
            }
            serviceAddTd(tr, events.Events[i].Status, 1);
            serviceAddTd(tr, events.Events[i].Grade, 1);
            serviceAddTd(tr, events.Events[i].TimeReaction, 1, 'TimeReaction');
            serviceAddTd(tr, events.Events[i].TimeInWorkClear, 1, 'TimeInWorkClear');
            serviceAddTd(tr, events.Events[i].TimeWorkAll, 1, 'TimeWorkAll');
            tr.classList.add('table_tr');
            tbl.appendChild(tr);
        }
    }

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

    renderEventList_infoPanel(divContainer, region, tp);

    divContainer.appendChild(tbl);

    document.getElementById('dContent').appendChild(divContainer);
}

renderIncidentList = function (region, tp) {
    var div = document.createElement('div');
    div.id = 'divEventListBg';
    div.style.cursor = 'pointer';
    div.style.color = 'red';
    div.onclick = function () { closeEventList(); };
    document.getElementById('dContent').appendChild(div);

    var divContainer = document.createElement('div');
    divContainer.id = 'divEventList';

    var tbl = document.createElement('table');
    tbl.className = 'reportTbl';
    tbl.id = 'reportEventTbl';

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, 'Дата', 2);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, '', 1);
    serviceAddTd(tr, 'Время', 1);
    tbl.appendChild(tr);

    var tr = document.createElement('tr');
    tr.className = 'headTable';
    serviceAddTd(tr, '№', 1);
    serviceAddTd(tr, 'Создания', 1);
    serviceAddTd(tr, 'Закрытия', 1);
    serviceAddTd(tr, 'Сервис', 1);
    serviceAddTd(tr, 'Регион', 1);
    serviceAddTd(tr, 'Неработоспособности', 1);
    tbl.appendChild(tr);
    for (var i = 0; i < events.Incidents.length; i++) {
        var isFilterRegion = true;
        var isFilterTp = true;

        if (isFilterRegion && isFilterTp) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = '<a href="/incident/view/?id=' + events.Incidents[i].Id + '">' + events.Incidents[i].Id + '</a>';;
            tr.appendChild(td);
            serviceAddTd(tr, normalizeDate(events.Incidents[i].DateCreate), 1);
            serviceAddTd(tr, normalizeDate(events.Incidents[i].DateEnd), 1);
            serviceAddTd(tr, events.Incidents[i].Service.Name, 1);
            serviceAddTd(tr, events.Incidents[i].Region.Name, 1);
            serviceAddTd(tr, Math.round((events.Incidents[i].TimeNotWork / (60 * 60)) * 100) / 100, 1);
            tbl.appendChild(tr);
        }
    }

    renderEventList_infoPanel(divContainer, region, tp);

    divContainer.appendChild(tbl);

    document.getElementById('dContent').appendChild(divContainer);
}

serviceAddTd = function (tr, text, colspan, tp) {
    var td = document.createElement('td');
    if (colspan > 1) {
        td.className = 'tdLong';
        td.colSpan = colspan;
    }
    if (tp != undefined && (tp == 'TimeReaction' || tp == 'TimeInWorkClear' || tp == 'TimeWorkAll')) {
        td.innerHTML = (text + '').replace('.', ',');
    }
    else {
        td.innerHTML = text;
    }
    
    tr.appendChild(td);
}

renderEventList_infoPanel = function (divContainer, region, tp) {
    var textInfo = '';
    switch (region) {
        case 0:
            textInfo = 'Регион: Москва';
            break;
        case 1:
            textInfo = 'Регион: Волжский';
            break;
        case 2:
            textInfo = 'Регион: Ярославль';
            break;
        case 3:
            textInfo = 'Регион: Омск';
            break;
        default:
            textInfo = 'Регион: Все';
            break;
    }
    switch (tp) {
        case 'OutOffHour':
            textInfo = textInfo + ', Время принятия в работу > ' + Dict.kpi1New.time + ' ч.';
            break;
        case 'p3kons':
            textInfo = textInfo + ', Приоритет: Высокий, Тип заявки: Консультация';
            break;
        case 'p2kons':
            textInfo = textInfo + ', Приоритет: Средний, Тип заявки: Консультация';
            break;
        case 'p1kons':
            textInfo = textInfo + ', Приоритет: Низкий, Тип заявки: Консультация';
            break;
        case 'inHour':
            textInfo = textInfo;
            break;
        case 'priority3':
            textInfo = textInfo + ', Приоритет: Высокий, Тип заявки: Консультация или Инцидент';
            break;
        case 'priority2':
            textInfo = textInfo + ', Приоритет: Средний, Тип заявки: Консультация или Инцидент';
            break;
        case 'priority1':
            textInfo = textInfo + ', Приоритет: Низкий, Тип заявки: Консультация или Инцидент';
            break;
        default:
            textInfo = textInfo;
            break;
    }

    var tbl = document.createElement('table');
    tbl.id = 'headEventTable';
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = '';
    tr.appendChild(td);
    td = document.createElement('td');
    td.className = 'lnkTd';
    td.innerHTML = '<span id="lnkBtn" onclick="exportToExcel();"><img src="/images/note.png" />выгрузить в эксель</span>';
    tr.appendChild(td);

    tbl.appendChild(tr);
    divContainer.appendChild(tbl);

    var infoPanel = document.createElement('fieldset');
    infoPanel.className = 'text_block';
    infoPanel.id = 'EventListInfoPanel';
    infoPanel.innerText = textInfo;
    divContainer.appendChild(infoPanel);
}

normalizeDate = function (date) {
    var cDate = new Date(date);

    var Day = cDate.getDate();
    var Month = cDate.getMonth();
    var Year = cDate.getFullYear();
    var hour = cDate.getHours();
    var min = cDate.getMinutes();
    var sec = cDate.getSeconds();

    Month = Month + 1;

    if (Day < 10) {
        Day = '0' + Day;
    }

    if (Month < 10) {
        Month = '0' + Month;
    }
    if (Year == 1) {
        return '';
    }
    else {
        return Day + '.' + Month + '.' + Year + ' ' + hour + ':' + min + ':' + sec;
    }
}

closeEventList = function () {
    document.getElementById('dContent').removeChild(document.getElementById('divEventListBg'));
    document.getElementById('dContent').removeChild(document.getElementById('divEventList'));
}

exportToExcel = function () {
    var tbl = document.getElementById('reportEventTbl').innerHTML.replace(new RegExp("<i></i>", 'g'), '\'');
    var url = 'data:application/vnd.ms-excel,<table>' + tbl + '</table>';
    location.href = url;
    return false;
}

filterBlockDisplayChange = function (tp) {
    var elBlock = document.getElementById('FilterBlock_' + tp);
    var elTitle = document.getElementById('FilterBlock_' + tp + '_Title');

    if (elBlock.style.display != 'none') {
        elBlock.style.display = 'none';
        elTitle.innerText = elTitle.innerText.replace('↓', '↑');
    }
    else {
        elBlock.style.display = 'block';
        elTitle.innerText = elTitle.innerText.replace('↑', '↓');
    }
}

applyFilter = function () {
    closeFilterPanel();

    var WorkerTypeChbk = document.getElementById('FilterBlock_WorkerType').getElementsByTagName('input');

    if (WorkerTypeChbk[0].checked && WorkerTypeChbk[1].checked) {
        filterInWork_workerType = 2;
    }
    else {
        if (WorkerTypeChbk[0].checked) {
            filterInWork_workerType = 0;
        }
        else {
            if (WorkerTypeChbk[1].checked) {
                filterInWork_workerType = 1;
            }
            else {
                filterInWork_workerType = 2;
            }
        }
    }

    var dSd = new Date(myCalenderIn.value);
    var dDay;
    var dMonth;
    var dYear;
    if (dSd.getDate() < 10) {
        dDay = '0' + dSd.getDate();
    }
    else {
        dDay = dSd.getDate();
    }

    if (dSd.getMonth() < 9) {
        dMonth = '0' + (dSd.getMonth() + 1);
    }
    else {
        dMonth = dSd.getMonth() + 1;
    }
    dYear = dSd.getFullYear();

    filterInWork_dStart = dDay + '.' + dMonth + '.' + dYear;

    dSd = new Date(myCalenderOut.value);
    if (dSd.getDate() < 10) {
        dDay = '0' + dSd.getDate();
    }
    else {
        dDay = dSd.getDate();
    }

    if (dSd.getMonth() < 9) {
        dMonth = '0' + (dSd.getMonth() + 1);
    }
    else {
        dMonth = dSd.getMonth() + 1;
    }
    dYear = dSd.getFullYear();

    filterInWork_dEnd = dDay + '.' + dMonth + '.' + dYear;
    
    loadEvent(filterInWork_dStart, filterInWork_dEnd);
    //normalizeEvent();
}

filterInfoReadBlock = function (dv, text, arr) {
    if (arr.length > 0) {
        var span = document.createElement('span');
        span.innerText = text + ': ( ';
        for (var i = 0; i < arr.length; i++) {
            span.innerText = span.innerText + ' ' + arr[i]
        }
        span.innerText = span.innerText + ' ) ';
        dv.appendChild(span);
    }
}

filterBlockRead = function (tp, arr) {
    var els = document.getElementById('FilterBlock_' + tp).getElementsByTagName('input');
    arr = [];
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
            arr.push(els[i].value);
        }
    }
    return arr;
}

renderFilterPanelVisible = function () {
    document.getElementById('filterPanelBg').style.display = 'block';
    document.getElementById('filterPanel').style.display = 'block';
}

closeFilterPanel = function () {
    document.getElementById('filterPanelBg').style.display = 'none';
    document.getElementById('filterPanel').style.display = 'none';
}

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