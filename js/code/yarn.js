$(document).ready(function () {
    var jqxhr = $.get("http://18.217.120.229:8080/code/yarn", function (data, status) {
        const { items } = data
        items.forEach(element => {
            addYarn(element)
        });
    });
});

$(document).on('click', '#code-yarn-item-edit', function () {
    var tr = $(this).parent().parent()
    const yarn_id = JSON.parse(tr.attr('yarnid'))
    const code = tr.children().eq(1).text()
    const name = tr.children().eq(2).text()
    $('#code-yarn-edit-code').val(code)
    $('#code-yarn-edit-name').val(name)
    $('#code-yarn-btn-edit').attr('yarnid', yarn_id)
});

$(document).on('click', '#code-yarn-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('yarnid'))
    var jqxhr = $.post("http://18.217.120.229:8080/code/yarn/delete", {
        id
    }, function (data, status) {
        const no = JSON.parse(tr.children().eq(0).text()) - 1
        var tbody = tr.parent()
        tr.remove()
        const count = tbody.children().length
        for (var i = no; i < count; i++) {
            const num = JSON.parse(tbody.children().eq(i).children().eq(0).text()) - 1
            tbody.children().eq(i).children().eq(0).text(num)
        }
    })
});

function addYarn(element) {
    var count = $('#code-yarn-table-body').children().length
    $('#code-yarn-table-body').append('\
        <tr yarnid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.name + '</td>\
            <td></td>\
            <td>\
                <button id="code-yarn-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-yarn-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_delete</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-yarn-btn-add').click(() => {
    const code = $('#code-yarn-new-code').val()
    const name = $('#code-yarn-new-name').val()
    $('#code-yarn-new-code').val('')
    $('#code-yarn-new-name').val('')
    const item = {code, name}
    var jqxhr = $.post("http://18.217.120.229:8080/code/yarn/add", {
        item
    }, function (data, status) {
        addYarn(item)
    })
})

$('#code-yarn-btn-edit').click(() => {
    const yarnid = JSON.parse($('#code-yarn-btn-edit').attr('yarnid'))
    const code = $('#code-yarn-edit-code').val()
    const name = $('#code-yarn-edit-name').val()
    const item = {yarnid, code, name}

    var jqxhr = $.post("http://18.217.120.229:8080/code/yarn/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[yarnid=' + yarnid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(name)
    })
})