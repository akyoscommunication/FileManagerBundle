<?php

namespace Akyos\FileManagerBundle\Form\Type;

use Doctrine\Common\Collections\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use function count;

class FileManagerCollectionType extends AbstractType implements DataTransformerInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder->addModelTransformer($this);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['allow_add' => true, 'allow_delete' => true, 'prototype' => true, 'prototype_data' => null, 'prototype_name' => '__name__', 'entry_type' => FileManagerType::class, 'entry_options' => ['config' => 'restrict'], 'delete_empty' => false, 'by_reference' => false, 'required' => false, 'min' => 0, 'max' => 100, 'init_with_n_elements' => 1, 'add_at_the_end' => true, 'tree' => 0, 'error_bubbling' => false, 'view' => "public", 'private_space' => null,]);
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);

        $view->vars = array_replace($view->vars, ['data_max' => $options['max'], 'data_min' => $options['min'], 'data_init_with_n_elements' => $options['init_with_n_elements'], 'data_add_at_the_end' => $options['add_at_the_end'], 'tree' => $options['tree'], 'view' => $options['view'], 'private_space' => $options['private_space'],]);
    }

    public function getBlockPrefix(): string
    {
        return 'file_manager_collection';
    }

    public function transform(mixed $value): mixed
    {
        return $value;
    }

    public function getParent(): string
    {
        return CollectionType::class;
    }

    /**
     * @inheritDoc
     */
    public function reverseTransform(mixed $value): mixed
    {
        if (count($value) === 0) {
            return null;
        }

        return array_filter(($value instanceof Collection) ? $value->toArray() : $value, static function ($path) {
            return $path !== null;
        });
    }
}
