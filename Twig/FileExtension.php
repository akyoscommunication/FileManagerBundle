<?php

namespace Akyos\FileManagerBundle\Twig;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Service\UploadsService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class FileExtension extends AbstractExtension
{
	private $em;
	private $fileRepository;
	private $parameterBag;
	private $filesystem;
	private $uploadsService;
	private $urlGenerator;
	private $twig;
	private $rootPath = __DIR__ . '/../../..';
	
	public function __construct(EntityManagerInterface $entityManager, FileRepository $fileRepository, ParameterBagInterface $parameterBag, Filesystem $filesystem, UploadsService $uploadsService, UrlGeneratorInterface $urlGenerator, Environment $twig)
	{
		$this->em = $entityManager;
		$this->fileRepository = $fileRepository;
		$this->parameterBag = $parameterBag;
		$this->filesystem = $filesystem;
		$this->uploadsService = $uploadsService;
		$this->urlGenerator = $urlGenerator;
		$this->twig = $twig;
	}
	
	public function getFilters(): array
	{
		return [
			new TwigFilter('format_bytes', [$this, 'formatBytes']),
		];
	}
	
	public function getFunctions(): array
	{
		return [
			new TwigFunction('getImagePathById', [$this, 'getImagePathById']),
			new TwigFunction('getImageVisibilityById', [$this, 'getImageVisibilityById']),
			new TwigFunction('getImageAltById', [$this, 'getImageAltById']),
			new TwigFunction('getImageNameById', [$this, 'getImageNameById']),
			new TwigFunction('getImageDescById', [$this, 'getImageDescById']),
			new TwigFunction('isFileShared', [$this, 'isFileShared']),
			new TwigFunction('renderFileManager', [$this, 'renderFileManager']),
			new TwigFunction('renderFileManagerNotLazy', [$this, 'renderFileManagerNotLazy']),
			new TwigFunction('renderFileManagerUrl', [$this, 'renderFileManagerUrl']),
			new TwigFunction('hasFileAccessRight', [$this->uploadsService, 'hasFileAccessRight']),
		];
	}
	
