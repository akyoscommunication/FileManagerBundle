<?php

namespace Akyos\FileManagerBundle\Form;

use Akyos\FileManagerBundle\Entity\File;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class UploadType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', FileType::class, [
                'label' => false,
                'multiple' => true,
                'attr' => [
                    'is' => 'drop-files',
                    'label' => 'Déposer vos fichiers ici',
                    'help' => 'ou cliquer pour ouvrir le gestionnaire de fichiers',
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
        ]);
    }
}
