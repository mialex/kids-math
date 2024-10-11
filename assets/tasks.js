class Helper {
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    firstDigit(n)
    {
        while (n >= 10)
            n /= 10;

        return Math.floor(n);
    }

    lastDigit(n)
    {
        return Math.floor(n % 10);
    }
}

class Task {
    constructor(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.result = obj.result;
        this.operator = obj.operator;
        this.isCorrect = false;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getResult() {
        return this.result;
    }

    getOperator() {
        return this.operator;
    }

    setIsCorrect(isCorrect) {
        this.isCorrect = isCorrect;
    }

    getIsCorrect() {
        return this.isCorrect;
    }

    getJson() {
        JSON.stringify({x: this.x, y: this.y, result: this.result, operator: this.operator})
    }
}

class Sub {
    constructor(from, to, max) {
        this.from = from;
        this.to = to;
        this.max = max;
        this.helper = new Helper();
    }

    listAll() {
        let tasks = [];
        let result = 0;

        for (let x = this.from; x <= this.to; x++) {
            for (let y = this.from; y <= x; y++) {
                result = x - y;

                if (null !== this.max && result > this.max) {
                    continue;
                }

                tasks.push(new Task({x: x, y: y, result: result, operator: '-'}));
            }
        }

        return tasks;
    }

    listAllSimple() {
        let tasks = [];
        let result = 0;

        for (let x = this.from; x <= this.to; x++) {
            for (let y = this.from; y <= x; y++) {
                result = x - y;

                if (null !== this.max && result > this.max) {
                    continue;
                }


                if (x >= 10 && y >= 10) {
                    if (
                        this.helper.firstDigit(x) - this.helper.firstDigit(y) < 0
                        ||
                        this.helper.lastDigit(x) - this.helper.lastDigit(y) < 0
                    ) {
                        continue;
                    }
                }

                tasks.push(new Task({x: x, y: y, result: result, operator: '-'}));
            }
        }

        return tasks;
    }

    listAllSingle() {
        let tasks = [];
        let result = 0;

        for (let y = 1; y <= this.to; y++) {
            result = this.from - y;

            if (null !== this.max && result > this.max) {
                continue;
            }

            if (result < 0) {
                continue;
            }

            tasks.push(new Task({x: this.from, y: y, result: result, operator: '-'}));
        }

        return tasks;
    }
}

class Sum {
    constructor(from, to, max) {
        this.from = from;
        this.to = to;
        this.max = max;
        this.helper = new Helper();
    }

    listAll() {
        let tasks = [];
        let result = 0;

        for (let x = this.from; x <= this.to; x++) {
            for (let y = this.from; y <= this.to; y++) {
                result = x + y;

                if (null !== this.max && result > this.max) {
                    continue;
                }

                tasks.push(new Task({x: x, y: y, result: result, operator: '+'}));
            }
        }

        return tasks;
    }

    listAllSimple() {
        let tasks = [];
        let result = 0;

        for (let x = this.from; x <= this.to; x++) {
            for (let y = this.from; y <= this.to; y++) {
                result = x + y;

                if (null !== this.max && result > this.max) {
                    continue;
                }

                if (x >= 10 && y >= 10) {
                    if (
                        this.helper.firstDigit(x) + this.helper.firstDigit(y) >= 10
                        ||
                        this.helper.lastDigit(x) + this.helper.lastDigit(y) >= 10
                    ) {
                        continue;
                    }
                }

                tasks.push(new Task({x: x, y: y, result: result, operator: '+'}));
            }
        }

        return tasks;
    }

    listAllSingle() {
        let tasks = [];
        let result = 0;

        for (let y = 1; y <= this.to; y++) {
            result = this.from + y;

            if (null !== this.max && result > this.max) {
                continue;
            }

            tasks.push(new Task({x: this.from, y: y, result: result, operator: '+'}));
        }

        return tasks;
    }
}

class Multiply {
    constructor(from, to, max) {
        this.from = from;
        this.to = to;
        this.max = max;
        this.helper = new Helper();
    }

    listAll() {
        let tasks = [];
        let result = 0;

        for (let x = this.from; x <= this.to; x++) {
            for (let y = this.from; y <= this.to; y++) {
                result = x * y;

                if (null !== this.max && result > this.max) {
                    continue;
                }

                tasks.push(new Task({x: x, y: y, result: result, operator: 'x'}));
            }
        }

        return tasks;
    }

    listAllSingle() {
        let tasks = [];
        let result = 0;

        for (let y = 1; y <= this.to; y++) {
            result = this.from * y;

            if (null !== this.max && result > this.max) {
                continue;
            }

            tasks.push(new Task({x: this.from, y: y, result: result, operator: 'x'}));
        }

        return tasks;
    }
}

class Game {
    constructor() {
        this.valueEl = $('#value-id');
        this.valueBlockEl = $('#value-block-id');
        this.taskEl = $('#task-id');

        this.resultValueEl = $('#result-value-id');
        this.resultBtn = $('#result-id');
        this.backspaceBtn = $('#backspace-id');

        this.resultSuccess = $('#result-success-id');
        this.resultWarning = $('#result-warning-id');
        this.resultTableEl = $('#result-table-id');

        this.nextBtn = $('#next-id');
        this.backBtn = $('#back-id');

        this.tableResultEl = $('#table-result-id');
        this.tableVelueCorrectEl = $('#table-result-value-correct-id');
        this.tableVelueWrongEl = $('#table-result-value-wrong-id');

        this.counterEl = $('#counter-id');
        this.keyboardEl = $('#keyboard-id');
        this.taskLabelEl = $('#task-label-id');

        this.resultExpressionEl = $('#result-expression-id');
        this.resultAnswerEl = $('#result-answer-id');

        this.ENTER = 13;
        this.tasks = [];

        this.helper = new Helper();

        this.index = 0;
        this.totalTasks = 10;

        this.answersCorrect = 0;
        this.answersWrong = 0;
    }

