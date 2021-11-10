<?php

namespace Akyos\FileManagerBundle\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * Class MimeConstraint
 * @Annotation
 * @package Akyos\FileManagerBundle\Validator
 */
class MimeConstraint extends Constraint
{
    public string $message = 'Le fichier "{{ value }}" n\'est pas un fichier valide. Types de fichiers autorisés : {{ types }}.';
    public array $types = [];

    public function __construct($options = null)
    {
        parent::__construct($options);
    }
}
