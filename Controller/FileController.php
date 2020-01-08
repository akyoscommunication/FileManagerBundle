<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Form\MoveType;
use Akyos\FileManagerBundle\Form\NameFolderFormType;
use Akyos\FileManagerBundle\Form\EditFileType;
use Akyos\FileManagerBundle\Form\UploadType;
use Akyos\FileManagerBundle\Form\Handler\FileHandler;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/file", name="file_")
 */
class FileController extends AbstractController
{
    private $fs;
    private $kernel;

    public function __construct(Filesystem $fs, KernelInterface $kernel)
    {
        $this->fs = $fs;
        $this->kernel = $kernel;
    }

    /**
     * @Route("/", name="index", methods={"GET","POST"})
     */
    public function index(FileRepository $fileRepository, FileHandler $fileHandler, Request $request): Response
    {
        $files = null;
        $directories = null;
        $relativePath = $request->get('path');

        $finder = new Finder();
//        $file = new File();

        $uploadFileForm = $this->createForm(UploadType::class);
        $nameFolderFormType = $this->createForm(NameFolderFormType::class);

        $moveFormType = $this->createForm(MoveType::class, null, array(
            'directories' => $finder->files()->in($this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir'))->directories(),
            'racine' => $this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir')
        ));

        if ($fileHandler->uploadFile($uploadFileForm, $request)) {
            return $this->redirectToRoute('file_index', ['path' => $relativePath.'/'.$nameFolderFormType->get('name')->getData()]);
        }

        if ($fileHandler->manageFolder($nameFolderFormType, $request)) {
            return $this->redirectToRoute('file_index', ['path' => $relativePath.'/'.$nameFolderFormType->get('name')->getData()]);
        }

        if ($fileHandler->moveManager($moveFormType, $request)) {
            return $this->redirectToRoute('file_index', ['path' => $nameFolderFormType->get('name')->getData()]);
        }

        $finder = new Finder();

        $finder->files()->in($this->kernel->getProjectDir().'/public'.$this->getParameter('web_dir').$relativePath);

//        if ( $relativePath ) {
//            $relativePath = '/'.$relativePath;
//        }

        foreach ($finder->depth(0) as $file) {
            $files[] = (object) array(
                'name' => $file->getFilename(),
                'size' => $file->getSize(),
                'path' => $this->getParameter('web_dir').$relativePath.'/'.$file->getRelativePathname(),
            );
        }
        foreach ($finder->directories()->depth(0) as $directory) {
            $directories[] = (object) array(
                'name' => $directory->getFilename(),
                'size' => $directory->getSize(),
                'path' => $directory->getRelativePathname(),
                'absolutePath' => $directory->getPath().'/'.$directory->getRelativePathname().'/',
            );
        }

        return $this->render('@AkyosFileManager/file/index.html.twig', [
            'files' => $files,
            'directories' => $directories,
            'title' => 'File',
            'uploadForm' => $uploadFileForm->createView(),
            'nameFolderFormType' => $nameFolderFormType->createView(),
            'moveFormType' => $moveFormType->createView(),
        ]);
    }

    /**
     * @Route("/edit", name="edit", methods={"GET","POST"}, options={"expose"=true})
     * @param Request $request
     * @param FileHandler $fileHandler
     *
     * @return Response
     */
    public function edit(Request $request, FileHandler $fileHandler, FileRepository $fileRepository): Response
    {
        $relativePath = $request->get('path');
        $file = $fileRepository->findOneBy(array('file' => $relativePath));
        $em = $this->getDoctrine()->getManager();

        if (!$file) {
            $file = new File();
            $fileName = explode('/', $relativePath);
            $file->setFile($request->get('path'));
            $file->setName($fileName[sizeof($fileName)-1]);
            $em->persist($file);
            $em->flush();
        }

        $editFileForm = $this->createForm(EditFileType::class, $file);

        if ($fileHandler->editFile($editFileForm, $request, $relativePath)) {
            return $this->redirectToRoute('file_index');
        }

        return $this->render('@AkyosFileManager/file/edit.html.twig', [
            'editFileForm' => $editFileForm->createView(),
        ]);
    }

    /**
     * @Route("/", name="delete", methods={"DELETE"})
     */
    public function delete(Request $request, FileRepository $fileRepository, FileHandler $fileHandler): Response
    {
        $file = $fileRepository->findOneBy(array('file' => $request->request->get('_file')));
        if ($fileHandler->removeFile($file, $request)) {
            return $this->redirectToRoute('file_index', ['path' => $request->get('path')]);
        }

        return $this->redirectToRoute('file_index');
    }

    /**
     * @Route("/delete", name="remove_folder")
     */
    public function removeFolder(Request $request, FileRepository $fileRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        $folderPath = $this->getParameter('web_dir').$request->get('folder');
        $absolutePath = $this->kernel->getProjectDir().'/public'.$folderPath.'/';

        $this->fs->remove($absolutePath);

        $files = $fileRepository->findByFilePathBegin($folderPath);
        foreach ($files as $file) {
            $em->remove($file);
        }
        $em->flush();

        return $this->redirectToRoute('file_index');
    }

    /**
     * @Route("/get-file-id", name="get_file_id", methods={"GET"}, options={"expose"=true})
     * @param Request $request
     *
     * @param FileRepository $fileRepository
     *
     * @return JsonResponse
     */
    public function getFileIdByPath(Request $request, FileRepository $fileRepository): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();
        $path = $request->get('path');
        $file = $fileRepository->findOneBy(array('file' => $path));

        if (!$file) {
            $file = new File();
            $file->setFile($path);
            $name = explode('/', $path);
            $name = $name[sizeof($name)-1];
            $file->setName($name);
            $em->persist($file);
            $em->flush();
        }

        $id = $file->getId();

        return new JsonResponse($id);
    }
}