	public function getImagePathById($id, bool $display = true)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		if($file) {
			if (strpos($file->getFile(), $this->parameterBag->get('secured_dir')) !== false || strpos($file->getFile(), $this->parameterBag->get('private_spaces_dir')) !== false) {
				return $this->urlGenerator->generate('file_download_secured_file', ['path' => $file->getFile(), 'display' => $display]);
			}
		}
		return $file ? $file->getFile() : false;
	}
	
	public function getImageVisibilityById($id)
	{
        if (!$id) {
            return $id;
        }

		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getVisibility() : false;
	}
	
	public function getImageAltById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getAlt() : false;
	}
	
	public function getImageNameById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getName() : false;
	}
	
	public function getImageDescById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getDescription() : false;
	}
	
	public function isFileShared($path)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->findOneBy(['file' => $path]);
		return $file ? $file->getShared() : false;
	}
	
	/*
	 * @deprecated use renderFileManager() instead with second parameter to false, to disable lazy load
	 */
	public function renderFileManagerNotLazy($value, $height = null, $width = null, $noEmbed = false)
	{
		/*
		 * => Replaced by renderFileManager()
		 */
		return $this->renderFileManager($value, false, $noEmbed);
	}
	
	public function renderFileManager($value, $lazy = true, $noEmbed = false)
	{
		if (!is_string($value) and !is_int($value)) {
			return false;
		}
		
		$ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
		$urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
		$intPattern = '/^\d+$/';
		$pathPattern = "/^\/(" . substr($this->parameterBag->get('web_dir'), 1) . "|" . substr($this->parameterBag->get('secured_dir'), 1) . "|" . substr($this->parameterBag->get('private_spaces_dir'), 1) . ")\//";
		$file = null;
		$streamedValue = null;
		$streamedFile = null;
		
		if (preg_match($pathPattern, $value)) {
			if (strpos($value, $this->parameterBag->get('secured_dir')) !== false || strpos($value, $this->parameterBag->get('private_spaces_dir')) !== false) {
				$pathToValue = $this->rootPath . $value;
				$streamedValue = $this->urlGenerator->generate('file_download_secured_file', ['path' => $value, 'display' => true]);
			} else {
				$pathToValue = $this->rootPath . '/public' . $value;
			}
		}
		
		if (preg_match($intPattern, $value)) {
			/* @var File|null $file */
			$file = $this->fileRepository->find($value);
			if (!$file) {
				return false;
			}
			if (strpos($file->getFile(), $this->parameterBag->get('secured_dir')) !== false || strpos($file->getFile(), $this->parameterBag->get('private_spaces_dir')) !== false) {
				$pathToFile = $this->rootPath . $file->getFile();
				$streamedFile = $this->urlGenerator->generate('file_download_secured_file', ['path' => $file->getFile(), 'display' => true]);
			} else {
				$pathToFile = $this->rootPath . '/public' . $file->getFile();
			}
		}
		
		$result = '';
		
		if (preg_match($ytPattern, $value)) {
			// YOUTUBE LINK
			$result = '<iframe width="100%" height="100%" src="' . $value . '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		} elseif (preg_match($urlPattern, $value)) {
			// EXTERNAL IMAGE URL
			$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $value) . '" ' . ($lazy ? 'data-src="' . $value . '"' : '') . ' alt=""/>';
		} elseif (preg_match($pathPattern, $value)) {
			// FILE PATH
			if (file_exists($pathToValue)) {
				$valueToDisplay = ($streamedValue ? $streamedValue : $value);
				if (explode("/", mime_content_type($pathToValue))[0] === 'image') {
					// FILE TYPE IMAGE
					$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $valueToDisplay) . '" ' . ($lazy ? 'data-src="' . $valueToDisplay . '"' : '') . ' alt=""/>';
				} elseif (mime_content_type($pathToValue) === 'application/pdf' && $noEmbed) {
					// FILE TYPE PDF (NO EMBED = TRUE)
					$result = $this->twig->render('@AkyosFileManager/svg/pdf.html.twig', ['alt' => '']);
				} else {
					if (substr($value, 0, 5) === "video") {
						// FILE TYPE VIDEO
						$result = '<video controls width="100%">';
						$result .= '<source src="' . $valueToDisplay . '" type="' . mime_content_type($pathToValue) . '">';
						$result .= '</video>';
					} else {
						// OTHER FILE TYPES
						$result = '<embed src="' . $valueToDisplay . '" width="100%" height="100%" type="' . mime_content_type($pathToValue) . '">';
						$result .= '<style type="text/css">video {width: 100%; height: 100%}</style>';
						$result .= '</embed>';
					}
				}
			}
		} elseif ($file) {
			$fileToDisplay = ($streamedFile ? $streamedFile : $file->getFile());
			// FILE ID
			if (file_exists($pathToFile)) {
				// SVG
				if (mime_content_type($pathToFile) === 'image/svg') {
					$svg_file = file_get_contents($pathToFile);
					$find_string = '<svg';
					$position = strpos($svg_file, $find_string);
					$svg_file_new = substr($svg_file, $position);
					$result = "<div style='width:100%; height:100%;' >" . $svg_file_new . "</div>";
				} // IMAGE
				elseif (explode("/", mime_content_type($pathToFile))[0] === 'image') {
					$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $fileToDisplay) . '" ' . ($lazy ? 'data-src="' . $fileToDisplay . '"' : '') . ' alt="' . $file->getAlt() . '"/>';
				} else {
					if (substr(mime_content_type($pathToFile), 0, 5) === "video") {
						$result = '<video controls width="100%">';
						$result .= '<source src="' . $fileToDisplay . '" type="' . mime_content_type($pathToFile) . '">';
						$result .= '</video>';
					} elseif ($noEmbed && mime_content_type($pathToFile) === 'application/pdf') {
						$result = $this->twig->render('@AkyosFileManager/svg/pdf.html.twig', [
							'alt' => $file->getAlt(),
						]);
					} else {
						$result = '<embed width="100%" height="100%" src="' . $fileToDisplay . '" type="' . mime_content_type($pathToFile) . '"">';
						$result .= '<style type="text/css">video {width: 100%; height: 100%}</style>';
						$result .= '</embed>';
					}
				}
			} else {
				$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $fileToDisplay) . '" ' . ($lazy ? 'data-src="' . $fileToDisplay . '"' : '') . ' alt="' . $file->getAlt() . '"/>';
			}
		}
		
		return $result;
	}
	
	public function renderFileManagerUrl($value)
	{
		if (!is_string($value) and !is_int($value)) {
			return false;
		}
		$ytPattern = '~^(?:https?://)?(?:www[.])?(?:youtube[.]com/watch[?]v=|youtu[.]be/)([^&]{11})~x';
		$urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
		$intPattern = '/^\d+$/';
		$pathPattern = "/^\/" . substr($this->parameterBag->get('web_dir'), 1) . "|" . substr($this->parameterBag->get('secured_dir'), 1) . "|" . substr($this->parameterBag->get('private_spaces_dir'), 1) . "\//";
		$file = null;
		
		if (preg_match($intPattern, $value)) {
			/* @var File|null $file */
			$file = $this->fileRepository->find($value);
		}
		
		$result = '';
		
		if (preg_match($ytPattern, $value)) {
			$result = '';
		} elseif (preg_match($urlPattern, $value)) {
			$result = $value;
		} elseif (preg_match($pathPattern, $value)) {
			$result = $value;
		} elseif ($file) {
			$result = $file->getFile();
		}
		return str_replace(' ', '%20', $result);
	}
	
	function formatBytes($bytes, $precision = 2)
	{
		$units = array('B', 'KiB', 'MiB', 'GiB', 'TiB');
		$bytes = max($bytes, 0);
		$pow = floor(($bytes ? log($bytes) : 0) / log(1024));
		$pow = min($pow, count($units) - 1);
		
		// Uncomment one of the following alternatives
		$bytes /= pow(1024, $pow);
		
		return round($bytes, $precision) . ' ' . $units[$pow];
	}
}
