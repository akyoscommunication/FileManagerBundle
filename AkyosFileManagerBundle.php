<?php

namespace Akyos\FileManagerBundle;

use Akyos\FileManagerBundle\DependencyInjection\FileManagerBundleExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class AkyosFileManagerBundle extends Bundle
{
    /**
     * @return FileManagerBundleExtension
     */
    public function getContainerExtension(): FileManagerBundleExtension
    {
        return new FileManagerBundleExtension();
    }

    /**
     * @param ContainerBuilder $container
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new FileManagerCompilerPass());
    }
}