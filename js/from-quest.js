/**
 * Created with JetBrains WebStorm.
 * User: GAP
 * Date: 29.09.12
 * Time: 13:48
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    function eventTabThirdClass(elementClass){
          $(elementClass).removeClass("last-in-row");
          for(var i=2; i<$(elementClass+":visible").length;i=i+3){
              $(elementClass+":visible").eq(i).addClass("last-in-row");
        }
    };

    ///////////////////////////////------------datepicker filter unit/////////////////////////
    function dateFilter(elements,eventStart,eventEnd,datepickerSpan,finishedInput,invertCheckBox){
         $(elements).show();
        $("#now").text(Math.round(new Date().getTime()/1000));

        if ($(datepickerSpan).text()!="")
            {
            $(elements+'>'+eventStart).each(function(){
                if (timeCompare(datepickerSpan,$(this))<0)
                {
                    $(this).parent().hide();
                }

            });
        }
        if (invertCheckBox)
        {
            if (!$(finishedInput).prop("checked")){

                $(elements+">"+eventEnd).each(function(){

                    if (timeCompare($("#now"),$(this))<0)
                    {
                        $(this).parent().hide();
                    }
                });
            }
        }
        else
        {
            if ($(finishedInput).prop("checked")){
                $(elements+">"+eventEnd).each(function(){
                    if (timeCompare($("#now"),$(this))<0)
                    {
                        $(this).parent().hide();
                    }
                });
            }
        }
        eventTabThirdClass(".event-tab");
    };

    /////////////time compare  result
    function timeCompare(timeSpan,timeEvent){
            var filterTime = parseInt($(timeSpan).text());
            var checkTime = parseInt($(timeEvent).text());
            var timeLeft = checkTime - filterTime ;
            return timeLeft;
    }

    //////////////////////////////////////////

    ///--------author filter
    function myEvents(elements,myCheckbox){
       if ($(myCheckbox).prop("checked")){
          $(elements+":not(.my-event)").hide();
       }
    }






    //-- alternation of bgcolor of elements
    function zebra(parentContainer){
        $(parentContainer+'>div').removeClass("q-second");
        $(parentContainer+'>div:visible:odd').addClass("q-second");
    };
    ///----------------

    //диалоговое окно datePicker
    function datePickerDialog(){
        $("#startdate").datepicker(
            "dialog",
            "1.12.2012",
            function (date) {
                var chosenTime = Math.round(Date.parse(date)/1000);
                $("#startdate").text("начиная с " + date);
                $("#storedtime").text(chosenTime);

                dateFilter(".event-tab",".event-start-time",".event-end-time","#storedtime","#finished",true);
                dateFilter("#user-all-events>div",".event-start-time",".event-end-time","#storedtime","#finished",false);
            },{
                 showButtonPanel:true
            }
        );

    };
    //--------------------

    // настройки DatePicker

    //--------------------------

    //Поля привязанные к DatePicker
    $("#datepickerStart").datepicker({ changeYear:true });
    $("#datepickerEnd").datepicker({ changeYear:true });
    //-----------------------------


    //----Show finished ------------
    $("#finished").click(function(){
        dateFilter(".event-tab",".event-start-time",".event-end-time","#storedtime","#finished",true);
        dateFilter("#user-all-events>div",".event-start-time",".event-end-time","#storedtime","#finished",false);
    });

    //-----------

    //выбор даты в фильтрах
    $(".filter-date").click(function () {
        datePickerDialog();


    });
    //---------------------------

    //---draft_05_calendar author filter
    $('#me-author').click(function(){
        dateFilter("#user-all-events>div",".event-start-time",".event-end-time","#storedtime","#finished",false);
        myEvents("#user-all-events>div","#me-author");
    });

    //----maket--------

    //---------------------

    //--quest.html  filter handler
    $('.quest-form-filter input').click(function(){
        eventListFilter('.quest-form-list-item','.quest-form-filter',true);
        zebra(".quest-form-list");
    });
    //----------------------------

    //----remove from invited list
    $(".quest-form-list-item-cross").live('click',function(){
        var uninviteId = $(this).parent().attr("id")+"-status";
        $(this).parent().remove();
        $("#"+uninviteId).children('span').text("ПРИГЛАСИТЬ");
        $("#"+uninviteId).children('span').toggleClass("form-user-invite-button form-user-already-button");
        zebra("#invited-users");
    });
    //---------------------------
    //-------adding to invited list
    $(".form-user-invite-block").click(function(){
        if ($(this).children('span').hasClass("form-user-invite-button")){
            var invitedId = $(this).attr("id").replace("-status","") ;
            $(this).children('span').text("приглашен") ;
            $(this).children('span').toggleClass("form-user-invite-button form-user-already-button");
            var imageCross = '</div><img  class="quest-form-list-item-cross" src="images/cross.png"></div>' ;
            var newElement = $(this).parent().clone().attr('id',invitedId).append(imageCross);
            $(newElement).appendTo('#invited-users').children('.form-user-invite-block').children('span').remove();
            zebra("#invited-users");
           } ;
    });
    //------------------------------
    //------edit/save invite message
    $("#text-change-button").click(function(){
        if ($("#text-change-button").children('span').text()=="Изменить"){
            $("#invite-text").attr("disabled",false);
            $("#text-change-button").children('span').text("Сохранить");
        } else {
            $("#invite-text").attr("disabled",true);
            $("#text-change-button").children('span').text("Изменить");
        }
    });
    //-----------------------------
    //------processing filter input
    $("#filter").keyup(function(){

        $('.quest-form-contact-list > .quest-form-list-item').show();
        var filterVal = $(this).val();
        if (filterVal!=""){
            $('.quest-form-contact-list > .quest-form-list-item:not(:contains('+filterVal+'))').hide();};
        zebra(".quest-form-contact-list");
    });
    //---------------------------
    //---adding matches to invited list
    $('.form-input-add-button').click(function(){
        $('.quest-form-contact-list > .quest-form-list-item:visible').children(".form-user-invite-block").click();
        zebra("#invited-users");
    });
    //---------------------------
});



