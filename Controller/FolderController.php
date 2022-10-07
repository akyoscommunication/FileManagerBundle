<?php

namespace Akyos\FileManagerBundle\Controller;

use Akyos\FileManagerBundle\Service\FileManagerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/file-manager', name: 'api_filemanager_folder_', methods: ['GET'])]
class FolderController extends AbstractController
{
    public function __construct(
        private readonly FileManagerService $fileManagerService
    ){}

    #[Route('/folders', name: 'get', methods: ['GET'])]
    public function index(): Response
    {
        $finder= new Finder();
        $finder->in($this->fileManagerService->getUploadPath())
            ->directories();
        $dirs = iterator_to_array($finder, false);
        $dirs = array_map(function($d) {
            return $this->toArray($d);
        }, $dirs);
        return $this->json($dirs);
    }

    #[Route('/folders', name: 'create', methods: ['POST'])]
    public function store(Request $request, FileManagerService $fileManagerService)
    {
        $data = json_decode($request->getContent(), true);
        $parent = $data['parent'] ?? '';
        $dir = $data['name'];
        $path = ($parent ?? '') . '/' . $dir;
        $absolutePath = $this->fileManagerService->getUploadPath() . $path;
        $filesystem = new Filesystem();
        $filesystem->mkdir($absolutePath);
        return $this->json($this->toArray($absolutePath));
    }

    #[Route('/folders/{folder}', name: 'delete', methods: ['DELETE'], requirements: ['folder' => '.*'])]
    public function delete(string $folder, FileManagerService $fileManagerService): Response
    {
        $filesystem = new Filesystem();
        $filesystem->remove($this->fileManagerService->getUploadPath().$folder);
        return new Response('', Response::HTTP_NO_CONTENT);
    }

    public function toArray(string $folder): array
    {
        $pathinfo = pathinfo($folder);
        $filesystem = new Filesystem();
        $parent = $filesystem->makePathRelative(
            $pathinfo['dirname'],
            $this->fileManagerService->getUploadPath()
        );
        $parent = rtrim($parent, '/');
        return [
            // use the filepath as an ID
            'id' => $parent === '.' ?  $pathinfo['filename'] : $parent . '/' . $pathinfo['filename'],
            'name' => $pathinfo['filename'],
            'parent' => $parent === '.' ? null : $parent
        ];
    }
}
