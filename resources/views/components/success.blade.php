@if (session()->has('status'))
    <div class="mt-2 mb-2">
        <div class="alert alert-success" role="alert">
                {{ session()->get('status') }}
        </div>
    </div>
@endif
