@extends('adminlte::page')

@section('title', 'Products')

@section('content_header')
<h1>Product</h1>
@stop

@section('content')
<div class="row">
    <div class="col-xs-6">
        <div class="box">
            <div class="box box-primary box-solid">
                <div class="box-header with-border">
                  <h3 class="box-title">{{ $product->name }}</h3>

                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <!-- /.box-tools -->
                </div>
                <!-- /.box-header -->
                <div class="box-body text-center">
                <p><img src="{{$product->image}}"></p>
                    <p>Product code: #{{$product->prodCod}}</p>
                    <p>Category: {{$product->category->name}}</p>
                    <p>Description: {{$product->description}}</p>
                </div>
                <!-- /.box-body -->
              </div>
        </div>
    </div>
</div>
@stop
@section('js')
<script src="{{ url('js/datatables/datatable-padrao.js') }}"></script>
<script src="{{ url('js/datatables/form-delete.js') }}"></script>
@stop
