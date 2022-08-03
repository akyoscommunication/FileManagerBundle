<?php

namespace Akyos\FileManagerBundle;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class FileManagerCompilerPass implements CompilerPassInterface
{
    /**
     * @inheritDoc
     */
    public function process(ContainerBuilder $container)
    {
        if ($container->hasParameter('twig.form.resources')) {
            $resources = $container->getParameter('twig.form.resources') ?: [];
            array_unshift($resources, '@AkyosFileManager/form/file_manager_types.html.twig');
            $container->setParameter('twig.form.resources', $resources);
        }
    }
}