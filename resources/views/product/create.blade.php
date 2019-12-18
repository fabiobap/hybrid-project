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
                <h3 class="box-title">Product Form</h3>
            </div>
            @errors @enderrors
            @success @endsuccess
            <!-- /.box-header -->
            <form action="{{ route('products.store') }}" method="POST" class="needs-validation" role="form"
                enctype="multipart/form-data">
                <div class="box-body">
                    @csrf
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="file" id="image" name="image" required>

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
