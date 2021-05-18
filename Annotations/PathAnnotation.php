<?php

namespace Akyos\FileManagerBundle\Annotations;

use Doctrine\Common\Annotations\Annotation;

/**
 * @Annotation
 * @Target("PROPERTY")
 */
class PathAnnotation
{
	private $field;

	public function __construct(array $values)
	{
		$this->field = $values['field'];
	}

	public function getField()
	{
		return $this->field;
	}

}
