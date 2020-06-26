<?php

namespace Akyos\FileManagerBundle\Twig;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Repository\FileRepository;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class FileExtension extends AbstractExtension
{
    private $em;
    private $fileRepository;

    public function __construct(EntityManagerInterface $entityManager, FileRepository $fileRepository)
    {
        $this->em = $entityManager;
        $this->fileRepository = $fileRepository;
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
            new TwigFunction('getImageNameById', [$this, 'getImageNameById']),
            new TwigFunction('getImageDescById', [$this, 'getImageDescById']),
            new TwigFunction('renderFileManager', [$this, 'renderFileManager']),
            new TwigFunction('renderFileManagerNotLazy', [$this, 'renderFileManagerNotLazy']),
            new TwigFunction('renderFileManagerUrl', [$this, 'renderFileManagerUrl']),
        ];
    }

    public function getImagePathById($id)
    {
        $file = $this->fileRepository->find($id);
        return $file ? $file->getFile() : false;
    }

    public function getImageAltById($id)
    {
        $file = $this->fileRepository->find($id);
        return $file ? $file->getAlt() : false;
    }

    public function getImageNameById($id)
    {
        $file = $this->fileRepository->find($id);
        return $file ? $file->getName() : false;
    }

    public function getImageDescById($id)
    {
        $file = $this->fileRepository->find($id);
        return $file ? $file->getDescription() : false;
    }

    /*
     * @Deprecated use renderFileManager() instead with second parameter to false, to disable lazy load
     */
    public function renderFileManagerNotLazy($value, $height = null, $width = null)
    {
        if (!is_string($value) and !is_int($value)) {
            return false;
        }
        $ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->fileRepository->find($value);
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

    public function renderFileManager($value, $lazy = true)
    {
        if (!is_string($value) and !is_int($value)) {
            return false;
        }
        $ytPattern = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $urlPattern = '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i';
        $intPattern = '/^\d+$/';
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->fileRepository->find($value);
            $pathToFile = __DIR__.'/../../../public'.$file->getFile();
        }

        $result = '';

        if (preg_match($ytPattern, $value)) {
            $result = '<iframe width="100%" height="100%" src="'.$value.'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } elseif (preg_match($urlPattern, $value)) {
            $result = '<img class="'.($lazy ? 'lazy-load not-loaded' : '' ).' aky-img" src="'.($lazy ? '' : $value ).'" '.($lazy ? 'data-src="' . $value . '"' : '' ).' alt=""/>';
        } elseif (preg_match($pathPattern, $value)) {
            if (file_exists(__DIR__.'/../../../public'.$value)) {
                if (explode("/", mime_content_type(__DIR__ . '/../../../public' . $value))[0] === 'image') {
                    $result = '<img class="'.($lazy ? 'lazy-load not-loaded' : '' ).' aky-img" src="'.($lazy ? '' : $value ).'" '.($lazy ? 'data-src="' . $value . '"' : '' ).' alt=""/>';
                } else {
                    if (substr( $value, 0, 5 ) === "video") {
                        $result = '<video controls width="100%">
                                        <source src="'.$value.'" type="'.mime_content_type(__DIR__.'/../../../public'.$value).'">
                                   </video>';
                    } else {
                        $result = '<embed src="' . $value . '" width="100%" height="100%" type="' . mime_content_type(__DIR__ . '/../../../public' . $value) . '""><style type="text/css">video {width: 100%; height: 100%}</style></embed>';
                    }
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
                    $result = '<img class="'.($lazy ? 'lazy-load not-loaded' : '' ).' aky-img" src="'.($lazy ? '' : $file->getFile() ).'" '.($lazy ? 'data-src="' . $file->getFile() . '"' : '' ).' alt="'.$file->getAlt().'"/>';
                }else{
                    if (substr( mime_content_type(__DIR__.'/../../../public'.$file->getFile()), 0, 5 ) === "video") {
                        $result = '<video controls width="100%">
                                        <source src="'.$file->getFile().'" type="'.mime_content_type(__DIR__.'/../../../public'.$file->getFile()).'">
                                   </video>';
                    } else {
                        $result = '<embed width="100%" height="100%" src="'.$file->getFile().'" type="'.mime_content_type(__DIR__.'/../../../public'.$file->getFile()).'""><style type="text/css">video {width: 100%; height: 100%}</style></embed>';
                    }
                }
            } else {
                $result = '<img class="'.($lazy ? 'lazy-load not-loaded' : '' ).' aky-img" src="'.($lazy ? '' : $file->getFile() ).'" '.($lazy ? 'data-src="' . $file->getFile() . '"' : '' ).' alt="'.$file->getAlt().'"/>';
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
        $pathPattern = "/^\/uploads\//";
        $file = null;

        if (preg_match($intPattern, $value)) {
            $file = $this->fileRepository->find($value);
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
