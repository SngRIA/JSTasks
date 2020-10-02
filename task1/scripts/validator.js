document.addEventListener('DOMContentLoaded', function() { // Вызовет обработчик после загрузки DOM
    document.getElementById('button-register').onclick = function(e) { // Подписывает validate на эвент 'onclick'
        if(isValid()) { // Проверка валидности формы
            insertPerson();
        }
    };
});

// Массив для проверки
var ValidateDateRules = {
    // Поле : по какому правилу необходимо проверить
    // '' : {}
    'day': function (value)
    { 
        return  0 < value && value <= 31
    },
    'year': function (value)
    { 
        return 2000 < value && value < 2021
    },
    'city': function(value)
    { 
        return true
    },
    'month': function (value)
    { 
        return 0 < value && value < 13
    },
    'firstName': function (value)
    { 
        return value != '' && value.length < 10
    },
    'lastName': function (value)
    { 
        return value != '' && value.length < 15
    }
};

// Проверяет валидность элемента
function checkElement(element) {
    if(element == null) // Проверка входного значения
    {
        console.log("element is undefined");
        return;
    }

    var name = element.name;
    var value = element.value;

    if(!ValidateDateRules[name](value)) { // Указываем значение по ключу и вызываем проверку
        element.style.border = '1px solid red'; // Устанавливаем красную рамку
    } else {
        element.style.border = '';
        return true;
    }

    return false;
}

// Перевод данных в массив
function toArray(x) {
    if(x == null) {
        console.log('x is null');
        return;
    }

    for(var i = 0, a = []; i < x.length; i++) {
        a.push(x[i]);
    }

    return a;
}

// Событие которое подписывают на onlick
function isValid() {
    var registerBlock = document.getElementById('register'); // Получаем блок регистрации
    if(registerBlock == null) {
        console.log('registerBlock is null');
        return;
    }

    var selectElements = registerBlock.getElementsByTagName('select'); // Получаем все селекты из блока регистрации
    if(selectElements == null) {
        console.log('selectElements is null');
        return;
    }

    var inputElements = registerBlock.getElementsByTagName('input'); // Получаем все инпуты из блока регистрации
    if(inputElements == null) {
        console.log('inputElements is null');
        return;
    }

    var selectsArray = toArray(selectElements); // Конвертируем HTMLCollection в массив
    var inputsArray = toArray(inputElements);

    var concatArray = selectsArray.concat(inputsArray); // Объединяем 'selectArray' и 'inputsArray' в один массив

    if(concatArray == null || concatArray == undefined) {
        console.log("concatArray is undefined");
    }

    var result = true; // Переменная отвечающая является ли форма валидной
    for (var i = 0; i < concatArray.length; i++) { // Перебираем все concatArray
        if(!checkElement(concatArray[i])) {
            result = false;
        }
    }
    return result;
}