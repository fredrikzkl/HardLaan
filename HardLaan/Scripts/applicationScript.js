$(document).ready(function () {
    alert("hello");
    $('.popover').popover('show');

    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });
});