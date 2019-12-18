@extends('adminlte::page')

@section('title', 'AdminLTE')

@section('content_header')
<h1>Home</h1>
@stop

@section('content')
<div class="box box-solid box-primary">
    <div class="box-header">
        <h3 class="box-title">Welcome to the blade view of this project!</h3>
    </div><!-- /.box-header -->
    <div class="box-body">
        This view layout was made using <a href="https://github.com/jeroennoten/Laravel-AdminLTE">AdminLTE</a> for laravel
    </div><!-- /.box-body -->
</div>
<div class="info-box">
    <!-- Apply any bg-* class to to the icon to color it -->
    <span class="info-box-icon bg-yellow"><i class="fa fa-user-lock"></i></span>
    <div class="info-box-content">
        <span class="info-box-text">You can access any table but authentication is required for the actions!</span>
        <span class="info-box-number">If you know me, you probably know the password tho ;)</span>
    </div><!-- /.info-box-content -->
</div><!-- /.info-box -->
<div class="info-box">
    <!-- Apply any bg-* class to to the icon to color it -->
    <span class="info-box-icon bg-red"><i class="fa fa-eye"></i></span>
    <div class="info-box-content">
        <span class="info-box-text">You can access the react view of this project</span>
        <span class="info-box-number">By clicking in <a href="/react/home">Here</a></span>
    </div><!-- /.info-box-content -->
</div><!-- /.info-box -->
<div class="info-box">
    <!-- Apply any bg-* class to to the icon to color it -->
    <span class="info-box-icon bg-aqua"><i class="fab fa-github"></i></span>
    <div class="info-box-content">
        <span class="info-box-text">You can access the code of this project on my github</span>
        <span class="info-box-number">By clicking in <a href="https://github.com/fabiobap/hybrid-project">Here</a></span>
    </div><!-- /.info-box-content -->
</div><!-- /.info-box -->
@stop
