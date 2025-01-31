        let currentExpression = '';
        let currentNumber = '0';
        let lastOperator = '';
        let shouldResetNumber = false;

        const expressionElement = document.getElementById('expression');
        const resultElement = document.getElementById('result');

        function updateDisplay() {
            expressionElement.textContent = currentExpression;
            resultElement.textContent = currentNumber;
        }

        function appendNumber(num) {
            if (shouldResetNumber) {
                currentNumber = num;
                shouldResetNumber = false;
            } else {
                if (currentNumber === '0' && num !== '.') {
                    currentNumber = num;
                } else {
                    if (num === '.' && currentNumber.includes('.')) return;
                    currentNumber += num;
                }
            }
            updateDisplay();
        }

        function setOperator(operator) {
            if (currentExpression && !shouldResetNumber) {
                calculate();
            }
            currentExpression = `${currentNumber} ${operator}`;
            shouldResetNumber = true;
            lastOperator = operator;
            updateDisplay();
        }

        function calculate() {
            if (!currentExpression || shouldResetNumber) return;
            
            const expression = `${currentExpression} ${currentNumber}`;
            let result;
            
            // Split the expression and calculate
            const parts = expression.split(' ');
            const num1 = parseFloat(parts[0]);
            const operator = parts[1];
            const num2 = parseFloat(parts[2]);

            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '×':
                    result = num1 * num2;
                    break;
                case '÷':
                    result = num1 / num2;
                    break;
                default:
                    return;
            }

            currentExpression = '';
            currentNumber = result.toString();
            shouldResetNumber = true;
            updateDisplay();
        }

        function clearAll() {
            currentExpression = '';
            currentNumber = '0';
            lastOperator = '';
            shouldResetNumber = false;
            updateDisplay();
        }

        function percentage() {
            currentNumber = (parseFloat(currentNumber) / 100).toString();
            updateDisplay();
        }

        function backspace() {
            if (currentNumber.length > 1) {
                currentNumber = currentNumber.slice(0, -1);
            } else {
                currentNumber = '0';
            }
            updateDisplay();
        }