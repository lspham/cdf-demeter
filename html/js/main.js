/**
 * Demeter
 *
 * @copyright Jul 2015
 */

(function () {
    $(document).on('ready', function () {
        $('.btn.register').on('click', function (e) {
            e.preventDefault();
            $('.modal').fadeIn(function () {
                $(this).find('input[type="email"]').focus();
            });
        });

        $('.btn.cancel').on('click', function (e) {
            e.preventDefault();
            $('.modal').fadeOut();
        });

        $(document).on('submit', 'form', function (e) {
            if ($('input[type="email"]').val() == '') {
                e.preventDefault();
                $('.modal label').fadeIn();
            } else {
                $('.modal label').fadeOut();
            }
        });
    });
})();