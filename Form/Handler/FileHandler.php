<?php

namespace Akyos\FileManagerBundle\Form\Handler;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Akyos\FileManagerBundle\Service\UploadsService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\KernelInterface;

class FileHandler extends AbstractController
{
    private $em;
    private $fs;
    private $kernel;
    private $uploadsService;
    private $privateSpaceRepository;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel, Filesystem $filesystem, UploadsService $uploadsService, PrivateSpaceRepository $privateSpaceRepository)
    {
        $this->em = $em;
        $this->fs = $filesystem;
        $this->kernel = $kernel;
        $this->uploadsService = $uploadsService;
        $this->privateSpaceRepository = $privateSpaceRepository;
    }

    public function uploadFile(FormInterface $form, Request $request): bool
    {
		$privateSpaceId = $request->get('private_space');
		$privateSpace = $this->privateSpaceRepository->find($privateSpaceId ? $privateSpaceId : 0);
		$view = $request->get('view') ? $request->get('view') : "public";
        $relativePath = $request->get('path');
        if (strlen($relativePath) && substr($relativePath, 0, 1) !== '/') {
            $relativePath = '/'.$relativePath;
        }
        $absoluteRootFilesPath = $this->uploadsService->getRootFilesPath($view, false, $privateSpace);
        $relativeRootFilesPath = $this->uploadsService->getRootFilesPath($view, true, $privateSpace);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($form['file']->getData() as $fileUploaded) {
                $file = new File();

                if ($fileUploaded) {
                    $originalFilename = pathinfo($fileUploaded->getClientOriginalName(), PATHINFO_FILENAME);
					$originalFilename = str_replace(' ', '_', $originalFilename);
                    $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                    $extension = $fileUploaded->guessExtension();
                    if ($fileUploaded->getMimeType() === 'image/svg') {
                        $extension = 'svg';
                    }
                    $newFilename = $safeFilename.'.'.$extension;

                    try {
                        $fileUploaded->move(
                            $absoluteRootFilesPath.$relativePath,
                            $newFilename
                        );
                    } catch (FileException $e) {
                        dd($e);
                    }

                    $file->setName($newFilename);
                    if (strlen($newFilename) && substr($newFilename, 0, 1) !== '/') {
                        $newFilename = '/'.$newFilename;
                    }
                    $file->setFile($relativeRootFilesPath.$relativePath.$newFilename);
                }

                $this->em->persist($file);
            }
            $this->em->flush();

            return true;
        }
        return false;
    }

    public function editFile(FormInterface $form, Request $request, $pathOrigin): bool
    {
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
			$view = $request->get('view') ? $request->get('view') : "public";

            $pathOrigin = $this->kernel->getProjectDir().($view !== "public" ? '' : '/public').$pathOrigin;
            $newPath = explode('/', $pathOrigin);
            $newPath[count($newPath)-1] = $form->get('name')->getData();
            if ( !($this->fs->exists(implode('/', $newPath))) ) {
                $this->fs->rename($pathOrigin,implode('/', $newPath));
            }

            $pathOrigin = $form->getData()->getFile();
            $newPath = explode('/', $pathOrigin);
            $newPath[count($newPath)-1] = $form->get('name')->getData();
            $form->getData()->setFile(implode('/', $newPath));
            $this->em->flush();

            return true;
        }
        return false;
    }

    public function manageFolder(FormInterface $form, Request $request): bool
    {
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $relativePath = $request->get('path');
			$privateSpaceId = $request->get('private_space');
			$privateSpace = $this->privateSpaceRepository->find($privateSpaceId ? $privateSpaceId : 0);
			$view = $request->get('view') ? $request->get('view') : "public";
            $absoluteRootFilesPath = $this->uploadsService->getRootFilesPath($view, false, $privateSpace);
            $relativeRootFilesPath = $this->uploadsService->getRootFilesPath($view, true, $privateSpace);

            if ($relativePath) {
                $relativePath = $relativePath.'/';
            }
            $newFolderName = $form->get('name')->getData();
            $folder = $form->get('folder')->getData();


            if (!$folder) {
                $this->fs->mkdir($absoluteRootFilesPath.'/'.$relativePath.$newFolderName);
            } else {
                $this->fs->rename($absoluteRootFilesPath.$folder, $absoluteRootFilesPath.$relativePath.$form->get('name')->getData());

                $filesToChange = $this->em->getRepository(File::class)->findByFilePathBegin($relativeRootFilesPath.$folder);
                foreach ($filesToChange as $file) {
                    if ($file instanceof File) {
                        $originPath = $file->getFile();
                        $newPath = str_replace($folder.'/', '/'.$newFolderName.'/', $originPath);
                        $file->setFile($newPath);
                    }
                }
                $this->em->flush();
            }

            return true;
        }
        return false;
    }

    public function moveManager(FormInterface $form, Request $request): bool
    {
		$privateSpaceId = $request->get('private_space');
		$privateSpace = $this->privateSpaceRepository->find($privateSpaceId ? $privateSpaceId : 0);
		$view = $request->get('view') ? $request->get('view') : "public";
        $publicFolder = $this->kernel->getProjectDir().($view !== "public" ? '' : '/public');
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $destination = $form->get('tree')->getData();
            $initPathFile = $form->get('file')->getData();
            $type = $form->get('type')->getData();

            $fileName = explode('/', $initPathFile);
            $fileName = $fileName[count($fileName)-1];

            $newPath = explode('/public', $destination.$fileName);
            $newPath = $newPath[count($newPath)-1];
	
			$newPath = explode('/secured_files', $destination.$fileName);
			$newPath = $newPath[count($newPath)-1];
	
			$newPath = explode('/private_spaces_files', $destination.$fileName);
			$newPath = $newPath[count($newPath)-1];
            
            if($view === "secured" && strpos($newPath, '/secured_files') === false) {
                $newPath = '/secured_files'.$newPath;
            }
	
			if($view === "private_space" && strpos($newPath, '/private_spaces_files') === false) {
				$newPath = '/private_spaces_files/'.$privateSpace->getSlug().$newPath;
			}

            if ($type === 'FILE') {
                $this->fs->copy($publicFolder.$initPathFile, $destination.$fileName);
                $this->fs->remove($publicFolder.$initPathFile);

                $file = $this->em->getRepository(File::class)->findOneBy(array('file' => $initPathFile));

                if (!$file) {
                    $file = new File();
                    $file->setName($fileName);
                }

                $file->setFile($newPath);
                $this->em->persist($file);
                $this->em->flush();
            } else if($type === 'FOLDER') {
                $initPathFile = explode('/public', $initPathFile);
                $initPathFile = $initPathFile[count($initPathFile)-1];

                $folderName = explode('/', $initPathFile);
                $folderName = $folderName[count($folderName)-2].'/';

                $this->fs->mirror($initPathFile, $destination.$folderName);
                $this->fs->remove([$initPathFile, '*']);

                $files = $this->em->getRepository(File::class)->findByFilePathBegin($initPathFile);

                foreach ($files as $file) {
                    if ($file instanceof File) {
                        $name = $file->getName();
                        $file->setFile($newPath.$folderName.$name);
                    }
                }
                $this->em->flush();
            }


            return true;
        }
        return false;
    }

    public function removeFile($file, Request $request): bool
    {
		$privateSpaceId = $request->get('private_space');
		$view = $request->get('view') ? $request->get('view') : "public";

        // if there is file in DB
        if ($file) {
            if ($this->isCsrfTokenValid('delete'.$file->getName(), $request->request->get('_token'))) {
                $this->em->remove($file);
                $this->fs->remove($this->kernel->getProjectDir().($view !== "public" ? '' : '/public').$request->request->get('_file'));
                $this->em->flush();
                return true;
            }
        } else {
            $this->fs->remove($this->kernel->getProjectDir().($view !== "public" ? '' : '/public').$request->request->get('_file'));
            return true;
        }
        return false;
    }
}