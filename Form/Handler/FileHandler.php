<?php

namespace Akyos\FileManagerBundle\Form\Handler;

use Akyos\FileManagerBundle\Entity\File;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\KernelInterface;

class FileHandler extends AbstractController
{
    private $em;
    private $fs;
    private $kernel;

    public function __construct(ObjectManager $em, KernelInterface $kernel, Filesystem $filesystem)
    {
        $this->em = $em;
        $this->fs = $filesystem;
        $this->kernel = $kernel;
    }

    public function uploadFile(FormInterface $form, Request $request): bool
    {
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $file = new File();
            $fileUploaded = $form['file']->getData();
            $relativePath = $request->get('path');
            if ($relativePath) {
                $relativePath = '/'.$relativePath;
            }

            if ($fileUploaded) {
                $originalFilename = pathinfo($fileUploaded->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                $newFilename = $safeFilename.'.'.$fileUploaded->guessExtension();

                // Move the file to the directory where brochures are stored
                try {
                    $fileUploaded->move(
                        $this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir').$relativePath,
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $file->setName($newFilename);
                $file->setFile($this->getParameter('web_dir').'/'.$newFilename);
            }

            $this->em->persist($file);
            $this->em->flush();

            return true;
        }
        return false;
    }

    public function editFile(FormInterface $form, Request $request, $pathOrigin): bool
    {
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $pathOrigin = $this->kernel->getProjectDir().'/public'.$pathOrigin;
            $newPath = explode('/', $pathOrigin);
            $newPath[sizeof($newPath)-1] = $form->get('name')->getData();
            $this->fs->rename($pathOrigin,implode('/', $newPath));

            $pathOrigin = $form->getData()->getFile();
            $newPath = explode('/', $pathOrigin);
            $newPath[sizeof($newPath)-1] = $form->get('name')->getData();
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
            if ($relativePath) {
                $relativePath = $relativePath.'/';
            }
            $newFolderName = $form->get('name')->getData();
            $folder = $form->get('folder')->getData();


            if (!$folder) {
                $this->fs->mkdir($this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir').'/'.$relativePath.$newFolderName);
            } else {
                $this->fs->rename($this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir').$folder, $this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir').$relativePath.$form->get('name')->getData());

                $filesToChange = $this->em->getRepository(File::class)->findByFilePathBegin($this->getParameter('web_dir').$folder);
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
        $publicFolder = $this->kernel->getProjectDir().'/public';
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $destination = $form->get('tree')->getData();
            $initPathFile = $form->get('file')->getData();
            $type = $form->get('type')->getData();

            $fileName = explode('/', $initPathFile);
            $fileName = $fileName[sizeof($fileName)-1];

            $newPath = explode('/public', $destination.$fileName);
            $newPath = $newPath[sizeof($newPath)-1];

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
                $initPathFile = $initPathFile[sizeof($initPathFile)-1];

                $folderName = explode('/', $initPathFile);
                $folderName = $folderName[sizeof($folderName)-2].'/';

                $this->fs->mirror($publicFolder.$initPathFile, $destination.$folderName);
                $this->fs->remove([$publicFolder.$initPathFile, '*']);

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
        // if there is file in DB
        if ($file) {
            if ($this->isCsrfTokenValid('delete'.$file->getName(), $request->request->get('_token'))) {
                $this->em->remove($file);
                $this->fs->remove($this->kernel->getProjectDir().'/public'.$request->request->get('_file'));
                $this->em->flush();
                return true;
            }
        } else {
            $this->fs->remove($this->kernel->getProjectDir().'/public'.$request->request->get('_file'));
            return true;
        }
        return false;
    }
}