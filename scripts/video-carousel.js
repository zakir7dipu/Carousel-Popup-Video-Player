checgeMainViewerImage();

$('#videosCarousel').carousel({
    interval :5000,
    pause: true
}).on('slide.bs.carousel', function () {
    checgeMainViewerImage();
});

$('.carousel .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<2;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
    }
});

$(".carousel").swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');
    }

});

function checgeMainViewerImage() {
    let activeItem = $('.videosCarousel-inner .carousel-item.active ');
    $('#mainPlayerThumbnail').attr('src', activeItem.find('img').attr('src')).attr('data-file', activeItem.attr('data-file')).on('click', viewPopupPlayer);
}

function viewPopupPlayer(){
    $('#videosCarousel').carousel('pause');
    let video = $(this).attr('data-file');
    video = video.replace('watch?v=', 'embed/')
    $('#popupVideoPlayer').modal('show').on('hidden.bs.modal', function (e) {
        $('#popupVideoPlayer .modal-dialog .modal-content iframe').attr('src', '');
        $('#videosCarousel').carousel('cycle');
    });
    $('#popupVideoPlayer .modal-dialog .modal-content iframe').attr('src', video);
}
