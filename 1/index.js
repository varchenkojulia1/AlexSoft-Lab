
//-------------------ACCORDION-----------------
let accordionItems = document.querySelectorAll('.accordion-item-header');

const accordionToggle = (e) => {


    const container = e.target.parentElement.parentElement;
    const plus = container.querySelector('.small-wrapper');
    const number = container.querySelector('.number')

    accordionItems.forEach(item => {
        let itemPlus = item.querySelector('.small-wrapper');
        let itemNumber = item.querySelector('.number');

        if(item.parentElement === container && container.className.indexOf('show') === -1) {

            container.classList.add('show');
            plus.classList.toggle('plus');
            plus.classList.toggle('minus')
            number.classList.add('hide');

        } else {

            item.parentElement.classList.remove('show');

            if (itemPlus.classList.contains('minus')){

                itemPlus.classList.toggle('plus');
                itemPlus.classList.toggle('minus')
            }

            itemNumber.classList.remove('hide');
        }
        })
}

accordionItems.forEach(item => {

    item.addEventListener('click', accordionToggle)
})

//-----------------------slider-------------------
    let glossaryItems = [];

const getGlossaryItems = (data) => {

    glossaryItems = data;

    drawInnerSlider()

    new Sim();
};

const drawInnerSlider = () => {

    document.querySelector('.sim-slider-list').innerHTML = '';
    const glossaryKeys = Object.keys(glossaryItems);

    let pageLimit = 14;

    if(window.innerWidth < 992 && window.innerWidth > 577) { // breakpoints for tablet
        pageLimit = 10
    } else if (window.innerWidth < 576) {  // breakpoints for mobile
        pageLimit = 4
    }

    let numberOfPages = Math.ceil(glossaryKeys.length / pageLimit);
    let drawn = 0;

    while(numberOfPages > 0) {

        const list = document.createElement('li');
        list.setAttribute('class', 'sim-slider-element')

        let page = glossaryKeys.slice(drawn, drawn + pageLimit);
        let inner = page.map((elem, index) => `<li id =${drawn + index} >${elem}</li>`)
        list.innerHTML = inner.join('');
        document.querySelector('.sim-slider-list').append(list);
        drawn += pageLimit;
        numberOfPages--;
    }

    document.getElementById('4').classList.add('active');

    document.querySelectorAll('.sim-slider-element').forEach(element =>{
        element.addEventListener('click', listToggle )
    })

}

const resizeSlider = () => {

    drawInnerSlider();
    new Sim();
}
window.addEventListener('resize', resizeSlider);

 fetch('./glossaryItems.json')
    .then(response => response.json())
    .then(data => getGlossaryItems(data))


    //---------------------------SLIDER--------------------------
    function Sim(sldrId) {

        let id = document.getElementById(sldrId);

        this.sldrRoot = id ? id: document.querySelector('.sim-slider');

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
        // loop: true,     // Infinite loop slider
        // auto: true,     // Automatic scrolling
        arrows: true,   // Scroll with arrows
    };

    Sim.prototype.elemPrev = function(num) {
        num = num || 1;

        let prevElement = this.currentElement;
        this.currentElement -= num;
        if(this.currentElement < 0) this.currentElement = this.elemCount-1;

        if(!this.options.loop) {
            if(this.currentElement == 0) {

                this.leftArrow.style.opacity = '0.7'
            };
            this.rightArrow.style.display = 'block'
        };


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

                this.rightArrow.style.opacity = '0.7'
            };
            this.leftArrow.style.display = 'block'
        };

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
        if(that.elemCount <= 1) {   // disable navigation
            that.options.auto = false; that.options.arrows = false; that.options.dots = false;
            that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
        };
        if(that.elemCount >= 1) {   // show first element

            that.sldrElemFirst.style.display = 'block';
        };

        if(!that.options.loop) {
            that.leftArrow.style.display = 'none';  // disable left arrow
            that.leftArrow.style.opacity = '0.5';  // disable left arrow
            that.options.auto = false; // disable auto autoscroll
        }
        else if(that.options.auto) {   // autoscroll initialization
            setAutoScroll();
            // Stop scrolling when hovering over an element
            that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
            that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
        };

        if(that.options.arrows) {  // arrows initialization
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

        if(that.options.dots) {  // initialization dots indicators
            let sum = '', diffNum;
            for(let i=0; i<that.elemCount; i++) {
                sum += '<span class="sim-dot"></span>'
            };
            that.indicatorDots.innerHTML = sum;
            that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
            // Assigning the 'click' eventListener to the dots
            for(let n=0; n<that.elemCount; n++) {
                that.indicatorDotsAll[n].addEventListener('click', function() {
                    diffNum = Math.abs(n - that.currentElement);
                    if(n < that.currentElement) {
                        bgTime = getTime(); that.elemPrev(diffNum)
                    }
                    else if(n > that.currentElement) {
                        bgTime = getTime(); that.elemNext(diffNum)
                    }
                    // if n == that.currentElement nothing happens
                }, false)
            };
            that.dotOff(0);  // dot[0] is on, rest - off
            for(let i=1; i<that.elemCount; i++) {
                that.dotOn(i)
            }
        }
    };



    //----------------------------------- END SLIDER----------------------------------

    //------------------------carousel toggle---------------------

