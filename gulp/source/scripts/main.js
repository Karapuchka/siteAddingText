
const modalOption = document.querySelector('.modal-option');

gsap.to('.user-icon', {
    background: `url(${localStorage.getItem('userIcon')}) no-repeat center center`,
    backgroundSize: '100%',
    opacity: 1,
    duration: .8,
});

gsap.to('.greetings', {
    delay: .6,
    opacity: 1,
    duration: .7,
    y: -70,
});

setTimeout(()=>{
    gsap.to('.preloader', {
        opacity: 0,
        duration: .5,
    });

    gsap.to('.preloader', {
        delay: .8,
        display: 'none',
    });
}, 2500)

let detect = new MobileDetect(window.navigator.userAgent)

// Анимация для мобильной и ПК версиях
if(detect.mobile()){

} else {
    document.querySelector('.header').onpointerover = (event)=>{
        if(event.target.closest('.btn') && !event.target.classList.contains('btn-active')){

            gsap.to(event.target.closest('.btn'), {
                duration: .7,
                backgroundColor: '#5B8FD4',
            })
        }
    }

    document.querySelector('.header').onpointerout = (event)=>{
        if(event.target.closest('.btn') && !event.target.classList.contains('btn-active')){

            gsap.to(event.target.closest('.btn'), {
                duration: .7,
                backgroundColor: '#fff',
            })
        }
    }

    document.querySelector('.header').onclick = (event)=>{

        if(event.target.closest('.btn')){

            if(event.target.classList.contains('btn-active')){

                event.target.classList.remove('btn-active');

                gsap.to(event.target.closest('.btn'), {
                    duration: .7,
                    backgroundColor: '#fff',
                })
                
            } else{

                if(event.target.classList.contains('paragraf-align')){
                    validBtn([document.getElementById('paragraf-align-left'), document.getElementById('paragraf-align-center'),
                    document.getElementById('paragraf-align-right'), document.getElementById('paragraf-align-justify')])
                }

                if(event.target.classList.contains('paragraf-list')){
                    validBtn([document.getElementById('paragraf-list-markers'), document.getElementById('paragraf-list-numbers')])
                }

                event.target.classList.add('btn-active');

                gsap.to(event.target.closest('.btn'), {
                    duration: .7,
                    backgroundColor: '#5B8FD4',
                })
            }
        } 

        if(event.target.closest('#btn-option')){

            //Открытие модального окна с настройками
            if(modalOption.style.display == 'none' || modalOption.style.display == ''){

                gsap.to(modalOption, {
                    duration: .1,
                    display: 'flex',
                })
    
                gsap.to(modalOption, {
                    delay: .4,
                    duration: .7,
                    opacity: '1',
                })
            } else {

                gsap.to(modalOption, {
                    duration: .7,
                    opacity: '0',
        
                })
        
                gsap.to(modalOption, {
                    delay: .8,
                    duration: .1,
                    display: 'none',
                })
            }
        }
    }
}

//Необходим для переключения активных кнопок в одной группе (Например: выравнивание текста)
function validBtn(array){
    for (let i = 0; i < array.length; i++) {
        
        if(array[i].classList.contains('btn-active')){

            array[i].classList.remove('btn-active');

            gsap.to(array[i], {
                duration: .7,
                backgroundColor: '#fff',
            })
        }
    }
}

modalOption.onclick = (event)=>{

    if(event.target.closest('#modal-header-btn-user') && !event.target.classList.contains('modal-option__header__menu__item--active')){
        
        event.target.classList.add('modal-option__header__menu__item--active');

        document.getElementById('modal-header-btn-option').classList.remove('modal-option__header__menu__item--active');

        gsap.to('.modal-option__main__slider-line', {
            duration: .7,
            x: '0',
        })
    }

    if(event.target.closest('#modal-header-btn-option') && !event.target.classList.contains('modal-option__header__menu__item--active')){
        
        event.target.classList.add('modal-option__header__menu__item--active');

        document.getElementById('modal-header-btn-user').classList.remove('modal-option__header__menu__item--active');

        gsap.to('.modal-option__main__slider-line', {
            duration: .7,
            x: '-50%',
        })
    }
}
let countP = 1;
let countS = 1;
let coutnIndex = 1;
document.onkeydown = (event)=>{
    if(event.code == 'Enter'){
        event.preventDefault();

        coutnIndex++;
        countS++;
        countP++;
        document.querySelector('.working-panel').appendChild(p(`p${countP}`, coutnIndex));
        document.getElementById(`p${countP}`).focus();
        document.getElementById(`p${countP}`).appendChild(span(`s${countP}`, coutnIndex));
    }

    if(event.code == 'Space'){
        event.preventDefault();

        countS++;
        coutnIndex++;
        for(let i = 0; i < document.querySelector('.working-panel').length; i++){

            if(document.querySelector('.working-panel').children[i].children.length != 0){

                for(let j = 0; j < document.querySelector('.working-panel').children[i].children.length; j++){

                    if(document.querySelector('.working-panel').children[i].children[j].hasFocus()){

                        document.querySelector('.working-panel').children[i].children[j].appendChild(span(`s${countS}`, coutnIndex));
                        document.getElementById(`s${countS}`).focus();
                        break;
                    }
                    
                }
            }
        }

        document.querySelector('.working-panel').appendChild(span(`s${countP}`, coutnIndex));
        document.getElementById(`s${countP}`).focus();
    }
}

function p(count, countI){
    let p = document.createElement('p');
    p.setAttribute('id', count);
    p.setAttribute('tabindex', countI);
    return p;
}

function span(count, countI){
    let span = document.createElement('span');
    span.setAttribute('contenteditable', 'true');
    span.setAttribute('id', count);
    span.setAttribute('tabindex', countI);
    return span;
}