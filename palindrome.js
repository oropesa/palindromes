(function($) {
    "use strict";

    var polindromeTemplate = function($form, method) {
        var   $input  = $form.find('input')
            , $button = $form.find('button')
            , $output = $form.find('div')
            , value   //the value of input
            , checkPolindrome = function() {
                value = $input.val();

                switch(true) {
                    case (method === 'methodOne'):
                        console.log(method, value);
                        break;
                    case (method === 'methodTwo'):
                        console.log(method, value);
                        break;
                }
            }
            ;

        $button.on('click', checkPolindrome);
    };

    var $formMethodOne = $('#method-one'),
        $formMethodTwo = $('#method-two');

    polindromeTemplate($formMethodOne, 'methodOne');
    polindromeTemplate($formMethodTwo, 'methodTwo');

})(jQuery);