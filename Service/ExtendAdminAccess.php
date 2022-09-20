<?php
/**
namespace Akyos\FileManagerBundle\Service;

use Akyos\CmsBundle\Entity\AdminAccess;
use Akyos\CmsBundle\Repository\AdminAccessRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class ExtendAdminAccess
{
    private AdminAccessRepository $adminAccessRepository;

    private EntityManagerInterface $entityManager;

    public function __construct(AdminAccessRepository $adminAccessRepository, EntityManagerInterface $entityManager)
    {
        $this->adminAccessRepository = $adminAccessRepository;
        $this->entityManager = $entityManager;
    }

    public function setDefaults(): Response
    {
        if (!$this->adminAccessRepository->findOneBy(['name' => 'Gestion des fichiers'])) {
            $adminAccess = new AdminAccess();
            $adminAccess->setName('Gestion des fichiers')->setRoles([])->setIsLocked(true);
            $this->entityManager->persist($adminAccess);
            $this->entityManager->flush();
        }
        if (!$this->adminAccessRepository->findOneBy(['name' => 'Options du Gestionnaire de fichier'])) {
            $adminAccess = new AdminAccess();
            $adminAccess->setName('Options du Gestionnaire de fichier')->setRoles([])->setIsLocked(true);
            $this->entityManager->persist($adminAccess);
            $this->entityManager->flush();
        }

        return new Response('true');
    }
}
**/
