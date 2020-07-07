<?php

namespace Akyos\FileManagerBundle\Service;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class UploadsService
{
    private $kernel;
    private $parameterBag;
    private $security;
    private $encoder;
    private $filesystem;
    private $fileRepository;
    private $rootPath = __DIR__.'/../../..';

    public function __construct(KernelInterface $kernel, ParameterBagInterface $parameterBag, Security $security, UserPasswordEncoderInterface $encoder, Filesystem $filesystem, FileRepository $fileRepository)
    {
        $this->kernel = $kernel;
        $this->parameterBag = $parameterBag;
        $this->security = $security;
        $this->encoder = $encoder;
        $this->filesystem = $filesystem;
        $this->fileRepository = $fileRepository;
    }


    // GET ROOT DIRECTORY FOR FILE MANAGER (PUBLIC OR SECURED_FILES OR SECURED_FILES/USER_DIRECTORY )
    public function getRootFilesPath($secured = false, $relative = false)
    {
        if($secured) {
            $relativePath = $this->getUserSecuredRootPath();
            if(!$relativePath) {
                // ACCESS DENIED
                return false;
            }
        } else {
            // PUBLIC FILES ACCESS
            if($this->security->isGranted('ROLE_FILE_MANAGER') || $this->security->isGranted('ROLE_ADMIN')) {
                // WHOLE PUBLIC DIRECTORY ACCESS
                $relativePath = $this->parameterBag->get('web_dir');
            } else {
                // ACCESS DENIED
                return false;
            }
        }
        if($relative) {
            return $relativePath;
        }
        return $this->kernel->getProjectDir().(!$secured ? '/public' : '').$relativePath;
    }


    // GET SECURED ROOT DIRECTORY FOR FILE MANAGER (SECURED_FILES OR SECURED_FILES/USER_DIRECTORY )
    public function getUserSecuredRootPath() {
        // SECURED FILES ACCESS
        if ($this->security->isGranted('ROLE_FILE_MANAGER_SECURED')) {
            // WHOLE SECURED DIRECTORY ACCESS
            $relativePath = $this->parameterBag->get('secured_dir');
        } elseif($this->security->isGranted('ROLE_FILE_MANAGER_SECURED_SELF')) {
            // USER SPECIFIC SECURED DIRECTORY ACCESS
            $userRootFolderName = substr(base64_encode($this->security->getUser()->getUsername().$this->security->getUser()->getSalt()), 0, -2);
            $userRootFolderPath = $this->kernel->getProjectDir().$this->parameterBag->get('secured_dir').'/'.$userRootFolderName;
            if(!$this->filesystem->exists($userRootFolderPath)) {
                $this->filesystem->mkdir($userRootFolderPath);
            }
            $relativePath = $this->parameterBag->get('secured_dir').'/'.$userRootFolderName;
        } else {
            // ACCESS DENIED
            return false;
        }
        return $relativePath;
    }


    // ABSOLUTE FILE PATH (IN /SECURED_FILES OR /PUBLIC)
    public function getFilePath(File $file) {
        return $this->rootPath.(strpos($file->getFile(), 'secured_files') === false ? '/public' : '').$file->getFile();
    }


    // ABSOLUTE VALUE PATH, WHERE VALUE CAN BE ID OF FILE OBJECT OR RELATIVE PATH
    public function getFilePathFromValue($value) {
        if (!is_string($value) and !is_int($value)) {
            return false;
        }
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/(".substr($this->parameterBag->get('web_dir'), 1)."|".substr($this->parameterBag->get('secured_dir'), 1).")\//";
        $file = null;
        $pathToFile = $value;

        if(preg_match($pathPattern, $value)) {
            $pathToFile = $this->rootPath.(strpos($value, 'secured_files') === false ? '/public' : '').$value;
        }

        if (preg_match($intPattern, $value)) {
            $file = $this->fileRepository->find($value);
            if(!$file) {
                return false;
            }
            $pathToFile = $this->getFilePath($file);
        }

        return $pathToFile;
    }
}