@extends('adminlte::page')

@section('title', 'Categories')

@section('content_header')
<h1>Categories</h1>
@stop

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Category Form</h3>
            </div>
            <!-- /.box-header -->
            <form action="{{ route('categories.store') }}" method="POST"
                class="needs-validation" role="form">
                @csrf
                @include('category._form')
            </form>
        </div>
        <!-- /.box -->
    </div>
</div>
@stop
@section('js')
@stop
