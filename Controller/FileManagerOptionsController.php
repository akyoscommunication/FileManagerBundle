<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\FileManagerOptions;
use Akyos\FileManagerBundle\Form\Type\FileManagerOptionsType;
use Akyos\FileManagerBundle\Repository\FileManagerOptionsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/admin/file_manager/options", name="file_manager_options")
 * @IsGranted("options-du-gestionnaire-de-fichier")
 */
class FileManagerOptionsController extends AbstractController
{
	/**
	 * @Route("/", name="", methods={"GET", "POST"})
	 * @param FileManagerOptionsRepository $fileManagerOptionsRepository
	 * @param Request $request
	 * @return Response
	 */
	public function index(FileManagerOptionsRepository $fileManagerOptionsRepository, Request $request): Response
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
			$entityManager = $this->getDoctrine()->getManager();
			$entityManager->persist($fileManagerOptions);
			$entityManager->flush();
			
			return $this->redirectToRoute('file_manager_options');
		}
		
		return $this->render('@AkyosFileManager/file_manager_options/new.html.twig', [
			'file_manager_option' => $fileManagerOptions,
			'form' => $form->createView(),
		]);
	}
}
