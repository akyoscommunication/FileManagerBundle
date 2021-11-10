<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Akyos\FileManagerBundle\Service\UploadsService;
use SplFileInfo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\Stream;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/secured_files", name="file_")
 */
class SecuredFilesController extends AbstractController
{
	/**
	 * @Route("/download-secured-file", name="download_secured_file", methods={"GET"})
	 * @param Request $request
	 * @param UploadsService $uploadsService
	 * @param FileRepository $fileRepository
	 * @param PrivateSpaceRepository $privateSpaceRepository
	 * @return BinaryFileResponse|Response
	 */
	public function downloadSecuredFile(Request $request, UploadsService $uploadsService, FileRepository $fileRepository, PrivateSpaceRepository $privateSpaceRepository)
	{
		$path = urldecode($request->get('path'));
		$display = $request->get('display');
		/* @var File|null $file */
		$file = $fileRepository->findOneBy(['file' => $path]);
		$absolutePath = $uploadsService->getFilePathFromValue($path);
		
		if ($file) {
			
			if (!$this->isGranted('ROLE_SUPER_ADMIN')
                && (strpos($file->getFile(), '/secured_files') !== false)
                && (empty($file->getVisibility()) || !$file->getVisibility() || !($this->isGranted($file->getVisibility()) || in_array('ANONYMOUS', is_array($file->getVisibility()) ? $file->getVisibility() : [], true)))
                && strpos(substr(base64_encode($this->getUser() ? $this->getUser()->getUserIdentifier() . $this->getUser()->getSalt() : 'null'), 0, -2), $absolutePath) === false) {
                    return $this->render('@AkyosFileManager/file/error.html.twig', [
                        'message' => 'Vous n\'avez pas l\'autorisation d\'accéder à ce fichier.',
                    ]);
                }
			if (strpos($file->getFile(), '/private_spaces_files') !== false) {
				$explodeOnPrivateSpacesFiles = explode('/private_spaces_files/', $file->getFile());
				$explodeOnSlashes = explode('/', $explodeOnPrivateSpacesFiles[count($explodeOnPrivateSpacesFiles) - 1]);
				$privateSpaceSlug = $explodeOnSlashes[0];
				$privateSpace = $privateSpaceRepository->findOneBy(['slug' => $privateSpaceSlug]);
				if ($privateSpace
                    && !$this->isGranted($privateSpace->getRoles())
                    && (empty($file->getVisibility()) || !$file->getVisibility() || !($this->isGranted($file->getVisibility()) || in_array('ANONYMOUS', is_array($file->getVisibility()) ? $file->getVisibility() : [], true)))) {
                        return $this->render('@AkyosFileManager/file/error.html.twig', [
                            'message' => 'Vous n\'avez pas l\'autorisation d\'accéder à ce fichier.',
                        ]);
                    }
			}
		}
		
		$splFile = new SplFileInfo($absolutePath);
		
		if ($splFile->isFile()) {
			$stream = new Stream($absolutePath);
			$response = new BinaryFileResponse($stream);
			$response->headers->set('Cache-Control', 'private');
			$response->headers->set('Content-Disposition', $response->headers->makeDisposition(
				($display ? ResponseHeaderBag::DISPOSITION_INLINE : ResponseHeaderBag::DISPOSITION_ATTACHMENT),
				($file ? $file->getName() : $splFile->getFilename())
			));
			return $response;
		}

        throw $this->createNotFoundException("Le fichier n'existe pas.");
    }
}
