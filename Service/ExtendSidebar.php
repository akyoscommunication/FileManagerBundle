<?php

namespace Akyos\FileManagerBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\SecurityBundle\Security;

class ExtendSidebar
{
    private UrlGeneratorInterface $router;

    private Security $security;

    public function __construct(UrlGeneratorInterface $router, Security $security)
    {
        $this->router = $router;
        $this->security = $security;
    }

    public function getTemplate($route): Response
    {
        $template = '';
        if ($this->security->isGranted('gestion-des-fichiers')) {
            $template = '<li class="' . (strpos($route, "file_show") !== false ? "active" : "") . '">
                            <a href="' . $this->router->generate('file_show') . '">Gestion des fichiers</a>
                        </li>';
        }
        return new Response($template);
    }

    public function getOptionsTemplate($route): Response
    {
        $template = '';
        if ($this->security->isGranted('options-du-gestionnaire-de-fichier')) {
            $template = '<li class="' . (strpos($route, "file_manager_options") !== false ? "active" : "") . '"><a href="' . $this->router->generate('file_manager_options') . '">FileManager</a></li>';
        }
        return new Response($template);
    }
}