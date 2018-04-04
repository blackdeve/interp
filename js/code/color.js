$(document).ready(function () {
    var jqxhr = $.get("http://localhost:8080/code/color", function (data, status) {
        const { items } = data
        console.log(items)
        items.forEach(element => {
            addColor(element)
        });
    });
});

$(document).on('click', '#code-color-item-edit', function () {
    var tr = $(this).parent().parent()
    const color_id = JSON.parse(tr.attr('colorid'))
    const code = tr.children().eq(1).text()
    const color = tr.children().eq(2).text()
    $('#code-color-edit-code').val(code)
    $('#code-color-edit-color').val(color)
    $('#code-color-btn-edit').attr('colorid', color_id)
});

$(document).on('click', '#code-color-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('colorid'))
    var jqxhr = $.post("http://localhost:8080/code/color/delete", {
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

function addColor(element) {
    var count = $('#code-color-table-body').children().length
    $('#code-color-table-body').append('\
        <tr colorid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.color + '</td>\
            <td></td>\
            <td>\
                <button id="code-color-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-color-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-color-btn-add').click(() => {
    const code = $('#code-color-new-code').val()
    const color = $('#code-color-new-color').val()
    $('#code-color-new-code').val('')
    $('#code-color-new-color').val('')
    const item = {code, color}
    var jqxhr = $.post("http://localhost:8080/code/color/add", {
        item
    }, function (data, status) {
        addColor(item)
    })
})

$('#code-color-btn-edit').click(() => {
    const colorid = JSON.parse($('#code-color-btn-edit').attr('colorid'))
    const code = $('#code-color-edit-code').val()
    const color = $('#code-color-edit-color').val()
    const item = {colorid, code, color}

    var jqxhr = $.post("http://localhost:8080/code/color/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[colorid=' + colorid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(color)
    })
})