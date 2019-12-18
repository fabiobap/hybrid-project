@extends('adminlte::page')

@section('title', 'Products')

@section('content_header')
<h1>Products</h1>
@stop

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">{{ $product->name }} - Edit Form</h3>
            </div>
            @errors @enderrors
            @success @endsuccess
            <!-- /.box-header -->
            <img class="img-responsive" width="250px" height="150px" src="{{ $product->image }}" alt="Photo">
            <form action="{{ route('products.update', ['product' => $product->id]) }}" method="POST"
                class="needs-validation" role="form" enctype="multipart/form-data">
                <div class="box-body">
                    @csrf
                    @method('PUT')
                    <div class="form-group">
                        <label for="newImage">Image</label>
                        <input type="file" id="newImage" name="newImage" required>

                        <p class="help-block">Please select an image. (supported formats: png, jpg, jpeg, bmp, gif)</p>
                    </div>
                    @include('product._form')
                </div>
            </form>
        </div>
        <!-- /.box -->
    </div>
</div>
@stop
@section('js')
@stop
