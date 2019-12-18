@errors @enderrors
@success @endsuccess
<!-- form start -->
<div class="box-body">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Enter a name"
            value="{{ old('name', $category->name ?? null) }}">
    </div>
</div>
<!-- /.box-body -->

<div class="box-footer">
    <button type="submit" class="btn btn-primary">Submit</button>
</div>
