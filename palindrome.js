(function($) {
    "use strict";

    var // Const
          CHECKEDOK         = $(document.createElement('span')).addClass('glyphicon').addClass('glyphicon-ok').addClass('isOk')
        , CHECKEDNOTOK      = $(document.createElement('span')).addClass('glyphicon').addClass('glyphicon-remove').addClass('isError')
        , CHECKEDPROCESS    = $(document.createElement('span')).addClass('glyphicon').addClass('glyphicon-minus').addClass('isProcess')
        , TEXTNOTPALINDROME = $(document.createElement('span')).text('Please, insert palindrome').addClass('isTextError')
        , TEXTPALINDROMEONE = $(document.createElement('span')).text('Of course is palindrome. Length is 1. Fool...').addClass('isTextOk')
        // Function
        , palindromeTemplate = function($form, method) {
            var   // Tag
                  $input  = $form.find('input')
                , $button = $form.find('button')
                , $checked = $form.find('div.checked')
                , $output = $form.find('div.output')
                  // Value
                , inputValue
                  // Function
                , checkPalindrome = function() {
                    //default
                    inputValue = $input.val();
                    $checked.html('');
                    $output.html('');

                    //check empty
                    if(!inputValue) {
                        CHECKEDNOTOK.clone().appendTo($checked);
                        TEXTNOTPALINDROME.clone().appendTo($output);
                        return;
                    }

                    //check length is 1
                    if((inputValue+"").length === 1) {
                        CHECKEDOK.clone().appendTo($checked);
                        TEXTPALINDROMEONE.clone().appendTo($output);
                        return;
                    }

                    //call different methods. cast value to string
                    switch(true) {
                        case (method === 'methodOne'):
                            palindromeMethodOne(inputValue+"", $checked, $output);
                            break;
                        case (method === 'methodTwo'):
                            palindromeMethodTwo(inputValue+"", $checked, $output);
                            break;
                    }
                }
                ;

            //event
            $button.on('click', checkPalindrome);
        }
        , palindromeMethodOne = function(value, $checked, $output) {
            //This method compare string from outside to inside in a loop
            var // Vars
                  length    = value.length
                , middle    = parseInt(length/2)
                , timing    = 300
                , i         = 0
                , first
                , last
                , status
                // Function
                , checkLoop = function() {
                    setTimeout(function(){
                        //check status
                        switch(true) {
                            case status === 'isError':
                                $output.find('span.first').removeClass('isProcess').addClass('isError');
                                $output.find('span.first').next().removeClass('isProcess').addClass('isError');
                                $checked.html('');
                                CHECKEDNOTOK.clone().appendTo($checked);
                                return;
                            case status === 'isOk':
                                $output.find('span.first').removeClass('isProcess').addClass('isOk');
                                $output.find('span.first').next().removeClass('isProcess').addClass('isOk');
                                break;
                            case status === 'isOkEnded':
                                $output.find('span.first').removeClass('isProcess').addClass('isOk');
                                $output.find('span.first').next().removeClass('isProcess').addClass('isOk');
                                $checked.html('');
                                CHECKEDOK.clone().appendTo($checked);
                                return;
                        }

                        //compared element spans
                        first = $(document.createElement('span')).text(value[i])
                            .addClass('first')
                            .addClass('isProcess');

                        last = $(document.createElement('span')).text(value[length-(i+1)])
                            .addClass('isProcess');

                        //append to output
                        if(!$output.html().length)
                            $output.append(first);
                        else
                            $output.find('span.first').removeClass('first').after(first);

                        $output.find('span.first').after(last);

                        //do status
                        switch(true) {
                            case value[i] !== value[length-(i+1)]:
                                status = 'isError';
                                break;
                            case (i+1 === middle):
                                status = 'isOkEnded';
                                break;
                            default:
                                status = 'isOk';
                        }

                        //wait for each comparison
                        i++;
                        if(i<=middle)
                            checkLoop(status);

                    }, timing);
                }
                ;

            //start the process
            CHECKEDPROCESS.clone().appendTo($checked);
            checkLoop();
        }
        , palindromeMethodTwo = function(value, $checked, $output) {
            //This method compare string from outside to inside in a loop
            $checked.html('');
            CHECKEDNOTOK.clone().appendTo($checked);
            $output.html('Not implemented');
        };

    var $formMethodOne = $('#method-one'),
        $formMethodTwo = $('#method-two');

    palindromeTemplate($formMethodOne, 'methodOne');
    palindromeTemplate($formMethodTwo, 'methodTwo');

})(jQuery);