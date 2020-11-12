<?php

namespace Akyos\FileManagerBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ExtendSidebar
{
    private $router;

    public function __construct(UrlGeneratorInterface $router)
    {
        $this->router = $router;
    }

    public function getTemplate($route)
    {
        $template = '
        <li class="'.(strpos($route,"file_show") !== false ? "active" : "").'">
            <a href="'.$this->router->generate('file_show').'">Gestion des fichiers</a>
        </li>';
        return new Response($template);
    }
}