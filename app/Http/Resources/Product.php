<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'prodCod' => wordwrap($this->prodCod, 10, "\n",true),
            'description' => $this->description,
            'image' => $this->image,
            'category' => new Category($this->category),
            'category_id' => $this->category_id
        ];
    }
}
