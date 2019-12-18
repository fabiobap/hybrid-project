
$( document ).ready(function() {
    var regex = /\.(jpe?g|png|gif|mpeg|ogg|mp4|webm|3gp|mov|flv|avi|wmv|mkv)$/i;

    function modalTamanhoExcedido(){

        let modal = $("#modalConfirmaDeletado");
        $("#TituloModalCentralizado").text($("#titleFichaCriminal").text());
        modal.modal('show');
        $("#modal-confirma").remove();
        $("#modal-texto").text('Arquivo atingiu o limite de 8mb');
    }

    function modalFormatoIncorreto(fileName){

        let modal = $("#modalConfirmaDeletado");
        $("#TituloModalCentralizado").text($("#titleFichaCriminal").text());
        modal.modal('show');
        $("#modal-confirma").remove();
        $("#modal-texto").text(fileName + ' não é uma imagem, apenas formato (jpg, gif, png, bmp)');
    }
    document.querySelector('#imagem').addEventListener("change", previewImages, false);

    function previewImages() {

        var preview = $('#preview');

        if (this.files) {
            [].forEach.call(this.files, readAndPreview);
        }
    function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if (!regex.test(file.name)) {
                return modalFormatoIncorreto(file.name);
            } // else...

            var reader = new FileReader();

            reader.addEventListener("load", function() {
            var image = new Image();
            image.height = 150;
            image.width = 150;
            image.title  = file.name;
            image.src    = this.result;
            var div = document.createElement('div');
            var imgHolder = document.createElement('div');

            $(imgHolder).addClass('img-holder');
            $(div).addClass('p-2');
            $(image).addClass('img-thumbnail img-fluid rounded');
            $(imgHolder).append('<a class="link" style="color:red;" onClick="removeImg(this)"><i class="fa fa-times-circle fa-lg"></i></a>');
            $(imgHolder).append(image);
            $(div).append(imgHolder);
            preview.append(div);
            }, false);

            reader.readAsDataURL(file);

        }
    }
    //binds to onchange event of your input field
    $('#imagem').bind('change', function() {
        let total = 0;
        let tamanhoTotal = 8000000;

        for(var i = 0; i < this.files.length; i++){

            total = total + this.files[i].size;
        }

        if(total > tamanhoTotal){

            modalTamanhoExcedido();
            total = 0;
            $("#btnEnviar").prop("disabled",true);
            $('#imagem').val(null);
            $('#preview').empty();
        }else{
            $("#btnEnviar").prop("disabled",false);
        }
    });
});
function removeImg(elemento){
    $(elemento).closest('div').remove();
}
