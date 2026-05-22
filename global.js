// var inp;
//
// var cursect = 0;
// var sections = [];
// var offsections = [];
// let template_val = {};
// let template_data = {};
// var data_value = {};
// var iframe = $('iframe');
// var tplwrapper = $('.ct-template_wrapper');
// var ifh = iframe.height();
// var ifw = iframe.width();
var checkCook;
var cursort_template = 0;
// var grayscales = {};
var psending = false;
var pres_timer;
var pre_sect = 0;
var current_own = -1;
var pers_block_available = 0;
// var dweeks = constr_terms['ln-dweeks'];
// var dweeks_short = constr_terms['ln-dweeks-short'];
// var tmonths = constr_terms['ln-months'];
// var tmonthsr = constr_terms['ln-months-rod'];
// var tmonths_ln = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// var template_config = {};

// var image_fields = ['COVER_PHOTO', 'BRIDE_PHOTO', 'GROOM_PHOTO', 'TIMING_PHOTO', 'SPLASH', 'STORY_PHOTO', 'HELLO_PHOTO_ONE', 'LOCATION_PHOTO', 'PHOTO_ONE', 'TIMING_PHOTO', 'DATETIME_PHOTO_ONE', 'WISH_PHOTO_ONE', 'HELLO_PHOTO', 'TIMER_PHOTO_ONE', 'CONTACTS_PHOTO_ONE', 'ANKETA_PHOTO_ONE', 'BYE_PHOTO_ONE', 'BYE_PHOTO2_ONE'];  //Одно фото
// var galleries = ['MAIN_GALLERY', 'DRESSCODE_GIRLS_GALLERY', 'DRESSCODE_GUYS_GALLERY', 'LOCATION_GALLERY', 'CONTACT_PHOTO'];  // галлереи в сетки
// var gallery_items = ['MAIN_GALLERY_ITEMS', 'DRESSCODE_GIRLS_GALLERY_ITEMS', 'DRESSCODE_GUYS_GALLERY_ITEMS', 'LOCATION_GALLERY_ITEMS', 'HELLO_PHOTO_ITEMS', 'CONTACT_PHOTO_ITEMS', 'LOCATION_PHOTO_ITEMS', 'COVER_PHOTO_ITEMS', 'STORY_PHOTO_ITEMS', 'ANKETA_PHOTO_ITEMS', 'OWN_IMAGES', 'NEW_OWN_IMAGES'];  //Одиночные в галлереи
// var text_items = ['WISH_TEXT_ITEMS', 'TIMING_1', 'TIMING_2', 'TIMING_3', 'TIMING_4', 'TIMING_DESC', 'ANKETA_DRINKS', 'LOCATION_TIMING'];

var bltpl = '';
var questfilled = false;
var dweeks_short_init = false;

// var tmonths_de = [
//     "Januar",
//     "Februar",
//     "März",
//     "April",
//     "Mai",
//     "Juni",
//     "Juli",
//     "August",
//     "September",
//     "Oktober",
//     "November",
//     "Dezember"
// ];


//конструктор (?) не вижу ни одного ct-phone_check в коде
$(document).on('input', '.ct-phone_check', function () {
    this.value = this.value.replace(/[^0-9()+\-]/gi, '');
    //var phone = this.value;
})

//конструктор, но элемент скрыт
$('.ct-switch_template').click(function () {
    $('.ct-panel_settings-page').removeClass('active')
    $('#mainPanel').toggleClass('active', true);
    $('#selectTpl').toggleClass('active', true);
})


$(window).on('resize', function () {
    ifresize()
})


//  И конструктор и просмотр. Надо делить
function ifresize() {
    tplwrapper.css('transform', 'scale(1)')
    iframe.css('transform', 'scale(1)').css('height', '100%').css('width', '100%').css('margin-top', 0).css('margin-left', 0);
    var ifh = 875;
    var ifw = 425;
    var mw = 390;

    if (!tplwrapper.hasClass('ct-iphone-wrapper')) {
        if ($(window).innerWidth() > 768) {
            mw = 1920;
        }
        ifw = iframe.width();
        ifh = iframe.height();
    }

    var is1 = $('.ct-template_container').innerWidth() / mw
    var nifw = ifw / is1;
    var nifh = ifh / is1;
    var mt = (ifh - nifh) / 2
    var ml = (ifw - nifw) / 2
    if (!tplwrapper.hasClass('ct-iphone-wrapper')) {
        if ($(window).innerWidth() <= 768) {
            nifw = mw;
            nifh = Math.ceil(ifh / is1);
            mt = Math.ceil((ifh - nifh) / 2)
            ml = Math.ceil((ifw - nifw) / 2)
        }

        iframe.css('transform', 'scale(' + is1 + ')').css('height', nifh).css('width', mw).css('transform-origin', 'top, left').css('margin-top', mt).css('margin-left', ml)
    } else {
        is1 = $(window).innerHeight() / (885 * 1.25);
        $('.ct-iphone-wrapper').css('transform', 'scale(' + is1 + ')').css('transform-origin', 'center');
    }

    if (typeof ($('[name="contact_link"]')) != 'undefined' && $('[name="contact_link"]').parents('.ct-panel_settings-page.active').length > 0) {
        if ((data_value['CONTACTS_LINK'].value == '' || data_value['CONTACTS_LINK'].value == 'wedwed_russia') && data_value['CONTACTS_LINK'].type != '5') {
            $('[name="contact_link"]').val('');
            $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
        }
    }

    if ($('.ct-image_uploader-info_alt[data-for="OWN_IMAGES_5"] .ct-image_uploader-preview_examples.slick-initialized').length > 0) {
        $('.ct-image_uploader-info_alt[data-for="OWN_IMAGES_5"] .ct-image_uploader-preview_examples').slick('setPosition');
    }

    if ($('.ct-image_uploader-info_alt[data-for="NEW_OWN_IMAGES_5"] .ct-image_uploader-preview_examples.slick-initialized').length > 0) {
        $('.ct-image_uploader-info_alt[data-for="NEW_OWN_IMAGES_5"] .ct-image_uploader-preview_examples').slick('setPosition');
    }

    // setTimeout(function () {
    setFontSize();
    autoResizeText();
    // }, 200);
}


//конструктор. Используется ifresize (!)
$('.ct-edit_template').click(function () {
    if ($(this).hasClass('ct-mob-menu-icon')) {
        if ($('#secondPanel.active').length > 0) {
            $('#secondPanel').removeClass('active')
            $('.ct-panel_sub').removeClass('active');
            $('.ct-panel_settings-page').removeClass('active');
        } else {
            $('#mainPanel').toggleClass('active', true);
            $('#mainPanel .ct-panel_settings-page').toggleClass('active', false);
            $('#mainSettings').toggleClass('active', true);
        }
        $('#mainPanel').scrollTop(0);
    } else {
        $('#mainPanel').toggleClass('active', true);
        $('#secondPanel').toggleClass('active', false);
        $('.ct-panel_settings-page').removeClass('active');
        $('#mainSettings').toggleClass('active', true);
        ifresize();
    }
})


// конструктор. Используется ifresize (!)
$(document).on('click', '.ct-panel_close', function () {
    if ($(this).parents('.ct-pleasepay').length > 0) {
        $('.ct-pleasepay').removeClass('active');
    } else {
        $(this).parents('.ct-panel:first').removeClass('active');
        if ($(this).closest('.ct-panel_settings-page').length > 0) {
            $(this).closest('.ct-panel_settings-page').removeClass('active');
        }
        $('.ct-panel_sub').removeClass('active');
        ifresize();
    }
})


// конструктор
$(document).on('click', '.ct-color-wrapper .ct-color-remove', function () {
    var p = $(this).parents('.ct-color-wrapper');
    var parent = $(this).parents('.ct-colors-wrapper');
    if (parent.find('.ct-color-wrapper').length > 1) {
        p.remove();
        $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
    }
    parent.find('.ct-color-remove').toggleClass('ct-hidden', parent.find('.ct-color-wrapper').length <= 1)
})

// конструктор
$(document).on('click', '.ct-color-wrapper .ct-color-add', function () {
    $(this).parents('.ct-colors-wrapper').append($(this).parent().clone())
    var parent = $(this).parents('.ct-colors_wrapper');
    parent.find('.ct-color-remove').toggleClass('ct-hidden', parent.find('.ct-color_wrapper').length <= 1)
    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
})

// конструктор
$(document).on('input', 'input[type="color"]', function (event) {
    $(this).parent().find('span.ct-color').removeClass('empty').css('background-color', $(this).val());
});

// конструктор. Используется ifresize (!)
$('input[name="ct-device"]').on('change', function () {
    tplwrapper.toggleClass('ct-iphone-wrapper', $(this).val() > 0)
    ifresize();
})


//конструктор, но в просмотр seo должно попадать
var seo_timer
$('input[name="seo_description"], input[name="seo_title"]').on('input', function () {

    clearTimeout(seo_timer);
    seo_timer = setTimeout(function () {
        var set = $('input[name="seo_title"]').val();
        var des = $('input[name="seo_description"]').val();
        $.post(ajax_url, {project: project, action: 'setseo', set: set, des: des}, function () {

        })
    })

})

