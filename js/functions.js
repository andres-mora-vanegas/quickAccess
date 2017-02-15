newWebU=[];
newWebD=[];
loading="cargando...";
errorx="Error al llamar al archivo";

function loadM() {
	var answer = '<ul class="sidebar-nav">';
	for (var x = 0; x < web.length; x++) {
		answer += '<li><a href="#" data-uri="' + web[x].url + '">' + web[x].descript + '</a><i class="ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-notext right"></i></li>';
	}
	//return answer;
	$("#sidebar-wrapper").html(answer + "</ul>");
	var firstElement = $(".sidebar-nav li a:first").attr("data-uri");
	var ifra = "<iframe src='//" + firstElement + "' class='principalIframe' ></iframe>";
	$(".newTab").attr("href", "//"+firstElement);
	$("#main").html(ifra);
}

$(document).on("click", ".sidebar-nav li", function () {
	var li = $(this);
	
	var uri = "//"+$(this).children().attr("data-uri");
	var ifri = $(".principalIframe");
	ifri.attr("src", uri);
	$(".newTab").attr("href", uri);
})

$(document).on("click", ".newTab", function () {
	console.log($('.principalIframe'));
	$(this).attr("href",$('.principalIframe').contents().get(0).location.href);
	//contentWindow.
})

$(document).on("click", ".listJson", function () {
	var answer='';
	for (var x = 0; x < web.length; x++) {
		answer+='<tr style="border-bottom:solid #ACACAC 0.7px">\
		<td><input type="text" class="form-control"  value ="'+web[x].descript+'" /></td>\
		<td><input type="url" class="form-control"  value ="'+web[x].url+'" /></td>\
		<td>\
		<span class="puntero btn btn-default glyphicon glyphicon-option-vertical dropable" data-toggle="popover" data-placement="left" data-html="true"></span>\
		<div class="noView">\
		<span class="btn btn-default glyphicon glyphicon-circle-arrow-up up move col-xs-6"></span>\
		<span class="btn btn-default glyphicon glyphicon-circle-arrow-down down move col-xs-6"></span>\
		<span class="btn btn-danger glyphicon glyphicon-trash removeRow col-xs-12 margin-down"></span>\
		</div>\
		</td>\
		</tr>';		
	}
	$(".editor").html(answer);
	$(".dropable").each(function(){
		var info=$(this).parent().children("div:first").html();
		$(this).attr({		
			"data-content":info		
		})
	});
});

$(document).on("click", ".removeRow", function () {
	$(this).parent().parent().parent().parent().remove();
});

$(document).on("click", ".dropable", function () {
	$('.dropable').not(this).popover('hide'); //all but this	
});






$(document).on("click", ".new", function () {
	$(".editor").append('<tr style="border-bottom:solid #ACACAC 0.7px">\
		<td><input type="text" class="form-control" name="title" placeholder="Descripción de la pagina" /></td>\
		<td><input type="url" class="form-control" name="descript" placeholder="url" /></td>\
		<td> <span class="btn btn-danger glyphicon glyphicon-remove removeRow"></span></td>\
		</tr>');
});

$(document).on("click", ".viewList", function () {
	var answer = '<ul class="sidebar-nav">';
	for (var x = 0; x < web.length; x++) {
		answer += '<li><a href="#" data-uri="' + web[x].url + '">' + web[x].descript + '</a><i class="ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-notext right"></i></li>';
	}
	//return answer;
	$("#sidebar-wrapper").html(answer + "</ul>");
});

//función que mueve el elemento hacia arriba o abajo
$(document).on("click", ".move", function () {
	var direction= $(this).attr("direction");
	var row = $(this).parents("tr:first");
	if ($(this).is(".up")) {
		row.insertBefore(row.prev());
	} else {
		row.insertAfter(row.next());
	}
});



$(document).on("click", ".save", function () {
	var answer='[';
	var conta=0;
	$(".editor tr").each(function(){
		var uri=$.trim($(this).children("td").children("input:eq(1)").val());
		var des=$.trim($(this).children("td").children("input").val());
		if(uri!="" && des!=""){
			answer+='{"url":"'+uri+'","descript":"'+des+'"},'
		}
		conta++;
	})	
	web=JSON.parse(answer.slice(0, -1)+"]");
	console.log(web)
	//funcion que realiza proceso ajax 
	//in
	//atributo answer=id del div que contendrá la información
	//atributo data=opcion del switch (controller) que realizará el proceso
	//atributo id=id que tiene la información que procesará el switch
	//atributo action=nombre del controlador
	//atributo namer=nombre que se pasará al controlador (opcional)
	var link = "procesa.php";
	var answer = $(".answer");
	var data_value = {};
	data_value.data = web;
	//data_value.id = $(this).attr("id");
	//data_value.name = $(this).attr("name");
	$.ajax({
		data: data_value,
		url: link,
		type: 'post',
		beforeSend: function () {
			answer.append(loading);
		},
		success: function (response) {
			answer.hide().html(response).fadeIn('slow');			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			answer.hide().html(errorx).fadeIn('slow');
		}
	});

});