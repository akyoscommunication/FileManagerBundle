<?php

namespace Akyos\FileManagerBundle\Twig;

use Akyos\FileManagerBundle\Entity\File;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class FileExtension extends AbstractExtension
{
    private $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function getFilters(): array
    {
        return [
            // If your filter generates SAFE HTML, you should add a third
            // parameter: ['is_safe' => ['html']]
            // Reference: https://twig.symfony.com/doc/2.x/advanced.html#automatic-escaping
            new TwigFilter('format_bytes', [$this, 'formatBytes']),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('getImagePathById', [$this, 'getImagePathById']),
            new TwigFunction('getImageAltById', [$this, 'getImageAltById']),
            new TwigFunction('renderFileManager', [$this, 'renderFileManager']),
            new TwigFunction('renderFileManagerUrl', [$this, 'renderFileManagerUrl']),
        ];
    }

    public function getImagePathById($id)
    {
        $file = $this->em->getRepository(File::class)->find($id);
        return $file ? $file->getFile() : false;
    }

    public function getImageAltById($id)
    {
        $file = $this->em->getRepository(File::class)->find($id);
        return $file ? $file->getAlt() : false;
    }

    public function renderFileManager($value)
    {
        $ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->em->getRepository(File::class)->find($value);
        }

        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '<iframe width="100%" height="100%" src="'.$value.'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } elseif (preg_match($urlPattern, $value)) {
            $result = '<img class="aky-img" src="'.$value.'" alt=""/>';
        } elseif($file) {
            $result = '<img class="aky-img" src="'.$file->getFile().'" alt="'.$file->getAlt().'"/>';
        }

        return $result;
    }

    public function renderFileManagerUrl($value)
    {
        $ytPattern = '~^(?:https?://)?(?:www[.])?(?:youtube[.]com/watch[?]v=|youtu[.]be/)([^&]{11})~x';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->em->getRepository(File::class)->find($value);
        }

        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '';
        } elseif (preg_match($urlPattern, $value)) {
            $result = $value;
        } elseif($file) {
            $result = $file->getFile();
        }

        return $result;
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
