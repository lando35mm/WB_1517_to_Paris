/**
 * A node in the DOM tree.
 *
 * @external Node
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node Node}
 */
const deeplink = location.hash.substring(1);

(function () {

    (function main() {
        Promise.all([
            // wait for the DOMContentLoaded event
            new Promise(function(resolve,reject){document.addEventListener('DOMContentLoaded', resolve)}),

            // Wait for fonts to load
            new Promise(function(resolve,reject){WebFont.load({
                
                classes: true,
                
                custom: {
                    families: ['CNNSans-Light','CNNSans-Regular'],
                    urls: ['fonts/stylesheet.css'],
                },
                active: resolve,
            })}),
        ]).then(init);
    }());

    function init() {
        console.log('init page');
        var date = new Date();
    /*
    var test = '27';
    var fridayDate = new Date('january 19, 2018 16:'+test+':00');
    var tomorrowDate = new Date('january 19, 2018 16:'+test+':15');
    var feb9Date = new Date('january 19, 2018 16:'+test+':30');
    */
    var fridayDate = new Date('january 30, 2018 00:00:00');
    var tomorrowDate = new Date('february 8, 2018 00:00:00');
    var feb9Date = new Date('february 9, 2018 00:00:00');
    
    var today = date.getTime();
    var feb9 = feb9Date.getTime();
    var friday = fridayDate.getTime();
    var tomorrow = tomorrowDate.getTime();
    
    const mobile = matchMedia('(max-width: 1024px)');
    const ie = navigator.userAgent.indexOf('MSIE ') >= 0 || navigator.userAgent.indexOf('Trident/') >= 0 || navigator.userAgent.indexOf('Edge/') >= 0;

    var main;
    var sections;
    var subSections;
    var videoLoops;
    var videoQuality = 'HD';

    var setQuality = function(){
        
        if(mobile.matches){
            videoQuality = 'M';
        }
        else{
            videoQuality = 'HD';
        }

    };
    
    var contentVideoPaths = {
        'video_1':{
            'HD':'media/vid/wb1517paid_content_loop_HD.mp4',
            'M':'media/vid/wb1517paid_content_loop_M.mp4'
        },
        'video_2':{
            'HD':'media/vid/wb1517_trailer_paris_desktop.mp4',
            'M':'media/vid/wb1517_trailer_paris_mobile.mp4'
        }
    };
    function gid(s){
        return document.getElementById(s);
    }

    var headerBar = gid('headerBar'),
    cnn_header = gid('cnn_header'),
    video_background_1 = gid('video_bg_1'),
    video_background_2 = gid('video_bg_2'),
    videoPlayer = '',
    videoClick = '',
    videoPlayer1 = gid('video_bg_1'),
    videoPlayer2 = gid('video_bg_2'),
    videoClick1 = gid('video-click_1'),
    videoClick2 = gid('video-click_2'),
    videoEmbed = gid('video_embed'),
    videoEmbedWrapper = gid('video_embed_wrapper'),
    videoClose = gid('video_close'),
    sponsor_content_header = gid('sponsor-content-header'),
    ctaWrapper = gid('ctaWrapper'),
    cta = gid('ctaButton');

    var ctaClass = 'cta-img cta-feb9';
    
    if(today > friday){
        ctaClass = 'cta-img cta-friday';
        if(today > tomorrow){
            ctaClass = 'cta-img cta-tomorrow';
            if(today > feb9){
                ctaClass = 'cta-img cta-nowplaying';
            }
        }
    }
    
    var trackingDiv = document.createElement('div');
    ctaWrapper.appendChild(trackingDiv);
    trackingDiv.className = "tracking-div";


    var ctaUrl = 'https://ad.doubleclick.net/ddm/trackclk/N7217.149036.TURNERSPORTSANDENTE/B20610477.213161002;dc_trk_aid=412280939;dc_trk_cid=97183226;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
    trackingDiv.innerHTML = '<IMG SRC="https://ad.doubleclick.net/ddm/trackimp/N7217.149036.TURNERSPORTSANDENTE/B20610477.213121970;dc_trk_aid=412280939;dc_trk_cid=97183226;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" BORDER="0" HEIGHT="1" WIDTH="1" ALT="Advertisement"><SCRIPT TYPE="application/javascript" SRC="https://pixel.adsafeprotected.com/rjss/st/134671/21680670/skeleton.js"></SCRIPT> <NOSCRIPT><IMG SRC="https://pixel.adsafeprotected.com/rfw/st/134671/21680669/skeleton.gif" BORDER=0 WIDTH=1 HEIGHT=1 ALT=""></NOSCRIPT>';
    
    var style = cta.currentStyle || window.getComputedStyle(cta, false);
    if(style.backgroundImage.indexOf('600x400') > 0){
       ctaUrl = 'https://ad.doubleclick.net/ddm/trackclk/N7217.149036.TURNERSPORTSANDENTE/B20610477.213121970;dc_trk_aid=412280939;dc_trk_cid=97183226;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=';
        trackingDiv.innerHTML = '<IMG SRC="https://ad.doubleclick.net/ddm/trackimp/N7217.149036.TURNERSPORTSANDENTE/B20610477.213161002;dc_trk_aid=412280939;dc_trk_cid=97183226;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" BORDER="0" HEIGHT="1" WIDTH="1" ALT="Advertisement"><SCRIPT TYPE="application/javascript" SRC="https://pixel.adsafeprotected.com/rjss/st/134671/21680668/skeleton.js"></SCRIPT> <NOSCRIPT><IMG SRC="https://pixel.adsafeprotected.com/rfw/st/134671/21680667/skeleton.gif" BORDER=0 WIDTH=1 HEIGHT=1 ALT=""></NOSCRIPT>';
    }

    cta.className = ctaClass;
    cta.addEventListener('click', function(){
        window.open(ctaUrl);
    });

    var vid1 = videoClick1.getAttribute('data-yt');
    var options = {
        id: vid1,
        autoplay:false,
        loop: false
    };
    var player = new Vimeo.Player(videoEmbed, options);
    
    if(deeplink==='brave'){
        
        gtag('event', 'deep-link');
        console.log('gtagEvent deep link');
        buttonClick('1');
    }

    videoClick1.addEventListener('click',function(){trackClick('1');});
    videoClick2.addEventListener('click',function(){trackClick('2');});

    setQuality();
    video_background_1.src = contentVideoPaths.video_1[videoQuality];
    video_background_2.src = contentVideoPaths.video_2[videoQuality];
    
    function trackClick(n){
        gtag('event', 'video'+n+'-click');
        console.log('gtagEvent'+n+'click');
            buttonClick(n);
    }

    function buttonClick(n){

        videoPlayer = gid('video_bg_'+n);
        videoClick = gid('video-click_'+n);
        videoPlayer.pause();
        headerBar.style.display = "none";//hide that annoying header when video is playing
        var vimID = videoClick.getAttribute('data-yt');
        console.log(vimID+' '+videoClick.id+' CLICKED');
        
        
        player.loadVideo(vimID).then(function(id) {
            videoEmbedWrapper.style.display = "block";
            player.play();
            player.on('ended', function() {
                console.log('gtagEvent'+n+'ENDED');
                gtag('event', 'video'+n+'-ended');
                
            });

        }).catch(function(error) {
            
        });

    };
    function closeVideo(){
        player.pause();
        headerBar.style.display = "block";
        videoEmbedWrapper.style.display = "none";
        videoPlayer.play();
    }

    videoClose.addEventListener('click', function(){
        closeVideo();
    });

    videoClose.addEventListener('ontouchstart', function(){
        closeVideo();
    });
    
    }

    /*
    function initLazyLoad() {
        sections.forEach(div => div.addEventListener('scroll-update', function once({ data: { percent }, target: div }) {
            if (percent <= 0) {
                return;
            }
            let className = '.lazyload';
            if(mobile.matches) className = '.lazyloadM';
            
            div.removeEventListener('scroll-update', once);
            
            for (let lazy of Array.from(div.querySelectorAll(className))) {
                if (lazy.nodeName === 'IMG') {
                    
                    lazy.setAttribute('src', lazy.getAttribute('data-src'));
                }
            }
        }));
    }
    */
}());

