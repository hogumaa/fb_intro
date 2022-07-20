var main_Num;
var sub_Num;
var s_Num;
var i;
var m_bt_Num;
var current_Num;

var motion_Speed = 300
var sub_Check_Num = false

var window_W;
var max_width = 960
var min_width = 599
var normal_width_max = 899
var normal_width_min = 600

var mobile_gnb_Checker = false;
var mobile_m_bt_Num;

var m_dep1_Num_old = null

$('document').ready(function () {

    mobile_m_bt_Num = $('.mobile_1depth .mobile_gnb_sub dl').length;   

    $('.mobile_top_bt').click(function () {
        if (mobile_gnb_Checker == false) {
            $(this).children('img:visible').removeClass('on').siblings().addClass('on');
            $('.mobile_1depth').slideDown(300)

            // $('#wrap').css('height', mobile_gnb_height + 100)
            wrapWindowByMask();


            mobile_gnb_Checker = true;
        } else {
            $(this).children('img:visible').removeClass('on').siblings().addClass('on');

            $('.mobile_1depth').slideUp(300)
            $('.wrap').css('height', 'auto')
            
            mask_close();

            mobile_gnb_Checker = false;

            mobile_1depth_Closer();
        }

    })


    //mo_v

    $('.mobile_1depth .mobile_gnb_sub dl dt a').click(function (e) {
        e.preventDefault();

    })



    $('.mobile_1depth .mobile_gnb_sub dl dt').click(function () {

        var m_dep1_Num = $(this).parent().index()
        if (m_dep1_Num_old != m_dep1_Num) {
            mobile_1depth_Controller(m_dep1_Num);
            m_dep1_Num_old = m_dep1_Num
        } else {
            mobile_1depth_Closer();

        }


    })



   

});                        //ready


   function mobile_1depth_Controller($m1_Num) {

       var docu_Height = $('.mid').height();
       var mobile_gnb_height;
       var wrap_height;

    for(i=0;i<mobile_m_bt_Num;i++){
        if($m1_Num == i){
            $('#mo_sbt_' + i).find('dd').slideDown(200, function () {
                if (docu_Height <= 370) {
                    mobile_gnb_height = $('.mobile_1depth .mobile_gnb_sub ').height();

                    $('.wrap').css('height', mobile_gnb_height+100)
                    wrap_height = $('.wrap').height();
                    $('.log').html("컨텐츠높이 : " + wrap_height + "------ 메뉴높이 :" + mobile_gnb_height);
                } else {

                    mobile_gnb_height = 0
                    $('.wrap').css('height', 'auto')
                    wrap_height = $('.wrap').height();
                    $('.log').html("컨텐츠높이 : " + wrap_height + "----- 메뉴높이 :" + mobile_gnb_height);
                }
            })
        }else{
             $('#mo_sbt_' + i).find('dd').slideUp(200)
        }
    };   

     
   
   };
   //mobile_1depth_Controller

   function mobile_1depth_Closer() {
       for (i = 0; i < mobile_m_bt_Num; i++) {

           $('#mo_sbt_' + i).find('dd').slideUp(200)

       };
       $('.wrap').css('height', 'auto')
       m_dep1_Num_old = null
   }






function mask_close() {
    $('.mobile_mask').hide();
   
}

function wrapWindowByMask() {

    var maskHeight = $(document).height();

    var maskWidth = $(window).width();


    $('.mobile_mask').css({ 'width': maskWidth, 'height': maskHeight });

    // $('#mobile_mask').fadeIn(400);

    $('.mobile_mask').fadeTo("slow", 0.6);

    
}





/*==============================================================================================================
====================================== window resize function start ============================================
============================================================================================================== */
$(window).resize(function () {


    window_W = $(window).width();
    mobile_1depth_Closer();
    if (window_W >= max_width) {
        $('.mobile_top_bt img').eq(0).addClass('on').siblings().removeClass('on');
        $('.mobile_1depth').slideUp(0)
       
        $('.wrap').css('height', 'auto')
        
        mask_close();
        mobile_gnb_Checker = false;


    }

    var maskHeight = $(document).height();

    var maskWidth = $(window).width();


    $('.mobile_mask').css({ 'width': maskWidth, 'height': maskHeight });

});
