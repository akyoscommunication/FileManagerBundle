<?php

namespace Akyos\FileManagerBundle\DoctrineListener;

use Akyos\FileManagerBundle\Annotations\PathAnnotation;
use Akyos\FileManagerBundle\Entity\File;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\Common\Annotations\AnnotationRegistry;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PostUpdateEventArgs;
use Doctrine\ORM\Events;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use ReflectionObject;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', lazy: true)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', lazy: true)]
class PathAnnotationListener
{
    /**
     * @param PrePersistEventArgs $args
     * @return bool
     */
    public function prePersist(PrePersistEventArgs $args): bool
    {
        $entity = $args->getEntity();

        // Using reflection so we can inspect properties and their annotations later
        $reflectionObject = new ReflectionObject($entity);

        // TODO => Ca va être supprimé et autoloadé ça si j'ai bien compris mais pour l'instant faut laisser comme ça
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

    /**
     * @param PostUpdateEventArgs $args
     * @return bool
     * @throws ORMException
     * @throws OptimisticLockException|\Doctrine\ORM\ORMException
     */
    public function postUpdate(PostUpdateEventArgs $args): bool
    {
        $entity = $args->getEntity();

        // Using reflection so we can inspect properties and their annotations later
        $reflectionObject = new ReflectionObject($args->getObject());

        // TODO => Ca va être supprimé et autoloadé ça si j'ai bien compris mais pour l'instant faut laisser comme ça
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
