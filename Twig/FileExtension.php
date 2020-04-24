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
            new TwigFunction('renderFileManagerNotLazy', [$this, 'renderFileManagerNotLazy']),
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

    public function renderFileManagerNotLazy($value, $height = null, $width = null)
    {
        $ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->em->getRepository(File::class)->find($value);
            if(!$file) {
                return false;
            }
            $pathToFile = __DIR__.'/../../../public'.$file->getFile();
        }


        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '<iframe width="100%" height="100%" src="'.$value.'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } elseif (preg_match($urlPattern, $value)) {
            $result = '<img class="aky-img" src="'.$value.'" alt=""/>';
        } elseif (preg_match($pathPattern, $value)) {
            if (file_exists(__DIR__.'/../../../public'.$value)) {
                if(explode( "/", mime_content_type(__DIR__.'/../../../public'.$value))[0] === 'image' ){
                    $result = '<img class="aky-img" src="'.$value.'" alt=""/>';
                }else{
                    $result = '<embed src="'.$value.'" width="1000" height="1000" type="'.mime_content_type(__DIR__.'/../../../public'.$value).'"">';
                }
            }
        } elseif($file) {
            if (file_exists($pathToFile)) {
                if (mime_content_type($pathToFile) === 'image/svg'){
                    $svg_file = file_get_contents($pathToFile);

                    $find_string   = '<svg';
                    $position = strpos($svg_file, $find_string);

                    $svg_file_new = substr($svg_file, $position);
                    $result = "<div style='width:100%; height:100%;' >" . $svg_file_new . "</div>";
                }
                elseif(explode( "/", mime_content_type(__DIR__.'/../../../public'.$file->getFile()))[0] === 'image' ){
                    $result = '<img class="aky-img" src="'.$file->getFile().'" alt="'.$file->getAlt().'"/>';
                }else{
                    $result = '<embed src="'.$file->getFile().'" type="'.mime_content_type(__DIR__.'/../../../public'.$file->getFile()).'"">';
                }
            } else {
                $result = '<img class="aky-img" src="'.$file->getFile().'" alt="'.$file->getAlt().'"/>';
            }
        }

        return $result;
    }

    public function renderFileManager($value, $height = null, $width = null)
    {
        $ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->em->getRepository(File::class)->find($value);
            $pathToFile = __DIR__.'/../../../public'.$file->getFile();
        }

        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '<iframe width="100%" height="100%" src="'.$value.'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } elseif (preg_match($urlPattern, $value)) {
            $result = '<img class="lazy-load not-loaded aky-img" src="" data-src="'.$value.'" alt=""/>';
        } elseif (preg_match($pathPattern, $value)) {
            if (file_exists(__DIR__.'/../../../public'.$value)) {
                if (explode("/", mime_content_type(__DIR__ . '/../../../public' . $value))[0] === 'image') {
                    $result = '<img class="lazy-load not-loaded aky-img" src="" data-src="' . $value . '" alt=""/>';
                } else {
                    $result = '<embed src="' . $value . '" width="1000" height="1000" type="' . mime_content_type(__DIR__ . '/../../../public' . $value) . '"">';
                }
            }
        } elseif($file) {
            if (file_exists($pathToFile)) {
                if (mime_content_type($pathToFile) === 'image/svg'){
                    $svg_file = file_get_contents($pathToFile);

                    $find_string   = '<svg';
                    $position = strpos($svg_file, $find_string);

                    $svg_file_new = substr($svg_file, $position);
                    $result = "<div style='width:100%; height:100%;' >" . $svg_file_new . "</div>";
                }
                elseif(explode( "/", mime_content_type(__DIR__.'/../../../public'.$file->getFile()))[0] === 'image' ){
                    $result = '<img class="lazy-load not-loaded aky-img" src="" data-src="'.$file->getFile().'" alt="'.$file->getAlt().'"/>';
                }else{
                    $result = '<embed src="'.$file->getFile().'" type="'.mime_content_type(__DIR__.'/../../../public'.$file->getFile()).'"">';
                }
            } else {
                $result = '<img class="lazy-load not-loaded aky-img" src="" data-src="'.$file->getFile().'" alt="'.$file->getAlt().'"/>';
            }
        }

        return $result;
    }

    public function renderFileManagerUrl($value)
    {
        $ytPattern = '~^(?:https?://)?(?:www[.])?(?:youtube[.]com/watch[?]v=|youtu[.]be/)([^&]{11})~x';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->em->getRepository(File::class)->find($value);
        }

        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '';
        } elseif (preg_match($urlPattern, $value)) {
            $result = $value;
        } elseif (preg_match($pathPattern, $value)) {
            $result = $value;
        }elseif($file) {
            $result = $file->getFile();
        }
        return urlencode($result);
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
