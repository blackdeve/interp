$(document).ready(function () {
    var jqxhr = $.get("http://18.217.120.229:8080/code/user", function (data, status) {
        const { items } = data
        items.forEach((element, idx) => {
            addUser(element, idx)
        });
    });
});

function addUser(element, idx) {
    $('#code-user-table-body').append('\
        <tr>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + (idx+1) + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + element.name + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + element.username + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + element.secret_number + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + element.phone_number + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + element.email + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + (element.activate.data[0] ? 'True' : 'False') + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + (element.user_type.data[0] ? 'True' : 'False') + '</td>\
            <td style="cursor:pointer;" onClick="location.href=' + "'view.html'" + '">' + (element.user_add_right.data[0] ? 'True' : 'False') + '</td>\
        </tr>\
    ')
}