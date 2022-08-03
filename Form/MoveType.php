<?php

namespace Akyos\FileManagerBundle\Form;

use Akyos\FileManagerBundle\Repository\PrivateSpaceRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class MoveType extends AbstractType
{
    private PrivateSpaceRepository $privateSpaceRepository;

    private AuthorizationCheckerInterface $authorizationChecker;

    private KernelInterface $kernel;

    public function __construct(PrivateSpaceRepository $privateSpaceRepository, AuthorizationCheckerInterface $authorizationChecker, KernelInterface $kernel)
    {
        $this->privateSpaceRepository = $privateSpaceRepository;
        $this->authorizationChecker = $authorizationChecker;
        $this->kernel = $kernel;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $tree = ['Non' => ''];
        $tree['Dossier racine'] = $options['racine'] . '/';
        if (strpos($options['racine'], '/secured_files')) {
            $view = "secured";
        }
        if (strpos($options['racine'], '/private_spaces_files')) {
            $view = "private_space";
        }
        if (strpos($options['racine'], '/public/uploads')) {
            $view = "public";
        }

        foreach ($options['directories'] as $branch) {
            $filePath = $branch->getPath() . '/' . $branch->getFilename();
            if (strpos($filePath, '/secured_files')) {
                $filePath = explode('/secured_files', $filePath)[1];
            }
            if (strpos($filePath, '/private_spaces_files')) {
                $filePath = explode('/private_spaces_files', $filePath)[1];
            }
            if (strpos($filePath, '/public/uploads')) {
                $filePath = explode('/public/uploads', $filePath)[1];
            }
            $tree[$filePath] = $branch->getPath() . '/' . $branch->getFilename() . '/';
        }

        $public = ['Non' => '', 'Oui' => $this->kernel->getProjectDir() . '/public/uploads/'];

        $privateSpaces = ['Non' => ''];
        foreach ($this->privateSpaceRepository->findAll() as $privateSpace) {
            if ($this->authorizationChecker->isGranted($privateSpace->getRoles()) && strpos($options['racine'], '/private_spaces_files/' . $privateSpace->getSlug()) === false) {
                $privateSpaces[$privateSpace->getName()] = $this->kernel->getProjectDir() . '/private_spaces_files/' . $privateSpace->getSlug() . '/';
            }
        }

        $secured = ['Non' => '', 'Oui' => $this->kernel->getProjectDir() . '/secured_files/'];

        $builder->add('tree', ChoiceType::class, ['label' => 'Déplacer au sein de cet espace ?', 'choices' => $tree, 'required' => false, 'help' => 'Si oui, choisissez vers quel dossier de cet espace vous souhaitez déplacer l\'élément et laissez les autres champs sur "Non".'])->add('file', HiddenType::class)->add('type', HiddenType::class);

        if (isset($view) && $view !== "public") {
            $builder->add('public', ChoiceType::class, ['label' => 'Déplacer vers le dossier public ?', 'choices' => $public, 'required' => false, 'help' => 'Si oui, ne sélectionnez rien dans les autres champs. L\'élément sera déplacé à la racine de l\'espace cible. Sa visibilité sera probablement modifiée.']);
        }

        if (count($privateSpaces) > 1) {
            $builder->add('private_space', ChoiceType::class, ['label' => 'Déplacer vers un dossier partagé ?', 'choices' => $privateSpaces, 'required' => false, 'help' => 'Si oui, choisissez l\'espace cible et ne sélectionnez rien dans les autres champs. L\'élément sera déplacé à la racine de l\'espace cible. Sa visibilité sera probablement modifiée.',]);
        }

        if (isset($view) && $view !== "secured") {
            $builder->add('secured', ChoiceType::class, ['label' => 'Déplacer vers votre dossier privé ?', 'choices' => $secured, 'required' => false, 'help' => 'Si oui, ne sélectionnez rien dans les autres champs. L\'élément sera déplacé à la racine de l\'espace cible. Sa visibilité sera probablement modifiée.']);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['directories' => null, 'racine' => null]);
    }
}
