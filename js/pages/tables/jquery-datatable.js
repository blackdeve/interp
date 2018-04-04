$(function () {
    $('.js-table-detailview').DataTable({

        responsive: true
    });
    $('.js-basic-example').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    });

    $('.js-basic').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [

        ]
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});
