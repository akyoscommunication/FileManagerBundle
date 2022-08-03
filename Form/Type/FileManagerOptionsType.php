<?php

namespace Akyos\FileManagerBundle\Form\Type;

use Akyos\FileManagerBundle\Entity\FileManagerOptions;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FileManagerOptionsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('publicTab', TextType::class, ['label' => 'Onglet "espace public"', 'help' => 'Choisissez le texte à afficher sur l\'onglet des documents publics, dans le gestionnaire de fichiers.', 'required' => false,])->add('privateSpacesTab', TextType::class, ['label' => 'Onglet "espaces partagés"', 'help' => 'Choisissez le texte à afficher sur l\'onglet des documents partagés, dans le gestionnaire de fichiers.', 'required' => false,])->add('securedTab', TextType::class, ['label' => 'Onglet "espace privé"', 'help' => 'Choisissez le texte à afficher sur l\'onglet des documents privés, dans le gestionnaire de fichiers.', 'required' => false,])->add('privateSpaces', CollectionType::class, ['entry_type' => PrivateSpaceType::class, 'entry_options' => ['label' => false, 'attr' => ['class' => 'card-header__title',],], 'allow_add' => true, 'allow_delete' => true, 'by_reference' => false, 'label' => 'Espaces partagés', 'attr' => ['class' => 'collection_prototype', 'data-button_add' => 'Ajouter un espace', 'data-button_delete' => 'Supprimer cet espace',],]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['data_class' => FileManagerOptions::class,]);
    }
}
