$(document).ready(function () {
    var jqxhr = $.get("http://18.217.120.229:8080/code/buyer", function (data, status) {
        const { items } = data
        items.forEach(element => {
            addBuyer(element)
        });
    });
});

$(document).on('click', '#code-buyer-item-edit', function () {
    var tr = $(this).parent().parent()
    const buyer_id = JSON.parse(tr.attr('buyerid'))
    const code = tr.children().eq(1).text()
    const name = tr.children().eq(2).text()
    $('#code-buyer-edit-code').val(code)
    $('#code-buyer-edit-name').val(name)
    $('#code-buyer-btn-edit').attr('buyerid', buyer_id)
});

$(document).on('click', '#code-buyer-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('buyerid'))
    var jqxhr = $.post("http://18.217.120.229:8080/code/buyer/delete", {
        id
    }, function (data, status) {
        const no = JSON.parse(tr.children().eq(0).text()) - 1
        var tbody = tr.parent()
        tr.remove()
        const count = tbody.children().length
        for (var i = no; i < count; i ++) {
            const num = JSON.parse(tbody.children().eq(i).children().eq(0).text()) - 1
            tbody.children().eq(i).children().eq(0).text(num)
        }
    })
});

function addBuyer(element) {
    var count = $('#code-buyer-table-body').children().length
    $('#code-buyer-table-body').append('\
        <tr buyerid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.name + '</td>\
            <td></td>\
            <td>\
                <button id="code-buyer-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-buyer-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_delete</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-buyer-btn-add').click(() => {
    const code = $('#code-buyer-new-code').val()
    const name = $('#code-buyer-new-name').val()
    $('#code-buyer-new-code').val('')
    $('#code-buyer-new-name').val('')
    const item = {code, name}

    var jqxhr = $.post("http://18.217.120.229:8080/code/buyer/add", {
        item
    }, function (data, status) {
        addBuyer(data.item)
    })
})

$('#code-buyer-btn-edit').click(() => {
    const buyerid = JSON.parse($('#code-buyer-btn-edit').attr('buyerid'))
    const code = $('#code-buyer-edit-code').val()
    const name = $('#code-buyer-edit-name').val()
    const item = {buyerid, code, name}

    var jqxhr = $.post("http://18.217.120.229:8080/code/buyer/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[buyerid=' + buyerid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(name)
    })
})