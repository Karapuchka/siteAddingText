'use strict';

const detect = new MobileDetect(window.navigator.userAgent);

const modalAddNote = document.querySelector('.add-note__modal')
const modalFilter  = document.querySelector('.options__filter-modal');
const addNoteBtn   = document.querySelector('.add-note__btn')

const filterBtn = document.getElementById('filter-btn');

if(detect.mobile() == null){

    window.addEventListener('pointerover', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){
            gsap.to(event.target.closest('.jsBtnAnimation'), {
                duration: .7, 
                background: '#d8d7d7',
            });
        }

    });

    window.addEventListener('pointerout', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){
            gsap.to(event.target.closest('.jsBtnAnimation'), {
                duration: .7, 
                background: '#ffffff',
            });
        }

    });

} else{

    window.addEventListener('click', (event)=>{

        if(event.target.closest('.jsBtnAnimation')){
            gsap.to(event.target.closest('.jsBtnAnimation'), {
                duration: .7, 
                background: '#fff',
            });
        
            setTimeout(()=>{
        
                gsap.to(name, {
                    duration: .7, 
                    background: '#ffffff',
                })
        
            }, 1800);
        }

    });
}

window.addEventListener('click', (event)=>{
 
    if(event.target.closest('#filter-btn') && !event.target.closest('.options__filter-modal')){

        modalMove(modalFilter, filterBtn);

    } else if (!event.target.closest('#filter-btn') && !event.target.closest('.options__filter-modal')){
        
        if(filterBtn.classList.contains('active')){
            modalClose(modalFilter, filterBtn);
        }
    }

    if(event.target.closest('.add-note__btn') && !event.target.closest('.add-note__modal')){

        modalMove(modalAddNote, addNoteBtn);

    } else if (!event.target.closest('.add-note__btn') && !event.target.closest('.add-note__modal')){

        if(addNoteBtn.classList.contains('active')){
            modalClose(modalAddNote, addNoteBtn);
        }
    }

});

function modalMove(modal, id){

    if(id.classList.contains('no-active')){

        id.classList.remove('no-active');

        id.classList.add('active');

        modal.style.display = 'flex';

        gsap.to(modal, {
            delay: .4,
            opacity: 1,
            y: 10,
            duration: 1,
            zIndex: 8,
            ease: 'back.out(3)',
        });

    } else{

        id.classList.remove('active');

        id.classList.add('no-active');

        gsap.to(modal, {
            opacity: 0,
            y: -10,
            zIndex: 1,
            duration: 1,
            ease: 'back.in(3)',
        });

        setTimeout(()=>{
            modal.style.display = 'none';
        }, 1100);
    }
}

function modalClose(modal, id){
        id.classList.remove('active');

        id.classList.add('no-active');

        gsap.to(modal, {
            opacity: 0,
            y: -10,
            zIndex: 1,
            duration: 1,
            ease: 'back.in(3)',
        });

        setTimeout(()=>{
            modal.style.display = 'none';
        }, 1100);
}