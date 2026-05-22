var inp;
var cursect = 0;
var sections = [];
var offsections = [];
let template_val = {};
let template_data = {};
var data_value = {};
var iframe = $('iframe');
var tplwrapper = $('.ct-template_wrapper');
var ifh = iframe.height();
var ifw = iframe.width();
var grayscales = {};
var dweeks = constr_terms['ln-dweeks'];
var dweeks_short = constr_terms['ln-dweeks-short'];
var tmonths = constr_terms['ln-months'];
var tmonthsr = constr_terms['ln-months-rod'];
var tmonths_ln = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var template_config = {};
var firstLoad = true;
// ajax_url = '/sitemaker/ajax_alpha10.php' ;


var tmonths_de = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

var image_fields = ['COVER_PHOTO', 'BRIDE_PHOTO', 'GROOM_PHOTO', 'TIMING_PHOTO', 'SPLASH', 'STORY_PHOTO', 'HELLO_PHOTO_ONE', 'LOCATION_PHOTO', 'PHOTO_ONE', 'TIMING_PHOTO', 'DATETIME_PHOTO_ONE', 'WISH_PHOTO_ONE', 'HELLO_PHOTO', 'TIMER_PHOTO_ONE', 'CONTACTS_PHOTO_ONE', 'ANKETA_PHOTO_ONE', 'BYE_PHOTO_ONE', 'BYE_PHOTO2_ONE','AUDIO_IMAGE'];  //Одно фото
var galleries = ['MAIN_GALLERY', 'DRESSCODE_GIRLS_GALLERY', 'DRESSCODE_GUYS_GALLERY', 'LOCATION_GALLERY', 'CONTACT_PHOTO'];  // галлереи в сетки
var gallery_items = ['MAIN_GALLERY_ITEMS', 'DRESSCODE_GIRLS_GALLERY_ITEMS', 'DRESSCODE_GUYS_GALLERY_ITEMS', 'LOCATION_GALLERY_ITEMS', 'HELLO_PHOTO_ITEMS', 'CONTACT_PHOTO_ITEMS', 'LOCATION_PHOTO_ITEMS', 'COVER_PHOTO_ITEMS', 'STORY_PHOTO_ITEMS', 'ANKETA_PHOTO_ITEMS', 'OWN_IMAGES', 'NEW_OWN_IMAGES'];  //Одиночные в галлереи
var text_items = ['WISH_TEXT_ITEMS', 'TIMING_1', 'TIMING_2', 'TIMING_3', 'TIMING_4', 'TIMING_DESC', 'ANKETA_DRINKS', 'LOCATION_TIMING'];
var button_items = ['LOCATION_MAP','WISH_WISHLIST','CONTACT_LINK'];
//то что ниже обязательно в двойных кавычках!!!
var anketa_button_items = ["[data-sm-anketa-send='1']","[data-sm-anketa-send]"];
var modal_button_items = [".open-modal","[data-src='#sm-mod']"];

var ownBlockTemplate = '<section class="sm-own sm-edit" data-type="166" data-jsscroll="" data-jsscroll-slide-top=""><div class="sm-container"><div class="sm-own_wrapper"><div class="sm-own_wrapper-img"></div><h2 data-sm-text="OWN_TITLE" title="" class="own_block_title_1"></h2><div data-sm-text="OWN_TEXT" title="" class="own_block_text_1">{%OWN_TEXT%}</div><a data-sm-href="OWN_BUTTON_LINK" title="" class="sm-own_button" target="_blank"></a></div></div></section>';
var ownBlockTemplate2 = '<section class="sm-own sm-edit" data-type="211" data-jsscroll="" data-jsscroll-slide-top=""><div class="sm-container"><div class="sm-own_wrapper"><div class="sm-own_wrapper-img"></div><h2 data-sm-text="NEW_OWN_TITLE" title="" class="own_block_title_1"></h2><div data-sm-text="NEW_OWN_TEXT" title="" class="own_block_text_1">{%NEW_OWN_TEXT%}</div><a data-sm-href="NEW_OWN_BUTTON_LINK" title="" class="sm-own_button" target="_blank"></a></div></div></section>';
// var ownBlockTemplateNew = '<section class="sm-own sm-edit" data-type="{%OWN_ID%}" data-jsscroll="" data-jsscroll-slide-top=""><div class="sm-container"><div class="sm-own_wrapper"><div class="sm-own_wrapper-img"></div><h2 data-sm-text="OWN_TITLE" title="" class="own_block_title_1"></h2><div data-sm-text="OWN_TEXT" title="" class="own_block_text_1">{%OWN_TEXT%}</div><a data-sm-href="OWN_BUTTON_LINK" title="" class="sm-own_button" target="_blank"></a></div></div></section>';
var ownBlockTemplateMap = '<iframe class="sm-own_wrapper-map" data-sm-href="OWN_MAP_LINK" src="{%OWN_MAP_LINK%}" width="{%OWN_MAP_WIDTH%}" height="{%OWN_MAP_HEIGHT%}" frameborder="0"></iframe>'

//для шаблонов перечисленных id шаблонов в temlatesOwnResize заголовок сверстан так, чтобы динамически изменять размер шрифта (класс sm-needtoresize)
var temlatesOwnResize = [110]
var ownBlockTemplateResize = '<section class="sm-own sm-edit" data-type="166" data-jsscroll="" data-jsscroll-slide-top=""><div class="sm-container"><div class="sm-own_wrapper"><div class="sm-own_wrapper-img"></div><div class="sm-title-resize-helper"><h2 class="sm-needtoresize" data-sm-text="OWN_TITLE" title="" ></h2></div><div data-sm-text="OWN_TEXT" title="" class="own_block_text_1">{%OWN_TEXT%}</div><a data-sm-href="OWN_BUTTON_LINK" title="" class="sm-own_button" target="_blank"></a><iframe class="sm-own_wrapper-map" data-sm-href="OWN_MAP_LINK" src="{%OWN_MAP_LINK%}" width="{%OWN_MAP_WIDTH%}" height="{%OWN_MAP_HEIGHT%}" frameborder="0"></iframe></div></div></section>';
var ownBlockTemplate2Resize = '<section class="sm-own sm-edit" data-type="211" data-jsscroll="" data-jsscroll-slide-top=""><div class="sm-container"><div class="sm-own_wrapper"><div class="sm-own_wrapper-img"></div><div class="sm-title-resize-helper"><h2 class="sm-needtoresize"<h2 data-sm-text="NEW_OWN_TITLE" title=""></h2></div><div data-sm-text="NEW_OWN_TEXT" title="" class="own_block_text_1">{%NEW_OWN_TEXT%}</div><a data-sm-href="NEW_OWN_BUTTON_LINK" title="" class="sm-own_button" target="_blank"></a><iframe class="sm-own_wrapper-map" data-sm-href="NEW_OWN_MAP_LINK" src="{%OWN_MAP_LINK%}" width="{%OWN_MAP_WIDTH%}" height="{%OWN_MAP_HEIGHT%}" frameborder="0"></iframe></div></div></section>';



$(window).on('resize', function () {
    ifresize()
})
function ifresize() {

    tplwrapper.css('transform', 'scale(1)')
    iframe.css('transform', 'scale(1)').css('height', '100%').css('width', '100%').css('margin-top', 0).css('margin-left', 0);
    var ifh = 875;
    var ifw = 425;
    var mw = 390;

    if (!tplwrapper.hasClass('ct-iphone-wrapper')) {
        if($(window).innerWidth() > 768) {
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
        if($(window).innerWidth() <= 768) {
            nifw = Math.ceil(ifw / is1);
            nifh = Math.ceil(ifh / is1);
            mt = Math.ceil((ifh - nifh) / 2)
            ml = Math.ceil((ifw - nifw) / 2)
        }
        iframe.css('transform', 'scale(' + is1 + ')').css('height', nifh).css('width', mw).css('transform-origin', 'top, left').css('margin-top', mt).css('margin-left', ml)
    }
    else
    {
        is1 = $(window).innerHeight() / (885 * 1.4);
        nifw = ifw / is1;
        nifh = ifh / is1;
        mt = (ifh - nifh) / 2;
        ml = (ifw - nifw) / 2;

        $('.ct-iphone-wrapper').css('transform', 'scale(' + is1 + ')').css('transform-origin', 'center');

    }

    // setTimeout(function () {
    setFontSize();
    // }, 200);

}

ifresize();

// $(function(){
//     //&& d_email != ''
//     if(d_groom != ''&& d_bride != ''  && d_mdate != '') {
//
//         loadTemplateData()
//     }
//
//     $('.ct-toptap').click(function(){
//         iframe.contents().find('html, body').stop().animate({ scrollTop: 0 }, 500);
//     })
// })


$(function () {
    if (project != '') {
        console.log('global1');
        loadTemplateData()
    } else {
        if (d_groom != '' && d_bride != '' && d_email != '' && d_mdate != '') {
            console.log('global2');
            loadTemplateData()
        } else {
            console.log('global3');
            var splash_date = $('.ct-splash input[name="main_date"]')
            var cnt = splash_date.next('.ct-calcontainer')
            splash_date.Zebra_DatePicker({
                direction: 1,
                format: 'd.m.Y',
                show_clear_date: false,
                container: cnt,
                lang_clear_date: constr_terms["buttons_clean"],
                readonly_element: false,
                days_abbr: dweeks_short,
                months: tmonths,
                months_abbr: constr_terms['ln-months-short'],
                days: dweeks,
            });
            CheckConfirmChangeOperation();
        }
    }
    $('.ct-toptap').click(function(){
        iframe.contents().find('html, body').stop().animate({ scrollTop: 0 }, 500);
    })
})

function doGrayscales()
{
    iframe.contents().find('[data-sm-src]').removeClass('sm-grayscale');

    $.each(grayscales,function(k,v){
        var name = v.name;
        var data = v.data;

        if($.inArray(name,gallery_items) !== -1)
        {
            if (data.length > 0) {
                $.each(data, function (ki, vi) {
                    iframe.contents().find('[data-sm-src="' + name + '_'+vi+'"]').addClass('sm-grayscale')
                })
            }
        }
        else {
            var i = iframe.contents().find('[data-sm-src="' + name + '"]');
            if (data.length > 0) {
                $.each(data, function (ki, vi) {
                    $(i[vi]).addClass('sm-grayscale');
                })
            }
        }
    })
}

function loadData(){
    console.log('try to load')
    console.log(project)
    var loadDataPost = (typeof loadTemplateConstr === 'function') ? {action:'loadData',project:project,tpl: template_val.id} : {action:'loadData',project:project};
    $.post(ajax_url,loadDataPost,function(data){
        console.log('loadingData');
        if(data !== '') {
            var d = $.parseJSON(data);
            console.log(d)
            $.getJSON(d['data_file'], function (data) {
                if (data && data !== '') {
                    data_value = data;
                    data_value['GROOM'] = d_groom;
                    data_value['BRIDE'] = d_bride;
                    data_value['MAIN_DATE'] = d_mdate;
                    if(typeof demo_view!='undefined' && demo_view)
                    {
                        data_value['GROOM_TEL'] = '79268887788';
                        data_value['BRIDE_TEL'] = '79167778877';
                        data_value["CONTACTS_LINK"] = {"type" : "3","value" : "wedwed_russia"};
                    }
                    console.log('loadTemplate from view')
                    loadTemplate();
                }
            })
        }
        else
        {
            alert('Ошибка загрузки');
        }
    })
}


function updateStyleRule(styleTag, selector, newProperties, only=false) {

    var $style = styleTag;
    if(typeof $style.html() != undefined) {
        var currentCSS = (styleTag.hasClass('colors-styles') && typeof $style.html().slice(0, -1) != 'undefined') ? $style.html() : $style.html().slice(0, -1);
    }else{
        var currentCSS = '';
    }

    currentCSS = currentCSS.replace('@media (max-width:500px){', '');
    currentCSS = currentCSS.replace('@media (min-width:500px){', '');

    var escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    var regex = new RegExp(escapedSelector + '\\s*\\{[^}]*\\}', 'g');
    var newRule = selector + ' { ' + newProperties + ' }';

    var testRegex = new RegExp(escapedSelector + '\\s*\\{[^}]*\\}', 'g');
    var ruleExists = testRegex.test(currentCSS);

    if (ruleExists) {
        currentCSS = currentCSS.replace(regex, newRule);
        currentCSS = ($style.hasClass('colors-styles')) ?  ' ' + currentCSS : ' ' + currentCSS + ' }';
        currentCSS = ($style.hasClass('colors-styles-desktop')) ? '@media (min-width:500px){' + currentCSS : currentCSS;
        currentCSS = ($style.hasClass('colors-styles-mobile')) ? '@media (max-width:500px){' + currentCSS : currentCSS;
    } else {
        if (currentCSS.trim() !== '' && currentCSS.trim() !== ' ') {
            currentCSS += ($style.hasClass('colors-styles')) ?  ' ' + newRule : ' ' + newRule + ' }';
            currentCSS = ($style.hasClass('colors-styles-desktop')) ? '@media (min-width:500px){' + currentCSS : currentCSS;
            currentCSS = ($style.hasClass('colors-styles-mobile')) ? '@media (max-width:500px){' + currentCSS : currentCSS;
        } else {
            currentCSS += ($style.hasClass('colors-styles')) ? newRule : newRule  + ' }';
            currentCSS = ($style.hasClass('colors-styles-desktop')) ? '@media (min-width:500px){' + currentCSS : currentCSS;
            currentCSS = ($style.hasClass('colors-styles-mobile')) ? '@media (max-width:500px){' + currentCSS : currentCSS;
        }
    }

    $style.html(currentCSS);

}

function removeStyleRule(styleTag, selector) {
    var $style = styleTag;
    var currentCSS = $style.html();

    var escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    var regex = new RegExp(
        '(' + escapedSelector + ')\\s*\\{[^}]*\\}',
        'g'
    );

    currentCSS = currentCSS.replace(regex, '$1');
    currentCSS = currentCSS.replace(/\n\s*\n/g, '').replace(/^\n+|\n+$/g, '').trim();

    currentCSS = currentCSS.replace(selector, '').trim();
    $style.html(currentCSS);
}


function paintBlock(blockSelector,color,type) {

    // console.log(blockSelector+' | '+color+' | '+type);

    //В блоке, который редактируем проставляем новое свойство background или color
    iframe.contents().find(blockSelector).each(function(){
        //если на фоне изображение
        if($(this).css('background-image')!=null && $(this).css('background-image')!='none' && type==1 ){
            $(this).css('background-image',$(this).css('background-image'));

            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                $(this).css('background-size', 'auto'); //safari fix??
            }

            if(!$(this).hasClass('texture__bg')) {
                //если текстура, оставляем изображение и накладываем на него цвет
                $(this).css('-webkit-background-blend-mode', 'color-burn');
                $(this).css('background-blend-mode', 'color-burn');
            }else{
                //если нет убираем изображение
                // console.log('len: '+iframe.contents().find(blockSelector).length);
                iframe.contents().find(blockSelector).css('background','none');
            }
            //ставим новый цвет
            $(this).css('background-color',color);
        }else{
            //если на фоне нет изображения ставим новый цвет на текст или фон
            if(type==1 && !$(this).hasClass('background-no-paint')){
                if(color!='none') {
                    $(this).css('background', color);
                }
            }
            if(type==2 && !$(this).hasClass('text-no-paint')){
                $(this).css('color', color);
            }
            // $(this).css(((type == '1') ? 'background' : 'color'), color);
        }
    });

    if(type==1) {
        //ищем блок фона
        var pseudo = iframe.contents().find(blockSelector).find('[class*="__bg"]:not(.background-no-paint)');
        if (pseudo.length > 0) {
            //если есть, проверяем не содержит ли он изображение
            if(pseudo.css('background-image')!=null && pseudo.css('background-image')!='none') {
                // если есть изображение, проверяем является ли оно текстурой
                // Если да, накладываем цвет на изображение. Если нет, ставим цвет вместо изображения
                if(!pseudo.hasClass('texture__bg')) {
                    pseudo.css('cssText', 'background-image:' + pseudo.css('background-image') + ';-webkit-background-blend-mode:color-burn!important;background-blend-mode:color-burn!important;background-color:' + color + '!important');
                }else{
                    pseudo.css('cssText', 'background-image:' + pseudo.css('background-image') + ';background-color:' + color + '!important');
                    // console.log('len1: '+iframe.contents().find(blockSelector).length);
                    iframe.contents().find(blockSelector).css('background','none');
                }
            }else{
                //если изображение не содержится, просто ставим новый цвет
                pseudo.css('cssText', 'background:' + color + ' !important');
            }
        }
        //проставляем в дополнительные стили правила для псевдоклассов и.т.п
        if(iframe.contents().find(blockSelector+' .background-paint-background').length>0) {

            if (iframe.contents().find(blockSelector + ' .background-paint-background').css('background-image') != null && iframe.contents().find(blockSelector + ' .background-paint-background').css('background-image') != 'none') {
                // если есть изображение, проверяем является ли оно текстурой
                // Если да, накладываем цвет на изображение. Если нет, ставим цвет вместо изображения
                if (!$(blockSelector + ' .background-paint-background').hasClass('texture__bg')) {
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector + ' .background-paint-background', 'background-image:' + iframe.contents().find(blockSelector + ' .background-paint-background').css('background-image') + '!important;-webkit-background-blend-mode:color-burn!important;background-blend-mode:color-burn!important;background-color:' + color + '!important');
                } else {
                    // updateStyleRule(styleTag, prefix + ' .background-paint-background', 'background-image:' + iframe.contents().find(prefix + ' .background-paint-background').css('background-image'));
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector + ' .background-paint-background', 'background-image:' + iframe.contents().find(blockSelector + ' .background-paint-background').css('background-image') + ';background-color:' + color + '!important');
                }
            } else {
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector + ' .background-paint-background', 'background:' + color + '!important');
            }
        }
        if(iframe.contents().find(blockSelector+'.background-paint-background').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background', 'background:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+' .background-paint-background-after').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-background-after:after', 'background:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+' .background-paint-background-before').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-background-before:before', 'background:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+'.background-paint-background-after').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background-after:after', 'background:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+'.background-paint-background-before').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background-before:before', 'background:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+'.background-paint-text').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-text', 'color:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+' .background-paint-text').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-text', 'color:' + color + '!important');
        }
        if(iframe.contents().find(blockSelector+' .background-hide').length>0){
            updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-hide', 'opacity:0!important');
        }

        iframe.contents().find(blockSelector).find('svg.text-paint-stroke.text-no-paint-fill path').css('cssText', 'color:' + color + ' !important; stroke:' + color + ' !important;');
        iframe.contents().find(blockSelector).find('svg.background-paint-fill path').css('cssText', 'fill:' + color + ' !important; stroke:' + color + ' !important;');
        iframe.contents().find(blockSelector).find('svg.background-paint-fill').toggleClass('sm-painted_icon', true);

        iframe.contents().find(blockSelector).find('.background-paint-box-shadow').each(function(){
            let shadow = $(this).css('box-shadow');
            if (shadow === 'none') return;
            // Регулярное выражение для поиска цвета в box-shadow
            const colorRegex = /(#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)|hsl\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*\)|hsla\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+\s*\)|[a-zA-Z]+)/;
            // Заменяем цвет на новый
            shadow = shadow.replace(colorRegex, color);
            $(this).css('cssText','box-shadow:'+ shadow);
        });

        // проставляем класс покрашенного фона
        iframe.contents().find(blockSelector).toggleClass('sm-painted', true);
    }



    if (type == 2) {
        setTimeout(function () {
            // console.log('painting text: ' + blockSelector + ' color: ' + color);
            // Проставляем новый цвет текста у всех необходимых блоков, учитывая исключения, и снимаем фильтры

            iframe.contents().find(blockSelector + ' *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *):not(.slick-initialized.slick-slider *):not([class*="__bg"]):not(video):not(.text-no-paint):not(img)').css('cssText', 'color:' + color + ' !important;filter:none;-webkit-filter: none;');



            // устанавливаем на блок класс окрашенного текста
            iframe.contents().find(blockSelector).toggleClass('sm-painted_text', true);

            //красим svg внутри блока (искл. .text-no-paint)

            if (iframe.contents().find(blockSelector).find('svg').find('use').length == 0) {
                //если не текст
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke) path').css('cssText', 'fill:' + color + ' !important;stroke:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke) circle').css('cssText', 'stroke:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill).text-no-paint-stroke path').css('cssText', 'fill:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg.text-paint-stroke:not(.desktop-text-paint-svg):not(.mobile-text-paint-svg) path').css('cssText', 'stroke:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill)').toggleClass('sm-painted_icon', true);
                // console.log(iframe.contents().find(blockSelector).find('textPath').length);
                iframe.contents().find(blockSelector).find('textPath').css('cssText', 'fill:' + color + ' !important;');
            } else {
                //красим svg sprite внутри блока
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke)').css('cssText', 'fill:' + color + ' !important;stroke:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill).text-no-paint-stroke').css('cssText', 'fill:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('svg.text-paint-stroke:not(.desktop-text-paint-svg):not(.mobile-text-paint-svg)').css('cssText', 'stroke:' + color + ' !important;');
                iframe.contents().find(blockSelector).find('textPath').css('cssText', 'fill:' + color + ' !important;');
            }

            // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill) path').css('cssText', 'fill:' + color + ' !important;stroke:' + color + ' !important;');
            // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint) circle').css('cssText', 'stroke:' + color + ' !important;');
            // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint)').toggleClass('sm-painted_icon', true);

            //принудительно красим блоки, которым проставлен класс принудительной покраски (раннее в исключения попадали слайдеры, которые покраска ломала)
            iframe.contents().find(blockSelector).find('.text-paint-color').css('color', color);
            //красим тексты пожеланий (часто они в слайдерах, которые не красим по общим правилам)
            if(iframe.contents().find(blockSelector).find('.sm-wishes__content-slide').length>0){
                // iframe.contents().find(blockSelector).find('.sm-wishes__content-slide').css('color',color);
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .sm-wishes__content-slide', 'color:' + color + '!important');
            }
            //раскрашиваем :after, :before, чекбоксы, рамки и пр.
            // console.log('selector: '+blockSelector+' .text-paint-background-after');
            if(iframe.contents().find(blockSelector+' .text-paint-background-after').length>0){
                // console.log('updatingRule');
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background-after:after', 'background:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-background-before').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background-before:before', 'background:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-border').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border', 'border-color:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-background').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background', 'background:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-border-before').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border-before:before', 'border-color:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-border-after').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border-after:after', 'border-color:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .text-paint-text').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector + ' .text-paint-text', 'color:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .desktop-text-paint-text').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-text', 'color:' + color + '!important');
            }
            if(iframe.contents().find(blockSelector+' .desktop-text-paint-svg').length>0){
                updateStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-svg:not(.text-no-paint-fill) path', 'fill:' + color + ' !important;stroke:' + color + ' !important;');
                updateStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-svg:not(.text-no-paint-fill) circle', 'stroke:' + color + ' !important;');
                updateStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector + ' .desktop-text-paint-svg.text-paint-stroke path', 'stroke:' + color + ' !important;');
            }

            //если находим в блоке чекбоксы
            if(iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').length>0) {
                // console.log('found checkbox');

                if (iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').css('mask') != null && iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').css('mask') != 'none') {
                    // console.log('checkbox type 51');
                    // если чекбоксы сделаны svg-изображениями (напр. шаблон 51 Kids), проставляем в дополнительные свойства новые цвета чекбоксов
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_box', 'background:'+color+'!important');
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_input:checked+.sm-form_checkbox_box', 'background:'+color+'!important');
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), 'input[type=radio]:checked', 'mix-blend-mode:normal!important;filter:none!important;background-image:none!important;background: '+color+'!important;opacity: 0.5;');
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), 'input[type=radio]', 'mix-blend-mode:normal!important;filter:none!important;background-image:none!important;background: transparent!important');
                    if(iframe.contents().find(blockSelector).find('.sm-form-radio-fake').length > 0) {
                        updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form-radio-fake', 'border-radius: 30px;border: solid 1px '+color+';');
                    }
                }else{
                    // console.log('checkbox type 81');
                    // если чекбокс - рамка с цветным фоном (напр. шаблон 81 I love you), проставляем цвета чекбоксов для них
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_box', 'border-color:'+color+'!important');
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_input:checked+.sm-form_checkbox_box', 'background-color:'+color+'!important');
                }
            }
        }, 500);
    }

}

