<?php

namespace Akyos\FileManagerBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Security;

class ExtendSidebar
{
    private $router;
    private $security;

    public function __construct(UrlGeneratorInterface $router, Security $security)
    {
        $this->router = $router;
        $this->security = $security;
    }

    public function getTemplate($route)
    {
        $template ='';
        if($this->security->isGranted('gestion-des-fichiers')){
            $template = '<li class="'.(strpos($route,"file_show") !== false ? "active" : "").'">
                            <a href="'.$this->router->generate('file_show').'">Gestion des fichiers</a>
                        </li>';
        }
        return new Response($template);
    }
}