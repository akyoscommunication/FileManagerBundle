<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Form\MoveType;
use Akyos\FileManagerBundle\Form\NameFolderFormType;
use Akyos\FileManagerBundle\Form\EditFileType;
use Akyos\FileManagerBundle\Form\UploadType;
use Akyos\FileManagerBundle\Form\Handler\FileHandler;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Akyos\FileManagerBundle\Service\UploadsService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\Stream;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/file-manager", name="file_")
 */
class FileController extends AbstractController
{
	/**
	 * @Route("/", name="index", methods={"GET","POST"})
	 * @param FileHandler $fileHandler
	 * @param Request $request
	 * @param UploadsService $uploadsService
	 * @param Filesystem $filesystem
	 * @param FileRepository $fileRepository
	 * @param PrivateSpaceRepository $privateSpaceRepository
	 * @return Response
	 */
	public function index(FileHandler $fileHandler, Request $request, UploadsService $uploadsService, Filesystem $filesystem, FileRepository $fileRepository, PrivateSpaceRepository $privateSpaceRepository): Response
	{
		$files = null;
		$directories = null;
		$relativePath = $request->get('path');
		
		$privateSpaceId = $request->get('private_space');
		$privateSpace = $privateSpaceRepository->find($privateSpaceId ? $privateSpaceId : 0);
		
		$view = $request->get('view') ? $request->get('view') : "public";
		
		$rootFilesPath = $uploadsService->getRootFilesPath($view, false, $privateSpace);
		$relativeRootFilesPath = $uploadsService->getRootFilesPath($view, true, $privateSpace);
		
		if (!$rootFilesPath) {
			return $this->render('@AkyosFileManager/file/error.html.twig', [
				'message' => 'Vous n\'avez pas l\'autorisation d\'accéder à ce dossier.',
			]);
		}
		
		$finder = new Finder();
		
		$uploadFileForm = $this->createForm(UploadType::class);
		$nameFolderFormType = $this->createForm(NameFolderFormType::class);
		
		$moveFormType = $this->createForm(MoveType::class, null, array(
			'directories' => $finder->files()->in($rootFilesPath)->directories(),
			'racine' => $rootFilesPath
		));
		
		if ($fileHandler->uploadFile($uploadFileForm, $request)) {
			return $this->redirectToRoute('file_index', ['path' => $relativePath, 'view' => $view, 'private_space' => $privateSpaceId]);
		}
		
		if ($fileHandler->manageFolder($nameFolderFormType, $request)) {
			$newFolderName = $uploadsService->fixName($nameFolderFormType->get('name')->getData());
			return $this->redirectToRoute('file_index', ['path' => $relativePath . '/' . $newFolderName, 'view' => $view, 'private_space' => $privateSpaceId]);
		}
		
		if ($fileHandler->moveManager($moveFormType, $request)) {
			return $this->redirectToRoute('file_index', ['path' => $nameFolderFormType->get('name')->getData(), 'view' => $view, 'private_space' => $privateSpaceId]);
		}
		
		$finder = new Finder();
		
		if (!$filesystem->exists($rootFilesPath . $relativePath)) {
			return $this->render('@AkyosFileManager/file/error.html.twig', [
				'message' => 'Ce dossier n\'existe pas',
			]);
		}
		
		$finder->files()->in($rootFilesPath . $relativePath);
		
		foreach ($finder->depth(0) as $file) {
			$files[] = (object)array(
				'name' => $file->getFilename(),
				'size' => $file->getSize(),
				'path' => $relativeRootFilesPath . $relativePath . '/' . $file->getRelativePathname(),
				'absolutePath' => $file->getPath() . '/' . $file->getRelativePathname(),
			);
		}
		foreach ($finder->directories()->depth(0) as $directory) {
			$directories[] = (object)array(
				'name' => $directory->getFilename(),
				'size' => $directory->getSize(),
				'path' => $directory->getRelativePathname(),
				'absolutePath' => $directory->getPath() . '/' . $directory->getRelativePathname() . '/',
			);
		}
		
		return $this->render('@AkyosFileManager/file/index.html.twig', [
			'files' => $files,
			'directories' => $directories,
			'title' => 'File',
			'uploadForm' => $uploadFileForm->createView(),
			'nameFolderFormType' => $nameFolderFormType->createView(),
			'moveFormType' => $moveFormType->createView(),
			'currentPath' => $relativePath,
			'view' => $view,
			'private_space' => $privateSpace,
		]);
	}
	
	/**
	 * @Route("/show", name="show")
	 */
	public function show()
	{
		return $this->render('@AkyosFileManager/file/show.html.twig', [
			'title' => 'Fichiers'
		]);
	}
	