// см. выше
ifresize();


// конструктор
$('#setupBlock').click(function () {
    $('#secondPanel').toggleClass('active', true);
    $('#secondPanel .ct-panel_settings-page').removeClass('active')
    //console.log('close-panel-4');
    $('#secondPanel .ct-panel_settings-page[data-section="' + (cursect + 1) + '"]').addClass('active')
    $('#mainPanel').toggleClass('active', false);
    ifresize();
})

// конструктор
$(document).on('input', '.ct-input', function () {
    var p = $(this).parents('.ct-panel_settings-page[data-section]')
    if($(this).attr('type')!='color') {
        if (p.length > 0) {
            p.find('.submit_current').toggleClass('active', true);
        }
    }else{
        if(p.hasClass('active')){
            p.find('.submit_current').toggleClass('active', true);
        }
    }
})

// коструктор
$('.ct-button_ask').click(function () {
    $('#mainPanel .ct-panel_settings-page').removeClass('active')
    $('#askSupport').toggleClass('active', true);
    $('#mainPanel').scrollTop(0);
})

// конструктор
$('.ct-menu li').click(function () {
    if ($(this).hasClass('ct-menu-icon_active')) {
        $(this).removeClass('ct-menu-icon_active')
    }
    var sect = $(this).data('item');
    $('#mainPanel .ct-panel_settings-page').removeClass('active');
    $('#' + sect).toggleClass('active', true)
    if (sect == 'customizeView') {
        if ($('.ct-hello_wrapper').length > 0 && !$('.ct-hello_items').hasClass('swiper-initialized')) {
            var h = $('.ct-hello_items').attr('data-current');
            h = (h == '') ? 0 : h;
            // var helloInit = $('.ct-hello_item[data-id="' + h + '"]').index();
            var helloInit = $('.swiper-slide:has(.ct-hello_item[data-id="' + h + '"])').index();

            // $('.ct-hello_items').slick({
            //     slidesToShow: 3,
            //     variableWidth: true,
            //     infinite: false,
            //     swipeToSlide: true,
            //     touchMove: false,
            //     initialSlide: helloInit,
            //     centerMode: true,
            // }).on('setPosition', function () {
            //     var did = $('.ct-hello_items .slick-current .ct-hello_item').attr('data-id');
            //     $('.ct-hello_edit').toggleClass('ct-hidden', did == '0');
            //     if (h != did) {
            //         h = did;
            //         resetIntro()
            //         checkIntroData();
            //     }
            // });

            const swiper = new Swiper('.ct-hello_items', {
                // Количество слайдов
                slidesPerView: 2.5,
                direction: 'horizontal',
                loop: false,
                centeredSlides: true,
                initialSlide: helloInit,
                navigation: {
                    nextEl: '.hello-swiper-but-next',
                    prevEl: '.hello-swiper-but-prev',
                },
                on: {
                    // Срабатывает при каждой смене слайда (после анимации)
                    slideChangeTransitionEnd: function () {
                        var did = $('.ct-hello_items .swiper-slide-active .ct-hello_item').attr('data-id');
                        $('.ct-hello_edit').toggleClass('ct-hidden', did == '0');
                        if (h != did) {
                            h = did;
                            resetIntro()
                            checkIntroData();
                        }
                    },
                    init: function () {
                        var activeSlide = $('.ct-hello_items .swiper-slide-active .ct-hello_item');
                        var hwrapper = $('.ct-hello_items');
                        // Добавляем data-атрибуты к активному слайду
                        // console.log(hwrapper.attr('data-current-str1'));
                        activeSlide.attr('data-current-string-1',hwrapper.attr('data-current-str1'));
                        activeSlide.attr('data-current-string-2',hwrapper.attr('data-current-str2'));
                        if(hwrapper.attr('data-current-str3')!='' && hwrapper.attr('data-current-str3')!=null){
                            activeSlide.attr('data-current-string-3',hwrapper.attr('data-current-str3'));
                        }
                        activeSlide.attr('data-current-dark',hwrapper.attr('data-current-dark'));
                        activeSlide.attr('data-current-blur',hwrapper.attr('data-current-blur'));
                    }
                }
            });
        }
    }
})

// конструктор
$('.ct-hello_edit').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        checkIntroData();
    } else {
        $('.ct-hello_data').toggleClass('active', false);
    }
    return false;
})

// конструктор
$('#intro_reset').click(function () {
    clearIntroInfo();
    resetIntro()
    checkIntroData();
})

// конструктор (уточнить не здесь ли приветствие собирается, вряд ли, но все-таки)
$('#intro_save').click(function () {
    saveIntro(true);
})

// конструктор (уточнить не здесь ли приветствие собирается, вряд ли, но все-таки)
$('.ct-hello_submit').click(function (e) {
    e.preventDefault();
    resetIntro()
    checkIntroData();
    saveIntro(true);
    return false;
})

// конструктор
$('.ct-panel_back').click(function () {
    if ($(this).parents('#filterTpl').length > 0) {
        $('#filterTpl').toggleClass('active', false);
        $('#selectTpl').toggleClass('active', true)
    } else {
        $('#mainPanel .ct-panel_settings-page').removeClass('active');
        $('#mainSettings').toggleClass('active', true)
    }
})

// конструктор
$(document).on('click', '.ct-input_select', function () {
    $(this).toggleClass('active');
    if (($(this).attr('id') == 'hfont' || $(this).attr('id') == 'tfont') && !$(this).hasClass('inited')) {
        $(this).addClass('inited')
        $.each($(this).find('li'), function () {
            var svg = $(this).attr('data-file');
            $(this).append('<img src="/sitemaker/css/fontcss/' + svg + '.svg">');
        })
    }
})

// конструктор
$(document).on('click', '.ct-input_select li', function () {
    $(this).parents('ul').find('li').removeClass('ct-input_select-current');
    $(this).addClass('ct-input_select-current');
    $(this).parents('.ct-input_select').find('span').text($(this).text());

    if ($(this).parents('.ct-input_select').prop('id') == 'introd') {
        var did = $(this).attr('data-id');
        // console.log('ct-input-select click');
        $.post(ajax_url, {action: 'setintro', iid: did, project: project}, function (data) {

        })
    }

    if ($(this).parents('.ct-input_select').prop('id') == 'music') {
        var did = $(this).attr('data-id');
        $.post(ajax_url, {action: 'setmus', mid: did, project: project}, function (data) {

        })
    }

    if ($(this).parents('.ct-input_select').attr('data-type') == 'question') {
        var dtype = $(this).attr('data-type');
        var did = $(this).parents('.ct-input_select').attr('data-id');
        switchQuestionType(dtype, did);
    }

    if ($.inArray($(this).parents('.ct-input_select').prop('id'), ['hfont', 'tfont', 'anim_speed', 'anim_type']) !== -1) {
        var key = '';

        if ($(this).parents('.ct-input_select').prop('id') == 'hfont') {
            key = 'headerStyle';
        } else if ($(this).parents('.ct-input_select').prop('id') == 'tfont') {
            key = 'textStyle'
        }

        if (key != '') {
            iframe.contents().find('#' + key).remove();
            var css = $(this).attr('data-file');
            const linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('id', key)
            linkElement.setAttribute('href', '/sitemaker/css/fontcss/' + css + '.min.css');
            iframe.contents().find('head').append(linkElement);
        }
        saveSettings();
    }


    if ($(this).parents('.ct-own_block-setting_select').length > 0) {
        if ($('.ct-own_block-setting[data-sect]').length > 0) {
            if ($(this).parents('.ct-own_block-setting').attr('data-sect')) {
                // if($(this).attr('data-id')==0){
                //     let pre = ($(this).parents('.ct-own_block-setting').attr('data-sect')==211) ? 'NEW_' : '';
                //     console.log('remove '+pre+'OWN')
                //     data_value[pre+'OWN_SHOW'] = [];
                // }
                rebuildStructure($(this).attr('data-id'), $(this).parents('.ct-own_block-setting').attr('data-sect'));
            } else {
                rebuildStructure($(this).attr('data-id'), $(this).parents('.ct-panel_settings-page').attr('data-section'));

            }
        } else {
            rebuildStructure($(this).attr('data-id'));
        }

    } else if ($(this).parents('.ct-input_select').attr('id') == 'own_align') {
        $('[name="own_align"]').val($(this).attr('data-id')).trigger('input', typeof data_value['OWN_ALIGN'] == 'undefined' || data_value['OWN_ALIGN'] != $(this).attr('data-id'));
    } else if ($(this).parents('.ct-input_select').attr('id') == 'new_own_align') {
        $('[name="new_own_align"]').val($(this).attr('data-id')).trigger('input', typeof data_value['NEW_OWN_ALIGN'] == 'undefined' || data_value['NEW_OWN_ALIGN'] != $(this).attr('data-id'));
    }
})


