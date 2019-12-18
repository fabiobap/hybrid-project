@extends('adminlte::page')

@section('title', 'Categories')

@section('content_header')
<h1>Categories</h1>
@stop

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Hover Data Table</h3>
            </div>
            <div class="box-body">
                    @errors @enderrors
                    @success @endsuccess
                <div class="data-tables">
                    <input type="hidden" id="columns" value="name,qtProducts,action">
                    <input type="hidden" id="baseurldatatable" value="{{ URL::to('blade/categories') }}">
                    <input type="hidden" id="baseurlapi" value="{{ URL::to('api/v1/react/categories/') }}">
                    <input type="hidden" id="requestType" value="DELETE">
                    <table class="table table-striped table-bordered" style="width:100%" id="datatable">
                        <thead class="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>How many products registered</th>
                                <th width="100px">Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@include('components.modal')
@stop
@section('js')
<script src="{{ url('js/datatables/datatable-padrao.js') }}"></script>
<script src="{{ url('js/datatables/form-delete.js') }}"></script>
@stop