	/**
	 * @Route("/edit", name="edit", methods={"GET","POST"}, options={"expose"=true})
	 * @param Request $request
	 * @param FileHandler $fileHandler
	 *
	 * @param FileRepository $fileRepository
	 * @param EntityManagerInterface $em
	 * @return Response
	 */
	public function edit(Request $request, FileHandler $fileHandler, FileRepository $fileRepository, EntityManagerInterface $em): Response
	{
		$privateSpaceId = $request->get('private_space');
		$view = $request->get('view') ? $request->get('view') : "public";
		
		$path = $request->get('path');
		
		/* @var File|null $file */
		$file = $fileRepository->findOneBy(array('file' => $path));
		
		if (!$file) {
			$file = new File();
			$fileName = explode('/', $path);
			$file->setFile($path);
			$file->setName($fileName[count($fileName) - 1]);
			$em->persist($file);
			$em->flush();
		}
		
		$editFileForm = $this->createForm(EditFileType::class, $file);
		
		if ($fileHandler->editFile($editFileForm, $request, $path)) {
			return $this->redirectToRoute('file_index', ['path' => $path, 'view' => $view, 'private_space' => $privateSpaceId]);
		}
		
		return $this->render('@AkyosFileManager/file/edit.html.twig', [
			'editFileForm' => $editFileForm->createView(),
		]);
	}
	
	/**
	 * @Route("/delete/file", name="delete", methods={"DELETE"})
	 * @param Request $request
	 * @param FileRepository $fileRepository
	 * @param FileHandler $fileHandler
	 * @return Response
	 */
	public function delete(Request $request, FileRepository $fileRepository, FileHandler $fileHandler): Response
	{
		$privateSpaceId = $request->get('private_space');
		$view = $request->get('view') ? $request->get('view') : "public";
		$path = $request->get('path');
		$fileToDelete = $request->request->get('_file');
		
		/* @var File|null $file */
		$file = $fileRepository->findOneBy(array('file' => $fileToDelete));
		
		if ($fileHandler->removeFile($file, $request)) {
			return $this->redirectToRoute('file_index', ['path' => $path, 'view' => $view, 'private_space' => $privateSpaceId]);
		}
		
		return $this->redirectToRoute('file_index', ['path' => $path, 'view' => $view, 'private_space' => $privateSpaceId]);
	}
	
	/**
	 * @Route("/delete", name="remove_folder")
	 * @param Request $request
	 * @param FileRepository $fileRepository
	 * @param EntityManagerInterface $em
	 * @param Filesystem $filesystem
	 * @param KernelInterface $kernel
	 * @return Response
	 */
	public function removeFolder(Request $request, FileRepository $fileRepository, EntityManagerInterface $em, PrivateSpaceRepository $privateSpaceRepository, Filesystem $filesystem, KernelInterface $kernel): Response
	{
		$privateSpaceId = $request->get('private_space');
		$privateSpace = $privateSpaceRepository->find($privateSpaceId ? $privateSpaceId : 0);
		$view = $request->get('view') ? $request->get('view') : "public";
		$path = $request->get('path');
		if ($view === "private_space") {
			$folderPath = $this->getParameter("private_spaces_dir") . '/' . $privateSpace->getSlug() . $request->get('folder');
		} else {
			$folderPath = $this->getParameter($view === "secured" ? 'secured_dir' : 'web_dir') . $request->get('folder');
		}
		$absolutePath = $kernel->getProjectDir() . ($view === "public" ? '/public' : '') . $folderPath . '/';
		
		$filesystem->remove($absolutePath);
		/* @var ArrayCollection $files */
		$files = $fileRepository->findByFilePathBegin($folderPath);
		foreach ($files as $file) {
			/* @var File $file */
			$em->remove($file);
		}
		$em->flush();
		
		return $this->redirectToRoute('file_index', ['path' => $path, 'view' => $view, 'private_space' => $privateSpaceId]);
	}
	
	/**
	 * @Route("/get-file-id", name="get_file_id", methods={"GET"}, options={"expose"=true})
	 * @param Request $request
	 * @param FileRepository $fileRepository
	 * @param EntityManagerInterface $em
	 * @return JsonResponse
	 */
	public function getFileIdByPath(Request $request, FileRepository $fileRepository, EntityManagerInterface $em): JsonResponse
	{
		$path = $request->get('path');
		/* @var File|null $file */
		$file = $fileRepository->findOneBy(['file' => $path]);
		
		if (!$file) {
			$file = new File();
			$file->setFile($path);
			$name = explode('/', $path);
			$name = $name[count($name) - 1];
			$file->setName($name);
			$em->persist($file);
			$em->flush();
		}
		
		$id = $file->getId();
		
		return new JsonResponse($id);
	}
	
	/**
	 * @Route("/render-file/{id}", name="render_file", methods={"GET"}, options={"expose"=true})
	 * @param File $file
	 * @return Response
	 */
	public function renderFile(File $file): Response
	{
		return $this->render('@AkyosFileManager/form/render_file.html.twig', [
			'file' => $file,
		]);
	}
}