// конструктор
$(document).on('input', '#secondPanel [name="location_map"]', function () {
    checkUrl($(this).next('span'), $(this).val())
})


// конструктор
$(document).on('click', '.ct-image_preview i', function () {
    $(this).toggleClass('active')
    $(this).parents('.ct-image_preview').attr('data-filter', ($(this).hasClass('active') ? 'black' : ''));
    var cat = $(this).parents('.ct-image_uploader-info').attr('data-for');
    var ind = $(this).parents('.ct-image_preview').index();
    var objindex = grayscales.findIndex((obj => obj.name == cat));
    if (objindex === -1) {
        grayscales.push({name: cat, data: []});
    }

    objindex = grayscales.findIndex((obj => obj.name == cat));
    if ($(this).hasClass('active')) {
        grayscales[objindex].data.push(ind)
    } else {
        var index = grayscales[objindex].data.indexOf(ind);
        if (index !== -1) {
            grayscales[objindex].data.splice(index, 1);
        }
    }

    $.post(ajax_url, {action: 'grayscales', data: JSON.stringify(grayscales), project: project}, function (data) {
        doGrayscales();
    });
})

// конструктор
$(document).on('click', '.ct-image_uploader', function () {
    $(this).closest('input[type="file"]').click();
})

// конструктор
$(document).on('change', 'input[type="file"]:not(.ct-music_file):not(.ct-video_file)', function () {
    var data = new FormData();
    var that = $(this);
    var cont = that.parents('.ct-image_uploader')
    var upinfo = that.parents('.ct-image_uploader-info')
    data.append('action', 'images');
    data.append('project', project)
    var name = $(this).attr('name').toUpperCase();
    if (typeof cropInit !== "undefined" && iframe.contents().find('.ct-photo_cropper').length === 0) {
        preCrop(that[0].files[0], cont, upinfo);
    } else {
        $.each(that[0].files, function (i, file) {
            data.append(name, file);
        });

        cont.find('.ct-image_upload-status div').css('width', 0);
        cont.find('.ct-image_upload-status').toggleClass('active', true);
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        cont.find('.ct-image_upload-status div').css('width', percentComplete);

                        if (percentComplete === 100) {
                            cont.find('.ct-image_upload-status').toggleClass('active', false);
                        }
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: ajax_url,
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                if (result != '' && result != 'ok') {
                    var res = JSON.parse(result);

                    if (typeof (that.attr('multiple')) == 'undefined' && cont.hasClass('ct-image_uploader-single')) {
                        if (res[0] && res[0] != '') {
                            upinfo.find('.ct-image_preview:not(.ct-image_uploader)').css('background-image', 'url(' + res[0] + ')').attr('data-url', res[0].split('/sitemaker/').join('/'));
                        }
                    } else {
                        var ko = upinfo.find('.ct-image_preview:not(.ct-image_uploader)').length;
                        var rlen = res.length;
                        var cnt = that.data('count');
                        if (cnt > 0) {
                            if (rlen >= cnt) {
                                ko = 0;
                                upinfo.find('.ct-image_preview:not(.ct-image_uploader-origin)').remove();
                            } else if (rlen > cnt - ko) {
                                ko = cnt - rlen;
                                $.each(upinfo.find('.ct-image_preview:not(.ct-image_uploader-origin)'), function (ki, vi) {
                                    if (ki >= ko) {
                                        $(this).remove();
                                    }
                                })
                            }
                        }


                        if (res.length == 1 && !cont.hasClass('ct-image_uploader-origin')) {
                            cont.replaceWith('<li class="ct-image_preview" data-url="' + res[0].split('/sitemaker/').join('/') + '" style="background-image: url(' + res[0] + ')"><span></span><i></i></li>');
                        } else {
                            $.each(res, function (k, v) {
                                if (upinfo.find('.ct-image_preview:not(.ct-image_uploader-origin)').length < cnt) {
                                    that.parents('.ct-image_uploader').before('<li class="ct-image_preview" data-photos="tmp" data-photos-k="' + (Number(ko) + Number(k)) + '" data-url="' + v.split('/sitemaker/').join('/') + '" style="background-image: url(' + v + ')"><span></span></li>')
                                }
                            })
                        }


                    }

                    if (!upinfo.parents('.ct-panel_settings-page').hasClass('active') && !$('#secondPanel').hasClass('active')) {
                        upinfo.parents('.ct-panel_settings-page').find('.submit_current').click();
                    }
                }

                checkUploader(upinfo)
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
});

// конструктор
$(document).on('mouseover', '[data-hint]', function () {
    $(this).append('<div class="ct-input_helper">' + $(this).data('hint') + '</div>')
})

// конструктор
$(document).on('mouseout', '[data-hint]', function () {
    $('.ct-input_helper').remove();
})

// конструктор
$('.ct-send').click(function () {
    var uname = $('input[name="uname"]').val();
    var uemail = $('input[name="uemail"]').val();
    var utext = $('[name="utext"]').val();

    if (uname != '' && uemail != '' && utext != '') {
        $.post(ajax_url, {
            action: 'support',
            uname: uname,
            uemail: uemail,
            utext: utext,
            project: project
        }, function (data) {
            $('input[name="uname"]').val('');
            $('input[name="uemail"]').val('');
            $('[name="utext"]').val('');
            alert(constr_terms['ln-notify-support'])
            $('#askSupport').removeClass('active');
            $('#mainPanel').removeClass('active');
            ifresize();
        })
    }
})

// конструктор
$(document).on('click', '.ct-image_preview span', function () {
    if (confirm(constr_terms['ln-notify-image-remove'])) {
        // var p = $(this).parents('.ct-image_uploader-info');
        // $(this).parent().remove();
        // checkUploader(p)
        if ($(this).parents('.ct-image_uploader-info_alt').length > 0) {
            var v = ($(this).parents('.ct-panel_settings-page').attr('data-section') == '211') ? 'NEW_' : '';

            data_value[v + 'OWN_GALLERY_TYPE'] = 0;
            data_value[v + 'OWN_IMAGES'] = [];

            data_value[v + 'OWN_VIDEO'] = '';
            deleteOwnVideo(v == 'NEW_' ? 3 : 2);

            $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_cropper').remove();

            setActiveOwnGalleryItem(0, true, v);
        }

        var p = $(this).parents('.ct-image_uploader-info');
        var pt = $(this).parent();
        if (p.find('.ct-image_uploader-origin').find('.ct-input').data('slider') != 1) {
            var iu = p.find('.ct-image_uploader-origin').clone()
            iu.find('input').removeAttr('multiple')
            pt.replaceWith(iu.removeClass('ct-image_uploader-origin').removeClass('ct-hidden'));

            if (iu.find('input').attr('name') === 'own_images[]' || iu.find('input').attr('name') === 'new_own_images[]') {
                // клик на нее только из редакта, так что допустимо по active
                $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
            }
        } else {
            pt.remove();
            $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
        }

        checkUploader(p)
    }
})

// конструктор (добавить варианты ответа в опросах)
$(document).on('click', '.ct-input-dynamic_multiplier', function () {
    var toclone = $(this).prev();
    if (toclone.hasClass('ct-toclone')) {
        toclone.removeClass('ct-toclone').show()
    } else {
        var tcl = toclone.clone()
        if (toclone.find('.ct-input_answer').length > 0 && project != '') {
            var tclname = toclone.parents('.ct-addquests-item').find('.ct-panel_header').attr('for');
            tcl.find('.ct-input_answer').attr('name', tclname + '_answer[]');
        }
        toclone.after(tcl)
    }
    var wrapper = $(this).parent();
    $(this).prev().find('input').val('');
    $(this).prev().find('.ct-input_label span').text(wrapper.find('.ct-input_wrapper.ct-input-dynamic').length)
})

// конструктор (удалить вариант ответа в опросе)
$(document).on('click', '.ct-input_remover', function () {
    var wrapper = $(this).parents('.ct-input_wrapper').parent();
    var l = wrapper.find('.ct-input_wrapper.ct-input-dynamic').length;
    if (l > 1) {
        $(this).parents('.ct-input_wrapper').remove();
    } else {
        $(this).parents('.ct-input_wrapper').addClass('ct-toclone').hide();
    }


    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);

    $.each(wrapper.find('.ct-input_wrapper.ct-input-dynamic'), function (k, v) {
        $(this).find('.ct-input_label span').text(k + 1);
    })
})

// конструктор
$(document).on('click', '.ct-examples_toggle', function () {
    var ex = $(this).data('example');
    $('.ct-panel_sub .ct-panel_settings-page').removeClass('active');
    $('.ct-panel_sub .ct-panel_settings-page[data-ex=' + ex + ']').attr('data-for', $(this).data('for')).addClass('active')
    $('.ct-panel_sub').toggleClass('active')
})

