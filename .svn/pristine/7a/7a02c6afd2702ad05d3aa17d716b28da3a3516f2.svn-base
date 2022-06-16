$(document).ready(function(){
    // nice select 초기화
    $('select').niceSelect();

    //스와이퍼 초기화
    new Swiper('.swiper-container');

    const mySwiper = new Swiper('.view-swiper-container', {
    // 슬라이드를 버튼으로 움직일 수 있습니다.
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
        
    // 현재 페이지를 나타내는 점이 생깁니다. 클릭하면 이동합니다.
    pagination: {
        el: '.swiper-pagination',
        //type: 'bullets',
        clickable: true,
    },

    // 현재 페이지를 나타내는 스크롤이 생깁니다. 클릭하면 이동합니다.
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
        
    // 3초마다 자동으로 슬라이드가 넘어갑니다. 1초 = 1000
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
    loopAdditionalSlides: 1
    });

    /*//검색창 nice select 스와이퍼
    const SearchSwiper = new Swiper('.search-select .nice-select .list', {

    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    mousewheel: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    }
    
    });
    
    //검색 결과창 이미지 스와이퍼
    const ResultSwiper = new Swiper('div.container', {

    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    mousewheel: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
        
    });*/

});//jQuery end