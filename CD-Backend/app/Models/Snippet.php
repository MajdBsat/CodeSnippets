<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Snippet extends Model
{   use HasFactory;
    
    protected $fillable = ['content', 'language', 'keywords', 'isFavorite'];

    protected $casts = [
        'isFavorite' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tags()
    {
        return $this->hasMany(Tag::class);
    }
}
