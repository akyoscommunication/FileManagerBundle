<?php

namespace Akyos\FileManagerBundle\Form;

use Akyos\FileManagerBundle\Entity\File;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EditFileType extends AbstractType
{
    public function __construct(
        private readonly ContainerInterface $parameterBag
    ){}

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $roles = $this->parameterBag->get('file_manager_spaces_roles');
        $roles = array_reverse($roles);
        $roles['Public (toute personne qui a le lien peut voir le fichier)'] = 'ANONYMOUS';
        $roles = array_reverse($roles);

        /** @var File $file */
        $file = $options['data'];

        $builder->add('name', TextType::class, ['label' => 'Nom du fichier', 'disabled' => true,])->add('alt', TextType::class, ['label' => 'Texte alternatif', 'required' => false, 'help' => 'Décrivez le but de l’image. Laissez vide si l’image est purement décorative ou si l\'information qu\'elle contient est déjà écrite ailleurs sur la page.',])->add('description', TextareaType::class, ['label' => 'Description du fichier', 'required' => false,]);

        if (strpos($file->getFile(), '/secured_files') !== false || strpos($file->getFile(), '/private_spaces_files') !== false) {
            $builder->add('visibility', ChoiceType::class, ['label' => 'Visibilité du fichier', 'choices' => $roles, 'multiple' => true, 'required' => false, 'help' => 'En dehors du gestionnaire de fichiers, par qui le fichier est-il visible ? Laissez vide pour qu\'il ait la même visibilité que l\'espace dans lequel il se trouve.',]);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['data_class' => File::class,]);
    }
}
