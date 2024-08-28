'use strict'; //KOPHET84
document.addEventListener('DOMContentLoaded', function () {
    let elem = document.documentElement,
    body = document.body,
    btn1 = document.querySelectorAll('.btn-1'),
    tabContent = document.querySelectorAll('.tab-content'),
    closeModal = document.querySelectorAll('.close'),
    openModal = document.querySelectorAll('.open-modal'),
    modal = document.querySelectorAll('.modal'),
    responseTrue = document.querySelectorAll('.response-true'),
    responseFalse = document.querySelectorAll('.response-false'),
    answer = document.querySelectorAll('.answer'),
    results = document.querySelector('.results'),
    restart = document.querySelector('.restart'),
    check = document.querySelector('.check'),
    checkChange = document.querySelector('.check-change'),
    resultAns = document.querySelectorAll('.result-ans'),
    imgAns = document.querySelectorAll('.imgAns'),
    textHeader = document.querySelector('.text-header'),
    help = document.querySelector('.help'),
    amount = 0;
    const textFalse = [],
    textTrue = []; 

    helpFlash();
    //console.log(window.innerWidth)
    function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { 
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { 
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();
      }
    }
    function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

    textFalse[0] = 'Неверно. Позвонить нужно до того, как вы начали ответное взаимодействие с полицейским, чтобы сообщить всю необходимую информацию до возможного задержания.';
    textFalse[1] = 'Не стоило так делать. При задержании важно вести себя спокойно: не идти на конфликт с полицейскими, не пытаться сбежать или применить силу. \n Вас догнали, вменили неповиновение и сопротивление сотруднику полиции и грубо потащили к машине.';
    textFalse[2] = 'Ваш паспорт остался у сотрудников военкомата, хотя изымать его было незаконно. Теперь у сотрудников будет больше оснований для давления на вас с целью удержания в военкомате.';
    textFalse[3] = 'Ох, это было зря. Сотрудники военкомата могут задабривать и обещать что-то хорошее или наоборот пугать, но, не стоит им верить. ';
    textFalse[4] =  'Увы, это снова был обман. Вам предлагали пройти контрольный медицинский осмотр перед отправкой, во время него уже не могут менять выставленную категорию годности. Более того, оригиналы медицинских документов вы всегда должны оставлять у себя, подавать нужно исключительно заверенные копии. ';

    textTrue[0] = 'Отлично, звонить нужно до того, как вы начали ответное взаимодействие, чтобы сообщить всю необходимую информацию до возможного задержания.';
    textTrue[1] = 'Это разумное решение. Хорошо, если в «папке безопасности» специально для таких случаев заготовлены визитки с нужными контактами. При задержании важно вести себя спокойно: не идти на конфликт с полицейскими, не пытаться сбежать или применить силу. \n К сожалению, полицейская машина была припаркована очень близко — по пути было мало прохожих, никто их них не откликнулся на вашу просьбу.';
    textTrue[2] = 'Вам отдали паспорт, теперь у сотрудников будет меньше оснований для давления на вас с целью удержания в военкомате. ';
    textTrue[3] = 'Отличный выбор! Сотрудники военкомата любят задабривать и обещать что-то хорошее или наоборот пугать, но обычно эти разговоры далеки от правды.';
    textTrue[4] = 'Все верно. Вам предлагали пройти контрольный медицинский осмотр перед отправкой, во время него уже не могут менять выставленную категорию годности. Более того, оригиналы медицинских документов вы всегда должны оставлять у себя, подавать нужно исключительно заверенные копии.';

    textHeader.classList.add('hide');
    showTabContent(0);
    changeColor();
    resultAns.forEach((element,key,array)=>{
        responseFalse[key].addEventListener('click',function(){
            hideTabContent(key+1);
            showAnsContent(key);
        });
        responseTrue[key].addEventListener('click',function(){
            hideTabContent(key+1);
            showAnsContent(key);
        });
        btn1[key+1].addEventListener('click', function(){
            hideAnsContent(key);
        });
    });

    btn1.forEach((element,key,array)=>{
        array[key].addEventListener('click', function(){
            if(key===0&&window.innerWidth<700){
                openFullscreen();
            };
            hideTabContent(key);
            showTabContent(key+1);
            checkChange.textContent='';
            if(key<5){btn1[key+1].disabled="disabled"};
            if(key==6){
                if(window.innerWidth<700){
                    closeFullscreen();
                };
                btn1[6].disabled='';
                if(amount >= 90) {imgAns[imgAns.length-1].classList.add('happy');results.innerHTML='Вы отлично справились с заданиями! Ваши знания должны помочь вам в экстренной ситуации, но, если вы не уверены, что достаточно подготовлены к призыву или попытке насильственного призыва, <a href=https://soldiersmothers.ru/contacts/question>свяжитесь с нами.</a>'}
                else if(amount >= 70) {imgAns[imgAns.length-1].classList.add('sad');results.innerHTML='Вы кое-что знаете о том, как нужно взаимодействовать с сотрудниками военкомата и полиции. К сожалению, в реальной жизни этих знаний может быть недостаточно. Изучите все материалы о подготовке к призыву и защите от насильственного призыва и <a href=https://soldiersmothers.ru/contacts/question>свяжитесь с нами </a>, чтобы обсудить эффективную стратегию действий.'}
                else {imgAns[imgAns.length-1].classList.add('sad');results.innerHTML='Сегодня вам повезло, но в реальной жизни на удачу полагаться не стоит. Изучите все материалы о подготовке к призыву и защите от насильственного призыва. Обязательно <a href=https://soldiersmothers.ru/contacts/question>свяжитесь с нами</a>, чтобы обсудить эффективную стратегию действий.'}
            }
        });
    });

    for(let i=0;i<responseFalse.length;i++){
        responseFalse[i].addEventListener('click',function(){
            textHeader.classList.add('show');
            responseFalse[i].disabled="disabled";
            responseTrue[i].disabled="disabled";
            answer[i].style.color = "#E94D63";
            amount -=10;
            check.textContent = amount;
            btn1[i+1].disabled='';
            if(i==0){imgAns[i].classList.add('sad');answer[i].innerText = textFalse[i]; checkChange.textContent=' -10';checkChange.style.color = '#E94D63'}
            else if(i==1){imgAns[i].classList.add('sad');answer[i].innerText = textFalse[i];checkChange.textContent = ' -10';checkChange.style.color = '#E94D63'}
            else if(i==2){imgAns[i].classList.add('sad');answer[i].innerText = textFalse[i];checkChange.textContent = ' -10';checkChange.style.color = '#E94D63'}
            else if(i==3){imgAns[i].classList.add('sad');answer[i].innerText = textFalse[i];checkChange.textContent = ' -10';checkChange.style.color = '#E94D63'}
            else if(i==4){imgAns[i].classList.add('sad');answer[i].innerText = textFalse[i];checkChange.textContent = ' -10';checkChange.style.color = '#E94D63'}
        });

        responseTrue[i].addEventListener('click',function(){
            textHeader.classList.add('show');
            btn1[i+1].disabled='';
            responseFalse[i].disabled="disabled";
            responseTrue[i].disabled="disabled";
            answer[i].style.color = "#00AAA3";
            if(i==0){amount +=10;check.textContent = amount;imgAns[i].classList.add('happy');answer[i].innerText = textTrue[i];checkChange.textContent=' +10';checkChange.style.color = '#00AAA3'}
            else if(i==1){amount +=20;;check.textContent = amount;imgAns[i].classList.add('happy');answer[i].innerText = textTrue[i];checkChange.textContent=' +20';checkChange.style.color = '#00AAA3'}
            else if(i==2){amount +=10;check.textContent = amount;imgAns[i].classList.add('happy');answer[i].innerText = textTrue[i];checkChange.textContent=' +10';checkChange.style.color = '#00AAA3'}
            else if(i==3){amount +=30;check.textContent = amount;imgAns[i].classList.add('happy');answer[i].innerText = textTrue[i];checkChange.textContent=' +30';checkChange.style.color = '#00AAA3'}
            else if(i==4){amount +=30;check.textContent = amount;imgAns[i].classList.add('happy');answer[i].innerText = textTrue[i];checkChange.textContent=' +30';checkChange.style.color = '#00AAA3'}
        });
    };

    modal.forEach((element, key, array)=>{
        body.addEventListener('dblclick',function(e){
            e.preventDefault();
            array[key].classList.remove('opacity');
        });
        closeModal[key].addEventListener('click', function (e){ 
            e.preventDefault();
            array[key].classList.remove('opacity');
        });
        openModal[key].addEventListener('click', function(e){
            e.preventDefault();
            array[key].classList.add('opacity');
        }); 

    });

    restart.addEventListener('click', function(){
        textHeader.classList.remove('show');
        showTabContent(0);
        amount = 0;
        check.textContent = '';
        hideTabContent(7);
        for(let i=0;i<responseTrue.length;i++){
        responseFalse[i].disabled='';
        responseTrue[i].disabled='';
        answer[i].textContent='';
        }
        for(let i=0;i<imgAns.length;i++){
            imgAns[i].classList.remove('happy');
            imgAns[i].classList.remove('sad');
        }
    });
    function helpFlash(){
        if(help.style.color==='red'){
            help.style.color = 'blue';
        }
        else(help.style.color='red')
    }
    function changeColor(){
       setInterval(flash, 400);
       setInterval(helpFlash, 500);
    };
    function flash() {
        for(let i=0;i<openModal.length;i++){
        if (openModal[i].style.opacity==1){openModal[i].style.opacity= 0.7;}
        else {openModal[i].style.opacity= 1;}
      }
    };
    function showTabContent(a){
        tabContent[a].classList.remove('hide');
        tabContent[a].classList.add('show');
    };
    function hideTabContent(b) {
        tabContent[b].classList.remove('show');
        tabContent[b].classList.add('hide');
    };
    function showAnsContent(a) {
        resultAns[a].classList.remove('hide');
        resultAns[a].classList.add('show');
    };
    function hideAnsContent(b) {
        resultAns[b].classList.remove('show');
        resultAns[b].classList.add('hide');
    };
});
