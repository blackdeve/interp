$(document).ready(function () {
    var jqxhr = $.get("http://18.217.120.229:8080/code/fabric", function (data, status) {
        const { items } = data
        items.forEach(element => {
            addFabric(element)
        });
    });
});

$(document).on('click', '#code-fabric-item-edit', function () {
    var tr = $(this).parent().parent()
    const fabric_id = JSON.parse(tr.attr('fabricid'))
    const code = tr.children().eq(1).text()
    const name = tr.children().eq(2).text()
    $('#code-fabric-edit-code').val(code)
    $('#code-fabric-edit-name').val(name)
    $('#code-fabric-btn-edit').attr('fabricid', fabric_id)
});

$(document).on('click', '#code-fabric-item-delete', function () {
    var tr = $(this).parent().parent()
    const id = JSON.parse(tr.attr('fabricid'))
    var jqxhr = $.post("http://18.217.120.229:8080/code/fabric/delete", {
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

function addFabric(element) {
    var count = $('#code-fabric-table-body').children().length
    $('#code-fabric-table-body').append('\
        <tr fabricid="' + element.id + '">\
            <td>' + (count + 1) + '</td>\
            <td>' + element.code + '</td>\
            <td>' + element.name + '</td>\
            <td></td>\
            <td>\
                <button id="code-fabric-item-edit" type="button" class="btn btn-link" data-toggle="modal" data-target="#modify">\
                    <i class="material-icons">mode_edit</i>\
                </button>\
            </td>\
            <td>\
                <button id="code-fabric-item-delete" type="button" class="btn btn-link">\
                    <i class="material-icons">mode_delete</i>\
                </button>\
            </td>\
        </tr>\
    ')
}

$('#code-fabric-btn-add').click(() => {
    const code = $('#code-fabric-new-code').val()
    const name = $('#code-fabric-new-name').val()
    $('#code-fabric-new-code').val('')
    $('#code-fabric-new-name').val('')
    const item = {code, name}
    var jqxhr = $.post("http://18.217.120.229:8080/code/fabric/add", {
        item
    }, function (data, status) {
        addFabric(item)
    })
})

$('#code-fabric-btn-edit').click(() => {
    const fabricid = JSON.parse($('#code-fabric-btn-edit').attr('fabricid'))
    const code = $('#code-fabric-edit-code').val()
    const name = $('#code-fabric-edit-name').val()
    const item = {fabricid, code, name}

    var jqxhr = $.post("http://18.217.120.229:8080/code/fabric/edit", {
        item
    }, function (data, status) {
        var tr = $('tr[fabricid=' + fabricid + ']')
        tr.children().eq(1).text(code)
        tr.children().eq(2).text(name)
    })
})