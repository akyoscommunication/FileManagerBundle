<?php

namespace Akyos\FileManagerBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\SecurityBundle\Security;

class ExtendSidebar
{
    private readonly UrlGeneratorInterface $router;

    private readonly Security $security;

    public function __construct(UrlGeneratorInterface $router, Security $security)
    {
        $this->router = $router;
        $this->security = $security;
    }

    public function getTemplate($route): Response
    {
        $template = '';
        if ($this->security->isGranted('gestion-des-fichiers')) {
            $template = '<li class="' . (str_contains((string) $route, "file_show") ? "active" : "") . '">
                            <a href="' . $this->router->generate('file_show') . '">Gestion des fichiers</a>
                        </li>';
        }
        return new Response($template);
    }

    public function getOptionsTemplate($route): Response
    {
        $template = '';
        if ($this->security->isGranted('options-du-gestionnaire-de-fichier')) {
            $template = '<li class="' . (str_contains((string) $route, "file_manager_options") ? "active" : "") . '"><a href="' . $this->router->generate('file_manager_options') . '">FileManager</a></li>';
        }
        return new Response($template);
    }
}