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
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpKernel\KernelInterface;

class FixFolderAndFileNamesCommand extends Command
{
    protected static $defaultName = 'file-manager:fix-names';

    /** @var EntityManagerInterface */
    private EntityManagerInterface $em;

    /** @var ParameterBagInterface $parameterBag */
    private ParameterBagInterface $parameterBag;

    /** @var KernelInterface $kernel */
    private KernelInterface $kernel;

    /** @var UploadsService $uploadsService */
    private UploadsService $uploadsService;

    public function __construct(EntityManagerInterface $em, ParameterBagInterface $parameterBag, KernelInterface $kernel, UploadsService $uploadsService)
    {
        $this->em = $em;
        $this->parameterBag = $parameterBag;
        $this->kernel = $kernel;
        $this->uploadsService = $uploadsService;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription('Fix les noms des dossiers et fichiers (enlève les espaces et caractères spéciaux).');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Parcourir récursivement les dossiers des 3 espaces du filemanager s'ils existent (espaces public, partagés et privé)

        $securedDir = $this->kernel->getProjectDir() . $this->parameterBag->get('secured_dir');
        $privateDir = $this->kernel->getProjectDir() . $this->parameterBag->get('private_spaces_dir');
        $publicDir = $this->kernel->getProjectDir() . '/public' . $this->parameterBag->get('web_dir');

        if (is_dir($publicDir)) {
            $finderPublicFiles = new Finder();
            $finderPublicFiles->directories()->in($publicDir);
            $this->fixNamesInDirectory($finderPublicFiles, $this->parameterBag->get('web_dir'));
        }

        if (is_dir($securedDir)) {
            $finderSecuredFiles = new Finder();
            $finderSecuredFiles->directories()->in($securedDir);
            $this->fixNamesInDirectory($finderSecuredFiles, $this->parameterBag->get('secured_dir'));
        }

        if (is_dir($privateDir)) {
            $finderPrivateFiles = new Finder();
            $finderPrivateFiles->directories()->in($privateDir);
            $this->fixNamesInDirectory($finderPrivateFiles, $this->parameterBag->get('private_spaces_dir'));
        }

        $io->success('Changement terminé.');

        return 0;
    }

    private function fixNamesInDirectory(Finder $finder, $baseFolder): void
    {
        // TODO => Finir le code
        die();
        if ($finder->hasResults()) {
            foreach ($finder as $directory) {
                $filename = $directory->getFilename();
                $absoluteFilePath = $directory->getRealPath();
                $path = $directory->getPath();
                $relativePathName = $baseFolder . '/' . $directory->getRelativePathname();
                $relativePath = $baseFolder . '/' . $directory->getRelativePath();

                // Pour chaque dossier, appliquer la fonction UploadsService::fixName() sur le nom du dossier, comparer le résultat avec le nom d'origine: si pas de changement on ne fait rien
                if ($directory->isDir()) {
                    $fixedFilename = $this->uploadsService->fixName($filename);
                    if ($filename !== $fixedFilename) {
                        // Si le nom du dossier à changé, vérifier s'il y a déjà un dossier du même nom dans le dossier parent, si oui on transfère tout le contenu du dossier dans celui qui existe déjà avec le bon nom en vérifiant les doublons

                        //on change le nom du dossier sur le FTP + on répercute le changement dans tous les liens de tous les fichiers File qui sont dans ce dossier.
//						$filesystem->rename($absoluteFilePath, $path.'/'.$fixedFilename);

                        $queryFiles = $this->em->getRepository(File::class)->createQueryBuilder('f');
                        $files = $queryFiles->andWhere('f.file LIKE :path')->setParameter('path', "%" . $relativePathName . "%")->getQuery()->getResult();

                        /** @var File $file */
                        foreach ($files as $file) {
                            $newPath = $file->getFile();
                            str_replace($relativePathName, $relativePath . '/' . $fixedFilename, $newPath);
                            $file->setFile($newPath);
                            // Ca ne marche pas avec les accents....
//							dump($relativePathName, $relativePath.'/'.$fixedFilename, $newPath);
                        }
                        die();
                    }
                }
                // Pour chaque fichier, appliquer la fonction UploadsService::fixName() sur le nom du fichier, comparer le résultat avec le nom d'origine: si pas de changement on ne fait rien
                // Si le nom du fichier à changé, on change le nom du fichier sur le FTP + on répercute le changement dans le lien du fichier File
                if ($directory->isFile()) {
                }
            }
            dd('aie');
        }
    }
}
