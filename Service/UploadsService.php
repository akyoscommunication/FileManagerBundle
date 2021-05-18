<?php

namespace Akyos\FileManagerBundle\Service;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Entity\PrivateSpace;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
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
	private $privateSpaceRepository;
	private $authorizationChecker;
	private $rootPath = __DIR__ . '/../../..';

	public function __construct(
		KernelInterface $kernel,
		ParameterBagInterface $parameterBag,
		Security $security,
		UserPasswordEncoderInterface $encoder,
		Filesystem $filesystem,
		FileRepository $fileRepository,
		PrivateSpaceRepository $privateSpaceRepository,
		AuthorizationCheckerInterface $authorizationChecker
	)
	{
		$this->kernel = $kernel;
		$this->parameterBag = $parameterBag;
		$this->security = $security;
		$this->encoder = $encoder;
		$this->filesystem = $filesystem;
		$this->fileRepository = $fileRepository;
		$this->privateSpaceRepository = $privateSpaceRepository;
		$this->authorizationChecker = $authorizationChecker;
	}


	// GET ROOT DIRECTORY FOR FILE MANAGER (PUBLIC OR SECURED_FILES OR SECURED_FILES/USER_DIRECTORY )
	public function getRootFilesPath($view = false, $relative = false, $privateSpace = null)
	{
		if ($view === "secured") {
			$relativePath = $this->getUserSecuredRootPath();
			if (!$relativePath) {
				// ACCESS DENIED
				return false;
			}
		} elseif ($view === "private_space") {
			$relativePath = $this->getPrivateSpaceRootPath($privateSpace);
			if (!$relativePath) {
				// ACCESS DENIED
				return false;
			}
		} else {
			// PUBLIC FILES ACCESS
			if ($this->security->isGranted('ROLE_FILE_MANAGER') || $this->security->isGranted('ROLE_ADMIN')) {
				// WHOLE PUBLIC DIRECTORY ACCESS
				$relativePath = $this->parameterBag->get('web_dir');
			} else {
				// ACCESS DENIED
				return false;
			}
		}
		if ($relative) {
			return $relativePath;
		}
		return $this->kernel->getProjectDir() . ($view === "public" ? '/public' : '') . $relativePath;
	}


	// GET SECURED ROOT DIRECTORY FOR FILE MANAGER (SECURED_FILES OR SECURED_FILES/USER_DIRECTORY )
	public function getUserSecuredRootPath()
	{
		// SECURED FILES ACCESS
		if ($this->security->isGranted('ROLE_FILE_MANAGER_SECURED')) {
			// WHOLE SECURED DIRECTORY ACCESS
			$relativePath = $this->parameterBag->get('secured_dir');
		} elseif ($this->security->isGranted('ROLE_FILE_MANAGER_SECURED_SELF')) {
			// USER SPECIFIC SECURED DIRECTORY ACCESS
			$userRootFolderName = substr(base64_encode($this->security->getUser()->getUsername() . $this->security->getUser()->getSalt()), 0, -2);
			$userRootFolderPath = $this->kernel->getProjectDir() . $this->parameterBag->get('secured_dir') . '/' . $userRootFolderName;
			if (!$this->filesystem->exists($userRootFolderPath)) {
				$this->filesystem->mkdir($userRootFolderPath);
			}
			$relativePath = $this->parameterBag->get('secured_dir') . '/' . $userRootFolderName;
		} else {
			// ACCESS DENIED
			return false;
		}
		return $relativePath;
	}
	
	// GET PRIVATE SPACE ROOT DIRECTORY FOR FILE MANAGER
	public function getPrivateSpaceRootPath(PrivateSpace $privateSpace)
	{
		// IF IS GRANTED FOR FILE MANAGER
		if ($this->security->isGranted('ROLE_FILE_MANAGER') || $this->security->isGranted('ROLE_ADMIN')) {
			// PRIVATE SPACE DIRECTORY ACCESS
			$privateSpaceRootFolderName = $privateSpace->getSlug();
			$privateSpaceRootFolderPath = $this->kernel->getProjectDir() . $this->parameterBag->get('private_spaces_dir') . '/' . $privateSpaceRootFolderName;
			if (!$this->filesystem->exists($privateSpaceRootFolderPath)) {
				$this->filesystem->mkdir($privateSpaceRootFolderPath);
			}
			$relativePath = $this->parameterBag->get('private_spaces_dir') . '/' . $privateSpaceRootFolderName;
		} else {
			// ACCESS DENIED
			return false;
		}
		return $relativePath;
	}


	// ABSOLUTE FILE PATH (IN /SECURED_FILES OR /PUBLIC_SPACES OR /PUBLIC)
	public function getFilePath(File $file)
	{
		return $this->rootPath . (strpos($file->getFile(), 'secured_files') || strpos($file->getFile(), 'private_spaces_files') ? '' : '/public') . $file->getFile();
	}


	// ABSOLUTE VALUE PATH, WHERE VALUE CAN BE ID OF FILE OBJECT OR RELATIVE PATH
	public function getFilePathFromValue($value)
	{
		if (!is_string($value) and !is_int($value)) {
			return false;
		}
		$intPattern = '/^\d+$/';
		$pathPattern = "/^\/(" . substr($this->parameterBag->get('web_dir'), 1) . "|" . substr($this->parameterBag->get('secured_dir'), 1) . "|" . substr($this->parameterBag->get('private_spaces_dir'), 1) . ")\//";
		$file = null;
		$pathToFile = $value;

		if (preg_match($pathPattern, $value)) {
			$pathToFile = $this->rootPath . (strpos($value, 'secured_files') || strpos($value, 'private_spaces_files') ? '' : '/public') . $value;
		}

		if (preg_match($intPattern, $value)) {
			$file = $this->fileRepository->find($value);
			if (!$file) {
				return false;
			}
			$pathToFile = $this->getFilePath($file);
		}

		return $pathToFile;
	}

	//CHECK IF CURRENT USER HAS RIGHT TO ACCESS THE FILE
	public function hasFileAccessRight($fileId)
	{
		$file = $this->fileRepository->find($fileId);
		if ($file) {
			if (strpos($file->getFile(), '/secured_files') !== false) {
				if (
					strpos(substr(base64_encode($this->security->getUser() ? $this->security->getUser()->getUsername() . $this->security->getUser()->getSalt() : 'null'), 0, -2), $file->getFile()) === false
					&&
					!$this->authorizationChecker->isGranted('ROLE_SUPER_ADMIN')
					&&
					(
						empty($file->getVisibility())
						||
						!$file->getVisibility()
						||
						!($this->authorizationChecker->isGranted($file->getVisibility()) || in_array('ANONYMOUS', is_array($file->getVisibility()) ? $file->getVisibility() : []))
					)
				) {
					return false;
				}
				return true;
			}
			if (strpos($file->getFile(), '/private_spaces_files') !== false) {
				$explodeOnPrivateSpacesFiles = explode('/private_spaces_files/', $file->getFile());
				$explodeOnSlashes = explode('/', $explodeOnPrivateSpacesFiles[count($explodeOnPrivateSpacesFiles) - 1]);
				$privateSpaceSlug = $explodeOnSlashes[0];
				$privateSpace = $this->privateSpaceRepository->findOneBy(['slug' => $privateSpaceSlug]);
				if ($privateSpace) {
					if (
						!$this->authorizationChecker->isGranted($privateSpace->getRoles())
						&&
						(
							empty($file->getVisibility())
							||
							!$file->getVisibility()
							||
							!($this->authorizationChecker->isGranted($file->getVisibility()) || in_array('ANONYMOUS', is_array($file->getVisibility()) ? $file->getVisibility() : []))
						)
					) {
						return false;
					}
					return true;
				}
			}
			return true;
		}
		return false;
	}
}