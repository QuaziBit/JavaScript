var triggerOnLoad = 0;
var clicked = false;
var clicked_id;
var content = "";

$(document).ready(function(){

    //content = $("#content_container").html();
    //alert(content);

    //Replace id of content and action
    //===========================================================================//
    //$('#content_container').children('p').each(function ()

    var counter = 0;
    $('#content_container').children('p').each(function( index ) {

        if($( this ).attr('id') == "content")
        {
            $( this ).attr('id', ("content_" + counter));
            counter++;
        }
    });

    counter = 0;
    $('#content_container').children('span').each(function( index ) {
        
        if($( this ).attr('id') == "action")
        {
            $( this ).attr('id', ("action_" + counter));
            counter++;
        }
    });
    //===========================================================================//
    
    //Loop via all content blocks and hide it
    //also triger as true for clicked action
    //===========================================================================//
    counter = 0;
    if(triggerOnLoad == 0)
    {
        //First load
        triggerOnLoad = 1;

        $('#content_container').children('p').each(function( index ) {
            
            var temp_id = ("content_" + counter);
            if($( this ).attr('id') == temp_id)
            {
                $("#" + temp_id).slideUp();
            }
            counter++;

        });
        clicked = true;
    }
    //===========================================================================//

});

function hideShow(elm)
{
    //Get id of clicked element
    //replace content id
    clicked_id = $(elm).attr('id');
    var temp_id_0 = clicked_id.replace("action_", "content_");

    //hide or show content
    if(!clicked)
    {
        $("#" + temp_id_0).slideUp();
        clicked = false;
    }
    else
    {
        $("#" + temp_id_0).slideToggle();
        clicked = true;

        //hide all open content blocks excluding currently clicked block
        //===========================================================================//
        var counter = 0;
        $('#content_container').children('p').each(function( index ) {
            
            var temp_id = ("content_" + counter);
            if($( this ).attr('id') == temp_id && $( this ).attr('id') != temp_id_0)
            {
                $("#" + temp_id).slideUp();
            }
            counter++;

        });
        //===========================================================================//
        
    }
}