//конструктор
$(document).on('click', '.ct-ai_button', function () {
    var that = $(this);
    var fo = that.attr('data-for');
    var ty = that.attr('data-type');
    var pa = 0;
    if (typeof that.attr('data-part') != 'undefined') {
        pa = that.attr('data-part');
    }

    var fi = $('#secondPanel').find('[name="' + fo + '"]');
    var iw = fi.parents('.ct-input_wrapper');
    if (iw.find('textarea').length > 0) {
        iw.find('.ck-editor').toggleClass('ck-loader', true);
    }
    that.toggleClass('active', true)
    $.post(ajax_url, {action: 'gentext', type: ty, part: pa, project: project}, function (data) {
        that.toggleClass('active', false)
        if (data != '0') {
            if (iw.find('textarea').length > 0) {
                iw.find('.ck-editor').toggleClass('ck-loader', false);
                var ck = iw.find('.ck-editor').attr('aria-labelledby');
                const domEditableElement = document.querySelector('[aria-labelledby="' + ck + '"] .ck-editor__editable_inline');
                const editorInstance = domEditableElement.ckeditorInstance;
                editorInstance.setData(data);
            } else {
                iw.find('input[type="text"]').val(data);
            }
        } else {
            alert('Генерация не удалась. попробуйте снова');
            if (iw.find('textarea').length > 0) {
                iw.find('.ck-editor').toggleClass('ck-loader', false);
            }
        }
    })
})



