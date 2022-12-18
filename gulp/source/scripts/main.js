'use strict'

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

            gsap.to(modalOption, {
                duration: .7,
                display: 'flex',
            })

            //Изменение размреа лини слайдера

            const modalOptionMain = document.querySelector('.modal-option__main');

            gsap.to('.modal-option__main__slider-line', {
                width: modalOptionMain.offsetWidth * 2 + 'px',
            })


            /* 
            
                Доделать слайдер, не отображается нормально

            */

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