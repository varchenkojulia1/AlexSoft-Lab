$(document).ready(function(){
//-------------------ACCORDION-----------------
let accordionItems = document.querySelectorAll('.accordion-item-header');

const accordionToggle = (e) => {


    const container = e.target.parentElement.parentElement;
    const plus = container.querySelector('.plus');
    const number = container.querySelector('.number')

    accordionItems.forEach(item => {
        let p = item.querySelector('.plus');
        let n = item.querySelector('.number');

        if(item.parentElement === container && container.className.indexOf('show') === -1) {

            container.classList.add('show');
            plus.removeAttribute('src');
            plus.setAttribute('src', './assets/minus.svg');
            number.classList.add('hide');

        } else if (item.parentElement !== container && item.parentElement.className.indexOf('show') !== -1){

            item.parentElement.classList.remove('show');
            p.removeAttribute('src')
            p.setAttribute('src', './assets/plus.svg');
            n.classList.remove('hide')

        } else {

            item.parentElement.classList.remove('show');
            p.removeAttribute('src');
            p.setAttribute('src', './assets/plus.svg');

            n.classList.remove('hide');
        }
        })
}

accordionItems.forEach(item => {

    item.addEventListener('click', accordionToggle)
})

//-----------------------slider-------------------
const glossaryItems = {
    'Botnet': 'Lorem ipsum dolor sit amet, consecteolestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Breach':'Lorem ipsum dolor sit amet, consectetur adipiisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Cloud':'Lorem ipsum dolor sit amet, consecteae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'DDoS':'Lorem ipsum dolor sit amet, consectetur adiestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Domain':'Lorem ipsum dolor sit amet, consectetur adipisicing estiae, non officiis porro q vero, voluptatibus?',
    'Endpoint':'Lorem ipsum dolor sit amet, consectetur adipise, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Exploit':'Lorem ipsum dolor sit amet, es minus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Firewall':'Lorem ipsum dolor sit amet, consectetur adistiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'IP Address':'Lorem ipsum dolor sit inus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Malware':'Lorem ipsum dolor sit amet,molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Penetration Test':'Lorem ipsum dolor sit amet, consectetur adi molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Phishing/Spearphishing':'Lorem ips inventore itaque maiores minus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Ransomware':'Lorem ipsum dolor sit amet, maiores minus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Session Hijacking':'Lorem ipsum dolor sit  maiores minus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Social Engineering':'Lorem ipsum dolor si itaque maiores minus molestiae, non officiis porro quisquam ratione sunt tenetur ut vero, voluptatibus?',
    'Software':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita ',
    'SOC':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita ',
    'Trojan Horse':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita ',
    'VPN':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita ',
    'Virus':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita ',
    'Worm':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet aspernatur dolore expedita '
}

const glossaryKeys = Object.keys(glossaryItems);
const glossaryValues = Object.values(glossaryItems);
let pageLimit = 14;

if(window.innerWidth < 1024 && window.innerWidth > 577) {
    pageLimit = 10
} else if (window.innerWidth < 576) {
    pageLimit = 5
}
let numberOfPages = Math.ceil(glossaryKeys.length / pageLimit);
let drowen = 0;

while(numberOfPages > 0) {

    const list = document.createElement('li');
    list.setAttribute('class', 'sim-slider-element');
    let page = glossaryKeys.slice(drowen, drowen + pageLimit);
    let inner = page.map((elem, index) => `<li id =${drowen + index} >${elem}</li>`)
    list.innerHTML = inner.join('');
    document.querySelector('.sim-slider-list').append(list);
    drowen += pageLimit;
    numberOfPages--;
}
document.getElementById('4').classList.add('active')

    //---------------------------SLIDER--------------------------
    function Sim(sldrId) {

        let id = document.getElementById(sldrId);
        if(id) {
            this.sldrRoot = id
        }
        else {
            this.sldrRoot = document.querySelector('.sim-slider')
        };

        // Carousel objects
        this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
        this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
        this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
        this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
        this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
        this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

        // Initialization
        this.options = Sim.defaults;
        Sim.initialize(this)
    };

    Sim.defaults = {

        // Default options for the carousel
        // loop: true,     // Бесконечное зацикливание слайдера
        // auto: true,     // Автоматическое пролистывание
        arrows: true,   // Пролистывание стрелками
    };

    Sim.prototype.elemPrev = function(num) {
        num = num || 1;

        let prevElement = this.currentElement;
        this.currentElement -= num;
        if(this.currentElement < 0) this.currentElement = this.elemCount-1;

        if(!this.options.loop) {
            if(this.currentElement == 0) {
                // this.leftArrow.style.display = 'none'
                this.leftArrow.style.opacity = '0.5'
            };
            this.rightArrow.style.display = 'block'
        };

        // this.sldrElements[this.currentElement].style.opacity = '1';
        // this.sldrElements[prevElement].style.opacity = '0';
        this.sldrElements[this.currentElement].style.display = 'block';
        this.sldrElements[prevElement].style.display = 'none';

        if(this.options.dots) {
            this.dotOn(prevElement); this.dotOff(this.currentElement)
        }
    };

    Sim.prototype.elemNext = function(num) {
        num = num || 1;

        let prevElement = this.currentElement;
        this.currentElement += num;
        if(this.currentElement >= this.elemCount) this.currentElement = 0;

        if(!this.options.loop) {
            if(this.currentElement == this.elemCount-1) {
                // this.rightArrow.style.display = 'none'
                this.rightArrow.style.opacity = '0.5'
            };
            this.leftArrow.style.display = 'block'
        };

        // this.sldrElements[this.currentElement].style.opacity = '1';
        // this.sldrElements[prevElement].style.opacity = '0';
        this.sldrElements[this.currentElement].style.display = 'block';
        this.sldrElements[prevElement].style.display = 'none';

        if(this.options.dots) {
            this.dotOn(prevElement); this.dotOff(this.currentElement)
        }
    };

    Sim.prototype.dotOn = function(num) {
        this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
    };

    Sim.prototype.dotOff = function(num) {
        this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
    };

    Sim.initialize = function(that) {

        // Constants
        that.elemCount = that.sldrElements.length; // Количество элементов

        // Variables
        that.currentElement = 0;
        let bgTime = getTime();

        // Functions
        function getTime() {
            return new Date().getTime();
        };
        function setAutoScroll() {
            that.autoScroll = setInterval(function() {
                let fnTime = getTime();
                if(fnTime - bgTime + 10 > that.options.interval) {
                    bgTime = fnTime; that.elemNext()
                }
            }, that.options.interval)
        };

        // Start initialization
        if(that.elemCount <= 1) {   // Отключить навигацию
            that.options.auto = false; that.options.arrows = false; that.options.dots = false;
            that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
        };
        if(that.elemCount >= 1) {   // показать первый элемент
            // that.sldrElemFirst.style.opacity = '1';
            that.sldrElemFirst.style.display = 'block';
        };

        if(!that.options.loop) {
            // that.leftArrow.style.display = 'none';  // отключить левую стрелку
            that.leftArrow.style.opacity = '0.5';  // отключить левую стрелку
            that.options.auto = false; // отключить автопркрутку
        }
        else if(that.options.auto) {   // инициализация автопрокруки
            setAutoScroll();
            // Остановка прокрутки при наведении мыши на элемент
            that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
            that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
        };

        if(that.options.arrows) {  // инициализация стрелок
            that.leftArrow.addEventListener('click', function() {
                let fnTime = getTime();
                if(fnTime - bgTime > 1000) {
                    bgTime = fnTime; that.elemPrev()
                }
            }, false);
            that.rightArrow.addEventListener('click', function() {
                let fnTime = getTime();
                if(fnTime - bgTime > 1000) {
                    bgTime = fnTime; that.elemNext()
                }
            }, false)
        }
        else {
            that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
        };

        if(that.options.dots) {  // инициализация индикаторных точек
            let sum = '', diffNum;
            for(let i=0; i<that.elemCount; i++) {
                sum += '<span class="sim-dot"></span>'
            };
            that.indicatorDots.innerHTML = sum;
            that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
            // Назначаем точкам обработчик события 'click'
            for(let n=0; n<that.elemCount; n++) {
                that.indicatorDotsAll[n].addEventListener('click', function() {
                    diffNum = Math.abs(n - that.currentElement);
                    if(n < that.currentElement) {
                        bgTime = getTime(); that.elemPrev(diffNum)
                    }
                    else if(n > that.currentElement) {
                        bgTime = getTime(); that.elemNext(diffNum)
                    }
                    // Если n == that.currentElement ничего не делаем
                }, false)
            };
            that.dotOff(0);  // точка[0] выключена, остальные включены
            for(let i=1; i<that.elemCount; i++) {
                that.dotOn(i)
            }
        }
    };

    new Sim();

    //----------------------------------- END SLIDER----------------------------------

    //------------------------carousel toggle---------------------

const glossaryToggle = (e) => {

    const id = e.target.id;

    if(e.target.parentElement.className === 'sim-slider-element') {

        document.querySelector('.description > h2').innerHTML = glossaryKeys[id];
        document.querySelector('.description > p').innerHTML = glossaryValues[id];
        const children = e.target.parentElement.children;

        for(let i = 0; i< children.length; i++){
            children.item(i).classList.contains('active') ? children.item(i).classList.remove('active'): null;
        }
    e.target.classList.add('active')
    }
}

    document.querySelectorAll('.sim-slider-element').forEach(element =>{
        element.addEventListener('click', glossaryToggle )
    })
//----------------------------FAQS------------------------------------

    const questionsAnswers = {
        'What are your system requirements?': 'Everyone needs cybersecurity. Some information requires more protection than other information, but our solution is adaptable to every business. ',
        'Is SKOUT windows and Mac compatible?':'Everyone needs cybersecurity. Some information requires more protection than other information, but our solution is adaptable to every business. ',
        'Do I need an MSP or Technology provider to get SKOUT?':'Everyone needs cybersecurity. Some information requires more protection than other information, but our solution is adaptable to every business. ',
        'Is there a trial program? ':'Everyone needs cybersecurity. Some information requires more protection than other information, but our solution is adaptable to every business. ',
        'Can I get a Demo?':'Everyone needs cybersecurity. Some information requires more protection than other information, but our solution is adaptable to every business. '
    }
const showAnswerToggler = e => {

    const id = e.target.parentElement.parentElement.id;
    const parent = e.target.parentElement.parentElement;
    const number = +id.slice(1, id.length);
    let answers = Object.values(questionsAnswers);
    parent.querySelector('.answer').innerHTML = answers[number];
    parent.querySelector('.answer-box').classList.toggle('d-none');

    if( parent.querySelector('.arrow').classList.contains('arrow-down')){
        parent.querySelector('.arrow').classList.remove('arrow-down');
        parent.querySelector('.arrow').classList.add('arrow-up');
    } else {
        parent.querySelector('.arrow').classList.remove('arrow-up');
        parent.querySelector('.arrow').classList.add('arrow-down');
    }

}
    document.querySelectorAll('.question-box').forEach(elem => {
        elem.addEventListener('click', showAnswerToggler)
    })
})
// -------------------------- hamburger -----------------

const showMenu = (e) => {

    document.getElementById('menuWrapper').classList.toggle('d-md-none');
    document.getElementById('hamburger').classList.toggle('cross');
    document.getElementById('hamburger').classList.toggle('hamburger');

}

document.getElementById('hamburger').addEventListener('click', showMenu)
