const $breakDown = $('.controls .breakDown');
const $breakUp = $('.controls .breakUp');
const $sessionDown = $('.controls .sessionDown');
const $sessionUp = $('.controls .sessionUp');
const $breakLength = $('.controls .breakLength');
const $sessionLength = $('.controls .sessionLength');
const $controls = $('.controls');
const $time = $('.wrap .time');
const $title = $('.wrap .title');
const $show = $('.wrap .show');
const $wrap = $('.wrap');
let sessionLength;

$breakUp.on('click', function () {
    reset();
    up($breakLength);
})

$breakDown.on('click', function () {
    reset();
    down($breakLength);
})

$sessionUp.on('click', function () {
    reset();
    up($sessionLength);
    $time.html(sessionLength);
})

$sessionDown.on('click', function () {
    reset();
    down($sessionLength);
    $time.html(sessionLength);
})

let isCount = false;
let isBreak = false;
let toggle = false;
let isDone = true;
let timer;

$wrap.on('click', function () {

    isCount = !isCount;
    isBreak = !isBreak;
    toggle = !toggle;

    var obj1 = {
        target: $sessionLength,
        color: '#4CAF50',
        flag: isBreak,
        isDone: true,
        title: 'Session',
        callback: function () {
            return countTime(obj2);
        }

    }

    var obj2 = {
        target: $breakLength,
        color: '#f44336',
        flag: isCount,
        isDone: false,
        title: 'Break',
        callback: function () {
            return countTime(obj1);
        }
    }

    function countTime(options) {

        isDone = options.isDone;
        let timeLeft = $time.html() ? $time.html().split(":") : options.target.html().split(":");
        let timeLeftmin = parseInt(timeLeft[1]) ? parseInt(timeLeft[0]) : parseInt(timeLeft[0]) - 1;
        let timeLeftsec = parseInt(timeLeft[1]) ? parseInt(timeLeft[1]) : 60;
        $title.html(options.title);
        if (options.flag) {

            timer = setInterval(function () {
                timeLeftsec--;
                parseInt(timeLeftsec) < 10 && parseInt(timeLeftsec) >= 0 ? timeLeftsec = "0" + timeLeftsec : '';

                if (toggle === false || (parseInt(timeLeftmin) === 0 && parseInt(timeLeftsec) <= 0)) {
                    clearInterval(timer);
                    console.log('Paused');
                } else if (parseInt(timeLeftsec) < 0) {
                    timeLeftmin--;
                    timeLeftsec = 59;
                };
                var percent = (1 - ((parseInt(timeLeftmin) * 60 + parseInt(timeLeftsec)) / (parseInt(options.target.html()) * 60))) * 100;
                $show.css({
                    'height': percent.toFixed(2) + '%',
                    'backgroundColor': options.color
                });
                $time.html(timeLeftmin + ":" + timeLeftsec);

                if ($time.html() === '0:00') {
                    $time.html('');
                    options.callback();
                }

            }, 1000);
        }

    }

    isDone ? countTime(obj1) : countTime(obj2);

})

function up(target) {
    let aNum = parseInt(target.html());
    aNum++;
    sessionLength = aNum;
    target.html(aNum);
}

function down(target) {
    let aNum = parseInt(target.html());
    aNum > 1 ? aNum-- : '';
    sessionLength = aNum;
    target.html(aNum);
}

function reset(){
    $title.html() !== 'Session' ? $title.html('Session') : '';
    $time.html($sessionLength.html());
    $show.css({
        'height': 0
    });
    isBreak = false;
    toggle = false;
    isDone = true;
    isCount = false;
    clearInterval(timer);
}