// ai lovestory весь клик, который ниже
$(document).on('click', '.ct-ai_button_form-open', function () {
    if($(this).attr('data-quiz')!=null){
        var quiz_id = $(this).attr('data-quiz');
        $.post(ajax_url, {action: 'getquiz', quiz_id: $(this).attr('data-quiz')}, function (data) {
            data = $.parseJSON(data);
            genQuestsModal(data,quiz_id);
        })
    }else{
        console.error('Quiz not found')
    }
})
// ai lovestory весь клик, который ниже
$(document).on('click', '.send-quiz', function () {
    if($(this).hasClass('active')) {
        $('.ct-modal-loading').css('display','block');
        var quiz_id = $(this).attr('data-type');
        console.log($(".ct-modal[data-modal=quest_modal] .quest_modal-form"));
        var questText = '';
        let index = 0;
        var questions = {};
        var answers = {};
        $.each($(".ct-modal[data-modal=quest_modal] .quest_modal-form input"), function () {
            // console.log($(this)[0]);
            var fieldName = $(this).attr('name');
            var fieldValue = $(this).val();
            if (fieldName.indexOf('quest') !== -1) {
                let fieldIndex = parseInt(fieldName.replace('quest-', ''));
                console.log('fieldIndex=' + fieldName.replace('quest-', ''));
                questions[fieldIndex] = fieldValue;
            }
            if (fieldName.indexOf('answ') !== -1) {
                let fieldIndex = parseInt(fieldName.replace('answ-', ''));
                console.log('fieldIndex=' + fieldName.replace("answ-", ""));
                answers[fieldIndex] = fieldValue;
            }
        });

        console.log(questions);
        console.log(answers);

        while (index < $(".ct-modal[data-modal=quest_modal] .quest_modal-form input").length / 2) {
            var questText = questText + 'В: «' + questions[index].replace(/['`´‘’‚‛′‹›«»„“”]/g, '"') + '», О: «' + answers[index].replace(/['`´‘’‚‛′‹›«»„“”]/g, '"') + '»; ';
            index++;
        }
        var questTextNew = questText.slice(0, -2);
        questText = questTextNew + '.';
        console.log(questText);
        $.post(ajax_url, {action: 'gentext', type: 'q' + quiz_id, project: project, dop: questText}, function (data) {
            if (data != '0') {
                $('[data-modal="quest_modal"] .ct-panel_close').click();
                $('.ct-modal-loading').css('display','none');
                var blockName = $('.ct-modal_open[data-quiz=' + quiz_id + ']').attr('data-for');
                if ($('.ct-modal_open[data-quiz=' + quiz_id + ']').closest('.ct-menu_wrapper').find('textarea[name="' + blockName + '"]').length > 0) {
                    var iw = $('.ct-modal_open[data-quiz=' + quiz_id + ']').closest('.ct-menu_wrapper').find('textarea[name="' + blockName + '"]').closest('.ct-input_wrapper');
                    iw.find('.ck-editor').toggleClass('ck-loader', false);
                    var ck = iw.find('.ck-editor').attr('aria-labelledby');
                    const domEditableElement = document.querySelector('[aria-labelledby="' + ck + '"] .ck-editor__editable_inline');
                    const editorInstance = domEditableElement.ckeditorInstance;
                    editorInstance.setData(data);
                    console.log('found');
                } else {
                    var iw = $('.ct-modal_open[data-quiz=' + quiz_id + ']').closest('.ct-menu_wrapper').find('[name="' + blockName + '"]').closest('.ct-input_wrapper');
                    iw.find('input[type="text"]').val(data);
                    console.log('not found');
                }

            } else {
                alert('Генерация не удалась. попробуйте снова');
            }
        })
    }else{
        alert('Нужно ответить на все вопросы');
    }
})
// ai lovestory весь клик, который ниже
$(document).on('click', '.ct-modal-answ', function () {
    if($(this).hasClass('active')){
        $('.ct-modal-quests-next').click();
    }
});
// ai lovestory весь клик, который ниже
$(document).on('keyup', '.ct-modal-quests-slide input[type="text"]', function () {
    if($(this).val()!='' && $(this).closest('.ct-modal-quests-slide').hasClass('swiper-slide-active')){
        $(this).closest('.ct-modal-quests-slide').find('.ct-modal-answ').addClass('active');
        $('.ct-modal-answ-mobile').addClass('active');
        console.log('val');
    }else if($(this).val()==''){
        $(this).closest('.ct-modal-quests-slide').find('.ct-modal-answ').removeClass('active');
        $('.ct-modal-answ-mobile').removeClass('active');
        console.log('no val');
    }
    allFilled = true;
    $('.quest_modal-form input[type="text"]').each(function() {
        if ($(this).val() == '') {
            allFilled = false;
            return false;
        }
    });
    if (allFilled) {
        $('.send-quiz').addClass('active');
    } else {
        $('.send-quiz').removeClass('active');
    }
});




// конструктор (тут дофига всего, надо вернуться)
$(document).on('change', '.ct-switcher:not(.ct-can-hide-swicher):not(.ct-own-hidden) input', function () {
    if ($(this).data('target')) {
        var _that = $(this).prop('checked');
        var _target = $(this).data('target');
        $('#' + _target).toggleClass('active', _that)
        if (_target == 'alco') {
            $.post(ajax_url, {action: 'setalco', alco: (_that ? 1 : 0), project: project}, function (data) {
                iframe.contents().find('[data-sm-anketa-toggle] > [data-sm-text="ANKETA_DRINKS_QUESTION"]:not([data-forq])').toggleClass('sm-hidden', !_that);
                iframe.contents().find('[data-sm-anketa-toggle] [data-sm-anketa="1"]').toggleClass('sm-hidden', !_that);
                iframe.contents().find('[data-sm-anketa-toggle] > [data-sm-anketa]:not([data-forq])').toggleClass('sm-hidden', !_that);
                d_alco = (_that ? 1 : 0);
            })
        } else if (_target == 'palette') {
            $.post(ajax_url, {action: 'setpalette', palette: (_that ? 1 : 0), project: project}, function (data) {
                var palette = iframe.contents().find('[data-sm-text="DRESSCODE_COLORS"]');
                palette.toggle(_that);
                d_palette = (_that ? 1 : 0);
            })
        } else if (_target == 'sput') {
            $.post(ajax_url, {action: 'setsput', sput: (_that ? 1 : 0), project: project}, function (data) {
                var sputnik = iframe.contents().find('[data-sm-anketa-company]');
                if (sputnik.parents('.sm-form__block').length > 0) {
                    sputnik = sputnik.parents('.sm-form__block');
                } else if (sputnik.parents('.sm-form__input-wrapp').length > 0) {
                    sputnik = sputnik.parents('.sm-form__input-wrapp');
                } else if (sputnik.parents('.sm-form__row').length > 0) {
                    sputnik = sputnik.parents('.sm-form__row');
                } else if (sputnik.parents('.sm-form-inner').length > 0) {
                    sputnik = sputnik.parents('.sm-form-inner');
                } else if (sputnik.prev('.sm-mgb40').length > 0) {
                    sputnik.prev('.sm-mgb40').toggle(_that)
                } else if (sputnik.prev('.text-20px').length > 0) {
                    sputnik.prev('.text-20px').toggle(_that)
                } else if (sputnik.parents('.sm-wrapper_block-anketa_question').length > 0) {
                    sputnik = sputnik.parents('.sm-wrapper_block-anketa_question');
                } else if (sputnik.parents('.sm-questionnaire__form-inner').length > 0) {
                    sputnik = sputnik.parents('.sm-questionnaire__form-inner');
                } else if (sputnik.parents('.sm-wrapper-input').length > 0) {
                    sputnik = sputnik.parents('.sm-company_wrapper');
                }
                sputnik.toggle(_that);
                d_sput = (_that ? 1 : 0);
            })
        } else if (_target == 'menu') {
            $.post(ajax_url, {action: 'setmenu', toggle: (_that ? 1 : 0), project: project}, function (data) {

            })
        }
    } else {
        if ($(this).parents('#secondPanel').length > 0) {
            var sect = $(this).parents('.ct-panel_settings-page').data('section') - 1;
            if (sect === 165) {
                if (!$(this).prop('checked')) {
                    pre_sect = data_value['OWN_AFTER'];
                    rebuildStructure(0);
                } else {
                    rebuildStructure(pre_sect);
                }
            } else if (sect === 210) {
                if (!$(this).prop('checked')) {
                    pre_sect = data_value['NEW_OWN_AFTER'];
                    rebuildStructure(0, 211);
                } else {
                    rebuildStructure(pre_sect, 211);
                }
            } else {
                if (!$(this).prop('checked')) {
                    offsections.push(sect)
                    $($('.ct-sections_setup li')[sect]).find('input').prop('checked', false);
                } else {
                    var removeItem = sect;
                    offsections = $.grep(offsections, function (value) {
                        return value != removeItem;
                    });

                    $($('.ct-sections_setup li')[sect]).find('input').prop('checked', true);
                }
                setSect();
                checkSect();
            }
        }

        if ($(this).parents('#editSections').length > 0) {
            var ind = $(this).parents('li').index();

            if (!$(this).prop('checked')) {
                offsections.push(ind)
                $('.ct-panel_settings-page[data-section="' + (ind + 1) + '"] .ct-switcher input').prop('checked', false)
            } else {
                var removeItem = ind;
                offsections = $.grep(offsections, function (value) {
                    return value != removeItem;
                });
                $('.ct-panel_settings-page[data-section="' + (ind + 1) + '"] .ct-switcher input').prop('checked', true)
            }
            setSect();
            checkSect();
        }
    }
})

// конструктор
$(document).on('change', '.ct-switcher.ct-can-hide-swicher input', function () {
    //если скрываем
    if($(this).is(':checked')) {
        //если показываем элемент, удаляем из hide
        let index = data_value['HIDE'].indexOf($(this).attr('data-for-value'));
        while(index !== -1) {
            data_value['HIDE'].splice(index, 1);
            let hideKey = $(this).attr('data-for-value');
            index = data_value['HIDE'].indexOf(hideKey);
            iframe.contents().find(template_config['HIDE'][hideKey]).toggleClass('sm-hidden',false);
        }
    }else{
        //может это и не надо, но если hide = null, объявляем пустой массив
        if (data_value['HIDE'] == null || data_value['HIDE'].length == 0) {
            data_value['HIDE'] = [];
            let hideKey = $(this).attr('data-for-value');
            data_value['HIDE'].push(hideKey);
            // console.log(template_config['HIDE'][hideKey]);
            iframe.contents().find(template_config['HIDE'][hideKey]).toggleClass('sm-hidden',true);
        } else {
            //проверка на дубли
            if (!data_value['HIDE'].includes($(this).attr('data-for-value'))) {
                let hideKey = $(this).attr('data-for-value');
                data_value['HIDE'].push($(this).attr('data-for-value'));
                // console.log(template_config['HIDE'][hideKey]);
                iframe.contents().find(template_config['HIDE'][hideKey]).toggleClass('sm-hidden',true);
            }
        }
    }

    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
})


$(document).on('change', '.ct-switcher.ct-own-hidden input', function () {

    var blockDataType = $(this).closest('.ct-panel_settings-page').attr('data-section');

    var group = $(this).attr('data-group-id');
    var block_prefix = ($(this).closest('.ct-panel_settings-page').attr('data-section')==211) ? 'NEW_' : '';
    //если скрываем
    if($(this).is(':checked')) {
        data_value[block_prefix+'OWN_SHOW'][group-1] = 1;
        if(group==6){ //если карта, то ее надо создать
            insertOwnMap(blockDataType, data_value[block_prefix+'OWN_MAP_LINK'], data_value[block_prefix+'OWN_MAP_WIDTH'], data_value[block_prefix+'OWN_MAP_HEIGHT'])
        }
        $.each(template_val.pers_groups_info[group][4], function(i3,v3){
            iframe.contents().find('[data-type=' + blockDataType + '] '+v3).toggleClass('sm-hidden',false);
        })
    }else{
        data_value[block_prefix+'OWN_SHOW'][group-1] = 0;
        $.each(template_val.pers_groups_info[group][4], function(i3,v3){
            iframe.contents().find('[data-type=' + blockDataType + '] '+v3).toggleClass('sm-hidden',true);
            $('.ct-panel_settings-page.active .submit_current').toggleClass('active', false);
        })
        if(group==6){ //если карта, то ее надо удалить
            iframe.contents().find('[data-type="'+blockDataType+'"] [data-sm-href="OWN_MAP_LINK"]').remove();
        }
    }

    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
})



// конструктор
$(document).on('click', '.ct-colors_switcher li', function () {
    $('.ct-colors_switcher li').removeClass('active');
    $('.ct-tpl_selector-item.active .ct-tpl_selector-item_footer-colors li').removeClass('active');
    var cin = $(this).index();
    $($('.ct-tpl_selector-item.active .ct-tpl_selector-item_footer-colors li')[cin]).toggleClass('active', true);
    $($('.ct-footer_colors li')[cin]).toggleClass('active', true);
    $($('.ct-header_colors li')[cin]).toggleClass('active', true);
    $($('#customizeView .ct-colors_switcher li')[cin]).toggleClass('active', true);
    saveSettings()
})

$(document).on('click', '.ct-color-panel-title', function () {
    $(this).toggleClass('active');
    $(this).closest('.ct-group_wrapper').css('max-height','none')
})

// конструктор
$(document).on('click', '.ct-panel_examples-item', function () {
    $('.ct-panel_examples-item').removeClass('active');
    $(this).addClass('active');
})

// конструктор (?)
$('.ct-toconstr input').on('input', function () {
    $(this).removeClass('ct-input_error');
})

// конструктор
$(document).on('click', '.ct-icon_library-item_remove', function () {
    var inp = $(this).parent().next('.ct-input_wrapper').find('input');
    var da = inp.attr('name').toUpperCase();
    inp.val('');
    data_value[da] = '';
    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
    setIcons();
})

// конструктор
$(document).on('click', '.ct-icons_library-item', function () {
    var im = $(this).find('img').attr('src')
    var inp = $('.ct-icon_library-active').prev('.ct-input_wrapper').find('input');
    var da = inp.attr('name').toUpperCase();
    inp.val(im);
    data_value[da] = im;

    $('.ct-icon_library').toggleClass('.ct-icon_library-active', false);
    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);
    $('[data-modal="modal_icons-library"] .ct-panel_close').click();

    setIcons();
})

// конструктор
$(document).on('click', '.ct-icon_library', function () {
    $('.ct-icon_library').toggleClass('ct-icon_library-active', false)
    $(this).toggleClass('ct-icon_library-active', true)
})

// конструктор
$(document).on('click', '.submit_current', function () {

    var parwrap = $(this).closest('.ct-panel_settings-page');
    if ($(this).parents('.ct-panel_sub').length > 0) {
        if (parwrap.find('.ct-panel_examples-item.active').length > 0) {
            var ex = $('.ct-panel_sub .ct-panel_settings-page.active').attr('data-for')
            var d = parwrap.find('.ct-panel_examples-item.active').html();
            var dt = parwrap.find('.ct-panel_examples-item.active').text();
            var iw = $('.ct-examples_toggle[data-for="' + ex + '"]').prev('.ct-input_wrapper');
            if (iw.find('textarea').length > 0) {
                var ck = iw.find('.ck-editor').attr('aria-labelledby');
                const domEditableElement = document.querySelector('[aria-labelledby="' + ck + '"] .ck-editor__editable_inline');
                const editorInstance = domEditableElement.ckeditorInstance;
                editorInstance.setData(d);
            } else {
                iw.find('input[type="text"]').val(dt);
            }
            $('.ct-panel_sub').removeClass('active');
        }
    } else {
        // var parwrap = $('.ct-panel_settings-page.active');
        var imwrap = parwrap.find('.ct-image_uploader-info');
        var problem = false;
        if (imwrap.length > 0) {
            $.each(imwrap, function (im, vm) {
                var inputup = $(vm).find('.ct-image_uploader-origin');
                var inputup_size = inputup.find('.ct-input').attr('data-count');
                var inputim = $(vm).find('li:not(.ct-image_uploader)').length;
                if (inputim < inputup_size) {
                    if (inputup.find('.ct-input').attr('name') != 'own_images[]' && inputup.find('.ct-input').attr('name') != 'new_own_images[]' && inputup.find('.ct-input').data('slider') != "1") {
                        problem = true;
                    }
                }
            })
        }

        $('.ct-error').removeClass('ct-error');

        var reqwrap = parwrap.find('.ct-required');
        if (reqwrap.length > 0) {
            $.each(reqwrap, function () {
                $(this).parents('.ct-input_wrapper').toggleClass('ct-error', $(this).val() == '')
            })
        }

        if (problem) {
            alert(constr_terms['ln-notify-photo-error'] + '!');
        } else if ($('.ct-error').length > 0 || $('.new_own_map_link_err').length > 0) {
            // alert('');
        } else {
            $(this).removeClass('active');
            var par = $(this).parents('.ct-menu_wrapper');
            var inp = par.find('.ct-input_wrapper:not(.ct-switcher):not(.ct-ignore)');
            $.each(inp, function (k, v) {

                var ip = $(this).find('.ct-input:not(#own_align):not(#new_own_align)');

                var name = ip.prop('name');
                // console.log(name)
                var nnm = name.split('[]')
                var pc = name.split('personal_color');
                if (pc.length > 1) {
                    // console.log('save 1')
                    var emp = $(this).find('.ct-empty').css('background-color');
                    if (emp === 'rgba(0, 0, 0, 0)' || emp === 'transparent') {
                        data_value[name.toUpperCase()] = '';
                    } else {
                        data_value[name.toUpperCase()] = ip.val();
                    }
                }
                else{
                    var oc = name.split('personal_button_colors');
                    if(oc.length > 1){
                        // console.log('save 2')
                        data_value[nnm[0].toUpperCase()] = ['none','none','none','none','none','none'];
                        $.each(ip, function (k, v) {
                            var ocIndex = $(this).parent('.ct-color-wrapper').attr('data-type');
                            if ($(this).hasClass('ct-empty')) {
                                data_value[nnm[0].toUpperCase()][ocIndex - 3] = 'none';
                            } else {
                                data_value[nnm[0].toUpperCase()][ocIndex - 3] = $(this).val();
                            }
                        })
                    }else {
                        var oc = name.split('own_color');
                        if (oc.length > 1) {
                            // console.log('save 3')
                            // console.log($(this));
                            // console.log(ip.length);
                            $.each(ip, function (k, v) {
                                var ocIndex = $(this).parent('.ct-color-wrapper').attr('data-type');
                                // console.log(ocIndex+' - '+$(this).val());
                                // console.log($(this));
                                if ($(this).hasClass('ct-empty')) {
                                    data_value[nnm[0].toUpperCase()][ocIndex - 1] = 'none';
                                } else {
                                    data_value[nnm[0].toUpperCase()][ocIndex - 1] = $(this).val();
                                }
                            })
                        } else {
                            var oc = name.split('own_button_colors');
                            if (oc.length > 1) {
                                // console.log('save 4')
                                // console.log($(this));
                                // console.log(ip.length);
                                $.each(ip, function (k, v) {
                                    var ocIndex = $(this).parent('.ct-color-wrapper').attr('data-type');
                                    console.log(ocIndex + ' - ' + $(this).val());
                                    // console.log($(this));
                                    if ($(this).hasClass('ct-empty')) {
                                        data_value[nnm[0].toUpperCase()][ocIndex - 3] = 'none';
                                    } else {
                                        data_value[nnm[0].toUpperCase()][ocIndex - 3] = $(this).val();
                                    }
                                })
                            } else {
                                // console.log('saving smth');
                                if ($.inArray(nnm[0].toUpperCase(), galleries) === -1 && $.inArray(nnm[0].toUpperCase(), gallery_items) === -1) {
                                    // console.log(ip.val());
                                    var field = $(par).find('[name="' + name + '"]');
                                    if (nnm.length > 1) {
                                        var nm = name.split('[]').join('').toUpperCase();
                                        data_value[nm] = [];
                                        $.each(field, function (k, v) {
                                            if ($(this).val() !== '') {
                                                data_value[nm].push($(this).val())
                                            }
                                        })
                                    } else {
                                        if (ip.attr('type') == 'file') {
                                            var image = $('.ct-image_uploader-info[data-for="' + name.toUpperCase() + '"] .ct-image_preview:not(.ct-image_uploader)');
                                            data_value[name.toUpperCase()] = image.attr('data-url');
                                        } else {
                                            data_value[name.toUpperCase()] = ip.val();
                                        }
                                    }
                                } else {
                                    // console.log('save 5')
                                    // console.log('forming gallery');
                                    nm = name.split('[]').join('').toUpperCase();
                                    data_value[nm] = [];
                                    var images = $('.ct-image_uploader-info[data-for="' + nm + '"] .ct-image_preview:not(.ct-image_uploader)');

                                    //если слайдер, пересобираем галерею
                                    if ($('input[name*="' + nm.toLowerCase() + '"]').data('slider') == 1) {
                                        // console.log('is slides');
                                        var iframe = document.querySelector('iframe');
                                        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                                        var galleryItem = $(innerDoc).find('.slick-initialized').find('[data-sm-src*="' + nm.toUpperCase() + '_0"]');
                                        var gallery = galleryItem.closest('.slick-initialized');
                                        if (gallery.length) {
                                            var slidesCount = gallery.slick('getSlick').slideCount;
                                            var slideNum = 0;
                                            //удаляем слайды кроме последнего
                                            let c = 1;
                                            while (c < slidesCount) {
                                                gallery.slick("slickRemove", 0);
                                                c++;
                                            }

                                            c = 1;

                                            //перебираем все картинки по референсу последнего слайда добавляем слайды
                                            var slideInner = gallery.find('.slick-slide').eq(0)[0].outerHTML;
                                            var nmrep = nm.toUpperCase() + '_';
                                            var regex = new RegExp(`(${nmrep})(\\d+)`);
                                            while (c < images.length) {
                                                slideInner = slideInner.replace(regex, nmrep + slideNum);
                                                slideNum++;
                                                gallery.slick("slickAdd", slideInner);
                                                c++;
                                            }

                                            //пересоздаем последний слайд
                                            gallery.slick("slickRemove", 0);
                                            slideInner = slideInner.replace(regex, nmrep + slideNum);
                                            gallery.slick("slickAdd", slideInner)
                                        }
                                    }

                                    if (images.length > 0) {
                                        $.each(images, function (k, v) {
                                            data_value[nm].push($(this).attr('data-url'));
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            })

            //правки для опросов
            var aq = $('.ct-addquests_wrapper');
            inp = aq.find('.ct-input_wrapper:not(.ct-switcher):not(.ct-ignore)');
            var question_up = false;

            $.each(inp, function (k, v) {
                question_up = true;
                var ip = $(this).find('.ct-input');
                var name = ip.prop('name');
                var nnm = name.split('[]')

                var field = $(aq).find('[name="' + name + '"]');
                if (nnm.length > 1) {
                    var nm = name.split('[]').join('').toUpperCase();
                    data_value[nm] = [];

                    $.each(field, function (k, v) {
                        if ($(this).val() !== '') {
                            data_value[nm].push($(this).val())
                        }
                    })

                    console.log('====== quests check ======')
                    console.log(data_value[nm])

                } else {
                    data_value[name.toUpperCase()] = ip.val();
                    console.log('====== quests check ======')
                    console.log(data_value[name.toUpperCase()])
                }
            })

// new pers start
            // пока что проверяем перс блок по наличию групп
            if($(this).closest('.ct-panel_settings-page').find('.ct-group_wrapper').length > 0) {
                // console.log('saved pers')
                let sectionId = $(this).closest('.ct-panel_settings-page').attr('data-section');
                var groupIds = [];
                $(this).closest('.ct-panel_settings-page').find('.ct-menu_wrapper .ct-panel_personal_content_menu .ct-group_wrapper').each(function() {
                    groupIds.push($(this).attr('data-wrap-group-id'));
                });
                data_value['OWN_BLOCK_' + sectionId + '_SORT'] = groupIds ;
            }else{
                // console.log('saved not pers')
            }
            // new pers end

            console.log('saving')
            console.log(data_value);
            console.log('saved')
            removeColorStyles();
            saveTemp(question_up);
        }
    }
});


// просмотр
var tloaded = false;
$(iframe).on('load', function () {
    if ($(iframe).attr('src') != '' && typeof ($(iframe).attr('src')) != 'undefined' && !tloaded) {
        console.log('loadSections from global')
        loadSections();
        loadColors();
        tloaded = true;
    }
})

// просмотр
// $(function () {
//     if (project != '') {
//         console.log('global1');
//         loadTemplateData()
//     } else {
//         if (d_groom != '' && d_bride != '' && d_email != '' && d_mdate != '') {
//             console.log('global2');
//             loadTemplateData()
//         } else {
//             console.log('global3');
//             var splash_date = $('.ct-splash input[name="main_date"]')
//             var cnt = splash_date.next('.ct-calcontainer')
//             splash_date.Zebra_DatePicker({
//                 direction: 1,
//                 format: 'd.m.Y',
//                 show_clear_date: false,
//                 container: cnt,
//                 lang_clear_date: constr_terms["buttons_clean"],
//                 readonly_element: false,
//                 days_abbr: dweeks_short,
//                 months: tmonths,
//                 months_abbr: constr_terms['ln-months-short'],
//                 days: dweeks,
//             });
//             CheckConfirmChangeOperation();
//         }
//     }
// })

// конструктор
$(document).on('click', '.ct-video_remove', function () {
    if (confirm(constr_terms['ln-video-remove'])) {
        var par = $(this).parents('.ct-input_wrapper');
        var video_type = (par.attr('id') == 'video_uploader' ? 0 : 1);
        var vid_name = $(this).parents('.ct-input_wrapper').find('[type="file"]').attr('name').split('_upload').join('');

        $.post(ajax_url, {action: 'remvideo', project: project, type: video_type}, function (e) {
            if (video_type == 0) {
                $('#secondPanel').toggleClass('active', false);
                ifresize();
                console.log('loadTemplateData from global')
                loadTemplateData();
            } else {
                par.find('.ct-video_remove').toggleClass('ct-hidden', true);
                par.find('.ct-video_uploader').toggleClass('ct-hidden', false);
            }
        });
    }
})

// конструктор
$(document).on('change', 'input[type="file"].ct-video_file', function (event) {
    var vid_name = $(this).attr('name').split('_upload').join('');
    var par = $(this).parents('.ct-input_wrapper');
    var video_type = par.attr('id') == 'video_uploader' ? 0 : 1;
    var that = $(this);

    if (that.attr('name') == 'own_video_upload') {
        video_type = 2; // personal #1
    }

    if (that.attr('name') == 'new_own_video_upload') {
        video_type = 3; // personal #2
    }
    var data = new FormData();

    var err = false;
    data.append('project', project);
    data.append('action', 'video');
    var maxSize = 30 * 1024 * 1024;
    $.each(that[0].files, function (i, file) {
        if (file.size > maxSize) {
            alert(constr_terms['ln-video-file-limit']);
            err = true;
        } else {
            data.append('video', file);
            data.append('type', video_type);
        }
    });
    if (!err) {
        $('body').toggleClass('ct-preloader', true)
        $('body').append('<div class="ct-preloader_row-wrapper"><div class="ct-preloader_row"></div><div class="ct-preloader_data"></div></div>')

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $('.ct-preloader_row').css('width', 288 / 100 * percentComplete);
                        $('.ct-preloader_data').text(constr_terms['ln-video-uploading'] + ' ' + Math.ceil(percentComplete) + '%')
                        if (percentComplete >= 100) {
                            $('.ct-preloader_row').css('width', 288);
                            $('.ct-preloader_data').text(constr_terms['ln-video-upload-success'])
                        }
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: ajax_url,
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                $('.ct-preloader_row-wrapper').remove();
                $('body').toggleClass('ct-preloader', false);
                var r = $.parseJSON(result);
                if (r.error) {
                    alert(constr_terms['ln-notify-error'] + "\r\n" + r.error)
                } else {


                    par.find('.ct-video_remove').toggleClass('ct-hidden', false);
                    par.find('.ct-video_uploader').toggleClass('ct-hidden', true);
                    $('.ct-panel_settings-page.active .submit_current').toggleClass('active', true);

                    if (vid_name == 'head_video') {
                        $('.ct-video_uploader [name="' + vid_name + '"]').val(r.filePath)
                        $.each(iframe.contents().find('[data-sm-video]'), function () {
                            $(this).attr('src', r.filePath);
                            $(this).attr('poster', '');
                            $(this).parent().css('filter', 'none');
                            $(this).parents('video')[0].load();
                        });
                        $('.ct-panel_settings-page.active .submit_current').click();
                    }

                    if (vid_name == 'own_video' || vid_name == 'new_own_video') {
                        var vhold = vid_name.split('_video');
                        vhold = vhold[0].toUpperCase();
                        var v = vhold.replace('OWN', '');

                        $('[name="' + vhold.toLowerCase() + '_gallery_type"]').val(6)
                        $('[name="' + vid_name + '"]').val(r.filePath);

                        data_value[vid_name.toUpperCase()] = r.filePath;
                        data_value[vhold + '_GALLERY_TYPE'] = 6;
                        data_value[vhold + '_IMAGES'] = [];

                        $('[data-for="' + vhold + '_IMAGES"] .ct-image_cropper').remove();
                        iframe.contents().find('[data-type="' + ((v == '') ? '166' : '211') + '"] .sm-own_wrapper-img').remove();
                        setActiveOwnGalleryItem(6, true, v);
                    }
                    alert(constr_terms['ln-notify-upload-success']);

                }

            }
        })
    }
})





// from own_block

$(document).on('input', '#secondPanel [name="own_colors[]"], #secondPanel [name="new_own_colors[]"]', function () {
    console.log('color selected')
    var n = $(this).parents('.ct-panel_settings-page').attr('data-section');
    var add = '';
    if (n == '211') {
        add = 'NEW_';
    }
    var c = $(this).val();
    var b = $(this).parents('.ct-color-wrapper').index();
    if (b == 0) {
        iframe.contents().find('.sm-own[data-type="' + n + '"]').css('background-color', c)
        paintBlock('.sm-own[data-type="' + n + '"]',c,1);
        $(this).parents('.ct-color-wrapper').find('.ct-color-remove-own').css('display','block');
        $(this).removeClass('ct-empty');
    } else {
        iframe.contents().find('[data-sm-text="' + add + 'OWN_TITLE"]').css('color', c);
        iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]').css('color', c);
        $(this).parents('.ct-color-wrapper').find('.ct-color-remove-own').css('display','block');
        $(this).removeClass('ct-empty');
        //iframe.contents().find('[data-sm-href="'+add+'OWN_BUTTON_LINK"]').css({'color':c,'border-color':c});
    }
    setTimeout(function () {
        autoResizeText();
    }, 500)
})

$(document).on('input', '#secondPanel [name="own_button_colors[]"], #secondPanel [name="new_own_button_colors[]"], #secondPanel [name*="personal_button_colors"]', function () {
    // console.log('color selected 1')
    var n = $(this).parents('.ct-panel_settings-page').attr('data-section');
    var add = '';
    if (n == '211') {
        add = 'NEW_';
    }
    var c = $(this).val();
    var b = $(this).parents('.ct-color-wrapper').index();
    if (b == 0) {
        // iframe.contents().find('.sm-own[data-type="' + n + '"]').css('background-color', c)
        // paintBlock('.sm-own[data-type="' + n + '"]',c,1);
        $(this).parents('.ct-color-wrapper').find('.ct-color-remove-own').css('display','block');
        $(this).removeClass('ct-empty');
    } else {
        // iframe.contents().find('[data-sm-text="' + add + 'OWN_TITLE"]').css('color', c);
        // iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]').css('color', c);
        $(this).parents('.ct-color-wrapper').find('.ct-color-remove-own').css('display','block');
        $(this).removeClass('ct-empty');
        //iframe.contents().find('[data-sm-href="'+add+'OWN_BUTTON_LINK"]').css({'color':c,'border-color':c});
    }
    let colorArr = [];
    $.each($(this).closest('.ct-color-panel').find('.ct-input[type="color"]'),function(){
        if(!$(this).hasClass('ct-empty')) {
            colorArr.push($(this).val());
        }else{
            colorArr.push('none');
        }
    })
    // console.log('paintButton from input')
    if(n==166 || n==211) {
        paintButton("[data-type='" + n + "'] [data-sm-href='" + add + "OWN_BUTTON_LINK']", colorArr);
    }else{
        // let buttonSelector = '';
        // // console.log(button_items);
        // $.each(button_items, function(i,item){
        //     // console.log('[data-type="' + n + '"] [data-sm-href="'+item+'"]');
        //     if(iframe.contents().find('[data-type="' + n + '"]').find('[data-sm-href="'+item+'"]').length > 0){
        //         buttonSelector = '[data-type="' + n + '"] [data-sm-href="'+item+'"]';
        //     }
        // })
        let buttonSelector = '';
        if($('[name="personal_button_selector_colors[' + n + ']"]').val()!=null && $('[name="personal_button_selector_colors[' + n + ']"]').val()!=''){
            buttonSelector = "[data-type='" + n + "'] "+$('[name="personal_button_selector_colors[' + n + ']"]').val();
        }

        if(buttonSelector!='') {
            // console.log(buttonSelector)
            paintButton(buttonSelector, colorArr);
        }
    }


})

$(document).on('click', '#setupAddBlock', function (e) {
    e.preventDefault();
    $('#secondPanel').toggleClass('active', true);
    $('#secondPanel .ct-panel_settings-page').removeClass('active');
    var s = 166;
    if (data_value['OWN_AFTER'] == '0') {
        $('#secondPanel .ct-panel_settings-page[data-section="166"]').toggleClass('active', true)
    } else if (data_value['NEW_OWN_AFTER'] == '0') {
        $('#secondPanel .ct-panel_settings-page[data-section="211"]').toggleClass('active', true)
        s = 211;
    }

    if ($('.ct-image_uploader-info_alt[data-for="OWN_IMAGES_5"]').length > 0) {
        $('.ct-image_uploader-info_alt[data-for="OWN_IMAGES_5"] .ct-image_uploader-preview_examples').slick('setPosition');
    }


    rebuildStructure(cursect + 1, s);
    // console.log('rebuilt structure 1')
    //tplwrapper.
    setTimeout(function () {
        scrollToBlock(s)
    }, 500)

    closeMain();
    ifresize();
    return false;
})
function scrollToBlock(sect) {
    var sc = iframe.contents().find('.sm-edit[data-type="' + sect + '"]').position().top;
    // console.log(sc);
    iframe.contents().find('html,body').animate({scrollTop: sc}, 500);
}


$(document).on('click', '.ct-image_uploader-info_alt:not([data-for="OWN_VIDEO_UPLOAD"]):not([data-for="NEW_OWN_VIDEO_UPLOAD"]) .ct-image_uploader-preview_examples-item', function (e) {
    e.preventDefault();
    var v = ($(this).parents('.ct-panel_settings-page').attr('data-section') == '211') ? 'NEW_' : '';
    var t = $(this).parents('.ct-image_uploader-info_alt').attr('data-for').replace(v + 'OWN_IMAGES_', '');
    $('[data-for="' + v + 'OWN_IMAGES"]').attr('data-asp', t);
    if (data_value[v + 'OWN_GALLERY_TYPE'] != t) {
        $('[data-for="' + v + 'OWN_IMAGES"] li:not(.ct-image_uploader-origin)').remove(); // делаем всегда одну картинку
        if (t == 5) {
            $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_uploader.ct-image_uploader-origin input').click();
        } else {
            if (t == 4 || t == 7) {
                $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_uploader.ct-image_uploader-origin input').click()
            } else {
                $('[data-for="' + v + 'OWN_IMAGES"] input').click();
            }
        }
    } else if (t == 4 || t == 7) {
        var imin = $(this).index();
        var upin = $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_cropper').length;
        if (upin > 2) {
            $.each($('[data-for="' + v + 'OWN_IMAGES"] .ct-image_cropper'), function (k, v) {
                if (k > 1) {
                    $(this).remove();
                }
            })
        }

        if (upin > imin) {
            iframe.contents().find('[data-sm-src="' + v + 'OWN_IMAGES_' + imin + '"]').click();
        } else {
            $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_uploader.ct-image_uploader-origin input').click();
        }
    } else if (t == 5) {
        $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_uploader.ct-image_uploader-origin input').click()
    }
    return false;
})

// шо-то непонятное в просмотр на всякий
$(document).on('click', '.ct-modal .ct-panel_close', function () {
    modalClose();
    if($(this).parent('.ct-modal').attr('data-modal')=='modal_endlogin'){
        window.location.href = '/invitations/';
    }
})
$(document).on('click', '.ct-modal_open', function () {
    var mtarget = $(this).data('target');
    modalOpen($('[data-modal="' + mtarget + '"]'));
})
$(document).on('click', '.personal_colors .ct-color-remove', function () {
    //поведение поля выбора цвета
    $(this).parents('.ct-color-wrapper').toggleClass('personal_empty', true);
    $(this).parents('.ct-color-wrapper').find('input').val('');
    $(this).parents('.ct-color-wrapper').find('.ct-color').css('cssText', '');

    // номер блока
    var sid = $(this).parents('.ct-panel_settings-page').attr('data-section');
    // тип выбранного цвета 1-фон, 2-текст
    var type = $(this).parents('.ct-color-wrapper').attr('data-type');


    removeColorBlock('[data-type="' + sid + '"]',type);

    //переменная для записи текущего сssText
    let currentCssText = '';

    //если покрашен блок анкеты, красим модалки
    if (iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-questionnaire') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-form') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-feedback')) {


        if(iframe.contents().find('.sm-modal').length > 0){
            removeColorBlock('.sm-modal',type);
            if(type==2) {
                removeStyleForm(iframe.contents().find('head').find('.colors-styles'),'.sm-modal');
            }
        }
        if(iframe.contents().find('.sm-quest-modal').length > 0){
            removeColorBlock('.sm-quest-modal',type);
            if(type==2) {
                removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal');
            }
        }
        if(iframe.contents().find('div#sm-mod').length > 0){
            removeColorBlock('div#sm-mod',type);
            if(type==2) {
                removeStyleForm(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod');
            }
        }
        if(iframe.contents().find('.sm-feedback').length > 0){
            removeColorBlock('.sm-feedback',type);
            if(type==2) {
                removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback');
            }
        }

        if(type==2) {
            removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '[data-type="' + sid + '"]' );
        }

    }
})

$(document).on('input', '.personal_color', function () {

    //создание блока для дополнительных стилей, если он еще не был создан
    if(iframe.contents().find('head').find('.colors-styles').length==0){
        iframe.contents().find('head').append('<style class="colors-styles"></style>');
    }
    if(iframe.contents().find('head').find('.colors-styles-desktop').length==0){
        iframe.contents().find('head').append('<style class="colors-styles-desktop">@media (min-width:500px){}</style>');
    }
    if(iframe.contents().find('head').find('.colors-styles-mobile').length==0){
        iframe.contents().find('head').append('<style class="colors-styles-mobile">@media (max-width:500px){}</style>');
    }
    //поведение поля с выбором цвета
    $(this).parents('.ct-color-wrapper').removeClass('personal_empty');
    var sid = $(this).parents('.ct-panel_settings-page').attr('data-section');
    var type = $(this).parents('.ct-color-wrapper').attr('data-type');
    var color = $(this).val();

    paintBlock('[data-type="' + sid + '"]',color,type);

    //переменная для записи текущего сssText
    let currentCssText = '';

    //если покрашен блок анкеты, красим модалки
    if (iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-questionnaire') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-form') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-feedback')) {


        if(iframe.contents().find('.sm-modal').length > 0){
            paintBlock('.sm-modal',color,type);
            if(type==2) {
                updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-modal', color);
            }
        }
        if(iframe.contents().find('.sm-quest-modal').length > 0){
            paintBlock('.sm-quest-modal',color,type);
            if(type==2) {
                updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal', color);
            }
        }
        if(iframe.contents().find('div#sm-mod').length > 0){
            paintBlock('div#sm-mod',color,type);
            if(type==2) {
                updateStyleForm(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod', color);
            }
        }
        if(iframe.contents().find('.sm-feedback').length > 0){
            paintBlock('.sm-feedback',color,type);
            if(type==2) {
                updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback', color);
            }
        }

        if(type==2) {
            updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '[data-type="' + sid + '"]', color);
        }

    }

    setTimeout(function () {
        autoResizeText();
    }, 500)

})

// конструктор
$(document).on('click', '.ct-color-remove-own', function () {
    // console.log('remove own');
    $(this).closest('.ct-menu_wrapper').find('.submit_current').addClass('active');
    $(this).css('display','none');
    //поведение поля выбора цвета
    // $(this).parents('.ct-color-wrapper').toggleClass('personal_empty', true);
    // console.log($(this).parents('.ct-color-wrapper').find('input'));
    $(this).parents('.ct-color-wrapper').find('input').val('transparent');
    $(this).parents('.ct-color-wrapper').find('input').addClass('ct-empty');
    // console.log($(this).parents('.ct-color-wrapper').find('input').val());
    $(this).parents('.ct-color-wrapper').find('.ct-color').css('cssText', '');

    // номер блока
    var sid = $(this).parents('.ct-panel_settings-page').attr('data-section');
    // тип выбранного цвета 1-фон, 2-текст
    var type = $(this).parents('.ct-color-wrapper').attr('data-type');


    removeColorBlock('[data-type="' + sid + '"]',type);

    //переменная для записи текущего сssText
    let currentCssText = '';

    // //если покрашен блок анкеты, красим модалки
    // if (iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-questionnaire') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-form') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-feedback')) {
    //
    //
    //     if(iframe.contents().find('.sm-modal').length > 0){
    //         removeColorBlock('.sm-modal',type);
    //         if(type==2) {
    //             removeStyleForm(iframe.contents().find('head').find('.colors-styles'),'.sm-modal');
    //         }
    //     }
    //     if(iframe.contents().find('.sm-quest-modal').length > 0){
    //         removeColorBlock('.sm-quest-modal',type);
    //         if(type==2) {
    //             removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal');
    //         }
    //     }
    //     if(iframe.contents().find('div#sm-mod').length > 0){
    //         removeColorBlock('div#sm-mod',type);
    //         if(type==2) {
    //             removeStyleForm(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod');
    //         }
    //     }
    //     if(iframe.contents().find('.sm-feedback').length > 0){
    //         removeColorBlock('.sm-feedback',type);
    //         if(type==2) {
    //             removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback');
    //         }
    //     }
    //
    //     if(type==2) {
    //         removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '[data-type="' + sid + '"]' );
    //     }
    //
    // }
    autoResizeText();
});

$(document).on('click', '.ct-small_edit-button', function () {
    var s = $(this).parents('.ct-own_block-setting').attr('data-sect');

    $('#secondPanel').toggleClass('active', true);
    $('#secondPanel .ct-panel_settings-page').removeClass('active');
    $('.ct-panel_settings-page[data-section="' + s + '"]').toggleClass('active', true);
    closeMain();
    ifresize();
})

