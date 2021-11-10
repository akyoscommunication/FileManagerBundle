<?php

namespace Akyos\FileManagerBundle\Twig;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Akyos\FileManagerBundle\Service\UploadsService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class FileExtension extends AbstractExtension
{
	private FileRepository $fileRepository;
	private ParameterBagInterface $parameterBag;
	private UploadsService $uploadsService;
	private UrlGeneratorInterface $urlGenerator;
	private Environment $twig;
	private string $rootPath = __DIR__ . '/../../..';
	
	public function __construct(FileRepository $fileRepository, ParameterBagInterface $parameterBag, UploadsService $uploadsService, UrlGeneratorInterface $urlGenerator, Environment $twig)
	{
		$this->fileRepository = $fileRepository;
		$this->parameterBag = $parameterBag;
		$this->uploadsService = $uploadsService;
		$this->urlGenerator = $urlGenerator;
		$this->twig = $twig;
	}

    /**
     * @return TwigFilter[]
     */
	public function getFilters(): array
	{
		return [
			new TwigFilter('format_bytes', [$this, 'formatBytes']),
		];
	}

    /**
     * @return TwigFunction[]
     */
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

    /**
     * @param $id
     * @param bool $display
     * @return false|string|null
     */
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
	
	/**
	 * @param int|null $id
	 * @return array|false
	 */
	public function getImageVisibilityById(int $id = null)
	{
        if ($id) {
			/* @var File|null $file */
			$file = $this->fileRepository->find($id);
			return $file ? $file->getVisibility() : false;
        }
		return false;
	}
	
	/**
	 * @param $id
	 * @return false|string|null
	 */
	public function getImageAltById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getAlt() : false;
	}
	
	/**
	 * @param $id
	 * @return false|string|null
	 */
	public function getImageNameById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getName() : false;
	}
	
	/**
	 * @param $id
	 * @return false|string|null
	 */
	public function getImageDescById($id)
	{
		/* @var File|null $file */
		$file = $this->fileRepository->find($id);
		return $file ? $file->getDescription() : false;
	}
	
	/*
	 * @deprecated use renderFileManager() instead with second parameter to false, to disable lazy load
	 */

    /**
     * @param $value
     * @param null $height
     * @param null $width
     * @param false $noEmbed
     * @return false|string
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     * @deprecated use renderFileManager() instead with second parameter to false, to disable lazy load
     */
	public function renderFileManagerNotLazy($value, $height = null, $width = null, $noEmbed = false)
	{
		/*
		 * => Replaced by renderFileManager()
		 */
		return $this->renderFileManager($value, false, $noEmbed);
	}

    /**
     * @param $value
     * @param bool $lazy
     * @param false $noEmbed
     * @return false|string
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
	public function renderFileManager($value, $lazy = true, $noEmbed = false)
	{
		if (!is_string($value) && !is_int($value)) {
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
			$result = '<iframe width="100%" height="100%" src="' . $value . '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		} elseif (preg_match($urlPattern, $value)) {
			// EXTERNAL IMAGE URL
			$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $value) . '" ' . ($lazy ? 'data-src="' . $value . '"' : '') . ' alt=""/>';
		} elseif (preg_match($pathPattern, $value)) {
			// FILE PATH
			if (isset($pathToValue) && file_exists($pathToValue)) {
				$valueToDisplay = ($streamedValue ?: $value);
				if (explode("/", mime_content_type($pathToValue))[0] === 'image') {
					// FILE TYPE IMAGE
					$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $valueToDisplay) . '" ' . ($lazy ? 'data-src="' . $valueToDisplay . '"' : '') . ' alt=""/>';
				} elseif ($noEmbed && mime_content_type($pathToValue) === 'application/pdf') {
					// FILE TYPE PDF (NO EMBED = TRUE)
					$result = $this->twig->render('@AkyosFileManager/svg/pdf.html.twig', ['alt' => '']);
                } elseif (pathinfo($pathToValue)['extension'] === 'csv') {
                    // FILE TYPE PDF (NO EMBED = TRUE)
                    $result = $this->twig->render('@AkyosFileManager/svg/csv.html.twig', ['alt' => '']);
				} else if (strpos($value, "video") === 0) {
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
		} elseif ($file) {
			$fileToDisplay = $streamedFile ?: $file->getFile();
			// FILE ID
			if (isset($pathToFile) && file_exists($pathToFile)) {
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
				} else if (strpos(mime_content_type($pathToFile), "video") === 0) {
                    $result = '<video controls width="100%">';
                    $result .= '<source src="' . $fileToDisplay . '" type="' . mime_content_type($pathToFile) . '">';
                    $result .= '</video>';
                } elseif ($noEmbed && mime_content_type($pathToFile) === 'application/pdf') {
                    $result = $this->twig->render('@AkyosFileManager/svg/pdf.html.twig', [
                        'alt' => $file->getAlt(),
                    ]);
                } elseif (pathinfo($pathToFile)['extension'] === 'csv') {
                    // FILE TYPE PDF (NO EMBED = TRUE)
                    $result = $this->twig->render('@AkyosFileManager/svg/csv.html.twig', ['alt' => '']);
                } else {
                    $result = '<embed width="100%" height="100%" src="' . $fileToDisplay . '" type="' . mime_content_type($pathToFile) . '"">';
                    $result .= '<style type="text/css">video {width: 100%; height: 100%}</style>';
                    $result .= '</embed>';
                }
			} else {
				$result = '<img class="' . ($lazy ? 'lazy-load not-loaded' : '') . ' aky-img" src="' . ($lazy ? '' : $fileToDisplay) . '" ' . ($lazy ? 'data-src="' . $fileToDisplay . '"' : '') . ' alt="' . $file->getAlt() . '"/>';
			}
		}
		
		return $result;
	}

    /**
     * @param $value
     * @return false|int|string|string[]
     */
	public function renderFileManagerUrl($value)
	{
		if (!is_string($value) && !is_int($value)) {
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

    /**
     * @param $bytes
     * @param int $precision
     * @return string
     */
	public function formatBytes($bytes, $precision = 2): string
	{
		$units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
		$bytes = max($bytes, 0);
		$pow = floor(($bytes ? log($bytes) : 0) / log(1024));
		$pow = min($pow, count($units) - 1);
		
		// Uncomment one of the following alternatives
		$bytes /= 1024 ** $pow;
		
		return round($bytes, $precision) . ' ' . $units[$pow];
	}
}
