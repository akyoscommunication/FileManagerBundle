<?php
namespace Akyos\FileManagerBundle\Service;

use Akyos\CoreBundle\Entity\AdminAccess;
use Akyos\CoreBundle\Repository\AdminAccessRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class ExtendAdminAccess
{
    private $adminAccessRepository;
    private $entityManager;

    public function __construct(AdminAccessRepository $adminAccessRepository, EntityManagerInterface $entityManager)
    {
        $this->adminAccessRepository = $adminAccessRepository;
        $this->entityManager = $entityManager;
    }

    public function setDefaults()
    {
        if (!$this->adminAccessRepository->findOneByName("Gestion des fichiers"))
        {
            $adminAccess = new AdminAccess();
            $adminAccess
                ->setName('Gestion des fichiers')
                ->setRoles([])
                ->setIsLocked(true)
            ;
            $this->entityManager->persist($adminAccess);
            $this->entityManager->flush();
        }
        if (!$this->adminAccessRepository->findOneByName("Options du Gestionnaire de fichier"))
        {
            $adminAccess = new AdminAccess();
            $adminAccess
                ->setName('Options du Gestionnaire de fichier')
                ->setRoles([])
                ->setIsLocked(true)
            ;
            $this->entityManager->persist($adminAccess);
            $this->entityManager->flush();
        }

        return new Response('true');

    }
}