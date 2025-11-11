let display = document.getElementById('result');

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        // Заменяем символ умножения для вычисления
        let expression = display.value.replace(/×/g, '*');
        
        // Проверка на безопасность выражения
        if (/[^0-9+\-*/().]/.test(expression)) {
            throw new Error('Неверное выражение');
        }
        
        let result = eval(expression);
        
        // Проверка на бесконечность и NaN
        if (!isFinite(result)) {
            throw new Error('Ошибка вычисления');
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Ошибка';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Обработка клавиатуры
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Инициализация
clearDisplay();
