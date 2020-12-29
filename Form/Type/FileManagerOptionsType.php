<?php

namespace Akyos\FileManagerBundle\Form\Type;

use Akyos\FileManagerBundle\Entity\FileManagerOptions;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FileManagerOptionsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
			->add('privateSpaces', CollectionType::class, [
				'entry_type' => PrivateSpaceType::class,
				'entry_options' => [
					'label' => false,
					'attr' => [
						'class' => 'card-header__title'
					]
				],
				'allow_add' => true,
				'allow_delete' => true,
				'by_reference' => false,
				'label' => 'Espaces partagés',
				'attr' => [
					'class' => 'collection_prototype',
					'data-button_add' => 'Ajouter un espace',
					'data-button_delete' => 'Supprimer cet espace',
				],
			])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => FileManagerOptions::class,
        ]);
    }
}
