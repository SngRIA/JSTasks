var GridDate = [ // Данные таблицы
];

// Проверка данных на null
// Возвращает значение true если все поля валидны
function checkNullValues(args) {
    var result = true; // Значение проверки

    if(arguments.length < 0) { // Проверяем значения массива
        result = false;
        console.log('args is null');
    }
    
    for (var i = 0; i < arguments.length; i++) { // Перебираем значения массива
        if(arguments[i] === null) { // Проверяем валидность значения
            result = false;
            console.log('Null value index:' + i);
        }
    }
    
    return result; // Возвращаем значение валиден массив или нет
}

// Получает день, месяц и год из формы и возвращает форматированную строку
// в формате d.m.Y
function parseDate() {
    var dayValue = $('select[name=day]').val(); // Получает значение из поля день
    var monthValue = $('select[name=month]').val(); // Получает значение из поля месяц
    var yearValue = $('select[name=year]').val(); // Получает значение из поля год

    checkNullValues(dayValue, monthValue, yearValue);

    return dayValue + '/' + monthValue + '/' + yearValue; // Контактинируем строки в формат d.m.Y
}


// Вставляет данные из формы регистрация в массив данных и обновляет таблицу
function insertPerson() {
    var firstName = $('input[name=firstName]').val(); // Получает значение из поля имя
    var lastName = $('input[name=lastName]').val(); // Получает значение из поля фамилия
    var city = $('select[name=city]').val(); // Получает значение из поля город

    checkNullValues(GridDate, firstName, lastName, city);

    GridDate.push({ // Добавляем объект
        id: GridDate.length + 1,
        firstName: firstName,
        lastName: lastName,
        city: city,
        birthday: parseDate() // Получаем дату
    })
    
    $("#jqGrid").trigger( 'reloadGrid' ); // Обновляем таблицу
}