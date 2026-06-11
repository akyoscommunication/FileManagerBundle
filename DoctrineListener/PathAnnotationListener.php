<?php

namespace Akyos\FileManagerBundle\DoctrineListener;

use Akyos\FileManagerBundle\Annotations\PathAnnotation;
use Akyos\FileManagerBundle\Entity\File;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostUpdateEventArgs;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Events;
use ReflectionObject;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', lazy: true)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', lazy: true)]
class PathAnnotationListener
{
    public function prePersist(PrePersistEventArgs $args): void
    {
        $this->applyPathAnnotations($args->getObject(), $args->getObjectManager(), null);
    }

    public function postUpdate(PostUpdateEventArgs $args): void
    {
        $entity = $args->getObject();
        $em = $args->getObjectManager();
        $changeSet = $em->getUnitOfWork()->getEntityChangeSet($entity);

        $this->applyPathAnnotations($entity, $em, $changeSet);
    }

    private function applyPathAnnotations(object $entity, object $em, ?array $changeSet): void
    {
        $reflectionObject = new ReflectionObject($entity);
        $shouldFlush = false;

        foreach ($reflectionObject->getProperties() as $entityTargetProperty) {
            $attributes = $entityTargetProperty->getAttributes(PathAnnotation::class);
            if ([] === $attributes) {
                continue;
            }

            /** @var PathAnnotation $pathAnnotation */
            $pathAnnotation = $attributes[0]->newInstance();
            $sourcePropertyName = $pathAnnotation->getField();

            if (null !== $changeSet && !array_key_exists($sourcePropertyName, $changeSet)) {
                continue;
            }

            $fileIdGetterName = 'get' . ucfirst($sourcePropertyName);
            $targetPropertySetterName = 'set' . $entityTargetProperty->getName();
            $fileId = $entity->{$fileIdGetterName}();
            $file = $em->getRepository(File::class)->findOneBy(['id' => $fileId]);

            if ($file) {
                $entity->{$targetPropertySetterName}($file->getFile());
                $shouldFlush = null !== $changeSet;
            }
        }

        if ($shouldFlush) {
            $em->flush();
        }
    }
}
