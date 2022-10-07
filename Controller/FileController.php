<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Entity\PrivateSpace;
use Akyos\FileManagerBundle\Form\EditFileType;
use Akyos\FileManagerBundle\Form\Handler\FileHandler;
use Akyos\FileManagerBundle\Form\MoveType;
use Akyos\FileManagerBundle\Form\NameFolderFormType;
use Akyos\FileManagerBundle\Form\UploadType;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Akyos\FileManagerBundle\Service\FileManagerService;
use Akyos\FileManagerBundle\Service\UploadsService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route(path: '/api/file-manager', name: 'api_filemanager_file_')]
class FileController extends AbstractController
{
    public function __construct(
        private readonly FileManagerService $fileManagerService
    ){}

    #[Route('/files', name: 'get', methods: ['GET'])]
    public function index(Request $request, FileRepository $fileRepository): Response
    {
        $folder = $request->query->get('folder');
        $folder = $this->fileManagerService->getUploadPath() . $folder;
        $finder = new Finder();
        $finder->in($folder)
            ->depth(0)
            ->files();
        $files = iterator_to_array($finder, false);
        $files = array_map(function($d) use ($fileRepository) {
            $file = $fileRepository->findOneBy(['file' => $d->getPathname()]);
            return $this->toArray($d, $file);
        }, $files);
        return $this->json($files);
    }

    #[Route('/files', name: 'create', methods: ['POST'])]
    public function store(Request $request, SluggerInterface $slugger, FileRepository $fileRepository)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('file');
        $folder = $request->get('folder');
        $folder = $this->fileManagerService->getUploadPath() . $folder;
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
        $path = $file->move($folder, $newFilename);
        $file_info = $this->toArray($path);
        $dbFile = (new File())
            ->setName($file_info['name'])
            ->setSlug($safeFilename)
            ->setDescription('')
            ->setFile($path)
            ->setAlt('')
        ;
        $fileRepository->add($dbFile, true);
        return $this->json($file_info);
    }

    #[Route('/files', name: 'update', methods: ['PATCH'])]
    public function update(Request $request, FileRepository $fileRepository, SluggerInterface $slugger)
    {
        $data = json_decode($request->getContent(), true);
        if ((int)$data['id']) {
            $file = $fileRepository->find((int)$data['id']);
        } else {
            $name = $data['name'];
            $file = (new File())
                ->setName($name)
                ->setSlug($slugger->slug($name))
                ->setDescription('')
                ->setFile($data['url'] ?? null)
            ;
        }
        $file->setAlt($data['alt'] ?? null);
        $fileRepository->add($file, true);
        return $this->json($this->toArray($file->getFile(), $file));
    }

    #[Route('/files/{file}', name: 'delete', methods: ['DELETE'], requirements: ['file' => '.*'])]
    public function delete(string $file, Filesystem $filesystem, FileRepository $fileRepository)
    {
        if($filedb = $fileRepository->find((int)$file)) {
            $file = $filedb->getFile();
            $fileRepository->remove($filedb, true);
        }

        $filesystem->remove($file);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

    public function toArray(string $filepath, ?File $file = null): array
    {
        $pathinfo = pathinfo($filepath);
        $filesystem = new Filesystem();
        $rootDirectory = $filesystem->makePathRelative(
            $pathinfo['dirname'],
            $this->getParameter('kernel.project_dir').'/public/'
        );
        return [
            'id' => $file?->getId() ?? $filepath,
            'name' => $file?->getName() ?? $pathinfo['basename'],
            'url' => $rootDirectory . $pathinfo['basename'],
            'size' => filesize($filepath),
            'folder' => $pathinfo['dirname'] === '.' ? null : $pathinfo['dirname'],
            'thumbnail' => $file?->getFile() ?? $rootDirectory . $pathinfo['basename'],
            'alt' => $file?->getAlt() ?? null,
        ];
    }
}