function removeColorBlock(blockSelector, type){

    // console.log('remove color from: '+blockSelector+' | '+type);


    // проставляем цвет самому блоку
    iframe.contents().find(blockSelector).css(((type == '1') ? 'background' : 'color'), '');

    //если изменен фон, и он был установлен
    if(iframe.contents().find(blockSelector+'.sm-painted').length && type==1) {

        // по-идее здесь снимаем blend-mode с фонового изображения, но все ломается, поэтому пока без него

        // console.log('cssText: '+iframe.contents().find('[data-type="' + sid + '"].sm-painted').css('cssText'));
        // console.log('newCssText: '+iframe.contents().find('[data-type="' + sid + '"].sm-painted').css('cssText').replace('background-blend-mode: color-burn;', ''));
        let currentCssTextBackground = iframe.contents().find(blockSelector+'.sm-painted').css('cssText');
        let newCssTextBackground = currentCssTextBackground.replace('background-blend-mode: color-burn;', '');
        // console.log(currentCssTextBackground);
        // console.log(newCssTextBackground);
        iframe.contents().find(blockSelector+'.sm-painted').css('cssText', newCssTextBackground);
    }

    //снимаем класс покрашенного фона или текста
    iframe.contents().find(blockSelector).toggleClass((type == '1') ? 'sm-painted' : 'sm-painted_text',false);
    // iframe.contents().find('[data-type="' + sid + '"]').toggleClass('sm-painted_text',false);

    //если убрали цвет текста
    if (type == 2) {
        // убираем цвет с текстов
        iframe.contents().find(blockSelector+' *:not(.sm_colors):not(.sm_colors *):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.slick-initialized.slick-slider *):not([class*="__bg"]):not(video):not(.text-no-paint)').css('color', '');
        // убираем цвет с svg
        // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint) path').css('cssText', '');
        // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint) circle').css('cssText', '');
        // iframe.contents().find(blockSelector).find('svg.text-paint-stroke path').css('cssText', '');
        // iframe.contents().find(blockSelector).find('svg:not(.text-no-paint)').toggleClass('sm-painted_icon', false);


        if(iframe.contents().find(blockSelector).find('svg').find('use').length==0) {
            //если не текст
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke) path').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke) circle').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill).text-no-paint-stroke path').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg.text-paint-stroke:not(.desktop-text-paint-svg):not(.mobile-text-paint-svg) path').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill)').toggleClass('sm-painted_icon', false);
            // console.log(iframe.contents().find(blockSelector).find('textPath').length);
            iframe.contents().find(blockSelector).find('textPath').css('cssText', '');
        }else{
            //svg sprite внутри блока
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill):not(.text-no-paint-stroke)').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg:not(.text-no-paint):not(.text-no-paint-fill).text-no-paint-stroke').css('cssText', '');
            iframe.contents().find(blockSelector).find('svg.text-paint-stroke:not(.desktop-text-paint-svg):not(.mobile-text-paint-svg)').css('cssText', '');
            iframe.contents().find(blockSelector).find('textPath').css('cssText', '');
        }



    }

    // если убрали цвет с формы
    // if ((iframe.contents().find(blockSelector).hasClass('sm-questionnaire') || iframe.contents().find(blockSelector).hasClass('sm-form'))  && type==2) {
    //     // снимаем цвета с формы
    //     iframe.contents().find('.sm-modal *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *), .sm-modal').css('color', '');
    //     iframe.contents().find('.sm-quest-modal *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *), .sm-quest-modal').css('color', '');
    //     iframe.contents().find('div#sm-mod *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *), div#sm-mod').css('color', '');
    // }
    // if ((iframe.contents().find(blockSelector).hasClass('sm-questionnaire') || iframe.contents().find(blockSelector).hasClass('sm-form')) && type==1) {
    //     // снимаем цвета с формы
    //     iframe.contents().find('.sm-modal').css('background' ,'');
    //     iframe.contents().find('.sm-quest-modal').css('background' ,'');
    //     iframe.contents().find('div#sm-mod').css('background' ,'');
    // }

    //убираем цвет с пожеланий
    if(iframe.contents().find(blockSelector).find('.sm-wishes__content-slide').length>0 && type==2){
        removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .sm-wishes__content-slide');
    }


    //удаляем правила из дополнительных стилей
    if(type == 1) {
        if (iframe.contents().find(blockSelector+' .background-paint-background').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-background');
        }
        if (iframe.contents().find(blockSelector+'.background-paint-background').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background');
        }
        if (iframe.contents().find(blockSelector+' .background-paint-background-after').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-background-after:after');
        }
        if (iframe.contents().find(blockSelector+' .background-paint-background-before').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-background-before:before');
        }
        if (iframe.contents().find(blockSelector+'.background-paint-background-after').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background-after:after');
        }
        if (iframe.contents().find(blockSelector+'.background-paint-background-before').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-background-before:before');
        }
        if (iframe.contents().find(blockSelector+'.background-paint-text').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-paint-text');
        }
        if (iframe.contents().find(blockSelector+' .background-paint-text').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-paint-text');
        }
        if (iframe.contents().find(blockSelector+'.background-hide').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+'.background-hide');
        }
        if (iframe.contents().find(blockSelector+' .background-hide').length > 0) {
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .background-hide');
        }
        iframe.contents().find(blockSelector+' svg.background-paint-fill path').css('cssText', '');
        iframe.contents().find(blockSelector+' svg.background-paint-fill').toggleClass('sm-painted_icon', false);

        // if (iframe.contents().find(blockSelector).hasClass('sm-questionnaire') || iframe.contents().find(blockSelector).hasClass('sm-form') || iframe.contents().find('[data-type="' + sid + '"]').hasClass('sm-feedback')) {
        //
        //     console.log('removing modal style');
        //
        //     if(iframe.contents().find('.sm-modal').length) {
        //         console.log('here10');
        //         removeStyleFormBackground(iframe.contents().find('head').find('.colors-styles'), '.sm-modal');
        //     }
        //     if(iframe.contents().find('.sm-quest-modal').length) {
        //         removeStyleFormBackground(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal');
        //     }
        //     if(iframe.contents().find('div#sm-mod').length){
        //         console.log('here20');
        //         removeStyleFormBackground(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod');
        //     }
        //     if(iframe.contents().find('.sm-feedback').length){
        //         removeStyleFormBackground(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback');
        //     }
        // }

        var pseudo = iframe.contents().find(blockSelector).find('[class*="__bg"]');
        if (pseudo.length > 0) {
            pseudo.css('cssText', '');
        }
        iframe.contents().find(blockSelector).find('.background-paint-box-shadow').each(function(){
            $(this).css('cssText','');
        });

    }
    if(type == 2){
        if(iframe.contents().find(blockSelector+' .text-paint-background-after').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background-after:after');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-background-before').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background-before:before');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-border').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-background').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-background');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-border-before').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border-before:before');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-border-after').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-border-after:after');
        }
        if(iframe.contents().find(blockSelector+' .text-paint-text').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles'), blockSelector+' .text-paint-text');
        }
        if(iframe.contents().find(blockSelector+' .desktop-text-paint-text').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-text');
        }
        if(iframe.contents().find(blockSelector+' .desktop-text-paint-svg').length>0){
            removeStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-svg:not(.text-no-paint-fill) path');
            removeStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-svg:not(.text-no-paint-fill) circle');
            removeStyleRule(iframe.contents().find('head').find('.colors-styles-desktop'), blockSelector+' .desktop-text-paint-svg.text-paint-stroke path');
        }
        if(iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').length>0) {
            if (iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').css('mask') != null && iframe.contents().find(blockSelector).find('.sm-form_checkbox_box').css('mask') != 'none') {
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_box');
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_input:checked+.sm-form_checkbox_box');
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), 'input[type=radio]:checked');
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), 'input[type=radio]');
                if(iframe.contents().find(blockSelector).find('.sm-form-radio-fake').length > 0) {
                    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form-radio-fake');
                }
            }else{
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_box');
                removeStyleRule(iframe.contents().find('head').find('.colors-styles'), '.sm-form_checkbox_input:checked+.sm-form_checkbox_box');
            }
        }
        // if ((iframe.contents().find(blockSelector).hasClass('sm-questionnaire') || iframe.contents().find(blockSelector).hasClass('sm-form') || iframe.contents().find(blockSelector).hasClass('sm-feedback')) && type==2) {
        //     removeStyleForm(iframe.contents().find('head').find('.colors-styles'),'[data-type="' + sid + '"]');
        //     if(iframe.contents().find('.sm-modal').length) {
        //         removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-modal');
        //     }
        //     if(iframe.contents().find('.sm-quest-modal').length) {
        //         removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal');
        //     }
        //     if(iframe.contents().find('div#sm-mod').length){
        //         removeStyleForm(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod');
        //     }
        //     if(iframe.contents().find('.sm-feedback').length){
        //         removeStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback');
        //     }
        // }
    }
    if(type>2){
        var add = -1;
        var blockType = -1;
        // console.log('remove button color')

        if(typeof iframe.contents().find(blockSelector).attr('data-type') != 'undefined'){
            add = (iframe.contents().find(blockSelector).attr('data-type')==211) ? 'NEW_' : add;
            add = (iframe.contents().find(blockSelector).attr('data-type')==166) ? '' : add;
            blockType =  iframe.contents().find(blockSelector).attr('data-type');
        }else{
            if(iframe.contents().find(blockSelector).closest('[data-type]').length != 0){
                add = (iframe.contents().find(blockSelector).closest('[data-type]').attr('data-type')==211) ? 'NEW_' : add;
                add = (iframe.contents().find(blockSelector).closest('[data-type]').attr('data-type')==166) ? '' : add;
                blockType = iframe.contents().find(blockSelector).closest('[data-type]').attr('data-type');
            }
        }

        // console.log('add = '+add)
        // console.log('blockType = '+blockType)

        // console.log($('#secondPanel [data-section='+blockType+']'));

        if(blockType==166 || blockType==211) {

            if (add != -1) {
                let colorArr = [];
                $.each($('#secondPanel [data-section=' + blockType + ']').find('[data-wrap-group-id="5"] .ct-color-panel').find('.ct-input[type="color"]'), function () {
                    if (!$(this).hasClass('ct-empty')) {
                        colorArr.push($(this).val());
                    } else {


                        colorArr.push('none');
                    }
                })
                paintButton("[data-type='" + blockType + "'] [data-sm-href='" + add + "OWN_BUTTON_LINK']", colorArr);
            }

        }else{

            let colorArr = [];
            $.each($('#secondPanel [data-section=' + blockType + ']').find('.button_personal_colors .ct-color-panel').find('.ct-input[type="color"]'), function () {
                if (!$(this).hasClass('ct-empty')) {
                    colorArr.push($(this).val());
                } else {
                    colorArr.push('none');
                }
            })
            let buttonSelector = '';
            // console.log(button_items);
            // $.each(button_items, function(i,item){
            //     console.log('[data-type="' + blockType + '"] [data-sm-href="'+item+'"]');
            //     if(iframe.contents().find('[data-type="' + blockType + '"]').find('[data-sm-href="'+item+'"]').length > 0){
            //         buttonSelector = '[data-type="' + blockType + '"] [data-sm-href="'+item+'"]';
            //     }
            // })
            // console.log(buttonSelector)
            //
            // let buttonSelector = '';

            if(typeof data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + blockType + "]"] != "undefined" && data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + blockType + "]"]!=null && data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + blockType + "]"]!=''){
                buttonSelector = "[data-type='" + blockType + "'] "+data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + blockType + "]"];
            }else{
                if(typeof $('[name="personal_button_selector_colors[' + blockType + ']"]').val() != "undefined" && $('[name="personal_button_selector_colors[' + blockType + ']"]').val()!=null && $('[name="personal_button_selector_colors[' + blockType + ']"]').val()!=''){
                    buttonSelector = "[data-type='" + blockType + "'] "+$('[name="personal_button_selector_colors[' + blockType + ']"]').val();
                }
            }



            if(buttonSelector != '') {
                console.log('paint_button from remove '+buttonSelector);
                paintButton(buttonSelector, colorArr);
            }

        }
    }
}

function removeStyleForm(styleTag, prefix){
    removeStyleRule(styleTag, prefix+' ::-webkit-input-placeholder');
    removeStyleRule(styleTag, prefix+' ::-moz-placeholder');
    removeStyleRule(styleTag, prefix+' :-ms-input-placeholder');
    removeStyleRule(styleTag, prefix+' :-moz-placeholder');
    removeStyleRule(styleTag, prefix+' ::placeholder');
    removeStyleRule(styleTag, prefix+' input');
    removeStyleRule(styleTag, prefix+' textarea');
    removeStyleRule(styleTag, prefix+' input[type=radio]+label:before');
    removeStyleRule(styleTag, prefix+' input[type=radio]:checked+label:before');
    removeStyleRule(styleTag, prefix+' input[type=checkbox]+label:before');
    removeStyleRule(styleTag, prefix+' input[type=checkbox]:checked+label:before');
    // if(!prefix.match('/^[data-type=d+]$/')){
    //     // убираем цвет с svg
    //     // iframe.contents().find('[data-type="' + sid + '"]').find('svg:not(.text-no-paint) path').css('cssText', '');
    //     // iframe.contents().find('[data-type="' + sid + '"]').find('svg:not(.text-no-paint)').toggleClass('sm-painted_icon', false);
    //
    //     //принудительно красим блоки, которым проставлен класс принудительной покраски (раннее в исключения попадали слайдеры, которые покраска ломала)
    //     iframe.contents().find(prefix+' .text-paint-color').css('color', '');
    //     //раскрашиваем :after, :before, чекбоксы, рамки и пр.
    //     if(iframe.contents().find(prefix+' .text-paint-background-after').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-background-after:after');
    //     }
    //     if(iframe.contents().find(prefix+' .text-paint-background-before').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-background-before:before');
    //     }
    //     if(iframe.contents().find(prefix+' .text-paint-border').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-border');
    //     }
    //     if(iframe.contents().find(prefix+' .text-paint-background').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-background');
    //     }
    //     if(iframe.contents().find(prefix+' .text-paint-border-before').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-border-before:before');
    //     }
    //     if(iframe.contents().find(prefix+' .text-paint-border-after').length>0){
    //         removeStyleRule(iframe.contents().find('head').find('.colors-styles'), prefix+' .text-paint-border-after:after');
    //     }
    // }
}
function updateStyleForm(styleTag, prefix, color) {
    // console.log('updating modal: ' + prefix);
    updateStyleRule(styleTag, prefix + ' ::-webkit-input-placeholder', 'color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' ::-moz-placeholder', 'color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' :-ms-input-placeholder', 'color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' :-moz-placeholder', 'color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' ::placeholder', 'color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' input', 'border-color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' textarea', 'border-color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' input[type=radio]+label:before', 'border-color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' input[type=radio]:checked+label:before', 'background:' + color + '!important');
    updateStyleRule(styleTag, prefix + ' input[type=checkbox]+label:before', 'border-color:' + color + '!important');
    updateStyleRule(styleTag, prefix + ':not(.checkbox-no-paint) input[type=checkbox]:checked+label:before', 'background:' + color + '!important');
}


