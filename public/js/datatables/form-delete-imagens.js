function modalDeleteAction(id){

    $('#id').val(id);
    $('#form-delete-imagens').attr('action', "/imagens/"+id);

}
