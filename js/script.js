var arrayAbas;
var arrayMenuAbas;
var arrayCarrossel;
$(document).ready(function () {
  arrayAbas = $(".aba");
  arrayMenuAbas = $(".menuAba");
  arrayCarrossel = $(".carrossel");
  $(".aba").remove();
  $(".menuAba").remove();
  $("body").on("click", ".textoFolded", toggleEditorFoldTextoFolded);
  $("body").on("click", ".item-navbar", trocaPagina);
  $("body").on("click", ".dropdownMenu > label", mexeDropDown);
  $("body").on("click", ".menuPrincipal", mostraMenuPrincipal);
  $("body").on("click", ".setaBaixoHide", toggleEditorFoldSetaBaixo);
  $("body").on("click", ".setaCimaHide", toggleEditorFoldSetaCima);
  $("body").on(
    "click",
    ".detalhesSuperior .buttonClose",
    fecharDetalhesSnippets
  );
  $("body").on("click", ".headerSnippetDetalhes", abrirDetalhesSnippets);
  $(".code").on("click", ".textoFolded", toggleEditorFoldTextoFolded);
  $("body").on("click", ".menuAba", mexeMenuAba);
  $("body").on("click", ".openDiv", openAba);
  $("body").on("click", ".menuAba i", fechaAba);

  popularNumeracao();
});

function trocaPagina() {
  let link = $(this).attr("data-linkMenu");
  if(link !== "" && link !== undefined){
    $("#" + link)
    .parent()
    .children("div")
    .each(function () {
      if (!$(this).hasClass("hidden")) {
        $(this).addClass("hidden");
      }
    });

  $("#" + link).removeClass("hidden");

  $(".item-navbar").each(function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    }
  });
  $(this).addClass("selected");
  }
}

