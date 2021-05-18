<?php

namespace Akyos\FileManagerBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FileManagerType extends AbstractType
{
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'label' => '',
			'config' => 'restrict',
			'required' => false,
			'view' => 'public',
			'private_space' => null,
		]);
	}

	public function buildView(FormView $view, FormInterface $form, array $options)
	{
		parent::buildView($view, $form, $options);

		$view->vars = array_replace($view->vars, [
			'config' => $options['config'],
			'view' => $options['view'],
			'private_space' => $options['private_space'],
		]);
	}

	public function getBlockPrefix()
	{
		return 'file_manager';
	}

	public function getParent()
	{
		return TextType::class;
	}
}
