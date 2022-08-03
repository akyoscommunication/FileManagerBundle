<?php

namespace Akyos\FileManagerBundle\Twig;

use Akyos\FileManagerBundle\Repository\FileManagerOptionsRepository;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class GlobalsExtension extends AbstractExtension implements GlobalsInterface
{
    protected FileManagerOptionsRepository $fileManagerOptionsRepository;

    public function __construct(FileManagerOptionsRepository $fileManagerOptionsRepository)
    {
        $this->fileManagerOptionsRepository = $fileManagerOptionsRepository;
    }

    /**
     * @return array
     */
    public function getGlobals(): array
    {
        $fileManagerOptions = $this->fileManagerOptionsRepository->findAll();
        if ($fileManagerOptions) {
            $fileManagerOptions = $fileManagerOptions[0];
        }
        return ['file_manager_options' => $fileManagerOptions,];
    }
}
