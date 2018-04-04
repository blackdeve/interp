$(document).ready(function () {
    var jqxhr = $.get("http://localhost:8080/fabricout", function (data, status) {
        const {items} = data
        items.forEach(element => {
            addFabricout(element)
        });
    });
});

$('#fabricout-btn-add').click(function () {
    let fabricout = {}

    fabricout.tipo_de_tela = $('#fabricout-new-tipo-de-tela').val()
    fabricout.dev = $('#fabricout-new-dev').val()
    fabricout.number_de_packing = $('#fabricout-new-number-de-packing').val()
    fabricout.yardas = $('#fabricout-new-yardas').val()
    fabricout.color = $('#fabricout-new-color').val()
    fabricout.lote = $('#fabricout-new-lote').val()
    fabricout.fecha = $('#fabricout-new-fecha').val()
    fabricout.de_rollos = $('#fabricout-new-de-rollos').val()
    fabricout.envio = $('#fabricout-new-envio').val()
    fabricout.corte_real = $('#fabricout-new-corte-real').val()
    fabricout.diferencia = $('#fabricout-new-diferencia').val()
    fabricout.file = $('#fabricout-new-file').val()
    fabricout.tela_usada = $('#fabricout-new-tela-usada').val()
    fabricout.po = $('#fabricout-new-PO').val()
    fabricout.consumo_real = $('#fabricout-new-consumo-real').val()
    fabricout.estilo = $('#fabricout-new-Estilo').val()
    fabricout.XS = $('#fabricout-new-XS').val()
    fabricout.S = $('#fabricout-new-S').val()
    fabricout.M = $('#fabricout-new-M').val()
    fabricout.L = $('#fabricout-new-L').val()
    fabricout.XL = $('#fabricout-new-XL').val()
    fabricout['2XLT'] = $('#fabricout-new-2XLT').val()
    fabricout.single = $('#fabricout-new-single').val()
    fabricout.rib = $('#fabricout-new-rib').val()
    
    var jqxhr = $.post("http://localhost:8080/fabricout/add", {
        item: fabricout
    }, function (data, status) {
        addFabricout(fabricout)
    })
})

$('#fabricout-btn-edit').click(() => {
    alert('edit')
})

$(document).on('click','#fabricout-edit',function() {
    
});

function addFabricout(element) {
    $('#fabric-out-table-body').append('\
        <tr>\
            <td id="fabricout-edit" style="cursor:pointer;" data-toggle="modal" data-target="#editFabric">' + element.dev + '</td>\
            <td>' + element.number_de_packing + '</td>\
            <td class="NumericData">' + element.yardas + '</td>\
            <td>' + element.color + '</td>\
            <td>' + element.lote + '</td>\
            <td>' + element.fecha + '</td>\
            <td class="NumericData">' + element.de_rollos + '</td>\
            <td>' + element.envio + '</td>\
            <td class="NumericData">' + element.corte_real + '</td>\
            <td class="NumericData">' + element.diferencia + '</td>\
            <td>' + element.file + '</td>\
            <td>' + element.tela_usada + '</td>\
            <td>' + element.po + '</td>\
            <td class="NumericData">' + element.consumo_real + '</td>\
            <td>' + element.estilo + '</td>\
            <td class="NumericData">' + element.XS + '</td>\
            <td class="NumericData">' + element.S + '</td>\
            <td class="NumericData">' + element.M + '</td>\
            <td class="NumericData">' + element.L + '</td>\
            <td class="NumericData">' + element.XL + '</td>\
            <td class="NumericData">' + element['2XLT'] + '</td>\
            <td class="NumericData">' + element.single + '</td>\
            <td class="NumericData">' + element.rib + '</td>\
            <td>' + element.tipo_de_tela + '</td>\
        </tr>\
    ')
}