const listToggle = (e) => {

    const id = e.target.id;
    const glossaryKeys = Object.keys(glossaryItems);
    const glossaryValues = Object.values(glossaryItems)

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


//----------------------------FAQS------------------------------------
fetch('./questionsAnswers.json')
    .then(response => response.json())
    .then(data => getQuestionAnswers(data) )
    .catch(err => console.log(err))


    const getQuestionAnswers = (questionsAnswers) =>{

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

}



    // -------------------------- hamburger -----------------

    const showMenu = (e) => {

        document.getElementById('menuWrapper').classList.toggle('d-md-none');
        document.getElementById('hamburger').classList.toggle('cross');
        document.getElementById('hamburger').classList.toggle('hamburger');

    }

    document.getElementById('hamburger').addEventListener('click', showMenu)

const scrollFunc = (e) => {

    const headerMenu = document.querySelector('.header-menu');

    let coordinates = 600;
    if(window.innerWidth < 1024 && window.innerWidth > 577) { // breakpoints for tablet
        coordinates = 400
    } else if (window.innerWidth < 576) {  // breakpoints for mobile
        coordinates = 300
    }

    if (+window.pageYOffset > coordinates ){

        headerMenu.classList.add('gray-header')

    } else if ((window.pageYOffset < coordinates) && (headerMenu.classList.contains('header-menu'))){

        headerMenu.classList.remove('gray-header')
    }

    const menuItems = document.querySelectorAll('.main-page-nav-bar a')

    if ((window.pageYOffset > coordinates) && (window.pageYOffset <= coordinates*2.2)) {

        menuItems.forEach(item =>{
            item.classList.contains('active') ? item.classList.remove('active'): null;
        })
        menuItems[0].classList.add('active')

    } else if ((window.pageYOffset > coordinates*2.2) && (window.pageYOffset <= coordinates*4)){

        menuItems.forEach(item =>{
            item.classList.contains('active') ? item.classList.remove('active'): null;
        })
        menuItems[1].classList.add('active')

    } else if ((window.pageYOffset > coordinates*4) && (window.pageYOffset <= coordinates*6)){

        menuItems.forEach(item =>{
            item.classList.contains('active') ? item.classList.remove('active'): null;
        })
        menuItems[2].classList.add('active')

    } else if (window.pageYOffset <= coordinates){

        menuItems.forEach(item =>{
            item.classList.contains('active') ? item.classList.remove('active'): null;
        })

    }
}
document.addEventListener('scroll', scrollFunc)
