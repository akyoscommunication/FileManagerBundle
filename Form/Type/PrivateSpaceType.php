<?php

namespace Akyos\FileManagerBundle\Form\Type;

use Akyos\FileManagerBundle\Entity\PrivateSpace;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PrivateSpaceType extends AbstractType
{
    private ContainerInterface $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $roles = $this->container->getParameter('file_manager_spaces_roles');

        $builder->add('name', TextType::class, ['label' => 'Nom de l\'espace privé',])->add('roles', ChoiceType::class, ['label' => 'Utilisateurs qui y ont accès', 'choices' => $roles, 'multiple' => true, 'attr' => ['class' => 'js-select2',], 'required' => false, 'help' => 'Laissez vide pour que l\'espace soit accessible à tout ceux qui ont accès au gestionnaire de fichiers',]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['data_class' => PrivateSpace::class,]);
    }
}