    init() {
        this.valueEl.focus()

        $(document).keypress((e) => e.which === this.ENTER ? this.enterAction() : '');
        this.resultBtn.click((e) => this.checkResult());
        this.nextBtn.click((e) => this.next());
        $('#keyboard-id button.number').click((e) => this.keyBordAction(e));
        this.backspaceBtn.click((e) => this.backspaceAction());
    }

    backspaceAction() {
        let inputValue = this.valueEl.val();

        if (
            inputValue !== undefined
            || (typeof inputValue === 'number' && inputValue > 0)
            || (typeof inputValue === 'string' && inputValue.length > 0)
        ) {
            this.valueEl.val(inputValue.slice(0, -1))
        }

        this.valueEl.focus();
    }

    keyBordAction(e) {
        let value = parseInt($(e.target).data('value'));
        let inputValue = this.valueEl.val();

        this.valueEl.val(inputValue + value);
        this.valueEl.focus();
    }

    addTasks(tasks) {
        this.tasks = this.tasks.concat(tasks);
    }

    resetTask() {
        this.nextBtn.hide();
        this.resultBtn.show();
        this.backspaceBtn.css('visibility', 'visible');
        this.resultSuccess.hide();
        this.resultWarning.hide();
        this.resultValueEl.text('?');
        this.resultTableEl.hide();
        this.valueEl.data('result', '');
        this.valueEl.val('');
        this.valueBlockEl.show();
        this.tableResultEl.hide();
        this.keyboardEl.show();
    }

    start(shuffle = true) {
        if (shuffle) {
            this.tasks = this.helper.shuffleArray(this.tasks);
        }
        this.tasks = this.tasks.slice(0, 10);

        this.totalTasks = this.tasks.length < this.totalTasks ? this.tasks.length : this.totalTasks;

        this.next();
    }

    enterAction() {
        if (!this.backBtn.is(':visible')) {
            this.nextBtn.is(':visible')
                ? this.next()
                : this.checkResult();
        }
    }

    next() {
        this.resetTask();

        if (this.index >= this.totalTasks ) {
            this.showResult();
            return;
        }

        this.counterEl.text(' ' + (this.index + 1) + ' / ' + this.totalTasks);
        let task = this.tasks.at(this.index);

        this.taskEl.text(task.getX() + ' ' + task.getOperator() + ' ' + task.getY() + ' = ');
        this.valueEl.data('result', task.getResult());

        this.index = this.index + 1;
        this.valueEl.focus()
    }

    checkResult() {
        this.resultValueEl.text(this.valueEl.data('result'));

        if (parseInt(this.valueEl.val()) === parseInt(this.valueEl.data('result'))) {
            this.resultSuccess.show();
            this.answersCorrect += 1;
            this.tasks.at(this.index - 1).setIsCorrect(true);
        } else {
            this.resultWarning.show();
            this.answersWrong += 1;
            this.tasks.at(this.index - 1).setIsCorrect(false);
        }

        this.nextBtn.show();
        this.resultBtn.hide();
        this.backspaceBtn.css('visibility', 'hidden');
        this.valueEl.focus()
    }

    showResult() {
        this.backBtn.show();
        this.nextBtn.hide();
        this.resultBtn.hide();
        this.backspaceBtn.css('visibility', 'hidden');
        this.keyboardEl.hide();

        this.valueBlockEl.hide();

        this.resultValueEl.text('');
        this.taskEl.text(this.answersCorrect + ' / ' + this.totalTasks);

        this.tableResultEl.show();
        this.tableVelueCorrectEl.text(this.answersCorrect);
        this.tableVelueWrongEl.text(this.answersWrong);
        this.resultTableEl.show();

        this.taskLabelEl.html(new Date().toLocaleString().slice(0, -3));

        let correct = "<span class='text-success'>" +
            "  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check\" viewBox=\"0 0 16 16\">\n" +
            "    <path d=\"M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z\"/>\n" +
            "  </svg>" +
            "</span>";

        let wrong = "<span class='text-warning'>" +
            "  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n" +
            "    <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/>\n" +
            "  </svg>" +
            "</span>";


        for (const task of this.tasks) {
            let icon = task.getIsCorrect() ? correct : wrong;

            this.resultExpressionEl.append('<div class="mb-0">' + icon + '<span class="item-value-one">' + task.getX() + '</span><span>' + task.getOperator() + '</span><span class="item-value-two">' + task.getY() + '</span></div>');
            this.resultAnswerEl.append('<div class="mb-0"><span class="item-equal">=</span><span class="item-result">' + task.getResult() + '</span></div>');
        }
    }
}
