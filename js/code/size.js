$(document).ready(function () {
    var jqxhr = $.get("http://localhost:8080/code/size", function (data, status) {
        const { items } = data
        console.log(items)
        items.forEach(element => {
            addSize(element)
        });
    });
});

$(document).on('click', '#code-size-item-edit', function () {
    var tr = $(this).parent().parent()
    const size_id = JSON.parse(tr.attr('sizeid'))
    const code = tr.children().eq(1).text()
    const size = tr.children().eq(2).text()
    $('#code-size-edit-code').val(code)
    $('#code-size-edit-size').val(size)
    $('#code-size-btn-edit').attr('sizeid', size_id)
});

$(document).on('click', '#code-size-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('sizeid'))
    var jqxhr = $.post("http://localhost:8080/code/size/delete", {
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

function addSize(element) {
    var count = $('#code-size-table-body').children().length
    $('#code-size-table-body').append('\
        <tr sizeid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.size + '</td>\
            <td></td>\
            <td>\
                <button id="code-size-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-size-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_delete</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-size-btn-add').click(() => {
    const code = $('#code-size-new-code').val()
    const size = $('#code-size-new-size').val()
    $('#code-size-new-code').val('')
    $('#code-size-new-size').val('')
    const item = {code, size}
    var jqxhr = $.post("http://localhost:8080/code/size/add", {
        item
    }, function (data, status) {
        addSize(item)
    })
})

$('#code-size-btn-edit').click(() => {
    const sizeid = JSON.parse($('#code-size-btn-edit').attr('sizeid'))
    const code = $('#code-size-edit-code').val()
    const size = $('#code-size-edit-size').val()
    const item = {sizeid, code, size}

    var jqxhr = $.post("http://localhost:8080/code/size/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[sizeid=' + sizeid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(size)
    })
})