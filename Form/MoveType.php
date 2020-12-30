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
        $tree['Dossier racine'] = $options['racine'].'/';
        foreach ($options['directories'] as $branch) {
            $filePath = $branch->getPath().'/'.$branch->getFilename();
            if(strpos($filePath, '/secured_files')) {
                $filePath = explode('/secured_files', $filePath)[1];
            }
			if(strpos($filePath, '/private_spaces_files')) {
				$filePath = explode('/private_spaces_files', $filePath)[1];
			}
            if(strpos($filePath, '/public/uploads')) {
                $filePath = explode('/public/uploads', $filePath)[1];
            }
            $tree[$filePath] = $branch->getPath().'/'.$branch->getFilename().'/';
        }

        $builder
            ->add('tree', ChoiceType::class, [
                'choices' => $tree,
                'label' => 'Sélectionner le dossier cible'
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
