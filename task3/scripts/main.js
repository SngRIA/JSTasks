$(document).ready(function () { // Подписывает на готовность DOM
    bindProps(); // Вызываем связку полей таблицы с логикой
});

const individual = 'Физическое лицо';
const legalEntity = 'Юридическое лицо';

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

// Возвращает НДС процент по типу лица
function getVatValue(payType) {
    if(!checkNullValues(payType)) { // Проверка значения
        return;
    }

    if(payType == individual) { // Выбираем Физическое лицо
        return '13';
    } else if (payType == legalEntity) { // Выбираем Юридическое лицо
        return '17';
    } else {
        console.log('wrong payType');
        return;
    }
}

// Устанавливает указанное значение в поле НДС
function setVat(vatType) {
    var vatElement = $('input[name=vat]'); // Элемент поля НДС
    var newVatValue = getVatValue(vatType); // Получаем НДС

    if(!checkNullValues(vatType, vatElement, newVatValue)) { // Проверка значений
        return;
    }

    vatElement.val(newVatValue); // Устанавливаем значение элемента НДС
}

// Функция валидации формы
function bindProps() {
    var payTypeElement = $('select[name=pay_type]');         // Получаем элемент 'Тип плательщика'
    var vatElement = $('input[name=vat]');                   // Получаем элемент 'НДС'
    var legalPersonElement = $('select[name=legal_person]'); // Получаем элемент 'Форма ЮЛ'
    var simpleTaxElement = $('input[name=simple_tax]');      // Получаем элемент 'Упрощенное налогооблажение'
    var itnElement = $('input[name=itn]');                   // Получаем элемент 'ИНН'
    var amountPayElement = $('input[name=amount_of_pay]');   // Получаем элемент 'Сумма платежа'
    var resultElement = $('input[name=result]');             // Получаем элемент 'Итог'

    if(!checkNullValues(payTypeElement, vatElement, legalPersonElement, 
        simpleTaxElement, itnElement, amountPayElement, resultElement)) { // Проверка значений
        return;
    }

    payTypeElement.change(function() { // Подписываем на изменение поля 'Тип плательщика'
        var itnSize = 12; // Длина ИНН
        var itnSizeElement = $('#itn_count'); // Строка валидации отвечающая за длину ИНН
        var selectedPayType = payTypeElement.val(); // Получаем установленное значение
        
        if(!checkNullValues(itnSizeElement, selectedPayType)) { // Проверка значений
            return;
        }

        setVat(selectedPayType); // Устанавливаем значение НДС

        if(selectedPayType == legalEntity) { // Проверяем является ли выбор Юр. лицом
            legalPersonElement.removeAttr('disabled'); // Удаляем отключение выбора Юр. лица
            legalPersonElement.parent().removeClass('d-none'); // Включаем отображение отображение выбора Юр. лица

            simpleTaxElement.removeAttr('disabled'); // Удаляем отключение выбора упрощенного налогообложения
            simpleTaxElement.parent().removeClass('d-none'); // Делаем видимым блок с упрощенным налогообложением

            itnSize = 10; // Установка допустимой длины ИНН
        } else {
            legalPersonElement.attr('disabled', true); // Отключаем выбор Юр. лицо
            legalPersonElement.parent().addClass('d-none'); // Отключаем отображение выбора Юр. лица

            simpleTaxElement.attr('disabled', true); // Отключаем выбор упрощенного налогообложения
            simpleTaxElement.parent().addClass('d-none'); // Отключаем отображение выбор упрощенного налогообложения
            
            itnElement.removeAttr('disabled'); // Удаляем блокировку элемента 'ИНН'
            itnSize = 12; // Установка допустимой длины ИНН
        }

        itnElement.attr('pattern', '[0-9]{' + itnSize + '}'); // Изменяем регулярное выражение

        itnSizeElement.text(itnSize); // Устанавливаем необходимую длину ИНН в тексте валидации
    });

    simpleTaxElement.change(function() { // Подписываем на изменение чекбокса 'Упрощенное налогооблажение'
        if(simpleTaxElement.is(":checked")) { // Проверяем активирован ли чекбокс
            itnElement.val(''); // Устанавливаем пустое значение
            itnElement.attr('disabled', true); // Блокируем элемент ИНН
        } else {
            itnElement.removeAttr('disabled'); // Удаляем блокировку
        }
    });

    amountPayElement.focusout(function () { // Подписываем на потерю фокуса элемента 'Сумма платежа'
        var amountPayValue = amountPayElement.val(); // Получаем значение платежа
        if(!checkNullValues(amountPayValue)) { // Проверка значения
            return;
        }

        var outValue = Number(amountPayValue).toFixed(2); // Переводим в число и ограничиваем кол-во знаков путём округления

        if(outValue != 'NaN' && outValue > 0) // Проверяем валидность числа
        {
            var result = amountPayValue * (1 + vatElement.val() / 100) // "Сумма платежа" * (1 + "НДС"/100)

            amountPayElement.val(outValue); // Установка значения
            resultElement.val(result.toFixed(2)); // Округляем значение после 2-го числа после запятой
        } else {
            amountPayElement.val(''); // Устанавливаем пустое значение в поле 'Сумма платежа'
            resultElement.val(''); // Устанавливаем пустое значение в поле 'Итог'
        }
    });
}