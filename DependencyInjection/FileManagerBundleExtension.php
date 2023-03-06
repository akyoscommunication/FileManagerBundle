<?php

namespace Akyos\FileManagerBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class FileManagerBundleExtension extends Extension
{
	public function load(array $configs, ContainerBuilder $container)
	{
		$configuration = $this->getConfiguration($configs, $container);
		$config = $this->processConfiguration($configuration, $configs);
		
		$loader = new YamlFileLoader(
			$container,
			new FileLocator(__DIR__ . '/../Resources/config')
		);
		$loader->load('services.yaml');
		
		$container->setParameter('file_manager_spaces_roles', $config['file_manager_spaces_roles']);
	}
}