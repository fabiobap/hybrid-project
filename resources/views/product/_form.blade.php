<div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" name="name" placeholder="Enter a name"
        value="{{ old('name', $product->name ?? null) }}" required autofocus>
</div>
<div class="form-group">
    <label>Category</label>
    <select class="form-control" name="category_id" id='category_id' required>
        @foreach ($categories as $category)
        <option value="{{ $category->id }}"
            {{ old('category_id', $product->category_id ?? null) !== $category->id ?: 'selected' }}>
            {{ $category->name }}
        </option>
        @endforeach
    </select>
</div>
<div class="form-group">
    <label for="prodCod">Product's code</label>
    <input type="text" class="form-control" id="prodCod" name="prodCod" placeholder="Enter a code for the product"
        value="{{ old('prodCod', $product->prodCod ?? null) }}" required>
</div>
<div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" rows="3" name="description" id="description"
        placeholder="Enter ...">{{ old('description', $product->description ?? null) }}</textarea>
</div>

<div class="box-footer">
    <button type="submit" class="btn btn-primary">Submit</button>
</div>