function autoResizeText() {

    var el = iframe.contents().find('.sm-needtoresize');

    // console.log('autoresize '+template_val.id);
    if(parseInt(template_val.id)==13 || parseInt(template_val.id)==69) {
        var dopEl = iframe.contents().find('.sm-personal_linked [data-sm-text=HELLO_TITLE]');
        // console.log(dopEl);
    }
    if (el.length > 0) {

        $.each(el, function () {

            var maxFont = 50;
            var minFont = 30;

            if ($(this).attr('data-max-font')) {
                maxFont = $(this).data('max-font')
                minFont = $(this).data('min-font');
            }

            var fontSize = maxFont;
            $(this).parent().css('font-size', fontSize + "px");
            // console.log($(this).parent())
            // console.log('try to resize: '+maxFont+'-'+minFont+' | width: '+$(this).innerWidth() +'>'+ $(this).parent().innerWidth()+' | height: '+$(this).innerHeight() +'>'+ $(this).parent().innerHeight());
            while ((($(this).innerWidth() > $(this).parent().innerWidth()) || $(this).innerHeight() > $(this).parent().innerHeight()) && fontSize > minFont) {
                fontSize -= 1;
                $(this).parent().css('font-size', fontSize + "px");
                $(this).css('font-size', fontSize + "px");
            }
            // console.log(fontSize)
        })
    }
    if (dopEl!=null && dopEl.length > 0) {

        $.each(dopEl, function () {

            var maxFont = (iframe.contents().find('body').innerWidth()<500) ? 90 : 150;
            var minFont = 25;

            if ($(this).attr('data-max-font')) {
                maxFont = $(this).data('max-font')
                minFont = $(this).data('min-font');
            }

            var fontSize = maxFont;
            $(this).css('font-size', fontSize + "px");
            // console.log($(this).innerWidth()+' '+iframe.contents().find('.sm-about__tx').innerWidth()+' '+$(this).innerHeight()+' '+ ((fontSize*1.4)+75));
            var aboutTxWidth = (iframe.contents().find('body').innerWidth()<500) ? 355 : 780;
            var aboutTxHeight = (iframe.contents().find('body').innerWidth()<500) ? 110 : 250;
            while ((($(this).innerWidth() > aboutTxWidth) || $(this).innerHeight() > (aboutTxHeight) ) && fontSize > minFont) {
                fontSize -= 1;
                $(this).css('font-size', fontSize + "px");
            }
        })
    }

}

function loadTemplate(){
    // console.log('loadedTemplate')
    console.log(data_value);

    if ($.isArray(data_value['LOCATION_TIMING_1'])) //странная заплатка
    {
        data_value['LOCATION_TIMING'] = []
        data_value['LOCATION_TIMING_0'] = data_value['LOCATION_TIMING_1'][0]
        data_value['LOCATION_TIMING_1'] = data_value['LOCATION_TIMING_1'][1]
    }

    //TODO вставить перс блоки по шаблону
    // здесь же утрясаем то, что в data_value упущено типа цветов
    // обрабатываем own_after если это вообще тут нужно

    $.each(data_value, function (ik, iv) {

        if(ik.indexOf('_ALIGN') !== -1)
        {
            var target = ik.split('_ALIGN')[0];
            var targe = iframe.contents().find('[data-sm-text="' + target + '"]');
            targe.removeClass('sm-text_align-left').removeClass('sm-text_align-right').removeClass('sm-text_align-center').toggleClass('sm-text_align-' + iv, true);
        }
        if (ik === 'CONTACTS_LINK') {
            // $('#secondPanel [name="contact_type"]').val(iv.type);
            // $('#secondPanel [name="contact_link"]').val(iv.value);
            var link = 'tel:' + iv.value;

            if(iv.type == '2' && iv.value.indexOf('chat.whatsapp') > -1)
            {
                link = iv.value;
            }
            else
            {
                switch (Number(iv.type)) {
                    case 2:
                        link = 'https://wa.me/' + iv.value;
                        break;
                    case 3:
                        link = 'https://t.me/' + iv.value;
                        break;
                    case 4:
                        link = 'mailto:' + iv.value;
                        break;
                    case 5:
                        link = '';
                        break;
                }
            }

            iframe.contents().find('[data-sm-contact-mes]').attr('href',link.replace(/\s/g, ''));
        }

        if (ik === 'DRESSCODE_COLORS' || ik === 'DRESSCODE_COLORS_GUYS') {
            var va = '';
            var colcount = iv.length;
            $.each(iv, function (k, v) {
                if (k < colcount) {
                    va += '<div class="sm_colors"><div style="background: ' + v + '"></div></div>';
                }
            })
            iv = va;
        }

        if ($.inArray(ik, image_fields) >= 0) {
            iv = '/sitemaker' + iv;
        }

        if ($.inArray(ik, galleries) >= 0) { //Картинки
            var photos = '';
            $.each(iv, function (ko, vo) {
                photos += '<img src="/sitemaker' + vo + '" data-fancybox="' + ik + '">';
            })
            iv = photos
        } else if ($.inArray(ik, text_items) >= 0) {
            $.each(iv, function (ko, vo) {
                iframe.contents().find('[data-sm-text="' + ik.toUpperCase() + '_' + ko + '"]').html(vo);
            })
        } else if ($.inArray(ik, gallery_items) >= 0) {

            var galleryItemReference = 0;

            if (ik.toUpperCase().indexOf('DRESSCODE') !== -1) {
                //пересобираем галерею дресс-кода если находим картинки и ни у одного родительского элемента не стоит класс sm-no-slider
                //на этом этапе находим референс слайда и удаляем все кроме первого
                if (iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '_' + 0 + '"]').length && !(iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '_' + 0 + '"]').closest('.sm-no-slider').length)) {
                    galleryItemReference = iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '_' + 0 + '"]')
                    if (galleryItemReference.closest('.js-sm-code-sliderOn').length || galleryItemReference.closest('.js-sm-code-sliderTw').length) {
                        galleryItemReference = galleryItemReference.closest('.sm-code__slider-al');
                        iframe.contents().find('[data-sm-href^="' + ik.toUpperCase() + '_"][data-sm-href!="' + ik.toUpperCase() + '_' + 0 + '"]').closest('.sm-code__slider-al').remove();
                    } else {
                        iframe.contents().find('[data-sm-href^="' + ik.toUpperCase() + '_"][data-sm-href!="' + ik.toUpperCase() + '_' + 0 + '"]').remove();
                    }
                }
            }

            if(iv.length > 0) {
                $.each(iv, function (ko, vo) {
                    if (ik.toUpperCase().indexOf('DRESSCODE') !== -1) {
                        //если определен референс, добавляем остальные слайды
                        if (!(iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '_' + ko + '"]').length) && galleryItemReference != 0) {
                            if (galleryItemReference.hasClass('sm-code__slider-al')) {
                                galleryItemReference.clone().appendTo(galleryItemReference.parent()).children('a').attr('data-sm-href', ik.toUpperCase() + '_' + ko).children('[data-sm-src="' + ik.toUpperCase() + '_' + 0 + '"]').attr('data-sm-src', ik.toUpperCase() + '_' + ko);
                            } else {
                                galleryItemReference.clone().appendTo(galleryItemReference.parent()).attr('data-sm-href', ik.toUpperCase() + '_' + ko).find('[data-sm-src="' + ik.toUpperCase() + '_' + 0 + '"]').attr('data-sm-src', ik.toUpperCase() + '_' + ko);
                            }
                            galleryItemReference.closest('.js-sm-code-sliderOn').css('display', 'block');
                            galleryItemReference.closest('.js-sm-code-sliderTw').css('display', 'block');
                            galleryItemReference.closest('.gallery-slider-container').css('opacity', '1');
                        }
                    }

                    iframe.contents().find('[data-sm-src="' + ik.toUpperCase() + '_' + ko + '"]').prop('src', '/sitemaker' + vo);
                    iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '_' + ko + '"]').prop('href', '/sitemaker' + vo);
                })
                if (galleryItemReference == 0) {
                    if (iframe.contents().find('[data-sm-src="' + ik.toUpperCase() + '_' + 0 + '"]').length) {
                        // console.log('reinit slider');
                        galleryItemReference = iframe.contents().find('[data-sm-src="' + ik.toUpperCase() + '_' + 0 + '"]')
                        galleryItemReference.closest('.js-sm-code-sliderOn').css('display', 'block');
                        galleryItemReference.closest('.js-sm-code-sliderTw').css('display', 'block');
                        galleryItemReference.closest('.gallery-slider-container').css('opacity', '1');
                    }
                }
            }else{
                if (iframe.contents().find('.js-sm-code-sliderOn').length || iframe.contents().find('.js-sm-code-sliderTw').length) {
                    galleryItemReference = iframe.contents().find('[data-sm-src="' + ik.toUpperCase() + '_' + 0 + '"]')
                    // console.log('sliders-1-found');
                    galleryItemReference.closest('.js-sm-code-sliderOn').css('display','none');
                    galleryItemReference.closest('.js-sm-code-sliderTw').css('display','none');
                    galleryItemReference.closest('.gallery-slider-container').css('opacity','0');
                }
            }
        }

        if (ik === 'ANKETA_DRINKS') {
            var drinks = iv;

            iframe.contents().find('div[data-sm-anketa] > *:not(.ct-alcotpl)').remove();

            if (drinks.length > 0) {
                $.each(drinks, function (k, v) {
                    var smanketa = iframe.contents().find('div[data-sm-anketa]');
                    if(smanketa.length > 0) {
                        $.each(smanketa,function(ka,va){
                            var tpl = $(this).find('.ct-alcotpl').clone();
                            tpl.removeClass('ct-alcotpl');
                            if(tpl.attr('tagName') === 'label'){
                                $(this).attr("for",'alco' + (k + 1));
                            }
                            else
                            {
                                tpl.find('label').attr("for",'alco' + (k + 1) + ka);
                            }

                            tpl.find('[data-sm-alcoitem]').text(v);
                            tpl.find('input').attr("id",'alco' + (k + 1) + ka).attr("value",(k + 1));
                            $(this).append(tpl);
                        })

                    }
                })
            }
        }

        //TODO обработка значений OWN_BLOCK

        var iv1 = '';
        var iv2 = '';
        var ivC = iv;

        if(iframe.contents().find('[data-sm-text="' + ik.toUpperCase() + '"]').length > 0)
        {
            ivC = iv.replace(/<\/?[^>]+(>|$)/g, "");
            iv = parseLinks(iv);
        }

        iframe.contents().find('[data-sm-text="' + ik.toUpperCase() + '"]').html(iv).attr('title', ivC);
        iframe.contents().find('[data-sm-date="' + ik.toUpperCase() + '"]').attr('data-date', iv).attr('title', ivC);

        if(ik == 'GROOM_TEL' || ik == 'BRIDE_TEL')
        {
            iv1 = phonePrepareView(iv);
            iv2 = phonePrepare(iv);
            if (iv != '') {
                iframe.contents().find('[data-sm-tel="' + ik.toUpperCase() + '"]').prop('href', 'tel:' + iv2).text('+' + iv1);
            }

            iframe.contents().find('[data-sm-tel="' + ik.toUpperCase() + '"]').toggleClass('sm-hidden', iv == '');
        }

        iframe.contents().find('[data-sm-href="' + ik.toUpperCase() + '"]').prop('href', iv).attr('target', '_blank');
        iframe.contents().find('[data-sm-src="' + ik.toUpperCase() + '"]').prop('src', iv);
    })

    iframe.contents().find('[data-sm-text="TIMING_1_1"]').parent().toggle(data_value['TIMING_1_1'] != '');

    var timing_wrappers = ['.sm-program__body li', '.sm-timing__item', '.sm-timing-item', '.sm-program__wrapper-item', '.sm-time__list-row', '.sm_times', '.sm-program__list-item', '.sm-program__cell'];

    $.each(timing_wrappers, function (k, v) {
        if (iframe.contents().find(v).length > 0) {
            $.each(iframe.contents().find(v), function (k, v) {
                $(this).toggleClass('sm-hidden', data_value['TIMING_' + (k + 1) + '_1'] == '' || data_value['TIMING_' + (k + 1) + '_0'] == '');
            })
        }
    })

    if(iframe.contents().find('[data-sm-text="ANKETA_DRINKS_QUESTION"]').length > 0 && iframe.contents().find('[data-sm-text="ANKETA_DRINKS_QUESTION"]').val() == '' && typeof(data_value['ANKETA_DRINKS_QUESTION']) == 'undefined')
    {
        iframe.contents().find('[data-sm-text="ANKETA_DRINKS_QUESTION"]').text('Ваши предпочтения');

    }

    console.log('initAll from view')
    if(typeof iframe[0].contentWindow.initAll != 'undefined' )
        iframe[0].contentWindow.initAll();

    // iframe.contents().find('[data-sm-anketa-toggle]').toggleClass('sm-hidden', d_alco == '0');
    iframe.contents().find('[data-sm-anketa-toggle] > [data-sm-text="ANKETA_DRINKS_QUESTION"]:not([data-forq])').toggleClass('sm-hidden', d_alco == '0');
    iframe.contents().find('[data-sm-anketa-toggle] [data-sm-anketa="1"]').toggleClass('sm-hidden',  d_alco == '0');
    iframe.contents().find('[data-sm-anketa-toggle] [data-sm-anketa]:not([data-forq])').toggleClass('sm-hidden', d_alco == '0');

    var person_style = false;
    if (typeof d_person !== 'undefined' && d_person !== null) {
        if (d_person != null && d_person != '') {
            if (iframe.contents().find('[data-sm-text="HELLO_TITLE"]').length > 0) {
                iframe.contents().find('[data-sm-text="HELLO_TITLE"]').text(d_person);
                person_style = true;
            } else if (iframe.contents().find('[data-sm-text="DATETIME_TITLE"]').length > 0 && iframe.contents().find('[data-sm-text="HELLO_TEXT"]').length == 0) {
                iframe.contents().find('[data-sm-text="DATETIME_TITLE"]').text(d_person);
                person_style = true;
            }
        }
    }

    if (typeof d_person_subtext !== 'undefined' && d_person_subtext !== null) {
        if (d_person_subtext != null && d_person_subtext != '') {
            if (iframe.contents().find('[data-sm-text="HELLO_SUBTITLE"]').length > 0) {
                iframe.contents().find('[data-sm-text="HELLO_SUBTITLE"]').html(d_person_subtext);
                person_style = true;
            }
        }
    }

    if (typeof d_person_text !== 'undefined' && d_person_text !== null) {
        if (d_person_text != null && d_person_text != '') {
            if (iframe.contents().find('[data-sm-text="HELLO_TEXT"]').length > 0) {
                iframe.contents().find('[data-sm-text="HELLO_TEXT"]').html(d_person_text);
                person_style = true;
            } else if (iframe.contents().find('[data-sm-text="DATETIME_TEXT"]').length > 0 && iframe.contents().find('[data-sm-text="HELLO_TEXT"]').length == 0 && iframe.contents().find('[data-sm-text="HELLO_TITLE"]').length == 0) {
                iframe.contents().find('[data-sm-text="DATETIME_TEXT"]').text(d_person_text);
                person_style = true;
            }
        }
    }

    iframe.contents().find('body').toggleClass('sm-personal_linked', person_style);

    var sputnik = iframe.contents().find('[data-sm-anketa-company]');
    if (sputnik.parents('.sm-form__block').length > 0) {
        sputnik = sputnik.parents('.sm-form__block');
    } else if (sputnik.parents('.sm-form__input-wrapp').length > 0) {
        sputnik = sputnik.parents('.sm-form__input-wrapp');
    } else if (sputnik.parents('.sm-form__row').length > 0) {
        sputnik = sputnik.parents('.sm-form__row');
    } else if (sputnik.parents('.sm-wrapper_block-anketa_question').length > 0) {
        sputnik = sputnik.parents('.sm-wrapper_block-anketa_question');
    } else if (sputnik.parents('.sm-form-inner').length > 0) {
        sputnik = sputnik.parents('.sm-form-inner');
    } else if (sputnik.prev('.sm-mgb40').length > 0) {
        sputnik.prev('.sm-mgb40').toggleClass('sm-hidden', d_sput != '1')
    } else if (sputnik.prev('.text-20px').length > 0) {
        sputnik.prev('.text-20px').toggleClass('sm-hidden', d_sput != '1')
    } else if (sputnik.parents('.sm-questionnaire__form-inner').length > 0) {
        sputnik = sputnik.parents('.sm-questionnaire__form-inner');
    } else if (sputnik.parents('.sm-wrapper-input').length > 0) {
        sputnik = sputnik.parents('.sm-company_wrapper');
    }


    sputnik.toggleClass('sm-hidden', d_sput != '1');

    var palette = iframe.contents().find('[data-sm-text="DRESSCODE_COLORS"]');
    palette.toggleClass('sm-hidden', d_palette != '1');

    iframe.contents().find('[data-sm-contact-bride]').toggleClass('sm-hidden', data_value['BRIDE_TEL'] == '');
    iframe.contents().find('[data-sm-contact-groom]').toggleClass('sm-hidden', data_value['GROOM_TEL'] == '');
    iframe.contents().find('[data-sm-href="LOCATION_MAP"]').toggle(data_value['LOCATION_MAP'] != '');

    iframe.contents().find('.sm-contact_soc:first-child').toggleClass('sm-hidden', (!data_value['CONTACTS_LINK'] || data_value['CONTACTS_LINK']['type'] != '3'));
    iframe.contents().find('.sm-contact_soc:last-child').toggleClass('sm-hidden', (!data_value['CONTACTS_LINK'] || data_value['CONTACTS_LINK']['type'] != '2'));

    iframe.contents().find('[data-sm-contact-mes]').attr('target', '_blank').toggle(data_value['CONTACTS_LINK'] && data_value['CONTACTS_LINK']['value'] != '');

    iframe.contents().find('[data-sm-href="WISH_WISHLIST"]').toggle(data_value['WISH_WISHLIST'] && data_value['WISH_WISHLIST'] != '');

    for (var w = 0; w < 3; w++) {
        if (data_value['WISH_TEXT_ITEMS_' + w] == '') {
            // console.log('viewer wish');
            if (iframe.contents().find('[data-sm-text="WISH_TEXT_ITEMS_' + w + '"]').parents('.sm-wishes__content-item').length > 0) {
                iframe.contents().find('[data-sm-text="WISH_TEXT_ITEMS_' + w + '"]').parents('.sm-wishes__content-item').remove();
            } else {
                iframe.contents().find('[data-sm-text="WISH_TEXT_ITEMS_' + w + '"]').remove();
            }
        }
    }


    if (iframe.contents().find('[data-sm-text="MAIN_TIMING"]').length > 0) {
        if (typeof (data_value['MAIN_TIMING']) == 'undefined') {
            iframe.contents().find('[data-sm-text="MAIN_TIMING"]').parent().toggle(data_value['TIMING_1_0'] != '');
            iframe.contents().find('.sm-date-slash').toggle(data_value['TIMING_1_0'] != '');
            iframe.contents().find('[data-sm-text="MAIN_TIMING"]').html(data_value['TIMING_1_0'])
        } else {
            iframe.contents().find('[data-sm-text="MAIN_TIMING"]').toggle(data_value['MAIN_TIMING'] != '');
            iframe.contents().find('.sm-date-slash').toggle(data_value['MAIN_TIMING'] != '');
        }
    }

    if (iframe.contents().find('[data-sm-text="LOCATION_TIMING_0"]').length > 0) {
        if (typeof (data_value['LOCATION_TIMING']) == 'undefined' && typeof (data_value['LOCATION_TIMING_0']) == 'undefined') {
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_0"]').parent().toggle(data_value['TIMING_1_0'] != '');
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_0"]').html(data_value['TIMING_1_0'])

            iframe.contents().find('[data-sm-text="LOCATION_TIMING_1"]').parent().toggle(data_value['TIMING_1_1'] != '');
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_1"]').html(data_value['TIMING_1_1'])
        } else {
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_0"]').parent().toggleClass('sm-hidden', data_value['LOCATION_TIMING_0'] == '');
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_0"]').html(data_value['LOCATION_TIMING_0'])

            iframe.contents().find('[data-sm-text="LOCATION_TIMING_1"]').parent().toggleClass('sm-hidden', data_value['LOCATION_TIMING_0'] == '');
            iframe.contents().find('[data-sm-text="LOCATION_TIMING_1"]').html(data_value['LOCATION_TIMING_1'])
        }
    }


    var nd = d_mdate.split('.');
    if (nd.length >= 3) {
        var pyear = nd[2];
        var pmonth = Number(nd[1]);
        var pday = nd[0];
    }

    var bd = d_bdate.split('.');
    if (bd.length >= 3) {
        var byear = bd[2];
        var bmonth = Number(bd[1]);
        var bday = bd[0];
    }

    var pweek = new Date(pyear, pmonth - 1, pday).getDay()
    var emonth = new Date(pyear, pmonth - 1, pday).toLocaleString('default', {month: 'long'});
    var tomorrow = new Date(new Date(pyear, pmonth - 1, pday).getTime() + 24 * 60 * 60 * 1000);
    var yesterday = new Date(new Date(pyear, pmonth - 1, pday).getTime() - 24 * 60 * 60 * 1000);
    var tom_week = tomorrow.getDay();
    var tom_month = tomorrow.getMonth() + 1;
    var tom_year = tomorrow.getFullYear();
    var tom_day = tomorrow.getDate();

    var yes_week = yesterday.getDay();
    var yes_month = yesterday.getMonth() + 1;
    var yes_year = yesterday.getFullYear();
    var yes_day = yesterday.getDate();

    if (yes_day < 10) {
        yes_day = '0' + yes_day;
    }

    if (tom_day < 10) {
        tom_day = '0' + tom_day;
    }

    if (yes_month < 10) {
        yes_month = '0' + yes_month;
    }

    if (tom_month < 10) {
        tom_month = '0' + tom_month;
    }

    iframe.contents().find('[data-sm-bmonth-rod]').html(tmonthsr[bmonth - 1]);
    iframe.contents().find('[data-sm-tmonth-rod]').html(tmonthsr[pmonth - 1]);
    iframe.contents().find('[data-sm-tmonth]').html(tmonths[pmonth - 1]);
    iframe.contents().find('[data-sm-wday]').html(dweeks[pweek]);
    iframe.contents().find('[data-sm-fyear]').html(pyear);

    iframe.contents().find('[data-sm-day_tom]').html(tom_day);
    iframe.contents().find('[data-sm-tmonth_tom]').html(tmonths[tom_month - 1]);
    iframe.contents().find('[data-sm-wday_tom]').html(dweeks[tom_week]);

    iframe.contents().find('[data-sm-day_yes]').html(yes_day);
    iframe.contents().find('[data-sm-tmonth_yes]').html(tmonths[yes_month - 1]);
    iframe.contents().find('[data-sm-wday_yes]').html(dweeks[yes_week]);

    if (pmonth < 10) {
        pmonth = '0' + pmonth;
    }
    if (pyear > 2000) {
        pyear = pyear.substring(2, 4);
    }

    if (bmonth < 10) {
        bmonth = '0' + bmonth;
    }

    var bfyear = byear;
    if (byear > 2000) {
        byear = byear.substring(2, 4);
    } else {
        bfyear = byear + 2000;
    }


    iframe.contents().find('[data-sm-year]').html(pyear);
    iframe.contents().find('[data-sm-day]').html(pday);
    iframe.contents().find('[data-sm-lnmonth]').html(tmonths_ln[pmonth - 1]);
    iframe.contents().find('[data-sm-demonth]').html(tmonths_de[pmonth - 1]);
    iframe.contents().find('[data-sm-emonth]').html(emonth);
    iframe.contents().find('[data-sm-month]').html(pmonth);
    iframe.contents().find('[data-sm-bfyear]').html(bfyear);
    iframe.contents().find('[data-sm-byear]').html(byear);
    iframe.contents().find('[data-sm-bday]').html(bday);
    iframe.contents().find('[data-sm-bmonth]').html(bmonth);

    if(iframe.contents().find('[data-sm-text="DRESSCODE_COLORS"]').length > 1)
    {
        var dc = iframe.contents().find('[data-sm-text="DRESSCODE_COLORS"]');
        var sc = $(dc[0]).find('.sm_colors').clone();
        var pc = (sc.length / dc.length);
        $.each(dc,function(k,v)
        {
            $(this).html('');
            for (var c = 0; c < pc; c++) {
                $(this).append(sc[c + k * pc]);
            }
        })
    }

    doGrayscales();

    setTimeout(function () {
        initTimingIcons();
        setFontSize();
        // autoResizeText();
    }, 500)


    initVideo();

    if (data_value['DRESSCODE_GIRLS_GALLERY_ITEMS']) {
        if (iframe.contents().find('[data-sm-src="DRESSCODE_GIRLS_GALLERY_ITEMS_0"]').parents('.slick-slider').length > 0) {
            iframe.contents().find('[data-sm-text="DRESSCODE_GIRLS_TITLE"]').toggleClass('sm-hidden', (data_value['DRESSCODE_GIRLS_GALLERY_ITEMS'].length === 0));
            iframe.contents().find('[data-sm-src="DRESSCODE_GIRLS_GALLERY_ITEMS_0"]').parents('.slick-slider').toggleClass('sm-hidden', (data_value['DRESSCODE_GIRLS_GALLERY_ITEMS'].length === 0));
        }
    }

    if (data_value['DRESSCODE_GUYS_GALLERY_ITEMS']) {
        if (iframe.contents().find('[data-sm-src="DRESSCODE_GUYS_GALLERY_ITEMS_0"]').parents('.slick-slider').length > 0) {
            iframe.contents().find('[data-sm-text="DRESSCODE_GUYS_TITLE"]').toggleClass('sm-hidden', (data_value['DRESSCODE_GUYS_GALLERY_ITEMS'].length === 0));
            iframe.contents().find('[data-sm-src="DRESSCODE_GUYS_GALLERY_ITEMS_0"]').parents('.slick-slider').toggleClass('sm-hidden', (data_value['DRESSCODE_GUYS_GALLERY_ITEMS'].length === 0));
        }
    }

    if(typeof fillQuests !== "undefined" && iframe.contents().find('.ct-addquests_wrapper').length === 0)
    {
        $.post(ajax_url,{action:'loadQuestionsView',project:project},function(data) {
            if (data != '') {
                template_val.questions = $.parseJSON(data);
                console.log('fillQuests from loadTemplate')
                // console.log(data)
                fillQuests(true);
            }
        })
    }



    // if(typeof data_value['OWN_IMAGES'] == 'undefined')
    // {
    //     data_value['OWN_IMAGES'] = [];
    // }
    //
    // if(typeof data_value['OWN_TITLE'] == 'undefined')
    // {
    //     data_value['OWN_TITLE'] = 'Заголовок';
    // }
    //
    // if(typeof data_value['OWN_COLORS'] == 'undefined')
    // {
    //     data_value['OWN_COLORS'] = ['#ffffff','#000000'];
    // }
    //
    // if(typeof data_value['OWN_TEXT'] == 'undefined')
    // {
    //     data_value['OWN_TEXT'] = 'Текст';
    // }
    //
    // // if(typeof data_value['OWN_ALIGN'] == 'undefined')
    // // {
    // data_value['OWN_ALIGN'] = 1;
    // //}
    //
    // if(typeof data_value['OWN_AFTER'] == 'undefined')
    // {
    //     data_value['OWN_AFTER'] = 0;
    // }
    //
    // var newowned = false;
    //
    // if (data_value['OWN_AFTER'] > 0) {
    //     if (data_value['NEW_OWN_AFTER'] && data_value['NEW_OWN_AFTER'] > 0 && data_value['OWN_AFTER'] == '211') {
    //         // iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownBlockTemplate2);
    //         ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplate2Resize : ownBlockTemplate2;
    //         iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownTemplate);
    //         newowned = true;
    //     }
    //     // iframe.contents().find('.sm-edit[data-type="' + data_value['OWN_AFTER'] + '"]').after(ownBlockTemplate);
    //     ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplateResize : ownBlockTemplate;
    //     iframe.contents().find('.sm-edit[data-type="' + data_value['OWN_AFTER'] + '"]').after(ownTemplate);
    // }
    //
    // if (!newowned && data_value['NEW_OWN_AFTER'] && data_value['NEW_OWN_AFTER'] > 0) {
    //     // iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownBlockTemplate2);
    //     let ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplate2Resize : ownBlockTemplate2;
    //     iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownTemplate);
    // }
    // autoResizeText();
    //
    // var ownblocks = [166, 211];
    // $.each(ownblocks, function (k, v) {
    //     var add = '';
    //     var addb = '';
    //     var n = v;
    //     if (n == '211') {
    //         add = 'NEW_';
    //         addb = 'new_';
    //     }
    //     if (data_value[add + 'OWN_AFTER'] && data_value[add + 'OWN_AFTER'] != '0') {
    //         iframe.contents().find('[data-sm-text="' + add + 'OWN_TITLE"]').text(data_value[add + 'OWN_TITLE']).toggleClass('sm-hidden', (data_value[add + 'OWN_TITLE'] === '')).css('color', data_value[add + 'OWN_COLORS'][1]);
    //         iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]').html(parseLinks(data_value[add + 'OWN_TEXT'])).toggleClass('sm-hidden', (data_value[add + 'OWN_TEXT'] === '')).css('color', data_value[add + 'OWN_COLORS'][1]);
    //         iframe.contents().find('.sm-own[data-type="' + n + '"]').attr('data-position', data_value[add + 'OWN_ALIGN']).css('background-color', data_value[add + 'OWN_COLORS'][0]);
    //         paintBlock('.sm-own[data-type="' + n + '"]',data_value[add + 'OWN_COLORS'][0],1);
    //
    //         own_images = '';
    //
    //         if (data_value[add + 'OWN_IMAGES'].length > 0) {
    //             $.each(data_value[add + 'OWN_IMAGES'], function (key, val) {
    //                 own_images += '<img src="/sitemaker/' + val + '" data-sm-src="' + add + 'OWN_IMAGES_' + key + '">';
    //             })
    //         }
    //
    //         if (typeof (data_value[add + 'OWN_BUTTON_LINK']) != 'undefined' && data_value[add + 'OWN_BUTTON_LINK'] != '') {
    //             var cl = iframe.contents().find('[data-sm-href="LOCATION_MAP"]').attr('class');
    //             iframe.contents().find('[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').attr('href', data_value[add + 'OWN_BUTTON_LINK']).attr('class', cl).html(data_value[add + 'OWN_BUTTON_TITLE']).removeClass('open-modal');
    //         }
    //
    //         iframe.contents().find('[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').toggleClass('sm-hidden', typeof (data_value[add + 'OWN_BUTTON_LINK']) == 'undefined' || data_value[add + 'OWN_BUTTON_LINK'] == '')
    //
    //         iframe.contents().find('.sm-own[data-type="' + n + '"] .sm-own_wrapper-img').html(own_images).toggleClass('sm-hidden', (data_value[add + 'OWN_IMAGES'].length === 0));
    //
    //         // if (data_value[add + 'OWN_IMAGES'].length > 1) {
    //         //
    //         // }
    //     }
    //     if(data_value[add + 'OWN_TEXT_ALIGN']){
    //         // console.log('loadtempl align own');
    //         // console.log('[data-sm-text="' + add + 'OWN_TEXT"]');
    //         // console.log(iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]'));
    //         iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]').removeClass('sm-text_align-left').removeClass('sm-text_align-right').removeClass('sm-text_align-center').toggleClass('sm-text_align-' + data_value[add + 'OWN_TEXT_ALIGN'], true);
    //     }
    //     reInitOwnBlock(add);
    // });



    // var flt = 0;
    // var llt = 0;
    // var tlt = 0;
    // var lt = iframe.contents().find('[data-sm-text="LOCATION_TITLE"]');
    // if(lt.length > 0)
    //     {flt = lt.css('font-size'); llt = lt.css('line-height'); tlt = lt.css('font-family'); trlt = lt.css('text-transform');}
    // if(flt != '0') {
    //     iframe.contents().find('[data-sm-text="OWN_TITLE"]').css({'font-family': tlt, 'font-size': flt,'line-height': llt,'text-transform':trlt});
    // }

    var buts = {};
    buts['location_map'] = constr_terms['ln-route'];
    buts['wish_wishlist'] = constr_terms['ln-wishlist'];
    buts['contact_link'] = constr_terms['ln_contact'];

    $.each(buts, function (k, v) {
        if (data_value[k.toUpperCase() + '_BUTTON_TITLE'] && data_value[k.toUpperCase() + '_BUTTON_TITLE'] != '') {
            iframe.contents().find('[data-sm-href="' + k.toUpperCase() + '"]').text(data_value[k.toUpperCase() + '_BUTTON_TITLE'])
        } else {
            iframe.contents().find('[data-sm-href="' + k.toUpperCase() + '"]').text(v)
        }
    })



    if (iframe.contents().find('.sm-questionnaire.sm-painted_text').length > 0) {
        // var cl = iframe.contents().find('.sm-questionnaire.sm-painted_text').css('color');
        // iframe.contents().find('.sm-modal *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *)').css('cssText', 'color:' + cl + ' !important');
        // $('style')
        //     .prop('type', 'text/css')
        //     .html('::-webkit-input-placeholder { color:' + cl + ' }::-moz-placeholder { color:' + cl + ' }:-ms-input-placeholder { color:' + cl + ' }:-moz-placeholder { color:' + cl + ' }::placeholder { color:' + cl + '!important }')
        //     .appendTo('#page-iframe head');
    }
    if (iframe.contents().find('svg.sm-painted_icon').find('path') > 0){
        iframe.contents().find('svg.sm-painted_icon').find('path').css('fill',cl);
    }

    if (iframe.contents().find('.sm-template109').length > 0) {
        $.each(iframe.contents().find('.sm-decor-text-arrow'), function () {
            $(this).toggleClass('sm-hidden', $(this).prev('.sm-decor-text').text() == '')
        })
    }

    if (typeof loadTemplateConstr === 'function') {
        console.log('loadTemplateConstr from view')
        loadTemplateConstr();
    }


    initOwnBlock();
    // initVideo();
    // initTimingIcons();

    initTemplateConfig();


    if (iframe.contents().find('.sm-template109').length > 0) { //904 arrows fix
        $.each(iframe.contents().find('.sm-decor-text-arrow'), function () {
            $(this).toggleClass('sm-hidden', $(this).prev('.sm-decor-text').text() == '')
        })
    }


    paintTemplate()


    setTimeout(function () {
        autoResizeText();
    }, 500)
}


