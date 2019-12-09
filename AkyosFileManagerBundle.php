<?php

namespace Akyos\FileManagerBundle;

use Akyos\FileManagerBundle\DependencyInjection\FileManagerBundleExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class AkyosFileManagerBundle extends Bundle
{
    public function getContainerExtension()
    {
        return new FileManagerBundleExtension();
    }

    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new FileManagerCompilerPass());
    }
}