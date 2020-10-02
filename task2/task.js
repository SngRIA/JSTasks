Study.GetData(parseData); // Передаём колбек функцию

// Проверка данных на null
// Возвращает значение true если все поля валидны
function checkNullValues(args) {
    var result = true; // Значение проверки

    if(arguments.length < 0) { // Проверяем значения массива
        result = false;
        console.log('args is null');
    }
    
    for (let i = 0; i < arguments.length; i++) { // Перебираем значения массива
        if(arguments[i] === null) { // Проверяем валидность значения
            result = false;
            console.log('Null value index:' + i);
        }
    }
    
    return result; // Возвращаем значение валиден массив или нет
}

// 0 задание, вывод всех объектов
function showData(collection) {
    if(!checkNullValues(collection)) { // Проверка значения
        return;
    }

    for (let i = 0; i < collection.length; i++) { // Перебор всех элементов массива
        console.log('ID: ' + collection[i].id + ' | Имя:' + collection[i].name + ' | Тип:' + collection[i].type);
    }
}

// 1 задание, отсортировать все элементы по свойству id по возрастанию
function sortById(collection) {
    if(!checkNullValues(collection)) { // Проверка значения
        return;
    }

    var sortedData = collection;

    sortedData.sort(function (a, b) { // Сортировка по возрастанию
        return a.id - b.id;
    });

    showData(sortedData); // Вывод данных в консоль
}

// 2 задание, отсортировать все элементы по свойству type по возрастанию
// и свойству id по убыванию.
function sortByTypeAndId(collection) {
    if(!checkNullValues(collection)) { // Проверка значения
        return;
    }

    var changedData = collection;
    
    collection.sort(function (a, b) {
        return a.type - b.type || b.id - a.id // Первичная сортировка по type после id
    });

    showData(changedData); // Вывод данных в консоль
}

// 3 задание, только элементы с type = 2
function takeByType(collection, type) {
    if(!checkNullValues(collection, type)) { // Проверка заначений
        return;
    }


    var changedData = collection.filter(function (element) { // Сортировка по указанному типу
        return element.type == type
    });
    
    showData(changedData); // Вывод данных в консоль
}

// 4 задание, выбрать только элементы, у которых заполнено имя.
function takeWithName(collection) {
    if(!checkNullValues(collection)) { // Проверка значения
        return;
    }

    var changedData = collection.filter(function (element) {
        return element.name != null
    });

    showData(changedData); // Вывод данных в консоль
}

// 5 задание, добавить в коллекцию элемент с недостающим идентификатором.
// Отсортировать коллекцию в порядке убывания идентификаторов.
function insertElement(collection, element) {
    if(!checkNullValues(collection, element)) { // Проверка заначений
        return;
    }

    var changedData = collection;

    changedData.push(element); // Добавление элемента

    changedData.sort(function (a, b) { // Сортировка
        return b.id - a.id
    });

    showData(changedData); // Вывод данных в консоль
}

// 6 задание, вырезать из коллекции элементы с третьего по пятый.
function cutElements(collection, index, count) {
    if(!checkNullValues(collection, index, count)) { // Проверка заначений
        return;
    }

    var changedData = collection;

    changedData.sort(function(a, b) { // Сортировка по возрастанию
        return a.id - b.id
    });

    changedData.splice(index, count); // Удаление элементов массива

    showData(changedData); // Вывод данных в консоль
}

//Колбэк функция для работы с данными
function parseData(collection) {
    if(!checkNullValues(collection)) { // Проверка значения
        return;
    }

    console.log('0');
    showData(collection); // Вывод данных в консоль

    console.log('1');
    sortById(collection); // Сортировка по Id по возрастанию

    console.log('2');
    sortByTypeAndId(collection); // Сортировка по Id и Type

    console.log('3');
    takeByType(collection, 2); // Вывод данных в зависимости от указанного type

    console.log('4');
    takeWithName(collection); // Вывод элементов только с именем

    console.log('5');
    insertElement(collection, { // Вставка элемента
        id: 5,
        name: 'G',
        type: 3
    }); 

    console.log('6');
    cutElements(collection, 2, 3); // Вырезаем указанные значения
}