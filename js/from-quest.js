/**
 * Created with JetBrains WebStorm.
 * User: GAP
 * Date: 29.09.12
 * Time: 13:48
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    $(".quest-form-list-item-cross").live('click',function(){
        var uninviteId = $(this).parent().attr("id")+"-status";
        $(this).parent().remove();
        $("#"+uninviteId).children('span').text("ПРИГЛАСИТЬ");
        $("#"+uninviteId).children('span').toggleClass("form-user-invite-button form-user-already-button");


    });
    $(".form-user-invite-block").click(function(){
        if ($(this).children('span').hasClass("form-user-invite-button")){
            var invitedId = $(this).attr("id").replace("-status","") ;
            $(this).children('span').text("приглашен") ;
            $(this).children('span').toggleClass("form-user-invite-button form-user-already-button");
            var imageCross = '</div><img  class="quest-form-list-item-cross" src="images/cross.png"></div>' ;
            var newElement = $(this).parent().clone().attr('id',invitedId).append(imageCross);
            $(newElement).appendTo('#invited-users').children('.form-user-invite-block').children('span').remove();
            /*'<div  class="quest-form-list-item usual" '+ 'id="' + invitedId + '">' +
             ' <img class="usual" src="userimages/avatar-0001.png"><div class="usual quest-form-list-item-username"><span>'+$(this).prev().text()+'</span>' +
             '</div><img  class="' + 'quest-form-list-item-cross"'+' src="'+'images/cross.png">'+'</div>' ;*/

        } ;
    });

    $("#text-change-button").click(function(){
        if ($("#text-change-button").children('span').text()=="Изменить"){
            $("#invite-text").attr("disabled",false);
            $("#text-change-button").children('span').text("Сохранить");
        } else {
            $("#invite-text").attr("disabled",true);
            $("#text-change-button").children('span').text("Изменить");
        }
    });
    $("#filter").keyup(function(){

        $('.quest-form-contact-list > .quest-form-list-item').show();
        var filterVal = $(this).val();
        if (filterVal!=""){
            $('.quest-form-contact-list > .quest-form-list-item:not(:contains('+filterVal+'))').hide();}
    });
    $('.form-input-add-button').click(function(){
        $('.quest-form-contact-list > .quest-form-list-item:visible').children(".form-user-invite-block").click();
    });
});



