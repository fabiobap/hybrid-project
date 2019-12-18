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
                <h3 class="box-title">{{ $category->name }} - Edit Form</h3>
            </div>
            <!-- /.box-header -->
            <form action="{{ route('categories.update', ['category' => $category->id]) }}" method="POST"
                class="needs-validation" role="form">
                @csrf
                @method('PUT')
                @include('category._form')
            </form>
        </div>
        <!-- /.box -->
    </div>
</div>
@stop
@section('js')
@stop