function mexeDropDown() {
  var label = $(this);
  var divPai = $(this).parent();
  var i = label.find("i").first();
  if (i.hasClass("fa-caret-right")) {
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

function mostraMenuPrincipal() {
  let idDiv = $(this).attr("data-menuLink");
  var label = $(this).find("label");
  var i = label.find("i").first();
  if ($(this).hasClass("opened")) {
    $(this).removeClass("opened");
    i.removeClass("fa-sort-down");
    i.addClass("fa-caret-right");
    if (idDiv == "menuContato") {
      $("#" + idDiv)
        .find(".item-menu")
        .addClass("hidden");
    } else {
      $("#" + idDiv).addClass("hidden");
    }
  } else {
    $(this).addClass("opened");
    i.addClass("fa-sort-down");
    i.removeClass("fa-caret-right");
    if (idDiv == "menuContato") {
      $("#" + idDiv)
        .find(".item-menu")
        .removeClass("hidden");
    } else {
      $("#" + idDiv).removeClass("hidden");
    }
  }
}

function popularNumeracao() {
  let i = 1;
  $("body .number").each(function () {
    let divNumber = $(this);
    if (divNumber.parent().css("display") !== "none") {
      divNumber.text(i);
      i++;
    }
  });
}

function popularNumeracaoAba(id) {
  let i = 1;
  $("#" + id + " .number").each(function () {
    let divNumber = $(this);
    if (divNumber.parent().css("display") !== "none") {
      divNumber.append("<label>" + i + "</label>");
      i++;
    }
    if (divNumber.hasClass("setaCimaHide")) {
      divNumber.append(`<i class="fa-solid fa-angle-up iconesSetas"> </i>`);
    }
    if (divNumber.hasClass("setaBaixoHide")) {
      divNumber.append(`<i class="fa-solid fa-angle-down iconesSetas"> </i>`);
    }
  });
  $(".setaBaixoHide").each(function () {
    let divComentario = $(this).parent().find(".comentario");
    if (divComentario.text().includes("defaultstate")) {
      encolheDefaultState($(this));
    }
  });
}

function toggleEditorFoldSetaBaixo() {
  let hasClassEscondido = $(this).hasClass("escondido");
  if (hasClassEscondido) {
    $(this).removeClass("escondido");
    var divSetaCima = $(this).parent().nextAll(":has(.setaCimaHide):first");
    $(this).parent().nextUntil(divSetaCima).add(divSetaCima).show();
    let texto = $(this).next().text();
    let defaultstate = $(this)
      .next()
      .find(".comentario:first")
      .attr("data-defaultstate");
    $(this)
      .next()
      .html(
        `<label class="comentario">&lt;editor-fold desc="` +
          texto +
          `" ${
            defaultstate == "" || defaultstate == undefined
              ? ""
              : 'defaultstate="' + defaultstate + '"'
          } &gt;</label>`
      );
  } else {
    $(this).addClass("escondido");
    var divSetaCima = $(this).parent().nextAll(":has(.setaCimaHide):first");
    $(this).parent().nextUntil(divSetaCima).add(divSetaCima).hide();
    let texto = $(this).next().text();
    let defaultstate = texto.includes("defaultstate")
      ? ' data-defaultstate="collapsed" '
      : "";
    texto = texto.substr(texto.indexOf('"') + 1);
    texto = texto.substr(0, texto.indexOf('"'));
    $(this)
      .next()
      .html(
        `<label class="comentario textoFolded" ${defaultstate}>` +
          texto +
          `</label>`
      );
  }
}

function toggleEditorFoldTextoFolded() {
  let divNumber = $(this).parent().prev();
  let hasClassEscondido = divNumber.hasClass("escondido");
  if (hasClassEscondido) {
    divNumber.removeClass("escondido");
    var divSetaCima = divNumber.parent().nextAll(":has(.setaCimaHide):first");
    divNumber.parent().nextUntil(divSetaCima).add(divSetaCima).show();
    let texto = divNumber.next().text();
    let defaultstate = divNumber
      .next()
      .find(".comentario:first")
      .attr("data-defaultstate");
    divNumber
      .next()
      .html(
        `<label class="comentario">&lt;editor-fold desc="` +
          texto +
          `" ${
            defaultstate == "" || defaultstate == undefined
              ? ""
              : 'defaultstate="' + defaultstate + '"'
          } &gt;</label>`
      );
  } else {
    divNumber.addClass("escondido");
    var divSetaCima = divNumber.parent().nextAll(":has(.setaCimaHide):first");
    divNumber.parent().nextUntil(divSetaCima).add(divSetaCima).hide();
    let texto = divNumber.next().text();
    let defaultstate = texto.includes("defaultstate")
      ? ' data-defaultstate="collapsed" '
      : "";
    texto = texto.substr(texto.indexOf('"') + 1);
    texto = texto.substr(0, texto.indexOf('"'));
    divNumber
      .next()
      .html(
        `<label class="comentario textoFolded" ${defaultstate}>` +
          texto +
          `</label>`
      );
  }
}

function toggleEditorFoldSetaCima() {
  let divSetaBaixo = $(this).parent().prevAll(":has(.setaBaixoHide):first");
  divSetaBaixo.find(".number").addClass("escondido");
  $(this).parent().prevUntil(divSetaBaixo).hide();
  $(this).parent().hide();
  divSetaBaixo.show();
  let texto = divSetaBaixo.find(".code").text();
  let defaultstate = texto.includes("defaultstate")
    ? ' data-defaultstate="collapsed" '
    : "";
  texto = texto.substr(texto.indexOf('"') + 1);
  texto = texto.substr(0, texto.indexOf('"'));
  divSetaBaixo
    .find(".code")
    .html(
      `<label class="comentario textoFolded" ${defaultstate}>` +
        texto +
        `</label>`
    );
}

function encolheDefaultState(elemento) {
  elemento.addClass("escondido");
  var divSetaCima = elemento.parent().nextAll(":has(.setaCimaHide):first");
  elemento.parent().nextUntil(divSetaCima).add(divSetaCima).hide();
  let texto = elemento.next().text();
  texto = texto.substr(texto.indexOf('"') + 1);
  texto = texto.substr(0, texto.indexOf('"'));
  elemento
    .next()
    .html(
      `<label class="comentario textoFolded" data-defaultstate=\"collapsed\" >` +
        texto +
        `</label>`
    );
}
function fecharDetalhesSnippets() {
  let div = $(this).parent().parent();
  div.addClass("esconder");
  div.removeClass("mostrar");
  setTimeout(() => {
    div.addClass("hidden");
  }, 1500);
}

function abrirDetalhesSnippets() {
  let div = $(this).parent().parent().find(".detalhesSnippet");
  if (div.hasClass("hidden")) {
    div.addClass("esconder");
    div.removeClass("hidden");
    setTimeout(() => {
      div.removeClass("esconder");
      div.addClass("mostrar");
    }, 100);
  } else {
    div.addClass("esconder");
    div.removeClass("mostrar");
    setTimeout(() => {
      div.addClass("hidden");
    }, 1500);
  }
}

function mexeMenuAba() {
  $(this).parent().find(".ativo").removeClass("ativo");
  $(this).addClass("ativo");
  let div = $(this).attr("data-id");
  $("#" + div)
    .parent()
    .find(".aba")
    .addClass("hidden");
  $("#" + div).removeClass("hidden");
  $(".item-menu.openDiv").removeClass("ativo");
  $(".item-menu[data-divId='" + div + "']").addClass("ativo");
}

function getAbaById(id) {
  let aba;
  arrayAbas.each(function () {
    if ($(this).attr("id") === id) {
      aba = $(this);
    }
  });
  return aba;
}
function getMenuAbaById(id) {
  let menuAba;
  arrayMenuAbas.each(function () {
    if ($(this).attr("data-id") === id) {
      menuAba = $(this);
    }
  });
  return menuAba;
}
function getCarrosselById(id) {
  let carrossel;
  arrayCarrossel.each(function () {
    if ($(this).attr("data-idCarrossel") === id) {
      carrossel = $(this).clone();
    }
  });
  return carrossel;
}
function openAba() {
  let idParent = $(this).parents(".divMain:first").attr("id");
  let divItMenu = $(this);
  let idDivAba = $(this).attr("data-divId");
  console.log(idDivAba);
  let divAba = $("#" + idDivAba);
  let divMenuAba = $(".menuAba[data-id='" + idDivAba + "']");

  $(".menuAba").removeClass("ativo");
  $("#"+idParent+" .itemMenuPrincipal").find(".openDiv").removeClass("ativo");
  divItMenu.addClass("ativo");

  if (!divItMenu.hasClass("opened")) {
    divItMenu.addClass("opened");
    if (divAba.length == 0) {
      divAba = getAbaById(idDivAba);
      $("#" + idParent + " .divAbas:first").append(divAba).clone();
    }
    if (divMenuAba.length == 0) {
      divMenuAba = getMenuAbaById(idDivAba);

      $("#" + idParent + " .menuSuperiorAbas:first").append(divMenuAba);
    }
    popularNumeracaoAba(idDivAba);
    let divPorCarrossel = $("#" + idDivAba +" .colocaCarrossel");
    let divCarrossel = getCarrosselById(idDivAba);
    console.log(divCarrossel);
    divPorCarrossel.html(divCarrossel);
    divCarrossel.slick({
      dots: true,
    });
  }
  
  divAba.parent().find(".aba:not(.hidden)").addClass("hidden");
  divAba.removeClass("hidden");
  divMenuAba.addClass("ativo");
}

function fechaAba(event) {
  let iconFecha = $(this);
  let divSubItem = iconFecha.parent();
  let idAba = divSubItem.attr("data-id");
  let aba = $("#" + idAba);
  let menuAba = $('.item-menu[data-divId="' + idAba + '"]');

  menuAba.removeClass("opened");

  divSubItem.remove();
  aba.remove();
  if (!aba.hasClass("hidden")) {
    console.log("a");
    let trocaAba = $(".aba:first");
    if (trocaAba != undefined) {
      trocaAba.removeClass("hidden");
      let idTrocaAba = trocaAba.attr("id");
      $(".item-menu").removeClass("ativo");
      $('.item-menu[data-divId="' + idTrocaAba + '"]').addClass("ativo");
      $('.menuAba[data-id="' + idTrocaAba + '"]').addClass("ativo");
    }
  }

  event.stopPropagation();
}

//fa-caret-right seta pra direita
//sort-down seta pa baxo
// &nbsp; espaço
