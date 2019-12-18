<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function (Category $category) {
            $category->products()->delete();
        });
    }
}
