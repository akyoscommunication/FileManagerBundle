<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\FileManagerOptions;
use Akyos\FileManagerBundle\Form\Type\FileManagerOptionsType;
use Akyos\FileManagerBundle\Repository\FileManagerOptionsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/admin/file_manager/options', name: 'file_manager_options')]
#[IsGranted('options-du-gestionnaire-de-fichier')]
class FileManagerOptionsController extends AbstractController
{
    /**
     * @param FileManagerOptionsRepository $fileManagerOptionsRepository
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    #[Route(path: '/', name: '', methods: ['GET', 'POST'])]
    public function index(FileManagerOptionsRepository $fileManagerOptionsRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $fileManagerOptions = $fileManagerOptionsRepository->findAll();
        if (!$fileManagerOptions) {
            $fileManagerOptions = new FileManagerOptions();
        } else {
            $fileManagerOptions = $fileManagerOptions[0];
        }
        $form = $this->createForm(FileManagerOptionsType::class, $fileManagerOptions);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($fileManagerOptions);
            $entityManager->flush();

            return $this->redirectToRoute('file_manager_options');
        }
        return $this->render('@AkyosFileManager/file_manager_options/new.html.twig', ['file_manager_option' => $fileManagerOptions, 'form' => $form->createView(),]);
    }
}
