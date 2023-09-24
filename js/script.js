
$(document).ready(function (){

    $(".item-navbar").click(trocaPagina);
    $(".dropdownMenu > label").click(mexeDropDown);
    $(".menuPrincipal").click(mostraMenuPrincipal);

    popularNumeracao();
});


function trocaPagina(){
    let link = $(this).attr("data-linkMenu");
    $("#"+link).parent().children("div").each(function (){
        if(!$(this).hasClass("hidden")){
            $(this).addClass("hidden");
        }
    });
    
    $("#"+link).removeClass("hidden");

    $(".item-navbar").each(function (){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
        }
    });
    $(this).addClass("selected");
}

function mexeDropDown(){
    var label = $(this);
    var divPai = $(this).parent();
    var i = label.find("i").first();
    if(i.hasClass("fa-caret-right")){
        i.addClass("fa-sort-down");
        i.removeClass("fa-caret-right");
        divPai.addClass("dropped");
        divPai.addClass("opened");
    } else {
        i.removeClass("fa-sort-down");
        i.addClass("fa-caret-right");
        divPai.removeClass("dropped");
        divPai.removeClass("opened");
    }
}

function mostraMenuPrincipal(){
    let idDiv = $(this).attr("data-menuLink");
    var label = $(this).find("label");
    var i = label.find("i").first();
    if($(this).hasClass("opened")){
        $(this).removeClass("opened");
        i.removeClass("fa-sort-down");
        i.addClass("fa-caret-right");
        $("#"+idDiv).addClass("hidden");
    }else{
        $(this).addClass("opened");
        i.addClass("fa-sort-down");
        i.removeClass("fa-caret-right");
        $("#"+idDiv).removeClass("hidden");
    }
}

function popularNumeracao(){
    let i = 1;
    $(".number").each(function(){
        let divNumber = $(this);
        if(divNumber.parent().css("display") !== 'none'){
            divNumber.text(i);
            i++;
        }
    });
}

//fa-caret-right seta pra direita
//sort-down seta pa baxo
// &nbsp; espaço