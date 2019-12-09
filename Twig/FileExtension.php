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
