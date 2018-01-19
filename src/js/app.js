/**
 * A node in the DOM tree.
 *
 * @external Node
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node Node}
 */

(function () {

    var date = new Date();
    /*
    var test = '27';
    var fridayDate = new Date('january 19, 2018 16:'+test+':00');
    var tomorrowDate = new Date('january 19, 2018 16:'+test+':15');
    var feb9Date = new Date('january 19, 2018 16:'+test+':30');
    */
    var fridayDate = new Date('february 5, 2018 00:00:00');
    var tomorrowDate = new Date('february 8, 2018 00:00:00');
    var feb9Date = new Date('february 9, 2018 00:00:00');
    
    var today = date.getTime();
    var feb9 = feb9Date.getTime();
    var friday = fridayDate.getTime();
    var tomorrow = tomorrowDate.getTime();
    
    const mobile = matchMedia('(max-width: 1024px)');
    const ie = navigator.userAgent.indexOf('MSIE ') >= 0 || navigator.userAgent.indexOf('Trident/') >= 0 || navigator.userAgent.indexOf('Edge/') >= 0;

    let main;
    let sections;
    let subSections;
    let videoLoops;
    let videoQuality = 'HD';

    

    const setQuality = function(){
        
        if(mobile.matches){
            videoQuality = 'M';
        }
        else{
            if (window.matchMedia("(max-width: 640px)").matches) {
                videoQuality = 'SSD';
            }
            else if (window.matchMedia("(max-width: 1200px)").matches && window.matchMedia("(min-width: 640px)").matches) {
                videoQuality = 'SD';
            } 
            else if (window.matchMedia("(min-width: 1200px)").matches) {
                videoQuality = 'HD';
            }
        }
    };
    

    var contentVideoPaths = {
        'video_1':{
            'HD':'media/vid/wb1517paid_content_loop_HD.mp4',
            'SD':'media/vid/wb1517paid_content_loop_SD.mp4',
            'SSD':'media/vid/wb1517paid_content_loop_SSD.mp4',
            'M':'media/vid/wb1517paid_content_loop_SSD.mp4'
        },
        'video_2':{
            'HD':'media/vid/wb1517_trailer_overlay_desktop_HD.mp4',
            'SD':'media/vid/wb1517_trailer_overlay_desktop_SD.mp4',
            'SSD':'media/vid/wb1517_trailer_overlay_desktop_SSD.mp4',
            'M':'media/vid/wb1517_trailer_overlay_desktop_M.mp4'
        }
    
    };
    function gid(s){
        return document.getElementById(s);
    }

    var cnn_header = gid('cnn_header'),
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
    
    

    cta.className = ctaClass;

    var vid1 = videoClick1.getAttribute('data-yt');
    var options = {
        id: vid1,
        autoplay:false,
        loop: false
    };
    var player = new Vimeo.Player(videoEmbed, options);

    

    videoClick1.addEventListener('click',function(){buttonClick('1');});
    videoClick2.addEventListener('click',function(){buttonClick('2');});
    
    function buttonClick(n){
        videoPlayer = gid('video_bg_'+n);
        videoClick = gid('video-click_'+n);
        videoPlayer.pause();

        var vimID = videoClick.getAttribute('data-yt');
        console.log(vimID+' '+videoClick.id+' CLICKED');
        player.loadVideo(vimID).then(function(id) {
            videoEmbedWrapper.style.display = "block";
            player.play();
        }).catch(function(error) {
            switch (error.name) {
                case 'TypeError':
                    // the id was not a number
                    break;

                case 'PasswordError':
                    // the video is password-protected and the viewer needs to enter the
                    // password first
                    break;

                case 'PrivacyError':
                    // the video is password-protected or private
                    break;

                default:
                    // some other error occurred
                    break;
            }
        });

    };
    videoClose.addEventListener('click', () => {
        player.pause();
        
        videoEmbedWrapper.style.display = "none";
        videoPlayer.play();
    });

    

    function setVideoSrc(){
        setQuality();
        video_background_1.src = contentVideoPaths.video_1[videoQuality];
        video_background_2.src = contentVideoPaths.video_2[videoQuality];
    }

    setVideoSrc();
    
    cta.addEventListener('click', function(){
        let ctaUrl = cta.getAttribute('linkUrl');

        window.open(ctaUrl);
    });

    /**
     * Create a synthetic event with optional data and dispatch to a target DOM node.
     *
     * @param {string} type - The event type, e.g. 'click', 'scroll', or a custom name
     * @param {external:Node} element - The DOM node on which to dispatch the event
     * @param [data] - Optional data to pass with the event
     */
    /*
    function dispatchSyntheticEvent(type, element, data) {
        let event;

        if (ie) {
            event = document.createEvent('Event');
            event.initEvent(type, true, true);
        } else {
            event = new Event(type);
        }

        event.data = data;

        element.dispatchEvent(event);
    }
    */
    
    /** Entry point. Bootstrap code: Configure and await dependencies, then call {@link init} */
    (function main() {
        console.log('PROMISE');
        Promise.all([
            // wait for the DOMContentLoaded event
            new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve)),

            // Wait for fonts to load
            new Promise(resolve => WebFont.load({
                
                classes: true,
                
                custom: {
                    families: ['CNNSans-Light','CNNSans-Regular'],
                    urls: ['fonts/stylesheet.css'],
                },
                active: resolve,
            })),
        ]).then(init);
    }());


    /**
     *
     */

    function init() {
        console.log('???');

        main = gid('main');
        
        //sections = Array.from(main.querySelectorAll('.section'));
       


        //scroll();
        //initLazyLoad();

       
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
