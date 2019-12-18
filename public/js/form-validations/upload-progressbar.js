function validate(formData, jqForm, options) {
    var form = jqForm[0];
    if(!$("#apelido").length || !$("#local").length){
        if (!form.imagem.value) {
            alert('Arquivo não encontrado, por favor escolha um arquivo!');
            return false;
        }
    }
}
$(document).ready(function(){
    let api_token = $('#api_token').val();
    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'Authorization': 'Bearer '+api_token,
        'Accept': 'application/json',
    },
});
    $('form').ajaxForm({
        beforeSubmit: validate,
        resetForm:true,
        beforeSend:function(){
        $('#message').empty();
        $('.progress-bar').removeClass("bg-danger");
        },
        uploadProgress:function(event, position, total, percentComplete)
        {
        $('.progress-bar').text(percentComplete + '%');
        $('.progress-bar').css('width', percentComplete + '%');
        },
        success: function()
        {
            $('.progress-bar').text('Aguarde um momento...');
            $('.progress-bar').css('width', '100%');
        },
        complete: function(xhr) {
            var responseText = jQuery.parseJSON(xhr.responseText);
            if(responseText.success){
                $('.progress-bar').text('Uploaded com sucesso!');
                $('.progress-bar').css('width', '100%');
                $("#message").text(responseText.success).addClass('alert-success');
                setTimeout(() => {
                    $("#message").text('').removeClass('alert-success');
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width', '10%');
                }, 7000);
            }
            if(responseText.error){
                $('.progress-bar').addClass("bg-danger");
                $('.progress-bar').text('Error!');
                $('.progress-bar').css('width', '100%');
                $("#message").text(responseText.error).addClass('alert-danger');
                setTimeout(() => {
                    $("#message").text('').removeClass('alert-danger');
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width', '10%');
                }, 7000);
            }
            if(responseText.message){
                $('.progress-bar').addClass("bg-danger");
                $('.progress-bar').text('Error!');
                $('.progress-bar').css('width', '100%');
                $("#message").text(responseText.message).addClass('alert-danger');
                setTimeout(() => {
                    $("#message").text('').removeClass('alert-danger');
                    $('.progress-bar').text('0%');
                    $('.progress-bar').css('width', '10%');
                }, 7000);
            }
            var posicaoMessageDiv = $('#message').offset().top;
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: posicaoMessageDiv
                },2000);
            }, 2000);
        }
    });
});
