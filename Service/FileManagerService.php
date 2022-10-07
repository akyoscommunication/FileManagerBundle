<?php

namespace Akyos\FileManagerBundle\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FileManagerService extends AbstractController
{
    public function getUploadPath(): ?string
    {
        return $this->getParameter('kernel.project_dir').'/public/' . $_ENV['FILESYSTEMJS_FOLDER'] . '/';
    }
}