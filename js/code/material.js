$(document).ready(function () {
    var jqxhr = $.get("http://localhost:8080/code/material", function (data, status) {
        const { items } = data
        items.forEach(element => {
            addMaterial(element)
        });
    });
});

$(document).on('click', '#code-material-item-edit', function () {
    var tr = $(this).parent().parent()
    const material_id = JSON.parse(tr.attr('materialid'))
    const code = tr.children().eq(1).text()
    const name = tr.children().eq(2).text()
    $('#code-material-edit-code').val(code)
    $('#code-material-edit-name').val(name)
    $('#code-material-btn-edit').attr('materialid', material_id)
});

$(document).on('click', '#code-material-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('materialid'))
    var jqxhr = $.post("http://localhost:8080/code/material/delete", {
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

function addMaterial(element) {
    var count = $('#code-material-table-body').children().length
    $('#code-material-table-body').append('\
        <tr materialid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.name + '</td>\
            <td></td>\
            <td>\
                <button id="code-material-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-material-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_delete</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-material-btn-add').click(() => {
    const code = $('#code-material-new-code').val()
    const name = $('#code-material-new-name').val()
    $('#code-material-new-code').val('')
    $('#code-material-new-name').val('')
    const item = {code, name}
    var jqxhr = $.post("http://localhost:8080/code/material/add", {
        item
    }, function (data, status) {
        addMaterial(item)
    })
})

$('#code-material-btn-edit').click(() => {
    const materialid = JSON.parse($('#code-material-btn-edit').attr('materialid'))
    const code = $('#code-material-edit-code').val()
    const name = $('#code-material-edit-name').val()
    const item = {materialid, code, name}

    var jqxhr = $.post("http://localhost:8080/code/material/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[materialid=' + materialid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(name)
    })
})