
$(document).ready(function (){

    $(".item-navbar").click(trocaPagina);
    $(".dropdownMenu > label").click(mexeDropDown);
    $(".menuPrincipal").click(mostraMenuPrincipal);
    $(".setaBaixoHide").click(toggleEditorFoldSetaBaixo);
    $(".setaCimaHide").click(toggleEditorFoldSetaCima);
    $(".detalhesSuperior .buttonClose").click(fecharDetalhesSnippets);
    $(".headerSnippetDetalhes").click(abrirDetalhesSnippets);
    $(".code").on("click", ".textoFolded", toggleEditorFoldTextoFolded);
    $(".menuAba").click(mexeMenuAba);

    
    $(".setaBaixoHide").each(function (){
        let divComentario = $(this).parent().find(".comentario");
        console.log(divComentario);
        if(divComentario.text().includes("defaultstate")){
            encolheDefaultState(divComentario);
        }
    });
    
    popularNumeracaoAba();
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
    $("#mainBemVindo .number").each(function(){
        let divNumber = $(this);
        if(divNumber.parent().css("display") !== 'none'){
            divNumber.text(i);
            i++;
        }
    });
}

function popularNumeracaoAba(){
    let i = 1;
    $("#biografia .number").each(function(){
        let divNumber = $(this);
        if(divNumber.parent().css("display") !== 'none'){
            divNumber.append("<label>" + i + "</label>");
            i++;
        }
        if(divNumber.hasClass("setaCimaHide")){
            divNumber.append(`<i class="fa-solid fa-angle-up iconesSetas"> </i>`); 
        }
        if(divNumber.hasClass("setaBaixoHide")){
            divNumber.append(`<i class="fa-solid fa-angle-down iconesSetas"> </i>`); 
        }
    });
    i = 1;
    $("#conhecimento .number").each(function(){
        let divNumber = $(this);
        if(divNumber.parent().css("display") !== 'none'){
            divNumber.append("<label>" + i + "</label>");
            i++;
        }
        if(divNumber.hasClass("setaCimaHide")){
            divNumber.append(`<i class="fa-solid fa-angle-up iconesSetas"> </i>`); 
        }
        if(divNumber.hasClass("setaBaixoHide")){
            divNumber.append(`<i class="fa-solid fa-angle-down iconesSetas"> </i>`); 
        }
    });
}

function toggleEditorFoldSetaBaixo() {
    let hasClassEscondido = $(this).hasClass("escondido");
    if(hasClassEscondido){
        $(this).removeClass("escondido");
        var divSetaCima = $(this).parent().nextAll(':has(.setaCimaHide):first');
        $(this).parent().nextUntil(divSetaCima).add(divSetaCima).show();
        let texto = $(this).next().text();
        let defaultstate = $(this).next().find(".comentario:first").attr("data-defaultstate");
        $(this).next().html(`<label class="comentario">&lt;editor-fold desc="` + texto + `" ${(defaultstate == '' ? "" : "defaultstate=\""+defaultstate+"\"")} &gt;</label>`);
    }else{
        $(this).addClass("escondido");
        var divSetaCima = $(this).parent().nextAll(':has(.setaCimaHide):first');
        $(this).parent().nextUntil(divSetaCima).add(divSetaCima).hide();
        let texto = $(this).next().text();
        let defaultstate = texto.includes("defaultstate") ? " data-defaultstate=\"collapsed\" " : "" ;
        texto = texto.substr(texto.indexOf('"')+1);
        texto = texto.substr(0,texto.indexOf('"'));
        $(this).next().html(`<label class="comentario textoFolded" ${defaultstate}>` + texto + `</label>`);
    }
}

function toggleEditorFoldTextoFolded() {
    let divNumber = $(this).parent().prev();
    let hasClassEscondido = divNumber.hasClass("escondido");
    if(hasClassEscondido){
        divNumber.removeClass("escondido");
        var divSetaCima = divNumber.parent().nextAll(':has(.setaCimaHide):first');
        divNumber.parent().nextUntil(divSetaCima).add(divSetaCima).show();
        let texto = divNumber.next().text();
        let defaultstate = divNumber.next().find(".comentario:first").attr("data-defaultstate");
        divNumber.next().html(`<label class="comentario">&lt;editor-fold desc="` + texto + `" ${(defaultstate == '' ? "" : "defaultstate=\""+defaultstate+"\"")} &gt;</label>`);
    
    }else{
        divNumber.addClass("escondido");
        var divSetaCima = divNumber.parent().nextAll(':has(.setaCimaHide):first');
        divNumber.parent().nextUntil(divSetaCima).add(divSetaCima).hide();
        let texto = divNumber.next().text();
        let defaultstate = texto.includes("defaultstate") ? " data-defaultstate=\"collapsed\" " : "" ;
        texto = texto.substr(texto.indexOf('"')+1);
        texto = texto.substr(0,texto.indexOf('"'));
        divNumber.next().html(`<label class="comentario textoFolded ${defaultstate}">` + texto + `</label>`);
    }
}

function toggleEditorFoldSetaCima() {
    let divSetaBaixo = $(this).parent().prevAll(':has(.setaBaixoHide):first');
    divSetaBaixo.find(".number").addClass("escondido");
    $(this).parent().prevUntil(divSetaBaixo).hide();
    $(this).parent().hide();
    divSetaBaixo.show();
    let texto = divSetaBaixo.find(".code").text();
    let defaultstate = texto.includes("defaultstate") ? " data-defaultstate=\"collapsed\" " : "" ;
    texto = texto.substr(texto.indexOf('"')+1);
    texto = texto.substr(0,texto.indexOf('"'));
    divSetaBaixo.find(".code").html(`<label class="comentario textoFolded" ${defaultstate}>` + texto + `</label>`);
}

function encolheDefaultState(elemento) {
    elemento.addClass("escondido");
    var divSetaCima = elemento.parent().nextAll(':has(.setaCimaHide):first');
    elemento.parent().nextUntil(divSetaCima).add(divSetaCima).hide();
    let texto = elemento.next().text();
    let defaultstate = texto.includes("defaultstate") ? " data-defaultstate=\"collapsed\" " : "" ;
    texto = texto.substr(texto.indexOf('"')+1);
    texto = texto.substr(0,texto.indexOf('"'));
    elemento.next().html(`<label class="comentario textoFolded ${defaultstate}">` + texto + `</label>`);
}
function fecharDetalhesSnippets(){
    $(this).parent().parent().addClass("hidden");
}
function abrirDetalhesSnippets(){
    let div = $(this).parent().parent().find(".detalhesSnippet");
    if(div.hasClass("hidden")){
        div.addClass("esconder"); 
        div.removeClass("hidden"); 
        setTimeout(() => {
            div.removeClass("esconder"); 
            div.addClass("mostrar"); 
        }, 100);
        
    }else{
        div.addClass("esconder"); 
        div.removeClass("mostrar");
        setTimeout(() => {
            div.addClass("hidden"); 
        }, 1500); 
    }
}

function mexeMenuAba(){
    $(this).parent().find(".ativo").removeClass("ativo");
    $(this).addClass("ativo");
    let div = $(this).attr("data-id");
    $("#"+div).parent().find(".aba").addClass("hidden");
    $("#"+div).removeClass("hidden");
}


//fa-caret-right seta pra direita
//sort-down seta pa baxo
// &nbsp; espaço