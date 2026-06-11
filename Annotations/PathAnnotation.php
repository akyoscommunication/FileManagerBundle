<?php

namespace Akyos\FileManagerBundle\Annotations;

use Attribute;

#[Attribute(Attribute::TARGET_PROPERTY)]
class PathAnnotation
{
    public function __construct(
        private readonly string $field = '',
    ) {
    }

    public function getField(): string
    {
        return $this->field;
    }
}
