'use strict';

if(!localStorage.getItem('countParagraf')){
    
    localStorage.setItem('countParagraf', '1');

}

if(!localStorage.getItem('userIcon')){
    
    localStorage.setItem('userIcon', '../images/iconUser.svg');

}

const modalOption = document.querySelector('.modal-option');
const workPanel   = document.querySelector('.working-panel .paragraf');

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

workPanel.onclick = (event)=>{

    //Удаляет метку с активного элемента
    for (let i = 0; i < workPanel.children.length; i++) {
        
        if(workPanel.children[i].classList.contains('active')){

            workPanel.children[i].classList.remove('active');
            break;
        
        }
    }

    event.target.classList.add('active');
}

workPanel.onkeydown = (event)=>{

    setTimeout(()=>{

      if(workPanel.children.length == 2){

        workPanel.classList.remove('active');

        workPanel.children[1].classList.add('active');

      }
    }, 10)

    if(event.code == 'Enter'){

        for (let i = 0; i < workPanel.children.length; i++) {
        
            if(workPanel.children[i].classList.contains('active')){

                workPanel.children[i].classList.remove('active');

                setTimeout(()=>{

                    workPanel.children[i + 1].classList.add('active');

                }, 100)

                break;
            }
        }
    }

    if(event.code == 'ArrowUp'){

        if(workPanel.children.length == 2){

            setTimeout(()=>{

                workPanel.children[0].classList.add('active');
                workPanel.children[1].classList.remove('active');

            }, 11);

        } else {

            for (let i = 0; i < workPanel.children.length; i++) {

                if(workPanel.children[i].classList.contains('active') && i == 0){
    
                    break;
    
                } else if(workPanel.children[i].classList.contains('active')){
    
                    workPanel.children[i].classList.remove('active');
    
                    setTimeout(()=>{
    
                        workPanel.children[i - 1].classList.add('active');
    
                    }, 100)
    
                    break;
                }
            }
        }
    }

    if(event.code == 'ArrowDown'){

        for (let i = 0; i < workPanel.children.length; i++) {

            if(workPanel.children[i].classList.contains('active') && i == workPanel.children.length - 1){

                break;

            } else if(workPanel.children[i].classList.contains('active')){

                workPanel.children[i].classList.remove('active');

                setTimeout(()=>{

                    workPanel.children[i + 1].classList.add('active');

                }, 100)

                break;
            }
        }
    }
}

//Функция выравнивания текста
function contentStyles(value, item){

    //value - значение, которое будет измененио
    //item - элемент, который будет изменён

    switch (value) {

        case 'left':
            
            item.classList.toggle('align-left');

            break;

        case 'right':

            item.classList.toggle('align-right');

            break;

        case 'justify':

            item.classList.toggle('align-justify');

            break;

        case 'center':

            item.classList.toggle('align-center');

            break;

        case 'weight':

            item.classList.toggle('font-weight');

            break;

        case 'style':

            item.classList.toggle('font-style');

            break;

        case 'decoration':

            item.classList.toggle('text-decoration');

            break;

        default:

            break;
    }

}