var i = 1;

// ativa o botão radio
$('input[name=aprovar]:checked').parent().addClass('active');

// listener ao clicar no botão de aprovação
$('div.btn-group .btn.btn-default').click(function() {
	var $this 	= $(this);
	var $radio 	= $($this.find('input[type=radio]'));
	
	// executa o código caso o usuário não clique na opção já selecionada
	if(!$this.hasClass('active')) escondeJustificativa($radio);
});

// data de emissão atual
$('#dataEmissao').val(new Date().toLocaleDateString('pt-BR'));

// select2
$('select').select2({
	width: '100%',
	theme: 'bootstrap',
	language: 'pt-BR'
});

// altera comprador conforme a unidade requisitante
$('#unidadeRequisitante').on('select2:select', function() {
	$('#comprador').val(this.value).change();
});

// altera prazo de entrega conforme o produto
$(document).on('select2:select', '.produto', function(e) {
	$(e.target).parent().find('small').html(this.value);
});

Number.prototype.pad = function(size) {
	var s = String(this);
	while(s.length < (size || 2)) { s = "0" + s; }
	return s;
}

// exibe o campo justificativa caso a opção "Reprovado" seja selecionada
function escondeJustificativa($radio) {
	var $justificativaDiv = $('div#justificativaDiv');
	($radio.attr('id') === 'reprovado') ? $justificativaDiv.show() : $justificativaDiv.hide();
};

function addItem() {
	i++;
	$('#itens').append('<div class="item" row-id="' + i + '"><div class="panel-body"><span class="glyphicon glyphicon-remove pull-right text-muted" style="cursor: pointer;" onclick="removeItem(this)"></span><h4>Item #' + ($('.item').length + 1).pad(4) + '</h4><br><div class="row"><div class="col-xs-12 col-sm-4 col-md-3"><div class="form-group"><label>Produto</label><select class="form-control produto"><option value="">Selecione...</option><option value="Prazo de entrega de 12 dias">1029 - Produto 1</option><option value="Prazo de entrega de 1 dia">7683 - Produto 2</option><option value="Prazo de entrega de 20 dias">9238 - Produto 3</option><option value="Prazo de entrega de 10 dias">4356 - Produto 4</option><option value="Prazo de entrega de 7 dias">1234 - Produto 5</option></select><small class="text-info"></small></div></div><div class="col-xs-12 col-sm-8 col-md-9"><div class="form-group"><label>Descrição</label><input type="text"class="form-control"></div></div></div><div class="row"><div class="col-xs-12 col-sm-4 col-md-3"><div class="form-group"><label>Quantidade</label><input type="number" class="form-control"></div></div><!-- <div class="col-xs-12 col-sm-6 col-md-3"><div class="form-group"><label>Centro de Custo</label><select class="form-control"><option>Selecione...</option><option>1029 - Centro de Custo 1</option><option>7683 - Centro de Custo 2</option><option>9238 - Centro de Custo 3</option><option>4356 - Centro de Custo 4</option><option>1234 - Centro de Custo 5</option></select></div></div><div class="col-xs-12 col-sm-6 col-md-3"><div class="form-group"><label>Necessidade</label><input type="date" class="form-control"></div></div>--><div class="col-xs-12 col-sm-8 col-md-9"><div class="form-group"><label>Classe de Valor</label><select class="form-control"><option>Selecione...</option><option>1029 - Classe de Valor 1</option><option>7683 - Classe de Valor 2</option><option>9238 - Classe de Valor 3</option><option>4356 - Classe de Valor 4</option><option>1234 - Classe de Valor 5</option></select></div></div><div class="col-xs-12 col-sm-8 col-md-9"><div class="form-group"><label>Anexo</label><input type="file"></div></div></div></div><hr></div>');
	
	// adiciona select2
	$('.item[row-id="' + i + '"] select').select2({
		width: '100%',
		theme: 'bootstrap',
		language: 'pt-BR'
	});
	
	$('#totalItens').text($('.item').length);
}

function removeItem(elem) {
	$(elem).closest('.item').remove();
	$('#totalItens').text($('.item').length);
}