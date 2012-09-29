/**
 * Created with JetBrains WebStorm.
 * User: GAP
 * Date: 29.09.12
 * Time: 15:00
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $('input').click(function(){
        $('.quest-form-list-item-status').parent('div').hide();
        var noChecked = true;
        $('input:checked').each(function(){
            noChecked = false;
            var checkBox = $(this).attr('name');
            $('.'+checkBox).parent('div').show();
        });
        if (noChecked) {
            $('.quest-form-list-item-status').parent('div').show();
        }
    });
});
