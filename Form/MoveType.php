<?php

namespace Akyos\FileManagerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MoveType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $tree = [];
        $tree['racine'] = $options['racine'].'/';
        foreach ($options['directories'] as $branch) {
            $tree[$branch->getFilename()] = $branch->getPath().'/'.$branch->getFilename().'/';
        }

        $builder
            ->add('tree', ChoiceType::class, [
                'choices' => $tree,
                'label' => 'Dossier cible'
            ])
            ->add('file', HiddenType::class)
            ->add('type', HiddenType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            'directories' => null,
            'racine' => null
        ]);
    }
}
