$(document).ready(function(){
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all") {
            $('.gallery_product').show('1000');
        } else {
            $(".gallery_product").not('.'+value).hide('3000');
            $('.gallery_product').filter('.'+value).show('3000');
        }

        $(".filter-button").removeClass("bg-blue-700").addClass("bg-blue-500");
        $(this).removeClass("bg-blue-500").addClass("bg-blue-700");
    });
});