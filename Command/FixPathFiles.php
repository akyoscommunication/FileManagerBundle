<?php

namespace Akyos\FileManagerBundle\Command;

use Akyos\FileManagerBundle\Entity\File;
use Akyos\FileManagerBundle\Service\UploadsService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpKernel\KernelInterface;

class FixPathFiles extends Command
{
	protected static string $defaultName = 'file-manager:fix-path-file';
	private EntityManagerInterface $em;
	
	public function __construct(EntityManagerInterface $em, string $name = null, ParameterBagInterface $parameterBag, KernelInterface $kernel, UploadsService $uploadsService)
	{
		parent::__construct($name);
		$this->em = $em;
	}
	
	protected function configure()
	{
		$this
			->setDescription('Fix les path des files.');
	}
	
	protected function execute(InputInterface $input, OutputInterface $output): int
	{
        // TODO => Finir le code
        die();

		$io = new SymfonyStyle($input, $output);

		$fileRepository = $this->em->getRepository(File::class);

		foreach ($fileRepository->findAll() as $file) {
		    if (
		        (strpos($file->getFile(), '//') !== false)
                || (strpos($file->getFile(), '///') !== false)
                || (strpos($file->getFile(), '////') !== false)
            ) {
                /**
                 * Problème
                 *   - Il y a des entités qui on des files rattaché à ceux qu'on veut supprimer
                 *   - donc si on supprime, ça pète le site, le rendu des images puisqu'il y en a plus
                 *
                 *   - il faudrait retrouver les champs qui on comme fonction la récupération de fichier et réassigné le bon fichier avec le bon path
                 *
                 * Solution Possible
                 *   - parcourir tous les forms pour savoir quelles sont les propriétés des entités qui sont bind au fileManager (fileManagerType, fileManagerCollectionType)
                 *   - et re faire la manipulation de parcours de tous les paths qui sont pas bon en devinant celui qui est bon
                 *   - retrouver les champs qui on l'id du pas bon et remettre le bon
                 */
                $this->em->remove($file);
                $this->em->flush();
            }
        }
		
		$io->success('Changement terminé.');
		
		return 0;
	}
}
