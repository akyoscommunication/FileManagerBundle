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
    /**
     * Any public properties become valid options for the annotation.
     * Then, use these is your validator class.
     * @var string
     */
    public $message = 'The value "{{ value }}" is not valid.';

    public $types = [];

    public function __construct($options = null)
    {
        parent::__construct($options);
    }
}