function phonePrepare(phone){
    if(phone != '')
    {
        $('body').append('<div class="ct-tmp">'+phone+'</div>')
        phone = $('.ct-tmp').text().replace(/\s/g, '').replace('-','').replace('+', '').replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1$2$3$4$5');;
        $('.ct-tmp').remove();
    }
    return phone;
}

function phonePrepareView(phone){
    if(phone != '')
    {
        let cleaned = ('' + phone).replace(/\D/g, '');
        let match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            let intlCode = (match[1] ? '7 ' : '')
            if (iframe.contents().find('.sm-template97').length > 0) {
                return [intlCode, ' ', match[2], ' ', match[3], '-', match[4], '-', match[5]].join('')
            } else {
                return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('')
            }
        }
    }
    return phone;
}

function parseLinks(text) {
    // return text;
    if ($.isArray(text)) {
        return text;
    }
    if (/<a\s+[^>]*href=["'].*?["'].*?>.*?<\/a>/i.test(text)) {
        return text.replace(/<a\s+([^>]*?)>/gi, function (match, p1) {
            p1 = p1.replace(/\s*target\s*=\s*['"][^'"]*['"]/i, '');
            return `<a ${p1} target="_blank" rel="noopener noreferrer">`;
        });
    }

    const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/g;
    return text.replace(urlRegex, (url) => {
        const href = url.startsWith('http') ? url : `http://${url}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function loadTemplateData(){
    $.post(ajax_url,{action:'loadTemplateData',project:project},function(data){
        if(data !== '' && data !== 'false') {
            var d = $.parseJSON(data);
            template_val = d;
            console.log(template_val)
            iframe.prop('src', loader);
            $(iframe).on('load',function(){
                console.log('loadData from view')
                loadData();
            })
            if(template_val.offsections && template_val.offsections != '') {
                offsections = $.parseJSON(template_val.offsections);
            }
            else
            {
                offsections = [];
            }

            if(template_val.grayscales && template_val.grayscales != '') {
                grayscales = $.parseJSON(template_val.grayscales);
            }
            else
            {
                grayscales = [];
            }
            if (template_val.sections && template_val.sections != '') {
                sections = template_val.sections;
                if (sections.length > 0) {
                    window.allsections = template_val.sections
                }
            } else {
                sections = [];
            }
            if (typeof loadTemplateDataConstr === 'function') {
                loadTemplateDataConstr()
            }
        }
        else
        {
            if (data == 'auth') {
                alert(constr_terms['ln-notify-error'])
                window.location.href = '/sitemaker/';
            } else {
                alert(constr_terms['ln-notify-error']);
            }
        }

    })

}


function initTemplateConfig(){

    //console.log('init config')

    //получаем конфиг
    var fold = '';
    var url = '';
    if (typeof folders != 'undefined') {
        fold = folders[template_val.id];
        console.log('init config 1')
        url = '/sitemaker/templates/' + fold + 'config.json'
    } else {
        fold = template_val.folder
        console.log('init config2')
        let folder = ((template_val.folder).includes('/templates/')) ? template_val.folder : '/templates/'+template_val.folder;
        console.log('/sitemaker' + folder + '/config.json');
        url = '/sitemaker' + folder + '/config.json'
    }

    $.getJSON(url).done(function (data) {
        template_config = data;

        //устанавливаем тип иконок
        console.log('set icon from templateConfig');
        setIcons()


        //срываем элементы, если надо
        //Проверяем конфиг шаблона. Перебираем элементы, которые можем скрывать
        // console.log(template_config);

        if(template_config['HIDE']!=null){
            //console.log('hidden is set');
            const config_hide = template_config['HIDE'];
            //будем использовать для определения установлен ли инпут
            var swicherChecked = 'checked=""';
            //перебираем все, что находится в конфиге hide
            Object.entries(config_hide).forEach(([key, value]) => {
                //console.log('key: '+key+'; value: '+value);
                //если в пользовательском конфиге указано, что надо скрыть - скрываем
                if(data_value["HIDE"]!=null && data_value["HIDE"].length!=0){
                    if(data_value['HIDE'].includes(key)){
                        //console.log('dv hide includes '+ key);
                        iframe.contents().find(value).addClass('sm-hidden');
                        swicherChecked = '';
                    }else{
                        //console.log('dv hide not includes '+ key);
                        swicherChecked = 'checked=""';
                        iframe.contents().find(value).removeClass('sm-hidden');
                    }
                }else{
                    swicherChecked = 'checked=""';
                    iframe.contents().find(value).removeClass('sm-hidden');
                }

                // к редакту дописываем инпут скрыть/показать
                // var $hideInput = ($('.ct-panel_settings-page [name="'+key+'"]').length > 0) ? $('.ct-panel_settings-page [name="'+key+'"]') : $('.ct-panel_settings-page [name="'+key.toLowerCase()+'"]');
                //
                // if(!$hideInput.closest('.ct-input_wrapper').hasClass('ct-can-hide')){
                //     $hideInput.closest('.ct-input_wrapper').toggleClass('ct-can-hide',true);
                //     var labelHTML = $hideInput.closest('.ct-input_wrapper').find('.ct-input_label').html();
                //     $hideInput.closest('.ct-input_wrapper').find('.ct-input_label').remove();
                //     $hideInput.closest('.ct-input_wrapper').prepend('<div class="ct-label-with-can-hide">' +
                //         '<label class="ct-input_label">'+labelHTML+'</label>' +
                //         '<div class="ct-can-hide-wrapper">\n' +
                //         '    <div class="ct-input_wrapper ct-switcher ct-can-hide-swicher ct-switcher_small"><input type="checkbox" id="switcher-'+key+'-hide" '+swicherChecked+' data-for-value="'+key+'"><label for="switcher-'+key+'-hide"></label></div>\n' +
                //         '</div></div>');
                // }

            })

        }
        if(typeof initTemplateConfigConstr != 'undefined') {
            initTemplateConfigConstr();
        }

    }).fail(function () {

    });
}

function initTimingIcons() {


    let folder = ((template_val.folder).includes('/templates/')) ? template_val.folder : '/templates/'+template_val.folder
    $.getJSON('/sitemaker' + folder + '/config.json', function (data) {
        if (data) {

            template_config = data;
            console.log('set icon from timingIcons');
            setIcons();

            // console.log(data_value['HIDE'])
            if (template_config['HIDE'] != null) {
                const config_hide = template_config['HIDE'];
                Object.entries(config_hide).forEach(([key, value]) => {
                    if (data_value["HIDE"] != null && data_value["HIDE"].length != 0) {
                        if (data_value['HIDE'].includes(key)) {
                            iframe.contents().find(value).addClass('sm-hidden');
                        } else {
                            iframe.contents().find(value).removeClass('sm-hidden');
                        }
                    } else {
                        iframe.contents().find(value).removeClass('sm-hidden');
                    }
                })

            }
        }
    }).fail(function () {

    })
}


function setIcons() {
    console.log('setIcons')
    $.each(iframe.contents().find('[data-sm-text^="TIMING_"'), function (k, v) {

        var par = $(this).parents(template_config['TIMING_ITEM_CONTAINER']);
        var i = $(this).attr('data-sm-text').split('_');

        if (typeof data_value['TIMING_' + i[1] + '_I'] != 'undefined' && data_value['TIMING_' + i[1] + '_I'] != '') {
            if (template_config['TIMING_ICON_TYPE'] == '2') {
                var im = par.find('img');
                if (typeof par.attr('data-default') == 'undefined' || par.attr('data-default') == '') {
                    par.attr('data-default', im.attr('src'));
                }
                im.attr('src', data_value['TIMING_' + i[1] + '_I'])
            } else if (template_config['TIMING_ICON_TYPE'] == '1') {
                $.get(data_value['TIMING_' + i[1] + '_I'], function (data) {
                    var im = par.find('svg');

                    if (typeof par.attr('data-default') == 'undefined' || par.attr('data-default') == '') {
                        par.attr('data-default', $(im[0]).prop('outerHTML'));
                    }
                    let section_id = iframe.contents().find('[data-sm-text^="TIMING_"').closest('section').attr('data-type');
                    var svgElement = $(data).find('svg');
                    if(data_value['PERSONAL_COLORS_FONT['+section_id+']']!=null && data_value['PERSONAL_COLORS_FONT['+section_id+']'] !='') {
                        svgElement.css('fill',data_value['PERSONAL_COLORS_FONT['+section_id+']']);
                        svgElement.attr('fill',data_value['PERSONAL_COLORS_FONT['+section_id+']']);
                        svgElement.find('path').css('fill',data_value['PERSONAL_COLORS_FONT['+section_id+']']);
                        svgElement.find('path').attr('fill',data_value['PERSONAL_COLORS_FONT['+section_id+']']);
                    }
                    $(im[0]).replaceWith(svgElement)

                }, 'xml');
            }
        }else{
            if (typeof par.attr('data-default') != 'undefined' && par.attr('data-default') != '') {
                if (template_config['TIMING_ICON_TYPE'] == '2') {
                    var im = par.find('img');
                    im.attr('src', par.attr('data-default'))
                } else if (template_config['TIMING_ICON_TYPE'] == '1') {
                    var im = par.find('svg');
                    $(im[0]).replaceWith(par.attr('data-default'))
                }

                par.removeAttr('data-default')
            }
            // p.find('.ct-icon_library-item').toggleClass('ct-icon_library-item_empty', true).css('background-image', 'url("")');

        }
    })

    if(typeof setIconsConstr != 'undefined')
        setIconsConstr()
}

function setFontSize() {
    var ic = iframe.contents()
    var fs = ic.find('[data-sm-text="LOCATION_TITLE"]').css('font-size');
    var fw = ic.find('[data-sm-text="LOCATION_TITLE"]').css('font-weight');
    var tfs = ic.find('[data-sm-text="LOCATION_TEXT"]').css('font-size');
    var tfw = ic.find('[data-sm-text="LOCATION_TEXT"]').css('font-weight');

    if (ic.find('.sm-template13').length > 0 || ic.find('.sm-template69').length > 0) {
        fs = ic.find('[data-sm-text="LOCATION_SUBTITLE"]').css('font-size');
        fw = ic.find('[data-sm-text="LOCATION_SUBTITLE"]').css('font-weight');
    }

    ic.find('[data-sm-text="OWN_TITLE"], [data-sm-text="NEW_OWN_TITLE"]').css({'font-size': fs, 'font-weight': fw});
    ic.find('[data-sm-text="OWN_TEXT"],[data-sm-text="NEW_OWN_TEXT"]').css({'font-size': tfs, 'font-weight': tfw});
}

//
// function addQuest() {
//     var colq = $('.ct-addquest_tools.active').length + 1;
//     console.log(colq)
//     var str = new RegExp('{%QID%}')
//     var re = new RegExp(str, 'g');
//     var bltpl1 = bltpl.replace(re, colq);
//     $('.ct-addquests_wrapper').append(bltpl1);
//
//
//     recalcOrderQuest();
// }
//
function fillQuests(addPersonalQuests=false) {
    if(!addPersonalQuests) {
        console.log(template_val.questions)
        if (template_val.questions && template_val.questions.length > 0) {
            var smb = iframe.contents().find('[data-sm-anketa-toggle]');
            var ins = '';
            if (smb.find('.sm-form_preferences').length > 0) {
                ins = ' > .sm-form_preferences';
            }
            $.each(template_val.questions, function (k, v) {
                var qu = $($('.ct-addquests-item.active')[k]);
                var forqu = qu.find('.ct-panel_header').attr('for');
                if (typeof setPrice == 'undefined') {
                    forqu = 'quest-' + v.id;
                    qu = $('.ct-panel_header[for="' + forqu + '"]').parents('.ct-addquests-item');
                }

                var co = qu.find('.ct-hidden_wrapper');

                qu.find('[name="' + forqu + '_answer[]"]').parents('.ct-input_wrapper').remove();
                qu.find('[name="' + forqu + '_question"]').val(v.question);
                if (typeof v.type != 'undefined') {
                    qu.find('#' + forqu + '-type li[data-type="' + v.type + '"]').click();
                    qu.find('#' + forqu + '-type').removeClass('active');
                }
                if (smb.length > 0) {
                    $.each(smb, function (ko, vo) {
                        var sorname = forqu + '-' + ko
                        if (typeof setPrice == 'undefined') {
                            sorname = forqu
                        }
                        var smbt = $(smb.find('div')[0]).clone();

                        if (smb.parent().find('[data-sm-anketa-toggle]' + ins + ' > label').length > 0) {
                            smbt = $(smb.find('label')[0]).clone();
                        } else if (smb.parent().find('[data-sm-anketa-toggle]' + ins + ' > p').length > 0) {
                            smbt = $(smb.find('p')[0]).clone();
                        }

                        var smbc = $(smb.find('[data-sm-anketa]')[0]).clone();
                        var smbb = $(smb.find('.ct-alcotpl')[0]).clone();

                        smbt.attr('data-forq', sorname)
                        smbc.attr('data-forq', sorname);

                        $(this).append(smbt);
                        $(this).append(smbc);

                        var titl = iframe.contents().find('[data-forq="' + sorname + '"]:not([data-sm-anketa])');
                        while (titl.children().length) {
                            titl = titl.children();
                        }

                        $(titl[0]).html(v.question);
                        var drinks = iframe.contents().find('[data-sm-anketa][data-forq="' + sorname + '"]');
                        var tn = drinks.find('.ct-alcotpl').prop("tagName");
                        drinks.find(tn + ':not(.ct-alcotpl)').remove();

                        $.each(v.answers, function (ka, va) {
                            if (typeof va.id != 'undefined' && va.id != null) {
                                var smbd = smbb.clone();
                                drinks.append(smbd)
                                var chb = $(drinks.find('.ct-alcotpl')[ka]);
                                chb.find('input').val(va.id).attr('name', forqu + '[]').attr('id', forqu + '-' + ko + '_' + va.id);
                                if (chb.find('[data-sm-alcoitem]').parents('label').length == 0) {
                                    chb.find('[data-sm-alcoitem]').attr('for', forqu + '-' + ko + '_' + va.id).html(va.answer);
                                } else {
                                    chb.find('[data-sm-alcoitem]').parents('label').attr('for', forqu + '-' + ko + '_' + va.id)
                                    chb.find('[data-sm-alcoitem]').html(va.answer);
                                }
                            } else {
                                var sornamek = sorname + '_' + (ka + 1)
                                var sornamev = va;
                                if (typeof setPrice == 'undefined') {
                                    sornamek = sorname + '_' + (va.id)
                                    sornamev = va.answer
                                }
                                var smbd = smbb.clone();
                                drinks.append(smbd)
                                var chb = $(drinks.find('.ct-alcotpl')[ka]);

                                chb.find('input').val(ka + 1).attr('name', sorname + '[]').attr('id', sornamek);
                                chb.find('[data-sm-alcoitem]').attr('for', sornamek).html(sornamev);
                            }
                        })

                        if (typeof v.type != 'undefined' && v.type == '1' && iframe.contents().find('#' + sorname).length == 0) {
                            var smbi = iframe.contents().find('[data-sm-anketa-name]')[0];
                            var smbd = $(smbi).clone();
                            drinks.append(smbd)
                            var inp = drinks.find('[data-sm-anketa-name]');
                            inp.attr('name', sorname).attr('id', sorname).attr('placeholder', constr_terms["ln-questionnaire-your"]).removeAttr('data-sm-anketa-name');
                        }

                        smbb.remove();
                        drinks.find('.ct-alcotpl [name="alco[]"]').parents('.ct-alcotpl').remove();
                        drinks.find('.ct-alcotpl').removeClass('ct-alcotpl');
                    })
                    iframe.contents().find('[data-sm-anketa-toggle]').removeClass('sm-hidden');
                    iframe.contents().find('[data-forq]').removeClass('sm-hidden');
                }
                if (v.answers.length > 0) {
                    $.each(v.answers, function (ka, va) {
                        var fornam = forqu + '_answer[]';
                        var fornav = va
                        if (typeof setPrice == 'undefined') {
                            fornam = forqu + '_' + va.id + '_answer';
                            fornav = va.answer;
                        }
                        console.log('answ1')
                        // co.find('.ct-input-dynamic_multiplier').before('<div class="ct-input_wrapper ct-input-dynamic"><div class="ct-input_wrapper-item"><label class="ct-input_label">' + constr_terms["ln-questionnaire-response-choice"] + ' <span>' + (ka + 1) + '</span></label><input type="text" class="ct-input ct-input_answer" placeholder="' + constr_terms["ln-questionnaire-response-choice"] + '" name="' + fornam + '" value="' + fornav + '"></div><div class="ct-input_remover"></div></div>');
                    })
                } else {
                    console.log('answ2')
                    // co.find('.ct-input-dynamic_multiplier').before('<div class="ct-input_wrapper ct-input-dynamic ct-hidden"><div class="ct-input_wrapper-item"><label class="ct-input_label">' + constr_terms["ln-questionnaire-response-choice"] + ' <span>1</span></label><input type="text" class="ct-input" placeholder="' + constr_terms["ln-questionnaire-response-choice"] + '" name="' + forqu + '_answer[]" value=""></div><div class="ct-input_remover"></div></div>');
                }
            })
        }
        questfilled = true;
        if (typeof fillQuestsConstr === 'function') {
            console.log('fillQuestsConstr from fill quests')
            fillQuestsConstr();
        }
    }else{
        if (template_val.questions && template_val.questions.length > 0) {
            var smb = iframe.contents().find('[data-sm-anketa-toggle]');
            var ins = '';
            if (smb.find('.sm-form_preferences').length > 0) {
                ins = ' > .sm-form_preferences';
            }
            $.each(template_val.questions, function (k, v) {
                var forqu = 'quest-' + v.id;
                if (smb.length > 0) {
                    $.each(smb, function (ko, vo) {
                        var smbt = $(smb.find('div')[0]).clone();

                        if (smb.parent().find('[data-sm-anketa-toggle]' + ins + ' > label').length > 0) {
                            smbt = $(smb.find('label')[0]).clone();
                        } else if (smb.parent().find('[data-sm-anketa-toggle]' + ins + ' > p').length > 0) {
                            smbt = $(smb.find('p')[0]).clone();
                        }

                        var smbc = $(smb.find('[data-sm-anketa]')[0]).clone();
                        var smbb = $(smb.find('.ct-alcotpl')[0]).clone();

                        smbt.removeAttr('data-sm-text');
                        // smbt.attr('data-forq',forqu )
                        // smbc.attr('data-forq',forqu );
                        smbt.attr('data-forq', forqu)
                        smbc.attr('data-forq', forqu);

                        $(this).append(smbt);
                        $(this).append(smbc);

                        var titl = $(this).find('[data-forq="' + forqu + '"]:not([data-sm-anketa])');

                        while (titl.children().length) {
                            titl = titl.children();
                        }

                        $(titl[0]).html(v.question);

                        var drinks = $(this).find('[data-sm-anketa][data-forq="' + forqu + '"]');
                        var tn = drinks.find('.ct-alcotpl').prop("tagName");
                        drinks.find(tn + ':not(.ct-alcotpl)').remove();

                        $.each(v.answers, function (ka, va) {
                            var smbd = smbb.clone();
                            drinks.append(smbd)
                            var chb = $(drinks.find('.ct-alcotpl')[ka]);
                            chb.find('input').val(va.id).attr('name', forqu + '[]').attr('id', forqu + '-' + ko + '_' + va.id);
                            if (chb.find('[data-sm-alcoitem]').parents('label').length == 0) {
                                chb.find('[data-sm-alcoitem]').attr('for', forqu + '-' + ko + '_' + va.id).html(va.answer);
                            } else {
                                chb.find('[data-sm-alcoitem]').parents('label').attr('for', forqu + '-' + ko + '_' + va.id)
                                chb.find('[data-sm-alcoitem]').html(va.answer);
                            }
                        })


                        if (typeof v.type != 'undefined' && v.type == '1') {
                            var smbi = iframe.contents().find('[data-sm-anketa-name]')[0];
                            var smbd = $(smbi).clone();
                            drinks.append(smbd)
                            var inp = drinks.find('[data-sm-anketa-name]');
                            inp.attr('name', forqu).attr('id', forqu + '_' + ko).attr('placeholder', 'Ваш ответ').removeAttr('data-sm-anketa-name');
                        }

                        smbb.remove();
                        drinks.find('.ct-alcotpl [name="alco[]"]').parents('.ct-alcotpl').remove();
                        drinks.find('.ct-alcotpl').removeClass('ct-alcotpl');
                        iframe.contents().find('[data-sm-anketa-toggle]').removeClass('sm-hidden');
                        iframe.contents().find('[data-forq]').removeClass('sm-hidden');
                    })
                }
            })
        }
        questfilled = true;

    }
}










//own_block_video


function initVideo() {

    var vis = iframe.contents().find('[data-sm-video]');

    if (vis.length > 0) {
        if (typeof data_value['HEAD_VIDEO'] != 'undefined' && data_value['HEAD_VIDEO'] != '') {
            var hv = (project!='') ? data_value['HEAD_VIDEO'].replace('/tmp/', '/' + project + '/') : data_value['HEAD_VIDEO'];


            var hv1 = hv.replace('.mov', '.mp4')
            hv1 = hv1.replace('.MOV', '.mp4')
            // hv1 = hv1.replace('/video', '/c_video');

            //check if converted exists
            $.ajax({
                url: hv1,
                type: 'HEAD',
                error: function () {
                    replaceVideo(hv)
                },
                success: function () {
                    replaceVideo(hv1)
                }
            });


        }
    } else {
        // console.log('novideo')
    }

    if(typeof initVideoConstr != 'undefined') {
        initVideoConstr();
    }

}

function replaceVideo(hv) {
    $.each(iframe.contents().find('[data-sm-video]'), function () {
        var vi = $(this).parents('video')
        if (vi.attr('src') != hv + '#t=0.1') {
            vi.attr('poster', '');
            vi.attr('src', hv + '#t=0.1');
            vi.attr('playsinline', '');
            vi.attr('autoplay', 'true');
            vi.css('filter', 'none');

            var v = vi[0]
            v.load();
            v.onloadeddata = () => {
                v.play().catch(e => console.log(e));
            };
            // v.play().catch(e => console.log(e));

        }
    });
}



function scrollToBlock(sect) {
    var sc = 0;
    var $elem = iframe.contents().find('.sm-edit[data-type="' + sect + '"]');
    sc = $elem.position().top;
    while($elem.prop('tagName').toLowerCase()!='body'){
        $elem = $elem.parent();
        sc += $elem.position().top;
    }
    console.log(sc);
    iframe.contents().find('html,body').animate({scrollTop: sc}, 500);
}
function initOwnVideo(v) {

    var ic = iframe.contents();
    ic.find('[data-sm-text="' + v + '_TITLE"]').parents('.sm-own').find('.sm-video_wrapper').remove();

    if (typeof data_value[v + '_VIDEO'] != 'undefined' && data_value[v + '_VIDEO'] != '') {


        var vid = '<video playsInline class="sm-own_video" id="sm-' + v.toLowerCase() + '_video"><source type="video/mp4" src="' + data_value[v + '_VIDEO'] + '#t=0.1"/></video>';
        ic.find('[data-sm-text="' + v + '_TITLE"]').after('<div class="sm-video_wrapper">' + vid + '</div>')
        ic.find('.sm-video_wrapper').off('click').on('click', function () {
            var vid = $(this).find('video');
            if (vid[0].paused) {
                vid[0].play();
            } else {
                vid[0].pause();
            }
        });

        ic.find('#sm-' + v.toLowerCase() + '_video').off('play pause loadeddata').on('play pause loadeddata', function () {
            var that = $(this)
            setTimeout(function () {
                that.parent().toggleClass('paused', that.paused);
            }, 300)

        })
    }
    if (typeof initOwnVideoConstr === 'function') {
        initOwnVideoConstr(v);
    }
}
function initOwnBlock() {
    // console.log('init own block')
    //убираем все свитчеры
    //$('[data-section="166"] .ct-switcher').remove();
    var ik;
    var sphotos;
    var inph;
    // if (typeof data_value['OWN_IMAGES'] == 'undefined') {
    //     data_value['OWN_IMAGES'] = [];
    //
    //     ik = 'OWN_IMAGES';
    //
    //     sphotos = '<li class="ct-image_preview ct-image_uploader ct-image_uploader-origin"><img src="/sitemaker/images/constr/ct-image-plus.svg">' + constr_terms['ln-image-add'] + '<div class="ct-image_upload-status"><div></div></div></li>';
    //
    //     inph = $('#secondPanel [name="' + ik.toLowerCase() + '[]"]:not(#ct-uploader_' + ik + ')').clone();
    //     inph.attr('id', 'ct-uploader_' + ik);
    //
    //     $('#secondPanel [name="' + ik.toLowerCase() + '[]"]').before('<div class="ct-image_uploader-info" data-for="' + ik + '" >' + sphotos + '</div>');
    //
    //     $('.ct-image_uploader-info[data-for="' + ik + '"] .ct-image_uploader').append(inph);
    //
    //     $('#secondPanel [name="' + ik.toLowerCase() + '[]"]:not(#ct-uploader_' + ik + ')').remove();
    // }
    //
    // if (typeof data_value['NEW_OWN_IMAGES'] == 'undefined') {
    //     data_value['NEW_OWN_IMAGES'] = [];
    //
    //     ik = 'NEW_OWN_IMAGES';
    //
    //     sphotos = '<li class="ct-image_preview ct-image_uploader ct-image_uploader-origin"><img src="/sitemaker/images/constr/ct-image-plus.svg">' + constr_terms['ln-image-add'] + '<div class="ct-image_upload-status"><div></div></div></li>';
    //
    //     inph = $('#secondPanel [name="' + ik.toLowerCase() + '[]"]:not(#ct-uploader_' + ik + ')').clone();
    //     inph.attr('id', 'ct-uploader_' + ik);
    //
    //     $('#secondPanel [name="' + ik.toLowerCase() + '[]"]').before('<div class="ct-image_uploader-info" data-for="' + ik + '" >' + sphotos + '</div>');
    //
    //     $('.ct-image_uploader-info[data-for="' + ik + '"] .ct-image_uploader').append(inph);
    //
    //     $('#secondPanel [name="' + ik.toLowerCase() + '[]"]:not(#ct-uploader_' + ik + ')').remove();
    // }

    if (typeof data_value['OWN_TITLE'] == 'undefined') {
        data_value['OWN_TITLE'] = constr_terms['ln-own-title'];
    }


    //если блок с текстурой, то цвет фона по умолчанию прозрачный
    var sectionTexture = (iframe.find('.sm-section').css('background-image')!=null && iframe.find('.sm-section').css('background-image')!='none' );

    if (typeof data_value['OWN_COLORS'] == 'undefined') {
        // data_value['OWN_COLORS'] = ['#ffffff', '#000000'];
        data_value['OWN_COLORS'] = ['none', 'none'];
    }

    if (typeof data_value['OWN_TEXT'] == 'undefined') {
        data_value['OWN_TEXT'] = constr_terms['ln-own-text'];
    }

    if (typeof data_value['NEW_OWN_TITLE'] == 'undefined') {
        data_value['NEW_OWN_TITLE'] = constr_terms['ln-own-title'];
    }

    if (typeof data_value['NEW_OWN_COLORS'] == 'undefined') {
        // data_value['NEW_OWN_COLORS'] = ['#ffffff', '#000000'];
        data_value['NEW_OWN_COLORS'] = ['none', 'none'];
    }

    if (typeof data_value['NEW_OWN_TEXT'] == 'undefined') {
        data_value['NEW_OWN_TEXT'] = constr_terms['ln-own-text'];
    }

    if (typeof data_value['OWN_BUTTON_COLORS'] == 'undefined') {
        data_value['OWN_BUTTON_COLORS'] = ['none', 'none','none', 'none','none', 'none'];
    }

    if (typeof data_value['NEW_OWN_BUTTON_COLORS'] == 'undefined') {
        data_value['NEW_OWN_BUTTON_COLORS'] = ['none', 'none','none', 'none','none', 'none'];
    }

    // if(typeof data_value['OWN_ALIGN'] == 'undefined')
    // {
    data_value['OWN_ALIGN'] = 1;
    data_value['NEW_OWN_ALIGN'] = 1;
    //}


    if (typeof data_value['OWN_AFTER'] == 'undefined') {
        data_value['OWN_AFTER'] = 0;
    }


    if (typeof data_value['NEW_OWN_AFTER'] == 'undefined') {
        data_value['NEW_OWN_AFTER'] = 0;
    }

    if (data_value['NEW_OWN_AFTER'] == '166' && data_value['OWN_AFTER'] == '0') {
        data_value['NEW_OWN_AFTER'] = 0;
    }
    if (data_value['NEW_OWN_AFTER'] == '0' && data_value['OWN_AFTER'] == '211') {
        data_value['OWN_AFTER'] = 0;
    }

    // $('#secondPanel [name="own_title"]').val(data_value['OWN_TITLE']);
    // $('#secondPanel [name="own_text"]').val(data_value['OWN_TEXT']);
    // $('#secondPanel [name="own_after"]').val(data_value['OWN_AFTER']);
    //
    //
    // $('#secondPanel [name="new_own_title"]').val(data_value['NEW_OWN_TITLE']);
    // $('#secondPanel [name="new_own_text"]').val(data_value['NEW_OWN_TEXT']);
    // $('#secondPanel [name="new_own_after"]').val(data_value['NEW_OWN_AFTER']);




    //Цвета персонального блока
    // var own_colors_block = $('#secondPanel [name="own_colors[]"]').parents('.ct-input_wrapper');
    // genColorPanel(own_colors_block,"OWN_COLORS",[1,2],1);

    // own_colors_block.find('.ct-panel_header').remove();
    // own_colors_block.find('.ct-color-add').remove();
    // own_colors_block.find('.ct-color-remove').remove();
    // own_colors_block.toggleClass('ct-shadow', true);
    // own_colors_block.find('.ct-color-wrapper').append('<span class="ct-color-remove-own"></span>');
    // own_colors_block.find('.ct-color-wrapper').append('<span class="ct-color-add-own"></span>');
    // own_colors_block.find('.ct-color-wrapper').find('input').addClass('ct-empty');
    // own_colors_block.find('.ct-color-remove-own').css('display','none');
    // $.each(data_value['OWN_COLORS'], function (k, v) {
    //     var kk = own_colors_block.find('.ct-color-wrapper')[k];
    //     if (k < 1) {
    //         $(kk).after($(kk).clone());
    //     }
    //     $(kk).find('input').val(v);
    //     $(kk).attr('data-type',k+1);
    //     $(kk).find('span.ct-color').css('background-color', v);
    //     // console.log('kk v = '+v);
    //     if(v!='' && v!='none' && v!=null){
    //         $(kk).find('.ct-color-remove-own').css('display','block');
    //         $(kk).find('input').removeClass('ct-empty');
    //     }
    // })

    // var nown_colors_block = $('#secondPanel [name="new_own_colors[]"]').parents('.ct-input_wrapper');
    // genColorPanel(nown_colors_block,"NEW_OWN_COLORS",[1,2],1);

    // nown_colors_block.find('.ct-panel_header').remove();
    // nown_colors_block.find('.ct-color-add').remove();
    // nown_colors_block.find('.ct-color-remove').remove();
    // nown_colors_block.toggleClass('ct-shadow', true);
    // nown_colors_block.find('.ct-color-wrapper').append('<span class="ct-color-remove-own"></span>');
    // nown_colors_block.find('.ct-color-wrapper').append('<span class="ct-color-add-own"></span>');
    // nown_colors_block.find('.ct-color-wrapper').find('input').addClass('ct-empty');
    // nown_colors_block.find('.ct-color-remove-own').css('display','none');
    // $.each(data_value['OWN_COLORS'], function (k, v) {
    //     var kk = nown_colors_block.find('.ct-color-wrapper')[k];
    //     if (k < 1) {
    //         $(kk).after($(kk).clone());
    //     }
    //     $(kk).find('input').val(v);
    //     $(kk).attr('data-type',k+1);
    //     $(kk).find('span.ct-color').css('background-color', v);
    //     // console.log('kk v = '+v);
    //     if(v!='' && v!='none' && v!=null){
    //         $(kk).find('.ct-color-remove-own').css('display','block');
    //         $(kk).find('input').removeClass('ct-empty');
    //     }
    // })


    // var own_button_colors_block = $('#secondPanel [name="own_button_colors[]"]').parents('.ct-input_wrapper');
    // // console.log(own_button_colors_block)
    // genColorPanel(own_button_colors_block ,"OWN_BUTTON_COLORS",[3,4,5,6,7,8], 5);
    //
    // var nown_button_colors_block = $('#secondPanel [name="new_own_button_colors[]"]').parents('.ct-input_wrapper');
    // // console.log(nown_button_colors_block)
    // genColorPanel(nown_button_colors_block ,"NEW_OWN_BUTTON_COLORS",[3,4,5,6,7,8],5);



    // if ($('#setupAddBlock').length === 0 && $('.ct-demonstration').length == 0) {
    //     var sb = $('#setupBlock').clone();
    //     sb.attr('id', 'setupAddBlock');
    //     $('#setupBlock').before(sb);
    //     sb.toggleClass('ct-hidden', Number(data_value['OWN_AFTER']) !== 0 && Number(data_value['NEW_OWN_AFTER']) !== 0);
    //
    //     $('#switcher-166').prop('checked', Number(data_value['OWN_AFTER']) !== 0);
    //     $('#switcher-166').parents('.ct-switcher').toggleClass('active', Number(data_value['OWN_AFTER']) !== 0);
    //
    //     $('#switcher-211').prop('checked', Number(data_value['NEW_OWN_AFTER']) !== 0);
    //     $('#switcher-211').parents('.ct-switcher').toggleClass('active', Number(data_value['NEW_OWN_AFTER']) !== 0);
    // }
    //
    // // выбор вариантов дизайна пока отключили
    // if ($('#secondPanel #own_align').length == 0) {
    //     //    $('#secondPanel [name="own_align"]').parents('.ct-input_wrapper').append(alignSelector)
    // }


    // $('#secondPanel #own_align li').removeClass('ct-input_select-current');
    // $('#secondPanel #own_align li[data-id="'+data_value['OWN_ALIGN']+'"]').toggleClass('ct-input_select-current',true);
    // $('#secondPanel #own_align span').text($('#secondPanel #own_align li[data-id="'+data_value['OWN_ALIGN']+'"]').text());

    // $('#secondPanel [name="own_after"]').parents('.ct-input_wrapper').hide();
    // $('#secondPanel [name="own_align"]').parents('.ct-input_wrapper').hide();
    // $('#secondPanel [name="new_own_after"]').parents('.ct-input_wrapper').hide();
    // $('#secondPanel [name="new_own_align"]').parents('.ct-input_wrapper').hide();


    // $('.ct-own_block-setting').toggle(pers_block_available == 1)

    if (typeof pers_block_available != 'undefined' && pers_block_available == 0) {
        // $('#setupAddBlock').remove();
        iframe.contents().find('.sm-own').remove();
    } else {
        rebuildStructure(data_value['OWN_AFTER']);
        // console.log('rebuilt structure 2')
    }

    // rebuildSelectors();

    // $('[data-sect="166"] .ct-own_block-setting_select li[data-id="' + data_value['OWN_AFTER'] + '"]').click();
    // $('[data-sect="211"] .ct-own_block-setting_select li[data-id="' + data_value['NEW_OWN_AFTER'] + '"]').click();
    // $('[data-for="OWN_IMAGES"], [data-for="NEW_OWN_IMAGES"]').prev('.ct-input_label').toggleClass('ct-title ct-subtitle ct-icon_item ct-icon_item--owngallery', true).removeClass('ct-input_label');
    if (typeof initOwnBlockConstr === 'function') {
        initOwnBlockConstr();
    }
    rebuildColors()
    reInitOwnBlock();
    reInitOwnBlock('NEW_');
}


function rebuildStructure(that, sect = 166)//ПЕРЕПИСЫВАЕМ!!!!!
{
    var id = Number(that);
    iframe.contents().find('.sm-own[data-type="211"]').remove();
    iframe.contents().find('.sm-own[data-type="166"]').remove();

    if (sect == '211') {
        data_value['NEW_OWN_AFTER'] = id;
    } else {
        data_value['OWN_AFTER'] = id;
    }

    if (data_value['OWN_AFTER'] == '166') {
        data_value['OWN_AFTER'] = '0';
    }
    if (data_value['NEW_OWN_AFTER'] == '211') {
        data_value['NEW_OWN_AFTER'] = '0';
    }
    rebuildSelectors();

    var newowned = false;
    if (data_value['OWN_AFTER'] > 0) {
        let ownTemplate = '';
        if (data_value['NEW_OWN_AFTER'] > 0 && data_value['OWN_AFTER'] == '211') {
            ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplate2Resize : ownBlockTemplate2;
            iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownTemplate);
            // $('#secondPanel [name="new_own_after"]').val(data_value['NEW_OWN_AFTER']);
            newowned = true;
        }
        ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplateResize : ownBlockTemplate;
        iframe.contents().find('.sm-edit[data-type="' + data_value['OWN_AFTER'] + '"]').after(ownTemplate);
        // $('#secondPanel [name="own_after"]').val(data_value['OWN_AFTER']);
    }

    if (!newowned && data_value['NEW_OWN_AFTER'] > 0) {
        let ownTemplate = (jQuery.inArray(parseInt(template_val.id, 10), temlatesOwnResize )!=-1) ? ownBlockTemplate2Resize : ownBlockTemplate2;
        iframe.contents().find('.sm-edit[data-type="' + data_value['NEW_OWN_AFTER'] + '"]').after(ownTemplate);
        // $('#secondPanel [name="new_own_after"]').val(data_value['NEW_OWN_AFTER']);
    }

    //checkPaintedBlock();

    // $('#switcher-166').prop('checked', data_value['OWN_AFTER'] != '0');
    // $('#switcher-166').parents('.ct-switcher').toggleClass('active', data_value['OWN_AFTER'] != '0');
    //
    // $('#switcher-211').prop('checked', data_value['NEW_OWN_AFTER'] != '0');
    // $('#switcher-211').parents('.ct-switcher').toggleClass('active', data_value['NEW_OWN_AFTER'] != '0');
    //
    // $('#setupAddBlock').toggleClass('ct-hidden', data_value['OWN_AFTER'] != '0' && data_value['NEW_OWN_AFTER'] != '0');
    // $('#mob-menu-add').toggleClass('ct-hidden', data_value['OWN_AFTER'] != '0' && data_value['NEW_OWN_AFTER'] != '0');

    // console.log(data_value['OWN_AFTER'])
    console.log('insertOwnData from view')
    insertOwnData();

    $.post(ajax_url, {
        action: 'setown',
        NEW_OWN_AFTER: data_value['NEW_OWN_AFTER'],
        OWN_AFTER: data_value['OWN_AFTER'],
        project: project
    }, function (data) {
        if (data == '0') {


            if (current_own != id) {
                current_own = id;
                // saveTemp('1');
            }
        }
    })

    //new pers start

    // console.log('sorting');
    // console.log(data_value['OWN_BLOCK_166_SORT']);



    // пока так перебираем
    $.each($('.ct-panel_personal_content_menu'), function(){
        let section_id = $(this).closest('.ct-panel_settings-page').attr('data-section');
        if(data_value['OWN_BLOCK_'+section_id+'_SORT']!=null) {
            let order = data_value['OWN_BLOCK_'+section_id+'_SORT'];
            var $container = $('.ct-panel_settings-page[data-section="'+section_id+'"] .ct-panel_personal_content_menu');
            order.forEach(id => {
                let $el = $container.find(`[data-wrap-group-id="${id}"]`);
                if ($el.length) {
                    $container.append($el);
                }
            });
            $container.sortable('refresh');
        }
    })

    //new pers end

    if (typeof rebuildStructureConstr === 'function') {
        rebuildStructureConstr();
    }
}



function insertOwnData(){
    var ownblocks = [166, 211];
    $.each(ownblocks, function (k, v) {
        var add = '';
        var addb = '';
        var n = v;
        if (n == '211') {
            add = 'NEW_';
            addb = 'new_';
        }

        if (typeof data_value[add + 'OWN_GALLERY_TYPE'] == 'undefined' || data_value[add + 'OWN_GALLERY_TYPE'] == '') {
            data_value[add + 'OWN_GALLERY_TYPE'] = 0;
        }

        iframe.contents().find('[data-type="' + v + '"] .sm-own_wrapper-img').attr('data-asp', data_value[add + 'OWN_GALLERY_TYPE']);

        iframe.contents().find('[data-sm-text="' + add + 'OWN_TITLE"]').text(data_value[add + 'OWN_TITLE']).toggleClass('sm-hidden', (data_value[add + 'OWN_TITLE'] === '')).css('color', data_value[add + 'OWN_COLORS'][1]);
        iframe.contents().find('[data-sm-text="' + add + 'OWN_TEXT"]').html(parseLinks(data_value[add + 'OWN_TEXT'])).toggleClass('sm-hidden', (data_value[add + 'OWN_TEXT'] === '')).css('color', data_value[add + 'OWN_COLORS'][1]);
        iframe.contents().find('.sm-own[data-type="' + n + '"]').attr('data-position', data_value[add + 'OWN_ALIGN']).css('background-color', data_value[add + 'OWN_COLORS'][0]);

        paintBlock('.sm-own[data-type="' + n + '"]',data_value[add + 'OWN_COLORS'][0],1);

        // iframe.contents().find('a[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').css({
        //     'color': data_value[add + 'OWN_COLORS'][1],
        //     'border-color': data_value[add + 'OWN_COLORS'][1]
        // });
        own_images = '';

        if (typeof (data_value[add + 'OWN_IMAGES']) != 'undefined' && data_value[add + 'OWN_IMAGES'].length > 0) {
            $.each(data_value[add + 'OWN_IMAGES'], function (key, val) {
                own_images += '<img src="/sitemaker/' + val + '" data-sm-src="' + add + 'OWN_IMAGES_' + key + '">';
            })
        }


        let buttonTitle = (typeof (data_value[add + 'OWN_BUTTON_TITLE']) != 'undefined' && data_value[add + 'OWN_BUTTON_TITLE'] != '') ? data_value[add + 'OWN_BUTTON_TITLE'] : 'Текст кнопки';

        console.log('but title = '+buttonTitle)
        console.log(add + 'OWN_BUTTON_TITLE')
        console.log(typeof (data_value[add + 'OWN_BUTTON_TITLE']))
        console.log(data_value[add + 'OWN_BUTTON_TITLE'])

        if (typeof (data_value[add + 'OWN_BUTTON_LINK']) != 'undefined' && data_value[add + 'OWN_BUTTON_LINK'] != '') {
            var cl = iframe.contents().find('[data-sm-href="LOCATION_MAP"]').attr('class');
            iframe.contents().find('[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').attr('href', data_value[add + 'OWN_BUTTON_LINK']).attr('class', cl).html(buttonTitle);
        }else{
            var cl = iframe.contents().find('[data-sm-href="LOCATION_MAP"]').attr('class');
            iframe.contents().find('[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').attr('href', 'https://wedwed.ru/sitemaker/').attr('class', cl).html(buttonTitle);
        }


        iframe.contents().find('[data-sm-href="' + add + 'OWN_BUTTON_LINK"]').toggleClass('sm-hidden', typeof (data_value[add + 'OWN_BUTTON_LINK']) == 'undefined' || data_value[add + 'OWN_BUTTON_LINK'] == '')
        // new pers
        console.log('paintBut from insertOwnData')
        if(iframe.contents().find("[data-type='"+n+"'] [data-sm-href='" + add + "OWN_BUTTON_LINK']").length>0) {
            paintButton("[data-type='" + n + "'] [data-sm-href='" + add + "OWN_BUTTON_LINK']", data_value[add + 'OWN_BUTTON_COLORS']);
        }

        iframe.contents().find('.sm-own[data-type="' + n + '"] .sm-own_wrapper-img').html(own_images).toggleClass('sm-hidden', (typeof (data_value[add + 'OWN_IMAGES']) != 'undefined' && data_value[add + 'OWN_IMAGES'].length === 0));




        let typeId = (add=='NEW_') ? 211 : 166 ;
        if (typeof data_value[add+'OWN_SHOW']!='undefined') {
            if(data_value[add+'OWN_SHOW'][5] != 0) {
                insertOwnMap(typeId, data_value[add + 'OWN_MAP_LINK'], data_value[add + 'OWN_MAP_WIDTH'], data_value[add + 'OWN_MAP_HEIGHT'])
            }else{
                iframe.contents().find('[data-type="'+typeId+'"] [data-sm-href="OWN_MAP_LINK"]').remove();
            }
        }else{
            iframe.contents().find('[data-type="'+typeId+'"] [data-sm-href="OWN_MAP_LINK"]').remove();
        }


        // c.ljq



        // iframe.contents().find('.sm-own[data-type="' + n + '"] img[data-sm-src]').toggleClass('ct-photo_editor', true).off().on('click', function () {
        //     var sc = $(this).attr('data-sm-src');
        //     var sc1 = sc.slice(0, -2);
        //     if ($.inArray(sc, image_fields) != -1) {
        //         var u = sc;
        //     } else if ($.inArray(sc1, gallery_items) != -1) {
        //         var sc2 = sc.substring(sc.length - 1);
        //         var p = $('.ct-image_uploader-info[data-for="' + sc1 + '"]');
        //         var pt = p.find('.ct-image_preview[data-photos-k="' + sc2 + '"]');
        //         var iu = p.find('.ct-image_uploader-origin').clone()
        //         u = sc1;
        //         iu.find('input').removeAttr('multiple')
        //         pt.replaceWith(iu.removeClass('ct-image_uploader-origin').removeClass('ct-hidden'));
        //     }
        //
        //     $('#ct-uploader_' + u).click();
        // })


        // console.log('setActiveOwnGalleryItem from insertOwnData')
        // setActiveOwnGalleryItem(data_value[add + 'OWN_GALLERY_TYPE'], false, add);

    })

    // iframe.contents().find('.sm-own [data-sm-text]').off().on('click', function () {
    //     if ($(this).parents('.sm-edit').length > 0) {
    //         var sect = $(this).parents('.sm-edit').attr('data-type');
    //         $('#secondPanel .ct-panel_settings-page').toggleClass('active', false)
    //         $('#secondPanel [data-section=' + sect + ']').toggleClass('active', true)
    //         $('#secondPanel').toggleClass('active', true)
    //     } else {
    //         $('#secondPanel .ct-panel_settings-page').toggleClass('active', false)
    //         $('#secondPanel input[name="' + $(this).data('sm-text').toLowerCase() + '"]').parents('.ct-panel_settings-page').toggleClass('active', true);
    //         $('#secondPanel').toggleClass('active', true);
    //     }
    //
    //
    //     closeMain();
    //     ifresize();
    // })

    // iframe.contents().find('.sm-own [data-sm-text], .sm-own [data-sm-src]').off().on('click', function () {
    //     if ($('.ct-demonstration').length == 0) {
    //         if ($(this).parents('.sm-edit').length > 0) {
    //             var sect = $(this).parents('.sm-edit').attr('data-type');
    //             $('#secondPanel .ct-panel_settings-page').toggleClass('active', false)
    //             $('#secondPanel [data-section=' + sect + ']').toggleClass('active', true)
    //             $('#secondPanel').toggleClass('active', true)
    //         } else {
    //             $('#secondPanel .ct-panel_settings-page').toggleClass('active', false)
    //             $('#secondPanel input[name="' + $(this).data('sm-text').toLowerCase() + '"]').parents('.ct-panel_settings-page').toggleClass('active', true);
    //             $('#secondPanel').toggleClass('active', true);
    //         }
    //
    //         closeMain();
    //         ifresize();
    //     }
    // })
    if (typeof insertOwnDataConstr === 'function') {
        insertOwnDataConstr();
    }

    setFontSize();
}

function rebuildColors() {
    // $('.button_title').remove();
    var buts = {};
    buts['location_map'] = constr_terms['ln-route'];
    buts['wish_wishlist'] = constr_terms['ln-wishlist'];
    buts['contact_link'] = constr_terms['ln_contact'];

    // console.log(constr_terms)

    $.each(buts, function (k, v) {

        var val = '';
        if (data_value[k.toUpperCase() + '_BUTTON_TITLE'] && data_value[k.toUpperCase() + '_BUTTON_TITLE'] != '') {
            val = data_value[k.toUpperCase() + '_BUTTON_TITLE'];
            iframe.contents().find('[data-sm-href="' + k.toUpperCase() + '"]').text(val)
        } else {
            iframe.contents().find('[data-sm-href="' + k.toUpperCase() + '"]').text(v)
        }
        // $('#secondPanel').find('[name="' + k + '"]').parents('.ct-input_wrapper').after('<div class="ct-input_wrapper button_title"><label class="ct-input_label">' + constr_terms['ln-own-button-text'] + '</label><input class="ct-input" name="' + k + '_button_title" type="text" value="' + val + '" placeholder="' + constr_terms['ln-own-button-text'] + '"></div>')
    })

    perscolored = false;
    // $.each($('#secondPanel .ct-panel_settings-page:not([data-section=166]):not([data-section=211]):not([data-ex])'), function (k, v) {
    //
    //     var sect = $(this).attr('data-section');
    //     $(this).find('.personal_colors').remove();
    //
    //     var val1 = '';
    //     var val2 = '';
    //     if (data_value['PERSONAL_COLORS[' + sect + ']'] && data_value['PERSONAL_COLORS[' + sect + ']'] != '') {
    //         val1 = data_value['PERSONAL_COLORS[' + sect + ']'];
    //     }
    //
    //     if (data_value['PERSONAL_COLORS_FONT[' + sect + ']'] && data_value['PERSONAL_COLORS_FONT[' + sect + ']'] != '') {
    //         val2 = data_value['PERSONAL_COLORS_FONT[' + sect + ']'];
    //     }
    //
    //     $(this).find('.submit_current').before('<div class="personal_colors"><div class="ct-panel_header"><div class="ct-flex ct-flex-space_between ct-flex-align-center"><div class="ct-title ct-input_label">' + constr_terms['ln-own-background'] + '</div></div></div><div class="ct-input_wrapper"><div class="ct-color-wrapper ' + ((val1 == '') ? 'personal_empty' : '') + '" data-type="1"><input type="color" class="ct-input personal_color" name="personal_colors[' + sect + ']" value="' + val1 + '"><span class="ct-color ct-empty"></span><span class="ct-color-add"></span><span class="ct-color-remove"></span></div></div><div class="ct-input_wrapper"><div class="ct-color-wrapper ' + ((val2 == '') ? 'personal_empty' : '') + '" data-type="2" ><input type="color" class="ct-input personal_color" name="personal_colors_font[' + sect + ']" value="' + val2 + '"><span class="ct-color ct-empty"></span><span class="ct-color-add"></span><span class="ct-color-remove"></span></div></div></div>')
    //
    //     if (val1 != '') {
    //         $('[name="personal_colors[' + sect + ']"]').trigger('input');
    //         perscolored = true;
    //     }
    //
    //     if (val2 != '') {
    //         $('[name="personal_colors_font[' + sect + ']"]').trigger('input');
    //         perscolored = true;
    //     }
    //
    // })
    if (typeof rebuildColorsConstr === 'function') {
        rebuildColorsConstr()
    }
}


function reInitOwnBlock(v = '') {

    var blockDataType = (v=='NEW_') ? 211 : 166;

    if (typeof data_value[v + 'OWN_GALLERY_TYPE'] == 'undefined' || data_value[v + 'OWN_GALLERY_TYPE'] == '') {
        data_value[v + 'OWN_GALLERY_TYPE'] = 0;
    }

    if (typeof data_value[v + 'OWN_VIDEO'] == 'undefined' || data_value[v + 'OWN_GALLERY_TYPE'] != 6) {
        data_value[v + 'OWN_VIDEO'] = '';
    }
    /* Это видео */
    // console.log(data_value[v + 'OWN_GALLERY_TYPE']);
    if (data_value[v + 'OWN_GALLERY_TYPE'] == 6) {
        initOwnVideo(v + 'OWN');
    }

    iframe.contents().find('[data-type="' + ((v == '') ? '166' : '211') + '"] .sm-own_wrapper-img').attr('data-asp', data_value[v + 'OWN_GALLERY_TYPE']);

    if (typeof data_value[v + 'OWN_COLORS'][2] == 'undefined') {
        data_value[v + 'OWN_COLORS'][2] = '#ffffff'; //button text
        data_value[v + 'OWN_COLORS'][3] = '#000000'; //button back
        data_value[v + 'OWN_COLORS'][4] = '#000000'; //button bord
    }

    // console.log('========')

    // group hide
    if (typeof data_value[v + 'OWN_SHOW'] == 'undefined') {
        data_value[v + 'OWN_SHOW'] = [];
        let iShow = 0;
        $.each(template_val.pers_groups_info, function(){
            // костыль для старой версии
            if( ($(this)[2]=='Фото или видео' && (data_value[v +'OWN_IMAGES'].length!=0 || data_value[v +'OWN_VIDEO']!='')) || ($(this)[2]=='Кнопка' && typeof data_value[v +'OWN_BUTTON_LINK'] != 'undefined' && data_value[v +'OWN_BUTTON_LINK']!='')){
                data_value[v + 'OWN_SHOW'][iShow] = 1;
            }else{
                data_value[v + 'OWN_SHOW'][iShow] = $(this)[6];
            }
            // конец костыля
            // data_value[v + 'OWN_SHOW'][iShow] = $(this)[6];
            iShow++;
        });
    }
    // console.log('=========')

    $.each(data_value[v + 'OWN_SHOW'], function(i2,v2){
        // console.log(i2+1)
        if(template_val.pers_groups_info[i2+1][4]!="") {
            $.each(template_val.pers_groups_info[i2+1][4], function(i3,v3){
                if(!(v3 == '.sm-own_wrapper-img' && iframe.contents().find('[data-type=' + blockDataType + '] .sm-video_wrapper').length>0)) {     //чтобы не показывать одновременно и фото и видео
                    iframe.contents().find('[data-type=' + blockDataType + '] ' + v3).toggleClass('sm-hidden', (v2 == 0));
                }
                // // применяем карты там, где они есть
                // if (v3=='.sm-own_wrapper-map' && (v2 != 0)) {
                //     let typeId = (v=='NEW_') ? 211 : 166;
                //     insertOwnMap(typeId, data_value[v + 'OWN_MAP_LINK'], data_value[v + 'OWN_MAP_WIDTH'], data_value[v + 'OWN_MAP_HEIGHT'])
                // }

            })
        }
    })


    // iframe[0].contentWindow.ownSlick();

    if (typeof reInitOwnBlockConstr === 'function') {
        reInitOwnBlockConstr(v)
    }else{
        setActiveOwnGalleryItem(data_value[v + 'OWN_GALLERY_TYPE'], false, v);
    }



}



function insertOwnMap(sect, link, width, height){
    iframe.contents().find('[data-type=' + sect + '] .sm-own_wrapper').append(ownBlockTemplateMap);
    iframe.contents().find('[data-sm-href="OWN_MAP_LINK"]').removeClass('sm-hidden');

    var v = (sect==211) ? 'NEW_' : '';
    let mapLink = link;
    if (mapLink != null && mapLink != '') {
        mapLink = mapLink.replace("https://yandex.ru/maps/", "https://yandex.ru/map-widget/v1/");
    } else {
        mapLink = "https://yandex.ru/map-widget/v1/?um=constructor%3A43746300638f8342998f44e6e6d5195d840d8e736bc5cc43abb8cdfb59c7530c&source=constructorLink";
    }
    iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('src','about:blank')
    if(typeof iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').get(0) != 'undefined') {
        iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').get(0).contentWindow.location.replace(mapLink);
    }
    if (width != null && width != '') {
        iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('width', width);
    } else {
        if (width == null || width=== '') {
            iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('width', 350);
        } else {
            iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('width', 350);
            data_value[v + 'OWN_MAP_WIDTH'] = 350;
            // $('#secondPanel .ct-panel_settings-page [name="'+(add + 'OWN_MAP_WIDTH').toLowerCase()+'"]').val(350)
        }
    }
    if (height != null && height != '') {
        iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('height', height);
    } else {
        if (height == null || height === '') {
            iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('height', 350);
        } else {
            iframe.contents().find('[data-type="' + sect + '"] [data-sm-href="OWN_MAP_LINK"]').attr('height', 350);
            data_value[v + 'OWN_MAP_HEIGHT'] = 350;
            // $('#secondPanel .ct-panel_settings-page [name="'+(add + 'OWN_MAP_HEIGHT').toLowerCase()+'"]').val(350)
        }
    }

}


function rebuildSelectors() {


    var ownsel = data_value['OWN_AFTER'];
    var ownsel2 = data_value['NEW_OWN_AFTER'];

    // $('.ct-own_block-setting_select ul li[data-id="211"]').remove();
    // $('.ct-own_block-setting_select ul li[data-id="166"]').remove();
    //
    // $('#secondPanel [data-section="166"] .ct-own_block-setting_select').parents('.ct-input_wrapper').remove();
    // $('#secondPanel [data-section="211"] .ct-own_block-setting_select').parents('.ct-input_wrapper').remove();
    //
    // if (ownsel != '0' && ownsel != '211') {
    //     $('.ct-own_block-setting[data-sect="211"] .ct-own_block-setting_select ul').append('<li data-id="166">' + constr_terms['ln-own-label'] + ' №1</li>');
    // }
    //
    // if (ownsel2 != '0' && ownsel2 != '166') {
    //     $('.ct-own_block-setting[data-sect="166"] .ct-own_block-setting_select ul').append('<li data-id="211">' + constr_terms['ln-own-label'] + ' №2</li>');
    // }
    //
    // $('#secondPanel [data-section="166"] .ct-menu_wrapper').prepend($('.ct-own_block-setting[data-sect="166"] .ct-input_wrapper').clone());
    //
    // var s = $('#secondPanel [data-section="166"] .ct-menu_wrapper .ct-own_block-setting_select');
    // var so = $('#editSections [data-sect="166"] .ct-own_block-setting_select');
    // s.removeClass('ct-input_select-top');
    // s.parents('.ct-input_wrapper').find('.ct-subtitle:not(.ct-icon_item)').remove();
    // s.parents('.ct-input_wrapper').toggleClass('ct-ignore', true);
    //
    // so.find('li').removeClass('ct-input_select-current');
    // so.find('li[data-id="' + ownsel + '"]').toggleClass('ct-input_select-current', true)
    // so.find('span').html(so.find('li.ct-input_select-current').html())
    //
    // s.find('li').removeClass('ct-input_select-current');
    // s.find('li[data-id="' + ownsel + '"]').toggleClass('ct-input_select-current', true)
    // s.find('span').html(s.find('li.ct-input_select-current').html())
    //
    // $('#secondPanel [data-section="211"] .ct-menu_wrapper').prepend($('.ct-own_block-setting[data-sect="211"] .ct-input_wrapper').clone());
    //
    // s = $('#secondPanel [data-section="211"] .ct-menu_wrapper .ct-own_block-setting_select');
    // so = $('#editSections [data-sect="211"] .ct-own_block-setting_select');
    //
    // s.removeClass('ct-input_select-top');
    // s.parents('.ct-input_wrapper').find('.ct-subtitle:not(.ct-icon_item)').remove();
    // s.parents('.ct-input_wrapper').toggleClass('ct-ignore', true);
    //
    // so.find('li').removeClass('ct-input_select-current');
    // so.find('li[data-id="' + ownsel2 + '"]').toggleClass('ct-input_select-current', true)
    // so.find('span').html(so.find('li.ct-input_select-current').html())
    //
    // s.find('li').removeClass('ct-input_select-current');
    // s.find('li[data-id="' + ownsel2 + '"]').toggleClass('ct-input_select-current', true)
    // s.find('span').html(s.find('li.ct-input_select-current').html())
    // setTimeout(function () {
    //     $('.ct-own_block-setting_select').removeClass('active');
    // }, 500)
    //
    // $('.ct-panel_settings-page[data-section="166"] .ct-panel_personal_content_menu').sortable({
    //     dataIdAttr: 'data-wrap-group-id',
    //     handle: '.ct-sortable-handler',
    //     cancel: '.ck-editor, .ct-input',
    //     update: function(event, ui) {
    //         // console.log('Порядок блоков изменен!');
    //         $(this).closest('.ct-menu_wrapper').find('.submit_current').addClass('active');
    //     }
    // });
    //
    //
    // $('.ct-panel_settings-page[data-section="211"] .ct-panel_personal_content_menu').sortable({
    //     dataIdAttr: 'data-wrap-group-id',
    //     handle: '.ct-sortable-handler',
    //     cancel: '.ck-editor, .ct-input',
    //     update: function(event, ui) {
    //         // console.log('Порядок блоков изменен!');
    //         $(this).closest('.ct-menu_wrapper').find('.submit_current').addClass('active');
    //     }
    // });
    //
    //
    // // пока так перебираем
    // $.each($('.ct-panel_personal_content_menu'), function(){
    //     let section_id = $(this).closest('.ct-panel_settings-page').attr('data-section');
    //     if(data_value['OWN_BLOCK_'+section_id+'_SORT']!=null) {
    //         let order = data_value['OWN_BLOCK_'+section_id+'_SORT'];
    //         if(order.length<$('.ct-panel_settings-page[data-section="'+section_id+'"] .ct-panel_personal_content_menu:first-child .ct-group_wrapper:not(.ct-unsortable-group)').length){
    //             $.each($('.ct-panel_settings-page[data-section="'+section_id+'"] .ct-panel_personal_content_menu:first-child .ct-group_wrapper:not(.ct-unsortable-group)'), function(){
    //                 let thisGid = $(this).attr('data-wrap-group-id');
    //                 if($.inArray(thisGid, order)==-1){
    //                     order.push(thisGid);
    //                 }
    //             })
    //         }
    //         // console.log('order');
    //         // console.log(order)
    //         var $container = $('.ct-panel_settings-page[data-section="'+section_id+'"] .ct-panel_personal_content_menu:first-child');
    //         order.forEach(id => {
    //             let $el = $container.find(`[data-wrap-group-id="${id}"]`);
    //             if ($el.length) {
    //                 $container.append($el);
    //             }
    //         });
    //         $container.sortable('refresh');
    //     }
    // })


    // $('.ct-panel_settings-page[data-section="166"] .ct-input_wrapper:not(.ct-ignore):not(.ct-hidden) .ct-title').each(function () {
    //     $(this).off('click');
    //     $(this).on('click', (e) => {
    //         console.log('try to open');
    //         const self = e.currentTarget;
    //         const control = self;
    //         const content = self.parent();
    //
    //         content.classList.toggle('open');
    //
    //         // если открыт аккордеон
    //         if (content.classList.contains('open')) {
    //             control.setAttribute('aria-expanded', true);
    //             content.setAttribute('aria-hidden', false);
    //             content.style.maxHeight = content.scrollHeight + 'px';
    //         } else {
    //             control.setAttribute('aria-expanded', false);
    //             content.setAttribute('aria-hidden', true);
    //             content.style.maxHeight = null;
    //         }
    //     });
    // })


    // $('.ct-panel_settings-page[data-section="166"] .ct-group_wrapper.ct-input_wrapper:not(.ct-ignore):not(.ct-hidden):not(.ct-unwrappable-group), .ct-panel_settings-page[data-section="211"] .ct-group_wrapper.ct-input_wrapper:not(.ct-ignore):not(.ct-hidden):not(.ct-unwrappable-group)')
    //     .each(function () {
    //
    //         const $wrapper = $(this);
    //         // const $title = $wrapper.find('.ct-title').first();
    //         const $title = $wrapper.find('.ct-group_head').first();
    //
    //         if (!$wrapper.find('.ct-toggle-icon').length && !$wrapper.find('.ct-colors-wrapper').length) {
    //             $wrapper.append('<span class="ct-toggle-icon"></span>');
    //         }
    //
    //         $title.off('click').on('click', function () {
    //
    //             const content = $wrapper[0];
    //
    //             if ($wrapper.hasClass('open')) {
    //                 content.style.maxHeight = content.scrollHeight + 'px';
    //
    //                 requestAnimationFrame(() => {
    //                     $wrapper.removeClass('open');
    //                     content.style.maxHeight = '80px';
    //                 });
    //
    //             } else {
    //                 content.style.maxHeight = '80px';
    //                 content.offsetHeight;
    //                 $wrapper.addClass('open');
    //                 content.style.maxHeight = content.scrollHeight + 'px';
    //             }
    //         });
    //     });
    if (typeof rebuildSelectorsConstr === 'function') {
        rebuildSelectorsConstr()
    }

}



function paintButton(selector, colorArr, once=false){
    // console.log('paint button '+selector)

    var hasNoBorder = (iframe.contents().find(selector).css('border')=='none' || iframe.contents().find(selector).css('border')=='' || iframe.contents().find(selector).css('border')==null || iframe.contents().find(selector).css('border-width')=='0px');
    if(((colorArr[2]=='none' || colorArr[2]=='' || colorArr[2]==null) || (colorArr[5]=='none' || colorArr[5]=='' || colorArr[5]==null)) && hasNoBorder){
        console.log('no border');
        iframe.contents().find(selector).css('border-width','1.5px');
        iframe.contents().find(selector).css('border-style','solid');
        iframe.contents().find(selector).css('border-color','transparent');
    }
    var but = iframe.contents().find(selector);


    // console.log(hasNoBorder);
    // if(colorArr[0]!='none' && colorArr[0]!='' && colorArr[0]!=null)
    // {iframe.contents().find(selector).css('background', colorArr[0]);}
    //
    // if(colorArr[1]!='none' && colorArr[1]!='' && colorArr[1]!=null)
    // {iframe.contents().find(selector).css('color',colorArr[1]);}
    //
    // if(colorArr[2]!='none' && colorArr[2]!='' && colorArr[2]!=null)
    // {iframe.contents().find(selector).css('border-color',colorArr[2]);}

    // if(hasNoBorder){
    //     var defaultButColors = ['border-width:1.5px;','border-style:solid;','border-color:transparent','border-width:1.5px;','border-style:solid;','border-color:transparent']
    // }else{
    //     var defaultButColors = ['','','','','','']
    // }

    checkColorStyles();
    let butStyle = '';
    butStyle += (colorArr[0]!='none' && colorArr[0]!='' && colorArr[0]!=null) ? 'background:' + colorArr[0]+'!important;' : '';
    butStyle += (colorArr[1]!='none' && colorArr[1]!='' && colorArr[1]!=null) ? 'color:' + colorArr[1]+'!important;' : '';
    butStyle += (hasNoBorder) ? 'border-width:1.5px!important;border-style:solid!important;' : 'border-width:'+but.css('border-width')+'!important;border-style:'+but.css('border-style')+'!important;';
    if(hasNoBorder) {
        butStyle += (colorArr[2] != 'none' && colorArr[2] != '' && colorArr[2] != null) ? 'border-color:' + colorArr[2] + '!important;' : 'border-color:transparent!important;';
    }else{
        butStyle += (colorArr[2] != 'none' && colorArr[2] != '' && colorArr[2] != null) ? 'border-color:' + colorArr[2] + '!important;' : '';
    }
    let butStyleHover = '';

    butStyleHover += (colorArr[3]!='none' && colorArr[3]!='' && colorArr[3]!=null) ? 'background:' + colorArr[3]+'!important;' : '';
    butStyleHover += (colorArr[4]!='none' && colorArr[4]!='' && colorArr[4]!=null) ? 'color:' + colorArr[4]+'!important;' : '';
    butStyleHover += (hasNoBorder) ? 'border-width:1.5px!important;border-style:solid!important;' : 'border-width:'+but.css('border-width')+'!important;border-style:'+but.css('border-style')+'!important;';
    if(hasNoBorder) {
        butStyleHover += (colorArr[5] != 'none' && colorArr[5] != '' && colorArr[5] != null) ? 'border-color:' + colorArr[5] + '!important;' : 'border-color:transparent!important;';
    }else{
        butStyleHover += (colorArr[5] != 'none' && colorArr[5] != '' && colorArr[5] != null) ? 'border-color:' + colorArr[5] + '!important;' : '';
    }

    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), selector, butStyle);
    updateStyleRule(iframe.contents().find('head').find('.colors-styles'), selector+':hover', butStyleHover);


    // console.log('check anketa button')
    //если анкета, то красим кнопки в модалках
    $.each(anketa_button_items,function(i,item){
        var oc = selector.split(item);
        var buttonSelector = selector.replace(/\[data-type='\d+'\]\s*/g, '');

        let openModalBut = '.open-modal';
        $.each(modal_button_items,function (i,item){
            if(iframe.contents().find(item).length > 0){
                openModalBut = item;
            }
        })

        var openModal = selector.replace(item, openModalBut);
        if (oc.length > 1 && !once) {
            // console.log('is anketa button: ' + buttonSelector)
            if (iframe.contents().find('.sm-modal').length > 0) {
                paintButton('.sm-modal ' + buttonSelector, colorArr, true);
            }
            if (iframe.contents().find('.sm-quest-modal').length > 0) {
                paintButton('.sm-quest-modal ' + buttonSelector, colorArr, true);
            }
            if (iframe.contents().find('div#sm-mod').length > 0) {
                paintButton('div#sm-mod ' + buttonSelector, colorArr, true);
            }
            if (iframe.contents().find('.sm-feedback').length > 0) {
                paintButton('.sm-feedback ' + buttonSelector, colorArr, true);
            }

            console.log(openModal)
            paintButton(openModal, colorArr, true);
        }
    })


}

function paintTimingIcons(){

}

function checkColorStyles(){
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
}
function removeColorStyles(){
    //создание блока для дополнительных стилей, если он еще не был создан
    if(iframe.contents().find('head').find('.colors-styles').length>0){
        iframe.contents().find('head').find(".colors-styles").html('');
    }
    if(iframe.contents().find('head').find('.colors-styles-desktop').length>0){
        iframe.contents().find('head').find(".colors-styles-desktop").html('');
    }
    if(iframe.contents().find('head').find('.colors-styles-mobile').length>0){
        iframe.contents().find('head').find(".colors-styles-mobile").html('');
    }
}
function orderOwnGroups(block_id, sortArr){
    if(sortArr!=null){
        $.each(sortArr, function(i,v){
            $.each(template_val.pers_groups_info[v][4], function(i1,v1) {
                iframe.contents().find('[data-type='+block_id+'] ' + v1).attr('data-order', i);
            })
        })
    }
}
function setActiveOwnGalleryItem(t, save = false, v = '') {
    var smv = v.toLowerCase();

    iframe.contents().find('[data-type="' + ((v == '') ? '166' : '211') + '"] .sm-own_wrapper-img').attr('data-asp', data_value[v + 'OWN_GALLERY_TYPE']);


    if (typeof data_value[v + 'OWN_IMAGES']!='undefined' && data_value[v + 'OWN_IMAGES'].length > 1 && t != 4 && t != 7 && typeof iframe[0].contentWindow.ownSlick != 'undefined') {
        iframe[0].contentWindow.ownSlick();
    }

    // $('[name="' + smv + 'own_gallery_type"]').val(t);

    // var parin = $('[name="' + smv + 'own_gallery_type"]').parents('.ct-panel_settings-page');
    // parin.find('.ct-panel_header').next('p').html(constr_terms['ln-own-description']);
    // parin.find('.ct-image_uploader-info_alt').toggleClass('ct-image_uploader-info_alt_active', false);
    // parin.find('.ct-image_uploader-info_alt .ct-image_uploader-preview_examples-item').css({
    //     'background-image': 'url(/sitemaker/images/constr/ct-image-plus.svg)',
    //     'background-size': 'initial'
    // });
    // parin.find('.ct-image_uploader-info_alt-video .ct-image_uploader-preview_examples-item').css({
    //     'background-image': 'url(/sitemaker/images/constr/ct-video-plus.svg)',
    //     'background-size': 'initial'
    // });

    if (t == 6) {
        initOwnVideo(v + 'OWN');
    } else {
        data_value[v + 'OWN_VIDEO'] = '';
        // deleteOwnVideo(v == 'NEW_' ? 3 : 2);
        // if (t > 0) {
        //     if (t == 4 || t == 7) {
        //
        //         $('[data-for="' + v + 'OWN_IMAGES_' + t + '"]').toggleClass('ct-image_uploader-info_alt_active', true);
        //
        //         var curim = $($('[data-for="' + v + 'OWN_IMAGES"] .ct-image_preview:not(.ct-image_uploader-origin)')[0]).attr('data-url');
        //
        //         if (typeof curim != 'undefined') {
        //             $($('[data-for="' + v + 'OWN_IMAGES_' + t + '"] .ct-image_uploader-preview_examples-item')[0]).css({
        //                 'background-image': 'url(/sitemaker' + curim + ')',
        //                 'background-size': 'cover'
        //             });
        //         }
        //
        //         curim = $($('[data-for="' + v + 'OWN_IMAGES"] .ct-image_preview:not(.ct-image_uploader-origin)')[1]).attr('data-url')
        //
        //         if (typeof curim != 'undefined') {
        //             $($('[data-for="' + v + 'OWN_IMAGES_' + t + '"] .ct-image_uploader-preview_examples-item')[1]).css({
        //                 'background-image': 'url(/sitemaker' + curim + ')',
        //                 'background-size': 'cover'
        //             });
        //         }
        //
        //         if (t == 7) { //3 узких
        //             curim = $($('[data-for="' + v + 'OWN_IMAGES"] .ct-image_preview:not(.ct-image_uploader-origin)')[2]).attr('data-url')
        //
        //             if (typeof curim != 'undefined') {
        //                 $($('[data-for="' + v + 'OWN_IMAGES_' + t + '"] .ct-image_uploader-preview_examples-item')[2]).css({
        //                     'background-image': 'url(/sitemaker' + curim + ')',
        //                     'background-size': 'cover'
        //                 });
        //             }
        //         }
        //
        //     } else if (t == 5) {
        //
        //         $('.ct-image_uploader-info_alt[data-for="' + v + 'OWN_IMAGES_5"]').toggleClass('ct-image_uploader-info_alt_active', true);
        //         $('.ct-image_uploader-info_alt[data-for="' + v + 'OWN_IMAGES_5"] .ct-image_uploader-preview_examples').slick('unslick');
        //         $('.ct-image_uploader-info_alt[data-for="' + v + 'OWN_IMAGES_5"] .ct-image_uploader-preview_examples-item').remove();
        //
        //         $.each($('[data-for="' + v + 'OWN_IMAGES"] .ct-image_preview:not(.ct-image_uploader-origin)'), function (ka, va) {
        //             if (typeof $(this).attr('data-url') != 'undefined') {
        //                 $('[data-for="' + v + 'OWN_IMAGES_5"] .ct-image_uploader-preview_examples').append('<div class="ct-image_uploader-preview_examples-item" style="background-image:url(/sitemaker' + $(this).attr('data-url') + ');background-size:cover"></div>');
        //             }
        //         })
        //
        //         $('.ct-image_uploader-info_alt[data-for="' + v + 'OWN_IMAGES_5"] .ct-image_uploader-preview_examples').append('<div class="ct-image_uploader-preview_examples-item" style="background:url(/sitemaker/images/constr/ct-image-plus.svg) 50% 50% no-repeat #f9f9f9;"></div>');
        //
        //         slickOwn(v);
        //
        //     } else {
        //         $('[data-for="' + v + 'OWN_IMAGES_' + t + '"]').toggleClass('ct-image_uploader-info_alt_active', true);
        //         var curim = $('[data-for="' + v + 'OWN_IMAGES"] .ct-image_preview:not(.ct-image_uploader-origin)').attr('data-url')
        //         $('[data-for="' + v + 'OWN_IMAGES_' + t + '"] .ct-image_uploader-preview_examples-item').css({
        //             'background-image': 'url(/sitemaker' + curim + ')',
        //             'background-size': 'cover'
        //         });
        //     }
        // }
    }

    orderOwnGroups(166, data_value['OWN_BLOCK_166_SORT']);
    orderOwnGroups(211, data_value['OWN_BLOCK_211_SORT']);

    // поверяем установленные own_show
    if (typeof data_value['OWN_SHOW'] != 'undefined') {
        $.each(template_val.pers_groups_info, function (i1, v1) {

            if (v1[4] != '' && i1 != 3) {
                $.each(v1[4], function (i3, v3) {
                    if (!(v3 == '.sm-own_wrapper-img' && data_value['OWN_VIDEO'] != '')) {     //чтобы не показывать одновременно и фото и видео
                        iframe.contents().find('[data-type="166"] ' + v3).toggleClass('sm-hidden', data_value['OWN_SHOW'][i1 - 1] == 0)
                    } else {
                        iframe.contents().find('[data-type="166"] ' + v3).toggleClass('sm-hidden', true)
                    }
                })
            }
        });
    }

    // поверяем установленные own_show
    if (typeof data_value['NEW_OWN_SHOW'] != 'undefined') {
        $.each(template_val.pers_groups_info, function(i1,v1){

            if(v1[4]!='' && i1!=3) {
                $.each(v1[4], function (i3, v3) {
                    if (!(v3 == '.sm-own_wrapper-img' && data_value['NEW_OWN_VIDEO']!='')) {     //чтобы не показывать одновременно и фото и видео
                        iframe.contents().find('[data-type="211"] ' + v3).toggleClass('sm-hidden', data_value['NEW_OWN_SHOW'][i1 - 1] == 0)
                    }else{
                        iframe.contents().find('[data-type="211"] ' + v3).toggleClass('sm-hidden', true)
                    }
                    // применяем карты там, где они есть
                    let typeId = 211 ;

                    // if (v3=='.sm-own_wrapper-map' && (data_value['OWN_SHOW'][i1 - 1] != 0)) {
                    //     insertOwnMap(typeId, data_value['NEW_OWN_MAP_LINK'], data_value['NEW_OWN_MAP_WIDTH'], data_value['NEW_OWN_MAP_HEIGHT'])
                    // }else{
                    //     iframe.contents().find('[data-type="'+typeId+'"] [data-sm-href="OWN_MAP_LINK"]').remove();
                    // }
                })
            }
        });
    }

    // if (save) {
    //     // if (t <= 5) {
    //     $('[name="' + smv + 'own_gallery_type"]').parents('.ct-panel_settings-page').find('.submit_current').click();
    //     // }
    // }
    if (typeof setActiveOwnGalleryItemConstr === 'function') {
        setActiveOwnGalleryItemConstr(t, save, v)
    }
}



function paintTemplate(){

    console.log('paint-templ')

    var sects = iframe.contents().find('[data-type]');

    $.each(sects, function (k, v) {
        var ds = $(this).attr('data-type');
        var csstext = '';
        // if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS[' + ds + ']'] != '') {
        //     $(this).css('background', data_value['PERSONAL_COLORS[' + ds + ']']);
        //     if (iframe.contents().find('.sm-template47').length > 0) {
        //         if (ds != 2 && ds != 7) {
        //             csstext = 'background:' + data_value['PERSONAL_COLORS[' + ds + ']'] + ' !important;';
        //             $(this).find('h2 span').css('cssText', 'background:' + data_value['PERSONAL_COLORS[' + ds + ']'] + ' !important');
        //         }
        //     }
        //     $(this).toggleClass('sm-painted', true)
        // }
        // if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
        //     $(this).css('color', data_value['PERSONAL_COLORS_FONT[' + ds + ']'])
        //     iframe.contents().find('[data-type="' + ds + '"] *:not(.sm_colors):not(.sm_color > div):not(.sm-btn):not(.sm-button):not(.sm-button-center):not(.sm_colors *)').css('cssText', 'color:' + data_value['PERSONAL_COLORS_FONT[' + ds + ']'] + ' !important');
        //     if (iframe.contents().find('.sm-template47').length > 0) {
        //         if (ds != 2 && ds != 7) {
        //             $(this).find('h2 span').css('cssText', csstext + 'color:' + data_value['PERSONAL_COLORS_FONT[' + ds + ']'] + ' !important');
        //         }
        //     }
        //     $(this).toggleClass('sm-painted_text', true)
        //     if(iframe.contents().find('head').find('.colors-styles').length==0){
        //         iframe.contents().find('head').append('<style class="colors-styles"></style>');
        //     }
        //
        // }


        var pseudo = $(this).find('[class*="__bg"]');
        if (pseudo.length > 0) {
            pseudo.css('cssText', 'background:' + $(this).val() + ' !important');
        }


        checkColorStyles();


        if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS[' + ds + ']'] != '') {
            paintBlock('[data-type="' + ds + '"]',data_value['PERSONAL_COLORS[' + ds + ']'],1);
        }
        if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
            paintBlock('[data-type="' + ds + '"]',data_value['PERSONAL_COLORS_FONT[' + ds + ']'],2);
        }
        let buttonSelector = "";

        if(typeof data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + ds + "]"] != "undefined" && data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + ds + "]"]!=null && data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + ds + "]"]!=''){
            console.log('selector from data_value');
            buttonSelector = "[data-type='" + ds + "'] "+data_value["PERSONAL_BUTTON_SELECTOR_COLORS[" + ds + "]"];
        }else{
            if(typeof $('[name="personal_button_selector_colors[' + ds + ']"]').val() != "undefined" && $('[name="personal_button_selector_colors[' + ds + ']"]').val()!=null && $('[name="personal_button_selector_colors[' + ds + ']"]').val()!=''){
                console.log('selector from field');
                buttonSelector = "[data-type='" + ds + "']" +$('[name="personal_button_selector_colors[' + ds + ']"]').val();
            }
        }
        let colorArr = ['none','none','none','none','none','none'];
        if(typeof data_value['PERSONAL_BUTTON_COLORS[' + ds + ']'] != "undefined" && data_value['PERSONAL_BUTTON_COLORS[' + ds + ']']!=null && data_value['PERSONAL_BUTTON_COLORS[' + ds + ']']!=''){
            colorArr = data_value['PERSONAL_BUTTON_COLORS[' + ds + ']'];
        }
        if(buttonSelector != "") {
            console.log(buttonSelector)
            console.log(colorArr);
            paintButton(buttonSelector, colorArr);
        }

        let currentCssText = '';

        //если покрашен блок анкеты, красим модалки

        if ($(this).hasClass('sm-questionnaire') || $(this).hasClass('sm-form') || $(this).hasClass('sm-feedback')) {

            if(iframe.contents().find('.sm-modal').length > 0){
                // console.log(data_value['PERSONAL_COLORS_FONT[' + ds + ']'] + ' color')
                if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS[' + ds + ']'] != '') {
                    paintBlock('.sm-modal', data_value['PERSONAL_COLORS[' + ds + ']'], 1);
                }
                if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                    paintBlock('.sm-modal', data_value['PERSONAL_COLORS_FONT[' + ds + ']'], 2);
                    updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-modal', data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
                }
            }

            if(iframe.contents().find('.sm-quest-modal').length > 0){
                if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS[' + ds + ']'] != '') {
                    paintBlock('.sm-quest-modal',data_value['PERSONAL_COLORS[' + ds + ']'],1);
                }
                if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                    paintBlock('.sm-quest-modal',data_value['PERSONAL_COLORS_FONT[' + ds + ']'],2);
                    updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-quest-modal', data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
                }
            }
            if(iframe.contents().find('div#sm-mod').length > 0){
                if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS[' + ds + ']'] != '') {
                    paintBlock('div#sm-mod',data_value['PERSONAL_COLORS[' + ds + ']'],1);
                }
                if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                    paintBlock('div#sm-mod',data_value['PERSONAL_COLORS_FONT[' + ds + ']'],2);
                    updateStyleForm(iframe.contents().find('head').find('.colors-styles'), 'div#sm-mod', data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
                }
            }
            if(iframe.contents().find('.sm-feedback').length > 0){
                if (data_value['PERSONAL_COLORS[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                    paintBlock('.sm-feedback',data_value['PERSONAL_COLORS_FONT[' + ds + ']'],1);
                }
                if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                    paintBlock('.sm-feedback',data_value['PERSONAL_COLORS_FONT[' + ds + ']'],2);
                    updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '.sm-feedback', data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
                }
            }

            if (data_value['PERSONAL_COLORS_FONT[' + ds + ']'] && data_value['PERSONAL_COLORS_FONT[' + ds + ']'] != '') {
                // console.log(data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
                updateStyleForm(iframe.contents().find('head').find('.colors-styles'), '[data-type="' + ds + '"]', data_value['PERSONAL_COLORS_FONT[' + ds + ']']);
            }

        }


    })

    // autoResizeText();

}