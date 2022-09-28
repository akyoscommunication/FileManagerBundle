<?php

namespace Akyos\FileManagerBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class ExtendAdminAccess
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function setDefaults(): Response
    {
        $entity = 'Akyos\\CmsBundle\\Entity\\AdminAccess';
        if(class_exists($entity)) {
            if (!$this->entityManager->getRepository($entity)->findOneBy(['name' => 'Gestion des fichiers'])) {
                $adminAccess = new $entity();
                $adminAccess->setName('Gestion des fichiers')->setRoles([])->setIsLocked(true);
                $this->entityManager->persist($adminAccess);
                $this->entityManager->flush();
            }
            if (!$this->entityManager->getRepository($entity)->findOneBy(['name' => 'Options du Gestionnaire de fichier'])) {
                $adminAccess = new $entity();
                $adminAccess->setName('Options du Gestionnaire de fichier')->setRoles([])->setIsLocked(true);
                $this->entityManager->persist($adminAccess);
                $this->entityManager->flush();
            }
        }

        return new Response('true');
    }
}
