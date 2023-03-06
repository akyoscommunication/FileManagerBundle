<?php

namespace Akyos\FileManagerBundle\DoctrineListener;

use Akyos\FileManagerBundle\Annotations\PathAnnotation;
use Akyos\FileManagerBundle\Entity\File;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\Common\Annotations\AnnotationRegistry;

class PathAnnotationListener
{
	public function prePersist(LifecycleEventArgs $args)
	{
		$entity = $args->getEntity();

		// Using reflection so we can inspect properties and their annotations later
		$reflectionObject = new \ReflectionObject($entity);

		AnnotationRegistry::registerUniqueLoader('class_exists');

		$reader = new AnnotationReader;

		// Iterate over properties to find those targeted by a @PathAnnotation
		foreach ($reflectionObject->getProperties() as $entityTargetProperty) {

			// This will be null if the property does not have an @PathAnnotation on it
			$pathAnnotation = $reader->getPropertyAnnotation($entityTargetProperty, PathAnnotation::class);

			if (null !== $pathAnnotation) {
				$sourcePropertyName = $pathAnnotation->getField();

				$fileIdGetterName = 'get' . ucfirst($sourcePropertyName);
				$targetPropertySetterName = 'set' . $entityTargetProperty->getName();

				$fileId = $entity->{$fileIdGetterName}();

				$em = $args->getEntityManager();
				$file = $em->getRepository(File::class)->findOneBy(['id' => $fileId]);

				if ($file) {
					$entity->{$targetPropertySetterName}($file->getFile());
				}
			}
		}

		return true;
	}

	public function postUpdate(LifecycleEventArgs $args)
	{
		$entity = $args->getEntity();

		// Using reflection so we can inspect properties and their annotations later
		$reflectionObject = new \ReflectionObject($args->getObject());

		AnnotationRegistry::registerUniqueLoader('class_exists');

		$reader = new AnnotationReader;

		// Iterate over properties to find those targeted by a @PathAnnotation
		foreach ($reflectionObject->getProperties() as $entityTargetProperty) {

			// This will be null if the property does not have an @PathAnnotation on it
			$pathAnnotation = $reader->getPropertyAnnotation($entityTargetProperty, PathAnnotation::class);

			if (null !== $pathAnnotation) {

				$em = $args->getEntityManager();
				$unitOfWork = $em->getUnitOfWork();
				$changeSet = $unitOfWork->getEntityChangeSet($entity);

				$sourcePropertyName = $pathAnnotation->getField();
				$isPropertyUpdated = array_key_exists($sourcePropertyName, $changeSet);

				if ($isPropertyUpdated) {
					$getterName = 'get' . ucfirst($pathAnnotation->getField());
					$setterName = 'set' . $entityTargetProperty->getName();

					$fileId = $entity->{$getterName}();

					$file = $em->getRepository(File::class)->findOneBy(['id' => $fileId]);

					if ($file) {
						$entity->{$setterName}($file->getFile());

						$em->flush();
					}
				}
			}
		}

		return true;
	}
}
